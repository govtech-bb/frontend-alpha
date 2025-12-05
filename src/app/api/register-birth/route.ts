export const runtime = "nodejs";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { birthRegistrationSchema } from "@/components/forms/register-birth/schema";
import { DepartmentNotificationEmail } from "@/emails/department-notification-email";
import { UserReceiptEmail } from "@/emails/user-receipt-email";

// Get required environment variables with explicit error handling
const region = process.env.SES_REGION ?? "us-east-1";

const mailFrom = process.env.MAIL_FROM as string;
if (!mailFrom) {
  throw new Error("MAIL_FROM environment variable is required");
}

// Hardcoded recipient for birth registration submissions
const birthRegistrationToEmail = "testing@govtech.bb";

// Optional CloudWatch telemetry configuration
const configurationSet = process.env.SES_CONFIGURATION_SET;
const tagKey = process.env.SES_TAG_KEY ?? "ses:configuration-set";
const tagValue = process.env.SES_TAG_VALUE ?? "prod";

// Create AWS SES v2 client
const sesClient = new SESv2Client({
  region,
});

// Helper to get formatted Barbados datetime
function getBarbadosDateTime(): string {
  return new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" });
}

// Send email using SES
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

    // Validate request body using Zod schema
    const validationResult = birthRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);

      // Return detailed validation errors
      const errorMessages = validationResult.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );

      return NextResponse.json(
        {
          message: "Validation failed",
          errors: errorMessages,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Additional runtime check (Zod schema allows optional fields)
    if (!(formData.mother && formData.child)) {
      return NextResponse.json(
        {
          message: "Mother and child information are required",
        },
        { status: 400 }
      );
    }

    // Get formatted submission datetime
    const submittedAt = getBarbadosDateTime();

    // Send emails - errors will propagate to outer catch
    // Send department notification email
    const departmentSubject =
      `New Birth Registration: ${formData.child?.firstNames || ""} ${formData.child?.lastName || ""}`.trim();
    const departmentHtml = await render(
      DepartmentNotificationEmail({
        formData,
        submittedAt,
      })
    );
    await sendEmail({
      to: birthRegistrationToEmail,
      subject: departmentSubject,
      html: departmentHtml,
    });

    // Send user receipt email if they provided an email address
    if (formData.email?.trim()) {
      const userSubject =
        "Birth Registration Received - Government of Barbados";
      const userHtml = await render(
        UserReceiptEmail({
          formData,
          submittedAt,
          departmentEmail: birthRegistrationToEmail,
        })
      );
      await sendEmail({
        // TEMPORARY OVERRIDE FOR TESTING: Sending to testing@govtech.bb instead of user's email
        to: "testing@govtech.bb",
        // to: formData.email.trim(), // Original - commented out for testing
        subject: userSubject,
        html: userHtml,
      });
    }

    return NextResponse.json(
      { message: "Birth registration submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting birth registration:", error);
    return NextResponse.json(
      { message: "Failed to submit birth registration" },
      { status: 500 }
    );
  }
}
