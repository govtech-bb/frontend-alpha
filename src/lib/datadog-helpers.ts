import { datadogRum } from "@datadog/browser-rum";

/**
 * Track a custom user action in Datadog RUM
 * @param name - Action name (e.g., 'form_submitted', 'payment_completed')
 * @param context - Additional context data
 */
export function trackAction(name: string, context?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  datadogRum.addAction(name, context);
}

/**
 * Track a custom error in Datadog RUM
 * @param error - Error object or message
 * @param context - Additional context data
 */
export function trackError(
  error: Error | string,
  context?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  const errorObj = typeof error === "string" ? new Error(error) : error;
  datadogRum.addError(errorObj, context);
}

/**
 * Set user information for tracking
 * @param user - User information (only non-sensitive data)
 */
export function setUser(user: {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}) {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  datadogRum.setUser(user);
}

/**
 * Clear user information (e.g., on logout)
 */
export function clearUser() {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  datadogRum.clearUser();
}

/**
 * Add custom timing measurement
 * @param name - Timing name
 */
export function addTiming(name: string) {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  datadogRum.addTiming(name);
}

/**
 * Add global context that will be attached to all RUM events
 * @param key - Context key
 * @param value - Context value
 */
export function addGlobalContext(key: string, value: unknown) {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  datadogRum.setGlobalContextProperty(key, value);
}

/**
 * Remove global context
 * @param key - Context key to remove
 */
export function removeGlobalContext(key: string) {
  if (typeof window === "undefined" || !window.DD_RUM) {
    return;
  }

  datadogRum.removeGlobalContextProperty(key);
}
