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
  postcode: `BB${faker.string.numeric(5)}`,
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

test.describe("Project Protégé Mentor Application Form", () => {
  test("complete form - without mentor experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const professionalReferee = generateRefereeData();
    const personalReferee = generateRefereeData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    const dobContainer = page.locator('[id="personal.dateOfBirth"]');
    await dobContainer
      .getByRole("textbox", { name: "Day" })
      .fill(dateOfBirth.day);
    await dobContainer
      .getByRole("textbox", { name: "Month" })
      .fill(dateOfBirth.month);
    await dobContainer
      .getByRole("textbox", { name: "Year" })
      .fill(dateOfBirth.year);
    await page.getByText("Employed", { exact: true }).click();
    await page
      .getByRole("textbox", { name: /company or organisation/i })
      .fill("Tech Solutions Ltd");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
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

    // Step 3: Tell us why you would be a good mentor
    await page
      .locator('[id="mentorship.whyMentor"] textarea')
      .fill(
        "I want to give back to the community and help young people succeed"
      );
    await page
      .locator('[id="mentorship.strengths"] textarea')
      .fill("Leadership, patience, and good communication skills");
    await page
      .locator('[id="mentorship.menteeLearn"] textarea')
      .fill(
        "They could learn how to navigate career challenges and stay motivated"
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Your preferences
    await page.getByText("No preference", { exact: true }).click(); // Gender preference
    // Use nth-match to get specific radiogroups (gender=0, sharePhone=1, menteeInMind=2)
    await page.getByRole("radiogroup").nth(1).getByText("No").click(); // Share phone number
    // For the third radiogroup, click on the radio element directly (No is the second option)
    await page
      .getByRole("radiogroup")
      .nth(2)
      .getByRole("radio")
      .nth(1)
      .click({ force: true }); // Has mentee in mind
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Your experience
    await page.getByRole("radio", { name: "No" }).click(); // No mentor experience
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Professional referee
    await page
      .locator('[id="professionalReferee.firstName"] input')
      .fill(professionalReferee.firstName);
    await page
      .locator('[id="professionalReferee.lastName"] input')
      .fill(professionalReferee.lastName);
    await page
      .locator('[id="professionalReferee.relationship"] input')
      .fill(professionalReferee.relationship);
    await page
      .locator('[id="professionalReferee.email"] input')
      .fill(professionalReferee.email);
    await page
      .locator('[id="professionalReferee.phone"] input')
      .fill(professionalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Personal referee
    await page
      .locator('[id="personalReferee.firstName"] input')
      .fill(personalReferee.firstName);
    await page
      .locator('[id="personalReferee.lastName"] input')
      .fill(personalReferee.lastName);
    await page
      .locator('[id="personalReferee.relationship"] input')
      .fill(personalReferee.relationship);
    await page
      .locator('[id="personalReferee.email"] input')
      .fill(personalReferee.email);
    await page
      .locator('[id="personalReferee.phone"] input')
      .fill(personalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Declaration
    // This form has date inputs and checkbox - no applicant name display
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

  test("complete form - with mentor experience", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const professionalReferee = generateRefereeData();
    const personalReferee = generateRefereeData();

    await page.goto(FORM_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Step 1: Tell us about yourself
    await page
      .getByRole("textbox", { name: /first name/i })
      .fill(applicant.firstName);
    await page
      .getByRole("textbox", { name: /last name/i })
      .fill(applicant.lastName);
    const dobContainer2 = page.locator('[id="personal.dateOfBirth"]');
    await dobContainer2
      .getByRole("textbox", { name: "Day" })
      .fill(dateOfBirth.day);
    await dobContainer2
      .getByRole("textbox", { name: "Month" })
      .fill(dateOfBirth.month);
    await dobContainer2
      .getByRole("textbox", { name: "Year" })
      .fill(dateOfBirth.year);
    await page.getByText("Studying", { exact: true }).click();
    await page
      .getByRole("textbox", { name: /institution/i })
      .fill("University of the West Indies");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
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

    // Step 3: Tell us why you would be a good mentor
    await page
      .locator('[id="mentorship.whyMentor"] textarea')
      .fill(
        "I want to give back to the community and help young people succeed"
      );
    await page
      .locator('[id="mentorship.strengths"] textarea')
      .fill("Leadership, patience, and good communication skills");
    await page
      .locator('[id="mentorship.menteeLearn"] textarea')
      .fill(
        "They could learn how to navigate career challenges and stay motivated"
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Your preferences
    await page.getByText("Male", { exact: true }).click(); // Gender preference
    // Use nth-match to get specific radiogroups (gender=0, sharePhone=1, menteeInMind=2)
    await page.getByRole("radiogroup").nth(1).getByText("Yes").click(); // Share phone number
    await page
      .getByRole("textbox", { name: /phone number/i })
      .fill(`1246${faker.string.numeric(7)}`);
    // For the third radiogroup, click on the first radio (Yes)
    await page
      .getByRole("radiogroup")
      .nth(2)
      .getByRole("radio")
      .nth(0)
      .click({ force: true }); // Has mentee in mind
    await page
      .getByRole("textbox", { name: /their name/i })
      .fill(faker.person.fullName());
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Your experience
    await page.getByRole("radio", { name: "Yes" }).click(); // Has mentor experience
    await page.getByRole("spinbutton", { name: /years/i }).fill("2");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Professional referee
    await page
      .locator('[id="professionalReferee.firstName"] input')
      .fill(professionalReferee.firstName);
    await page
      .locator('[id="professionalReferee.lastName"] input')
      .fill(professionalReferee.lastName);
    await page
      .locator('[id="professionalReferee.relationship"] input')
      .fill(professionalReferee.relationship);
    await page
      .locator('[id="professionalReferee.email"] input')
      .fill(professionalReferee.email);
    await page
      .locator('[id="professionalReferee.phone"] input')
      .fill(professionalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Personal referee
    await page
      .locator('[id="personalReferee.firstName"] input')
      .fill(personalReferee.firstName);
    await page
      .locator('[id="personalReferee.lastName"] input')
      .fill(personalReferee.lastName);
    await page
      .locator('[id="personalReferee.relationship"] input')
      .fill(personalReferee.relationship);
    await page
      .locator('[id="personalReferee.email"] input')
      .fill(personalReferee.email);
    await page
      .locator('[id="personalReferee.phone"] input')
      .fill(personalReferee.phone);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Declaration
    // This form has date inputs and checkbox - no applicant name display
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
  });
});
