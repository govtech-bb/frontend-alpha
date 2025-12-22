import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPayment } from "@/lib/ezpay/ezpay-service";

// Validation schema
const verifyPaymentSchema = z.object({
  transactionNumber: z.string().optional(),
  reference: z.string().optional(),
});

const handleValidationError = (error: z.ZodError) =>
  NextResponse.json(
    { success: false, error: "Validation error", details: error.issues },
    { status: 400 }
  );

const handleServerError = (error: unknown) =>
  NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    },
    { status: 500 }
  );

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const parseResult = verifyPaymentSchema.safeParse(body);

    if (!parseResult.success) {
      return handleValidationError(parseResult.error);
    }

    const validatedData = parseResult.data;

    // Ensure at least one parameter is provided
    if (!(validatedData.transactionNumber || validatedData.reference)) {
      return NextResponse.json(
        {
          success: false,
          error: "Either transactionNumber or reference is required",
        },
        { status: 400 }
      );
    }

    const result = await verifyPayment({
      transactionNumber: validatedData.transactionNumber,
      reference: validatedData.reference,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleServerError(error);
  }
}
