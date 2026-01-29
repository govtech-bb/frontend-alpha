import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/family-birth-relationships/register-a-birth/form";
const FORM_KEY = "register-birth";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateParentData = () => ({
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  // TODO: DDMMYY-XXXX, this test can fail
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  parish: faker.helpers.arrayElement([
    "christ-church",
    "st-andrew",
    "st-george",
    "st-james",
    "st-john",
    "st-joseph",
    "st-lucy",
    "st-michael",
    "st-peter",
    "st-philip",
    "st-thomas",
  ]),
  streetAddress: faker.location.streetAddress(),
  occupation: faker.person.jobTitle(),
});

const generateMotherData = () => ({
  ...generateParentData(),
  maidenName: faker.person.lastName(),
  telephoneNumber: `1246${faker.string.numeric(7)}`,
  emailAddress: "testing@govtech.bb",
});

const generateChildData = () => ({
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  dateOfBirth: {
    day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
    month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
    year: faker.number.int({ min: 2020, max: 2024 }).toString(),
  },
  sexAtBirth: faker.helpers.arrayElement(["male", "female"]),
});

/**
 * Log the submitted form data from the request
 */
function logSubmittedData(request: { postDataJSON: () => unknown }) {
  const submittedData = request.postDataJSON();
  console.log("\n📋 SUBMITTED FORM DATA:");
  console.log("─".repeat(50));
  console.log(JSON.stringify(submittedData, null, 2));
  console.log("─".repeat(50));
}

/**
 * Verify the API response structure and success status
 */
function verifyApiResponse(response: ApiResponse, formId: string) {
  expect(response.success).toBe(true);
  expect(response.message).toBeTruthy();
  expect(response.data).toBeTruthy();

  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  expect(response.data.submissionId).toBeTruthy();
  expect(response.data.formId).toBe(formId);
  expect(response.data.status).toBeTruthy();
  expect(response.data.processedAt).toBeTruthy();

  console.log("✅ API Response verified:");
  console.log(`   - Submission ID: ${response.data.submissionId}`);
  console.log(`   - Status: ${response.data.status}`);
  if (response.data.referenceNumber) {
    console.log(`   - Reference Number: ${response.data.referenceNumber}`);
  }
}

/**
 * Helper to fill father details step
 */
async function fillFatherDetails(
  page: import("@playwright/test").Page,
  father: ReturnType<typeof generateParentData>
) {
  await page.locator('input[name="father.firstName"]').fill(father.firstName);
  await page.locator('input[name="father.middleName"]').fill(father.middleName);
  await page.locator('input[name="father.lastName"]').fill(father.lastName);
  await page.locator('input[name="father.idNumber"]').fill(father.idNumber);
  await page
    .locator('select[name="father.parish"]')
    .selectOption(father.parish);
  await page
    .locator('textarea[name="father.streetAddress"]')
    .fill(father.streetAddress);
  await page.locator('input[name="father.occupation"]').fill(father.occupation);
}

/**
 * Helper to fill mother details step
 */
async function fillMotherDetails(
  page: import("@playwright/test").Page,
  mother: ReturnType<typeof generateMotherData>
) {
  await page.locator('input[name="mother.firstName"]').fill(mother.firstName);
  await page.locator('input[name="mother.middleName"]').fill(mother.middleName);
  await page.locator('input[name="mother.lastName"]').fill(mother.lastName);
  await page.locator('input[name="mother.idNumber"]').fill(mother.idNumber);
  await page
    .locator('select[name="mother.parish"]')
    .selectOption(mother.parish);
  await page
    .locator('textarea[name="mother.streetAddress"]')
    .fill(mother.streetAddress);
  await page
    .locator('input[name="mother.telephoneNumber"]')
    .fill(mother.telephoneNumber);
  await page
    .locator('input[name="mother.emailAddress"]')
    .fill(mother.emailAddress);
  await page.locator('input[name="mother.occupation"]').fill(mother.occupation);
}

/**
 * Helper to fill birth details step (health facility)
 */
async function fillBirthDetailsHealthFacility(
  page: import("@playwright/test").Page
) {
  // Select health facility option
  await page.getByText("Health facility", { exact: true }).click();

  // Wait for conditional field to appear and select hospital
  await page
    .locator('select[name="birth.healthFacility"]')
    .selectOption("3d5cd721-df37-493c-86c0-41b8aa42e27d"); // Queen Elizabeth Hospital

  // Select single birth
  await page.getByText("Single", { exact: true }).click();
}

