import { isUmamiEnabled } from "@/lib/umami-env";

export interface PopularPageView {
  path: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
}

interface UmamiMetricsExpandedRow {
  name: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
}

export async function fetchPopularPages(options: {
  startAt: number;
  endAt: number;
  contentType?: string;
  keyword?: string;
  maxResults?: number;
}): Promise<PopularPageView[]> {
  if (!isUmamiEnabled()) {
    return [];
  }

  const key = process.env.UMAMI_API_KEY;
  const id = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;

  if (!(key && id)) {
    return [];
  }

  const url = new URL(
    `https://api.umami.is/v1/websites/${id}/metrics/expanded`
  );
  url.searchParams.set("startAt", String(options.startAt));
  url.searchParams.set("endAt", String(options.endAt));
  // "path" is the Umami grouping key — groups metrics by URL path
  url.searchParams.set("type", "path");
  // Fetch a large batch from Umami so client-side filtering has enough rows to work with
  url.searchParams.set("limit", "500");
  const contentType = options.contentType?.toLowerCase();
  const keyword = options.keyword?.toLowerCase();
  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "x-umami-api-key": key,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Umami metrics/expanded failed: ${res.status}`);
  }

  const body: unknown = await res.json();

  const rows: UmamiMetricsExpandedRow[] = Array.isArray(body)
    ? body
    : body &&
        typeof body === "object" &&
        "data" in body &&
        Array.isArray((body as { data: unknown }).data)
      ? (body as { data: UmamiMetricsExpandedRow[] }).data
      : [];

  const maxResults = options.maxResults ?? 6;

  return rows
    .filter((row) => {
      const segments = row.name.split("/").filter(Boolean);
      if (segments[0] === "api") return false;
      if (segments.length < 2) return false;

      if (contentType) {
        const lastSegment = segments.at(-1)!.toLowerCase();
        if (lastSegment !== contentType) return false;
      }

      if (keyword && !row.name.toLowerCase().includes(keyword)) return false;

      return true;
    })
    .slice(0, maxResults)
    .map((row) => ({
      path: row.name,
      pageviews: row.pageviews,
      visitors: row.visitors,
      visits: row.visits,
      bounces: row.bounces,
      totaltime: row.totaltime,
    }));
}
