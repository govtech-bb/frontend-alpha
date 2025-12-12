import type {
  CreatePaymentParams,
  EZPayTokenResponse,
  EZPayTransaction,
  EZPayTransactionStatus,
  EZPayVerifyResponse,
  VerifyPaymentParams,
} from "./types";

// Configuration
type EZPayConfig = {
  apiKey: string;
  baseUrl: string;
};

const getConfig = (): EZPayConfig => {
  const apiKey = process.env.EZPAY_API_KEY;
  const baseUrl = process.env.EZPAY_BASE_URL;

  if (!apiKey) {
    throw new Error("EZPAY_API_KEY is not configured");
  }
  if (!baseUrl) {
    throw new Error("EZPAY_BASE_URL is not configured");
  }

  return { apiKey, baseUrl };
};

/**
 * Generate a unique process ID (20 characters)
 */
export const generateProcessId = (): string =>
  Date.now().toString() + Math.random().toString(36).substring(2, 12);

/**
 * Generate a unique reference number with optional form ID
 * Format: REF-{formId}-{timestamp}-{random} or REF-{timestamp}-{random}
 */
export const generateReferenceNumber = (formId?: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  if (formId) {
    // Encode form ID in reference: REF-{formId}-{timestamp}-{random}
    return `REF-${formId}-${timestamp}-${random}`;
  }

  return `REF-${timestamp}-${random}`;
};

/**
 * Parse form ID from reference number
 * Returns null if no form ID is encoded
 */
export const parseFormIdFromReference = (reference: string): string | null => {
  // Reference format: REF-{formId}-{timestamp}-{random}
  const parts = reference.split("-");

  if (parts.length >= 4 && parts[0] === "REF") {
    return parts[1]; // Return the form ID
  }

  return null;
};

/**
 * Get the payment page URL for a token
 */
export const getPaymentPageUrl = (token: string): string => {
  const { baseUrl } = getConfig();
  return `${baseUrl}/payment_page?token=${token}`;
};

/**
 * Build form data from an object
 */
const buildFormData = (data: Record<string, string>): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  return formData;
};

/**
 * Create a payment session and get a token
 */
export const createPayment = async (
  params: CreatePaymentParams
): Promise<EZPayTokenResponse> => {
  const { apiKey, baseUrl } = getConfig();

  const {
    cartItems,
    customerEmail,
    customerName,
    referenceNumber = generateReferenceNumber(),
    processId = generateProcessId(),
    allowCredit = true,
    allowDebit = true,
    allowPayce = true,
  } = params;

  const formData = buildFormData({
    ez_cart_array: JSON.stringify(cartItems),
    ez_process_id: processId,
    ez_reference_email: customerEmail,
    ez_reference_name: customerName,
    ez_reference_number: referenceNumber,
    ez_allow_credit: String(allowCredit),
    ez_allow_debit: String(allowDebit),
    ez_allow_payce: String(allowPayce),
  });

  const response = await fetch(`${baseUrl}/ezpay_receivecart`, {
    method: "POST",
    headers: {
      EZPluginKey: apiKey,
    },
    body: formData,
  });

  return response.json();
};

/**
 * Verify a payment by transaction number or reference
 */
export const verifyPayment = async (
  params: VerifyPaymentParams
): Promise<EZPayVerifyResponse> => {
  const { apiKey, baseUrl } = getConfig();

  if (!(params.transactionNumber || params.reference)) {
    throw new Error("Either transactionNumber or reference is required");
  }

  const formData = new FormData();

  if (params.transactionNumber) {
    formData.append("transaction_number", params.transactionNumber);
  } else if (params.reference) {
    formData.append("reference", params.reference);
  }

  const response = await fetch(`${baseUrl}/check_api`, {
    method: "POST",
    headers: {
      EZPluginKey: apiKey,
    },
    body: formData,
  });

  return response.json();
};

/**
 * Query transactions within a date range
 */
export const queryTransactions = async (
  startDate: string,
  endDate: string
): Promise<EZPayTransaction[]> => {
  const { apiKey, baseUrl } = getConfig();

  const response = await fetch(`${baseUrl}/transactions_api`, {
    method: "POST",
    headers: {
      Apikey: apiKey,
      Startdate: startDate,
      Enddate: endDate,
    },
  });

  return response.json();
};

/**
 * Change transaction status (Development server only)
 */
export const changeTransactionStatus = async (
  transactionNumber: string,
  status: EZPayTransactionStatus
): Promise<{ result: string; msg: string }> => {
  const { apiKey, baseUrl } = getConfig();

  const formData = buildFormData({
    transaction_number: transactionNumber,
    transaction_status: status,
  });

  const response = await fetch(`${baseUrl}/change_status?c=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};
