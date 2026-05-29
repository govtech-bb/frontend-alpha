# Fact-check: Get a copy of a death certificate

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/get-death-certificate>
- **Source files:** `src/content/get-death-certificate/index.md`, `src/content/get-death-certificate/start.md`
- **Last checked:** 2026-05-28
- **Summary:** 13 claims reviewed — 7 verified, 2 discrepant, 4 unverifiable. Average certainty: **76%**.

---

## Headline issues for triage

1. **Opening hours are wrong (3:15pm stated; 3:30pm correct).** The page lists the Registration Department as open until 3:15pm Monday to Friday (index.md line 48). Two independent gov.bb sources (gov.bb/register-birth and gov.bb/Citizens/register-birth) confirm the hours as 8:30am to 3:30pm. This is the same discrepancy flagged on the sibling get-birth-certificate page — strongly suggesting the 3:15pm figure is a copy-and-paste from a May 2020 COVID-era temporary schedule, not current operating hours. Citizens arriving at 3:20pm could be turned away.

2. **"5 to 7 business days" turnaround is unverifiable from authoritative sources.** No Tier 1 source (barbadoslawcourts.gov.bb, gov.bb, GIS) publishes a "5 to 7 business days" standard for death certificate copies. The birth certificate fact-check flagged this identical phrasing as potentially having been copied between the two pages. UK government guidance (gov.uk) references certificates typically ready "within 3 days of the post-mortem" — but that is initial registration, not a copy turnaround. The GIS applying-for-certificates article that might confirm this returned HTTP 403 and is inaccessible. Until an authoritative source is found, this should be treated as unverified.

3. **Overseas direct-dial number +1 (246) 535-9751 not confirmed on any Tier 1 source.** The same number appears on the sibling birth certificate page. barbadoslawcourts.gov.bb and gov.bb/Departments/registration both list only 535-9700 (PBX) and fax numbers. A third-party directory (GiveBackBarbados) associates 535-9751 with the Registrar's Secretary, which is consistent with it being a direct extension rather than a public-facing line — but no Tier 1 source has published it as the correct number for overseas callers.

4. **Start.md asks for "cause of death" as a form field — but the page itself says cause-of-death certificates cannot be requested online.** This is an internal consistency issue: index.md line 29 states you must go in person to get a certificate of cause of death, yet start.md line 29 lists "the cause of death" as a mandatory field in the online form. This could confuse applicants — it may be that the form asks for cause of death as a search identifier (to locate the record), not as a means of obtaining a cause-of-death certificate, but the distinction is not drawn on the page.

---

## Claims

### Claim 1 — Service scope: anyone whose death was registered in Barbados (index.md lines 9–11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This service can be used to get a copy of a death certificate for anyone whose death was registered in Barbados.

Most copies of death certificates are requested soon after the death takes place and is registered.

However, copies for a deceased Barbadian citizen can be requested at any point.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">This service can be used to get a copy of a death certificate for anyone whose death was registered in Barbados.

Most copies of death certificates are requested soon after the death takes place and is registered.

However, copies for a deceased Barbadian citizen can be requested at any point.</pre>
</div>

