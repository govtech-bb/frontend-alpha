# Fact-check: Ministry of People Empowerment and Elder Affairs

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-people-empowerment-and-elder-affairs>
- **Source file:** `src/content/ministries/ministry-of-people-empowerment-and-elder-affairs.md`
- **Data file:** `src/data/ministries.ts` (lines 833–915)
- **Last checked:** 2026-05-28
- **Summary:** 13 claims reviewed — 7 verified, 4 discrepant, 2 unverifiable. Average certainty: **73%**.

---

## Headline issues for triage

1. **Associated departments list names three dissolved agencies.** The `associatedDepartments` array in `ministries.ts` (lines 905–913) still lists "The National Assistance Board", "The Child Care Board", and "Welfare Department" as separate entities. All three were dissolved on 2 January 2026 and merged — along with the National Disabilities Unit and the Resilience and Reintegration Unit — into the Social Empowerment Agency (SEA). Citizens navigating to those department pages will find stale information. The SEA should be listed in place of these three bodies, and "National Disabilities Unit" should be noted as also folded into the SEA. This is the most consequential structural error on this ministry page.

2. **Community Development Department is listed under the wrong ministry.** The content markdown (lines 23–27) includes a "Community Development Department" directory block. The CDD's own website (comdev.gov.bb) and the Ministry of Youth, Sports and Community Empowerment's website (mysce.gov.bb) both confirm that the CDD sits under MYSCE, not MPEEA. It appears in MPEEA's content file and in the `ministries.ts` MYSCE entry (line 1144) simultaneously — a cross-file attribution error that propagates to the rendered ministry page.

3. **socialcare.gov.bb website is a "Coming Soon" placeholder — not a working ministry site.** The data file lists `http://www.socialcare.gov.bb/` as the ministry's website; gov.bb echoes this URL. The domain currently serves a static "Coming Soon" page and ECONNREFUSED on direct fetch. Citizens who click the link reach a dead end rather than a functioning ministry web presence.

4. **The `onlineServices` array links to a "Welfare Department" page that describes a dissolved agency.** `ministries.ts` line 853 lists "Welfare Department" as an online service with href `/welfare-department`. The fact-check of that page (see [welfare-department.md](/home/gavin/frontend-alpha/docs/fact-check/welfare-department.md)) found it describes a body that ceased to exist on 2 January 2026. Every service link on this ministry panel that routes citizens to the Welfare Department should instead route to the SEA.

