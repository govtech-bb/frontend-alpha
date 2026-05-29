# Fact-check: Ministry of Home Affairs and Information

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-home-affairs-and-information>
- **Source file:** `src/content/ministries/ministry-of-home-affairs-and-information.md`
- **Data file:** `src/data/ministries.ts` (lines 551–676)
- **Last checked:** 2026-05-29
- **Summary:** 20 claims reviewed — 16 verified, 2 discrepant, 2 unverifiable. Average certainty: **87%**.

---

## Headline issues for triage

1. **Intro sentence uses "license" (American spelling) and truncates the ministry name.** Line 1 of the source markdown says "marriage license" and "Ministry of Home Affairs" (without "and Information"). All Barbados official sources use the British spelling "licence" and the full ministry name "Ministry of Home Affairs and Information". This is a Tier-B discrepancy with low citizen impact (functionally correct referral) but material inconsistency with official usage.

2. **Address uses "Webster Business Park" — official spelling may be "Webster's Business Park".** The source content (line 7) and the gov.bb MHAI page both omit the possessive apostrophe. The OAG — co-located in the same building — uses "Webster's Business Park" on its official contact page. Confidence this is wrong is moderate (70%) because gov.bb itself also uses the non-possessive form, suggesting the inconsistency may be systemic. The GovBB team should standardise.

3. **Meteorological Office ministry attribution is contested.** The ministries.ts data (line 658) lists "The Meteorological Office" under Home Affairs. The gov.bb Departments page attributes it to MIST; the 2025–2026 Barbados Estimates of Expenditure places it under Head 33 — Ministry of Home Affairs and Information; and agriculture.gov.bb hosts "Barbados Meteorological Services" under Agriculture. Conflicting across official sources — needs resolution by the GovBB team with the relevant ministry.

