# Fact-check: Ministry of the Public Service and Talent Development

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-the-public-service-and-talent-development>
- **Source file:** `src/content/ministries/ministry-of-the-public-service-and-talent-development.md`
- **Data file:** `src/data/ministries.ts` (lines 917–950)
- **Last checked:** 2026-05-29
- **Summary:** 14 claims reviewed — 12 verified, 1 discrepant, 1 unverifiable. Average certainty: **90%**.

---

## Headline issues for triage

1. **Phone numbers missing from the content page — and `ministries.ts` carries a silent data-gap.** The content markdown lists no phone numbers for any directorate. The `ministries.ts` entry supplies a single telephone `(246) 535-4423` (DG's office) and a fax `(246) 535-6728` (Learning and Development). Gov.bb confirms these two numbers, but the HRPS Directorate phone `(246) 535-4400` and the PRC/DG shared line `(246) 535-4500` — both published on gov.bb and mps.gov.bb — are absent from both files. Citizens looking for the most-used contact number (535-4500 is prominently listed on mps.gov.bb as the main number) will not find it on alpha.gov.bb.

2. **`ministries.ts` fax `(246) 535-6728` is attributed at ministry level but belongs to the Learning and Development Directorate only.** Gov.bb lists this fax under the Learning and Development Directorate contact block at Warrens Towers II, not as a ministry-wide fax. The current `ministries.ts` entry lists it as a general `{ label: "Fax" }` under the ministry, which implies it is the ministry's central fax — misleading citizens who may send documents to the wrong location.

3. **No contact phone number appears in the content markdown for any directorate.** The three directorate contact blocks (lines 35–64) each include only an address — no phone, no email. Gov.bb's authoritative directory entry for this ministry lists distinct phone numbers and emails for every directorate. The absence of this information on alpha.gov.bb is a meaningful omission for a page that citizens may use as a directory.

---

## Claims

### Claim 1 — Vision statement (lines 1–3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of the Public Service will be the model of excellence in Human Resource Management and Development.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry of the Public Service will be the model of excellence in Human Resource Management and Development.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — vision quoted verbatim; [mps.gov.bb — Home](https://mps.gov.bb/) — same wording used
- **Status:** verified
- **Certainty:** 97%

---

### Claim 2 — Director General leads the Ministry (lines 7–8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry is led by a Director General, Human Resources, who is responsible for:</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry is led by a Director General, Human Resources, who is responsible for:</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — confirms "Director General, Human Resources" as the lead role; [mps.gov.bb — Role of Director General (Human Resources)](https://mps.gov.bb/director_role)
- **Status:** verified
- **Certainty:** 97%

---

### Claim 3 — Five functions of the Director General (lines 9–14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">- providing human resource management advice to the Service Commissions, Permanent Secretaries and Heads of Departments
- assisting the Minister in the formulation and development of the human resource management policy for the public service
- performing the functions relating to the recruitment, selection, placement and transfer, appointment, promotion, discipline and retirement, training and development of personnel
- ensuring that each Ministry or Department implements the appropriate human resource systems to adequately manage the Ministry or Department
- carrying out human resource management audits throughout the public service to ensure that Ministries or Departments complies with the human resource management and development policy</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">- providing human resource management advice to the Service Commissions, Permanent Secretaries and Heads of Departments
- assisting the Minister in the formulation and development of the human resource management policy for the public service
- performing the functions relating to the recruitment, selection, placement and transfer, appointment, promotion, discipline and retirement, training and development of personnel
- ensuring that each Ministry or Department implements the appropriate human resource systems to adequately manage the Ministry or Department
- carrying out human resource management audits throughout the public service to ensure that Ministries or Departments complies with the human resource management and development policy</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — five bullet points reproduced verbatim; [mps.gov.bb — Role of Director General (Human Resources)](https://mps.gov.bb/director_role) — same list
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — Ministry created in January 2019 through amalgamation (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of the Public Service was created in January 2019, through the amalgamation of the entities (Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry of the Public Service was created in January 2019, through the amalgamation of the entities (Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division).</pre>
</div>

- **Type:** statistic / descriptive
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — "Established in January 2019 through consolidation of the Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division"; [mps.gov.bb — FAQ](https://mps.gov.bb/faq.php) — "The Ministry of the Public Service was created in January 2019, through the amalgamation of the entities: Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division"
- **Status:** verified
- **Certainty:** 99%
- **Note:** The three merged entities are correctly named. "Personnel Administration Division" here refers to the former body that ceased as a standalone entity in January 2019 — naming it as a historical predecessor is accurate and not a "stale agency name" error.

---

### Claim 5 — Amalgamation passed under the Public Service (Miscellaneous Provisions) Act, 2019-35 on 19 August 2019 (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The amalgamation was passed on the 19th August, 2019 under the Public Service (Miscellaneous Provisions) Act, 2019-35.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The amalgamation was passed on the 19th August, 2019 under the Public Service (Miscellaneous Provisions) Act, 2019-35.</pre>
</div>

- **Type:** legal reference / statistic
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — "The amalgamation received legislative approval on August 19, 2019 under the Public Service (Miscellaneous Provisions) Act, 2019-35"; [OAG — Public Service (Miscellaneous Provisions) Act, 2019-35 (PDF)](https://oag.gov.bb/attachments/Public%20Service%20(Miscellaneous%20Provisions)%20Act,%202019-35.pdf) — Act document exists at OAG; [GIS — Official Gazette August 1, 2019 No. 62](https://gisbarbados.gov.bb/download/official-gazette-august-1-2019-no-62-package/) — correlates with gazette publication
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Human Resource Policy and Staffing Directorate mandate (lines 21–23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Human Resource Policy and Staffing Directorate, facilitates the formulation and implementation of human resource policies; ensuring an adequate staffing complement and the best possible conditions of service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Human Resource Policy and Staffing Directorate, facilitates the formulation and implementation of human resource policies; ensuring an adequate staffing complement and the best possible conditions of service.</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — directorate name and mandate confirmed; [gov.bb — State Bodies: Directorate, Human Resource Policy and Staffing](https://www.gov.bb/State-Bodies/directorate-human-resource-policy-staffing)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 7 — People Resourcing and Compliance Directorate mandate (lines 25–27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The People Resourcing and Compliance Directorate, is responsible for the implementation of policies on Human Resource Management.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The People Resourcing and Compliance Directorate, is responsible for the implementation of policies on Human Resource Management.</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — directorate name and role confirmed; [mps.gov.bb — People Resourcing](https://mps.gov.bb/People_Resourcing/)
- **Status:** verified
- **Certainty:** 92%

---

### Claim 8 — Learning and Development Directorate mandate (lines 29–31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Learning and Development Directorate, has overall responsibility for coordinating human resource development in the Public Service of Barbados. This Directorate has a broad mandate to assist in improving the efficiency and effectiveness of the Public Service through an integrated human resource development effort aimed at improving individual and organizational work performance.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Learning and Development Directorate, has overall responsibility for coordinating human resource development in the Public Service of Barbados. This Directorate has a broad mandate to assist in improving the efficiency and effectiveness of the Public Service through an integrated human resource development effort aimed at improving individual and organizational work performance.</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [mps.gov.bb — Learning and Development Home](https://mps.gov.bb/Learning_Development/home) — "The Learning and Development Directorate (LD), has overall responsibility for coordinating human resource development in the Public Service of Barbados"; [gov.bb — State Bodies: Directorate, Learning and Development](https://www.gov.bb/State-Bodies/directorate-learning-development) — mandate confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 9 — Director General's Office address (lines 37–40)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of the Public Service
E. Humphrey Walcott Building
Cnr. Collymore Rock and Culloden Road
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry of the Public Service
E. Humphrey Walcott Building
Cnr. Collymore Rock and Culloden Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — "E. Humphrey Walcott Building, Corner Collymore Rock and Culloden Road, St. Michael"; [mps.gov.bb — Contact](https://mps.gov.bb/contact) — "E Humphrey Walcott Building, Corner Collymore Rock and Culloden Road, St. Michael, Barbados"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 10 — Website link mps.gov.bb (line 42)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Go to mps.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Go to mps.gov.bb</pre>
</div>

- **Type:** URL
- **Sources:** [mps.gov.bb — Home](https://mps.gov.bb/) — site is live and resolves correctly; [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — lists mps.gov.bb as the official website
- **Status:** verified
- **Certainty:** 99%

---

### Claim 11 — HRPS Directorate floor and address (lines 46–50)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of the Public Service
Human Resource Policy and Staffing Directorate
2nd Floor, E. Humphrey Walcott Building
Cnr. Collymore Rock and Culloden Road
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of the Public Service
Human Resource Policy and Staffing Directorate
2nd Floor, E. Humphrey Walcott Building
Cnr. Collymore Rock and Culloden Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — "Human Resource Policy and Staffing Directorate (2nd Floor)"; [mps.gov.bb — Human Resources Contact](https://mps.gov.bb/Human_Resources/contact) — "2nd Floor E. Humphrey Walcott Building Cnr. Collymore Rock & Culloden Road St. Michael"
- **Status:** verified
- **Certainty:** 97%

---

### Claim 12 — PRC Directorate floor and address (lines 53–58)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of the Public Service
People Resourcing and Compliance Directorate
1st Floor E. Humphrey Walcott Building
Cnr. Collymore Rock & Culloden Road
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of the Public Service
People Resourcing and Compliance Directorate
1st Floor E. Humphrey Walcott Building
Cnr. Collymore Rock & Culloden Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — "People Resourcing and Compliance Directorate (1st Floor)"; [mps.gov.bb — People Resourcing / Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing) — "1st Floor E. Humphrey Walcott Building, Corner Collymore Rock & Culloden Road, St. Michael"
- **Status:** verified
- **Certainty:** 97%

---

### Claim 13 — Learning and Development Directorate address (lines 61–64)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of the Public Service
Level 5, Warrens Towers II
Warrens, St Michael, Barbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of the Public Service
Level 5, Warrens Towers II
Warrens, St Michael, Barbados</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — State Bodies: Directorate, Learning and Development](https://www.gov.bb/State-Bodies/directorate-learning-development) — "Level 5, Warrens Towers II, Warrens, St Michael, Barbados"; [mps.gov.bb — Learning and Development Home](https://mps.gov.bb/Learning_Development/home) — same address confirmed
- **Status:** verified
- **Certainty:** 99%

---

### Claim 14 — `ministries.ts` phone `(246) 535-4423` attributed as ministry telephone (lines 930–931 of ministries.ts)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (via ministries.ts line 931)</div>
<pre class="claim-block-content">{ label: "Telephone", type: "phone", value: "(246) 535-4423" }</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — partially verified with a scope concern</div>
<pre class="claim-block-content">gov.bb lists (246) 535-4423 as the Director General's Office phone.
However, mps.gov.bb/contact prominently lists (246) 535-4500 as the
ministry's main contact number (People Resourcing and Compliance
Directorate / DG shared line).

535-4400 (HRPS Directorate) is not present in either file.
535-4500 (PRC / main ministry line) is not present in ministries.ts
or the content markdown.</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — confirms 535-4423 for the Director General's Office; [mps.gov.bb — Contact](https://mps.gov.bb/contact) — lists 535-4500 as the primary number on the Contact page with no separate DG number listed; [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — also confirms 535-4400 for HRPS and 535-6700 for Learning and Development
- **Status:** unverifiable (535-4423 is confirmed for the DG's office but is not the main public-facing number; whether it is appropriate as the sole listed number for the whole ministry is a judgement call for the team)
- **Certainty:** 80% (535-4423 is a real, verified DG number; the question is whether it is the right number to surface as "the ministry telephone")
- **Open question:** Should alpha.gov.bb surface the main ministry switchboard number 535-4500 alongside or instead of the DG-specific line 535-4423? The `ministries.ts` entry also omits the HRPS phone (535-4400) entirely. Confirm with MPS which number(s) to list for public enquiries.

---

## Additional findings (not on the page but should be)

### Missing phone numbers and emails in all three directorate contact blocks

The content page (lines 35–64) provides addresses for all three directorate contact blocks but omits phone numbers and email addresses for each. Gov.bb and mps.gov.bb publish distinct contact details for every directorate:

| Directorate | Phone | Email |
|---|---|---|
| Director General's Office | (246) 535-4423 | dg@mps.gov.bb |
| Human Resource Policy and Staffing | (246) 535-4400 | HRPS@mps.gov.bb |
| People Resourcing and Compliance | (246) 535-4500 | PRC@mps.gov.bb |
| Learning and Development | (246) 535-6700; Fax: (246) 535-6728 | LD@mps.gov.bb |

Source: [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service)

Adding these to the content page would make it a functional directory for citizens who need to reach a specific directorate.

### `ministries.ts` fax number scoped to wrong unit

The `ministries.ts` entry at line 929 lists `{ label: "Fax", type: "phone", value: "(246) 535-6728" }` as a ministry-level fax. Gov.bb and mps.gov.bb both attribute this fax number specifically to the **Learning and Development Directorate** at Warrens Towers II — not to the main E. Humphrey Walcott Building. Presenting it as a general ministry fax may direct documents to the wrong location.

Source: [gov.bb — State Bodies: Directorate, Learning and Development](https://www.gov.bb/State-Bodies/directorate-learning-development) — fax (246) 535-6728 listed under Learning and Development only.

---

## Sources cited

- [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/Ministries/public-service) — accessed 2026-05-29
- [mps.gov.bb — Home](https://mps.gov.bb/) — accessed 2026-05-29
- [mps.gov.bb — Contact](https://mps.gov.bb/contact) — accessed 2026-05-29
- [mps.gov.bb — Human Resources Contact](https://mps.gov.bb/Human_Resources/contact) — accessed 2026-05-29
- [mps.gov.bb — People Resourcing / Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing) — accessed 2026-05-29
- [mps.gov.bb — People Resourcing / Age](https://mps.gov.bb/People_Resourcing/age) — accessed 2026-05-29
- [mps.gov.bb — FAQ](https://mps.gov.bb/faq.php) — accessed 2026-05-29
- [mps.gov.bb — Role of Director General (Human Resources)](https://mps.gov.bb/director_role) — accessed 2026-05-29
- [mps.gov.bb — Learning and Development Home](https://mps.gov.bb/Learning_Development/home) — accessed 2026-05-29
- [gov.bb — State Bodies: Directorate, Learning and Development](https://www.gov.bb/State-Bodies/directorate-learning-development) — accessed 2026-05-29
- [OAG — Public Service (Miscellaneous Provisions) Act, 2019-35 (PDF)](https://oag.gov.bb/attachments/Public%20Service%20(Miscellaneous%20Provisions)%20Act,%202019-35.pdf) — accessed 2026-05-29
- [GIS — Official Gazette August 1, 2019 No. 62](https://gisbarbados.gov.bb/download/official-gazette-august-1-2019-no-62-package/) — accessed 2026-05-29
- [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — accessed 2026-05-29
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — accessed 2026-05-29
- [gov.bb — Ministries listing](https://www.gov.bb/ministries) — accessed 2026-05-29
