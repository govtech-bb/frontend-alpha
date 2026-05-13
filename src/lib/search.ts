import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  href: string;
  category: string;
  hasOnlineForm: boolean;
}

const allServices: SearchResult[] = INFORMATION_ARCHITECTURE.flatMap(
  (category) =>
    category.pages.map((page) => ({
      title: page.title,
      description: page.description,
      slug: `${category.slug}/${page.slug}`,
      href: page.href ?? `/${category.slug}/${page.slug}`,
      category: category.title,
      hasOnlineForm:
        page.subPages?.some((sub) => sub.type === "component") ?? false,
    }))
);

export function searchServices(
  query: string,
  alphaSlugs?: Set<string>
): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  const services = alphaSlugs
    ? allServices.filter((s) => alphaSlugs.has(s.slug))
    : allServices;

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
