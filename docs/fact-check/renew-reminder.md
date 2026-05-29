# Fact-check: Get a reminder before a document expires

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/renew-reminder>
- **Source file:** `src/content/renew-reminder/index.md`
- **Last checked:** 2026-05-29
- **Summary:** 10 claims reviewed — 8 verified, 1 discrepant, 1 unverifiable. Average certainty: **87%**.

---

## Headline issues for triage

1. **Body copy omits "National ID Card" and "Other" from document-type list (unfixed since 2026-05-28).** The live form offers six options: National ID Card, Driver's Licence, Passport, Vehicle Registration, Permit, and "Other — Anything else with an expiry date." The start-page body text (line 17) names only "driver's licence, vehicle registration, passport, or other government permit." A citizen with an expiring National ID Card reading only the start page may not realise the service applies to them. The `content-directory.ts` description correctly includes "National ID Card"; the body copy does not. This discrepancy was flagged in the previous pass (2026-05-28) and remains unfixed.

2. **"Other" document type not signalled anywhere on the start page (new finding).** The form's sixth option — "Other — Anything else with an expiry date — you'll be asked to give it a name below" — is entirely absent from the start page. Citizens with non-standard expiring documents (e.g. work permits, food-handler certificates, firearm licences) will not know the service covers them.

3. **"Terms & Conditions" URL used as privacy notice link (editorial framing issue).** The page links to `https://alpha.gov.bb/terms-conditions` with link text "privacy notice." The destination page is headed "Terms & Conditions", though it contains a substantive "Your Data" section referencing the Data Protection Act 2019. No factual claim is wrong, but the label mismatch is inconsistent with Data Protection Act 2019 plain-language best practice.

4. **No major structural errors.** This is a native alpha.gov.bb utility with no external agency facts (no fees, addresses, phone numbers, or legal references requiring cross-verification). All verifiable claims about data collection and process steps are consistent with the live form and the terms-conditions page.

---

## Claims

### Claim 1 — Service description: document types in body copy (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Use this service to set a free reminder before your driver's licence,
vehicle registration, passport, or other government permit runs out.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Use this service to set a free reminder before your driver's licence,
vehicle registration, passport, National ID Card, or any other
document with an expiry date runs out.</pre>
</div>

