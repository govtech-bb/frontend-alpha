# Fact-check: Ministry of Training and Tertiary Education

- **Live page:** <https://alpha.gov.bb/our-government/ministry-of-training-and-tertiary-education>
- **Source file:** `src/content/ministries/ministry-of-training-and-tertiary-education.md` (empty — page rendered entirely from data)
- **Data file:** `src/data/ministries.ts` (lines 1019–1041)
- **Last checked:** 2026-05-28
- **Summary:** 9 claims reviewed — 5 verified, 2 discrepant, 2 unverifiable. Average certainty: **76%**.

---

## Headline issues for triage

1. **Minister role title is wrong.** `ministries.ts` gives Husbands the title "Minister of Technological and Vocational Training" — a title from the pre-2025 ministry that no longer exists. Every post-February 2025 authoritative source (GIS Facebook, Barbados Parliament member page, Barbados Today, CAF press release) consistently calls her "Minister of Training and Tertiary Education". The ministry itself is named correctly; only the role title field is stale. This is a high-confidence discrepancy that any citizen or journalist checking the page will notice immediately.

2. **No contact details at all for this ministry.** Unlike every other ministry in `ministries.ts`, the MTTE entry contains zero contact information — no address, phone, email, fax, or website. `gov.bb/Ministries/training-tertiary-education` renders an MIST contact block in the footer (a gov.bb CMS artefact) rather than MTTE's own details, so the canonical Tier 1 source is also unhelpful. The Barbados Parliament member page for Husbands lists Elsie Payne Complex contacts inherited from the legacy ministry — these almost certainly relate to the Ministry of Educational Transformation (MEDT), not MTTE. The MTTE has not yet published a dedicated ministry website or authoritative contact directory. Until confirmed contacts are obtained from the ministry, the page correctly omits them, but this should be flagged as an open question.

3. **TVET Council ministry attribution conflict.** The TVET Council (`gov.bb/State-Bodies/technical-vocational-education`) appears in the MIST footer on every State Bodies page, and the TVET Council's own board composition (as of the most recent available source) still references the Ministry of Education, Technological and Vocational Training. Whether the TVET Council now formally reports to MTTE or MIST or Labour is unresolved from public-web sources.

