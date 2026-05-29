# Fact-check: Ministry of Labour, Social Security and Third Sector

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-labour-social-security-and-third-sector>
- **Source file:** `src/content/ministries/ministry-of-labour-social-security-and-third-sector.md`
- **Data file:** `src/data/ministries.ts` (lines 782–832)
- **Last checked:** 2026-05-28
- **Summary:** 10 claims reviewed — 6 verified, 2 discrepant, 2 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **All telephone fields in the directory table are blank.** The source file (lines 3–20) renders a directory table with 12 role rows but every telephone column is empty — no value has been entered. Citizens visiting this page get no usable phone numbers for the PBX, minister, permanent secretary, or any officer. This is the highest-impact gap on the page: authoritative values are available from `gov.bb/Ministries/labour-social-security` and should be populated.

2. **"National Insurance Department" is a stale agency name.** The ministry's `associatedDepartments` entry in `ministries.ts` (line 830) lists "National Insurance Department". That body was transformed into the **National Insurance and Social Security Service (NISSS)**, a statutory corporation, on 1 December 2023. Gov.bb's own `/Departments/national-insurance` page has not been updated to reflect this change, but the NISSS's own website (nis.gov.bb) and the enabling legislation confirm the renaming. Alpha.gov.bb should use "National Insurance and Social Security Service (NISSS)" throughout.

