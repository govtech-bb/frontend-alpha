import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { StageBanner } from "@/components/stage-banner";
import { DEPARTMENTS } from "@/data/departments";
import { MINISTRIES } from "@/data/ministries";
import { STATE_BODIES } from "@/data/state-bodies";
import { filterByQuery } from "@/lib/search-filter";

export const metadata: Metadata = {
  title: "Departments, agencies and public bodies",
};

interface Org {
  slug: string;
  name: string;
  shortDescription?: string;
  href: string;
}

const byName = (a: Org, b: Org) => a.name.localeCompare(b.name);

const toOrg = (item: {
  slug: string;
  name: string;
  shortDescription?: string;
}): Org => ({
  slug: item.slug,
  name: item.name,
  shortDescription: item.shortDescription,
  href: `/government/organisations/${item.slug}`,
});

const ministries: Org[] = MINISTRIES.map(toOrg).sort(byName);
const departments: Org[] = DEPARTMENTS.map(toOrg).sort(byName);
const stateBodies: Org[] = STATE_BODIES.map(toOrg).sort(byName);

const ALL_GROUPS = [
  {
    id: "ministries",
    title: "Ministries",
    description:
      "Ministries led by a government minister and dealing with policy.",
    items: ministries,
  },
  {
    id: "departments",
    title: "Departments",
    description:
      "Statutory bodies, agencies, departments and public corporations that work with government.",
    items: departments,
  },
  {
    id: "state-bodies",
    title: "State bodies",
    description:
      "State-owned enterprises, public corporations and statutory bodies.",
    items: stateBodies,
  },
].filter((group) => group.items.length > 0);

function filterGroups(query: string) {
  if (!query.trim()) return ALL_GROUPS;

  return ALL_GROUPS.map((group) => ({
    ...group,
    items: filterByQuery(group.items, query),
  })).filter((group) => group.items.length > 0);
}

export default async function OrganisationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const groups = filterGroups(query);
  const totalResults = groups.reduce((sum, g) => sum + g.items.length, 0);
  const basePath = "/government/organisations";

  return (
    <>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>

      <section className="border-teal-40 border-b-4 bg-teal-10 py-8">
        <div className="container">
          <div className="flex flex-col gap-2">
            <Text as="p" className="font-bold">
              Search for a department, agency or public body
            </Text>
            <SearchForm
              defaultValue={query}
              emptyFallbackPath={basePath}
              searchPath={basePath}
            />
          </div>
        </div>
      </section>

      <section className="pt-8 pb-8">
        <div className="container">
          <div className="flex flex-col gap-l">
            <div className="flex flex-col gap-xs">
              <Heading as="h1">Departments, agencies and public bodies</Heading>
              {query ? (
                <Text as="p" className="text-mid-grey-00">
                  {totalResults === 0
                    ? `No results for "${query}"`
                    : `${totalResults} result${totalResults === 1 ? "" : "s"} for "${query}"`}
                </Text>
              ) : (
                <Text as="p" className="text-mid-grey-00">
                  Government of Barbados ministries, departments, agencies and
                  public bodies.
                </Text>
              )}
            </div>

            {!query && (
              <nav aria-label="Organisation categories">
                <ul className="flex flex-col gap-xs">
                  {groups.map((group) => (
                    <li key={group.id}>
                      <Link as="a" href={`#${group.id}`}>
                        {group.title} ({group.items.length})
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {totalResults === 0 ? (
              <Text as="p">
                Try a different search term, or{" "}
                <Link as={NextLink} href={basePath}>
                  view all departments, agencies and public bodies
                </Link>
                .
              </Text>
            ) : (
              <div className="flex flex-col gap-xl">
                {groups.map((group) => (
                  <section
                    aria-labelledby={`${group.id}-heading`}
                    className="grid scroll-mt-l grid-cols-1 gap-l md:grid-cols-3"
                    id={group.id}
                    key={group.id}
                  >
                    <div className="min-w-0 md:col-span-1">
                      <Heading
                        as="h2"
                        className="text-[20px] leading-tight"
                        id={`${group.id}-heading`}
                      >
                        {group.title}
                      </Heading>
                      <p className="mt-xs font-bold text-[96px] leading-none">
                        {group.items.length}
                      </p>
                    </div>
                    <ul className="flex min-w-0 flex-col md:col-span-2">
                      {group.items.map((item) => (
                        <li
                          className="border-grey-00 border-b py-s first:pt-0"
                          key={item.href}
                        >
                          <Link
                            as={NextLink}
                            className="wrap-break-word text-[19px] leading-normal"
                            href={item.href}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </>
  );
}
