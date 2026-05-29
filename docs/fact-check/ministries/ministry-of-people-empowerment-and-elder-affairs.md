# Fact-check: Ministry of People Empowerment and Elder Affairs

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-people-empowerment-and-elder-affairs>
- **Source file:** `src/content/ministries/ministry-of-people-empowerment-and-elder-affairs.md`
- **Data file:** `src/data/ministries.ts` (lines 833–915)
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 8 verified, 4 discrepant, 3 unverifiable. Average certainty: **74%**.

---

## Headline issues for triage

1. **Associated departments list names three dissolved agencies.** The `associatedDepartments` array in `ministries.ts` (lines 905–913) still lists "The National Assistance Board", "The Child Care Board", and "Welfare Department" as separate entities. All three were dissolved on 2 January 2026 and merged — along with the National Disabilities Unit and the Resilience and Reintegration Unit — into the Social Empowerment Agency (SEA). Citizens navigating to those department pages will find stale information. The SEA should be listed in place of these three bodies. This is the most consequential structural error on this ministry page.

2. **Community Development Department is listed under the wrong ministry.** The content markdown (lines 23–27) includes a "Community Development Department" directory block. The CDD's own website (comdev.gov.bb) and the Ministry of Youth, Sports and Community Empowerment's website confirm the CDD sits under MYSCE, not MPEEA. It appears in MPEEA's content file and in the `ministries.ts` MYSCE entry simultaneously — a cross-file attribution error that propagates to the rendered ministry page.

3. **socialcare.gov.bb website is non-functional.** The data file lists `http://www.socialcare.gov.bb/` as the ministry's website. The domain returns ECONNREFUSED on direct fetch (confirmed again on 2026-05-29). Citizens who click the link reach a dead end. The SEA now operates its own website at `socialempowermentbb.org` (currently also ECONNREFUSED on direct fetch — may be pre-launch). Until either site is live, the ministry's official web presence is `https://www.gov.bb/Ministries/social-care`.

4. **Five direct-line extension numbers are published on gov.bb but absent from the alpha.gov.bb data file.** The gov.bb source page lists: Minister 535-1604; PS 535-1606; PS Secretary 535-1617; Deputy PS 535-1608; SAO 535-1609; Senior Accountant 535-1613; Executive Officer 535-1605. None of these appear in `ministries.ts` or in the content markdown. The blank directory table adds no value to citizens.

5. **The Older Persons (Care and Protection) Bill 2026 — Senate debate completed, assent status unconfirmed.** The Bill passed through Senate debate in early May 2026 (senators debated 6–7 May 2026). Assent status as of 2026-05-29 is unconfirmed. Once the Act receives assent, the MPEEA page should reference the new statutory framework for elder protection, and the "Report elderly abuse" service page should be updated to reference the Act rather than the National Assistance Board (a dissolved body).

---

## Claims

### Claim 1 — Ministry name (heading; ministries.ts line 835) {#claim-1}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of People Empowerment and Elder Affairs</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of People Empowerment and Elder Affairs</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — confirms full name; [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — lists "Ministry of People Empowerment and Elder Affairs"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Mission statement (content file lines 1–3) {#claim-2}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To contribute to the overall socio-economic development of Barbados and the
empowerment of all members of society by fully utilizing all available human,
financial and technological resources; formulating evidence-based policy; and
implementing timely, effective and equitably accessible social programmes and
services.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To contribute to the overall socio-economic development of Barbados and the
empowerment of all members of society by fully utilizing all available human,
financial and technological resources; formulating evidence-based policy; and
implementing timely, effective and equitably accessible social programmes and
services.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — verbatim match confirmed
- **Status:** verified
- **Certainty:** 97%

---

### Claim 3 — Vision statement (content file lines 5–7) {#claim-3}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A transformed social landscape that provides ever improving and equal
opportunities for all citizens to achieve a sustainable and acceptable standard
of living, an enhanced quality of life and the ability to fully participate
effectively in the overall development of the country.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A transformed social landscape that provides ever improving and equal
opportunities for all citizens to achieve a sustainable and acceptable standard
of living, an enhanced quality of life and the ability to fully participate
effectively in the overall development of the country.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — verbatim match confirmed for the vision statement
- **Status:** verified
- **Certainty:** 97%

