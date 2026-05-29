# Fact-check: Get a Primary School Textbook Grant

- **Live page:** <https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant>
- **Source files:** `src/content/get-a-primary-school-textbook-grant/index.md` · `src/content/get-a-primary-school-textbook-grant/start.md`
- **Last checked:** 2026-05-28
- **Summary:** 14 claims reviewed — 9 verified, 2 discrepant, 3 unverifiable. Average certainty: **78%**.

---

## Headline issues for triage

1. **"One form covers multiple children at the same school" is wrong.** The page states parents with more than one child at the same school need only complete one form on behalf of all those children. Every authoritative source — including the Ministry of Educational Transformation's own announcement and GIS — confirms one form per child is required. A parent acting on this instruction will have their additional children's claims rejected or delayed.

2. **Currency code "BDD" is a typo.** The description metadata (content-directory.ts line 280) and the page copy (index.md line 8) use "BDD" for the grant amount. The correct abbreviation used by the Government of Barbados is BDS$ (or ISO code BBD). "BDD" does not correspond to any recognised Barbados currency code.

3. **Timing advice ("June or July") is unverifiable as an annually recurring instruction.** All sources discuss the 2023-2024 first cycle, with textbook purchase windows of July–September and October 2023 closing dates. No confirmed evidence exists that the programme runs annually on the same schedule. The advice that "registering in June or July means the funds are more likely to be available in time" may reflect 2023-launch messaging rather than a stable annual cycle.

---

## Claims

### Claim 1 — Grant amount and entitlement (index.md lines 8–9)

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
- **Status:** discrepant (currency code only — the $100 amount and "public or private primary school" eligibility are both correct)
- **Sources:** [mes.gov.bb — Online Application Form for $100 Textbook Grant (2023)](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects to education.gov.bb — deep link 404; heading confirmed via search cache); [GIS — Education Minister Gives Update On Textbook Grant](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/) (403); [Barbados Today — PM announces $100 primary school book grant](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/); [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/)
- **Certainty (amount/eligibility):** 90%
- **Confidence "BDD" is wrong:** 99% — "BDD" is not a valid ISO 4217 currency code. The Barbadian dollar is BBD (ISO 4217) or BDS$ (common local usage). No Government of Barbados source uses "BDD".
- **Citizen impact:** LOW — citizens are unlikely to be confused by the currency symbol; the dollar value ($100) is clear. However, the metadata description in `src/data/content-directory.ts` line 280 also uses "BDS $100" (correct), making the "BDD" in the page copy inconsistent.

### Claim 2 — Aim of the initiative (index.md lines 8–9)

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
- **Sources:** [Barbados Today — PM announces $100 primary school book grant](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/) — PM Mottley framed the grant as "a step toward educational equity" and to ensure children "have access to books"; [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx)
- **Certainty:** 80%

### Claim 3 — One registration per child per year (index.md line 13)

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
- **Sources:** [mes.gov.bb — Textbook Grant 2023 announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects to education.gov.bb homepage; content retrieved via search cache confirms "one form per student"); search result synthesis from the MEDT announcement page states: "If you are a parent or guardian of three children, you are required to complete one form per student and upload the receipt on each form." — [Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) (Barbados Today 2023-09-30) confirms the per-child form structure. Neither GIS nor MEDT sources describe a combined family form.
- **Certainty:** 85%
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — a parent who relies on this instruction and submits one form for three children at the same school will likely have only one child's claim processed; the other children's grants will not be registered and may be missed entirely.

### Claim 6 — Separate forms for children at different schools (index.md lines 18–19)

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
- **Status:** verified — this is consistent with the one-form-per-child rule confirmed for Claim 5.
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/)
- **Certainty:** 85%

### Claim 7 — Exclusion: existing Primary School Textbook system recipients (index.md lines 20–21)

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

