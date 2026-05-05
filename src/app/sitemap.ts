import fs from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

const BASE_URL = "https://alpha.gov.bb";
const contentDir = path.join(process.cwd(), "src", "content");

async function getLastModified(filePath: string): Promise<Date> {
  try {
    const stat = await fs.stat(filePath);
    return stat.mtime;
  } catch {
    return new Date();
  }
}

async function findContentFile(slug: string): Promise<string | null> {
  const candidates = [
    path.join(contentDir, slug, "index.md"),
    path.join(contentDir, `${slug}.md`),
  ];
  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next candidate
    }
  }
  return null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const category of INFORMATION_ARCHITECTURE) {
    entries.push({
      url: `${BASE_URL}/${category.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    for (const page of category.pages) {
      const contentFile = await findContentFile(page.slug);
      if (!contentFile) continue;

      const lastModified = await getLastModified(contentFile);

      entries.push({
        url: `${BASE_URL}/${category.slug}/${page.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });

      for (const subPage of page.subPages ?? []) {
        if (subPage.type !== "markdown") continue;

        const subPageFile = path.join(
          contentDir,
          page.slug,
          `${subPage.slug}.md`
        );

        entries.push({
          url: `${BASE_URL}/${category.slug}/${page.slug}/${subPage.slug}`,
          lastModified: await getLastModified(subPageFile),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  return entries;
}
