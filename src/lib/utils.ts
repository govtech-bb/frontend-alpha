import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import type { ConditionalOn } from "@/types";
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

export const findCategoryByPageSlug = (
  slug: string
): InformationContent | undefined =>
  INFORMATION_ARCHITECTURE.find((category) =>
    category.pages.some((page) => page.slug === slug)
  );

/**
 * Check if a conditional rule is satisfied (OR logic for arrays)
 * @param conditionalOn - Single rule or array of rules
 * @param formValues - Form values object to check against
 * @returns true if any condition matches, false otherwise
 */
export function checkConditionalRule(
  conditionalOn: ConditionalOn,
  formValues: Record<string, unknown>
): boolean {
  const rules = Array.isArray(conditionalOn) ? conditionalOn : [conditionalOn];
  return rules.some(
    (rule) => getNestedValue<unknown>(formValues, rule.field) === rule.value
  );
}

/** Check if any rule in conditionalOn references the given field name */
export function conditionalReferencesField(
  conditionalOn: ConditionalOn,
  fieldName: string
): boolean {
  const rules = Array.isArray(conditionalOn) ? conditionalOn : [conditionalOn];
  return rules.some((rule) => rule.field === fieldName);
}

/** Check if any rule in conditionalOn has the given value */
export function conditionalHasValue(
  conditionalOn: ConditionalOn,
  value: string
): boolean {
  const rules = Array.isArray(conditionalOn) ? conditionalOn : [conditionalOn];
  return rules.some((rule) => rule.value === value);
}

/**
 * Index all field references in a conditionalOn to include the array path
 * Handles both single rules and arrays of rules
 */
export function indexConditionalOn(
  conditionalOn: ConditionalOn,
  indexFieldName: (fieldName: string) => string
): ConditionalOn {
  if (Array.isArray(conditionalOn)) {
    return conditionalOn.map((rule) => ({
      ...rule,
      field: indexFieldName(rule.field),
    }));
  }
  return {
    ...conditionalOn,
    field: indexFieldName(conditionalOn.field),
  };
}

/**
 * Check if a nested field's conditionalOn is satisfied within a field array item
 * Builds indexed field names and checks against watched values
 */
export function checkNestedConditionalRule(
  conditionalOn: ConditionalOn,
  arrayFieldName: string,
  index: number,
  watch: (name: string) => unknown
): boolean {
  const rules = Array.isArray(conditionalOn) ? conditionalOn : [conditionalOn];
  return rules.some((rule) => {
    const indexedFieldName = `${arrayFieldName}.${index}.${rule.field}`;
    return watch(indexedFieldName) === rule.value;
  });
}
