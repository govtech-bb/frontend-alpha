"use client";

import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import { type SearchHit, useSearch } from "@/hooks/use-search";
import { trackEvent } from "@/lib/analytics";

function labelFor(hit: SearchHit): string {
  if (hit.kind !== "service") {
    return hit.category;
  }
  return hit.hasOnlineForm ? "Digital service" : "Information service";
}

export function SearchResults({ query }: { query: string }) {
  const { search, ready, error } = useSearch();
  const [hits, setHits] = useState<SearchHit[] | null>(null);

  useEffect(() => {
    if (!query) {
      setHits([]);
      return;
    }
    if (!ready) {
      setHits(null);
      return;
    }
    setHits(search(query));
  }, [query, ready, search]);

  useEffect(() => {
    if (!query || hits === null) {
      return;
    }
    if (/\d|@/.test(query)) {
      return;
    }
    trackEvent("search", { query, results: hits.length });
  }, [query, hits]);

  const isLoading = query && hits === null && !error;
  const hasResults = hits !== null && hits.length > 0;
  const hasNoResults = query && hits !== null && hits.length === 0;

  return (
    <div aria-live="polite">
      <Heading as="h2" className="mb-s">
        Search results
      </Heading>

      {isLoading && (
        <Text as="p" className="mb-s">
          Searching…
        </Text>
      )}

      {error && (
        <Text as="p" className="mb-s">
          Search is temporarily unavailable. Please try again later.
        </Text>
      )}

      {query && hasResults && hits && (
        <Text as="p" className="mb-s">
          {hits.length} search {hits.length === 1 ? "result" : "results"} for
          &ldquo;<strong>{query}</strong>&rdquo;{" "}
          {hits.length === 1 ? "was" : "were"} found
        </Text>
      )}

      {hasNoResults && (
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
            You can also{" "}
            <Link as={NextLink} className="inline" href="/services">
              browse all government services
            </Link>
            .
          </Text>
        </div>
      )}

      {hasResults && hits && (
        <ul className="flex flex-col gap-s">
          {hits.map((hit) => (
            <li
              className="flex flex-col items-start gap-xs border-grey-00 border-b-2 py-s first:pt-0"
              key={hit.id}
            >
              <Link
                as={NextLink}
                className="text-[20px] leading-normal"
                href={hit.href}
              >
                {hit.title}
              </Link>
              {hit.excerpt ? (
                <Text as="p" className="hidden lg:block">
                  <span
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: excerpt is built from indexed body and only contains <mark> tags around escaped content
                    dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                  />
                </Text>
              ) : (
                hit.description && (
                  <Text as="p" className="hidden lg:block">
                    {hit.description}
                  </Text>
                )
              )}
              <Text as="p" className="text-mid-grey-00">
                {labelFor(hit)}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
