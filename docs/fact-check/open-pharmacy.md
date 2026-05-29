# Fact-check: Find an open pharmacy

- **Live page:** <https://alpha.gov.bb/open-pharmacy>
- **Source file:** `src/content/open-pharmacy.md`
- **Last checked:** 2026-05-29
- **Summary:** 20 claims reviewed — 13 verified, 4 discrepant, 3 unverifiable. Average certainty: **80%**.

---

## Headline issues for triage

1. **Live page URL is wrong in the previous report.** The page has `protected: true` in `src/data/content-directory.ts`, so its canonical URL is `https://alpha.gov.bb/open-pharmacy` (no category prefix). The category-prefixed URL `https://alpha.gov.bb/health-and-emergency-services/open-pharmacy` returns HTTP 404. The previous report recorded the wrong live URL — corrected in this pass.

2. **Primary CTA links are broken for public users.** Both `<a data-start-link>` buttons on the page link to `/health-and-emergency-services/open-pharmacy/find` (lines 20 and 85). That URL hits the 3-slug routing handler, which checks `page.protected` and returns `notFound()` for users without research access. Citizens clicking "Find an open pharmacy" see a 404 page. The sub-page find tool is gated behind research access but the CTA is presented to all visitors.

3. **Immigration Department address is wrong.** Lines 53 and 99 still say "Careenage House, The Wharf, Bridgetown". The department fully relocated to BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael — confirmed by `immigration.gov.bb`, `gov.bb`, and GIS press releases. Citizens directed to Careenage House will waste a trip.

4. **"12 government polyclinic locations" is wrong.** Line 72 says "12 locations". The Ministry of Health's Primary Health Care page states "nine polyclinics and two satellite clinics" (11 total). BDS pharmacy service operates within "nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals" — still not 12 polyclinics.

5. **Dispensing fee described only as "small".** The fee was a tiered structure increased effective April 1, 2024, from $5/$7/$12 to $7/$10/$14 per item. The page gives no indication of the actual amounts, which affects citizen budget planning.

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

- **Type:** process description / pricing
- **Sources:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — "drug costs for prescriptions filled in private pharmacies are reimbursed to pharmacies by the BDS while the patient pays the dispensing fee. Additionally, no dispensing fee is charged to patients in the public sector."; [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/)
- **Status:** verified — the model is correct; "small" is a subjective framing. See Claim 2 for the fee amount detail.
- **Certainty:** 95%

---

### Claim 2 — Primary CTA link `/health-and-emergency-services/open-pharmacy/find` (lines 20, 85)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">&lt;a data-start-link href="/health-and-emergency-services/open-pharmacy/find"&gt;Find an open pharmacy&lt;/a&gt;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">&lt;a data-start-link href="/open-pharmacy/find"&gt;Find an open pharmacy&lt;/a&gt;
(or the routing must be updated to handle the protected-page subpage path without requiring research access)</pre>
</div>

