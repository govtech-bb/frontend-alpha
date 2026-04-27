import type { InformationContent } from "@/types/content";

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  category: string;
  hasOnlineForm: boolean;
}

function buildIndex(data: InformationContent[]): SearchResult[] {
  return data.flatMap((category) =>
    category.pages.map((page) => ({
      title: page.title,
      description: page.description,
      slug: `${category.slug}/${page.slug}`,
      category: category.title,
      hasOnlineForm:
        page.subPages?.some((sub) => sub.type === "component") ?? false,
    }))
  );
}

export function searchServices(
  data: InformationContent[],
  query: string,
  alphaSlugs?: Set<string>
): SearchResult[] {
  const all = buildIndex(data);
  const trimmed = query.trim().toLowerCase();
  const services = alphaSlugs ? all.filter((s) => alphaSlugs.has(s.slug)) : all;

  if (!trimmed) {
    return services;
  }

  const titleMatches: SearchResult[] = [];
  const descriptionMatches: SearchResult[] = [];

  for (const service of services) {
    if (service.title.toLowerCase().includes(trimmed)) {
      titleMatches.push(service);
    } else if (service.description.toLowerCase().includes(trimmed)) {
      descriptionMatches.push(service);
    }
  }

  return [...titleMatches, ...descriptionMatches];
}
