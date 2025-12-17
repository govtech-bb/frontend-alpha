export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for birth certificate request validation
const birthCertificateSchema = z.object({
  applicant: z.object({
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    addressLine1: z.string().min(5, "Address must be at least 5 characters"),
    addressLine2: z.string().optional(),
    parish: z.string().min(1, "Parish is required"),
    postalCode: z.string().optional(),
    idNumber: z.string().optional(),
    usePassportInstead: z.string().optional(),
    passportNumber: z.string().optional(),
  }),
  applyingForYourself: z.string().min(1, "Selection is required"),
  birthDetails: z.object({
    dateOfBirth: z.object({
      day: z.string().min(1, "Day is required"),
      month: z.string().min(1, "Month is required"),
      year: z.string().min(1, "Year is required"),
    }),
    placeOfBirth: z.string().min(2, "Place of birth is required"),
    placeOfBaptism: z.string().min(2, "Place of baptism is required"),
  }),
  parents: z.object({
    father: z.object({
      firstName: z.string().min(1, "Father's first name is required"),
      lastName: z.string().min(1, "Father's last name is required"),
    }),
    mother: z.object({
      firstName: z.string().min(1, "Mother's first name is required"),
      lastName: z.string().min(1, "Mother's last name is required"),
    }),
  }),
  order: z.object({
    numberOfCopies: z
      .number()
      .int()
      .min(1, "You must order at least 1 copy")
      .or(z.string().transform((val) => Number.parseInt(val, 10))),
  }),
});

// Helper to generate a random reference number
function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BC-${timestamp}-${random}`;
}

// Helper to get formatted Barbados datetime
function getBarbadosDateTime(): string {
  return new Date().toLocaleString("en-BB", { timeZone: "America/Barbados" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body using Zod schema
    const validationResult = birthCertificateSchema.safeParse(body);

    if (!validationResult.success) {
      // Return detailed validation errors
      const errorMessages = validationResult.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`
      );

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: errorMessages.map((msg) => ({ message: msg })),
        },
        { status: 400 }
      );
    }

    const _formData = validationResult.data;

    // Generate a reference number for tracking
    const referenceNumber = generateReferenceNumber();
    const submittedAt = getBarbadosDateTime();

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation emails
    // 3. Trigger any workflows
    // For now, we'll just return success

    return NextResponse.json(
      {
        success: true,
        message: "Birth certificate request submitted successfully",
        data: {
          submissionId: referenceNumber,
          submittedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit birth certificate request",
        errors: [
          {
            message:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
          },
        ],
      },
      { status: 500 }
    );
  }
}
