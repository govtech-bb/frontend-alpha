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
 * @returns Encoded reference ID in format: base64url(url).uuid
 */
export function generateEncodedReferenceId(): string {
  const returnUrl = getBaseUrl();
  const uuid = crypto.randomUUID();

  // Use base64url encoding (URL-safe, no padding)
  const encodedUrl = Buffer.from(returnUrl).toString("base64url");

  return `${encodedUrl}.${uuid}`;
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

    if (!encodedUrl || !uuid) {
      return null;
    }

    // Decode base64url
    const returnUrl = Buffer.from(encodedUrl, "base64url").toString("utf-8");

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
 *
 * @param url - URL to validate
 * @returns True if URL matches allowed patterns
 */
function isReturnUrlAllowed(url: string): boolean {
  const allowedPatterns = [
    "https://gov.bb",
    "https://staging.gov.bb",
    "https://alpha.gov.bb",
    "http://localhost:",
    "http://127.0.0.1:",
  ];

  // Check standard patterns with startsWith
  for (const pattern of allowedPatterns) {
    if (url.startsWith(pattern)) {
      return true;
    }
  }

  // Special handling for Vercel preview deployments
  // Format: https://preview-xyz.vercel.app or https://project-name-preview.vercel.app
  if (url.includes(".vercel.app")) {
    // Must be HTTPS and contain .vercel.app domain
    if (url.startsWith("https://") && url.includes(".vercel.app")) {
      // Additional validation: ensure .vercel.app is actually part of the domain
      try {
        const urlObj = new URL(url);
        return urlObj.hostname.endsWith(".vercel.app");
      } catch {
        return false;
      }
    }
  }

  return false;
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
  const decoded = decodeReferenceId(referenceId);
  if (decoded) {
    return decoded.uuid;
  }

  // Fallback: if decoding fails, return the whole reference ID
  // This handles legacy non-encoded reference IDs
  return referenceId;
}
