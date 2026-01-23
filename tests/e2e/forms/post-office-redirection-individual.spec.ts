import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL =
  "/travel-id-citizenship/post-office-redirection-individual/form";
const FORM_KEY = "post-office-redirection-individual";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
});

const generateDateOfBirth = () => ({
  day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: faker.number.int({ min: 1960, max: 2000 }).toString(),
});

const generateAddress = () => ({
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
});

const generateFutureDate = () => {
  const futureDate = faker.date.future({ years: 1 });
  return {
    day: futureDate.getDate().toString().padStart(2, "0"),
    month: (futureDate.getMonth() + 1).toString().padStart(2, "0"),
    year: futureDate.getFullYear().toString(),
  };
};

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
  // Status can be "success" or "payment_required" for forms that need payment
  expect(["success", "payment_required"]).toContain(response.data.status);

  console.log("✅ Form submitted successfully:");
  console.log(`   - Submission ID: ${response.data.submissionId}`);
  console.log(`   - Status: ${response.data.status}`);
}

test.describe("Post Office Mail Redirection (Individual) Form", () => {
  test("complete form - permanent move, no dependents", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const oldAddress = generateAddress();
    const newAddress = generateAddress();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    // Date of Birth - Day, Month, Year order
    await page.getByRole("textbox", { name: "Day" }).fill(dateOfBirth.day);
    await page.getByRole("textbox", { name: "Month" }).fill(dateOfBirth.month);
    await page.getByRole("textbox", { name: "Year" }).fill(dateOfBirth.year);
    await page
      .getByRole("textbox", { name: /national identification/i })
      .fill(applicant.idNumber);
    await page
      .getByRole("textbox", { name: /email address/i })
      .fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone number/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Old address
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(oldAddress.addressLine1);
    await page
      .locator('select[name="oldAddress.parish"]')
      .selectOption(oldAddress.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: New address
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(newAddress.addressLine1);
    await page
      .locator('select[name="newAddress.parish"]')
      .selectOption(newAddress.parish);
    await page.getByText("Yes", { exact: true }).click(); // Moving permanently
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Minor dependents
    await page.getByText("No", { exact: true }).click(); // No dependents
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Declaration
    // Since applicant data was provided (firstName + lastName only), verify static display
    const expectedFullName = `${applicant.firstName} ${applicant.lastName}`;
    const today = new Date();
    const expectedDate = formatDate(today);

    // Verify applicant's name is displayed (static text, not input fields)
    await expect(page.getByText(`Applicant's name:`)).toBeVisible();
    await expect(page.getByText(expectedFullName)).toBeVisible();

    // Verify today's date is displayed (static text, auto-filled)
    await expect(page.getByText("Date:")).toBeVisible();
    await expect(page.getByText(expectedDate)).toBeVisible();

    // Check declaration checkbox
    const checkbox = page.locator('button[role="checkbox"]');
    await expect(checkbox).toBeVisible();
    await checkbox.click();

    // Set up API response interception before submitting
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(API_SUBMIT_PATH) &&
        response.request().method() === "POST"
    );
    await page.getByRole("button", { name: /submit/i }).click();

    // Verify API response
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    // Log the submitted form data
    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, "post-office-redirection-individual");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - temporary move with dependents", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const oldAddress = generateAddress();
    const newAddress = generateAddress();
    const startDate = generateFutureDate();
    const endDate = generateFutureDate();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    // Date of Birth - Day, Month, Year order
    await page.getByRole("textbox", { name: "Day" }).fill(dateOfBirth.day);
    await page.getByRole("textbox", { name: "Month" }).fill(dateOfBirth.month);
    await page.getByRole("textbox", { name: "Year" }).fill(dateOfBirth.year);
    await page
      .getByRole("textbox", { name: /national identification/i })
      .fill(applicant.idNumber);
    await page
      .getByRole("textbox", { name: /email address/i })
      .fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone number/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Old address
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(oldAddress.addressLine1);
    await page
      .locator('select[name="oldAddress.parish"]')
      .selectOption(oldAddress.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: New address with temporary redirection
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(newAddress.addressLine1);
    await page
      .locator('select[name="newAddress.parish"]')
      .selectOption(newAddress.parish);
    await page.getByText("No", { exact: true }).click(); // Not moving permanently
    // Fill start date (Day, Month, Year) - use specific input IDs
    await page
      .locator("#newAddress\\.redirectionStartDate-day")
      .fill(startDate.day);
    await page
      .locator("#newAddress\\.redirectionStartDate-month")
      .fill(startDate.month);
    await page
      .locator("#newAddress\\.redirectionStartDate-year")
      .fill(startDate.year);
    // Fill end date (Day, Month, Year) - use specific input IDs
    await page
      .locator("#newAddress\\.redirectionEndDate-day")
      .fill(endDate.day);
    await page
      .locator("#newAddress\\.redirectionEndDate-month")
      .fill(endDate.month);
    await page
      .locator("#newAddress\\.redirectionEndDate-year")
      .fill(endDate.year);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Minor dependents
    await page.getByText("Yes", { exact: true }).click(); // Has dependents
    await page.getByRole("spinbutton", { name: /how many minor/i }).fill("2");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Minor details (first child)
    await page.getByRole("textbox", { name: /first name/i }).fill("John");
    await page.getByRole("textbox", { name: /last name/i }).fill("Smith");
    // Select "Yes" for adding another minor dependent
    await page
      .getByRole("radiogroup")
      .filter({ hasText: /add another minor/i })
      .getByRole("radio", { name: "Yes" })
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Minor details (second child)
    await page.getByRole("textbox", { name: /first name/i }).fill("Jane");
    await page.getByRole("textbox", { name: /last name/i }).fill("Smith");
    // Select "No" for adding another minor dependent
    await page
      .getByRole("radiogroup")
      .filter({ hasText: /add another minor/i })
      .getByRole("radio", { name: "No" })
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    // Since applicant data was provided (firstName + lastName only), verify static display
    const expectedFullName2 = `${applicant.firstName} ${applicant.lastName}`;
    const today2 = new Date();
    const expectedDate2 = formatDate(today2);

    // Verify applicant's name is displayed (static text, not input fields)
    await expect(page.getByText(`Applicant's name:`)).toBeVisible();
    await expect(page.getByText(expectedFullName2)).toBeVisible();

    // Verify today's date is displayed (static text, auto-filled)
    await expect(page.getByText("Date:")).toBeVisible();
    await expect(page.getByText(expectedDate2)).toBeVisible();

    // Check declaration checkbox
    const checkbox2 = page.locator('button[role="checkbox"]');
    await expect(checkbox2).toBeVisible();
    await checkbox2.click();

    // Set up API response interception before submitting
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(API_SUBMIT_PATH) &&
        response.request().method() === "POST"
    );
    await page.getByRole("button", { name: /submit/i }).click();

    // Verify API response
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    // Log the submitted form data
    logSubmittedData(response.request());

    const responseBody = (await response.json()) as ApiResponse;
    verifyApiResponse(responseBody, "post-office-redirection-individual");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("validates required fields on first step", async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Try to continue without filling fields
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation errors
    await expect(page.getByText(/title is required/i).first()).toBeVisible();
    await expect(
      page.getByText(/first name is required/i).first()
    ).toBeVisible();
    await expect(
      page.getByText(/last name is required/i).first()
    ).toBeVisible();
  });

  test("validates ID number format", async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Fill other required fields
    await page.locator('select[name="applicant.title"]').selectOption("mr");
    await page.getByRole("textbox", { name: /first name/i }).fill("John");
    await page.getByRole("textbox", { name: /last name/i }).fill("Smith");
    await page.getByRole("textbox", { name: "Day" }).fill("15");
    await page.getByRole("textbox", { name: "Month" }).fill("01");
    await page.getByRole("textbox", { name: "Year" }).fill("1990");
    await page
      .getByRole("textbox", { name: /national identification/i })
      .fill("invalid");
    await page
      .getByRole("textbox", { name: /email address/i })
      .fill("john@example.com");
    await page
      .getByRole("textbox", { name: /telephone number/i })
      .fill("12461234567");

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show pattern validation error
    await expect(page.getByText(/valid id number/i).first()).toBeVisible({
      timeout: 3000,
    });
  });
});
