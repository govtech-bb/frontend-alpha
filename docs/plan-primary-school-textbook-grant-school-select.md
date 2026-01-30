# Implementation plan: Primary School Textbook Grant — School select

**Spec:** Primary School Textbook Grant — School select and email routing (e.g. `spec-primary-school-textbook-grant-school-select.md`)  
**Goal:** Add school dropdown per child and route submission to principal email.

---

## Summary

| Area | Scope |
|------|--------|
| **Frontend** | One new data file + one schema change. No form component or content edits. |
| **Backend** | Slug → email lookup and send (in processing API; optional doc in repo). |
| **Tests** | E2E: include `school` in generated child data and assertions. |

The form is **schema-driven**: adding the `school` select field will automatically give you the dropdown, validation, repeatable behaviour per child, and `beneficiaries[].school` in the payload. No changes to form components or content are required.

---

## Implementation order (most efficient)

### 1. Data layer (single source of truth)

**Add** `frontend-alpha/src/data/primary-schools.ts`:

- Define **`schoolsWithEmails`**: array of `{ school: string, location: string, email: string }`.
  - Use real data if available; otherwise start with a small placeholder set (e.g. 3–5 schools) so the UI and backend can be tested. Slug = email local part lowercased (e.g. `ADacostaEdwardsPrimary@mes.gov.bb` → `adacostaedwardsprimary`).
- **Export** `primarySchoolsSelectOptions`: `SelectOption[]`
  - First option: `{ label: "Select a school", value: "" }`.
  - Rest: one per school, `label` = school name, `value` = slug.
  - Derive from `schoolsWithEmails` so one array drives both dropdown and email map.
- **Export** `primarySchoolEmailBySlug`: `Record<string, string>` (slug → principal email), derived from `schoolsWithEmails`.

**Why first:** Everything else depends on this. One file, no UI, easy to review and extend later.

---

### 2. Schema (form behaviour + payload)

**Edit** `frontend-alpha/src/schema/primary-school-textbook-grant.ts`:

- Add import: `primarySchoolsSelectOptions` from `@/data/primary-schools`.
- In the **“Tell us about the child”** step, insert a new **`school`** field **after** the existing **`classNumber`** field:
  - `name`: `"school"`
  - `label`: `"Child's school"`
  - `type`: `"select"`
  - `options`: `primarySchoolsSelectOptions`
  - `validation`: `{ required: "Please select the child's school." }`
  - `hint`: `"The application will be sent to the principal of this school for review."`

**Why second:** Single file change. The step is already repeatable (`beneficiaries`), so each child automatically gets their own school dropdown. Check-your-answers and submit payload will include `beneficiaries[].school` without further code.

---

### 3. Backend (processing API)

**Contract:**

- POST body includes `beneficiaries[].school` (slug string).
- For each beneficiary (or first only, per product rule): resolve slug via `primarySchoolEmailBySlug` (or equivalent in the processing service), then send the application email to that address.
- If slug is missing or not in the map → **400** with a clear message (e.g. “Invalid or missing school”).

**Where to implement:**

- If the processing API lives in **this repo**: add a form-specific branch (e.g. in `src/app/forms/[formKey]/submit/route.ts` or similar) for `formKey === "primary-school-textbook-grant"`, and use `import { primarySchoolEmailBySlug } from "@/data/primary-schools"` for the lookup.
- If the processing API is **another service**: either copy/maintain the same slug→email mapping (e.g. from CSV or from this repo’s `primary-schools.ts`), or expose the map via an API from this app. No frontend changes.

**Why third:** Frontend is usable as soon as 1 and 2 are done; backend can be done in parallel or after, depending on where the submit handler lives.

---

### 4. Docs (optional but useful)

**Ensure** `frontend-alpha/docs/primary-school-textbook-grant-email-routing.md` exists and matches the spec (it already describes `primarySchoolsSelectOptions`, `primarySchoolEmailBySlug`, and how to send to the principal). Update if the spec diverges. No code impact.

---

### 5. E2E tests

**Edit** `frontend-alpha/tests/e2e/forms/primary-school-textbook-grant.spec.ts`:

- In **`generateChildData()`**, add **`school`** with a valid slug (e.g. pick the first non-empty option from the same list the form uses, or a known slug from `primarySchoolsSelectOptions`).
- In the “Tell us about the child” flow, **select the school** in the dropdown (e.g. by label “Child's school” and then choose an option), so submission includes `beneficiaries[].school`.
- Optionally assert that the submitted payload contains `beneficiaries[].school` with the chosen slug.

**Why last:** Unblocks manual testing earlier; E2E can be updated once the dropdown and slug list are stable. Tests are currently skipped; when re-enabled, they should include school to avoid validation failures.

---

## Files to add/change (checklist)

| File | Action |
|------|--------|
| `src/data/primary-schools.ts` | **Add** – school list, `primarySchoolsSelectOptions`, `primarySchoolEmailBySlug` |
| `src/schema/primary-school-textbook-grant.ts` | **Edit** – import + `school` select after `classNumber` |
| `docs/primary-school-textbook-grant-email-routing.md` | **Keep/update** – align with spec (already present) |
| Processing API (this repo or other) | **Edit** – resolve slug → email, send email, 400 on invalid/missing school |
| `tests/e2e/forms/primary-school-textbook-grant.spec.ts` | **Edit** – add `school` to child data and selection in flow |

---

## Acceptance criteria (from spec)

- [ ] “Child’s school” dropdown in “Tell us about the child” after “Which class are they currently in?”.
- [ ] Dropdown: “Select a school” first, then all primary schools by name.
- [ ] Required validation: “Please select the child's school.” when empty.
- [ ] Multiple children: each has own school dropdown and value.
- [ ] Payload: `beneficiaries[].school` = selected slug (e.g. `adacostaedwardsprimary`).
- [ ] Backend resolves slug → principal email and sends application to that email.
- [ ] Backend returns 400 for unknown or missing `school` slug.

---

## Efficiency notes

- **No form component changes:** The builder already supports `select` and repeatable steps; schema alone defines the new field.
- **No content/markdown changes:** Labels and hint live in the schema.
- **Single data file:** One array drives both the dropdown and the email map; updating schools is done in one place.
- **Backend decoupled:** Frontend is complete after steps 1–2; backend can follow when/where the processing API is implemented.
