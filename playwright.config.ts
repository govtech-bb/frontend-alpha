import { defineConfig, devices } from "@playwright/test";

// Playwright configuration for visual regression on Next.js
// We start the production server; CI builds the app beforehand.
export default defineConfig({
  testDir: "./tests",
  /* Keep reports small and deterministic in CI */
  reporter: [["list"], ["html", { open: "never" }]],

  forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // fullyParallel: false,
  // workers: process.env.CI ? 2 : undefined,
  workers: process.env.CI ? 2 : undefined, // Use 2 workers in CI, auto-detect locally
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0, // Retry flaky tests in CI

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Chrome-specific font rendering optimizations
        launchOptions: {
          args: [
            "--font-render-hinting=none",
            "--disable-font-subpixel-positioning",
            "--disable-skia-runtime-opts",
            "--run-all-compositor-stages-before-draw",
            "--disable-new-content-rendering-timeout",
            "--disable-threaded-animation",
            "--disable-threaded-scrolling",
            "--disable-checker-imaging",
            "--disable-image-animation-resync",
          ],
        },
      },
    },
  ],
  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev", // CI runs again build; locally run against dev
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Ensure we're always testing the built version
    stdout: "pipe",
    stderr: "pipe",
  },
});
