export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";
import { getPaymentProvider, isValidServiceType } from "@/lib/payment";
import { logError } from "@/lib/logger";

/**
 * POST /api/payment/initiate
 * Initiates payment with configured payment gateway
 *
 * Request Body:
 *   - referenceNumber: string (UUID)
 *   - serviceType: string (e.g., 'passport-replacement')
 *   - email: string
 *   - name: string
 *
 * Security Note:
 *   Amount and description are NEVER sent from client
 *   Server looks them up from config based on serviceType
 *
 * Returns:
 *   - paymentUrl: string (redirect user here)
 *   - referenceNumber: string (confirmation)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referenceNumber, serviceType, email, name } = body;

    // Validate required fields
    if (!referenceNumber || !serviceType || !email || !name) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: referenceNumber, serviceType, email, name",
        },
        { status: 400 }
      );
    }

    // Validate service type exists in configuration
    // This also ensures amount/description are configured
    if (!isValidServiceType(serviceType)) {
      return NextResponse.json(
        {
          message: `Invalid service type: ${serviceType}`,
        },
        { status: 400 }
      );
    }

    // Get payment provider (EZPay or Mock based on environment)
    const provider = getPaymentProvider();

    // Initiate payment - provider handles all gateway-specific logic
    const result = await provider.initiatePayment({
      referenceId: referenceNumber,
      serviceType,
      email,
      customerName: name,
    });

    return NextResponse.json(
      {
        paymentUrl: result.redirectUrl,
        referenceNumber: result.referenceId,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error without exposing PII in production
    logError("Error initiating payment", error);

    return NextResponse.json(
      {
        message: "Failed to initiate payment. Please try again.",
      },
      { status: 500 }
    );
  }
}
