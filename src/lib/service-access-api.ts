/**
 * The full protection config for a single service, mirroring the API response shape.
 *
 * isProtected  — when true, the service is hidden from its category listing
 * subpages     — per-subpage entries; a subpage absent from this array is unprotected
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
 * Returns whether a specific subpage is protected, given a resolved config.
 * A subpage absent from the config's subpages array is unprotected.
 */
export function isSubpageProtected(
  config: ServiceAccessConfig | null,
  subpageSlug: string
): boolean {
  return (
    config?.subpages.find((sp) => sp.slug === subpageSlug)?.isProtected ?? false
  );
}

/**
 * Returns whether a service has any protected subpages, given a resolved config.
 * Used by the service entry page to decide whether to pass hasResearchAccess
 * to MarkdownContent for conditional in-page rendering.
 */
export function hasProtectedSubpages(
  config: ServiceAccessConfig | null
): boolean {
  return config?.subpages.some((sp) => sp.isProtected) ?? false;
}
