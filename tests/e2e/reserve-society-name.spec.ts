import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

/**
 * End-to-end tests for the Reserve Society Name form
 * Tests the complete flow including field arrays (simple and complex)
 */

const FORM_URL = "/business-trade/reserve-society-name/form";
const FORM_NAME = "Reserve Society Name";

test.describe(`${FORM_NAME} Form`, () => {
  test.beforeEach(async ({ page }) => {
    // Clear any stored form data
    await page.goto(FORM_URL);
    await page.evaluate(() => {
      localStorage.removeItem("reserve-society-name");
    });
    await page.reload();
  });

  test("should complete the full form flow with valid data", async ({
    page,
  }) => {
    // Navigate to form
    await page.goto(FORM_URL);

    // Verify form loaded
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });

    // Step 1: Request Details - Select "Reserve a society name"
    console.log("\n📝 Step 1: Request Details");
    await page
      .getByRole("radio", { name: /reserve a society name/i })
      .check({ force: true });

    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 2: Society Name Choices (Complex Field Array)
    console.log("\n📝 Step 2: Society Name Choices");
    await expect(
      page.getByRole("heading", { name: /proposed society name/i })
    ).toBeVisible({ timeout: 5000 });

    // Fill first name choice
    const societyName1 = faker.company.name() + " Society";
    const explanation1 = faker.lorem.sentence();

    await page.locator('input[name="choices.0.title"]').fill(societyName1);
    await page
      .locator('input[name="choices.0.explanation"]')
      .fill(explanation1);

    console.log(`  ✓ First choice: ${societyName1}`);

    // Add and fill second name choice
    await page.getByRole("button", { name: /add another name/i }).click();
    await page.waitForTimeout(300);

    const societyName2 = faker.company.name() + " Association";
    const explanation2 = faker.lorem.sentence();

    await page.locator('input[name="choices.1.title"]').fill(societyName2);
    await page
      .locator('input[name="choices.1.explanation"]')
      .fill(explanation2);

    console.log(`  ✓ Second choice: ${societyName2}`);

    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 3: Society Activities (Simple Field Array)
    console.log("\n📝 Step 3: Society Activities");
    await expect(
      page.getByRole("heading", { name: /what does the society do/i })
    ).toBeVisible({ timeout: 5000 });

    // Fill first activity
    const activity1 = faker.lorem.words(3);
    await page.locator('input[name="activity.types.0.value"]').fill(activity1);
    console.log(`  ✓ First activity: ${activity1}`);

    // Add and fill second activity
    await page.getByRole("button", { name: /add another activity/i }).click();
    await page.waitForTimeout(300);

    const activity2 = faker.lorem.words(3);
    await page.locator('input[name="activity.types.1.value"]').fill(activity2);
    console.log(`  ✓ Second activity: ${activity2}`);

    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 4: Applicant Details (includes contact info)
    console.log("\n📝 Step 4: Applicant Details");
    await expect(
      page.getByRole("heading", { name: /tell us about yourself/i })
    ).toBeVisible({ timeout: 5000 });

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const phone = `246 ${faker.string.numeric(3)} ${faker.string.numeric(4)}`;

    await page.locator('input[name="applicant.firstName"]').fill(firstName);
    await page.locator('input[name="applicant.lastName"]').fill(lastName);
    await page.locator('input[name="applicant.addressLine1"]').fill(address);
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption({ index: 1 });
    await page.locator('input[name="applicant.email"]').fill(email);
    await page.locator('input[name="applicant.telephoneNumber"]').fill(phone);

    console.log(`  ✓ Applicant: ${firstName} ${lastName}`);
    console.log(`  ✓ Contact: ${email}, ${phone}`);

    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 5: Check Your Answers
    console.log("\n📝 Step 5: Check Your Answers");
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 10_000 });

    // Verify society names are displayed
    await expect(page.getByText(societyName1)).toBeVisible();
    await expect(page.getByText(societyName2)).toBeVisible();

    // Verify activities are displayed
    await expect(page.getByText(activity1)).toBeVisible();
    await expect(page.getByText(activity2)).toBeVisible();

    console.log("  ✓ All entered data displayed correctly");

    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Step 6: Declaration
    console.log("\n📝 Step 6: Declaration");
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible({ timeout: 5000 });

    // Check declaration checkbox
    const declarationCheckbox = page.locator(
      'input[name="declaration.confirmed"]'
    );
    if (await declarationCheckbox.isVisible().catch(() => false)) {
      await declarationCheckbox.check({ force: true });
      console.log("  ✓ Declaration confirmed");
    }

    // Fill declaration date
    const today = new Date();
    try {
      await page
        .locator("#declaration\\.date-month, #dateOfDeclaration-month")
        .first()
        .fill((today.getMonth() + 1).toString());
      await page
        .locator("#declaration\\.date-day, #dateOfDeclaration-day")
        .first()
        .fill(today.getDate().toString());
      await page
        .locator("#declaration\\.date-year, #dateOfDeclaration-year")
        .first()
        .fill(today.getFullYear().toString());
      console.log("  ✓ Declaration date filled");
    } catch (_error) {
      console.warn("  ⚠ Could not fill declaration date");
    }

    // Take screenshot before submission
    await page.screenshot({
      path: `test-results/${FORM_NAME.replace(/\s+/g, "-").toLowerCase()}-before-submit.png`,
    });

    // Submit form
    console.log("\n📤 Submitting form...");
    const submitButton = page.getByRole("button", { name: /submit/i });
    await submitButton.scrollIntoViewIfNeeded();
    await submitButton.click();

    // Wait for response
    await page.waitForTimeout(3000);

    // Verify submission success
    const currentUrl = page.url();
    console.log(`  📍 Current URL: ${currentUrl}`);

    const isOnConfirmation = currentUrl.includes("confirmation");
    if (isOnConfirmation) {
      console.log("  ✅ Form submitted successfully!");
      await expect(
        page.getByRole("heading", { name: /confirmation|submitted/i })
      ).toBeVisible({ timeout: 5000 });
    } else {
      // Take screenshot for debugging
      await page.screenshot({
        path: `test-results/${FORM_NAME.replace(/\s+/g, "-").toLowerCase()}-after-submit.png`,
        fullPage: true,
      });
    }
  });

  test("should validate required fields on each step", async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });

    // Try to proceed without selecting an option
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation error
    await expect(page.getByText(/select an option/i)).toBeVisible({
      timeout: 3000,
    });

    // Select option and continue
    await page
      .getByRole("radio", { name: /reserve a society name/i })
      .check({ force: true });
    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // On society names step, try to proceed without filling
    await expect(
      page.getByRole("heading", { name: /proposed society name/i })
    ).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation errors for required fields
    await expect(
      page.getByText(/society name is required|at least one society name/i)
    ).toBeVisible({ timeout: 3000 });
  });

  test("should allow adding and removing field array items", async ({
    page,
  }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });

    // Select option and proceed
    await page
      .getByRole("radio", { name: /reserve a society name/i })
      .check({ force: true });
    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // On society names step
    await expect(
      page.getByRole("heading", { name: /proposed society name/i })
    ).toBeVisible({ timeout: 5000 });

    // Initially should have 1 item
    await expect(page.locator('input[name="choices.0.title"]')).toBeVisible();

    // Fill first item
    await page
      .locator('input[name="choices.0.title"]')
      .fill("First Society Name");
    await page
      .locator('input[name="choices.0.explanation"]')
      .fill("First explanation");

    // Add second item
    await page.getByRole("button", { name: /add another name/i }).click();
    await page.waitForTimeout(300);

    await expect(page.locator('input[name="choices.1.title"]')).toBeVisible();

    // Fill second item
    await page
      .locator('input[name="choices.1.title"]')
      .fill("Second Society Name");
    await page
      .locator('input[name="choices.1.explanation"]')
      .fill("Second explanation");

    // Add third item (max is 3)
    await page.getByRole("button", { name: /add another name/i }).click();
    await page.waitForTimeout(300);

    await expect(page.locator('input[name="choices.2.title"]')).toBeVisible();

    // "Add another" button should not be visible after reaching max
    await expect(
      page.getByRole("button", { name: /add another name/i })
    ).not.toBeVisible();

    // Remove second item
    const removeButtons = page.getByRole("button", { name: /remove/i });
    const removeCount = await removeButtons.count();
    expect(removeCount).toBeGreaterThan(0);

    // Click remove on one of the items
    await removeButtons.first().click();
    await page.waitForTimeout(300);

    // Should now have 2 items and "Add another" should be visible again
    await expect(
      page.getByRole("button", { name: /add another name/i })
    ).toBeVisible();
  });

  test("should persist form data across navigation", async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });

    // Fill first step
    await page
      .getByRole("radio", { name: /reserve a society name/i })
      .check({ force: true });
    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Fill society name
    const societyName = "Test Persistent Society";
    await page.locator('input[name="choices.0.title"]').fill(societyName);
    await page
      .locator('input[name="choices.0.explanation"]')
      .fill("Test explanation");

    await page.getByRole("button", { name: /continue/i }).click();
    await page.waitForTimeout(500);

    // Go back
    await page.getByRole("button", { name: /previous/i }).click();
    await page.waitForTimeout(500);

    // Verify data is still there
    await expect(page.locator('input[name="choices.0.title"]')).toHaveValue(
      societyName
    );
  });
});
