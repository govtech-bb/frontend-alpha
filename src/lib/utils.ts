import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import type { FormStep } from "@/types";
import type { InformationContent } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sets a nested value in an object using dot notation path
 * Creates intermediate objects as needed
 * @example setNestedValue({}, "guardian.firstName", schema) -> { guardian: { firstName: schema } }
 */
export function setNestedValue<T>(
  obj: Record<string, unknown>,
  path: string,
  value: T
): void {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys.at(-1);
  if (lastKey) {
    current[lastKey] = value;
  }
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

/** e.g. postSecondaryEducation.0.endYear + startYear → postSecondaryEducation.0.startYear */
export function resolveGteSiblingFieldName(
  endFieldName: string,
  siblingFieldKey: string
): string {
  const lastDot = endFieldName.lastIndexOf(".");
  if (lastDot === -1) {
    return siblingFieldKey;
  }
  return `${endFieldName.slice(0, lastDot + 1)}${siblingFieldKey}`;
}

/** Dot path with numeric segments for Zod issue paths (e.g. arr.0.key → ["arr", 0, "key"]) */
export function fieldNameToZodPath(name: string): (string | number)[] {
  return name
    .split(".")
    .map((segment) =>
      /^\d+$/.test(segment) ? Number.parseInt(segment, 10) : segment
    );
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

/**
 * Resolves the effective title for a step, applying conditionalTitle when its condition is met.
 * @param step - The form step
 * @param conditionalFieldValue? - The current value of the codnitional field
 */
export function resolveStepTitle(
  step: FormStep,
  conditionalFieldValue?: unknown
): string {
  if (!step.conditionalTitle) return step.title;

  return conditionalFieldValue === step.conditionalTitle.value
    ? step.conditionalTitle.title
    : step.title;
}

export const findCategoryByPageSlug = (
  slug: string
): InformationContent | undefined =>
  INFORMATION_ARCHITECTURE.find((category) =>
    category.pages.some((page) => page.slug === slug)
  );
