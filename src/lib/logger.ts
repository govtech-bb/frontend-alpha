/**
 * Minimal logging utilities for the redirector service.
 */

/**
 * Log development/debug information.
 * Only logs in development mode.
 */
export function logDev(message: string, data?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] ${message}`, data || "");
  }
}

/**
 * Log warnings and errors.
 * Logs in all environments.
 */
export function logWarn(message: string, data?: Record<string, unknown>): void {
  console.warn(`[WARN] ${message}`, data || "");
}
