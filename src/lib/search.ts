import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { DEPARTMENTS } from "@/data/departments";
import { MINISTRIES } from "@/data/ministries";
import { STATE_BODIES } from "@/data/state-bodies";
import type { PageType } from "@/types/content";

export type SearchResultKind =
  | "service"
  | "ministry"
  | "department"
  | "state-body";

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  href: string;
  category: string;
  kind: SearchResultKind;
  hasOnlineForm: boolean;
}

interface IndexEntry extends SearchResult {
  titleLower: string;
  descriptionLower: string;
}

function pageHasOnlineForm(page: PageType): boolean {
  return page.subPages?.some((sub) => sub.type === "component") ?? false;
}

function toEntry(result: SearchResult): IndexEntry {
  return {
    ...result,
    titleLower: result.title.toLowerCase(),
    descriptionLower: result.description.toLowerCase(),
  };
}

function buildServiceEntries(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const category of INFORMATION_ARCHITECTURE) {
    for (const page of category.pages) {
      const baseSlug = `${category.slug}/${page.slug}`;
      entries.push(
        toEntry({
          title: page.title,
          description: page.description ?? "",
          slug: baseSlug,
          href: page.href ?? `/${baseSlug}`,
          category: category.title,
          kind: "service",
          hasOnlineForm: pageHasOnlineForm(page),
        })
      );

      for (const child of page.pages ?? []) {
        const childSlug = `${baseSlug}/${child.slug}`;
        entries.push(
          toEntry({
            title: child.title,
            description: child.description ?? "",
            slug: childSlug,
            href: child.href ?? child.source_url ?? `/${childSlug}`,
            category: category.title,
            kind: "service",
            hasOnlineForm: pageHasOnlineForm(child),
          })
        );
      }
    }
  }

  return entries;
}

function buildOrgEntries(
  orgs: { slug: string; name: string; shortDescription?: string }[],
  kind: Exclude<SearchResultKind, "service">,
  label: string
): IndexEntry[] {
  return orgs.map((org) =>
    toEntry({
      title: org.name,
      description: org.shortDescription ?? "",
      slug: org.slug,
      href: `/government/organisations/${org.slug}`,
      category: label,
      kind,
      hasOnlineForm: false,
    })
  );
}

const allEntries: IndexEntry[] = [
  ...buildServiceEntries(),
  ...buildOrgEntries(MINISTRIES, "ministry", "Ministry"),
  ...buildOrgEntries(DEPARTMENTS, "department", "Department"),
  ...buildOrgEntries(STATE_BODIES, "state-body", "State body"),
];

export function searchServices(
  query: string,
  serviceSlugs?: Set<string>
): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  const pool = serviceSlugs
    ? allEntries.filter((r) => r.kind === "service" && serviceSlugs.has(r.slug))
    : allEntries;

  if (!trimmed) {
    return pool;
  }

  const titleMatches: IndexEntry[] = [];
  const descriptionMatches: IndexEntry[] = [];

  for (const entry of pool) {
    if (entry.titleLower.includes(trimmed)) {
      titleMatches.push(entry);
    } else if (entry.descriptionLower.includes(trimmed)) {
      descriptionMatches.push(entry);
    }
  }

  return [...titleMatches, ...descriptionMatches];
}
