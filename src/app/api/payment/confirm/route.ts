export const runtime = "nodejs";

import { render } from "@react-email/render";
import { type NextRequest, NextResponse } from "next/server";
import { passportReplacementSchema } from "@/components/forms/passport-replacement/schema";
import { PassportReplacementEmail } from "@/emails/passport-replacement-email";
import { sendEmail } from "@/lib/email/email-service";
import { logError } from "@/lib/logger";
import { getPaymentProvider } from "@/lib/payment";

// Get required environment variables
const passportDepartmentEmail =
  process.env.PASSPORT_DEPARTMENT_EMAIL || "matt@dharach.com";

// Helper to get formatted Barbados datetime
function getBarbadosDateTime(): string {
  return new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" });
}

/**
 * POST /api/payment/confirm
 * Confirms payment and sends notification email
 * Called from client after successful payment callback
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, referenceId, formData } = body;

    // Validate required fields
    if (!(transactionId && referenceId && formData)) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: transactionId, referenceId, formData",
        },
        { status: 400 }
      );
    }

    // Validate form data against schema
    const validationResult = passportReplacementSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid form data",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // Get payment provider and verify payment
    const provider = getPaymentProvider();
    const paymentResult = await provider.verifyPayment({
      transactionId,
      referenceId,
    });

    // Check if payment was successful
    if (!paymentResult.success) {
      return NextResponse.json(
        {
          message: "Payment not confirmed",
          status: paymentResult.status,
        },
        { status: 400 }
      );
    }

    // Get formatted submission datetime
    const submittedAt = getBarbadosDateTime();

    // Send department notification email with payment confirmation
    const departmentSubject = `Passport Replacement Application - ${validationResult.data.fullName} - PAID`;
    const departmentHtml = await render(
      PassportReplacementEmail({
        formData: validationResult.data,
        submittedAt,
        transactionNumber: paymentResult.transactionId,
        amountPaid: paymentResult.amount,
        paymentProcessor: paymentResult.processor || "Unknown",
      })
    );

    await sendEmail({
      to: passportDepartmentEmail,
      subject: departmentSubject,
      html: departmentHtml,
    });

    return NextResponse.json(
      {
        message: "Payment confirmed and notification sent",
        transactionNumber: paymentResult.transactionId,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error without exposing PII in production
    logError("Error confirming payment", error);

    // Always return generic error message to avoid leaking internal details
    return NextResponse.json(
      {
        message: "Failed to confirm payment. Please contact support.",
      },
      { status: 500 }
    );
  }
}
