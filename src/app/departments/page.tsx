import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { StageBanner } from "@/components/stage-banner";
import { DEPARTMENTS } from "@/data/departments";
import { filterByQuery } from "@/lib/search-filter";

export const metadata: Metadata = {
  title: "Government Departments",
};

const ALL_DEPARTMENTS = [...DEPARTMENTS].sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default async function DepartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const departments = filterByQuery(ALL_DEPARTMENTS, query);

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
              Search for a department
            </Text>
            <SearchForm
              defaultValue={query}
              emptyFallbackPath="/departments"
              searchPath="/departments"
            />
          </div>
        </div>
      </section>

      <section className="pt-8 pb-8">
        <div className="container">
          <div className="flex flex-col gap-l">
            <div className="flex flex-col gap-xs">
              <Heading as="h1">Government Departments</Heading>
              {query ? (
                <Text as="p" className="text-mid-grey-00">
                  {departments.length === 0
                    ? `No results for "${query}"`
                    : `${departments.length} result${departments.length === 1 ? "" : "s"} for "${query}"`}
                </Text>
              ) : (
                <Text as="p" className="text-mid-grey-00">
                  Government of Barbados departments and agencies.
                </Text>
              )}
            </div>

            {departments.length === 0 ? (
              <Text as="p">
                Try a different search term, or{" "}
                <Link as={NextLink} href="/departments">
                  view all departments
                </Link>
                .
              </Text>
            ) : (
              <ul className="flex flex-col">
                {departments.map((dept) => (
                  <li
                    className="flex flex-col gap-xxs border-grey-00 border-b py-s first:pt-xs"
                    key={dept.slug}
                  >
                    <Link
                      as={NextLink}
                      className="text-[20px] leading-normal"
                      href={`/departments/${dept.slug}`}
                    >
                      {dept.name}
                    </Link>
                    {dept.shortDescription && (
                      <Text as="p" className="text-mid-grey-00">
                        {dept.shortDescription}
                      </Text>
                    )}
                  </li>
                ))}
              </ul>
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
