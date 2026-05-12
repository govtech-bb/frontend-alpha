import { lazy } from "react";

/**
 * Registry of full-page React components served through the
 * [..slug] catch-all at 2-slug depth (category/page-slug).
 *
 * Add an entry here whenever a page in content-directory.ts
 * has `type: "component"` instead of the default markdown flow.
 */
export const PAGE_COMPONENTS = {
  "bank-holiday-calendar": lazy(
    () => import("@/components/pages/bank-holiday-calendar")
  ),
  // Add further component-type pages here
} as const;

export type PageSlug = keyof typeof PAGE_COMPONENTS;
