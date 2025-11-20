import {
  getPaymentPageUrl,
  initiatePayment,
  verifyPayment,
} from "@/lib/ezpay/client";
import type {
  PaymentProvider,
  PaymentInitiationRequest,
  PaymentInitiationResult,
  PaymentVerificationRequest,
  PaymentVerificationResult,
} from "../types";
import { getPaymentConfig } from "../config";

/**
 * EZPay+ Payment Gateway Provider
 * Adapter pattern wrapping existing EZPay client
 */
export class EzPayProvider implements PaymentProvider {
  readonly name = "EZPay+";

  async initiatePayment(
    request: PaymentInitiationRequest
  ): Promise<PaymentInitiationResult> {
    // Get configuration for service type (includes amount)
    const config = getPaymentConfig(request.serviceType);
    if (!config) {
      throw new Error(
        `No payment configuration found for service: ${request.serviceType}`
      );
    }

    // Map generic request to EZPay format
    const cartItem = {
      code: config.code,
      amount: config.amount, // From server config, NOT client
      details: config.description,
      reference: request.referenceId,
    };

    // Call existing EZPay client (unchanged)
    const { token } = await initiatePayment({
      cartItems: [cartItem],
      email: request.email,
      name: request.customerName,
      referenceNumber: request.referenceId,
    });

    // Map EZPay response to generic format
    return {
      redirectUrl: getPaymentPageUrl(token),
      token,
      referenceId: request.referenceId,
    };
  }

  async verifyPayment(
    request: PaymentVerificationRequest
  ): Promise<PaymentVerificationResult> {
    // Call existing EZPay verification (unchanged)
    const status = await verifyPayment({
      transactionNumber: request.transactionId,
      reference: request.referenceId,
    });

    // Translate EZPay-specific response to generic format
    return {
      success: status._status === "Success",
      status: status._status,
      transactionId: status._transaction_number,
      referenceId: status._reference,
      amount: status._amount,
      processor: status._processor,
      settlementDate: status._datesettled,
      metadata: {
        // Preserve EZPay-specific fields for debugging
        ezpayAccount: status._ezpay_account,
        paymentCode: status._pcode,
      },
    };
  }
}
