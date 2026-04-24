import { defineConfig, devices } from "@playwright/test";

/**
 * Performance / accessibility measurement suite (axe + navigation timings).
 * When PERF_EXTERNAL_SERVER is set, the workflow has already started `next start`;
 * otherwise Playwright starts the dev or production server locally.
 */
const useExternalServer = !!process.env.PERF_EXTERNAL_SERVER;

export default defineConfig({
  testDir: "./tests/perf",
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  timeout: 120_000,

  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    trace: "off",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  webServer: useExternalServer
    ? undefined
    : {
        command: process.env.CI ? "npm run start" : "npm run dev",
        port: 3000,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
