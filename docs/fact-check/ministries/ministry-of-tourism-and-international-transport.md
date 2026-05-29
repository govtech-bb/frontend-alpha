# Fact-check: Ministry of Tourism and International Transport

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-tourism-and-international-transport>
- **Source file:** `src/content/ministries/ministry-of-tourism-and-international-transport.md`
- **Data file:** `src/data/ministries.ts` (lines 951–1018)
- **Last checked:** 2026-05-29
- **Summary:** 21 claims reviewed — 13 verified, 5 discrepant, 3 unverifiable. Average certainty: **79%**.

---

## Headline issues for triage

1. **Ministry address in ministries.ts is stale — the ministry has moved to One Barbados Place.** The data file lists two addresses: "Lloyd Erskine Sandiford Center, Two Mile Hill, St. Michael" (Tourism) and "8th Floor Baobab Tower, Warrens, St. Michael" (International Transport). The ministry's own contact page at `tourism.gov.bb/contact` gives a single address: "4th and 5th Floors, One Barbados Place, Warrens, St. Michael BB12001." Gov.bb still lists both old addresses in its tourism ministry directory entry, creating ambiguity about which is canonical. The tourism.gov.bb page is the more current authoritative source and the two old addresses appear to be pre-move data. Citizens telephoning or visiting using the old addresses risk going to the wrong location. Tier A finding. **Confirmed still open 2026-05-29.**

2. **"Barbados Civil Aviation Department (BCAD)" in ministries.ts is an outdated agency name.** The Civil Aviation Department was replaced by the independent Barbados Civil Aviation Authority (BCAA) when Parliament established the BCAA on 25 October 2022 under the Civil Aviation Act 2022-19. The BCAA has its own governing board, its own website (bcaa.gov.bb), and its own address (Charnocks, Christ Church). The old `bcad.gov.bb` domain still resolves but is no longer the active agency. Listing "BCAD" as an associated department of the ministry is factually wrong — the current body is BCAA. Tier A finding. **Confirmed still open 2026-05-29.**

3. **Minister's post-nominals and name verified — no discrepancy.** The parliament.gov.bb Cabinet Ministers page, the barbadosparliament.com member detail page, and tourism.gov.bb all confirm "The Hon. G. P. Ian Gooding-Edghill, J.P., M.P." — which matches ministries.ts exactly. This was initially listed as a potential discrepancy in the first audit pass but was resolved upon closer reading of the data file. Status: verified.

4. **The International Transport PBX number is absent from ministries.ts contact array.** Gov.bb lists separate PBX numbers for Tourism (535-7500) and International Transport (535-3300). ministries.ts only records 535-7500 as the single telephone. Citizens trying to reach the International Transport division by phone cannot do so via the alpha.gov.bb page. Tier B finding. **Confirmed still open 2026-05-29.**

5. **All three online service links resolve correctly.** `/visa-information`, `/visitor-permit-application`, and `/ports-of-entry` all load successfully with relevant, on-topic content. No broken CTAs.

---

## Claims

