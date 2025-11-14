# Test Architecture & Design

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEST EXECUTION PIPELINE                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  beforeAll()     │
│  ────────────    │
│ • Generate 3     │
│   test profiles  │
│ • Save to disk   │
└────────┬─────────┘
         │
         ▼
    ┌────────┐
    │ Faker  │
    │  API   │
    └────┬───┘
         │
         ├─→ generateMarriedParentsProfile()
         ├─→ generateUnmarriedWithoutFatherProfile()
         └─→ generateUnmarriedWithFatherProfile()
         │
         ▼
    ┌─────────────────────────────┐
    │  Test Data Generation       │
    │ ───────────────────────────  │
    │ PersonDetails               │
    │ ├─ Names (faker)            │
    │ ├─ Dates (faker)            │
    │ ├─ NRN (faker)              │
    │ └─ Occupation (faker)       │
    │                              │
    │ ChildDetails                │
    │ ├─ Names (faker)            │
    │ ├─ Birth date (faker)       │
    │ ├─ Parish (hardcoded list)  │
    │ └─ Sex (faker boolean)      │
    │                              │
    │ ContactData                 │
    │ ├─ Email (faker)            │
    │ ├─ Phone (faker)            │
    │ └─ Preferences (faker)      │
    └──────────┬────────────────────┘
               │
               ▼
    ┌─────────────────────────────┐
    │  Save to Disk               │
    │ ───────────────────────────  │
    │ tests/test-data/            │
    │  profiles-TIMESTAMP.json    │
    └─────────────────────────────┘
               │
         ┌─────┼─────┐
         │     │     │
         ▼     ▼     ▼
    ┌───────┬──────┬───────┐
    │ Test1 │ Test2│ Test3 │
    └───┬───┴──┬───┴───┬───┘
        │      │       │
        ▼      ▼       ▼
   ┌─────────────────────────────┐
   │  testMarriedParentsFlow()   │
   ├─────────────────────────────┤
   │ 1. Navigate to /register-  │
   │    birth                    │
   │ 2. Select marriage: yes     │
   │ 3. Fill father details      │
   │ 4. Fill mother details      │
   │ 5. Fill child details       │
   │ 6. Enter certificates       │
   │ 7. Enter contact info       │
   │ 8. Verify check answers     │
   │                              │
   │ Returns: TestResult {        │
   │  passed: boolean             │
   │  errors: string[]            │
   │  stepsCompleted: number      │
   │ }                            │
   └──────────┬────────────────────┘
              │
         ┌────┴───────────────┐
         │                    │
         ▼                    ▼
    ┌─────────────┐    ┌──────────────┐
    │ PASSED ✓    │    │ FAILED ✗     │
    └─────────────┘    │              │
                       │ Errors:      │
                       │ [1] Timeout  │
                       │ [2] Missing  │
                       │     element  │
                       └──────────────┘
         │                    │
         └────────┬───────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │  afterAll()                 │
    │  ────────────────────────── │
    │ • Collect all TestResults   │
    │ • Generate report           │
    │ • Print summary             │
    └─────────────────────────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │  TEST REPORT                │
    ├─────────────────────────────┤
    │ Total Tests: 3              │
    │ Passed: X ✓                 │
    │ Failed: Y ✗                 │
    │                              │
    │ Details per test:            │
    │ - Scenario name              │
    │ - Steps completed            │
    │ - Errors (if any)            │
    │ - Warnings (if any)          │
    └─────────────────────────────┘
```

---

## 🔄 Form Flow Paths

### Path A: Married Parents

```
START
  │
  ▼
Marriage Status: "yes"
  │
  ├─→ Skip "Include Father?" question
  │   (Father details always included for married)
  │
  ▼
Enter Father's Details
  │
  ▼
Enter Mother's Details
  │
  ▼
Enter Child's Details
  │
  ▼
Number of Certificates
  │
  ▼
Contact Information
  │
  ▼
Review (Check Answers)
  │
  ▼
END
```

### Path B: Unmarried Without Father

```
START
  │
  ▼
Marriage Status: "no"
  │
  ▼
Include Father's Details: "no"
  │
  ├─→ Skip father details step
  │
  ▼
Enter Mother's Details (only)
  │
  ▼
Enter Child's Details
  │
  ▼
Number of Certificates
  │
  ▼
Contact Information
  │
  ▼
Review (Check Answers)
  │
  ▼
END
```

### Path C: Unmarried With Father

```
START
  │
  ▼
Marriage Status: "no"
  │
  ▼
Include Father's Details: "yes"
  │
  ▼
Enter Father's Details
  │
  ▼
Enter Mother's Details
  │
  ▼
Enter Child's Details
  │
  ▼
Number of Certificates
  │
  ▼
Contact Information
  │
  ▼
Review (Check Answers)
  │
  ▼
