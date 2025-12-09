import fs from "node:fs";
import path from "node:path";
import { expect, type Page, test } from "@playwright/test";

// Visual comparisons across all routes and device sizes to catch unintended changes.
// If a change is intentional, run: npm run test:e2e:update
//
// IMPORTANT: Snapshot baselines should be generated in CI (Linux) to avoid cross-platform
// font rendering differences between macOS and Linux. To update snapshots from CI:
// 1. Push changes to a branch
// 2. Download the updated snapshots from the CI artifacts
// 3. Replace local snapshots with the CI-generated ones

// Device configurations for testing
// Heights are set large enough to capture most page content in a single viewport
// This avoids fullPage screenshot dimension variance between macOS and Linux
const DEVICES = [
  { name: "desktop", width: 1280, height: 3000 },
  { name: "tablet", width: 768, height: 3000 },
  { name: "mobile", width: 375, height: 3000 },
] as const;

// Regex patterns for file processing
const MARKDOWN_EXTENSION = /\.md$/;

/**
 * Recursively discover all markdown files in the content directory
 * and convert them to route paths
 */
function discoverContentRoutes(): string[] {
  const contentDir = path.join(process.cwd(), "src", "content");
  const routes: string[] = [];

  function scanDirectory(dir: string, basePath = ""): void {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(
          path.join(dir, item.name),
          basePath ? `${basePath}/${item.name}` : item.name
        );
      } else if (item.isFile() && item.name.endsWith(".md")) {
        // Convert markdown file to route path
        const routePath = basePath
          ? `/${basePath}/${item.name.replace(MARKDOWN_EXTENSION, "")}`
          : `/${item.name.replace(MARKDOWN_EXTENSION, "")}`;
        routes.push(routePath);
      }
    }
  }

  try {
    scanDirectory(contentDir);
  } catch (error) {
    console.warn("Could not scan content directory:", error);
    return [];
  }

  return routes;
}

/**
 * Discover all routes by combining content and static routes
 * This finds routes beyond just markdown content pages
 */
function discoverAllRoutes(): string[] {
  const contentRoutes = discoverContentRoutes();

  // Add known static routes that may not be in content directory
  const staticRoutes = [
    "/",
    "/family-birth-relationships",
    "/work-employment",
    "/money-financial-support",
    "/travel-id-citizenship",
    "/business-trade",
    "/public-safety",
    "/feedback",
    // Add any other known routes here (404 pages, dynamic routes, etc.)
  ];

  // Combine and deduplicate
  const allRoutes = [...new Set([...staticRoutes, ...contentRoutes])];

  return allRoutes.sort();
}

/**
 * Wait for page to be fully ready for screenshot
 * Includes waiting for fonts, images, and layout stability
 */
async function waitForPageReady(page: Page): Promise<void> {
  // Wait for hydration with graceful fallback
  try {
    await page.waitForLoadState("networkidle", { timeout: 8000 });
  } catch {
    // Fallback for routes that don't reach networkidle
    await page.waitForTimeout(2000);
  }

  // Ensure page is hydrated - check for any title
  await expect(page).toHaveTitle(/.+/);

  // Wait for fonts to be fully loaded
  await page.evaluate(() => document.fonts.ready);

  // Wait for all images to load
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    )
  );

  // Small delay for final layout stabilization
  await page.waitForTimeout(100);
}

// Discover all available routes synchronously
const allRoutes = discoverAllRoutes();

// Validate we have routes to test
if (!allRoutes || allRoutes.length === 0) {
  console.error("No routes discovered! Check content directory structure.");
  throw new Error("No routes found to test");
}

console.log(`Found ${allRoutes.length} routes to test:`, allRoutes);
console.log(
  `Testing across ${DEVICES.length} device sizes:`,
  DEVICES.map((d) => d.name).join(", ")
);

// Generate tests for each route and device combination
for (const routePath of allRoutes) {
  test.describe(`visual: ${routePath}`, () => {
    for (const device of DEVICES) {
      test(`${device.name} - full page snapshot`, async ({ page }) => {
        // Set viewport for current device
        await page.setViewportSize({
          width: device.width,
          height: device.height,
        });

        await page.goto(routePath);
        await waitForPageReady(page);

        // Create a safe filename from the route path
        const safeRouteName =
          routePath
            .replace(/^\//, "") // Remove leading slash
            .replace(/\//g, "-") // Replace slashes with dashes
            .replace(/[^a-zA-Z0-9-]/g, "_") || "home"; // Replace special chars, use 'home' for root

        // Take screenshot with route and device name in filename
        // Using viewport-sized screenshots (not fullPage) for consistent dimensions across platforms
        await expect(page).toHaveScreenshot(
          `${safeRouteName}-${device.name}.png`,
          {
            fullPage: false,
            animations: "disabled",
            caret: "hide",
            scale: "css",
            // Allow some variance for cross-platform and responsive design differences
            // Higher threshold to account for font rendering and OS differences between local and CI
            threshold: 0.5,
            maxDiffPixelRatio: 0.1,
            maxDiffPixels: 100,
          }
        );
      });
    }
  });
}
