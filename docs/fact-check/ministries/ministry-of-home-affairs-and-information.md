# Fact-check: Ministry of Home Affairs and Information

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-home-affairs-and-information>
- **Source file:** `src/content/ministries/ministry-of-home-affairs-and-information.md`
- **Data file:** `src/data/ministries.ts` (lines 551–676)
- **Last checked:** 2026-05-28
- **Summary:** 17 claims reviewed — 13 verified, 2 discrepant, 2 unverifiable. Average certainty: **85%**.

---

## Headline issues for triage

1. **Address uses "Webster Business Park" — official spelling is "Webster's Business Park".** The source content (line 7) and the gov.bb MHAI page both omit the possessive apostrophe. The OAG — co-located in the same building — uses "Webster's Business Park" on its official contact page, as does the gov.bb AG entry in `ministries.ts` (line 139). The building name should be standardised to the possessive form across all ministry entries. Citizen impact is LOW (the address is still findable), but inconsistency erodes trust.

2. **Meteorological Office ministry attribution is contested.** The source content does not mention the Met Office directly, but `ministries.ts` (line 658) lists "The Meteorological Office" as a Home Affairs associated department. The gov.bb Departments page attributes the Meteorological Office to MIST; the agriculture.gov.bb subdomain hosts a "Barbados Meteorological Services" page under Agriculture. However, the 2025–2026 Barbados Estimates of Expenditure (Parliament document) places Meteorological Services under Head 33 — Ministry of Home Affairs and Information. This conflicts across official sources and should be resolved by the GovBB team with the relevant ministry.

3. **Fire Service headquarters address on gov.bb is stale.** `ministries.ts` lists "The Fire Service Department" as a Home Affairs associated body (line 659). The canonical fireservice.gov.bb now shows the headquarters as the CMM Emergency Services Complex, Prince Road, Pine Plantation Road, St. Michael — NOT the Level 5 GPO Building, Cheapside that appears on gov.bb/Departments/fire-service. This is a stale gov.bb Departments page; the alpha.gov.bb ministries page itself does not name the Fire Service's address, so no direct correction is needed to this page, but the wider data may mislead citizens searching for Fire Service contact details from the ministry listing.

4. **Intro sentence says "marriage license" (American spelling).** The Government of Barbados uses "marriage licence" (British spelling) throughout all official sources including gov.bb, barbadoslawcourts.gov.bb, and the relevant legislation. The alpha.gov.bb intro sentence on line 1 should be corrected.

---

## Claims

### Claim 1 — Introductory sentence: marriage licence referral (line 1)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To apply for a marriage license or for questions regarding marriage requirements contact the Ministry of Home Affairs.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">To apply for a marriage licence or for questions regarding marriage requirements contact the Ministry of Home Affairs and Information.</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [gov.bb — Get a Marriage Licence](https://www.gov.bb/marriage-licence); [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [barbadoslawcourts.gov.bb — Getting Married](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages)
- **Status:** discrepant — two issues: (a) "license" is the American spelling; the British spelling "licence" is used throughout all official Barbados government sources; (b) the full ministry name is "Ministry of Home Affairs and Information", not "Ministry of Home Affairs".
- **Certainty:** 99%
- **Confidence it's wrong:** 97%
- **Citizen impact:** LOW — the referral is functionally correct; the spelling error and truncated name are minor but inconsistent with official usage.

---

