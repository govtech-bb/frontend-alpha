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
      await page.goto(routePath, { waitUntil: "networkidle" });
      // Ensure page is hydrated
      // biome-ignore lint/performance/useTopLevelRegex: <explanation>
      await expect(page).toHaveTitle(/.+/);
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        scale: "css",
      });
    });
  });
}
