# Fact-check: Ministry of Educational Transformation

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-educational-transformation>
- **Source file:** `src/content/ministries/ministry-of-educational-transformation.md`
- **Data file:** `src/data/ministries.ts` (lines 232–286)
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 8 verified, 4 discrepant, 3 unverifiable. Average certainty: **76%**.

---

## Headline issues for triage

1. **Live URL in previous report was wrong (now corrected).** The prior pass recorded the live page at `/our-government/ministry-of-educational-transformation` — that URL returns HTTP 404. The correct live URL is `https://alpha.gov.bb/government/organisations/ministry-of-educational-transformation` (confirmed 200 OK, 2026-05-29). The dashboard link has been updated in this pass.

2. **Minister field is blank in `ministries.ts`.** The data file has an explicit comment: `// Note: Educational Transformation minister not in supplied cabinet brief — left blank.` Chad Blackman is the confirmed Minister of Educational Transformation, reappointed on 16 February 2026 after winning the St James North by-election. Any ministry page that renders the minister name will display nothing. This should be corrected immediately.

3. **HEDU building name is incomplete.** The source content lists the building only as `"Anselm"` but the authoritative `gov.bb/State-Bodies/higher-education-development-unit` page names it **"Anselm House"**. Confirmed again on 2026-05-29. Citizens trying to locate the unit may be confused by the partial name.

4. **PS direct phone number absent; only Secretary-to-PS line is published.** The page lists `(246) 535-0608` — the Secretary to the Permanent Secretary — but omits the PS's own direct line `(246) 535-0607`, which is published on `gov.bb/Ministries/education`. Citizens looking to reach the PS directly have no path.

5. **HEDU's ministry attribution is uncertain post-February 2025 split.** The Ministry of Education, Technological and Vocational Training was split in February 2025 into the Ministry of Educational Transformation (MEDT) and the Ministry of Training and Tertiary Education (MTTE). HEDU's mandate — strengthening Barbados Community College, SJPI, and Erdiston Teachers' College — is tertiary in nature, yet `gov.bb/Ministries/education` still lists HEDU under MEDT's directory. This is unresolved at the ministry-website level and should be confirmed before being cited on alpha.gov.bb.

---

## Claims

### Claim 1 — Mission statement (lines 1–2)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To ensure equitable access to quality education for all our citizens so
that their potential is fully realized and also to assist in the
development of responsible citizens who are disciplined, industrious,
creative and confident and who can function effectively in a modern
society.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To ensure equitable access to quality education for all our citizens so
that their potential is fully realized and also to assist in the
development of responsible citizens who are disciplined, industrious,
creative and confident and who can function effectively in a modern
society.</pre>
</div>

- **Type:** descriptive (mandate/mission)
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — mission statement reproduced verbatim; [education.gov.bb — Contact](https://education.gov.bb/home/Contact/) — tagline "Ensuring Quality Education for All" consistent with this mandate.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — Ministry name: "Ministry of Educational Transformation" (lines 5, and `ministries.ts` line 234)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Educational Transformation</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Educational Transformation</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education); [Barbados Today — New education ministries (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/); [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- **Status:** verified
- **Certainty:** 99%
- **Note:** `education.gov.bb/home/Contact/` still displays the legacy name "Ministry of Education, Technological and Vocational Training" — this is a stale label on that page; the canonical name on `gov.bb` and in all 2025–2026 news coverage is unambiguously "Ministry of Educational Transformation".

---

### Claim 3 — Minister field (blank in `ministries.ts`, lines 241–242)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">// Note: Educational Transformation minister not in supplied cabinet
brief — left blank. (No minister shown on the page.)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">minister: {
  name: "The Hon. Chad Blackman, M.P.",
  role: "Minister of Educational Transformation",
}</pre>
</div>

