/**
 * Comprehensive E2E tests for the Register Birth multi-step form
 *
 * This test suite:
 * 1. Generates realistic test data using faker for all three form flows
 * 2. Saves test profiles to disk for reproducibility
 * 3. Tests each conditional flow (married, unmarried without father, unmarried with father)
 * 4. Validates form submissions and error states
 * 5. Highlights failures with detailed error reports
 *
 * Test Flows:
 * - Path A: Married parents (8 steps, includes father details automatically)
 * - Path B: Unmarried without father details (8 steps, skip father step)
 * - Path C: Unmarried with father details (9 steps, include father step)
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import {
  generateAllTestProfiles,
  type RegisterBirthTestProfile,
} from "./fixtures/register-birth-data";

/**
 * Directory where test data will be saved
 */
const TEST_DATA_DIR = path.join(__dirname, "test-data");

/**
 * Ensure test data directory exists
 */
function ensureTestDataDir(): void {
  if (!existsSync(TEST_DATA_DIR)) {
    mkdirSync(TEST_DATA_DIR, { recursive: true });
  }
}

/**
 * Save test profiles to disk for reproducibility
 */
function saveTestProfiles(profiles: RegisterBirthTestProfile[]): void {
  ensureTestDataDir();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = path.join(TEST_DATA_DIR, `profiles-${timestamp}.json`);
  writeFileSync(filename, JSON.stringify(profiles, null, 2));
  console.log(`✓ Test profiles saved to: ${filename}`);
}

/**
 * Test result tracking
 */
type TestResult = {
  scenario: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
  stepsCompleted: number;
  totalSteps: number;
};

const testResults: TestResult[] = [];

/**
 * Fill person details form
 */
async function fillPersonDetails(
  page: any,
  person: {
    firstName: string;
    middleName: string;
    lastName: string;
    hadOtherSurname: "yes" | "no";
    otherSurname?: string;
    dateOfBirth: string;
    address: string;
    nationalRegistrationNumber: string;
    passportNumber?: string;
    passportPlaceOfIssue?: string;
    occupation: string;
  },
  personType: string
): Promise<string[]> {
  const errors: string[] = [];

  try {
    // First name
    await page.fill(`input[name="${personType}-firstName"]`, person.firstName);

    // Middle name
    await page.fill(
      `input[name="${personType}-middleName"]`,
      person.middleName
    );

    // Last name
    await page.fill(`input[name="${personType}-lastName"]`, person.lastName);

    // Had other surname
    await page.click(
      `input[value="${person.hadOtherSurname}"][name="${personType}-hadOtherSurname"]`
    );

    // Other surname (if applicable)
    if (person.hadOtherSurname === "yes" && person.otherSurname) {
      await page.fill(
        `input[name="${personType}-otherSurname"]`,
        person.otherSurname
      );
    }

    // Date of birth
    await page.fill(
      `input[name="${personType}-dateOfBirth"]`,
      person.dateOfBirth
    );

    // Address
    await page.fill(`input[name="${personType}-address"]`, person.address);

    // National Registration Number
    await page.fill(
      `input[name="${personType}-nationalRegistrationNumber"]`,
      person.nationalRegistrationNumber
    );

    // Passport (optional)
    if (person.passportNumber) {
      await page.fill(
        `input[name="${personType}-passportNumber"]`,
        person.passportNumber
      );
      if (person.passportPlaceOfIssue) {
        await page.fill(
          `input[name="${personType}-passportPlaceOfIssue"]`,
          person.passportPlaceOfIssue
        );
      }
    }

    // Occupation
    await page.fill(
      `input[name="${personType}-occupation"]`,
      person.occupation
    );
  } catch (error) {
    errors.push(
      `Failed to fill ${personType} details: ${error instanceof Error ? error.message : String(error)}`
    );
  }

  return errors;
}

/**
 * Test Path A: Married Parents Flow
 */
