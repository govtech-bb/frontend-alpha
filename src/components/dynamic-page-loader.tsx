"use client";

import { Suspense } from "react";
import { PAGE_COMPONENTS, type PageSlug } from "@/lib/page-registry";

interface DynamicPageLoaderProps {
  pageSlug: string;
}

export function DynamicPageLoader({ pageSlug }: DynamicPageLoaderProps) {
  const PageComponent = PAGE_COMPONENTS[pageSlug as PageSlug];

  if (!PageComponent) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <PageComponent />
    </Suspense>
  );
}
