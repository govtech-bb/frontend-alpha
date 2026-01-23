import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/work-employment/apply-to-jobstart-plus-programme/form";
const FORM_KEY = "apply-to-jobstart-plus-programme";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  sex: faker.helpers.arrayElement(["male", "female"]),
  maritalStatus: faker.helpers.arrayElement(["single", "married", "divorced"]),
  idNumber: faker.string.alphanumeric(10),
  nisNumber: faker.string.numeric(8),
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
  year: faker.number.int({ min: 1990, max: 2005 }).toString(),
});

const generateEmergencyContact = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  relationship: faker.helpers.arrayElement([
    "mother",
    "father",
    "aunt",
    "uncle",
    "grandmother",
    "grandfather",
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
  telephoneNumber: `1246${faker.string.numeric(7)}`,
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

test.describe("JobSTART Plus Programme Application Form", () => {
  test("complete form - no previous job, over 18", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const emergency = generateEmergencyContact();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .locator("#applicant\\.title")
      .selectOption({ value: applicant.title });
    await page.locator("#applicant\\.firstName").fill(applicant.firstName);
    await page.locator("#applicant\\.lastName").fill(applicant.lastName);
    await page
      .locator("#applicant\\.dateOfBirth-month")
      .fill(dateOfBirth.month);
    await page.locator("#applicant\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#applicant\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page.getByText(applicant.sex === "male" ? "Male" : "Female").click();
    await page
      .locator("#applicant\\.maritalStatus")
      .selectOption({ value: applicant.maritalStatus });
    await page.locator("#applicant\\.idNumber").fill(applicant.idNumber);
    await page.getByLabel(/NIS/).getByText("Yes").click(); // Has NIS
    await page.locator("#applicant\\.nisNumber").fill(applicant.nisNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Do you have a disability?
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Your contact details
    await page
      .locator("#contactDetails\\.addressLine1")
      .fill(applicant.addressLine1);
    await page
      .locator("#contactDetails\\.parish")
      .selectOption({ value: applicant.parish });
    await page.locator("#contactDetails\\.email").fill(applicant.email);
    await page
      .locator("#contactDetails\\.telephoneNumber")
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Emergency contact details
    await page
      .locator("#emergency\\.title")
      .selectOption({ value: emergency.title });
    await page.locator("#emergency\\.firstName").fill(emergency.firstName);
    await page.locator("#emergency\\.lastName").fill(emergency.lastName);
    await page
      .locator("#emergency\\.relationship")
      .selectOption({ value: emergency.relationship });
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

    // Step 5: Primary education
    await page
      .locator("#primaryEducation\\.schoolName")
      .fill("St. Michael Primary School");
    await page.locator("#primaryEducation\\.startYear").fill("2000");
    await page.locator("#primaryEducation\\.endYear").fill("2007");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Secondary education
    await page
      .locator("#secondaryEducation\\.schoolName")
      .fill("Harrison College");
    await page.locator("#secondaryEducation\\.startYear").fill("2007");
    await page.locator("#secondaryEducation\\.endYear").fill("2012");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Post-secondary education (optional)
    await page
      .getByLabel(/add another training/i)
      .getByText("No")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Have you had a paid job?
    await page.getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Tell us about your areas of interests (skips job history)
    await page
      .locator("#eligibility\\.interests")
      .fill("Interested in IT support and customer service roles");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Are you 18 and over?
    await page.getByText("Yes", { exact: true }).click();
    await page
      .getByLabel(/willing to work at night/i)
      .getByText("Yes")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 11: Tell us about your short-term goals
    await page
      .locator("#eligibility\\.shortTermGoals")
      .fill(
        "I want to gain practical work experience and develop my skills in a professional environment"
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 12: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 13: Declaration
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
    verifyApiResponse(responseBody, "apply-to-jobstart-plus-programme");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /application has been submitted/i })
    ).toBeVisible();
  });

  test("complete form - with previous job and disability", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const emergency = generateEmergencyContact();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .locator("#applicant\\.title")
      .selectOption({ value: applicant.title });
    await page.locator("#applicant\\.firstName").fill(applicant.firstName);
    await page.locator("#applicant\\.lastName").fill(applicant.lastName);
    await page
      .locator("#applicant\\.dateOfBirth-month")
      .fill(dateOfBirth.month);
    await page.locator("#applicant\\.dateOfBirth-day").fill(dateOfBirth.day);
    await page.locator("#applicant\\.dateOfBirth-year").fill(dateOfBirth.year);
    await page.getByText(applicant.sex === "male" ? "Male" : "Female").click();
    await page
      .locator("#applicant\\.maritalStatus")
      .selectOption({ value: applicant.maritalStatus });
    await page.locator("#applicant\\.idNumber").fill(applicant.idNumber);
    await page.getByLabel(/NIS/).getByText("No").click(); // No NIS
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Do you have a disability?
    await page.getByText("Yes", { exact: true }).click();
    await page
      .locator("#applicant\\.disabilityDetails")
      .fill("Mild hearing impairment - I use hearing aids");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Your contact details
    await page
      .locator("#contactDetails\\.addressLine1")
      .fill(applicant.addressLine1);
    await page
      .locator("#contactDetails\\.parish")
      .selectOption({ value: applicant.parish });
    await page.locator("#contactDetails\\.email").fill(applicant.email);
    await page
      .locator("#contactDetails\\.telephoneNumber")
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Emergency contact details
    await page
      .locator("#emergency\\.title")
      .selectOption({ value: emergency.title });
    await page.locator("#emergency\\.firstName").fill(emergency.firstName);
    await page.locator("#emergency\\.lastName").fill(emergency.lastName);
    await page
      .locator("#emergency\\.relationship")
      .selectOption({ value: emergency.relationship });
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

    // Step 5: Primary education
    await page
      .locator("#primaryEducation\\.schoolName")
      .fill("St. Michael Primary School");
    await page.locator("#primaryEducation\\.startYear").fill("2000");
    await page.locator("#primaryEducation\\.endYear").fill("2007");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Secondary education
    await page
      .locator("#secondaryEducation\\.schoolName")
      .fill("Harrison College");
    await page.locator("#secondaryEducation\\.startYear").fill("2007");
    await page.locator("#secondaryEducation\\.endYear").fill("2012");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Post-secondary education
    await page
      .getByLabel(/add another training/i)
      .getByText("No")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Have you had a paid job?
    await page.getByText("Yes", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Tell us about your previous job
    await page
      .locator("#employmentHistory\\.0\\.employerName")
      .fill("ABC Company");
    await page
      .locator("#employmentHistory\\.0\\.occupation")
      .fill("Shop Assistant");
    await page.locator("#employmentHistory\\.0\\.startDate").fill("01, 2020");
    await page.locator("#employmentHistory\\.0\\.endDate").fill("06, 2021");
    await page
      .locator("#employmentHistory\\.0\\.mainTasks")
      .fill("Customer service, stock management, and cash handling");
    await page
      .getByLabel(/add another job/i)
      .getByText("No")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Tell us about your areas of interests
    await page
      .locator("#eligibility\\.interests")
      .fill("Interested in retail management and hospitality");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 11: Are you 18 and over?
    await page.getByText("Yes", { exact: true }).click();
    await page
      .getByLabel(/willing to work at night/i)
      .getByText("No")
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 12: Tell us about your short-term goals
    await page
      .locator("#eligibility\\.shortTermGoals")
      .fill(
        "I want to advance to a supervisory role and develop my leadership skills"
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 13: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 14: Declaration
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
    verifyApiResponse(responseBody, "apply-to-jobstart-plus-programme");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /application has been submitted/i })
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
});
