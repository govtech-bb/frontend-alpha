# Fact-check: Jobseekers

- **Live page:** <https://alpha.gov.bb/work-employment/jobseekers>
- **Source file:** `src/content/jobseekers.md`
- **Last checked:** 2026-05-29
- **Summary:** 13 claims reviewed — 6 verified, 5 discrepant, 2 unverifiable. Average certainty: **86%**.

---

## Headline issues for triage

1. **Ministry name is wrong throughout the page (4 occurrences).** The page uses "Ministry of Labour and Social Partnership Relations" in every reference. The canonical current name, confirmed on gov.bb/ministries, labour.gov.bb, and in `src/data/ministries.ts` line 783, is "Ministry of Labour, Social Security and Third Sector". The `source_url` page at `gov.bb/Citizens/job-seekers` also uses the old name, confirming the original source was written under the former ministry name and has not been updated. This is the same error already flagged in F-006 across other pages.

2. **"National Employment Bureau" no longer exists under that name.** The One Stop Resource Centre page on labour.gov.bb, and the Employment Services overview, both reference BECCS (Barbados Employment and Career Counselling Service) exclusively — "National Employment Bureau" does not appear on either page. Citizens searching for the "National Employment Bureau" may have difficulty locating the renamed service.

3. **"Applying for Jobs Online (Coming Soon)" — likely stale.** The page lists an online job application feature as "Coming Soon" with no link. The Barbados Job Register (`barbadosjobregister.gov.bb`) has existed as a live job portal for some time; however the domain returned HTTP 403 during this check so its current operational status cannot be independently confirmed. The "Coming Soon" label may mislead citizens into thinking no online avenue exists.

4. **"Ministry of the Public Service" omits "and Talent Development".** The canonical name per gov.bb/ministries is "Ministry of the Public Service and Talent Development". The page drops the full suffix. Lower-priority than the Labour ministry error but still inconsistent with canonical naming.

5. **No Guidance and Counseling or Education and Training links.** Both sections are mentioned by name but provide no hyperlink to the relevant labour.gov.bb pages, leaving citizens with no direct navigation path.

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
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of Labour, Social Security and Third Sector"; [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/) — "The Barbados Employment and Career Counselling Service (BECCS) is the Government of Barbados' national employment service"; `src/data/ministries.ts` line 783 — `name: "Ministry of Labour, Social Security and Third Sector"`
- **Status:** discrepant — "Ministry of Labour and Social Partnership Relations" is a former name no longer used
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — erodes trust; misidentifies the responsible ministry for search and navigation purposes. Same error appears on lines 11, 19, and 30 (Claims 2, 5, 7).
- **Note:** This occurrence is in the YAML frontmatter `description` field; it drives page metadata.

---

