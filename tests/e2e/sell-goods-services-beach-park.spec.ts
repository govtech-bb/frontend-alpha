import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/business-trade/sell-goods-services-beach-park/form";
const FORM_KEY = "sell-goods-services-beach-park";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  nationality: faker.helpers.arrayElement([
    "barbados",
    "united-kingdom",
    "united-states",
    "canada",
    "jamaica",
    "trinidad-and-tobago",
  ]),
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
  postalCode: `BB${faker.string.numeric(5)}`,
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
});

const generateDateOfBirth = () => ({
  day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: faker.number.int({ min: 1970, max: 2000 }).toString(),
});

const generateRefereeData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  relationship: faker.helpers.arrayElement([
    "Manager",
    "Supervisor",
    "Colleague",
    "Community Leader",
    "Mentor",
  ]),
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
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
  expect(response.data.status).toBe("submitted");

  console.log("✅ Form submitted successfully:");
  console.log(`   - Submission ID: ${response.data.submissionId}`);
  console.log(`   - Status: ${response.data.status}`);
}

test.describe("Sell Goods/Services at Beach or Park Form", () => {
  test("complete form - selling goods", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const professionalReferee = generateRefereeData();
    const personalReferee = generateRefereeData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
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
      .locator("#applicant\\.dateOfBirth-month")
      .fill(dateOfBirth.month);
    await page.locator("#applicant\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#applicant\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page
      .locator('select[name="applicant.nationality"]')
      .selectOption(applicant.nationality);
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);
    await page
      .locator('input[name="applicant.addressLine1"]')
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption(applicant.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Would you like to sell goods or services?
    await page.getByText("Goods").click();
    await page
      .locator('input[name="selling.manufacturingLocation"]')
      .fill("Barbados");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about your goods or services
    await page
      .locator('textarea[name="business.descriptionOfGoodsOrServices"]')
      .fill("Fresh locally-sourced fruit and homemade fruit drinks");
    await page
      .locator('textarea[name="business.intendedPlaceOfDoingBusiness"]')
      .fill("In front of Copacabana Beach Club in Carlisle Bay");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Professional referee
    await page
      .locator('input[name="professionalReferee.firstName"]')
      .fill(professionalReferee.firstName);
    await page
      .locator('input[name="professionalReferee.lastName"]')
      .fill(professionalReferee.lastName);
    await page
      .locator('input[name="professionalReferee.relationship"]')
      .fill(professionalReferee.relationship);
    await page
      .locator('input[name="professionalReferee.email"]')
      .fill(professionalReferee.email);
    await page
      .locator('input[name="professionalReferee.telephoneNumber"]')
      .fill(professionalReferee.telephoneNumber);
    await page
      .locator('input[name="professionalReferee.addressLine1"]')
      .fill(professionalReferee.addressLine1);
    await page
      .locator('select[name="professionalReferee.parish"]')
      .selectOption(professionalReferee.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Personal referee
    await page
      .locator('input[name="personalReferee.firstName"]')
      .fill(personalReferee.firstName);
    await page
      .locator('input[name="personalReferee.lastName"]')
      .fill(personalReferee.lastName);
    await page
      .locator('input[name="personalReferee.relationship"]')
      .fill(personalReferee.relationship);
    await page
      .locator('input[name="personalReferee.email"]')
      .fill(personalReferee.email);
    await page
      .locator('input[name="personalReferee.telephoneNumber"]')
      .fill(personalReferee.telephoneNumber);
    await page
      .locator('input[name="personalReferee.addressLine1"]')
      .fill(personalReferee.addressLine1);
    await page
      .locator('select[name="personalReferee.parish"]')
      .selectOption(personalReferee.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Declaration
    await page.locator('button[role="checkbox"]').click();

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
    verifyApiResponse(responseBody, "sell-goods-services-beach-park");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - selling services", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const professionalReferee = generateRefereeData();
    const personalReferee = generateRefereeData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
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
      .locator("#applicant\\.dateOfBirth-month")
      .fill(dateOfBirth.month);
    await page.locator("#applicant\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#applicant\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page
      .locator('select[name="applicant.nationality"]')
      .selectOption(applicant.nationality);
    await page
      .locator('input[name="applicant.idNumber"]')
      .fill(applicant.idNumber);
    await page.locator('input[name="applicant.email"]').fill(applicant.email);
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill(applicant.telephoneNumber);
    await page
      .locator('input[name="applicant.addressLine1"]')
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption(applicant.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Would you like to sell goods or services?
    await page.getByText("Services").click();
    // No manufacturing location field for services
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about your goods or services
    await page
      .locator('textarea[name="business.descriptionOfGoodsOrServices"]')
      .fill("20-minute jet ski rides and water sports equipment rental");
    await page
      .locator('textarea[name="business.intendedPlaceOfDoingBusiness"]')
      .fill("Pebbles Beach near the water sports area");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Professional referee
    await page
      .locator('input[name="professionalReferee.firstName"]')
      .fill(professionalReferee.firstName);
    await page
      .locator('input[name="professionalReferee.lastName"]')
      .fill(professionalReferee.lastName);
    await page
      .locator('input[name="professionalReferee.relationship"]')
      .fill(professionalReferee.relationship);
    await page
      .locator('input[name="professionalReferee.email"]')
      .fill(professionalReferee.email);
    await page
      .locator('input[name="professionalReferee.telephoneNumber"]')
      .fill(professionalReferee.telephoneNumber);
    await page
      .locator('input[name="professionalReferee.addressLine1"]')
      .fill(professionalReferee.addressLine1);
    await page
      .locator('select[name="professionalReferee.parish"]')
      .selectOption(professionalReferee.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Personal referee
    await page
      .locator('input[name="personalReferee.firstName"]')
      .fill(personalReferee.firstName);
    await page
      .locator('input[name="personalReferee.lastName"]')
      .fill(personalReferee.lastName);
    await page
      .locator('input[name="personalReferee.relationship"]')
      .fill(personalReferee.relationship);
    await page
      .locator('input[name="personalReferee.email"]')
      .fill(personalReferee.email);
    await page
      .locator('input[name="personalReferee.telephoneNumber"]')
      .fill(personalReferee.telephoneNumber);
    await page
      .locator('input[name="personalReferee.addressLine1"]')
      .fill(personalReferee.addressLine1);
    await page
      .locator('select[name="personalReferee.parish"]')
      .selectOption(personalReferee.parish);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Declaration
    await page.locator('button[role="checkbox"]').click();

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
    verifyApiResponse(responseBody, "sell-goods-services-beach-park");

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
    await page.locator('input[name="applicant.firstName"]').fill("John");
    await page.locator('input[name="applicant.lastName"]').fill("Smith");
    await page.locator("#applicant\\.dateOfBirth-month").fill("01");
    await page.locator("#applicant\\.dateOfBirth-day").fill("15");
    await page.locator("#applicant\\.dateOfBirth-year").fill("1990");
    await page
      .locator('select[name="applicant.nationality"]')
      .selectOption("barbados");
    await page.locator('input[name="applicant.idNumber"]').fill("invalid");
    await page
      .locator('input[name="applicant.email"]')
      .fill("john@example.com");
    await page
      .locator('input[name="applicant.telephoneNumber"]')
      .fill("12461234567");
    await page
      .locator('input[name="applicant.addressLine1"]')
      .fill("123 Test Street");
    await page
      .locator('select[name="applicant.parish"]')
      .selectOption("st-michael");

    await page.getByRole("button", { name: /continue/i }).click();

    // Should show pattern validation error
    await expect(page.getByText(/valid id number/i).first()).toBeVisible({
      timeout: 3000,
    });
  });
});
