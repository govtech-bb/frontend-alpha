# Fact-check: Find out how much severance payment you are owed

- **Live page:** <https://alpha.gov.bb/money-financial-support/calculate-severance-pay>
- **Source files:** `src/content/calculate-severance-pay/index.md`, `src/content/calculate-severance-pay/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 12 verified, 1 discrepant, 2 unverifiable. Average certainty: **88%**.

---

## Headline issues for triage

1. **REVERSED — Claim 12 (gross pay / overtime) is now verified.** The previous pass flagged "your usual gross pay — include overtime or bonuses" (start.md) as discrepant, arguing severance is calculated on *basic pay* which excludes overtime. On re-verification, the NIS's own severance page defines "Basic Average Pay" as "(Total Earnings within the last 104 weeks of employment) divided by (104)" and explicitly states that insurable earnings "include but are not limited to: Overtime payments, Commission on sales or profits on sales, Service charge, Production bonus, Holiday pay." The start.md instruction to include overtime and bonuses is therefore consistent with the NIS calculation methodology. The prior finding was incorrect; the page text is accurate.

2. **NIS department name uses non-official styling (Claim 6).** The page names the contact as "NIS Severance Payment Department." The NIS Contact Us page lists the department simply as "Severance" with email `severancedepartment@bginis.gov.bb`. The word "Payment" in the name is not used in any NIS publication. Low citizen impact but worth correcting for consistency.

3. **"Death of employer" trigger absent from NIS qualifying-events list (Claim 4 / Claim 13).** The alpha.gov.bb page lists "your employer died" as a qualifying reason. The NIS's own /severance/ page only lists four triggers (redundancy, laid-off, short-time, natural disaster) and does not include death of employer. The Act (Cap. 355A) does contain provisions on death of employer, so the claim is partially supported by statute, but the NIS citizen-facing guidance is silent on it. This remains an open question for NIS confirmation.

4. **Hours-per-week eligibility threshold missing from page (additional finding).** The NIS page requires employees to "be contracted to work for no less than 21 hours a week" to be eligible. The alpha.gov.bb page does not mention this threshold. A part-time worker on fewer than 21 contracted hours would not be eligible but would not know from this page.

---

## Claims

### Claim 1 — Legal reference: Severance Payments Act (Cap. 355A) (index.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the Severance Payments Act (Cap. 355A)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">the Severance Payments Act (Cap. 355A)</pre>
</div>

- **Type:** legal reference
- **Sources:** [Cap. 355A — Barbados Law Courts (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/SeverancePaymentsCAP355A.pdf); [NIS — Severance Payments Act CAP355A portal](https://www.nis.gov.bb/legislation/severance-payments-act-cap355a/); [NIS — Severance](https://www.nis.gov.bb/severance/); [OAG — Severance Payments (Amendment) Act 2020-15](https://oag.gov.bb/attachments/Severance%20Payments%20(Amendment)%20Act,%202020-15.pdf)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Link target for the Act: nis.gov.bb/severance/ (index.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">linked to https://www.nis.gov.bb/severance/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.nis.gov.bb/severance/ — live page with eligibility
criteria, calculation formula, and NIS Severance Fund information</pre>
</div>

- **Type:** URL
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — fetched 2026-05-29, page loads and contains relevant content on eligibility, calculation formula, and contact details
- **Status:** verified — URL is live and delivers relevant content. Note: it links to the NIS severance summary page rather than the Act PDF directly, which is more citizen-accessible.
- **Certainty:** 99%

---

### Claim 3 — Minimum service requirement: "at least 2 years" (index.md line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">you worked for the same employer for at least 2 years</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">you worked for the same employer for at least 2 years</pre>
</div>

- **Type:** eligibility
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — "be working for at least 104 continuous weeks with the same employer." 104 weeks = exactly 2 years; the plain-English phrasing is an accurate and appropriate rendering for citizen-facing copy.
- **Status:** verified
- **Certainty:** 95%
- **Note:** The NIS page also requires the employee to be "contracted to work for no less than 21 hours a week." This is not mentioned on the alpha.gov.bb page — see Additional Findings.

---

### Claim 4 — Qualifying triggers: redundancy, disaster, lay-off/short-time, death of employer (index.md lines 14–15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">you were sent home because your job was cut, your workplace was damaged
by a disaster, you had no work for a long time, or your employer died</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Three of four verified; "death of employer" needs NIS confirmation</div>
<pre class="claim-block-content">Redundancy, natural disaster, lay-off/short-time: confirmed on NIS page.
Death of employer: present in Cap. 355A but NOT listed among qualifying
events on nis.gov.bb/severance/.</pre>
</div>

- **Type:** eligibility / process step
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — lists "terminated for redundancy, laid-off, kept on short-time or because of a natural disaster" as qualifying events; death of employer absent. [Cap. 355A — Barbados Law Courts PDF](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/SeverancePaymentsCAP355A.pdf) — Act contains a section on "Death of employer or employee." [OAG — Severance Payments (Amendment) Act 2020-15](https://oag.gov.bb/attachments/Severance%20Payments%20(Amendment)%20Act,%202020-15.pdf) — amends Fifth Schedule with employer death provisions.
- **Status:** partially verified — redundancy, disaster, lay-off/short-time are confirmed. Death of employer exists in the Act but the NIS citizen-facing summary does not list it.
- **Certainty:** 80% (for the package; the three main triggers are 95%; the death-of-employer trigger is ~60%)
- **Open question:** Should NIS confirm whether "death of employer" is a routine qualifying trigger their office processes? Its absence from the NIS summary page is notable and may cause confusion.

---

### Claim 5 — Age eligibility: "between 16 and 67 years old" (index.md line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">you were between 16 and 67 years old on your last day at work</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">you were between 16 and 67 years old on your last day at work</pre>
</div>

- **Type:** eligibility
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — "be over 16 years old and under pensionable age at the time of the termination." [NIS — Old-Age Contributory Pension](https://www.nis.gov.bb/old-age-contributory-pension/) — pensionable age is 67, effective 1 January 2018. The alpha.gov.bb phrasing "between 16 and 67" accurately renders the statutory "over 16 and under pensionable age."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Agency name: "NIS Severance Payment Department" (index.md line 31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">NIS Severance Payment Department</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">NIS Severance Department</pre>
</div>

- **Type:** agency name
- **Sources:** [NIS — Contact Us](https://www.nis.gov.bb/contact-us/) — lists the department simply as "Severance" with extensions 1502–1509 and email `severancedepartment@bginis.gov.bb` (the email slug uses "severancedepartment" not "severancepaymentdepartment"). [NIS — Severance](https://www.nis.gov.bb/severance/) — section headings use "Severance" throughout, not "Severance Payment Department."
- **Status:** discrepant — "Payment" is an extraneous word not used in any NIS publication. Official name appears to be "Severance Department."
- **Certainty:** 80%
- **Confidence it's wrong:** 75%
- **Citizen impact:** LOW — citizens will reach the correct department regardless.

---

### Claim 7 — Address: Frank Walcott Building, Culloden Road, St. Michael (index.md lines 33–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Frank Walcott Building
Culloden Road
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Frank Walcott Building
Culloden Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — "Frank Walcott Building, Culloden Road, St. Michael, Barbados"; [NIS — Contact Us](https://www.nis.gov.bb/contact-us/) — same address; [gov.bb — National Insurance Department](https://www.gov.bb/Departments/national-insurance) — "Frank Walcott Building / Culloden Rd. / St. Michael"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 8 — Phone number: +1 246-431-7400 (index.md line 38)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">+1 246-431-7400</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">+1 246-431-7400</pre>
</div>

- **Type:** phone
- **Sources:** [NIS — Contact Us](https://www.nis.gov.bb/contact-us/) — "(246) 431-7400"; [NIS — Severance](https://www.nis.gov.bb/severance/) — "(246) 431-7400"; [gov.bb — National Insurance Department](https://www.gov.bb/Departments/national-insurance) — "1 (246) 431-7400"
- **Status:** verified
- **Certainty:** 99%
- **Note:** The NIS Severance page also lists a second NIS number `(246) 467-4647` which is not shown on the alpha.gov.bb page. See Additional Findings.

---

### Claim 9 — Extension range: "extensions 1502 to 1509" (index.md line 38)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">extensions 1502 to 1509</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">extensions 1502 to 1509</pre>
</div>

- **Type:** phone
- **Sources:** [NIS — Contact Us](https://www.nis.gov.bb/contact-us/) — "431-7400 Ext. 1502 to 1509" for the Severance department specifically.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 10 — Claim deadline: "within 12 months of your last day at work" (index.md lines 27–28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You must make your claim within 12 months of your last day at work.
If you wait longer, you may lose your right to severance payment.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You must make your claim within 12 months of your last day at work.
If you wait longer, you may lose your right to severance payment.</pre>
</div>

- **Type:** eligibility / deadline
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — "An employee has one (1) year from the date of termination to claim the severance"; [Barbados Today — Statement on the timeframe for claiming a severance payment (19 Sep 2020)](https://barbadostoday.bb/2020/09/19/statement-on-the-timeframe-for-claiming-a-severance-payment/amp/) — Labour Department confirms "the worker has 1 year to claim severance."
- **Status:** verified
- **Certainty:** 95%
- **Note:** The Act technically requires two sequential steps: (a) notify employer of intention within 4 weeks; (b) submit formal written claim within 12 months. The alpha.gov.bb page correctly gives the outer 12-month boundary; the 4-week notification is an operational detail best confirmed with NIS.

---

### Claim 11 — Legal citation in start.md: Severance Payments Act (Cap. 355A) (start.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This tool only gives an estimate based on the Severance Payments Act
(Cap. 355A).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">This tool only gives an estimate based on the Severance Payments Act
(Cap. 355A).</pre>
</div>

- **Type:** legal reference
- **Sources:** [Cap. 355A — Barbados Law Courts](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/SeverancePaymentsCAP355A.pdf); [NIS — Severance](https://www.nis.gov.bb/severance/)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 12 — "Usual gross pay — include overtime or bonuses" (start.md line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">your usual gross pay (weekly or monthly) — include overtime or bonuses</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">your usual gross pay (weekly or monthly) — include overtime or bonuses</pre>
</div>

- **Type:** process step
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/) — "Basic Average Pay is calculated as (Total Earnings within the last 104 weeks of employment) divided by (104)." The page further states that insurable earnings "include but are not limited to the following: Overtime payments, Commission on sales or profits on sales, Service charge, Production bonus, Holiday pay." Total Earnings for the NIS formula = insurable earnings, which explicitly include overtime and bonuses.
- **Status:** verified — **REVERSED from prior pass.** The previous report flagged this as discrepant, arguing severance uses "basic pay" that excludes overtime. Re-verification shows the NIS defines "Basic Average Pay" using "Total Earnings" (= insurable earnings including overtime, commissions, bonuses). The start.md instruction to "include overtime or bonuses" is therefore consistent with the NIS calculation methodology.
- **Certainty:** 85%
- **Note:** The pay figure is capped at $1,201 per week (effective January 1, 2024 per NIS). This cap is not mentioned on the alpha.gov.bb page — see Additional Findings.

---

### Claim 13 — Qualifying triggers in start.md: "redundancy, disaster, lay-off or short time, or death of employer" (start.md line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">why you were sent home (redundancy, disaster, lay-off or short time,
or death of employer)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Three of four verified; "death of employer" needs NIS confirmation — see Claim 4</div>
<pre class="claim-block-content">Redundancy, disaster, lay-off or short time: confirmed.
Death of employer: present in Cap. 355A but absent from
nis.gov.bb/severance/ qualifying events list.</pre>
</div>

- **Type:** eligibility
- **Sources:** [NIS — Severance](https://www.nis.gov.bb/severance/); [Cap. 355A — Barbados Law Courts PDF](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/SeverancePaymentsCAP355A.pdf); [OAG — 2020 Amendment Act](https://oag.gov.bb/attachments/Severance%20Payments%20(Amendment)%20Act,%202020-15.pdf)
- **Status:** partially verified — same finding as Claim 4.
- **Certainty:** 80%
- **Open question:** Is "death of employer" a qualifying trigger the NIS Severance Department routinely processes? Its absence from the NIS summary page is notable.

---

### Claim 14 — CTA link: index.md "Start your estimate now" (index.md line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">linked to /money-financial-support/calculate-severance-pay/start</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">/money-financial-support/calculate-severance-pay/start — live page loads</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — /money-financial-support/calculate-severance-pay/start](https://alpha.gov.bb/money-financial-support/calculate-severance-pay/start) — page loads and presents the "before you start" content with the calculator CTA.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 15 — CTA link: start.md "Start your estimate now" (start.md line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">linked to /money-financial-support/calculate-severance-pay/form</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">/money-financial-support/calculate-severance-pay/form — page loads
(interactive component renders)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — /money-financial-support/calculate-severance-pay/form](https://alpha.gov.bb/money-financial-support/calculate-severance-pay/form) — page loads and shows an interactive calculator form (first question: "Are you self-employed?").
- **Status:** verified
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

**A. Hours threshold missing.** The NIS page states an employee must "be contracted to work for no less than 21 hours a week" to be eligible for severance. This is not mentioned on the alpha.gov.bb page. A part-time worker on fewer than 21 contracted hours per week will be ineligible but the page does not warn them. Consider adding to the eligibility checklist on index.md.
- Source: [NIS — Severance](https://www.nis.gov.bb/severance/)

**B. Weekly pay cap not disclosed.** The NIS page notes the weekly basic pay is capped at $1,201 per week (effective 1 January 2024). Workers earning more than this will have their severance calculated on the cap, not their actual pay. The alpha.gov.bb page does not mention this cap; citizens with high earnings may over-estimate their entitlement.
- Source: [NIS — Severance](https://www.nis.gov.bb/severance/) — "capped at $1,201 weekly (as of January 1, 2024)"

**C. Second NIS phone number not shown.** The NIS Severance page lists a second telephone number for NIS: `(246) 467-4647`. This is not on the alpha.gov.bb page. Adding it as an alternative number would help citizens who cannot reach the main line.
- Source: [NIS — Severance](https://www.nis.gov.bb/severance/)

**D. NIS email address not on the page.** The NIS Contact Us page publishes `severancedepartment@bginis.gov.bb` for written queries. This is not on the alpha.gov.bb page; adding it would help citizens who cannot call.
- Source: [NIS — Contact Us](https://www.nis.gov.bb/contact-us/)

**E. No source_url declared in content-directory.ts.** The `calculate-severance-pay` entry (around line 235) has no `source_url` field. The natural candidate is `https://www.nis.gov.bb/severance/`.

