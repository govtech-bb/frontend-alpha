# Spec: Primary School Textbook Grant — School select and email routing

**Version:** 1.0  
**Service:** Get a primary school textbook grant  
**Form key:** `primary-school-textbook-grant`

---

## 1. Summary

Add a **school select** to the primary school textbook grant form so applicants choose the child’s school. Each school has a **principal email**; the application must be **sent to that email** when the form is submitted.

**Scope:**

- Frontend: school dropdown in “Tell us about the child” (one school per child when multiple children are added).
- Data: canonical list of primary schools with names and principal emails.
- Backend: resolve selected school → email and send the application to that address.

---

## 2. User-facing behaviour

| Aspect | Requirement |
|--------|-------------|
| **Where** | “Child’s school” is a **select/dropdown** in step **“Tell us about the child”**, after “Which class are they currently in?”. |
| **Options** | List of all primary schools (by name). First option is “Select a school” (empty value). |
| **Validation** | Required: “Please select the child's school”. |
| **Hint** | “The application will be sent to the principal of this school for review.” |
| **Per child** | When the user adds more than one child, **each child has their own school** selection (step is repeatable: `beneficiaries`). |

---

## 3. Data model

### 3.1 School list

- **Source:** One row per school: **name**, **location** (parish), **principal email**.
- **Canonical source in repo:** `src/data/primary-schools.ts` (array `schoolsWithEmails`).
- **Slug:** Stable value stored in the form = email **local part** (before `@`) **lowercased**.  
  Example: `ADacostaEdwardsPrimary@mes.gov.bb` → slug `adacostaedwardsprimary`.  
  Used so the client does not expose full emails; backend resolves slug → email.

### 3.2 Exports from `src/data/primary-schools.ts`

| Export | Type | Purpose |
|--------|------|--------|
| `primarySchoolsSelectOptions` | `SelectOption[]` | Dropdown options: `label` = school name, `value` = slug. First option is `{ label: "Select a school", value: "" }`. |
| `primarySchoolEmailBySlug` | `Record<string, string>` | Map slug → principal email. Used by backend when sending the application. |

### 3.3 Form field

| Field name | Type | Step | Repeatable | Description |
|------------|------|------|------------|-------------|
| `school` | `select` | Tell us about the child | Yes (per `beneficiaries` item) | Selected school slug (e.g. `adacostaedwardsprimary`). |

---

## 4. Submission payload

Form posts to:

`POST {NEXT_PUBLIC_PROCESSING_API}/forms/primary-school-textbook-grant/submit`

Body (relevant parts):

- `beneficiaries`: array of child objects.
- Each beneficiary includes:
  - `school`: **string** — selected school slug (e.g. `"adacostaedwardsprimary"`). **Required.**

Example (one child):

```json
{
  "beneficiaries": [
    {
      "firstName": "...",
      "lastName": "...",
      "classNumber": "2",
      "school": "adacostaedwardsprimary",
      ...
    }
  ],
  ...
}
```

---

## 5. Backend requirements (email routing)

The **processing API** (or form-specific handler) must:

1. **Read** `beneficiaries` from the request body.
2. **For each beneficiary** (or for the first only, depending on product rule):
   - Read `beneficiary.school` (slug).
   - Resolve **slug → email** using the same mapping as the frontend (see below).
   - If slug is missing or unknown, treat as **400** (invalid/missing school).
3. **Send** the application email to the resolved principal email(s):
   - One email per school, or one email per application to the first child’s school, as per product decision.
   - Use existing email mechanism (e.g. SES); same pattern as `src/app/api/send-feedback/route.ts`.

**Resolving slug → email:**

- **In this repo:**  
  `import { primarySchoolEmailBySlug } from "@/data/primary-schools";`  
  `const toEmail = primarySchoolEmailBySlug[slug];`
- **In a separate processing service:**  
  Either copy/maintain the same mapping (e.g. from the same CSV or from `primary-schools.ts`), expose it via an API from this app, or store it in config/DB. The contract is: **slug (lowercase email local part) → full principal email**.

---

## 6. Files changed / added

| File | Change |
|------|--------|
| `src/data/primary-schools.ts` | **New.** School list, `primarySchoolsSelectOptions`, `primarySchoolEmailBySlug`. |
| `src/schema/primary-school-textbook-grant.ts` | **Modified.** Import `primarySchoolsSelectOptions`; add `school` select field after `classNumber` in first step. |
| `docs/primary-school-textbook-grant-email-routing.md` | **New.** Implementation notes for email routing (optional reading). |

No changes to form component, form registry, or content — the form is schema-driven and already supports `select` and repeatable steps.

---

## 7. Updating the school list

- Edit **`src/data/primary-schools.ts`**.
- Update the **`schoolsWithEmails`** array (add/remove/change rows). Each row: `{ school: string, location: string, email: string }`.
- **Slug** is derived as the email local part, lowercased. Keep **emails unique** so slugs stay unique.
- No other code changes needed; `primarySchoolsSelectOptions` and `primarySchoolEmailBySlug` are derived from this array.

---

## 8. Acceptance criteria

- [ ] In “Tell us about the child”, a “Child’s school” dropdown appears after “Which class are they currently in?”.
- [ ] Dropdown lists all primary schools (by name), with “Select a school” as first option.
- [ ] Submitting without selecting a school shows: “Please select the child's school.”
- [ ] When multiple children are added, each has their own school dropdown and value.
- [ ] Submitted payload includes `beneficiaries[].school` with the selected slug (e.g. `adacostaedwardsprimary`).
- [ ] Backend can resolve each slug to a principal email via `primarySchoolEmailBySlug` (or equivalent) and send the application to that email.
- [ ] Unknown or missing `school` slug is rejected by the backend (e.g. 400).

---

## 9. Reference: backend example (in this app)

If handling this form in `src/app/forms/[formKey]/submit/route.ts` when `formKey === "primary-school-textbook-grant"`:

```ts
import { primarySchoolEmailBySlug } from "@/data/primary-schools";

// In POST handler:
const body = await request.json();
const beneficiaries = body.beneficiaries ?? [];
const firstBeneficiary = beneficiaries[0];
const schoolSlug = firstBeneficiary?.school;
const toEmail = schoolSlug ? primarySchoolEmailBySlug[schoolSlug] : undefined;

if (!toEmail) {
  return NextResponse.json(
    { success: false, message: "Invalid or missing school" },
    { status: 400 }
  );
}

// Build HTML/text from body and send via SES (or your email path) to toEmail
await sendEmail({ to: toEmail, subject: "...", html: "..." });
```

For “one email per child/school”, loop over `beneficiaries` and resolve/send per `beneficiary.school`.
