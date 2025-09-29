import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { type NextRequest, NextResponse } from "next/server";

// Create AWS SES v2 client using Amplify's SSR compute role
const sesClient = new SESv2Client({
  region: process.env.SES_REGION || "us-east-1", // no credentials block - use runtime role
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
  const from = process.env.MAIL_FROM!; // must be within a verified SES identity
  // biome-ignore lint/suspicious/noConsole: needed for debugging email issues in production
  console.log("email args", to, from, subject, html);

  const cmd = new SendEmailCommand({
    FromEmailAddress: from,
    Destination: { ToAddresses: [to] },
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
    const { visitReason, whatWentWrong } = body;

    // Validate required fields
    if (!(visitReason || whatWentWrong)) {
      return NextResponse.json(
        { error: "At least one feedback field is required" },
        { status: 400 }
      );
    }

    // biome-ignore lint/suspicious/noConsole: needed for debugging email issues in production
    console.log("Environment variables:", {
      SES_REGION: process.env.SES_REGION,
      MAIL_FROM: process.env.MAIL_FROM,
      FEEDBACK_TO_EMAIL: process.env.FEEDBACK_TO_EMAIL,
      NODE_ENV: process.env.NODE_ENV,
      // Check if any Amplify vars are available
      AWS_REGION: process.env.AWS_REGION,
      REGION: process.env.REGION,
      // Total count of env vars
      totalEnvVars: Object.keys(process.env).length,
    });

    // Email content
    const subject = "New Alpha Gov Feedback";
    const to = process.env.FEEDBACK_TO_EMAIL || "feedback@govtech.bb";
    const html = `
        <h2>New Alpha Government Feedback</h2>
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
    // biome-ignore lint/suspicious/noConsole: needed for debugging email issues in production
    console.error("Error sending feedback:", error);
    return NextResponse.json(
      { error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
