/**
 * Payment Provider Interface
 * All payment gateways must implement this contract
 */
export interface PaymentProvider {
  readonly name: string;
  initiatePayment(
    request: PaymentInitiationRequest
  ): Promise<PaymentInitiationResult>;
  verifyPayment(
    request: PaymentVerificationRequest
  ): Promise<PaymentVerificationResult>;
}

/**
 * Payment Initiation Request
 * Sent from client → server → provider
 */
export interface PaymentInitiationRequest {
  referenceId: string; // UUID generated client-side
  serviceType: string; // e.g., 'passport-replacement'
  email: string;
  customerName: string;
  metadata?: Record<string, unknown>;
}

/**
 * Payment Initiation Result
 * Provider → server → client
 */
export interface PaymentInitiationResult {
  redirectUrl: string; // Where to send user for payment
  token: string; // Payment gateway token
  referenceId: string; // Echo back for confirmation
}

/**
 * Payment Verification Request
 * After user returns from gateway
 */
export interface PaymentVerificationRequest {
  transactionId: string; // From payment gateway callback
  referenceId: string; // Our original reference
}

/**
 * Payment Verification Result
 * Contains payment status and details
 */
export interface PaymentVerificationResult {
  success: boolean;
  status: "Success" | "Failed" | "Initiated" | "Cancelled";
  transactionId: string;
  referenceId: string;
  amount: string;
  processor?: string; // e.g., 'Credit Card', 'Direct Debit'
  settlementDate?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Service Configuration
 * Defines payment details for each service type
 */
export interface PaymentServiceConfig {
  code: string; // Payment code in gateway
  amount: number; // Amount in BBD
  description: string; // Service description
  requiresVerification?: boolean;
}
