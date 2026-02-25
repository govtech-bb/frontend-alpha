import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/family-birth-relationships/get-birth-certificate/form";
const FORM_KEY = "get-birth-certificate";
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

const generateDateOfBirth = () => ({
  day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: faker.number.int({ min: 1950, max: 2005 }).toString(),
});

const generateParentNames = () => ({
  father: {
    firstName: faker.person.firstName("male"),
    lastName: faker.person.lastName(),
  },
  mother: {
    firstName: faker.person.firstName("female"),
    lastName: faker.person.lastName(),
  },
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

test.describe("Get Birth Certificate Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - applying for yourself", async ({ page }) => {
    const applicant = generateApplicantData();
    const dob = generateDateOfBirth();
    const parents = generateParentNames();
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

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Applying for yourself?
    await expect(
      page.getByRole("heading", {
        name: /are you applying for your own birth certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("Yes - the certificate is for me").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Birth Details
    await expect(
      page.getByRole("heading", { name: /provide your birth details/i })
    ).toBeVisible({ timeout: 5000 });

    await page.locator("#birthDetails\\.dateOfBirth-month").fill(dob.month);
    await page.locator("#birthDetails\\.dateOfBirth-day").fill(dob.day);
    await page.locator("#birthDetails\\.dateOfBirth-year").fill(dob.year);
    await page
      .locator('input[name="birthDetails.placeOfBirth"]')
      .fill(faker.location.city());
    await page
      .locator('input[name="birthDetails.placeOfBaptism"]')
      .fill(faker.location.city());

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Parents' Names
    await expect(
      page.getByRole("heading", { name: /tell us your parents' names/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="parents.father.firstName"]')
      .fill(parents.father.firstName);
    await page
      .locator('input[name="parents.father.lastName"]')
      .fill(parents.father.lastName);
    await page
      .locator('input[name="parents.mother.firstName"]')
      .fill(parents.mother.firstName);
    await page
      .locator('input[name="parents.mother.lastName"]')
      .fill(parents.mother.lastName);

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
    await expect(page.getByText(applicant.lastName)).toBeVisible();

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

    // Verify date input fields are NOT shown (since applicant data exists)
    await expect(
      page.locator("#declaration\\.dateOfDeclaration-month")
    ).not.toBeVisible();
    await expect(
      page.locator("#declaration\\.dateOfDeclaration-day")
    ).not.toBeVisible();
    await expect(
      page.locator("#declaration\\.dateOfDeclaration-year")
    ).not.toBeVisible();

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
    console.log("responseBody", responseBody);
    verifyApiResponse(responseBody, "get-birth-certificate");

    // Verify UI navigated to confirmation or shows success
    await expect(
      page.getByRole("heading", { name: /submission|confirmation|saved/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("complete form - applying for someone else", async ({ page }) => {
    const applicant = generateApplicantData();
    const personDetails = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    const parents = generateParentNames();
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

    // Step 2: Applying for yourself? - Select NO
    await expect(
      page.getByRole("heading", {
        name: /are you applying for your own birth certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("No - the certificate is for someone else").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Relationship to Person
    await expect(
      page.getByRole("heading", { name: /what is your relationship/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('select[name="relationshipToPerson"]')
      .selectOption("parent");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Reason for Certificate
    await expect(
      page.getByRole("heading", { name: /tell us why you're ordering/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('textarea[name="reasonForOrderingCertificate"]')
      .fill("Need certificate for passport application");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Is Person Deceased?
    await expect(
      page.getByRole("heading", { name: /is the person deceased/i })
    ).toBeVisible({ timeout: 5000 });

    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Person Details
    await expect(
      page.getByRole("heading", { name: /tell us about the person/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="person.firstName"]')
      .fill(personDetails.firstName);
    await page
      .locator('input[name="person.lastName"]')
      .fill(personDetails.lastName);

    // NIS Number question - click the label text for the radio option
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Parents' Names (for other person)
    await expect(
      page.getByRole("heading", { name: /tell us their parents' names/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="parentsOther.father.firstName"]')
      .fill(parents.father.firstName);
    await page
      .locator('input[name="parentsOther.father.lastName"]')
      .fill(parents.father.lastName);
    await page
      .locator('input[name="parentsOther.mother.firstName"]')
      .fill(parents.mother.firstName);
    await page
      .locator('input[name="parentsOther.mother.lastName"]')
      .fill(parents.mother.lastName);

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Order Details
    await expect(
      page.getByRole("heading", { name: /how many copies/i })
    ).toBeVisible({ timeout: 5000 });

    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Check Your Answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible({ timeout: 5000 });

    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Declaration
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible({ timeout: 5000 });

    // Since applicant data was provided, verify static display of name and date
    // Note: This test doesn't fill middleName, so only firstName + lastName are shown
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
    verifyApiResponse(responseBody, "get-birth-certificate");

    // Verify UI navigated to confirmation or shows success
    await expect(
      page.getByRole("heading", { name: /submission|confirmation|saved/i })
    ).toBeVisible({ timeout: 10_000 });
  });

  test("validates required fields on first step", async ({ page }) => {
    // Try to continue without filling anything
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation errors
    await expect(page.getByText(/required/i).first()).toBeVisible({
      timeout: 3000,
    });
  });

  test("validates ID number format", async ({ page }) => {
    const applicant = generateApplicantData();

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
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);

    // Enter invalid ID number format
    await page.locator('input[name="applicant.idNumber"]').fill("invalid-id");
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show ID format error (use .first() as error appears in summary and field)
    await expect(page.getByText(/valid ID number/i).first()).toBeVisible({
      timeout: 3000,
    });
  });

  test("can use passport instead of ID number", async ({ page }) => {
    const applicant = generateApplicantData();

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
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);

    // Click to expand passport option
    const passportToggle = page.getByText(/use passport number instead/i);
    if (await passportToggle.isVisible()) {
      await passportToggle.click();
      await page
        .locator('input[name="applicant.passportNumber"]')
        .fill("AB1234567");
    }

    await page.getByRole("button", { name: /continue/i }).click();

    // Should proceed to next step
    await expect(
      page.getByRole("heading", {
        name: /are you applying for your own birth certificate/i,
      })
    ).toBeVisible({ timeout: 5000 });
  });

  test("declaration step requires checkbox to be checked", async ({ page }) => {
    const applicant = generateApplicantData();
    const dob = generateDateOfBirth();
    const parents = generateParentNames();
    const numberOfCopies = faker.number.int({ min: 1, max: 5 });

    // Fill out the form up to the declaration step
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

    // Step 2: Applying for yourself
    await page.getByText("Yes - the certificate is for me").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Birth Details
    await page.locator("#birthDetails\\.dateOfBirth-month").fill(dob.month);
    await page.locator("#birthDetails\\.dateOfBirth-day").fill(dob.day);
    await page.locator("#birthDetails\\.dateOfBirth-year").fill(dob.year);
    await page
      .locator('input[name="birthDetails.placeOfBirth"]')
      .fill(faker.location.city());
    await page
      .locator('input[name="birthDetails.placeOfBaptism"]')
      .fill(faker.location.city());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Parents' Names
    await page
      .locator('input[name="parents.father.firstName"]')
      .fill(parents.father.firstName);
    await page
      .locator('input[name="parents.father.lastName"]')
      .fill(parents.father.lastName);
    await page
      .locator('input[name="parents.mother.firstName"]')
      .fill(parents.mother.firstName);
    await page
      .locator('input[name="parents.mother.lastName"]')
      .fill(parents.mother.lastName);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Order Details
    await page
      .locator('input[name="order.numberOfCopies"]')
      .fill(numberOfCopies.toString());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Check Your Answers
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Declaration - verify checkbox is required
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
});
