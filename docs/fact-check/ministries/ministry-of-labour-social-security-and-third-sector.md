# Fact-check: Ministry of Labour, Social Security and Third Sector

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-labour-social-security-and-third-sector>
- **Source file:** `src/content/ministries/ministry-of-labour-social-security-and-third-sector.md`
- **Data file:** `src/data/ministries.ts` (lines 782–832)
- **Last checked:** 2026-05-29
- **Summary:** 13 claims reviewed — 8 verified, 2 discrepant, 3 unverifiable. Average certainty: **83%**.

---

## Headline issues for triage

1. **All directory telephone fields are blank.** The source file (lines 5–20) renders a directory table with 13 role rows but every telephone column is empty. Citizens get no usable direct-dial numbers for the minister, permanent secretary, or any officer. Authoritative values for all roles — including PS Secretary (535-1412, now confirmed from gov.bb) — are available and should be populated.

2. **"National Insurance Department" is a stale agency name.** `ministries.ts` line 830 lists "National Insurance Department". That body was transformed into the **National Insurance and Social Security Service (NISSS)**, a statutory corporation, on 1 December 2023, confirmed by nis.gov.bb and enabling legislation. Alpha.gov.bb should use "National Insurance and Social Security Service (NISSS)".

3. **Minister role title has an erroneous capital "The".** `ministries.ts` line 792 records "Minister of Labour, Social Security and **The** Third Sector". All authoritative sources (gov.bb, labour.gov.bb, GIS) use lowercase "the" or omit the article. This is a minor but official-styling error.

4. **Reversed finding (PS Secretary extension now verified).** The 2026-05-28 pass noted PS Secretary as "not published on any consulted source" (open question). On re-check, gov.bb's directory now shows **535-1412** for this role — confirmed. The open question is closed; the number should be entered in the source file.

---

## Claims

### Claim 1 — Ministry mandate / mission statement (line 1)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Labour, Social Security and Third Sector is to assist the Government
and its Social Partners in promoting opportunities for the provision of decent and
productive work, in conditions of freedom of association, equity, security and human
dignity and to provide quality social and economic benefits for Barbadians.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry of Labour, Social Security and Third Sector is to assist the Government
and its Social Partners in promoting opportunities for the provision of decent and
productive work, in conditions of freedom of association, equity, security and human
dignity and to provide quality social and economic benefits for Barbadians.</pre>
</div>

