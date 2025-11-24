/**
 * EZPay+ Payment Gateway Types
 * Based on EZPay API Documentation
 */

// Individual item in the payment cart
export interface EzPayCartItem {
  code: string; // Payment code from EZpay admin
  amount: number; // Cost in BBD (e.g., 150.00)
  details: string; // Description of the service
  reference: string; // Internal reference ID
}

// Payload sent to initialize payment
export interface EzPayInitPayload {
  ez_cart_array: string; // JSON stringified EzPayCartItem[]
  ez_reference_email: string; // User's email
  ez_reference_name: string; // User's full name
  ez_reference_number: string; // Unique application ID (UUID)
  ez_return_url?: string; // URL to redirect user after payment completion
  ez_allow_credit?: boolean; // Allow credit card payments (default: true)
  ez_allow_debit?: boolean; // Allow debit card payments (default: true)
  ez_allow_payce?: boolean; // Allow Payce digital wallet (default: true)
}

// Response from payment initialization
export interface EzPayInitResponse {
  token: string; // Token to redirect user to payment page
}

// Transaction status from validation API
export interface EzPayTransactionStatus {
  _reference: string; // Application reference ID
  _status: "Success" | "Failed" | "Initiated"; // Payment status
  _transaction_number: string; // EZPay transaction ID
  _ezpay_account: string; // User's EZPay account
  _processor: string; // Payment method (e.g., "Credit Card", "Direct Debit")
  _datesettled: string; // Settlement date
  _amount: string; // Payment amount
  _pcode: string; // Payment code
}

// Webhook callback data structure
export interface EzPayWebhookPayload {
  _reference: string;
  _status: "Success" | "Failed" | "Initiated";
  _transaction_number: string;
  _ezpay_account: string;
  _processor: string;
  _datesettled: string;
  _amount: string;
  _pcode: string;
}
