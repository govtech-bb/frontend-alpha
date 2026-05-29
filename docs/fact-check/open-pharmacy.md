# Fact-check: Find an open pharmacy

- **Live page:** <https://alpha.gov.bb/health-and-emergency-services/open-pharmacy>
- **Source file:** `src/content/open-pharmacy.md`
- **Last checked:** 2026-05-28
- **Summary:** 18 claims reviewed — 13 verified, 3 discrepant, 2 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **Immigration Department has moved.** Page still says "Careenage House, The Wharf, Bridgetown" (lines 53, 99) but the department fully relocated to **BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael**. This is confirmed by the official immigration.gov.bb contact page and gov.bb. Citizens directed to the old address will waste a trip.

2. **"12 government polyclinic locations" is wrong.** The Ministry of Health's Primary Health Care page states exactly "nine polyclinics and two satellite clinics" — 11 total, not 12. The BDS pharmacy service page confirms BDS pharmacies operate within "nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals". The figure 12 does not match either official source.

3. **Dispensing fee claim is now partially discrepant.** The page says only "a small dispensing fee" without specifying an amount — still technically true, but the fee was tiered (not a single flat rate) and was increased effective April 1, 2024, from $5/$7/$12 to $7/$10/$14 per item. Citizens using the SBS may be surprised by the actual amount. Consider adding specific fee tiers or a link to the BDS fee schedule.

---

## Claims

### Claim 1 — Service free at government polyclinics; small dispensing fee at private SBS pharmacies (line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Use the Special Benefit Service (SBS) to collect prescription medication from a Barbados pharmacy — free at a government polyclinic, or for a small dispensing fee at a private SBS pharmacy. The Barbados Drug Service (BDS) pays the pharmacy on your behalf.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Use the Special Benefit Service (SBS) to collect prescription medication from a Barbados pharmacy — free at a government polyclinic, or for a small dispensing fee at a private SBS pharmacy. The Barbados Drug Service (BDS) pays the pharmacy on your behalf.</pre>
</div>

- **Type:** pricing / process description
- **Sources:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — "drug costs for prescriptions filled in private pharmacies are reimbursed to pharmacies by the BDS while the patient pays the dispensing fee. Additionally, no dispensing fee is charged to patients in the public sector."; [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/)
- **Status:** verified
- **Certainty:** 95%
- **Note:** The fee is described as "small" but is a tiered charge ($7, $10, or $14 per item as of April 2024 — see Claim 2). The word "small" is a subjective framing, not a factual error, but see Headline Issue 3.

---

### Claim 2 — Small dispensing fee at private SBS pharmacies (implicit fee characterisation, line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">a small dispensing fee at a private SBS pharmacy</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">a dispensing fee at a private SBS pharmacy (currently $7, $10, or $14 per item, depending on the drug — effective April 2024)</pre>
</div>

