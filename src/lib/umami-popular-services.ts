export type PopularServiceView = {
  serviceSlug: string;
  views: number;
};

type UmamiEventDataEventsRow = {
  eventName: string;
  propertyName: string;
  total: number;
};

const EVENT_SUFFIX = ":page-service-view";

function umamiApiBase(): string {
  const raw =
    process.env.UMAMI_API_BASE?.replace(/\/$/, "") ?? "https://api.umami.is/v1";
  return raw;
}

function websiteId(): string | undefined {
  return (
    process.env.UMAMI_WEBSITE_ID ??
    process.env.NEXT_PUBLIC_UMAMI_SITE_ID ??
    undefined
  );
}

export async function fetchPopularServiceViews(options: {
  startAt: number;
  endAt: number;
  limit?: number;
}): Promise<PopularServiceView[]> {
  const key = process.env.UMAMI_API_KEY;
  const id = websiteId();
  if (!(key && id)) {
    return [];
  }

  const url = new URL(`${umamiApiBase()}/websites/${id}/event-data/events`);
  url.searchParams.set("startAt", String(options.startAt));
  url.searchParams.set("endAt", String(options.endAt));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "x-umami-api-key": key,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Umami event-data/events failed: ${res.status}`);
  }

  const body: unknown = await res.json();
  const rows: UmamiEventDataEventsRow[] = Array.isArray(body)
    ? body
    : body &&
        typeof body === "object" &&
        "data" in body &&
        Array.isArray((body as { data: unknown }).data)
      ? (body as { data: UmamiEventDataEventsRow[] }).data
      : [];

  const viewsBySlug = new Map<string, number>();

  for (const row of rows) {
    if (!row.eventName?.endsWith(EVENT_SUFFIX)) {
      continue;
    }
    if (row.propertyName !== "form") {
      continue;
    }
    const slug = row.eventName.slice(0, -EVENT_SUFFIX.length);
    if (!slug) {
      continue;
    }
    const prev = viewsBySlug.get(slug) ?? 0;
    viewsBySlug.set(slug, Math.max(prev, row.total));
  }

  const sorted = [...viewsBySlug.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([serviceSlug, views]) => ({ serviceSlug, views }));

  const limit = options.limit ?? sorted.length;
  return sorted.slice(0, limit);
}
