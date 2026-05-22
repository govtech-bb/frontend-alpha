import { FORM_STORAGE_KEYS, type FormSlug } from "@/lib/form-registry";
import { CHAT_FORM_SCHEMA_LOADERS } from "./schema-registry";

// Single source of truth: a form is chat-eligible iff its storage slug has
// a loader in schema-registry. Build the (pageSlug, storageSlug) pairs the
// retriever needs for URL → slug matching by intersecting the loader keys
// with FORM_STORAGE_KEYS.
const CHAT_FORM_ENTRIES: [FormSlug, string][] = (
  Object.entries(FORM_STORAGE_KEYS) as [FormSlug, string][]
).filter(([, storage]) => storage in CHAT_FORM_SCHEMA_LOADERS);

export function knownFormSlugsInSources(
  urls: Array<string | undefined>
): string[] {
  const hits = new Set<string>();
  for (const url of urls) {
    if (!url) continue;
    for (const [pageSlug, storageSlug] of CHAT_FORM_ENTRIES) {
      if (url.includes(`/${pageSlug}`)) hits.add(storageSlug);
    }
  }
  return [...hits];
}
