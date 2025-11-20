import { getPaymentConfig } from "../config";
import type {
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentProvider,
  PaymentVerificationRequest,
  PaymentVerificationResult,
} from "../types";

/**
 * Mock Payment Provider for Development
 * Simulates payment gateway without external API calls
 */
export class MockPaymentProvider implements PaymentProvider {
  readonly name = "Mock Payment Gateway";

  async initiatePayment(
    request: PaymentInitiationRequest
  ): Promise<PaymentInitiationResult> {
    // Validate configuration exists
    const config = getPaymentConfig(request.serviceType);
    if (!config) {
      throw new Error(
        `No payment configuration found for service: ${request.serviceType}`
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Return mock payment page URL
    return {
      redirectUrl: `/payment/mock?token=${request.referenceId}`,
      token: request.referenceId,
      referenceId: request.referenceId,
    };
  }

  async verifyPayment(
    request: PaymentVerificationRequest
  ): Promise<PaymentVerificationResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Check for mock failure simulation via transaction ID pattern
    // If transaction ID contains "FAIL", simulate a failed payment
    const isMockFailure = request.transactionId.includes("FAIL");
    const isInitiated = request.transactionId.includes("PENDING");

    let status: "Success" | "Failed" | "Initiated" | "Cancelled" = "Success";
    if (isMockFailure) {
      status = "Failed";
    } else if (isInitiated) {
      status = "Initiated";
    }

    // TODO: Amount is hardcoded because verifyPayment doesn't know the serviceType.
    // In a real implementation, the payment gateway returns the actual amount paid.
    // For now, this matches the only configured service (passport-replacement: $150)
    return {
      success: status === "Success",
      status,
      transactionId: request.transactionId,
      referenceId: request.referenceId,
      amount: "150.00", // Matches PAYMENT_CONFIGS["passport-replacement"].amount
      processor: "Mock Credit Card",
      settlementDate: new Date().toISOString(),
    };
  }
}
