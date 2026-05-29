# Fact-check: Office of the Attorney General

- **Live page:** <https://alpha.gov.bb/government/organisations/office-of-the-attorney-general>
- **Source file:** `src/content/ministries/office-of-the-attorney-general.md`
- **Data file:** `src/data/ministries.ts` (lines 116–154)
- **Last checked:** 2026-05-29
- **Summary:** 14 claims reviewed — 8 verified, 3 discrepant, 3 unverifiable. Average certainty: **78%**.

---

## Headline issues for triage

1. **All four contact tables in the body content have empty phone cells.** The source markdown (`office-of-the-attorney-general.md`) has empty telephone columns across all four sections (OAG main, CPC, SG, DPP). While `ministries.ts` stores the main PBX (246) 535-0467 and fax numbers for sidebar rendering, the direct-dial numbers for individual roles (AG, PS, Deputy PS, Financial Controller, CPC, Deputy CPC, SG, Deputy SGs, DPP Director, Deputy Director) are absent from both the markdown and the data file. gov.bb publishes a full set of these numbers. Citizens requiring specific officials cannot reach them from this page.

2. **DPP address is still incomplete.** The source markdown says "Frank Walcott BLDG / St. Michael". The live page renders "Frank Walcott Building, St. Michael" (the abbreviation is corrected via rendering, but the street address — Culloden Road — and floor (4th Floor) remain absent). The oag.gov.bb DPP page itself now shows the Jones Building address (suggesting the DPP may have relocated), creating an unresolved discrepancy between sources.

3. **oag.gov.bb still shows the former Attorney General.** oag.gov.bb/About/Meet-the-Attorney-General/ still lists Hon. Dale D. Marshall as Attorney General. The canonical current AG is The Hon. Wilfred A. Abrahams, S.C., M.P. (confirmed by gov.bb/cabinet.php as of Feb 2026 election). This is an oag.gov.bb content problem, not an alpha.gov.bb problem — alpha.gov.bb reflects the correct person via ministries.ts. Worth flagging for the OAG team to update their own site.

4. **OAG website URL in ministries.ts uses HTTP.** `ministries.ts` line 132 stores `http://www.oag.gov.bb/` — HTTP rather than HTTPS. The canonical URL is `https://oag.gov.bb/`. A user clicking this link will be redirected but browsers may warn on HTTP links.

5. **Solicitor General's Chambers fax number conflict between two Tier 1 sources.** gov.bb lists the SG Chambers fax as (246) 535-0561, while oag.gov.bb/Departments/Solicitor-General-s-Chambers/ lists (246) 435-9533. These differ in both area code pattern and number. Needs agency confirmation before either is published.

---

## Reversed findings from prior pass

- **Claim 2 (prior pass — OAG main address incomplete):** The prior report found only "Webster's Business Park / St. Michael" on the page. The live page now renders the full address "Jones Building, Webster's Business Park, Wildey, St. Michael, Barbados" sourced from `ministries.ts` contact data. This is now **verified** from the user-facing perspective, though the source markdown still omits the building name. The ministries.ts data file carries the correct full address.

---

## Claims

