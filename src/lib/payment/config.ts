import type { PaymentServiceConfig } from "./types";

/**
 * Payment Service Type Constants
 * Use these constants instead of string literals
 */
export const SERVICE_TYPES = {
  PASSPORT_REPLACEMENT: "passport-replacement",
} as const;

/**
 * Payment Configuration Registry
 * SINGLE SOURCE OF TRUTH for all payment services
 *
 * To add a new payment-enabled service:
 * 1. Add entry to SERVICE_TYPES constant above
 * 2. Add entry here with code, amount, description
 * 3. Set environment variable for payment code (optional)
 * 4. Service is immediately available
 */
export const PAYMENT_CONFIGS: Record<string, PaymentServiceConfig> = {
  [SERVICE_TYPES.PASSPORT_REPLACEMENT]: {
    code: process.env.EZPAY_PASSPORT_CODE || "PASSPORT001",
    amount: 150.0,
    description: "Passport Replacement",
    requiresVerification: true,
  },
  // Future services:
  // 'birth-certificate': {
  //   code: process.env.EZPAY_BIRTH_CERT_CODE || 'BIRTH001',
  //   amount: 25.00,
  //   description: 'Birth Certificate Copy',
  //   requiresVerification: true,
  // },
  // 'business-license': {
  //   code: process.env.EZPAY_BUSINESS_LICENSE_CODE || 'BIZ001',
  //   amount: 500.00,
  //   description: 'Business License Application',
  //   requiresVerification: true,
  // },
} as const;

export type ServiceType = keyof typeof PAYMENT_CONFIGS;

/**
 * Get payment configuration for a service
 * Returns null if service type doesn't exist
 */
export function getPaymentConfig(
  serviceType: string
): PaymentServiceConfig | null {
  return PAYMENT_CONFIGS[serviceType] || null;
}

/**
 * Type guard for service type validation
 * Use for runtime checks before accessing config
 */
export function isValidServiceType(
  serviceType: string
): serviceType is ServiceType {
  return serviceType in PAYMENT_CONFIGS;
}
