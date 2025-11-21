export const runtime = "nodejs";

import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { birthRegistrationSchema } from "@/components/forms/register-birth/schema";
import { DepartmentNotificationEmail } from "@/emails/department-notification-email";
import { UserReceiptEmail } from "@/emails/user-receipt-email";
import { sendEmail } from "@/lib/email/email-service";

// Recipient for birth registration submissions
const birthRegistrationToEmail =
  process.env.BIRTH_REGISTRATION_TO_EMAIL || "matt@dharach.com";

// Helper to get formatted Barbados datetime
function getBarbadosDateTime(): string {
  return new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body using Zod schema
    const validationResult = birthRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      // biome-ignore lint/suspicious/noConsole: needed for debugging validation errors in production
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
        // TEMPORARY OVERRIDE FOR TESTING: Sending to configured email instead of user's email
        to: birthRegistrationToEmail,
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
    // biome-ignore lint/suspicious/noConsole: needed for debugging email issues in production
    console.error("Error submitting birth registration:", error);
    return NextResponse.json(
      { message: "Failed to submit birth registration" },
      { status: 500 }
    );
  }
}
