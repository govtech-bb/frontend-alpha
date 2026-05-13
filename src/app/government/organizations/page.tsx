import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { StageBanner } from "@/components/stage-banner";
import { DEPARTMENTS } from "@/data/departments";
import { getMinistriesByCategory } from "@/data/ministries";
import { filterByQuery } from "@/lib/search-filter";

export const metadata: Metadata = {
  title: "Departments, agencies and public bodies",
};

type Org = {
  slug: string;
  name: string;
  shortDescription?: string;
  href: string;
};

const byName = (a: Org, b: Org) => a.name.localeCompare(b.name);

const ministerial: Org[] = getMinistriesByCategory("ministerial")
  .map((m) => ({
    slug: m.slug,
    name: m.name,
    shortDescription: m.shortDescription,
    href: `/ministries/${m.slug}`,
  }))
  .sort(byName);

const nonMinisterial: Org[] = getMinistriesByCategory("non-ministerial")
  .map((m) => ({
    slug: m.slug,
    name: m.name,
    shortDescription: m.shortDescription,
    href: `/ministries/${m.slug}`,
  }))
  .sort(byName);

const agenciesAndBodies: Org[] = [
  ...getMinistriesByCategory("agency").map((m) => ({
    slug: m.slug,
    name: m.name,
    shortDescription: m.shortDescription,
    href: `/ministries/${m.slug}`,
  })),
  ...DEPARTMENTS.map((d) => ({
    slug: d.slug,
    name: d.name,
    shortDescription: d.shortDescription,
    href: `/departments/${d.slug}`,
  })),
].sort(byName);

const ALL_GROUPS = [
  {
    id: "ministerial-departments",
    title: "Ministerial departments",
    description:
      "Ministerial departments are led by a government minister and deal with policy.",
    items: ministerial,
  },
  {
    id: "non-ministerial-departments",
    title: "Non-ministerial departments",
    description:
      "Non-ministerial departments are headed by senior public servants, not ministers.",
    items: nonMinisterial,
  },
  {
    id: "agencies-and-public-bodies",
    title: "Agencies and other public bodies",
    description:
      "Statutory bodies, agencies, departments and public corporations that work with government.",
    items: agenciesAndBodies,
  },
].filter((group) => group.items.length > 0);

function filterGroups(query: string) {
  if (!query.trim()) return ALL_GROUPS;

  return ALL_GROUPS.map((group) => ({
    ...group,
    items: filterByQuery(group.items, query),
  })).filter((group) => group.items.length > 0);
}

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const groups = filterGroups(query);
  const totalResults = groups.reduce((sum, g) => sum + g.items.length, 0);
  const basePath = "/government/organizations";

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
                    key={group.id}
                  >
                    <Heading
                      as="h2"
                      className="mb-xs border-teal-40 border-b-4 pb-xs"
                      id={`${group.id}-heading`}
                    >
                      {group.title}{" "}
                      <span className="font-normal text-mid-grey-00">
                        ({group.items.length})
                      </span>
                    </Heading>
                    <Text as="p" className="mb-s text-mid-grey-00">
                      {group.description}
                    </Text>
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li
                          className="flex flex-col gap-xxs border-grey-00 border-b py-s first:pt-xs"
                          key={item.href}
                        >
                          <Link
                            as={NextLink}
                            className="text-[20px] leading-normal"
                            href={item.href}
                          >
                            {item.name}
                          </Link>
                          {item.shortDescription && (
                            <Text as="p" className="text-mid-grey-00">
                              {item.shortDescription}
                            </Text>
                          )}
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