---

## Sources cited

- [NIS — Severance](https://www.nis.gov.bb/severance/) — primary Tier 1 source for eligibility, formula, address, phone
- [NIS — Contact Us](https://www.nis.gov.bb/contact-us/) — extension 1502–1509 confirmation, email address
- [NIS — Severance Payments Act, CAP355A (portal page)](https://www.nis.gov.bb/legislation/severance-payments-act-cap355a/)
- [NIS — Old-Age Contributory Pension](https://www.nis.gov.bb/old-age-contributory-pension/) — pensionable age = 67
- [gov.bb — National Insurance Department](https://www.gov.bb/Departments/national-insurance) — address and main phone
- [Barbados Law Courts — Cap. 355A Severance Payments (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/SeverancePaymentsCAP355A.pdf)
- [OAG — Severance Payments (Amendment) Act 2020-15 (PDF)](https://oag.gov.bb/attachments/Severance%20Payments%20(Amendment)%20Act,%202020-15.pdf)
- [Barbados Today — Statement on the timeframe for claiming a severance payment (19 Sep 2020)](https://barbadostoday.bb/2020/09/19/statement-on-the-timeframe-for-claiming-a-severance-payment/amp/)
- [alpha.gov.bb — calculate-severance-pay/start](https://alpha.gov.bb/money-financial-support/calculate-severance-pay/start) — CTA live check
- [alpha.gov.bb — calculate-severance-pay/form](https://alpha.gov.bb/money-financial-support/calculate-severance-pay/form) — calculator form live check
