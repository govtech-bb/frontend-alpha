# Fact-check: Ministry of Transport, Works and Water Resources

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-transport-works-and-water-resources>
- **Source file:** `src/content/ministries/ministry-of-transport-works-and-water-resources.md`
- **Data file:** `src/data/ministries.ts` (lines 1043–1098)
- **Last checked:** 2026-05-29
- **Summary:** 17 claims reviewed — 14 verified, 1 discrepant, 2 unverifiable. Average certainty: **91%**.

---

## Headline issues for triage

1. **REVERSED — "Government building" no longer discrepant.** The previous pass (2026-05-28) flagged "Government building" (singular) in the mission statement as discrepant, citing mtw.gov.bb "buildings" (plural) as authoritative. On re-check (2026-05-29), gov.bb — the primary authoritative source — also uses the singular "building". The alpha page therefore matches both gov.bb and the source markdown. Only mtw.gov.bb uses the plural. Claim 1 status updated to **verified**. No fix required.

2. **Website URL stored as `http://www.mtw.gov.bb`.** The canonical form is `https://mtw.gov.bb/` (HTTPS, no www). The stored value uses an insecure scheme and a non-canonical www prefix. Browsers redirect transparently but the stored value should reflect the canonical form. (Persists from previous pass.)

3. **Temporary address not signposted on live page.** MTW's offices are currently at 2nd Floor, The Goddard Building, Haggatt Hall, St. Michael (confirmed on mtw.gov.bb/directory/). The alpha page shows only the permanent Pine address. Citizens visiting in person will find the ministry closed there.

4. **Transport Authority absent from associatedDepartments.** The ministry's own Objective 7 names "the Barbados Licensing Authority, the Transport Authority and private operators" in the same breath, yet only BLA and Transport Board appear in the data file's Transport category. The Transport Authority (ta.gov.bb) handles PSV permitting and route licensing — a distinct statutory body that citizens seeking conductor/PSV guidance would expect to find linked.

5. **Minister role title has minor punctuation difference vs gov.bb cabinet page.** ministries.ts stores "Minister of Transport and Works, and Senior Minister coordinating Infrastructure" (comma before "and"). The gov.bb/cabinet.php page shows "Minister of Transport and Works and Senior Minister coordinating Infrastructure" (no comma). The content is the same; this is a formatting question only. No citizen impact.

---

## Claims

### Claim 1 — Mission Statement: "Government building" (line 3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide efficient road network services, proper maintenance of Government building and vehicles, effective drainage solutions, special electrical services and public transportation.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To provide efficient road network services, proper maintenance of Government building and vehicles, effective drainage solutions, special electrical services and public transportation.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources) — gov.bb uses "Government building" (singular), matching the alpha page; [MTW About Us](https://mtw.gov.bb/about-us/) — mtw.gov.bb uses "Government buildings" (plural), diverging from gov.bb
- **Status:** verified — the alpha page matches gov.bb (the primary authoritative source). Only mtw.gov.bb uses the plural form. Previous pass incorrectly favoured mtw.gov.bb over gov.bb.
- **Certainty:** 90%
- **Note (reversal):** Claim 1 was marked discrepant in the 2026-05-28 pass. Re-verification against gov.bb confirms the singular "building" is the form used on the government portal. Status reversed to verified.

---

### Claim 2 — Vision Statement (lines 5–7)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To be the most efficient and innovative of such agencies among developing nations.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To be the most efficient and innovative of such agencies among developing nations.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [MTW About Us](https://mtw.gov.bb/about-us/)
- **Status:** verified — verbatim match on both authoritative sources
- **Certainty:** 98%

---

### Claim 3 — Objective 1: planning/policy advice (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide sound planning/policy advice and technical services in the areas of transport, works and electrical services.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To provide sound planning/policy advice and technical services in the areas of transport, works and electrical services.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources)
- **Status:** verified — verbatim match with gov.bb
- **Certainty:** 95%

---

