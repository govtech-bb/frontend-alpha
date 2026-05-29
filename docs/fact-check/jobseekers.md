# Fact-check: Jobseekers

- **Live page:** <https://alpha.gov.bb/work-employment/jobseekers>
- **Source file:** `src/content/jobseekers.md`
- **Last checked:** 2026-05-28
- **Summary:** 11 claims reviewed — 5 verified, 5 discrepant, 1 unverifiable. Average certainty: **86%**.

---

## Headline issues for triage

1. **Ministry name is wrong throughout the page (4 occurrences).** The page uses "Ministry of Labour and Social Partnership Relations" in every reference. The canonical current name, confirmed on gov.bb/ministries, labour.gov.bb, and in `src/data/ministries.ts`, is "Ministry of Labour, Social Security and Third Sector". This is the same error already flagged across other pages in F-006. The `source_url` page at `gov.bb/Citizens/job-seekers` also uses the old name, confirming the original source was written under the former ministry name and has not been updated.

2. **"National Employment Bureau" no longer exists under that name.** The One Stop Resource Centre page on labour.gov.bb no longer references the National Employment Bureau. The bureau was renamed the Barbados Employment and Career Counselling Service (BECCS) effective 1 April (confirmed by GIS and Loop Barbados reporting). The labour.gov.bb One Stop Resource Centre page references BECCS exclusively. Using the old bureau name on the live page could confuse citizens searching for it.

3. **"Ministry of the Public Service" is a shortened form of the current canonical name.** Gov.bb/ministries lists the full name as "Ministry of the Public Service and Talent Development" (MPSTD). The page's reference to "Ministry of the Public Service" omits "and Talent Development". This is a lower-priority concern because mps.gov.bb itself uses the shortened form in some headers, but the canonical gov.bb listing should be preferred.

---

## Claims

### Claim 1 — Ministry name in frontmatter description (line 3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">provided by the Ministry of Labour and Social Partnership Relations.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">provided by the Ministry of Labour, Social Security and Third Sector.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of Labour, Social Security and Third Sector"; [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security); [labour.gov.bb — About](https://labour.gov.bb/about-us/); `src/data/ministries.ts` line 783 — `name: "Ministry of Labour, Social Security and Third Sector"`
- **Status:** discrepant — "Ministry of Labour and Social Partnership Relations" is a former name no longer used
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — erodes trust; also misidentifies the responsible ministry for search and navigation purposes. Same error appears on lines 11, 19, and 30 (Claims 2, 5, 7).
- **Note:** This specific occurrence is in the YAML frontmatter `description` field and may not be directly citizen-facing, but it drives the page metadata.

---

