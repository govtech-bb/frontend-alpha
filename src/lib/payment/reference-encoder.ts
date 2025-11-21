/**
 * Reference ID Encoder for EZPay Payment Gateway
 *
 * Encodes the return URL directly in the reference number to eliminate
 * the need for external redirect services. EZPay echoes back the reference
 * number in callbacks, allowing us to decode the original environment URL.
 *
 * Format: base64url(returnURL) + "." + uuid
 * Example: aHR0cDovL2xvY2FsaG9zdDozMDAw.abc-123-def-456
 */

/**
 * Generate an encoded reference ID containing the return URL
 *
 * @param uuid - Optional UUID to use (if not provided, generates a new one)
 * @returns Encoded reference ID in format: base64url(url).uuid
 */
export function generateEncodedReferenceId(uuid?: string): string {
  const returnUrl = getBaseUrl();
  const id = uuid || crypto.randomUUID();

  // Use base64url encoding (URL-safe, no padding)
  const encodedUrl = Buffer.from(returnUrl).toString("base64url");

  return `${encodedUrl}.${id}`;
}

/**
 * Decode base64url string (works in both browser and Node.js)
 *
 * @param str - base64url encoded string
 * @returns decoded string
 */
function decodeBase64Url(str: string): string {
  // Convert base64url to base64 (replace URL-safe chars)
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  // Decode using appropriate method for environment
  if (typeof window !== "undefined") {
    // Browser environment - use atob
    return decodeURIComponent(
      Array.from(atob(padded))
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  }
  // Node.js environment - use Buffer
  return Buffer.from(padded, "base64").toString("utf-8");
}

/**
 * Decode a reference ID to extract the return URL and UUID
 *
 * @param referenceId - Encoded reference ID from EZPay callback
 * @returns Object with returnUrl and uuid, or null if invalid/not whitelisted
 */
export function decodeReferenceId(
  referenceId: string
): { returnUrl: string; uuid: string } | null {
  try {
    // Split on first dot only (UUID may contain hyphens but not dots)
    const dotIndex = referenceId.indexOf(".");
    if (dotIndex === -1) {
      return null; // No separator found
    }

    const encodedUrl = referenceId.substring(0, dotIndex);
    const uuid = referenceId.substring(dotIndex + 1);

    if (!(encodedUrl && uuid)) {
      return null;
    }

    // Decode base64url (works in both browser and Node.js)
    const returnUrl = decodeBase64Url(encodedUrl);

    // Validate it's a proper URL
    new URL(returnUrl);

    // Validate against whitelist
    if (!isReturnUrlAllowed(returnUrl)) {
      console.warn("Decoded URL not in whitelist:", returnUrl);
      return null;
    }

    return { returnUrl, uuid };
  } catch (error) {
    // Invalid base64, malformed URL, or other parsing error
    console.warn("Failed to decode reference ID:", referenceId, error);
    return null;
  }
}

/**
 * Check if a URL is allowed based on whitelist
 *
 * Security: Only approved domains can be used as return URLs
 * Uses strict hostname validation to prevent open redirect vulnerabilities
 *
 * @param url - URL to validate
 * @returns True if URL matches allowed patterns
 */
function isReturnUrlAllowed(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const { hostname, protocol, port } = urlObj;

    // Production & Staging domains (HTTPS only)
    if (
      (hostname === "gov.bb" ||
        hostname === "staging.gov.bb" ||
        hostname === "alpha.gov.bb") &&
      protocol === "https:"
    ) {
      return true;
    }

    // Vercel preview deployments (HTTPS only)
    if (hostname.endsWith(".vercel.app") && protocol === "https:") {
      return true;
    }

    // Local development (HTTP only, with a valid port)
    if (
      (hostname === "localhost" || hostname === "127.0.0.1") &&
      protocol === "http:" &&
      port !== ""
    ) {
      return true;
    }

    return false;
  } catch {
    // The URL is malformed and cannot be parsed
    return false;
  }
}

/**
 * Get the base URL for the current environment
 *
 * @param env - Environment variables (defaults to process.env for testability)
 * @returns Base URL (e.g., https://gov.bb, http://localhost:3000)
 */
export function getBaseUrl(env?: {
  BASE_URL?: string;
  VERCEL_URL?: string;
}): string {
  // Use process.env if no env provided
  const environment = env || process.env;

  // Client-side: use window.location (only if no explicit env was passed)
  // This allows tests to override by passing explicit env objects
  if (typeof window !== "undefined" && !env) {
    return window.location.origin;
  }

  // Server-side: check environment variables
  // Priority: BASE_URL > VERCEL_URL > default

  // Explicit BASE_URL override (highest priority)
  if (environment.BASE_URL) {
    return environment.BASE_URL;
  }

  // Vercel deployments
  if (environment.VERCEL_URL) {
    return `https://${environment.VERCEL_URL}`;
  }

  // Default to localhost for local development
  return "http://localhost:3000";
}

/**
 * Extract just the UUID portion from an encoded reference ID
 * Useful for sessionStorage lookups
 *
 * @param referenceId - Encoded or plain reference ID
 * @returns UUID portion, or the full referenceId if no encoding detected
 */
export function extractUuid(referenceId: string): string {
  // Safety check for undefined/null
  if (!referenceId) {
    console.warn("extractUuid called with undefined/null referenceId");
    return "";
  }

  const decoded = decodeReferenceId(referenceId);
  if (decoded) {
    return decoded.uuid;
  }

  // Fallback: if decoding fails, return the whole reference ID
  // This handles legacy non-encoded reference IDs
  return referenceId;
}
