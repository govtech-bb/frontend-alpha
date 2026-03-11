"use client";

import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { useState } from "react";

import type { SearchResult } from "@/lib/search";

type Filter = "all" | "online" | "informational";

export function SearchResults({
  results,
  query,
}: {
  results: SearchResult[];
  query: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = results.filter((result) => {
    if (filter === "online") return result.hasOnlineForm;
    if (filter === "informational") return !result.hasOnlineForm;
    return true;
  });

  return (
    <>
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

      <div className="mb-6 flex gap-2">
        <FilterChip
          active={filter === "all"}
          label="All"
          onClick={() => setFilter("all")}
        />
        <FilterChip
          active={filter === "online"}
          label="Online services"
          onClick={() => setFilter("online")}
        />
        <FilterChip
          active={filter === "informational"}
          label="Informational"
          onClick={() => setFilter("informational")}
        />
      </div>

      {filtered.length === 0 && (
        <Text as="p" className="text-mid-grey-00">
          No services match this filter.
        </Text>
      )}

      {filtered.length > 0 && (
        <ul>
          {filtered.map((result) => (
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
                  : "This service is for information purposes only."}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-sm px-3 py-1.5 text-sm leading-normal transition-colors ${
        active
          ? "bg-teal-00 text-white-00"
          : "bg-grey-00 text-black-00 hover:bg-grey-10"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
