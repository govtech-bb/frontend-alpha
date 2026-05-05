import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  // removes: x-powered-by: Next.js
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/_next/static/:path*", headers: securityHeaders },
      { source: "/_next/image/:path*", headers: securityHeaders },
      { source: "/favicon.ico", headers: securityHeaders },
      { source: "/robots.txt", headers: securityHeaders },
      { source: "/sitemap.xml", headers: securityHeaders },
    ];
  },
};

export default withSentryConfig(withPayload(nextConfig), {
  org: "govtech-barbados",
  project: "javascript-nextjs",
  // Suppress source-map upload logs outside of CI
  silent: !process.env.CI,
  // Upload wider source maps for richer stack traces (increases build time)
  widenClientFileUpload: true,
  // Tunnel browser requests through Next.js to avoid ad-blocker interference
  tunnelRoute: "/monitoring",
  // Instrument Vercel Cron jobs (does not apply to App Router route handlers)
  automaticVercelMonitors: true,
  // Strip Sentry debug statements from the production bundle
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
});
