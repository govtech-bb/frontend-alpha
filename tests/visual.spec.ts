import { expect, test } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport for visual testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test("Homepage visual test", async ({ page }) => {
    await page.goto("/");

    // Wait for page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Take full page screenshot
    await expect(page).toHaveScreenshot("homepage.png", {
      fullPage: true,
      animations: "disabled", // Disable animations for consistent screenshots
    });
  });

  test("Header Navigation component visual test", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Screenshot specific component
    const nav = page.locator("header");
    await expect(nav).toHaveScreenshot("navigation.png");
  });

  test("Mobile homepage visual test", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("Responsive breakpoints visual test", async ({ page }) => {
    const breakpoints = [
      { name: "mobile", width: 375, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1024, height: 768 },
      { name: "large-desktop", width: 1440, height: 900 },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({
        width: breakpoint.width,
        height: breakpoint.height,
      });

      await page.goto("/");
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveScreenshot(`homepage-${breakpoint.name}.png`, {
        fullPage: true,
        animations: "disabled",
        threshold: 0.02, // Allow 2% difference
      });
    }
  });

  test("Hover states visual test", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Test button hover state
    const button = page.getByRole("button").first();
    await button.hover();
    await expect(button).toHaveScreenshot("button-hover.png");

    // Test link hover state
    const link = page.getByRole("link").first();
    await link.hover();
    await expect(link).toHaveScreenshot("link-hover.png");
  });
});
