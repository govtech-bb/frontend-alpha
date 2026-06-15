/**
 * Runs Lighthouse against key URLs, then Playwright (axe accessibility audit),
 * and writes a static `performance-report/index.html` plus per-route Lighthouse HTML.
 *
 * Expects the production server to be listening unless you rely on `playwright.perf.config.ts`
 * to start it (omit PERF_EXTERNAL_SERVER). CI starts `next start` and sets PERF_EXTERNAL_SERVER=1.
 */

import { execSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launch as launchChrome } from "chrome-launcher";
import lighthouse, { generateReport } from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { chromium } from "playwright";
import waitOn from "wait-on";
import {
  fetchFormFunnelMetrics,
  fetchWebsiteStats,
} from "./umami-form-metrics.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const MS_PER_DAY = 86_400_000;

const PAGES = [
  { slug: "home", path: "/", label: "Home" },
  { slug: "search", path: "/search-results?q=birth", label: "Search results" },
  {
    slug: "form-birth-certificate",
    path: "/family-birth-relationships/get-birth-certificate/form",
    label: "Birth certificate form",
  },
];

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function scoreToPercent(score) {
  if (typeof score !== "number" || Number.isNaN(score)) return "—";
  return `${Math.round(score * 100)}`;
}

async function runLighthouseSuite(baseUrl, outDir, lhDir) {
  const chromePath = chromium.executablePath();
  const chrome = await launchChrome({
    chromePath,
    chromeFlags: [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const results = [];

  try {
    for (const page of PAGES) {
      const url = new URL(page.path, baseUrl).href;
      const runnerResult = await lighthouse(
        url,
        {
          port: chrome.port,
          logLevel: "error",
        },
        desktopConfig
      );

      if (!runnerResult?.lhr) {
        throw new Error(`Lighthouse returned no LHR for ${page.slug}`);
      }

      const { lhr } = runnerResult;
      const jsonPath = path.join(lhDir, `${page.slug}.json`);
      const htmlPath = path.join(outDir, "lighthouse", `${page.slug}.html`);

      await writeFile(jsonPath, `${JSON.stringify(lhr, null, 2)}\n`, "utf8");
      await writeFile(htmlPath, generateReport(lhr, "html"), "utf8");

      results.push({ page, lhr });
    }
  } finally {
    await chrome.kill();
  }

  return results;
}

function runPlaywrightMetrics(baseUrl) {
  execSync(
    "npx playwright test -c playwright.perf.config.ts tests/perf/metrics.spec.ts",
    {
      cwd: ROOT,
      stdio: "inherit",
      env: {
        ...process.env,
        BASE_URL: baseUrl,
        PERF_EXTERNAL_SERVER: process.env.PERF_EXTERNAL_SERVER ?? "",
      },
    }
  );
}

async function readJson(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function formatPercent(rate) {
  if (rate === null || rate === undefined || Number.isNaN(rate)) return "—";
  return `${(rate * 100).toFixed(1)}%`;
}

function formatInteger(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return Number(value).toLocaleString("en-US");
}

const DELTA_COLOR_GOOD = "#16a34a";
const DELTA_COLOR_BAD = "#dc2626";
const DELTA_COLOR_NEUTRAL = "#64748b";

/**
 * Computes a week-over-week delta between two scalar values.
 *
 * `mode` controls how the difference is expressed:
 *  - "percent-points" — for rates that are already 0..1 fractions (e.g.,
 *    completion rate). Diff is rendered as `±N.Npp`, which is more honest
 *    than a relative % on a percentage.
 *  - "relative" — for counts/durations. Diff is rendered as `±N.N%`. Falls
 *    back to "new" when the prior window was zero so the badge stays useful.
 *
 * Returns `null` when a delta can't be computed so callers can hide the badge.
 *
 * @returns {{ display: string; arrow: string; color: string } | null}
 */
function buildDelta({ current, previous, higherIsBetter, mode }) {
  if (current === null || current === undefined || Number.isNaN(current)) {
    return null;
  }
  if (previous === null || previous === undefined || Number.isNaN(previous)) {
    return null;
  }

  let direction;
  let display;

  if (mode === "percent-points") {
    const diffPp = (current - previous) * 100;
    direction = Math.sign(diffPp);
    const sign = diffPp > 0 ? "+" : "";
    display = `${sign}${diffPp.toFixed(1)}pp`;
  } else if (previous === 0) {
    if (current === 0) {
      direction = 0;
      display = "no change";
    } else {
      direction = Math.sign(current);
      display = current > 0 ? "new" : "—";
    }
  } else {
    const rel = ((current - previous) / previous) * 100;
    direction = Math.sign(rel);
    const sign = rel > 0 ? "+" : "";
    display = `${sign}${rel.toFixed(1)}%`;
  }

  const arrow = direction > 0 ? "▲" : direction < 0 ? "▼" : "→";
  let color = DELTA_COLOR_NEUTRAL;
  if (direction !== 0) {
    const isGood = higherIsBetter ? direction > 0 : direction < 0;
    color = isGood ? DELTA_COLOR_GOOD : DELTA_COLOR_BAD;
  }

  return { display, arrow, color };
}

function renderDelta(delta, windowLabel) {
  if (!delta) return "";
  return `<div class="stat-delta" style="color:${delta.color}">${delta.arrow} ${escapeHtml(delta.display)}<span class="stat-delta-context"> vs ${escapeHtml(windowLabel)}</span></div>`;
}

function formatSeconds(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  if (value < 60) return `${value.toFixed(1)}s`;
  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  return `${minutes}m ${seconds}s`;
}

function formatWindow(formMetrics) {
  if (!formMetrics) return "";
  const start = new Date(formMetrics.startAt).toISOString().slice(0, 10);
  const end = new Date(formMetrics.endAt).toISOString().slice(0, 10);
  return `${start} → ${end} (${formMetrics.days} days)`;
}

const SPARKLINE_WIDTH = 140;
const SPARKLINE_HEIGHT = 32;
const SPARKLINE_STARTS_COLOR = "#94a3b8";
const SPARKLINE_COMPLETIONS_COLOR = "#0d9488";

function seriesToPolylinePoints(series, max, width, height) {
  if (series.length === 0) return "";
  if (series.length === 1) {
    const y = (height - (series[0].count / max) * height).toFixed(2);
    return `0,${y} ${width},${y}`;
  }
  const stepX = width / (series.length - 1);
  return series
    .map((point, idx) => {
      const x = (idx * stepX).toFixed(2);
      const y = (height - (point.count / max) * height).toFixed(2);
      return `${x},${y}`;
    })
    .join(" ");
}

function renderTrendSparkline(series, label) {
  const starts = series?.starts ?? [];
  const completions = series?.completions ?? [];
  if (starts.length === 0 && completions.length === 0) return "—";

  const max = Math.max(
    1,
    ...starts.map((p) => p.count),
    ...completions.map((p) => p.count)
  );

  const startsPoints = seriesToPolylinePoints(
    starts,
    max,
    SPARKLINE_WIDTH,
    SPARKLINE_HEIGHT
  );
  const completionsPoints = seriesToPolylinePoints(
    completions,
    max,
    SPARKLINE_WIDTH,
    SPARKLINE_HEIGHT
  );

  return `<svg width="${SPARKLINE_WIDTH}" height="${SPARKLINE_HEIGHT}" viewBox="0 0 ${SPARKLINE_WIDTH} ${SPARKLINE_HEIGHT}" role="img" aria-label="${escapeHtml(label)} daily trend">
  ${startsPoints ? `<polyline fill="none" stroke="${SPARKLINE_STARTS_COLOR}" stroke-width="1.25" points="${startsPoints}" />` : ""}
  ${completionsPoints ? `<polyline fill="none" stroke="${SPARKLINE_COMPLETIONS_COLOR}" stroke-width="1.5" points="${completionsPoints}" />` : ""}
</svg>`;
}

function renderStepsTable(steps) {
  if (steps.length === 0) {
    return '<p class="meta">No <code>form-step-*</code> events recorded for this form.</p>';
  }
  const rows = steps
    .map(
      (step) => `<tr>
  <td>Step ${escapeHtml(String(step.number))}</td>
  <td>${escapeHtml(String(step.sessions))}</td>
  <td>${escapeHtml(formatPercent(step.conversionFromStartRate))}</td>
  <td>${escapeHtml(formatPercent(step.conversionFromPreviousRate))}</td>
</tr>`
    )
    .join("\n");

  return `<table>
  <thead>
    <tr>
      <th>Step</th>
      <th>Unique sessions</th>
      <th>From start</th>
      <th>From previous step</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>`;
}

function renderGeneralStatsSection({
  formMetrics,
  formMetricsPrior,
  websiteStats,
  reportDays,
}) {
  // Skip the section entirely when neither data source is available so we
  // don't clutter the report with placeholder cards.
  if (!(formMetrics || websiteStats)) {
    return `
  <section>
    <h2>General stats</h2>
    <p class="meta">Skipped — set <code>UMAMI_API_KEY</code> and <code>NEXT_PUBLIC_UMAMI_SITE_ID</code> to include site-wide aggregates.</p>
  </section>`;
  }

  // Prefer the form metrics window since both helpers are called with the same
  // `reportDays`; fall back to website stats, then the env-supplied default.
  const window = formMetrics ?? websiteStats;
  const windowText = window
    ? formatWindow({
        startAt: window.startAt,
        endAt: window.endAt,
        days: window.days,
      })
    : `last ${reportDays} days`;
  const deltaWindowLabel = `prior ${reportDays} days`;

  const aggregate = formMetrics?.aggregate;
  const aggregatePrior = formMetricsPrior?.aggregate;

  const cards = [
    {
      label: "Website visits",
      value: websiteStats ? formatInteger(websiteStats.visits) : "—",
      delta: websiteStats
        ? buildDelta({
            current: websiteStats.visits,
            previous: websiteStats.previous.visits,
            higherIsBetter: true,
            mode: "relative",
          })
        : null,
      sub: websiteStats
        ? `${formatInteger(websiteStats.visitors)} unique visitors · ${formatInteger(websiteStats.pageviews)} page views`
        : "Umami stats unavailable",
    },
    {
      label: "Form completion rate",
      value: aggregate ? formatPercent(aggregate.completionRate) : "—",
      delta:
        aggregate && aggregatePrior
          ? buildDelta({
              current: aggregate.completionRate,
              previous: aggregatePrior.completionRate,
              higherIsBetter: true,
              mode: "percent-points",
            })
          : null,
      sub: aggregate
        ? `${formatInteger(aggregate.completions)} of ${formatInteger(aggregate.starts)} starts completed`
        : "No form events recorded",
    },
    {
      label: "Form abandonment rate",
      value: aggregate ? formatPercent(aggregate.abandonmentRate) : "—",
      delta:
        aggregate && aggregatePrior
          ? buildDelta({
              current: aggregate.abandonmentRate,
              previous: aggregatePrior.abandonmentRate,
              higherIsBetter: false,
              mode: "percent-points",
            })
          : null,
      sub: aggregate
        ? `${formatInteger(aggregate.starts - aggregate.completions)} starts abandoned`
        : "No form events recorded",
    },
    {
      label: "Avg time to complete a form",
      value: aggregate ? formatSeconds(aggregate.avgCompletionSeconds) : "—",
      delta:
        aggregate && aggregatePrior
          ? buildDelta({
              current: aggregate.avgCompletionSeconds,
              previous: aggregatePrior.avgCompletionSeconds,
              higherIsBetter: false,
              mode: "relative",
            })
          : null,
      sub: aggregate
        ? `Median ${formatSeconds(aggregate.medianCompletionSeconds)} · p90 ${formatSeconds(aggregate.p90CompletionSeconds)}`
        : "No form-submit duration data",
    },
  ];

  const cardMarkup = cards
    .map(
      (card) => `<div class="stat">
  <div class="stat-label">${escapeHtml(card.label)}</div>
  <div class="stat-value">${escapeHtml(card.value)}</div>
  ${renderDelta(card.delta, deltaWindowLabel)}
  <div class="stat-sub">${escapeHtml(card.sub)}</div>
</div>`
    )
    .join("\n");

  return `
  <section>
    <h2>General stats</h2>
    <p class="meta">
      Aggregated across all forms and the entire website for ${escapeHtml(windowText)}.
      Each card compares to the immediately preceding ${escapeHtml(String(reportDays))}-day window.
      Form rates roll up unique-session starts and completions; the average uses the merged <code>duration_seconds</code> distribution from <code>form-submit</code>.
    </p>
    <div class="stats-grid">${cardMarkup}</div>
  </section>`;
}

function renderFormMetricsSection(formMetrics) {
  if (!formMetrics) {
    return `
  <section>
    <h2>Form completion analytics</h2>
    <p class="meta">Skipped — set <code>UMAMI_API_KEY</code> and <code>NEXT_PUBLIC_UMAMI_SITE_ID</code> to include Umami funnel metrics.</p>
  </section>`;
  }

  if (formMetrics.rows.length === 0) {
    return `
  <section>
    <h2>Form completion analytics</h2>
    <p class="meta">Window ${escapeHtml(formatWindow(formMetrics))}. No <code>form-start</code> / <code>form-submit</code> events recorded.</p>
  </section>`;
  }

  const summaryRows = formMetrics.rows
    .map(
      (row) => `<tr>
  <td>${escapeHtml(row.label)}<br /><code style="color:#64748b;font-size:0.75rem">${escapeHtml(row.form)}</code>${row.truncated ? ' <span title="Pagination cap reached; numbers may be a lower bound" style="color:#b45309">⚠</span>' : ""}</td>
  <td>${escapeHtml(String(row.starts))}</td>
  <td>${escapeHtml(String(row.completions))}</td>
  <td>${escapeHtml(formatPercent(row.completionRate))}</td>
  <td>${escapeHtml(formatPercent(row.abandonmentRate))}</td>
  <td>${escapeHtml(formatSeconds(row.avgCompletionSeconds))}</td>
  <td>${escapeHtml(formatSeconds(row.medianCompletionSeconds))}</td>
  <td>${escapeHtml(formatSeconds(row.p90CompletionSeconds))}</td>
  <td>${renderTrendSparkline(row.series, row.label)}</td>
</tr>`
    )
    .join("\n");

  const stepBlocks = formMetrics.rows
    .map(
      (row) => `<details>
  <summary><strong>${escapeHtml(row.label)}</strong> — ${escapeHtml(String(row.steps.length))} step${row.steps.length === 1 ? "" : "s"}</summary>
  ${renderStepsTable(row.steps)}
</details>`
    )
    .join("\n");

  return `
  <section>
    <h2>Form completion analytics</h2>
    <p class="meta">
      Umami funnel for ${escapeHtml(formatWindow(formMetrics))}. Counts are unique browser sessions (de-duplicated on <code>sessionId</code>). Average / median / p90 are derived from the <code>duration_seconds</code> property on <code>form-submit</code>. Trend sparklines show unique sessions per day:
      <span style="display:inline-flex;align-items:center;gap:0.35rem;margin-left:0.25rem"><span style="display:inline-block;width:14px;height:2px;background:${SPARKLINE_STARTS_COLOR}"></span>starts</span>
      <span style="display:inline-flex;align-items:center;gap:0.35rem;margin-left:0.5rem"><span style="display:inline-block;width:14px;height:2px;background:${SPARKLINE_COMPLETIONS_COLOR}"></span>completions</span>.
    </p>
    <table>
      <thead>
        <tr>
          <th>Form</th>
          <th>Starts</th>
          <th>Completions</th>
          <th>Completion rate</th>
          <th>Abandonment rate</th>
          <th>Avg</th>
          <th>Median</th>
          <th>p90</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>${summaryRows}</tbody>
    </table>
    <h3 style="font-size:1rem;margin-top:1.5rem;margin-bottom:0.5rem">Per-step drop-off</h3>
    ${stepBlocks}
  </section>`;
}

function buildIndexHtml({
  lighthouseRows,
  playwrightMetrics,
  formMetrics,
  formMetricsPrior,
  websiteStats,
  reportDays,
  meta,
}) {
  const axeRows = Object.entries(playwrightMetrics?.axe ?? {})
    .map(([key, v]) => {
      const violations = escapeHtml(
        JSON.stringify(v.violations ?? [], null, 0)
      );
      return `<tr>
  <td><code>${escapeHtml(key)}</code></td>
  <td>${escapeHtml(String(v.violationCount))}</td>
  <td>${escapeHtml(String(v.incompleteCount))}</td>
  <td><details><summary>Details</summary><pre class="pre-json">${violations}</pre></details></td>
</tr>`;
    })
    .join("\n");

  const lhTable = lighthouseRows
    .map(
      (row) => `<tr>
  <td>${escapeHtml(row.label)}</td>
  <td>${escapeHtml(row.performance)}</td>
  <td>${escapeHtml(row.accessibility)}</td>
  <td>${escapeHtml(row.bestPractices)}</td>
  <td>${escapeHtml(row.seo)}</td>
  <td><a href="./lighthouse/${escapeHtml(row.slug)}.html">Full report</a></td>
</tr>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alpha.gov.bb website performance report</title>
  <style>
    :root { font-family: system-ui, sans-serif; line-height: 1.5; color: #0f172a; background: #f8fafc; }
    body { margin: 0 auto; max-width: 1100px; padding: 2rem 1.5rem 4rem; }
    h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
    .meta { color: #475569; font-size: 0.9rem; margin-bottom: 2rem; }
    section { margin-bottom: 2.5rem; }
    h2 { font-size: 1.15rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.35rem; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgb(15 23 42 / 0.08); }
    th, td { text-align: left; padding: 0.65rem 0.85rem; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    th { background: #f1f5f9; font-weight: 600; font-size: 0.85rem; }
    tr:last-child td { border-bottom: none; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }
    .stat { background: #fff; border-radius: 8px; padding: 1rem 1.1rem; box-shadow: 0 1px 3px rgb(15 23 42 / 0.08); }
    .stat-label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; }
    .stat-value { font-size: 1.75rem; font-weight: 700; margin-top: 0.25rem; color: #0f172a; }
    .stat-delta { font-size: 0.8rem; font-weight: 600; margin-top: 0.25rem; }
    .stat-delta-context { color: #64748b; font-weight: 400; margin-left: 0.25rem; }
    .stat-sub { font-size: 0.8rem; color: #475569; margin-top: 0.35rem; }
    .pre-json { max-height: 200px; overflow: auto; font-size: 0.75rem; background: #f1f5f9; padding: 0.5rem; border-radius: 4px; white-space: pre-wrap; word-break: break-word; }
    a { color: #0d9488; }
  </style>
</head>
<body>
  <h1>Website performance report</h1>
  <p class="meta">
    Generated ${escapeHtml(meta.generatedAt)}<br />
    Ref: ${escapeHtml(meta.ref)} · SHA: <code>${escapeHtml(meta.sha)}</code><br />
    Run: ${escapeHtml(meta.runUrl)}
  </p>

  ${renderGeneralStatsSection({ formMetrics, formMetricsPrior, websiteStats, reportDays })}

  <section>
    <h2>Lighthouse (desktop)</h2>
    <p>Scores are 0–100. Open the full HTML report for audits and opportunities.</p>
    <table>
      <thead>
        <tr>
          <th>Page</th>
          <th>Performance</th>
          <th>Accessibility</th>
          <th>Best practices</th>
          <th>SEO</th>
          <th>Report</th>
        </tr>
      </thead>
      <tbody>${lhTable}</tbody>
    </table>
  </section>

  ${renderFormMetricsSection(formMetrics)}

  <section>
    <h2>axe (accessibility)</h2>
    <p>Automated scans with <code>@axe-core/playwright</code>. Review violations in context; some may be false positives.</p>
    <table>
      <thead>
        <tr>
          <th>Route key</th>
          <th>Violations</th>
          <th>Incomplete</th>
          <th>Rule IDs</th>
        </tr>
      </thead>
      <tbody>${axeRows}</tbody>
    </table>
  </section>
</body>
</html>
`;
}

async function main() {
  const baseUrl = (process.env.BASE_URL ?? "http://127.0.0.1:3000").replace(
    /\/$/,
    ""
  );

  /** When unset, start `next start` locally (requires `npm run build` first). */
  let managedServer = null;
  if (!process.env.PERF_EXTERNAL_SERVER) {
    const buildMarker = path.join(ROOT, ".next", "BUILD_ID");
    if (!existsSync(buildMarker)) {
      console.error(
        "[perf] Missing `.next` build. Run `npm run build`, then retry."
      );
      process.exit(1);
    }
    console.log(
      "[perf] Starting production server (set PERF_EXTERNAL_SERVER=1 to use a server you already started)."
    );
    managedServer = spawn("npm", ["run", "start"], {
      cwd: ROOT,
      env: { ...process.env, NODE_ENV: "production", PORT: "3000" },
      stdio: "pipe",
    });
    process.env.PERF_EXTERNAL_SERVER = "1";
    await waitOn({ resources: [baseUrl], timeout: 120_000 });
  }

  try {
    const perfArtifacts = path.join(ROOT, "perf-artifacts");
    const outDir = path.join(ROOT, "performance-report");
    const lhArtifactDir = path.join(perfArtifacts, "lighthouse");

    await mkdir(lhArtifactDir, { recursive: true });
    await mkdir(path.join(outDir, "lighthouse"), { recursive: true });

    console.log("[perf] Running Lighthouse…");
    const lhResults = await runLighthouseSuite(baseUrl, outDir, lhArtifactDir);

    console.log("[perf] Running Playwright (axe)…");
    runPlaywrightMetrics(baseUrl);

    const playwrightMetrics = await readJson(
      path.join(perfArtifacts, "playwright-metrics.json")
    );

    const reportDaysRaw = Number(process.env.UMAMI_REPORT_DAYS ?? 7);
    const reportDays = Number.isFinite(reportDaysRaw) ? reportDaysRaw : 7;

    let formMetrics = null;
    let formMetricsPrior = null;
    let websiteStats = null;

    // Anchor the prior window to the start of the current window so the two
    // funnels never overlap, regardless of when the job runs.
    const endAt = Date.now();
    const priorEndAt = endAt - reportDays * MS_PER_DAY;

    console.log(
      "[perf] Fetching Umami form funnel (current + prior) + website stats…"
    );
    const [formMetricsResult, formMetricsPriorResult, websiteStatsResult] =
      await Promise.allSettled([
        fetchFormFunnelMetrics({ days: reportDays, now: endAt }),
        fetchFormFunnelMetrics({ days: reportDays, now: priorEndAt }),
        fetchWebsiteStats({ days: reportDays, now: endAt }),
      ]);

    if (formMetricsResult.status === "fulfilled") {
      formMetrics = formMetricsResult.value;
      if (!formMetrics) {
        console.log(
          "[perf] Skipping form funnel section — UMAMI_API_KEY or NEXT_PUBLIC_UMAMI_SITE_ID not set."
        );
      }
    } else {
      const reason = formMetricsResult.reason;
      console.warn(
        `[perf] Form funnel fetch failed; continuing without it: ${reason instanceof Error ? reason.message : String(reason)}`
      );
    }

    if (formMetricsPriorResult.status === "fulfilled") {
      formMetricsPrior = formMetricsPriorResult.value;
    } else {
      const reason = formMetricsPriorResult.reason;
      console.warn(
        `[perf] Prior-window form funnel fetch failed; continuing without comparison: ${reason instanceof Error ? reason.message : String(reason)}`
      );
    }

    if (websiteStatsResult.status === "fulfilled") {
      websiteStats = websiteStatsResult.value;
    } else {
      const reason = websiteStatsResult.reason;
      console.warn(
        `[perf] Website stats fetch failed; continuing without it: ${reason instanceof Error ? reason.message : String(reason)}`
      );
    }

    const lighthouseRows = lhResults.map(({ page, lhr }) => {
      const c = lhr.categories ?? {};
      return {
        slug: page.slug,
        label: page.label,
        performance: scoreToPercent(c.performance?.score),
        accessibility: scoreToPercent(c.accessibility?.score),
        bestPractices: scoreToPercent(c["best-practices"]?.score),
        seo: scoreToPercent(c.seo?.score),
      };
    });

    const sha = process.env.GITHUB_SHA ?? "local";
    const ref =
      process.env.GITHUB_REF_NAME ?? process.env.GITHUB_REF ?? "local";
    const runUrl =
      process.env.GITHUB_SERVER_URL &&
      process.env.GITHUB_REPOSITORY &&
      process.env.GITHUB_RUN_ID
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : "(local)";

    const html = buildIndexHtml({
      lighthouseRows,
      playwrightMetrics,
      formMetrics,
      formMetricsPrior,
      websiteStats,
      reportDays,
      meta: {
        sha,
        ref,
        runUrl,
        generatedAt: new Date().toISOString(),
      },
    });

    await writeFile(path.join(outDir, "index.html"), html, "utf8");
    console.log(
      `[perf] Wrote ${path.relative(ROOT, path.join(outDir, "index.html"))}`
    );
  } finally {
    if (managedServer) {
      try {
        managedServer.kill("SIGTERM");
      } catch {
        /* ignore */
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
