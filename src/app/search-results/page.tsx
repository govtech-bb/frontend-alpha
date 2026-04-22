import { Text } from "@govtech-bb/react";
import type { Metadata } from "next";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { ServiceFilter } from "@/components/service-filter";
import { StageBanner } from "@/components/stage-banner";
import { getAlphaServices } from "@/lib/markdown";
import { parseFilterParams, searchServices } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search Results",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string | string[];
    category?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const filters = parseFilterParams(params);
  const alphaServices = await getAlphaServices();
  const alphaSlugs = new Set(alphaServices.map((s) => s.slug));
  const results = searchServices(query, alphaSlugs, filters);

  return (
    <>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>

      <section className="border-teal-40 border-b-4 bg-teal-10 py-8">
        <div className="container">
          <div className="flex flex-col gap-xs">
            <Text as="p" className="font-bold">
              Search for a service
            </Text>
            <SearchForm defaultValue={query} />
          </div>
        </div>
      </section>

      <section className="pt-4 pb-8">
        <div className="container">
          <SearchResults
            filter={<ServiceFilter variant="search" />}
            query={query}
            results={results}
          />
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </>
  );
}
