import { defineConfig, devices } from "@playwright/test";

// Playwright configuration for visual regression on Next.js
// We start the production server; CI builds the app beforehand.
export default defineConfig({
  testDir: "./tests",
  /* Keep reports small and deterministic in CI */
  reporter: [["list"], ["html", { open: "never" }]],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  use: {
    baseURL: process.env.PREVIEW_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run start", // CI runs build before tests; locally, build first
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
