"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm({
  defaultValue = "",
  searchPath = "/search-results",
  emptyFallbackPath,
}: {
  defaultValue?: string;
  searchPath?: string;
  emptyFallbackPath?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed && emptyFallbackPath) {
      router.push(emptyFallbackPath);
      return;
    }
    router.push(
      trimmed
        ? `${searchPath}?q=${encodeURIComponent(trimmed)}`
        : (emptyFallbackPath ?? "/services")
    );
  }

  return (
    <search aria-label="Search for a service">
      <form
        action="/search-results"
        className="flex w-full"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="service-search">
          Search for a service
        </label>
        <input
          className="h-15.5 w-full min-w-0 flex-1 rounded-l-sm bg-white-00 px-4 text-[20px] leading-normal outline-none transition-all focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-teal-100"
          id="service-search"
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          value={query}
        />
        <button
          className="h-15.5 rounded-r-sm bg-teal-00 px-6 text-[20px] text-white-00 leading-normal outline-none transition-[background-color,box-shadow] duration-200 hover:bg-[#1a777d] hover:shadow-[inset_0_0_0_4px_rgba(222,245,246,0.10)] focus-visible:ring-4 focus-visible:ring-teal-100 focus-visible:ring-offset-1 active:bg-[#0a4549] active:shadow-[inset_0_0_0_3px_rgba(0,0,0,0.20)] active:ring-4 active:ring-teal-100 active:ring-offset-1"
          type="submit"
        >
          Search
        </button>
      </form>
    </search>
  );
}