### Claim 2 — Ministry name in Overseas Employment section (line 11)

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
- **Sources:** [gov.bb — Ministries](https://www.gov.bb/ministries); `src/data/ministries.ts` line 783
- **Status:** discrepant
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — first substantive sentence on the page; wrong ministry name immediately visible to citizens.

---

### Claim 3 — "National Employment Bureau" — One Stop Resource Centre parent body (line 13)

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

- **Type:** agency name
- **Sources:** [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/) — "Barbados Employment and Career Counselling Service" named as the operating body; no mention of "National Employment Bureau"; [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/) — "The Barbados Employment and Career Counselling Service (BECCS) is the Government of Barbados' national employment service" — "National Employment Bureau" not present anywhere on the page
- **Status:** discrepant — bureau was renamed to BECCS; no Tier 1 source uses "National Employment Bureau" any longer
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — citizen searching for "National Employment Bureau Barbados" may not find the renamed service at BECCS.

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
- **Sources:** [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/) — page resolves and contains expected content about BECCS resource centre services, including address (Warrens Office Complex, 1st Floor East) and phone (246) 535-1535
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Overseas Employment Programmes URL (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://labour.gov.bb/employment-services/overseas-employment-programmes/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://labour.gov.bb/employment-services/overseas-employment-programmes/</pre>
</div>

- **Type:** URL
- **Sources:** [labour.gov.bb — Overseas Employment Programmes](https://labour.gov.bb/employment-services/overseas-employment-programmes/) — page resolves and describes H2A, H2B, J-1 Teaching Exchange, J-1 Trainee (US) and SAWP, TFWP (Canada) programmes
- **Status:** verified
- **Certainty:** 99%

---

### Claim 6 — "Applying for Jobs Online (Coming Soon)" (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Applying for Jobs Online (Coming Soon)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — potentially stale</div>
<pre class="claim-block-content">barbadosjobregister.gov.bb returned HTTP 403 during this check. The
Barbados Job Register has been referenced in prior reports as a live
portal, but its current operational status cannot be independently
confirmed from the public web. If it is live, "Coming Soon" is outdated
and should be replaced with a link to the Job Register. Flagged for
agency confirmation.</pre>
</div>

- **Type:** descriptive / negative statement
- **Checked:** [barbadosjobregister.gov.bb](https://www.barbadosjobregister.gov.bb/) — HTTP 403 Forbidden; cannot confirm current operational status
- **Status:** unverifiable
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — if a live online job portal exists, labelling it "Coming Soon" actively misleads citizens
- **Open question:** Is `barbadosjobregister.gov.bb` currently live and operational? If yes, replace placeholder with a direct link.

---

### Claim 7 — Ministry name in Guidance and Counseling section (line 19)

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
- **Sources:** [gov.bb — Ministries](https://www.gov.bb/ministries); `src/data/ministries.ts` line 783
- **Status:** discrepant (same error as Claims 1, 2, 9)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — section heading is self-explanatory; trust and accuracy issue.

---

### Claim 8 — Guidance and Counseling topics (lines 21–26)

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
- **Sources:** [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/) — "BECCS is committed to preparing jobseekers for the job search process which includes: Preparing a great resume, Writing an effective cover letter, Searching for available vacancies, Making an application to a job, Preparing for the job interview, and Getting ready for that first day on the job." All six topics confirmed; minor variant "Making an application to a job" vs "for a job" — inconsequential.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 9 — Ministry name in Education and Training section (line 30)

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
- **Status:** discrepant (same error as Claims 1, 2, 7)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — no citizen action depends on this name in this context.

---

### Claim 10 — Public Service Act, CAP 29, First Schedule – Recruitment and Employment Code (lines 34–35)

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
- **Sources:** [mps.gov.bb — People Resourcing / Jobs](https://mps.gov.bb/People_Resourcing/jobs.php) — uses identical verbatim sentence; [OAG — Consolidated Laws](https://oag.gov.bb/Laws/) — Public Service Act confirmed as Cap. 29 in the Laws of Barbados
- **Status:** verified
- **Certainty:** 95%

---

### Claim 11 — "Ministry of the Public Service" name (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Visit the Ministry of the Public Service at
https://mps.gov.bb/People_Resourcing/</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially correct — shortened form of the canonical name</div>
<pre class="claim-block-content">The full canonical name per gov.bb/ministries is "Ministry of the Public
Service and Talent Development". The page uses the shortened form
"Ministry of the Public Service", which also appears in mps.gov.bb's own
page title ("Ministry of Public Service || Home"). The shortened form is
not as egregiously wrong as the Labour ministry error, but "and Talent
Development" should be added for canonical accuracy.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of the Public Service and Talent Development"; [mps.gov.bb — Home](https://mps.gov.bb/People_Resourcing/) — page title is "Ministry of Public Service || Home" (drops both "the" and "and Talent Development"); `src/data/ministries.ts` line 919 — `name: "Ministry of the Public Service and Talent Development"`
- **Status:** unverifiable as to whether the shortened form is categorically wrong — both forms appear in official sources, with mps.gov.bb itself using the short form
- **Certainty:** 70%
- **Open question:** Should the alpha page use the full canonical name "Ministry of the Public Service and Talent Development"? Recommend yes, for consistency with gov.bb/ministries and `src/data/ministries.ts`.

---

### Claim 12 — Ministry of the Public Service URL (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://mps.gov.bb/People_Resourcing/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://mps.gov.bb/People_Resourcing/</pre>
</div>

- **Type:** URL
- **Sources:** [mps.gov.bb — People Resourcing](https://mps.gov.bb/People_Resourcing/) — page resolves; contains People Resourcing and Compliance Directorate content including vacancy postings
- **Status:** verified
- **Certainty:** 99%

---

### Claim 13 — source_url declaration (frontmatter line 4)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Citizens/job-seekers</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — URL live but source content is outdated</div>
<pre class="claim-block-content">https://www.gov.bb/Citizens/job-seekers — page resolves and contains
the original content, but it still uses the old ministry name
"Ministry of Labour and Social Partnership Relations", confirming
the alpha page content was drawn directly from this source without
independent verification of current ministry name.</pre>
</div>

- **Type:** URL / descriptive
- **Sources:** [gov.bb — Citizens / job-seekers](https://www.gov.bb/Citizens/job-seekers) — page loads; uses "Ministry of Labour and Social Partnership Relations" throughout; confirms the origin of the outdated ministry name errors on the alpha page
- **Status:** verified (URL live) — but flags that the source itself is outdated
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

- **Guidance and Counseling link missing** — The Guidance and Counseling section mentions the service by name but provides no hyperlink to `https://labour.gov.bb/employment-services/`. Citizens have no direct navigation path to the actual service.

- **Education and Training link missing** — The Education and Training section (line 30) is a standalone sentence with no hyperlink to the relevant labour.gov.bb page. This is a dead end for the citizen.

- **BECCS contact details** — The One Stop Resource Centre page on labour.gov.bb now shows BECCS contact details: Warrens Office Complex, 1st Floor East; phone (246) 535-1535; Mon–Fri 8:15 am–4:30 pm. These are not on the alpha page but would benefit citizens visiting to use the service.

- **source_url page also uses old ministry name** — `gov.bb/Citizens/job-seekers` uses "Ministry of Labour and Social Partnership Relations" throughout. Both the source and the alpha page need to be updated.

---

## Sources cited

- [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/)
- [labour.gov.bb — Overseas Employment Programmes](https://labour.gov.bb/employment-services/overseas-employment-programmes/)
- [labour.gov.bb — Employment Services](https://labour.gov.bb/employment-services/)
- [labour.gov.bb — About Us](https://labour.gov.bb/about-us/)
- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)
- [gov.bb — Ministries listing](https://www.gov.bb/ministries)
- [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/ministries/public-service)
- [gov.bb — Citizens / job-seekers (declared source_url)](https://www.gov.bb/Citizens/job-seekers)
- [mps.gov.bb — People Resourcing homepage](https://mps.gov.bb/People_Resourcing/)
- [mps.gov.bb — Jobs (CAP 29 quote)](https://mps.gov.bb/People_Resourcing/jobs.php)
- [OAG — Consolidated Laws (Public Service Act Cap. 29)](https://oag.gov.bb/Laws/)
- [barbadosjobregister.gov.bb](https://www.barbadosjobregister.gov.bb/) — HTTP 403 during this check; operational status unconfirmed
- `src/data/ministries.ts` — canonical ministry names (lines 783, 919)
