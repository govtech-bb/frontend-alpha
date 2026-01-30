import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/family-birth-relationships/get-death-certificate/form";
const FORM_KEY = "get-death-certificate";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
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
  postalCode: `BB${faker.string.numeric(5)}`,
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
});

const generateDeceasedData = () => ({
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  placeOfDeath: faker.location.city(),
  causeOfDeath: faker.helpers.arrayElement([
    "Natural causes",
    "Heart disease",
    "Cancer",
    "",
  ]),
});

const generateDateOfDeath = () => ({
  day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: faker.number.int({ min: 1980, max: 2023 }).toString(),
});

/**
 * Format date as DD/MM/YYYY (matches DeclarationStep format)
 */
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Build full name from applicant data (matches DeclarationStep logic)
 */
function buildFullName(applicant: {
  firstName: string;
  middleName?: string;
  lastName: string;
}): string {
  return [applicant.firstName, applicant.middleName, applicant.lastName]
    .filter(Boolean)
    .join(" ");
}

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

  // Type guard to ensure data exists for subsequent checks
  if (!response.data) {
    throw new Error("Response data is undefined");
  }

  expect(response.data.submissionId).toBeTruthy();
  expect(response.data.formId).toBe(formId);
  expect(response.data.status).toBeTruthy();
  expect(response.data.processedAt).toBeTruthy();

  // If payment is required, verify payment fields
  if (response.data.paymentRequired) {
    expect(response.data.paymentUrl).toBeTruthy();
    expect(response.data.paymentToken).toBeTruthy();
    expect(response.data.paymentId).toBeTruthy();
    expect(response.data.amount).toBeGreaterThan(0);
  }

  console.log("✅ API Response verified:");
  console.log(`   - Submission ID: ${response.data.submissionId}`);
  console.log(`   - Status: ${response.data.status}`);
  console.log(
    `   - Payment Required: ${response.data.paymentRequired ?? false}`
  );
  if (response.data.referenceNumber) {
    console.log(`   - Reference Number: ${response.data.referenceNumber}`);
  }
}

