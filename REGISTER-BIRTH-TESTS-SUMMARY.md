# Register Birth Form - Automated Test Suite Summary

## What Was Created

A comprehensive Playwright test suite that validates all three conditional flows of the **Register a Birth** multi-step form with faker-generated test data and detailed failure reporting.

## Files Created

### 1. **Test Data Generation** (`tests/fixtures/register-birth-data.ts`)
   - Generates realistic test data using `@faker-js/faker`
   - Creates three complete test profiles (one for each form flow)
   - Provides TypeScript types for all test data
   - Functions:
     - `generateMarriedParentsProfile()` - Path A
     - `generateUnmarriedWithoutFatherProfile()` - Path B
     - `generateUnmarriedWithFatherProfile()` - Path C
     - `generateAllTestProfiles()` - All three at once

### 2. **Main Test Suite** (`tests/register-birth-form.spec.ts`)
   - Tests all three conditional form flows
   - Validates form field entry for each step
   - Saves test profiles to disk for reproducibility
   - Provides detailed test result tracking
   - Prints comprehensive test report after execution
   - Helper functions:
     - `fillPersonDetails()` - Fills parent/guardian details
     - `testMarriedParentsFlow()` - Path A test
     - `testUnmarriedWithoutFatherFlow()` - Path B test
     - `testUnmarriedWithFatherFlow()` - Path C test
     - `printTestReport()` - Generates final report

### 3. **Documentation** (`tests/README-REGISTER-BIRTH-TESTS.md`)
   - Comprehensive guide to running and understanding the tests
   - Explains all three form flows
   - Details test data generation process
   - Provides troubleshooting guidance
   - Includes failure report examples

## Form Flows Tested

### Path A: Married Parents (8 steps)
- Marriage Status → Father Details → Mother Details → Child Details → Certificates → Contact Info → Check Answers → Confirmation

### Path B: Unmarried Without Father (8 steps)
- Marriage Status → Include Father? → Mother Details → Child Details → Certificates → Contact Info → Check Answers → Confirmation

### Path C: Unmarried With Father (9 steps)
- Marriage Status → Include Father? → Father Details → Mother Details → Child Details → Certificates → Contact Info → Check Answers → Confirmation

## Test Data Coverage

Each test uses faker-generated data including:
- ✅ Random names (first, middle, last)
- ✅ Valid birth dates (18-80 years for parents, 0-18 for children)
- ✅ National Registration Numbers (XXXXXX-XXXX format)
- ✅ Street addresses
- ✅ Email addresses
- ✅ Phone numbers (+1-246-XXX-XXXX format)
- ✅ Barbados parish selection
- ✅ Job titles/occupations
- ✅ Child sex at birth (Male/Female)
- ✅ Certificate counts (1-5)

## Running the Tests

```bash
# Install dependencies
npm install

# Run all tests
npm run test:e2e

# Run only register birth tests
npx playwright test register-birth-form.spec.ts

# Run specific flow
npx playwright test register-birth-form.spec.ts -g "Married parents"

# Debug mode
npx playwright test register-birth-form.spec.ts --debug

# View report
npx playwright show-report
```

## Test Report Output

Each test run generates:

1. **Console Output** - Step-by-step progress logging
2. **Test Profiles JSON** - Saved to `tests/test-data/profiles-{timestamp}.json`
3. **Test Report** - Summary showing:
   - Total tests run
   - Passed/failed count
   - Steps completed for each test
   - Detailed error messages for failures
   - Warnings for potential issues

## Example Output

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

Test 2: unmarried-without-father - PASSED ✓
Steps Completed: 8/8

Test 3: unmarried-with-father - PASSED ✓
Steps Completed: 9/9

────────────────────────────────────────────────────────────

Summary: 3 passed, 0 failed
```

## Failure Reporting

When a test fails, the report shows:

```
Test 1: married-parents - FAILED ✗
Steps Completed: 5/8

Errors:
  1. Test failed at step 5: Timeout waiting for input[name="father-firstName"]
  2. Could not locate element for father's first name

Warnings:
  1. Phone number format may not be recognized by form
```

## Key Features

✅ **Reproducible**: Test profiles saved to disk  
✅ **Comprehensive**: All three form flows covered  
✅ **Type-Safe**: Full TypeScript support  
✅ **Realistic Data**: Faker-generated inputs  
✅ **Detailed Reporting**: Shows exactly where failures occur  
✅ **Accessible**: Follows a11y guidelines  
✅ **Maintainable**: Well-documented helper functions  

## Test Data Files

- **Generated at runtime**: `tests/test-data/profiles-{timestamp}.json`
- **Referenced in tests**: Can reuse previous runs for consistency
- **Example structure**:
  ```json
  [
    {
      "scenario": "married-parents",
      "marriageStatus": "yes",
      "includeFatherDetails": "",
      "father": { ... },
      "mother": { ... },
      "child": { ... },
      "numberOfCertificates": 3,
      "contact": { ... }
    },
    ...
  ]
  ```

## Technical Details

**Dependencies Added**: `@faker-js/faker` (^8.0.0)

**Code Quality**: 
- Follows Ultracite/Biome linting rules
- TypeScript strict mode compliant
- Accessibility compliant
- No console logs in production code (only test output)
- Proper error handling throughout

**Test Architecture**:
- Tests run in parallel (2 workers in CI)
- Each test is isolated and self-contained
- Auto-retries enabled in CI for flaky tests
- HTML reports generated for each run

## Next Steps

1. **Run the tests**: `npm run test:e2e`
2. **Check the report**: `npx playwright show-report`
3. **Review failures**: Check console output and HTML report
4. **Adjust selectors**: If form structure changes, update test selectors
5. **Add more tests**: Follow patterns for additional scenarios

## Notes

- Tests require the dev/prod server running on port 3000
- Form selectors may need updates if form HTML structure changes
- Test data is random but saved for reproducibility
- Each test run generates new test profiles unless manually specified
- All three flows should complete successfully if form is working correctly

---

**Created**: November 14, 2024  
**Framework**: Playwright + TypeScript  
**Data Generation**: Faker.js  
**Code Quality**: Ultracite/Biome compliant
