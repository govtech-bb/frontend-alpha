export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";
import { logError } from "@/lib/logger";
import { getPaymentProvider, isValidServiceType } from "@/lib/payment";
import { generateEncodedReferenceId } from "@/lib/payment/reference-encoder";

/**
 * POST /api/payment/initiate
 * Initiates payment with configured payment gateway
 *
 * Request Body:
 *   - referenceNumber: string (UUID from client for sessionStorage lookup)
 *   - serviceType: string (e.g., 'passport-replacement')
 *   - email: string
 *   - name: string
 *
 * Security Note:
 *   Amount and description are NEVER sent from client
 *   Server looks them up from config based on serviceType
 *
 * Reference ID Strategy:
 *   - Client provides a UUID for sessionStorage tracking
 *   - Server generates an encoded reference ID (base64url(returnURL) + "." + clientUUID)
 *   - This allows stateless callback handling across multiple environments
 *
 * Returns:
 *   - paymentUrl: string (redirect user here)
 *   - referenceNumber: string (client's original UUID for sessionStorage)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referenceNumber, serviceType, email, name } = body;

    // Validate required fields
    if (!(referenceNumber && serviceType && email && name)) {
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

    // Generate encoded reference ID with return URL embedded
    // Format: base64url(returnURL) + "." + clientUUID
    // This allows EZPay callback to know which environment to return to
    // We use the client's referenceNumber to maintain sessionStorage compatibility
    const encodedReferenceId = generateEncodedReferenceId(referenceNumber);

    // Get payment provider (EZPay or Mock based on environment)
    const provider = getPaymentProvider();

    // Initiate payment - provider handles all gateway-specific logic
    const result = await provider.initiatePayment({
      referenceId: encodedReferenceId,
      serviceType,
      email,
      customerName: name,
    });

    return NextResponse.json(
      {
        paymentUrl: result.redirectUrl,
        referenceNumber: referenceNumber, // Return client's UUID for sessionStorage lookup
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
