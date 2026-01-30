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
      .locator('select[name="applicant.title"]')
      .selectOption({ value: applicant.title });
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
    await page
      .locator('select[name="applicant.maritalStatus"]')
      .selectOption({ value: applicant.maritalStatus });
    await page
      .locator('[id="applicant.idNumber"] input')
      .fill(applicant.idNumber);
    await page
      .getByRole("radiogroup")
      .filter({ hasText: /National Insurance/i })
      .getByText("Yes", { exact: true })
      .click(); // Has NIS
    await page
      .getByRole("textbox", { name: /insurance number/i })
      .fill(applicant.nisNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Do you have a disability?
    await page.getByRole("radiogroup").getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Your contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contactDetails.parish"]')
      .selectOption({ value: applicant.parish });
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /phone number/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Emergency contact details
    await page
      .locator('select[name="emergency.title"]')
      .selectOption({ value: emergency.title });
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(emergency.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(emergency.lastName);
    await page
      .locator('select[name="emergency.relationship"]')
      .selectOption({ value: emergency.relationship });
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(emergency.addressLine1);
    await page
      .locator('select[name="emergency.parish"]')
      .selectOption({ value: emergency.parish });
    await page.getByRole("textbox", { name: /email/i }).fill(emergency.email);
    await page
      .getByRole("textbox", { name: /phone number/i })
      .fill(emergency.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Primary education
    await page
      .getByRole("textbox", { name: /name of primary school/i })
      .fill("St. Michael Primary School");
    await page.getByRole("textbox", { name: /start year/i }).fill("2000");
    await page.getByRole("textbox", { name: /end year/i }).fill("2007");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Secondary education
    await page
      .getByRole("textbox", { name: /name of secondary school/i })
      .fill("Harrison College");
    await page.getByRole("textbox", { name: /start year/i }).fill("2007");
    await page.getByRole("textbox", { name: /end year/i }).fill("2012");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Post-secondary education (optional)
    await page.getByRole("radiogroup").getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Have you had a paid job?
    await page.getByRole("radiogroup").getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Tell us about your areas of interests (skips job history)
    await page
      .getByRole("textbox")
      .fill("Interested in IT support and customer service roles");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Are you 18 and over? - Click Yes
    await page
      .getByRole("radiogroup")
      .getByRole("radio", { name: "Yes" })
      .first()
      .click();
    // After clicking Yes, the "willing to work at night" conditional field appears with Yes/No options
    await page.getByRole("radio", { name: "Yes" }).last().click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 11: Tell us about your short-term goals
    await page
      .getByRole("textbox")
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

    // Submit the form
    await page.getByRole("button", { name: /submit/i }).click();

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
      .locator('select[name="applicant.title"]')
      .selectOption({ value: applicant.title });
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
    await page
      .locator('select[name="applicant.maritalStatus"]')
      .selectOption({ value: applicant.maritalStatus });
    await page
      .locator('[id="applicant.idNumber"] input')
      .fill(applicant.idNumber);
    await page
      .getByRole("radiogroup")
      .filter({ hasText: /National Insurance/i })
      .getByText("No", { exact: true })
      .click(); // No NIS
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Do you have a disability?
    await page
      .getByRole("radiogroup")
      .getByText("Yes", { exact: true })
      .click();
    await page
      .getByRole("textbox", { name: /disability/i })
      .fill("Mild hearing impairment - I use hearing aids");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Your contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contactDetails.parish"]')
      .selectOption({ value: applicant.parish });
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /phone number/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Emergency contact details
    await page
      .locator('select[name="emergency.title"]')
      .selectOption({ value: emergency.title });
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(emergency.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(emergency.lastName);
    await page
      .locator('select[name="emergency.relationship"]')
      .selectOption({ value: emergency.relationship });
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(emergency.addressLine1);
    await page
      .locator('select[name="emergency.parish"]')
      .selectOption({ value: emergency.parish });
    await page.getByRole("textbox", { name: /email/i }).fill(emergency.email);
    await page
      .getByRole("textbox", { name: /phone number/i })
      .fill(emergency.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Primary education
    await page
      .getByRole("textbox", { name: /name of primary school/i })
      .fill("St. Michael Primary School");
    await page.getByRole("textbox", { name: /start year/i }).fill("2000");
    await page.getByRole("textbox", { name: /end year/i }).fill("2007");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Secondary education
    await page
      .getByRole("textbox", { name: /name of secondary school/i })
      .fill("Harrison College");
    await page.getByRole("textbox", { name: /start year/i }).fill("2007");
    await page.getByRole("textbox", { name: /end year/i }).fill("2012");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Post-secondary education
    await page.getByRole("radiogroup").getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Have you had a paid job?
    await page
      .getByRole("radiogroup")
      .getByText("Yes", { exact: true })
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Tell us about your previous job
    await page
      .getByRole("textbox", { name: /name of employer/i })
      .fill("ABC Company");
    await page
      .getByRole("textbox", { name: /occupation/i })
      .fill("Shop Assistant");
    // The date fields don't have accessible names, use the container
    await page.getByRole("textbox").nth(2).fill("01, 2020"); // Start date
    await page.getByRole("textbox").nth(3).fill("06, 2021"); // End date
    await page
      .getByRole("textbox")
      .last()
      .fill("Customer service, stock management, and cash handling");
    await page.getByRole("radiogroup").getByText("No", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Tell us about your areas of interests
    await page
      .getByRole("textbox")
      .fill("Interested in retail management and hospitality");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 11: Are you 18 and over? - Click Yes
    await page
      .getByRole("radiogroup")
      .getByRole("radio", { name: "Yes" })
      .first()
      .click();
    // After clicking Yes, the "willing to work at night" conditional field appears
    // Use nth(1) to select the second "Yes" radio (the one for willing to work at night)
    await page.getByRole("radio", { name: "Yes" }).nth(1).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 12: Tell us about your short-term goals
    await page
      .getByRole("textbox")
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
    // Check declaration checkbox
    const checkbox2 = page.locator('button[role="checkbox"]');
    await expect(checkbox2).toBeVisible();
    await checkbox2.click();

    // Submit the form
    await page.getByRole("button", { name: /submit/i }).click();

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