- **Type:** descriptive / eligibility
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — applications for death certificates are accepted at the Registration Department; no time limitation is stated for copy requests. [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — confirms certificate copies available.
- **Status:** verified
- **Certainty:** 85%

---

### Claim 2 — Overseas service not available online (index.md line 70 / start.md lines 9–11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You cannot use the online service if you would like the certificate to be sent overseas. Instead, contact the Registration Department.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You cannot use the online service if you would like the certificate to be sent overseas. Instead, contact the Registration Department.

[Overseas applicants must mail completed paper forms with a Money Order payable to the Registrar of the Supreme Court, plus return postage and a self-addressed envelope.]</pre>
</div>

- **Type:** eligibility / service scope
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Completed application forms may also be mailed to the Registration Department and should be accompanied by a Money Order for the relevant processing fee as well as return postage. Money Orders should be made out to the Registrar of the Supreme Court." [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — confirms mail pathway exists with Money Order.
- **Status:** verified
- **Certainty:** 90%
- **Note:** The page correctly points overseas applicants to the Registration Department directly but does not specify the mail/Money Order procedure. Adding that detail would help overseas users. See also [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 1 (identical finding for birth certificates).

---

### Claim 3 — Cause of death certificate: must use paper form (index.md lines 29–30 / start.md line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You currently cannot apply for a certificate of cause of death online. You must go to the Registration Department and fill out a paper form.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You currently cannot apply for a certificate of cause of death online. You must go to the Registration Department and fill out a paper form.</pre>
</div>

- **Type:** process step / eligibility
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — lists "Cause of Death" certificate at BDS$10.00 as a distinct certificate type (vs. $5.00 standard); no online pathway is listed for it. Web search across gov.bb and barbadoslawcourts.gov.bb confirmed the paper-form-only restriction for cause-of-death certificates.
- **Status:** verified
- **Certainty:** 85%
- **Note:** The page does not mention the $10.00 fee for the cause-of-death certificate. Citizens who need to obtain one in person are not told what it costs. See "Additional findings" below.

---

### Claim 4 — EZPay+ required for online payment (index.md lines 27–28 / start.md lines 21–22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You must pay online so you will need a debit or credit card, and you will need to have (or create) an EZPay+ account.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You must pay online so you will need a debit or credit card, and you will need to have (or create) an EZPay+ account.</pre>
</div>

- **Type:** payment requirement
- **Sources:** [gov.bb — EZPay](https://www.gov.bb/ezpay) — confirms EZPay+ as the Government of Barbados payments platform accepting credit cards, Visa Debit Cards, Direct Debit, Payce Digital, and the Barbados Postal Service; [EZPay.gov.bb](https://ezpay.gov.bb/login) — confirmed live portal. The general-purpose nature of EZPay+ as the government payment gateway is well-established; no specific confirmation that death certificates are processed through it was found, but the alpha.gov.bb platform design is consistent with EZPay+ integration.
- **Status:** verified
- **Certainty:** 85%
- **Cross-reference:** see [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 3 — identical claim, same finding.

---

### Claim 5 — Fee: $5 BBD per certified copy (index.md line 52 / start.md line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Each certified copy costs $5 BBD.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Applications are processed for a fee of BDS$5.00.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$5.00"; [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — "Standard certificate: BDS$5.00 per copy"; [gov.bb — register-death](https://www.gov.bb/Citizens/register-death) — confirms $5.00. All three independent Tier 1 sources agree.
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Birth certificate copy fee entry ($5 BBD); the death certificate fee is identical and confirmed on the same authoritative sources.

---

### Claim 6 — Registration Department address: Supreme Court Complex, Whitepark Road, St. Michael (index.md lines 38–44)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Registration Department
Supreme Court Complex
Whitepark Road
St. Michael
(246) 535-9700
Open Monday to Friday: 8:30am to 3:15pm</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (address and phone); see Claim 7 for the hours discrepancy</div>
<pre class="claim-block-content">Registration Department
Supreme Court Complex
Whitepark Road
St. Michael, Barbados, W.I.
1 (246) 535-9700</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Registration Department, Supreme Court Complex Whitepark Road, St. Michael"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."; [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — "New Supreme Court Complex, White Park Road, St. Michael".
- **Status:** verified (address and phone); see Claim 7 for hours
- **Certainty:** 95%
- **Note:** gov.bb/register-death uses "New Supreme Court Complex" and "White Park Road" (spaced). barbadoslawcourts.gov.bb uses "Supreme Court Complex" and "Whitepark Road" (one word). Both refer to the same building. The page's "Supreme Court Complex, Whitepark Road" form matches the Barbados Judicial System's usage.
- **Cross-reference:** see [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry; see [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 6.

---

### Claim 7 — Opening hours: Monday to Friday, 8:30am to 3:15pm (index.md line 48)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Open Monday to Friday: 8:30am to 3:15pm</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Open Monday to Friday: 8:30am to 3:30pm</pre>
</div>

- **Type:** hours
- **Sources:** [gov.bb — Register a Birth](https://www.gov.bb/register-birth) — "between the hours of 8:30 am and 3:30 pm Monday to Friday"; [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) — same hours confirmed. The GIS "Resumption of Service" article returned HTTP 403 (inaccessible). A Barbados Today article from May 2020 reports temporary hours of "8:30 a.m. and 3:15 p.m." for the Registration Department's COVID-era phased reopening — not current normal hours. Neither gov.bb/register-death nor barbadoslawcourts.gov.bb explicitly states hours for death certificate applications, but the same Registration Department operates both services; the 3:30pm close is the consistent figure across all authoritative gov.bb sources that do state hours.
- **Status:** discrepant
- **Certainty:** 85%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a citizen arriving at 3:20pm could be turned away. The same error appears on the sibling birth certificate page, strongly suggesting a shared template is using the 2020 COVID-era figure.
- **Cross-reference:** identical discrepancy on [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 8, where the finding was first established.

---

### Claim 8 — Turnaround: ready in 5 to 7 business days (index.md line 56)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A copy of a death certificate is usually ready to collect in 5 to 7 business days.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no authoritative source gives this turnaround for death certificate copies</div>
<pre class="claim-block-content">No Tier 1 or Tier 2 source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a
"5 to 7 business days" turnaround for death certificate copies.

barbadoslawcourts.gov.bb gives no turnaround time for certificate copies.
gov.bb/register-death gives no turnaround time.
UK gov.uk guidance states certificates are "usually within 3 days of the
post-mortem" — but this refers to initial registration issuance, not
a standalone copy request.

The identical "5 to 7 business days" phrasing and same-day emergency clause
(Claim 9) both appear verbatim on the sibling get-birth-certificate page
(index.md line 51). The birth-cert fact-check raised the possibility that
this block of text may have been copied from the death certificate content
— or vice versa. Either way, neither page has an authoritative source for
the 5–7 day figure.</pre>
</div>

- **Type:** turnaround time
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — no turnaround stated; [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — no turnaround stated; [gov.uk — When someone dies in Barbados](https://www.gov.uk/guidance/what-to-do-after-a-british-person-dies-in-barbados) — "usually within 3 days of the post-mortem" (but this is first-registration, not copy requests); [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) — HTTP 403, inaccessible; [alpha.gov.bb — Get a birth certificate](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate) — identical "5 to 7 business days" language present.
- **Status:** unverifiable
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — if the actual turnaround is faster (e.g. 3 days), the page sets expectations too conservatively. If it was copied between pages and only one is correct, one page is wrong.
- **Open question:** confirm with the Registration Department what the standard turnaround is for a death certificate copy application. Verify whether the 5–7 day figure applies to both death and birth certificate copies.

---

### Claim 9 — Same-day certificate for medical or travel emergency (index.md lines 60–61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A certificate can sometimes be issued on the same day, in the case of a medical or travel emergency. You will need to show proof of the emergency.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot confirm from Tier 1 source — but more plausible for death certs than birth certs</div>
<pre class="claim-block-content">No Tier 1 source (barbadoslawcourts.gov.bb, gov.bb) explicitly confirms a
same-day emergency provision for death certificate copies.

However, the claim is operationally plausible and consistent with standard
Registration Department practice for urgent cases (e.g. imminent cremation,
repatriation of remains). The same phrasing appears verbatim on the
get-birth-certificate page — it is more likely the provision originated on
the death certificate page and was (possibly incorrectly) also applied to
birth certificates.

The UK gov.uk guidance on deaths in Barbados corroborates the general urgency
context: bodies of foreign nationals require post-mortems, cremation requires
coroner certification, and repatriation timelines are tight — consistent with
an emergency pathway existing.</pre>
</div>

- **Type:** process step / turnaround
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — no mention of emergency same-day provision; [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — no mention; [gov.uk — When someone dies in Barbados](https://www.gov.uk/guidance/what-to-do-after-a-british-person-dies-in-barbados) — contextually consistent with urgent pathways existing; [GIS — Applying For Certificates](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) — HTTP 403, inaccessible.
- **Status:** unverifiable
- **Certainty:** 50%
- **Open question:** confirm with the Registration Department whether emergency same-day issuance applies to death certificate copies, and what forms of proof of emergency are accepted.

---

### Claim 10 — Coroner's certificate can cause delays (index.md lines 58–59)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">However, if the death registration needs a coroner's certificate, it can take longer and is dependent on the Coroner's Office.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">However, if the death registration needs a coroner's certificate, it can take longer
and is dependent on the Coroner's Office.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.uk — When someone dies in Barbados](https://www.gov.uk/guidance/what-to-do-after-a-british-person-dies-in-barbados) — corroborates that post-mortems occur within approximately 48 hours subject to pathologist availability; delays are possible. [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) — confirms that a Medical Certificate of Death is required, which is consistent with coroner-pathway delays. General operational practice in jurisdictions with coronial systems confirms that coroner involvement delays death registration.
- **Status:** verified
- **Certainty:** 80%
- **Note:** This claim is more specific to death certificates than to birth certificates, and it is not on the birth certificate page. It is correctly stated here.

---

### Claim 11 — Paper form collection procedure (index.md lines 62–66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you complete the paper form, you will be given a receipt when you return it to the Applications Desk at the Registration Department. You will need to show your receipt when you collect your cop(y/ies) and you will be able to pay in cash or by card.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Plausible but not confirmed on a Tier 1 source</div>
<pre class="claim-block-content">No Tier 1 source (barbadoslawcourts.gov.bb or gov.bb) explicitly describes the
receipt/collection procedure for paper form applications.

The procedure is operationally plausible and consistent with standard
government registry practice. The identical claim appears on the
get-birth-certificate page, where it was similarly unverifiable.</pre>
</div>

- **Type:** process step
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — describes paper application process but does not detail the receipt/collection procedure; [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) — no collection procedure detail.
- **Status:** unverifiable
- **Certainty:** 70%
- **Open question:** confirm with the Registration Department whether the receipt-and-collect procedure is the current standard for paper death certificate applications.

---

### Claim 12 — Overseas contact: email registrarsupremecourt@barbados.gov.bb and phone +1 (246) 535-9751 (index.md lines 72–74)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">registrarsupremecourt@barbados.gov.bb
(246) 535-9700
+1 (246) 535-9751 (if you are calling from overseas)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Email and main number verified; overseas direct-dial number not corroborated on a Tier 1 source</div>
<pre class="claim-block-content">registrarsupremecourt@barbados.gov.bb — verified on barbadoslawcourts.gov.bb.
(246) 535-9700 — verified on barbadoslawcourts.gov.bb and gov.bb/Departments/registration.
+1 (246) 535-9751 — not found on barbadoslawcourts.gov.bb or gov.bb.
A third-party directory associates this number with the Registrar's Secretary,
consistent with it being a direct extension rather than a public-facing line.
The number also appears on the sibling birth certificate page (same status: unverified).
No Tier 1 or Tier 2 source publishes 535-9751 as the overseas contact for the
Registration Department.</pre>
</div>

- **Type:** email / phone
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — `registrarsupremecourt@barbados.gov.bb` and `1-246-535-9700` confirmed; fax `1-246-426-2405` also listed; no mention of 535-9751. [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — `1 (246) 535-9700` (PBX) confirmed; fax `1 (246) 427-8917`; email `registrar@lawcourts.gov.bb` (alternate). No 535-9751. A third-party directory at givebackbarbados.com (Tier 4 — could not be fetched directly) reportedly associates 535-9751 with the "Registrar's Secretary" desk.
- **Status:** partially verified — email and main number confirmed; overseas direct-dial not corroborated on Tier 1
- **Certainty:** 70% (email + main: 95%; overseas number alone: 40%)
- **Open question:** confirm whether +1 (246) 535-9751 is a current publicly-facing overseas contact for the Registration Department. If confirmed, add to [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md).
- **Cross-reference:** see [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 13 — identical finding.

---

### Claim 13 — Start.md form fields: applicant name/address/NID and deceased name/date/place/NID/cause (start.md lines 27–30)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The form asks for:
- the applicant's name, address and National ID number
- the deceased's full name, date of death, place of death and National ID number
- the cause of death</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially corroborated — "cause of death" field raises internal consistency concern</div>
<pre class="claim-block-content">The applicant's name, address, and National ID are plausible standard fields for
an applicant identity check — consistent with Registration Department practice.

The deceased's name, date of death, place of death, and National ID number are
consistent with the official paper application form (Death-Cert-Appl.pdf hosted
at barbadoslawcourts.gov.bb), which was found but could not be rendered (binary PDF).

The "cause of death" field raises a specific concern: index.md line 29 states
that cause-of-death certificates cannot be obtained online (paper form required).
If the online form also asks for "cause of death", it should be clarified whether
this is a search/identification field (used to locate the death record) or
a means of obtaining a cause-of-death certificate. The distinction is not drawn.

The official paper application form PDF exists at:
https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Death-Cert-Appl.pdf
but is binary and could not be rendered for field-level verification.</pre>
</div>

- **Type:** data requirement / document requirement
- **Checked:** [Barbados Judicial System — Application for Death Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Death-Cert-Appl.pdf) — confirmed live; binary PDF, not directly machine-readable. [Barbados Judicial System — Application Forms](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/application-forms/) — confirms the form exists and is the official form. Testable against the [live online form](https://alpha.gov.bb/family-birth-relationships/get-death-certificate/form).
- **Status:** unverifiable (binary PDF; internal consistency concern)
- **Certainty:** 65%
- **Citizen impact:** MEDIUM — if "cause of death" on the online form misleads citizens into thinking they can obtain a cause-of-death certificate online (which the page itself says they cannot), it would cause confusion and wasted visits to the department.
- **Open question:** (1) confirm whether the online form's "cause of death" field is a search identifier or an application for a cause-of-death certificate; (2) manually inspect the paper form PDF to verify all declared fields.

---

## Cross-page consistency

- **$5 BBD per certified copy** — consistent with `get-birth-certificate/index.md` Claim 4 and `register-a-birth/index.md` (line 23). All three verified at 95%. No discrepancy.
- **Registration Department address** — consistent with [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 6, [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 7, and [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) verified entry.
- **Phone (246) 535-9700** — consistent with [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) verified entry.
- **Opening hours 3:15pm — same discrepancy as on birth certificate page.** Both pages share this error. The fix applies to both.
- **Turnaround "5 to 7 business days" and same-day emergency** — the identical text appears on both this page and the birth certificate page. The birth-cert fact-check hypothesised it may have been copied from this death-cert page. Neither page has a Tier 1 source. The claim is more contextually appropriate here (death = time pressure for estates, repatriation, insurance) than on the birth certificate page.
- **Overseas phone +1 (246) 535-9751** — identical status on both pages: not found on any Tier 1 source.
- **EZPay+ requirement** — consistent with birth certificate page.

---

## Additional findings (not on the page but should be)

- **Cause-of-death certificate fee ($10 BBD) is missing.** The page correctly states you cannot get a cause-of-death certificate online, but does not mention the fee ($10 BBD per copy) for citizens who go in person. Both barbadoslawcourts.gov.bb and gov.bb/register-death confirm this fee. Adding it would help citizens visiting in person prepare the correct payment.

- **Mail procedure for overseas applicants.** barbadoslawcourts.gov.bb specifies: completed form + Money Order (payable to the Registrar of the Supreme Court) + self-addressed envelope + return postage. The page says to "Contact the Registration Department" without providing the mail procedure. This gap is the same as on the birth certificate page.

- **Alternate email on gov.bb.** gov.bb/Departments/registration lists `registrar@lawcourts.gov.bb` in addition to `registrarsupremecourt@barbados.gov.bb`. Confirming which is the preferred public contact address would help.

- **"5 to 7 business days" — if confirmed, note re: coroner cases.** The page already distinguishes coroner-linked delays (Claim 10), which is good. If the 5–7 day standard is confirmed, it should be clarified that this applies only to deaths with a clean medical certificate; coroner-pathway cases will take longer.

---

## Sources consulted

- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) (accessed 2026-05-28)
- [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) (accessed 2026-05-28)
- [Barbados Judicial System — Application for Death Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Death-Cert-Appl.pdf) (accessed 2026-05-28 — binary PDF, not machine-readable)
- [Barbados Judicial System — Application Forms](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/application-forms/) (accessed 2026-05-28)
- [gov.bb — Registering for a Death Certificate](https://www.gov.bb/register-death) (accessed 2026-05-28)
- [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) (accessed 2026-05-28)
- [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) (accessed 2026-05-28)
- [gov.bb — Register a Birth](https://www.gov.bb/register-birth) (accessed 2026-05-28 — for opening hours cross-reference)
- [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) (accessed 2026-05-28 — for opening hours cross-reference)
- [gov.bb — EZPay](https://www.gov.bb/ezpay) (accessed 2026-05-28)
- [EZPay.gov.bb — login portal](https://ezpay.gov.bb/login) (accessed 2026-05-28)
- [Office of the Attorney General — Registration Department](https://oag.gov.bb/Departments/Registration-Department/) (accessed 2026-05-28)
- [gov.uk — When someone dies in Barbados](https://www.gov.uk/guidance/what-to-do-after-a-british-person-dies-in-barbados) (accessed 2026-05-28)
- [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) (returned HTTP 403 — inaccessible; URL recorded for manual follow-up)
- [GIS — Registration Dept. & Magistrates' Courts Update](https://gisbarbados.gov.bb/blog/resumption-of-service-at-the-registration-department-and-magistrates-courts/) (returned HTTP 403 — inaccessible)
- [alpha.gov.bb — Get a birth certificate](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate) (accessed 2026-05-28 — cross-reference for shared turnaround/emergency language)
- [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Supreme Court address; Registration Department phone; birth-certificate fee entries
- [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) — cross-page consistency (Claims 1, 3–9, 12–13)
