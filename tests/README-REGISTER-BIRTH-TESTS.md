<!-- Documentation for Register Birth Form Automated Tests -->
# Register Birth Form - Automated Playwright Tests

## Overview

This test suite provides comprehensive end-to-end testing for the **Register a Birth** multi-step form using Playwright and faker-generated test data. The tests validate all three conditional flow paths through the form and highlight any failures in a detailed report.

## Test Architecture

### Three Form Flows (Paths)

The form implements three distinct conditional flows based on user selections:

#### **Path A: Married Parents** (8 steps)
- **Condition**: Marriage status = "yes"
- **Steps**: Marriage Status → Father Details → Mother Details → Child Details → Certificates → Contact Info → Check Answers → Confirmation
- **Father Details**: Included automatically

```
User selects "married" 
→ Father details required (always)
→ Mother details required (always)
```

#### **Path B: Unmarried Without Father** (8 steps)
- **Condition**: Marriage status = "no" AND include father = "no"
- **Steps**: Marriage Status → Include Father? → Mother Details → Child Details → Certificates → Contact Info → Check Answers → Confirmation
- **Father Details**: Skipped

```
User selects "not married"
→ Choose not to include father
→ Only mother details collected
```

#### **Path C: Unmarried With Father** (9 steps)
- **Condition**: Marriage status = "no" AND include father = "yes"
- **Steps**: Marriage Status → Include Father? → Father Details → Mother Details → Child Details → Certificates → Contact Info → Check Answers → Confirmation
- **Father Details**: Included by choice

```
User selects "not married"
→ Choose to include father
→ Both father and mother details collected
```

## Test Data Generation

### Using Faker.js

Test profiles are automatically generated using `@faker-js/faker` to create realistic, reproducible test data:

- **Names**: Generated first, middle, and last names
- **Dates**: Valid birth dates formatted as "DD MMM YYYY"
- **NRN**: Randomly generated National Registration Numbers (XXXXXX-XXXX format)
- **Addresses**: Random street addresses
- **Emails**: Unique email addresses
- **Phone Numbers**: Formatted as +1-246-XXX-XXXX (Barbados)
- **Parishes**: Random selection from 11 valid Barbados parishes
- **Occupations**: Realistic job titles
- **Sex at Birth**: Random Male/Female selection
- **Certificate Count**: 1-5 certificates

### Test Data Persistence

Before each test run:
1. Three complete test profiles are generated (one for each flow)
2. Profiles are saved to `tests/test-data/profiles-{timestamp}.json`
3. Tests use these saved profiles for reproducibility
4. Future runs can reference the same profile file for consistency

**Location**: `tests/test-data/profiles-YYYY-MM-DDTHH-mm-ss-sssZ.json`

## Running the Tests

### Prerequisites

```bash
npm install  # Install all dependencies including @faker-js/faker
npm run build  # Build the Next.js app
```

### Run All Tests

```bash
npm run test:e2e  # Run all Playwright tests
```

### Run Only Register Birth Tests

```bash
npx playwright test register-birth-form.spec.ts
```

### Run Specific Flow Test

```bash
# Run only Path A (Married Parents)
npx playwright test register-birth-form.spec.ts -g "Married parents"

# Run only Path B (Unmarried without father)
npx playwright test register-birth-form.spec.ts -g "Unmarried without father"

# Run only Path C (Unmarried with father)
npx playwright test register-birth-form.spec.ts -g "Unmarried with father"
```

### Debug Mode

```bash
npx playwright test register-birth-form.spec.ts --debug
```

### View Test Report

```bash
npx playwright show-report
```

## Test Output & Failure Highlighting

### Console Output During Test Execution

```
=== Testing Path A: Married Parents ===
Step 1: Setting marriage status to 'yes'...
Step 2: Filling father's details...
Step 3: Filling mother's details...
...
✓ Path A (Married Parents) test completed successfully!
```

### Final Test Report

After all tests complete, a comprehensive report is printed:

```
╔════════════════════════════════════════════════════════════╗
║        REGISTER BIRTH FORM - TEST EXECUTION REPORT         ║
╚════════════════════════════════════════════════════════════╝

Total Tests: 3
Passed: 3 ✓
Failed: 0 ✗

────────────────────────────────────────────────────────────
Test 1: married-parents - PASSED ✓
Steps Completed: 8/8

────────────────────────────────────────────────────────────
Test 2: unmarried-without-father - PASSED ✓
Steps Completed: 8/8

────────────────────────────────────────────────────────────
Test 3: unmarried-with-father - PASSED ✓
Steps Completed: 9/9

────────────────────────────────────────────────────────────

Summary: 3 passed, 0 failed
```

### Failure Reporting

If a test fails, the report shows:

