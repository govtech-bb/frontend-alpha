import "server-only";
import config from "@payload-config";
import { getPayload, type Where } from "payload";

async function payload() {
  return await getPayload({ config });
}

interface Page {
  id: number | string;
  slug: string;
  title?: string;
  description?: string | null;
  featured?: boolean | null;
  stage?: string | null;
  sourceUrl?: string | null;
  body?: string | null;
  updatedAt?: string | null;
  category?: { slug?: string; title?: string } | string | number | null;
}

interface Subpage {
  id: number | string;
  slug: string;
  title?: string | null;
  type?: "markdown" | "component" | null;
  body?: string | null;
  updatedAt?: string | null;
  page?: Page | string | number | null;
}

function categorySlugFromRelation(rel: Page["category"]): string | undefined {
  if (rel && typeof rel === "object" && "slug" in rel)
    return rel.slug ?? undefined;
  return undefined;
}

function toDate(iso?: string | null): Date | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function buildFrontmatter(page: Page) {
  const categorySlug = categorySlugFromRelation(page.category);
  return {
    ...(page.title ? { title: page.title } : {}),
    ...(page.description ? { description: page.description } : {}),
    ...(page.featured ? { featured: page.featured } : {}),
    ...(page.stage ? { stage: page.stage } : {}),
    ...(categorySlug ? { category: categorySlug } : {}),
    ...(page.sourceUrl ? { source_url: page.sourceUrl } : {}),
    ...(page.updatedAt ? { publish_date: toDate(page.updatedAt) } : {}),
  };
}

export async function getMarkdownContent(slugPath: string[]) {
  try {
    const p = await payload();
    const result = await p.find({
      collection: "pages",
      where: { slug: { equals: slugPath[0] } },
      limit: 1,
      depth: 1,
    });
    const page = result.docs[0] as Page | undefined;
    if (!page) return null;

    if (slugPath.length === 1) {
      return {
        frontmatter: buildFrontmatter(page),
        content: page.body || "",
      };
    }

    const subResult = await p.find({
      collection: "subpages",
      where: {
        and: [{ page: { equals: page.id } }, { slug: { equals: slugPath[1] } }],
      },
      limit: 1,
      depth: 0,
    });
    const sub = subResult.docs[0] as Subpage | undefined;
    if (!sub) return null;

    return {
      frontmatter: {
        ...(sub.title ? { title: sub.title } : {}),
        ...(page.description ? { description: page.description } : {}),
        ...(sub.updatedAt ? { publish_date: toDate(sub.updatedAt) } : {}),
      },
      content: sub.body || "",
    };
  } catch (_error) {
    return null;
  }
}

interface ServiceListItem {
  title: string;
  slug: string;
  featured?: boolean;
}

async function listServices(where: Where): Promise<ServiceListItem[]> {
  try {
    const p = await payload();
    const result = await p.find({
      collection: "pages",
      where,
      limit: 1000,
      depth: 1,
    });
    return (result.docs as Page[]).map((doc) => {
      let slug = doc.slug;
      const categorySlug = categorySlugFromRelation(doc.category);
      if (categorySlug) slug = `${categorySlug}/${slug}`;
      return {
        title: doc.title || slug,
        slug,
        featured: !!doc.featured,
      };
    });
  } catch (_error) {
    return [];
  }
}

export function getFeaturedServices() {
  return listServices({ featured: { equals: true } });
}

export function getAlphaServices() {
  return listServices({ stage: { equals: "alpha" } });
}