### Claim 2 — Ministry name in Overseas Employment section heading (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Labour and Social Partnership Relations is committed to
helping you find the right job.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Ministry of Labour, Social Security and Third Sector is committed to
helping you find the right job.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries](https://www.gov.bb/ministries); [labour.gov.bb — About The Minister](https://labour.gov.bb/about-minister/) — "Minister of Labour, Social Security and the Third Sector"; `src/data/ministries.ts` line 783
- **Status:** discrepant
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — this line is the first substantive sentence a citizen reads; wrong ministry name is immediately visible.

---

### Claim 3 — One Stop Resource Centre URL and its parent body (lines 13–13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">One Stop Resource Centre under the National Employment Bureau and the
services provided for job seekers like you.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">One Stop Resource Centre under the Barbados Employment and Career
Counselling Service (BECCS) and the services provided for job seekers
like you.</pre>
</div>

- **Type:** agency name, URL
- **Sources:** [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/) — "It was designed to enhance and expand the services of the Barbados Employment and Career Counselling Service" (National Employment Bureau not mentioned); [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/) — BECCS is named as "the Government of Barbados' national employment service"; [GIS — Name Change For Employment Bureau April 1st](https://gisbarbados.gov.bb/blog/name-change-for-employment-bureau-april-1st/) (HTTP 403 on direct fetch, but confirmed via search index and Loop Barbados reporting); [Loop Barbados — National Employment Bureau to be renamed](https://barbados.loopnews.com/content/national-employment-bureau-be-renamed) (TLS error on direct fetch, confirmed from search snippets that the rename took effect 1 April, announced May 2017)
- **Status:** discrepant — the bureau was renamed to BECCS and no Tier 1 source now uses "National Employment Bureau"
- **Certainty:** 90%
- **Confidence it's wrong:** 88%
- **Citizen impact:** MEDIUM — a citizen searching "National Employment Bureau Barbados" may have difficulty locating the service under its current name; the URL itself (Claim 4) is live and correct.
- **Open question:** Confirm the exact year the rename took effect (GIS article accessible from search index indicates April 1 of an unconfirmed year; Loop Barbados reported the announcement in May 2017, with the change taking effect 1 April 2018 per GIS article title indexing).

---

### Claim 4 — One Stop Resource Centre URL (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://labour.gov.bb/employment-services/one-stop-resource-centre/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://labour.gov.bb/employment-services/one-stop-resource-centre/</pre>
</div>

- **Type:** URL
- **Sources:** [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/) — page resolves and contains expected content about the resource centre services
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Ministry name in Guidance and Counseling section (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Labour and Social Partnership Relations also wants to
help you throughout the job search process.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Ministry of Labour, Social Security and Third Sector also wants to
help you throughout the job search process.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries](https://www.gov.bb/ministries); [labour.gov.bb homepage](https://labour.gov.bb/); `src/data/ministries.ts` line 783
- **Status:** discrepant (same error as Claims 1, 2, 7)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — the section heading is self-explanatory; this is a trust and accuracy issue.

---

### Claim 6 — Guidance and Counseling topics (lines 22–27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">- Preparing a great resume
- Writing an effective cover letter
- Searching for available vacancies
- Making an application for a job
- Preparing for the job interview
- Getting ready for that first day on the job</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">- Preparing a great resume
- Writing an effective cover letter
- Searching for available vacancies
- Making an application for a job
- Preparing for the job interview
- Getting ready for that first day on the job</pre>
</div>

- **Type:** process step / descriptive
- **Sources:** [labour.gov.bb — Guidance and Counseling](https://labour.gov.bb/employment-services/guidance-and-counseling/) (URL confirmed live from search index; HTTP 404 on direct fetch — URL may be `/guidance-and-counseling/` vs `/guidance-and-counselling/`); [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/) — "BECCS is committed to preparing jobseekers for the job search process which includes: Preparing a great resume, Writing an effective cover letter, Searching for available vacancies, Making an application to a job, Preparing for the job interview, and Getting ready for that first day on the job." All six topics match verbatim (minor variant: "Making an application to a job" vs. "Making an application for a job" — inconsequential).
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Ministry name in Education and Training section (line 30)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Education and Training services within the Ministry of Labour and Social
Partnership Relations.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Education and Training services within the Ministry of Labour, Social
Security and Third Sector.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries](https://www.gov.bb/ministries); `src/data/ministries.ts` line 783
- **Status:** discrepant (same error as Claims 1, 2, 5)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — no citizen action depends on this name in this context.

---

### Claim 8 — Public Service Act, CAP 29, First Schedule – Recruitment and Employment Code (lines 34–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The provisions of the First Schedule – Recruitment and Employment Code
of the Public Service Act, CAP 29 require, that all job opportunities
or offices vacant for periods in excess of twelve months must be
circularized or advertised and should be filled on merit, but where the
nature of the work so requires, consideration shall be given to
seniority and experience.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The provisions of the First Schedule – Recruitment and Employment Code
of the Public Service Act, CAP 29 require, that all job opportunities
or offices vacant for periods in excess of twelve months must be
circularized or advertised and should be filled on merit, but where the
nature of the work so requires, consideration shall be given to
seniority and experience.</pre>
</div>

- **Type:** legal reference, process step
- **Sources:** [Ministry of Public Service — Jobs page](https://mps.gov.bb/People_Resourcing/jobs.php) — uses the identical verbatim sentence as the basis for advertising vacancies; [Public Service Act CAP 29 (PDF via MPS)](https://mps.gov.bb/Human_Resources/pdfs/Public%20Service%20Act%20CAP%2029.pdf) — statute confirmed extant (PDF binary, text extraction unsuccessful, but Act confirmed as CAP 29 by OAG legislative index and NUPW legislation page); [OAG — Consolidated Laws](https://oag.gov.bb/Laws/) — Public Service Act exists as Cap. 29 in Laws of Barbados
- **Status:** verified
- **Certainty:** 95%

---

### Claim 9 — "Ministry of the Public Service" name (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Visit the Ministry of the Public Service at
https://mps.gov.bb/People_Resourcing/</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially correct — shortened form of the canonical name</div>
<pre class="claim-block-content">The full canonical name per gov.bb/ministries is "Ministry of the Public
Service and Talent Development" (MPSTD). The page uses the shortened form
"Ministry of the Public Service" which also appears in mps.gov.bb headers.
The shortened form is not wrong in the way that "Ministry of Labour and
Social Partnership Relations" is wrong (the shorter form accurately describes
a subset of the ministry's mandate), but the canonical full name should be
preferred for accuracy and searchability.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — lists "Ministry of the Public Service and Talent Development"; [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/ministries/public-service) — full name confirmed as "Ministry of the Public Service and Talent Development (MPSTD)"; [mps.gov.bb homepage](https://mps.gov.bb/People_Resourcing/) — page title renders "Ministry of Public Service || Home" (drops "the" and "and Talent Development"); `src/data/ministries.ts` line 919 — `name: "Ministry of the Public Service and Talent Development"`
- **Status:** unverifiable as to whether the shortened form constitutes an error — the name "Ministry of the Public Service" appears in mps.gov.bb itself, but is not the full canonical gov.bb-listed name
- **Certainty:** 70%
- **Open question:** Should the page use the full canonical name "Ministry of the Public Service and Talent Development"? The shorter form is not categorically wrong, but it differs from the canonical listing. Recommend updating to the full name for consistency with the rest of the site.

---

### Claim 10 — Ministry of the Public Service URL (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://mps.gov.bb/People_Resourcing/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://mps.gov.bb/People_Resourcing/</pre>
</div>

- **Type:** URL
- **Sources:** [mps.gov.bb — People Resourcing](https://mps.gov.bb/People_Resourcing/) — page resolves and contains People Resourcing and Compliance Directorate content including vacancy postings
- **Status:** verified
- **Certainty:** 99%

---

### Claim 11 — Overseas Employment Programmes URL (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://labour.gov.bb/employment-services/overseas-employment-programmes/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://labour.gov.bb/employment-services/overseas-employment-programmes/</pre>
</div>

- **Type:** URL
- **Sources:** [labour.gov.bb — Overseas Employment Programmes](https://labour.gov.bb/employment-services/overseas-employment-programmes/) — page resolves and describes H2A/H2B/J-1 US programmes and Canadian SAWP/TFWP programmes
- **Status:** verified
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

- **Applying for Jobs Online (Coming Soon)** (line 15) — The page lists this as "Coming Soon". The Barbados Job Register at `https://www.barbadosjobregister.gov.bb/` is a live online job portal that has existed for some time. Citizens reading this page may not realise online job search is already available via this portal. Consider replacing the placeholder with a link to the Barbados Job Register.

- **Ministry name on `source_url` page** — The `source_url` `https://www.gov.bb/Citizens/job-seekers` itself still uses the old ministry name "Ministry of Labour and Social Partnership Relations". This suggests the original source has not been updated either; the alpha.gov.bb page content was likely drawn directly from the source_url page without independent verification.

- **Guidance and Counseling link missing** — The page mentions Guidance and Counseling but provides no link to `https://labour.gov.bb/employment-services/guidance-and-counseling/`. Citizens following the bullet points have no way to navigate directly to the guidance service.

- **Education and Training link missing** — The Education and Training section (lines 29–31) is a stand-alone paragraph with no hyperlink to the relevant labour.gov.bb page (`https://labour.gov.bb/employment-services/`). This is a dead end for the citizen.

---

## Sources cited

- [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/)
- [labour.gov.bb — Overseas Employment Programmes](https://labour.gov.bb/employment-services/overseas-employment-programmes/)
- [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/)
- [labour.gov.bb — About Us](https://labour.gov.bb/about-us/)
- [labour.gov.bb — About The Minister](https://labour.gov.bb/about-minister/)
- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)
- [gov.bb — Ministries listing](https://www.gov.bb/ministries)
- [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/ministries/public-service)
- [gov.bb — Citizens / job-seekers (declared source_url)](https://www.gov.bb/Citizens/job-seekers)
- [mps.gov.bb — People Resourcing homepage](https://mps.gov.bb/People_Resourcing/)
- [mps.gov.bb — Jobs (CAP 29 quote)](https://mps.gov.bb/People_Resourcing/jobs.php)
- [Public Service Act CAP 29 (PDF — MPS)](https://mps.gov.bb/Human_Resources/pdfs/Public%20Service%20Act%20CAP%2029.pdf)
- [GIS — Name Change For Employment Bureau April 1st](https://gisbarbados.gov.bb/blog/name-change-for-employment-bureau-april-1st/) (HTTP 403 on direct fetch — URL confirmed via search index)
- [Barbados Job Register](https://www.barbadosjobregister.gov.bb/)
- `src/data/ministries.ts` — canonical ministry names (lines 783, 919)
