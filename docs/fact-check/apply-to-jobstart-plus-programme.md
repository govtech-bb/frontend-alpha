# Fact-check: Apply to JobStart Plus Programme

- **Live page:** <https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme>
- **Source files:** `src/content/apply-to-jobstart-plus-programme/index.md`, `src/content/apply-to-jobstart-plus-programme/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 17 claims reviewed — 8 verified, 4 discrepant, 5 unverifiable. Average certainty: 69%.

---

## Headline issues for triage

1. **Primary form CTA renders "Loading form..." — the application form may be broken for citizens.** The `/work-employment/apply-to-jobstart-plus-programme/form` page (linked from both the index and start pages) renders "Loading form..." with no actual form content. If this is a persistent rendering failure, citizens cannot complete the online application. Tier A.

2. **Ministry address contains "Warrens Close" — a street name that does not exist in any official source.** All authoritative sources (gov.bb, labour.gov.bb, `src/data/ministries.ts`) use "Warrens" (the district/locality), not "Warrens Close". Additionally "3rd Floor West" should be "3rd Floor West Wing" per gov.bb and ministries.ts. Citizens submitting paper forms to this address risk mail going astray or being unable to locate the office.

3. **"Registration is open throughout the year" contradicts the official programme page.** The labour.gov.bb/jobstartplus/ page shows cohort-specific registration deadlines (e.g. "deadline Friday 11 April 2025 for May 2025 cohort"). Describing registration as year-round could cause citizens to miss the active cohort window and wait months for the next one.

4. **Training duration conflict: alpha.gov.bb says "3 weeks", labour.gov.bb still says "two-week".** The March 2026 Barbados Today article quotes programme manager Erika Watson confirming expansion to 3 weeks, so alpha.gov.bb is likely more current — but the two official sources remain in conflict and need reconciliation.

5. **Two typographical errors in the source file.** "suitablity" (index.md line 65) and "trainingg" (index.md line 68) are published to the live page and erode trust in the service.

---

## Claims

### Claim 1 — Programme description and external URL (index.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Job Start Plus is a training programme for young people aimed at preparing
them for the workplace. It offers career guidance and tailored training to
develop relevant skills and build confidence. There's also the opportunity
to be placed in a place of work.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Job Start Plus is a training programme for young people aimed at preparing
them for the workplace. It offers career guidance and tailored training to
develop relevant skills and build confidence. There's also the opportunity
to be placed in a place of work.</pre>
</div>

- **Type:** descriptive, URL
- **Sources:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — "The Job Start Plus Programme delivers tailored training, career guidance, and direct placement opportunities. It empowers participants to develop the skills and confidence needed to succeed in today's competitive job market." Link live as of 2026-05-29.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — Eligibility: age 16 to 24 (index.md line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You are 16 to 24 years old (or between 16 and 34 if you are a person with a disability).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You are 16 to 24 years old (or between 16 and 34 if you are a person with a disability).</pre>
</div>

- **Type:** eligibility
- **Sources:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — "Young persons ages 16 to 24 years and Persons with Disabilities of ages 16 to 34 years"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 3 — Eligibility: not currently employed or enrolled (index.md line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You are not currently employed or enrolled in a training institution.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You are not currently employed or enrolled in a training institution.</pre>
</div>

- **Type:** eligibility
- **Sources:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — "NOT CURRENTLY EMPLOYED OR ENROLLED in a training institution"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 4 — Training duration: 3 weeks (index.md line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">'World of Work' training workshops are held in person over 3 weeks at a central location.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct per most recent source — but official page not yet updated</div>
<pre class="claim-block-content">'World of Work' training workshops are held in person over 3 weeks at a central location.

Note: labour.gov.bb/jobstartplus/ (last updated April 2025) still reads "two-week World of
Work Training Workshops". The March 2026 Barbados Today article quotes programme manager
Erika Watson: "It used to be two weeks, but it's three weeks of training where they cover
core skills." Alpha.gov.bb reflects the expanded duration correctly.</pre>
</div>

- **Type:** process step, statistic
- **Sources:** [Barbados Today — Funding cut, limited placements hamper Job Start Plus (10 March 2026)](https://barbadostoday.bb/2026/03/10/funding-cut-limited-placements-hamper-job-start-plus-officials/) — programme manager Watson confirms 3-week expansion; [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — still says "two-week" (April 2025 snapshot, not updated)
- **Status:** verified per most current authoritative source (2026 programme manager statement), but the official programme page has not been updated — flag for reconciliation.
- **Certainty:** 80%
- **Citizen impact:** LOW — alpha.gov.bb currently has the more accurate figure, but the discrepancy between the two pages is a governance concern.

---

### Claim 5 — Training location: "at a central location" (index.md line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">training workshops are held in person over 3 weeks at a central location</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not corroborated</div>
<pre class="claim-block-content">No authoritative source specifies that workshops are held at "a central location" as a
general rule. Cohort-specific venues are not publicly listed on labour.gov.bb or GIS.</pre>
</div>

- **Type:** process step
- **Sources consulted:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/); [GIS — Youth Urged To Sign Up](https://gisbarbados.gov.bb/blog/youth-urged-to-sign-up-for-training-under-job-start-plus-programme/) (HTTP 403 on direct fetch); [Barbados Today — Funding cut (Mar 2026)](https://barbadostoday.bb/2026/03/10/funding-cut-limited-placements-hamper-job-start-plus-officials/) — none specify "a central location" as a standing rule.
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Confirm with the Ministry whether workshops are held at a fixed central location or at rotating/participant-dependent venues.

---

### Claim 6 — Training hours: 8:45am to 4:30pm, 5 days a week (index.md line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">job starters should be available between 8.45am and 4.30pm for 5 days a week</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not corroborated by any source found</div>
<pre class="claim-block-content">No authoritative source (labour.gov.bb, GIS, news outlets) specifies these exact hours
or the 5-day weekly schedule. No source consulted in this pass changes this finding.</pre>
</div>

- **Type:** hours
- **Sources consulted:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — no schedule details; [Barbados Today — Funding cut (Mar 2026)](https://barbadostoday.bb/2026/03/10/funding-cut-limited-placements-hamper-job-start-plus-officials/) — no schedule details; [Nation News — Training for jobless youth (Aug 2024)](https://nationnews.com/2024/08/18/training-for-jobless-youth/) — no schedule details.
- **Status:** unverifiable
- **Certainty:** 30%
- **Citizen impact:** MEDIUM — a citizen attending on the wrong schedule could miss sessions or make unnecessary childcare/transport arrangements.
- **Open question:** Confirm exact daily schedule (start time, end time, days per week) with the Ministry for the current cohort format.

---

### Claim 7 — Curriculum topics (index.md lines 24–32)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">- resume writing
- job search strategies
- interview techniques
- effective communication
- teamwork
- conflict resolution
- anger management
- time management
- work ethics</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">- resume writing
- job search strategies
- interview techniques
- effective communication
- teamwork
- conflict resolution
- anger management
- time management
- work ethics</pre>
</div>

- **Type:** process step / descriptive
- **Sources:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — lists: "Effective Communication; Teamwork; Conflict Resolution; Anger Management; Time Management; Work Ethics; Resume Writing; Effective Job Search Strategies and Interview Techniques." All nine topics match (using slightly simplified labels).
- **Status:** verified
- **Certainty:** 95%
- **Note:** The March 2026 Barbados Today article mentions additional components now incorporated (psychosocial topics, National Transformation Initiative citizen education, financial literacy, customer service excellence). These are absent from the alpha.gov.bb page but the omission is not a factual error — the page may be intentionally concise.

---

### Claim 8 — Stipend to cover lunch and travel expenses (index.md line 34)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Job starters are given a stipend to cover lunch and travel expenses.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — stipend confirmed; "lunch and travel" not explicitly corroborated</div>
<pre class="claim-block-content">A stipend is confirmed by the March 2026 Barbados Today article (programme manager Watson:
"a stipend is paid to assist with the expenses of the company for the three weeks of
training"). The precise purpose (lunch and travel) is not stated in any authoritative source.
The general stipend amount is also unpublished publicly.</pre>
</div>

- **Type:** fee / process step
- **Sources consulted:** [Barbados Today — Funding cut (Mar 2026)](https://barbadostoday.bb/2026/03/10/funding-cut-limited-placements-hamper-job-start-plus-officials/) — confirms stipend exists; [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — does not mention stipend.
- **Status:** unverifiable in its specifics (existence verified; "lunch and travel" framing not confirmed)
- **Certainty:** 55%
- **Open question:** Confirm with the Ministry (a) that the stipend specifically covers lunch and travel, and (b) the current stipend amount for the general (non-disability) cohort.

---

### Claim 9 — "Registration is open throughout the year" (index.md line 38)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Registration is open throughout the year.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Registration opens for each cohort at set times during the year. Check
labour.gov.bb/jobstartplus/ for the current registration deadline.</pre>
</div>

- **Type:** process step / hours
- **Sources:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — "The deadline for registration is Friday April 11, 2025 and all forms must be completed in full, in order to be considered for entry into the programme." This is a specific cut-off date, inconsistent with year-round rolling intake; [Nation News — Training for jobless youth (Aug 2024)](https://nationnews.com/2024/08/18/training-for-jobless-youth/) — notes an "August 28" registration deadline for the 2024 cohort, confirming cohort-based intake.
- **Status:** discrepant — the official programme runs cohort by cohort with hard registration deadlines. "Open throughout the year" is misleading.
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — a citizen told registration is "open throughout the year" may defer applying and miss the active cohort window, waiting months for the next one.

---

### Claim 10 — Ministry address (index.md lines 54–58)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Labour, Social Security and Third Sector,
3rd Floor West,
Warrens Office Complex,
Warrens Close,
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Ministry of Labour, Social Security and Third Sector
3rd Floor West Wing
Warrens Office Complex
Warrens
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — "3rd Floor West Wing, Warrens Office Complex, Warrens, St. Michael, Barbados, W.I."; [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/) — "Ministry of Labour, Social Security and Third Sector, Warrens Office Complex, Warrens, St. Michael, Barbados" (no "Warrens Close"); `src/data/ministries.ts` lines 818–824 — `["3rd Floor West Wing", "Warrens Office Complex", "Warrens", "St. Michael", "Barbados, W.I."]` — canonical data confirms "West Wing", no "Warrens Close".
- **Status:** discrepant — two errors: (1) "West" should be "West Wing"; (2) "Warrens Close" does not appear in any official source — correct locality is simply "Warrens".
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a citizen attempting to submit a paper form to an address with a non-existent street qualifier ("Warrens Close") may have mail returned or be unable to locate the correct office floor.

---

### Claim 11 — Ministry name (index.md lines 50, 70)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Labour, Social Security and Third Sector</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Labour, Social Security and Third Sector</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministries](https://www.gov.bb/Ministries/labour-social-security) — "Ministry of Labour, Social Security and Third Sector"; `src/data/ministries.ts` line 783 — `name: "Ministry of Labour, Social Security and Third Sector"`; [labour.gov.bb homepage](https://labour.gov.bb/) — consistent naming.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 12 — Post-registration assessment process (index.md lines 62–66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Once your registration has been processed, you will be invited to an assessment. Organisers will evaluate:

- your readiness to work
- your suitablity for the programme
- any additional support you need</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — plausible but not corroborated</div>
<pre class="claim-block-content">No authoritative source describes a post-registration assessment stage. The official
labour.gov.bb programme page moves from registration directly to the training schedule.
The assessment process described is plausible given the programme's guidance and counselling
component, but requires agency confirmation.

Note also: "suitablity" is a typo — should be "suitability".</pre>
</div>

- **Type:** process step
- **Sources consulted:** [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/); [labour.gov.bb — Guidance and Counselling](https://labour.gov.bb/employment-services/guidance-and-counselling/); [Barbados Today — Funding cut (Mar 2026)](https://barbadostoday.bb/2026/03/10/funding-cut-limited-placements-hamper-job-start-plus-officials/) — none describe this specific three-item assessment process.
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Confirm with the Ministry whether a formal assessment stage exists between registration and the World of Work training, and what the evaluation criteria are.

---

### Claim 13 — Typo: "suitablity" (index.md line 65)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">your suitablity for the programme</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">your suitability for the programme</pre>
</div>

- **Type:** descriptive (spelling error)
- **Sources:** Standard English spelling.
- **Status:** discrepant
- **Confidence it's wrong:** 100%
- **Citizen impact:** LOW — cosmetic, but affects trust in the page's quality.

---

### Claim 14 — Typo: "trainingg" (index.md line 68)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will then receive the schedule for the World of Work trainingg and what you will need to bring.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">You will then receive the schedule for the World of Work training and what you will need to bring.</pre>
</div>

- **Type:** descriptive (spelling error)
- **Sources:** Standard English spelling.
- **Status:** discrepant
- **Confidence it's wrong:** 100%
- **Citizen impact:** LOW — cosmetic, but affects trust in the page's quality.

---

### Claim 15 — start.md: cannot save and return (start.md line 7)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You should complete your registration in one go. At the moment, it is not possible to save your answers and come back to them later.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable against the form only</div>
<pre class="claim-block-content">This is a claim about form behaviour. It can only be confirmed by attempting to use the
form at /work-employment/apply-to-jobstart-plus-programme/form — which currently renders
"Loading form..." and may be broken (see Claim 16). Cannot be independently verified from
external sources.</pre>
</div>

- **Type:** process step (negative statement — "it is not possible to")
- **Sources consulted:** Testable against the form at [alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/form](https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/form) — form not loading as of 2026-05-29.
- **Status:** unverifiable (form not accessible for testing)
- **Certainty:** 50%

---

### Claim 16 — start.md: form completion estimate "not more than 20 minutes" (start.md line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It should not take more than 20 minutes</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable against the form only — form currently not loading</div>
<pre class="claim-block-content">This usability claim can only be verified by completing the form. The form page
(/work-employment/apply-to-jobstart-plus-programme/form) currently renders "Loading form..."
with no form content visible. If the form is broken, this claim is irrelevant until fixed.</pre>
</div>

- **Type:** hours (form completion estimate)
- **Sources consulted:** Testable against the form at [alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/form](https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/form) — "Loading form..." displayed, no form accessible as of 2026-05-29.
- **Status:** unverifiable
- **Certainty:** 50%
- **Citizen impact:** HIGH (if form is genuinely broken) — citizens cannot complete online registration.
- **Open question:** Investigate why the form page renders "Loading form..." and whether the online application is functional.

---

### Claim 17 — CTA link: "Register now" → /work-employment/apply-to-jobstart-plus-programme/start (index.md line 48)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><a data-start-link href="/work-employment/apply-to-jobstart-plus-programme/start">Register now</a></pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content"><a data-start-link href="/work-employment/apply-to-jobstart-plus-programme/start">Register now</a>

The /start page loads correctly and shows the pre-application introduction.</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — /work-employment/apply-to-jobstart-plus-programme/start](https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/start) — page loads and displays correct content (last updated January 13th, 2026).
- **Status:** verified
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

- **Form CTA broken:** The "Start now" link on the start.md page leads to `/work-employment/apply-to-jobstart-plus-programme/form`, which rendered "Loading form..." during this check (2026-05-29). This is a high-priority technical issue that needs investigation — if the online form is down, citizens cannot apply online at all.

- **`src/data/ministries.ts` internal link is incorrect:** The `onlineServices` entry for this page (line 801–804) uses `href: "/apply-to-jobstart-plus-programme"` (no category prefix). Since the page is not `protected: true`, the correct href is `/work-employment/apply-to-jobstart-plus-programme`. A citizen clicking through from a ministry-based navigation would reach a 404 page.

- **Contact email** — `jobstartplus@labour.gov.bb` is published on the official programme page and is the direct programme contact. It is absent from the alpha.gov.bb page and would be useful to citizens with questions.

- **Ministry phone number** — `(246) 535-1400` (Planning and Administration) is published on labour.gov.bb and in `src/data/ministries.ts`. It does not appear on the alpha.gov.bb page.

- **Placement duration** — The official programme page specifies that work placements run for "a minimum of three months and a maximum of one year's work experience." The alpha.gov.bb page says only "the opportunity to be placed in a place of work" with no duration guidance. Adding this would help citizens set expectations.

---

## Sources cited

- [labour.gov.bb — Job Start Plus 2025](https://labour.gov.bb/jobstartplus/)
- [labour.gov.bb — Homepage / Contact](https://labour.gov.bb/)
- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)
- [GIS — Youth Urged To Sign Up For Training Under Job Start Plus Programme](https://gisbarbados.gov.bb/blog/youth-urged-to-sign-up-for-training-under-job-start-plus-programme/) (HTTP 403 on direct fetch — URL confirmed from search index)
- [Barbados Today — Funding cut, limited placements hamper Job Start Plus (10 March 2026)](https://barbadostoday.bb/2026/03/10/funding-cut-limited-placements-hamper-job-start-plus-officials/)
- [Nation News — Training for jobless youth (18 August 2024)](https://nationnews.com/2024/08/18/training-for-jobless-youth/)
- [alpha.gov.bb — Apply to Job Start Plus Programme (live page)](https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme)
- [alpha.gov.bb — Job Start Plus start page](https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/start)
- [alpha.gov.bb — Job Start Plus form page](https://alpha.gov.bb/work-employment/apply-to-jobstart-plus-programme/form) (rendered "Loading form..." — possible breakage)
- `src/data/ministries.ts` — canonical ministry name and address (lines 783–832)
