/**
 * Environment Variable Validation
 * Validates required environment variables at application startup
 * Fails fast if critical configuration is missing
 */

import { logWarn } from "./logger";

interface EnvValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate payment-related environment variables
 */
export function validatePaymentEnv(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if mock mode is enabled
  const isMockMode = process.env.EZPAY_MOCK_MODE === "true";

  if (isMockMode) {
    warnings.push("EZPAY_MOCK_MODE is enabled - using mock payment provider");
  } else {
    // In production mode, require EZPay credentials
    if (!process.env.EZPAY_API_URL) {
      errors.push(
        "EZPAY_API_URL is required when EZPAY_MOCK_MODE is not enabled"
      );
    }
    if (!process.env.EZPAY_API_KEY) {
      errors.push(
        "EZPAY_API_KEY is required when EZPAY_MOCK_MODE is not enabled"
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate email-related environment variables
 */
export function validateEmailEnv(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!process.env.MAIL_FROM) {
    errors.push("MAIL_FROM environment variable is required");
  }

  const isSmtpMode = !!process.env.SMTP_HOST;

  if (isSmtpMode) {
    warnings.push("Using SMTP mode for email - suitable for development only");

    if (!process.env.SMTP_PORT) {
      warnings.push("SMTP_PORT not set, using default 1025");
    }
  } else {
    warnings.push("Using AWS SES for email production mode");

    if (!process.env.SES_REGION) {
      warnings.push("SES_REGION not set, using default us-east-1");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate all required environment variables
 * Call this at application startup
 */
export function validateEnvironment(): void {
  const results = [validatePaymentEnv(), validateEmailEnv()];

  // Collect all errors and warnings
  const allErrors = results.flatMap((r) => r.errors);
  const allWarnings = results.flatMap((r) => r.warnings);

  // Log warnings
  for (const warning of allWarnings) {
    logWarn(`[Environment] ${warning}`);
  }

  // If there are errors, throw
  if (allErrors.length > 0) {
    const errorMessage = [
      "Environment validation failed:",
      ...allErrors.map((e) => `  - ${e}`),
      "",
      "Please check your .env.local file and ensure all required variables are set.",
    ].join("\n");

    throw new Error(errorMessage);
  }
}
