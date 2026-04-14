import fs from "node:fs";
import path from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ARTIFACTS_DIR = path.join(process.cwd(), "perf-artifacts");

const ROUTES = {
  home: "/",
  search: "/search-results?q=birth",
  form: "/family-birth-relationships/get-birth-certificate/form",
} as const;

type AxeRouteKey = keyof typeof ROUTES;

type AxeSummary = {
  url: string;
  violationCount: number;
  incompleteCount: number;
  violations: Array<{
    id: string;
    impact: string | null;
    description: string;
    nodes: number;
  }>;
};

type PlaywrightMetricsPayload = {
  axe: Record<AxeRouteKey, AxeSummary>;
  timings: {
    formPageReadyMs: number;
    searchToResultsMs: number;
  };
};

const store: {
  axe: Partial<Record<AxeRouteKey, AxeSummary>>;
  timings: Partial<PlaywrightMetricsPayload["timings"]>;
} = {
  axe: {},
  timings: {},
};

function ensureArtifactsDir() {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

function writeFinalPayload() {
  ensureArtifactsDir();
  const axe = {} as Record<AxeRouteKey, AxeSummary>;
  for (const k of Object.keys(ROUTES) as AxeRouteKey[]) {
    const done = store.axe[k];
    if (done) {
      axe[k] = done;
    } else {
      axe[k] = {
        url: ROUTES[k],
        violationCount: -1,
        incompleteCount: -1,
        violations: [],
      };
    }
  }
  const payload: PlaywrightMetricsPayload = {
    axe,
    timings: {
      formPageReadyMs: store.timings.formPageReadyMs ?? -1,
      searchToResultsMs: store.timings.searchToResultsMs ?? -1,
    },
  };
  const out = path.join(ARTIFACTS_DIR, "playwright-metrics.json");
  fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

test.describe.configure({ mode: "serial" });

test.describe("performance metrics", () => {
  for (const key of Object.keys(ROUTES) as AxeRouteKey[]) {
    test(`axe: ${key}`, async ({ page }) => {
      const urlPath = ROUTES[key];
      await page.goto(urlPath, { waitUntil: "domcontentloaded" });
      const raw = await new AxeBuilder({ page }).analyze();

      store.axe[key] = {
        url: raw.url,
        violationCount: raw.violations.length,
        incompleteCount: raw.incomplete?.length ?? 0,
        violations: raw.violations.map((v) => ({
          id: v.id,
          impact: v.impact ?? null,
          description: v.description,
          nodes: v.nodes.length,
        })),
      };
    });
  }

  test("timing: form page ready", async ({ page }) => {
    const start = Date.now();
    await page.goto(ROUTES.form, { waitUntil: "domcontentloaded" });
    await expect(
      page.getByRole("heading", { name: /tell us about yourself/i })
    ).toBeVisible({ timeout: 60_000 });
    store.timings.formPageReadyMs = Date.now() - start;
  });

  test("timing: search to results", async ({ page }) => {
    const start = Date.now();
    await page.goto(ROUTES.home, { waitUntil: "domcontentloaded" });
    await page.locator("#service-search").fill("certificate");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(
      page.getByRole("heading", { name: "Search results" })
    ).toBeVisible({
      timeout: 60_000,
    });
    store.timings.searchToResultsMs = Date.now() - start;
  });

  test.afterAll(() => {
    writeFinalPayload();
  });
});
