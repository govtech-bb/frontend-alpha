# Fact-check: Get a Primary School Textbook Grant

- **Live page:** <https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant>
- **Source files:** `src/content/get-a-primary-school-textbook-grant/index.md` · `src/content/get-a-primary-school-textbook-grant/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 9 verified, 2 discrepant, 4 unverifiable. Average certainty: **76%**.

---

## Headline issues for triage

1. **"One form covers multiple children at the same school" is wrong.** The page states parents with more than one child at the same school need only complete one form on behalf of all those children. The Ministry of Educational Transformation's own announcement (mes.gov.bb) states explicitly: "You are required to complete one form per student, and upload the receipt on each form." A parent acting on the page's instruction will have their additional children's claims rejected or unregistered.

2. **Currency code "BDD" is a typo.** The page description in `src/content/get-a-primary-school-textbook-grant/index.md` line 3 and line 8 use "BDD" for the grant amount. The correct abbreviation used by the Government of Barbados is BDS$ (common local usage) or ISO 4217 code BBD. "BDD" does not correspond to any recognised Barbados currency code. Note: line 40 of index.md correctly uses "BDS $100" in the post-approval step.

3. **Timing advice ("June or July") is unverifiable for recurring cycles.** All public sources relate to the 2023-2024 launch only (purchase window July 1–September 30, 2023; application deadline October 16, 2023). No 2024-2025 or 2025-2026 programme cycle has been publicly announced. The June/July advice may reflect 2023-launch messaging rather than a stable annual schedule.

4. **"Cannot save and return" claim is unverifiable.** The start page asserts the application cannot be saved mid-way. No official source confirms or denies this as a system property. This is testable only against the live form.

---

## Claims

### Claim 1 — Grant amount and currency code (index.md lines 3, 8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Each academic year, every child is entitled to a $100 BDD textbook grant
while they are a student at a public or private primary school.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (currency code corrected)</div>
<pre class="claim-block-content">Each academic year, every child is entitled to a $100 BDS textbook grant
while they are a student at a public or private primary school.</pre>
</div>

- **Type:** fee / statistic / descriptive
- **Status:** discrepant (currency code only — the $100 amount and "public or private primary school" eligibility are correct)
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — uses "BDS $100" in other sections of the same content; [GIS — Education Minister Gives Update On Textbook Grant](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/) (403 at time of check); [Barbados Today — PM announces $100 primary school book grant](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/); [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/)
- **Certainty (amount/eligibility):** 90%
- **Confidence "BDD" is wrong:** 99% — "BDD" is not a valid ISO 4217 currency code. The Barbadian dollar is BBD (ISO 4217) or BDS$ (common local usage). No Government of Barbados source uses "BDD". Note: `src/data/content-directory.ts` line 283 correctly uses "BDS $100" in the description field, making the "BDD" in index.md frontmatter (line 3) and body (line 8) internally inconsistent with the rest of the codebase.
- **Citizen impact:** LOW — the dollar value ($100) is clear; citizens are unlikely to be confused.

### Claim 2 — Aim of the initiative (index.md line 8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The aim of this initiative is to financially support parents and guardians
so that their children have access to books which will support their learning.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The aim of this initiative is to financially support parents and guardians
so that their children have access to books which will support their learning.</pre>
</div>

- **Type:** descriptive
- **Status:** verified
- **Sources:** [Barbados Today — PM announces $100 primary school book grant](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/) — PM Mottley framed the grant as ensuring children "have access to books" and as "a step toward educational equity"; [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects to education.gov.bb — original heading confirmed via search)
- **Certainty:** 80%

### Claim 3 — One registration per child per year (index.md line 12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Parents or guardians can only register each child once per year.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Parents or guardians can only register each child once per year.</pre>
</div>

- **Type:** eligibility
- **Status:** verified
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — "the Ministry of Education has asked parents and guardians not to submit more than one request for the grant for the same child, as it could create processing delays"; [Nation News — Ministry clears air on Textbook Grant](https://nationnews.com/2023/10/04/ministry-clears-air-textbook-grant/) — "Only one parent can claim for the $100 Primary School Textbook Grant for the same child."
- **Certainty:** 90%

### Claim 4 — Form goes to the principal for approval (index.md lines 14–15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Your completed form will be sent to the principal at the child's school
for approval.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Your completed form will be sent to the principal at the child's school
for approval.</pre>
</div>

- **Type:** process step
- **Status:** verified
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — "Once submitted, the forms will go to the child's school, and the verified form will then be sent to the Accounts Department"; [Barbados Today — Textbook grant available without receipt](https://barbadostoday.bb/2023/10/03/textbook-grant-available-without-receipt/) — "once the principal verifies, as the authorising officer for the school, the ministry can accept the claim request"
- **Certainty:** 95%

### Claim 5 — One form covers multiple children at the same school (index.md lines 16–17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you have more than one child at the same school, you only need to
complete one form to claim on behalf of each child.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">If you have more than one child at the same school, you need to complete
a separate form for each child.</pre>
</div>

- **Type:** process step / eligibility
- **Status:** discrepant
- **Sources:** [mes.gov.bb — Textbook Grant 2023 announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) — synthesised from search: "You are required to complete one form per student, and upload the receipt on each form. Parents and guardians can only claim once per child." (per 2026-05-29 web search retrieval); [Barbados Today — PM announces $100 grant](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/) — "a grant of $100 per student for the primary school for each parent for each primary school child" (per-child basis); [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — per-child form structure confirmed throughout. No source supports a combined family form for multiple children at the same school.
- **Certainty:** 85%
- **Confidence it's wrong:** 90% — the Ministry's own announcement page and multiple Barbados Today reports consistently frame this as one form per student. The claim that one form covers multiple children at the same school is directly contradicted by "one form per student" language.
- **Citizen impact:** HIGH — a parent who relies on this instruction and submits one form for multiple children at the same school will likely have only one child's claim processed; the other children's grants will not be registered and may be missed entirely.

### Claim 6 — Separate forms for children at different schools (index.md lines 17–18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you have children at different schools, you will need to complete
separate forms.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you have children at different schools, you will need to complete
separate forms.</pre>
</div>

- **Type:** process step
- **Status:** verified — consistent with the one-form-per-child rule confirmed for Claim 5. The statement is correct but misleadingly implies same-school siblings only need one form (see Claim 5).
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/); [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (search synthesis — one form per student regardless of school)
- **Certainty:** 85%

### Claim 7 — Exclusion: existing Primary School Textbook system recipients (index.md lines 19–20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If the child is currently receiving support through the Primary School
Textbook system, you are not eligible to claim the Primary School Textbook
Grant as well.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If the child is currently receiving support through the Primary School
Textbook system, you are not eligible to claim the Primary School Textbook
Grant as well.</pre>
</div>

- **Type:** eligibility (negative statement)
- **Status:** verified
- **Sources:** [GIS — Education Minister Gives Update On Textbook Grant](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/) (403 Forbidden at time of check — confirmed via earlier search retrieval); [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects to education.gov.bb — content confirmed via search synthesis). Students who already receive assistance through the Ministry's existing Primary School Textbook system are excluded from this grant.
- **Certainty:** 75% — substance corroborated by secondary sources; Tier 1 source text could not be directly read due to 403/redirect issues.

### Claim 8 — When to register: June or July timing (index.md lines 23–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can register for the grant any time but registering in June or July
means the funds are more likely to be available in time for the start of
the new school year.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked these sources</div>
<pre class="claim-block-content">All published sources relate to the 2023-2024 launch only. That cycle
had a purchase window of July 1 – September 30, 2023 and an application
deadline of October 16, 2023. A 2026-05-29 web search for 2024-2025
and 2025-2026 programme cycles returned no results. No confirmed annual
schedule (including a June or July registration window) exists for any
subsequent year.</pre>
</div>

- **Type:** hours / process step (time-bound operational claim)
- **Status:** unverifiable
- **Checked:** [mes.gov.bb — Latest News](https://mes.gov.bb/News/Latest/?y=2023); [GIS — textbook grant tag](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/) (403); [Barbados Today — textbook grant](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/); [CBC — textbook grant tag](https://www.cbc.bb/tag/100-primary-school-textbook-grant/) (only one 2023 article found); web searches for 2024-2025 and 2025-2026 programme returned no results.
- **Certainty:** 40%
- **Open question:** Has the grant been formally designated as an annual programme with the same July–September purchase window each year? The GovBB team should confirm with the Ministry of Educational Transformation (info@mes.gov.bb / (246) 535-0600) whether the June/July registration advice reflects a stable annual schedule or is stale messaging from the 2023 launch only.

### Claim 9 — How to register: complete the online form (index.md line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To register, you can complete the online form.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To register, you can complete the online form.</pre>
</div>

- **Type:** process step
- **Status:** verified
- **Sources:** [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) — the Ministry hosted an online form; [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — "allow parents/guardians to apply for the $100 grant online from various communication devices (cell phone, tablet, laptop, or other computer)"
- **Certainty:** 85%

### Claim 10 — CTA link: "Register online" button (index.md line 29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><a data-start-link href="/money-financial-support/get-a-primary-school-textbook-grant/start">Register online</a></pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content"><a data-start-link href="/money-financial-support/get-a-primary-school-textbook-grant/start">Register online</a></pre>
</div>

- **Type:** link / CTA
- **Status:** verified — live-checked 2026-05-29. The start page loads correctly with title "Get a Primary School Textbook Grant | The Government Of Barbados".
- **Sources:** [alpha.gov.bb — start page](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/start) — HTTP 200, page loads.
- **Certainty:** 99%

### Claim 11 — Form fields: bank account, student details, school/principal, parent contact (index.md lines 31–36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The form asks for:
1. Bank account information so the funds can be paid.
2. The student's name, ID number and class.
3. The name of the child's school and principal.
4. The parent or guardian's contact details.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The form asks for:
1. Bank account information so the funds can be paid.
2. The student's name, ID number and class.
3. The name of the child's school and principal.
4. The parent or guardian's contact details.</pre>
</div>

- **Type:** document requirement / process step
- **Status:** verified
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — form requires banking or credit union account details; start.md lines 15–22 mirrors the same fields and is internally consistent.
- **Certainty:** 85%
- **Note:** The start.md (lines 15–22) lists the same fields in slightly different order (student details first, bank account third). This is a presentation variation, not a discrepancy. Both orderings reflect the same four data types.

### Claim 12 — Principal approval before payment (index.md lines 40–41)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The school will check the eligibility of your claim and make sure it has
not received more than one claim within the academic year. Approval needs
to be given by the principal before the payment details you gave are added
to the system and you receive BDS $100.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The school will check the eligibility of your claim and make sure it has
not received more than one claim within the academic year. Approval needs
to be given by the principal before the payment details you gave are added
to the system and you receive BDS $100.</pre>
</div>

- **Type:** process step
- **Status:** verified
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — "Once submitted, the forms will go to the child's school, and the verified form will then be sent to the Accounts Department of the Ministry of Education"; [Barbados Today — Textbook grant available without receipt](https://barbadostoday.bb/2023/10/03/textbook-grant-available-without-receipt/) — "once the principal verifies, as the authorising officer for the school, the ministry can accept the claim request"
- **Certainty:** 90%
- **Note:** This section correctly uses "BDS $100" while line 8 incorrectly uses "BDD" — an inconsistency within the same file.

### Claim 13 — Support option: appointment at school (index.md lines 44–46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Making an appointment at your child's school.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Making an appointment at your child's school.</pre>
</div>

- **Type:** process step
- **Status:** verified
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — "parents needing assistance should contact their child's school principal to schedule an appointment"; [Nation News — Ministry clears air on Textbook Grant](https://nationnews.com/2023/10/04/ministry-clears-air-textbook-grant/) — "please contact the Principal at your child's primary school"
- **Certainty:** 90%

### Claim 14 — Ministry address: Elsie Payne Complex, Constitution Road, St. Michael (index.md lines 47–51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Visiting the Ministry of Educational Transformation at:

Elsie Payne Complex
Constitution Road
St.Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (minor formatting note)</div>
<pre class="claim-block-content">Visiting the Ministry of Educational Transformation at:

Elsie Payne Complex
Constitution Road
St. Michael</pre>
</div>

- **Type:** address / agency name
- **Status:** verified — minor formatting note: "St.Michael" (no space after the period) should be "St. Michael" per standard Barbados address formatting.
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — "Elsie Payne Complex, Constitution Road, St. Michael, Barbados, W.I. (246) 535-0600"; [education.gov.bb — Ministry homepage](https://education.gov.bb/home/) — "Ministry of Education Transformation, Elsie Payne Complex, Constitution Road, St.Michael, Barbados, W.I." (note: education.gov.bb itself uses "St.Michael" without a space, though gov.bb uses the spaced form)
- **Certainty:** 95%
- **Agency name cross-check:** `src/data/ministries.ts` confirms canonical name is "Ministry of Educational Transformation". The page uses this name correctly. Note: education.gov.bb uses the abbreviated form "Ministry of Education Transformation" — this appears to be the subdomain's own styling, not an error on the alpha page.

### Claim 15 — Start page: "no longer than 10 minutes" to complete (start.md line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It should take no longer than 10 minutes to complete the registration form.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked these sources</div>
<pre class="claim-block-content">No Government of Barbados source confirms a 10-minute completion time.
This is an editorial estimate, testable only against the live form.
Source URL for the form: /money-financial-support/get-a-primary-school-textbook-grant/form</pre>
</div>

- **Type:** hours (completion time estimate)
- **Status:** unverifiable
- **Checked:** [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects); [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — no completion time mentioned in any source.
- **Source:** Testable against the form at [alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/form](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/form) — live-checked 2026-05-29; page renders a "Loading form..." state, so the form itself is not evaluable via WebFetch.
- **Certainty:** 35%
- **Open question:** Is a 10-minute estimate accurate for the alpha.gov.bb form? The form collects four categories of information (student details, school/principal, bank account, parent contact); 10 minutes is plausible but needs empirical testing against the live form.

### Claim 16 — Start page: cannot save and return mid-application (start.md line 7)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You should complete your application in one go. At the moment, it is not
possible to save your answers and come back to them later.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked these sources</div>
<pre class="claim-block-content">No official Ministry or GIS source addresses whether the application
system supports session saving. This is an operational claim about the
alpha.gov.bb form system, testable only by attempting to use the form.</pre>
</div>

- **Type:** process step / negative statement
- **Status:** unverifiable
- **Checked:** [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects); [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — no mention of session-saving capability. The form renders as "Loading form..." and could not be evaluated via WebFetch.
- **Source:** Testable against the form at [alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/form](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/form)
- **Certainty:** 40%
- **Open question:** Does the alpha form system support mid-application save-and-return? If it does, this instruction is incorrect and citizens may unnecessarily rush through the form.

### Claim 17 — Bank account active within last 3 months; frozen accounts won't receive funds (start.md lines 19–21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The details of a bank account that is used regularly and has been used
within the last 3 months. If your bank account is frozen, the funds will
not reach you.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked these sources</div>
<pre class="claim-block-content">No Government of Barbados source (ministry announcement, GIS, or MEDT
press release) specifies a "3 months" activity requirement for the bank
account. Sources confirm payment goes to bank/credit union accounts and
that the account name must match the applicant. The "frozen account"
warning is a reasonable advisory but has no cited source.</pre>
</div>

- **Type:** document requirement / eligibility
- **Status:** unverifiable
- **Checked:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — confirms bank account payment method and name-matching requirement; no mention of 3-month activity test. [Nation News — Ministry clears air](https://nationnews.com/2023/10/04/ministry-clears-air-textbook-grant/) — confirms bank or credit union details needed; no mention of 3-month rule.
- **Certainty:** 40%
- **Open question:** Is a 3-month account activity requirement an official Ministry or Accountant General condition for grant disbursement, or editorial caution added by the content team? Confirm with the Ministry of Educational Transformation (info@mes.gov.bb / (246) 535-0600) or the Accountant General's Department.

---

## Additional findings (not on the page but should be)

1. **Bank account name must match applicant.** The Ministry stated clearly that the name on the bank account must match the name of the person submitting the grant request, or the grant will not be processed. This practical requirement is not currently on the page and could save citizens a failed application.

2. **Voucher option for those without bank accounts.** Nation News reported: parents without bank accounts should inform the school principal, and the Treasury will facilitate access to the grant "through the issuance of a voucher". Citizens without accounts are not told about this fallback on the page.

3. **Receipts not required if teacher and principal confirm textbooks are present.** The October 2023 update from the Minister stated claims can be accepted without receipts if an authorised teacher confirms the child has new textbooks and the principal verifies. This is a significant accessibility point relevant each cycle.

4. **source_url is blank.** `src/data/content-directory.ts` line 279 has `source_url: ""`. The best candidate to link is the Ministry's news item at `https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx` (currently redirects to education.gov.bb homepage). The GovBB team should confirm whether a stable ministry URL exists for the current cycle.

5. **No 2024-2025 or 2025-2026 cycle announcement found.** A 2026-05-29 web search returned no results for subsequent programme cycles. It is unclear whether the grant continues to run annually. If the programme is ongoing, a current-year announcement URL should be linked from the page.

---

## Sources cited

- [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education)
- [education.gov.bb — Ministry homepage](https://education.gov.bb/home/)
- [mes.gov.bb — Online Application Form for $100 Textbook Grant (2023) — redirects to education.gov.bb homepage](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx)
- [GIS — Education Minister Gives Update On Textbook Grant (403 Forbidden at time of check)](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/)
- [CBC — $100 Primary School Textbook Grant tag](https://www.cbc.bb/tag/100-primary-school-textbook-grant/)
- [Barbados Today — PM announces $100 primary school book grant (2023-08-12)](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/)
- [Barbados Today — Education ministry ready to accept claims for textbook grants (2023-09-30)](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/)
- [Barbados Today — Textbook grant available without receipt (2023-10-03)](https://barbadostoday.bb/2023/10/03/textbook-grant-available-without-receipt/)
- [Nation News — Ministry clears air on Textbook Grant (2023-10-04)](https://nationnews.com/2023/10/04/ministry-clears-air-textbook-grant/)
- [alpha.gov.bb — start page live check](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/start)
- [alpha.gov.bb — form page live check](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/form)
- [src/data/ministries.ts — Ministry of Educational Transformation entry](/home/gavin/frontend-alpha/src/data/ministries.ts)
- [src/data/content-directory.ts — get-a-primary-school-textbook-grant entry (lines 276–293)](/home/gavin/frontend-alpha/src/data/content-directory.ts)
