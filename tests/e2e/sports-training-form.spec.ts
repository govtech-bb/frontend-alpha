import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

/**
 * E2E test for the Community Sports Training Programme multi-step form
 * Tests form completion with faker-generated data across all steps
 *
 * Note: The form uses Radix UI radio buttons which render as:
 * <button role="radio" value="..."> elements
 * Use: page.locator('button[role="radio"][value="VALUE"]') to select them
 */

/**
 * Helper function to generate a Barbados phone number in the required format
 * Format: +1 (246) 234-5678
 */
function generateBarbadosPhoneNumber(): string {
  const areaCode = "246";
  const prefix = faker.number.int({ min: 200, max: 999 });
  const lineNumber = faker.number.int({ min: 1000, max: 9999 });
  return `+1 (${areaCode}) ${prefix}-${lineNumber}`;
}

/**
 * Helper function to generate a date in MM/DD/YYYY format
 * Generates dates for people aged 18-35 (typical sports programme participants)
 */
function generateDateOfBirth(): string {
  const date = faker.date.birthdate({ min: 18, max: 35, mode: "age" });
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

test.describe("Community Sports Training Programme Form", () => {
  test("should complete the multi-step form with generated data", async ({
    page,
  }) => {
    // Generate test data
    const testData = {
      // Step 1: Personal Information
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: generateDateOfBirth(),
      gender: faker.helpers.arrayElement(["male", "female"]),

      // Step 2: Discipline
      disciplineOfInterest: faker.helpers.arrayElement([
        "Tennis",
        "Basketball",
        "Swimming",
        "Football",
        "Cricket",
        "Volleyball",
      ]),
      disciplineExperience: faker.datatype.boolean(),

      // Step 3: Experience
      experienceLevel: faker.helpers.arrayElement([
        "school",
        "club",
        "national",
        "other",
      ]),
      yearsOfExperience: faker.number.int({ min: 0, max: 20 }).toString(),

      // Step 4: Employment
      employmentStatus: faker.helpers.arrayElement([
        "studying",
        "employed",
        "unemployed",
        "other",
      ]),

      // Step 5: Organizations
      belongsToOrganizations: faker.datatype.boolean(),

      // Step 6: Contact Details
      addressLine1: faker.location.streetAddress(),
      addressLine2: faker.helpers.maybe(
        () => faker.location.secondaryAddress(),
        { probability: 0.3 }
      ),
      parish: faker.helpers.arrayElement([
        "Christ Church",
        "St. Andrew",
        "St. George",
        "St. James",
        "St. John",
        "St. Joseph",
        "St. Lucy",
        "St. Michael",
        "St. Peter",
        "St. Philip",
        "St. Thomas",
      ]),
      telephoneNumber: generateBarbadosPhoneNumber(),

      // Step 7: Emergency Contact
      emergencyFirstName: faker.person.firstName(),
      emergencyLastName: faker.person.lastName(),
      emergencyRelationship: faker.helpers.arrayElement([
        "Mother",
        "Father",
        "Spouse",
        "Sibling",
        "Guardian",
      ]),
      emergencyAddressLine1: faker.location.streetAddress(),
      emergencyAddressLine2: faker.helpers.maybe(
        () => faker.location.secondaryAddress(),
        { probability: 0.3 }
      ),
      emergencyParish: faker.helpers.arrayElement([
        "Christ Church",
        "St. Andrew",
        "St. George",
        "St. James",
        "St. John",
        "St. Joseph",
        "St. Lucy",
        "St. Michael",
        "St. Peter",
        "St. Philip",
        "St. Thomas",
      ]),
      emergencyTelephoneNumber: generateBarbadosPhoneNumber(),
    };

    // Navigate to the form
    await page.goto(
      "/work-employment/register-for-community-sports-training-programme/form"
    );

    // Wait for the form to load
    await page.waitForLoadState("domcontentloaded");

    // STEP 1: Personal Information
    await expect(
      page.getByRole("heading", { name: "Tell us about yourself" })
    ).toBeVisible();

    await page.getByLabel("First Name").fill(testData.firstName);
    await page.getByLabel("Last Name").fill(testData.lastName);
    await page.getByLabel("Date of Birth").fill(testData.dateOfBirth);
    await page.getByLabel("Gender").selectOption(testData.gender);

    // Click Next button
    await page.getByRole("button", { name: "Next" }).click();

    // STEP 2: Discipline
    await expect(
      page.getByRole("heading", {
        name: "What sport discipline are you interested in?",
      })
    ).toBeVisible();

    await page
      .getByLabel("Discipline of Interest")
      .fill(testData.disciplineOfInterest);

    // Handle radio button for discipline experience
    // Radix UI renders buttons with role="radio" and value attributes
    if (testData.disciplineExperience) {
      await page.locator('button[role="radio"][value="true"]').first().click();
    } else {
      await page.locator('button[role="radio"][value="false"]').first().click();
    }

    await page.getByRole("button", { name: "Next" }).click();

    // STEP 3: Experience
    await expect(
      page.getByRole("heading", { name: "Tell us about your experience" })
    ).toBeVisible();

    // Handle radio button for experience level
    await page
      .locator(`button[role="radio"][value="${testData.experienceLevel}"]`)
      .click();

    await page
      .getByLabel("Years of Experience")
      .fill(testData.yearsOfExperience);

    await page.getByRole("button", { name: "Next" }).click();

    // STEP 4: Employment
    await expect(
      page.getByRole("heading", { name: "What is your employment status?" })
    ).toBeVisible();

    await page
      .locator(`button[role="radio"][value="${testData.employmentStatus}"]`)
      .click();

    await page.getByRole("button", { name: "Next" }).click();

    // STEP 5: Organizations
    await expect(
      page.getByRole("heading", { name: "Do you belong to any organizations?" })
    ).toBeVisible();

    // Click the radio button - each step only has its own radiogroup visible
    if (testData.belongsToOrganizations) {
      await page.locator('button[role="radio"][value="true"]').first().click();
    } else {
      await page.locator('button[role="radio"][value="false"]').first().click();
    }

    await page.getByRole("button", { name: "Next" }).click();

    // STEP 6: Contact Details
    await expect(
      page.getByRole("heading", { name: "Contact Details" })
    ).toBeVisible();

    await page.getByLabel("Address Line 1").fill(testData.addressLine1);
    if (testData.addressLine2) {
      await page.getByLabel("Address Line 2").fill(testData.addressLine2);
    }
    await page.getByLabel("Parish").selectOption(testData.parish);
    await page.getByLabel("Telephone Number").fill(testData.telephoneNumber);

    await page.getByRole("button", { name: "Next" }).click();

    // STEP 7: Emergency Contact
    await expect(
      page.getByRole("heading", { name: "Emergency Contact" })
    ).toBeVisible();

    // Emergency contact fields - need to be more specific with selectors
    const emergencySection = page.locator("form");
    await emergencySection
      .getByLabel("First Name")
      .fill(testData.emergencyFirstName);
    await emergencySection
      .getByLabel("Last Name")
      .fill(testData.emergencyLastName);
    await emergencySection
      .getByLabel("Relationship")
      .fill(testData.emergencyRelationship);
    await emergencySection
      .getByLabel("Address Line 1")
      .fill(testData.emergencyAddressLine1);
    if (testData.emergencyAddressLine2) {
      await emergencySection
        .getByLabel("Address Line 2")
        .fill(testData.emergencyAddressLine2);
    }
    await emergencySection
      .getByLabel("Parish")
      .selectOption(testData.emergencyParish);
    await emergencySection
      .getByLabel("Telephone Number")
      .fill(testData.emergencyTelephoneNumber);

    await page.getByRole("button", { name: "Next" }).click();

    // STEP 8: Review
    await expect(
      page.getByRole("heading", { name: "Check your answers" })
    ).toBeVisible();

    // Verify some of the entered data appears in the review step
    await expect(page.getByText(testData.firstName)).toBeVisible();
    await expect(page.getByText(testData.lastName)).toBeVisible();
    await expect(page.getByText(testData.disciplineOfInterest)).toBeVisible();

    // Click Continue to submit
    await page.getByRole("button", { name: "Continue to submit" }).click();

    // Wait for submission (you may need to adjust this based on your actual implementation)
    // This assumes the form navigates to a confirmation page or shows a success message
    // biome-ignore lint/style/useNumericSeparators: <explanation>
    await page.waitForLoadState("networkidle", { timeout: 10000 });

    // Optional: Add assertions for confirmation pageß
    // await expect(page.getByText(/reference number/i)).toBeVisible();

    console.log("Form submitted successfully with data:", {
      ...testData,
    });
  });

  test("should validate required fields on each step", async ({ page }) => {
    // Navigate to the form
    await page.goto(
      "/work-employment/register-for-community-sports-training-programme/form"
    );

    await page.waitForLoadState("domcontentloaded");

    // Try to proceed without filling any fields
    await page.getByRole("button", { name: "Next" }).click();

    // Should show validation errors (check for error summary which indicates validation errors exist)
    await expect(page.locator("#error-summary")).toBeVisible();
    await expect(page.getByText("There is a problem")).toBeVisible();

    // Verify specific error messages are present
    await expect(
      page
        .locator('p[role="alert"]')
        .filter({ hasText: /first name is required/i })
        .first()
    ).toBeVisible();
    await expect(
      page
        .locator('p[role="alert"]')
        .filter({ hasText: /last name is required/i })
        .first()
    ).toBeVisible();
    await expect(
      page
        .locator('p[role="alert"]')
        .filter({ hasText: /date of birth is required/i })
        .first()
    ).toBeVisible();
    await expect(
      page
        .locator('p[role="alert"]')
        .filter({ hasText: /gender is required/i })
        .first()
    ).toBeVisible();
  });

  test("should allow navigation back to previous steps", async ({ page }) => {
    // Navigate to the form
    await page.goto(
      "/work-employment/register-for-community-sports-training-programme/form"
    );

    await page.waitForLoadState("domcontentloaded");

    // Fill first step
    await page.getByLabel("First Name").fill("John");
    await page.getByLabel("Last Name").fill("Doe");
    await page.getByLabel("Date of Birth").fill("01/15/1995");
    await page.getByLabel("Gender").selectOption("male");

    // Move to next step
    await page.getByRole("button", { name: "Next" }).click();

    // Verify we're on step 2
    await expect(
      page.getByRole("heading", {
        name: "What sport discipline are you interested in?",
      })
    ).toBeVisible();

    // Click Previous button
    await page.getByRole("button", { name: "Previous" }).click();

    // Verify we're back on step 1
    await expect(
      page.getByRole("heading", { name: "Tell us about yourself" })
    ).toBeVisible();

    // Verify data is still there
    await expect(page.getByLabel("First Name")).toHaveValue("John");
    await expect(page.getByLabel("Last Name")).toHaveValue("Doe");
  });

  test("should validate phone number format", async ({ page }) => {
    // Navigate to the form
    await page.goto(
      "/work-employment/register-for-community-sports-training-programme/form"
    );

    await page.waitForLoadState("domcontentloaded");

    // Navigate to contact details step
    // Fill minimum required fields to get through previous steps
    await page.getByLabel("First Name").fill("John");
    await page.getByLabel("Last Name").fill("Doe");
    await page.getByLabel("Date of Birth").fill("01/15/1995");
    await page.getByLabel("Gender").selectOption("male");
    await page.getByRole("button", { name: "Next" }).click();

    await page.getByLabel("Discipline of Interest").fill("Tennis");
    await page.locator('button[role="radio"][value="true"]').first().click();
    await page.getByRole("button", { name: "Next" }).click();

    await page.locator('button[role="radio"][value="school"]').click();
    await page.getByLabel("Years of Experience").fill("5");
    await page.getByRole("button", { name: "Next" }).click();

    await page.locator('button[role="radio"][value="studying"]').click();
    await page.getByRole("button", { name: "Next" }).click();

    await page.locator('button[role="radio"][value="false"]').first().click();
    await page.getByRole("button", { name: "Next" }).click();

    // Now on contact details page
    await page.getByLabel("Address Line 1").fill("123 Main Street");
    await page.getByLabel("Parish").selectOption("St. Michael");

    // Try invalid phone number
    await page.getByLabel("Telephone Number").fill("1234567890");
    await page.getByRole("button", { name: "Next" }).click();

    // Should show phone validation error
    await expect(
      page
        .locator('p[role="alert"]')
        .filter({ hasText: /please enter a valid barbados phone number/i })
        .first()
    ).toBeVisible();
  });

  test("should validate date format", async ({ page }) => {
    // Navigate to the form
    await page.goto(
      "/work-employment/register-for-community-sports-training-programme/form"
    );

    await page.waitForLoadState("domcontentloaded");

    // Fill with invalid date
    await page.getByLabel("First Name").fill("John");
    await page.getByLabel("Last Name").fill("Doe");
    await page.getByLabel("Date of Birth").fill("invalid-date");
    await page.getByLabel("Gender").selectOption("male");
    await page.getByRole("button", { name: "Next" }).click();

    // Should show date validation error
    await expect(
      page
        .locator('p[role="alert"]')
        .filter({ hasText: /date must be in MM\/DD\/YYYY format/i })
        .first()
    ).toBeVisible();
  });
});