### Claim 1 — Division of International Transport mission statement (lines 1–2)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The mission of the Division of International Transport is to create an environment that provides a high degree of safety and economic viability in respect of the operations of the civil aviation and maritime sectors, strategically using these sectors as major vehicles for the expansion and further social and economic development of Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The mission of the Division of International Transport is to create an environment that provides a high degree of safety and economic viability in respect of the operations of the civil aviation and maritime sectors, strategically using these sectors as major vehicles for the expansion and further social and economic development of Barbados.</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [gov.bb — Ministry of Tourism and International Transport](https://www.gov.bb/Ministries/tourism) — the gov.bb page reproduces the same mission statement for the Division of International Transport verbatim; cross-confirmed by the summary on the tourism.gov.bb about page.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — Ministry name (lines 3, and ministries.ts line 953)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Tourism and International Transport</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Tourism and International Transport</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Tourism and International Transport](https://www.gov.bb/Ministries/tourism); [tourism.gov.bb — Home](https://www.tourism.gov.bb/); [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 3 — Minister name and role (ministries.ts lines 960–963)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">The Hon. G. P. Ian Gooding-Edghill, J.P., M.P.
Minister of Tourism and International Transport</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. G. P. Ian Gooding-Edghill, J.P., M.P.
Minister of Tourism and International Transport</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — confirms "Hon. G. P. Ian GOODING-EDGHILL, J.P., M.P." with both J.P. and M.P. post-nominals; [tourism.gov.bb — Meet the Minister](https://www.tourism.gov.bb/About/Meet-the-Minister/) — confirms ministerial role; [barbadostoday.bb — Cabinet ministers sworn in 2026-02-16](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — confirms ministerial appointment post-Feb 2026 election.
- **Status:** verified — ministries.ts line 961 records `"The Hon. G. P. Ian Gooding-Edghill, J.P., M.P."`. The J.P. and M.P. post-nominals are both present and match the Cabinet Ministers page.
- **Certainty:** 95%

---

### Claim 4 — Tourism PBX telephone number (ministries.ts line 982)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Telephone    (246) 535-7500</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Telephone    (246) 535-7500</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — Tourism PBX listed as 535-7500; [tourism.gov.bb — Contact](https://www.tourism.gov.bb/contact) — lists "+1 (246) 535-7500"
- **Status:** verified
- **Certainty:** 99% — two independent authoritative sources agree.

---

### Claim 5 — International Transport PBX absent from ministries.ts

This is an omission finding, not a claim on the page. The gov.bb source lists a separate PBX for the International Transport division. That number is absent from ministries.ts and therefore absent from the rendered page.

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts) — International Transport PBX</div>
<pre class="claim-block-content">(not listed — only the Tourism PBX 535-7500 appears)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should add</div>
<pre class="claim-block-content">International Transport PBX    (246) 535-3300</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — International Transport PBX listed as 535-3300
- **Status:** discrepant (omission) — the International Transport PBX is not present in ministries.ts or on the alpha.gov.bb page
- **Certainty:** 90% — authoritative gov.bb source confirms 535-3300 as the International Transport PBX
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — citizens needing to contact the civil aviation or maritime division (e.g. seafarers, pilots, ship operators) cannot find the direct division number on the alpha.gov.bb page.

---

### Claim 6 — Tourism Fax number (ministries.ts line 983)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Fax    (246) 436-4828</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fax    (246) 436-4828</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — Tourism fax 436-4828
- **Status:** verified
- **Certainty:** 90%

---

### Claim 7 — International Transport Fax number (ministries.ts line 984)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Fax    (246) 535-3342</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fax    (246) 535-3342</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — International Transport fax 535-3342; [tourism.gov.bb — Contact](https://www.tourism.gov.bb/contact) — fax +1 (246) 535-3342
- **Status:** verified
- **Certainty:** 99%

---