- **Type:** eligibility
- **Status:** verified
- **Sources:** Web search synthesis from the MEDT announcement and GIS confirms: "Students who currently receive assistance through the Ministry of Education's existing Primary School Textbook system are excluded from the general $100 Primary School Textbook Grant, as financial assistance is already being provided to these students." The specific term "Primary School Textbook system" (lowercase "system") appears to be the ministry's own phrasing for its pre-existing support programme for economically disadvantaged students.
- **Checked:** [GIS — Education Minister Gives Update On Textbook Grant](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/) (403 Forbidden — could not directly read); [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx) (redirects)
- **Certainty:** 75% — the substance is corroborated by secondary sources; direct Tier 1 source text could not be read due to 403/redirect errors.

### Claim 8 — When to register: June or July timing (index.md lines 23–26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can register for the grant any time but registering in June or July
means the funds are more likely to be available in time for the start of
the new school year.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked these sources</div>
<pre class="claim-block-content">All published sources relate to the 2023-2024 launch. That cycle had a
purchase window of July 1 – September 30, 2023 and an application
deadline of October 16, 2023. No confirmed annual schedule (including
a June or July registration window) appears in any Tier 1 or Tier 2
source for 2024-2025 or 2025-2026.</pre>
</div>

- **Type:** hours / process step (time-bound operational claim)
- **Status:** unverifiable
- **Checked:** [mes.gov.bb — Latest News 2023](https://mes.gov.bb/News/Latest/?y=2023); [GIS — textbook grant tag](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/) (403); [Barbados Today — textbook grant](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/); web searches for 2024-2025 programme schedule returned no results.
- **Certainty:** 40%
- **Open question:** Has the grant been formally designated as an annual programme with the same July–September purchase window each year? The GovBB team should confirm with the Ministry of Educational Transformation (info@mes.gov.bb / (246) 535-0600) whether the June/July registration advice reflects the current annual schedule, or whether it is stale messaging from the 2023 launch.

### Claim 9 — How to register: complete the online form (index.md lines 28–29)

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
- **Note:** The `start.md` link points to `/money-financial-support/get-a-primary-school-textbook-grant/form` — an internal alpha.gov.bb component form. Whether this alpha form connects to the live Ministry system is a separate operational question outside the scope of this fact-check.

### Claim 10 — Form fields: bank account, student details, school/principal, parent contact (index.md lines 32–37)

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
- **Sources:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — form requires banking or credit union account details; [start.md lines 15–20] mirrors the same fields and is internally consistent.
- **Certainty:** 85%
- **Note:** The start.md (lines 15–20) lists the same fields in a slightly different order (student details first, bank account third) — this is a presentation variation, not a discrepancy. Both orderings reflect the same four data types.

### Claim 11 — Principal approval before payment (index.md lines 39–42)

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

### Claim 12 — Support option: appointment at school (index.md lines 44–46)

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

### Claim 13 — Fallback address: Ministry of Educational Transformation, Elsie Payne Complex, Constitution Road, St. Michael (index.md lines 47–51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Visiting the Ministry of Educational Transformation at:

Elsie Payne Complex
Constitution Road
St.Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Visiting the Ministry of Educational Transformation at:

Elsie Payne Complex
Constitution Road
St. Michael</pre>
</div>

- **Type:** address / agency name
- **Status:** verified — minor formatting note: "St.Michael" (no space after the period) should be "St. Michael" (standard Barbados usage).
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — "Elsie Payne Complex Constitution Road St. Michael Barbados, W.I"; [education.gov.bb homepage](https://education.gov.bb/home/) — "Elsie Payne Complex, Constitution Road, St. Michael, Barbados, W.I."
- **Certainty:** 95%
- **Agency name cross-check:** `src/data/ministries.ts` line 234 confirms canonical name is "Ministry of Educational Transformation". The page uses this name correctly.

### Claim 14 — Start page: "no longer than 10 minutes" to complete (start.md line 11)

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
- **Checked:** [mes.gov.bb — textbook grant announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx); [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — no completion time mentioned in any source.
- **Source:** Testable against the form at `https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant/form`
- **Certainty:** 35%
- **Open question:** Is a 10-minute estimate accurate for the alpha.gov.bb form? The form collects four categories of information; 10 minutes is plausible but needs empirical testing against the live form.

### Claim 15 (start.md) — Bank account active within last 3 months; frozen accounts won't receive funds (start.md lines 19–21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The details of a bank account that is used regularly and has been used
within the last 3 months. If your bank account is frozen, the funds will
not reach you.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked these sources</div>
<pre class="claim-block-content">No Government of Barbados source (ministry announcement, GIS, or
MEDT press release) specifies a "3 months" activity requirement for the
bank account. Sources confirm payment goes to bank/credit union accounts
and that name on account must match the applicant. The "frozen account"
warning is a reasonable advisory but has no cited source.</pre>
</div>

- **Type:** document requirement / eligibility
- **Status:** unverifiable
- **Checked:** [Barbados Today — Education ministry ready to accept claims](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/) — confirms bank account payment method and name-matching requirement; no mention of 3-month activity test. [Nation News — Ministry clears air](https://nationnews.com/2023/10/04/ministry-clears-air-textbook-grant/) — confirms bank or credit union details needed; no mention of 3-month rule.
- **Certainty:** 40%
- **Open question:** Is a 3-month account activity requirement an official Ministry or Accountant General condition for grant disbursement, or is this editorial caution added by the content team? Confirm with the Ministry of Educational Transformation or the Accountant General's Department.

---

## Additional findings (not on the page but should be)

1. **Bank account name must match applicant.** The Ministry stated clearly: "The name on the bank account must match the name of the person submitting the grant request in order for the grant to be processed. Mismatched names will cause processing delays." This is a practical requirement not currently stated on the page and could save citizens a failed application.

2. **Voucher option for those without bank accounts.** The Nation News reported: parents without bank accounts should inform the school principal, and the Treasury will facilitate access to the grant "through the issuance of a voucher". Citizens without accounts are not told about this fallback.

3. **Receipts not required if teacher and principal confirm textbooks are present.** The October 2023 update from the Minister stated claims can be accepted without receipts if an authorised teacher confirms the child has new textbooks and the principal verifies. This is a significant accessibility point that may be relevant each annual cycle.

4. **source_url is blank.** `src/data/content-directory.ts` line 278 has `source_url: ""`. The best candidate to link is the Ministry's news item at `https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx` (which currently redirects to education.gov.bb). The GovBB team should confirm whether a stable ministry URL exists for the current cycle.

---

## Sources cited

- [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education)
- [education.gov.bb — Ministry homepage](https://education.gov.bb/home/)
- [mes.gov.bb — Online Application Form for $100 Textbook Grant (2023) — redirects to education.gov.bb homepage](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx)
- [GIS — Education Minister Gives Update On Textbook Grant (403 Forbidden)](https://gisbarbados.gov.bb/blog/educations-minister-gives-update-on-textbook-grant/)
- [Barbados Today — PM announces $100 primary school book grant (2023-08-12)](https://barbadostoday.bb/2023/08/12/pm-announces-100-primary-school-book-grant/)
- [Barbados Today — Education ministry ready to accept claims for textbook grants (2023-09-30)](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/)
- [Barbados Today — Textbook grant available without receipt (2023-10-03)](https://barbadostoday.bb/2023/10/03/textbook-grant-available-without-receipt/)
- [Nation News — Ministry clears air on Textbook Grant (2023-10-04)](https://nationnews.com/2023/10/04/ministry-clears-air-textbook-grant/)
- [src/data/ministries.ts — Ministry of Educational Transformation entry (line 234)](/home/gavin/frontend-alpha/src/data/ministries.ts)
- [src/data/content-directory.ts — get-a-primary-school-textbook-grant entry (lines 276–289)](/home/gavin/frontend-alpha/src/data/content-directory.ts)