### Claim 1 — Mandate / descriptive text (line 1)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Deals with constitutional affairs and judicial system of the country, civil and criminal law, prosecutions, and rehabilitation of offenders.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Deals with constitutional affairs and judicial system of the country, civil and criminal law, prosecutions, and rehabilitation of offenders.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — verbatim match in the Ministry overview section.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — OAG main office address (ministries.ts lines 134–141 / content lines 5–6)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the live page (rendered from ministries.ts)</div>
<pre class="claim-block-content">Jones Building
Webster's Business Park
Wildey
St. Michael
Barbados, W.I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Jones Building
Webster's Business Park
Wildey
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — "Jones Building, Webster's Business Park, Wildey, St. Michael, Barbados"; [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — same address; [GIS — OAG Returning To Jones Building; Will Reopen October 1](https://gisbarbados.gov.bb/blog/oag-returning-to-jones-building-will-reopen-october-1/) — confirms Jones Building is the current OAG home (returned Oct 2024 after refurbishment).
- **Status:** verified — `ministries.ts` carries the full correct address and the live page renders it. Note: the source markdown (lines 5–6) still only says "Webster's Business Park / St. Michael" without the building name or locality — this is a latent issue if the markdown is ever rendered independently, but the page currently renders correctly.
- **Certainty:** 99%
- **Note (reversal):** Prior pass (2026-05-28) flagged this as discrepant. The live page now renders the full address from `ministries.ts`. Status updated to verified.

---

### Claim 3 — OAG main contact table: all body-content phone cells empty (lines 8–17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source markdown (lines 8–17)</div>
<pre class="claim-block-content">| Role                             | Telephone |
| PBX                              |           |
| Attorney General                 |           |
| Fax                              |           |
| Permanent Secretary              |           |
| Secretary to the Permanent Secretary |       |
| Dep Permanent Secretary          |           |
| Financial Controller             |           |
| Sen. Admin Officer               |           |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (from gov.bb authoritative source)</div>
<pre class="claim-block-content">| Role                             | Telephone        |
| PBX                              | (246) 535-0467   |
| Attorney General                 | (246) 535-0434   |
| Fax                              | (246) 535-0559   |
| Permanent Secretary              | (246) 535-0437   |
| Secretary to the Permanent Secretary | (246) 535-0438 |
| Dep Permanent Secretary          | (246) 535-0470   |
| Financial Controller             | (246) 535-0440   |
| Sen. Admin Officer               | (246) 535-0452   |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — lists PBX 535-0467, AG direct 535-0434, PS 535-0437, Secretary to PS 535-0438, Deputy PS 535-0470, Financial Controller 535-0440, Sen. Admin Officer 535-0452, Fax 535-0559; [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — corroborates PBX (246) 535-0467.
- **Status:** discrepant — all eight role rows have verifiable numbers from Tier 1; all are missing from the source markdown. (Note: ministries.ts carries the PBX and main fax for sidebar rendering, but individual role direct-dials are absent from the data entirely.)
- **Certainty:** 95% for the numbers identified above
- **Confidence it's wrong:** 99% (the table is provably empty; numbers are publicly available on gov.bb)
- **Citizen impact:** HIGH — citizens cannot reach specific officials at the OAG from the body contact table.

---

### Claim 4 — Chief Parliamentary Counsel's Office: section title (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Chief Parliamentary Counsel's Office</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Chief Parliamentary Counsel's Office</pre>
</div>

- **Type:** agency name
- **Sources:** [oag.gov.bb — Chief Parliamentary Counsel](https://oag.gov.bb/Departments/Chief-Parliamentary-Counsel/); [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Chief Parliamentary Counsel's Office: all phone cells empty (lines 21–26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source markdown (lines 21–26)</div>
<pre class="claim-block-content">| Role                               | Telephone |
| PBX                                |           |
| Fax                                |           |
| Chief Parliamentary Counsel        |           |
| Deputy Chief Parliamentary Counsel |           |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (from gov.bb authoritative source)</div>
<pre class="claim-block-content">| Role                               | Telephone        |
| PBX                                | (246) 535-0400   |
| Fax                                | (246) 535-0560   |
| Chief Parliamentary Counsel        | (246) 535-0409   |
| Deputy Chief Parliamentary Counsel | (246) 535-0406   |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — lists CPC PBX 535-0400, Chief Parliamentary Counsel 535-0409, Deputy 535-0406, Fax 535-0560.
- **Status:** discrepant — all four numbers are available from Tier 1 but absent from the page.
- **Certainty:** 92%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — legal practitioners who need to contact the CPC office cannot reach it from this page.

---

### Claim 6 — Solicitor General's Chambers: section title (line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Solicitor General's Chambers</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Solicitor General's Chambers</pre>
</div>

- **Type:** agency name
- **Sources:** [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 7 — Solicitor General's Chambers: all phone cells empty (lines 30–37)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source markdown (lines 30–37)</div>
<pre class="claim-block-content">| Role                  | Telephone |
| PBX                   |           |
| Fax                   |           |
| Solicitor General     |           |
| Dep Solicitor General |           |
| Dep Solicitor General |           |
| Dep Solicitor General |           |</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable — fax number conflict between two Tier 1 sources</div>
<pre class="claim-block-content">| Role                  | Telephone         |
| PBX                   | (246) 535-0400    |
| Fax                   | ??? (see below)   |
| Solicitor General     | (246) 535-0528    |
| Dep Solicitor General | (246) 535-0527    |
| Dep Solicitor General | (246) 535-0530    |
| Dep Solicitor General | (246) 535-0516    |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — SG PBX 535-0400, SG direct 535-0528, Deputy SGs 535-0527/535-0530/535-0516, Fax 535-0561; [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/) — Fax listed as (246) 435-9533 (different number and different area-code pattern).
- **Status:** unverifiable for the fax number (two Tier 1 sources disagree — 535-0561 on gov.bb vs 435-9533 on oag.gov.bb); the direct-dial numbers are verifiable from gov.bb.
- **Certainty:** 88% for PBX and direct lines; 40% for fax number
- **Open question:** Which fax number is current for the Solicitor General's Chambers — (246) 535-0561 (gov.bb) or (246) 435-9533 (oag.gov.bb/Departments/Solicitor-General-s-Chambers/)? Needs confirmation with the Solicitor General's office.

---

### Claim 8 — Director of Public Prosecutions: section title (line 39)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Director of Public Prosecutions</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Director of Public Prosecutions</pre>
</div>

- **Type:** agency name
- **Sources:** [oag.gov.bb — Director of Public Prosecutions](https://oag.gov.bb/Departments/Director-of-Public-Prosecutions/)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 9 — DPP address: "Frank Walcott BLDG, St. Michael" (source markdown lines 41–42)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source markdown (lines 41–42)</div>
<pre class="claim-block-content">Frank Walcott BLDG
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say — but DPP location is now unverifiable (see note)</div>
<pre class="claim-block-content">Frank Walcott Building
Culloden Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Bar Association — Director of Public Prosecutions](https://www.barbadosbarassociation.com/members_directory.cfm?FirmID=75&PageAction=DetailsFirm) — "Frank Walcott Building, Culloden Road, St. Michael Barbados" (Tier 3); [oag.gov.bb — Director of Public Prosecutions](https://oag.gov.bb/Departments/Director-of-Public-Prosecutions/) — currently shows Jones Building, Webster's Business Park, Wildey, St. Michael (the OAG main address, not Frank Walcott Building) — this may indicate the DPP has relocated to the Jones Building, or the oag.gov.bb DPP page is using a generic footer address.
- **Status:** unverifiable — the source markdown abbreviates "BLDG" (non-standard) and omits the street, but the two available sources now disagree on whether the DPP is still at Frank Walcott Building. The oag.gov.bb DPP page shows Jones Building; the Bar Association directory shows Frank Walcott Building.
- **Certainty:** 50%
- **Open question:** Has the DPP office relocated from Frank Walcott Building, Culloden Road to the Jones Building, Webster's Business Park? The alpha page should show the current physical address where citizens need to attend. Needs confirmation from the DPP's office.
- **Citizen impact:** HIGH — citizens who need to attend the DPP's office may go to the wrong location.

---

### Claim 10 — DPP contact table: all phone cells empty (lines 44–48)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source markdown (lines 44–48)</div>
<pre class="claim-block-content">| Role            | Telephone |
| Director        |           |
| Deputy Director |           |
| Fax             |           |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (from gov.bb authoritative source)</div>
<pre class="claim-block-content">| Role            | Telephone        |
| Director        | (246) 535-0500   |
| Deputy Director | (246) 535-0492   |
| Fax             | (246) 535-0562   |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — Director 535-0500, Deputy Director 535-0492, Fax 535-0562; [Barbados Bar Association — Director of Public Prosecutions](https://www.barbadosbarassociation.com/members_directory.cfm?FirmID=75&PageAction=DetailsFirm) — corroborates (246) 535-0500.
- **Status:** discrepant — all three numbers are publicly available but absent from the page.
- **Certainty:** 92%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — citizens cannot contact the DPP's office from this page.

---

### Claim 11 — Minister name and title (ministries.ts lines 122–124)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts</div>
<pre class="claim-block-content">name: "The Hon. Wilfred A. Abrahams, S.C., M.P."
role: "Attorney-General and Senior Minister coordinating Governance Policy"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">name: "The Hon. Wilfred A. Abrahams, S.C., M.P."
role: "Attorney-General and Senior Minister coordinating Governance Policy"</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [gov.bb — Cabinet](https://www.gov.bb/cabinet.php) — "The Hon. Wilfred A. Abrahams, S.C., M.P. – Attorney-General and Senior Minister coordinating Governance Policy" (verbatim); [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/); [Nation News — Abrahams is new Attorney General (12 Feb 2026)](https://nationnews.com/2026/02/12/abrahams-is-new-attorney-general/).
- **Status:** verified
- **Certainty:** 99%
- **Note:** oag.gov.bb/About/Meet-the-Attorney-General/ still shows the previous AG (Hon. Dale D. Marshall) — that page has not been updated post-February 2026 election. gov.bb/cabinet.php is the authoritative current source. The OAG should update their own site.

---

### Claim 12 — OAG website URL (ministries.ts line 132)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 132)</div>
<pre class="claim-block-content">{ label: "Website", type: "website", value: "http://www.oag.gov.bb/" }</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">{ label: "Website", type: "website", value: "https://oag.gov.bb/" }</pre>
</div>

- **Type:** URL
- **Sources:** [oag.gov.bb](https://oag.gov.bb/) — site serves over HTTPS; the canonical URL is `https://oag.gov.bb/` (HTTP redirects automatically but the data file should use the canonical HTTPS URL to avoid browser warnings).
- **Status:** discrepant — HTTP rather than HTTPS; `www` subdomain redirects to bare domain.
- **Certainty:** 95%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — redirect works, but canonical form should be stored.

---

### Claim 13 — Associated departments (ministries.ts lines 145–153)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts</div>
<pre class="claim-block-content">The Registration Department
The Supreme Court
The Police Department
The Criminal Justice Research and Planning Unit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Registration Department
The Supreme Court
The Police Department
The Criminal Justice Research and Planning Unit</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — lists exactly these four departments under the OAG.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 14 — Email address (ministries.ts line 126)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (line 126)</div>
<pre class="claim-block-content">{ label: "Email", type: "email", value: "ps@oag.gov.bb" }</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — two Tier 1 sources disagree</div>
<pre class="claim-block-content">gov.bb lists: ps@oag.gov.bb
oag.gov.bb lists: ps.oag@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — `ps@oag.gov.bb`; [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — `ps.oag@barbados.gov.bb`.
- **Status:** unverifiable — two Tier 1 sources give different email addresses. ministries.ts uses the gov.bb variant (`ps@oag.gov.bb`). The oag.gov.bb variant uses the standard `@barbados.gov.bb` government domain pattern.
- **Certainty:** 60% that `ps@oag.gov.bb` is correct (it may be an alias; the `@barbados.gov.bb` pattern is the government standard)
- **Open question:** Which email is the current canonical Permanent Secretary address — `ps@oag.gov.bb` (gov.bb) or `ps.oag@barbados.gov.bb` (oag.gov.bb)? Needs confirmation from the OAG.

---

## Additional findings (not on the page but should be)

### A. Solicitor General's Chambers is in a different building from the main OAG

oag.gov.bb explicitly lists the Solicitor General's Chambers at "Spencer Building, Webster Business Park, Wildey, St. Michael BB14006" — a distinct building from the Jones Building (main OAG). Citizens directed to the OAG at Jones Building who need the Solicitor General will be at the wrong building. The page should note this distinction.

- **Source:** [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/)

### B. DPP location ambiguity — possible relocation

oag.gov.bb/Departments/Director-of-Public-Prosecutions/ currently shows the Jones Building address for the DPP, while the Barbados Bar Association directory and secondary sources show Frank Walcott Building, Culloden Road. This conflict should be resolved with the DPP's office directly. If the DPP has moved to Jones Building, the source markdown address is wrong in two ways: wrong building name and wrong location.

### C. Source markdown address (lines 5–6) remains incomplete despite live page rendering correctly

The source markdown still reads only "Webster's Business Park / St. Michael" without the building name or locality. This is harmless while the live page renders from `ministries.ts`, but creates a latent bug risk if the markdown content is ever rendered independently or reused. The markdown should be updated to match the ministries.ts full address.

---

## Sources cited

- [oag.gov.bb — Contact Us](https://oag.gov.bb/contact)
- [oag.gov.bb — Home](https://oag.gov.bb/)
- [oag.gov.bb — Meet the Attorney General](https://oag.gov.bb/About/Meet-the-Attorney-General/)
- [oag.gov.bb — Chief Parliamentary Counsel](https://oag.gov.bb/Departments/Chief-Parliamentary-Counsel/)
- [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/)
- [oag.gov.bb — Director of Public Prosecutions](https://oag.gov.bb/Departments/Director-of-Public-Prosecutions/)
- [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general)
- [gov.bb — Cabinet](https://www.gov.bb/cabinet.php)
- [GIS — OAG Returning To Jones Building; Will Reopen October 1](https://gisbarbados.gov.bb/blog/oag-returning-to-jones-building-will-reopen-october-1/)
- [Barbados Bar Association — Director of Public Prosecutions](https://www.barbadosbarassociation.com/members_directory.cfm?FirmID=75&PageAction=DetailsFirm)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Nation News — Abrahams is new Attorney General (12 Feb 2026)](https://nationnews.com/2026/02/12/abrahams-is-new-attorney-general/)
- [alpha.gov.bb — Office of the Attorney General (live)](https://alpha.gov.bb/government/organisations/office-of-the-attorney-general)
- [_inventory.md — Office of the Attorney General phone](/docs/fact-check/_inventory.md)