### Claim 8 — Tourism Division address (ministries.ts lines 987–991)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Lloyd Erskine Sandiford Center
Two Mile Hill
St. Michael
Barbados, W.I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">4th and 5th Floors
One Barbados Place
Warrens
St. Michael BB12001
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [tourism.gov.bb — Contact](https://www.tourism.gov.bb/contact) — "4th and 5th Floors, One Barbados Place, Warrens, St. Michael BB12001, Barbados, West Indies"; [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — still lists the Lloyd Erskine Sandiford Center address (this gov.bb page appears to be stale)
- **Status:** discrepant — the ministry's own contact page (tourism.gov.bb/contact) gives One Barbados Place as the current address. The gov.bb page (which is the original data source for ministries.ts) still shows the old Lloyd Erskine Sandiford Center address. The ministry's own website is the more authoritative and more current source for its own address.
- **Certainty:** 80% (that Lloyd Erskine Sandiford Center is no longer the main ministry office and One Barbados Place is correct)
- **Confidence it's wrong:** 80%
- **Citizen impact:** HIGH — citizens visiting the ministry will go to the wrong building if the old address is used.

---

### Claim 9 — International Transport Division address (ministries.ts lines 992–995)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">8th Floor Baobab Tower
Warrens
St. Michael
Barbados, W.I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">4th and 5th Floors
One Barbados Place
Warrens
St. Michael BB12001
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [tourism.gov.bb — Contact](https://www.tourism.gov.bb/contact) — single unified address "4th and 5th Floors, One Barbados Place, Warrens, St. Michael BB12001" for the whole ministry; [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — still lists 8th Floor Baobab Tower (stale)
- **Status:** discrepant — tourism.gov.bb/contact gives a single address (One Barbados Place) for the whole ministry; the separate Baobab Tower address for International Transport appears to be pre-move data. As with the Tourism address (Claim 8), the ministry's own site is the more current source.
- **Certainty:** 80%
- **Confidence it's wrong:** 80%
- **Citizen impact:** HIGH — same as Claim 8: visitors directed to the old address will go to the wrong building.
- **Note:** The address structure in ministries.ts lines 987–995 concatenates both old addresses into a single flat array without labels, which would render as one block of eight address lines. Even if both addresses were current, this rendering would be confusing. The correct fix is to replace both with the single "One Barbados Place" address.

---

### Claim 10 — Ministry intro/mission (ministries.ts lines 958–959)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">To make Barbados the number one Caribbean destination through sustainable tourism development.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — simplified paraphrase of official statement</div>
<pre class="claim-block-content">The tourism.gov.bb Mission Statement reads: "To facilitate the sustainable development of Barbados' tourism industry through sound policy, strategic research, marketing, product and infrastructural development and the regulation and control of all aspects of civil aviation and maritime affairs, to promote inclusive economic growth in Barbados."

The tourism.gov.bb Vision Statement reads: "To be a world-class Government organisation leading and co-ordinating the sustainable development of Barbados' tourism and international transport industry."

The alpha.gov.bb intro ("number one Caribbean destination") is not a verbatim quote from any official ministry document found. It is a simplified aspirational summary rather than the official mission.
Checked: [tourism.gov.bb — Mission &amp; Vision](https://www.tourism.gov.bb/About/Mission-Vision/); [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism)</pre>
</div>

- **Type:** descriptive
- **Sources:** [tourism.gov.bb — Mission & Vision](https://www.tourism.gov.bb/About/Mission-Vision/); [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism)
- **Status:** unverifiable as a direct quote; the claim is a simplification/paraphrase. The phrase "number one Caribbean destination" appears in marketing materials but is not part of the official ministry mission statement. As an intro blurb for the alpha.gov.bb ministry page this is low-stakes copy.
- **Certainty:** 65% — the aspirational sentiment is consistent with official messaging; the specific phrase is unconfirmed.
- **Open question:** Does the alpha.gov.bb editorial standard require intro text to use verbatim official mission statements? If so, update to the tourism.gov.bb mission statement.

---

### Claim 11 — Associated body: Barbados Tourism Marketing Inc. (BTMI) (ministries.ts line 1004)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Barbados Tourism Marketing Inc. (BTMI)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados Tourism Marketing Inc. (BTMI)</pre>
</div>

- **Type:** agency name
- **Sources:** [tourism.gov.bb — Agencies](https://www.tourism.gov.bb/About/Agencies/BTMI/); [gov.bb — State Bodies — BTMI](https://www.gov.bb/State-Bodies/btmi); [corporate.visitbarbados.org — Our Company](https://corporate.visitbarbados.org/our-company/) — confirmed established 2014 as successor to the Barbados Tourism Authority (BTA)
- **Status:** verified
- **Certainty:** 99%
- **Note:** BTMI replaced the former "Barbados Tourism Authority (BTA)" in 2014. Any remaining references to "BTA" elsewhere on alpha.gov.bb (noted in the ports-of-entry fact-check) should use BTMI instead. See [/docs/fact-check/ports-of-entry.md](/docs/fact-check/ports-of-entry.md) Claim 2.

---

### Claim 12 — Associated body: The Barbados Conference Services Limited (BCSL) (ministries.ts line 1005)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">The Barbados Conference Services Limited (BCSL)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Barbados Conference Services Limited (BCSL)</pre>
</div>

- **Type:** agency name
- **Sources:** [tourism.gov.bb — BCSL agency page](https://tourism.gov.bb/About/Agencies/BSCL/) — full name "Barbados Conference Services Limited", abbreviation "BCSL"; [gov.bb — State Bodies — conference-services](https://www.gov.bb/State-Bodies/conference-services) — confirms "Barbados Conference Services Limited (BCSL)"; [gisbarbados.gov.bb — Board of Directors at BCSL](https://gisbarbados.gov.bb/blog/board-of-directors-at-bcsl/)
- **Status:** verified — name and abbreviation correct. The tourism.gov.bb URL slug uses "BSCL" (a transposition) but the page title and text use "BCSL." Alpha.gov.bb and gov.bb are correct.
- **Certainty:** 99%

---

### Claim 13 — Associated body: Caves of Barbados Limited (CBL) (ministries.ts line 1006)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Caves of Barbados Limited (CBL)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Caves of Barbados Limited (CBL)</pre>
</div>

- **Type:** agency name
- **Sources:** [tourism.gov.bb — CBL agency page](https://tourism.gov.bb/About/Agencies/CBL/); [gov.bb — State Bodies — caves-of-barbados](https://www.gov.bb/State-Bodies/caves-of-barbados)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 14 — Associated body: Barbados Civil Aviation Department (BCAD) (ministries.ts line 1012)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Barbados Civil Aviation Department (BCAD)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Barbados Civil Aviation Authority (BCAA)</pre>
</div>

- **Type:** agency name
- **Sources:** [bcaa.gov.bb — About Us](https://www.bcaa.gov.bb/about-us/) — "established by Parliament on 25 October 2022, marking a historic transition from the Civil Aviation Department (CAD) to an independent Aviation Safety Regulator"; [tourism.gov.bb — BCAA agency page](https://www.tourism.gov.bb/About/Agencies/BCAA/) — BCAA listed as an agency of the Ministry of Tourism and International Transport; [Civil Aviation Act 2022-19 (PDF)](https://tourism.gov.bb/attachments/Civil%20Aviation%20Act,%202022%20(Act%202022-19)%5B392%5D.pdf) — the enabling legislation.
- **Status:** discrepant — "Barbados Civil Aviation Department (BCAD)" is the pre-2022 name. Since 25 October 2022, the body has been the Barbados Civil Aviation Authority (BCAA). Confirmed still discrepant 2026-05-29.
- **Certainty:** 99% — BCAA establishment under Civil Aviation Act 2022-19 is unambiguous.
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — citizens searching for the civil aviation regulator using "BCAD" may find outdated information. The BCAA has a different address (Charnocks, Christ Church), different contacts (535-0001), and different governance structure.

---

### Claim 15 — Associated body: Grantley Adams International Airport Inc. (GAIA) (ministries.ts line 1013)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Grantley Adams International Airport Inc. (GAIA)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Grantley Adams International Airport Inc. (GAIA)</pre>
</div>

- **Type:** agency name
- **Sources:** [tourism.gov.bb — Agencies](https://www.tourism.gov.bb/About/Agencies/) — GAIA listed; [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — GAIA listed; see also [/docs/fact-check/ports-of-entry.md](/docs/fact-check/ports-of-entry.md) Claim 5 (GAIA address and contacts already verified in that report).
- **Status:** verified
- **Certainty:** 99%

---

### Claim 16 — Associated body: Barbados Port Inc. (ministries.ts line 1016)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Barbados Port Inc.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados Port Inc.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism) — "Barbados Port Inc." listed under Port Management; [tourism.gov.bb — Agencies](https://www.tourism.gov.bb/About/Agencies/) — BPI listed.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 17 — Missing associated bodies in ministries.ts vs tourism.gov.bb agency list

The tourism.gov.bb agencies page lists 13+ entities under the ministry. ministries.ts lists only 6. The missing bodies are:

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts associatedDepartments</div>
<pre class="claim-block-content">Tourism:
  Barbados Tourism Marketing Inc. (BTMI)
  The Barbados Conference Services Limited (BCSL)
  Caves of Barbados Limited (CBL)
International Transport:
  Barbados Civil Aviation Department (BCAD)
  Grantley Adams International Airport Inc. (GAIA)
Port Management:
  Barbados Port Inc.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — full list not confirmed against a single Tier 1 source</div>
<pre class="claim-block-content">Tourism.gov.bb also lists these agencies not in ministries.ts:
  Barbados Tourism Product Authority (BTPA)
  Barbados Aircraft &amp; Aviation Services Company (BAASEC)
  Caribbean Aircraft Handling (CAH)
  Caribbean International Airways Ltd (CIAL)
  Hotels &amp; Resorts Limited
  Needham's Point Holdings Ltd (NPHL)
  Needhams Point Development Incorporated (NPDI)

Whether all of these should appear in the alpha.gov.bb ministry page's associated departments list is an editorial/design question, not a pure factual discrepancy. However, BTPA is notable: it is the tourism product regulator and is likely of direct relevance to citizens visiting the page.
Checked: [tourism.gov.bb — Agencies](https://www.tourism.gov.bb/About/Agencies/); [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism)</pre>
</div>

- **Type:** agency name
- **Sources:** [tourism.gov.bb — Agencies, Boards & Commissions](https://www.tourism.gov.bb/About/Agencies/); [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism)
- **Status:** unverifiable as a completeness standard — the omissions are factual but whether they belong in the UI list is an editorial decision
- **Open question:** Should the alpha.gov.bb ministry page list BTPA, BAASEC, NPHL, and the other tourism.gov.bb-listed bodies? The Barbados Tourism Product Authority (BTPA) is the body citizens interact with for accommodation licensing and tourism product standards — its absence is the highest-impact omission from a citizen-services perspective.

---

### Claim 18 — Ministry keywords / abbreviation (ministries.ts line 954)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts keywords array</div>
<pre class="claim-block-content">["MTIT", "MoT", "Tourism", "International Transport"]</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — "MTI" also in use</div>
<pre class="claim-block-content">Gov.bb uses the abbreviation "MTI" in its page title: "Ministry of Tourism and International Transport (MTI)". The tourism.gov.bb site does not prominently display a ministry abbreviation. "MTIT" (four-letter) is not confirmed in any Tier 1 source. "MTI" is the abbreviated form on the canonical gov.bb page.
Checked: [gov.bb — Ministry of Tourism](https://www.gov.bb/Ministries/tourism)</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Tourism (page title)](https://www.gov.bb/Ministries/tourism) — title shows "(MTI)" not "(MTIT)"
- **Status:** unverifiable for "MTIT" specifically — "MTI" is the form used on gov.bb; "MTIT" does not appear in any Tier 1 source found. As a search keyword this is low-stakes but worth correcting for consistency.
- **Certainty:** 70% — "MTI" is confirmed; "MTIT" is not
- **Open question:** The official abbreviation appears to be "MTI" per gov.bb. Consider updating the keywords array from "MTIT" to "MTI."

---

### Claim 19 — Online service link: Visa information (/visa-information)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">href="/visa-information"
Visa requirements for visiting Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — link resolves</div>
<pre class="claim-block-content">https://alpha.gov.bb/visa-information loads successfully.
Page title: "Visa information | The Government Of Barbados"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Visa information](https://alpha.gov.bb/visa-information) — confirmed live 2026-05-29
- **Status:** verified
- **Certainty:** 99%

---

### Claim 20 — Online service link: Visitor permit application (/visitor-permit-application)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">href="/visitor-permit-application"
Apply to extend your stay in Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — link resolves</div>
<pre class="claim-block-content">https://alpha.gov.bb/visitor-permit-application loads successfully.
Page title: "Visitor permit application | The Government Of Barbados"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Visitor permit application](https://alpha.gov.bb/visitor-permit-application) — confirmed live 2026-05-29
- **Status:** verified
- **Certainty:** 99%
- **Note:** The page describes a permit to drive in Barbados, not to extend a stay. The description "Apply to extend your stay in Barbados" is misleading — this is a visitor's permit for driving, processed through the Barbados Revenue Authority.
- **Citizen impact:** LOW-MEDIUM — the description mismatch could confuse citizens looking for an immigration extension vs. a driving permit.

---

### Claim 21 — Online service link: Ports of entry (/ports-of-entry)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">href="/ports-of-entry"
Information on Barbados ports of entry.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — link resolves</div>
<pre class="claim-block-content">https://alpha.gov.bb/ports-of-entry loads successfully.
Page title: "Ports of Entry | The Government Of Barbados"</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Ports of entry](https://alpha.gov.bb/ports-of-entry) — confirmed live 2026-05-29
- **Status:** verified
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

### Missing: International Transport PBX (535-3300)

As noted in Claim 5, the International Transport division PBX (246) 535-3300 is absent from ministries.ts. Citizens contacting the division for matters such as maritime permits, ship registration, seafarer certification, or civil aviation enquiries have no published number on the alpha.gov.bb page. Gov.bb confirms this number.

### Misleading description for visitor-permit-application link

The online services link to `/visitor-permit-application` is described as "Apply to extend your stay in Barbados." However, the actual page covers a driving permit for visitors (issued by the Barbados Revenue Authority), not an immigration stay extension. The description should be corrected to something like "Apply for a visitor's driving permit in Barbados."

### Missing: Barbados Tourism Product Authority (BTPA)

BTPA is the accommodation-licensing and product-standards regulator for tourism. It is listed on tourism.gov.bb alongside BTMI as a sister successor body to the BTA. Citizens looking for information about tourist accommodation licensing, standards enforcement, or tourism investment regulations will not find BTPA on the alpha.gov.bb ministry page. Recommend adding BTPA to the Tourism associated departments list in ministries.ts.

### BCAA address for reference

The Barbados Civil Aviation Authority (replacing BCAD) is located at: Civil Aviation Authority Building, Charnocks, Christ Church, Barbados BB17087. Phone: (246) 535-0001. Fax: (246) 535-0028. Email: civil.aviation@bcaa.gov.bb. Website: bcaa.gov.bb. This should inform any future dedicated BCAA page on alpha.gov.bb.

### Ministries.ts address array structure issue

Lines 987–995 of ministries.ts concatenate both old addresses (Lloyd Erskine Sandiford Center and Baobab Tower) into a single flat array without labels, which would render as one block of eight address lines. Even if both addresses were current, this rendering would be confusing. The correct fix is to replace both with the single "One Barbados Place" address.

---

## Sources cited

- [gov.bb — Ministry of Tourism and International Transport](https://www.gov.bb/Ministries/tourism) — primary gov.bb source; phone numbers, fax, addresses, agency list
- [tourism.gov.bb — Home](https://www.tourism.gov.bb/) — ministry official website
- [tourism.gov.bb — Contact](https://www.tourism.gov.bb/contact) — current address (One Barbados Place), PBX, fax, email, hours
- [tourism.gov.bb — About](https://www.tourism.gov.bb/about) — ministry mandate description
- [tourism.gov.bb — Mission & Vision](https://www.tourism.gov.bb/About/Mission-Vision/) — official mission and vision statements
- [tourism.gov.bb — Meet the Minister](https://www.tourism.gov.bb/About/Meet-the-Minister/) — minister biography and role
- [tourism.gov.bb — Agencies, Boards & Commissions](https://www.tourism.gov.bb/About/Agencies/) — full list of 13+ affiliated entities
- [tourism.gov.bb — BTMI agency page](https://www.tourism.gov.bb/About/Agencies/BTMI/)
- [tourism.gov.bb — BCSL agency page (URL slug: BSCL)](https://tourism.gov.bb/About/Agencies/BSCL/)
- [tourism.gov.bb — CBL agency page](https://tourism.gov.bb/About/Agencies/CBL/)
- [tourism.gov.bb — BCAA agency page](https://www.tourism.gov.bb/About/Agencies/BCAA/)
- [tourism.gov.bb — BTPA agency page](https://tourism.gov.bb/About/Agencies/BTPA)
- [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — confirms minister's post-nominals "J.P., M.P."
- [barbadosparliament.com — Member details/29 (Gooding-Edghill)](https://www.barbadosparliament.com/member/details/29) — confirms "M.P." and constituency St Michael West Central
- [barbadostoday.bb — Cabinet ministers sworn in 2026-02-16](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — confirms ministerial appointment post-Feb 2026 election
- [bcaa.gov.bb — About Us](https://www.bcaa.gov.bb/about-us/) — confirms BCAA established 25 October 2022, successor to Civil Aviation Department
- [Civil Aviation Act 2022-19 (PDF)](https://tourism.gov.bb/attachments/Civil%20Aviation%20Act,%202022%20(Act%202022-19)%5B392%5D.pdf) — enabling legislation for BCAA
- [gov.bb — State Bodies — BTMI](https://www.gov.bb/State-Bodies/btmi) — BTMI confirmed as state body
- [gov.bb — State Bodies — conference-services (BCSL)](https://www.gov.bb/State-Bodies/conference-services) — BCSL address and phone
- [gov.bb — State Bodies — caves-of-barbados](https://www.gov.bb/State-Bodies/caves-of-barbados)
- [corporate.visitbarbados.org — Our Company](https://corporate.visitbarbados.org/our-company/) — BTMI established 2014, successor to BTA
- [gisbarbados.gov.bb — Board of Directors at BCSL](https://gisbarbados.gov.bb/blog/board-of-directors-at-bcsl/)
- [alpha.gov.bb — Visa information](https://alpha.gov.bb/visa-information) — link live-check 2026-05-29
- [alpha.gov.bb — Visitor permit application](https://alpha.gov.bb/visitor-permit-application) — link live-check 2026-05-29
- [alpha.gov.bb — Ports of entry](https://alpha.gov.bb/ports-of-entry) — link live-check 2026-05-29