---

### Claim 4 — Minister: "The Hon. Adrian R. Forde, M.P." (ministries.ts line 843) {#claim-4}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">The Hon. Adrian R. Forde, M.P.
Minister of People Empowerment and Elder Affairs</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. Adrian R. Forde, M.P.
Minister of People Empowerment and Elder Affairs</pre>
</div>

- **Type:** agency name / contact person
- **Sources:** [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Hon. Adrian R. FORDE, M.P." listed as minister; [Barbados Today — Forde unveils sweeping rules for elderly care facilities (22 Apr 2026)](https://barbadostoday.bb/2026/04/22/forde-unveils-sweeping-rules-for-elderly-care-facilities/) — confirms his continued role as minister in April 2026; [Barbados Today — King laments values erosion, urges 'humanity' in elder care law (7 May 2026)](https://barbadostoday.bb/2026/05/07/king-laments-values-erosion-urges-humanity-in-elder-care-law/) — Forde confirmed as minister tabling the Bill in Senate May 2026
- **Status:** verified
- **Certainty:** 99%
- **Note:** The content markdown directory (lines 11–21) has a blank "Minister" row. The minister name is only surfaced via `ministries.ts`. If the page renders the markdown directory directly, citizens will see a blank Minister entry.

---

### Claim 5 — PBX telephone numbers (ministries.ts lines 881–884) {#claim-5}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">Telephone: (246) 535-1600
Telephone: (246) 535-1601
Telephone: (246) 535-1602
Telephone: (246) 535-1603</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Telephone: (246) 535-1600
Telephone: (246) 535-1601
Telephone: (246) 535-1602
Telephone: (246) 535-1603</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "Main PBX: 535-1600/1/2/3" confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Fax numbers (ministries.ts lines 885–886) {#claim-6}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">Fax: (246) 535-1694
Fax: (246) 535-1693</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with note)</div>
<pre class="claim-block-content">Fax: (246) 535-1694
Fax: (246) 535-1693</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "FAX: 535-1694" for main ministry; 535-1693 listed as fax for the Community Development Department on that same page
- **Status:** verified — 535-1694 is confirmed as MPEEA fax; 535-1693 is the Community Development Department fax. Both appear in the data file as ministry fax numbers, creating a minor attribution ambiguity but not a factual error.
- **Certainty:** 90%

---

### Claim 7 — Email addresses (ministries.ts lines 879–880) {#claim-7}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">Email: socialcare@barbados.gov.bb
Email: ps.people@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Email: socialcare@barbados.gov.bb
Email: ps.people@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "Email: socialcare@barbados.gov.bb; ps.people@barbados.gov.bb" — both addresses match exactly
- **Status:** verified
- **Certainty:** 95%

---

### Claim 8 — Address: 4th Floor Warrens Office Complex (ministries.ts lines 894–899) {#claim-8}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">4th Floor Warrens Office Complex
Warrens
St. Michael
Barbados, W.I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">4th Floor Warrens Office Complex
Warrens
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "4th Floor Warrens Office Complex, Warrens, St. Michael, Barbados, W.I." — exact match
- **Status:** verified
- **Certainty:** 97%

---

### Claim 9 — Website: http://www.socialcare.gov.bb/ (ministries.ts line 890) {#claim-9}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">Website: http://www.socialcare.gov.bb/</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (or be removed)</div>
<pre class="claim-block-content">The domain socialcare.gov.bb returns ECONNREFUSED on direct fetch
(confirmed 2026-05-28 and again 2026-05-29). It is not a functioning
ministry website. Until the site is live, this URL should either be
removed from the page or replaced with the gov.bb ministry page:
https://www.gov.bb/Ministries/social-care</pre>
</div>

- **Type:** URL
- **Sources:** [socialcare.gov.bb](http://www.socialcare.gov.bb/) — ECONNREFUSED on direct fetch (both 2026-05-28 and 2026-05-29); [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — the functioning ministry page
- **Status:** discrepant — the listed website remains non-functional on two consecutive days
- **Certainty:** 10% that the link is working
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — a citizen who clicks the website link reaches a dead page, leaving them with no ministry web presence to consult for further information

---

### Claim 10 — Associated departments: National Assistance Board, Child Care Board, Welfare Department (ministries.ts lines 905–913) {#claim-10}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on the page)</div>
<pre class="claim-block-content">[The National Assistance Board
Poverty Alleviation Bureau
The Child Care Board
Bureau of Social Policy, Research and Planning
Bureau of Gender Affairs
Welfare Department
National Disabilities Unit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Social Empowerment Agency (SEA)
  [merges: National Assistance Board, Child Care Board, Welfare Department,
  National Disabilities Unit, and Resilience and Reintegration Unit — all
  dissolved 2 January 2026]
Poverty Alleviation Bureau
Bureau of Social Policy, Research and Planning
Bureau of Gender Affairs</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Today — SEA launched: Islandwide overhaul of social services begins (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — "The Social Empowerment Agency was established on 2 January [2026], merging the former Child Care Board, Welfare Department, National Assistance Board, National Disabilities Unit, and the Resilience and Reintegration Unit"; [Caribbean News Global — Barbados launches SEA (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/) — confirms all five bodies; [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — itself stale (still lists the dissolved bodies)
- **Status:** discrepant — three of the seven listed bodies (National Assistance Board, Child Care Board, Welfare Department) no longer exist as standalone entities. The National Disabilities Unit is also dissolved into the SEA. The Resilience and Reintegration Unit, also merged, does not appear in the list at all. The Social Empowerment Agency (SEA) should be listed as the successor body.
- **Certainty:** 30% that the list as written is still accurate
- **Confidence it's wrong:** 97%
- **Citizen impact:** HIGH — citizens navigating to the NAB, CCB, or Welfare Department pages will encounter information about agencies dissolved in January 2026 and will not be directed to the SEA, which is now providing these services.

---

### Claim 11 — Community Development Department in the content markdown (lines 23–27) {#claim-11}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">### Community Development Department

| Role | Telephone |
| --- | --- |
| PBX | |
| FAX | |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Community Development Department should not appear under the Ministry
of People Empowerment and Elder Affairs. It operates under the Ministry of
Youth, Sports and Community Empowerment (MYSCE), not MPEEA.

If this section is retained for any operational reason, the correct
contact details are:
PBX: (246) 535-1650 / 535-1655 / 535-1656
FAX: (246) 535-1693
Email: comdev.barbados@barbados.gov.bb
Address: 4th Floor, Warrens Office Complex, Warrens, St. Michael</pre>
</div>

- **Type:** agency name / address
- **Sources:** [Community Development Department — comdev.gov.bb](https://comdev.gov.bb/) — page header explicitly says "Ministry of Sports and Community Empowerment" (abbreviated form of MYSCE); [Ministry of Youth, Sports and Community Empowerment — mysce.gov.bb](https://www.mysce.gov.bb/) — confirms CDD under MYSCE; [ministries.ts line 1144](/home/gavin/frontend-alpha/src/data/ministries.ts) — MYSCE entry also lists "Community Development Department" in its own `associatedDepartments`
- **Status:** discrepant — the Community Development Department is attributed to MPEEA in this content file but belongs under MYSCE. It appears in both ministries' data entries simultaneously.
- **Certainty:** 15% that the CDD belongs under MPEEA
- **Confidence it's wrong:** 92%
- **Citizen impact:** MEDIUM — a citizen looking for community development services who follows the MPEEA page will find blank phone entries and be unable to contact the department

---

### Claim 12 — "Resilience and Reintegration Unit" missing from associated departments {#claim-12}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts — not listed</div>
<pre class="claim-block-content">[The National Assistance Board
Poverty Alleviation Bureau
The Child Care Board
Bureau of Social Policy, Research and Planning
Bureau of Gender Affairs
Welfare Department
National Disabilities Unit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Resilience and Reintegration Unit was part of the MPEEA portfolio
before the SEA merger and should have appeared in the associated departments
list. Since it is now dissolved into the SEA (as of 2 January 2026), the
correct representation is to list the Social Empowerment Agency (SEA) as
the successor to all five merged bodies, including the Resilience and
Reintegration Unit.</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — the Resilience and Reintegration Unit is named as one of five bodies merged into the SEA; [Caribbean News Global — SEA launch (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/) — all five bodies listed by name
- **Status:** discrepant — the Resilience and Reintegration Unit is missing from the pre-merger department list, and no mention of its SEA successor appears post-merger
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — the unit is now dissolved; its omission from the list is a historical accuracy gap rather than a service-impacting error

---

### Claim 13 — Content markdown directory table has no phone numbers (lines 11–21) {#claim-13}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Role | Telephone |
| --- | --- |
| PBX | |
| Minister | |
| Permanent Secretary | |
| PS, Secretary | |
| Deputy Permanent Secretary | |
| Senior Administrative Officer | |
| Senior Accountant | |
| Executive Officer | |
| FAX | |</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable for some rows — but gov.bb publishes most extension numbers</div>
<pre class="claim-block-content">The gov.bb source page (https://www.gov.bb/Ministries/social-care) publishes
the following direct-line numbers that are absent from the alpha.gov.bb data:
  PBX:   535-1600/1/2/3 (in ministries.ts — correct)
  Minister: 535-1604 (NOT in ministries.ts or content markdown)
  PS:    535-1606 (NOT in ministries.ts or content markdown)
  PS Secretary: 535-1617 (NOT in ministries.ts or content markdown)
  Deputy PS: 535-1608 (NOT in ministries.ts or content markdown)
  SAO:   535-1609 (NOT in ministries.ts or content markdown)
  Senior Accountant: 535-1613 (NOT in ministries.ts or content markdown)
  Executive Officer: 535-1605 (NOT in ministries.ts or content markdown)
  FAX:   535-1694 (in ministries.ts — correct)
  CDD FAX: 535-1693 (in ministries.ts — correct)

The blank directory table adds no value. Either populate it from the gov.bb
source or remove it and rely on the ministries.ts contact array.</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — full directory listing with all extensions retrieved on 2026-05-29
- **Status:** unverifiable — the individual extension numbers could be confirmed by calling gov.bb, but the gov.bb source itself provides all of them. The blank table is an omission rather than an error.
- **Certainty:** N/A (all rows are blank — nothing to verify as correct or wrong)
- **Open question:** Should the content markdown directory be populated with the gov.bb extension numbers (535-1604 for Minister, 535-1606 for PS, etc.), or should the blank table be removed entirely in favour of the `ministries.ts` contact array?

---

### Claim 14 — Online service links all resolve (ministries.ts lines 846–877) {#claim-14}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (six CTA links)</div>
<pre class="claim-block-content">/apply-financial-assistance
/welfare-department
/report-elderly-abuse
/report-a-concern-about-a-child
/get-support-for-a-victim-of-domestic-abuse
/get-disaster-relief-assistance</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified — all six links resolve</div>
<pre class="claim-block-content">/apply-financial-assistance — loads ("Apply for financial assistance")
/welfare-department — loads ("Welfare Department") but describes a dissolved agency
/report-elderly-abuse — loads ("Report elderly abuse") but routes to NAB, a dissolved body
/report-a-concern-about-a-child — loads ("Report a concern about a child") routes to CCB, a dissolved body
/get-support-for-a-victim-of-domestic-abuse — loads ("Get support for a victim of domestic abuse")
/get-disaster-relief-assistance — loads ("Get disaster relief assistance") routes to Welfare Dept (dissolved)</pre>
</div>

- **Type:** link / CTA
- **Sources:** Live-checked 2026-05-29: [alpha.gov.bb/apply-financial-assistance](https://alpha.gov.bb/apply-financial-assistance); [alpha.gov.bb/welfare-department](https://alpha.gov.bb/welfare-department); [alpha.gov.bb/report-elderly-abuse](https://alpha.gov.bb/report-elderly-abuse); [alpha.gov.bb/report-a-concern-about-a-child](https://alpha.gov.bb/report-a-concern-about-a-child); [alpha.gov.bb/get-support-for-a-victim-of-domestic-abuse](https://alpha.gov.bb/get-support-for-a-victim-of-domestic-abuse); [alpha.gov.bb/get-disaster-relief-assistance](https://alpha.gov.bb/get-disaster-relief-assistance)
- **Status:** verified (all links resolve) — but four of the six link destinations reference dissolved agencies (Welfare Department, NAB, CCB). The pages load but contain stale agency information. See Claim 10 for the structural issue.
- **Certainty:** 99% (links resolve); 0% that the agency references in destination pages are current
- **Citizen impact:** HIGH — citizens reporting elder abuse are directed to the National Assistance Board (dissolved January 2026); citizens reporting child welfare concerns are directed to the Child Care Board (dissolved January 2026); citizens seeking disaster relief are directed to the Welfare Department (dissolved January 2026). All three should route to the SEA.

---

### Claim 15 — Older Persons (Care and Protection) Bill 2026 — legislative status {#claim-15}

<div class="claim-block claim-block--current">
<div class="claim-block-label">Implicit claim: the elder care legislative framework is unchanged</div>
<pre class="claim-block-content">The MPEEA page contains no reference to the Older Persons (Care and
Protection) Bill 2026, which was tabled in the House of Assembly in April
2026 and completed Senate debate in early May 2026.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — assent date not yet confirmed</div>
<pre class="claim-block-content">The Older Persons (Care and Protection) Bill 2026 completed Senate debate
on 7 May 2026 (independent senators Slocombe and Redman supported the Bill;
opposition senator Goodridge raised drafting concerns). As of 2026-05-29,
royal assent has not been confirmed in any public source.

Once the Act receives assent and a commencement date:
- The MPEEA page should reference the new statutory framework.
- The /report-elderly-abuse page should be updated to reference the Act
  rather than the National Assistance Board (dissolved).
- SEA responsibilities under the Act should be clarified on the page.</pre>
</div>

- **Type:** legal reference / statistic
- **Sources:** [Barbados Today — Independent senators warn of gaps in elder care reforms (7 May 2026)](https://barbadostoday.bb/2026/05/07/independent-senators-warn-of-gaps-in-elder-care-reforms/); [Barbados Today — Opposition senator criticises 'vague drafting' in new Older Persons Bill (6 May 2026)](https://barbadostoday.bb/2026/05/06/opposition-senator-criticises-vague-drafting-in-new-older-persons-bill/); [CBC — BARP welcomes Older Persons Bill (24 Apr 2026)](https://www.cbc.bb/main-stories/barp-welcomes-older-persons-bill-and-calls-for-enforcement/) — Bill in Senate as of May 2026; assent unconfirmed
- **Status:** unverifiable — Senate debate completed but assent status unknown as of 2026-05-29
- **Certainty:** N/A
- **Open question:** Has the Older Persons (Care and Protection) Act 2026 received royal assent? What is its commencement date? The GovBB team should monitor Barbados Official Gazette for assent notification and update the MPEEA and elder-abuse service pages accordingly.

---

## Additional findings (not on the page but should be)

### A — Seven direct-line extension numbers from gov.bb missing from data file

The gov.bb source page (`gov.bb/Ministries/social-care`) publishes individual extension numbers not carried in `ministries.ts`:
- **Minister direct:** (246) 535-1604
- **Permanent Secretary direct:** (246) 535-1606
- **PS Secretary:** (246) 535-1617
- **Deputy Permanent Secretary:** (246) 535-1608
- **Senior Administrative Officer:** (246) 535-1609
- **Senior Accountant:** (246) 535-1613
- **Executive Officer:** (246) 535-1605

These should be added to the `contact` array in `ministries.ts` so they render on the ministry page alongside the PBX, or the blank directory table in the content markdown should be populated with these values.

### B — Permanent Secretary identity: Jehu Wiltshire (acting: Mark Franklin)

`gov.bb/government/ps-related-grades` lists two PS holders for MPEEA:
- **Mr. Jehu Wiltshire** — Permanent Secretary, MPEEA
- **Mr. Mark Franklin** — Permanent Secretary (Ag.), MPEEA

The content markdown has a blank "Permanent Secretary" row. The `ministries.ts` data file does not include the PS name (consistent with other ministry entries that only carry the minister name). No correction is needed in the data file, but the blank markdown directory should either be populated or removed.

### C — Social Empowerment Agency successor page needed

The four service links on this ministry page that route to dissolved agencies (Welfare Department, NAB, CCB — see Claim 14) should instead route to a dedicated SEA page. The SEA currently operates:
- **Six Roads, St. Philip** — opened 7 January 2026
- **Southern Plaza, Oistins, Christ Church** — opened 27 March 2026
- 11 additional centres planned across the island

The SEA has registered a website (`socialempowermentbb.org`) which currently returns ECONNREFUSED — likely pre-launch. Once live, this URL should be referenced from the MPEEA page and the relevant service pages.

### D — Older Persons (Care and Protection) Act 2026 — monitor for assent

The Bill completed Senate debate in early May 2026. Once the Act receives assent and a commencement date, the MPEEA page should reference the new statutory framework, and the `/report-elderly-abuse` service page should be updated to reference the Act rather than the National Assistance Board.

---

## Sources cited

- [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care)
- [gov.bb — Permanent Secretaries and Related Grades](https://www.gov.bb/government/ps-related-grades)
- [gov.bb — Bureau of Gender Affairs](https://www.gov.bb/Departments/gender-affairs)
- [gov.bb — Bureau of Social Policy, Research and Planning](https://www.gov.bb/State-Bodies/social-policy-research-planning)
- [gov.bb — Poverty Alleviation Bureau](https://www.gov.bb/State-Bodies/poverty-alleviation)
- [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Barbados Today — Forde unveils sweeping rules for elderly care facilities (22 Apr 2026)](https://barbadostoday.bb/2026/04/22/forde-unveils-sweeping-rules-for-elderly-care-facilities/)
- [Barbados Today — SEA launched: Islandwide overhaul of social services begins (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/)
- [Barbados Today — Govt opens second SEA social services centre (27 Mar 2026)](https://barbadostoday.bb/2026/03/27/govt-opens-second-sea-social-services-centre/)
- [Barbados Today — Independent senators warn of gaps in elder care reforms (7 May 2026)](https://barbadostoday.bb/2026/05/07/independent-senators-warn-of-gaps-in-elder-care-reforms/)
- [Barbados Today — Opposition senator criticises 'vague drafting' in new Older Persons Bill (6 May 2026)](https://barbadostoday.bb/2026/05/06/opposition-senator-criticises-vague-drafting-in-new-older-persons-bill/)
- [Barbados Today — King laments values erosion, urges 'humanity' in elder care law (7 May 2026)](https://barbadostoday.bb/2026/05/07/king-laments-values-erosion-urges-humanity-in-elder-care-law/)
- [Caribbean News Global — Barbados launches SEA (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/)
- [CBC — BARP welcomes Older Persons Bill and calls for enforcement (24 Apr 2026)](https://www.cbc.bb/main-stories/barp-welcomes-older-persons-bill-and-calls-for-enforcement/)
- [Community Development Department — comdev.gov.bb](https://comdev.gov.bb/)
- [Ministry of Youth, Sports and Community Empowerment — mysce.gov.bb](https://www.mysce.gov.bb/)
- [socialcare.gov.bb — non-functional](http://www.socialcare.gov.bb/) — ECONNREFUSED on 2026-05-28 and 2026-05-29
- [socialempowermentbb.org — SEA website (pre-launch)](https://socialempowermentbb.org/) — ECONNREFUSED on 2026-05-29
- [alpha.gov.bb/apply-financial-assistance](https://alpha.gov.bb/apply-financial-assistance) — live
- [alpha.gov.bb/welfare-department](https://alpha.gov.bb/welfare-department) — live (stale content)
- [alpha.gov.bb/report-elderly-abuse](https://alpha.gov.bb/report-elderly-abuse) — live (stale content)
- [alpha.gov.bb/report-a-concern-about-a-child](https://alpha.gov.bb/report-a-concern-about-a-child) — live (stale content)
- [alpha.gov.bb/get-support-for-a-victim-of-domestic-abuse](https://alpha.gov.bb/get-support-for-a-victim-of-domestic-abuse) — live
- [alpha.gov.bb/get-disaster-relief-assistance](https://alpha.gov.bb/get-disaster-relief-assistance) — live (stale content)
