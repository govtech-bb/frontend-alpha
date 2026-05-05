import type { MetadataRoute } from "next";

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
    sitemap: "https://alpha.gov.bb/sitemap.xml",
  };
}