/**
 * Helper to fill birth details step (residential)
 */
async function fillBirthDetailsResidential(
  page: import("@playwright/test").Page,
  parish: string,
  address: string
) {
  // Select residential option
  await page.getByText("Residential", { exact: true }).click();

  // Wait for conditional fields to appear
  await page.locator('select[name="birth.parish"]').selectOption(parish);
  await page.locator('textarea[name="birth.streetAddress"]').fill(address);

  // Select single birth
  await page.getByText("Single", { exact: true }).click();
}

/**
 * Helper to fill child details step
 */
async function fillChildDetails(
  page: import("@playwright/test").Page,
  child: ReturnType<typeof generateChildData>
) {
  await page.locator('input[name="child.firstName"]').fill(child.firstName);
  await page.locator('input[name="child.middleName"]').fill(child.middleName);
  await page.locator('input[name="child.lastName"]').fill(child.lastName);
  await page
    .locator("#child\\.dateOfBirth-month")
    .fill(child.dateOfBirth.month);
  await page.locator("#child\\.dateOfBirth-day").fill(child.dateOfBirth.day);
  await page.locator("#child\\.dateOfBirth-year").fill(child.dateOfBirth.year);
  await page
    .locator('select[name="child.sexAtBirth"]')
    .selectOption(child.sexAtBirth);
}

