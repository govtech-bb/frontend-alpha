import { expect, test } from "@playwright/test";
import { COOKIE_NAME } from "@/lib/research-access";

/**
 * Verifies the certificate forms are feature-flagged: for the public the
 * online "start" link is hidden (only the offline / Registration Department
 * method remains) and the form + start routes are unreachable, while
 * research-access users can still see and reach the online form.
 *
 * The research-access gate is only enforced when RESEARCH_ACCESS_TOKEN is set
 * (see src/lib/research-access.ts — it returns true when the token is unset).
 * CI does not set the token, so the whole suite skips there. To run it:
 *   RESEARCH_ACCESS_TOKEN=demo npm run dev        # in one shell
 *   RESEARCH_ACCESS_TOKEN=demo npx playwright test feature-flag-certificates
 */
const TOKEN = process.env.RESEARCH_ACCESS_TOKEN;

const CATEGORY = "family-birth-relationships";
const FLAGGED_FORMS = [
  "get-birth-certificate",
  "get-death-certificate",
  "get-marriage-certificate",
] as const;

const ONLINE_START_LINK = /complete the online form/i;
const OFFLINE_METHOD = /get a paper application/i;

test.describe("Certificate forms are feature-flagged", () => {
  // biome-ignore lint/suspicious/noSkippedTests: conditional skip — the gate is only enforced when RESEARCH_ACCESS_TOKEN is set
  test.skip(
    !TOKEN,
    "research-access gate inactive (RESEARCH_ACCESS_TOKEN unset)"
  );

  for (const form of FLAGGED_FORMS) {
    const overviewUrl = `/${CATEGORY}/${form}`;
    const startUrl = `${overviewUrl}/start`;
    const formUrl = `${overviewUrl}/form`;

    test.describe(form, () => {
      test("public: overview hides the online start-link, shows offline method", async ({
        page,
      }) => {
        const response = await page.goto(overviewUrl);
        expect(response?.status()).toBe(200);

        await expect(page.getByText(ONLINE_START_LINK)).toHaveCount(0);
        await expect(page.getByText(OFFLINE_METHOD).first()).toBeVisible();
      });

      test("public: the form route is not reachable", async ({ page }) => {
        const response = await page.goto(formUrl);
        expect(response?.status()).toBe(404);
        await expect(page.locator("form")).toHaveCount(0);
      });

      test("public: the start route is not reachable", async ({ page }) => {
        const response = await page.goto(startUrl);
        expect(response?.status()).toBe(404);
      });

      test("research-access: online form remains reachable", async ({
        page,
        context,
        baseURL,
      }) => {
        await context.addCookies([
          {
            name: COOKIE_NAME,
            value: TOKEN as string,
            url: baseURL as string,
          },
        ]);

        const response = await page.goto(formUrl);
        expect(response?.status()).toBe(200);
        await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
      });
    });
  }
});
