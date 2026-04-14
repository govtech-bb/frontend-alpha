"use client";

import { Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";

type PopularPageView = {
  path: string;
  visitors: number;
};

function slugToTitle(path: string): string {
  const segments = path.split("/").filter(Boolean);
  const filtered = segments.filter((s) => s !== "form");
  const last = filtered[filtered.length - 1] ?? "";
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function PopularServicesList({
  services,
}: {
  services: PopularPageView[];
}) {
  if (services.length === 0) return null;

  return (
    <div className="space-y-2">
      <Text as="p" className="font-bold">
        Popular services
      </Text>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {services.map((service) => (
          <Link
            as={NextLink}
            className="flex items-center justify-between rounded-sm border border-teal-40 bg-white-00 px-4 py-3 text-[18px] leading-normal no-underline transition-colors hover:bg-teal-10"
            href={service.path}
            key={service.path}
          >
            <span>{slugToTitle(service.path)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
