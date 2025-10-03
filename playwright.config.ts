import { defineConfig, devices } from "@playwright/test";

// Playwright configuration for visual regression on Next.js
// We start the production server; CI builds the app beforehand.
export default defineConfig({
  testDir: "./tests",
  /* Keep reports small and deterministic in CI */
  reporter: [["list"], ["html", { open: "never" }]],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
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
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        // WebKit relies on CSS font optimizations
      },
    },
  ],
  webServer: {
    command: "npm run dev", // CI runs build before tests; locally, build first
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Ensure we're always testing the built version
    stdout: "pipe",
    stderr: "pipe",
  },
});
