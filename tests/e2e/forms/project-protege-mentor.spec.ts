import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/work-employment/apply-to-be-a-project-protege-mentor/form";
const FORM_KEY = "apply-to-be-a-project-protege-mentor";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
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
    "Teacher",
    "Lecturer",
  ]),
  email: "testing@govtech.bb",
  phone: `1246${faker.string.numeric(7)}`,
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

test.describe("Project Protégé Mentor Application Form", () => {
  test("complete form - without mentor experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const professionalReferee = generateRefereeData();
    const personalReferee = generateRefereeData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page.locator("#personal\\.firstName").fill(applicant.firstName);
    await page.locator("#personal\\.lastName").fill(applicant.lastName);
    await page.locator("#personal\\.dateOfBirth-month").fill(dateOfBirth.month);
    await page.locator("#personal\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#personal\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page.getByText("Employed").click();
    await page.locator("#personal\\.employerName").fill("Tech Solutions Ltd");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
    await page.locator("#contact\\.addressLine1").fill(applicant.addressLine1);
    await page
      .locator("#contact\\.parish")
      .selectOption({ value: applicant.parish });
    await page.locator("#contact\\.email").fill(applicant.email);
    await page
      .locator("#contact\\.telephoneNumber")
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us why you would be a good mentor
    await page
      .locator("#mentorship\\.whyMentor")
      .fill(
        "I want to give back to the community and help young people succeed"
      );
    await page
      .locator("#mentorship\\.strengths")
      .fill("Leadership, patience, and good communication skills");
    await page
      .locator("#mentorship\\.menteeLearn")
      .fill(
        "They could learn how to navigate career challenges and stay motivated"
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Your preferences
    await page.getByText("No preference", { exact: true }).click(); // Gender preference
    await page
      .getByLabel(/share your personal number/)
      .getByText("No")
      .click(); // Share phone number
    await page
      .getByLabel(/someone in mind/)
      .getByText("No")
      .click(); // Has mentee in mind
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Your experience
    await page.getByText("No", { exact: true }).click(); // No mentor experience
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Professional referee
    await page
      .locator("#professionalReferee\\.firstName")
      .fill(professionalReferee.firstName);
    await page
      .locator("#professionalReferee\\.lastName")
      .fill(professionalReferee.lastName);
    await page
      .locator("#professionalReferee\\.relationship")
      .fill(professionalReferee.relationship);
    await page
      .locator("#professionalReferee\\.email")
      .fill(professionalReferee.email);
    await page
      .locator("#professionalReferee\\.phone")
      .fill(professionalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Personal referee
    await page
      .locator("#personalReferee\\.firstName")
      .fill(personalReferee.firstName);
    await page
      .locator("#personalReferee\\.lastName")
      .fill(personalReferee.lastName);
    await page
      .locator("#personalReferee\\.relationship")
      .fill(personalReferee.relationship);
    await page.locator("#personalReferee\\.email").fill(personalReferee.email);
    await page.locator("#personalReferee\\.phone").fill(personalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Declaration
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
    verifyApiResponse(responseBody, "apply-to-be-a-project-protege-mentor");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - with mentor experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const professionalReferee = generateRefereeData();
    const personalReferee = generateRefereeData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page.locator("#personal\\.firstName").fill(applicant.firstName);
    await page.locator("#personal\\.lastName").fill(applicant.lastName);
    await page.locator("#personal\\.dateOfBirth-month").fill(dateOfBirth.month);
    await page.locator("#personal\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#personal\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page.getByText("Studying").click();
    await page
      .locator("#personal\\.institutionName")
      .fill("University of the West Indies");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
    await page.locator("#contact\\.addressLine1").fill(applicant.addressLine1);
    await page
      .locator("#contact\\.parish")
      .selectOption({ value: applicant.parish });
    await page.locator("#contact\\.email").fill(applicant.email);
    await page
      .locator("#contact\\.telephoneNumber")
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us why you would be a good mentor
    await page
      .locator("#mentorship\\.whyMentor")
      .fill(
        "I want to give back to the community and help young people succeed"
      );
    await page
      .locator("#mentorship\\.strengths")
      .fill("Leadership, patience, and good communication skills");
    await page
      .locator("#mentorship\\.menteeLearn")
      .fill(
        "They could learn how to navigate career challenges and stay motivated"
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Your preferences
    await page.getByText("Male", { exact: true }).click(); // Gender preference
    await page
      .getByLabel(/share your personal number/)
      .getByText("Yes")
      .click(); // Share phone number
    await page
      .locator("#preferences\\.menteePhoneNumber")
      .fill(`1246${faker.string.numeric(7)}`);
    await page
      .getByLabel(/someone in mind/)
      .getByText("Yes")
      .click(); // Has mentee in mind
    await page
      .locator("#preferences\\.menteeInMindName")
      .fill(faker.person.fullName());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Your experience
    await page.getByText("Yes", { exact: true }).click(); // Has mentor experience
    await page.locator("#experience\\.yearsOfExperience").fill("2");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Professional referee
    await page
      .locator("#professionalReferee\\.firstName")
      .fill(professionalReferee.firstName);
    await page
      .locator("#professionalReferee\\.lastName")
      .fill(professionalReferee.lastName);
    await page
      .locator("#professionalReferee\\.relationship")
      .fill(professionalReferee.relationship);
    await page
      .locator("#professionalReferee\\.email")
      .fill(professionalReferee.email);
    await page
      .locator("#professionalReferee\\.phone")
      .fill(professionalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Personal referee
    await page
      .locator("#personalReferee\\.firstName")
      .fill(personalReferee.firstName);
    await page
      .locator("#personalReferee\\.lastName")
      .fill(personalReferee.lastName);
    await page
      .locator("#personalReferee\\.relationship")
      .fill(personalReferee.relationship);
    await page.locator("#personalReferee\\.email").fill(personalReferee.email);
    await page.locator("#personalReferee\\.phone").fill(personalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Declaration
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
    verifyApiResponse(responseBody, "apply-to-be-a-project-protege-mentor");

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
  });
});
