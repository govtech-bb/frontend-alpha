/**
 * Maps `storageKey` (form slug) to the key expected by the processing API
 * (`/forms/{key}/submit`). Use when S3 `formSlug` differs from the backend key.
 *
 * Set `NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP` to a JSON object, e.g.
 * `{"project-dawn-training-programme-application":"apply-for-project-dawn"}`.
 */
export function resolveFormSubmitApiKey(storageKey: string): string {
  const raw = process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP;
  if (!raw?.trim()) {
    return storageKey;
  }
  try {
    const map = JSON.parse(raw) as Record<string, string>;
    if (map && typeof map === "object") {
      const mapped = map[storageKey];
      if (typeof mapped === "string" && mapped.length > 0) {
        return mapped;
      }
    }
  } catch {
    // ignore invalid JSON
  }
  return storageKey;
}
