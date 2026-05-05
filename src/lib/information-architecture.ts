import "server-only";
import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { InformationContent, PageType } from "@/types/content";

interface CmsCategory {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  order?: number | null;
}

interface CmsPage {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  sourceUrl?: string | null;
  featured?: boolean | null;
  stage?: string | null;
  order?: number | null;
  category?: { id: number | string; slug: string } | string | number | null;
}

interface CmsSubpage {
  id: number | string;
  slug: string;
  title?: string | null;
  type?: "markdown" | "component" | null;
  page?: { id: number | string; slug: string } | string | number | null;
}

function categorySlugFromRel(rel: CmsPage["category"]): string | undefined {
  if (rel && typeof rel === "object" && "slug" in rel) return rel.slug;
  return undefined;
}

function pageSlugFromRel(rel: CmsSubpage["page"]): string | undefined {
  if (rel && typeof rel === "object" && "slug" in rel) return rel.slug;
  return undefined;
}

export const getInformationArchitecture = cache(
  async (): Promise<InformationContent[]> => {
    try {
      const payload = await getPayload({ config });
      const [categoriesResult, pagesResult, subpagesResult] = await Promise.all(
        [
          payload.find({ collection: "categories", limit: 1000, depth: 0 }),
          payload.find({ collection: "pages", limit: 1000, depth: 1 }),
          payload.find({ collection: "subpages", limit: 1000, depth: 1 }),
        ]
      );

      const categories = categoriesResult.docs as CmsCategory[];
      const pages = pagesResult.docs as CmsPage[];
      const subpages = subpagesResult.docs as CmsSubpage[];

      const subsByPage = new Map<string, CmsSubpage[]>();
      for (const s of subpages) {
        const parent = pageSlugFromRel(s.page);
        if (!parent) continue;
        const arr = subsByPage.get(parent) ?? [];
        arr.push(s);
        subsByPage.set(parent, arr);
      }

      const categoriesSorted = [...categories].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      const byCategory = new Map<string, CmsPage[]>();
      for (const p of pages) {
        const slug = categorySlugFromRel(p.category);
        if (!slug) continue;
        const arr = byCategory.get(slug) ?? [];
        arr.push(p);
        byCategory.set(slug, arr);
      }

      return categoriesSorted.map((cat) => {
        const pageList = byCategory.get(cat.slug) ?? [];
        pageList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        const mappedPages: PageType[] = pageList.map((p) => {
          const subs = subsByPage.get(p.slug) ?? [];
          return {
            title: p.title,
            slug: p.slug,
            description: p.description ?? "",
            source_url: p.sourceUrl ?? "",
            stage: p.stage ?? undefined,
            subPages: subs
              .filter((s) => s.slug)
              .map((s) => ({
                slug: s.slug,
                title: s.title ?? undefined,
                type: (s.type ?? "markdown") as "markdown" | "component",
              })),
          };
        });

        return {
          title: cat.title,
          slug: cat.slug,
          description: cat.description ?? undefined,
          pages: mappedPages,
        };
      });
    } catch (err) {
      console.error("[getInformationArchitecture] failed", err);
      return [];
    }
  }
);
