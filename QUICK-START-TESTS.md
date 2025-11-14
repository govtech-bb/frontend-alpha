## 📋 Quick Start Guide - Register Birth Form Tests

### Installation (One-time)

```bash
# Navigate to project
cd /Users/shannonclarke/Documents/development/govtech-barbados/alpha-preview

# Install dependencies (already done via npm install --save-dev @faker-js/faker)
npm install

# Build the project
npm run build
```

### Run Tests

```bash
# Run all e2e tests including register birth form tests
npm run test:e2e

# Or run only register birth form tests
npx playwright test register-birth-form.spec.ts

# Run with debugging/stepping
npx playwright test register-birth-form.spec.ts --debug

# View HTML report after running tests
npx playwright show-report
```

---

## 🎯 What the Tests Do

### Test Execution Flow

```
Start Tests
    ↓
Generate 3 Faker Profiles (one for each form flow)
    ↓
Save Profiles to tests/test-data/profiles-TIMESTAMP.json
    ↓
├─→ Test 1: Path A (Married Parents)
│   ├─ Navigate to /register-birth
│   ├─ Fill 8 steps of form
│   ├─ Validate each step completes
│   └─ Report result
    ↓
├─→ Test 2: Path B (Unmarried Without Father)
│   ├─ Navigate to /register-birth
│   ├─ Fill 8 steps (skip father step)
│   ├─ Validate each step completes
│   └─ Report result
    ↓
└─→ Test 3: Path C (Unmarried With Father)
    ├─ Navigate to /register-birth
    ├─ Fill 9 steps (include father step)
    ├─ Validate each step completes
    └─ Report result
    ↓
Generate Test Report (show summary)
```

---

## 📊 Test Data Generation Example

Each test gets **realistic faker data**:

```typescript
// Example generated profile for Path A
{
  "scenario": "married-parents",
  "marriageStatus": "yes",
  "includeFatherDetails": "",
  
  "father": {
    "firstName": "Michael",
    "middleName": "James",
    "lastName": "Thompson",
    "hadOtherSurname": "no",
    "dateOfBirth": "15 Mar 1978",        // Age 46
    "address": "123 Main Street, Bridgetown",
    "nationalRegistrationNumber": "782345-6789",
    "occupation": "Software Engineer"
  },
  
  "mother": {
    "firstName": "Sarah",
    "middleName": "Elizabeth",
    "lastName": "Bennett",
    "hadOtherSurname": "no",
    "dateOfBirth": "22 Jul 1980",        // Age 44
    "address": "456 Oak Avenue, St. Michael",
    "nationalRegistrationNumber": "801234-5678",
    "occupation": "Nurse"
  },
  
  "child": {
    "firstNames": "David",
    "middleNames": "Christopher",
    "lastName": "Thompson",
    "dateOfBirth": "12 Nov 2022",        // Age 2
    "sexAtBirth": "Male",
    "parishOfBirth": "Saint Michael"
  },
  
  "numberOfCertificates": 3,
  
  "contact": {
    "email": "michael.thompson@example.com",
    "phoneNumber": "+1-246-555-0142",
    "wantContact": "yes"
  }
}
```

---

## ✅ Expected Test Output

### Success Output
```
✓ Test profiles saved to: tests/test-data/profiles-2024-11-14T12-30-45-123Z.json

Step 1: Setting marriage status to 'yes'...
Step 2: Filling father's details...
Step 3: Filling mother's details...
Step 4: Filling child's details...
Step 5: Setting number of certificates...
Step 6: Filling contact information...
Step 7: Checking form review page...
✓ Path A (Married Parents) test completed successfully!

...

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

### Failure Output
```
✗ Path A test failed: Test failed at step 5: Timeout waiting for selector: input[name="numberOfCertificates"]

────────────────────────────────────────────────────────────
Test 1: married-parents - FAILED ✗
Steps Completed: 4/8

Errors:
  1. Test failed at step 5: Timeout waiting for selector: input[name="numberOfCertificates"]

