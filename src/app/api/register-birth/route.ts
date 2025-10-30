export const runtime = "nodejs";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { type NextRequest, NextResponse } from "next/server";
import type { PartialBirthRegistrationFormData } from "@/components/forms/register-birth/types";

// Get required environment variables with explicit error handling
const region = process.env.SES_REGION ?? "us-east-1";

const mailFrom = process.env.MAIL_FROM as string;
if (!mailFrom) {
  throw new Error("MAIL_FROM environment variable is required");
}

// Hardcoded recipient for birth registration submissions
const birthRegistrationToEmail = "matt.hamilton@govtech.bb";

// Optional CloudWatch telemetry configuration
const configurationSet = process.env.SES_CONFIGURATION_SET;
const tagKey = process.env.SES_TAG_KEY ?? "ses:configuration-set";
const tagValue = process.env.SES_TAG_VALUE ?? "prod";

// Create AWS SES v2 client
const sesClient = new SESv2Client({
  region,
});

// Helper to format a person's details
function formatPersonDetails(
  person:
    | Partial<{
        firstName: string;
        middleName: string;
        lastName: string;
        hadOtherSurname: string;
        otherSurname: string;
        dateOfBirth: string;
        address: string;
        nationalRegistrationNumber: string;
        passportNumber: string;
        occupation: string;
      }>
    | undefined,
  label: string
): string {
  if (!person) return "";

  return `
    <h3 style="margin-top: 20px; color: #003087;">${label}</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${person.firstName ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>First name:</strong></td><td style="padding: 5px 10px;">${person.firstName}</td></tr>` : ""}
      ${person.middleName ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Middle name:</strong></td><td style="padding: 5px 10px;">${person.middleName}</td></tr>` : ""}
      ${person.lastName ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Last name:</strong></td><td style="padding: 5px 10px;">${person.lastName}</td></tr>` : ""}
      ${person.hadOtherSurname === "yes" && person.otherSurname ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Previous surname:</strong></td><td style="padding: 5px 10px;">${person.otherSurname}</td></tr>` : ""}
      ${person.dateOfBirth ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Date of birth:</strong></td><td style="padding: 5px 10px;">${person.dateOfBirth}</td></tr>` : ""}
      ${person.address ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Address:</strong></td><td style="padding: 5px 10px;">${person.address}</td></tr>` : ""}
      ${person.nationalRegistrationNumber ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>National registration number:</strong></td><td style="padding: 5px 10px;">${person.nationalRegistrationNumber}</td></tr>` : ""}
      ${person.passportNumber ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Passport number:</strong></td><td style="padding: 5px 10px;">${person.passportNumber}</td></tr>` : ""}
      ${person.occupation ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Occupation:</strong></td><td style="padding: 5px 10px;">${person.occupation}</td></tr>` : ""}
    </table>
  `;
}

// Helper to format child details
function formatChildDetails(
  child:
    | Partial<{
        firstNames: string;
        middleNames: string;
        lastName: string;
        dateOfBirth: string;
        sexAtBirth: string;
        parishOfBirth: string;
      }>
    | undefined
): string {
  if (!child) return "";

  return `
    <h3 style="margin-top: 20px; color: #003087;">Child's Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${child.firstNames ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>First name(s):</strong></td><td style="padding: 5px 10px;">${child.firstNames}</td></tr>` : ""}
      ${child.middleNames ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Middle name(s):</strong></td><td style="padding: 5px 10px;">${child.middleNames}</td></tr>` : ""}
      ${child.lastName ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Last name:</strong></td><td style="padding: 5px 10px;">${child.lastName}</td></tr>` : ""}
      ${child.dateOfBirth ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Date of birth:</strong></td><td style="padding: 5px 10px;">${child.dateOfBirth}</td></tr>` : ""}
      ${child.sexAtBirth ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Sex at birth:</strong></td><td style="padding: 5px 10px;">${child.sexAtBirth}</td></tr>` : ""}
      ${child.parishOfBirth ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Parish of birth:</strong></td><td style="padding: 5px 10px;">${child.parishOfBirth}</td></tr>` : ""}
    </table>
  `;
}

