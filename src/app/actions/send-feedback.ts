"use server";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { z } from "zod";
import { SITE_URL } from "@/lib/site-url";

// Get required environment variables with explicit error handling
const region = process.env.SES_REGION ?? "us-east-1";

const mailFrom = process.env.MAIL_FROM as string;
if (!mailFrom) {
  throw new Error("MAIL_FROM environment variable is required");
}

const feedbackToEmail = process.env.FEEDBACK_TO_EMAIL as string;
if (!feedbackToEmail) {
  throw new Error("FEEDBACK_TO_EMAIL environment variable is required");
}

// Optional CloudWatch telemetry configuration
const configurationSet = process.env.SES_CONFIGURATION_SET;
const tagKey = process.env.SES_TAG_KEY ?? "ses:configuration-set";
const tagValue = process.env.SES_TAG_VALUE ?? "prod";

// Create AWS SES v2 client using Amplify's SSR compute role
const sesClient = new SESv2Client({
  region,
});

const FeedbackSchema = z
  .object({
    visitReason: z.string(),
    whatWentWrong: z.string(),
    referrer: z.string(),
  })
  .refine((data) => data.visitReason.trim() || data.whatWentWrong.trim(), {
    message: "At least one feedback field is required",
    path: ["visitReason"],
  });

export type FeedbackState = {
  error: string | null;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const cmd = new SendEmailCommand({
    FromEmailAddress: mailFrom,
    Destination: { ToAddresses: [to] },
    ...(configurationSet && {
      ConfigurationSetName: configurationSet,
      EmailTags: [
        {
          Name: tagKey,
          Value: tagValue,
        },
      ],
    }),
    Content: {
      Simple: {
        Subject: { Data: subject },
        Body: { Html: { Data: html } },
      },
    },
  });
  await sesClient.send(cmd);
}

export async function sendFeedback(
  _prev: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const parsed = FeedbackSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key] = issue.message;
      }
    }
    return { error: null, fieldErrors };
  }

  const { visitReason, whatWentWrong, referrer } = parsed.data;

  const subject = "alpha.gov.bb Feedback";
  const to = feedbackToEmail;
  const referrerUrl = referrer ? new URL(referrer, SITE_URL).toString() : null;
  const html = [
    referrerUrl &&
      `<p><strong>Page:</strong> <a href="${referrerUrl}">${referrerUrl}</a></p>`,
    `<p><strong>Why did you visit alpha.gov.bb?</strong></p><p>${visitReason.replace(/\n/g, "<br>")}</p>`,
    `<p><strong>What went wrong?</strong></p><p>${whatWentWrong.replace(/\n/g, "<br>")}</p>`,
    "<hr><p><em>Sent from alpha.gov.bb Feedback Form</em></p>",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendEmail({ to, subject, html });
  } catch (error) {
    console.error("Feedback email failed:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to send feedback",
    };
  }

  return { error: null, success: true };
}
