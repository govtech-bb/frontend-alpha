"use client";

import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";

import type { SearchResult } from "@/lib/search";

export function SearchResults({
  results,
  query,
}: {
  results: SearchResult[];
  query: string;
}) {
  return (
    <div aria-live="polite">
      <Heading as="h2" className="mb-m">
        {query ? "Search results" : "All services"}
      </Heading>

      {query && (
        <Text as="p" className="mb-s text-mid-grey-00">
          {results.length} search {results.length === 1 ? "result" : "results"}{" "}
          for &ldquo;
          <strong>{query}</strong>&rdquo;{" "}
          {results.length === 1 ? "was" : "were"} found
        </Text>
      )}

      {results.length > 0 && (
        <ul className="flex flex-col gap-s">
          {results.map((result) => (
            <li
              className="flex flex-col gap-xs border-grey-00 border-b-2 py-s first:pt-0"
              key={result.slug}
            >
              <Link
                as={NextLink}
                className="text-[20px] leading-normal"
                href={`/${result.slug}`}
              >
                {result.title}
              </Link>
              {result.description && <Text as="p">{result.description}</Text>}
              <Text as="p" className="text-mid-grey-00">
                {result.hasOnlineForm
                  ? "Digital service"
                  : "Information service"}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
