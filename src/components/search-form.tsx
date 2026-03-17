"use client";

import { Search } from "@govtech-bb/react";
import { useRouter } from "next/navigation";

export function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();

  function handleSearch(query: string) {
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <Search
      action="/search"
      defaultValue={defaultValue}
      label="Search for a service"
      onSearch={handleSearch}
    />
  );
}
