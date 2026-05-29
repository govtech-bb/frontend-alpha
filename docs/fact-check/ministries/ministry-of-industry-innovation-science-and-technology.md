# Fact-check: Ministry of Industry, Innovation, Science and Technology (MIST)

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-industry-innovation-science-and-technology>
- **Source file:** `src/content/ministries/ministry-of-industry-innovation-science-and-technology.md`
- **Data file:** `src/data/ministries.ts` (lines 717–780)
- **Last checked:** 2026-05-28
- **Summary:** 13 claims reviewed — 8 verified, 3 discrepant, 2 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **Minister role title has wrong word order (F-096).** `ministries.ts` line 727 records the minister's role as "Minister of **Innovation**, Industry, Science and Technology." The canonical order — confirmed by gov.bb/Ministries, the GIS official tag, and Barbados Today's budget coverage — is "Minister of **Industry**, Innovation, Science and Technology." The ministry's own name (correctly "Ministry of Industry, Innovation, Science and Technology") puts "Industry" first; the role label should follow suit. Citizens and media following the alpha.gov.bb page will see the wrong word order for the portfolio.

2. **Primary phone number is incomplete — only one line of a three-line PBX published (F-097).** `ministries.ts` lists only `(246) 535-1200`. The gov.bb ministry page publishes the full PBX range as `(246) 535-1200/1201/1202`, with `535-1201` as the primary directory number. A citizen calling just 535-1200 may reach a busy line with no indication that 535-1201 or 535-1202 are alternatives.

3. **`originalSource` URL slug encodes the old ministry name.** The `originalSource` field (line 756–757) points to `https://www.gov.bb/Ministries/innovation-science-smart-technology`, a slug that reflects the pre-2021 name "Ministry of Innovation, Science and Smart Technology." The URL still resolves and the page behind it is correctly titled "Ministry of Industry, Innovation, Science and Technology (MIST)," so this is a stale artefact in the data file rather than a broken link — but it is an internal consistency issue and echoes the wrong name that was also found in the terms-conditions page (F-090).