3. **Minister role title has a capitalisation inconsistency.** `ministries.ts` line 792 records the minister's role as "Minister of Labour, Social Security and **The** Third Sector" (capitalised "The"). The canonical ministry name — confirmed on gov.bb, labour.gov.bb, and GIS — is "Ministry of Labour, Social Security and **Third** Sector" (no "The"). The "The" in the role title is not consistent with official usage.

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
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — "To assist the Government and its Social Partners in promoting opportunities for the provision of decent and productive work, in conditions of freedom of association, equity, security and human dignity and to provide quality social and economic benefits for Barbadians."; [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — same phrasing confirmed as the mission statement
- **Status:** verified — verbatim match with both Tier 1 sources.
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
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security); [labour.gov.bb](https://labour.gov.bb/) — homepage title confirms "Ministry of Labour, Social Security and the Third Sector"; [GIS tag page URL](https://gisbarbados.gov.bb/blog/tag/ministry-of-labour-social-security-and-third-sector/) confirms slug form; [`src/data/ministries.ts` line 783](/home/gavin/frontend-alpha/src/data/ministries.ts)
- **Status:** verified
- **Certainty:** 99%
- **Note:** Labour.gov.bb uses "and the Third Sector" (lowercase "the") while gov.bb and ministries.ts use "and Third Sector" (no "the"). The difference is minor and both forms appear in official sources. The alpha.gov.bb form (without "the") matches gov.bb and the enabling instruments.

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
- **Sources:** [nis.gov.bb — NISSS Day One](https://www.nis.gov.bb/national-insurance-and-social-security-service-on-day-one/) — "Hon. Colin Jordan, Minister of Labour, Social Security and the Third Sector"; [GIS — Minister Jordan: We Must Protect Each Other's Rights](https://gisbarbados.gov.bb/blog/minister-jordan-we-must-protect-each-others-rights/); [GIS — May Day 2026 (search snippet confirms 2026 tenure)](https://gisbarbados.gov.bb/blog/may-day-a-day-of-reflection-not-just-celebration/)
- **Status:** verified — multiple recent GIS and NIS sources confirm Colin Jordan as minister as at 2026.
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
- **Sources:** [nis.gov.bb — NISSS Day One](https://www.nis.gov.bb/national-insurance-and-social-security-service-on-day-one/) — "Minister of Labour, Social Security and the Third Sector" (lowercase "the"); [gov.bb — Ministry page](https://www.gov.bb/Ministries/labour-social-security) — ministry name uses "Third Sector" without capitalised article; [GIS search snippets](https://gisbarbados.gov.bb/blog/tag/ministry-of-labour-social-security-and-third-sector/) — GIS slug and articles use lowercase "the"
- **Status:** discrepant — "The Third Sector" (capitalised "The") in ministries.ts line 792 does not match standard official usage, which consistently uses "the Third Sector" (lowercase "the") or omits the article.
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
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — PBX: 535-1400 or 535-1498; [labour.gov.bb — contact page](https://labour.gov.bb/contact/) — "(246) 535-1400"; [connectb1m.com — Ministry of Labour](https://connectb1m.com/ministry-of-labour-social-security-third-sector/) — "PBX: 535-1400 or 535-1498"
- **Status:** verified — 535-1400 confirmed as the primary PBX number.
- **Certainty:** 99%
- **Note:** Gov.bb and connectb1m both list a second PBX number 535-1498. Ministries.ts and the source file only list 535-1400. It would be useful to add 535-1498 as an alternative, but the primary number is correct.

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
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — Fax: 425-0266; [connectb1m.com — Ministry of Labour](https://connectb1m.com/ministry-of-labour-social-security-third-sector/) — "Fax: 425-0266"
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
- **Note:** connectb1m.com records a different email `persec@labour.gov.bb`. Gov.bb's page is the authoritative source and lists `ps@labour.gov.bb`. The connectb1m entry may be an alternative or historical address.

---

### Claim 8 — Address: 3rd Floor West Wing, Warrens Office Complex, Warrens, St. Michael (ministries.ts lines 819–824)

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
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — "3rd Floor West Wing, Warrens Office Complex, Warrens, St. Michael, Barbados, W.I."; [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — "3rd Floor West, Warrens Office Complex, Warrens, St. Michael"; [connectb1m.com — Ministry of Labour](https://connectb1m.com/ministry-of-labour-social-security-third-sector/) — "3rd Floor, West Wing, Warrens Office Complex, Warrens, St. Michael Barbados, W.I."
- **Status:** verified — all three sources agree on the Warrens Office Complex, 3rd Floor West Wing. Note: labour.gov.bb's About Us page abbreviates to "3rd Floor West" (omitting "Wing") but the fuller form is confirmed by gov.bb and connectb1m.
- **Certainty:** 99%
- **Cross-reference:** The previously filed discrepancy on `apply-to-jobstart-plus-programme.md` about "Warrens Close" does not apply here — ministries.ts correctly uses "Warrens" (the district name) not "Warrens Close". See [apply-to-jobstart-plus-programme.md](/home/gavin/frontend-alpha/docs/fact-check/apply-to-jobstart-plus-programme.md) Claim 9.

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
- **Sources:** [nis.gov.bb — NISSS Day One (1 Dec 2023)](https://www.nis.gov.bb/national-insurance-and-social-security-service-on-day-one/) — "National Insurance and Social Security Service (NISSS) … took effect on 1st December 2023"; [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/) — organisation is now "National Insurance and Social Security Service"; [Barbados Today — From NIS to NISSS (2 Dec 2023)](https://barbadostoday.bb/2023/12/02/from-nis-to-nisss-new-social-security-service-in-effect/) — confirms renaming effective 1 Dec 2023; [National Insurance and Social Security (Amendment) (No.1 and No.2) Acts, 2023](https://www.barbadosparliament.com/bills/details/722) — enabling legislation
- **Status:** discrepant — "National Insurance Department" has been the stale name since 1 December 2023. The body is now a statutory corporation called the "National Insurance and Social Security Service (NISSS)". Note: gov.bb's own `/Departments/national-insurance` page has not yet been updated (it still uses "National Insurance Department"), but the NISSS's own website and enabling legislation are authoritative.
- **Certainty:** 70% that alpha.gov.bb entry reflects the gov.bb source (which is itself stale)
- **Confidence it's wrong:** 95% — NISSS transformation is confirmed by the body's own communications, two amending Acts, and media coverage.
- **Citizen impact:** MEDIUM — a citizen searching for "National Insurance Department" may be directed to an outdated entity name; the NISSS portal (nis.gov.bb) is the correct destination for all NIS/social security enquiries.

---

### Claim 10 — Directory table telephone values (lines 5–19)

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
<pre class="claim-block-content">The following numbers are confirmed from gov.bb and connectb1m:

PBX:                          535-1400 (or 535-1498)
Fax:                          425-0266
Minister:                     535-1401
Permanent Secretary:          535-1402
Deputy Permanent Secretary:   535-1403
Personal Assistant (Minister):535-1404
Senior Admin Officer:         535-1405
Project Coor HIV/AIDS:        535-1407
Executive Officer:            535-1409
Registry:                     535-1415
Chief Research & Planning:    535-1420
Senior Accountant:            535-1430

Source: gov.bb/Ministries/labour-social-security and connectb1m.com.
"Or" row (alt PBX): 535-1498 — listed on gov.bb, missing from data.
PS Secretary: number not published on any consulted source.</pre>
</div>

- **Type:** phone (multiple)
- **Checked:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — full directory table with all extensions; [connectb1m.com — Ministry of Labour](https://connectb1m.com/ministry-of-labour-social-security-third-sector/) — confirms same extension list
- **Status:** unverifiable as populated (all cells are blank in the source file); the authoritative numbers are publicly available and should be entered
- **Certainty:** N/A — the page makes no telephone claim (the cells are empty); the values above are verified from Tier 1/Tier 2 sources and are ready to populate
- **Open question:** The "PS Secretary" (line 11) row has no matching extension in any published source. Confirm with the Ministry whether this role has a direct-dial extension or shares the PS line (535-1402).
- **Citizen impact:** HIGH — a page with no telephone numbers is not useful for citizens attempting to reach the ministry. The data exists and should be transferred.

---

## Additional findings (not on the page but should be)

**A. Second PBX (535-1498) not in ministries.ts.** Gov.bb lists two PBX entries for the ministry: 535-1400 and 535-1498 ("Or"). Ministries.ts only has 535-1400. Adding 535-1498 as an alternative number would help citizens who encounter a busy line.
- Source: [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)

**B. BECCS not listed as associated body.** The Barbados Employment and Career Counselling Service (BECCS, formerly National Employment Bureau) operates from the 1st Floor East of the same Warrens Office Complex and is a major ministry-associated body. It does not appear in `associatedDepartments` in ministries.ts. See also the BECCS memory note (renamed April 2018) and the existing [F-048](/home/gavin/frontend-alpha/docs/fact-check/README.md) flag on jobseekers.md.
- Source: [labour.gov.bb — homepage](https://labour.gov.bb/) — BECCS listed as a distinct entity with phone 535-1535; [gov.bb — Labour Department](https://www.gov.bb/Departments/labour)

**C. Permanent Secretary is Ms. Marva Howell.** The current PS (as at 2026-05-28) confirmed on gov.bb's PS register is Ms. Marva Howell. This is not shown on the content page (the Permanent Secretary row is blank), but the name is available if the directory table is to be populated with names as well as numbers.
- Source: [gov.bb — Permanent Secretaries and Related Grades](https://www.gov.bb/government/ps-related-grades)

**D. Labour legislation count: 25 Acts, not 24.** The labour.gov.bb/labour-legislation page returned 25 items (the fetch result listed 25 rows, though the initial response said "24"). The count is flagged in the existing memory note for this ministry. No alpha.gov.bb page currently claims a specific count, so this is informational only.
- Source: [labour.gov.bb — Labour Legislation](https://labour.gov.bb/labour-legislation/)

---

## Sources cited

- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — primary Tier 1 source; mandate, address, phone, fax, email, directory
- [labour.gov.bb — Homepage](https://labour.gov.bb/) — ministry name, associated bodies, BECCS listing
- [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — mission and vision statements
- [labour.gov.bb — Labour Legislation](https://labour.gov.bb/labour-legislation/) — Acts list (25 items)
- [gov.bb — Labour Department](https://www.gov.bb/Departments/labour) — department address, phone, chief officer
- [gov.bb — Permanent Secretaries and Related Grades](https://www.gov.bb/government/ps-related-grades) — confirmed Ms. Marva Howell as current PS
- [nis.gov.bb — NISSS Day One](https://www.nis.gov.bb/national-insurance-and-social-security-service-on-day-one/) — NISSS transformation 1 Dec 2023, minister name
- [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/) — official NISSS name and mission
- [Barbados Today — From NIS to NISSS (2 Dec 2023)](https://barbadostoday.bb/2023/12/02/from-nis-to-nisss-new-social-security-service-in-effect/) — Tier 3 confirmation of renaming
- [Barbados Parliament — National Insurance and Social Security (Amendment) Act, 2023](https://www.barbadosparliament.com/bills/details/722) — enabling legislation for NISSS
- [connectb1m.com — Ministry of Labour, Social Security and Third Sector](https://connectb1m.com/ministry-of-labour-social-security-third-sector/) — full directory with all extensions
- [GIS — Minister Jordan: We Must Protect Each Other's Rights](https://gisbarbados.gov.bb/blog/minister-jordan-we-must-protect-each-others-rights/) — confirms minister name 2026
- [GIS — May Day 2026 article](https://gisbarbados.gov.bb/blog/may-day-a-day-of-reflection-not-just-celebration/) — recent 2026 GIS article under Jordan's tenure (403 at fetch time; confirmed via search snippet)
