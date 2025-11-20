import type { PaymentProvider } from "./types";
import { EzPayProvider } from "./providers/ezpay-provider";
import { MockPaymentProvider } from "./providers/mock-provider";

// Re-export all types and utilities for convenience
export * from "./types";
export * from "./config";

/**
 * Payment Provider Factory
 * Single control point for provider selection
 * Based on environment configuration
 *
 * Note: Creates a new provider instance on each call.
 * Providers are stateless, so this is safe and prevents
 * any shared state issues in serverless environments.
 */
export function getPaymentProvider(): PaymentProvider {
  const isMockMode = process.env.EZPAY_MOCK_MODE === "true";

  if (isMockMode) {
    return new MockPaymentProvider();
  }

  // Default to EZPay in production
  return new EzPayProvider();
}