```
────────────────────────────────────────────────────────────
Test 1: married-parents - FAILED ✗
Steps Completed: 5/8

Errors:
  1. Test failed at step 5: Failed to fill father details: Timeout waiting for input[name="father-firstName"]
  2. Could not find element matching selector

Warnings:
  1. Phone number format may not be recognized
────────────────────────────────────────────────────────────
```

## File Structure

```
tests/
├── register-birth-form.spec.ts      # Main test suite
├── fixtures/
│   └── register-birth-data.ts       # Test data generation & types
├── test-data/
│   └── profiles-*.json              # Saved test profiles (generated at runtime)
└── broken-links.spec.ts             # Existing link checking tests
```

## Key Features

✅ **Reproducible Tests**: Same test data profiles can be reused across runs
✅ **Comprehensive Coverage**: Tests all three conditional form flows
✅ **Detailed Failure Reporting**: Shows exactly where and why tests fail
✅ **Realistic Data**: Uses faker to generate realistic user inputs
✅ **Type Safe**: Full TypeScript support with proper types
✅ **Accessible**: Follows all a11y guidelines from copilot-instructions.md
✅ **Maintainable**: Helper functions for common actions (filling person details, etc.)

## Test Data Schema

### PersonTestData
```typescript
{
  firstName: string;
  middleName: string;
  lastName: string;
  hadOtherSurname: "yes" | "no";
  otherSurname?: string;
  dateOfBirth: string;          // "DD MMM YYYY"
  address: string;
  nationalRegistrationNumber: string;  // "XXXXXX-XXXX"
  passportNumber?: string;
  passportPlaceOfIssue?: string;
  occupation: string;
}
```

### ChildTestData
```typescript
{
  firstNames: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;           // "DD MMM YYYY"
  sexAtBirth: "Male" | "Female";
  parishOfBirth: string;
}
```

### ContactTestData
```typescript
{
  email: string;
  phoneNumber: string;            // "+1-246-XXX-XXXX"
  wantContact: "yes" | "no";
}
```

## Troubleshooting

### Test Timeouts

**Problem**: `Timeout waiting for selector`

**Solution**: Ensure the dev server is running:
```bash
npm run dev
```

### Form Not Loading

**Problem**: Tests reach form but selectors don't match

**Solution**: Check form HTML structure matches the selectors in test. Update selectors if form structure changes.

### Faker Data Issues

**Problem**: Generated phone numbers or NRNs don't match expected format

**Solution**: Faker data generation functions are in `tests/fixtures/register-birth-data.ts`. Verify format validation logic.

## CI/CD Integration

The tests are configured to run in CI environments:

```bash
npm run test:e2e  # Uses playwright.config.ts settings
```

In CI, tests:
- Run against the production build (`npm run start`)
- Use 2 concurrent workers
- Retry flaky tests once
- Generate HTML reports

## Extending the Tests

### Adding Additional Test Scenarios

1. Create a new test profile generator in `register-birth-data.ts`:
```typescript
export function generateCustomScenario(): CustomTestProfile {
  // Custom data generation
}
```

2. Add a new test function:
```typescript
async function testCustomFlow(page, profile): Promise<TestResult> {
  // Test implementation
}
```

3. Add a new test case in the describe block

### Updating Form Field Selectors

If form fields change, update the selectors in:
- `fillPersonDetails()` function
- `testMarriedParentsFlow()`, `testUnmarriedWithoutFatherFlow()`, etc.

### Adding Validation Steps

Add `expect()` statements to verify form behavior:
```typescript
await expect(page.locator("text=Enter a valid date")).toBeVisible();
```

## Related Documentation

- **Form Component**: `src/components/forms/register-birth/register-birth-form.tsx`
- **Form Schema**: `src/components/forms/register-birth/schema.ts`
- **Form Types**: `src/components/forms/register-birth/types.ts`
- **Form Steps**: `src/components/forms/register-birth/use-register-birth-steps.ts`
- **Accessibility Rules**: `.github/copilot-instructions.md`

## Dependencies

- `@playwright/test`: ^1.55.1
- `@faker-js/faker`: ^8.0.0 (newly added)
- `zod`: ^4.1.12 (for validation schemas)

## Performance Notes

- Each test run generates new faker data: ~50ms
- Test execution time: ~30-60s per flow (depending on network)
- Test profiles are saved for audit trail
- CI runs with 2 workers by default

## Maintenance

Regular maintenance tasks:

1. **Update Selectors**: When form HTML changes
2. **Refresh Test Data**: Generate new profiles periodically
3. **Review Failures**: Check CI reports for flaky tests
4. **Update Validations**: When form validation rules change
5. **Audit Accessibility**: Ensure tests align with a11y guidelines

---

**Last Updated**: November 2024
**Test Suite Version**: 1.0.0
**Tested Against**: Register Birth Form v1.0