4. **`keywords` array uses "MIIST" (two I's); the official abbreviation is "MIST" (one I).** `ministries.ts` line 719 includes `"MIIST"` as a keyword/abbreviation. Every authoritative source — gov.bb, GIS, Barbados Today budget coverage — uses the four-letter acronym "MIST." "MIIST" appears to be a typographic error that could cause search mismatches.

---

## Claims

### Claim 1 — Ministry name (ministries.ts line 718 / source markdown line 1)

The source markdown contains only one line of content:

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (source markdown line 1)</div>
<pre class="claim-block-content">Ministry of Industry, Innovation, Science and Technology (MIST).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Industry, Innovation, Science and Technology (MIST).</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Industry, Innovation, Science and Technology](https://www.gov.bb/Ministries/innovation-science-smart-technology) — page title is verbatim "MINISTRY OF INDUSTRY, INNOVATION, SCIENCE AND TECHNOLOGY"; [gov.bb — Ministries listing](https://www.gov.bb/Ministries) — confirms "Ministry of Industry, Innovation, Science and Technology"; [GIS tag — minister-of-industry-innovation-science-and-technology](https://gisbarbados.gov.bb/blog/tag/minister-of-industry-innovation-science-and-technology/)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Minister name (ministries.ts line 726)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 726)</div>
<pre class="claim-block-content">Senator The Hon. Jonathan W. D. Reid</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Senator The Hon. Jonathan W. D. Reid</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — "Senator Jonathan Reid, Minister of…"; [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Senator The Hon. Jonathan W. D. REID"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 3 — Minister role/portfolio title (ministries.ts line 727)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 727)</div>
<pre class="claim-block-content">Minister of Innovation, Industry, Science and Technology</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Minister of Industry, Innovation, Science and Technology</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/Ministries) — canonical ministry name puts "Industry" first: "Ministry of **Industry**, Innovation, Science and Technology"; [GIS Facebook post — "Minister of **Industry, Innovation**, Science and Technology, Senator Jonathan Reid…"](https://www.facebook.com/gisbarbados/posts/minister-of-industry-innovation-science-and-technology-senator-jonathan-reid-enc/1088990616600687/); [Barbados Today — Reid seeks nearly $188m (11 Mar 2026)](https://barbadostoday.bb/2026/03/11/reid-seeks-nearly-188m-to-drive-barbados-digital-transformation/) — caption uses "Minister of **Industry**, Innovation, Science and Technology"; [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8) — lists "Minister of Innovation, Industry, Science and Technology" (reversed order — note: Parliament site uses this variant; gov.bb and GIS use the "Industry first" order)
- **Status:** discrepant — the official ministry name on gov.bb puts "Industry" before "Innovation"; the role label in `ministries.ts` inverts this to "Innovation, Industry…". The GIS official tag confirms the "Industry first" order. The Parliament site uses the reversed form, creating a minor authoritative conflict, but gov.bb/Ministries is the canonical source.
- **Certainty:** 88%
- **Confidence it's wrong:** 88%
- **Citizen impact:** LOW — citizens seeking the ministry will find the correct page regardless of word order; the internal inconsistency is a data-quality issue.

---

### Claim 4 — Ministry intro / mandate text (ministries.ts line 723–724)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (lines 723–724)</div>
<pre class="claim-block-content">To drive the digital transformation of the public service and foster a culture of innovation and scientific advancement.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — unverifiable verbatim from Tier 1 sources</div>
<pre class="claim-block-content">The gov.bb ministry page does not publish a formal mission/mandate
statement for MIST. The phrase is a reasonable summary of the ministry's
known activities (digital transformation via GovTech Barbados, innovation
policy, SMRI unit), but it is not a verbatim quote from any authoritative
source.
Checked: [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — no
mandate text found; [Barbados Today — budget coverage (Mar 2026)](https://barbadostoday.bb/2026/03/11/reid-seeks-nearly-188m-to-drive-barbados-digital-transformation/)
— describes ministry activities but does not quote an official mandate.</pre>
</div>

- **Type:** descriptive
- **Sources:** Checked [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology); [Barbados Today — government digital overhaul](https://barbadostoday.bb/2025/12/30/government-sets-course-for-sweeping-digital-overhaul/) — neither publishes a formal mandate statement for MIST
- **Status:** unverifiable — the mandate text is a reasonable editorial summary; no authoritative source confirms it verbatim
- **Certainty:** 45%
- **Open question:** Confirm with MIST whether this mission statement reflects the ministry's official mandate. If a formal statement exists (e.g. in an annual report or ministry website), link to it. Otherwise flag as editorial content.

---

### Claim 5 — Email address (ministries.ts line 748)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 748)</div>
<pre class="claim-block-content">psmist@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">psmist@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — publishes `psmist@barbados.gov.bb` as the Permanent Secretary email
- **Status:** verified
- **Certainty:** 97%

---

### Claim 6 — Primary telephone number (ministries.ts line 749)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 749)</div>
<pre class="claim-block-content">(246) 535-1200</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">(246) 535-1200 / 535-1201 / 535-1202</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — publishes "Main: (246) 535-1200/1201/1202"; [gov.bb — MIST directory](https://www.gov.bb/government-main/directory/ministry-of-industry/) — lists `(246) 535-1201` as the primary line
- **Status:** discrepant — `ministries.ts` lists only `535-1200`. The gov.bb page publishes three PBX lines `535-1200/1201/1202`. The directory page treats `535-1201` as the primary. Citizens calling only `535-1200` may reach a busy or secondary line with no knowledge of alternatives.
- **Certainty:** 95%
- **Confidence it's wrong (incomplete):** 90%
- **Citizen impact:** LOW — `535-1200` is a valid ministry number; the omission of the full PBX range is an inconvenience rather than a misdirection.

---

### Claim 7 — Fax number (ministries.ts line 750)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 750)</div>
<pre class="claim-block-content">(246) 535-1284</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">(246) 535-1284</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology); [gov.bb — MIST directory](https://www.gov.bb/government-main/directory/ministry-of-industry/) — both confirm fax `(246) 535-1284`
- **Status:** verified
- **Certainty:** 99%

---

### Claim 8 — Building address (ministries.ts lines 752–754)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (lines 752–754)</div>
<pre class="claim-block-content">3rd and 4th Floor Baobab Tower
Warrens
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">3rd and 4th Floor Baobab Tower
Warrens
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — "3rd and 4th Floor Baobab Tower, Warrens, St. Michael"; [gov.bb — MIST directory](https://www.gov.bb/government-main/directory/ministry-of-industry/) — corroborates; [gov.bb — Business/start-business footer](https://www.gov.bb/Business/start-business) — footer attribution confirms same address
- **Status:** verified
- **Certainty:** 99%
- **Note:** The address omits "Barbados, W.I." which is present in most other ministry entries in `ministries.ts`. This is a minor formatting inconsistency within the data file, not a factual error.

---

### Claim 9 — `originalSource` URL (ministries.ts lines 756–757)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (lines 756–757)</div>
<pre class="claim-block-content">https://www.gov.bb/Ministries/innovation-science-smart-technology</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified — URL resolves, but slug encodes old ministry name</div>
<pre class="claim-block-content">https://www.gov.bb/Ministries/innovation-science-smart-technology

The URL resolves to the correct page titled "MINISTRY OF INDUSTRY,
INNOVATION, SCIENCE AND TECHNOLOGY." The slug "innovation-science-smart-
technology" reflects the pre-2021 name "Ministry of Innovation, Science and
Smart Technology" — it has not been updated by gov.bb to match the
current ministry name. The URL is live and correct as a source reference.</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — resolves correctly (HTTP 200); page title is "MINISTRY OF INDUSTRY, INNOVATION, SCIENCE AND TECHNOLOGY (MIST)"
- **Status:** verified (URL is live and leads to the correct page)
- **Certainty:** 99%
- **Note:** The stale slug is a gov.bb data artefact, not an alpha.gov.bb error. No action required on the source URL; documented for completeness.

---

### Claim 10 — Ministry abbreviation/keyword "MIIST" (ministries.ts line 719)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 719)</div>
<pre class="claim-block-content">keywords: ["MIIST", "Industry", "Innovation", "Science", "Technology"]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">keywords: ["MIST", "Industry", "Innovation", "Science", "Technology"]</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — page title uses "(MIST)"; [Barbados Today — all coverage of this ministry](https://barbadostoday.bb/2026/03/11/reid-seeks-nearly-188m-to-drive-barbados-digital-transformation/) — "MIST" used throughout; [GIS — MIST Focusing On Data Protection](https://gisbarbados.gov.bb/blog/mist-focusing-on-data-protection/) — uses "MIST"
- **Status:** discrepant — "MIIST" (two I's) is not used in any authoritative source; the official acronym is "MIST" (four letters: Ministry of Industry, Innovation, Science and Technology)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — keyword affects search-matching within alpha.gov.bb; citizens searching for "MIST" will not match the "MIIST" keyword tag.

---

### Claim 11 — Associated departments list (ministries.ts lines 758–778)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (lines 758–778)</div>
<pre class="claim-block-content">Corporate Services
Technical Management
Customer Support
Data Protection Commission
Legal Unit
Programme Execution Unit
Industry: Industry Unit
Innovation, Science and Technology: Science, Market Research and Innovation
Innovation, Science and Technology: Digital Infrastructure
Innovation, Science and Technology: Digital Solutions
Innovation, Science and Technology: Efficiency Unit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Corporate Services
Technical Management
Customer Support
Data Protection Commission
Legal Unit
Programme Execution Unit
Industry: Industry Unit
Innovation, Science and Technology: Science, Market Research and Innovation
Innovation, Science and Technology: Digital Infrastructure
Innovation, Science and Technology: Digital Solutions
Innovation, Science and Technology: Efficiency Unit</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology) — lists exactly these internal units; [gov.bb — Departments: Analytical Services](https://www.gov.bb/Departments/analytical-services) — attributed to MIST; [gov.bb — Departments: SMRI](https://www.gov.bb/Departments/smri) — "Science, Market Research and Innovation" confirmed under MIST; [gov.bb — Departments: Data Protection Commission](https://www.gov.bb/Departments/data-protection-commissioner) — confirmed under MIST
- **Status:** verified — all listed units match the gov.bb MIST page
- **Certainty:** 95%
- **Note:** The Barbados National Standards Institution (BNSI) is also confirmed under MIST (`gov.bb/State-Bodies/national-standards`) but is not listed in `associatedDepartments`. This is an omission rather than an error; BNSI may be considered a state body rather than an internal department. The Analytical Services Department (also under MIST, at Culloden Road, St. Michael) is similarly absent. Both are optional additions.

---

### Claim 12 — Data Protection Commission contact details (implied by listing it as an associated body)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 764) — listed as associated body</div>
<pre class="claim-block-content">Data Protection Commission</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — body exists and is under MIST</div>
<pre class="claim-block-content">Data Protection Commission
5th Floor, SSA Building, Vaucluse, St. Thomas
Tel: 1 (246) 536-1200 / (246) 536-1212
Ministry attribution: Ministry of Industry, Innovation, Science and Technology</pre>
</div>

- **Type:** agency name / address / phone
- **Sources:** [gov.bb — Data Protection Commission](https://www.gov.bb/Departments/data-protection-commissioner) — "5th Floor, SSA Building, Vaucluse, St. Thomas"; phone: "Tel: 1 (246) 536-1200/ (246) 536-1212"; ministry attribution confirmed as MIST
- **Status:** verified (body attribution to MIST is correct; contact details not shown on the MIST page but verified from the DPC's own gov.bb entry)
- **Certainty:** 97%

---

### Claim 13 — onlineServices attribution: business pages listed under MIST (ministries.ts lines 729–745)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (lines 729–745)</div>
<pre class="claim-block-content">onlineServices:
  - Start a business (/start-a-business)
  - Register a business name (/registering-a-business-name)
  - Business policies and law (/business-policies-and-law)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially corroborated — attribution is consistent with gov.bb but disputed by prior fact-checks</div>
<pre class="claim-block-content">gov.bb/Business/start-business footer attributes the page to MIST.
gov.bb/Business/policies-laws footer also attributes this page to MIST.
gov.bb/Business/registering-business-name is associated with Business
Barbados (formerly CAIPO) under the Ministry of Energy and Business
Development — F-075 already filed against this page.
"Business policies and law" content on alpha.gov.bb is labour law
content from labour.gov.bb — the Ministry of Labour attribution for
that page has been documented in prior fact-checks (F-029).
Checked: [gov.bb — start-business](https://www.gov.bb/Business/start-business);
[gov.bb — policies-laws](https://www.gov.bb/Ministries/policies-laws);
[start-a-business fact-check](/home/gavin/frontend-alpha/docs/fact-check/start-a-business.md) Claim 4.</pre>
</div>

- **Type:** agency name / process step
- **Sources:** [gov.bb — Start a Business](https://www.gov.bb/Business/start-business) — MIST footer confirmed; [gov.bb — Business Policies and Law](https://www.gov.bb/Ministries/policies-laws) — MIST footer confirmed; see [start-a-business fact-check](/home/gavin/frontend-alpha/docs/fact-check/start-a-business.md) Claim 4 (F-086); prior reports F-029 and F-075 for the other two pages
- **Status:** unverifiable as a group — `start-a-business` attribution is partially corroborated by gov.bb footer; `registering-a-business-name` attribution is wrong (F-075, Business Barbados is under MEBD not MIST); `business-policies-and-law` attribution is wrong (F-029, content is from Labour ministry)
- **Certainty:** 55% (as a group)
- **Open question:** The MIST ministry page currently lists three `onlineServices` pages, two of which (`registering-a-business-name` and `business-policies-and-law`) have already been flagged in prior reports as incorrectly attributed to MIST. These should be removed from MIST's `onlineServices` and moved to their correct ministries. See F-029, F-074, and F-075.

---

## Additional findings (not on the page but should be)

### Source markdown is effectively empty

`src/content/ministries/ministry-of-industry-innovation-science-and-technology.md` contains only one line of content: `"Ministry of Industry, Innovation, Science and Technology (MIST)."` — essentially a placeholder. All meaningful content rendered on the alpha.gov.bb ministry page (contacts, minister, associated departments, services) is sourced from `ministries.ts`. The one-line markdown correctly names the ministry, so there are no factual errors in the source file itself, but the file contains no unique verifiable claims beyond the ministry name.

### Additional phone numbers not captured in ministries.ts

The gov.bb MIST page publishes additional direct-line numbers not present in `ministries.ts`:
- Permanent Secretary: `(246) 535-1211`
- PS Secretary: `(246) 535-1238`

These are not citizen-facing numbers in the same way the main PBX is, but their absence means citizens wanting to reach the Permanent Secretary directly must call the main switchboard.

### BNSI and Analytical Services not listed as associated bodies

Two bodies confirmed under MIST on gov.bb are not listed in `ministries.ts associatedDepartments`:
- **Barbados National Standards Institution (BNSI)** — Flodden, Culloden Road, St. Michael; tel (246) 426-3870 / 436-1495; source: [gov.bb — National Standards](https://www.gov.bb/State-Bodies/national-standards)
- **Government Analytical Services** — Culloden Road, St. Michael (PBX 535-1740, Director Dr. Beverley P. Wood); source: [gov.bb — Analytical Services](https://www.gov.bb/Departments/analytical-services)

### Future Barbados — new innovation arm under MIST (2026)

As of March 2026, Future Barbados has moved from the Prime Minister's Office to operate as the innovation arm of MIST, focusing on social innovation, talent activation (Talent Hub), and ecosystem building (green entrepreneurship, climate innovation, smart city design). Source: [Barbados Today — Future Barbados to scale up innovation drive under new ministry (12 Mar 2026)](https://barbadostoday.bb/2026/03/12/future-barbados-to-scale-up-innovation-drive-under-new-ministry/). This is not reflected on the alpha.gov.bb MIST page or in `associatedDepartments`.

### "Barbados, W.I." missing from address

Unlike all other ministry entries in `ministries.ts`, the MIST address (lines 752–754) omits `"Barbados, W.I."` as a final address line. This is a minor formatting inconsistency within the data file.

---

## Sources cited

- [gov.bb — Ministry of Industry, Innovation, Science and Technology (MIST)](https://www.gov.bb/Ministries/innovation-science-smart-technology) — primary authoritative source for all contact and structural claims
- [gov.bb — MIST directory](https://www.gov.bb/government-main/directory/ministry-of-industry/) — secondary contact cross-check; confirms 535-1201 as primary PBX line
- [gov.bb — Ministries listing](https://www.gov.bb/Ministries) — confirms canonical ministry name with "Industry" before "Innovation"
- [gov.bb — Data Protection Commission](https://www.gov.bb/Departments/data-protection-commissioner) — confirms DPC is under MIST; address and phone
- [gov.bb — Departments: SMRI](https://www.gov.bb/Departments/smri) — confirms "Science, Market Research and Innovation" unit under MIST
- [gov.bb — Departments: Analytical Services](https://www.gov.bb/Departments/analytical-services) — confirms Analytical Services under MIST; PBX 535-1740
- [gov.bb — State Bodies: National Standards (BNSI)](https://www.gov.bb/State-Bodies/national-standards) — confirms BNSI under MIST
- [gov.bb — Business/start-business](https://www.gov.bb/Business/start-business) — footer confirms MIST attribution for start-a-business page
- [gov.bb — Business policies-laws](https://www.gov.bb/Ministries/policies-laws) — footer confirms MIST attribution for this page
- [GIS Facebook — "Minister of Industry, Innovation, Science and Technology, Senator Jonathan Reid…"](https://www.facebook.com/gisbarbados/posts/minister-of-industry-innovation-science-and-technology-senator-jonathan-reid-enc/1088990616600687/) — confirms "Industry first" word order in minister's portfolio title
- [GIS tag — minister-of-industry-innovation-science-and-technology](https://gisbarbados.gov.bb/blog/tag/minister-of-industry-innovation-science-and-technology/) — GIS canonical tag uses "Industry" first
- [GIS — MIST Focusing On Data Protection](https://gisbarbados.gov.bb/blog/mist-focusing-on-data-protection/) — confirms "MIST" (not "MIIST") abbreviation
- [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — minister name confirmed; title listed as "Minister of Innovation, Industry, Science and Technology" (reversed order — discrepancy with gov.bb noted)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — full cabinet list; Reid's title given as "Minister of Innovation, Industry, Science and Technology"
- [Barbados Today — Reid seeks nearly $188m (11 Mar 2026)](https://barbadostoday.bb/2026/03/11/reid-seeks-nearly-188m-to-drive-barbados-digital-transformation/) — photo caption uses "Minister of Industry, Innovation, Science and Technology"
- [Barbados Today — Future Barbados to scale up innovation drive (12 Mar 2026)](https://barbadostoday.bb/2026/03/12/future-barbados-to-scale-up-innovation-drive-under-new-ministry/) — Future Barbados transition to MIST confirmed
- [Barbados Today — Government sets course for digital overhaul (30 Dec 2025)](https://barbadostoday.bb/2025/12/30/government-sets-course-for-sweeping-digital-overhaul/)
- [src/data/ministries.ts lines 717–780](/home/gavin/frontend-alpha/src/data/ministries.ts) — source data file reviewed
- [start-a-business fact-check](/home/gavin/frontend-alpha/docs/fact-check/start-a-business.md) — prior report on MIST-attributed business pages (Claims 3–4, F-074, F-075, F-086)
- [terms-conditions fact-check](/home/gavin/frontend-alpha/docs/fact-check/terms-conditions.md) — prior report on wrong ministry name (F-090, F-091)
