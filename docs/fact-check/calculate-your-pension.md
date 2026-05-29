# Fact-check: Calculate your pension

- **Live page:** <https://alpha.gov.bb/pensions-and-gratuities/calculate-your-pension>
- **Source file:** `src/content/calculate-your-pension/index.md`
- **Last checked:** 2026-05-28
- **Summary:** 9 claims reviewed — 4 verified, 3 discrepant, 2 unverifiable. Average certainty: **77%**.

---

## Headline issues for triage

1. **Voluntary retirement age table has a boundary error.** The page puts persons appointed "on" 15 July 1985 in the age-60 group ("On or after 15 July 1985 → 60"). Every authoritative source — MPS, Treasury, the MPS FAQ — consistently states the threshold as "on or before 15th July 1985 → 55 years" and "after 15th July 1985 → 60 years". A person appointed exactly on 15 July 1985 qualifies for age-55 retirement, not age-60. The row labelling needs a one-word fix ("Before" → "On or before") to match the statute.

2. **Compulsory retirement age table is incomplete.** The alpha page shows three rows starting from 1 January 2010. The Ministry of Public Service's authoritative table at `mps.gov.bb/People_Resourcing/age` shows four rows, beginning with **1 January 2006 to 31 December 2009 → 65½**. Any public servant appointed in that window who has not yet retired may be misled by the truncated table. The Treasury Department's own "Considerations" page also begins at 2010, so the truncation is shared by another gov source — but the MPS page is the definitive authority.

3. **"PAD" is a dissolved entity.** The page tells citizens to contact "the Personnel Administration Division (PAD)" to confirm their pensionable service figures. The PAD was abolished in January 2019 when it was absorbed into the newly formed Ministry of Public Service (People Resourcing and Compliance Directorate). Directing citizens to a defunct body risks confusion and lost enquiries.

4. **NI pension vs. government pension claim omits a key qualifier.** The page states the rule ("you will receive only the higher of the two — not both") as if it applies universally. The governing legislation — the Pensions (Miscellaneous Provisions) Act, 1975-31 — only applies this abatement to officers who entered service **after 1 September 1975**. Officers who entered before that date are not subject to abatement. The omission may be low-stakes in practice (very few current retirees entered before 1975) but it is a legal inaccuracy.

5. **No source URL declared** in `content-directory.ts` for this page (`source_url` is absent from the entry). The Treasury Department's pension pages are the authoritative source and should be listed.

---

## Claims

### Claim 1 — PAD named as contact for pensionable service records (lines 23–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Contact the PAD or your last employer to confirm both figures.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Contact the Ministry of Public Service (People Resourcing and Compliance Directorate) or your last employer to confirm both figures.</pre>
</div>

