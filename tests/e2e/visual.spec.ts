import { expect, test } from "@playwright/test";

// Font comparison test for debugging cross-platform differences
test.describe("font comparison debug", () => {
  test("compare text styling differences", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    
    // Wait for hydration
    try {
      await page.waitForLoadState("networkidle", { timeout: 8000 });
    } catch {
      await page.waitForTimeout(2000);
    }
    
    // Get both text elements
    const headerText = page.locator('text="Official government website"').first();
    const footerText = page.locator('text="© 2025 Government of Barbados"').first();
    
    console.log('=== Font Comparison Analysis ===');
    
    if (await headerText.count() > 0) {
      const headerStyles = await headerText.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          element: 'Header: "Official government website"',
          tagName: el.tagName,
          classList: Array.from(el.classList),
          fontWeight: computed.fontWeight,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontStyle: computed.fontStyle,
          fontVariant: computed.fontVariant,
          fontStretch: computed.fontStretch,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          textRendering: computed.textRendering,
          fontFeatureSettings: computed.fontFeatureSettings,
          color: computed.color
        };
      });
      
      console.log('--- Header Text ---');
      Object.entries(headerStyles).forEach(([key, value]) => {
        console.log(`${key}:`, value);
      });
    }
    
    if (await footerText.count() > 0) {
      const footerStyles = await footerText.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          element: 'Footer: "Government of Barbados"',
          tagName: el.tagName,
          classList: Array.from(el.classList),
          fontWeight: computed.fontWeight,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontStyle: computed.fontStyle,
          fontVariant: computed.fontVariant,
          fontStretch: computed.fontStretch,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          textRendering: computed.textRendering,
          fontFeatureSettings: computed.fontFeatureSettings,
          color: computed.color
        };
      });
      
      console.log('--- Footer Text ---');
      Object.entries(footerStyles).forEach(([key, value]) => {
        console.log(`${key}:`, value);
      });
    }
    
    // Also check browser and platform info
    const browserInfo = await page.evaluate(() => ({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      fonts: document.fonts.size,
      pixelRatio: window.devicePixelRatio
    }));
    
    console.log('--- Browser/Platform Info ---');
    Object.entries(browserInfo).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    
    console.log('================================');
  });
});

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
      });
    });
  });
}
