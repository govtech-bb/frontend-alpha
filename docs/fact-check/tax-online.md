# Fact-check: Tax online

- **Live page:** <https://alpha.gov.bb/money-financial-support/tax-online>
- **Source file:** `src/content/tax-online.md`
- **Last checked:** 2026-05-28
- **Summary:** 10 claims reviewed — 8 verified, 1 discrepant, 1 unverifiable. Average certainty: **83%**.

---

## Headline issues for triage

1. **Page heading and CTA button scope-limit TAMIS to income tax only (line 9 + line 22).** The heading reads "File My Income Tax Online" and the call-to-action button says "FILE INCOME TAX". TAMIS handles far more than income tax: the BRA's own launch press release and current bra.gov.bb guidance confirm it also processes Corporate Income Tax, PAYE, VAT, Withholding Tax, Excise Tax, Betting and Gaming Fees, and Premium Tax. A citizen with a VAT or PAYE obligation who reads this page may not realise they too must use TAMIS. The description in the body ("manage your taxes online") is actually broader and correct; the heading and button contradict it. Tier B — medium citizen impact.

2. **Frontmatter `section` field mismatch (frontmatter line 6).** The frontmatter declares `section: "Work and Employment"` but `content-directory.ts` places this page under the "Money and financial support" category (slug `money-financial-support`). If the `section` field drives navigation, breadcrumbs, or search facets it will produce incorrect output. This mirrors the same issue found on the EZPay page.

3. **No TAMIS support details anywhere on the page.** The TAMIS portal publishes a dedicated help desk phone number (535-8239 / 429-3829), email (tamis@bra.gov.bb), and hours (8:30am–4:30pm Mon–Fri, excluding public holidays). None of these appear on the alpha.gov.bb page. A citizen who cannot file — an extremely common scenario — has no guidance on where to turn.

---

## Claims

### Claim 1 — Description: "TAMIS is an electronic platform which allows you to manage your taxes online." (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">TAMIS is an electronic platform which allows you to manage your taxes online.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">TAMIS is an electronic platform which allows you to manage your taxes online.</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [BRA — Help/TAMIS](https://bra.gov.bb/Help/TAMIS) — "TAMIS is an online tax system created in June 2018 where persons & entities register to receive a 13 digit Tax Identification Number to file and pay their various taxes"; [gov.bb — Citizens/tax-online (source_url)](https://www.gov.bb/Citizens/tax-online) — mirrors the phrase verbatim; [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — portal is live with tagline "Tax made easy!"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — TAMIS capability: "view account information" (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">view account information</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">view account information</pre>
</div>

