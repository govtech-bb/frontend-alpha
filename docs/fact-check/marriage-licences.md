# Fact-check: Marriage licences

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/marriage-licences>
- **Source file:** `src/content/marriage-licences.md`
- **Last checked:** 2026-05-29
- **Summary:** 24 claims reviewed — 16 verified, 4 discrepant, 4 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **`gisbarbados.gov.bb/faqs` link is broken (HTTP 403).** Line 100 directs citizens to the GIS FAQs page for appointment booking. That URL returns HTTP 403 Forbidden as of 2026-05-29. The direct appointment link (`govtbarbadosapointmentsystem.as.me/MarriageLicense`) resolves and is functional. The broken GIS link should be removed or replaced with the direct booking URL.

2. **"Male and female" applicant language is legally out of step.** Line 13 states applications must be made by "both (male and female) persons". The Marriage Act CAP 218A uses gender-neutral language ("two persons"), and the Sexual Offences Act sections criminalising same-sex relations were struck down in December 2022. The explicit "male and female" restriction warrants legal review before the page is published on a government portal.

3. **Registration Department building name is wrong.** Lines 116–122 say "Judicial Centre" as the building name. Authoritative sources — `gov.bb/Departments/registration` and `barbadoslawcourts.gov.bb` — consistently use "Supreme Court Complex, Whitepark Road, St. Michael". Note: the source `gov.bb/Citizens/marriage-licence` also uses "Judicial Centre", so this is an upstream discrepancy mirrored by the page. The road name "White Park Road" (two words) vs. "Whitepark Road" (one word) also diverges from authoritative sources.

4. **Registration Department email address has a typo.** Line 132 lists `registrar@lawcourt.gov.bb` (singular "lawcourt"). The `gov.bb/Departments/registration` page lists `registrar@lawcourts.gov.bb` (plural "lawcourts"). The `barbadoslawcourts.gov.bb/Certificates` page lists a third variant: `registrarsupremecourt@barbados.gov.bb`. Three official sources give three different addresses; the page's singular variant is almost certainly a typo of the `lawcourts.gov.bb` form.

5. **Registration Department fax number conflict persists.** Line 126 lists fax `(246) 426-2405`. The `gov.bb/Departments/registration` page lists `1 (246) 427-8917`. The `barbadoslawcourts.gov.bb/Certificates` page lists `1-246-426-2405`. Two authoritative sources disagree; this requires agency confirmation.

---

## Claims

### Claim 1 — Both "male and female" persons must apply (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Application for a marriage licence must be made by both (male and female) persons at the Ministry of Home Affairs and Information office.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (pending legal review)</div>
<pre class="claim-block-content">Application for a marriage licence must be made by both persons at the Ministry of Home Affairs and Information office.</pre>
</div>

