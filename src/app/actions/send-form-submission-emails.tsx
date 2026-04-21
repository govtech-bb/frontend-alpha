"use server";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { render } from "@react-email/render";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { FormSubmissionConfirmationEmail } from "@/emails/form-submission-confirmation-email";
import { FormSubmissionNotificationEmail } from "@/emails/form-submission-notification-email";
import type { JsonValue } from "@/types";

// ─── SES client config ────────────────────────────────────────────────────────

const sesRegion = process.env.SES_REGION ?? "us-east-1";
const mailFrom = process.env.MAIL_FROM ?? "";
const configurationSet = process.env.SES_CONFIGURATION_SET;
const tagKey = process.env.SES_TAG_KEY;
const tagValue = process.env.SES_TAG_VALUE;

const sesClient = new SESv2Client({ region: sesRegion });

// ─── Zod schema ───────────────────────────────────────────────────────────────

const submissionEmailPayloadSchema = z.object({
  formName: z.string().min(1),
  referenceNumber: z.string().min(1),
  formData: z.record(z.string(), z.unknown()),
  applicantEmail: z.string().email().nullable(),
  notificationEmail: z.string().email().nullable(),
});

type SubmissionEmailPayload = z.infer<typeof submissionEmailPayloadSchema>;

// ─── Structured logger ────────────────────────────────────────────────────────
//
// Each entry is written to two sinks:
//
//  1. CloudWatch — via console.error as a single JSON line. Find logs at:
//     AWS Console → CloudWatch → Log groups → /aws/amplify/<APP_ID>
//     or /aws/lambda/<FUNCTION_NAME> for Lambda-deployed functions.
//
//  2. Sentry Logs — via Sentry.logger.* (requires `enableLogs: true` in
//     sentry.server.config.ts, which is already set). View at:
//     Sentry → your project → Logs.
//     ERROR entries additionally call captureException / captureMessage so
//     they appear in Issues for alerting and stack-trace correlation.
//
// ─────────────────────────────────────────────────────────────────────────────

type LogLevel = "INFO" | "WARN" | "ERROR";

const cloudwatchLog: Record<LogLevel, (message: string) => void> = {
  INFO: console.info,
  WARN: console.warn,
  ERROR: console.error,
};

function log(
  level: LogLevel,
  event: string,
  fields?: Record<string, unknown>
): void {
  // CloudWatch sink — single-line JSON picked up by the Lambda/Amplify log stream
  cloudwatchLog[level](
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      service: "form-submission-emails",
      event,
      ...fields,
    })
  );

  // Sentry sink — coerce nested/null values to strings; the Sentry logger
  // attribute type only accepts string | number | boolean primitives.
  const sentryAttrs: Record<string, string | number | boolean> = {
    service: "form-submission-emails",
  };
  for (const [key, value] of Object.entries(fields ?? {})) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      sentryAttrs[key] = value;
    } else if (value !== null && value !== undefined) {
      sentryAttrs[key] = JSON.stringify(value);
    }
  }

  switch (level) {
    case "INFO":
      Sentry.logger.info(event, sentryAttrs);
      break;
    case "WARN":
      Sentry.logger.warn(event, sentryAttrs);
      break;
    default:
      // "ERROR" — LogLevel is a closed union so this branch is only reached for errors
      Sentry.logger.error(event, sentryAttrs);
      break;
  }
}

// Mask an email address for safe logging.
// "user@domain.com" → "us***@domain.com"
function maskEmail(email: string | null | undefined): string {
  if (!email) return "(none)";
  const atIndex = email.indexOf("@");
  if (atIndex < 0) return "***";
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function humanizeFieldKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function flattenDataForEmail(
  value: JsonValue,
  keyPrefix = ""
): Array<{ label: string; value: string }> {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return [];
    }

    if (
      value.every((item) =>
        ["string", "number", "boolean"].includes(typeof item)
      )
    ) {
      const formattedValue = value.map(String).join(", ");
      return [{ label: humanizeFieldKey(keyPrefix), value: formattedValue }];
    }

    return value.flatMap((item, index) =>
      flattenDataForEmail(
        item as JsonValue,
        keyPrefix ? `${keyPrefix} ${index + 1}` : `${index + 1}`
      )
    );
  }

  if (typeof value === "object") {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      flattenDataForEmail(
        nestedValue as JsonValue,
        keyPrefix ? `${keyPrefix}.${key}` : key
      )
    );
  }

  const formattedValue = String(value).trim();
  if (!formattedValue) {
    return [];
  }

  return [{ label: humanizeFieldKey(keyPrefix), value: formattedValue }];
}

// ─── SES send ─────────────────────────────────────────────────────────────────