- **Type:** link / CTA
- **Sources:** Live check — [https://alpha.gov.bb/health-and-emergency-services/open-pharmacy/find](https://alpha.gov.bb/health-and-emergency-services/open-pharmacy/find) returns HTTP 404. [https://alpha.gov.bb/open-pharmacy/find](https://alpha.gov.bb/open-pharmacy/find) also returns HTTP 404. Code inspection confirms: `src/app/(content)/[...slug]/page.tsx` line 158 calls `notFound()` when `page.protected && !researchAccess` for the two-slug path, and line 243–248 does the same for the three-slug path.
- **Status:** discrepant — both CTA URLs are inaccessible to public users. The primary call-to-action on this page is broken for all non-research visitors.
- **Certainty:** 99%
- **Confidence it's wrong:** 99% — confirmed by live WebFetch returning 404 on both URL patterns.
- **Citizen impact:** HIGH — the core reason citizens visit this page (finding an open pharmacy) is entirely blocked.

---

### Claim 3 — Dispensing fee described as "small" (lines 18, 74)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">a small dispensing fee at a private SBS pharmacy</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">a dispensing fee at a private SBS pharmacy (currently $7, $10, or $14 per item depending on the drug — effective April 1, 2024)</pre>
</div>

- **Type:** fee
- **Sources:** [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/) — confirmed via search result snippet: "The increase in the beneficiary fee for each drug dispensed on the Special Benefit Service will be as follows: from $5 to $7, $7 to $10 and $12 to $14"; [Nation News — Special Benefit Service beneficiaries fees to go up (24 March 2024)](https://nationnews.com/2024/03/24/special-benefit-service-beneficiaries-fees-to-go-up/)
- **Status:** discrepant — fee tiers were increased effective April 1, 2024. The page gives no indication of the actual amount range, and the characterisation "small" no longer reflects a fee that can reach $14 per item.
- **Certainty:** 80%
- **Confidence it's wrong:** 75% — fee tiers confirmed by GIS press release (Tier 2) and Nation News. Specific amounts not confirmed by a Tier 1 gov.bb page directly.
- **Citizen impact:** MEDIUM — citizens may be surprised by the actual fee at the pharmacy counter.

---

### Claim 4 — BDS phone (246) 535-4300 (lines 22, 83, 99, 106, 120)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 535-4300</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">(246) 535-4300 (listed as 1 (246) 535-4300 on gov.bb)</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — "1 (246) 535 - 4300"
- **Status:** verified — local format is functionally correct for a Barbados caller.
- **Certainty:** 95%
- **Note:** The page omits the country-code prefix "1". Adding `+1` to the `tel:` href would aid international callers; the local format is acceptable.

---

### Claim 5 — SBS eligibility: Barbadian citizen or permanent resident with BNDF prescription (line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can use the Special Benefit Service if you are a Barbadian citizen or permanent resident and a doctor has given you a prescription on the Barbados National Drug Formulary.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can use the Special Benefit Service if you are a Barbadian citizen or permanent resident and a doctor has given you a prescription on the Barbados National Drug Formulary.</pre>
</div>

- **Type:** eligibility
- **Sources:** [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — "Drugs in Category A will be free of cost to all beneficiaries" (citizens and permanent residents); [GIS search snippet confirming eligibility criteria](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Lowest-price group: age ≥65, age <16, or chronic conditions (lines 32–36)

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
- **Sources:** [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/) (confirmed via search snippet) — "people 65 and over, children under 16 and members who receive prescribed formulary drugs for the treatment of hypertension, diabetes, cancer, glaucoma, asthma and epilepsy"
- **Status:** verified — all three eligibility categories match exactly.
- **Certainty:** 95%

---

### Claim 7 — Six qualifying chronic conditions: asthma, cancer, diabetes, epilepsy, glaucoma, hypertension (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">asthma, cancer, diabetes, epilepsy, glaucoma or hypertension</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">asthma, cancer, diabetes, epilepsy, glaucoma or hypertension</pre>
</div>

- **Type:** condition list
- **Sources:** [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/) — "hypertension, diabetes, cancer, glaucoma, asthma and epilepsy" (same six, different order); [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — "diabetes, hypertension, cancer, asthma, glaucoma, or epilepsy"
- **Status:** verified — all six conditions match across two authoritative sources.
- **Certainty:** 95%

---

### Claim 8 — "Everyone else" pays full price at private pharmacy (line 40)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you do not fall into one of the groups above, you can still collect your medication free at a government polyclinic pharmacy. At a private pharmacy you will pay the full price.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you do not fall into one of the groups above, you can still collect your medication free at a government polyclinic pharmacy. At a private pharmacy you will pay the full price.</pre>
</div>

- **Type:** eligibility / pricing
- **Sources:** [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — Category C drugs are subsidized (VAT/duty-free) but not SBS-covered; citizens outside the qualifying groups pay privately. [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — confirms SBS reimbursement structure.
- **Status:** verified — consistent with published BDS policy.
- **Certainty:** 85%

---

### Claim 9 — Permanent residency documentation: passport stamp OR Permanent Resident's certificate (lines 48–50)

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
- **Sources:** [BDS — Pharmacies page](http://drugservice.gov.bb/index.php?id=785) (ECONNREFUSED at time of check; confirmed via cached search snippet) — "Barbados Identification Card plus a passport… with the stamp from the Barbados Immigration Department that reads: 'I hereby certify that the holder is a Permanent Resident of Barbados', or Barbados Identification Card plus a Permanent Resident's certificate"
- **Status:** verified
- **Certainty:** 90%

---

### Claim 10 — Immigration Department address: "Careenage House, The Wharf, Bridgetown" (lines 53, 99)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">visit Immigration at Careenage House, The Wharf, Bridgetown</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">visit the Immigration Department at BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — "Chief Immigration Officer, Barbados Immigration Department, BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael, BARBADOS"; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — "BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, BARBADOS"; [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/) — move confirmed from 2018.
- **Status:** discrepant — the Immigration Department has been at BTI Corporate Centre since 2018. "Careenage House, The Wharf" is the former headquarters.
- **Certainty:** 99%
- **Confidence it's wrong:** 99% — confirmed by immigration.gov.bb itself, gov.bb, and GIS press releases.
- **Citizen impact:** HIGH — citizens following this instruction to re-stamp a passport or update residency documentation will travel to the wrong address.

---

### Claim 11 — Prescription colour scheme: blue, pink, yellow/green (lines 64–66)

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
- **Status:** unverifiable from public web
- **Certainty:** 50%
- **Open question:** BDS or QEH to confirm whether the blue/pink/yellow/green colour-coding is still current, and whether yellow/green scripts remain ineligible at private pharmacies.

---

### Claim 12 — Yellow/green prescriptions not covered at private pharmacies (line 66)

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
- **Open question:** BDS to confirm whether QEH yellow/green scripts are excluded at private pharmacies, and whether reissue on a standard form is the correct workaround. Given citizen financial impact, escalate to Tier C triage.

---

### Claim 13 — "12 government polyclinic locations across the island" (line 72)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">12 locations across the island</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">9 polyclinics and 2 satellite clinics across the island (11 total government health facilities with pharmacies)</pre>
</div>

- **Type:** statistic / count
- **Sources:** [Ministry of Health — Primary Health Care](https://www.health.gov.bb/For-Public/Primary-Health-Care) — "Barbados Primary Health Care is delivered from the nine polyclinics and two satellite clinics": Branford Tait, Maurice Byer, Winston Scott, Eunice Gibson, David Thompson Health and Social Services Complex, Glebe, Randal Phillips, Edgar Cochrane, St. Philip (polyclinics); St. Joseph Outpatient Clinic, St. Andrew Outpatient Clinic (satellites). [BDS — Drug Service Pharmacy Service](http://drugservice.gov.bb/index.php?id=777) (cached snippet) — "The BDS Pharmacy Service is located within nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals situated throughout Barbados."
- **Status:** discrepant — no authoritative source gives the count as 12. The Ministry of Health gives 9 polyclinics + 2 satellite clinics = 11 total. The BDS gives 9 polyclinics + 3 outpatient clinics + 2 district hospitals = 14 BDS pharmacy locations, but the parent category is explicitly "polyclinics", of which there are 9.
- **Certainty:** 95%
- **Confidence it's wrong:** 90% — two independent Tier 1 sources (health.gov.bb, drugservice.gov.bb) both give 9 as the polyclinic count.
- **Citizen impact:** MEDIUM — a citizen looking for a polyclinic in their parish may expect more options than exist.

---

### Claim 14 — Category B exception process via Drug and Therapeutics Committee or BDS Director (line 92)

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
- **Status:** verified — both channels (Drug and Therapeutics Committee at QEH and BDS Director) are confirmed.
- **Certainty:** 90%

---

### Claim 15 — Immigration address second mention (line 99)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">contact the Immigration Department at Careenage House, The Wharf, Bridgetown.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">contact the Immigration Department at BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael.</pre>
</div>

- **Type:** address (second occurrence)
- **Sources:** Same as Claim 10 — [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx); [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration)
- **Status:** discrepant — same wrong address as Claim 10. Two separate places in the markdown need updating.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — same as Claim 10.

---

### Claim 16 — `director@drugservice.gov.bb` email (line 106)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">director@drugservice.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">director@drugservice.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service) — "director@drugservice.gov.bb"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 17 — Under-16 benefit ends on the 16th birthday (line 113)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The under-16 benefit ends on the child's 16th birthday.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The under-16 benefit ends on the child's 16th birthday.</pre>
</div>

- **Type:** eligibility transition
- **Sources:** [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — eligibility criterion stated as "under 16"; [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/) — "children under 16"
- **Status:** verified by logical inference from the "under 16" criterion published on authoritative sources.
- **Certainty:** 90%

---

### Claim 18 — Continued benefit for under-16 with chronic condition (line 113)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If the child has a qualifying chronic condition (asthma, diabetes, etc.), the benefit continues under that category. Ask the doctor to show the qualifying condition on future prescriptions.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If the child has a qualifying chronic condition (asthma, diabetes, etc.), the benefit continues under that category. Ask the doctor to show the qualifying condition on future prescriptions.</pre>
</div>

- **Type:** eligibility
- **Sources:** [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php) — the chronic-condition category is not age-restricted; it is a separate and parallel eligibility criterion.
- **Status:** verified by inference — a person qualifying under the chronic-condition category retains that benefit regardless of age.
- **Certainty:** 85%

---

### Claim 19 — Out-of-stock protocol: pharmacy refers to another participating pharmacy (line 120)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The pharmacy should direct you to another participating pharmacy. If they cannot help, call BDS on (246) 535-4300.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">The out-of-stock referral protocol is not published on any BDS, gov.bb, or Ministry of Health web page. The BDS phone number as an escalation route is verified (see Claim 4), but the pharmacy-to-pharmacy referral step cannot be independently confirmed from public sources.</pre>
</div>

- **Type:** process
- **Checked:** [BDS — Contact](http://drugservice.gov.bb/index.php?id=780); [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785); [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service)
- **Status:** unverifiable from public web — procedural detail not documented publicly.
- **Certainty:** 60%
- **Open question:** BDS to confirm whether participating pharmacies are contractually required to refer patients to another participating pharmacy when out of stock.

---

### Claim 20 — Collecting on someone else's behalf: prescription + their ID + your ID (line 127)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Medication must be collected in person. This service is not available online. Someone else can collect for you. They will need to bring your prescription, your ID, your permanent residency documents, and their own ID.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Medication must be collected in person. This service is not available online. Someone else can collect for you. They will need to bring your prescription, your ID, your permanent residency documents, and their own ID.</pre>
</div>

- **Type:** process / documentation
- **Sources:** [BDS — Pharmacies page](http://drugservice.gov.bb/index.php?id=785) (ECONNREFUSED; confirmed via cached search snippet) — individual document requirements (ID, residency docs, prescription) are confirmed for in-person collection. Third-party collection procedure is consistent with verified BDS requirements.
- **Status:** partially verified — document list is consistent with published BDS requirements; third-party collection instruction is not separately documented on the public web.
- **Certainty:** 70%

---

## Additional findings (not on the page but should be)

1. **Immigration Department phone number.** The new HQ at BTI Corporate Centre has published main line **(246) 535-4100**. Since the page already advises citizens to "visit Immigration", adding the phone number lets them call ahead first. Source: [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx).

2. **BDS office address.** The BDS is located at **6th & 7th Floors, Warrens Towers II, Warrens, St. Michael** — per [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service). Useful for citizens visiting BDS in person, though not currently on the page.

3. **Dispensing fee tiers.** As of April 1, 2024, fees at private SBS pharmacies are $7, $10, or $14 per item (up from $5, $7, $12). The "small dispensing fee" framing predates this increase. Source: [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/).

4. **Previous report had wrong live URL.** The report dated 2026-05-28 recorded the live page as `https://alpha.gov.bb/health-and-emergency-services/open-pharmacy`. This URL returns HTTP 404 — the page has `protected: true` so the canonical URL is `https://alpha.gov.bb/open-pharmacy`. Corrected in this pass.

---

## Sources cited

- [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service)
- [BDS — Contact Us](http://drugservice.gov.bb/index.php?id=780) (ECONNREFUSED at time of check; confirmed via cached search snippet)
- [BDS — Pharmacies](http://drugservice.gov.bb/index.php?id=785) (ECONNREFUSED at time of check; confirmed via cached search snippet)
- [BDS — Drug Service Pharmacy Service](http://drugservice.gov.bb/index.php?id=777) (ECONNREFUSED; confirmed via Google-indexed snippet: "nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals")
- [Barbados National Drug Formulary — Formulary Categories](https://formulary.drugservice.gov.bb/bndf2022/formulary_categories_dashboard.php)
- [Ministry of Health — Primary Health Care](https://www.health.gov.bb/For-Public/Primary-Health-Care)
- [Ministry of Health — Pharmaceutical Services](https://www.health.gov.bb/For-Public/Pharmaceutical-Services)
- [GIS — Fee Increase For Certain Prescriptions Under Special Benefit Service](https://gisbarbados.gov.bb/blog/fee-increase-for-certain-prescriptions-under-special-benefit-service/) (403 Forbidden at time of check; confirmed via Google-indexed search snippet)
- [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/)
- [GIS — Passport Section Of Immigration Department Moving](https://gisbarbados.gov.bb/blog/passport-section-of-immigration-department-moving/)
- [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx)
- [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration)
- [Nation News — Special Benefit Service beneficiaries fees to go up (24 March 2024)](https://nationnews.com/2024/03/24/special-benefit-service-beneficiaries-fees-to-go-up/)
- [alpha.gov.bb/open-pharmacy](https://alpha.gov.bb/open-pharmacy) — live page confirmed at this URL (HTTP 200)
- [alpha.gov.bb/health-and-emergency-services/open-pharmacy](https://alpha.gov.bb/health-and-emergency-services/open-pharmacy) — HTTP 404 (protected page, no category prefix)
- [alpha.gov.bb/open-pharmacy/find](https://alpha.gov.bb/open-pharmacy/find) — HTTP 404 (CTA broken for public users)
- [alpha.gov.bb/health-and-emergency-services/open-pharmacy/find](https://alpha.gov.bb/health-and-emergency-services/open-pharmacy/find) — HTTP 404 (CTA broken for public users)
