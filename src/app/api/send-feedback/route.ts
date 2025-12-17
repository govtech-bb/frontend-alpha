export const runtime = "nodejs";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { type NextRequest, NextResponse } from "next/server";

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

// Send email using SES directly
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const from = mailFrom;

  const cmd = new SendEmailCommand({
    FromEmailAddress: from,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { visitReason, whatWentWrong, referrer } = body;

    // Validate required fields
    if (!(visitReason || whatWentWrong)) {
      return NextResponse.json(
        { error: "At least one feedback field is required" },
        { status: 400 }
      );
    }

    // Email content
    const subject = "New Alpha Gov Feedback";
    const to = feedbackToEmail;
    const html = `
        <h2>New Alpha Government Feedback</h2>
        ${
          referrer
            ? `
          <p><strong>Page:</strong> ${referrer}</p>
        `
            : ""
        }
        ${
          visitReason
            ? `
          <p><strong>Why did you visit alpha.gov.bb?</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${visitReason.replace(/\n/g, "<br>")}
          </div>
        `
            : ""
        }
        ${
          whatWentWrong
            ? `
          <p><strong>What went wrong?</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${whatWentWrong.replace(/\n/g, "<br>")}
          </div>
        `
            : ""
        }
        <hr>
        <p style="color: #666; font-size: 12px;">
          Sent from Alpha Government Services Feedback Form
        </p>
      `;

    // Send email using SES
    await sendEmail({ to, subject, html });

    return NextResponse.json(
      { message: "Feedback sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send feedback",
      },
      { status: 500 }
    );
  }
}
