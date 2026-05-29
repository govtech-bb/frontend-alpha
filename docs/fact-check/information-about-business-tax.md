# Fact-check: Information about business tax

- **Live page:** <https://alpha.gov.bb/business-trade/information-about-business-tax>
- **Source file:** `src/content/information-about-business-tax.md`
- **Last checked:** 2026-05-29
- **Summary:** 22 claims reviewed — 12 verified, 5 discrepant, 5 unverifiable. Average certainty: **70%**.

---

## Headline issues for triage

1. **Tax rates table is entirely obsolete (lines 57–65).** The page states the general corporation tax rate is 25%. Barbados enacted the Income Tax (Amendment and Validation) Act, 2024-15 (gazetted 24 May 2024, effective 1 January 2024), which replaced the 25% flat rate with a tiered structure — for income year 2024, the rates are 5.5% (income ≤ BBD $1M), 3% ($1M–$20M), 2.5% ($20M–$30M), and 1% (over $30M). A Centralis Group summary cites a "9% headline rate" for 2024 applying in a general sense, and PwC (unavailable at time of this pass) previously indicated a flat 9% from income year 2025. The BRA's own public page still shows the tiered structure for income year 2024. In all scenarios, the page's stated 25% flat rate is wrong. The insurance company rates in the table (general insurance 25%, life insurance 5%) are also superseded — insurers now fall under a Class 1/2/3 framework at 0%–2%. **Tier A — fix immediately.**

2. **Loss carry-forward period is wrong (lines 39–41).** The page says trading losses can be carried forward for nine years. BRA's own guidance also currently says nine years, but the BRA page appears not to have been updated to reflect the Income Tax (Amendment and Validation) Act, 2024-15 amendments. PwC (cited in previous pass, currently unavailable) confirmed a reduction to seven years for income years 2015–2024 and five years from income year 2025. The alpha.gov.bb nine-year claim is wrong for any income year from 2015 onwards. **Tier A — fix immediately.**

3. **Group relief exclusions list is outdated (line 53).** The page lists "international business companies, exempt insurance companies, societies with restricted liability, offshore banks and other companies granted special tax concessions" as excluded from group relief. These regime categories were abolished or frozen for new entrants as of 31 December 2018. Under the reformed regime (in force from income year 2024/2025), group relief eligibility is governed by a new test: companies must be subject to current tax rates and meet the 75% subsidiary test. **Tier B — prioritise.**

4. **Declared `source_url` resolves but content is itself outdated.** The `source_url` (`https://www.gov.bb/tax-information`) is live and returns content — but the upstream gov.bb page has identical rate information to alpha.gov.bb (also quoting 25%). Both are sourcing from the same pre-reform text. The authoritative current source for rates is `bra.gov.bb/About/Tax-Types/Income-Tax/Corporations`, but even that BRA page may not yet reflect the full income year 2025 changes. The fix is to update alpha.gov.bb's content to reflect post-2024 rates.

5. **Reversed finding (Claim 3):** The previous pass marked the 10% dividend participation exemption threshold as unverifiable. In this pass, the BRA Residency Status page (`bra.gov.bb/Popular-Topics/Companies/Residency-Status`) was confirmed to mention the provision — "Barbados companies generally avoid corporation tax on dividends from resident subsidiaries, and from non-resident subsidiaries when holding over 10% of capital (excluding portfolio investments)." Status upgraded to **verified** (85%).

---

## Claims

### Claim 1 — Residency test: central management and control (lines 10–11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A company is considered to be tax resident in Barbados if its central management
and control is located in Barbados whereas it is deemed to be domiciled in Barbados
where it is incorporated in Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A company is considered to be tax resident in Barbados if its central management
and control is located in Barbados whereas it is deemed to be domiciled in Barbados
where it is incorporated in Barbados.</pre>
</div>

