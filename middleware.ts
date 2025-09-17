import { NextResponse } from 'next/server';

// Start in report-only; flip to true later to enforce.
const ENFORCE_CSP = false;

export function middleware() {
  const res = NextResponse.next();
  const nonce = crypto.randomUUID().replace(/-/g, '');

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    // Allow Umami Cloud script host
    "script-src 'self' 'unsafe-inline' https://cloud.umami.is",
    // Styles often need 'unsafe-inline' with Tailwind; tighten later if desired
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' https:",
    // Allow Umami collector endpoint
    "connect-src 'self' https://cloud.umami.is",
    "frame-src 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; ');

  if (ENFORCE_CSP) res.headers.set('Content-Security-Policy', csp);
  else res.headers.set('Content-Security-Policy-Report-Only', csp);

  // Ready for a stricter nonce-based CSP later
  res.headers.set('x-nonce', nonce);

  return res;
}

// Skip heavy/static assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
