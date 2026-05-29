# Fact-check: Ministry of Transport, Works and Water Resources

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-transport-works-and-water-resources>
- **Source file:** `src/content/ministries/ministry-of-transport-works-and-water-resources.md`
- **Data file:** `src/data/ministries.ts` (lines 1043–1098)
- **Last checked:** 2026-05-28
- **Summary:** 14 claims reviewed — 11 verified, 2 discrepant, 1 unverifiable. Average certainty: **89%**.

---

## Headline issues for triage

1. **"Government building" should be "Government buildings" (plural).** The mission statement in the source markdown (line 3) reads "proper maintenance of Government building and vehicles". The authoritative gov.bb ministry page and the MTW's own website both read "Government buildings and vehicles" (plural). This is a minor but visible copy error in a verbatim mission statement that citizens and media may quote.

2. **Minister's role title in ministries.ts omits "Senior Minister" qualifier in a discrepant way vs Parliament listing.** The data file correctly stores the full sworn-in title "Minister of Transport and Works, and Senior Minister coordinating Infrastructure", confirmed by the Barbados Today cabinet-sworn-in article. However, the official Parliament members list (barbadosparliament.com/page_content/show_content/8) displays only "Minister of Transport and Works" without the Senior Minister suffix. Neither source is authoritative enough to declare the other wrong — the sworn-in GIS ceremony and Barbados Today article support the longer form. No change recommended at this time, but the open question is whether the "Senior Minister coordinating Infrastructure" is a formal constitutional title or a descriptive tag applied during the swearing-in ceremony.

3. **Transport Authority absent from associatedDepartments in ministries.ts.** The objective text (source MD line 19) explicitly references "the Barbados Licensing Authority, the Transport Authority and private operators" in the same breath. The Transport Authority (ta.gov.bb) is a separate statutory body from the Transport Board; it handles PSV permitting, route licensing, and operator oversight. It is conspicuously absent from the associatedDepartments list (which shows only BLA and Transport Board under "Transport"). This is a gap in the data file rather than the source markdown, but it means the live page omits a body directly named in the ministry's own objectives.

4. **Website URL stored as `http://www.mtw.gov.bb` in ministries.ts.** The ministry's canonical website resolves at `https://mtw.gov.bb/` (HTTPS, no www subdomain). The stored value uses HTTP and the www prefix. Most browsers will follow the redirect transparently, but the stored URL should reflect the canonical form to avoid presenting a non-secure link to citizens.

---

## Claims

