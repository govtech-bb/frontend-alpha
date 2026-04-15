import { expect, test } from "@playwright/test";

/**
 * Umami Popular Pages API — E2E Tests
 *
 * Approach: similar to birth-certificate.spec.ts —
 * hit the API directly via page.request.get() (no browser UI needed).
 * page.waitForResponse() is only useful when the browser navigates,
 * but for API-only tests, page.request is much cleaner.
 *
 * Route: GET /api/popular-pages
 * Query params: days, limit, type
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_PATH = "/api/analytics/pages";

// ─── Types ────────────────────────────────────────────────────────────────────

type PopularPageView = {
  path: string;
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
};

type SuccessResponse = {
  success: true;
  data: {
    startAt: number;
    endAt: number;
    type: string;
    pages: PopularPageView[];
  };
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Hit the API route and return a typed response.
 * Uses page.request.get() — the browser does not navigate,
 * just makes an HTTP call (similar to response intercept approach in birth-certificate).
 */
async function fetchPopularPages(
  page: import("@playwright/test").Page,
  params: Record<string, string | number> = {}
): Promise<{ status: number; body: ApiResponse }> {
  const url = new URL(API_PATH, BASE_URL);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await page.request.get(url.toString(), {
    timeout: 15_000,
  });

  const body = (await response.json()) as ApiResponse;

  console.log(`\n📡 GET ${url.toString()}`);
  console.log(`   Status: ${response.status()}`);
  console.log(`   Success: ${body.success}`);
  if (body.success) {
    console.log(`   Pages returned: ${body.data.pages.length}`);
  }

  return { status: response.status(), body };
}

/**
 * Verify the shape of a success response
 */
function verifySuccessShape(
  body: ApiResponse
): asserts body is SuccessResponse {
  expect(body.success).toBe(true);
  if (!body.success) throw new Error("Response was not successful");

  expect(body.data).toBeTruthy();
  expect(typeof body.data.startAt).toBe("number");
  expect(typeof body.data.endAt).toBe("number");
  expect(typeof body.data.type).toBe("string");
  expect(Array.isArray(body.data.pages)).toBe(true);

  // startAt should always be before endAt
  expect(body.data.startAt).toBeLessThan(body.data.endAt);
}

/**
 * Verify the shape of each page object
 */
function verifyPageShape(p: PopularPageView) {
  expect(typeof p.path).toBe("string");
  expect(p.path.length).toBeGreaterThan(0);
  expect(typeof p.pageviews).toBe("number");
  expect(typeof p.visitors).toBe("number");
  expect(typeof p.visits).toBe("number");
  expect(typeof p.bounces).toBe("number");
  expect(typeof p.totaltime).toBe("number");
}

/**
 * Verify the expected time diff (1 second tolerance)
 */
function verifyTimeDiff(
  body: SuccessResponse,
  expectedDays: number,
  label: string
) {
  const expectedDiff = expectedDays * 86_400_000;
  const actualDiff = body.data.endAt - body.data.startAt;
  expect(
    Math.abs(actualDiff - expectedDiff),
    `${label}: time diff should be ~${expectedDays} days`
  ).toBeLessThan(1000);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test.describe("GET /api/popular-pages", () => {
  // Default Params ──────────────────────────────────────────────────────

  test("returns 200 with correct shape using default params", async ({
    page,
  }) => {
    const { status, body } = await fetchPopularPages(page);

    expect(status).toBe(200);
    verifySuccessShape(body);

    // Default type should be "path"
    expect(body.data.type).toBe("path");

    // Default limit 10 — max 10 pages
    expect(body.data.pages.length).toBeLessThanOrEqual(10);

    // Verify shape of each page
    for (const p of body.data.pages) {
      verifyPageShape(p);
    }
  });

  // days param ─────────────────────────────────────────────────────────

  test("time range is calculated correctly with days=7", async ({ page }) => {
    const before = Date.now();
    const { status, body } = await fetchPopularPages(page, { days: 7 });
    const after = Date.now();

    expect(status).toBe(200);
    verifySuccessShape(body);
    verifyTimeDiff(body, 7, "days=7");

    // endAt should be close to the current time
    expect(body.data.endAt).toBeGreaterThanOrEqual(before);
    expect(body.data.endAt).toBeLessThanOrEqual(after + 1000);
  });

  test("days=1 (minimum allowed) works correctly", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { days: 1 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    verifyTimeDiff(body, 1, "days=1");
  });

  test("days=365 (maximum allowed) works correctly", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { days: 365 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    verifyTimeDiff(body, 365, "days=365");
  });

  // Clamping ───────────────────────────────────────────────────────────

  test("days=0 is clamped to 1", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { days: 0 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    // Math.min(Math.max(0, 1), 365) = 1
    verifyTimeDiff(body, 1, "days=0 clamped to 1");
  });

  test("days=999 is clamped to 365", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { days: 999 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    // Math.min(Math.max(999, 1), 365) = 365
    verifyTimeDiff(body, 365, "days=999 clamped to 365");
  });

  test("limit=0 is clamped to 1 — returns max 1 page", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { limit: 0 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    // Math.min(Math.max(0, 1), 100) = 1
    expect(body.data.pages.length).toBeLessThanOrEqual(1);
  });

  // limit param ────────────────────────────────────────────────────────

  test("returns max 1 page with limit=1", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { limit: 1 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    expect(body.data.pages.length).toBeLessThanOrEqual(1);
  });

  test("returns max 5 pages with limit=5", async ({ page }) => {
    const { status, body } = await fetchPopularPages(page, { limit: 5 });

    expect(status).toBe(200);
    verifySuccessShape(body);
    expect(body.data.pages.length).toBeLessThanOrEqual(5);

    for (const p of body.data.pages) {
      verifyPageShape(p);
    }
  });

  // Response structure ─────────────────────────────────────────────────

  test("response contains valid timestamps for startAt and endAt", async ({
    page,
  }) => {
    const before = Date.now();
    const { status, body } = await fetchPopularPages(page);
    const after = Date.now();

    expect(status).toBe(200);
    verifySuccessShape(body);

    expect(body.data.startAt).toBeGreaterThan(0);
    expect(body.data.endAt).toBeGreaterThan(0);
    expect(body.data.endAt).toBeGreaterThan(body.data.startAt);

    expect(body.data.endAt).toBeGreaterThanOrEqual(before - 1000);
    expect(body.data.endAt).toBeLessThanOrEqual(after + 1000);
  });
});
