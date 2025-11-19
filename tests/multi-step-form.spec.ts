import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const FORM_URL = `${BASE_URL}/work-employment/register-for-community-sports-training-programme/form`;

/**
 * Generate fake form data using faker
 */
function generateFormData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    // Step 1: Personal Information
    firstName,
    lastName,
    dateOfBirth: "11/15/1995", // MM/DD/YYYY format
    gender: faker.helpers.arrayElement(["male", "female"]),

    // Step 2: Discipline
    disciplineOfInterest: faker.helpers.arrayElement([
      "Tennis",
      "Basketball",
      "Swimming",
      "Football",
      "Cricket",
      "Athletics",
    ]),
    disciplineExperience: faker.helpers.arrayElement(["true", "false"]),

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
    belongsToOrganizations: faker.helpers.arrayElement(["true", "false"]),

    // Step 6: Contact Details
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
    telephoneNumber: "+1 246 234 5678",

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
    emergencyAddressLine2: faker.location.secondaryAddress(),
    emergencyParish: faker.helpers.arrayElement([
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
    emergencyTelephoneNumber: "+1 246 567 8901",
  };
}

test.describe("Multi-Step Form", () => {
  test.beforeEach(async ({ page }) => {
    // Clear session storage before each test
    await page.goto(FORM_URL);
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
  });

  test("should complete all steps and submit the form successfully", async ({
    page,
  }) => {
    test.setTimeout(120_000); // 2 minutes timeout for full form submission

    const formData = generateFormData();

    await page.goto(FORM_URL);

    // Wait for form to be ready
    await page.waitForLoadState("networkidle");

    console.log("Starting form submission...");

    // Step 1: Personal Information
    console.log("Step 1: Filling personal information...");
    await expect(
      page.getByRole("heading", { name: "Tell us about yourself" })
    ).toBeVisible();

    await page.getByLabel("First Name").fill(formData.firstName);
    await page.getByLabel("Last Name").fill(formData.lastName);
    await page.getByLabel("Date of Birth").fill(formData.dateOfBirth);
    await page.getByLabel("Gender").selectOption(formData.gender);

    await page.getByRole("button", { name: "Next" }).click();

    // Step 2: Discipline
    console.log("Step 2: Filling discipline information...");
    await expect(
      page.getByRole("heading", {
        name: "What sport discipline are you interested in?",
      })
    ).toBeVisible();

    await page
      .getByLabel("Discipline of Interest")
      .fill(formData.disciplineOfInterest);

    // Select discipline experience radio button - click the label
    await page
      .locator(
        `input[name="disciplineExperience"][value="${formData.disciplineExperience}"]`
      )
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });

    // Wait for React Hook Form to register the change
    await page.waitForTimeout(200);

    await page.getByRole("button", { name: "Next" }).click();

    // Step 3: Experience
    console.log("Step 3: Filling experience information...");
    await expect(
      page.getByRole("heading", { name: "Tell us about your experience" })
    ).toBeVisible();

    // Select experience level radio button
    await page
      .locator(
        `input[name="experienceLevel"][value="${formData.experienceLevel}"]`
      )
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });

    // Wait for React Hook Form to register the change
    await page.waitForTimeout(200);

    await page
      .getByLabel("Years of Experience")
      .fill(formData.yearsOfExperience);

    await page.getByRole("button", { name: "Next" }).click();

    // Wait for navigation to Step 4
    await page.waitForTimeout(500);

    // Step 4: Employment
    console.log("Step 4: Filling employment status...");
    await expect(
      page.getByRole("heading", { name: "What is your employment status?" })
    ).toBeVisible();

    // Select employment status radio button
    await page
      .locator(
        `input[name="employmentStatus"][value="${formData.employmentStatus}"]`
      )
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });

    // Wait for React Hook Form to register the change
    await page.waitForTimeout(200);

    await page.getByRole("button", { name: "Next" }).click();

    // Step 5: Organizations
    console.log("Step 5: Filling organizations...");
    await expect(
      page.getByRole("heading", {
        name: "Do you belong to any organizations?",
      })
    ).toBeVisible();

    // Select organizations radio button - dispatch change event
    await page
      .locator(
        `input[name="belongsToOrganizations"][value="${formData.belongsToOrganizations}"]`
      )
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });

    // Wait for React Hook Form to register the change
    await page.waitForTimeout(200);

    await page.getByRole("button", { name: "Next" }).click();

    // Step 6: Contact Details
    console.log("Step 6: Filling contact details...");
    await expect(
      page.getByRole("heading", { name: "Contact Details" })
    ).toBeVisible();

    await page.getByLabel("Address Line 1").fill(formData.addressLine1);
    await page.getByLabel("Address Line 2").fill(formData.addressLine2);
    await page.getByLabel("Parish").selectOption(formData.parish);
    await page.getByLabel("Telephone Number").fill(formData.telephoneNumber);

    await page.getByRole("button", { name: "Next" }).click();

    // Step 7: Emergency Contact
    console.log("Step 7: Filling emergency contact...");
    await expect(
      page.getByRole("heading", { name: "Emergency Contact" })
    ).toBeVisible();

    // Use more specific selectors for emergency contact fields
    const firstNameInputs = page.getByLabel("First Name");
    const lastNameInputs = page.getByLabel("Last Name");

    await firstNameInputs.last().fill(formData.emergencyFirstName);
    await lastNameInputs.last().fill(formData.emergencyLastName);
    await page.getByLabel("Relationship").fill(formData.emergencyRelationship);

    const addressLine1Inputs = page.getByLabel("Address Line 1");
    const addressLine2Inputs = page.getByLabel("Address Line 2");

    await addressLine1Inputs.last().fill(formData.emergencyAddressLine1);
    await addressLine2Inputs.last().fill(formData.emergencyAddressLine2);

    const parishSelects = page.getByLabel("Parish");
    await parishSelects.last().selectOption(formData.emergencyParish);

    const telephoneInputs = page.getByLabel("Telephone Number");
    await telephoneInputs.last().fill(formData.emergencyTelephoneNumber);

    await page.getByRole("button", { name: "Next" }).click();

    // Step 8: Review
    console.log("Step 8: Reviewing submission...");
    await expect(
      page.getByRole("heading", { name: "Check your answers" })
    ).toBeVisible();

    // Verify some key information is displayed in review
    await expect(page.getByText(formData.firstName)).toBeVisible();
    await expect(page.getByText(formData.lastName)).toBeVisible();

    // Submit the form
    console.log("Submitting form...");
    await page.getByRole("button", { name: "Submit Application" }).click();

    // Wait for submission and check for success
    await page.waitForLoadState("networkidle");

    // Check for confirmation page
    await expect(
      page.getByRole("heading", { name: "Application submitted" })
    ).toBeVisible({ timeout: 10_000 });

    console.log("Form submitted successfully!");
  });

  test("should validate required fields on each step", async ({ page }) => {
    await page.goto(FORM_URL);
    await page.waitForLoadState("networkidle");

    // Try to proceed without filling Step 1
    await page.getByRole("button", { name: "Next" }).click();

    // Should still be on Step 1 and show error messages
    await expect(
      page.getByRole("heading", { name: "Tell us about yourself" })
    ).toBeVisible();

    // Check for error messages
    await expect(page.getByText("First name is required")).toBeVisible();
  });

  test("should save progress in session storage", async ({ page }) => {
    const formData = generateFormData();

    await page.goto(FORM_URL);
    await page.waitForLoadState("networkidle");

    // Fill Step 1
    await page.getByLabel("First Name").fill(formData.firstName);
    await page.getByLabel("Last Name").fill(formData.lastName);
    await page.getByLabel("Date of Birth").fill(formData.dateOfBirth);
    await page.getByLabel("Gender").selectOption(formData.gender);

    // Wait for data to be saved to session storage
    await page.waitForTimeout(500);

    // Check session storage
    const sessionData = await page.evaluate(() => {
      const data = sessionStorage.getItem("multi-step-form-storage");
      return data ? JSON.parse(data) : null;
    });

    expect(sessionData).toBeTruthy();
    expect(sessionData.state.formData.firstName).toBe(formData.firstName);
    expect(sessionData.state.formData.lastName).toBe(formData.lastName);

    console.log("Session storage verified:", sessionData);
  });

  test("should navigate backwards through steps", async ({ page }) => {
    const formData = generateFormData();

    await page.goto(FORM_URL);
    await page.waitForLoadState("networkidle");

    // Complete Step 1
    await page.getByLabel("First Name").fill(formData.firstName);
    await page.getByLabel("Last Name").fill(formData.lastName);
    await page.getByLabel("Date of Birth").fill(formData.dateOfBirth);
    await page.getByLabel("Gender").selectOption(formData.gender);
    await page.getByRole("button", { name: "Next" }).click();

    // Now on Step 2
    await expect(
      page.getByRole("heading", {
        name: "What sport discipline are you interested in?",
      })
    ).toBeVisible();

    // Go back
    await page.getByRole("button", { name: "Previous" }).click();

    // Should be back on Step 1
    await expect(
      page.getByRole("heading", { name: "Tell us about yourself" })
    ).toBeVisible();

    // Data should be preserved
    await expect(page.getByLabel("First Name")).toHaveValue(formData.firstName);
    await expect(page.getByLabel("Last Name")).toHaveValue(formData.lastName);
  });

  test("should reset form when clicking Start Over", async ({ page }) => {
    const formData = generateFormData();

    await page.goto(FORM_URL);
    await page.waitForLoadState("networkidle");

    // Fill and complete the form quickly (minimal data for this test)
    // Step 1
    await page.getByLabel("First Name").fill(formData.firstName);
    await page.getByLabel("Last Name").fill(formData.lastName);
    await page.getByLabel("Date of Birth").fill(formData.dateOfBirth);
    await page.getByLabel("Gender").selectOption(formData.gender);
    await page.getByRole("button", { name: "Next" }).click();

    // Step 2
    await page
      .getByLabel("Discipline of Interest")
      .fill(formData.disciplineOfInterest);

    await page
      .locator(
        `input[name="disciplineExperience"][value="${formData.disciplineExperience}"]`
      )
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });
    await page.getByRole("button", { name: "Next" }).click();

    // Step 3
    await page
      .locator('input[name="experienceLevel"][value="school"]')
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });
    await page
      .getByLabel("Years of Experience")
      .fill(formData.yearsOfExperience);
    await page.getByRole("button", { name: "Next" }).click();

    // Step 4
    await page
      .locator('input[name="employmentStatus"][value="studying"]')
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });
    await page.getByRole("button", { name: "Next" }).click();

    // Step 5
    await page
      .locator('input[name="belongsToOrganizations"][value="true"]')
      .evaluate((el) => {
        (el as HTMLInputElement).click();
        (el as HTMLInputElement).checked = true;
        el.dispatchEvent(new Event("change", { bubbles: true }));
      });
    await page.getByRole("button", { name: "Next" }).click();

    // Step 6
    await page.getByLabel("Address Line 1").fill(formData.addressLine1);
    await page.getByLabel("Parish").selectOption(formData.parish);
    await page.getByLabel("Telephone Number").fill(formData.telephoneNumber);
    await page.getByRole("button", { name: "Next" }).click();

    // Step 7
    const firstNameInputs = page.getByLabel("First Name");
    const lastNameInputs = page.getByLabel("Last Name");
    await firstNameInputs.last().fill(formData.emergencyFirstName);
    await lastNameInputs.last().fill(formData.emergencyLastName);
    await page.getByLabel("Relationship").fill(formData.emergencyRelationship);

    const addressLine1Inputs = page.getByLabel("Address Line 1");
    await addressLine1Inputs.last().fill(formData.emergencyAddressLine1);

    const parishSelects = page.getByLabel("Parish");
    await parishSelects.last().selectOption(formData.emergencyParish);

    const telephoneInputs = page.getByLabel("Telephone Number");
    await telephoneInputs.last().fill(formData.emergencyTelephoneNumber);
    await page.getByRole("button", { name: "Next" }).click();

    // Review and submit
    await page.getByRole("button", { name: "Submit Application" }).click();

    // Wait for confirmation
    await expect(
      page.getByRole("heading", { name: "Application submitted" })
    ).toBeVisible({ timeout: 10_000 });

    // Click Start Over
    await page.getByRole("button", { name: "Start Over" }).click();

    // Should be back at Step 1 with empty form
    await expect(
      page.getByRole("heading", { name: "Tell us about yourself" })
    ).toBeVisible();

    // Form should be empty
    await expect(page.getByLabel("First Name")).toHaveValue("");
    await expect(page.getByLabel("Last Name")).toHaveValue("");
  });
});