test.describe("Register a Birth Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - married parents", async ({ page }) => {
    const father = generateParentData();
    const mother = generateMotherData();
    const child = generateChildData();
    const numberOfCopies = faker.number.int({ min: 1, max: 3 });

    // Step 1: Marriage Status
    await expect(
      page.getByRole("heading", { name: /were the mother and father married/i })
    ).toBeVisible();

    await page.getByText("Yes", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Father Details (shown because married)
    await expect(
      page.getByRole("heading", { name: /tell us about the child's father/i })
    ).toBeVisible({ timeout: 5000 });

    await fillFatherDetails(page, father);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Mother Details
    await expect(
      page.getByRole("heading", { name: /tell us about the child's mother/i })
    ).toBeVisible({ timeout: 5000 });

    await fillMotherDetails(page, mother);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Birth Details
    await expect(
      page.getByRole("heading", { name: /tell us about the birth/i })
    ).toBeVisible({ timeout: 5000 });

    await fillBirthDetailsHealthFacility(page);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Child Details
    await expect(
      page.getByRole("heading", { name: /tell us about the child$/i })
    ).toBeVisible({ timeout: 5000 });

    await fillChildDetails(page, child);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Order Details
    await expect(
      page.getByRole("heading", { name: /order a birth certificate/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });

    // Verify some data appears on review page
    await expect(page.getByText(father.firstName)).toBeVisible();
    await expect(page.getByText(mother.firstName)).toBeVisible();
    await expect(page.getByText(child.firstName)).toBeVisible();

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible({ timeout: 5000 });

    // Check declaration checkbox
    const checkbox = page.locator('button[role="checkbox"]');
    await expect(checkbox).toBeVisible();
    await checkbox.click();

    // Set up API response interception before submitting
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(API_SUBMIT_PATH) &&
        response.request().method() === "POST",
      { timeout: 30_000 }
    );

    // Submit
    await page.getByRole("button", { name: /submit/i }).click();

    // Wait for and verify API response
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, FORM_KEY);

    // Verify UI navigated to confirmation
    await expect(
      page.getByRole("heading", { name: /thank you|confirmation/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - unmarried parents, include father", async ({
    page,
  }) => {
    const father = generateParentData();
    const mother = generateMotherData();
    const child = generateChildData();
    const numberOfCopies = faker.number.int({ min: 1, max: 3 });

    // Step 1: Marriage Status - No
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Include Father Details - Yes
    await expect(
      page.getByRole("heading", {
        name: /do you want to include the father's details/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("Yes, include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Father Details
    await expect(
      page.getByRole("heading", { name: /tell us about the child's father/i })
    ).toBeVisible({ timeout: 5000 });

    await fillFatherDetails(page, father);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Mother Details
    await expect(
      page.getByRole("heading", { name: /tell us about the child's mother/i })
    ).toBeVisible({ timeout: 5000 });

    await fillMotherDetails(page, mother);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Birth Details
    await fillBirthDetailsHealthFacility(page);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Child Details
    await fillChildDetails(page, child);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Order Details
    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Declaration
    const checkbox = page.locator('button[role="checkbox"]');
    await checkbox.click();

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(API_SUBMIT_PATH) &&
        response.request().method() === "POST",
      { timeout: 30_000 }
    );

    await page.getByRole("button", { name: /submit/i }).click();

    const response = await responsePromise;
    expect(response.status()).toBe(200);

    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, FORM_KEY);

    await expect(
      page.getByRole("heading", { name: /thank you|confirmation/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - unmarried parents, exclude father (shortest path)", async ({
    page,
  }) => {
    const mother = generateMotherData();
    const child = generateChildData();
    const numberOfCopies = faker.number.int({ min: 1, max: 3 });

    // Step 1: Marriage Status - No
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Include Father Details - No
    await expect(
      page.getByRole("heading", {
        name: /do you want to include the father's details/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("No, do not include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Mother Details (father details step is skipped)
    await expect(
      page.getByRole("heading", { name: /tell us about the child's mother/i })
    ).toBeVisible({ timeout: 5000 });

    await fillMotherDetails(page, mother);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Birth Details
    await fillBirthDetailsHealthFacility(page);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Child Details
    await fillChildDetails(page, child);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Order Details
    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });

    // Verify father details are NOT shown (since excluded)
    await expect(page.getByText(/father's first name/i)).not.toBeVisible();

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    const checkbox = page.locator('button[role="checkbox"]');
    await checkbox.click();

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(API_SUBMIT_PATH) &&
        response.request().method() === "POST",
      { timeout: 30_000 }
    );

    await page.getByRole("button", { name: /submit/i }).click();

    const response = await responsePromise;
    expect(response.status()).toBe(200);

    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, FORM_KEY);

    await expect(
      page.getByRole("heading", { name: /thank you|confirmation/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("birth at residential location shows address fields", async ({
    page,
  }) => {
    const mother = generateMotherData();
    const child = generateChildData();

    // Navigate to birth details step (shortest path)
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByText("No, do not include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    await fillMotherDetails(page, mother);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step: Birth Details - select Residential
    await expect(
      page.getByRole("heading", { name: /tell us about the birth/i })
    ).toBeVisible({ timeout: 5000 });

    // Verify conditional fields are NOT visible initially
    await expect(
      page.locator('select[name="birth.healthFacility"]')
    ).not.toBeVisible();
    await expect(page.locator('select[name="birth.parish"]')).not.toBeVisible();

    // Select residential
    await page.getByText("Residential", { exact: true }).click();

    // Verify conditional fields ARE now visible
    await expect(page.locator('select[name="birth.parish"]')).toBeVisible({
      timeout: 3000,
    });
    await expect(
      page.locator('textarea[name="birth.streetAddress"]')
    ).toBeVisible();

    // Fill the conditional fields
    await fillBirthDetailsResidential(page, "st-michael", "123 Test Street");
    await page.getByRole("button", { name: /continue/i }).click();

    // Should proceed to child details
    await expect(
      page.getByRole("heading", { name: /tell us about the child$/i })
    ).toBeVisible({ timeout: 5000 });
  });

  test("validates required fields on marriage status step", async ({
    page,
  }) => {
    // Try to continue without selecting anything
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation error
    await expect(page.getByText(/select your preference/i).first()).toBeVisible(
      {
        timeout: 3000,
      }
    );
  });

  test("validates ID number format", async ({ page }) => {
    const mother = generateMotherData();

    // Navigate to mother details step (shortest path)
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByText("No, do not include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Fill mother details with invalid ID
    await page.locator('input[name="mother.firstName"]').fill(mother.firstName);
    await page.locator('input[name="mother.lastName"]').fill(mother.lastName);
    await page.locator('input[name="mother.idNumber"]').fill("invalid-id");
    await page
      .locator('select[name="mother.parish"]')
      .selectOption(mother.parish);
    await page
      .locator('textarea[name="mother.streetAddress"]')
      .fill(mother.streetAddress);
    await page
      .locator('input[name="mother.telephoneNumber"]')
      .fill(mother.telephoneNumber);
    await page
      .locator('input[name="mother.emailAddress"]')
      .fill(mother.emailAddress);
    await page
      .locator('input[name="mother.occupation"]')
      .fill(mother.occupation);

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show ID format error
    await expect(page.getByText(/valid ID number/i).first()).toBeVisible({
      timeout: 3000,
    });
  });

  test("can use passport instead of ID number", async ({ page }) => {
    const mother = generateMotherData();

    // Navigate to mother details step (shortest path)
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByText("No, do not include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Fill mother details
    await page.locator('input[name="mother.firstName"]').fill(mother.firstName);
    await page.locator('input[name="mother.lastName"]').fill(mother.lastName);

    // Click to expand passport option instead of filling ID
    const passportToggle = page.getByText(/use passport number instead/i);
    if (await passportToggle.isVisible()) {
      await passportToggle.click();

      // Fill passport details
      await page
        .locator('input[name="mother.passportNumber"]')
        .fill("AB1234567");
      await page.locator('input[name="mother.age"]').fill("30");
    }

    await page
      .locator('select[name="mother.parish"]')
      .selectOption(mother.parish);
    await page
      .locator('textarea[name="mother.streetAddress"]')
      .fill(mother.streetAddress);
    await page
      .locator('input[name="mother.telephoneNumber"]')
      .fill(mother.telephoneNumber);
    await page
      .locator('input[name="mother.emailAddress"]')
      .fill(mother.emailAddress);
    await page
      .locator('input[name="mother.occupation"]')
      .fill(mother.occupation);

    await page.getByRole("button", { name: /continue/i }).click();

    // Should proceed to birth details step
    await expect(
      page.getByRole("heading", { name: /tell us about the birth/i })
    ).toBeVisible({ timeout: 5000 });
  });

  test("declaration step requires checkbox to be checked", async ({ page }) => {
    const mother = generateMotherData();
    const child = generateChildData();
    const numberOfCopies = 1;

    // Navigate through form (shortest path)
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByText("No, do not include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    await fillMotherDetails(page, mother);
    await page.getByRole("button", { name: /continue/i }).click();

    await fillBirthDetailsHealthFacility(page);
    await page.getByRole("button", { name: /continue/i }).click();

    await fillChildDetails(page, child);
    await page.getByRole("button", { name: /continue/i }).click();

    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Check Your Answers
    await page.getByRole("button", { name: /continue/i }).click();

    // Declaration - verify checkbox is required
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible({ timeout: 5000 });

    // Verify checkbox is initially unchecked
    const checkbox = page.locator('button[role="checkbox"]');
    await expect(checkbox).toHaveAttribute("aria-checked", "false");

    // Try to submit without checking the checkbox
    await page.getByRole("button", { name: /submit/i }).click();

    // Should show validation error for checkbox
    await expect(page.getByText(/there is a problem/i)).toBeVisible({
      timeout: 3000,
    });
  });

  test("validates child date of birth must be in the past", async ({
    page,
  }) => {
    const mother = generateMotherData();

    // Navigate to child details (shortest path)
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    await page.getByText("No, do not include the father's details").click();
    await page.getByRole("button", { name: /continue/i }).click();

    await fillMotherDetails(page, mother);
    await page.getByRole("button", { name: /continue/i }).click();

    await fillBirthDetailsHealthFacility(page);
    await page.getByRole("button", { name: /continue/i }).click();

    // Child Details - enter future date
    await expect(
      page.getByRole("heading", { name: /tell us about the child$/i })
    ).toBeVisible({ timeout: 5000 });

    await page.locator('input[name="child.firstName"]').fill("TestChild");
    await page.locator('input[name="child.lastName"]').fill("TestLastName");

    // Enter a future date
    await page.locator("#child\\.dateOfBirth-month").fill("12");
    await page.locator("#child\\.dateOfBirth-day").fill("31");
    await page.locator("#child\\.dateOfBirth-year").fill("2030");

    await page.locator('select[name="child.sexAtBirth"]').selectOption("male");

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show date validation error
    await expect(page.getByText(/must be in the past/i).first()).toBeVisible({
      timeout: 3000,
    });
  });
});