### Claim 4 — Objective 2: well-regulated transport environment (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide a well regulated and competitive environment for the land transport industry.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To provide a well regulated and competitive environment for the land transport industry.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Objectives 3–12: remaining ten objectives (lines 15–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide an excellent and safe technology driven, modern and efficient public transportation system.
To provide a supply-driven integrated transport network infrastructure.
To maintain and rehabilitate highways, tenantry and residential roads and other public accesses.
To develop and maintain all government buildings, bridges, jetties and wharves and similar structures and other public assets.
To develop, maintain and regulate road transport and ancillary facilities conducted through the Barbados Licensing Authority, the Transport Authority and private operators and the provision of ancillary services.
To promote safety in all work relating to roads, public transport and electrical systems management.
To regulate the traffic system in conjunction with the police.
To support other Ministries and government agencies in the execution and implementation of projects.
To provide effective standards and law enforcement and monitoring with integrity.
To provide effective flood alleviation and mitigation solutions across Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To provide an excellent and safe technology driven, modern and efficient public transportation system.
To provide a supply-driven integrated transport network infrastructure.
To maintain and rehabilitate highways, tenantry and residential roads and other public accesses.
To develop and maintain all government buildings, bridges, jetties and wharves and similar structures and other public assets.
To develop, maintain and regulate road transport and ancillary facilities conducted through the Barbados Licensing Authority, the Transport Authority and private operators and the provision of ancillary services.
To promote safety in all work relating to roads, public transport and electrical systems management.
To regulate the traffic system in conjunction with the police.
To support other Ministries and government agencies in the execution and implementation of projects.
To provide effective standards and law enforcement and monitoring with integrity.
To provide effective flood alleviation and mitigation solutions across Barbados.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources)
- **Status:** verified — all ten objectives match the gov.bb source; the complete list of 12 objectives (Claims 3–5) matches the authoritative source
- **Certainty:** 95%
- **Note:** The mtw.gov.bb About Us page lists only 10 objectives in slightly condensed wording (the "Supply-driven integrated transport" objective is absent). gov.bb is treated as the more authoritative source.

---

### Claim 6 — Ministry name (ministries.ts line 1045)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Ministry of Transport, Works and Water Resources</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Transport, Works and Water Resources</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources)
- **Status:** verified — official name confirmed on gov.bb canonical ministry listing. The older short form "Ministry of Transport and Works" (still used on mtw.gov.bb branding) is NOT the official current name.
- **Certainty:** 99%
- **Cross-reference:** The conductor licence page (`src/content/apply-for-conductor-licence/index.md`) uses the outdated "Ministry of Transport and Works" — flagged separately in [/docs/fact-check/apply-for-conductor-licence.md](/docs/fact-check/apply-for-conductor-licence.md) Claim 2.

---

### Claim 7 — Minister name (ministries.ts line 1053)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">The Hon. Kirk D. M. Humphrey, M.P.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. Kirk D. M. Humphrey, M.P.</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [gov.bb — Cabinet](https://www.gov.bb/cabinet.php); [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/)
- **Status:** verified — name confirmed across multiple sources
- **Certainty:** 99%

---

### Claim 8 — Minister role title (ministries.ts line 1054)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Minister of Transport and Works, and Senior Minister coordinating Infrastructure</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — minor punctuation difference vs gov.bb cabinet page</div>
<pre class="claim-block-content">gov.bb/cabinet.php shows: "Minister of Transport and Works and Senior Minister coordinating Infrastructure"
(no comma before "and Senior Minister")

ministries.ts stores the same content with a comma: "Minister of Transport and Works, and Senior Minister coordinating Infrastructure"

The content is identical; only punctuation differs. Both forms are in common use.

