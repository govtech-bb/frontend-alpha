/**
 * Client-Safe Payment Configuration
 * Contains ONLY public information safe for browser exposure
 *
 * DO NOT include:
 * - API keys or secrets
 * - Internal codes
 * - process.env references
 *
 * This file is imported by client components and will be bundled
 * in the browser JavaScript.
 */

export interface PublicPaymentConfig {
  amount: number;
  description: string;
  currency: string;
}

/**
 * Public payment configurations safe for client-side use
 * Only includes display information
 */
export const PUBLIC_PAYMENT_CONFIGS: Record<string, PublicPaymentConfig> = {
  "passport-replacement": {
    amount: 150.0,
    description: "Passport Replacement",
    currency: "BBD",
  },
  // Future services can be added here
} as const;

/**
 * Get public payment configuration for display in client components
 * Returns null if service type doesn't exist
 */
export function getPublicPaymentConfig(
  serviceType: string
): PublicPaymentConfig | null {
  return PUBLIC_PAYMENT_CONFIGS[serviceType] || null;
}
