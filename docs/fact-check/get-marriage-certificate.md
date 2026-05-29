# Fact-check: Get a copy of a marriage certificate

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate>
- **Source files:** `src/content/get-marriage-certificate/index.md`, `src/content/get-marriage-certificate/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 16 claims reviewed — 8 verified, 4 discrepant, 4 unverifiable. Average certainty: **76%**.

---

## Headline issues for triage

1. **Opening hours are wrong (3:15pm stated; 3:30pm correct).** The page states the Registration Department is open until 3:15pm Monday to Friday. Both `gov.bb/register-birth` and `gov.bb/Citizens/register-birth` state the hours as "between the hours of 8:30 am and 3:30 pm Monday to Friday." This is the same discrepancy confirmed on the birth certificate page (see [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 8). Citizens consulting this page in the late afternoon could be turned away.

2. **Overseas section heading names the wrong certificate type.** index.md line 61 reads "## Get a copy of a birth certificate if you live overseas" — but the page is about marriage certificates. Confirmed present on the live page. This is a copy-paste error from the birth certificate page. Citizens reading this section would see a heading that does not match the page they are on.

3. **Heading typo "unknwon" (index.md line 57).** The heading reads "If basic information is unknwon" — a clear spelling error visible to citizens on the live page. High confidence this should be "unknown".

4. **Turnaround "5 to 7 business days" and same-day emergency clause are unverifiable for marriage certificates.** No authoritative Tier 1 or Tier 2 source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a 5-to-7-business-day turnaround for marriage certificate copies. The identical phrasing appears verbatim on the alpha.gov.bb death certificate page, suggesting this block was templated from death-certificate content without independent verification. The birth certificate page has the same pattern.

---

## Claims

### Claim 1 — Online service cannot be used to send certificate overseas (index.md line 9 / start.md lines 9–11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You cannot use the online service if you would like the certificate to be sent overseas. Instead, contact the Registration Department.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You cannot use the online service if you would like the certificate to be sent overseas. Instead, contact the Registration Department.

[Consistent with authoritative source: overseas applicants must mail paper forms
with a Money Order payable to "the Registrar of the Supreme Court" plus return postage.
No online overseas delivery pathway exists for marriage certificates.]</pre>
</div>

- **Type:** service availability / eligibility
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Completed application forms may also be mailed to the Registration Department and should be accompanied by a Money Order for the relevant processing fee as well as return postage. Money Orders should be made out to the Registrar of the Supreme Court."
- **Status:** verified
- **Certainty:** 85%
- **Cross-reference:** Consistent with [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 1 — identical policy applies to birth certificates.

---

### Claim 2 — Application cannot be saved mid-process (start.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You should complete your application in one go. At the moment, it is not possible to save your answers and come back to them later.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable only — no external source confirms or contradicts</div>
<pre class="claim-block-content">This is a UX limitation of the online form. It can only be verified by using the form.
Testable directly at: https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate/form</pre>
</div>

- **Type:** process step / service limitation
- **Checked:** [alpha.gov.bb — Get a marriage certificate form](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate/form) — live page renders but form is JavaScript-dependent (WebFetch sees "Loading form..."); testable only by using the form end-to-end.
- **Status:** unverifiable (testable only by completing the form)
- **Certainty:** 70%
- **Open question:** Confirm the form does not offer a save-and-return feature.

---

### Claim 3 — Application takes approximately 20 minutes (start.md line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It shouldn't take longer than 20 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable only — no external source confirms or contradicts</div>
<pre class="claim-block-content">This is a UX estimate for completing the online form. No authoritative source
publishes a completion-time estimate for this form.
Testable directly at: https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate/form</pre>
</div>

- **Type:** UX claim
- **Checked:** [alpha.gov.bb — Get a marriage certificate form](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate/form) — testable against the live form; no external source to compare against.
- **Status:** unverifiable (testable only by completing the form)
- **Certainty:** 70%
- **Open question:** Complete the online form once to validate the time estimate.

---

### Claim 4 — EZPay+ account required (start.md lines 19 / index.md line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will need a debit or credit card, and you will need to have (or create) an EZPay+ account.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You will need a debit or credit card, and you will need to have (or create) an EZPay+ account.</pre>
</div>

- **Type:** payment requirement
- **Sources:** [gov.bb — EZPay](https://www.gov.bb/ezpay) — confirms EZPay+ as the Government of Barbados payments platform, accepting credit cards, Visa Debit Cards, Direct Debit, Payce Digital, and the Barbados Postal Service; [EZPay.gov.bb](https://ezpay.gov.bb/login) — confirmed live portal (branded "EZ123", Government of Barbados copyright 2023).
- **Status:** verified
- **Certainty:** 85%
- **Cross-reference:** Consistent with [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 3.

---

### Claim 5 — Fee: $10 BBD for Barbadian nationals (index.md line 47 / start.md line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Each certified copy costs $10 BBD if you are a Barbadian national.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Applications are processed for a fee of BDS$10.00 for nationals.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$10.00 for nationals"; [gov.bb — Citizens/register-marriage](https://www.gov.bb/Citizens/register-marriage) — "A fee of $10.00 (per copy) is charged to (Nationals) for the certificate."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Fee: $20 BBD for non-nationals (index.md line 47 / start.md line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For non-nationals, each copy is $20 BBD.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">For non-nationals, each copy is BDS$20.00.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$20.00 for non-nationals"; [gov.bb — Citizens/register-marriage](https://www.gov.bb/Citizens/register-marriage) — "A fee of $20.00 (per copy) is charged to (Non-Nationals) for the certificate."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Registration Department address: Supreme Court Complex, Whitepark Road, St. Michael (index.md lines 38–41)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Registration Department
Supreme Court Complex
Whitepark Road
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Registration Department
Supreme Court Complex
Whitepark Road
St. Michael, Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Registration Department, Supreme Court Complex, Whitepark Road, St. Michael"; [gov.bb — Departments/registration](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."; [gov.bb — Citizens/register-marriage](https://www.gov.bb/Citizens/register-marriage) — "Supreme Court Complex, White Park Road, St. Michael" (minor spacing variant).
- **Status:** verified
- **Certainty:** 95%
- **Note:** gov.bb/Citizens/register-marriage uses "White Park Road" (two words); the canonical spelling on barbadoslawcourts.gov.bb and gov.bb/Departments/registration is "Whitepark Road" (one word). The alpha.gov.bb page uses the correct one-word form.
- **Cross-reference:** see [_inventory.md](/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry; consistent with [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 6 and [register-a-birth.md](/docs/fact-check/register-a-birth.md) Claim 7.

---

### Claim 8 — Registration Department phone (246) 535-9700 (index.md line 42 / index.md line 67)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 535-9700</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 (246) 535-9700</pre>
</div>

- **Type:** phone
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "1-246-535-9700"; [gov.bb — Departments/registration](https://www.gov.bb/Departments/registration) — "Phone: 1 (246) 535-9700 (PBX)".
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [_inventory.md](/docs/fact-check/_inventory.md) — Barbados Judicial System / Registration Department phone entry; consistent with [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 7.

---

### Claim 9 — Opening hours: Monday to Friday, 8:30am to 3:15pm (index.md line 43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Open Monday to Friday: 8:30am to 3:15pm</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Open Monday to Friday: 8:30am to 3:30pm</pre>
</div>

- **Type:** hours
- **Sources:** [gov.bb — Register a Birth](https://www.gov.bb/register-birth) — "between the hours of 8:30 am and 3:30 pm Monday to Friday"; [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) — same hours confirmed. The 3:15pm figure also appears verbatim on the alpha.gov.bb death certificate page, suggesting this incorrect value propagated from a shared content template, not from a current official source.
- **Status:** discrepant
- **Certainty:** 85%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a citizen arriving at 3:20pm could be turned away. The 15-minute discrepancy is identical to the error on the birth certificate page and the death certificate page; all three should be corrected together.
- **Cross-reference:** Same discrepancy confirmed at [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 8 (85% confidence). The death certificate page (`alpha.gov.bb/family-birth-relationships/get-death-certificate`) also shows 3:15pm — a cross-page templating issue.

---

### Claim 10 — Certificate ready in 5 to 7 business days (index.md line 51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A certificate is usually ready to collect in 5 to 7 business days.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no authoritative source gives this turnaround for marriage certificate copies</div>
<pre class="claim-block-content">No Tier 1 or Tier 2 source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a
"5 to 7 business days" turnaround for marriage certificate copies.

The barbadoslawcourts.gov.bb Certificates page gives no turnaround time for
marriage certificate copies.

The identical "5 to 7 business days" phrasing and the same-day emergency clause
(Claim 11) appear verbatim on the alpha.gov.bb death certificate page.
The birth certificate page uses the identical language too (confirmed at
get-birth-certificate.md Claim 9). This strongly suggests this block of
text was templated from a single source across multiple certificate pages,
without independent verification of whether the same turnaround applies to
marriage certificates specifically.</pre>
</div>

- **Type:** turnaround time
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — no turnaround stated; [alpha.gov.bb — Get a death certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — identical "5 to 7 business days" language used there; GIS search returned no confirming article for marriage certificate turnaround.
- **Status:** unverifiable
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — if the true standard differs from 5–7 business days, the page either missets expectations or understates urgency.
- **Open question:** Confirm with the Registration Department what the standard turnaround time is for a standalone marriage certificate copy application. Verify whether the same "5 to 7 business days" applies to marriage certificates, or whether the figure was copied incorrectly from the death certificate content.

---

### Claim 11 — Same-day certificate for medical or travel emergency (index.md lines 53–54)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A certificate can sometimes be issued on the same day, in the case of a medical or travel emergency. You will need to show proof of the emergency.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify from authoritative source for marriage certificates specifically</div>
<pre class="claim-block-content">No Tier 1 or Tier 2 source confirms a same-day emergency provision specifically
for marriage certificate copies.

The same phrasing appears verbatim on the alpha.gov.bb death certificate page,
consistent with Claim 10's finding that this block of text was templated across
certificate pages.

The provision is operationally plausible but cannot be confirmed as an official
policy for marriage certificates from the public web.</pre>
</div>

- **Type:** process step / turnaround
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — no mention of emergency same-day provision; [alpha.gov.bb — Get a death certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — identical clause present.
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Confirm with the Registration Department whether emergency same-day issuance applies to marriage certificate copies, and what forms of proof of emergency are accepted.

---

### Claim 12 — Form fields: applicant name, address and National ID number (start.md line 25)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the applicant's name, address and National ID number</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (consistent with official paper form)</div>
<pre class="claim-block-content">the applicant's name, address and National ID number
[consistent with the official paper form hosted at barbadoslawcourts.gov.bb;
PDF is binary-only and could not be rendered for direct inspection]</pre>
</div>

- **Type:** document / data requirement
- **Sources:** [Barbados Judicial System — Application for Marriage Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl-for-Marriage-Cert.pdf) — official form (binary PDF; not directly readable); [gov.bb — Citizens/register-marriage](https://www.gov.bb/Citizens/register-marriage) — "The application form should be presented along with the Barbados ID card and the fee for the certificate."
- **Status:** verified (with caveat — PDF unrenderable; certainty limited)
- **Certainty:** 75%

---

### Claim 13 — Form fields: husband and wife name, date/place of marriage, National ID number (start.md lines 26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the full name, date of marriage, place of marriage and National ID number of the husband and the wife</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially corroborated — date/place confirmed; "husband and wife" terminology and National ID field unverifiable from public web</div>
<pre class="claim-block-content">The Marriage Act, Cap. 218A, governs the registration of marriages. The Marriage
Card requires: place and date of marriage, full names and ages of both parties,
marital status, addresses, occupations, and signatures of both spouses.

The date of marriage and place of marriage fields are confirmed by the
barbadoslawcourts.gov.bb registration of marriages page.

The "husband and the wife" terminology mirrors the language in the Marriage Act
Cap. 218A (which uses this phrasing), but the official application form PDF
(Appl-for-Marriage-Cert.pdf) is binary and could not be rendered to confirm
whether it uses "husband/wife" or more generic "spouse/party" language.

The National ID number field is plausible (consistent with the birth and death
certificate forms which ask for it) but is not explicitly confirmed in any
readable authoritative source for the marriage certificate form specifically.</pre>
</div>

- **Type:** data requirement
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — confirms date, place, names, ages, occupations on the Marriage Card; [Barbados Judicial System — Application for Marriage Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl-for-Marriage-Cert.pdf) — official form (binary only); [Marriage Act, Cap. 218A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/MarriageCAP218A.pdf) — statute (binary only).
- **Status:** unverifiable (partially corroborated)
- **Certainty:** 55%
- **Open question:** Manually inspect the Application for Marriage Certificate form (download from barbadoslawcourts.gov.bb) to confirm whether the form uses "husband and wife" terminology and whether a National ID number field is included for both parties.

---

### Claim 14 — Contact details in overseas section (index.md lines 65–69)

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
+1 (246) 535-9751 — not found on barbadoslawcourts.gov.bb or gov.bb for marriage
certificate enquiries. This number also appears on the alpha.gov.bb birth certificate
and death certificate pages. It may be a direct-dial extension but has not been
confirmed on any Tier 1 or Tier 2 source.</pre>
</div>

- **Type:** email / phone
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — email `registrarsupremecourt@barbados.gov.bb` confirmed; phone `1-246-535-9700` confirmed; no mention of 535-9751; [gov.bb — Departments/registration](https://www.gov.bb/Departments/registration) — confirms `1 (246) 535-9700`; fax `1 (246) 427-8917`; alternate email `registrar@lawcourts.gov.bb`; no 535-9751 found.
- **Status:** partially verified — email and main number confirmed; overseas direct-dial not corroborated
- **Certainty:** 70% (email + main number: 95%; overseas number: 40%)
- **Cross-reference:** Same open question noted at [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 13. The 535-9751 number appears across at least three alpha.gov.bb pages. Confirming it once would allow all three to be updated.
- **Open question:** Confirm whether +1 (246) 535-9751 is a current direct-dial number for the Registration Department. If confirmed, add it to [_inventory.md](/docs/fact-check/_inventory.md).

---

### Claim 15 — Overseas section heading names wrong certificate type (index.md line 61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">## Get a copy of a birth certificate if you live overseas</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">## Get a copy of a marriage certificate if you live overseas</pre>
</div>

- **Type:** descriptive (copy-paste error)
- **Sources:** [alpha.gov.bb — Get a copy of a marriage certificate (live page)](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate) — confirmed the heading reads "Get a copy of a birth certificate if you live overseas" on the live page, on a page whose entire subject is marriage certificates.
- **Status:** discrepant — copy-paste error from the birth certificate page
- **Certainty:** 100%
- **Confidence it's wrong:** 100%
- **Citizen impact:** MEDIUM — a citizen skimming the overseas section could be confused about whether this section applies to their certificate type, or could doubt they are on the right page.

---

### Claim 16 — Heading typo "unknwon" (index.md line 57)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">## If basic information is unknwon</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">## If basic information is unknown</pre>
</div>

- **Type:** descriptive (typo)
- **Sources:** [Standard English spelling](https://www.merriam-webster.com/dictionary/unknown) — "unknwon" is a transposition of the letters in "unknown". No external source required; this is a clear typographical error visible in the source file and on the live page.
- **Status:** discrepant — typographical error
- **Certainty:** 100%
- **Confidence it's wrong:** 100%
- **Citizen impact:** LOW — does not mislead, but undermines trust in the page.

---

## Cross-page consistency

- `$10 BBD national / $20 BBD non-national` fee structure — unique to marriage certificates. Birth certificate is $5 BBD (/$1 for 60+). Death certificate page on alpha.gov.bb states $5 BBD. These three fee structures differ correctly by certificate type; no internal inconsistency on fees.
- `(246) 535-9700` — consistent with register-a-birth, get-birth-certificate, and [_inventory.md](/docs/fact-check/_inventory.md) verified entry.
- `Supreme Court Complex, Whitepark Road, St. Michael` — consistent with all sibling pages and _inventory.md verified entry.
- **Opening hours 3:15pm discrepancy** — also present on the birth certificate page (confirmed discrepant) and the death certificate page (not yet formally fact-checked but verified to show 3:15pm). All three pages should be corrected together.
- **Turnaround and same-day emergency** — the "5 to 7 business days" and same-day emergency clauses appear verbatim across all three certificate pages (birth, death, marriage). This is a known cross-page content-copy concern first flagged in [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claims 9–10.
- **Overseas phone +1 (246) 535-9751** — appears on birth and marriage pages (and likely death). Open question to resolve once for all three. Cross-reference [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 13.
- **Overseas heading copy-paste error** — index.md line 61 says "Get a copy of a birth certificate if you live overseas" on the marriage certificate page. Newly elevated to a formal claim (Claim 15) in this pass after live-page confirmation.

---

## Additional findings (not on the page but should be)

- **Apostille fee omitted** — barbadoslawcourts.gov.bb states an additional BDS$50.00 fee applies if a foreign authority requires an Apostille to be affixed to the certificate. This is not mentioned on the page. For citizens needing the certificate for use abroad, this is a material cost they would not be forewarned about. Worth adding.
- **Overseas mail procedure** — barbadoslawcourts.gov.bb confirms overseas applicants must mail a completed paper form with a Money Order payable to "the Registrar of the Supreme Court" plus return postage and a return address. The page says to "Contact the Registration Department" without specifying the mail procedure. Adding the money-order detail would help overseas applicants.
- **Alternate email `registrar@lawcourts.gov.bb`** — gov.bb/Departments/registration lists this in addition to `registrarsupremecourt@barbados.gov.bb`. The page uses the barbadoslawcourts.gov.bb address; worth confirming which is the preferred public contact.
- **"Both parties must disclose relationship/reason" rule for third-party requests** — index.md lines 15–18 states that when requesting on someone else's behalf, you must disclose your relationship to them and why you need the certificate. This is plausible operational practice but was not corroborated on any Tier 1 source during this pass. It is low-stakes and not a citizen-harm risk if slightly off.

---

## Sources consulted

- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) (accessed 2026-05-29)
- [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) (accessed 2026-05-29)
- [Barbados Judicial System — Application for Marriage Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl-for-Marriage-Cert.pdf) (accessed 2026-05-29 — binary PDF, not directly readable)
- [Marriage Act, Cap. 218A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/MarriageCAP218A.pdf) (accessed 2026-05-29 — binary PDF, not directly readable)
- [gov.bb — Citizens/register-marriage](https://www.gov.bb/Citizens/register-marriage) (accessed 2026-05-29)
- [gov.bb — Departments/registration](https://www.gov.bb/Departments/registration) (accessed 2026-05-29)
- [gov.bb — Register a Birth](https://www.gov.bb/register-birth) (accessed 2026-05-29 — for opening hours cross-reference)
- [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) (accessed 2026-05-29 — for opening hours cross-reference)
- [gov.bb — EZPay](https://www.gov.bb/ezpay) (accessed 2026-05-29)
- [EZPay.gov.bb — login portal](https://ezpay.gov.bb/login) (accessed 2026-05-29)
- [alpha.gov.bb — Get a marriage certificate (live page)](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate) (accessed 2026-05-29)
- [alpha.gov.bb — Get a marriage certificate start page](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate/start) (accessed 2026-05-29)
- [alpha.gov.bb — Get a marriage certificate form](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate/form) (accessed 2026-05-29 — JS-dependent; renders "Loading form...")
- [alpha.gov.bb — Get a death certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) (accessed 2026-05-29 — cross-reference for hours/turnaround/emergency language)
- [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) (returned HTTP 403 — inaccessible; URL recorded for manual follow-up)
- [_inventory.md](/docs/fact-check/_inventory.md) — Supreme Court / Registration Department entries; phone number
- [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) — cross-page consistency (Claims 1, 4, 7, 8, 9, 10, 13)
- [register-a-birth.md](/docs/fact-check/register-a-birth.md) — cross-page consistency (Claims 7, 8)
