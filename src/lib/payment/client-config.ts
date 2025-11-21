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
 *
 * NOTE: Configuration is derived from server-side config at build time
 * to maintain a single source of truth.
 */

import { PAYMENT_CONFIGS } from "./config";

export interface PublicPaymentConfig {
  amount: number;
  description: string;
  currency: string;
}

/**
 * Get public payment configuration for display in client components
 * Derives safe configuration from server-side config
 * Returns null if service type doesn't exist
 */
export function getPublicPaymentConfig(
  serviceType: string
): PublicPaymentConfig | null {
  const serverConfig = PAYMENT_CONFIGS[serviceType];
  if (!serverConfig) {
    return null;
  }

  // Extract only public-safe information
  return {
    amount: serverConfig.amount,
    description: serverConfig.description,
    currency: "BBD", // Default currency for Barbados
  };
}