Warnings:
  None
────────────────────────────────────────────────────────────

Summary: 2 passed, 1 failed
```

---

## 🔍 Understanding Test Failures

### Common Failures and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Timeout waiting for selector` | Element not found | Verify form HTML structure, update selectors |
| `Could not fill input` | Field doesn't exist | Check if form step rendered correctly |
| `Timeout waiting for navigation` | Form not submitting | Verify form validation passes |
| `Element not visible` | Element hidden/covered | Check page layout and overlays |

### Debug Tips

```bash
# Run single test with tracing enabled
npx playwright test register-birth-form.spec.ts --trace on

# Step through test interactively
npx playwright test register-birth-form.spec.ts --debug

# Check test output in detail
npx playwright test register-birth-form.spec.ts --verbose
```

---

## 📁 Files and Directories

```
tests/
├── register-birth-form.spec.ts          ← Main test file (609 lines)
├── fixtures/
│   └── register-birth-data.ts           ← Data generation (285 lines)
├── test-data/                           ← Generated profiles (created at runtime)
│   └── profiles-2024-11-14T*.json       ← Example saved profile
└── README-REGISTER-BIRTH-TESTS.md       ← Full documentation
```

---

## 🔄 Reproducibility

**How to reuse a specific test profile:**

1. Find the profile JSON file in `tests/test-data/`
2. Manually copy the data into a test
3. Replace the faker generation with the hardcoded data

**Example:**
```typescript
// Instead of generating new data
const profile = generateMarriedParentsProfile();

// Use saved data
const profile = {
  scenario: "married-parents",
  // ... data from JSON file
};
```

---

## 📈 Test Coverage

### Form Fields Tested

**Person Details (Father/Mother/Guardian)**
- ✅ First name
- ✅ Middle name
- ✅ Last name
- ✅ Had other surname (yes/no)
- ✅ Other surname (if applicable)
- ✅ Date of birth (DD MMM YYYY format)
- ✅ Current address
- ✅ National Registration Number (XXXXXX-XXXX)
- ✅ Passport number & place of issue (optional)
- ✅ Occupation

**Child Details**
- ✅ First names
- ✅ Middle names
- ✅ Last name
- ✅ Date of birth (DD MMM YYYY format)
- ✅ Sex at birth (Male/Female)
- ✅ Parish of birth (11 valid parishes)

**Application Details**
- ✅ Number of certificates (1-5)
- ✅ Email address
- ✅ Phone number
- ✅ Want contact (yes/no)
- ✅ Marriage status (yes/no)
- ✅ Include father details (yes/no) - conditional

---

## 🚀 CI/CD Integration

The tests are designed to run in CI/CD pipelines:

```bash
# In CI environment
npm install
npm run build
npm run test:e2e
```

**CI Configuration** (from `playwright.config.ts`):
- Runs against production build
- 2 concurrent workers
- Retries flaky tests once
- Generates HTML reports

---

## 📝 Notes for Developers

### Adding New Test Cases

1. Create new profile generator in `fixtures/register-birth-data.ts`
2. Add test function in `register-birth-form.spec.ts`
3. Add test case in the describe block
4. Run tests and verify output

### Updating Form Selectors

If form HTML changes:
1. Update selectors in `fillPersonDetails()` function
2. Update selectors in each flow test function
3. Re-run tests to verify

### Maintaining Test Data

- Generated profiles are saved automatically
- Keep test data directory for auditing
- Profile JSON files show exactly what was tested
- Delete old profiles if space is needed

---

## 🎓 Learn More

- **Form Implementation**: `src/components/forms/register-birth/`
- **Full Test Docs**: `tests/README-REGISTER-BIRTH-TESTS.md`
- **Playwright Docs**: https://playwright.dev/docs/intro
- **Faker Docs**: https://fakerjs.dev/

---

**Last Updated**: November 14, 2024  
**Status**: ✅ Ready to Run  
**All Tests Passing**: ✅ Yes (if form is working correctly)
