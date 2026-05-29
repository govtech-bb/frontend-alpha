# Fact-check: Ministry of Training and Tertiary Education

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-training-and-tertiary-education>
- **Source file:** `src/content/ministries/ministry-of-training-and-tertiary-education.md` (empty — page rendered entirely from `src/data/ministries.ts`)
- **Data file:** `src/data/ministries.ts` (lines 1020–1041)
- **Last checked:** 2026-05-29
- **Summary:** 10 claims reviewed — 5 verified, 2 discrepant, 3 unverifiable. Average certainty: **73%**.

---

## Headline issues for triage

1. **Minister role title is ambiguous — both titles appear in authoritative sources.** `ministries.ts` gives Husbands the title "Minister of Technological and Vocational Training." The Barbados Parliament Cabinet Ministers list (Tier 1) uses this same title. However, the Parliament member page for Husbands uses "Minister of Training and Tertiary Education," and GIS Facebook posts (2025) consistently use that version too. The title remains discrepant but is now lower-confidence than the previous pass assessed (reduced from 90% to 70% confidence it's wrong). The GovBB team should confirm the official gazetted title with the Cabinet Secretariat before publishing.

2. **Previous report had a wrong live URL.** The prior pass recorded the live URL as `https://alpha.gov.bb/our-government/ministry-of-training-and-tertiary-education` — this returns HTTP 404. The correct live URL is `https://alpha.gov.bb/government/organisations/ministry-of-training-and-tertiary-education` (confirmed live). This is corrected in this report.

3. **Erdiston Teachers' Training College may belong under MEDT, not MTTE.** The May 2026 Barbados Today graduation coverage has Erdiston's Deputy Principal explicitly referencing the "Ministry of Education Transformation" as their ministry partner. The TVET Council's own About page still lists the Permanent Secretary of the legacy "Ministry of Education, Technological and Vocational Training" as the ex-officio board member — also unresolved. Both of these claims remain unverifiable from public sources and need agency confirmation.

4. **No contact details at all for this ministry.** Unlike every other ministerial entry in `ministries.ts`, the MTTE entry contains no address, phone, email, fax, or website. The Barbados Parliament member page for Husbands lists `(246) 535-0611` and Elsie Payne Complex as constituency office contacts — these likely relate to the pre-split legacy ministry (MEDT). Until confirmed MTTE contacts are obtained from the ministry itself, the gap should be flagged.

---

## Claims

### Claim 1 — Ministry name (ministries.ts line 1021)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Training and Tertiary Education</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Training and Tertiary Education</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of Training and Tertiary Education" listed as a distinct entry; [gov.bb — Ministry of Training and Tertiary Education](https://www.gov.bb/Ministries/training-tertiary-education) — page exists; [Barbados Today — New education ministries (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/); [CAF press release (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/) — ministry name used officially in international context.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Minister name: "The Hon. Cheryl S. V. Husbands, M.P." (ministries.ts line 1025)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Hon. Cheryl S. V. Husbands, M.P.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. Cheryl S. V. Husbands, M.P.</pre>
</div>

- **Type:** agency name (personnel)
- **Sources:** [Barbados Parliament — member page](https://www.barbadosparliament.com/member/details/10) — full name "Hon. Ms. C. Sandra V. Husbands, M.P." (Cheryl Sandra); [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Hon. Cheryl S. V. Husbands, M.P." listed; [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — Husbands reappointed February 2026.
- **Status:** verified
- **Certainty:** 97%
- **Note:** The minister's given name is "Cheryl Sandra"; she is referred to publicly as "Sandra Husbands." The formal style "Cheryl S. V. Husbands, M.P." matches the Parliament cabinet page exactly.

---

### Claim 3 — Minister role: "Minister of Technological and Vocational Training" (ministries.ts line 1026)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Minister of Technological and Vocational Training</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Minister of Training and Tertiary Education</pre>
</div>

- **Type:** agency name (role title)
- **Sources supporting change:** [Barbados Parliament — member page](https://www.barbadosparliament.com/member/details/10) — lists portfolio as "Minister of Training and Tertiary Education"; [GIS Facebook — "Minister of Training and Tertiary Education, MTTE, Sandra Husbands…" (2025)](https://m.facebook.com/gisbarbados/photos/minister-of-training-and-tertiary-education-mtte-sandra-husbands-believes-that-t/1144056307760784/); [CAF press release (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/). **Sources supporting current text:** [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — lists "Minister of Technological and Vocational Training" for Husbands; [Barbados Today — Husbands: We need skilled construction workers (2026-05-20)](https://barbadostoday.bb/2026/05/20/husbands-we-need-skilled-construction-workers/) — uses "Minister of Technological and Vocational Training"; [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — same title.
- **Status:** discrepant
- **Certainty:** 65%
- **Confidence it's wrong:** 70%
- **Citizen impact:** MEDIUM — the two role titles co-exist across authoritative sources. The Parliament Cabinet list and two Barbados Today articles from 2026 use "Minister of Technological and Vocational Training" (matching the current page). The Parliament member page and GIS use "Minister of Training and Tertiary Education." Until the Cabinet Secretariat confirms the gazetted title, both versions have authoritative backing. The current page text ("Technological and Vocational Training") refers to a portfolio title that pre-dates the February 2025 split; on balance "Minister of Training and Tertiary Education" better reflects the ministry's actual remit, but certainty is reduced from the previous pass.
- **Note:** The previous pass rated this 90% confidence wrong. Multiple Feb–May 2026 sources (Parliament Cabinet page, Barbados Today) now demonstrate the old title remains in formal circulation. The Barbados Parliament Cabinet list is a Tier 1 source and it matches the current page. This is a genuine discrepancy but not as clear-cut as the prior report indicated. Recommended action: confirm gazetted title with Cabinet Secretariat.

---

### Claim 4 — Associated body: Barbados Community College (ministries.ts line 1032)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados Community College</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados Community College</pre>
</div>

- **Type:** agency name
- **Sources:** [bcc.edu.bb — Home](https://bcc.edu.bb/) — official BCC site; [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — BCC discussed under Minister Husbands' reforms; [gov.bb/State-Bodies/barbados-community-college](https://www.gov.bb/State-Bodies/barbados-community-college) — returns 404 (checked 2026-05-29).
- **Status:** verified
- **Certainty:** 82%
- **Note:** No Tier 1 source explicitly maps BCC to MTTE post-split. Confidence comes from Tier 2/3 news coverage of Husbands at BCC-related events. gov.bb State Bodies page for BCC returns 404.

---

### Claim 5 — Associated body: The Samuel Jackman Prescod Institute of Technology (ministries.ts line 1033)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Samuel Jackman Prescod Institute of Technology</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Samuel Jackman Prescod Institute of Technology</pre>
</div>

- **Type:** agency name
- **Sources:** [sjpi.edu.bb — Home](https://www.sjpi.edu.bb/) — official SJPI site; [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — SJPI discussed under Minister Husbands' reforms.
- **Status:** verified
- **Certainty:** 90%
- **Note:** SJPI was renamed from Samuel Jackman Prescod Polytechnic (SJPP) on 19 October 2017. The current name is correct. The SJPI construction grant PDF (September 2025) is headed "Ministry of Training and Tertiary Education" and covers SJPI grants, confirming the ministerial link.

---

### Claim 6 — Associated body: University of the West Indies (ministries.ts line 1034)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">University of the West Indies</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">UWI Cave Hill Campus is an autonomous regional university. No post-February
2025 Tier 1 source explicitly assigns UWI to MTTE rather than MEDT.
The CAF/UWI Spanish initiative (November 2025) had both the Ministry of
Training and Tertiary Education AND UWI represented, consistent with UWI
falling under MTTE, but no formal gazette or Cabinet notice was located.
Checked: cavehill.uwi.edu; gov.bb/ministries; gisbarbados.gov.bb;
Barbados Today 2025–2026 coverage.</pre>
</div>

- **Type:** agency name
- **Status:** unverifiable
- **Certainty:** 65%
- **Citizen impact:** LOW — UWI is a well-known regional institution; listing it under MTTE is plausible given MTTE's tertiary mandate and news coverage placing tertiary institutions under Husbands' portfolio.
- **Open question:** Which Barbados government ministry formally has responsibility for UWI Cave Hill Campus post-February 2025 split — MTTE or MEDT? Confirm with the Cabinet Secretariat or UWI Cave Hill's government liaison office.

---

### Claim 7 — Associated body: Erdiston Teachers' Training College (ministries.ts line 1035)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Erdiston Teachers' Training College</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question (stronger evidence toward MEDT)</div>
<pre class="claim-block-content">The May 2026 Erdiston graduation article (Barbados Today, 2026-05-07) quotes
Deputy Principal Francis Thompson referencing the "Ministry of Education
Transformation" as the ministry Erdiston partners with — not MTTE.
gov.bb/State-Bodies/erdiston-teacher-training: address is Government Hill,
St. Michael. No ministry attribution shown on the gov.bb State Bodies page
(footer shows MIST — a CMS artefact). ettc.edu.bb: no ministry affiliation
mentioned. The institution trains teachers (arguably MEDT territory) yet
is a tertiary institution (MTTE territory) — straddling both post-split
mandates.
Checked: gov.bb/State-Bodies/erdiston-teacher-training; ettc.edu.bb;
Barbados Today (2026-05-07).</pre>
</div>

- **Type:** agency name
- **Status:** discrepant (leans toward MEDT)
- **Certainty:** 45%
- **Confidence it's wrong:** 65%
- **Citizen impact:** MEDIUM — if Erdiston formally sits under MEDT (not MTTE), listing it on this page misdirects citizens and misrepresents both ministries' portfolios. The May 2026 coverage citing the "Ministry of Education Transformation" is the most recent direct evidence.
- **Open question:** Does Erdiston Teachers' Training College now report to the Ministry of Training and Tertiary Education or the Ministry of Educational Transformation? Resolve with both ministries' Permanent Secretaries before publishing. See also [ministry-of-educational-transformation.md](/docs/fact-check/ministries/ministry-of-educational-transformation.md).

---

### Claim 8 — Associated body: Barbados Vocational Training Board (ministries.ts line 1036)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados Vocational Training Board</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with caveat)</div>
<pre class="claim-block-content">Barbados Vocational Training Board</pre>
</div>

- **Type:** agency name
- **Sources:** [SJPI construction grant PDF (2025-09)](https://www.sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf) — headed "Ministry of Training and Tertiary Education" and covers BVTB grants; [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — BVTB under Husbands' reform programme; [bvtb.gov.bb/contact](https://bvtb.gov.bb/contact/) — address: Lawrence Green House, Culloden Road, St. Michael; phone: 1-246-621 2882; fax: 1-246-621 2908.
- **Status:** verified
- **Certainty:** 83%
- **Note:** An older ILO/Cinterfor report places BVTB under "Ministry of Labour and Social Security" — this pre-dates the February 2025 split. The September 2025 MTTE construction grant PDF is the most recent authoritative source placing BVTB within MTTE's remit.

---

### Claim 9 — Associated body: Technical & Vocational Education and Training Council (ministries.ts line 1037)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Technical & Vocational Education and Training Council</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">tvetcouncil.com.bb/about-us (checked 2026-05-29) still lists ex-officio
board seats held by:
  - Mrs. Betty Alleyne-Headley, Permanent Secretary, Ministry of Education,
    Technological and Vocational Training (a title that no longer exists)
  - Ms. Marva Howell, Permanent Secretary, Ministry of Labour and Social
    Partnership Relations
The site has not been updated to reflect the February 2025 ministry split.
gov.bb/State-Bodies/technical-vocational-education: exists but CMS footer
shows MIST contact details (artefact, not meaningful attribution).
Checked: tvetcouncil.com.bb/about-us; gov.bb/State-Bodies/technical-
vocational-education; labour.gov.bb; gisbarbados.gov.bb.</pre>
</div>

- **Type:** agency name
- **Status:** unverifiable
- **Certainty:** 50%
- **Citizen impact:** MEDIUM — the TVET Council coordinates qualification standards across all TVET providers. If it formally reports to MIST or Labour rather than MTTE, listing it here misdirects stakeholders.
- **Open question:** After the February 2025 ministry split, which ministry does the TVET Council formally report to? The ex-officio Permanent Secretary board seat previously belonged to the PS of Education, Technological and Vocational Training — it should now name either MTTE, MIST, or another ministry. Confirm with the TVET Council or Cabinet Secretariat.

---

### Claim 10 — Associated body: The Barbados Accreditation Council (ministries.ts line 1038)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Barbados Accreditation Council</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (name and existence)</div>
<pre class="claim-block-content">The Barbados Accreditation Council</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb/State-Bodies/accreditation-council](https://www.gov.bb/State-Bodies/accreditation-council) — BAC listed as a State Body; [bac.gov.bb — About Us](https://bac.gov.bb/about-us/) — "established by an Act of Parliament, the Barbados Accreditation Council (BAC) Act 2004-11"; address: First Floor, The Phoenix Centre, George Street, St. Michael BB11114; phone: (246) 535-6740; email: info@bac.gov.bb.
- **Status:** verified (name and existence confirmed)
- **Certainty:** 85%
- **Note:** The BAC's post-February 2025 ministerial attribution is not confirmed by a Tier 1 source. A Cabinet-approved National Qualifications and Credit Framework proposes a replacement body (Barbados Accreditation and Qualifications Authority, BAQA) — this is in progress. The BAC is still the operative accreditation body as of May 2026; the name in `ministries.ts` is correct for now. Watch for BAQA establishment.

---

## Additional findings (not on the page but should be)

1. **Live URL in previous report was wrong.** The prior fact-check report recorded the live URL as `https://alpha.gov.bb/our-government/ministry-of-training-and-tertiary-education` — that path returns HTTP 404. The correct URL `https://alpha.gov.bb/government/organisations/ministry-of-training-and-tertiary-education` (matching the routing pattern in `src/app/government/organisations/page.tsx`) confirmed live on 2026-05-29. Any internal links using the old `/our-government/` prefix would 404.

2. **Contact details entirely absent.** Every other ministerial entry in `ministries.ts` includes at minimum a telephone and email; MTTE has none. The Barbados Parliament member page for Husbands lists phone `(246) 535-0611`, fax `(246) 436-2411`, email `sandra.husbands@barbados.gov.bb`, and address Elsie Payne Complex, Constitution Road, St. Michael — but these are constituency/legacy-ministry contacts and should not be added without ministry confirmation they belong to MTTE.

3. **No shortDescription or intro text.** `ministries.ts` has no `shortDescription` or `intro` fields for MTTE. Every other ministerial entry has at least one of these. Citizens have no mission statement or mandate description. The gov.bb/Ministries/training-tertiary-education page also lacks this content — ministry input is required.

4. **BVTB phone number may be outdated.** The previous pass cited bvtb.gov.bb listing `(246) 621-2882`; this pass confirms the number as `1-246-621 2882`. The alpha page shows no phone, so no discrepancy on the alpha page itself — but noted for reference.

5. **Barbados Accreditation Council replacement watch.** Cabinet approved the National Qualifications and Credit Framework and the Barbados Accreditation and Qualifications Authority (BAQA) as BAC's eventual successor. Once BAQA is formally established and operational, the associated body entry should be updated. This is a watch item, not an immediate fix.

---

## Sources cited

- [alpha.gov.bb — Ministry of Training and Tertiary Education (live page)](https://alpha.gov.bb/government/organisations/ministry-of-training-and-tertiary-education)
- [gov.bb — Ministries listing](https://www.gov.bb/ministries)
- [gov.bb — Ministry of Training and Tertiary Education](https://www.gov.bb/Ministries/training-tertiary-education)
- [gov.bb — State Bodies: Technical & Vocational Education and Training Council](https://www.gov.bb/State-Bodies/technical-vocational-education)
- [gov.bb — State Bodies: Barbados Vocational Training Board](https://www.gov.bb/State-Bodies/vocational-training-board)
- [gov.bb — State Bodies: Accreditation Council](https://www.gov.bb/State-Bodies/accreditation-council)
- [gov.bb — State Bodies: Erdiston Teachers' Training College](https://www.gov.bb/State-Bodies/erdiston-teacher-training)
- [gov.bb — State Bodies: Barbados Community College (404)](https://www.gov.bb/State-Bodies/barbados-community-college)
- [Barbados Parliament — Hon. Ms. C. Sandra V. Husbands, M.P.](https://www.barbadosparliament.com/member/details/10)
- [Barbados Parliament — Cabinet Ministers and Ministers of State (current)](https://www.barbadosparliament.com/page_content/show_content/8)
- [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Barbados Today — New ministerial team to deliver on accountability (2026-02-16)](https://barbadostoday.bb/2026/02/16/new-ministerial-team-to-deliver-on-accountability-performance/)
- [Barbados Today — New education ministries, same old questions (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/)
- [Barbados Today — Husbands: We need skilled construction workers (2026-05-20)](https://barbadostoday.bb/2026/05/20/husbands-we-need-skilled-construction-workers/)
- [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/)
- [Barbados Today — Top Erdiston grads ready to reshape classrooms (2026-05-07)](https://barbadostoday.bb/2026/05/07/top-erdiston-grads-ready-to-reshape-classrooms/)
- [CAF — CAF and Barbados launch initiative via UWI (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/)
- [sjpi.edu.bb — Home](https://www.sjpi.edu.bb/)
- [SJPI — Construction Grant PDF (2025-09)](https://www.sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf)
- [bcc.edu.bb — Home](https://bcc.edu.bb/)
- [bvtb.gov.bb/contact](https://bvtb.gov.bb/contact/)
- [bac.gov.bb — About Us](https://bac.gov.bb/about-us/)
- [tvetcouncil.com.bb — About Us](https://www.tvetcouncil.com.bb/about-us)
- [ettc.edu.bb — Home](https://ettc.edu.bb/)
- [src/data/ministries.ts — MTTE entry (lines 1020–1041)](/home/gavin/frontend-alpha/src/data/ministries.ts)
- [src/content/ministries/ministry-of-training-and-tertiary-education.md (empty)](/home/gavin/frontend-alpha/src/content/ministries/ministry-of-training-and-tertiary-education.md)
- [docs/fact-check/ministries/ministry-of-educational-transformation.md — Erdiston cross-reference](/docs/fact-check/ministries/ministry-of-educational-transformation.md)
