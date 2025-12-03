// Cart item structure for EZPay+
export type EZPayCartItem = {
  code: string; // Payment Code from EZPay+
  amount: number; // Individual cost of item
  details: string; // Description of item/service
  reference: string; // Internal reference to link with EZPay+ transaction
};

// Request payload for creating a payment
export type EZPayCreatePaymentRequest = {
  ez_cart_array: string; // JSON stringified array of cart items
  ez_process_id: string; // Unique process ID (20 chars recommended)
  ez_reference_email: string; // Customer email
  ez_reference_name: string; // Customer name
  ez_reference_number: string; // Unique internal reference number
  ez_allow_credit?: boolean; // Allow credit card payments (default: true)
  ez_allow_debit?: boolean; // Allow direct debit payments (default: true)
  ez_allow_payce?: boolean; // Allow Payce payments (default: true)
};

// Response from creating a payment
export type EZPayTokenResponse = {
  token?: string;
  error?: string;
  code?: string;
};

// Transaction status types
export type EZPayTransactionStatus = "Success" | "Failed" | "Initiated";

// Payment processor types
export type EZPayProcessor =
  | "Credit Card"
  | "Direct Debit"
  | "Payce"
  | "mMoney";

// Callback payload from EZPay+ (Push API)
export type EZPayCallbackPayload = {
  _reference: string; // Reference sent to callback
  _status: EZPayTransactionStatus;
  _transaction_number: string; // EZPay+ transaction number
  _ezpay_account: string; // EZPay+ account number
  _processor: EZPayProcessor;
  _datesettled: string; // Date transaction was settled
  _amount: string; // Transaction amount
  _pcode: string; // Payment code transacted on
};

// Response from verify/check API
export type EZPayVerifyResponse = {
  _status: EZPayTransactionStatus;
  _transaction_number: string;
  _ezpay_account: string;
  _processor: string;
  _datesettled: string;
  _amount: string;
  _details: string;
};

// Query transactions response
export type EZPayTransaction = {
  Date: string;
  TransactionCode: string;
  Account: string;
  Header: string;
  PaymentCode: string;
  Processor: string;
  Amount: string;
  Response: string;
  Status: EZPayTransactionStatus;
  DateInitiated: string;
  DateSettled: string;
  Details: string;
  Total: string;
  Cart: unknown[];
};

// Create payment params
export type CreatePaymentParams = {
  cartItems: EZPayCartItem[];
  customerEmail: string;
  customerName: string;
  referenceNumber?: string;
  processId?: string;
  allowCredit?: boolean;
  allowDebit?: boolean;
  allowPayce?: boolean;
};

// Verify payment params
export type VerifyPaymentParams = {
  transactionNumber?: string;
  reference?: string;
};

// Create payment result
export type CreatePaymentResult =
  | {
      success: true;
      token: string;
      paymentUrl: string;
      referenceNumber: string;
    }
  | {
      success: false;
      error: string;
      code?: string;
    };

// Error codes from EZPay+
export const EZPAY_ERROR_CODES = {
  "E-052": "Incorrect Service API Key",
  "E-053": "Portal Login Failed",
  "E-056": "No Cart Items Defined",
  "E-057": "Cart Amount and Transaction Amount Does not match",
  "E-058": "Invalid Direct Debit Account",
  "E-059": "Invalid Payment Code",
  "E-060": "Payment Code amount is not correct",
} as const;

export type EZPayErrorCode = keyof typeof EZPAY_ERROR_CODES;
