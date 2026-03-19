import { Text } from "@govtech-bb/react";
import type { Metadata } from "next";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { getAlphaServices } from "@/lib/markdown";
import { searchServices } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search Results",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const alphaServices = await getAlphaServices();
  const alphaSlugs = new Set(alphaServices.map((s) => s.slug));
  const results = searchServices(query, alphaSlugs);

  return (
    <main>
      <section className="border-teal-40 border-b-4 bg-teal-10 py-8">
        <div className="container">
          <div className="flex flex-col gap-2">
            <Text as="p" className="font-bold">
              Search for a service
            </Text>
            <SearchForm defaultValue={query} />
          </div>
        </div>
      </section>

      <section className="pt-4 pb-8">
        <div className="container">
          <SearchResults query={query} results={results} />
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </main>
  );
}
