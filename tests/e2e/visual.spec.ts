import { expect, type Page, test } from "@playwright/test";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

// Visual comparisons across all routes and device sizes to catch unintended changes.
// If a change is intentional, run: npm run test:e2e:update

// Device configurations for testing
const DEVICES = [
  { name: "desktop", width: 1280, height: 1422 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
] as const;

type RouteInfo = {
  path: string;
  type: "static" | "category" | "page" | "subpage-markdown" | "subpage-form";
};

/**
 * Recursively discover all markdown files in the content directory
 * and convert them to route paths
 */
function discoverAllRoutes(): RouteInfo[] {
  const routes: RouteInfo[] = [];

  // Static routes not defined in INFORMATION_ARCHITECTURE
  const staticRoutes = ["/", "/feedback"];
  for (const path of staticRoutes) {
    routes.push({ path, type: "static" });
  }

  // Routes from INFORMATION_ARCHITECTURE
  for (const category of INFORMATION_ARCHITECTURE) {
    // Category pages: /family-birth-relationships
    routes.push({
      path: `/${category.slug}`,
      type: "category",
    });

    for (const page of category.pages) {
      // Main service pages: /family-birth-relationships/register-a-birth
      routes.push({
        path: `/${category.slug}/${page.slug}`,
        type: "page",
      });

      // Sub-pages if they exist
      if (page.subPages) {
        for (const subPage of page.subPages) {
          const isForm =
            subPage.type === "component" || subPage.slug === "form";
          routes.push({
            path: `/${category.slug}/${page.slug}/${subPage.slug}`,
            type: isForm ? "subpage-form" : "subpage-markdown",
          });
        }
      }
    }
  }

  return routes.sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Wait for page to be ready for screenshot
 */
async function waitForPageReady(
  page: Page,
  routeType: RouteInfo["type"]
): Promise<void> {
  await page.waitForLoadState("load");
  await page.waitForSelector("body", { state: "visible" });

  if (routeType === "subpage-form") {
    try {
      await page.waitForSelector("form", { state: "visible", timeout: 5000 });
      await page.waitForTimeout(300);
    } catch {
      // Form might not exist on all form pages, continue
    }
  }

  // Wait for web fonts with timeout
  // biome-ignore lint/suspicious/noEmptyBlockStatements: Intentionally empty block
  await page.evaluate(() => document.fonts.ready).catch(() => {});

  // Load all lazy-loaded Next.js images by scrolling to them
  // TODO: Potential refinements to test:
  // - Add `:visible` to selector to only load visible images
  // - Add `{ timeout: 5000 }` to the expect to prevent hanging on failed images
  // - Only scroll back to top if lazyImages.length > 0
  // - Add small wait after scroll back to top for layout to settle
  const lazyImages = await page.locator("img[loading='lazy']").all();
  for (const lazyImage of lazyImages) {
    await lazyImage.scrollIntoViewIfNeeded();
    await expect(lazyImage).not.toHaveJSProperty("naturalWidth", 0);
  }

  // Scroll back to top after loading lazy images
  await page.evaluate(() => window.scrollTo(0, 0));

  // Wait for any remaining images with 5 second timeout
  await page.evaluate(() => {
    const images = Array.from(document.images);
    const imagePromises = images
      .filter((img) => !img.complete)
      .map(
        (img) =>
          new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      );

    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 5000));
    return Promise.race([Promise.all(imagePromises), timeout]);
  });

  await page.waitForTimeout(100);
}

/**
 * Create a safe filename from route path
 */
function createSafeFilename(routePath: string): string {
  return (
    routePath
      .replace(/^\//, "")
      .replace(/\//g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "_") || "home"
  );
}

// Discover all routes
const allRoutes = discoverAllRoutes();

if (allRoutes.length === 0) {
  throw new Error("No routes discovered! Check INFORMATION_ARCHITECTURE.");
}

console.log(`Discovered ${allRoutes.length} routes to test`);
console.log("Route breakdown:");
console.log(
  `  - Static: ${allRoutes.filter((r) => r.type === "static").length}`
);
console.log(
  `  - Category: ${allRoutes.filter((r) => r.type === "category").length}`
);
console.log(`  - Page: ${allRoutes.filter((r) => r.type === "page").length}`);
console.log(
  `  - Subpage (markdown): ${allRoutes.filter((r) => r.type === "subpage-markdown").length}`
);
console.log(
  `  - Subpage (form): ${allRoutes.filter((r) => r.type === "subpage-form").length}`
);
console.log(
  `Testing across ${DEVICES.length} devices: ${DEVICES.map((d) => d.name).join(", ")}`
);

// Generate tests for each route and device combination
for (const route of allRoutes) {
  test.describe(`visual: ${route.path}`, () => {
    for (const device of DEVICES) {
      test(`${device.name} - full page snapshot`, async ({ page }) => {
        // Set viewport
        await page.setViewportSize({
          width: device.width,
          height: device.height,
        });

        // Navigate and check response
        const response = await page.goto(route.path, {
          waitUntil: "domcontentloaded",
        });

        // Verify successful response
        if (!response) {
          throw new Error(`No response received for ${route.path}`);
        }

        const status = response.status();
        if (status >= 400) {
          throw new Error(`Route ${route.path} returned HTTP ${status}`);
        }

        // Wait for page to be fully ready
        await waitForPageReady(page, route.type);

        // Verify page has a title
        await expect(page).toHaveTitle(/.+/);

        // Take screenshot
        const filename = `${createSafeFilename(route.path)}-${device.name}.png`;

        await expect(page).toHaveScreenshot(filename, {
          fullPage: true,
          animations: "disabled",
          caret: "hide",
          scale: "css",
          // Thresholds for cross-platform tolerance
          threshold: 0.2,
          maxDiffPixelRatio: 0.03,
        });
      });
    }
  });
}

// Separate test for 404 page
test.describe("visual: 404 page", () => {
  for (const device of DEVICES) {
    test(`${device.name} - 404 page snapshot`, async ({ page }) => {
      await page.setViewportSize({
        width: device.width,
        height: device.height,
      });

      const response = await page.goto("/this-route-should-not-exist-12345");

      expect(response?.status()).toBe(404);

      await page.waitForLoadState("networkidle");

      await expect(page).toHaveScreenshot(`404-${device.name}.png`, {
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        scale: "css",
        threshold: 0.2,
        maxDiffPixelRatio: 0.03,
      });
    });
  }
});
