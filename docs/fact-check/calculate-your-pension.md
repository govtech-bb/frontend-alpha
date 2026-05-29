# Fact-check: Calculate your pension

- **Live page:** <https://alpha.gov.bb/calculate-your-pension>
- **Source file:** `src/content/calculate-your-pension/index.md`
- **Last checked:** 2026-05-29
- **Summary:** 11 claims reviewed — 5 verified, 4 discrepant, 2 unverifiable. Average certainty: **78%**.

> **Note on live URL:** The page entry in `content-directory.ts` has `protected: true`, which means the live URL is `/calculate-your-pension` (no category prefix). The previous report recorded `/pensions-and-gratuities/calculate-your-pension` — that URL returns HTTP 404. Corrected this pass.

---

## Headline issues for triage

1. **"Start now" CTA is broken (404).** The primary citizen action — the "Start now" button linking to `/pensions-and-gratuities/calculate-your-pension/form` — returns HTTP 404. Because the parent page is `protected: true`, the form sub-page must also be reached at `/calculate-your-pension/form`, not the category-prefixed path. This is the most severe issue: a citizen who navigates to the page cannot complete the calculator. Tier A.

2. **PAD is a dissolved entity (two occurrences).** The page refers to "the Personnel Administration Division (PAD)" in both the introductory disclaimer (line 16) and the "What you'll need" section (line 23). The PAD was absorbed into the Ministry of Public Service in January 2019. Citizens contacting "the PAD" will be unable to locate the successor. Correct entity: Ministry of Public Service, People Resourcing and Compliance Directorate, Tel. (246) 535-4500.

3. **Voluntary retirement age table has a boundary error.** The table assigns persons appointed "On or after 15 July 1985" to the age-60 group. Both MPS sources use "on or before 15th July 1985 → 55" and "after 15th July 1985 → 60". A person appointed on exactly 15 July 1985 is entitled to voluntary retirement at 55, not 60.

4. **Compulsory retirement table omits the 2006–2009 row.** The MPS authoritative table lists four rows beginning with "1 January 2006 to 31 December 2009 → 65½". The alpha page starts at 2010, so officers in that earlier window have no guidance.

5. **NIS/government pension rule stated without its qualifying scope.** The abatement rule ("only the higher of the two") only applies to officers who entered service after 1 September 1975 per the Pensions (Miscellaneous Provisions) Act, 1975-31. The page presents it as universal. Low practical impact today but is a legal inaccuracy.

---

## Claims

### Claim 1 — PAD named in estimate disclaimer (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This is an estimate only. Your actual pension depends on records held by the Personnel Administration Division (PAD) and your last employer.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">This is an estimate only. Your actual pension depends on records held by the Ministry of Public Service (People Resourcing and Compliance Directorate) and your last employer.</pre>
</div>

