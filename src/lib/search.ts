import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

export type SearchResult = {
  title: string;
  description: string;
  slug: string;
  category: string;
  hasOnlineForm: boolean;
};

const allServices: SearchResult[] = INFORMATION_ARCHITECTURE.flatMap(
  (category) =>
    category.pages.map((page) => ({
      title: page.title,
      description: page.description,
      slug: `${category.slug}/${page.slug}`,
      category: category.title,
      hasOnlineForm:
        page.subPages?.some((sub) => sub.type === "component") ?? false,
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
    if (service.title.toLowerCase().includes(trimmed)) {
      titleMatches.push(service);
    } else if (service.description.toLowerCase().includes(trimmed)) {
      descriptionMatches.push(service);
    }
  }

  return [...titleMatches, ...descriptionMatches];
}
