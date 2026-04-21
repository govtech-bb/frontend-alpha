"use server";

import { SESv2Client } from "@aws-sdk/client-sesv2";
import { z } from "zod";
import { FormSubmissionConfirmationEmail } from "@/emails/form-submission-confirmation-email";
import { FormSubmissionNotificationEmail } from "@/emails/form-submission-notification-email";

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
// Every entry is emitted as a single JSON line via console.error so that
// CloudWatch captures it regardless of log stream. Use the `level` field
// when querying in CloudWatch Logs Insights.
//
// HOW TO FIND THESE LOGS IN AWS CLOUDWATCH
// ─────────────────────────────────────────
// 1. Open the AWS Console → CloudWatch → Log groups.
//
// 2. Find the log group for this app. On Amplify SSR it is typically:
//      /aws/amplify/<APP_ID>
//    If the Next.js server functions are deployed as individual Lambdas the
//    group will follow the pattern:
//      /aws/lambda/<FUNCTION_NAME>
//    You can confirm the exact name under:
//      AWS Console → Amplify → your app → Hosting → SSR logs
//
// 3. To search across all log streams open "Logs Insights" and run a query
//    against that log group. All examples below use the structured fields
//    emitted by the `log()` helper in this file.
//
// ── Useful CloudWatch Logs Insights queries ──────────────────────────────────
//
//  All errors from this service in the last hour:
//    fields @timestamp, event, errorMessage, referenceNumber
//    | filter service = "form-submission-emails" and level = "ERROR"
//    | sort @timestamp desc
//    | limit 50
//
//  Trace a single submission end-to-end by reference number:
//    fields @timestamp, level, event, durationMs, emailsSent
//    | filter service = "form-submission-emails"
//        and referenceNumber = "REF-XXXXXX"
//    | sort @timestamp asc
//
//  Find all SES failures and their error codes:
//    fields @timestamp, referenceNumber, errorMessage, errorCode, hint
//    | filter event = "sendFormSubmissionEmails.ses_error"
//    | sort @timestamp desc
//    | limit 100
//
//  Count submissions per form in the last 24 hours:
//    filter event = "sendFormSubmissionEmails.complete"
//    | stats count() as submissions by formName
//    | sort submissions desc
//
//  Spot missing configuration (MAIL_FROM / SES env vars):
//    fields @timestamp, event, hint
//    | filter event = "sendFormSubmissionEmails.missing_mail_from"
//        or event = "sendFormSubmissionEmails.config_check"
//    | sort @timestamp desc
//    | limit 50
//
// ─────────────────────────────────────────────────────────────────────────────

type LogLevel = "INFO" | "WARN" | "ERROR";

function log(
  level: LogLevel,
  event: string,
  fields?: Record<string, unknown>
): void {
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      service: "form-submission-emails",
      event,
      ...fields,
    })
  );
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

  const devNotificationOverride =
    process.env.SES_DEV_NOTIFICATION_EMAIL?.trim() || "testing@govtech.bb";
  const resolvedNotificationEmail =
    process.env.AWS_PROFILE === "dev"
      ? devNotificationOverride
      : notificationEmail;

  if (process.env.AWS_PROFILE === "dev") {
    log("WARN", "sendFormSubmissionEmails.dev_email_override", {
      referenceNumber,
      originalRecipient: maskEmail(notificationEmail),
      overriddenTo: maskEmail(resolvedNotificationEmail),
      hint: "Notification email is being redirected because AWS_PROFILE=dev",
    });
  }

  // ── 6. Queue send tasks ───────────────────────────────────────────────────

  const sendTasks: Promise<void>[] = [];

  if (applicantEmail) {
    log("INFO", "sendFormSubmissionEmails.queuing_confirmation", {
      referenceNumber,
      recipient: maskEmail(applicantEmail),
    });
    sendTasks.push(
      sendEmail({
        to: applicantEmail,
        subject: `${formName} application received (${referenceNumber})`,
        html: confirmationHtml,
        referenceNumber,
      })
    );
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
    sendTasks.push(
      sendEmail({
        to: resolvedNotificationEmail,
        subject: `New submission: ${formName} (${referenceNumber})`,
        html: notificationHtml,
        referenceNumber,
      })
    );
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

  try {
    await Promise.all(sendTasks);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code =
      error instanceof Error && "Code" in error
        ? (error as Record<string, unknown>).Code
        : undefined;

    log("ERROR", "sendFormSubmissionEmails.ses_error", {
      referenceNumber,
      errorMessage: message,
      errorCode: code,
      sesRegion,
      configurationSet: configurationSet ?? "(none)",
      hint: "Verify the SES sender identity, IAM permissions (ses:SendEmail), and that the region matches your verified domain",
      durationMs: Date.now() - actionStart,
    });

    throw new Error(
      "Email delivery failed. Please check your SES configuration and credentials."
    );
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
