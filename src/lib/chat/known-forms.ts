import { FORM_STORAGE_KEYS, type FormSlug } from "@/lib/form-registry";

// Forms intentionally excluded from chat handoff. Calculators and permit
// pages don't slot into the chat's "collect → review → submit" flow.
const CHAT_EXCLUDED = new Set<FormSlug>([
  "calculate-severance-pay",
  "calculate-your-pension",
  "crop-over-permits",
]);

const FORM_SLUG_ENTRIES = (
  Object.entries(FORM_STORAGE_KEYS) as Array<[FormSlug, string]>
).filter(([page]) => !CHAT_EXCLUDED.has(page));

export function knownFormSlugsInSources(
  urls: Array<string | undefined>
): string[] {
  const hits = new Set<string>();
  for (const url of urls) {
    if (!url) continue;
    for (const [pageSlug, storageSlug] of FORM_SLUG_ENTRIES) {
      if (url.includes(`/${pageSlug}`)) hits.add(storageSlug);
    }
  }
  return [...hits];
}
