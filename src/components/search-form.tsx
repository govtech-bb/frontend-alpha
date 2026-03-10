"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm({
  defaultValue = "",
  id = "service-search",
}: {
  defaultValue?: string;
  id?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <search>
      <form action="/search" className="flex w-full" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={id}>
          Search for a service
        </label>
        <input
          className="h-15.5 w-full min-w-0 flex-1 rounded-l-sm bg-white-00 px-4 text-[20px] leading-normal outline-none"
          id={id}
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          value={query}
        />
        <button
          className="h-15.5 rounded-r-sm bg-teal-00 px-6 text-[20px] text-white-00 leading-normal"
          type="submit"
        >
          Search
        </button>
      </form>
    </search>
  );
}