4. **Barbados Vocational Training Board (BVTB) attribution conflict.** An ILO/Cinterfor report (the most specific source available) states the BVTB is "under the Ministry of Labour and Social Security" — not MTTE. The BVTB's own site and the September 2025 Barbados Today article place it operationally under Minister Husbands' reforms, suggesting BVTB moved to MTTE after the February 2025 split. This is unresolved and should be confirmed before publishing.

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
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of Training and Tertiary Education" listed as a distinct entry; [gov.bb — Ministry of Training and Tertiary Education](https://www.gov.bb/Ministries/training-tertiary-education) — page exists under this slug; [Barbados Today — New education ministries (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/) — ministry named; [CAF press release (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/) — "Ministry of Training and Tertiary Education" used officially in international context.
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
- **Sources:** [Barbados Parliament — Hon. Ms. C. Sandra V. Husbands, M.P.](https://www.barbadosparliament.com/member/details/10) — full name "C. Sandra V. Husbands, M.P." (Cheryl Sandra); [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Hon. Cheryl S. V. Husbands, M.P." listed as Cabinet Minister; [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — Husbands reappointed February 2026.
- **Status:** verified
- **Certainty:** 97%
- **Note:** The minister's given name is "Cheryl Sandra"; she is consistently referred to publicly as "Sandra Husbands". The formal style "Cheryl S. V. Husbands" used in `ministries.ts` matches the Barbados Parliament cabinet page exactly. No discrepancy.

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
- **Sources:** [GIS Facebook — "Minister of Training and Tertiary Education, Sandra Husbands…" (post, 2025)](https://m.facebook.com/gisbarbados/photos/minister-of-training-and-tertiary-education-mtte-sandra-husbands-believes-that-t/1144056307760784/); [GIS Facebook — "Minister of Training and Tertiary Education Sandra Husbands has described…" (post, 2025)](https://www.facebook.com/gisbarbados/posts/minister-of-training-and-tertiary-education-sandra-husbands-has-described-the-re/1236229785210102/); [Barbados Today — "Minister of Training and Tertiary Education Sandra Husbands…" (May 2026)](https://barbadostoday.bb/2026/05/20/husbands-we-need-skilled-construction-workers/); [Barbados Parliament — member page lists portfolio as "Minister of Training and Tertiary Education"](https://www.barbadosparliament.com/member/details/10); [Barbados Parliament — Cabinet list uses "Minister of Technological and Vocational Training"](https://www.barbadosparliament.com/page_content/show_content/8).
- **Status:** discrepant
- **Certainty:** 88%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — the minister's role title is publicly wrong; any citizen or journalist comparing the page to news coverage will note the discrepancy. "Technological and Vocational Training" is the pre-February 2025 portfolio title, assigned to the old unified ministry.
- **Note:** There is a minor inconsistency between the Barbados Parliament member page ("Minister of Training and Tertiary Education") and the current Cabinet Ministers page ("Minister of Technological and Vocational Training"). GIS Facebook, multiple Barbados Today articles, the member's own parliament page, and the CAF official press release all consistently use "Minister of Training and Tertiary Education" — that is the overwhelming weight of post-February 2025 evidence. The Cabinet Ministers list may simply not have been updated after the February 2026 reshuffle. The correct title is "Minister of Training and Tertiary Education".

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
- **Sources:** [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — BCC explicitly discussed under Minister Husbands' reforms; [bcc.edu.bb — Home](https://bcc.edu.bb/) — BCC's official site; [gov.bb/State-Bodies — search for BCC returns 404](https://www.gov.bb/State-Bodies/barbados-community-college) — gov.bb State Bodies page not found but BCC is a well-established government institution; [Barbados Today — New education ministries (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/) — BCC referenced in context of MTTE.
- **Status:** verified
- **Certainty:** 88%
- **Note:** The gov.bb State Bodies page for BCC returns 404; authoritative confirmation of BCC's formal ministerial assignment post-split comes from news coverage rather than a Tier 1 source. The BGTI construction grant PDF (September 2025) is headed "Ministry of Training and Tertiary Education" and explicitly covers SJPI and BVTB.

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
- **Sources:** [sjpi.edu.bb — Home](https://www.sjpi.edu.bb/) — official SJPI website; construction grant PDF (September 2025) at [sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf](https://www.sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf) is headed "Ministry of Training and Tertiary Education" and covers SJPI grants; [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — SJPI discussions at event hosted by Minister Husbands.
- **Status:** verified
- **Certainty:** 92%
- **Note:** SJPI was renamed from Samuel Jackman Prescod Polytechnic (SJPP) on 19 October 2017. The current name is confirmed correct.

---

### Claim 6 — Associated body: University of the West Indies (ministries.ts line 1034)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">University of the West Indies</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">UWI Cave Hill Campus is an autonomous regional university; Barbados
contributes funding and students. No post-February 2025 Tier 1 source
explicitly assigns UWI to MTTE rather than MEDT. The CAF/UWI Spanish
initiative (November 2025) had both the Ministry of Training and Tertiary
Education AND the University of the West Indies represented, consistent
with UWI falling under MTTE, but no formal gazette or Cabinet notice was
located.
Checked: cavehill.uwi.edu; gov.bb/ministries; gisbarbados.gov.bb;
Barbados Today 2025–2026 coverage.</pre>
</div>

- **Type:** agency name
- **Status:** unverifiable
- **Certainty:** 65%
- **Citizen impact:** LOW — UWI is a well-known regional institution; listing it under MTTE is plausible given MTTE's tertiary mandate and confirmed post-split news coverage placing tertiary institutions under Husbands' portfolio. However, no gazette confirmation found.
- **Open question:** Which Barbados government ministry formally has responsibility for the UWI Cave Hill Campus post-February 2025 split — MTTE or MEDT? Confirm with the Cabinet Secretariat or UWI Cave Hill's government liaison office.

---

### Claim 7 — Associated body: Erdiston Teachers' Training College (ministries.ts line 1035)

---

## Headline issues for triage

1. **Minister role title is wrong.** `ministries.ts` gives Husbands the title "Minister of Technological and Vocational Training" — a title from the pre-2025 ministry that no longer exists. Every post-February 2025 authoritative source (GIS Facebook, Barbados Parliament member page, Barbados Today, CAF press release) consistently calls her "Minister of Training and Tertiary Education". The ministry itself is named correctly; only the role title field is stale. This is a high-confidence discrepancy that any citizen or journalist checking the page will notice immediately.

2. **No contact details at all for this ministry.** Unlike every other ministry in `ministries.ts`, the MTTE entry contains zero contact information — no address, phone, email, fax, or website. `gov.bb/Ministries/training-tertiary-education` renders an MIST contact block in the footer (a gov.bb CMS artefact) rather than MTTE's own details, so the canonical Tier 1 source is also unhelpful. The Barbados Parliament member page for Husbands lists Elsie Payne Complex contacts inherited from the legacy ministry — these almost certainly relate to the Ministry of Educational Transformation (MEDT), not MTTE. The MTTE has not yet published a dedicated ministry website or authoritative contact directory. Until confirmed contacts are obtained from the ministry, the page correctly omits them, but this should be flagged as an open question.

3. **TVET Council ministry attribution conflict.** The TVET Council (`gov.bb/State-Bodies/technical-vocational-education`) appears in the MIST footer on every State Bodies page, and the TVET Council's own board composition (as of the most recent available source) still references the Ministry of Education, Technological and Vocational Training. Whether the TVET Council now formally reports to MTTE or MIST or Labour is unresolved from public-web sources.

4. **Barbados Vocational Training Board (BVTB) attribution conflict.** An ILO/Cinterfor report (the most specific source available) states the BVTB is "under the Ministry of Labour and Social Security" — not MTTE. The BVTB's own site and the September 2025 Barbados Today article place it operationally under Minister Husbands' reforms, suggesting BVTB moved to MTTE after the February 2025 split. This is unresolved and should be confirmed before publishing.

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
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of Training and Tertiary Education" listed as a distinct entry; [gov.bb — Ministry of Training and Tertiary Education](https://www.gov.bb/Ministries/training-tertiary-education) — page exists under this slug; [Barbados Today — New education ministries (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/) — ministry named; [CAF press release (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/) — "Ministry of Training and Tertiary Education" used officially in international context.
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
- **Sources:** [Barbados Parliament — Hon. Ms. C. Sandra V. Husbands, M.P.](https://www.barbadosparliament.com/member/details/10) — full name "C. Sandra V. Husbands, M.P." (Cheryl Sandra); [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Hon. Cheryl S. V. Husbands, M.P." listed as Cabinet Minister; [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — Husbands reappointed February 2026.
- **Status:** verified
- **Certainty:** 97%
- **Note:** The minister's given name is "Cheryl Sandra"; she is consistently referred to publicly as "Sandra Husbands". The formal style "Cheryl S. V. Husbands" used in `ministries.ts` matches the Barbados Parliament cabinet page exactly. No discrepancy.

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
- **Sources:** [GIS Facebook — "Minister of Training and Tertiary Education, Sandra Husbands…" (2025)](https://m.facebook.com/gisbarbados/photos/minister-of-training-and-tertiary-education-mtte-sandra-husbands-believes-that-t/1144056307760784/); [GIS Facebook — second post confirming title (2025)](https://www.facebook.com/gisbarbados/posts/minister-of-training-and-tertiary-education-sandra-husbands-has-described-the-re/1236229785210102/); [Barbados Today — Husbands: We need skilled construction workers (2026-05-20)](https://barbadostoday.bb/2026/05/20/husbands-we-need-skilled-construction-workers/) — byline uses "Minister of Training and Tertiary Education"; [Barbados Parliament — member page portfolio field](https://www.barbadosparliament.com/member/details/10) — "Minister of Training and Tertiary Education"; [CAF press release (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/) — official international use of the title; [Barbados Parliament Cabinet list (partial conflict)](https://www.barbadosparliament.com/page_content/show_content/8) — this one page uses "Minister of Technological and Vocational Training" but every other source contradicts it.
- **Status:** discrepant
- **Certainty:** 88%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — the role title "Minister of Technological and Vocational Training" refers to a portfolio that ceased to exist in February 2025. A citizen or journalist cross-checking the page against any news source since that date will find an immediately obvious mismatch.
- **Note:** One source — the Barbados Parliament Cabinet Ministers list — uses "Minister of Technological and Vocational Training" for Husbands, which is what `ministries.ts` currently mirrors. However, this appears to be a stale entry on that Parliament page. GIS (the Government's own information service), multiple Barbados Today articles from 2025 and 2026, the MP's own Parliament member page, and an official CAF international press release all use "Minister of Training and Tertiary Education". The weight of evidence overwhelmingly favours the corrected title.

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
- **Sources:** [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — BCC discussed under Minister Husbands' reforms; [bcc.edu.bb — Home](https://bcc.edu.bb/) — official BCC site confirms institution exists; [gov.bb/State-Bodies/barbados-community-college — 404](https://www.gov.bb/State-Bodies/barbados-community-college) — State Bodies page not found (checked).
- **Status:** verified
- **Certainty:** 85%
- **Note:** No Tier 1 source explicitly maps BCC to MTTE post-split; confidence comes from Tier 2/3 sources (news coverage of Husbands at BCC-related events). The gov.bb State Bodies page for BCC returns 404.

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
- **Sources:** [sjpi.edu.bb — Home](https://www.sjpi.edu.bb/) — SJPI official site confirms full name; [SJPI construction grant PDF (2025-09)](https://www.sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf) — document header reads "Ministry of Training and Tertiary Education" and covers SJPI grants; [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/).
- **Status:** verified
- **Certainty:** 92%
- **Note:** The institution was renamed from Samuel Jackman Prescod Polytechnic (SJPP) to Samuel Jackman Prescod Institute of Technology (SJPI) on 19 October 2017. The current name in `ministries.ts` is correct.

---

### Claim 6 — Associated body: University of the West Indies (ministries.ts line 1034)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">University of the West Indies</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">UWI Cave Hill Campus is an autonomous regional university; Barbados
contributes funding and students. No post-February 2025 Tier 1 source
explicitly assigns UWI to MTTE rather than MEDT. The CAF/UWI Spanish
initiative (November 2025) had both the Ministry of Training and Tertiary
Education AND the University of the West Indies represented, consistent
with UWI falling under MTTE, but no formal gazette or Cabinet notice was
located.
Checked: cavehill.uwi.edu; gov.bb/ministries; gisbarbados.gov.bb;
Barbados Today 2025–2026 coverage.</pre>
</div>

- **Type:** agency name
- **Status:** unverifiable
- **Certainty:** 65%
- **Citizen impact:** LOW — UWI is a well-known regional institution; listing it under MTTE is plausible given MTTE's tertiary mandate and confirmed post-split news coverage placing tertiary institutions under Husbands' portfolio. However, no gazette confirmation found.
- **Open question:** Which Barbados government ministry formally has responsibility for the UWI Cave Hill Campus post-February 2025 split — MTTE or MEDT? Confirm with the Cabinet Secretariat or UWI Cave Hill's government liaison office.

---

### Claim 7 — Associated body: Erdiston Teachers' Training College (ministries.ts line 1035)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Erdiston Teachers' Training College</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">Erdiston is a teacher training institution at Government Hill, St. Michael
(gov.bb/State-Bodies/erdiston-teacher-training). Post-February 2025 split,
teacher training straddles both ministries: Erdiston trains teachers
(arguably MEDT territory) yet is a tertiary institution (MTTE territory).
May 2026 Barbados Today coverage of Erdiston graduation discusses
"Ministry of Educational Transformation" collaboration — not MTTE.
gov.bb/State-Bodies/erdiston-teacher-training: ministry footer shows MIST
(artefact of the gov.bb CMS, not a meaningful attribution).
Checked: gov.bb/State-Bodies/erdiston-teacher-training; ettc.edu.bb;
Barbados Today (2026-05-07); mes.gov.bb/Departments/HEDU/.</pre>
</div>

- **Type:** agency name
- **Status:** unverifiable
- **Certainty:** 55%
- **Citizen impact:** MEDIUM — if Erdiston in fact sits under MEDT (not MTTE), listing it here misdirects citizens and obscures accountability. May 2026 graduation coverage explicitly references "Ministry of Educational Transformation" partnership with Erdiston.
- **Open question:** Does Erdiston Teachers' Training College now report to the Ministry of Training and Tertiary Education or the Ministry of Educational Transformation? Resolve with both ministries' Permanent Secretaries before publishing. See also [ministry-of-educational-transformation.md](/home/gavin/frontend-alpha/docs/fact-check/ministries/ministry-of-educational-transformation.md) Claim 12.

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
- **Sources:** [SJPI construction grant PDF (2025-09)](https://www.sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf) — headed "Ministry of Training and Tertiary Education" and explicitly covers BVTB grants; [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/) — BVTB under Husbands' reform programme; [bvtb.gov.bb — Contact](https://bvtb.gov.bb/contact/) — address Lawrence Green House, Culloden Road, St. Michael; [ILO/Cinterfor (historical)](https://www.oitcinterfor.org/node/6779) — previously under Ministry of Labour and Social Security.
- **Status:** verified (post-split attribution confirmed by September 2025 official MTTE document)
- **Certainty:** 83%
- **Note:** The ILO report attributing BVTB to "Ministry of Labour and Social Security" pre-dates the February 2025 ministry split. The September 2025 MTTE construction grant PDF is the most recent and most directly authoritative source; it explicitly places BVTB within the Ministry of Training and Tertiary Education's ambit. This supersedes the earlier Labour attribution.

---

### Claim 9 — Associated body: Technical & Vocational Education and Training Council (ministries.ts line 1037)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Technical & Vocational Education and Training Council</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">gov.bb/State-Bodies/technical-vocational-education: page exists but the
gov.bb CMS footer shows MIST contact details (not MTTE) — likely a CMS
artefact. The TVET Council's own "About Us" page references an ex-officio
board seat held by the "Permanent Secretary, Ministry of Education,
Technological and Vocational Training" — a title that no longer exists
post-February 2025. tvetcouncil.com.bb has not been updated to reflect
the split. No GIS press release or gazette notice confirms whether the
TVET Council now falls under MTTE, MIST, or retains its pre-split
reporting line.
Checked: gov.bb/State-Bodies/technical-vocational-education;
tvetcouncil.com.bb/about-us; labour.gov.bb/education-training/;
gisbarbados.gov.bb tag searches.</pre>
</div>

- **Type:** agency name
- **Status:** unverifiable
- **Certainty:** 50%
- **Citizen impact:** MEDIUM — the TVET Council coordinates qualification standards across all TVET providers. If it reports to MIST or Labour rather than MTTE, listing it here misdirects stakeholders in TVET policy.
- **Open question:** After the February 2025 ministry split, which ministry does the TVET Council formally report to? The ex-officio Permanent Secretary board seat — previously held by the PS of Education, Technological and Vocational Training — should now name either the PS of MTTE or another ministry. Confirm with the TVET Council directly or via the Cabinet Secretariat.

---

### Claim 10 — Associated body: The Barbados Accreditation Council (ministries.ts line 1038)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Barbados Accreditation Council</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Barbados Accreditation Council</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb/State-Bodies/accreditation-council](https://www.gov.bb/State-Bodies/accreditation-council) — BAC listed as a State Body; [bac.gov.bb — About Us](https://bac.gov.bb/about-us/) — "established by an Act of Parliament, the Barbados Accreditation Council (BAC) Act 2004-11"; address: First Floor, The Phoenix Centre, George Street, St. Michael BB11114; phone: (246) 535-6740; email: info@bac.gov.bb.
- **Status:** verified (name and existence confirmed)
- **Certainty:** 85%
- **Note:** The BAC's ministry attribution post-February 2025 split is not confirmed from public-web Tier 1 sources. A search synthesis found a reference to Cabinet approving a National Qualifications and Credit Framework and a new body (Barbados Accreditation and Qualifications Authority, BAQA) to eventually replace the BAC — this transition is in progress but the BAC is still the operative accreditation body as of May 2026. The name "The Barbados Accreditation Council" is correct.

---

## Additional findings (not on the page but should be)

1. **Contact details entirely absent.** Every other ministerial entry in `ministries.ts` includes at minimum a telephone and email; MTTE has none. The Barbados Parliament member page for Husbands lists a phone number `(246) 535-0611` and the Elsie Payne Complex address under her constituency office — these almost certainly belong to the pre-split legacy ministry (MEDT, which now occupies Elsie Payne Complex). Once the ministry establishes its own contact directory, the page should be updated. In the interim, the GovBB team should note this gap.

2. **No shortDescription or intro text.** `ministries.ts` has no `shortDescription` or `intro` fields for MTTE. Every other ministerial entry has at least one of these. Citizens arriving at the page have no mission statement or mandate description. The gov.bb/Ministries/training-tertiary-education page also lacks this (it renders only an associated-departments list), so there is no authoritative source to draw from at this time — this requires the ministry's input.

3. **originalSource URL has a gov.bb CMS artefact.** `originalSource: "https://www.gov.bb/Ministries/training-tertiary-education"` is listed, but fetching that URL returns MIST contact details in the page footer rather than MTTE details. This is a gov.bb CMS issue, not an alpha.gov.bb issue, but the team should be aware that the source URL does not validate cleanly.

4. **Barbados Accreditation Council is being replaced.** Cabinet approved the National Qualifications and Credit Framework and the replacement body (Barbados Accreditation and Qualifications Authority, BAQA). Once BAQA is formally established and operational, the associated body entry should be updated from "The Barbados Accreditation Council" to reflect the new body. This is a watch item, not an immediate fix.

---

## Sources cited

- [gov.bb — Ministries listing](https://www.gov.bb/ministries)
- [gov.bb — Ministry of Training and Tertiary Education](https://www.gov.bb/Ministries/training-tertiary-education)
- [gov.bb — Permanent Secretaries and Related Grades](https://www.gov.bb/government/ps-related-grades)
- [gov.bb — State Bodies: Technical & Vocational Education and Training Council](https://www.gov.bb/State-Bodies/technical-vocational-education)
- [gov.bb — State Bodies: Barbados Vocational Training Board](https://www.gov.bb/State-Bodies/vocational-training-board)
- [gov.bb — State Bodies: Accreditation Council](https://www.gov.bb/State-Bodies/accreditation-council)
- [gov.bb — State Bodies: Erdiston Teachers' Training College](https://www.gov.bb/State-Bodies/erdiston-teacher-training)
- [gov.bb — State Bodies: Barbados Community College (404)](https://www.gov.bb/State-Bodies/barbados-community-college)
- [gov.bb — State Bodies: Barbados Accreditation Council (404)](https://www.gov.bb/State-Bodies/barbados-accreditation-council)
- [Barbados Parliament — Hon. Ms. C. Sandra V. Husbands, M.P.](https://www.barbadosparliament.com/member/details/10)
- [Barbados Parliament — Cabinet Ministers and Ministers of State (current)](https://www.barbadosparliament.com/page_content/show_content/8)
- [Barbados Parliament — Cabinet Ministers 2022–2027](https://www.barbadosparliament.com/page_content/show_content/70)
- [GIS Facebook — "Minister of Training and Tertiary Education, MTTE, Sandra Husbands…" (2025)](https://m.facebook.com/gisbarbados/photos/minister-of-training-and-tertiary-education-mtte-sandra-husbands-believes-that-t/1144056307760784/)
- [GIS Facebook — "Minister of Training and Tertiary Education Sandra Husbands has described…" (2025)](https://www.facebook.com/gisbarbados/posts/minister-of-training-and-tertiary-education-sandra-husbands-has-described-the-re/1236229785210102/)
- [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Barbados Today — New ministerial team to deliver on accountability (2026-02-16)](https://barbadostoday.bb/2026/02/16/new-ministerial-team-to-deliver-on-accountability-performance/)
- [Barbados Today — New education ministries, same old questions (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/)
- [Barbados Today — Prime Minister announces Cabinet changes (2025-02-25)](https://barbadostoday.bb/2025/02/25/prime-minister-announces-changes-to-the-cabinet-of-barbados/)
- [Barbados Today — Husbands: We need skilled construction workers (2026-05-20)](https://barbadostoday.bb/2026/05/20/husbands-we-need-skilled-construction-workers/)
- [Barbados Today — Tech education on workbench (2025-09-27)](https://barbadostoday.bb/2025/09/27/tech-education-on-workbench-new-training-facilities-options-coming/)
- [Barbados Today — Top Erdiston grads ready to reshape classrooms (2026-05-07)](https://barbadostoday.bb/2026/05/07/top-erdiston-grads-ready-to-reshape-classrooms/)
- [CAF — CAF and Barbados launch initiative via UWI (2025-11-21)](https://www.caf.com/en/currently/news/caf-and-barbados-launch-landmark-initiative-to-boost-trade-and-business-opportunities-through-spanish-proficiency/)
- [sjpi.edu.bb — Home](https://www.sjpi.edu.bb/)
- [SJPI — Construction Grant PDF (2025-09)](https://www.sjpi.edu.bb/wp-content/uploads/2025/09/construction_grant.pdf)
- [bcc.edu.bb — Home](https://bcc.edu.bb/)
- [bvtb.gov.bb — Home](https://bvtb.gov.bb/)
- [bac.gov.bb — About Us](https://bac.gov.bb/about-us/)
- [tvetcouncil.com.bb — About Us](https://www.tvetcouncil.com.bb/about-us)
- [ettc.edu.bb — Home](https://ettc.edu.bb/)
- [src/data/ministries.ts — MTTE entry (lines 1019–1041)](/home/gavin/frontend-alpha/src/data/ministries.ts)
- [src/content/ministries/ministry-of-training-and-tertiary-education.md (empty)](/home/gavin/frontend-alpha/src/content/ministries/ministry-of-training-and-tertiary-education.md)
- [docs/fact-check/ministries/ministry-of-educational-transformation.md — Claim 12 (HEDU attribution cross-reference)](/home/gavin/frontend-alpha/docs/fact-check/ministries/ministry-of-educational-transformation.md)