END
```

---

## 📋 Test Result Object

```typescript
type TestResult = {
  scenario: "married-parents" | "unmarried-without-father" | "unmarried-with-father";
  passed: boolean;                    // Overall pass/fail
  errors: string[];                   // Array of error messages
  warnings: string[];                 // Array of warning messages
  stepsCompleted: number;             // e.g., 5 (out of 8 or 9)
  totalSteps: number;                 // 8 or 9 depending on flow
};
```

### Example Result

```javascript
{
  scenario: "married-parents",
  passed: false,
  errors: [
    "Test failed at step 4: Timeout waiting for selector: input[name='child-firstName']"
  ],
  warnings: [
    "Phone number format may not match validation"
  ],
  stepsCompleted: 3,
  totalSteps: 8
}
```

---

## 🎯 Test Execution Sequence

```
For each test:
  1. beforeAll() hook
     ├─ Generate all test data
     └─ Save to disk
  │
  2. Test Suite Execution
     ├─ test("should complete Path A...")
     │  ├─ browser.goto("/register-birth")
     │  ├─ testMarriedParentsFlow(page, profile)
     │  │  ├─ Step 1: Marriage Status
     │  │  ├─ Step 2: Father Details
     │  │  ├─ Step 3: Mother Details
     │  │  ├─ Step 4: Child Details
     │  │  ├─ Step 5: Certificates
     │  │  ├─ Step 6: Contact Info
     │  │  ├─ Step 7: Review
     │  │  └─ Return TestResult
     │  ├─ push result to testResults[]
     │  └─ expect(result.errors.length).toBe(0)
     │
     ├─ test("should complete Path B...")
     │  └─ [Same as Path A, different flow]
     │
     └─ test("should complete Path C...")
        └─ [Same as Path A, different flow]
  │
  3. afterAll() hook
     ├─ Collect all TestResult objects
     ├─ Calculate pass/fail counts
     ├─ Generate formatted report
     └─ Print to console
```

---

## 🔌 Faker API Usage

```typescript
// Numbers
faker.number.int({ min: 1, max: 5 })
  // Generates random integer between 1-5
  // Result: 3

// Strings
faker.person.firstName()
  // Generates random first name
  // Result: "Michael"

faker.string.alphanumeric(9)
  // Generates random 9-character alphanumeric
  // Result: "a7k3mP9xQ"

// Addresses & Contact
faker.location.streetAddress()
  // Generates random street address
  // Result: "123 Main Street"

faker.internet.email()
  // Generates random email
  // Result: "john.doe@example.com"

// Dates
Math.random() * (maxDate - minDate) + minDate
  // Custom date range generation (not using faker birthdate)
  // Result: Date object

// Arrays
faker.datatype.boolean()
  // Generates random true/false
  // Result: true

faker.helpers.arrayElement(BARBADOS_PARISHES)
  // Picks random element from array
  // Result: "Saint Michael"

faker.helpers.replaceSymbols("+1-246-###-####")
  // Replaces # with random digits
  // Result: "+1-246-555-0142"
```

---

## 🧪 Form Fill Flow

```typescript
async fillPersonDetails(page, person, personType) {
  page.fill(`input[name="${personType}-firstName"]`, person.firstName)
    ↓
  page.fill(`input[name="${personType}-middleName"]`, person.middleName)
    ↓
  page.fill(`input[name="${personType}-lastName"]`, person.lastName)
    ↓
  page.click(`input[value="${person.hadOtherSurname}"][name="${personType}-hadOtherSurname"]`)
    ↓
  (if hadOtherSurname === "yes")
    page.fill(`input[name="${personType}-otherSurname"]`, person.otherSurname)
    ↓
  page.fill(`input[name="${personType}-dateOfBirth"]`, person.dateOfBirth)
    ↓
  page.fill(`input[name="${personType}-address"]`, person.address)
    ↓
  page.fill(`input[name="${personType}-nationalRegistrationNumber"]`, person.nrn)
    ↓
  (if passportNumber)
    page.fill(`input[name="${personType}-passportNumber"]`, person.passportNumber)
    page.fill(`input[name="${personType}-passportPlaceOfIssue"]`, person.passportPlaceOfIssue)
    ↓
  page.fill(`input[name="${personType}-occupation"]`, person.occupation)
    ↓
  Return [any errors]
}
```

---

## 📊 Test Coverage Matrix

|  | Path A | Path B | Path C |
|--|--------|--------|--------|
| Marriage Status | ✓ yes | ✓ no | ✓ no |
| Include Father | - | ✓ no | ✓ yes |
| Father Details | ✓ filled | ✗ skipped | ✓ filled |
| Mother Details | ✓ filled | ✓ filled | ✓ filled |
| Child Details | ✓ filled | ✓ filled | ✓ filled |
| Certificates | ✓ 1-5 | ✓ 1-5 | ✓ 1-5 |
| Contact Info | ✓ all | ✓ all | ✓ all |
| Total Steps | 8 | 8 | 9 |

---

## 🚨 Error Handling

```typescript
try {
  // Attempt to fill form
  await page.fill(selector, value);
} catch (error) {
  // Add to errors array
  errors.push(`Failed: ${error.message}`);
  // Continue to next step (don't throw)
}

// After test
if (result.errors.length > 0) {
  console.error("Test failed:");
  for (const error of result.errors) {
    console.error(`  - ${error}`);
  }
}
```

---

## 💾 Data Persistence

```
Test Run Start
    ↓
Generate new profiles
    ↓
Save to: tests/test-data/profiles-2024-11-14T12-30-45-123Z.json
    ├─ [profile_1]
    ├─ [profile_2]
    └─ [profile_3]
    ↓
Run 3 tests using these profiles
    ↓
All data preserved for:
  ├─ Audit trail
  ├─ Future reuse
  ├─ Debugging
  └─ Reproducibility

Next Run:
  ├─ Generate NEW profiles (different data)
  ├─ Save with new timestamp
  └─ Run tests with new data
```

---

## ✅ Validation Checkpoints

```
Per Step Validation:

Step 1: Marriage Status
  ├─ Check "yes" or "no" radio visible
  ├─ Check click works
  └─ Check "Next" button enabled

Step 2: Father Details (Path A/C only)
  ├─ Check all input fields visible
  ├─ Check form fills correctly
  ├─ Check required fields flagged if empty
  └─ Check navigation works

Step 3-6: Similar validation for each step

Step 7: Check Answers
  ├─ Verify all entered data displays
  ├─ Check edit buttons work
  └─ Check submit button visible
```

---

**Architecture Version**: 1.0  
**Last Updated**: November 14, 2024  
**Status**: ✅ Production Ready
