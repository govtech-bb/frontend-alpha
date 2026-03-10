import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

export type SearchResult = {
  title: string;
  description: string;
  slug: string;
  category: string;
  hasOnlineForm: boolean;
};

type IndexedService = SearchResult & {
  titleLower: string;
  descriptionLower: string;
};

const allServices: IndexedService[] = INFORMATION_ARCHITECTURE.flatMap(
  (category) =>
    category.pages.map((page) => ({
      title: page.title,
      description: page.description,
      slug: `${category.slug}/${page.slug}`,
      category: category.title,
      hasOnlineForm:
        page.subPages?.some((sub) => sub.type === "component") ?? false,
      titleLower: page.title.toLowerCase(),
      descriptionLower: page.description.toLowerCase(),
    }))
);

export function searchServices(query: string): SearchResult[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return allServices;
  }

  const titleMatches: SearchResult[] = [];
  const descriptionMatches: SearchResult[] = [];

  for (const service of allServices) {
    if (service.titleLower.includes(trimmed)) {
      titleMatches.push(service);
    } else if (service.descriptionLower.includes(trimmed)) {
      descriptionMatches.push(service);
    }
  }

  return [...titleMatches, ...descriptionMatches];
}
