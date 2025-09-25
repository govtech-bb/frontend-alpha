import { expect, test } from "@playwright/test";

// Visual comparisons of key routes to catch unintended text/color changes.
// If a change is intentional, run: npm run test:e2e:update

const routesUnderTest: string[] = [
  "/",
  "/improving-digital-services",
  "/improving-digital-services/how-we-build",
  "/register-a-birth",
  "/loud-music-permit",
  "/register-summer-camp",
];

for (const routePath of routesUnderTest) {
  test.describe(`visual: ${routePath}`, () => {
    test(`full page snapshot for ${routePath}`, async ({ page }) => {
      await page.goto(routePath, { waitUntil: "domcontentloaded" });
      // Wait for hydration with graceful fallback
      try {
        await page.waitForLoadState("networkidle", { timeout: 8000 });
      } catch {
        // Fallback for routes that don't reach networkidle
        // biome-ignore lint/style/noMagicNumbers: <explanation>
        await page.waitForTimeout(2000);
      }
      // Ensure page is hydrated
      // biome-ignore lint/performance/useTopLevelRegex: <explanation>
      await expect(page).toHaveTitle(/.+/);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        scale: "css",
        threshold: 0.03, // Allow 3% pixel difference for cross-platform variations
      });
    });
  });
}
