import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

// Visual comparisons of all available routes to catch unintended text/color changes.
// If a change is intentional, run: npm run test:e2e:update

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
    // Fallback to known routes if content scanning fails
    return [
      "/improving-digital-services",
      "/improving-digital-services/how-we-build",
      "/register-a-birth",
      "/loud-music-permit",
      "/register-summer-camp",
      "/whats-changing",
    ];
  }

  return routes.sort();
}

// Discover all available routes
const contentRoutes = discoverContentRoutes();
const allRoutes = ["/", ...contentRoutes]; // Include homepage

console.log(`Found ${allRoutes.length} routes to test:`, allRoutes);

for (const routePath of allRoutes) {
  test.describe(`visual: ${routePath}`, () => {
    test(`full page snapshot for ${routePath}`, async ({ page }) => {
      await page.goto(routePath, { waitUntil: "domcontentloaded" });
      // Wait for hydration with graceful fallback
      try {
        await page.waitForLoadState("networkidle", { timeout: 8000 });
      } catch {
        // Fallback for routes that don't reach networkidle
        // biome-ignore lint/style/noMagicNumbers: timeout fallback for CI reliability
        await page.waitForTimeout(2000);
      }
      // Ensure page is hydrated
      // biome-ignore lint/performance/useTopLevelRegex: simple regex for any title check
      await expect(page).toHaveTitle(/.+/);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        scale: "css",
        threshold: 0.3, // Allow 3% pixel difference for cross-platform variations
        maxDiffPixelRatio: 0.05,
      });
    });
  });
}
