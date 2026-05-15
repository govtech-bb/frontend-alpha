/**
 * Aggregates Umami custom events emitted by `useFormTracking` into per-form
 * funnel metrics: unique-session form starts, completions, completion /
 * abandonment rate, completion-time mean / median / p90, and per-step drop-off.
 *
 * Counts are de-duplicated on Umami sessionId — one browser session counts
 * once per event, even if the user reloads or the event fires repeatedly. We
 * use sessionId because the app does not currently call `umami.identify`; if
 * that changes, swap `record.sessionId` for `record.distinctId` below.
 *
 * Umami Cloud only — set UMAMI_API_KEY and NEXT_PUBLIC_UMAMI_SITE_ID. When
 * either is missing, exported helpers return `null` so the perf report can
 * silently omit the section in environments without analytics access (PR
 * forks, local runs).
 */

const DEFAULT_UMAMI_BASE_URL = "https://api.umami.is/v1";
const DEFAULT_DAYS = 7;
const MS_PER_DAY = 86_400_000;
const EVENTS_PAGE_SIZE = 1000;
const MAX_EVENT_PAGES = 50;
const DURATION_PROPERTY = "duration_seconds";

const FORM_START_REGEX = /^(.+?):form-start$/;
const FORM_SUBMIT_REGEX = /^(.+?):form-submit$/;
const FORM_STEP_REGEX = /^(.+?):form-step-([a-z]+)$/;

// Mirrors the `NUMBER_WORDS` table in `src/lib/analytics.ts` (1-based step
// number ↔ word). Kept as a private copy so this script has zero coupling to
// the Next.js source tree.
const NUMBER_WORDS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

/**
 * @typedef {object} StepFunnel
 * @property {number} number 1-based step index parsed from the event suffix.
 * @property {string} eventName Full Umami event name (e.g. `slug:form-step-one`).
 * @property {number} sessions Unique sessions that reached this step AND fired form-start.
 * @property {number | null} conversionFromStartRate sessions / starts.
 * @property {number | null} conversionFromPreviousRate sessions / previous step sessions (form-start for step 1).
 */

/**
 * @typedef {object} DailyPoint
 * @property {string} date ISO `YYYY-MM-DD` (UTC).
 * @property {number} count Unique sessions that fired the event on that day.
 */

/**
 * @typedef {object} FormFunnelRow
 * @property {string} form Slug used as the Umami event prefix.
 * @property {string} label Human-readable label derived from the slug.
 * @property {number} starts Unique sessions that fired `{form}:form-start`.
 * @property {number} completions Unique sessions that fired both start and submit.
 * @property {number | null} completionRate completions / starts (capped at 1).
 * @property {number | null} abandonmentRate 1 - completionRate.
 * @property {number | null} avgCompletionSeconds Weighted mean of `duration_seconds` across completions.
 * @property {number | null} medianCompletionSeconds 50th percentile of `duration_seconds`.
 * @property {number | null} p90CompletionSeconds 90th percentile of `duration_seconds`.
 * @property {StepFunnel[]} steps Per-step drop-off, ordered by step number.
 * @property {{ starts: DailyPoint[]; completions: DailyPoint[] }} series Daily event counts for trend chart.
 * @property {boolean} truncated True when an event hit the pagination cap.
 */

/**
 * @typedef {object} FormAggregate
 * @property {number} starts Total unique-session starts summed across forms.
 * @property {number} completions Total unique-session completions summed across forms.
 * @property {number | null} completionRate completions / starts (capped at 1).
 * @property {number | null} abandonmentRate 1 - completionRate.
 * @property {number | null} avgCompletionSeconds Weighted mean across the merged duration distribution of all forms.
 * @property {number | null} medianCompletionSeconds 50th percentile of the merged distribution.
 * @property {number | null} p90CompletionSeconds 90th percentile of the merged distribution.
 */

/**
 * @typedef {object} FormMetricsResult
 * @property {number} startAt Window start (ms epoch).
 * @property {number} endAt Window end (ms epoch).
 * @property {number} days Window size in days.
 * @property {FormFunnelRow[]} rows Per-form funnel rows, sorted by starts desc.
 * @property {FormAggregate} aggregate Cross-form roll-up for "general stats" headlines.
 */

/**
 * @typedef {object} WebsiteStatsTotals
 * @property {number} pageviews
 * @property {number} visitors
 * @property {number} visits
 */

