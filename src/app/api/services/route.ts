import { type NextRequest, NextResponse } from "next/server";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

/**
 * A flattened, dashboard-friendly representation of a single service entry.
 *
 * hasImplementation is true when at least one subpage uses type: "component",
 * which means a live form has been built for this service. Services without
 * this are considered backlog — they exist in the IA but have no form yet.
 */
export type ServiceSummary = {
  serviceSlug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  hasImplementation: boolean;
  subPageSlugs: string[];
};

type ServicesResponse = {
  success: boolean;
  data: ServiceSummary[];
};

const ALL_SERVICES: ServiceSummary[] = INFORMATION_ARCHITECTURE.flatMap(
  (category) =>
    category.pages.map((page) => ({
      serviceSlug: page.slug,
      title: page.title,
      categorySlug: category.slug,
      categoryTitle: category.title,
      hasImplementation:
        page.subPages?.some((sp) => sp.type === "component") ?? false,
      subPageSlugs: page.subPages?.map((sp) => sp.slug) ?? [],
    }))
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env
    .NEXT_PUBLIC_SERVICE_DASHBOARD_URL as string,
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * GET /api/services
 *
 * Returns a flattened list of all services from the content directory,
 * annotated with whether they have a live form implementation.
 *
 * Used by the service dashboard to build its full service list, which
 * it then correlates with feature flag data from the form-processor-api.
 *
 * No authentication required — this is metadata about the IA, not
 * user or config data.
 */
export function GET(_request: NextRequest): NextResponse<ServicesResponse> {
  return NextResponse.json(
    { success: true, data: ALL_SERVICES },
    { headers: CORS_HEADERS }
  );
}

/** Handle CORS preflight */
export function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
