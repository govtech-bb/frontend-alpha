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
      <Heading as="h2" className="mb-6">
        {query ? "Search results" : "All services"}
      </Heading>

      {query && (
        <Text as="p" className="mb-4 text-mid-grey-00">
          {results.length} search {results.length === 1 ? "result" : "results"}{" "}
          for &ldquo;
          <strong>{query}</strong>&rdquo;{" "}
          {results.length === 1 ? "was" : "were"} found
        </Text>
      )}

      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li
              className="border-grey-00 border-b-2 pt-8 pb-8 first:pt-0"
              key={result.slug}
            >
              <Link
                as={NextLink}
                className="text-[20px] leading-normal"
                href={`/${result.slug}`}
              >
                {result.title}
              </Link>
              {result.description && (
                <Text as="p" className="mt-2">
                  {result.description}
                </Text>
              )}
              <span className="mt-2 block w-fit bg-pink-10 px-2 py-1 text-pink-00">
                {result.hasOnlineForm
                  ? "This service can be done online"
                  : "This service is for information purposes only"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
