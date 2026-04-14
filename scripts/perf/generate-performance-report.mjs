/**
 * Runs Lighthouse against key URLs, then Playwright (axe + navigation timings),
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");

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

function buildIndexHtml({ lighthouseRows, playwrightMetrics, meta }) {
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
    .scores { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0.75rem; margin-top: 0.75rem; }
    .card { background: #fff; border-radius: 8px; padding: 0.85rem 1rem; box-shadow: 0 1px 3px rgb(15 23 42 / 0.08); }
    .card .k { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; }
    .card .v { font-size: 1.5rem; font-weight: 700; margin-top: 0.15rem; }
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

  <section>
    <h2>Playwright timings</h2>
    <p>Measured in Chromium (desktop) against <code>${escapeHtml(meta.baseUrl)}</code>.</p>
    <div class="scores">
      <div class="card"><div class="k">Form page ready</div><div class="v">${escapeHtml(String(playwrightMetrics?.timings?.formPageReadyMs ?? "—"))}<span style="font-size:0.9rem;font-weight:400"> ms</span></div></div>
      <div class="card"><div class="k">Home → search results</div><div class="v">${escapeHtml(String(playwrightMetrics?.timings?.searchToResultsMs ?? "—"))}<span style="font-size:0.9rem;font-weight:400"> ms</span></div></div>
    </div>
  </section>

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

    console.log("[perf] Running Playwright (axe + timings)…");
    runPlaywrightMetrics(baseUrl);

    const playwrightMetrics = await readJson(
      path.join(perfArtifacts, "playwright-metrics.json")
    );

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
      meta: {
        baseUrl,
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
