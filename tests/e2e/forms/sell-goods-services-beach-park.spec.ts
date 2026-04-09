import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

const FORM_URL = "/business-trade/sell-goods-services-beach-park/form";

/**
 * Test data generators
 */
const generateApplicantData = () => ({
  title: faker.helpers.arrayElement(["mr", "ms", "mrs"]),
  firstName: faker.person.firstName(),
  middleName: faker.person.middleName(),
  lastName: faker.person.lastName(),
  nationality: faker.helpers.arrayElement([
    "Barbados",
    "United Kingdom",
    "United States",
    "Canada",
    "Jamaica",
    "Trinidad and Tobago",
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
 * Format date as DD/MM/YYYY (matches DeclarationStep format)
 */
function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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
    const dobContainer1 = page.locator('[id="applicant.dateOfBirth"]');
    await dobContainer1
      .getByRole("textbox", { name: "Day" })
      .fill(dateOfBirth.day);
    await dobContainer1
      .getByRole("textbox", { name: "Month" })
      .fill(dateOfBirth.month);
    await dobContainer1
      .getByRole("textbox", { name: "Year" })
      .fill(dateOfBirth.year);
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
    await page.getByText("Goods", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about the goods you would like to sell
    await page.getByText("Local (Barbados)", { exact: true }).click();
    await page
      .locator('input[name="goods.description"]')
      .fill("Fresh locally-sourced fruit and homemade fruit drinks");
    await page
      .locator('input[name="goods.intendedLocation"]')
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

    // Step 6: First testimonial
    await page
      .locator('input[name="firstTestimonial.firstName"]')
      .fill(faker.person.firstName());
    await page
      .locator('input[name="firstTestimonial.lastName"]')
      .fill(faker.person.lastName());
    await page
      .locator('select[name="firstTestimonial.relationship"]')
      .selectOption("community-leader");
    await page
      .locator('input[name="firstTestimonial.addressLine1"]')
      .fill(faker.location.streetAddress());
    await page
      .locator('select[name="firstTestimonial.parish"]')
      .selectOption("st-michael");
    await page
      .locator('textarea[name="firstTestimonial.testimonial"]')
      .fill(
        "This person is a hardworking and honest individual in our community."
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Second testimonial
    await page
      .locator('input[name="secondTestimonial.firstName"]')
      .fill(faker.person.firstName());
    await page
      .locator('input[name="secondTestimonial.lastName"]')
      .fill(faker.person.lastName());
    await page
      .locator('select[name="secondTestimonial.relationship"]')
      .selectOption("mentor");
    await page
      .locator('input[name="secondTestimonial.addressLine1"]')
      .fill(faker.location.streetAddress());
    await page
      .locator('select[name="secondTestimonial.parish"]')
      .selectOption("christ-church");
    await page
      .locator('textarea[name="secondTestimonial.testimonial"]')
      .fill("I have known this person for years and they are very reliable.");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Upload supporting documents
    const uploadPromiseGoods1 = page.waitForResponse(
      (response) =>
        response.url().includes("/file/upload") &&
        response.request().method() === "POST"
    );
    await page
      .locator('input[type="file"]')
      .first()
      .setInputFiles("public/NEW_Mentor_Application_-_2024_2025.pdf");
    await uploadPromiseGoods1;
    const uploadPromiseGoods2 = page.waitForResponse(
      (response) =>
        response.url().includes("/file/upload") &&
        response.request().method() === "POST"
    );
    await page
      .locator('input[type="file"]')
      .last()
      .setInputFiles([
        "public/NEW_Mentor_Application_-_2024_2025.pdf",
        "public/NEW_Mentor_Application_-_2024_2025.pdf",
      ]);
    await uploadPromiseGoods2;
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Declaration
    const expectedFullName = `${applicant.firstName} ${applicant.lastName}`;
    const today = new Date();
    const expectedDate = formatDate(today);

    await expect(page.getByText(`Applicant's name:`)).toBeVisible();
    await expect(page.getByText(expectedFullName)).toBeVisible();

    await expect(page.getByText("Date:")).toBeVisible();
    await expect(page.getByText(expectedDate)).toBeVisible();

    const checkbox = page.locator('button[role="checkbox"]');
    await expect(checkbox).toBeVisible();
    await checkbox.click();

    await page.getByRole("button", { name: /submit/i }).click();

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
    await page.getByText("Services", { exact: true }).click();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 3: Tell us about your services
    await page
      .locator('input[name="services.description"]')
      .fill("20-minute jet ski rides and water sports equipment rental");
    await page
      .locator('input[name="services.intendedLocation"]')
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

    // Step 6: First testimonial
    await page
      .locator('input[name="firstTestimonial.firstName"]')
      .fill(faker.person.firstName());
    await page
      .locator('input[name="firstTestimonial.lastName"]')
      .fill(faker.person.lastName());
    await page
      .locator('select[name="firstTestimonial.relationship"]')
      .selectOption("teacher");
    await page
      .locator('input[name="firstTestimonial.addressLine1"]')
      .fill(faker.location.streetAddress());
    await page
      .locator('select[name="firstTestimonial.parish"]')
      .selectOption("st-james");
    await page
      .locator('textarea[name="firstTestimonial.testimonial"]')
      .fill("This person is a dedicated and responsible individual.");
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 7: Second testimonial
    await page
      .locator('input[name="secondTestimonial.firstName"]')
      .fill(faker.person.firstName());
    await page
      .locator('input[name="secondTestimonial.lastName"]')
      .fill(faker.person.lastName());
    await page
      .locator('select[name="secondTestimonial.relationship"]')
      .selectOption("neighbour");
    await page
      .locator('input[name="secondTestimonial.addressLine1"]')
      .fill(faker.location.streetAddress());
    await page
      .locator('select[name="secondTestimonial.parish"]')
      .selectOption("st-peter");
    await page
      .locator('textarea[name="secondTestimonial.testimonial"]')
      .fill(
        "A trustworthy person who has been part of our community for years."
      );
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 8: Upload supporting documents
    const uploadPromiseSvc1 = page.waitForResponse(
      (response) =>
        response.url().includes("/file/upload") &&
        response.request().method() === "POST"
    );
    await page
      .locator('input[type="file"]')
      .first()
      .setInputFiles("public/NEW_Mentor_Application_-_2024_2025.pdf");
    await uploadPromiseSvc1;
    const uploadPromiseSvc2 = page.waitForResponse(
      (response) =>
        response.url().includes("/file/upload") &&
        response.request().method() === "POST"
    );
    await page
      .locator('input[type="file"]')
      .last()
      .setInputFiles([
        "public/NEW_Mentor_Application_-_2024_2025.pdf",
        "public/NEW_Mentor_Application_-_2024_2025.pdf",
      ]);
    await uploadPromiseSvc2;
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 9: Check your answers
    await expect(
      page.getByRole("heading", { name: /check your answers/i })
    ).toBeVisible();
    await page.getByRole("button", { name: /continue/i }).click();

    // Step 10: Declaration
    const expectedFullName2 = `${applicant.firstName} ${applicant.lastName}`;
    const today2 = new Date();
    const expectedDate2 = formatDate(today2);

    await expect(page.getByText(`Applicant's name:`)).toBeVisible();
    await expect(page.getByText(expectedFullName2)).toBeVisible();

    await expect(page.getByText("Date:")).toBeVisible();
    await expect(page.getByText(expectedDate2)).toBeVisible();

    const checkbox2 = page.locator('button[role="checkbox"]');
    await expect(checkbox2).toBeVisible();
    await checkbox2.click();

    await page.getByRole("button", { name: /submit/i }).click();

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
    const idField = page.locator('input[name="applicant.idNumber"]');
    await idField.click();
    await idField.pressSequentially("12345");
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
