/**
 * EZPay+ API Client
 * Type-safe wrapper for EZPay payment gateway
 * Note: This is now an internal implementation detail used by EzPayProvider
 */

import type {
  EzPayCartItem,
  EzPayInitResponse,
  EzPayTransactionStatus,
} from "./types";
import { logDev, logWarn } from "@/lib/logger";

// Get EZPay configuration from environment
const EZPAY_API_URL = process.env.EZPAY_API_URL || "";
const EZPAY_API_KEY = process.env.EZPAY_API_KEY || "";

if (!EZPAY_API_URL || !EZPAY_API_KEY) {
  logWarn(
    "EZPay environment variables not configured. Payment features will not work."
  );
}

/**
 * Initialize payment with EZPay
 * Returns a token to redirect user to payment gateway
 */
export async function initiatePayment(params: {
  cartItems: EzPayCartItem[];
  email: string;
  name: string;
  referenceNumber: string;
}): Promise<EzPayInitResponse> {
  const { cartItems, email, name, referenceNumber } = params;

  // Log payment initiation details only in development (contains PII: email, name)
  logDev("🔵 EZPay Payment Initiation:");
  logDev("  Reference Number:", referenceNumber);
  logDev("  Email:", email);
  logDev("  Name:", name);
  logDev("  Note: Return URL must be configured in EZPay admin panel");

  // CRITICAL: EZPay requires cart items as a JSON string in form data
  const formData = new URLSearchParams();
  formData.append("ez_cart_array", JSON.stringify(cartItems));
  formData.append("ez_reference_email", email);
  formData.append("ez_reference_name", name);
  formData.append("ez_reference_number", referenceNumber);
  formData.append("ez_allow_credit", "true");
  formData.append("ez_allow_debit", "true");
  formData.append("ez_allow_payce", "true");

  logDev("  Form Data:", Object.fromEntries(formData.entries()));

  const response = await fetch(`${EZPAY_API_URL}/ezpay_receivecart`, {
    method: "POST",
    headers: {
      EZPluginKey: EZPAY_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `EZPay initiation failed: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data as EzPayInitResponse;
}

/**
 * Verify payment status with EZPay
 * Call this after user returns from payment gateway
 */
export async function verifyPayment(params: {
  transactionNumber?: string;
  reference?: string;
}): Promise<EzPayTransactionStatus> {
  const { transactionNumber, reference } = params;

  if (!transactionNumber && !reference) {
    throw new Error(
      "Either transactionNumber or reference must be provided for verification"
    );
  }

  const formData = new URLSearchParams();
  if (transactionNumber) {
    formData.append("transaction_number", transactionNumber);
  }
  if (reference) {
    formData.append("reference", reference);
  }

  const response = await fetch(`${EZPAY_API_URL}/check_api`, {
    method: "POST",
    headers: {
      EZPluginKey: EZPAY_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `EZPay verification failed: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  return data as EzPayTransactionStatus;
}

/**
 * Get the payment page URL for redirecting users
 */
export function getPaymentPageUrl(token: string): string {
  return `${EZPAY_API_URL}/payment_page?token=${token}`;
}
