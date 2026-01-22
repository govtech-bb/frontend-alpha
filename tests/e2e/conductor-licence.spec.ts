import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import type { ApiResponse } from "@/types";

const FORM_URL = "/work-employment/apply-for-conductor-licence/form";
const FORM_KEY = "apply-for-conductor-licence";
const API_SUBMIT_PATH = `/forms/${FORM_KEY}/submit`;

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
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

const generatePastDate = () => {
  const pastDate = faker.date.past({ years: 5 });
  return {
    day: pastDate.getDate().toString().padStart(2, "0"),
    month: (pastDate.getMonth() + 1).toString().padStart(2, "0"),
    year: pastDate.getFullYear().toString(),
  };
};

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
  expect(response.data.status).toBe("success");

  console.log("✅ Form submitted successfully:");
  console.log(`   - Submission ID: ${response.data.submissionId}`);
  console.log(`   - Status: ${response.data.status}`);
}

test.describe("Conductor Licence Application Form", () => {
  test("complete form - first time applicant", async ({ page }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();

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
    await page.getByRole("textbox", { name: "Day" }).fill(dateOfBirth.day);
    await page.getByRole("textbox", { name: "Month" }).fill(dateOfBirth.month);
    await page.getByRole("textbox", { name: "Year" }).fill(dateOfBirth.year);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contactDetails.parish"]')
      .selectOption(applicant.parish);
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Licence history
    await page.getByText("No", { exact: true }).click(); // No previous licence
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Endorsements
    await page.getByText("No", { exact: true }).click(); // No endorsements
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Disqualifications
    await page.getByText("No", { exact: true }).click(); // No disqualifications
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Criminal convictions
    await page.getByText("No", { exact: true }).click(); // No criminal convictions
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    await page.locator('button[role="checkbox"]').click();
    // Fill date of declaration (today's date)
    const today = new Date();
    await page
      .getByRole("textbox", { name: "Day" })
      .fill(today.getDate().toString().padStart(2, "0"));
    await page
      .getByRole("textbox", { name: "Month" })
      .fill((today.getMonth() + 1).toString().padStart(2, "0"));
    await page
      .getByRole("textbox", { name: "Year" })
      .fill(today.getFullYear().toString());

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
    verifyApiResponse(responseBody, "apply-for-conductor-licence");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - with previous licence and endorsements", async ({
    page,
  }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const licenceIssueDate = generatePastDate();
    const endorsementDate = generatePastDate();

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
    await page.getByRole("textbox", { name: "Day" }).fill(dateOfBirth.day);
    await page.getByRole("textbox", { name: "Month" }).fill(dateOfBirth.month);
    await page.getByRole("textbox", { name: "Year" }).fill(dateOfBirth.year);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contactDetails.parish"]')
      .selectOption(applicant.parish);
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Licence history
    await page.getByText("Yes", { exact: true }).click(); // Has previous licence
    await page
      .getByRole("textbox", { name: /licence number/i })
      .fill("DL-$faker.string.alphanumeric(8)");
    await page
      .locator("#licenceHistory\\.dateOfIssue-day")
      .fill(licenceIssueDate.day);
    await page
      .locator("#licenceHistory\\.dateOfIssue-month")
      .fill(licenceIssueDate.month);
    await page
      .locator("#licenceHistory\\.dateOfIssue-year")
      .fill(licenceIssueDate.year);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Endorsements
    await page.getByText("Yes", { exact: true }).click(); // Has endorsements
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Endorsement details (conditional)
    await page
      .getByRole("textbox", { name: /type of licence/i })
      .fill("Driving Licence");
    await page
      .locator("#endorsementDetails\\.0\\.dateOfEndorsement-day")
      .fill(endorsementDate.day);
    await page
      .locator("#endorsementDetails\\.0\\.dateOfEndorsement-month")
      .fill(endorsementDate.month);
    await page
      .locator("#endorsementDetails\\.0\\.dateOfEndorsement-year")
      .fill(endorsementDate.year);
    await page
      .getByRole("textbox", { name: /how long did the endorsement/i })
      .fill("6 months");
    await page
      .getByRole("radiogroup")
      .filter({ hasText: /add another endorsement/i })
      .getByText("No", { exact: true })
      .click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Disqualifications
    await page.getByText("No", { exact: true }).click(); // No disqualifications
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Criminal convictions
    await page.getByText("No", { exact: true }).click(); // No criminal convictions
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Declaration
    await page.locator('button[role="checkbox"]').click();
    // Fill date of declaration (today's date)
    const today2 = new Date();
    await page
      .getByRole("textbox", { name: "Day" })
      .fill(today2.getDate().toString().padStart(2, "0"));
    await page
      .getByRole("textbox", { name: "Month" })
      .fill((today2.getMonth() + 1).toString().padStart(2, "0"));
    await page
      .getByRole("textbox", { name: "Year" })
      .fill(today2.getFullYear().toString());

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
    verifyApiResponse(responseBody, "apply-for-conductor-licence");

    // Verify confirmation page
    await expect(
      page.getByRole("heading", { name: /thank you/i })
    ).toBeVisible();
  });

  test("complete form - with disqualification and conviction", async ({
    page,
  }) => {
    const applicant = generateApplicantData();
    const dateOfBirth = generateDateOfBirth();
    const disqualificationDate = generatePastDate();

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
    await page.getByRole("textbox", { name: "Day" }).fill(dateOfBirth.day);
    await page.getByRole("textbox", { name: "Month" }).fill(dateOfBirth.month);
    await page.getByRole("textbox", { name: "Year" }).fill(dateOfBirth.year);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 2: Contact details
    await page
      .getByRole("textbox", { name: /address line 1/i })
      .fill(applicant.addressLine1);
    await page
      .locator('select[name="contactDetails.parish"]')
      .selectOption(applicant.parish);
    await page.getByRole("textbox", { name: /email/i }).fill(applicant.email);
    await page
      .getByRole("textbox", { name: /telephone/i })
      .fill(applicant.telephoneNumber);
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Licence history
    await page.getByText("No", { exact: true }).click(); // No previous licence
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 4: Endorsements
    await page.getByText("No", { exact: true }).click(); // No endorsements
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 5: Disqualifications
    await page.getByText("Yes", { exact: true }).click(); // Has disqualifications
    await page
      .getByRole("textbox", { name: /court name/i })
      .fill("Bridgetown Court");
    await page
      .getByRole("textbox", { name: /reason for disqualification/i })
      .fill("Traffic violation");
    await page
      .locator("#disqualifications\\.dateOfDisqualification-day")
      .fill(disqualificationDate.day);
    await page
      .locator("#disqualifications\\.dateOfDisqualification-month")
      .fill(disqualificationDate.month);
    await page
      .locator("#disqualifications\\.dateOfDisqualification-year")
      .fill(disqualificationDate.year);
    await page
      .getByRole("textbox", { name: /length of disqualification/i })
      .fill("1 year");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 6: Criminal convictions
    await page.getByText("Yes", { exact: true }).click(); // Has criminal convictions
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Declaration
    await page.locator('button[role="checkbox"]').click();
    // Fill date of declaration (today's date)
    const today3 = new Date();
    await page
      .getByRole("textbox", { name: "Day" })
      .fill(today3.getDate().toString().padStart(2, "0"));
    await page
      .getByRole("textbox", { name: "Month" })
      .fill((today3.getMonth() + 1).toString().padStart(2, "0"));
    await page
      .getByRole("textbox", { name: "Year" })
      .fill(today3.getFullYear().toString());

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
    verifyApiResponse(responseBody, "apply-for-conductor-licence");

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
});
