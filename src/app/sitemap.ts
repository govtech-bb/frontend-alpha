import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import { getFeaturedServices } from "@/lib/markdown";

/**
 * Calculate change frequency based on days since last update
 * - Less than 30 days: weekly
 * - 30-90 days: monthly
 * - More than 90 days: yearly
 */
function getChangeFrequency(
  lastModified: Date
): "weekly" | "monthly" | "yearly" {
  const now = new Date();
  const daysSinceUpdate = Math.floor(
    (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceUpdate < 30) {
    return "weekly";
  }
  if (daysSinceUpdate < 90) {
    return "monthly";
  }
  return "yearly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://alpha.gov.bb";

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Featured services from homepage
  const featuredServices = await getFeaturedServices();
  for (const service of featuredServices) {
    const lastMod = service.extraction_date
      ? new Date(service.extraction_date)
      : new Date();
    routes.push({
      url: `${baseUrl}/${service.slug}`,
      lastModified: lastMod,
      changeFrequency: getChangeFrequency(lastMod),
      priority: 0.9,
    });
  }

  // Category pages and their service pages
  for (const category of SERVICE_CATEGORIES) {
    // Category landing page - uses current date as categories are structural
    const categoryLastMod = new Date();
    routes.push({
      url: `${baseUrl}/content/${category.slug}`,
      lastModified: categoryLastMod,
      changeFrequency: getChangeFrequency(categoryLastMod),
      priority: 0.8,
    });

    // Individual service pages within category
    for (const page of category.pages) {
      const pageLastMod = page.extraction_date
        ? new Date(page.extraction_date)
        : new Date();

      routes.push({
        url: `${baseUrl}/content/${category.slug}/${page.slug}`,
        lastModified: pageLastMod,
        changeFrequency: getChangeFrequency(pageLastMod),
        priority: 0.7,
      });
    }
  }

  return routes;
}