async function sendEmail({
  to,
  subject,
  html,
  referenceNumber,
}: {
  to: string;
  subject: string;
  html: string;
  referenceNumber: string;
}): Promise<void> {
  const sendStart = Date.now();

  log("INFO", "ses.send.attempt", {
    referenceNumber,
    recipient: maskEmail(to),
    subject,
    fromAddress: maskEmail(mailFrom),
    configurationSet: configurationSet ?? "(none)",
    hasEmailTags: Boolean(tagKey && tagValue),
  });

  const command = new SendEmailCommand({
    FromEmailAddress: mailFrom,
    Destination: { ToAddresses: [to] },
    ...(configurationSet && {
      ConfigurationSetName: configurationSet,
      ...(tagKey &&
        tagValue && {
          EmailTags: [{ Name: tagKey, Value: tagValue }],
        }),
    }),
    Content: {
      Simple: {
        Subject: { Data: subject },
        Body: { Html: { Data: html } },
      },
    },
  });

  const response = await sesClient.send(command);

  log("INFO", "ses.send.success", {
    referenceNumber,
    recipient: maskEmail(to),
    subject,
    messageId: response.MessageId ?? "(unknown)",
    durationMs: Date.now() - sendStart,
  });
}

// ─── Server action ────────────────────────────────────────────────────────────

