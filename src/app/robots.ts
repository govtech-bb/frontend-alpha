import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

const indexingAllowed = process.env.ALLOW_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/forms/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
