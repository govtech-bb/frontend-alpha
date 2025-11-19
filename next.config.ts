import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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
  pageExtensions: ["md", "mdx", "ts", "tsx"],
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

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeRaw,
        {
          passThrough: [
            "mdxFlowExpression",
            "mdxJsxFlowElement",
            "mdxJsxTextElement",
            "mdxTextExpression",
            "mdxjsEsm",
          ],
        },
      ],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
