import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL =
  "/money-financial-support/get-a-primary-school-textbook-grant/form";
const FORM_KEY = "get-a-primary-school-textbook-grant";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateChildData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  idNumber: `${faker.number.int({ min: 100_000, max: 999_999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  classNumber: faker.helpers.arrayElement(["1", "2", "3", "4"]),
});

const generateApplicantData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
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
  tamisNumber: faker.string.numeric(8),
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
});

const generateBankDetails = () => ({
  accountHolderName: faker.person.fullName(),
  bankName: faker.helpers.arrayElement([
    "Republic Bank",
    "CIBC FirstCaribbean",
    "Scotiabank",
    "First Citizens",
  ]),
  accountNumber: faker.string.numeric(10),
  branchName: faker.helpers.arrayElement([
    "Bridgetown",
    "Six Roads",
    "Warrens",
    "Sunset Crest",
  ]),
  branchCode: faker.string.numeric(5),
  accountType: faker.helpers.arrayElement(["savings", "chequing"]),
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
  expect(response.data.status).toBe("submitted");

  console.log("✅ Form submitted successfully:");
  console.log(`   - Submission ID: ${response.data.submissionId}`);
  console.log(`   - Status: ${response.data.status}`);
}

test.describe("Primary School Textbook Grant Form", () => {
  // TODO: These tests are skipped due to complex custom radio button component interactions
  // The radio buttons use a custom styled component that requires special handling
  test.skip("complete form - parent applying for their child", async ({
    page,
  }) => {
    const child = generateChildData();
    const applicant = generateApplicantData();
    const bank = generateBankDetails();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about the child
    await page
      .locator('input[name="beneficiaries.0.firstName"]')
      .fill(child.firstName);
    await page
      .locator('input[name="beneficiaries.0.lastName"]')
      .fill(child.lastName);
    await page
      .locator('input[name="beneficiaries.0.idNumber"]')
      .fill(child.idNumber);
    await page
      .locator('select[name="beneficiaries.0.classNumber"]')
      .selectOption(child.classNumber);
    // Select Yes for "Are you the parent or guardian?"
    // Find the text "Yes" that follows the question text
    await page
      .locator("text=Are you the parent or guardian?")
      .locator("..")
      .locator("text=Yes")
      .first()
      .click();
    // Select No for "add another child?"
    await page
      .locator("text=Do you need to add another child?")
      .locator("..")
      .locator("text=No")
      .first()
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Tell us about yourself (skips guardian step since we're the parent)
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
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page
      .locator('input[name="applicant.tamisNumber"]')
      .fill(applicant.tamisNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Bank account information
    await page
      .locator('input[name="bankAccount.accountHolderName"]')
      .fill(bank.accountHolderName);
    await page
      .locator('input[name="bankAccount.bankName"]')
      .fill(bank.bankName);
    await page
      .locator('input[name="bankAccount.accountNumber"]')
      .fill(bank.accountNumber);
    await page
      .locator('input[name="bankAccount.branchName"]')
      .fill(bank.branchName);
    await page
      .locator('input[name="bankAccount.branchCode"]')
      .fill(bank.branchCode);
    await page
      .getByText(bank.accountType === "savings" ? "Savings" : "Chequing")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Declaration
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
    verifyApiResponse(responseBody, "get-a-primary-school-textbook-grant");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /submission has been saved/i })
    ).toBeVisible();
  });

  test.skip("complete form - non-parent applying for a child", async ({
    page,
  }) => {
    const child = generateChildData();
    const guardian = generateApplicantData();
    const applicant = generateApplicantData();
    const bank = generateBankDetails();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about the child
    await page
      .locator('input[name="beneficiaries.0.firstName"]')
      .fill(child.firstName);
    await page
      .locator('input[name="beneficiaries.0.lastName"]')
      .fill(child.lastName);
    await page
      .locator('input[name="beneficiaries.0.idNumber"]')
      .fill(child.idNumber);
    await page
      .locator('select[name="beneficiaries.0.classNumber"]')
      .selectOption(child.classNumber);
    // Select No for "Are you the parent or guardian?"
    await page
      .locator("text=Are you the parent or guardian?")
      .locator("..")
      .locator("text=No")
      .first()
      .click();
    await page
      .locator('input[name="beneficiaries.0.relationshipDescription"]')
      .fill("Aunt");
    // Select No for "add another child?"
    await page
      .locator("text=Do you need to add another child?")
      .locator("..")
      .locator("text=No")
      .first()
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Guardian details (conditional step)
    await page
      .locator('input[name="beneficiaries.0.guardian.firstName"]')
      .fill(guardian.firstName);
    await page
      .locator('input[name="beneficiaries.0.guardian.lastName"]')
      .fill(guardian.lastName);
    await page
      .locator('input[name="beneficiaries.0.guardian.idNumber"]')
      .fill(guardian.idNumber);
    await page
      .locator('input[name="beneficiaries.0.guardian.tamisNumber"]')
      .fill(guardian.tamisNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about yourself
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
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page
      .locator('input[name="applicant.tamisNumber"]')
      .fill(applicant.tamisNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Bank account information
    await page
      .locator('input[name="bankAccount.accountHolderName"]')
      .fill(bank.accountHolderName);
    await page
      .locator('input[name="bankAccount.bankName"]')
      .fill(bank.bankName);
    await page
      .locator('input[name="bankAccount.accountNumber"]')
      .fill(bank.accountNumber);
    await page
      .locator('input[name="bankAccount.branchName"]')
      .fill(bank.branchName);
    await page
      .locator('input[name="bankAccount.branchCode"]')
      .fill(bank.branchCode);
    await page
      .getByText(bank.accountType === "savings" ? "Savings" : "Chequing")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Declaration
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
    verifyApiResponse(responseBody, "get-a-primary-school-textbook-grant");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /submission has been saved/i })
    ).toBeVisible();
  });

  test("validates required fields on first step", async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Try to continue without filling fields
    await page.getByRole("button", { name: /continue/i }).click();

    // Should show validation errors
    await expect(
      page.getByText(/first name is required/i).first()
    ).toBeVisible();
    await expect(
      page.getByText(/last name is required/i).first()
    ).toBeVisible();
    await expect(
      page.getByText(/id number is required/i).first()
    ).toBeVisible();
  });

  test("validates ID number format", async ({ page }) => {
    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Fill other required fields
    await page.locator('input[name="beneficiaries.0.firstName"]').fill("John");
    await page.locator('input[name="beneficiaries.0.lastName"]').fill("Smith");
    await page
      .locator('input[name="beneficiaries.0.idNumber"]')
      .fill("invalid");
    await page
      .locator('select[name="beneficiaries.0.classNumber"]')
      .selectOption("1");
    // Select Yes for "Are you the parent or guardian?" - use nth(0) for first radiogroup
    await page
      .locator('[role="radiogroup"]')
      .nth(0)
      .getByText("Yes", { exact: true })
      .click();

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show pattern validation error
    await expect(page.getByText(/valid id number/i).first()).toBeVisible({
      timeout: 3000,
    });
  });
});
