import fs from "node:fs";
import path from "node:path";
import { expect, type Page, test } from "@playwright/test";

// Visual comparisons across all routes and device sizes to catch unintended changes.
// If a change is intentional, run: npm run test:e2e:update

// Device configurations for testing
const DEVICES = [
  // { name: "desktop", width: 1280, height: 1422 },
  // { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
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
    // Add any other known routes here (404 pages, dynamic routes, etc.)
  ];

  // Combine and deduplicate
  const allRoutes = [...new Set([...staticRoutes, ...contentRoutes])];

  return allRoutes.sort();
}

/**
 * Wait for page to be ready for screenshot
 */
async function waitForPageReady(page: Page): Promise<void> {
  await page.goto(page.url(), { waitUntil: "domcontentloaded" });

  // Wait for hydration with graceful fallback
  try {
    await page.waitForLoadState("networkidle", { timeout: 8000 });
  } catch {
    // Fallback for routes that don't reach networkidle
    await page.waitForTimeout(2000);
  }

  // Ensure page is hydrated - check for any title
  await expect(page).toHaveTitle(/.+/);
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
        await expect(page).toHaveScreenshot(
          `${safeRouteName}-${device.name}.png`,
          {
            fullPage: true,
            animations: "disabled",
            caret: "hide",
            scale: "css",
            // Allow some variance for cross-platform and responsive design differences
            threshold: 0.3,
            maxDiffPixelRatio: 0.05,
          }
        );
      });
    }
  });
}
