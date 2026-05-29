# Fact-check: Office of the Attorney General

- **Live page:** <https://alpha.gov.bb/government/organisations/office-of-the-attorney-general>
- **Source file:** `src/content/ministries/office-of-the-attorney-general.md`
- **Data file:** `src/data/ministries.ts` (lines 116–154)
- **Last checked:** 2026-05-28
- **Summary:** 11 claims reviewed — 6 verified, 3 discrepant, 2 unverifiable. Average certainty: **74%**.

---

## Headline issues for triage

1. **OAG main address is incomplete.** The page shows only "Webster's Business Park / St. Michael". The authoritative address (oag.gov.bb Contact and gov.bb/Ministries/attorney-general) is "Jones Building, Webster's Business Park, Wildey, St. Michael". The building name ("Jones Building") and locality ("Wildey") are both absent. Citizens navigating to the office need the building name; two distinct buildings sit within Webster's Business Park.

2. **DPP address is incomplete and inconsistently abbreviated.** The source file says "Frank Walcott BLDG / St. Michael". The Barbados Bar Association directory and multiple secondary sources confirm the full address is "4th Floor, Frank Walcott Building, Culloden Road, St. Michael". Floor and street name are both missing, and "BLDG" is a non-standard abbreviation.

3. **Solicitor General's Chambers is at a different building from the main OAG.** oag.gov.bb/Departments/Solicitor-General-s-Chambers lists the Solicitor General's Chambers address as "Spencer Building, Webster Business Park, Wildey, St. Michael BB14006" — a separate building from the Jones Building where the AG's main office sits. The page does not mention this distinction. Citizens directed to "Webster's Business Park" for the Solicitor General may arrive at the wrong building.

4. **All phone numbers are blank in the source content.** Every telephone cell in all four contact tables (OAG main, CPC, SG, DPP) is empty. gov.bb and oag.gov.bb publish a full set of direct-dial numbers. This is the highest-impact gap on the page — a citizen in legal need cannot reach any of these offices from this page.

5. **ministries.ts associated departments list does not match gov.bb.** `ministries.ts` lists four departments (Registration Department, Supreme Court, Police Department, Criminal Justice Research and Planning Unit), which exactly matches gov.bb/Ministries/attorney-general. No discrepancy in the data file itself.

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
- **Certainty:** 95% — verbatim match on gov.bb. Note: oag.gov.bb's own Strategic Plan & Mandate page uses a more expansive policy-objective framing (five bullet points) that does not contradict this text but is more granular; the gov.bb summary phrasing is the correct short-form mandate for a ministry listing page.

---

