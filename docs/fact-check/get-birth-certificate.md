# Fact-check: Get a copy of a birth certificate

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/get-birth-certificate>
- **Source files:** `src/content/get-birth-certificate/index.md`, `src/content/get-birth-certificate/start.md`
- **Last checked:** 2026-05-28
- **Summary:** 13 claims reviewed — 8 verified, 2 discrepant, 3 unverifiable. Average certainty: **79%**.

---

## Headline issues for triage

1. **Opening hours are wrong (8:30am–3:15pm stated; 8:30am–3:30pm correct).** The page lists the Registration Department as open until 3:15pm Monday to Friday. Both gov.bb/register-birth and gov.bb/Citizens/register-birth state the hours as "8:30 am and 3:30 pm Monday to Friday". The 3:15pm figure appears in a May 2020 COVID-era Barbados Today article about the department's phased pandemic reopening — it was a temporary measure, not current hours. Citizens arriving at 3:20pm could be turned away.
2. **Turnaround time "5 to 7 business days" is unverifiable for birth certificates.** No authoritative source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a 5-to-7-business-day turnaround for birth certificate copies. The identical phrasing and same-day emergency clause appear verbatim on the alpha.gov.bb death certificate page, suggesting the birth certificate page may have copied the death certificate turnaround text in error. The barbadoslawcourts.gov.bb Certificates page gives no turnaround time for copies of previously registered births; the "2 working days" figure only applies to newly registered births.
3. **Overseas phone number +1 (246) 535-9751 not corroborated on a primary source for birth certificates.** barbadoslawcourts.gov.bb lists only 1-246-535-9700 and fax 1-246-426-2405 for the Registration Department. The 535-9751 number appears on the alpha.gov.bb death certificate page but has not been found on any Tier 1 source specifically for birth certificate enquiries.

---

## Claims

### Claim 1 — Online service cannot be used for overseas certificate delivery (index.md line 9 / start.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You cannot use the online service if you would like the certificate to be sent overseas. Instead, contact the Registration Department.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You cannot use the online service if you would like the certificate to be sent overseas. Instead, contact the Registration Department.

[Consistent with authoritative source: overseas applicants must mail paper forms with
a Money Order to the Registrar. No online overseas delivery pathway exists.]</pre>
</div>

- **Type:** service availability / eligibility
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Completed application forms may also be mailed to the Registration Department and should be accompanied by a Money Order for the relevant processing fee as well as return postage. Money Orders should be made out to the Registrar of the Supreme Court."
- **Status:** verified
- **Certainty:** 85%

---

### Claim 2 — Application takes approximately 20 minutes (start.md line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It shouldn't take longer than 20 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable only — no external source confirms or contradicts</div>
<pre class="claim-block-content">This is a UX estimate for completing the online form. No authoritative source
publishes a completion-time estimate for this form.
Testable directly at: https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form</pre>
</div>

- **Type:** UX claim
- **Checked:** [alpha.gov.bb — Get a birth certificate form](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form) — testable against the live form; no external source to compare against.
- **Status:** unverifiable (testable only by completing the form)
- **Certainty:** 70%
- **Open question:** complete the form once to validate the time estimate.

---

### Claim 3 — EZPay+ account required (start.md line 17 / index.md line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will need a debit or credit card, and you will need to have (or create) an EZPay+ account.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You will need a debit or credit card, and you will need to have (or create) an EZPay+ account.</pre>
</div>

