import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import type { InformationContent } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get a nested value from an object using dot notation path
 * @example getNestedValue({ guardian: { firstName: "John" } }, "guardian.firstName") // "John"
 */
export function getNestedValue<T>(
  obj: Record<string, unknown>,
  path: string
): T | undefined {
  const keys = path.split(".");
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return result as T | undefined;
}

export function findSubPageTitleFromPath(
  data: InformationContent[],
  path: string
): string | undefined {
  const segments = path.replace(/^\/|\/$/g, "").split("/");
  const [sectionSlug, pageSlug, subPageSlug] = segments;

  const section = data.find((s) => s.slug === sectionSlug);
  const page = section?.pages.find((p) => p.slug === pageSlug);
  const subPage = page?.subPages?.find((sp) => sp.slug === subPageSlug);

  return subPage?.title ?? page?.title;
}

/**
 * Normalizes a text field value before validation:
 * removes leading whitespace and trailing whitespace or full stops.
 */
export function normalizeTextValue(value: string): string {
  return value.replace(/^\s+/, "").replace(/[\s.]+$/, "");
}

export const findCategoryByPageSlug = (
  slug: string
): InformationContent | undefined =>
  INFORMATION_ARCHITECTURE.find((category) =>
    category.pages.some((page) => page.slug === slug)
  );
