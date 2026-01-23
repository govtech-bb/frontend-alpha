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

test.describe("Community Sports Training Programme Form", () => {
  test("complete form - without prior experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const emergency = generateEmergencyContact();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    const dobContainer = page.locator('[id="applicant.dateOfBirth"]');
    await dobContainer
      .getByRole("textbox", { name: "Day" })
      .fill(dateOfBirth.day);
    await dobContainer
      .getByRole("textbox", { name: "Month" })
      .fill(dateOfBirth.month);
    await dobContainer
      .getByRole("textbox", { name: "Year" })
      .fill(dateOfBirth.year);
    await page
      .getByText(applicant.sex === "male" ? "Male" : "Female", { exact: true })
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Which sport are you interested in?
    await page
      .locator('[id="discipline.areaOfInterest"] input')
      .fill("Football");
    await page.getByRole("radio", { name: "No" }).click(); // No prior experience
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: What is your employment status? (skipping experience step due to "No")
    await page.getByText("Unemployed", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Do you belong to any organisations?
    await page.getByRole("radio", { name: "No" }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Your contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contact.parish"]')
      .selectOption({ value: applicant.parish });
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Emergency contact
    await page
      .locator('[id="emergency.firstName"] input')
      .fill(emergency.firstName);
    await page
      .locator('[id="emergency.lastName"] input')
      .fill(emergency.lastName);
    await page
      .locator('[id="emergency.relationship"] input')
      .fill(emergency.relationship);
    await page
      .locator('[id="emergency.addressLine1"] input')
      .fill(emergency.addressLine1);
    await page
      .locator('select[name="emergency.parish"]')
      .selectOption({ value: emergency.parish });
    await page.locator('[id="emergency.email"] input').fill(emergency.email);
    await page
      .locator('[id="emergency.telephoneNumber"] input')
      .fill(emergency.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible();

    // Check declaration checkbox
    const checkbox = page.locator('button[role="checkbox"]');
    await expect(checkbox).toBeVisible();
    await checkbox.click();

    // Submit the form
    await page.getByRole("button", { name: /submit/i }).click();

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - with prior experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const emergency = generateEmergencyContact();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    const dobContainer2 = page.locator('[id="applicant.dateOfBirth"]');
    await dobContainer2
      .getByRole("textbox", { name: "Day" })
      .fill(dateOfBirth.day);
    await dobContainer2
      .getByRole("textbox", { name: "Month" })
      .fill(dateOfBirth.month);
    await dobContainer2
      .getByRole("textbox", { name: "Year" })
      .fill(dateOfBirth.year);
    await page
      .getByText(applicant.sex === "male" ? "Male" : "Female", { exact: true })
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Which sport are you interested in?
    await page
      .locator('[id="discipline.areaOfInterest"] input')
      .fill("Basketball");
    await page
      .getByRole("radiogroup")
      .filter({ hasText: /experience/i })
      .getByText("Yes", { exact: true })
      .click(); // Has prior experience
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about your experience (conditional step)
    await page.getByText("Club", { exact: true }).click(); // Level of experience
    await page.getByRole("spinbutton", { name: /years/i }).fill("3");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: What is your employment status?
    await page.getByText("Studying", { exact: true }).click();
    // Conditional field - institution name
    await page
      .getByRole("textbox", { name: /institution/i })
      .fill("University of WI");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Do you belong to any organisations?
    await page.getByRole("radio", { name: "Yes" }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Organisation details (conditional step)
    await page
      .getByRole("textbox", { name: /name of the organisation/i })
      .fill("Sports Club Barbados");
    await page.getByRole("radio", { name: "No" }).click(); // No significant position
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Your contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contact.parish"]')
      .selectOption({ value: applicant.parish });
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Emergency contact
    await page
      .locator('[id="emergency.firstName"] input')
      .fill(emergency.firstName);
    await page
      .locator('[id="emergency.lastName"] input')
      .fill(emergency.lastName);
    await page
      .locator('[id="emergency.relationship"] input')
      .fill(emergency.relationship);
    await page
      .locator('[id="emergency.addressLine1"] input')
      .fill(emergency.addressLine1);
    await page
      .locator('select[name="emergency.parish"]')
      .selectOption({ value: emergency.parish });
    await page.locator('[id="emergency.email"] input').fill(emergency.email);
    await page
      .locator('[id="emergency.telephoneNumber"] input')
      .fill(emergency.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Declaration
    await expect(
      page.getByRole("heading", { name: /declaration/i })
    ).toBeVisible();

    // Check declaration checkbox
    const checkbox2 = page.locator('button[role="checkbox"]');
    await expect(checkbox2).toBeVisible();
    await checkbox2.click();

    // Submit the form
    await page.getByRole("button", { name: /submit/i }).click();

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