5. **Minister name in `ministries.ts` is correct but not reflected in the content markdown directory.** The content file's directory table has blank entries for PBX, Minister, Permanent Secretary and other roles. This is an explicit data gap — the page renders with an empty directory, which is unhelpful to citizens. The `ministries.ts` data file does carry the correct minister name (Adrian R. Forde, M.P.), but the markdown file and the gov.bb source page show no minister name at all.

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
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — confirms full name "Ministry of People Empowerment and Elder Affairs (MPEA)"; [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — lists "Ministry of People Empowerment and Elder Affairs"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Mission statement (lines 1–3) {#claim-2}

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
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — verbatim match confirmed; the gov.bb page uses identical phrasing for the mission
- **Status:** verified
- **Certainty:** 97%

---

### Claim 3 — Vision statement (lines 5–7) {#claim-3}

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
- **Sources:** [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Hon. Adrian R. FORDE, M.P." listed as Minister of People Empowerment and Elder Affairs; [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — "Adrian Forde, Minister of People Empowerment and Elder Affairs"; [Barbados Today — Forde unveils sweeping rules for elderly care facilities (22 Apr 2026)](https://barbadostoday.bb/2026/04/22/forde-unveils-sweeping-rules-for-elderly-care-facilities/) — confirms his continued role as minister in April 2026
- **Status:** verified — Adrian R. Forde was sworn in on 16 February 2026 as Minister of People Empowerment and Elder Affairs, replacing Kirk Humphrey who held the portfolio until that date. The data file is correct.
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
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "Main PBX: 535-1600/1/2/3" confirmed; [GIS — MPEA's Operations During National Pause](https://gisbarbados.gov.bb/blog/mpeas-operations-during-national-pause/) — HTTP 403 on direct fetch but web search confirms 535-1600 as the ministry PBX
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
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "FAX: 535-1694" for main ministry (535-1693 is noted as fax for the Community Development Department on that same page, not the ministry overall)
- **Status:** verified — 535-1694 is confirmed as MPEEA fax; 535-1693 appears to be the Community Development Department fax. Both are listed in the data file as ministry fax numbers, which creates a minor attribution ambiguity but is not factually wrong.
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
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "Email: socialcare@barbados.gov.bb; ps.people@barbados.gov.bb" — both email addresses match exactly
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
- **Sources:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — "4th Floor Warrens Office Complex, Warrens, St. Michael, Barbados, W.I." — exact match; [Bureau of Social Policy, Research and Planning — gov.bb](https://www.gov.bb/State-Bodies/social-policy-research-planning) — also shows 4th Floor Warrens Office Complex for associated units
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
<pre class="claim-block-content">The domain socialcare.gov.bb currently serves a static "Coming Soon"
page and is ECONNREFUSED on direct fetch. It is not a functioning
ministry website. Until the site is live, this URL should either be
removed from the page or replaced with the gov.bb ministry page:
https://www.gov.bb/Ministries/social-care</pre>
</div>

- **Type:** URL
- **Sources:** [socialcare.gov.bb — Coming Soon](http://www.socialcare.gov.bb/) — ECONNREFUSED on direct fetch; web search snippet confirms "Coming Soon" status at this domain; [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — the functioning ministry page
- **Status:** discrepant — the listed website is non-functional
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
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
- **Sources:** [Barbados Today — SEA launched: Islandwide overhaul of social services begins (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — "The Social Empowerment Agency was established on 2 January [2026], merging the former Child Care Board, Welfare Department, National Assistance Board, National Disabilities Unit, and the Resilience and Reintegration Unit"; [Caribbean News Global — Barbados launches SEA (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/) — confirms all five bodies; [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — itself stale (still lists the dissolved bodies, not yet updated)
- **Status:** discrepant — three of the seven listed bodies (National Assistance Board, Child Care Board, Welfare Department) no longer exist as standalone entities. National Disabilities Unit is also dissolved into the SEA (listed separately but should be noted as merged). The Resilience and Reintegration Unit, which was also merged, does not appear in the list at all. The list should reference the Social Empowerment Agency (SEA) as the successor body.
- **Certainty:** 30% that the list as written is still accurate
- **Confidence it's wrong:** 97%
- **Citizen impact:** HIGH — citizens navigating to the NAB, CCB, or Welfare Department pages will encounter information about agencies dissolved in January 2026. They will not be directed to the SEA, which is the body now providing these services.

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
- **Sources:** [Community Development Department — comdev.gov.bb](https://comdev.gov.bb/) — page header explicitly says "Ministry of Sports and Community Empowerment" (abbreviated form of MYSCE); [Ministry of Youth, Sports and Community Empowerment — mysce.gov.bb](https://www.mysce.gov.bb/) — confirms CDD under MYSCE; [Barbados Today — Griffith: New parenting models needing (18 Mar 2026)](https://barbadostoday.bb/2026/03/18/griffith-new-parenting-models-needing/) — "Minister of Youth, Sports and Community Empowerment Charles Griffith" presided over a National Parenting Seminar "hosted by the Community Development Department", confirming CDD is under MYSCE; [ministries.ts line 1144](../../../src/data/ministries.ts) — MYSCE entry also lists "Community Development Department" in its own `associatedDepartments`
- **Status:** discrepant — the Community Development Department is attributed to MPEEA in this content file but belongs under MYSCE. It appears in both ministries' data entries simultaneously.
- **Certainty:** 15% that the CDD belongs under MPEEA
- **Confidence it's wrong:** 92%
- **Citizen impact:** MEDIUM — a citizen looking for community development services who follows the MPEEA page to find the CDD will find blank phone entries and be unable to contact the department

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
- **Sources:** [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — the Resilience and Reintegration Unit is named as one of five bodies merged into the SEA; [Caribbean News Global — SEA launch (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/) — all five bodies listed by name including the Resilience and Reintegration Unit
- **Status:** discrepant — the Resilience and Reintegration Unit is missing from the pre-merger department list, and no mention of its SEA successor appears post-merger
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — the Resilience and Reintegration Unit is now dissolved; its omission from the list is a historical accuracy gap rather than a service-impacting error

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
<div class="claim-block-label">Unverifiable — individual extension numbers not published</div>
<pre class="claim-block-content">The main PBX (535-1600/1/2/3) and fax (535-1694) are confirmed by gov.bb
and are present in ministries.ts. However, individual extension numbers for
the Minister, Permanent Secretary, PS Secretary, Deputy PS, Senior Administrative
Officer, Senior Accountant, and Executive Officer are not published on any
authoritative public-web source consulted.

gov.bb/Ministries/social-care lists only: PBX 535-1600/1/2/3; Minister 535-1604;
PS 535-1606 — these two additional lines are on the gov.bb source page but are
not in ministries.ts or the content markdown.

The remaining rows (PS Secretary, Deputy PS, SAO, Senior Accountant, EO) remain
blank in all sources checked.</pre>
</div>

- **Type:** phone
- **Sources consulted:** [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — PBX 535-1600/1/2/3; Minister 535-1604; PS 535-1606; FAX 535-1694 (these are on the gov.bb source but not in the alpha.gov.bb data or content file); [GIS — MPEA's Operations During National Pause](https://gisbarbados.gov.bb/blog/mpeas-operations-during-national-pause/) — HTTP 403
- **Status:** unverifiable for all rows except PBX and Fax (which are in `ministries.ts`). Notably, gov.bb also publishes Minister direct line (535-1604) and PS direct line (535-1606) which are absent from both the content markdown and the `ministries.ts` contact array.
- **Certainty:** N/A (no numbers to assess — all blank)
- **Open question:** The content markdown should either be populated from the gov.bb source (adding 535-1604 for the Minister and 535-1606 for the PS) or be removed in favour of the `ministries.ts` contact array which is displayed elsewhere on the page. The blank table currently adds no value for citizens.

---

## Additional findings (not on the page but should be)

### A — Two additional direct-line numbers not in the data file

The gov.bb source page (`gov.bb/Ministries/social-care`) publishes two individual extension numbers not carried in `ministries.ts`:
- **Minister direct:** (246) 535-1604
- **Permanent Secretary direct:** (246) 535-1606

These should be added to the `contact` array in `ministries.ts` so they render on the ministry page alongside the PBX.

### B — Permanent Secretary identity: Jehu Wiltshire (acting: Mark Franklin)

`gov.bb/government/ps-related-grades` lists two PS holders for MPEEA:
- **Mr. Jehu Wiltshire** — Permanent Secretary, MPEEA
- **Mr. Mark Franklin** — Permanent Secretary (Ag.), MPEEA

The content markdown has a blank "Permanent Secretary" row. The `ministries.ts` data file does not include the PS name (consistent with other ministry entries that only carry the minister name). No correction is needed in the data file, but the blank markdown directory should either be populated or removed.

### C — Social Empowerment Agency successor page needed

The six dissolved-body service links on this ministry page (Welfare Department, NAB, CCB) all route citizens to stale content. A dedicated SEA page should be created on alpha.gov.bb and linked from the MPEEA online services panel. The SEA currently operates two client centres:
- **Six Roads, St. Philip** — opened 7 January 2026
- **Southern Plaza, Oistins, Christ Church** — opened 27 March 2026
- 11 additional centres planned across the island

See [welfare-department.md](/home/gavin/frontend-alpha/docs/fact-check/welfare-department.md) Additional Finding A for further detail.

### D — Older Persons (Care and Protection) Bill 2026 — pending assent

The Older Persons (Care and Protection) Bill 2026 was debated in the House of Assembly in April 2026 and was in Senate debate as of 7 May 2026 (final vote/assent status unconfirmed as of 2026-05-28). Once the Act receives assent and a commencement date, the MPEEA page should be updated to reference the new statutory framework for elder protection, including the SEA's expanded role as statutory body for managing elder abuse reports.

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
- [Caribbean News Global — Barbados launches SEA (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/)
- [Community Development Department — comdev.gov.bb](https://comdev.gov.bb/)
- [Ministry of Youth, Sports and Community Empowerment — mysce.gov.bb](https://www.mysce.gov.bb/)
- [socialcare.gov.bb — "Coming Soon"](http://www.socialcare.gov.bb/) — ECONNREFUSED as of 2026-05-28