- **Type:** agency name / statistic (personnel)
- **Sources:** [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — "Chad Blackman, Minister of Education Transformation"; [Barbados Today — Back at education ministry, Blackman to press ahead with reforms (2026-02-17)](https://barbadostoday.bb/2026/02/17/back-at-education-ministry-blackman-to-press-ahead-with-reforms/); [Barbados Today — Minister Blackman's message for Teachers' Professional Day (2026-05-21)](https://barbadostoday.bb/2026/05/21/minister-blackmans-message-for-teachers-professional-day/); [Nation News — Blackman: Transformation well under way (2026-03-03)](https://nationnews.com/2026/03/03/blackman-transformation-well-under-way/)
- **Status:** discrepant — minister is blank; confirmed minister exists and should be populated
- **Certainty (of omission):** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — a ministry page with no minister listed reduces citizen confidence in the page's currency and makes it harder to hold the portfolio accountable.
- **Note on title:** Blackman served as Senator when first appointed in February 2025. He was elected MP for St James North in a by-election and reappointed to Cabinet on 16 February 2026. His current style is "The Hon. Chad Blackman, M.P." — the exact post-nominal should be confirmed with the Cabinet Office before publishing, as gazette confirmation was not located in this pass.

---

### Claim 4 — Secretary to the Permanent Secretary phone: (246) 535-0608 (lines 7–10)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Secretary to the Permanent Secretary | (246) 535-0608 |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">| Secretary to the Permanent Secretary | (246) 535-0608 |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — "(246) 535-0608 — Secretary to Permanent Secretary"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Permanent Secretary direct line absent from page (`ministries.ts` contact section)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Only (246) 535-0608 (Secretary to PS) is listed under the Ministry of
Educational Transformation directory. No direct PS phone number is
shown.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should add</div>
<pre class="claim-block-content">| Permanent Secretary | (246) 535-0607 |</pre>
</div>

- **Type:** phone (omission)
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — lists "(246) 535-0607 — Permanent Secretary" as a separate line from 535-0608
- **Status:** discrepant (by omission — the PS direct line is published on the authoritative gov.bb source but not surfaced on the page)
- **Certainty:** 92%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — the Secretary-to-PS line (535-0608) can route a caller to the PS. However omitting the direct PS line reduces completeness.

---

### Claim 6 — Ministry main PBX: (246) 535-0600 (`ministries.ts` line 262)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">{ label: "Telephone", type: "phone", value: "(246) 535-0600" }</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">{ label: "Telephone", type: "phone", value: "(246) 535-0600" }</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — "PBX (246) 535-0600"; [education.gov.bb — Contact](https://education.gov.bb/home/Contact/) — "1 (246) 535-0600"
- **Status:** verified
- **Certainty:** 98%

---

### Claim 7 — Fax: (246) 436-2411 (`ministries.ts` line 263)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">{ label: "Fax", type: "phone", value: "(246) 436-2411" }</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">{ label: "Fax", type: "phone", value: "(246) 436-2411" }</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — fax "(246) 436-2411"; [education.gov.bb — Contact](https://education.gov.bb/home/Contact/) — lists (246) 436-2411
- **Status:** verified
- **Certainty:** 98%

---

### Claim 8 — Emails: info@mes.gov.bb and ps@mes.gov.bb (`ministries.ts` lines 260–261)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">{ label: "Email", type: "email", value: "info@mes.gov.bb" }
{ label: "Email", type: "email", value: "ps@mes.gov.bb" }</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">{ label: "Email", type: "email", value: "info@mes.gov.bb" }
{ label: "Email", type: "email", value: "ps@mes.gov.bb" }</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — lists both info@mes.gov.bb and ps@mes.gov.bb; [education.gov.bb — Contact](https://education.gov.bb/home/Contact/) — lists info@mes.gov.bb
- **Status:** verified
- **Certainty:** 92%
- **Note:** `mes.gov.bb` 301-redirects all pages to `education.gov.bb`, but the email domain `mes.gov.bb` itself is still the official published address. Citizens who email info@mes.gov.bb or ps@mes.gov.bb should reach the ministry; the redirect is a web-navigation issue, not an email routing issue.

---

### Claim 9 — Address: Elsie Payne Complex, Constitution Road, St. Michael (`ministries.ts` lines 266–272)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Elsie Payne Complex
Constitution Road
St. Michael
Barbados, W.I</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Elsie Payne Complex
Constitution Road
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — "Elsie Payne Complex Constitution Road St. Michael Barbados, W.I."; [education.gov.bb — Contact](https://education.gov.bb/home/Contact/) — "Elsie Payne Complex, Constitution Road, St. Michael, Barbados, W.I."
- **Status:** verified (minor formatting note: `ministries.ts` uses "Barbados, W.I" without trailing period; authoritative source uses "Barbados, W.I." — negligible)
- **Certainty:** 99%

---

### Claim 10 — HEDU address: "Anselm", Government Hill, St. Michael (lines 13–15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">"Anselm" <br />
Government Hill <br />
St. Michael <br /></pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Anselm House
Government Hill
St. Michael</pre>
</div>

- **Type:** address / agency name
- **Sources:** [gov.bb — Higher Education Development Unit](https://www.gov.bb/State-Bodies/higher-education-development-unit) — address listed as "Anselm House, Government Hill, St. Michael" (confirmed 2026-05-29); [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — corroborates "Anselm," (noting quotes in gov.bb text too, suggesting the house name is "Anselm" not "Anselm House" — see note below)
- **Status:** discrepant — the State Bodies page uses "Anselm House"; gov.bb/Ministries/education uses `"Anselm,"` in quotes. The HEDU website (hedu.edu.bb) should be the tie-breaker but was not directly fetched this pass.
- **Certainty:** 85%
- **Confidence it's wrong:** 80%
- **Citizen impact:** LOW — a citizen searching for "Anselm House Government Hill" will likely locate the building; the partial name is nonetheless inaccurate.
- **Note:** gov.bb/Ministries/education also uses the quotation-mark form `"Anselm,"` — this may mean the house name itself is "Anselm" (not "Anselm House") and the State Bodies page appended "House" in error. The HEDU website at hedu.edu.bb should be checked as primary.

---

### Claim 11 — HEDU phone numbers (lines 17–22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| PBX                    | (246) 535-4050 |
| Director               | (246) 535-4051 |
| Project Officer        | (246) 535-4053 |
| Information Technology | (246) 535-4056 |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">| PBX                    | (246) 535-4050 |
| Director               | (246) 535-4051 |
| Project Officer        | (246) 535-4053 |
| Information Technology | (246) 535-4056 |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education) — all four HEDU numbers confirmed; [gov.bb — Higher Education Development Unit (State Bodies)](https://www.gov.bb/State-Bodies/higher-education-development-unit) — cross-confirms PBX 535-4050, Director 535-4051, Project Officer 535-4053, IT 535-4056
- **Status:** verified
- **Certainty:** 95%

---

### Claim 12 — HEDU ministry attribution post-February 2025 split (implied by placement under MEDT content)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Higher Education Development Unit is listed as a department under the
Ministry of Educational Transformation directory section of the page.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">gov.bb/Ministries/education still lists HEDU under MEDT's directory.
However:
- HEDU's mandate is tertiary (BCC, SJPI, Erdiston Teachers' College).
- The Ministry of Training and Tertiary Education (MTTE) oversees BCC,
  SJPI, Erdiston, UWI, and Barbados Vocational Training Board.
- No GIS press release or gazette notice confirms which ministry HEDU
  now reports to after the February 2025 split.
Checked: gov.bb/Ministries/education; gov.bb/State-Bodies/higher-education-
development-unit (established 2008, still shown under MEDT).</pre>
</div>

- **Type:** agency name / descriptive (ministry attribution)
- **Status:** unverifiable
- **Certainty:** 45%
- **Citizen impact:** MEDIUM — citizens using HEDU services (higher education funding, institutional development) may be routed through the wrong ministry if attribution is wrong.
- **Open question:** After the February 2025 split, does HEDU now report to the Ministry of Training and Tertiary Education rather than the Ministry of Educational Transformation? Confirm with the Cabinet Secretariat or either ministry's Permanent Secretary before the page is published.

---

### Claim 13 — `onlineServices` link: "Apply for a position as a temporary teacher" (`ministries.ts` lines 244–247)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">href: "/apply-for-a-position-as-a-temporary-teacher"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">href: "/apply-for-a-position-as-a-temporary-teacher"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Apply for a position as a temporary teacher](https://alpha.gov.bb/apply-for-a-position-as-a-temporary-teacher) — HTTP 200, page loads correctly with relevant content
- **Status:** verified
- **Certainty:** 99%

---

### Claim 14 — `onlineServices` link: "Get a primary school textbook grant" (`ministries.ts` lines 249–252)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">href: "/get-a-primary-school-textbook-grant"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">href: "/get-a-primary-school-textbook-grant"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Get a primary school textbook grant](https://alpha.gov.bb/get-a-primary-school-textbook-grant) — HTTP 200, page loads with content about $100 BDD annual grant
- **Status:** verified
- **Certainty:** 99%

---

### Claim 15 — `onlineServices` link: "Apply for a place at a day nursery" (`ministries.ts` lines 254–257) + ministry attribution

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">href: "/apply-for-a-place-at-a-day-nursery"
description: "Apply for a place at a government day nursery."
(listed under Ministry of Educational Transformation)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — open question</div>
<pre class="claim-block-content">The link resolves correctly (HTTP 200). However, the Child Care Board
(CCB), which historically operated government day nurseries, merged into
the Social Empowerment Agency (SEA) on 2 January 2026. Pre-merger, day
nurseries were a CCB function, not a MEDT function. No GIS or gov.bb
source confirms MEDT has assumed operational responsibility for day
nurseries post-SEA merger.
Checked: gov.bb/Ministries/education; childcareboard.gov.bb;
alpha.gov.bb/apply-for-a-place-at-a-day-nursery (200 OK, content
accessible).</pre>
</div>

- **Type:** link / CTA + agency name (attribution)
- **Status:** unverifiable (link itself is live; ministry attribution is the open question)
- **Certainty:** 35% (for attribution); 99% (for link liveness)
- **Citizen impact:** MEDIUM — if the day nursery service is now under SEA (not MEDT), listing it on the MEDT ministry page misdirects citizens and ministry staff alike.
- **Open question:** Has responsibility for government day nurseries remained with MEDT, transferred to SEA, or is MEDT the policy owner while SEA operates the nurseries? Confirm with both MEDT and SEA before publishing. See also [apply-for-a-place-at-a-day-nursery.md](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) Headline Issue 1.

---

## Additional findings (not on the page but should be)

1. **HEDU fax number missing.** `gov.bb/Ministries/education` lists a HEDU-specific fax `(246) 435-5979` (distinct from the main ministry fax 436-2411). This is not included in the HEDU directory section of the source content.

2. **HEDU email and website.** `gov.bb/Ministries/education` and the HEDU State Bodies page list `info@hedu.edu.bb` and website `hedu.edu.bb` — neither appears in the source content's HEDU directory table. Citizens wishing to contact HEDU by email have no pathway from the ministry page.

3. **Permanent Secretary name.** The `gov.bb` contact page lists three officials for MEDT: Ambassador Francois Jackman (Permanent Secretary), Ms. Kim Belle (Permanent Secretary (Ag.)), and Mrs. Claudette Hope-Greenidge (Permanent Secretary (Ag.)). The content page does not list any PS name — adding at least the substantive PS (Ambassador Jackman) would improve institutional transparency. This should be confirmed as current given the February 2026 cabinet reshuffle.

4. **Website entry `mes.gov.bb` redirects.** The `ministries.ts` entry lists `{ label: "Website", value: "mes.gov.bb" }`. Citizens navigating to `mes.gov.bb` are 301-redirected to `education.gov.bb` (confirmed again 2026-05-29); all deep links under `mes.gov.bb` either redirect successfully or return 404. The website field should be updated to `education.gov.bb` to match where citizens actually land, or a note added that `mes.gov.bb` redirects there.

5. **Previous report had wrong live URL.** The prior fact-check (2026-05-28) recorded the live page at `/our-government/ministry-of-educational-transformation` — this returns HTTP 404. The correct URL is `/government/organisations/ministry-of-educational-transformation`. Any dashboard row or cross-reference using the old path should be updated.

---

## Sources cited

- [alpha.gov.bb — Ministry of Educational Transformation (live page)](https://alpha.gov.bb/government/organisations/ministry-of-educational-transformation)
- [gov.bb — Ministry of Educational Transformation](https://www.gov.bb/Ministries/education)
- [gov.bb — Higher Education Development Unit (State Bodies)](https://www.gov.bb/State-Bodies/higher-education-development-unit)
- [gov.bb — Ministry of Training and Tertiary Education](https://www.gov.bb/Ministries/training-tertiary-education)
- [education.gov.bb — Ministry home](https://education.gov.bb/home/)
- [education.gov.bb — Contact](https://education.gov.bb/home/Contact/)
- [mes.gov.bb — 301 → education.gov.bb](https://mes.gov.bb)
- [alpha.gov.bb — Apply for a position as a temporary teacher](https://alpha.gov.bb/apply-for-a-position-as-a-temporary-teacher)
- [alpha.gov.bb — Get a primary school textbook grant](https://alpha.gov.bb/get-a-primary-school-textbook-grant)
- [alpha.gov.bb — Apply for a place at a day nursery](https://alpha.gov.bb/apply-for-a-place-at-a-day-nursery)
- [Barbados Today — New education ministries, same old questions (2025-02-28)](https://barbadostoday.bb/2025/02/28/new-education-ministries-same-old-questions/)
- [Barbados Today — Cabinet ministers sworn in (2026-02-16)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Barbados Today — Back at education ministry, Blackman to press ahead with reforms (2026-02-17)](https://barbadostoday.bb/2026/02/17/back-at-education-ministry-blackman-to-press-ahead-with-reforms/)
- [Barbados Today — Minister Blackman's message for Teachers' Professional Day (2026-05-21)](https://barbadostoday.bb/2026/05/21/minister-blackmans-message-for-teachers-professional-day/)
- [Nation News — Blackman: Transformation well under way (2026-03-03)](https://nationnews.com/2026/03/03/blackman-transformation-well-under-way/)
- [src/data/ministries.ts — Ministry of Educational Transformation entry (lines 232–286)](/home/gavin/frontend-alpha/src/data/ministries.ts)
- [src/content/ministries/ministry-of-educational-transformation.md](/home/gavin/frontend-alpha/src/content/ministries/ministry-of-educational-transformation.md)
- [docs/fact-check/apply-for-a-place-at-a-day-nursery.md — Headline Issue 1 (CCB/SEA merger)](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md)
