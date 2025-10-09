export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";
import { getFormConfig, isValidFormType } from "@/config/forms";
import { sendFormSubmissionEmail } from "@/lib/email";

/**
 * Generic form submission endpoint
 * Accepts form data and sends it via email to the configured recipient
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, formData } = body;

    // Validate request body
    if (!formType || typeof formType !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid formType" },
        { status: 400 }
      );
    }

    if (!formData || typeof formData !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid formData" },
        { status: 400 }
      );
    }

    // Validate form type
    if (!isValidFormType(formType)) {
      return NextResponse.json(
        { error: `Unknown form type: ${formType}` },
        { status: 400 }
      );
    }

    // Get form configuration (includes recipient email)
    const formConfig = getFormConfig(formType);

    // Send email
    await sendFormSubmissionEmail(formConfig, formData);

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        formType,
      },
      { status: 200 }
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: needed for debugging in production
    console.error("Error submitting form:", error);

    // Check if it's a configuration error
    if (error instanceof Error && error.message.includes("recipient email")) {
      return NextResponse.json(
        { error: "Form submission not configured. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit form. Please try again later." },
      { status: 500 }
    );
  }
}
