export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";
import { ydpCommunitySportsTrainingStorageSchema } from "@/components/forms/ydp-sports-training/schema";

// Helper to get formatted Barbados datetime
function getBarbadosDateTime(): string {
  return new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body using Zod schema
    const validationResult = ydpCommunitySportsTrainingStorageSchema.safeParse(body);

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

    // Get formatted submission datetime
    const submittedAt = getBarbadosDateTime();

    // Log submission for now (email functionality to be added later)
    // biome-ignore lint/suspicious/noConsole: needed for tracking submissions
    console.log("YDP Community Sports Training registration submitted:", {
      name: `${formData.firstName} ${formData.lastName}`,
      sport: formData.disciplineOfInterest,
      submittedAt,
    });

    // TODO: Implement email notifications
    // - Create email templates for department notification and user receipt
    // - Send notification to YDP department email
    // - Send confirmation email to applicant

    return NextResponse.json(
      { message: "YDP Community Sports Training registration submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: needed for debugging issues in production
    console.error("Error submitting YDP Community Sports Training registration:", error);
    return NextResponse.json(
      { message: "Failed to submit YDP Community Sports Training registration" },
      { status: 500 }
    );
  }
}
