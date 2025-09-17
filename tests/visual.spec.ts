import { expect, test } from "@playwright/test";

const TIMEOUT = 500; // Time to wait for theme transition
const REGEX_DARK_MODE = /dark mode|theme/i;

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

  test("Navigation component visual test", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Screenshot specific component
    const nav = page.locator("nav");
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

  test("Dark mode visual test", async ({ page }) => {
    await page.goto("/");

    // Assuming you have a dark mode toggle
    await page.getByRole("button", { name: REGEX_DARK_MODE }).click();
    await page.waitForTimeout(TIMEOUT); // Wait for theme transition

    await expect(page).toHaveScreenshot("homepage-dark.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("Form states visual test", async ({ page }) => {
    await page.goto("/contact"); // Assuming you have a contact form
    await page.waitForLoadState("networkidle");

    // Test empty form state
    await expect(page.locator("form")).toHaveScreenshot("form-empty.png");

    // Test filled form state
    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill(
      'textarea[name="message"]',
      "Hello, this is a test message."
    );

    await expect(page.locator("form")).toHaveScreenshot("form-filled.png");

    // Test validation error state
    await page.fill('input[name="email"]', "invalid-email");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(TIMEOUT); // Wait for validation to appear

    await expect(page.locator("form")).toHaveScreenshot("form-error.png");
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

  test("Focus states visual test", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Test input focus state
    const input = page.locator("input").first();
    if ((await input.count()) > 0) {
      await input.focus();
      await expect(input).toHaveScreenshot("input-focus.png");
    }

    // Test button focus state
    const button = page.getByRole("button").first();
    await button.focus();
    await expect(button).toHaveScreenshot("button-focus.png");
  });
});
