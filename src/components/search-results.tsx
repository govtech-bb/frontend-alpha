"use client";

import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { useEffect } from "react";

import type { SearchResult } from "@/lib/search";

export function SearchResults({
  results,
  query,
}: {
  results: SearchResult[];
  query: string;
}) {
  useEffect(() => {
    if (!query) return;
    window.umami?.track("search", {
      query,
      results: results.length,
    });
  }, [query, results.length]);

  return (
    <div aria-live="polite">
      <Heading as="h2" className="mb-s">
        Search results
      </Heading>

      {query && results.length > 0 && (
        <Text as="p" className="mb-s">
          {results.length} search {results.length === 1 ? "result" : "results"}{" "}
          for &ldquo;
          <strong>{query}</strong>&rdquo;{" "}
          {results.length === 1 ? "was" : "were"} found
        </Text>
      )}

      {query && results.length === 0 && (
        <div className="space-y-s">
          <Text as="p">
            We could not find any results for &ldquo;
            <strong>{query}</strong>&rdquo;
          </Text>

          <Text as="p">You can try:</Text>

          <ul className="list-disc space-y-xs ps-m">
            <li>
              <Text as="span">checking your spelling</Text>
            </li>
            <li>
              <Text as="span">using different words</Text>
            </li>
          </ul>

          <Text as="p">
            At the moment, search only finds services that have been recently
            redesigned (alpha services).
            <br />
            You can{" "}
            <Link as={NextLink} className="inline" href="/services">
              find other government services or information
            </Link>{" "}
            here.
          </Text>
        </div>
      )}

      {results.length > 0 && (
        <ul className="flex flex-col gap-s">
          {results.map((result) => (
            <li
              className="flex flex-col items-start gap-xs border-grey-00 border-b-2 py-s first:pt-0"
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
                <Text as="p" className="hidden lg:block">
                  {result.description}
                </Text>
              )}
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