4. **All 15 online-service CTAs resolve correctly.** This pass live-checked all 15 internal links listed in ministries.ts onlineServices (passport, national registration, register a birth/death/marriage, certificates, marriage licences, notarised, loud music permit, beach park vendor, three post-office-redirection pages). All return HTTP 200 with correct content. No broken CTAs found — no issue needed.

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
- **Status:** discrepant — two issues: (a) "license" is the American spelling; "licence" (British) is used throughout all official Barbados government sources; (b) the full ministry name is "Ministry of Home Affairs and Information", not "Ministry of Home Affairs".
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
<div class="claim-block-label">Should say (probable correction)</div>
<pre class="claim-block-content">Jones Building
Webster's Business Park
Wildey, St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — MHAI](https://www.gov.bb/Ministries/home-affairs) (uses "Webster Business Park" without apostrophe); [oag.gov.bb — Contact](https://oag.gov.bb/contact) (uses "Webster's Business Park" with apostrophe for the same building); [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general) (uses "Webster's Business Park")
- **Status:** discrepant — the possessive form "Webster's Business Park" is used by the OAG (co-tenant) and the gov.bb AG listing. The gov.bb MHAI page itself also omits the apostrophe, which suggests the inconsistency is systemic across gov.bb. The OAG's own site (a higher-confidence source for the building name) uses the apostrophe. Recommend standardising on "Webster's Business Park".
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
- **Status:** verified — matches gov.bb exactly. This is the ministerial line at the ministry building; it should remain correct regardless of the current minister.
- **Certainty:** 90%

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
- **Status:** verified — confirmed sworn in 16 February 2026 with this portfolio. Still listed on barbadosparliament.com as of 2026-05-29.
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
  correct. However the headquarters listed on gov.bb is stale (the BFS has moved to
  the CMM Emergency Services Complex, Prince Road, Pine Plantation Road, St. Michael).
  No address is claimed for the Fire Service on this ministry page itself.</pre>
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

### Claim 18 — Online service CTA: Apply for a passport (ministries.ts line 567)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Apply for a passport → /apply-for-a-passport</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Apply for a passport → /apply-for-a-passport</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Apply for a passport](https://alpha.gov.bb/apply-for-a-passport) — page loads with correct content.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 19 — Online service CTAs: Registration and certificate pages (ministries.ts lines 572–638)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">National registration → /national-registration
Register a birth → /register-a-birth
Register a death → /register-a-death
Register a marriage → /register-a-marriage
Get a birth certificate → /get-birth-certificate
Get a death certificate → /get-death-certificate
Get a marriage certificate → /get-marriage-certificate
Marriage licences → /marriage-licences
Get a document notarised → /get-a-document-notarised</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">National registration → /national-registration
Register a birth → /register-a-birth
Register a death → /register-a-death
Register a marriage → /register-a-marriage
Get a birth certificate → /get-birth-certificate
Get a death certificate → /get-death-certificate
Get a marriage certificate → /get-marriage-certificate
Marriage licences → /marriage-licences
Get a document notarised → /get-a-document-notarised</pre>
</div>

- **Type:** link / CTA
- **Sources:** All nine pages live-checked on 2026-05-29; each loads with correct relevant content: [/national-registration](https://alpha.gov.bb/national-registration); [/register-a-birth](https://alpha.gov.bb/register-a-birth); [/register-a-death](https://alpha.gov.bb/register-a-death); [/register-a-marriage](https://alpha.gov.bb/register-a-marriage); [/get-birth-certificate](https://alpha.gov.bb/get-birth-certificate); [/get-death-certificate](https://alpha.gov.bb/get-death-certificate); [/get-marriage-certificate](https://alpha.gov.bb/get-marriage-certificate); [/marriage-licences](https://alpha.gov.bb/marriage-licences); [/get-a-document-notarised](https://alpha.gov.bb/get-a-document-notarised)
- **Status:** verified — all nine pages resolve with correct content.
- **Certainty:** 99%

---

### Claim 20 — Online service CTAs: Permits and Post Office pages (ministries.ts lines 615–639)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Loud music permit → /loud-music-permit
Sell goods or services in a beach park → /sell-goods-services-beach-park
Post Office redirection (individual) → /post-office-redirection-individual
Post Office redirection (business) → /post-office-redirection-business
Post Office redirection (deceased) → /post-office-redirection-deceased</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Loud music permit → /loud-music-permit
Sell goods or services in a beach park → /sell-goods-services-beach-park
Post Office redirection (individual) → /post-office-redirection-individual
Post Office redirection (business) → /post-office-redirection-business
Post Office redirection (deceased) → /post-office-redirection-deceased</pre>
</div>

- **Type:** link / CTA
- **Sources:** All five pages live-checked on 2026-05-29: [/loud-music-permit](https://alpha.gov.bb/loud-music-permit); [/sell-goods-services-beach-park](https://alpha.gov.bb/sell-goods-services-beach-park); [/post-office-redirection-individual](https://alpha.gov.bb/post-office-redirection-individual); [/post-office-redirection-business](https://alpha.gov.bb/post-office-redirection-business); [/post-office-redirection-deceased](https://alpha.gov.bb/post-office-redirection-deceased)
- **Status:** verified — all five pages resolve with correct content.
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

**Marriage Licence additional contact numbers.** The gov.bb marriage licence page lists two direct-dial numbers not shown in the MHAI directory table: (246) 535-7285 (Marriage Licence Desk) and (246) 535-7267 (general line). Citizens searching for the Marriage Licence Office may benefit from having these on the ministry page or on a dedicated marriage-licence page. The gov.bb page also notes appointments are available through govtbarbadosapointmentsystem.as.me/MarriageLicense.

**Temporary relocation (historical note for awareness).** In May 2024, the Ministry temporarily relocated to Worthing Corporate Centre and the Marriage Licence Office moved to the 4th Floor, Barbados Postal Service, Cheapside, Bridgetown. The renovation ran approximately 21 May – 14 July 2024. All evidence confirms the ministry has since returned to Jones Building. The alpha.gov.bb page correctly shows the Jones Building address. No correction needed, but this should be noted in case a future renovation triggers a similar relocation.

**Fire Service — new HQ address.** Although no fire service address appears on this ministry page, the associated department listing references "The Fire Service Department". The fireservice.gov.bb website now shows the CMM Emergency Services Complex, Prince Road, Pine Plantation Road, St. Michael as the current headquarters (the gov.bb Departments page still shows the old GPO Building address). The alpha.gov.bb Fire Service page (if one exists) should be updated separately; this finding is noted here for cross-reference.

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
- [alpha.gov.bb — apply-for-a-passport](https://alpha.gov.bb/apply-for-a-passport)
- [alpha.gov.bb — national-registration](https://alpha.gov.bb/national-registration)
- [alpha.gov.bb — register-a-birth](https://alpha.gov.bb/register-a-birth)
- [alpha.gov.bb — register-a-death](https://alpha.gov.bb/register-a-death)
- [alpha.gov.bb — register-a-marriage](https://alpha.gov.bb/register-a-marriage)
- [alpha.gov.bb — get-birth-certificate](https://alpha.gov.bb/get-birth-certificate)
- [alpha.gov.bb — get-death-certificate](https://alpha.gov.bb/get-death-certificate)
- [alpha.gov.bb — get-marriage-certificate](https://alpha.gov.bb/get-marriage-certificate)
- [alpha.gov.bb — marriage-licences](https://alpha.gov.bb/marriage-licences)
- [alpha.gov.bb — get-a-document-notarised](https://alpha.gov.bb/get-a-document-notarised)
- [alpha.gov.bb — loud-music-permit](https://alpha.gov.bb/loud-music-permit)
- [alpha.gov.bb — sell-goods-services-beach-park](https://alpha.gov.bb/sell-goods-services-beach-park)
- [alpha.gov.bb — post-office-redirection-individual](https://alpha.gov.bb/post-office-redirection-individual)
- [alpha.gov.bb — post-office-redirection-business](https://alpha.gov.bb/post-office-redirection-business)
- [alpha.gov.bb — post-office-redirection-deceased](https://alpha.gov.bb/post-office-redirection-deceased)
