/**
 * Safe Logging Utilities
 * Guards against logging PII in production
 *
 * Use these instead of console.log/error when dealing with sensitive data
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Log info only in development mode
 * Use this for any logs that might contain PII (emails, names, addresses)
 */
export function logDev(message: string, ...args: unknown[]): void {
  if (isDevelopment) {
    // biome-ignore lint/suspicious/noConsole: Development-only logging
    console.log(message, ...args);
  }
}

/**
 * Log errors in all environments, but sanitize PII
 * Use this for error logging where you need to know about failures
 */
export function logError(message: string, error?: unknown): void {
  // biome-ignore lint/suspicious/noConsole: Error logging needed for debugging
  console.error(
    message,
    isDevelopment ? error : "[Error details hidden in production]"
  );
}

/**
 * Log warnings in all environments
 * Use this for configuration issues or deprecation warnings
 */
export function logWarn(message: string, ...args: unknown[]): void {
  // biome-ignore lint/suspicious/noConsole: Warning logging needed for operations
  console.warn(message, ...(isDevelopment ? args : []));
}
