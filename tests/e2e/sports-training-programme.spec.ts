import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL =
  "/work-employment/register-for-community-sports-training-programme/form";
const FORM_KEY = "register-for-community-sports-training-programme";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  sex: faker.helpers.arrayElement(["male", "female"]),
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
  email: "testing@govtech.bb",
  telephoneNumber: `1246${faker.string.numeric(7)}`,
  addressLine1: faker.location.streetAddress(),
  addressLine2: faker.location.secondaryAddress(),
});

const generateDateOfBirth = () => ({
  day: faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
  month: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0"),
  year: faker.number.int({ min: 1995, max: 2010 }).toString(),
});

const generateEmergencyContact = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  relationship: faker.helpers.arrayElement([
    "Parent",
    "Sibling",
    "Guardian",
    "Spouse",
  ]),
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
  email: "testing@govtech.bb",
  telephoneNumber: `12463${faker.string.numeric(6)}`,
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

test.describe("Community Sports Training Programme Form", () => {
  test("complete form - without prior experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const emergency = generateEmergencyContact();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page.locator("#applicant\\.firstName").fill(applicant.firstName);
    await page.locator("#applicant\\.lastName").fill(applicant.lastName);
    await page
      .locator("#applicant\\.dateOfBirth-month")
      .fill(dateOfBirth.month);
    await page.locator("#applicant\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#applicant\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page.getByText(applicant.sex === "male" ? "Male" : "Female").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Which sport are you interested in?
    await page.locator("#discipline\\.areaOfInterest").fill("Football");
    await page.getByText("No", { exact: true }).click(); // No prior experience
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: What is your employment status? (skipping experience step due to "No")
    await page.getByText("Unemployed").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Do you belong to any organisations?
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Your contact details
    await page.locator("#contact\\.addressLine1").fill(applicant.addressLine1);
    await page
      .locator("#contact\\.parish")
      .selectOption({ value: applicant.parish });
    await page.locator("#contact\\.email").fill(applicant.email);
    await page
      .locator("#contact\\.telephoneNumber")
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Emergency contact
    await page.locator("#emergency\\.firstName").fill(emergency.firstName);
    await page.locator("#emergency\\.lastName").fill(emergency.lastName);
    await page
      .locator("#emergency\\.relationship")
      .fill(emergency.relationship);
    await page
      .locator("#emergency\\.addressLine1")
      .fill(emergency.addressLine1);
    await page
      .locator("#emergency\\.parish")
      .selectOption({ value: emergency.parish });
    await page.locator("#emergency\\.email").fill(emergency.email);
    await page
      .locator("#emergency\\.telephoneNumber")
      .fill(emergency.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
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
    verifyApiResponse(
      responseBody,
      "register-for-community-sports-training-programme"
    );

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - with prior experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const emergency = generateEmergencyContact();

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(API_SUBMIT_PATH) &&
        response.request().method() === "POST"
    );

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page.locator("#applicant\\.firstName").fill(applicant.firstName);
    await page.locator("#applicant\\.lastName").fill(applicant.lastName);
    await page
      .locator("#applicant\\.dateOfBirth-month")
      .fill(dateOfBirth.month);
    await page.locator("#applicant\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#applicant\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page.getByText(applicant.sex === "male" ? "Male" : "Female").click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Which sport are you interested in?
    await page.locator("#discipline\\.areaOfInterest").fill("Basketball");
    await page.getByText("Yes", { exact: true }).click(); // Has prior experience
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about your experience (conditional step)
    await page.getByText("Club").click(); // Level of experience
    await page.locator("#experience\\.yearsOfExperience").fill("3");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: What is your employment status?
    await page.getByText("Studying").click();
    // Conditional field - institution name
    await page
      .locator("#employment\\.institutionName")
      .fill("University of WI");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Do you belong to any organisations?
    await page.getByText("Yes", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Organisation details (conditional step)
    await page
      .locator("#organisationDetails\\.0\\.organisationName")
      .fill("Sports Club Barbados");
    await page.getByText("No", { exact: true }).click(); // No significant position
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Your contact details
    await page.locator("#contact\\.addressLine1").fill(applicant.addressLine1);
    await page
      .locator("#contact\\.parish")
      .selectOption({ value: applicant.parish });
    await page.locator("#contact\\.email").fill(applicant.email);
    await page
      .locator("#contact\\.telephoneNumber")
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Emergency contact
    await page.locator("#emergency\\.firstName").fill(emergency.firstName);
    await page.locator("#emergency\\.lastName").fill(emergency.lastName);
    await page
      .locator("#emergency\\.relationship")
      .fill(emergency.relationship);
    await page
      .locator("#emergency\\.addressLine1")
      .fill(emergency.addressLine1);
    await page
      .locator("#emergency\\.parish")
      .selectOption({ value: emergency.parish });
    await page.locator("#emergency\\.email").fill(emergency.email);
    await page
      .locator("#emergency\\.telephoneNumber")
      .fill(emergency.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Declaration
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
    verifyApiResponse(
      responseBody,
      "register-for-community-sports-training-programme"
    );

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
    await expect(
      page.getByText(/first name is required/i).first()
    ).toBeVisible();
    await expect(
      page.getByText(/last name is required/i).first()
    ).toBeVisible();
    await expect(page.getByText(/sex is required/i).first()).toBeVisible();
  });
});
