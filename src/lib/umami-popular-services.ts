export type PopularPageView = {
  path: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
};

type UmamiMetricsExpandedRow = {
  name: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
};

export async function fetchPopularPages(options: {
  startAt: number;
  endAt: number;
  type?: string;
  limit?: number;
}): Promise<PopularPageView[]> {
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
  url.searchParams.set("type", "path");
  url.searchParams.set("limit", "50");

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

  const limit = options.limit ?? 6;

  return rows
    .filter((row) => {
      const segments = row.name.split("/").filter(Boolean);
      return segments.length >= 2;
    })
    .slice(0, limit)
    .map((row) => ({
      path: row.name,
      pageviews: row.pageviews,
      visitors: row.visitors,
      visits: row.visits,
      bounces: row.bounces,
      totaltime: row.totaltime,
    }));
}
