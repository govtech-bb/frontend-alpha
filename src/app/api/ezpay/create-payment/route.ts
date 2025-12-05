import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createPayment,
  generateReferenceNumber,
  getPaymentPageUrl,
} from "@/lib/ezpay/ezpay-service";

// Validation schema
const cartItemSchema = z.object({
  code: z.string().min(1, "Payment code is required"),
  amount: z.number().positive("Amount must be positive"),
  details: z.string().min(1, "Details are required"),
  reference: z.string().min(1, "Reference is required"),
});

const createPaymentSchema = z.object({
  cartItems: z
    .array(cartItemSchema)
    .min(1, "At least one cart item is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerName: z.string().min(1, "Customer name is required"),
  allowCredit: z.boolean().optional(),
  allowDebit: z.boolean().optional(),
  allowPayce: z.boolean().optional(),
});

// type CreatePaymentBody = z.infer<typeof createPaymentSchema>;

const handleValidationError = (error: z.ZodError) =>
  NextResponse.json(
    { success: false, error: "Validation error", details: error.issues },
    { status: 400 }
  );

const handleServerError = (error: unknown) => {
  console.error("EZPay create payment error:", error);
  return NextResponse.json(
    { success: false, error: "Internal server error" },
    { status: 500 }
  );
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const parseResult = createPaymentSchema.safeParse(body);

    if (!parseResult.success) {
      return handleValidationError(parseResult.error);
    }

    const validatedData = parseResult.data;
    const referenceNumber = generateReferenceNumber();

    const result = await createPayment({
      cartItems: validatedData.cartItems,
      customerEmail: validatedData.customerEmail,
      customerName: validatedData.customerName,
      referenceNumber,
      allowCredit: validatedData.allowCredit,
      allowDebit: validatedData.allowDebit,
      allowPayce: validatedData.allowPayce,
    });

    if (result.token) {
      const paymentUrl = getPaymentPageUrl(result.token);

      return NextResponse.json({
        success: true,
        token: result.token,
        paymentUrl,
        referenceNumber,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: result.error ?? "Failed to create payment",
        code: result.code,
      },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleServerError(error);
  }
}
