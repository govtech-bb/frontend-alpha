"use server";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { render } from "@react-email/render";
import { z } from "zod";
import { FormSubmissionConfirmationEmail } from "@/emails/form-submission-confirmation-email";
import { FormSubmissionNotificationEmail } from "@/emails/form-submission-notification-email";
import type { JsonValue } from "@/types";

const sesRegion = process.env.SES_REGION ?? "us-east-1";
const mailFrom = process.env.MAIL_FROM as string;
if (!mailFrom) {
  throw new Error("MAIL_FROM environment variable is required");
}

const configurationSet = process.env.SES_CONFIGURATION_SET;
const tagKey = process.env.SES_TAG_KEY;
const tagValue = process.env.SES_TAG_VALUE;

const sesClient = new SESv2Client({
  region: sesRegion,
});

const submissionEmailPayloadSchema = z.object({
  formName: z.string().min(1),
  referenceNumber: z.string().min(1),
  formData: z.record(z.string(), z.unknown()),
  applicantEmail: z.string().email().nullable(),
  notificationEmail: z.string().email().nullable(),
});

type SubmissionEmailPayload = z.infer<typeof submissionEmailPayloadSchema>;

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

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const command = new SendEmailCommand({
    FromEmailAddress: mailFrom,
    Destination: { ToAddresses: [to] },
    ...(configurationSet && {
      ConfigurationSetName: configurationSet,
      EmailTags: [{ Name: tagKey, Value: tagValue }],
    }),
    Content: {
      Simple: {
        Subject: { Data: subject },
        Body: { Html: { Data: html } },
      },
    },
  });

  await sesClient.send(command);
}

export async function sendFormSubmissionEmails(
  payload: SubmissionEmailPayload
) {
  const parsed = submissionEmailPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    console.error(
      "Invalid form submission email payload",
      parsed.error.flatten()
    );
    return {
      success: false as const,
      error: "Invalid email payload",
    };
  }

  const {
    applicantEmail,
    formData,
    formName,
    notificationEmail,
    referenceNumber,
  } = parsed.data;

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
      submissionRows={flattenDataForEmail(formData as JsonValue)}
      submittedAt={submittedAt}
    />
  );

  // In dev, route MDA notifications to a safe inbox. Default matches verified SES identity.
  const devNotificationOverride =
    process.env.SES_DEV_NOTIFICATION_EMAIL?.trim() || "testing@govtech.bb";
  const resolvedNotificationEmail =
    process.env.AWS_PROFILE === "dev"
      ? devNotificationOverride
      : notificationEmail;

  const sendTasks: Promise<unknown>[] = [];

  if (applicantEmail) {
    sendTasks.push(
      sendEmail({
        to: applicantEmail,
        subject: `${formName} application received (${referenceNumber})`,
        html: confirmationHtml,
      })
    );
  }

  if (resolvedNotificationEmail) {
    sendTasks.push(
      sendEmail({
        to: resolvedNotificationEmail,
        subject: `New submission: ${formName} (${referenceNumber})`,
        html: notificationHtml,
      })
    );
  }

  await Promise.all(sendTasks);

  return {
    success: true as const,
  };
}