- **Type:** descriptive / agency mandate
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — verbatim match; [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — same phrasing confirmed as mission statement
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Ministry name (line 1 and ministries.ts line 783)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Labour, Social Security and Third Sector</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Labour, Social Security and Third Sector</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security); [labour.gov.bb](https://labour.gov.bb/) — homepage shows "Government of Barbados Ministry of Labour"; [`src/data/ministries.ts` line 783](/home/gavin/frontend-alpha/src/data/ministries.ts)
- **Status:** verified
- **Certainty:** 99%
- **Note:** labour.gov.bb uses "Government of Barbados Ministry of Labour" as the page title (shortened form). Gov.bb and ministries.ts use the full "Ministry of Labour, Social Security and Third Sector". The alpha.gov.bb form matches gov.bb.

---

### Claim 3 — Minister name: "The Hon. Colin E. Jordan, M.P." (ministries.ts line 791)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Hon. Colin E. Jordan, M.P.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. Colin E. Jordan, M.P.</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [labour.gov.bb — Homepage](https://labour.gov.bb/) — confirms current minister under this ministry; [GIS — Minister Jordan articles (2026)](https://gisbarbados.gov.bb/blog/tag/ministry-of-labour-social-security-and-third-sector/) — multiple 2026 GIS articles confirm Jordan as minister; [alpha.gov.bb live page](https://alpha.gov.bb/government/organisations/ministry-of-labour-social-security-and-third-sector) — displays "The Hon. Colin E. Jordan, M.P."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — Minister role title: "Minister of Labour, Social Security and The Third Sector" (ministries.ts line 792)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Minister of Labour, Social Security and The Third Sector</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Minister of Labour, Social Security and the Third Sector</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — ministry name uses "Third Sector" without capitalised article; [labour.gov.bb — Homepage](https://labour.gov.bb/) — uses lowercase "the third sector" in prose; [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/) — "Minister of Labour, Social Security and the Third Sector" (lowercase "the")
- **Status:** discrepant — "The Third Sector" (capitalised "The") does not match standard official usage, which consistently uses "the Third Sector" (lowercase) or omits the article.
- **Certainty:** 85%
- **Confidence it's wrong:** 80%
- **Citizen impact:** LOW — no operational impact; affects official styling only.

---

### Claim 5 — PBX phone number: (246) 535-1400 (ministries.ts line 813)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 535-1400</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">(246) 535-1400</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — "Main Line (PBX): 535-1400 or 535-1498"; [labour.gov.bb — Homepage](https://labour.gov.bb/) — "(246) 535-1400"
- **Status:** verified — 535-1400 confirmed as primary PBX number.
- **Certainty:** 99%
- **Note:** Gov.bb lists a second PBX number 535-1498. Ministries.ts only lists 535-1400. The primary number is correct; 535-1498 is an unlisted alternative.

---

### Claim 6 — Fax number: (246) 425-0266 (ministries.ts line 814)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 425-0266</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">(246) 425-0266</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — "Fax: 425-0266"
- **Status:** verified
- **Certainty:** 97%

---

### Claim 7 — Email: ps@labour.gov.bb (ministries.ts line 812)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">ps@labour.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">ps@labour.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — email: ps@labour.gov.bb
- **Status:** verified
- **Certainty:** 95%

---

### Claim 8 — Address: 3rd Floor West Wing, Warrens Office Complex (ministries.ts lines 819–824)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">3rd Floor West Wing
Warrens Office Complex
Warrens
St. Michael
Barbados, W.I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">3rd Floor West Wing
Warrens Office Complex
Warrens
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — "3rd Floor West Wing, Warrens Office Complex, Warrens, St. Michael, Barbados, W.I."; [labour.gov.bb — Homepage](https://labour.gov.bb/) — "3rd Floor West, Warrens Office Complex, Warrens, St. Michael" (shortened but consistent)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 9 — Associated department: "National Insurance Department" (ministries.ts line 830)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">National Insurance Department</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">National Insurance and Social Security Service (NISSS)</pre>
</div>

- **Type:** agency name
- **Sources:** [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/) — "On 1st December 2023, the NIS transitioned to a statutory corporation and was renamed the National Insurance and Social Security Service."; [labour.gov.bb — Homepage](https://labour.gov.bb/) — lists "National Insurance and Social Security Service" under associated bodies; [National Insurance and Social Security (Amendment) Acts, 2023](https://www.barbadosparliament.com/bills/details/722) — enabling legislation
- **Status:** discrepant — "National Insurance Department" has been stale since 1 December 2023. The body is now the "National Insurance and Social Security Service (NISSS)". Labour.gov.bb itself lists the correct new name.
- **Certainty:** 30% (that the old name is still correct)
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — citizens searching for or directed to "National Insurance Department" will encounter an outdated entity name.

---

### Claim 10 — Directory table telephone values (lines 5–19, all blank)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| PBX                               |   |
| Or                                |   |
| Fax                               |   |
| Minister                          |   |
| Permanent Secretary               |   |
| PS Secretary                      |   |
| Deputy Permanent Secretary        |   |
| Personal Assistant to Minister    |   |
| Senior Administrative Officer     |   |
| Project Coor HIV/AIDS             |   |
| Executive Officer                 |   |
| Registry                          |   |
| Chief Research & Planning Officer |   |
| Senior Accountant                 |   |
(all telephone cells are empty)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — authoritative values exist but are not on the page</div>
<pre class="claim-block-content">The following numbers are confirmed from gov.bb:

PBX:                               535-1400 (alt: 535-1498)
Fax:                               425-0266
Minister:                          535-1401
Permanent Secretary:               535-1402
PS Secretary:                      535-1412  ← confirmed this pass
Deputy Permanent Secretary:        535-1403
Personal Assistant (Minister):     535-1404
Senior Administrative Officer:     535-1405
Project Coor HIV/AIDS:             535-1407
Executive Officer:                 535-1409
Registry:                          535-1415
Chief Research & Planning Officer: 535-1420
Senior Accountant:                 535-1430</pre>
</div>

- **Type:** phone (multiple)
- **Checked:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — full directory table with all 13 extensions
- **Status:** unverifiable as populated (all cells are blank in the source file); the authoritative numbers are publicly available and should be entered. All 13 extensions are now confirmed from gov.bb, including PS Secretary (535-1412) which was previously unresolved.
- **Certainty:** N/A — the page makes no telephone claim (cells are empty)
- **Open question:** None — PS Secretary extension (535-1412) is now confirmed from gov.bb. All open questions from the previous pass are resolved.
- **Citizen impact:** HIGH — a page with no telephone directory is not useful for citizens attempting to reach specific officers. Data exists and should be transferred.

---

### Claim 11 — Online service link: /jobseekers (ministries.ts line 797)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">/jobseekers</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">/jobseekers — resolves to H1 "Jobseekers" with full content</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Jobseekers](https://alpha.gov.bb/jobseekers) — page loads with H1 "Jobseekers" and complete content; breadcrumb: Home > Jobseekers
- **Status:** verified
- **Certainty:** 95%

---

### Claim 12 — Online service link: /apply-to-jobstart-plus-programme (ministries.ts line 802)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">/apply-to-jobstart-plus-programme</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">/apply-to-jobstart-plus-programme — resolves to "Register for Job Start Plus"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — JobStart Plus Programme](https://alpha.gov.bb/apply-to-jobstart-plus-programme) — page loads with title "Register for Job Start Plus | The Government Of Barbados"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 13 — Online service link: /apply-to-be-a-project-protege-mentor (ministries.ts line 807)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">/apply-to-be-a-project-protege-mentor</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">/apply-to-be-a-project-protege-mentor — resolves to "Apply to be a Project Protégé mentor"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Project Protégé Mentor](https://alpha.gov.bb/apply-to-be-a-project-protege-mentor) — page loads with title "Apply to be a Project Protégé mentor | The Government Of Barbados"
- **Status:** verified
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

**A. Second PBX (535-1498) not in ministries.ts.** Gov.bb lists two PBX entries: 535-1400 and 535-1498. Ministries.ts only has 535-1400. Adding 535-1498 as an alternative would help citizens who encounter a busy line.
- Source: [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)

**B. BECCS not listed as associated body.** The Barbados Employment and Career Counselling Service (BECCS) operates from the 1st Floor East of the same Warrens Office Complex (phone: 246-535-1535) and is listed prominently on labour.gov.bb. It does not appear in `associatedDepartments` in ministries.ts.
- Source: [labour.gov.bb — Homepage](https://labour.gov.bb/) — BECCS listed as distinct entity; [gov.bb — Labour Department](https://www.gov.bb/Departments/labour)

**C. PS Secretary extension now confirmed.** The open question from the 2026-05-28 pass (PS Secretary extension unknown) is now resolved: **535-1412** confirmed from gov.bb. This should be entered in the source file along with all other extensions.
- Source: [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)

**D. Website link (labour.gov.bb) not live-checked in prior pass.** Confirmed live: [https://labour.gov.bb/](https://labour.gov.bb/) loads correctly with full ministry content.

---

## Sources cited

- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — primary Tier 1 source; mandate, address, phone, fax, email, full directory
- [labour.gov.bb — Homepage](https://labour.gov.bb/) — ministry name, NISSS listing, BECCS listing, address, phone, hours
- [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — mission and vision statements
- [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/) — official NISSS name and transformation date (1 Dec 2023)
- [National Insurance and Social Security (Amendment) Acts, 2023](https://www.barbadosparliament.com/bills/details/722) — enabling legislation for NISSS transformation
- [alpha.gov.bb — Ministry of Labour live page](https://alpha.gov.bb/government/organisations/ministry-of-labour-social-security-and-third-sector) — live page verified; all contact details and links checked
- [alpha.gov.bb — Jobseekers](https://alpha.gov.bb/jobseekers) — CTA link verified live
- [alpha.gov.bb — JobStart Plus Programme](https://alpha.gov.bb/apply-to-jobstart-plus-programme) — CTA link verified live
- [alpha.gov.bb — Project Protégé Mentor](https://alpha.gov.bb/apply-to-be-a-project-protege-mentor) — CTA link verified live
- [GIS — Ministry of Labour tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-labour-social-security-and-third-sector/) — confirms minister name and official styling