### Claim 2 — Ministry name (line 5)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Home Affairs and Information</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Home Affairs and Information</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 3 — Building and address (lines 6–8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Jones Building
Webster Business Park
Wildey, St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Jones Building
Webster's Business Park
Wildey, St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs) (uses "Webster Business Park" without apostrophe); [oag.gov.bb — Contact](https://oag.gov.bb/contact) (uses "Webster's Business Park" with apostrophe for the same building); [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general) (uses "Webster's Business Park")
- **Status:** discrepant — the possessive form "Webster's Business Park" is used by the OAG (co-tenant) and the gov.bb AG listing. The gov.bb MHAI page itself also omits the apostrophe, which suggests the inconsistency is systemic across gov.bb, not just on alpha.gov.bb. The alpha.gov.bb page reproduces the form found on gov.bb/Ministries/home-affairs but the OAG's own site (a higher-confidence source for the building name) uses the apostrophe. Recommend standardising on "Webster's Business Park".
- **Certainty:** 85%
- **Confidence it's wrong:** 70%
- **Citizen impact:** LOW — the address is findable under either spelling.

---

### Claim 4 — PBX telephone (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">PBX    (246) 535-7260</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">PBX    (246) 535-7260</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [gov.bb — Get a Marriage Licence](https://www.gov.bb/marriage-licence) (confirms 535-7260 as the appointments line)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Minister telephone (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Minister    (246) 535-0434</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Minister    (246) 535-0434</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified — matches gov.bb exactly.
- **Certainty:** 90%
- **Note:** This line directly superseded when minister changed from Wilfred Abrahams to Gregory Nicholls in February 2026. The number is the minister's line at the ministry, not personal — it should remain correct regardless of who holds the portfolio.

---

### Claim 6 — Permanent Secretary telephone (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Permanent Secretary    (246) 535-7261</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Permanent Secretary    (246) 535-7261</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 7 — PS Secretary telephone (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">PS Secretary    (246) 535-7273</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">PS Secretary    (246) 535-7273</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 8 — Deputy Permanent Secretary telephone (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Deputy Permanent Secretary    (246) 535-7262</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Deputy Permanent Secretary    (246) 535-7262</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 9 — Financial Comptroller telephone (line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Financial Comptroller    (246) 535-7268</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Financial Comptroller    (246) 535-7268</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 10 — Senior Admin Officer telephone (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Senior Admin Officer    (246) 535-7263</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Senior Admin Officer    (246) 535-7263</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 11 — Executive Officer telephone (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Executive Officer    (246) 535-7270</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Executive Officer    (246) 535-7270</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 12 — Fax number (line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">FAX    (246) 535-7286</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">FAX    (246) 535-7286</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 13 — Minister name (ministries.ts line 561)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Hon. Gregory P. B. Nicholls, M.P.
Minister of Home Affairs and Information</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. Gregory P. B. Nicholls, M.P.
Minister of Home Affairs and Information</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8); [Barbados Today — Cabinet ministers sworn in, 16 Feb 2026](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- **Status:** verified — confirmed sworn in 16 February 2026 with this portfolio.
- **Certainty:** 99%

---

### Claim 14 — Email addresses (ministries.ts lines 642–643)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">homeaffairs@mha.gov.bb
haffairs@mha.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">homeaffairs@mha.gov.bb
haffairs@mha.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [gov.bb — Get a Marriage Licence](https://www.gov.bb/marriage-licence) (confirms haffairs@mha.gov.bb)
- **Status:** verified — both emails appear on gov.bb.
- **Certainty:** 95%

---

### Claim 15 — Associated departments: Home Affairs cluster (ministries.ts lines 655–666)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Home Affairs:
The Department of Emergency Management
The Meteorological Office
The Fire Service Department
The Post Office
The Probation Department
The Immigration Department
The Government Industrial Schools
Barbados Prison Service
The National Council on Substance Abuse</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — open questions remain</div>
<pre class="claim-block-content">Confirmed under MHAI (via gov.bb, prisonservice.gov.bb, ncsa.gov.bb, probation, immigration):
- The Department of Emergency Management
- The Post Office
- The Probation Department
- The Immigration Department
- The Government Industrial Schools
- Barbados Prison Service
- The National Council on Substance Abuse

Contested / needs resolution:
- The Meteorological Office: gov.bb/Departments/meteorological-department attributes it
  to MIST; the 2025–2026 Estimates of Expenditure (Parliament doc) places it under
  Head 33 — Ministry of Home Affairs and Information. The agriculture.gov.bb subdomain
  hosts a separate "Barbados Meteorological Services" under Agriculture.
- The Fire Service Department: the official name on gov.bb is "Fire Service Department";
  correct. However the headquarters listed on gov.bb is the stale GPO Building address
  (the BFS actually moved to the CMM Complex, Prince Road in Oct 2025).</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [gov.bb — Departments/prison](https://www.gov.bb/Departments/prison); [gov.bb — Departments/immigration](https://www.gov.bb/Departments/immigration); [gov.bb — Departments/probation](https://www.gov.bb/Departments/probation); [gov.bb — Departments/industrial-school](https://www.gov.bb/Departments/industrial-school); [ncsa.gov.bb](https://www.ncsa.gov.bb/); [gov.bb — Departments/meteorological-department](https://www.gov.bb/Departments/meteorological-department); [agriculture.gov.bb — Meteorological Services](https://agriculture.gov.bb/Departments/Meteorological-Services); [fireservice.gov.bb — Contact](https://fireservice.gov.bb/contact/); [barbadosparliament.com — Estimates 2025–2026](https://www.barbadosparliament.com/uploads/document/6f738df0c1421b4c87131990813a6093.pdf)
- **Status:** unverifiable for the Meteorological Office attribution; all others verified.
- **Certainty:** 85% (seven of nine confirmed; one contested; one minor naming/address note)
- **Open question:** Is the Meteorological Office currently under MHAI or MIST? The Estimates document suggests MHAI; the gov.bb Departments page says MIST. The GovBB team should confirm with the relevant Permanent Secretary.

---

### Claim 16 — Associated departments: Information and Public Affairs cluster (ministries.ts lines 668–675)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Information and Public Affairs:
Caribbean Broadcasting Corporation
The Government Information Service
The Government Printing Department</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Information and Public Affairs:
Caribbean Broadcasting Corporation
The Government Information Service
The Government Printing Department</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [gov.bb — Departments/gov-information-service](https://www.gov.bb/Departments/gov-information-service); [gov.bb — State-Bodies/caribbean-broadcasting-corporation](https://www.gov.bb/State-Bodies/caribbean-broadcasting-corporation); [gov.bb — Departments/printing-dept](https://www.gov.bb/Departments/printing-dept)
- **Status:** verified — all three bodies appear on gov.bb under the MHAI listing and have their own department/state-body pages.
- **Certainty:** 99%

---

### Claim 17 — Ministry mandate text (ministries.ts line 559)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To maintain law and order, manage immigration, and ensure the effective flow of government information.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not independently confirmed</div>
<pre class="claim-block-content">The gov.bb/Ministries/home-affairs page does not publish a formal mission/vision
statement. No identical phrasing found on GIS or any Tier 1 source. The statement
is broadly accurate as a summary of the ministry's portfolio but is not verbatim from
an authoritative source.
Checked: [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs),
[gisbarbados.gov.bb — MHAI tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-home-affairs/)</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs); [gisbarbados.gov.bb — MHAI tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-home-affairs/)
- **Status:** unverifiable — no Tier 1 source publishes this exact mandate text. It is a plausible editorial summary; no evidence it is wrong, but no evidence it is an official statement.
- **Certainty:** 45%
- **Open question:** Does MHAI publish an official mission or mandate statement? If so, the page should quote it verbatim. If not, the summary is editorial and should be reviewed by the ministry.

---

## Additional findings (not on the page but should be)

**Marriage Licence additional contact numbers.** The gov.bb marriage licence page lists two additional direct-dial numbers not shown in the MHAI directory table: (246) 535-7285 (Marriage Licence Desk) and (246) 535-7267 (general line). Citizens searching for the Marriage Licence Office may benefit from having these on the ministry page or on a dedicated marriage-licence page. The gov.bb page also notes appointments are available through govtbarbadosapointmentsystem.as.me/MarriageLicense.

**Temporary relocation (historical note for awareness).** In May 2024, the Ministry temporarily relocated management staff to Worthing Corporate Centre, Worthing Main Road, Christ Church, and the Marriage Licence Office moved to the 4th Floor, Barbados Postal Service, Cheapside, Bridgetown. The renovation period ran approximately 21 May – 14 July 2024. All evidence from gov.bb and GIS Facebook posts in 2024 confirms the ministry has since returned to Jones Building. The alpha.gov.bb page correctly shows the Jones Building address. No correction needed, but the team should note this in case a future renovation triggers a similar relocation.

**Fire Service — new HQ address.** Although no fire service address appears on this ministry page, the associated department listing references "The Fire Service Department". The fireservice.gov.bb website now shows the Cadogan, Mayers, Marshall (CMM) Emergency Services Complex, Prince Road, Pine Plantation Road, St. Michael as the current headquarters (the gov.bb Departments page still shows the old GPO Building address). The alpha.gov.bb Fire Service page (if one exists) should be updated separately; this finding is noted here for cross-reference.

---

## Sources cited

- [gov.bb — Ministry of Home Affairs and Information](https://www.gov.bb/Ministries/home-affairs)
- [gov.bb — Get a Marriage Licence](https://www.gov.bb/marriage-licence)
- [oag.gov.bb — Contact](https://oag.gov.bb/contact)
- [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general)
- [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Barbados Today — Temporary relocation of MHAI (15 May 2024)](https://barbadostoday.bb/2024/05/15/temporary-relocation-of-the-ministry-of-home-affairs-and-information/)
- [GIS — Temporary Relocation Of Ministry Of Home Affairs & Information](https://gisbarbados.gov.bb/blog/temporary-relocation-of-ministry-of-home-affairs-information/)
- [gov.bb — Departments/prison (Barbados Prison Service)](https://www.gov.bb/Departments/prison)
- [prisonservice.gov.bb](https://prisonservice.gov.bb/)
- [gov.bb — Departments/immigration](https://www.gov.bb/Departments/immigration)
- [gov.bb — Departments/probation](https://www.gov.bb/Departments/probation)
- [gov.bb — Departments/industrial-school](https://www.gov.bb/Departments/industrial-school)
- [ncsa.gov.bb — National Council on Substance Abuse](https://www.ncsa.gov.bb/)
- [gov.bb — Departments/meteorological-department](https://www.gov.bb/Departments/meteorological-department)
- [agriculture.gov.bb — Barbados Meteorological Services](https://agriculture.gov.bb/Departments/Meteorological-Services)
- [gov.bb — Departments/gov-information-service](https://www.gov.bb/Departments/gov-information-service)
- [gov.bb — State-Bodies/caribbean-broadcasting-corporation](https://www.gov.bb/State-Bodies/caribbean-broadcasting-corporation)
- [gov.bb — Departments/printing-dept](https://www.gov.bb/Departments/printing-dept)
- [fireservice.gov.bb — Contact](https://fireservice.gov.bb/contact/)
- [barbadosparliament.com — Estimates 2025–2026 (PDF)](https://www.barbadosparliament.com/uploads/document/6f738df0c1421b4c87131990813a6093.pdf)
- [gisbarbados.gov.bb — MHAI tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-home-affairs/)