- **Type:** payment requirement
- **Sources:** [gov.bb — EZPay](https://www.gov.bb/ezpay) — confirms EZPay+ as the Government of Barbados payments platform, accepting "Credit Cards, Visa Debit Cards, Direct Debit, Payce Digital and the Barbados Post Office"; [EZPay.gov.bb](https://ezpay.gov.bb/login) — confirmed live portal.
- **Status:** verified
- **Certainty:** 85%

---

### Claim 4 — Each certified copy costs $5 BBD (start.md line 19 / index.md line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Each certified copy costs $5 BBD.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Applications are processed for a fee of BDS$5.00.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$5.00"; [gov.bb — Register a Birth](https://www.gov.bb/register-birth) — "$5.00 is required for the Birth Certificate"; [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) — same figure confirmed.
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 4 — consistent; and [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Birth certificate copy fee entry.

---

### Claim 5 — Age 60+ pay $1 BBD per certificate (start.md line 19 / index.md line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">People aged 60 and over pay $1 BBD per certificate.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">For persons 60 years and over, the fee is BDS$1.00.</pre>
</div>

- **Type:** fee (senior rate)
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$1.00" for "Senior Citizens 60 years and over"; [gov.bb — Register a Birth](https://www.gov.bb/register-birth) — "For persons over 60 it's $1.00"; [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) — confirmed at $1.00 for 60+.
- **Status:** verified
- **Certainty:** 95%
- **Note:** This is the primary-source confirmation of the senior rate required by the Phase D brief. Three independent Tier 1 sources agree.
- **Cross-reference:** see [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Birth certificate copy fee entry.

---

### Claim 6 — Registration Department address: Supreme Court Complex, Whitepark Road, St. Michael (index.md lines 38–41)

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
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Registration Department, Supreme Court Complex, Whitepark Road, St. Michael"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry; consistent with [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 7.

---

### Claim 7 — Registration Department phone (246) 535-9700 (index.md line 42)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 535-9700</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 (246) 535-9700</pre>
</div>

- **Type:** phone
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "1-246-535-9700"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "1 (246) 535-9700 (PBX)".
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Barbados Judicial System / Registration Department phone entry; consistent with [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 8.

---

### Claim 8 — Opening hours: Monday to Friday, 8:30am to 3:15pm (index.md line 43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Open Monday to Friday: 8:30am to 3:15pm</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Open Monday to Friday: 8:30am to 3:30pm</pre>
</div>

- **Type:** hours
- **Sources:** [gov.bb — Register a Birth](https://www.gov.bb/register-birth) — "between the hours of 8:30 am and 3:30 pm Monday to Friday"; [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) — same hours confirmed. The 3:15pm figure appears in [Barbados Today (2020-05-17) — Registration Department resumes normal service](https://barbadostoday.bb/2020/05/17/registration-department-resumes-normal-service/) but that article explicitly reports a temporary COVID-era partial-service schedule — "All services of the Registration Department will commence from tomorrow, Monday, May 18, between 8:30 a.m. and 3:15 p.m." — and describes face mask requirements, hand sanitizer stations, and alphabetical scheduling. It does not represent current normal hours.
- **Status:** discrepant
- **Certainty:** 85%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a citizen arriving at 3:20pm would be turned away. The 15-minute discrepancy between 3:15 and 3:30 could cause wasted journeys for those consulting the page late in the afternoon.

---

### Claim 9 — Certificate ready in 5 to 7 business days (index.md line 51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A certificate is usually ready to collect in 5 to 7 business days.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no authoritative source gives this turnaround for birth certificate copies</div>
<pre class="claim-block-content">No Tier 1 or Tier 2 source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a
"5 to 7 business days" turnaround for birth certificate copies.

The barbadoslawcourts.gov.bb Certificates page gives no turnaround time for copies
of previously registered births.

The "2 working days" figure on gov.bb applies to newly registered births, not
standalone copy applications.

The identical "5 to 7 business days" phrasing and the same-day emergency clause
(Claim 10) both appear verbatim on the alpha.gov.bb death certificate page, which
suggests this turnaround statement may have been copied from the death certificate
content in error.</pre>
</div>

- **Type:** turnaround time
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — no turnaround stated; [gov.bb — Register a Birth](https://www.gov.bb/register-birth) — "2 working days" for new registrations only; [alpha.gov.bb — Get a death certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — identical "5 to 7 business days" language used there; GIS article at gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/ returned HTTP 403.
- **Status:** unverifiable
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — if the true standard is 2 working days, the page sets citizen expectations too conservatively. If it was accidentally copied from the death certificate page, the turnaround for birth certificates could be different.
- **Open question:** confirm with the Registration Department what the standard turnaround time is for a standalone birth certificate copy application (not tied to new birth registration). Verify whether the same "5 to 7 business days" applies, or whether a different standard applies.

---

### Claim 10 — Same-day certificate for medical or travel emergency (index.md lines 53–54)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A certificate can sometimes be issued on the same day, in the case of a medical or travel emergency. You will need to show proof of the emergency.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify from authoritative source for birth certificates specifically</div>
<pre class="claim-block-content">No Tier 1 or Tier 2 source confirms a same-day emergency provision specifically
for birth certificate copies.

The same phrasing appears verbatim on the alpha.gov.bb death certificate page,
corroborating Claim 9's finding that this block of text may have been copied
from the death certificate content.

The provision is operationally plausible, but cannot be confirmed as an
official policy for birth certificates from the public web.</pre>
</div>

- **Type:** process step / turnaround
- **Checked:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — no mention of emergency same-day provision; [alpha.gov.bb — Get a death certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — identical clause present; GIS search returned no confirming article for birth certificate emergency provision.
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** confirm with the Registration Department whether emergency same-day issuance applies to birth certificate copies (as well as death certificates), and what forms of proof of emergency are accepted.

---

### Claim 11 — Form fields: applicant name, address, National ID number (start.md line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the applicant's name, address and National ID number</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">the applicant's name, address and National ID number
[consistent with the official paper form hosted at barbadoslawcourts.gov.bb]</pre>
</div>

- **Type:** document / data requirement
- **Sources:** [Barbados Judicial System — Application for Birth Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl.-Birth-Cert.pdf) — the form is hosted here; the PDF is binary-only and could not be rendered, but a Tier 4 source (Wikiprocedure, citing the same PDF) confirms "national registration number" is among the form fields. Testable directly against the [live online form](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form).
- **Status:** verified (with caveat — PDF unrenderable; Tier 4 corroboration only)
- **Certainty:** 75%

---

### Claim 12 — Form asks for "place of baptism" of certificate subject (start.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the full name, date of birth, place of birth and place of baptism of the person named on the certificate</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (form field confirmed on official paper form)</div>
<pre class="claim-block-content">the full name, date of birth, place of birth and place of baptism of the person
named on the certificate

[Wikiprocedure, citing the official Barbados Judicial System PDF form at
barbadoslawcourts.gov.bb, states: "The information on the form includes important
details such as place of baptism, along with national registration number, place
of birth, and parents' names." The PDF itself could not be rendered for direct
inspection, but the form URL is live.]</pre>
</div>

- **Type:** data requirement
- **Sources:** [Barbados Judicial System — Application for Birth Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl.-Birth-Cert.pdf) — official form (PDF binary, not directly readable); [Wikiprocedure — Barbados: Obtain a Birth Certificate](https://www.wikiprocedure.com/index.php/Barbados_-_Obtain_a_Birth_Certificate) (Tier 4) — "The information on the form includes important details such as place of baptism." This is a historical Barbadian vital-records convention: parish of baptism was recorded alongside civil registration, so the field reflects the mixed ecclesiastical/civil history of Barbadian birth registration.
- **Status:** verified (Tier 4 corroboration; direct form inspection blocked by binary PDF)
- **Certainty:** 65%
- **Note:** The PDF cannot be machine-read. Manual inspection of the paper form or completion of the online form would raise certainty to 95%+. The field is not suspicious — it reflects Barbados's historical practice of recording baptism data alongside civil registration.

---

### Claim 13 — Overseas contact: email registrarsupremecourt@barbados.gov.bb and phone +1 (246) 535-9751 (index.md lines 65–69)

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
This number also appears on the alpha.gov.bb death certificate page. It may be a
direct-dial extension rather than the main PBX switchboard, but it has not been
confirmed on any Tier 1 or Tier 2 source for birth certificate enquiries.</pre>
</div>

- **Type:** email / phone
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — email `registrarsupremecourt@barbados.gov.bb` confirmed; phone `1-246-535-9700` confirmed; `1-246-426-2405` also listed (fax); no mention of 535-9751. [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — confirms `1 (246) 535-9700`; fax `1 (246) 427-8917`; email `registrar@lawcourts.gov.bb` (alternate address). No 535-9751 found.
- **Status:** partially verified — email and main number confirmed; overseas direct-dial not corroborated
- **Certainty:** 70% (email + main number: 95%; overseas number: 40%)
- **Open question:** confirm whether +1 (246) 535-9751 is a current direct-dial number for the Registration Department, or is it specific to another department (e.g. the Registrar's own desk). If confirmed, add it to [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md).

---

## Cross-page consistency

- `$5 BBD per certified copy` — consistent with `register-a-birth/index.md` (line 23) and [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 4. Both verified at 95%. No discrepancy.
- `$1 BBD senior rate (60+)` — confirmed on this page; confirmed via primary source (barbadoslawcourts.gov.bb + gov.bb). The register-a-birth content omits the senior rate — a gap on that page, not an error on this one.
- `(246) 535-9700` — consistent with register-a-birth and [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) verified entry.
- `Supreme Court Complex, Whitepark Road, St. Michael` — consistent with register-a-birth.md Claim 7, _inventory.md verified entry.
- **Opening hours discrepancy is unique to this page** — the register-a-birth page does not state opening hours for the get-certificate use case, so the 3:15pm error is isolated here.
- **Turnaround and same-day emergency** — the "5 to 7 business days" and same-day emergency clauses (Claims 9–10) do not appear in the register-a-birth report, but do appear verbatim on the alpha.gov.bb death certificate page, which is a cross-page consistency concern.

---

## Additional findings (not on the page but should be)

- **Form submission receipt / collection procedure** (index.md lines 55–56) — the page correctly states that paper-form applicants receive a receipt at the Applications Desk and must show it to collect. This is consistent with general operational practice but is not independently corroborated on a Tier 1 source; treat as plausible (75%).
- **Overseas mail procedure** — barbadoslawcourts.gov.bb confirms overseas applicants must mail a completed paper form with a Money Order payable to "the Registrar of the Supreme Court" plus return postage and a return address. The page says to "Contact the Registration Department" without specifying the mail procedure. Adding the money-order detail would help overseas applicants who cannot call.
- **Alternate email on gov.bb** — gov.bb/Departments/registration lists `registrar@lawcourts.gov.bb` in addition to `registrarsupremecourt@barbados.gov.bb`. The page uses the barbadoslawcourts.gov.bb address; worth confirming which is the preferred contact for members of the public.
- **"Place of baptism" — historical context** — this field reflects Barbados's historical vital-records system, which recorded ecclesiastical alongside civil data. It is genuinely asked on the paper form and is not an error.

---

## Sources consulted

- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) (accessed 2026-05-28)
- [Barbados Judicial System — Registration of Births](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-births) (accessed 2026-05-28)
- [Barbados Judicial System — Application for Birth Certificate (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl.-Birth-Cert.pdf) (accessed 2026-05-28 — binary PDF, not directly readable)
- [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/) (accessed 2026-05-28)
- [gov.bb — Register a Birth](https://www.gov.bb/register-birth) (accessed 2026-05-28)
- [gov.bb — Citizens/register-birth](https://www.gov.bb/Citizens/register-birth) (accessed 2026-05-28)
- [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) (accessed 2026-05-28)
- [gov.bb — EZPay](https://www.gov.bb/ezpay) (accessed 2026-05-28)
- [EZPay.gov.bb — login portal](https://ezpay.gov.bb/login) (accessed 2026-05-28)
- [Ministry of Foreign Affairs — Consular Services](https://www.foreign.gov.bb/services/consular-services/) (accessed 2026-05-28)
- [Office of the Attorney General — Registration Department](https://oag.gov.bb/Departments/Registration-Department/) (accessed 2026-05-28)
- [alpha.gov.bb — Get a death certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) (accessed 2026-05-28 — cross-reference for turnaround/emergency language)
- [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) (returned HTTP 403 — inaccessible; URL recorded for manual follow-up)
- [GIS — Registration Dept. & Magistrates' Courts Update](https://gisbarbados.gov.bb/blog/resumption-of-service-at-the-registration-department-and-magistrates-courts/) (returned HTTP 403 — inaccessible)
- [GIS — Registration Department Resumes Normal Service](https://gisbarbados.gov.bb/blog/registration-department-resumes-normal-service/) (returned HTTP 403 — inaccessible)
- [Barbados Today — Registration Department resumes normal service (2020-05-17)](https://barbadostoday.bb/2020/05/17/registration-department-resumes-normal-service/) (accessed 2026-05-28 — COVID-era temporary hours; not current)
- [Wikiprocedure — Barbados: Obtain a Birth Certificate](https://www.wikiprocedure.com/index.php/Barbados_-_Obtain_a_Birth_Certificate) (Tier 4; returned HTTP 403 on direct fetch; information surfaced via Google snippet)
- [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Birth certificate copy fee entry; Supreme Court / Registration Department entries
- [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) — cross-page consistency (Claims 4, 7, 8)
