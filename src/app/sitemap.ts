import type { MetadataRoute } from "next";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

const BASE_URL = "https://alpha.gov.bb";

const STATIC_PATHS = ["/", "/services", "/feedback", "/what-we-mean-by-alpha"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths: string[] = [...STATIC_PATHS];

  for (const category of INFORMATION_ARCHITECTURE) {
    paths.push(`/${category.slug}`);

    for (const page of category.pages) {
      paths.push(`/${category.slug}/${page.slug}`);

      for (const subPage of page.subPages ?? []) {
        if (subPage.type === "markdown") {
          paths.push(`/${category.slug}/${page.slug}/${subPage.slug}`);
        }
      }
    }
  }

  return paths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
  }));
}
