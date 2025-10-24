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

  // biome-ignore lint/suspicious/useAwait: Required for Next.js headers configuration
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

export default nextConfig;
