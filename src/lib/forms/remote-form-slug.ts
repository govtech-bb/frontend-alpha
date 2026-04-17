/**
 * Remote form slugs are used in URLs and as S3 object key segments.
 * Restrict to lowercase kebab-case to avoid path traversal and odd keys.
 */
const REMOTE_FORM_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidRemoteFormSlug(slug: string): boolean {
  return (
    slug.length > 0 &&
    slug.length <= 128 &&
    REMOTE_FORM_SLUG_PATTERN.test(slug) &&
    !slug.startsWith("-") &&
    !slug.endsWith("-")
  );
}

export function assertValidRemoteFormSlug(slug: string): void {
  if (!isValidRemoteFormSlug(slug)) {
    throw new Error("Invalid remote form slug");
  }
}