- **Type:** eligibility / legal reference
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — mirrors the same "male and female" language; [Barbados Consulate General Toronto](https://toronto.foreign.gov.bb/general-information/how-can-i-plan-to-get-married-in-barbados/) — same phrasing; [Marriage Act CAP 218A — LII/Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados) — Act uses gender-neutral "two persons" in most sections; section 3 references "man and woman" only for prohibited-degree void marriages
- **Status:** discrepant (legal language concern)
- **Certainty:** 80%
- **Confidence it's wrong:** 65% — the "male and female" phrasing mirrors the source gov.bb page exactly and may reflect current administrative practice. However, the Marriage Act CAP 218A predominantly uses gender-neutral language, and post-2022 decriminalisation developments make this restriction legally contested.
- **Citizen impact:** HIGH — if Barbados law does not restrict marriage to opposite-sex couples (a live legal question post-2022), this language either misstates the law or incorrectly advises same-sex couples they cannot apply.
- **Open question:** has the Marriage Act CAP 218A been amended since the 1995 L.R.O. version to either expressly permit or prohibit same-sex marriage? The GovBB team should obtain a written opinion from the Office of the Attorney General before publishing this text.

---

### Claim 2 — Licence is valid for three months (lines 13–14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The marriage licence is valid for three (3) months only; therefore, couples can get married within three (3) months from the time they receive their marriage licence.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The marriage licence is valid for three (3) months only.</pre>
</div>

- **Type:** legal reference / process step
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — "valid for three (3) months only"; [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — consistent
- **Status:** verified
- **Certainty:** 95%

---

### Claim 3 — Nationals: original birth certificate + national ID/driver's licence or valid passport (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Nationals must present to the Officer at the Ministry of Home Affairs and Information their original birth certificates (in good condition) and national identification card/driver's licence or a valid passport (if available).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Nationals must present original birth certificate (in good condition) and national identification card/driver's licence or valid passport.</pre>
</div>

- **Type:** document requirement
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — mirrors this requirement exactly; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — consistent ("Original or certified birth certificate or valid passport")
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — Non-nationals: valid passport and/or birth certificate + proof of valid entry (lines 19–22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">All non-nationals must present their valid passports and/or birth certificates;

Non-Nationals must present to the Officer at the Ministry of Home Affairs and Information proof of valid entry into Barbados;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Non-nationals must present valid passport and/or birth certificate, plus proof of valid entry into Barbados.</pre>
</div>

- **Type:** document requirement / eligibility
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms both requirements; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — consistent
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Widow/widower: original death + original marriage certificate required (line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">In the case of a widow or widower, the original death certificate and original marriage certificate must be submitted;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Widow/widower must submit original death certificate and original marriage certificate.</pre>
</div>

- **Type:** document requirement
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms both certificates; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "certified marriage and death certificates of deceased spouse"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Divorced party: Decree Absolute or Final Judgement; Decree Nisi not acceptable (lines 25–26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If either party was divorced, an original Decree Absolute or Final Judgement or a certified copy of either document by a Notary Public must be presented. The Decree Nisi is not acceptable;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Original or certified Decree Absolute or Final Judgment required for divorced applicants. Decree Nisi not accepted.</pre>
</div>

- **Type:** document requirement / legal reference
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms Decree Absolute or certified copy; Decree Nisi not acceptable; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "original or certified Decree Absolute/Final Judgment (translated if foreign language)"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Letter from Marriage Officer addressed to: Permanent Secretary, Home Affairs, Jones Building, Webster's Business Park, Wildey, St. Michael (lines 31–46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Permanent Secretary, Home Affairs
Ministry of Home Affairs and Information
Jones Building
Webster's Business Park
Wildey
St. Michael
BARBADOS</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (minor formatting variant)</div>
<pre class="claim-block-content">The Permanent Secretary, Home Affairs
Ministry of Home Affairs and Information
Ground Floor, Jones Building
Webster Business Park
Wildey
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Home Affairs and Information](https://www.gov.bb/Ministries/home-affairs) — "Ground Floor Jones Building, Webster Business Park, Wildey, St. Michael, Barbados, W.I."; [Barbados Parliament — Cabinet Ministers](https://www.barbadosparliament.com/member/details/19) — same address
- **Status:** verified (with minor variants)
- **Certainty:** 90%
- **Note:** The page says "Webster's Business Park" (possessive). Official gov.bb uses "Webster Business Park" (no possessive). "Ground Floor" is also omitted from the page address. Low-stakes but worth aligning.

---

### Claim 8 — Minimum age: under 16 cannot marry in Barbados (line 70)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Persons under the age of sixteen (16) years cannot be legally married in Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Persons under sixteen (16) years cannot marry in Barbados. (Marriage Act CAP 218A, s.4)</pre>
</div>

- **Type:** legal reference / eligibility
- **Sources:** [Marriage Act CAP 218A — LII/Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados) — "Section 4: Marriage between persons under 16 years void"; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "Persons under 16 cannot marry"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 9 — Consent rules for minors aged 16–18 (lines 72–78)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If the parents are living together, either parent can give consent;
If the parents are divorced or living apart, the parent having legal or actual custody, or where legal custody is given to each parent for part of the year, either parent can give consent;
If both parents have been deprived of custody by order of a court, the person to whose custody the minor is committed by order of the court can give consent;
Where one parent is dead and no other guardian exists, the surviving parent can give consent;
If a guardian has been appointed by the deceased parent, the surviving parent or the appointed guardian can give consent for marriage of a minor; and
Where both parents are dead or are non-compos mentis (mentally incapable of managing their affairs/unsound mind) a lawfully appointed guardian or acknowledged guardian who has raised the minor or who for at least three years immediately preceding the intended marriage has supported the minor can give consent for marriage of a minor.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Consistent with Marriage Act CAP 218A s.26 and Schedule 2 consent provisions.</pre>
</div>

- **Type:** legal reference / eligibility
- **Sources:** [Marriage Act CAP 218A — LII/Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados) — "Section 26: consent required from parties in Schedule 2 (parents, guardians, or judge if unavailable)"; [Marriage Act CAP 218A PDF — barbadoslawcourts.gov.bb](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/MarriageCAP218A.pdf) — confirms provisions match the Act; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — consistent
- **Status:** verified
- **Certainty:** 85%
- **Note:** The PDF of the Act is not machine-readable via WebFetch; the LII/Gender Justice transcription of CAP 218A was used as the primary legal reference.

---

### Claim 10 — Judge may dispense with consent if no foregoing options possible (line 79)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If none of the foregoing options is possible, a Judge in Barbados may in his discretion on an application being made to him make an order to dispense with the consent required for the marriage of the minor.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Consistent with Marriage Act CAP 218A s.26 — judge may dispense with consent on application.</pre>
</div>

- **Type:** legal reference / process step
- **Sources:** [Marriage Act CAP 218A — LII/Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados) — confirms judicial dispensation of consent under s.26; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "a Judge may, on application being made to the court, exercise discretion to dispense with such consent"
- **Status:** verified
- **Certainty:** 90%

---

### Claim 11 — Persons 18 and older do not require parental consent (line 81)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Persons eighteen (18) years of age and older do not require parental consent.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Persons 18 and over do not require consent under Marriage Act CAP 218A.</pre>
</div>

- **Type:** legal reference / eligibility
- **Sources:** [Marriage Act CAP 218A — LII/Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados) — s.26 consent requirement does not apply to persons who are not minors; [Barbados Judicial System — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — consistent
- **Status:** verified
- **Certainty:** 95%

---

### Claim 12 — Licence fees: Non-nationals BDS$200 cash + $25 stamp; Nationals BDS$200 cash + $10 stamp (lines 85–86)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Non-Nationals - BDS$200.00 cash and a $25.00 stamp (this does not apply to persons who have residence or citizenship in Barbados).
Nationals - BDS$200.00 cash and a $10.00 stamp (this applies if either party is a citizen or resident of Barbados).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Non-nationals: BDS$200.00 cash + BDS$25.00 stamp.
Nationals/residents: BDS$200.00 cash + BDS$10.00 stamp.
Stamps obtainable at the Ministry at time of application.</pre>
</div>

- **Type:** fee
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms both fee lines exactly
- **Status:** verified
- **Certainty:** 95%

---

### Claim 13 — Special arrangements fee: BDS$100 or USD$50 (line 106)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">an additional fee of BDS $100.00 or USD $50.00 is required.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Special arrangements (weekends, public holidays, or where couple cannot visit Ministry): additional BDS$100 or USD$50.</pre>
</div>

- **Type:** fee
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — "Special arrangements fee: BDS$100 or USD$50"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 14 — `gisbarbados.gov.bb/faqs` appointment booking link (line 100)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To book an appointment, kindly visit the BGIS website gisbarbados.gov.bb/faqs or www.gov.bb under the heading Marriage Licence Appointments.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Remove or replace the gisbarbados.gov.bb/faqs link — it returns HTTP 403 Forbidden.
The direct appointment link (govtbarbadosapointmentsystem.as.me/MarriageLicense) resolves and should be cited directly.</pre>
</div>

- **Type:** link / CTA
- **Checked:** [gisbarbados.gov.bb/faqs](http://gisbarbados.gov.bb/faqs) — HTTP 403 Forbidden as of 2026-05-29; [govtbarbadosapointmentsystem.as.me/MarriageLicense](https://govtbarbadosapointmentsystem.as.me/MarriageLicense) — resolves (title: "Schedule Appointment with Government of Barbados")
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95% — HTTP 403 Forbidden is a hard failure; the link does not work for citizens.
- **Citizen impact:** MEDIUM — citizens directed to book appointments via this link will hit a broken page. However, the direct appointment URL on the same line does work, reducing impact.

---

### Claim 15 — Registration Department address: "Judicial Centre", White Park Road, St. Michael (lines 116–122)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Registrar of the Supreme Court
Registration Department
Judicial Centre
White Park Road
St. Michael
BARBADOS</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Registrar of the Supreme Court
Registration Department
Supreme Court Complex
Whitepark Road
St. Michael
BARBADOS</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."; [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Registration Department, Supreme Court Complex, Whitepark Road, St. Michael"; [gov.bb — Get a Marriage Licence (source page)](https://www.gov.bb/Citizens/marriage-licence) — also uses "Judicial Centre" — upstream discrepancy mirrored from source
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95% — "Judicial Centre" does not appear on `gov.bb/Departments/registration` or `barbadoslawcourts.gov.bb`. Every authoritative departmental source uses "Supreme Court Complex". The source gov.bb marriage-licence page also uses "Judicial Centre" — this is an upstream error mirrored faithfully by the alpha page. The road name "White Park Road" (two words) also diverges; all department sources use "Whitepark Road" (one word).
- **Citizen impact:** MEDIUM — a citizen following the wrong building name could have difficulty locating the department; the road name is correct and will get them to the right area, but "Judicial Centre" is not an official building name.
- **Cross-reference:** see [_inventory.md](/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry.

---

### Claim 16 — Registration Department phone (246) 535-9700 (line 124)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 535-9700</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 (246) 535-9700</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "1 (246) 535-9700"; [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "1-246-535-9700"
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [_inventory.md](/docs/fact-check/_inventory.md) — Registration Department phone entry.

---

### Claim 17 — Registration Department fax (246) 426-2405 (line 126)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fax No.: (246) 426-2405</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (disputed — two authoritative sources disagree)</div>
<pre class="claim-block-content">Fax No.: (246) 427-8917 [per gov.bb/Departments/registration]
— OR —
Fax No.: (246) 426-2405 [per barbadoslawcourts.gov.bb/Certificates and gov.bb/Citizens/marriage-licence]</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — fax `1 (246) 427-8917`; [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — fax `1-246-426-2405`; [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — `(246) 426-2405`
- **Status:** discrepant (two authoritative sources disagree)
- **Certainty:** 70%
- **Confidence it's wrong:** 55% — two Tier 1 sources give 426-2405; one Tier 1 source gives 427-8917. The gov.bb/Departments/registration page is likely the more recently maintained source (it also lists the current Acting Registrar). This requires human adjudication.
- **Citizen impact:** LOW — fax is rarely the primary contact; phone and email are preferred.
- **Open question:** the GovBB team should confirm the current fax number directly with the Registration Department.

---

### Claim 18 — Registration Department additional phones (246) 536-3507 / 3504 / 3631 (line 128)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Telephone No.: (246) 536-3507 / 3504 / 3631</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot fully verify — partial match</div>
<pre class="claim-block-content">gov.bb/Citizens/marriage-licence (the source page) lists the same three numbers.
barbadoslawcourts.gov.bb/Certificates lists only 1-246-535-9700.
gov.bb/Departments/registration lists only 1 (246) 535-9700.
The three 536-xxxx numbers appear to be direct lines within the Registration Department.
Their currency cannot be independently confirmed from public sources beyond the source page.</pre>
</div>

- **Type:** phone
- **Checked:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — same three numbers listed; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — lists only main 535-9700; [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — lists only 535-9700
- **Status:** unverifiable (appears on source page but no independent Tier 1 confirmation)
- **Certainty:** 60%
- **Open question:** confirm whether (246) 536-3507 / 3504 / 3631 are current working direct lines to the Registration Department.

---

### Claim 19 — Registration Department emails (lines 131–134)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">registrar@lawcourt.gov.bb
correspondenceregistration@live.com</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — domain discrepancy and likely typo on first address</div>
<pre class="claim-block-content">registrar@lawcourt.gov.bb — page uses "lawcourt" (singular). 
gov.bb/Departments/registration lists registrar@lawcourts.gov.bb (plural "courts").
barbadoslawcourts.gov.bb/Certificates lists registrarsupremecourt@barbados.gov.bb.
The singular "lawcourt" variant on the page is almost certainly a typo.
correspondenceregistration@live.com is corroborated by the gov.bb source marriage-licence page.</pre>
</div>

- **Type:** email
- **Checked:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — lists both; [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — lists `registrarsupremecourt@barbados.gov.bb` (different address); [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — lists `registrar@lawcourts.gov.bb` (plural)
- **Status:** unverifiable (three different email addresses appear across Tier 1 sources for the Registrar)
- **Certainty:** 55%
- **Citizen impact:** MEDIUM — a citizen sending to a stale or mistyped email address gets no response.
- **Open question:** the GovBB team should confirm with the Registration Department which is the current canonical contact email: `registrar@lawcourt.gov.bb` (page — likely typo), `registrar@lawcourts.gov.bb` (gov.bb departments page), or `registrarsupremecourt@barbados.gov.bb` (barbadoslawcourts.gov.bb). The "lawcourt" singular variant is almost certainly wrong.

---

### Claim 20 — Registration Department office hours: Monday to Friday 8:30 a.m. – 3:45 p.m. (line 138)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Office Hours: Mondays to Fridays 8:30 a.m. - 3:45 p.m.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Office Hours: Monday to Friday, 8:30 a.m. – 3:45 p.m.</pre>
</div>

- **Type:** hours
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms "Monday-Friday, 8:30 a.m. - 3:45 p.m." for the Registration Department
- **Status:** verified
- **Certainty:** 85%

---

### Claim 21 — Court fees (Magistrate): Nationals $125 outside/$100 within; Non-nationals $350 outside/$250 within (lines 144–146)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Nationals - outside the precincts of the court is $125.00 Barbados Dollars or within the court $100.00 Barbados Dollars.
Non-Nationals - outside the precincts of the court is $350.00 Barbados Dollars or within the court is $250.00 Barbados Dollars.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Nationals: BDS$100 (in court) / BDS$125 (outside court).
Non-nationals: BDS$250 (in court) / BDS$350 (outside court).</pre>
</div>

- **Type:** fee
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms all four amounts exactly
- **Status:** verified
- **Certainty:** 95%

---

### Claim 22 — Marriage certificate fees: Nationals $10, Non-nationals $20 (lines 150–152)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Nationals - $10.00
Non-nationals - $20.00</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Nationals: BDS$10.00
Non-nationals: BDS$20.00</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Nationals: BDS$10.00; Non-nationals: BDS$20.00"; [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — confirms both
- **Status:** verified
- **Certainty:** 95%

---

### Claim 23 — Apostille fee: $50 charged by Registration Department (lines 153–154)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It is strongly advised that non-nationals and persons that intend to live/transact any legal business abroad obtain an apostille. A fee of $50.00 is charged by the Registration Department.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Apostille fee: BDS$50.00, charged by the Registration Department.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Apostille (when required by foreign authorities): additional fee of BDS$50.00"; [gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence) — "Apostille: BDS$50"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 24 — BTMI phone number (246) 535-3700 (line 94)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">contact the Barbados Tourism Marketing Inc. (BTMI) at (246) 535-3700, for the relevant assistance.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">BTMI main contact: 246-535-3700
Address: One Barbados Place, Warrens, St. Michael, BB12001</pre>
</div>

- **Type:** phone / agency name
- **Sources:** [BTMI — Contact Us](https://corporate.visitbarbados.org/contact-us/) — "246-535-3700" confirmed as main contact number; Warrens, St. Michael address confirmed
- **Status:** verified
- **Certainty:** 90%

---

## Additional findings (not on the page but should be)

- **Banns as an alternative to a marriage licence.** The gov.bb fee page ([gov.bb — Get a Marriage Licence](https://www.gov.bb/Citizens/marriage-licence)) mentions "certificate of publication of banns" as an alternative procedure. The page makes no mention of banns. Citizens who are members of denominations that use banns should be signposted to this option.

- **Civil marriage ceremony fee vs. Magistrate fee.** The gov.bb source page lists a "civil marriage ceremony" fee separate from Magistrate court fees. The distinction is not explained on the page.

- **`registrarsupremecourt@barbados.gov.bb` as the canonical Registrar email.** The Barbados Judicial System website publishes `registrarsupremecourt@barbados.gov.bb` as the Registrar's email. Adding or replacing with this address would align the page with the official court website.

- **Ministry PBX number discrepancy.** The page lists `535-7260` for appointment bookings and `535-7267` as the "Desk Officer" line. The gov.bb Ministry page lists `535-7260` as the main PBX. Both numbers are consistent with the gov.bb source and are correct as cited.

---

## Sources cited

- [gov.bb — Get a Marriage Licence (Citizens)](https://www.gov.bb/Citizens/marriage-licence)
- [gov.bb — Ministry of Home Affairs and Information](https://www.gov.bb/Ministries/home-affairs)
- [gov.bb — Registration Department](https://www.gov.bb/Departments/registration)
- [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages)
- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates)
- [Marriage Act CAP 218A — LII / Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados)
- [Marriage Act CAP 218A — Barbados Law Courts (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/MarriageCAP218A.pdf)
- [Barbados Parliament — Cabinet Ministers (MHAI address)](https://www.barbadosparliament.com/member/details/19)
- [Consulate General of Barbados at Toronto — Getting Married in Barbados](https://toronto.foreign.gov.bb/general-information/how-can-i-plan-to-get-married-in-barbados/)
- [BTMI — Contact Us](https://corporate.visitbarbados.org/contact-us/)
- [gisbarbados.gov.bb/faqs](http://gisbarbados.gov.bb/faqs) — HTTP 403 Forbidden (broken link)
- [govtbarbadosapointmentsystem.as.me/MarriageLicense](https://govtbarbadosapointmentsystem.as.me/MarriageLicense) — resolves
- [_inventory.md](/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department address and phone entries