- **Type:** process step
- **Sources:** [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — lists "view account information" as a feature verbatim; [gov.bb — Citizens/tax-online](https://www.gov.bb/Citizens/tax-online) — same list confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 3 — TAMIS capability: "file your returns" (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">file your returns</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">file your returns</pre>
</div>

- **Type:** process step
- **Sources:** [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — lists "file your returns" verbatim; [BRA — File Your Tax Return](https://bra.gov.bb/file) — confirms TAMIS at tamis.bra.gov.bb is the filing portal; [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax) — "Corporate Income Tax (CIT), Pay As You Earn (PAYE), Personal Income Tax (PIT), Withholding Tax (WHT) and Betting and Gaming Fees are filed and paid in TAMIS"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — TAMIS capability: "view statements" (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">view statements</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">view statements</pre>
</div>

- **Type:** process step
- **Sources:** [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — lists "view statements" verbatim; [gov.bb — Citizens/tax-online](https://www.gov.bb/Citizens/tax-online) — same list confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — TAMIS capability: "view overdue and upcoming return and payments" (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">view overdue and upcoming return and payments</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">view overdue and upcoming return and payments</pre>
</div>

- **Type:** process step
- **Sources:** [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — lists monitoring of overdue and upcoming obligations as a feature; [gov.bb — Citizens/tax-online](https://www.gov.bb/Citizens/tax-online) — same list confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — TAMIS capability: "make online payments" (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">make online payments</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">make online payments</pre>
</div>

- **Type:** process step
- **Sources:** [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — lists electronic payments as a capability; [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax) — "Online: Credit card or bank debit account through 'EZpay+' tab" confirmed; [BRA — What is TAMIS?](https://bra.gov.bb/About/What-is-TAMIS) — "online payments planned" / available
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — TAMIS capability: "submit enquiries" (line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">submit enquiries</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">submit enquiries</pre>
</div>

- **Type:** process step
- **Sources:** [tamis.bra.gov.bb homepage](https://tamis.bra.gov.bb/) — lists "submit enquiries" verbatim; [gov.bb — Citizens/tax-online](https://www.gov.bb/Citizens/tax-online) — same list confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 8 — TAMIS portal URL: https://tamis.bra.gov.bb/ (line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[FILE INCOME TAX](https://tamis.bra.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://tamis.bra.gov.bb/ — live, resolves to the TAMIS portal.</pre>
</div>

- **Type:** URL
- **Sources:** [tamis.bra.gov.bb](https://tamis.bra.gov.bb/) — confirmed live, returns the TAMIS registration/login page with tagline "Tax made easy!"; [BRA — Help/TAMIS](https://bra.gov.bb/Help/TAMIS) — cites the same URL; [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax) — "filed and paid in TAMIS at https://tamis.bra.gov.bb"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 9 — Heading and CTA scope: "File My Income Tax Online" / "FILE INCOME TAX" (lines 9, 20, 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">## File My Income Tax Online

Click the button below to file income tax.

[FILE INCOME TAX](https://tamis.bra.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">## File and Pay Tax Online

Click the button below to access TAMIS, where you can file and pay income
tax, corporate tax, PAYE, VAT, withholding tax, and other taxes online.

[GO TO TAMIS](https://tamis.bra.gov.bb/)</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [BRA — Press Release: BRA Launches Phase 1 of New Tax System](https://bra.gov.bb/News/Press-Releases/BRA-Launches-Phase-1-of-New-Tax-Sy) — Phase 1 (June 2018) covered Corporate Income Tax, PAYE, Withholding Tax, Premium Tax, Tax on Bank Assets, VAT, National Social Responsibility Levy, Excise Tax; Phase 2 (Feb 2019) added Personal Income Tax; [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax) — "Corporate Income Tax (CIT), Pay As You Earn (PAYE), Personal Income Tax (PIT), Withholding Tax (WHT) and Betting and Gaming Fees are filed and paid in TAMIS"; [BRA — Help/TAMIS](https://bra.gov.bb/Help/TAMIS) — TAMIS processes Corporate Tax, PAYE, Income Tax, Land Tax, Withholding Tax, Goods and Services Tax, Pension-related taxes
- **Status:** discrepant — the heading and button text scope TAMIS to income tax only; it also handles corporate tax, PAYE, VAT, withholding tax, excise, and other levies. A citizen with VAT or PAYE obligations reading this page may not recognise that TAMIS is also their required filing portal.
- **Certainty:** 20% that "income tax only" is the intended scope of this page
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — businesses and employers responsible for PAYE, VAT, or withholding tax may not realise this is also their portal. The body description ("manage your taxes online") is already broader and correct; the heading and CTA contradict it.

---

### Claim 10 — Frontmatter `section` field: "Work and Employment" (frontmatter line 6)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in frontmatter</div>
<pre class="claim-block-content">section: "Work and Employment"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Internal inconsistency — not verifiable externally</div>
<pre class="claim-block-content">content-directory.ts places this page under the "Money and financial support"
category (slug: money-financial-support, line 262–268). The correct live URL
is https://alpha.gov.bb/money-financial-support/tax-online, not
.../work-employment/tax-online.

If the `section` field drives navigation breadcrumbs or search facets, it
will return "Work and Employment" instead of "Money and financial support".</pre>
</div>

- **Type:** descriptive (metadata / internal consistency)
- **Sources:** Checked: [src/data/content-directory.ts](/home/gavin/frontend-alpha/src/data/content-directory.ts) lines 262–268 — page is listed under the `money-financial-support` section; [ezpay.md fact-check report](/home/gavin/frontend-alpha/docs/fact-check/ezpay.md) Additional findings — identical `section: "Work and Employment"` mismatch found on the EZPay page
- **Status:** unverifiable (external sources cannot adjudicate an internal data-model inconsistency; issue is structural)
- **Certainty:** N/A — this is an internal code inconsistency, not an externally verifiable fact
- **Open question:** Confirm whether the `section` frontmatter field drives any navigation, breadcrumbs, or search facets in the site build. If yes, update to `section: "Money and Financial Support"` to match content-directory.ts. If the field is currently unused in the build, add a note that it is stale and schedule removal or correction.

---

## Additional findings (not on the page but should be)

**TAMIS help desk details are missing.** The TAMIS portal publishes dedicated support contact details that a citizen who cannot log in, register, or file would immediately need:
- Phone: (246) 535-8239 (direct TAMIS helpline) / (246) 429-ETAX (429-3829) (general BRA line)
- Email: tamis@bra.gov.bb / bramail@bra.gov.bb
- Hours: 8:30am to 4:30pm, Monday to Friday (excluding public holidays)

Source: [tamis.bra.gov.bb homepage help section](https://tamis.bra.gov.bb/); [BRA — TAMIS Key Dates and Support](https://bra.gov.bb/Help/TAMIS-Key-Dates-Support).

**TAMIS full name is not explained.** The page uses "TAMIS" as a bare acronym without expansion. The full name is "Tax Administration Management Information System". While citizens do not need the full name to file, expanding it once would add transparency and assist readers who encounter the acronym elsewhere in official correspondence. Source: [BRA — What is TAMIS?](https://bra.gov.bb/About/What-is-TAMIS); [BRA — Press Release: BRA Launches Phase 1](https://bra.gov.bb/News/Press-Releases/BRA-Launches-Phase-1-of-New-Tax-Sy).

**Income tax filing deadline (April 30) is not mentioned.** The BRA's published deadline for personal income tax returns is April 30 (confirmed for 2025 and prior years). A citizen using this page to file would benefit from knowing when their return is due. Source: [BRA — Filing Your Tax Return](https://bra.gov.bb/Popular-Topics/Self-Employment/Filing-Your-Tax-Return); [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax).

**`source_url` is live and content matches.** The `source_url` in `content-directory.ts` (`https://www.gov.bb/Citizens/tax-online`) is live and mirrors the alpha.gov.bb content verbatim — including both the six-capability bullet list and the tamis.bra.gov.bb link. The upstream source has the same heading/scope limitation (line 9) noted in Claim 9.

---

## Sources cited

- [tamis.bra.gov.bb — TAMIS portal homepage](https://tamis.bra.gov.bb/)
- [BRA — Help/TAMIS](https://bra.gov.bb/Help/TAMIS)
- [BRA — What is TAMIS?](https://bra.gov.bb/About/What-is-TAMIS)
- [BRA — TAMIS Key Dates and Support](https://bra.gov.bb/Help/TAMIS-Key-Dates-Support)
- [BRA — Press Release: BRA Launches Phase 1 of New Tax System](https://bra.gov.bb/News/Press-Releases/BRA-Launches-Phase-1-of-New-Tax-Sy)
- [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax)
- [BRA — File Your Tax Return](https://bra.gov.bb/file)
- [BRA — Filing Your Tax Return (Self-Employment)](https://bra.gov.bb/Popular-Topics/Self-Employment/Filing-Your-Tax-Return)
- [gov.bb — Citizens/tax-online (source_url)](https://www.gov.bb/Citizens/tax-online)
- [EZPay fact-check report (section mismatch precedent)](/home/gavin/frontend-alpha/docs/fact-check/ezpay.md)