test.describe("Get Death Certificate Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - with known date of death", async ({ page }) => {
    const applicant = generateApplicantData();
    const deceased = generateDeceasedData();
    const dateOfDeath = generateDateOfDeath();
    const numberOfCopies = faker.number.int({ min: 1, max: 5 });

    // Step 1: Applicant Details
    await expect(
      page.getByRole("heading", { name: /tell us about yourself/i })
    ).toBeVisible();

    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .locator('input[name="applicant.firstName"]')
      .fill(applicant.firstName);
    await page
      .locator('input[name="applicant.middleName"]')
      .fill(applicant.middleName);
    await page
      .locator('input[name="applicant.lastName"]')
      .fill(applicant.lastName);
    await page
      .locator('input[name="applicant.addressLine1"]')
      .fill(applicant.addressLine1);
    await page
      .locator('input[name="applicant.addressLine2"]')
      .fill(applicant.addressLine2);
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption(applicant.parish);
    await page
      .locator('input[name="applicant.postalCode"]')
      .fill(applicant.postalCode);
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Relationship to Deceased
    await expect(
      page.getByRole("heading", {
        name: /tell us your relationship with the deceased/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('select[name="relationshipToPerson"]')
      .selectOption("spouse");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Reason for Certificate
    await expect(
      page.getByRole("heading", {
        name: /tell us about why you need this certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="reasonForCertificate"]')
      .fill("Need certificate for estate settlement and insurance claim");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Deceased Details
    await expect(
      page.getByRole("heading", { name: /tell us about the deceased/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="deceased.firstName"]')
      .fill(deceased.firstName);
    await page
      .locator('input[name="deceased.middleName"]')
      .fill(deceased.middleName);
    await page
      .locator('input[name="deceased.lastName"]')
      .fill(deceased.lastName);

    // Select "Yes" for known date of death
    await page.getByText("Yes", { exact: true }).click();

    // Fill date of death
    await page.locator("#deceased\\.dateOfDeath-month").fill(dateOfDeath.month);
    await page.locator("#deceased\\.dateOfDeath-day").fill(dateOfDeath.day);
    await page.locator("#deceased\\.dateOfDeath-year").fill(dateOfDeath.year);

    await page
      .locator('input[name="deceased.placeOfDeath"]')
      .fill(deceased.placeOfDeath);
    if (deceased.causeOfDeath) {
      await page
        .locator('input[name="deceased.causeOfDeath"]')
        .fill(deceased.causeOfDeath);
    }

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Order Details
    await expect(
      page.getByRole("heading", { name: /how many copies/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });

    // Verify data appears on review page
    await expect(page.getByText(applicant.firstName)).toBeVisible();
    await expect(page.getByText(deceased.firstName)).toBeVisible();

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Declaration
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible({ timeout: 5000 });

    // Since applicant data was provided, verify static display of name and date
    const expectedFullName = buildFullName(applicant);
    const today = new Date();
    const expectedDate = formatDate(today);

    // Verify applicant's name is displayed (static text, not input fields)
    await expect(page.getByText(`Applicant's name:`)).toBeVisible();
    await expect(page.getByText(expectedFullName)).toBeVisible();

    // Verify today's date is displayed (static text, auto-filled)
    await expect(page.getByText("Date:")).toBeVisible();
    await expect(page.getByText(expectedDate)).toBeVisible();

    // Check declaration checkbox (rendered as button with role="checkbox")
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

    // Log the submitted form data
    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, "get-death-certificate");

    // Verify UI navigated to confirmation or shows success
    await expect(
      page.getByRole("heading", { name: /submission|confirmation|saved/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - with unknown date of death", async ({ page }) => {
    const applicant = generateApplicantData();
    const deceased = generateDeceasedData();
    const numberOfCopies = faker.number.int({ min: 1, max: 3 });

    // Step 1: Applicant Details
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .locator('input[name="applicant.firstName"]')
      .fill(applicant.firstName);
    await page
      .locator('input[name="applicant.lastName"]')
      .fill(applicant.lastName);
    await page
      .locator('input[name="applicant.addressLine1"]')
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption(applicant.parish);
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Relationship to Deceased
    await expect(
      page.getByRole("heading", {
        name: /tell us your relationship with the deceased/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('select[name="relationshipToPerson"]')
      .selectOption("child");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Reason for Certificate
    await expect(
      page.getByRole("heading", {
        name: /tell us about why you need this certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="reasonForCertificate"]')
      .fill("Required for genealogy research");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Deceased Details
    await expect(
      page.getByRole("heading", { name: /tell us about the deceased/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="deceased.firstName"]')
      .fill(deceased.firstName);
    await page
      .locator('input[name="deceased.lastName"]')
      .fill(deceased.lastName);

    // Select "No" for known date of death
    await page.getByText("No", { exact: true }).click();

    // Fill estimated date range
    await page
      .locator('input[name="deceased.estimatedDateOfDeath"]')
      .fill("1990 to 1992");

    await page
      .locator('input[name="deceased.placeOfDeath"]')
      .fill(deceased.placeOfDeath);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Order Details
    await expect(
      page.getByRole("heading", { name: /how many copies/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Declaration
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible({ timeout: 5000 });

    // Since applicant data was provided (no middleName filled), verify static display
    const expectedFullName = `${applicant.firstName} ${applicant.lastName}`;
    const today = new Date();
    const expectedDate = formatDate(today);

    // Verify applicant's name is displayed (static text, not input fields)
    await expect(page.getByText(`Applicant's name:`)).toBeVisible();
    await expect(page.getByText(expectedFullName)).toBeVisible();

    // Verify today's date is displayed (static text, auto-filled)
    await expect(page.getByText("Date:")).toBeVisible();
    await expect(page.getByText(expectedDate)).toBeVisible();

    // Check declaration checkbox (rendered as button with role="checkbox")
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

    await page.getByRole("button", { name: /submit/i }).click();

    // Wait for and verify API response
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    // Log the submitted form data
    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, "get-death-certificate");

    // Verify UI navigated to confirmation or shows success
    await expect(
      page.getByRole("heading", { name: /submission|confirmation|saved/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("validates required fields on first step", async ({ page }) => {
    await page.getByRole("button", { name: /continue/i }).click();

    await expect(page.getByText(/required/i).first()).toBeVisible({
      timeout: 3000,
    });
  });

  test("validates reason minimum length", async ({ page }) => {
    const applicant = generateApplicantData();

    // Fill applicant details
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .locator('input[name="applicant.firstName"]')
      .fill(applicant.firstName);
    await page
      .locator('input[name="applicant.lastName"]')
      .fill(applicant.lastName);
    await page
      .locator('input[name="applicant.addressLine1"]')
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption(applicant.parish);
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Relationship step
    await page
      .locator('select[name="relationshipToPerson"]')
      .selectOption("spouse");
    await page.getByRole("button", { name: /continue/i }).click();

    // Reason step - enter too short reason
    await expect(
      page.getByRole("heading", {
        name: /tell us about why you need this certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.locator('input[name="reasonForCertificate"]').fill("Short");
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation error for minimum length
    await expect(page.getByText(/at least 10 characters/i).first()).toBeVisible(
      {
        timeout: 3000,
      }
    );
  });
});