Checked: [gov.bb — Cabinet](https://www.gov.bb/cabinet.php); [Barbados Today — Cabinet ministers sworn in](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/)

Open question: Which form appears in the Official Gazette appointment? The comma form is grammatically preferred for compound titles but both convey the same meaning.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Cabinet](https://www.gov.bb/cabinet.php); [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/)
- **Status:** unverifiable (punctuation variant — no citizen impact)
- **Certainty:** 85% that the longer title is correct; punctuation variant is a style question
- **Open question:** Confirm with the Cabinet Office or Official Gazette which punctuation form is canonical for the sworn-in title.

---

### Claim 9 — Main telephone number (ministries.ts line 1075)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Telephone    (246) 536-0000</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Telephone    (246) 536-0000</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [MTW Directory](https://mtw.gov.bb/directory/)
- **Status:** verified — both sources confirm (246) 536-0000 as the main PBX
- **Certainty:** 99%

---

### Claim 10 — Fax number (ministries.ts line 1076)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Fax    (246) 536-8133</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fax    (246) 536-8133</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 11 — Email address (ministries.ts line 1074)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Email    psmtwm@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Email    psmtwm@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [MTW Directory](https://mtw.gov.bb/directory/)
- **Status:** verified — both authoritative sources publish this address for the Permanent Secretary's office
- **Certainty:** 99%

---

### Claim 12 — Website URL (ministries.ts line 1077)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Website    http://www.mtw.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Website    https://mtw.gov.bb</pre>
</div>

- **Type:** URL
- **Sources:** [MTW — Home (canonical HTTPS URL)](https://mtw.gov.bb/)
- **Status:** discrepant — the canonical URL is `https://mtw.gov.bb/` (HTTPS, no www). The stored value `http://www.mtw.gov.bb` uses the insecure HTTP scheme and non-canonical www prefix. The site page title confirms it is "Home - Ministry of Transport & Works" at `https://mtw.gov.bb/`.
- **Certainty:** 95% that `https://mtw.gov.bb` is the canonical form
- **Confidence it's wrong:** 85%
- **Citizen impact:** LOW — redirect works transparently; however, HTTP links signal insecurity to cautious users and may trigger browser warnings in some contexts.

---

### Claim 13 — Permanent address (ministries.ts lines 1081–1085)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Pine East/West Boulevard
The Pine
St. Michael
Barbados, W. I</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Pine East/West Boulevard
The Pine
St. Michael
Barbados, W. I</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources)
- **Status:** verified — matches the permanent address on gov.bb exactly
- **Certainty:** 98%
- **Note:** MTW's own website (mtw.gov.bb/directory/) currently shows a **temporary** address: "2nd Floor The Goddard Building Haggatt Hall St. Michael Bridgetown, Barbados" due to renovation works at the Pine headquarters. The ministries.ts correctly stores the permanent/official address per gov.bb; however, the live alpha page could usefully add a note about the temporary location for citizens who visit in person.
- **Citizen impact:** MEDIUM — citizens directing in-person visits to Pine will find the offices temporarily at Haggatt Hall.

---

### Claim 14 — Associated departments: Transport category (ministries.ts lines 1092–1094)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Transport:
- Barbados Licensing Authority
- Transport Board</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with gap noted)</div>
<pre class="claim-block-content">Transport:
- Barbados Licensing Authority
- Transport Board</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [Transport Authority — ta.gov.bb](https://ta.gov.bb/)
- **Status:** verified (both listed bodies are genuine MTWW-affiliated bodies), with a gap noted
- **Certainty:** 95%
- **Note (gap):** The **Transport Authority** (ta.gov.bb) is a separate statutory body from the Transport Board, responsible for PSV route licensing, operator permitting, and conductor oversight. The ministry's own Objective 7 (source MD line 19) explicitly names "the Barbados Licensing Authority, the Transport Authority and private operators". Yet the Transport Authority does not appear in the associatedDepartments list. Citizens seeking conductor licence or PSV permit guidance may not find a link to ta.gov.bb from this ministry page.
- **Open question:** Confirm with the ministry whether the Transport Authority should be listed as an associated body alongside BLA and Transport Board.

---

### Claim 15 — Online service link: Apply for a driver's licence (ministries.ts line 1059)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">href: "/apply-for-a-drivers-licence"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">href: "/apply-for-a-drivers-licence"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Apply for a driver's licence](https://alpha.gov.bb/apply-for-a-drivers-licence) — page loads with heading "Apply for a driver's licence"
- **Status:** verified — link resolves to a live, on-topic page
- **Certainty:** 99%

---

### Claim 16 — Online service link: Apply for a conductor licence (ministries.ts line 1063)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">href: "/apply-for-conductor-licence"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">href: "/apply-for-conductor-licence"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Apply for a conductor's licence](https://alpha.gov.bb/apply-for-conductor-licence) — page loads with heading "Apply for a conductor's licence"
- **Status:** verified — link resolves to a live, on-topic page
- **Certainty:** 99%
- **Note:** The live page title uses an apostrophe ("conductor's licence") while the online services description in ministries.ts says "Apply for a public service vehicle conductor licence" (no apostrophe). This is a minor copy inconsistency; no citizen impact on navigation.

---

### Claim 17 — Online service link: Getting around Barbados (ministries.ts line 1068)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">href: "/getting-around-barbados"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">href: "/getting-around-barbados"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Getting around Barbados](https://alpha.gov.bb/getting-around-barbados) — page loads with heading "Getting around Barbados"
- **Status:** verified — link resolves to a live, on-topic page
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

### Temporary address not signposted

The MTW headquarters is currently at the Goddard Building (2nd Floor, Haggatt Hall, St. Michael) as a temporary relocation during renovation of the permanent Pine East/West Boulevard site. The alpha.gov.bb page shows the permanent address only. Adding a brief note with the temporary address and an indication that it is subject to change would reduce citizen confusion for in-person visits. The MTW directory (mtw.gov.bb/directory/) labels it "Temporary address: 2nd Floor The Goddard Building Haggatt Hall St. Michael Bridgetown, Barbados" with main PBX 536-0000 and business hours Monday–Friday 8:15 AM – 4:30 PM.

### Transport Authority not listed under associated departments

The Transport Authority (ta.gov.bb) is a statutory body responsible for PSV/route licensing and operator oversight, explicitly named in the ministry's Objective 7. It is absent from both the associatedDepartments list in ministries.ts and the gov.bb ministry page. Citizens seeking PSV conductor or operator guidance would benefit from a direct link.

### Second ministry email not shown

The MTW directory (mtw.gov.bb/directory/) also publishes `information.unit@publicworks.gov.bb` as a general enquiries address alongside the PS email. The alpha.gov.bb page only shows the PS email. The information unit address is appropriate for general public enquiries and could usefully be added.

### Transport Board restructuring — monitor

Active public discussion (Nov 2025 – Apr 2026) about a proposed Barbados Mass Transit Authority replacing the Transport Board. As of 2026-05-29 the Transport Board remains operational and the data file is correct. This should be monitored: if/when the Transport Board is restructured, the associatedDepartments entry will require updating.

### Business hours not shown on alpha page

MTW directory confirms Monday–Friday 8:15 AM – 4:30 PM. This is not shown on the alpha ministry page (consistent with most ministry pages on the site). Could be a useful addition.

---

## Sources cited

- [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources) — primary authoritative source; mission, vision, objectives, address, phone, fax, email all verified here
- [MTW About Us](https://mtw.gov.bb/about-us/) — ministry's own website; mission ("buildings" plural) and vision confirmed; 10 vs 12 objectives discrepancy noted
- [MTW Directory](https://mtw.gov.bb/directory/) — phone, email, temporary Goddard Building address, business hours confirmed; second email (information.unit@publicworks.gov.bb) found here
- [MTW Home](https://mtw.gov.bb/) — canonical HTTPS URL confirmed; page title "Home - Ministry of Transport & Works"
- [gov.bb — Cabinet](https://www.gov.bb/cabinet.php) — minister name and full title confirmed; "Minister of Transport and Works and Senior Minister coordinating Infrastructure" (no comma)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/) — full minister title with "Senior Minister coordinating Infrastructure" confirmed
- [alpha.gov.bb — Apply for a driver's licence](https://alpha.gov.bb/apply-for-a-drivers-licence) — online service CTA link verified live
- [alpha.gov.bb — Apply for a conductor's licence](https://alpha.gov.bb/apply-for-conductor-licence) — online service CTA link verified live
- [alpha.gov.bb — Getting around Barbados](https://alpha.gov.bb/getting-around-barbados) — online service CTA link verified live
- [Transport Authority — ta.gov.bb](https://ta.gov.bb/) — Transport Authority confirmed as a separate body from Transport Board; absent from associatedDepartments