/**
 * @typedef {object} WebsiteStats
 * @property {number} startAt Window start (ms epoch).
 * @property {number} endAt Window end (ms epoch).
 * @property {number} days Window size in days.
 * @property {number} pageviews Total page views in the window.
 * @property {number} visitors Unique visitors (distinct browsers/devices).
 * @property {number} visits Sessions started in the window — used as the "website visits" headline.
 * @property {WebsiteStatsTotals} previous Equivalent totals for the immediately preceding window of the same length, sourced from Umami's `prev` fields.
 */

function asArray(body) {
  if (Array.isArray(body)) return body;
  if (body && typeof body === "object" && Array.isArray(body.data)) {
    return body.data;
  }
  return [];
}

function humanizeFormSlug(slug) {
  if (!slug) return slug;
  return slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function wordToStepNumber(word) {
  const idx = NUMBER_WORDS.indexOf(word);
  return idx >= 0 ? idx + 1 : null;
}

function setIntersection(a, b) {
  const result = new Set();
  // Iterate the smaller set for a tiny speedup on lopsided funnels
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const value of small) {
    if (large.has(value)) result.add(value);
  }
  return result;
}

async function fetchUmamiJson({ baseUrl, apiKey, path, params }) {
  const url = new URL(`${baseUrl}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "x-umami-api-key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Umami request failed (${res.status} ${res.statusText}): ${url.pathname}${url.search}`
    );
  }

  return res.json();
}

/**
 * Paginates `/events?event={eventName}` and returns:
 *  - `sessions`: window-wide de-duplicated sessionIds (drives funnel headlines).
 *  - `dailySessions`: per-UTC-day session sets (drives unique-session sparklines).
 *
 * Stops when the page is empty or pagination cap is hit.
 *
 * @returns {Promise<{ sessions: Set<string>; dailySessions: Map<string, Set<string>>; truncated: boolean }>}
 */
async function fetchEventSessions({
  baseUrl,
  apiKey,
  websiteId,
  startAt,
  endAt,
  eventName,
}) {
  const sessions = new Set();
  /** @type {Map<string, Set<string>>} */
  const dailySessions = new Map();
  let truncated = false;

  for (let page = 1; page <= MAX_EVENT_PAGES; page += 1) {
    const body = await fetchUmamiJson({
      baseUrl,
      apiKey,
      path: `/websites/${websiteId}/events`,
      params: {
        startAt,
        endAt,
        event: eventName,
        page,
        pageSize: EVENTS_PAGE_SIZE,
      },
    });

    const records = Array.isArray(body?.data) ? body.data : [];
    if (records.length === 0) break;

    for (const record of records) {
      const sessionId = record?.sessionId;
      if (typeof sessionId !== "string" || !sessionId) continue;
      sessions.add(sessionId);

      const createdAt = record?.createdAt;
      if (typeof createdAt !== "string") continue;
      const dateKey = createdAt.slice(0, 10);
      let bucket = dailySessions.get(dateKey);
      if (!bucket) {
        bucket = new Set();
        dailySessions.set(dateKey, bucket);
      }
      bucket.add(sessionId);
    }

    const total = Number(body?.count ?? 0);
    if (page * EVENTS_PAGE_SIZE >= total) break;

    if (page === MAX_EVENT_PAGES) {
      truncated = true;
    }
  }

  return { sessions, dailySessions, truncated };
}

function dailySessionsToSeries(dailySessions, startAt, endAt) {
  const buckets = buildDailyBuckets(startAt, endAt);
  for (const point of buckets) {
    const set = dailySessions.get(point.date);
    point.count = set ? set.size : 0;
  }
  return buckets;
}

function utcDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildDailyBuckets(startAt, endAt) {
  /** @type {DailyPoint[]} */
  const days = [];
  const cursor = new Date(startAt);
  cursor.setUTCHours(0, 0, 0, 0);
  const stop = new Date(endAt);
  stop.setUTCHours(0, 0, 0, 0);
  while (cursor.getTime() <= stop.getTime()) {
    days.push({ date: utcDateKey(cursor), count: 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

function discoverForms(eventRows) {
  /** @type {Map<string, { startEvent?: string; submitEvent?: string; steps: Map<number, { number: number; eventName: string }> }>} */
  const catalog = new Map();

  const ensureEntry = (slug) => {
    let entry = catalog.get(slug);
    if (!entry) {
      entry = { steps: new Map() };
      catalog.set(slug, entry);
    }
    return entry;
  };

  for (const row of eventRows) {
    const name = row?.x;
    if (typeof name !== "string") continue;

    let match = FORM_START_REGEX.exec(name);
    if (match) {
      ensureEntry(match[1]).startEvent = name;
      continue;
    }

    match = FORM_SUBMIT_REGEX.exec(name);
    if (match) {
      ensureEntry(match[1]).submitEvent = name;
      continue;
    }

    match = FORM_STEP_REGEX.exec(name);
    if (match) {
      const stepNumber = wordToStepNumber(match[2]);
      if (!stepNumber) continue;
      const entry = ensureEntry(match[1]);
      // Discovery yields each step once; first-write-wins is fine
      if (!entry.steps.has(stepNumber)) {
        entry.steps.set(stepNumber, { number: stepNumber, eventName: name });
      }
    }
  }

  return catalog;
}

/**
 * Computes mean, median (p50), and p90 from a value-distribution as returned
 * by `event-data/values`: `[{ value, total }]`.
 */
function summarizeDurationValues(rows) {
  const items = rows
    .map((row) => ({
      value: Number(row?.value),
      count: Number(row?.total ?? 0),
    }))
    .filter((item) => Number.isFinite(item.value) && item.count > 0)
    .sort((a, b) => a.value - b.value);

  let total = 0;
  let sum = 0;
  for (const item of items) {
    total += item.count;
    sum += item.value * item.count;
  }
  if (total === 0) return { mean: null, median: null, p90: null };

  const percentile = (fraction) => {
    const target = total * fraction;
    let cumulative = 0;
    for (const item of items) {
      cumulative += item.count;
      if (cumulative >= target) return item.value;
    }
    return items.at(-1)?.value ?? null;
  };

  return {
    mean: sum / total,
    median: percentile(0.5),
    p90: percentile(0.9),
  };
}

/**
 * Fetches per-form funnel metrics from Umami Cloud for the given window.
 *
 * Returns `null` when required credentials are missing rather than throwing,
 * so the perf report can degrade gracefully on PRs/forks.
 *
 * @param {{ days?: number; now?: number }} [options]
 * @returns {Promise<FormMetricsResult | null>}
 */
export async function fetchFormFunnelMetrics(options = {}) {
  const apiKey = process.env.UMAMI_API_KEY;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
  if (!(apiKey && websiteId)) return null;

  const baseUrl = (
    process.env.UMAMI_API_BASE_URL ?? DEFAULT_UMAMI_BASE_URL
  ).replace(/\/$/, "");
  const days = Math.max(1, Math.min(365, options.days ?? DEFAULT_DAYS));
  const endAt = options.now ?? Date.now();
  const startAt = endAt - days * MS_PER_DAY;
  const ctx = { baseUrl, apiKey, websiteId, startAt, endAt };

  const eventCatalogBody = await fetchUmamiJson({
    baseUrl,
    apiKey,
    path: `/websites/${websiteId}/metrics`,
    params: { startAt, endAt, type: "event", limit: 500 },
  });
  const catalog = discoverForms(asArray(eventCatalogBody));

  /** @type {FormFunnelRow[]} */
  const rows = [];

  // Merged across forms so we can compute true weighted aggregates (rather than
  // averaging per-form averages, which would mis-weight small/large forms).
  /** @type {Array<{ value: number; total: number }>} */
  const aggregateDurationRows = [];
  let aggregateStarts = 0;
  let aggregateCompletions = 0;

  for (const [form, entry] of catalog.entries()) {
    if (!entry.startEvent) {
      // No form-start signal means we can't compute a meaningful funnel
      continue;
    }

    const sortedSteps = [...entry.steps.values()].sort(
      (a, b) => a.number - b.number
    );

    const [startResult, submitResult, durationValues, ...stepResults] =
      await Promise.all([
        fetchEventSessions({ ...ctx, eventName: entry.startEvent }),
        entry.submitEvent
          ? fetchEventSessions({ ...ctx, eventName: entry.submitEvent })
          : Promise.resolve({
              sessions: new Set(),
              dailySessions: new Map(),
              truncated: false,
            }),
        entry.submitEvent
          ? fetchUmamiJson({
              baseUrl,
              apiKey,
              path: `/websites/${websiteId}/event-data/values`,
              params: {
                startAt,
                endAt,
                event: entry.submitEvent,
                propertyName: DURATION_PROPERTY,
              },
            }).then(asArray)
          : Promise.resolve([]),
        ...sortedSteps.map((step) =>
          fetchEventSessions({ ...ctx, eventName: step.eventName })
        ),
      ]);

    const startsSeries = dailySessionsToSeries(
      startResult.dailySessions,
      startAt,
      endAt
    );
    const completionsSeries = dailySessionsToSeries(
      submitResult.dailySessions,
      startAt,
      endAt
    );

    const startSessions = startResult.sessions;
    const submitSessions = submitResult.sessions;
    const completions = setIntersection(startSessions, submitSessions);

    let previousSessions = startSessions;
    /** @type {StepFunnel[]} */
    const steps = sortedSteps.map((step, idx) => {
      const reached = stepResults[idx]?.sessions ?? new Set();
      const reachedFromStart = setIntersection(startSessions, reached);
      const reachedFromPrevious = setIntersection(previousSessions, reached);

      const stepRow = {
        number: step.number,
        eventName: step.eventName,
        sessions: reachedFromStart.size,
        conversionFromStartRate:
          startSessions.size > 0
            ? reachedFromStart.size / startSessions.size
            : null,
        conversionFromPreviousRate:
          previousSessions.size > 0
            ? reachedFromPrevious.size / previousSessions.size
            : null,
      };

      previousSessions = reached;
      return stepRow;
    });

    const completionRate =
      startSessions.size > 0
        ? Math.min(1, completions.size / startSessions.size)
        : null;
    const abandonmentRate =
      completionRate === null ? null : Math.max(0, 1 - completionRate);

    const { mean, median, p90 } = summarizeDurationValues(durationValues);

    const truncated =
      startResult.truncated ||
      submitResult.truncated ||
      stepResults.some((s) => s?.truncated);

    rows.push({
      form,
      label: humanizeFormSlug(form),
      starts: startSessions.size,
      completions: completions.size,
      completionRate,
      abandonmentRate,
      avgCompletionSeconds: mean,
      medianCompletionSeconds: median,
      p90CompletionSeconds: p90,
      steps,
      series: { starts: startsSeries, completions: completionsSeries },
      truncated,
    });

    aggregateStarts += startSessions.size;
    aggregateCompletions += completions.size;
    aggregateDurationRows.push(...durationValues);
  }

  rows.sort((a, b) => b.starts - a.starts || b.completions - a.completions);

  const aggregateCompletionRate =
    aggregateStarts > 0
      ? Math.min(1, aggregateCompletions / aggregateStarts)
      : null;
  const aggregateAbandonmentRate =
    aggregateCompletionRate === null
      ? null
      : Math.max(0, 1 - aggregateCompletionRate);
  const aggregateDuration = summarizeDurationValues(aggregateDurationRows);

  /** @type {FormAggregate} */
  const aggregate = {
    starts: aggregateStarts,
    completions: aggregateCompletions,
    completionRate: aggregateCompletionRate,
    abandonmentRate: aggregateAbandonmentRate,
    avgCompletionSeconds: aggregateDuration.mean,
    medianCompletionSeconds: aggregateDuration.median,
    p90CompletionSeconds: aggregateDuration.p90,
  };

  return { startAt, endAt, days, rows, aggregate };
}

/**
 * Fetches site-wide visit counts for the same reporting window used by the
 * form funnel. Returns `null` when Umami credentials are missing so callers can
 * skip the section silently in environments without analytics access.
 *
 * @param {{ days?: number; now?: number }} [options]
 * @returns {Promise<WebsiteStats | null>}
 */
export async function fetchWebsiteStats(options = {}) {
  const apiKey = process.env.UMAMI_API_KEY;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;
  if (!(apiKey && websiteId)) return null;

  const baseUrl = (
    process.env.UMAMI_API_BASE_URL ?? DEFAULT_UMAMI_BASE_URL
  ).replace(/\/$/, "");
  const days = Math.max(1, Math.min(365, options.days ?? DEFAULT_DAYS));
  const endAt = options.now ?? Date.now();
  const startAt = endAt - days * MS_PER_DAY;

  const body = await fetchUmamiJson({
    baseUrl,
    apiKey,
    path: `/websites/${websiteId}/stats`,
    params: { startAt, endAt },
  });

  // Umami Cloud returns metrics as flat numbers at the top level plus an
  // equally-shaped `comparison` block for the immediately preceding window.
  // (Self-hosted v1 used a `{ value, prev }` shape — we don't target that
  // here.) Coerce defensively because zero-traffic windows can omit fields.
  const readNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  };

  const comparison = body?.comparison ?? {};

  return {
    days,
    startAt,
    endAt,
    pageviews: readNumber(body?.pageviews),
    visitors: readNumber(body?.visitors),
    visits: readNumber(body?.visits),
    previous: {
      pageviews: readNumber(comparison.pageviews),
      visitors: readNumber(comparison.visitors),
      visits: readNumber(comparison.visits),
    },
  };
}