// Create department notification email (comprehensive data dump)
function createDepartmentEmail(
  formData: PartialBirthRegistrationFormData
): string {
  const marriageStatusText =
    formData.marriageStatus === "yes"
      ? "Married"
      : formData.marriageStatus === "no"
        ? "Not married"
        : "Not specified";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #003087;
          border-bottom: 3px solid #FFB71B;
          padding-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <h1>New Birth Registration Submission</h1>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" })}</p>

      <h2 style="margin-top: 30px; color: #003087;">Marriage Status</h2>
      <p><strong>${marriageStatusText}</strong></p>

      ${formatPersonDetails(formData.mother, "Mother's Details")}
      ${formData.father ? formatPersonDetails(formData.father, "Father's Details") : ""}
      ${formatChildDetails(formData.child)}

      <h3 style="margin-top: 20px; color: #003087;">Certificates Requested</h3>
      <p><strong>Number of certificates:</strong> ${formData.numberOfCertificates ?? 0}</p>

      <h3 style="margin-top: 20px; color: #003087;">Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${formData.email ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Email:</strong></td><td style="padding: 5px 10px;">${formData.email}</td></tr>` : ""}
        ${formData.wantContact === "yes" && formData.phoneNumber ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Phone number:</strong></td><td style="padding: 5px 10px;">${formData.phoneNumber}</td></tr>` : ""}
        ${formData.wantContact ? `<tr><td style="padding: 5px 10px; background-color: #f5f5f5;"><strong>Wants phone contact:</strong></td><td style="padding: 5px 10px;">${formData.wantContact === "yes" ? "Yes" : "No"}</td></tr>` : ""}
      </table>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">
      <p style="color: #666; font-size: 12px;">
        Sent from Government of Barbados Birth Registration Service<br>
        This email contains sensitive personal information - handle with care
      </p>
    </body>
    </html>
  `;
}

// Create user receipt email (friendly confirmation)
function createUserReceiptEmail(
  formData: PartialBirthRegistrationFormData
): string {
  const childName = formData.child?.firstNames
    ? `${formData.child.firstNames} ${formData.child.lastName || ""}`.trim()
    : "your child";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #003087;
          border-bottom: 3px solid #FFB71B;
          padding-bottom: 10px;
        }
        .info-box {
          background-color: #f0f7ff;
          border-left: 4px solid #003087;
          padding: 15px;
          margin: 20px 0;
        }
        .next-steps {
          background-color: #fff9e6;
          border-left: 4px solid #FFB71B;
          padding: 15px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <h1>Birth Registration Received</h1>

      <p>Dear ${formData.mother?.firstName || "Parent/Guardian"},</p>

      <p>Thank you for submitting your birth registration application for <strong>${childName}</strong>.</p>

      <div class="info-box">
        <h3 style="margin-top: 0;">What we received</h3>
        <p><strong>Date submitted:</strong> ${new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" })}</p>
        ${formData.child?.dateOfBirth ? `<p><strong>Child's date of birth:</strong> ${formData.child.dateOfBirth}</p>` : ""}
        <p><strong>Certificates requested:</strong> ${formData.numberOfCertificates ?? 0}</p>
      </div>

      <div class="next-steps">
        <h3 style="margin-top: 0;">What happens next</h3>
        <ol>
          <li><strong>Review:</strong> The Civil Registration Department will review your application</li>
          <li><strong>Verification:</strong> We may contact you if we need any additional information</li>
          <li><strong>Processing:</strong> Once approved, your birth certificate(s) will be prepared</li>
          <li><strong>Collection:</strong> We will notify you when your certificate(s) are ready for collection</li>
        </ol>
      </div>

      <h3>Processing time</h3>
      <p>Birth registrations are typically processed within <strong>5-10 business days</strong>. We will contact you if there are any delays or if we need additional information.</p>

      <h3>Questions?</h3>
      <p>If you have any questions about your application, please contact:</p>
      <ul>
        <li><strong>Email:</strong> ${birthRegistrationToEmail}</li>
        <li><strong>Phone:</strong> (246) 535-5000</li>
        <li><strong>Visit:</strong> General Register Office, Supreme Court, Whitepark Road, St. Michael</li>
      </ul>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">
      <p style="color: #666; font-size: 12px;">
        Government of Barbados - Civil Registration Department<br>
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </body>
    </html>
  `;
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
    const formData = body as PartialBirthRegistrationFormData;

    // Validate that we have at least basic data
    if (!(formData.mother && formData.child)) {
      return NextResponse.json(
        { error: "Mother and child information are required" },
        { status: 400 }
      );
    }

    // Send department notification email
    const departmentSubject =
      `New Birth Registration: ${formData.child.firstNames || ""} ${formData.child.lastName || ""}`.trim();
    const departmentHtml = createDepartmentEmail(formData);
    await sendEmail({
      to: birthRegistrationToEmail,
      subject: departmentSubject,
      html: departmentHtml,
    });

    // Send user receipt email if they provided an email address
    if (formData.email?.trim()) {
      const userSubject =
        "Birth Registration Received - Government of Barbados";
      const userHtml = createUserReceiptEmail(formData);
      await sendEmail({
        to: formData.email.trim(),
        subject: userSubject,
        html: userHtml,
      });
    }

    return NextResponse.json(
      { message: "Birth registration submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: needed for debugging email issues in production
    console.error("Error submitting birth registration:", error);
    return NextResponse.json(
      { error: "Failed to submit birth registration" },
      { status: 500 }
    );
  }
}
