import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { type NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer";

// Email validation regex at top level for performance
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const { name, email, feedback } = body;

    // Validate required fields
    if (!(name && email && feedback)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Email content
    const mailOptions = {
      from: `"Alpha Gov Feedback" <${process.env.SES_FROM_EMAIL || "noreply@dharach.com"}>`,
      to: "matt@dharach.com",
      subject: `New Feedback from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Feedback:
${feedback}
      `,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${feedback.replace(/\n/g, "<br>")}
        </div>
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
