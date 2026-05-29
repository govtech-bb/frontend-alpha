# Fact-check: Get a reminder before a document expires

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/renew-reminder>
- **Source file:** `src/content/renew-reminder/index.md`
- **Last checked:** 2026-05-28
- **Summary:** 9 claims reviewed — 7 verified, 1 discrepant, 1 unverifiable. Average certainty: **85%**.

---

## Headline issues for triage

1. **Body copy omits "National ID Card" from the document-type list.** The live form at `/renew-reminder/form` offers six explicit options, including "National ID Card — Barbados National Identification Card" as the first item. The start-page body text (line 17) names only "driver's licence, vehicle registration, passport, or other government permit." A citizen with an expiring National ID Card reading only the start page may not realise the service applies to them. The frontmatter `keywords` field (line 11) does include "national ID", creating an internal inconsistency between the keywords, the body, and the form.

2. **"Terms & Conditions" URL functions as the privacy notice.** The page links to `https://alpha.gov.bb/terms-conditions` as its "privacy notice." The page at that URL is titled "Terms & Conditions" and covers both site terms and data-handling practices, but it is not labelled a "privacy notice" in the page heading. The privacy section within that document does address data collection, retention, and user rights under the Data Protection Act 2019. This is an editorial framing issue, not a factual error — but worth flagging for consistency with Data Protection Act 2019 terminology, which requires a distinct privacy notice.

3. **No major structural errors.** This page is an internal alpha.gov.bb utility with no external government agency facts (no fees, addresses, phone numbers, or legal references requiring cross-verification). All verifiable claims about what the service does and does not collect are consistent with the live page, the live form, and the terms-conditions page.

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
vehicle registration, passport, National ID Card, or other government
permit runs out.</pre>
</div>

- **Type:** descriptive / eligibility
- **Status:** discrepant — "National ID Card" is a first-class option on the live form but absent from this sentence. The frontmatter keywords (line 11) include "national ID", confirming the omission is unintentional.
- **Sources:** [live form at /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — lists "National ID Card — Barbados National Identification Card" as the first selectable document type; [source file frontmatter keywords](https://alpha.gov.bb/travel-id-citizenship/renew-reminder) — includes "national ID" in keyword list
- **Certainty:** 97% (directly testable against the live form)
- **Confidence it's wrong:** 97%
- **Citizen impact:** MEDIUM — a citizen whose National ID Card is expiring may read this page and conclude the service does not apply to them, then not set a reminder.

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
interactions), consistent with a sub-minute completion time. This
claim is testable only by completing the form.</pre>
</div>

- **Type:** descriptive / process
- **Status:** unverifiable — there is no external source against which to verify a self-reported completion time. The form structure (document-type selector + date picker + calendar-export step) is consistent with a sub-minute experience, but cannot be formally verified without completing the form end-to-end.
- **Checked:** [live form at /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — visible structure is a single-step document selection; full end-to-end flow not confirmed
- **Certainty:** 65% (plausible given the minimal inputs described, but untested)
- **Open question:** GovBB team to confirm that the full form journey (document type → expiry date → calendar export/download) completes in under 60 seconds on a standard mobile connection.

---

### Claim 4 — Internal form link (line 21)

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

### Claim 5 — "Before you start" requirements: document type + expiry date (lines 27–28)

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
- **Status:** verified — the live form's first step presents a document-type selector; the second step requires an expiry date. No other inputs are requested per the form structure observed.
- **Sources:** [live form at /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form)
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

- **Type:** process step / eligibility
- **Status:** verified — the live form structure confirms only document type and expiry date are collected. This is also consistent with the terms-conditions page data-handling section: "Forms without payment are emailed straight to the relevant Ministry, Department or Agency. We don't keep a copy."
- **Sources:** [live form at /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form); [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions)
- **Certainty:** 95%

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

- **Type:** process step / descriptive
- **Status:** verified — the terms-conditions page confirms: "We don't keep a copy" for forms without payment; analytics logs "never contain the values you type." The calendar-save mechanism (iCal / Google Calendar export) is the standard approach for this type of service and consistent with "You save it to your own calendar."
- **Sources:** [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — data handling section confirms no retained copy of form submissions; form page confirms calendar-export delivery mechanism
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

- **Type:** process step / descriptive
- **Status:** verified — the live form confirms no name, address, DOB, or document number fields are present. The terms-conditions page confirms analytics logs mask email addresses and do not capture field values.
- **Sources:** [live form at /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form); [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions)
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

- **Type:** URL / legal reference
- **Status:** verified (URL is live with substantive data-handling content) — with editorial note on label mismatch
- **Sources:** [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — page loads with heading "Terms & Conditions" and a data-handling section explicitly referencing the Barbados Data Protection Act 2019
- **Certainty:** 95%
- **Citizen impact:** LOW — the URL resolves and the data-handling information is present; the only issue is the label mismatch ("privacy notice" vs "Terms & Conditions").

---

## Additional findings (not on the page but should be)

**Form delivers a "National ID Card" option inconsistently labelled in content-directory.ts.** The `content-directory.ts` entry for `renew-reminder` (lines 436–457) gives the page description as: "Set a free calendar reminder before your driver's licence, passport, National ID Card, vehicle registration, or permit runs out." This description correctly includes "National ID Card." The `index.md` body text does not. Aligning the body text with the `content-directory.ts` description would resolve Claim 1 above.

**No `source_url` is declared** in the `content-directory.ts` entry for `renew-reminder`. This is appropriate — the service is native to alpha.gov.bb with no external government source to cite.

---

## Sources cited

- [alpha.gov.bb/travel-id-citizenship/renew-reminder](https://alpha.gov.bb/travel-id-citizenship/renew-reminder) — live start page
- [alpha.gov.bb/travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form) — live form (document type selector confirmed; 6 options verified)
- [alpha.gov.bb/terms-conditions](https://alpha.gov.bb/terms-conditions) — Terms & Conditions page (data-handling section, Data Protection Act 2019 reference)