export async function sendFormSubmissionEmails(
  payload: SubmissionEmailPayload
) {
  const actionStart = Date.now();

  // Use whatever we can read from the raw payload for early correlation before
  // Zod validation runs.
  const correlationRef =
    typeof payload?.referenceNumber === "string"
      ? payload.referenceNumber
      : "unknown";

  // ── 1. Log entry ──────────────────────────────────────────────────────────

  log("INFO", "sendFormSubmissionEmails.start", {
    referenceNumber: correlationRef,
    formName:
      typeof payload?.formName === "string" ? payload.formName : "unknown",
    applicantEmail: maskEmail(
      typeof payload?.applicantEmail === "string"
        ? payload.applicantEmail
        : null
    ),
    notificationEmail: maskEmail(
      typeof payload?.notificationEmail === "string"
        ? payload.notificationEmail
        : null
    ),
  });

  // ── 2. Validate payload ───────────────────────────────────────────────────

  const parsed = submissionEmailPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    const flatErrors = parsed.error.flatten();
    log("ERROR", "sendFormSubmissionEmails.validation_failed", {
      referenceNumber: correlationRef,
      fieldErrors: flatErrors.fieldErrors,
      formErrors: flatErrors.formErrors,
      hint: "The payload passed to sendFormSubmissionEmails did not match the expected schema",
    });

    // Capture as a Sentry issue — validation failures don't throw so Sentry
    // won't see them automatically.
    Sentry.captureMessage(
      "sendFormSubmissionEmails: payload validation failed",
      {
        level: "error",
        extra: {
          referenceNumber: correlationRef,
          fieldErrors: flatErrors.fieldErrors,
          formErrors: flatErrors.formErrors,
        },
      }
    );

    return {
      success: false as const,
      error: "Invalid email payload",
    };
  }

  // ── 3. Check required environment variables ───────────────────────────────

  log("INFO", "sendFormSubmissionEmails.config_check", {
    referenceNumber: correlationRef,
    sesRegion,
    hasMailFrom: Boolean(mailFrom),
    hasConfigurationSet: Boolean(configurationSet),
    configurationSet: configurationSet ?? "(none)",
    hasTagKey: Boolean(tagKey),
    hasTagValue: Boolean(tagValue),
    isDevMode: process.env.AWS_PROFILE === "dev",
    hasDevNotificationOverride: Boolean(process.env.SES_DEV_NOTIFICATION_EMAIL),
  });

  if (!mailFrom) {
    log("ERROR", "sendFormSubmissionEmails.missing_mail_from", {
      referenceNumber: correlationRef,
      hint: "Set the MAIL_FROM environment variable to a verified SES sender address and redeploy",
    });
    throw new Error(
      "MAIL_FROM environment variable is required but not configured"
    );
  }

  const {
    applicantEmail,
    formData,
    formName,
    notificationEmail,
    referenceNumber,
  } = parsed.data;

  // ── 4. Render email templates ─────────────────────────────────────────────

  const submissionRows = flattenDataForEmail(formData as JsonValue);

  log("INFO", "sendFormSubmissionEmails.rendering_templates", {
    referenceNumber,
    willSendConfirmation: Boolean(applicantEmail),
    submissionRowCount: submissionRows.length,
  });

  const confirmationHtml = await render(
    <FormSubmissionConfirmationEmail
      formName={formName}
      referenceNumber={referenceNumber}
    />
  );

  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Barbados",
  });

  const notificationHtml = await render(
    <FormSubmissionNotificationEmail
      applicantEmail={applicantEmail}
      formName={formName}
      referenceNumber={referenceNumber}
      submissionRows={submissionRows}
      submittedAt={submittedAt}
    />
  );

  log("INFO", "sendFormSubmissionEmails.templates_rendered", {
    referenceNumber,
    confirmationHtmlBytes: confirmationHtml.length,
    notificationHtmlBytes: notificationHtml.length,
  });

  // ── 5. Resolve notification recipient ─────────────────────────────────────

  const isDevMode = process.env.AWS_PROFILE === "dev";

  if (isDevMode && !process.env.SES_DEV_NOTIFICATION_EMAIL) {
    throw new Error(
      "SES_DEV_NOTIFICATION_EMAIL must be set when AWS_PROFILE=dev. " +
        "Add it to your .env.local to redirect notification emails to a safe test address."
    );
  }

  const resolvedNotificationEmail = isDevMode
    ? (process.env.SES_DEV_NOTIFICATION_EMAIL as string)
    : notificationEmail;

  if (isDevMode) {
    log("WARN", "sendFormSubmissionEmails.dev_email_override", {
      referenceNumber,
      originalRecipient: maskEmail(notificationEmail),
      overriddenTo: maskEmail(resolvedNotificationEmail),
      hint: "Notification email is being redirected because AWS_PROFILE=dev",
    });
  }

  // ── 6. Queue send tasks ───────────────────────────────────────────────────

  const sendTasks: { label: string; promise: Promise<void> }[] = [];

  if (applicantEmail) {
    log("INFO", "sendFormSubmissionEmails.queuing_confirmation", {
      referenceNumber,
      recipient: maskEmail(applicantEmail),
    });
    sendTasks.push({
      label: `confirmation to ${applicantEmail}`,
      promise: sendEmail({
        to: applicantEmail,
        subject: `${formName} application received (${referenceNumber})`,
        html: confirmationHtml,
        referenceNumber,
      }),
    });
  } else {
    log("WARN", "sendFormSubmissionEmails.skipping_confirmation", {
      referenceNumber,
      reason:
        "No applicant email address was provided — confirmation email will not be sent",
    });
  }

  if (resolvedNotificationEmail) {
    log("INFO", "sendFormSubmissionEmails.queuing_notification", {
      referenceNumber,
      recipient: maskEmail(resolvedNotificationEmail),
    });
    sendTasks.push({
      label: `staff notification to ${resolvedNotificationEmail}`,
      promise: sendEmail({
        to: resolvedNotificationEmail,
        subject: `New submission: ${formName} (${referenceNumber})`,
        html: notificationHtml,
        referenceNumber,
      }),
    });
  } else {
    log("WARN", "sendFormSubmissionEmails.skipping_notification", {
      referenceNumber,
      reason:
        "No notification email address configured — MDA will not be notified",
    });
  }

  if (sendTasks.length === 0) {
    log("WARN", "sendFormSubmissionEmails.no_emails_sent", {
      referenceNumber,
      reason:
        "Both applicantEmail and notificationEmail are absent — no emails were sent",
    });
  }

  // ── 7. Dispatch ───────────────────────────────────────────────────────────

  const results = await Promise.allSettled(
    sendTasks.map((task) => task.promise)
  );

  const failures = results
    .map((result, index) => ({ result, task: sendTasks[index] }))
    .filter(({ result }) => result.status === "rejected");

  if (failures.length > 0) {
    const failedLabels = failures.map(({ task }) => task?.label).join(", ");
    const errors = failures.map(
      ({ result }) => (result as PromiseRejectedResult).reason
    );

    log("ERROR", "sendFormSubmissionEmails.ses_error", {
      referenceNumber,
      failedLabels,
      sesRegion,
      configurationSet: configurationSet ?? "(none)",
      hint: "Verify the SES sender identity, IAM permissions (ses:SendEmail), and that the region matches your verified domain",
      durationMs: Date.now() - actionStart,
    });

    console.error(
      `[send-form-submission-emails] Failed to send email(s) for "${formName}" (${referenceNumber}): ${failedLabels}`,
      errors
    );

    for (const { result, task } of failures) {
      Sentry.captureException((result as PromiseRejectedResult).reason, {
        extra: {
          formName,
          referenceNumber,
          emailType: task?.label,
        },
      });
    }

    return {
      success: false as const,
      error: `Failed to send email(s): ${failedLabels}. Please try again.`,
    };
  }

  // ── 8. Done ───────────────────────────────────────────────────────────────

  log("INFO", "sendFormSubmissionEmails.complete", {
    referenceNumber,
    formName,
    emailsSent: sendTasks.length,
    durationMs: Date.now() - actionStart,
  });

  return {
    success: true as const,
  };
}