- **Type:** agency name / process step
- **Sources:** [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing) — names "People Resourcing and Compliance Directorate" as the responsible unit; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — states the Ministry "was created in January 2019, through the amalgamation of the entities: Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division"; [gov.bb — Ministry of the Public Service and Talent Development](https://www.gov.bb/ministries/public-service)
- **Status:** discrepant — PAD ceased to exist as a standalone entity in January 2019.
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — citizens phoning or emailing "the PAD" may not be able to locate the successor contact; enquiries could be delayed or lost.

---

### Claim 2 — No-pay leave does not count towards pensionable service (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">No-pay leave does not count towards your pensionable service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">No-pay leave does not count towards your pensionable service.</pre>
</div>

- **Type:** eligibility / process step
- **Sources:** [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — "No-pay leave cannot be taken into account when calculating length of service."; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "All no pay leave is deducted from total pensionable service and would therefore reduce pension benefits."
- **Status:** verified — two independent Tier 1 sources agree.
- **Certainty:** 98%

---

### Claim 3 — Temporary continuous workers with 10 years or fewer who leave get no pension (lines 28–29)

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
- **Status:** verified — wording matches the Treasury source exactly in substance ("10 years or fewer" = "ten years or less").
- **Certainty:** 90%
- **Note:** The MPS FAQ mentions that "a person who is temporarily employed for not less than two (2) years and whose service has been terminated may be granted a lump sum payment as compensation" — this is a separate entitlement (a lump-sum gratuity on termination, not a pension). The page's claim about no pension is consistent with sources; the lump-sum option is simply not mentioned.

---

### Claim 4 — Voluntary retirement age table: "Before 15 July 1985 → 55" and "On or after 15 July 1985 → 60" (lines 32–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Appointment date        | Voluntary retirement age |
| Before 15 July 1985     | 55                       |
| On or after 15 July 1985| 60                       |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">| Appointment date           | Voluntary retirement age |
| On or before 15 July 1985  | 55                       |
| After 15 July 1985         | 60                       |</pre>
</div>

- **Type:** eligibility / statistic
- **Sources:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — "Persons who were permanently appointed with effect from 15th July, 1985 **and before** may retire voluntarily at age 55 years. Persons who were permanently appointed **after** 15th July 1985 may retire voluntarily at age 60 years."; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "Voluntarily on reaching the age of fifty-five (55) years if permanently appointed **on or before** the 15th July 1985 and in other cases on reaching the age of sixty (60) years"
- **Status:** discrepant — the page uses "Before" (excluding 15 July 1985) in the first row and "On or after" (including 15 July 1985) in the second row. Both authoritative sources agree the cut-off includes 15 July 1985 in the age-55 group ("on or before" / "with effect from … and before"). A person appointed on exactly 15 July 1985 is entitled to voluntary retirement at 55, not 60.
- **Certainty:** 95%
- **Confidence it's wrong:** 85%
- **Citizen impact:** LOW in aggregate (very few staff appointed on exactly that date), but factually wrong and sets a wrong precedent for the table boundary.

---

### Claim 5 — Compulsory retirement age table: three rows from 1 January 2010 (lines 38–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Effective from   | Age  |
| 1 January 2010   | 66   |
| 1 January 2014   | 66½  |
| 1 January 2018   | 67   |</pre>
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
- **Sources:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — shows a four-row table beginning with "1st January 2006 to 31st December 2009 (inclusive) → 65½"; [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — shows three rows beginning from 1 January 2010 (consistent with alpha page but less complete than MPS); [GIS — Ministry of Labour's Statement On Age Of Retirement](https://gisbarbados.gov.bb/blog/ministry-of-labours-statement-on-age-of-retirement/)
- **Status:** discrepant — the page omits the 2006–2009 row (65½). While the Treasury page also omits it, the MPS page — the definitive authority for public service conditions — includes it. Any officer whose compulsory retirement date falls in the 2006–2009 window is not served by the page's table.
- **Certainty:** 90% (MPS is the authoritative source for public service retirement ages)
- **Confidence it's wrong (by omission):** 80%
- **Citizen impact:** MEDIUM — public servants appointed in or around 2006 may miscalculate when they must retire. The missing row also undermines the table's historical completeness for officers assessing their position.

---

### Claim 6 — Three rows of the compulsory table are individually correct (lines 40–43)

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
- **Status:** verified — all three rows that the page does show are correct.
- **Certainty:** 99%

---

### Claim 7 — NIS pension vs. government pension: only the higher is paid (line 45)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you qualify for both a National Insurance pension and a government pension, you will receive only the higher of the two — not both.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (with qualifying scope)</div>
<pre class="claim-block-content">If you qualify for both a National Insurance pension and a government pension, and you entered public service after 1 September 1975, you will receive only the higher of the two — not both. Officers who entered service before that date are not subject to this abatement rule.</pre>
</div>

- **Type:** eligibility / legal reference
- **Sources:** [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension) — "if a person is eligible for both a National Insurance and government pension the higher of the two will be provided"; same page specifies this flows from "The Pensions (Miscellaneous Provisions) Act, 1975-31 provides for the abatement of pension payable under Caps 25, 30, 56 by the amount of pension payable in accordance with the National Insurance and Social Security Act, Cap 47, to those officers entering the service after 1st September, 1975."
- **Status:** partially discrepant — the core statement ("higher of the two") is correct and matches the Treasury source. However, the page presents it as a universal rule when it only applies to officers who entered service after 1 September 1975. The omission of this qualifier is a legal inaccuracy, though in practice the vast majority of current retirees entered service after 1975.
- **Certainty:** 90% (the rule as stated is confirmed; the scope qualifier is supported by both Treasury and the Act)
- **Confidence it's wrong (by omission of qualifier):** 70%
- **Citizen impact:** LOW in practice (negligible number of active officers entered before 1 September 1975), but technically incorrect.

---

### Claim 8 — "Estimate your public sector pension and gratuity (lump sum)" — page covers both full and reduced pension options (lines 9–16)

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
- **Sources:** [Treasury — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations) — confirms the two options: full pension (formula: pensionable months / 600 × last annual salary) and reduced pension (75% of full pension), plus gratuity (full pension / 4 × 12.5); [Treasury — Government Pension Information](https://treasury.gov.bb/content/government-pension-information) — confirms an officer may "opt to receive a gratuity and a reduced pension in lieu of a full pension."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 9 — "Actual pension depends on records held by the Personnel Administration Division (PAD) and your last employer" (lines 15–17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This is an estimate only. Your actual pension depends on records held by the Personnel Administration Division (PAD) and your last employer.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">This is an estimate only. Your actual pension depends on records held by the Ministry of Public Service (People Resourcing and Compliance Directorate) and your last employer.</pre>
</div>

- **Type:** agency name / process step
- **Sources:** [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing) — "People Resourcing and Compliance Directorate prepares a paper on the retiring benefits as calculated and verified by the Accountant General and Auditor General"; address given as "1st Floor E. Humphrey Walcott Building, Cnr. Collymore Rock & Culloden Road, St. Michael. Tel. (246) 535-4500"; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — confirms PAD was merged into MPS in January 2019
- **Status:** discrepant (same issue as Claim 1 — PAD is dissolved). This is the second occurrence on the page; both should be fixed together.
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — see Claim 1.

---

## Additional findings (not on the page but should be)

1. **Missing contact details for the successor to PAD.** Now that PAD is dissolved, the page should direct citizens to: Ministry of Public Service, People Resourcing and Compliance Directorate, 1st Floor E. Humphrey Walcott Building, Cnr. Collymore Rock & Culloden Road, St. Michael; Tel. (246) 535-4500. Source: [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing).

2. **Missing source_url in content-directory.ts.** The `calculate-your-pension` entry in `src/data/content-directory.ts` (lines 298–312) has no `source_url` field. The authoritative government source is the Treasury Department's pension suite: [Treasury — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations) and [Treasury — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension). The MPS page at [mps.gov.bb/People_Resourcing/age](https://mps.gov.bb/People_Resourcing/age) is the definitive authority for retirement ages.

3. **Minimum service requirement not stated.** The page does not mention that a minimum of **10 years' pensionable service** is required to qualify for a pension at all. A citizen who has fewer than 10 years and runs the calculator may receive an estimate without knowing they are ineligible. Source: [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php); [Treasury — Considerations](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension).

4. **Abatement effective date (1 September 1975) not stated.** Officers who entered service on or before 1 September 1975 are not subject to the NIS abatement rule. While a rare edge case today, it should be noted for legal completeness.

---

## Sources cited

- [Ministry of Public Service — Age / Compulsory Retirement Ages](https://mps.gov.bb/People_Resourcing/age)
- [Ministry of Public Service — FAQ](https://mps.gov.bb/People_Resourcing/faq.php)
- [Ministry of Public Service — Retiring Benefits](https://mps.gov.bb/People_Resourcing/benefits)
- [Ministry of Public Service — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing)
- [Barbados Treasury Department — Considerations When Calculating Your Pension](https://www.treasury.gov.bb/content/considerations-when-calculating-your-pension)
- [Barbados Treasury Department — Pension Calculations](https://www.treasury.gov.bb/content/pension-calculations)
- [Barbados Treasury Department — Government Pension Information](https://treasury.gov.bb/content/government-pension-information)
- [NIS — Old-Age Contributory Pension](https://www.nis.gov.bb/old-age-contributory-pension/)
- [NIS — Payment of Public Sector Pensions by NISSS](https://www.nis.gov.bb/payment-of-public-sector-pensions-by-the-national-insurance-and-social-security-service/)
- [GIS — Ministry of Labour's Statement On Age Of Retirement](https://gisbarbados.gov.bb/blog/ministry-of-labours-statement-on-age-of-retirement/)
- [Pensions Act CAP 25 PDF (hosted by Treasury)](https://treasury.gov.bb/sites/default/downloads/Legislation/Pension%20Legislation/PensionsAct_Cap25C.pdf)