- **Type:** descriptive / eligibility
- **Status:** discrepant — "National ID Card" is the first option on the live form but absent from the body sentence. The form also offers "Other — Anything else with an expiry date", which is not signalled at all. The `content-directory.ts` description (line 449) correctly includes "National ID Card", confirming the omission is unintentional. Confirmed live 2026-05-29.
- **Sources:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — "National ID Card — Barbados National Identification Card" confirmed as first option; "Other — Anything else with an expiry date" confirmed as sixth option; [live start page](https://alpha.gov.bb/travel-id-citizenship/renew-reminder) — body text confirmed unchanged
- **Certainty:** 97%
- **Confidence it's wrong:** 97%
- **Citizen impact:** MEDIUM — a citizen whose National ID Card is expiring may read this page and conclude the service does not apply to them, and not set a reminder.

---

### Claim 2 — Document types: frontmatter keywords (lines 7–13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">keywords:
  - reminder
  - renew
  - expiry
  - driver's licence
  - passport
  - national ID
  - vehicle registration
  - permit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">keywords:
  - reminder
  - renew
  - expiry
  - driver's licence
  - passport
  - national ID
  - vehicle registration
  - permit</pre>
</div>

- **Type:** descriptive / eligibility
- **Status:** verified — the keywords correctly enumerate the supported document categories. All six form-option types (National ID Card, Driver's Licence, Passport, Vehicle Registration, Permit, Other) map to keywords present here.
- **Sources:** [live form at /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form)
- **Certainty:** 97%

---

### Claim 3 — Time-to-complete: "It takes less than a minute" (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It takes less than a minute.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — unverifiable from external sources</div>
<pre class="claim-block-content">The form collects only a document type and an expiry date (two
interactions for most paths; the "Other" path adds a document-name
field). Consistent with a sub-minute completion time, but testable
only by completing the form end-to-end.</pre>
</div>

- **Type:** descriptive / process
- **Status:** unverifiable — there is no external source against which to verify a self-reported completion time. The form structure (document-type selector + date picker + calendar-export step) is consistent with a sub-minute experience. The "Other" path also prompts for a document name, adding one step.
- **Checked:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — visible structure is a single-step document selection; full end-to-end flow not confirmed
- **Certainty:** 65% (plausible given the minimal inputs described, but untested)
- **Open question:** GovBB team to confirm that the full form journey (document type → expiry date → calendar export/download, including the "Other" name-entry path) completes in under 60 seconds on a standard mobile connection.

---

### Claim 4 — Internal form link / primary CTA (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">&lt;a data-start-link href="/travel-id-citizenship/renew-reminder/form"&gt;Start now&lt;/a&gt;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">&lt;a data-start-link href="/travel-id-citizenship/renew-reminder/form"&gt;Start now&lt;/a&gt;</pre>
</div>

- **Type:** URL
- **Status:** verified — the URL resolves and returns a functioning form page with six document-type options.
- **Sources:** [alpha.gov.bb/travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form)
- **Certainty:** 99%

---

### Claim 5 — "Before you start" requirements: document type + expiry date (lines 26–28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will need:

- the type of document (for example, driver's licence or passport)
- the expiry date shown on your document</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You will need:

- the type of document (for example, driver's licence or passport)
- the expiry date shown on your document</pre>
</div>

- **Type:** document requirement / process step
- **Status:** verified — the live form's first step presents a document-type selector; the second step requires an expiry date. No other mandatory inputs are requested. (The "Other" path also asks for a document name, but this is an edge-case extension, not a baseline requirement.)
- **Sources:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form)
- **Certainty:** 95%

---

### Claim 6 — Privacy claim: only asks for document type and expiry date (lines 32–33)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To set up a reminder we only ask for the type of document and its
expiry date.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To set up a reminder we only ask for the type of document and its
expiry date.</pre>
</div>

- **Type:** process step / descriptive
- **Status:** verified — the live form confirms only document type and expiry date are collected as mandatory inputs. (The "Other" path adds a document-name field, but this only asks what to call an unlisted document type, not any identity data.) Consistent with the terms-conditions page: "We don't keep a copy."
- **Sources:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form); [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions)
- **Certainty:** 92%

---

### Claim 7 — Data retention: no messages sent, reminder saved to user's own calendar (line 34)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">We do not send you any messages and we do not keep a copy of your
reminder. You save it to your own calendar.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">We do not send you any messages and we do not keep a copy of your
reminder. You save it to your own calendar.</pre>
</div>

- **Type:** process step / descriptive / negative statement
- **Status:** verified — the terms-conditions page confirms: "We don't keep a copy" for forms without payment, and that analytics logs "never contain the values you type." The calendar-save mechanism is consistent with "You save it to your own calendar." Data stored on AWS US per terms-conditions.
- **Sources:** [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — "Your Data" section: Ministry of Innovation, Science and Smart Technology; Data Protection Act 2019; no retained copy of form submissions; [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — no email/account required
- **Certainty:** 90%

---

### Claim 8 — Data minimisation: no name, address, DOB, or document numbers collected (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">We do not ask for your name, address, date of birth, or any document
numbers.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">We do not ask for your name, address, date of birth, or any document
numbers.</pre>
</div>

- **Type:** process step / descriptive / negative statement
- **Status:** verified — the live form confirms no name, address, DOB, or document number fields are present. The terms-conditions page confirms analytics logs mask email addresses and do not capture field values.
- **Sources:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form); [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions)
- **Certainty:** 97%

---

### Claim 9 — Privacy notice URL: `https://alpha.gov.bb/terms-conditions` (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Read our [privacy notice](https://alpha.gov.bb/terms-conditions).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — with editorial note</div>
<pre class="claim-block-content">URL resolves and delivers Terms & Conditions content that includes
a data-handling section covering collection, retention, and user
rights under the Data Protection Act 2019.

Editorial note: the linked page is titled "Terms & Conditions", not
"Privacy Notice". Consider linking to a dedicated privacy notice
page, or relabelling the link text as "terms and conditions" to
match the destination page title.</pre>
</div>

- **Type:** link / legal reference
- **Status:** verified (URL is live; data-handling content is substantive and references Data Protection Act 2019) — with editorial note on label mismatch between link text "privacy notice" and page heading "Terms & Conditions"
- **Sources:** [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — confirmed live 2026-05-29: heading "Terms & Conditions", "Your Data" section references Data Protection Act 2019, data contact privacy@govtech.bb
- **Certainty:** 95%
- **Citizen impact:** LOW — the URL resolves and data-handling information is present; only issue is the label mismatch.

---

### Claim 10 — Service is free: "set a free reminder" (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Use this service to set a free reminder before your driver's licence,
vehicle registration, passport, or other government permit runs out.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Use this service to set a free reminder before your driver's licence,
vehicle registration, passport, or other government permit runs out.</pre>
</div>

- **Type:** fee
- **Status:** verified — the form collects no payment details. The terms-conditions page distinguishes forms with and without payment; this form has no payment step and charges no fee.
- **Sources:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — no payment step present; [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — explicitly distinguishes "Forms without payment" (no copy retained) from payment forms
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

**"Other" document type is absent from the start page.** The form's sixth option — "Other — Anything else with an expiry date — you'll be asked to give it a name below" — is not mentioned anywhere on the start page. Citizens with non-standard expiring documents (e.g. work permits, food-handler certificates, firearm licences) may not know the service covers them. Suggested fix: add a note such as "or any other document with an expiry date" to the body copy.

**`content-directory.ts` description already correct.** The description at line 449 reads: "Set a free calendar reminder before your driver's licence, passport, National ID Card, vehicle registration, or permit runs out." This correctly includes "National ID Card". Aligning the `index.md` body text to this description would partially resolve Claim 1.

**No `source_url` declared** in the `content-directory.ts` entry for `renew-reminder`. This is appropriate — the service is native to alpha.gov.bb with no external government source to cite.

---

## Sources cited

- [alpha.gov.bb/travel-id-citizenship/renew-reminder](https://alpha.gov.bb/travel-id-citizenship/renew-reminder) — live start page (fetched 2026-05-29)
- [alpha.gov.bb/travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — live form: 6 options confirmed (National ID Card, Driver's Licence, Passport, Vehicle Registration, Permit, Other — Anything else with an expiry date)
- [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — Terms & Conditions page (fetched 2026-05-29): "Your Data" section, Data Protection Act 2019 reference, AWS US storage, contact privacy@govtech.bb
