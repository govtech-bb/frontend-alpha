import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/travel-id-citizenship/post-office-redirection-business/form";
const FORM_KEY = "post-office-redirection-business";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
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
  postcode: `BB${faker.string.numeric(5)}`,
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
  // Fail fast if API returns an error
  expect(response.success, `API returned error: ${response.message}`).toBe(
    true
  );
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

test.describe("Post Office Redirection (Business) Form", () => {
  test("complete form - permanent move", async ({ page }) => {
    const applicant = generateApplicantData();
    const currentAddress = generateAddress();
    const newAddress = generateAddress();
    const businessName = faker.company.name();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about the person submitting this application
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Tell us about the business
    await page
      .getByRole("textbox", { name: /business name/i })
      .fill(businessName);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Current address of the business
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(currentAddress.addressLine1);
    await page
      .locator('select[name="currentAddress.parish"]')
      .selectOption(currentAddress.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Permission details
    await page
      .locator('input[name="permissionDetails"]')
      .fill("I am the director of this company");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: New address
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(newAddress.addressLine1);
    await page
      .locator('select[name="newAddress.parish"]')
      .selectOption(newAddress.parish);
    await page.getByText("Yes", { exact: true }).click(); // Moving permanently
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Upload document - set files and wait for upload to complete
    const uploadPromise1 = page.waitForResponse(
      (response) =>
        response.url().includes("/file/upload") &&
        response.request().method() === "POST"
    );
    await page
      .locator('input[type="file"]')
      .setInputFiles("public/NEW_Mentor_Application_-_2024_2025.pdf");
    await uploadPromise1; // Wait for file upload to complete
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    // Since applicant data was provided (firstName + lastName only), verify static display
    const expectedFullName = `${applicant.firstName} ${applicant.lastName}`;
    const today1 = new Date();
    const expectedDate = formatDate(today1);

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
    verifyApiResponse(responseBody, "post-office-redirection-business");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /application submitted/i })
    ).toBeVisible();
  });

  test("complete form - temporary move", async ({ page }) => {
    const applicant = generateApplicantData();
    const currentAddress = generateAddress();
    const newAddress = generateAddress();
    const businessName = faker.company.name();
    const startDate = generateFutureDate();
    const endDate = generateFutureDate();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about the person submitting this application
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Tell us about the business
    await page
      .getByRole("textbox", { name: /business name/i })
      .fill(businessName);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Current address of the business
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(currentAddress.addressLine1);
    await page
      .locator('select[name="currentAddress.parish"]')
      .selectOption(currentAddress.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Permission details
    await page
      .locator('input[name="permissionDetails"]')
      .fill("I am the manager authorised to act on behalf of the business");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: New address with temporary redirection
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(newAddress.addressLine1);
    await page
      .locator('select[name="newAddress.parish"]')
      .selectOption(newAddress.parish);
    await page.getByText("No", { exact: true }).click(); // Not permanent
    // Fill start date (Day, Month, Year)
    await page
      .locator("#newAddress\\.redirectionStartDate-day")
      .fill(startDate.day);
    await page
      .locator("#newAddress\\.redirectionStartDate-month")
      .fill(startDate.month);
    await page
      .locator("#newAddress\\.redirectionStartDate-year")
      .fill(startDate.year);
    // Fill end date (Day, Month, Year)
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

    // Step 6: Upload document - set files and wait for upload to complete
    const uploadPromise2 = page.waitForResponse(
      (response) =>
        response.url().includes("/file/upload") &&
        response.request().method() === "POST"
    );
    await page
      .locator('input[type="file"]')
      .setInputFiles("public/NEW_Mentor_Application_-_2024_2025.pdf");
    await uploadPromise2; // Wait for file upload to complete
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
    verifyApiResponse(responseBody, "post-office-redirection-business");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /application submitted/i })
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

  test("validates business name minimum length", async ({ page }) => {
    const applicant = generateApplicantData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Fill step 1
    await page
      .locator('select[name="applicant.title"]')
      .selectOption(applicant.title);
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Fill too short business name
    await page.getByRole("textbox", { name: /business name/i }).fill("AB");
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation error
    await expect(page.getByText(/at least 5 characters/i).first()).toBeVisible({
      timeout: 3000,
    });
  });
});