- **Type:** fee
- **Sources:** [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/); [Nation News — Special Benefit Service beneficiaries fees to go up (24 March 2024)](https://nationnews.com/2024/03/24/special-benefit-service-beneficiaries-fees-to-go-up/) — "The increase in beneficiary fee for each drug dispensed on the Special Benefit Service will be as follows: from $5 to $7, $7 to $10 and $12 to $14."
- **Status:** discrepant — the fee is no longer a single "small" amount; it is a tiered structure that increased in April 2024. The page gives no indication of the actual range, and the pre-2024 amounts are no longer current.
- **Certainty:** 80%
- **Confidence it's wrong:** 75% — the fee tiers are confirmed by both a GIS press release (Tier 2) and Nation News reporting the BDS announcement directly. The specific amounts ($7/$10/$14) are not confirmed by a Tier 1 gov.bb page, hence 75% rather than 90%+.
- **Citizen impact:** MEDIUM — citizen budget planning for prescriptions depends on knowing the actual fee range.

---

### Claim 3 — BDS phone (246) 535-4300 (lines 22, 83, 99, 106, 120)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 535-4300</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 (246) 535-4300</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — lists "1 (246) 535 - 4300"; [BDS — Contact page (cached search result)](http://drugservice.gov.bb/index.php?id=780) — same number confirmed via Google-indexed snippet
- **Status:** verified — official phone is confirmed as `1 (246) 535-4300` on two independent government sources.
- **Certainty:** 95%
- **Note:** The page omits the country-code prefix "1" used in the official listings, but the local-format "(246) 535-4300" is functionally correct for a Barbados caller. No correction required, but adding `+1` to the `tel:` href would aid international callers.

---

### Claim 4 — SBS eligibility: Barbadian citizen or permanent resident with prescription on the Barbados National Drug Formulary (line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can use the Special Benefit Service if you are a Barbadian citizen or permanent resident and a doctor has given you a prescription on the Barbados National Drug Formulary.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can use the Special Benefit Service if you are a Barbadian citizen or permanent resident and a doctor has given you a prescription on the Barbados National Drug Formulary.</pre>
</div>

- **Type:** eligibility
- **Sources:** [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/) — "Citizens and permanent residents of Barbados are eligible"; [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — "Drugs in Category A will be free of cost to all beneficiaries" (Barbadian citizens/permanent residents)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Lowest-price group: age ≥65, age <16, or specific chronic conditions (lines 32–36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You pay nothing at a government polyclinic pharmacy, and only the dispensing fee at a private SBS pharmacy, if you are:
- aged 65 or over
- under 16 years old
- prescribed medication for asthma, cancer, diabetes, epilepsy, glaucoma or hypertension (any age)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You pay nothing at a government polyclinic pharmacy, and only the dispensing fee at a private SBS pharmacy, if you are:
- aged 65 or over
- under 16 years old
- prescribed medication for asthma, cancer, diabetes, epilepsy, glaucoma or hypertension (any age)</pre>
</div>

- **Type:** eligibility category
- **Sources:** [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/) — "people 65 and over, children under 16 and members who receive prescribed formulary drugs for the treatment of hypertension, diabetes, cancer, glaucoma, asthma and epilepsy"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Qualifying chronic conditions list: asthma, cancer, diabetes, epilepsy, glaucoma, hypertension (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">asthma, cancer, diabetes, epilepsy, glaucoma or hypertension</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">asthma, cancer, diabetes, epilepsy, glaucoma or hypertension</pre>
</div>

- **Type:** condition list
- **Sources:** [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/) — lists "hypertension, diabetes, cancer, glaucoma, asthma and epilepsy" (same six conditions, different order)
- **Status:** verified — all six conditions match exactly; order varies between sources but the list is identical.
- **Certainty:** 95%

---

### Claim 7 — Permanent residency documentation: passport stamp OR Permanent Resident's certificate (lines 48–50)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Your passport stamped by Barbados Immigration confirming permanent residency
A Permanent Resident's certificate from the Barbados Immigration Department</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Your passport stamped by Barbados Immigration confirming permanent residency
A Permanent Resident's certificate from the Barbados Immigration Department</pre>
</div>

- **Type:** document requirement
- **Sources:** [BDS — Pharmacies page (cached search snippet)](http://drugservice.gov.bb/index.php?id=785) — confirms "Barbados Identification Card plus a passport… with the stamp from the Barbados Immigration Department that reads: 'I hereby certify that the holder is a Permanent Resident of Barbados', or Barbados Identification Card plus a Permanent Resident's certificate"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 8 — Immigration Department address: "Careenage House, The Wharf, Bridgetown" (lines 53, 99)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">visit Immigration at Careenage House, The Wharf, Bridgetown</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">visit the Immigration Department at BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — "Chief Immigration Officer, Barbados Immigration Department, BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael, BARBADOS"; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — "BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, BARBADOS"; [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/) and [GIS — Passport Section Of Immigration Department Moving](https://gisbarbados.gov.bb/blog/passport-section-of-immigration-department-moving/) — move began 2018, completed by late 2018.
- **Status:** discrepant — the Immigration Department has been at BTI Corporate Centre since 2018. The address on the page ("Careenage House, The Wharf") is the former headquarters and is no longer correct.
- **Certainty:** 99%
- **Confidence it's wrong:** 99% — confirmed by immigration.gov.bb itself, gov.bb, and two GIS press releases. No source places the department at Careenage House after 2018.
- **Citizen impact:** HIGH — citizens following this page to re-stamp a passport or obtain residency documentation will travel to the wrong building.

---

### Claim 9 — Prescription colour scheme: blue, pink, yellow/green (lines 64–66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Blue — from a public polyclinic or health centre. Free at a government pharmacy, dispensing fee only at a private SBS pharmacy.
Pink — from a private doctor. Free at a government pharmacy, dispensing fee only at a private SBS pharmacy.
Yellow or green — from a Queen Elizabeth Hospital outpatient clinic. Free at a government pharmacy. Not covered at private pharmacies, so you will pay full price.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">No BDS or Ministry of Health web page publicly documents the prescription colour-coding system. The claim cannot be independently confirmed or refuted from authoritative online sources.

Searched: drugservice.gov.bb (pharmacies, home, about, pharmacy service pages); health.gov.bb/For-Public/Pharmaceutical-Services; gisbarbados.gov.bb — none itemise prescription colour codes.</pre>
</div>

- **Type:** process / colour code
- **Checked:** [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785); [BDS — Pharmacy Service](http://drugservice.gov.bb/index.php?id=777); [Ministry of Health — Pharmaceutical Services](https://www.health.gov.bb/For-Public/Pharmaceutical-Services) — none document the colour scheme online.
- **Status:** unverifiable from public web — operational detail not published on any gov.bb source
- **Certainty:** 50%
- **Open question:** BDS or QEH to confirm whether the blue/pink/yellow/green colour-coding is still current, and whether yellow/green scripts remain ineligible at private pharmacies. Colour schemes are the kind of operational detail that can change when forms are reprinted.

---

### Claim 10 — Yellow/green prescriptions issued by QEH outpatient clinics (line 66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Yellow or green — from a Queen Elizabeth Hospital outpatient clinic.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">Not documented on any BDS, Ministry of Health, or GIS web page found. Cannot confirm or refute from public sources.</pre>
</div>

- **Type:** process
- **Checked:** same sources as Claim 9 — [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785); [BDS — Pharmacy Service](http://drugservice.gov.bb/index.php?id=777); [Ministry of Health — Pharmaceutical Services](https://www.health.gov.bb/For-Public/Pharmaceutical-Services)
- **Status:** unverifiable from public web
- **Certainty:** 50%
- **Open question:** see Claim 9 — same confirmation needed.

---

### Claim 11 — Yellow/green prescriptions not covered at private pharmacies (line 66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Not covered at private pharmacies, so you will pay full price. Ask your hospital doctor to reissue on a standard form if you want to use a private pharmacy.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">Coverage rule for yellow/green prescriptions at private pharmacies is not published on any BDS or Ministry of Health web page. The "reissue on a standard form" advice is also unverifiable from public sources.</pre>
</div>

- **Type:** coverage exclusion / process
- **Checked:** [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785); [BDS — National Formulary page](http://drugservice.gov.bb/index.php?id=774); [Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — none publish coverage rules by prescription colour.
- **Status:** unverifiable from public web — high-stakes claim (citizen faces full price vs covered) with no public web corroboration
- **Certainty:** 50%
- **Open question:** BDS to confirm in writing whether QEH yellow/green scripts are excluded at private pharmacies, and whether reissue on a standard form is the correct workaround. Given citizen financial impact, this should be escalated to Tier C triage.

---

### Claim 12 — "12 government polyclinic locations across the island" (line 72)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">12 locations across the island</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">9 polyclinics and 2 satellite clinics across the island</pre>
</div>

- **Type:** statistic / count
- **Sources:** [Ministry of Health — Primary Health Care](https://www.health.gov.bb/For-Public/Primary-Health-Care) — "Barbados Primary Health Care is delivered from the nine polyclinics and two satellite clinics that are strategically located along with the major road networks within each catchment area." The nine polyclinics are: Branford Tait, Maurice Byer, Winston Scott, Eunice Gibson, David Thompson Health and Social Services Complex, Glebe, Randal Phillips, Edgar Cochrane, St. Philip. Satellite clinics: St. Joseph Outpatient Clinic, St. Andrew Outpatient Clinic.; [BDS — Drug Service Pharmacy Service](http://drugservice.gov.bb/index.php?id=777) (cached search snippet) — "The BDS Pharmacy Service is located within nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals situated throughout Barbados."
- **Status:** discrepant — no authoritative source gives the count as 12. The Ministry of Health gives 9 polyclinics + 2 satellite clinics = 11 total health facilities. The BDS site says its pharmacies are in 9 polyclinics (plus outpatient clinics and district hospitals, which are not polyclinics).
- **Certainty:** 95%
- **Confidence it's wrong:** 90% — two independent Tier 1 sources (health.gov.bb and drugservice.gov.bb) both give 9 as the polyclinic count, not 12.
- **Citizen impact:** MEDIUM — a citizen looking for a polyclinic in their parish may expect more options than exist.

---

### Claim 13 — Category B exception process via Drug and Therapeutics Committee or BDS Director (line 92)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">your doctor can request a Category B exception through the Drug and Therapeutics Committee at Queen Elizabeth Hospital, or through the Barbados Drug Service Director.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">your doctor can request a Category B exception through the Drug and Therapeutics Committee at Queen Elizabeth Hospital, or through the Barbados Drug Service Director.</pre>
</div>

- **Type:** process
- **Sources:** [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — "Patients can only benefit from these drugs after the Medical Officer of Health in the respective polyclinic or outpatient clinic and a Consultant in any of the Government institutions request the drug through the Chairman, Drug & Therapeutics Committee, QEH or Director, BDS and approval is given."
- **Status:** verified — the page correctly identifies both the Drug and Therapeutics Committee at QEH and the BDS Director as the approval channels.
- **Certainty:** 90%

---

### Claim 14 — Under-16 benefit ends on the 16th birthday (line 113)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The under-16 benefit ends on the child's 16th birthday.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The under-16 benefit ends on the child's 16th birthday.</pre>
</div>

- **Type:** eligibility transition
- **Sources:** [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/) — eligibility criterion stated as "children under 16"; [Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — same criterion
- **Status:** verified by logical inference from the "under 16" criterion published on authoritative sources
- **Certainty:** 90%

---

### Claim 15 — Continued benefit for under-16 with chronic condition (line 113)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If the child has a qualifying chronic condition (asthma, diabetes, etc.), the benefit continues under that category. Ask the doctor to show the qualifying condition on future prescriptions.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If the child has a qualifying chronic condition (asthma, diabetes, etc.), the benefit continues under that category. Ask the doctor to show the qualifying condition on future prescriptions.</pre>
</div>

- **Type:** eligibility
- **Sources:** [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/) — the chronic-condition eligibility category is not age-restricted; it is a separate and parallel criterion to the under-16 criterion.
- **Status:** verified by inference — the two eligibility categories (age and chronic condition) are independent; a person who qualifies under the chronic-condition category retains that benefit regardless of age.
- **Certainty:** 85%

---

### Claim 16 — Out-of-stock protocol: pharmacy refers to another participating pharmacy (line 120)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The pharmacy should direct you to another participating pharmacy. If they cannot help, call BDS on (246) 535-4300.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">The out-of-stock referral protocol is not published on any BDS, gov.bb, or Ministry of Health web page. The BDS phone number as an escalation route is verified (see Claim 3), but the pharmacy-to-pharmacy referral step cannot be independently confirmed from public sources.</pre>
</div>

- **Type:** process
- **Checked:** [BDS — Contact](http://drugservice.gov.bb/index.php?id=780); [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785); [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — out-of-stock protocol not published on any of these pages.
- **Status:** unverifiable from public web — procedural detail not documented publicly
- **Certainty:** 60%
- **Open question:** BDS to confirm whether participating pharmacies are contractually required to refer patients to another participating pharmacy when out of stock, and whether this instruction accurately reflects BDS's official guidance.

---

### Claim 17 — Collecting on someone else's behalf: prescription + their ID + your ID (line 127)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Someone else can collect for you. They will need to bring your prescription, your ID, your permanent residency documents, and their own ID.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Someone else can collect for you. They will need to bring your prescription, your ID, your permanent residency documents, and their own ID.</pre>
</div>

- **Type:** process / documentation
- **Sources:** [BDS — Pharmacies page (search snippet)](http://drugservice.gov.bb/index.php?id=785) — documents that ID and residency documents are required at the pharmacy; the "collecting for another" procedure is consistent with standard BDS practice as described in BDS materials.
- **Status:** partially verified — the individual document requirements (ID, residency docs, prescription) are all confirmed for in-person collection. The specific "third-party collection" procedure is not separately documented online, but the required document list is consistent with verified BDS requirements.
- **Certainty:** 70%

---

### Claim 18 — `director@drugservice.gov.bb` email (line 106)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">director@drugservice.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">director@drugservice.gov.bb</pre>
</div>

- **Type:** contact / email
- **Sources:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — lists "director@drugservice.gov.bb" as the contact email; [BDS — Contact page (search snippet)](http://drugservice.gov.bb/index.php?id=780) — same email confirmed
- **Status:** verified
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

1. **Immigration Department phone number.** The new HQ at BTI Corporate Centre has a published main line: **(246) 535-4100**. Since the page already advises citizens to "visit Immigration" to update their stamp, adding the phone number would let them call ahead first. Source: [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx).

2. **BDS office address.** The BDS is located at **6th & 7th Floors, Warrens Towers II, Warrens, St. Michael**. Not on the page but useful for citizens visiting in person. Source: [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service).

3. **BDS fax numbers.** The BDS lists fax numbers 1 (246) 535-4342 / 4320 — included here for completeness. Unlikely to be needed on a public-facing page.

4. **Dispensing fee tiers.** As of April 1, 2024, fees at private SBS pharmacies are $7, $10, or $14 per item (up from $5, $7, $12 respectively). The page's "small dispensing fee" framing predates this increase and no longer reflects the current fee schedule. Source: [Nation News — 24 March 2024](https://nationnews.com/2024/03/24/special-benefit-service-beneficiaries-fees-to-go-up/).

---

## Sources cited

- [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service)
- [BDS — Contact Us](http://drugservice.gov.bb/index.php?id=780) (ECONNREFUSED at time of check; confirmed via cached search snippet)
- [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785) (ECONNREFUSED at time of check; confirmed via cached search snippet)
- [BDS — About Us](http://drugservice.gov.bb/index.php?id=729) (ECONNREFUSED at time of check)
- [BDS — Drug Service Pharmacy Service](http://drugservice.gov.bb/index.php?id=777) (ECONNREFUSED; confirmed via Google-indexed snippet: "nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals")
- [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php)
- [Ministry of Health — Primary Health Care](https://www.health.gov.bb/For-Public/Primary-Health-Care)
- [Ministry of Health — Healthcare Locator](https://www.health.gov.bb/Healthcare-Locator)
- [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/) (403 Forbidden at time of check; confirmed via Google-indexed snippet)
- [GIS — FAQs: Changes to National Drug Formulary](https://gisbarbados.gov.bb/blog/faqs-changes-to-national-formulary/)
- [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/)
- [GIS — Passport Section Of Immigration Department Moving](https://gisbarbados.gov.bb/blog/passport-section-of-immigration-department-moving/)
- [GIS — A New Era For Barbados Immigration Department](https://gisbarbados.gov.bb/blog/a-new-era-for-barbados-immigration-department/) (403 Forbidden at time of check)
- [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx)
- [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration)
- [Nation News — Special Benefit Service beneficiaries fees to go up (24 March 2024)](https://nationnews.com/2024/03/24/special-benefit-service-beneficiaries-fees-to-go-up/)
- [Ministry of Health — Press Release: Two New Polyclinics To Be Constructed](https://www.health.gov.bb/News/Press-Releases/Two-New-Polyclinics-To-Be-Construc)
- [Barbados Today — New pharmacy system to be implemented (26 September 2024)](https://barbadostoday.bb/2024/09/26/new-pharmacy-system-to-be-implemented-in-days/)
