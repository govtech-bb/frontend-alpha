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

const FILTER_KEYS = ["type", "category"] as const;

export type ServiceFilters = Partial<
  Record<(typeof FILTER_KEYS)[number], string[]>
>;

// Maps a filter key to the value it should match against on a service
const FILTER_EXTRACTORS: Record<string, (s: SearchResult) => string> = {
  type: (s) => (s.hasOnlineForm ? "digital" : "information"),
  category: (s) => s.category,
};

export function parseFilterParams(params: {
  type?: string | string[];
  category?: string | string[];
}): ServiceFilters {
  const filters: ServiceFilters = {};
  for (const key of FILTER_KEYS) {
    const vals = [params[key] ?? []].flat();
    if (vals.length > 0) filters[key] = vals;
  }
  return filters;
}

export function searchServices(
  query: string,
  alphaSlugs?: Set<string>,
  filters?: ServiceFilters
): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  let services = alphaSlugs
    ? allServices.filter((s) => alphaSlugs.has(s.slug))
    : allServices;

  if (filters) {
    for (const key of FILTER_KEYS) {
      const vals = filters[key];
      if (vals?.length) {
        const allowed = new Set(vals);
        const extract = FILTER_EXTRACTORS[key];
        services = services.filter((s) => allowed.has(extract(s)));
      }
    }
  }

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