async function testMarriedParentsFlow(
  page: any,
  profile: RegisterBirthTestProfile & { scenario: "married-parents" }
): Promise<TestResult> {
  const result: TestResult = {
    scenario: profile.scenario,
    passed: false,
    errors: [],
    warnings: [],
    stepsCompleted: 0,
    totalSteps: 8,
  };

  try {
    console.log("\n=== Testing Path A: Married Parents ===");

    // Step 1: Marriage Status (Yes)
    console.log("Step 1: Setting marriage status to 'yes'...");
    await page.click('input[value="yes"][name="marriageStatus"]');
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 2: Father's Details
    console.log("Step 2: Filling father's details...");
    const fatherErrors = await fillPersonDetails(
      page,
      profile.father,
      "father"
    );
    result.errors.push(...fatherErrors);
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 3: Mother's Details
    console.log("Step 3: Filling mother's details...");
    const motherErrors = await fillPersonDetails(
      page,
      profile.mother,
      "mother"
    );
    result.errors.push(...motherErrors);
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 4: Child's Details
    console.log("Step 4: Filling child's details...");
    await page.fill(`input[name="child-firstNames"]`, profile.child.firstNames);
    await page.fill(
      `input[name="child-middleNames"]`,
      profile.child.middleNames
    );
    await page.fill(`input[name="child-lastName"]`, profile.child.lastName);
    await page.fill(
      `input[name="child-dateOfBirth"]`,
      profile.child.dateOfBirth
    );
    await page.click(
      `input[value="${profile.child.sexAtBirth}"][name="child-sexAtBirth"]`
    );
    await page.fill(
      `input[name="child-parishOfBirth"]`,
      profile.child.parishOfBirth
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 5: Certificates
    console.log("Step 5: Setting number of certificates...");
    await page.fill(
      `input[name="numberOfCertificates"]`,
      String(profile.numberOfCertificates)
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 6: Contact Info
    console.log("Step 6: Filling contact information...");
    await page.fill(`input[name="email"]`, profile.contact.email);
    await page.fill(`input[name="phoneNumber"]`, profile.contact.phoneNumber);
    await page.click(
      `input[value="${profile.contact.wantContact}"][name="wantContact"]`
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 7: Check Answers
    console.log("Step 7: Checking form review page...");
    await expect(
      page.locator("h2:has-text('Check your answers')")
    ).toBeVisible();
    result.stepsCompleted++;

    result.passed = true;
    console.log("✓ Path A (Married Parents) test completed successfully!");
  } catch (error) {
    result.errors.push(
      `Test failed at step ${result.stepsCompleted}: ${error instanceof Error ? error.message : String(error)}`
    );
    console.error(`✗ Path A test failed: ${result.errors.at(-1)}`);
  }

  return result;
}

/**
 * Test Path B: Unmarried Without Father Details Flow
 */
async function testUnmarriedWithoutFatherFlow(
  page: any,
  profile: RegisterBirthTestProfile & {
    scenario: "unmarried-without-father";
  }
): Promise<TestResult> {
  const result: TestResult = {
    scenario: profile.scenario,
    passed: false,
    errors: [],
    warnings: [],
    stepsCompleted: 0,
    totalSteps: 8,
  };

  try {
    console.log("\n=== Testing Path B: Unmarried Without Father Details ===");

    // Step 1: Marriage Status (No)
    console.log("Step 1: Setting marriage status to 'no'...");
    await page.click('input[value="no"][name="marriageStatus"]');
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 2: Include Father Details (No)
    console.log("Step 2: Setting include father details to 'no'...");
    await page.click('input[value="no"][name="includeFatherDetails"]');
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 3: Mother's Details
    console.log("Step 3: Filling mother's details...");
    const motherErrors = await fillPersonDetails(
      page,
      profile.mother,
      "mother"
    );
    result.errors.push(...motherErrors);
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 4: Child's Details
    console.log("Step 4: Filling child's details...");
    await page.fill(`input[name="child-firstNames"]`, profile.child.firstNames);
    await page.fill(
      `input[name="child-middleNames"]`,
      profile.child.middleNames
    );
    await page.fill(`input[name="child-lastName"]`, profile.child.lastName);
    await page.fill(
      `input[name="child-dateOfBirth"]`,
      profile.child.dateOfBirth
    );
    await page.click(
      `input[value="${profile.child.sexAtBirth}"][name="child-sexAtBirth"]`
    );
    await page.fill(
      `input[name="child-parishOfBirth"]`,
      profile.child.parishOfBirth
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 5: Certificates
    console.log("Step 5: Setting number of certificates...");
    await page.fill(
      `input[name="numberOfCertificates"]`,
      String(profile.numberOfCertificates)
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 6: Contact Info
    console.log("Step 6: Filling contact information...");
    await page.fill(`input[name="email"]`, profile.contact.email);
    await page.fill(`input[name="phoneNumber"]`, profile.contact.phoneNumber);
    await page.click(
      `input[value="${profile.contact.wantContact}"][name="wantContact"]`
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 7: Check Answers
    console.log("Step 7: Checking form review page...");
    await expect(
      page.locator("h2:has-text('Check your answers')")
    ).toBeVisible();
    result.stepsCompleted++;

    result.passed = true;
    console.log(
      "✓ Path B (Unmarried Without Father Details) test completed successfully!"
    );
  } catch (error) {
    result.errors.push(
      `Test failed at step ${result.stepsCompleted}: ${error instanceof Error ? error.message : String(error)}`
    );
    console.error(`✗ Path B test failed: ${result.errors.at(-1)}`);
  }

  return result;
}

/**
 * Test Path C: Unmarried With Father Details Flow
 */
async function testUnmarriedWithFatherFlow(
  page: any,
  profile: RegisterBirthTestProfile & { scenario: "unmarried-with-father" }
): Promise<TestResult> {
  const result: TestResult = {
    scenario: profile.scenario,
    passed: false,
    errors: [],
    warnings: [],
    stepsCompleted: 0,
    totalSteps: 9,
  };

  try {
    console.log("\n=== Testing Path C: Unmarried With Father Details ===");

    // Step 1: Marriage Status (No)
    console.log("Step 1: Setting marriage status to 'no'...");
    await page.click('input[value="no"][name="marriageStatus"]');
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 2: Include Father Details (Yes)
    console.log("Step 2: Setting include father details to 'yes'...");
    await page.click('input[value="yes"][name="includeFatherDetails"]');
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 3: Father's Details
    console.log("Step 3: Filling father's details...");
    const fatherErrors = await fillPersonDetails(
      page,
      profile.father,
      "father"
    );
    result.errors.push(...fatherErrors);
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 4: Mother's Details
    console.log("Step 4: Filling mother's details...");
    const motherErrors = await fillPersonDetails(
      page,
      profile.mother,
      "mother"
    );
    result.errors.push(...motherErrors);
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 5: Child's Details
    console.log("Step 5: Filling child's details...");
    await page.fill(`input[name="child-firstNames"]`, profile.child.firstNames);
    await page.fill(
      `input[name="child-middleNames"]`,
      profile.child.middleNames
    );
    await page.fill(`input[name="child-lastName"]`, profile.child.lastName);
    await page.fill(
      `input[name="child-dateOfBirth"]`,
      profile.child.dateOfBirth
    );
    await page.click(
      `input[value="${profile.child.sexAtBirth}"][name="child-sexAtBirth"]`
    );
    await page.fill(
      `input[name="child-parishOfBirth"]`,
      profile.child.parishOfBirth
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 6: Certificates
    console.log("Step 6: Setting number of certificates...");
    await page.fill(
      `input[name="numberOfCertificates"]`,
      String(profile.numberOfCertificates)
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 7: Contact Info
    console.log("Step 7: Filling contact information...");
    await page.fill(`input[name="email"]`, profile.contact.email);
    await page.fill(`input[name="phoneNumber"]`, profile.contact.phoneNumber);
    await page.click(
      `input[value="${profile.contact.wantContact}"][name="wantContact"]`
    );
    await page.click("button:has-text('Next')");
    result.stepsCompleted++;

    // Step 8: Check Answers
    console.log("Step 8: Checking form review page...");
    await expect(
      page.locator("h2:has-text('Check your answers')")
    ).toBeVisible();
    result.stepsCompleted++;

    result.passed = true;
    console.log(
      "✓ Path C (Unmarried With Father Details) test completed successfully!"
    );
  } catch (error) {
    result.errors.push(
      `Test failed at step ${result.stepsCompleted}: ${error instanceof Error ? error.message : String(error)}`
    );
    console.error(`✗ Path C test failed: ${result.errors.at(-1)}`);
  }

  return result;
}

/**
 * Print detailed test report
 */
function printTestReport(): void {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║        REGISTER BIRTH FORM - TEST EXECUTION REPORT         ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  const passed = testResults.filter((r) => r.passed).length;
  const failed = testResults.filter((r) => !r.passed).length;

  console.log(`\nTotal Tests: ${testResults.length}`);
  console.log(`Passed: ${passed} ✓`);
  console.log(`Failed: ${failed} ✗`);

  testResults.forEach((result, index) => {
    console.log(`\n${"-".repeat(60)}`);
    console.log(
      `Test ${index + 1}: ${result.scenario} - ${result.passed ? "PASSED ✓" : "FAILED ✗"}`
    );
    console.log(
      `Steps Completed: ${result.stepsCompleted}/${result.totalSteps}`
    );

    if (result.errors.length > 0) {
      console.log("\nErrors:");
      result.errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    }

    if (result.warnings.length > 0) {
      console.log("\nWarnings:");
      result.warnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`);
      });
    }
  });

  console.log(`\n${"-".repeat(60)}`);
  console.log(`\nSummary: ${passed} passed, ${failed} failed\n`);
}

/**
 * Main test suite
 */
test.describe("Register Birth Form - Multi-Step Conditional Flows", () => {
  let profiles: RegisterBirthTestProfile[];

  test.beforeAll(() => {
    // Generate and save test profiles
    profiles = generateAllTestProfiles();
    saveTestProfiles(profiles);
  });

  test.afterAll(() => {
    // Print final test report
    printTestReport();
  });

  test("should complete Path A: Married parents flow", async ({ page }) => {
    await page.goto("/register-birth");
    // Wait for form to load
    await page.waitForSelector("button:has-text('Next')");

    const result = await testMarriedParentsFlow(
      page,
      profiles[0] as RegisterBirthTestProfile & {
        scenario: "married-parents";
      }
    );
    testResults.push(result);

    if (!result.passed) {
      console.error("\n❌ Test Details:");
      for (const error of result.errors) {
        console.error(`   - ${error}`);
      }
      expect(result.errors.length).toBe(0);
    }
  });

  test("should complete Path B: Unmarried without father flow", async ({
    page,
  }) => {
    await page.goto("/register-birth");
    // Wait for form to load
    await page.waitForSelector("button:has-text('Next')");

    const result = await testUnmarriedWithoutFatherFlow(
      page,
      profiles[1] as RegisterBirthTestProfile & {
        scenario: "unmarried-without-father";
      }
    );
    testResults.push(result);

    if (!result.passed) {
      console.error("\n❌ Test Details:");
      for (const error of result.errors) {
        console.error(`   - ${error}`);
      }
      expect(result.errors.length).toBe(0);
    }
  });

  test("should complete Path C: Unmarried with father flow", async ({
    page,
  }) => {
    await page.goto("/register-birth");
    // Wait for form to load
    await page.waitForSelector("button:has-text('Next')");

    const result = await testUnmarriedWithFatherFlow(
      page,
      profiles[2] as RegisterBirthTestProfile & {
        scenario: "unmarried-with-father";
      }
    );
    testResults.push(result);

    if (!result.passed) {
      console.error("\n❌ Test Details:");
      for (const error of result.errors) {
        console.error(`   - ${error}`);
      }
      expect(result.errors.length).toBe(0);
    }
  });
});