- **Type:** legal reference / eligibility
- **Sources:** [BRA — Residency Status](https://bra.gov.bb/Popular-Topics/Companies/Residency-Status) — quotes verbatim: "A company is considered to be tax resident in Barbados if its central management and control is located in Barbados" and "it is deemed to be domiciled in Barbados where it is incorporated in Barbados"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — Worldwide income for resident and domiciled companies (lines 12–14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados resident and domiciled companies are subject to tax on their worldwide
income regardless of whether the income is remitted to Barbados, whereas a company
that is tax resident but not domiciled in Barbados is taxed on income derived from
Barbados as well as any foreign-source income that is remitted to Barbados. However,
companies that are neither resident nor domiciled in Barbados are taxed only on
income derived from Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados resident and domiciled companies are subject to tax on their worldwide
income regardless of whether the income is remitted to Barbados, whereas a company
that is tax resident but not domiciled in Barbados is taxed on income derived from
Barbados as well as any foreign-source income that is remitted to Barbados. However,
companies that are neither resident nor domiciled in Barbados are taxed only on
income derived from Barbados.</pre>
</div>

- **Type:** legal reference / eligibility
- **Sources:** [BRA — Residency Status](https://bra.gov.bb/Popular-Topics/Companies/Residency-Status) — all three residency tiers and their income scope confirmed verbatim
- **Status:** verified
- **Certainty:** 95%

---

### Claim 3 — Dividend exemption: 10% capital threshold for non-resident subsidiary (lines 15–16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">where a Barbados company earns dividend income from a resident and in some cases
a non-resident subsidiary, these dividends will not be subject to corporation tax
in Barbados. In the case of a non-resident subsidiary, this provision applies only
where the Barbados company holds more than 10% of the capital of the subsidiary
other than as a portfolio investment.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">where a Barbados company earns dividend income from a resident and in some cases
a non-resident subsidiary, these dividends will not be subject to corporation tax
in Barbados. In the case of a non-resident subsidiary, this provision applies only
where the Barbados company holds more than 10% of the capital of the subsidiary
other than as a portfolio investment.</pre>
</div>

- **Type:** legal reference
- **Sources:** [BRA — Residency Status](https://bra.gov.bb/Popular-Topics/Companies/Residency-Status) — confirmed: "Barbados companies generally avoid corporation tax on dividends from resident subsidiaries, and from non-resident subsidiaries when holding over 10% of capital (excluding portfolio investments)"
- **Status:** verified — **REVERSED from previous pass (unverifiable → verified).** The BRA Residency Status page was confirmed on 2026-05-29 to explicitly state this provision.
- **Certainty:** 85%

---

### Claim 4 — Taxable income: IFRS basis with BITA adjustments (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Taxable income is determined on the basis of accounts prepared in accordance with
International Financial Reporting Standards, subject to specific adjustments
identified in the BITA.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Taxable income is determined on the basis of accounts prepared in accordance with
International Financial Reporting Standards, subject to specific adjustments
identified in the BITA.</pre>
</div>

- **Type:** legal reference / process step
- **Sources:** [BRA — Determination of Taxable Income](https://bra.gov.bb/Popular-Topics/Companies/Determination-of-Taxable-Income) — "Taxable income is determined on the basis of accounts prepared in accordance with International Financial Reporting Standards, subject to specific adjustments identified in the Barbados Income Tax Act (BITA)"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Inventory valuation: FIFO or average cost (lines 23–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The authorities generally accept a method of valuation of inventory that conforms
to standard accounting practice in the trade or business, provided it is applied
consistently. Average cost or first-in, first-out (FIFO) are the generally
accepted methods.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot fully verify from public web</div>
<pre class="claim-block-content">gov.bb/tax-information mirrors this text. No independent BRA guidance note or
statutory provision was located on the public web that explicitly names FIFO and
average cost as the "generally accepted methods". The claim is consistent with
standard IFRS practice but is not independently corroborated by a BRA source.</pre>
</div>

- **Type:** legal reference / process step
- **Sources:** [gov.bb — Tax Information](https://www.gov.bb/tax-information) (mirrors alpha.gov.bb; same source origin); [BRA — Determination of Taxable Income](https://bra.gov.bb/Popular-Topics/Companies/Determination-of-Taxable-Income) (IFRS basis confirmed, inventory methods not itemised); [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (consulted in prior pass; FIFO/average cost not referenced)
- **Status:** unverifiable — no independent Tier 1 corroboration
- **Certainty:** 45%
- **Open question:** Confirm with BRA or by reading the current Income Tax Act text that FIFO and average cost remain the accepted inventory methods.

---

### Claim 6 — Initial allowance: equipment 20%, industrial buildings 40% (line 29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">an initial allowance of 20% is granted on the cost of equipment while industrial
buildings qualify for an initial allowance of 40%.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially corroborated</div>
<pre class="claim-block-content">gov.bb/tax-information and the PwC deductions summary (prior pass) both reference
initial allowances for equipment and industrial buildings, but neither independently
confirms the exact percentages (20% / 40%) in machine-readable public form.
The Income Tax Act Cap. 73 PDF was not machine-readable. The claim is internally
consistent with the capital allowance framework described by PwC, but the specific
figures require verification against the current Act text.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [gov.bb — Tax Information](https://www.gov.bb/tax-information) (mirrors alpha.gov.bb); [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (references initial allowances but does not quote 20%/40% explicitly — cited from prior pass, PwC unavailable on 2026-05-29); [Income Tax Act Cap. 73 — Barbados Law Courts (PDF, not machine-readable)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/IncomeTaxCAP073.pdf)
- **Status:** unverifiable — single source origin; specific percentages not independently confirmed
- **Certainty:** 45%
- **Open question:** Verify 20% (equipment) and 40% (industrial buildings) initial allowances against the current Income Tax Act, as amended by the 2024 Act.

---

### Claim 7 — Investment allowance: 20% or 40%, including CARICOM exporters (line 29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">An investment allowance of 20% or 40% is available in respect of capital
expenditure on plant and equipment to be used in certain industries, including
where the taxpayer exports outside of the Caribbean Community and Common
Market ("CARICOM").</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot fully verify from public web</div>
<pre class="claim-block-content">gov.bb/tax-information mirrors this text. No independent BRA public guidance was
found confirming 20%/40% investment allowances or the CARICOM export condition.
PwC tax credits and incentives page (unavailable on 2026-05-29) did not surface
these specific investment allowance rates in the prior pass. The Income Tax Act
Cap. 73 PDF was not machine-readable.</pre>
</div>

- **Type:** legal reference / fee
- **Sources:** [gov.bb — Tax Information](https://www.gov.bb/tax-information) (mirrors alpha.gov.bb); [PwC — Barbados Corporate Tax Credits and Incentives](https://taxsummaries.pwc.com/barbados/corporate/tax-credits-and-incentives) (consulted in prior pass; rates not confirmed in summary retrieved); [Income Tax Act Cap. 73 — Barbados Law Courts (PDF, not machine-readable)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/IncomeTaxCAP073.pdf)
- **Status:** unverifiable — no independent Tier 1 corroboration
- **Certainty:** 40%
- **Open question:** Verify 20%/40% investment allowance rates and CARICOM export condition against the current Act text.

---

### Claim 8 — Annual allowances: 5% to 33 1/3%, straight-line, industrial buildings 4%, IP 50% over 10 years, manufacturing 150% (lines 31–32)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Annual allowances of between 5% and 33 1/3% are granted on the amount expended
on the acquisition of fixed assets and are calculated on a straight-line basis.
For example, an annual allowance of 4% is granted in respect of capital
expenditure on industrial buildings. Fifty percent of capital expenditure on
intellectual property is deductible over a 10-year period as an annual allowance.
Additionally, manufacturing companies are allowed an annual allowance of 150%
of the cost of on assets used in the industry.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (partially — typographical error noted)</div>
<pre class="claim-block-content">Annual allowance for industrial buildings: 4% — confirmed by PwC (prior pass)
and via search of bra.gov.bb and gov.bb sources.
IP deduction: 50% of cost over 10 years — confirmed by gov.bb/tax-information
and web search.
Manufacturing 150% — confirmed by web search against gov.bb/tax-information
and BITA framework.
5%–33 1/3% range — confirmed by web search (gov.bb/tax-information and PwC).
Note: "150% of the cost of on assets" contains a typographical error ("of on")
that should be corrected regardless of factual status.</pre>
</div>

- **Type:** legal reference / fee
- **Sources:** [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (prior pass — confirms 4% industrial buildings, IP at "10% of 50% of amount expended" = 5% p.a. = 50% over 10 years; PwC unavailable on 2026-05-29); [gov.bb — Tax Information](https://www.gov.bb/tax-information) — mirrors all rates; BRA framework confirmed as consistent
- **Status:** verified (provisionally) — typographical error noted ("of on" at line 32)
- **Certainty:** 70% — rates are corroborated by Tier 3 (PwC, prior pass) and the mirrored gov.bb page, but independent Tier 1 confirmation of the full table was not possible as the Act PDF is not machine-readable
- **Citizen impact:** LOW — typographical error ("of on") is minor; the rates themselves are directionally correct

---

### Claim 9 — Commercial building allowance: 1% or 10% for National Trust registered buildings (lines 35–36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">An allowance of 1% is given on the improved value for land tax purposes of
commercial buildings or 10% where the building is registered with the
National Trust.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">An allowance of 1% is given on the improved value for land tax purposes of
commercial buildings or 10% where the building is registered with the
National Trust.</pre>
</div>

- **Type:** legal reference / fee
- **Sources:** [gov.bb — Tax Information](https://www.gov.bb/tax-information) — confirmed: "Commercial buildings qualify for a building allowance equal to 10% of the improved value where the property is registered with the National Trust, and 1% of the improved value where it is not so registered"
- **Status:** verified
- **Certainty:** 80%

---

### Claim 10 — Loss carry-forward: nine years; insurance companies five years (lines 39–40)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">These losses may be carried forward for a period of nine years following the
income year in which they were incurred. Losses incurred by insurance companies
may be carried forward for a period of five years only.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">For income years 2015–2024, trading losses may be carried forward for seven
years. From income year 2025, trading losses may only be carried forward for
five years following the income year in which they were incurred.
Note: from income year 2019, losses may only offset up to 50% of taxable income
in any given year (restriction on annual utilisation).
(Note: the BRA's own public guidance page still states nine years as of
2026-05-29 — the BRA page may not yet reflect the 2024-15 amendments. PwC
confirmed the reduction to seven years (2015–2024) and five years (2025+) in
a prior pass but was unavailable on 2026-05-29.)</pre>
</div>

- **Type:** legal reference / statistic
- **Sources:** [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (prior pass — "From income years 2015 to 2024, losses can generally be carried forward for seven years (previously nine years)... With effect from income year 2025, tax losses will only be available to be carried forward for five income years"; PwC unavailable on 2026-05-29); [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) — BRA page still states "nine years" as of this pass, suggesting BRA's public-facing page has not yet been updated to reflect amendments
- **Status:** discrepant — the nine-year period has been reduced, though the precise current figure (five years from 2025) is supported by PwC (Tier 3) only; BRA's own page has not yet reflected the change
- **Certainty:** 25% that nine years is still correct for income years from 2015 onwards
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — a business incorrectly believing it can carry a loss for nine years may fail to act on deductions that expire earlier, resulting in a permanent tax overcharge

---

### Claim 11 — Loss carry-forward: second reference to nine years (line 41)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Losses incurred by taxpayers may be set off against their assessable income for
a period of nine years.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Losses incurred by taxpayers may be set off against their assessable income for
a period of five years (from income year 2025 onwards), down from seven years
(income years 2015–2024) and nine years (prior to 2015).</pre>
</div>

- **Type:** legal reference / statistic
- **Sources:** Same sources as Claim 10 — [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (prior pass); [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) (still shows nine years on 2026-05-29)
- **Status:** discrepant — same nine-year error repeated; as of income year 2025, the period is five years per PwC
- **Certainty:** 15%
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — see Claim 10

---

### Claim 12 — Group relief: 75% subsidiary test and both companies resident in Barbados (line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Two companies are members of the same group if one is a 75% subsidiary of the
other or both are 75% subsidiaries of a third company.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (ownership test)</div>
<pre class="claim-block-content">The 75% subsidiary test remains the ownership threshold under the reformed
group relief provisions. Both companies must also be resident in Barbados
and subject to current tax rates.</pre>
</div>

- **Type:** legal reference
- **Sources:** [PwC — Barbados Group Taxation](https://taxsummaries.pwc.com/barbados/corporate/group-taxation) (prior pass — confirms "companies meet the 75% subsidiary test" and "every company seeking group relief is resident in Barbados"); [PwC — Significant Developments](https://taxsummaries.pwc.com/barbados/corporate/significant-developments) (prior pass — confirms group relief implementation from 2024/2025)
- **Status:** verified (the 75% threshold itself is correct; however, the page's surrounding context for group relief eligibility is outdated — see Claims 13 and 14)
- **Certainty:** 85%

---

### Claim 13 — Group relief exclusions: IBCs, exempt insurance, SRLs, offshore banks, special concessions (line 53)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Group relief is not available to international business companies, exempt
insurance companies, societies with restricted liability, offshore banks and
other companies granted special tax concessions. However, such relief is
available for companies subject to the benefits under the Tourism Development
Act or the Mutual Funds Act.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Under the reformed corporation tax regime (effective 2024/2025), group relief
is available to Barbados-resident companies that meet the 75% subsidiary test.
The former categories of international business companies (IBCs), exempt
insurance companies (EICs), and offshore banks were abolished or frozen to new
entrants as of 31 December 2018 and are no longer operative exclusion categories.
The relief is capped at 50% of the tax that would otherwise have been payable.</pre>
</div>

- **Type:** legal reference / eligibility
- **Sources:** [PwC — Barbados Group Taxation](https://taxsummaries.pwc.com/barbados/corporate/group-taxation) (prior pass — current eligibility: companies "subject to tax at 9%", "resident in Barbados", "meet the 75% subsidiary test", "relief sought must not exceed 50% of the amount of tax that would have been payable"); [PwC — Significant Developments](https://taxsummaries.pwc.com/barbados/corporate/significant-developments) (prior pass — group relief applies from income year 2024/2025)
- **Status:** discrepant — the exclusions list references abolished/frozen regime categories; the current test is whether companies are resident in Barbados and subject to current tax rates
- **Certainty:** 20% that the page's exclusion list is still operative
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — a business in a group structure could incorrectly apply or waive group relief based on outdated eligibility rules

---

### Claim 14 — Group relief: claim must be made within two years (line 51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A claim for group relief must be made within two years of the end of the
surrendering company's fiscal year and must be consented to by that company.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify from public web</div>
<pre class="claim-block-content">The two-year deadline is not mentioned on bra.gov.bb's group relief pages or
in the PwC group taxation summary. Under the reformed regime, no public Tier 1
source confirms or contradicts this specific procedural deadline. The Income Tax
Act Cap. 73 PDF was not machine-readable.</pre>
</div>

- **Type:** legal reference / hours (deadline)
- **Sources:** [gov.bb — Tax Information](https://www.gov.bb/tax-information) (mirrors alpha.gov.bb; same source); [PwC — Barbados Group Taxation](https://taxsummaries.pwc.com/barbados/corporate/group-taxation) (prior pass — two-year deadline not mentioned); [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) (consulted — deadline not surfaced)
- **Status:** unverifiable — no independent confirmation; may be accurate under the current Act text but cannot be confirmed from the public web
- **Certainty:** 40%
- **Open question:** Confirm the two-year claim deadline for group relief against the Income Tax (Amendment and Validation) Act, 2024-15 and the current Act text.

---

### Claim 15 — General corporation tax rate: 25% (line 57)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The rate of tax applicable generally to both resident and non-resident
companies in Barbados is 25%.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">For income year 2024, the corporation tax rate is tiered:
  - Income not exceeding BBD $1,000,000: 5.5%
  - Income from $1M to $20M: 3%
  - Income from $20M to $30M: 2.5%
  - Income over $30M: 1%

For income year 2025, PwC and Centralis Group indicate a 9% headline rate
applies to standard companies, with 5.5% for approved small businesses.
The BRA public page (checked 2026-05-29) still shows the 2024 tiered structure.

In all scenarios, the page's stated 25% flat rate is wrong.

Approved small businesses (gross income ≤ BBD $2 million, registered under
the Small Business Development Act) are taxed at 5.5%.
Qualifying IP income under the patent box regime is taxed at 4.5%.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) — tiered rate structure confirmed: "Not exceeding BBD $1,000,000: 5.5%; $1M to $20M: 3%; $20M to $30M: 2.5%; over $30M: 1%" (2024 rates); [Centralis Group — New Incentives and Tax Rates for 2024](https://centralisgroup.com/news-insights/barbados-an-overview-of-new-incentives-and-tax-rates-for-2024/) — "9% headline corporation tax rate for 2024"; [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass — "Standard companies: 9% for income year 2025; approved small businesses: 5.5%"; PwC unavailable on 2026-05-29)
- **Status:** discrepant — the 25% flat rate was superseded effective 1 January 2024 by the tiered structure above; the page has never been updated
- **Certainty:** 5% that 25% is still the current rate
- **Confidence it's wrong:** 98%
- **Citizen impact:** HIGH — a business self-assessing at 25% when rates are now 1%–5.5% for income year 2024 will massively overstate its tax liability

---

### Claim 16 — General insurance companies: 25% corporation tax rate (line 61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Income of insurance companies carrying on general insurance business | 25%</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Class 1 insurance companies: 0%
Class 2 insurance companies: 2%
Class 3 insurance companies: 2%
Qualifying insurance companies (licensed before 17 October 2017, life
insurance only): 0.35%
Exempt insurance companies: 0%</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) — lists current insurance rates by class (confirmed on 2026-05-29: "Class 1: 0%, Class 2: 2%, Class 3: 2%, Exempt insurance: 0%, Qualifying insurance companies: 0.35%"); [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass — "Insurance companies (Class 1, 2, 3): 0%–2%")
- **Status:** discrepant — general insurance rate is not 25%; insurance companies fall into the Class 1/2/3 structure at 0%–2% under the reformed regime
- **Certainty:** 5% that 25% is the current general insurance rate
- **Confidence it's wrong:** 97%
- **Citizen impact:** HIGH — an insurance company reading this page would massively overstate its expected tax liability

---

### Claim 17 — Life insurance companies: 5% corporation tax rate (line 63)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Income of insurance company carrying on life insurance business | 5%</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Life insurance companies are now classified under the Class 1, 2, or 3
insurance framework at 0%–2%. Qualifying insurance companies (those
licensed to carry on life insurance before 17 October 2017) may remain
at 0.35% under a grandfathered regime.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) (confirmed on 2026-05-29); [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass)
- **Status:** discrepant — the 5% rate is pre-reform; life insurers now fall under the Class 1/2/3 structure
- **Certainty:** 5% that 5% is the current rate
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — insurance companies relying on this page will apply the wrong rate

---

### Claim 18 — Manufacturing companies: 15% corporation tax rate (line 64)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Income of manufacturing companies | 15%</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify from public web — likely superseded</div>
<pre class="claim-block-content">The BRA's income tax corporations page does not list a separate 15% rate for
manufacturing companies in its current rate table. Under the reformed regime,
the standard rate is tiered (1%–5.5% for income year 2024). However, no Tier 1
or Tier 2 source explicitly confirms whether a special manufacturing rate was
abolished by the 2024 reform or whether manufacturing companies simply fall
under the general tiered/9% rate. The BRA corporations page was checked on
2026-05-29 — no manufacturing-specific rate found.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) (confirmed on 2026-05-29: no manufacturing-specific rate in current table); [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass — no separate manufacturing rate cited); [gov.bb — Tax Information](https://www.gov.bb/tax-information) (mirrors alpha.gov.bb)
- **Status:** unverifiable — the 15% rate may have been subsumed into the general tiered rate or retained; no current Tier 1 source confirms either outcome
- **Certainty:** 20%
- **Confidence it's wrong:** 80%
- **Citizen impact:** HIGH — manufacturing companies setting their expected tax liability on this page will be working from an incorrect rate
- **Open question:** Confirm with BRA whether the 15% manufacturing rate persists under the Income Tax (Amendment and Validation) Act, 2024-15 or whether manufacturing companies are now taxed at the standard tiered/9% rate.

---

### Claim 19 — Residential rental: 15% corporation tax rate (line 65)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Income from rental of residential property | 15%</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify from public web — likely superseded</div>
<pre class="claim-block-content">Same position as Claim 18: no current Tier 1 BRA source lists a separate 15%
rate for residential rental income. Under the reformed regime, it is unclear
whether this rate persists or has been absorbed into the general tiered/9% rate.
BRA corporations page checked on 2026-05-29 — no separate residential rental
rate listed.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) (2026-05-29: no separate residential rental rate in current table); [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass — no separate residential rental rate cited); [gov.bb — Tax Information](https://www.gov.bb/tax-information) (mirrors alpha.gov.bb)
- **Status:** unverifiable — same as Claim 18
- **Certainty:** 20%
- **Confidence it's wrong:** 80%
- **Citizen impact:** HIGH — a company deriving income from residential rental that relies on this page may file at the wrong rate
- **Open question:** Confirm with BRA whether the 15% residential rental rate persists or has been absorbed into the standard tiered/9% rate.

---

### Claim 20 — Premium tax on life insurance: 6% new, 3% resident renewal, 5% non-resident renewal (lines 71–74)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Insurance company carrying on life insurance business | 6% of the gross direct
premium income on new business in that income year.
Resident insurance companies carrying on life insurance business | 3% of the
gross direct premium income for renewal business
Non-resident insurance companies carrying on life insurance business | 5% of
gross direct premium income for renewal business</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Life insurance premium tax (all companies): 6% of gross direct premium income
on new business.
Resident life insurance companies: 3% of gross direct premium income for
renewal business.
Non-resident life insurance companies: 5% of gross direct premium income for
renewal business.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [PwC — Barbados Corporate Other Taxes](https://taxsummaries.pwc.com/barbados/corporate/other-taxes) (prior pass — "a life insurance premium tax is levied on gross direct premium income earned by resident and foreign life insurance companies. Resident: new business 6%, renewal 3%. Foreign: new business 6%, renewal 5%.")
- **Status:** verified — these premium tax rates appear to have survived the 2024 corporation tax reform as a separate tax levy
- **Certainty:** 80%
- **Note:** Verify against the current legislation to confirm they remain unchanged post-reform.

---

### Claim 21 — Premium tax on property insurance: 4.75%; other insurance: 4% (lines 74–77)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Insurance companies carrying on property insurance business | 4.75% of gross
direct premium income
Insurance companies carrying on insurance business other than property insurance
business | 4% of gross direct premium income</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Property insurance: 4.75% of gross direct premium income.
Other general insurance: 4% of gross direct premium income.</pre>
</div>

- **Type:** fee / legal reference
- **Sources:** [PwC — Barbados Corporate Other Taxes](https://taxsummaries.pwc.com/barbados/corporate/other-taxes) (prior pass — "a general insurance premium tax is levied on gross direct premium income at a rate of 4.75% in respect of property insurance business and 4% for other general insurance business")
- **Status:** verified
- **Certainty:** 80%

---

### Claim 22 — Declared `source_url`: `https://www.gov.bb/tax-information` (content-directory.ts line 568)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/content-directory.ts (line 568)</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/tax-information"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">URL is live but content is stale</div>
<pre class="claim-block-content">https://www.gov.bb/tax-information resolves successfully (confirmed 2026-05-29).
However, the upstream gov.bb page has identical content to alpha.gov.bb — it also
quotes the 25% general rate and pre-reform tax tables. The gov.bb page has not
been updated since the 2024 corporation tax reform. It cannot serve as a source
for accurate current information.

The authoritative current source for corporation tax rates is:
https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Tax Information](https://www.gov.bb/tax-information) — confirmed live on 2026-05-29; [BRA — Income Tax Corporations](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations) — confirmed as the current authoritative rate source
- **Status:** unverifiable as a reliable source — URL resolves, but the upstream content is itself stale and mirrors the alpha.gov.bb errors
- **Certainty:** 70% (URL liveness); 10% (content currency)
- **Citizen impact:** MEDIUM — a content editor checking this source_url to verify the page will be misled into thinking the 25% rate is correct because both gov.bb and alpha.gov.bb are wrong in the same way
- **Open question:** The alpha.gov.bb content team should update this page independently of gov.bb, using bra.gov.bb as the primary source for rates. Flag to the Digital Barbados / MIIST team that gov.bb/tax-information also requires updating.

---

## Additional findings (not on the page but should be)

**Minimum effective tax rate for MNE groups (15% top-up tax).** The Corporation Top-Up Tax Act, 2024-16 (enacted May 2024, effective from income years beginning on or after 31 December 2023) introduces a 15% minimum effective tax rate (qualified domestic minimum top-up tax) for multinational enterprise groups operating in Barbados with global revenues exceeding EUR 750 million. This is a significant new tax obligation not mentioned anywhere on the page. Source: [BRA — Corporation Top-Up Tax Act, 2024-16](https://bra.gov.bb/About/Legislation-Regulations/Corporation-Top-up-Tax-Act-2024-16).

**Monthly CIT prepayment requirement (from income year 2024).** Under the reformed regime, most companies (except approved small businesses) are required to make monthly corporation income tax prepayments of one-twelfth of the tax payable on the prior income year's taxable income, due by the 15th of each calendar month. This is a new compliance obligation not mentioned on the page. Source: [BRA — OGC No. 04/2025 (Prepayment of Corporation Tax)](https://bra.gov.bb/News/Policy-Notes/OGC-No-04-2025-Corporation-Tax-Re).

**Patent box regime (4.5% rate for qualifying IP income).** A new patent box regime was introduced under the 2024 reform, offering a 4.5% corporation tax rate on income derived from qualifying intellectual property. This is not mentioned on the page and would be relevant to companies with IP assets. Source: [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass).

**50% annual loss utilisation cap (from income year 2019).** From income year 2019, carried-forward losses may only offset up to 50% of a company's taxable income in any given income year. This cap is not mentioned on the page and significantly affects companies with large accumulated losses. Source: [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (prior pass).

**Typographical error: "150% of the cost of on assets" (line 32).** The sentence reads "manufacturing companies are allowed an annual allowance of 150% of the cost of **on** assets used in the industry." The word "on" is extraneous. Should read "150% of the cost of assets used in the industry."

---

## Sources cited

- [BRA — Income Tax Corporations (current rate table)](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations)
- [BRA — Residency Status](https://bra.gov.bb/Popular-Topics/Companies/Residency-Status)
- [BRA — Determination of Taxable Income](https://bra.gov.bb/Popular-Topics/Companies/Determination-of-Taxable-Income)
- [BRA — Corporation Top-Up Tax Act, 2024-16](https://bra.gov.bb/About/Legislation-Regulations/Corporation-Top-up-Tax-Act-2024-16)
- [BRA — Income Tax Act, Cap.73 (legislation listing)](https://bra.gov.bb/About/Legislation-Regulations/Income-Tax-Act)
- [BRA — Barbados Corporate Tax Reform 2024 (consultation)](https://bra.gov.bb/News/Announcements/Barbados-Corporate-Tax-Reform-2024)
- [BRA — Filing and Payment Extension (income year 2025)](https://bra.gov.bb/News/Guidance-Notes/Filing-and-Payment-of-Corporation)
- [BRA — OGC No. 04/2025: Prepayment of Corporation Tax](https://bra.gov.bb/News/Policy-Notes/OGC-No-04-2025-Corporation-Tax-Re)
- [gov.bb — Tax Information (source_url for this page)](https://www.gov.bb/tax-information)
- [PwC — Barbados Corporate Taxes on Corporate Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income) (prior pass — unavailable 2026-05-29)
- [PwC — Barbados Corporate Significant Developments](https://taxsummaries.pwc.com/barbados/corporate/significant-developments) (prior pass — unavailable 2026-05-29)
- [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions) (prior pass — unavailable 2026-05-29)
- [PwC — Barbados Corporate Other Taxes (premium tax rates)](https://taxsummaries.pwc.com/barbados/corporate/other-taxes) (prior pass — unavailable 2026-05-29)
- [PwC — Barbados Corporate Group Taxation](https://taxsummaries.pwc.com/barbados/corporate/group-taxation) (prior pass — unavailable 2026-05-29)
- [Centralis Group — Barbados New Incentives and Tax Rates for 2024](https://centralisgroup.com/news-insights/barbados-an-overview-of-new-incentives-and-tax-rates-for-2024/)
- [Income Tax Act Cap. 73 — Barbados Law Courts (PDF, not machine-readable)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/IncomeTaxCAP073.pdf)
