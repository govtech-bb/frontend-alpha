import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { type NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";

// Create AWS SES v2 client
const sesClient = new SESv2Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Create reusable transporter object using Amazon SES
const transporter = createTransport({
  SES: { sesClient, SendEmailCommand },
});

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

    // Email content
    const mailOptions = {
      from: `"Alpha Gov Feedback" <${process.env.FEEDBACK_FROM_EMAIL || "noreply@example.com"}>`,
      to: `"Alpha Gov Feedback" <${process.env.FEEDBACK_TO_EMAIL || "noreply@example.com"}>`,
      subject: "New Alpha Gov Feedback",
      text: `
${visitReason ? `Why they visited:\n${visitReason}\n\n` : ""}${whatWentWrong ? `What went wrong:\n${whatWentWrong}` : ""}
      `,
      html: `
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
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Feedback sent successfully", messageId: info.messageId },
      { status: 200 }
    );
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