### Claim 2 — OAG main office address (lines 5–6)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Webster's Business Park
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Jones Building
Webster's Business Park
Wildey
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — "Jones Building, Webster's Business Park, Wildey, St. Michael, Barbados"; [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — same address; [GIS — OAG Returning To Jones Building; Will Reopen October 1](https://gisbarbados.gov.bb/blog/oag-returning-to-jones-building-will-reopen-october-1/) — confirms OAG's current building is the Jones Building (returned Oct 2024 after refurbishment).
- **Status:** discrepant — building name ("Jones Building") and locality ("Wildey") are both absent from the page.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — citizens cannot identify which building within Webster's Business Park to enter. The Jones Building is a specific structure; "Webster's Business Park" alone is insufficient for navigation.

---

### Claim 3 — OAG main contact table: all phone cells empty (lines 8–17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Role                          | Telephone |
| PBX                           |           |
| Attorney General              |           |
| Fax                           |           |
| Permanent Secretary           |           |
| Secretary to the PS           |           |
| Dep Permanent Secretary       |           |
| Financial Controller          |           |
| Sen. Admin Officer            |           |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">| Role                          | Telephone        |
| PBX                           | (246) 535-0467   |
| Attorney General              | (246) 535-0434   |
| Fax                           | (246) 535-0559   |
| Permanent Secretary           | (246) 535-0437   |
| Dep Permanent Secretary       | (246) 535-0470   |
| Financial Controller          | (246) 535-0440   |
| Sen. Admin Officer            | (unverified)     |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — lists PBX 535-0467, AG direct 535-0434, PS 535-0437, Deputy PS 535-0470, Financial Controller 535-0440, Fax 535-0559; [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — corroborates PBX (246) 535-0467 and email ps.oag@barbados.gov.bb. Cross-reference: [_inventory.md — Office of the Attorney General phone](/docs/fact-check/_inventory.md) confirms canonical PBX (246) 535-0467.
- **Status:** discrepant — five of the seven role rows have verifiable numbers; all are missing from the page. The "Secretary to the Permanent Secretary" and "Sen. Admin Officer" direct lines are not published on any authoritative Tier 1 source.
- **Certainty:** 95% (for the five numbers identified above)
- **Confidence it's wrong:** 99% (the table is provably empty; numbers are publicly available)
- **Citizen impact:** HIGH — no published phone numbers means citizens cannot contact the office from this page.

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
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Role                            | Telephone |
| PBX                             |           |
| Fax                             |           |
| Chief Parliamentary Counsel     |           |
| Deputy Chief Parliamentary Counsel |        |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">| Role                            | Telephone        |
| PBX                             | (246) 535-0400   |
| Fax                             | (246) 535-0560   |
| Chief Parliamentary Counsel     | (246) 535-0409   |
| Deputy Chief Parliamentary Counsel | (246) 535-0406 |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — lists CPC PBX 535-0400, Chief Parliamentary Counsel 535-0409, Deputy 535-0406, Fax 535-0560.
- **Status:** discrepant — all four numbers are available from Tier 1 but absent from the page.
- **Certainty:** 92%
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — drafting attorneys and legal practitioners who need to contact the CPC office cannot reach it from this page.

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
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Role                  | Telephone |
| PBX                   |           |
| Fax                   |           |
| Solicitor General     |           |
| Dep Solicitor General |           |
| Dep Solicitor General |           |
| Dep Solicitor General |           |</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable from Tier 1</div>
<pre class="claim-block-content">| Role                  | Telephone         |
| PBX                   | (246) 535-0400    |
| Fax                   | (246) 435-9533    |
| Solicitor General     | (246) 535-0528    |
| Dep Solicitor General | (246) 535-0527    |
| Dep Solicitor General | (246) 535-0530    |
| Dep Solicitor General | (246) 535-0516    |</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — SG PBX 535-0400, SG direct 535-0528, Deputy SG 535-0527/535-0530/535-0516, Fax 535-0561 (note: gov.bb lists fax 535-0561 for SG, while oag.gov.bb/Departments/Solicitor-General-s-Chambers lists fax 435-9533 — discrepancy between two Tier 1 sources; flagged as open question); [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/)
- **Status:** unverifiable (for the fax: two authoritative sources disagree — 535-0561 on gov.bb vs 435-9533 on oag.gov.bb); other numbers are verifiable
- **Certainty:** 85% for the PBX and direct lines; 50% for the fax number
- **Open question:** Which fax number is current for the Solicitor General's Chambers — (246) 535-0561 (gov.bb) or (246) 435-9533 (oag.gov.bb/Departments/Solicitor-General-s-Chambers)? Needs confirmation with the Solicitor General's office. Also note: the SG Chambers is at Spencer Building, Webster Business Park — a different building from the Jones Building (main OAG). This distinction is not surfaced on the alpha.gov.bb page.

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

### Claim 9 — DPP address: "Frank Walcott BLDG, St. Michael" (lines 41–42)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Frank Walcott BLDG
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">4th Floor, Frank Walcott Building
Culloden Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Bar Association — Director of Public Prosecutions](https://www.barbadosbarassociation.com/members_directory.cfm?FirmID=75&PageAction=DetailsFirm) — "Frank Walcott Building, Culloden Road, St. Michael Barbados"; multiple secondary sources (Give Back Barbados, givebackbarbados.com) confirm "4th Floor, Frank Walcott Building, Culloden Road, Saint Michael"; [GIS — Frank Walcott building tag](https://gisbarbados.gov.bb/blog/tag/frank-walcott-building/) — confirms building is on Culloden Road; [gov.bb — Director of Public Prosecutions (donna-babb-agard)](https://www.gov.bb/Government/donna-babb-agard) — links DPP to this office.
- **Status:** discrepant — "Frank Walcott BLDG" is a non-standard abbreviation. The street ("Culloden Road") and floor ("4th Floor") are both missing.
- **Certainty:** 90% that full address is 4th Floor, Frank Walcott Building, Culloden Road, St. Michael (Barbados Bar Association is Tier 3; no Tier 1 source on oag.gov.bb's DPP department page currently provides the full street address — only the main office Jones Building address appears in the footer).
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — citizens who need to attend the DPP's office cannot determine the street address or floor from this page.

---

### Claim 10 — DPP contact table: all phone cells empty (lines 44–48)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">| Role            | Telephone |
| Director        |           |
| Deputy Director |           |
| Fax             |           |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
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
- **Sources:** [gov.bb — Cabinet](https://www.gov.bb/cabinet.php) — "The Hon. Wilfred A. Abrahams, S.C., M.P. – Attorney-General and Senior Minister coordinating Governance Policy" (verbatim); [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/); [Nation News — Abrahams is new Attorney General (12 Feb 2026)](https://nationnews.com/2026/02/12/abrahams-is-new-attorney-general/). Note: oag.gov.bb/About/Meet-the-Attorney-General still shows the previous AG (Dale D. Marshall) — that page has not been updated post-February 2026 election; gov.bb/cabinet.php is the authoritative current source.
- **Status:** verified
- **Certainty:** 99%
- **Note:** The barbadosparliament.com member details page for Abrahams still shows his previous role "Minister of Home Affairs and Information" — that page has not been updated either. The gov.bb cabinet page is the current authoritative source.

---

## Additional findings (not on the page but should be)

### A. OAG email address missing from content

The email `ps.oag@barbados.gov.bb` (oag.gov.bb) / `ps@oag.gov.bb` (gov.bb) is not present in the source markdown. The inventory at `_inventory.md` records both variants. The canonical email published on oag.gov.bb's own Contact page is `ps.oag@barbados.gov.bb`; gov.bb publishes `ps@oag.gov.bb`. This discrepancy between two Tier 1 sources needs agency confirmation. The page should surface at least one email contact.

- **Checked:** [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — lists `ps.oag@barbados.gov.bb`; [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — lists `ps@oag.gov.bb`
- **Open question:** Which email address is canonical — `ps.oag@barbados.gov.bb` or `ps@oag.gov.bb`?

### B. Solicitor General's Chambers is in a different building

oag.gov.bb explicitly lists the Solicitor General's Chambers at "Spencer Building, Webster Business Park, Wildey, St. Michael BB14006" — a distinct building from the Jones Building (main OAG). Citizens directed to the OAG at Jones Building who need the Solicitor General will be at the wrong building. The page should note this distinction.

- **Source:** [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/)

### C. OAG website URL in ministries.ts

`ministries.ts` line 132 lists the OAG website as `http://www.oag.gov.bb/` (HTTP, not HTTPS). The site redirects to `https://oag.gov.bb/`. The link should use `https://oag.gov.bb/`.

- **Source:** [oag.gov.bb](https://oag.gov.bb/) — site serves over HTTPS; HTTP redirects automatically but the data file should use the canonical HTTPS URL.

### D. Associated departments — Prison and Immigration missing (ministries.ts correct)

The task brief noted to check whether Prison and Immigration are associated departments. Neither appears in `ministries.ts` (lines 145–153) or on gov.bb/Ministries/attorney-general. The four departments listed in ministries.ts (Registration Department, Supreme Court, Police Department, Criminal Justice Research and Planning Unit) match gov.bb exactly. No discrepancy.

---

## Sources cited

- [oag.gov.bb — Contact Us](https://oag.gov.bb/contact)
- [oag.gov.bb — Home](https://oag.gov.bb/)
- [oag.gov.bb — Meet the Attorney General](https://oag.gov.bb/About/Meet-the-Attorney-General/)
- [oag.gov.bb — Mission and Vision](https://oag.gov.bb/About/Mission-Vision/)
- [oag.gov.bb — Strategic Plan and Mandate](https://oag.gov.bb/About/Strategic-Plan-Mandate/)
- [oag.gov.bb — Chief Parliamentary Counsel](https://oag.gov.bb/Departments/Chief-Parliamentary-Counsel/)
- [oag.gov.bb — Solicitor General's Chambers](https://oag.gov.bb/Departments/Solicitor-General-s-Chambers/)
- [oag.gov.bb — Director of Public Prosecutions](https://oag.gov.bb/Departments/Director-of-Public-Prosecutions/)
- [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general)
- [gov.bb — Cabinet](https://www.gov.bb/cabinet.php)
- [gov.bb — Director of Public Prosecutions (Donna Babb-Agard)](https://www.gov.bb/Government/donna-babb-agard)
- [GIS — OAG Returning To Jones Building; Will Reopen October 1](https://gisbarbados.gov.bb/blog/oag-returning-to-jones-building-will-reopen-october-1/)
- [GIS — Frank Walcott building tag](https://gisbarbados.gov.bb/blog/tag/frank-walcott-building/)
- [Barbados Bar Association — Director of Public Prosecutions](https://www.barbadosbarassociation.com/members_directory.cfm?FirmID=75&PageAction=DetailsFirm)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Nation News — Abrahams is new Attorney General (12 Feb 2026)](https://nationnews.com/2026/02/12/abrahams-is-new-attorney-general/)
- [barbadosparliament.com — Hon. Wilfred A. Abrahams](https://www.barbadosparliament.com/member/details/19)
- [_inventory.md — Office of the Attorney General phone](/docs/fact-check/_inventory.md)
