/**
 * URL whitelist validation for the EZPay redirector.
 *
 * Validates return URLs against allowed patterns to prevent open redirect vulnerabilities.
 */

const ALLOWED_PATTERNS = [
  "https://dev.alpha.gov.bb",
  "https://alpha.gov.bb",
  "http://localhost:",
  "http://127.0.0.1:",
] as const;

/**
 * Check if a return URL is whitelisted for redirects.
 *
 * @param url - The URL to validate
 * @returns true if URL is whitelisted, false otherwise
 */
export function isReturnUrlAllowed(url: string): boolean {
  // Check against simple patterns
  for (const pattern of ALLOWED_PATTERNS) {
    if (url.startsWith(pattern)) {
      return true;
    }
  }

  // Special handling for Vercel deployments (must be HTTPS and end with .vercel.app)
  if (url.startsWith("https://")) {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.endsWith(".vercel.app")) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}