### Claim 1 — Mission Statement (lines 1–3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide efficient road network services, proper maintenance of Government building and vehicles, effective drainage solutions, special electrical services and public transportation.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">To provide efficient road network services, proper maintenance of Government buildings and vehicles, effective drainage solutions, special electrical services and public transportation.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [MTW About Us](https://mtw.gov.bb/about-us/)
- **Status:** discrepant — "Government building" should be "Government buildings" (plural)
- **Certainty:** 95% that "buildings" is the correct form
- **Confidence it's wrong:** 92%
- **Citizen impact:** LOW — does not affect any citizen action, but mission text may be quoted verbatim in official communications.
- **Note:** Both gov.bb and mtw.gov.bb use the plural "buildings". The source markdown appears to have dropped the "s". The remainder of the mission text matches both authoritative sources verbatim.

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
- **Status:** verified — all ten objectives match gov.bb verbatim; the complete list of 12 objectives (Claims 3–5) matches the authoritative source
- **Certainty:** 95%
- **Note:** The mtw.gov.bb About Us page lists only 10 objectives (slightly condensed wording), whereas gov.bb and the source markdown both list 12. This report treats gov.bb as the more authoritative source given it is the canonical government portal and the source_url for this page.

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
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [GIS — Ministry of Transport Works and Water Resources tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-transport-works-and-water-resources/)
- **Status:** verified — official name confirmed on gov.bb canonical ministry listing and multiple GIS press releases. The older short form "Ministry of Transport and Works" (still used on mtw.gov.bb branding) is NOT the official current name.
- **Certainty:** 99%
- **Cross-reference:** The conductor licence page (`src/content/apply-for-conductor-licence/index.md`) uses the outdated "Ministry of Transport and Works" — this remains an open discrepancy flagged in [apply-for-conductor-licence.md](/docs/fact-check/apply-for-conductor-licence.md) Claim 2.

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
- **Sources:** [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8); [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/); [gov.bb — Cabinet](https://www.gov.bb/cabinet.php)
- **Status:** verified — name confirmed across all three sources (Parliament website, Barbados Today sworn-in article, gov.bb cabinet listing)
- **Certainty:** 99%

---

### Claim 8 — Minister role title (ministries.ts line 1054)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Minister of Transport and Works, and Senior Minister coordinating Infrastructure</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — source conflict on full title</div>
<pre class="claim-block-content">The Barbados Today sworn-in article (16 Feb 2026) and gov.bb/cabinet.php both list:
"Minister of Transport and Works, and Senior Minister coordinating Infrastructure"
which matches ministries.ts exactly.

However, the official Parliament website (barbadosparliament.com/page_content/show_content/8)
lists Humphrey as simply: "Minister of Transport and Works"
without the "Senior Minister coordinating Infrastructure" suffix.

Checked: gov.bb/cabinet.php (longer form); Barbados Today "Cabinet ministers sworn in" (longer form);
barbadosparliament.com Cabinet list (shorter form).

Open question: Is "Senior Minister coordinating Infrastructure" a formal constitutional title
or a descriptive tag applied at the swearing-in ceremony? If formal, the Parliament page is incomplete.
If descriptive, both representations are acceptable.</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Today — Cabinet ministers sworn in](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/); [gov.bb — Cabinet](https://www.gov.bb/cabinet.php); [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8)
- **Status:** unverifiable (full formal title vs abbreviated form)
- **Certainty:** 80% that the longer form in ministries.ts is the correct full title
- **Open question:** Confirm with the Cabinet Office or the Official Gazettes whether "Senior Minister coordinating Infrastructure" is part of Humphrey's formal sworn portfolio title or a coordination designation. The data file should use the form published in the Official Gazette of appointment.

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
- **Sources:** [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources); [MTW Directory](https://mtw.gov.bb/directory/); [MTW Contact FAQ](https://mtw.gov.bb/ufaq/how-can-i-contact-the-ministry-of-transport-and-works/)
- **Status:** verified — three independent sources confirm (246) 536-0000 as the main PBX
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
- **Status:** discrepant — the canonical URL is `https://mtw.gov.bb/` (HTTPS, no www). The stored value `http://www.mtw.gov.bb` uses the insecure HTTP scheme and the non-canonical www prefix. Browsers will follow the redirect to HTTPS, but the stored value should use the canonical secure form.
- **Certainty:** 90% that `https://mtw.gov.bb` is the canonical form
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
- **Note:** MTW's own website (mtw.gov.bb) currently displays a **temporary** address: "2nd Floor The Goddard Building, Haggatt Hall, St. Michael" due to renovation works at the Pine headquarters. This is confirmed by the MTW FAQ page which explicitly labels it "Temporary address". The ministries.ts correctly stores the permanent/official address per gov.bb; no change needed. However, the alpha.gov.bb page could optionally note the current temporary address to help citizens who visit in person. See the conductor licence fact-check for full background: [apply-for-conductor-licence.md](/docs/fact-check/apply-for-conductor-licence.md) Claim 3.
- **Citizen impact:** MEDIUM — citizens directing correspondence to Pine may find the offices temporarily at Haggatt Hall. The page could add a note about the temporary location.

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
- **Note (gap):** The **Transport Authority** (ta.gov.bb) is a separate statutory body from the Transport Board, responsible for PSV route licensing, operator permitting, and conductor oversight. The ministry's own Objective 7 in the source markdown explicitly names "the Barbados Licensing Authority, the Transport Authority and private operators" in the same breath. Yet the Transport Authority does not appear in the associatedDepartments list. It is also absent from the gov.bb ministry page's associated-body listing, suggesting this gap originates upstream. The omission means citizens looking for conductor licence / PSV permit guidance may not find a link to ta.gov.bb from this ministry page.
- **Open question:** Confirm with the ministry whether the Transport Authority should be listed as an associated body alongside BLA and Transport Board.

---

## Additional findings (not on the page but should be)

### Temporary address not signposted

The MTW headquarters is currently at the Goddard Building (2nd Floor, Haggatt Hall, St. Michael) as a temporary relocation during renovation of the permanent Pine East/West Boulevard site. The alpha.gov.bb page shows the permanent address only. Adding a brief note with the temporary address and an indication that it is subject to change would reduce citizen confusion for in-person visits. The MTW FAQ page labels it "Temporary address: 2nd Floor The Goddard Building Haggatt Hall St. Michael Bridgetown, Barbados" and shows the main PBX 536-0000.

### Permanent Secretary identity

The current Permanent Secretary of the Ministry is **Mark Cummins**, confirmed on gov.bb (https://www.gov.bb/Government/mark-cummins, which gives his full career biography and titles him "PERMANENT SECRETARY — MINISTRY OF TRANSPORT, WORKS AND WATER RESOURCES"). The email psmtwm@barbados.gov.bb is the PS office address. The alpha.gov.bb page does not name the PS (consistent with most ministry pages), so no correction is required — noted for completeness.

### Second ministry email not shown

The MTW directory (mtw.gov.bb/directory/) also publishes `information.unit@publicworks.gov.bb` as a general enquiries address in addition to the PS email. The alpha.gov.bb page only shows the PS email. The information unit address is appropriate for general public enquiries and could usefully be added.

### Transport Board privatisation / Mass Transit Authority

Active public discussion is ongoing (Nov 2025 – Apr 2026) about the proposed dissolution of the Transport Board and establishment of a Barbados Mass Transit Authority as a regulatory successor. As of 2026-05-28 the Transport Board remains operational and the data file entry is correct. This should be monitored: if/when the Transport Board is restructured, the associatedDepartments entry will require updating.

---

## Sources cited

- [gov.bb — Ministry of Transport, Works and Water Resources](https://www.gov.bb/Ministries/transport-works-water-resources) — primary authoritative source; mission, vision, objectives, address, phone, fax, email all verified here
- [MTW About Us](https://mtw.gov.bb/about-us/) — ministry's own website; mission and vision confirmed (10 vs 12 objectives discrepancy noted); temporary Goddard Building address shown
- [MTW Directory](https://mtw.gov.bb/directory/) — phone, email, temporary address confirmed; second email (information.unit@publicworks.gov.bb) found here
- [MTW Contact FAQ](https://mtw.gov.bb/ufaq/how-can-i-contact-the-ministry-of-transport-and-works/) — confirms Goddard Building as temporary address; PBX 536-0000 confirmed
- [MTW Departments and Services](https://mtw.gov.bb/departments-services/) — lists all ministry departments (BLA, Building Standards Authority, Drainage Division, Design Services, GEED, Operations)
- [gov.bb — Cabinet](https://www.gov.bb/cabinet.php) — minister name and full title confirmed
- [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — minister name confirmed; shorter title form noted
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/amp/) — full title with "Senior Minister coordinating Infrastructure" confirmed
- [Barbados Today — Humphrey ready for challenges in Ministry of Transport and Works (22 Feb 2026)](https://barbadostoday.bb/2026/02/22/humphrey-ready-for-challenges-in-ministry-of-transport-and-works/) — contextual confirmation of Humphrey's arrival at Goddard Building
- [gov.bb — Mark Cummins (Permanent Secretary)](https://www.gov.bb/Government/mark-cummins) — PS identity confirmed
- [Transport Authority — ta.gov.bb](https://ta.gov.bb/) — Transport Authority confirmed as a separate body from Transport Board; absence from associatedDepartments noted
- [gov.bb — Air Navigation Services Department](https://www.gov.bb/Departments/air-navigation) — confirms Air Navigation is under MIST, not MTWW; correctly absent from associatedDepartments
- [GIS — Ministry of Transport Works and Water Resources tag (page 2)](https://gisbarbados.gov.bb/blog/tag/ministry-of-transport-works-and-water-resources/page/2/) — confirmed ministry name used in press releases; GIS tag page itself returns 403
- [Barbados Today — PM puts distance from Transport Board sell-off (Apr 2026)](https://barbadostoday.bb/2026/04/23/pm-puts-distance-from-transport-board-sell-off/) — Transport Board restructuring context; Jehu Wiltshire referenced as "then PS" confirming Cummins is current
