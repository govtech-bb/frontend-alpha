import { Text } from "@govtech-bb/react";
import type { Metadata } from "next";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { SearchResults } from "@/components/search-results";
import { StageBanner } from "@/components/stage-banner";

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
              Search for a service
            </Text>
            <SearchForm defaultValue={query} />
          </div>
        </div>
      </section>

      <section className="pt-4 pb-8">
        <div className="container">
          <SearchResults query={query} />
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </>
  );
}
