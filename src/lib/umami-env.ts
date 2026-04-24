/**
 * Umami runs only in production builds (`next build` and deployed apps).
 * In `next dev`, tests, or any non-production NODE_ENV, Umami stays off even
 * when analytics env vars are set.
 */
export function isUmamiEnabled(): boolean {
  return process.env.NODE_ENV === "production";
}
