/**
 * The protection config for a single service, mirroring the API response shape.
 *
 * The form-processor-api stores protection at both the service level
 * (isProtected) and per-subpage (subpages array).  Three helper functions
 * provide the right granularity:
 *
 * - `isServiceProtected()`    — service-level flag only (hides from listings)
 * - `hasProtectedSubpages()`  — any subpage flagged (hides start-link CTA)
 * - `isSubpageProtected()`    — specific subpage flagged (404s that subpage)
 */
export type ServiceAccessConfig = {
  serviceSlug: string;
  isProtected: boolean;
  subpages: Array<{ slug: string; isProtected: boolean }>;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_PROCESSING_API;

/**
 * Fetches the full protection config for every service that has DB entries,
 * returned as a Map keyed by serviceSlug.
 *
 * Used by the category listing page so a single request covers all services.
 * Services absent from the map are implicitly unprotected.
 *
 * Cached for 5 minutes — protection config changes infrequently.
 */
export async function fetchAllServiceAccess(): Promise<
  Map<string, ServiceAccessConfig>
> {
  if (!API_BASE_URL) {
    return new Map();
  }

  try {
    const res = await fetch(`${API_BASE_URL}/services`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return new Map();
    }

    const json: ApiResponse<ServiceAccessConfig[]> = await res.json();
    return new Map(json.data.map((c) => [c.serviceSlug, c]));
  } catch {
    return new Map();
  }
}

/**
 * Fetches the full protection config for a single service.
 *
 * Returns null when the service has no DB entries (implicitly unprotected).
 * Also returns null if the API is unreachable — fail open.
 */
export async function fetchServiceConfig(
  serviceSlug: string
): Promise<ServiceAccessConfig | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/services/${serviceSlug}`, {
      cache: "no-store",
    });

    if (res.status === 404 || !res.ok) {
      return null;
    }

    const json: ApiResponse<ServiceAccessConfig> = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

/**
 * Returns whether the service itself is protected (service-level flag only).
 * Used by the category listing to decide whether to hide the service entirely.
 * Subpage-level flags do NOT hide the service from the listing.
 */
export function isServiceProtected(
  config: ServiceAccessConfig | null
): boolean {
  return config?.isProtected ?? false;
}

/**
 * Returns whether any subpage (start, form) is protected.
 * Used by the entry page to decide whether to hide the start-link CTA.
 */
export function hasProtectedSubpages(
  config: ServiceAccessConfig | null
): boolean {
  if (!config) return false;
  return config.subpages.some((sp) => sp.isProtected);
}

/**
 * Returns whether a specific subpage is protected.
 * Used by subpage routes to decide whether to 404.
 */
export function isSubpageProtected(
  config: ServiceAccessConfig | null,
  subpageSlug: string
): boolean {
  return (
    config?.subpages.find((sp) => sp.slug === subpageSlug)?.isProtected ?? false
  );
}
