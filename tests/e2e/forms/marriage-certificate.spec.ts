import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/family-birth-relationships/get-marriage-certificate/form";
const FORM_KEY = "get-marriage-certificate";
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
  postcode: `BB${faker.string.numeric(5)}`,
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
});

const generateHusbandData = () => ({
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
});

const generateWifeData = () => ({
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  maidenName: faker.person.lastName(),
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
});

const generateDateOfMarriage = () => ({
  day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: faker.number.int({ min: 1970, max: 2023 }).toString(),
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
 * Verify the API response - expects success
 */
function verifyApiResponse(response: ApiResponse, formId: string) {
  // Fail fast if API returns an error
  expect(response.success, `API returned error: ${response.message}`).toBe(
    true
  );
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

test.describe("Get Marriage Certificate Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - applying for yourself", async ({ page }) => {
    const applicant = generateApplicantData();
    const husband = generateHusbandData();
    const wife = generateWifeData();
    const marriageDate = generateDateOfMarriage();
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
      .locator('input[name="applicant.postcode"]')
      .fill(applicant.postcode);
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);

    // Are you a Barbados national? - Select Yes
    await page.getByText("Yes", { exact: true }).click();

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Applying for yourself?
    await expect(
      page.getByRole("heading", {
        name: /are you applying for your own marriage certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("Yes - the certificate is for me").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Husband Details
    await expect(
      page.getByRole("heading", { name: /tell us about the husband/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="husband.firstName"]')
      .fill(husband.firstName);
    await page
      .locator('input[name="husband.middleName"]')
      .fill(husband.middleName);
    await page.locator('input[name="husband.lastName"]').fill(husband.lastName);
    await page.locator('input[name="husband.idNumber"]').fill(husband.idNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Wife Details
    await expect(
      page.getByRole("heading", { name: /tell us about the wife/i })
    ).toBeVisible({ timeout: 5000 });

    await page.locator('input[name="wife.firstName"]').fill(wife.firstName);
    await page.locator('input[name="wife.middleName"]').fill(wife.middleName);
    await page.locator('input[name="wife.maidenName"]').fill(wife.maidenName);
    await page.locator('input[name="wife.idNumber"]').fill(wife.idNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Marriage Details
    await expect(
      page.getByRole("heading", { name: /provide your marriage details/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator("#marriageDetails\\.dateOfMarriage-month")
      .fill(marriageDate.month);
    await page
      .locator("#marriageDetails\\.dateOfMarriage-day")
      .fill(marriageDate.day);
    await page
      .locator("#marriageDetails\\.dateOfMarriage-year")
      .fill(marriageDate.year);
    await page
      .locator('input[name="marriageDetails.placeOfMarriage"]')
      .fill("St. Michael Parish Church");

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Order Details (skips reason step when applying for yourself)
    await expect(
      page.getByRole("heading", { name: /how many copies/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });

    // Verify data appears on review page
    await expect(page.getByText(applicant.firstName)).toBeVisible();
    await expect(page.getByText(husband.firstName)).toBeVisible();
    await expect(page.getByText(wife.firstName)).toBeVisible();

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
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
    verifyApiResponse(responseBody, "get-marriage-certificate");

    // Verify UI navigated to confirmation
    await expect(
      page.getByRole("heading", { name: /submission|confirmation|saved/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - applying for someone else", async ({ page }) => {
    const applicant = generateApplicantData();
    const husband = generateHusbandData();
    const wife = generateWifeData();
    const marriageDate = generateDateOfMarriage();
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

    // Are you a Barbados national?
    await page.getByText("Yes", { exact: true }).click();

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Applying for yourself? - Select NO
    await expect(
      page.getByRole("heading", {
        name: /are you applying for your own marriage certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("No - the certificate is for someone else").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Husband Details
    await expect(
      page.getByRole("heading", { name: /tell us about the husband/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="husband.firstName"]')
      .fill(husband.firstName);
    await page.locator('input[name="husband.lastName"]').fill(husband.lastName);
    await page.locator('input[name="husband.idNumber"]').fill(husband.idNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Wife Details
    await expect(
      page.getByRole("heading", { name: /tell us about the wife/i })
    ).toBeVisible({ timeout: 5000 });

    await page.locator('input[name="wife.firstName"]').fill(wife.firstName);
    await page.locator('input[name="wife.maidenName"]').fill(wife.maidenName);
    await page.locator('input[name="wife.idNumber"]').fill(wife.idNumber);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Marriage Details
    await expect(
      page.getByRole("heading", { name: /provide your marriage details/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator("#marriageDetails\\.dateOfMarriage-month")
      .fill(marriageDate.month);
    await page
      .locator("#marriageDetails\\.dateOfMarriage-day")
      .fill(marriageDate.day);
    await page
      .locator("#marriageDetails\\.dateOfMarriage-year")
      .fill(marriageDate.year);
    await page
      .locator('input[name="marriageDetails.placeOfMarriage"]')
      .fill("Christ Church Registry Office");

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Reason for Requesting (only shown when applying for someone else)
    await expect(
      page.getByRole("heading", {
        name: /tell us about why you are requesting/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('select[name="reason.relationshipToMarriedPersons"]')
      .selectOption("child");
    await page
      .locator('textarea[name="reason.explanationForRequestingCertificate"]')
      .fill("Need parents' marriage certificate for visa application");

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Order Details
    await expect(
      page.getByRole("heading", { name: /how many copies/i })
    ).toBeVisible({ timeout: 5000 });

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
    verifyApiResponse(responseBody, "get-marriage-certificate");

    // Verify UI navigated to confirmation
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

  test("validates ID number format for husband", async ({ page }) => {
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

    await page.getByText("Yes", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Applying for yourself
    await page.getByText("Yes - the certificate is for me").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Husband details - enter invalid ID
    await expect(
      page.getByRole("heading", { name: /tell us about the husband/i })
    ).toBeVisible({ timeout: 5000 });

    await page.locator('input[name="husband.firstName"]').fill("John");
    await page.locator('input[name="husband.lastName"]').fill("Doe");
    await page.locator('input[name="husband.idNumber"]').fill("invalid-id");

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show ID format error
    await expect(page.getByText(/valid ID number/i).first()).toBeVisible({
      timeout: 3000,
    });
  });
});