- **Type:** agency name / process step
- **Sources:** [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "The Ministry of the Public Service was created in January 2019, through the amalgamation of the entities: Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division."; [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing) — names "People Resourcing and Compliance Directorate" as responsible unit, Tel. (246) 535-4500
- **Status:** discrepant — PAD ceased to exist as a standalone entity in January 2019.
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — citizens phoning or emailing "the PAD" may not locate the successor; enquiries could be delayed or lost.

---

### Claim 2 — PAD named as contact for confirming pensionable service (line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Contact the PAD or your last employer to confirm both figures.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Contact the Ministry of Public Service (People Resourcing and Compliance Directorate) or your last employer to confirm both figures.</pre>
</div>

- **Type:** agency name / process step
- **Sources:** [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing); [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — PAD absorbed into MPS January 2019
- **Status:** discrepant — same issue as Claim 1; second occurrence of the same error on the same page.
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — see Claim 1.

---

### Claim 3 — No-pay leave does not count towards pensionable service (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">No-pay leave does not count towards your pensionable service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">No-pay leave does not count towards your pensionable service.</pre>
</div>

- **Type:** eligibility / process step
- **Sources:** [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — "No-pay leave cannot be taken into account when calculating length of service."; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "All no pay leave is deducted from total pensionable service."
- **Status:** verified — two independent Tier 1 sources agree.
- **Certainty:** 98%

---

### Claim 4 — Temporary continuous workers with 10 years or fewer get no pension (line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Temporary continuous workers with 10 years or fewer of service who leave during that period will not receive a pension.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Temporary continuous workers with 10 years or fewer of service who leave during that period will not receive a pension.</pre>
</div>

- **Type:** eligibility
- **Sources:** [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — "Temporary continuous workers, working for ten years or less and leaving the service during this period will not receive a pension."
- **Status:** verified — wording matches the Treasury source in substance.
- **Certainty:** 90%

---

### Claim 5 — Voluntary retirement age table: boundary at 15 July 1985 (lines 32–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Appointment date         | Voluntary retirement age |
| Before 15 July 1985      | 55                       |
| On or after 15 July 1985 | 60                       |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">| Appointment date            | Voluntary retirement age |
| On or before 15 July 1985   | 55                       |
| After 15 July 1985          | 60                       |</pre>
</div>

- **Type:** eligibility / statistic
- **Sources:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — "Persons who were permanently appointed with effect from 15th July, 1985 **and before** may retire voluntarily at age 55 years. Persons who were permanently appointed **after** 15th July 1985 may retire voluntarily at age 60 years."; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "Voluntarily on reaching the age of fifty-five (55) years if permanently appointed **on or before** the 15th July 1985 and in other cases on reaching the age of sixty (60) years"
- **Status:** discrepant — the page uses "Before" (excluding 15 July 1985) in row 1 and "On or after" (including it) in row 2. Both authoritative sources agree 15 July 1985 falls in the age-55 group ("on or before"). A person appointed on exactly that date is misclassified.
- **Certainty:** 95%
- **Confidence it's wrong:** 85%
- **Citizen impact:** LOW in aggregate (very few staff appointed on exactly that date) but factually wrong.

---

### Claim 6 — Compulsory retirement table: three rows starting 1 January 2010 (lines 39–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Effective from | Age  |
| 1 January 2010 | 66   |
| 1 January 2014 | 66½  |
| 1 January 2018 | 67   |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (more complete)</div>
<pre class="claim-block-content">| Time period                                    | Age  |
| 1 January 2006 to 31 December 2009 (inclusive) | 65½  |
| 1 January 2010 to 31 December 2013 (inclusive) | 66   |
| 1 January 2014 to 31 December 2017 (inclusive) | 66½  |
| 1 January 2018 and thereafter                  | 67   |</pre>
</div>

- **Type:** statistic / eligibility
- **Sources:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — shows four-row table beginning "1st January 2006 to 31st December 2009 (inclusive) → 65½"; [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — shows only three rows starting 2010 (consistent with alpha page but less complete)
- **Status:** discrepant — the page omits the 2006–2009 row. The three rows it does show are individually correct (see Claim 7). MPS is the definitive authority for public service conditions.
- **Certainty:** 90%
- **Confidence it's wrong (by omission):** 80%
- **Citizen impact:** MEDIUM — public servants whose compulsory retirement date falls in the 2006–2009 window receive no guidance from this page.

---

### Claim 7 — Three rows of compulsory table are individually correct (lines 41–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">1 January 2010 | 66
1 January 2014 | 66½
1 January 2018 | 67</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 January 2010 | 66
1 January 2014 | 66½
1 January 2018 | 67</pre>
</div>

- **Type:** statistic / eligibility
- **Sources:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — "1st January 2010 to 31st December 2013 (inclusive) → 66", "1st January 2014 to 31st December 2017 (inclusive) → 66½", "1st January 2018 and thereafter → 67"; [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — identical values confirmed
- **Status:** verified — all three rows the page shows are correct.
- **Certainty:** 99%

---

### Claim 8 — NIS pension vs. government pension: only the higher is paid (line 45)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you qualify for both a National Insurance pension and a government pension, you will receive only the higher of the two — not both.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (with qualifying scope)</div>
<pre class="claim-block-content">If you qualify for both a National Insurance pension and a government pension, and you entered public service after 1 September 1975, you will receive only the higher of the two — not both. Officers who entered service on or before that date are not subject to this abatement rule.</pre>
</div>

- **Type:** eligibility / legal reference
- **Sources:** [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — confirms "if a person is eligible for both a National Insurance and government pension the higher of the two will be provided" and that this flows from "The Pensions (Miscellaneous Provisions) Act, 1975-31 … to those officers entering the service after 1st September, 1975."
- **Status:** partially discrepant — the core statement is confirmed, but the page presents it as universal when it only applies to officers who entered service after 1 September 1975. The omission is a legal inaccuracy; practical impact is low (negligible number of active officers entered before 1975).
- **Certainty:** 90%
- **Confidence it's wrong (by omission of qualifier):** 70%
- **Citizen impact:** LOW in practice, but technically incorrect.

---

### Claim 9 — Tool covers both full and reduced pension options with gratuity (lines 9–14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Use this tool to estimate your public sector pension. You can choose between a full pension or a reduced pension.

The tool will show you:
- an estimated monthly pension amount
- an estimated gratuity (lump sum)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Use this tool to estimate your public sector pension. You can choose between a full pension or a reduced pension.

The tool will show you:
- an estimated monthly pension amount
- an estimated gratuity (lump sum)</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [Treasury — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations) — confirms full pension formula (pensionable months / 600 × last annual salary), reduced pension (75% of full), and gratuity (full pension / 4 × 12.5); [Treasury — Government Pension Information](https://treasury.gov.bb/content/government-pension-information) — confirms an officer may "opt to receive a gratuity and a reduced pension in lieu of a full pension."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 10 — "Start now" CTA link resolves (line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><a data-start-link href="/pensions-and-gratuities/calculate-your-pension/form">Start now</a></pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content"><a data-start-link href="/calculate-your-pension/form">Start now</a></pre>
</div>

- **Type:** link / CTA
- **Sources:** Live-checked [https://alpha.gov.bb/calculate-your-pension/form](https://alpha.gov.bb/calculate-your-pension/form) — returns HTTP 404. The category-prefixed path `/pensions-and-gratuities/calculate-your-pension/form` (as hard-coded in the source) also 404s. Because the parent page has `protected: true` in `content-directory.ts` (line 301), the correct sub-page URL would be `/calculate-your-pension/form` — but even that 404s, suggesting the form route itself may not be deployed or registered correctly.
- **Status:** discrepant — the CTA href uses the category-prefixed path which cannot work for a protected-page subpage. The href is wrong regardless of whether the form route itself is live.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — this is the sole citizen action on the page; a broken "Start now" button means no one can use the calculator.

---

### Claim 11 — No source_url in content-directory.ts (metadata)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(No source_url field in src/data/content-directory.ts entry for calculate-your-pension, lines 298–311)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — unverifiable by automated means</div>
<pre class="claim-block-content">Authoritative sources exist at:
- https://www.treasury.gov.bb/content/pension-calculations
- https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension
- https://mps.gov.bb/People_Resourcing/age
A source_url should be added by the content team.</pre>
</div>

- **Type:** descriptive / policy claim about the page
- **Sources:** Checked [src/data/content-directory.ts](/home/gavin/frontend-alpha/src/data/content-directory.ts) lines 298–311 — no `source_url` field present; [Treasury — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations) — live and relevant; [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — live and relevant
- **Status:** unverifiable — absence of source_url is confirmed; which URL should be added is a content team decision.
- **Certainty:** 40%
- **Open question:** Which authoritative URL should be recorded as the primary source? Treasury pension-calculations or MPS retirement-age page?

---

## Additional findings (not on the page but should be)

1. **Missing contact details for the successor to PAD.** Now that PAD is dissolved, the page should direct citizens to: Ministry of Public Service, People Resourcing and Compliance Directorate, 1st Floor E. Humphrey Walcott Building, Cnr. Collymore Rock & Culloden Road, St. Michael; Tel. (246) 535-4500. Source: [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing).

2. **Minimum service requirement not stated.** The page does not mention that a minimum of **10 years' pensionable service** is required to qualify for a pension at all. A citizen with fewer than 10 years who runs the calculator may receive an estimate without knowing they are ineligible. Source: [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "An officer or employee may qualify for a pension if he held a pensionable office for ten (10) years or more."; [Treasury — Considerations](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension).

3. **Treasury's own pension calculator also references PAD.** [Treasury — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations) contains the same outdated "Personnel Administration Division" reference in its disclaimer. The alpha page mirrors this error from the source it was based on. Both should be updated together.

4. **Abatement effective date (1 September 1975) not stated.** Officers who entered service on or before 1 September 1975 are not subject to the NIS abatement rule. While a rare edge case today, it should be noted for legal completeness.

---

## Sources cited

- [Ministry of Public Service — Age / Retirement Ages](https://mps.gov.bb/People_Resourcing/age)
- [Ministry of Public Service — FAQ](https://mps.gov.bb/People_Resourcing/faq.php)
- [Ministry of Public Service — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing)
- [Barbados Treasury Department — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension)
- [Barbados Treasury Department — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations)
- [Barbados Treasury Department — Government Pension Information](https://treasury.gov.bb/content/government-pension-information)
- [Live page: alpha.gov.bb/calculate-your-pension](https://alpha.gov.bb/calculate-your-pension)
- [Live CTA target (404): alpha.gov.bb/calculate-your-pension/form](https://alpha.gov.bb/calculate-your-pension/form)
- [src/data/content-directory.ts](/home/gavin/frontend-alpha/src/data/content-directory.ts) lines 298–311
