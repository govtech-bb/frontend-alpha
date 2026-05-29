# Fact-check: Ministry of Environment and National Beautification

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-environment-and-national-beautification>
- **Source file:** `src/content/ministries/ministry-of-environment-and-national-beautification.md`
- **Data file:** `src/data/ministries.ts` (lines 347–401)
- **Last checked:** 2026-05-29
- **Summary:** 19 claims reviewed — 12 verified, 4 discrepant, 3 unverifiable. Average certainty: **80%**.

---

## Headline issues for triage

1. **"Natural Beautification" typo on line 1 — misspells the ministry name.** The very first sentence reads "The Ministry of Environment and *Natural* Beautification." Every authoritative source — `gov.bb/Ministries/environment`, `ozone.gov.bb/the-ministry/`, Parliament — uses **National** Beautification. The same source file correctly uses "National Beautification" at lines 17, 39, 41, and 169, making this a clear one-word typo. High citizen impact: it is the first text citizens and search engines read.

2. **Ministry name is incomplete — "Fisheries" is missing.** Since the 2022 cabinet appointment (reconfirmed February 2026), the full official name is **"Ministry of the Environment, National Beautification and Fisheries."** The `ozone.gov.bb` ministry site, Parliament, and Barbados Today all use this expanded name. The alpha.gov.bb page and `ministries.ts` name field (line 349) still say "Ministry of Environment and National Beautification" without Fisheries.

3. **nhdbdos.com link is broken (line 119).** The Natural Heritage section links to `http://www.nhdbdos.com/` which returns connection refused as of 2026-05-29 (re-confirmed on this pass). The authoritative replacement is `https://www.gov.bb/Departments/natural-heritage` or `https://biodiversity.gov.bb/ministry/natural-heritage-department/`.

4. **weplantin.org link is broken (line 202).** The We Plantin' section links to `http://www.weplantin.org/` which also returns connection refused as of 2026-05-29 (re-confirmed on this pass). The programme is confirmed active (NCC, hotline 536-TREE / (246) 536-8733); the live page is `https://www.nccbarbados.com/a-million-trees/`.

5. **Permanent Secretary direct line (535-4354) is absent from the directory table.** Gov.bb lists five contact lines for this ministry; the alpha.gov.bb source markdown includes only three, omitting the PS direct number. The main PBX (535-4350) is stored in `ministries.ts` and renders on the live page, but the PS direct line 535-4354 is absent entirely.

---

## Claims

### Claim 1 — Ministry name in opening sentence (line 1)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Environment and Natural Beautification is to promote and facilitate the sustainable use of our resources by encouraging the involvement of all citizens and the integration of environmental considerations into all aspects of national development.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Ministry of the Environment, National Beautification and Fisheries is to promote and facilitate the sustainable use of our resources by encouraging the involvement of all citizens and the integration of environmental and maritime considerations into all aspects of national development.</pre>
</div>

- **Type:** agency name / descriptive
- **Status:** discrepant — two errors: (a) "Natural" should be "National"; (b) the current official name includes "and Fisheries"; (c) the ozone.gov.bb current mission text also adds "and maritime considerations"
- **Sources:** [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment) (uses "National Beautification" throughout; no "Natural"); [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/) (full name: "Ministry of the Environment, National Beautification and Fisheries"); [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8) (confirms "Environment, National Beautification and Fisheries")
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — the opening sentence misspells the ministry name. This is the text indexed by search engines and the first thing citizens read.

---

### Claim 2 — Vision statement (lines 12–13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To be the lead agency in the preservation, conservation, and protection of the country's environment and to ensuring that environmental consideration is at the heart of Barbados' Sustainable Development agenda.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To be the lead agency in the preservation, conservation, and protection of the country's environment and to ensuring that environmental consideration is at the heart of Barbados' Sustainable Development agenda.</pre>
</div>

- **Type:** descriptive
- **Status:** verified — substance matches the vision on ozone.gov.bb
- **Sources:** [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/) (vision: "the lead agency in the preservation, conservation, and protection of the country's environment")
- **Certainty:** 85%
- **Note:** The grammatical infelicity "to ensuring" (should be "to ensure") is present in the source text on gov.bb as well; it is faithfully reproduced and not an error introduced by alpha.gov.bb.

---

### Claim 3 — Mission statement (lines 17–23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Mission of the Ministry of Environment and National Beautification is:

"To formulate and implement environmental management programmes that:

1. Facilitate the sustainable use of our natural resources.
2. Complement the national, social, and economic development agenda; and
3. Include stakeholder input into decision making."</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — appears to be an older mission statement</div>
<pre class="claim-block-content">ozone.gov.bb (the ministry's dedicated site) states the current mission verbatim as:
"The mission of the Ministry of the Environment, National Beautification and Fisheries (MENB) is to promote and facilitate the sustainable use of our resources by encouraging the involvement of all citizens and integration of environmental and maritime considerations into all aspects of national development."

The three-point formulation on alpha.gov.bb is not contradicted by any source but does not appear in current authoritative ministry publications. It may predate the Fisheries portfolio addition.

Checked: [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/); [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)</pre>
</div>

- **Type:** descriptive
- **Status:** unverifiable — the three-point formulation does not appear in current ministry sources; the ozone.gov.bb version is different and likely more current
- **Sources:** [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/); [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)
- **Certainty:** 50%
- **Open question:** Confirm with MENB communications team which mission statement is current: the three-point formulation on alpha.gov.bb or the single-paragraph version on ozone.gov.bb. The ozone.gov.bb version also references "maritime considerations" reflecting the Fisheries addition.

---

### Claim 4 — Core values (lines 27–30)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">- Science driven, evidence-based decision-making
- Transparency
- Professionalism
- Respect</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">- Science driven, evidence-based decision-making
- Transparency
- Professionalism
- Respect</pre>
</div>

- **Type:** descriptive
- **Status:** verified — identical four core values appear on ozone.gov.bb
- **Sources:** [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/)
- **Certainty:** 90%

---

### Claim 5 — Directory: Secretary to the Permanent Secretary phone (line 7)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Secretary to the Permanent Secretary    (246) 535-4357</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Secretary to the Permanent Secretary    (246) 535-4357</pre>
</div>

- **Type:** phone
- **Status:** verified
- **Sources:** [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment) (lists 535-4357 for Secretary to the Permanent Secretary)
- **Certainty:** 99%

---

### Claim 6 — Directory: Permanent Secretary (Blue and Green Economy) phone (line 8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Permanent Secretary (Blue and Green Economy)    (246) 535-0038</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Permanent Secretary (Blue and Green Economy)    (246) 535-0038</pre>
</div>

- **Type:** phone
- **Status:** verified
- **Sources:** [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)
- **Certainty:** 99%

---

### Claim 7 — Directory: Secretary to PS (Blue and Green Economy) phone (line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Secretary to the Permanent Secretary (Blue and Green Economy)    (246) 535-0042</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Secretary to the Permanent Secretary (Blue and Green Economy)    (246) 535-0042</pre>
</div>

- **Type:** phone
- **Status:** verified
- **Sources:** [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)
- **Certainty:** 99%

---

### Claim 8 — Permanent Secretary direct line absent from directory (lines 5–9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page — directory contains only 3 rows</div>
<pre class="claim-block-content">| Secretary to the Permanent Secretary                          | (246) 535-4357 |
| Permanent Secretary (Blue and Green Economy)                  | (246) 535-0038 |
| Secretary to the Permanent Secretary (Blue and Green Economy) | (246) 535-0042 |
(no "Permanent Secretary" row)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should include — Permanent Secretary direct line</div>
<pre class="claim-block-content">| Permanent Secretary                                           | (246) 535-4354 |
| Secretary to the Permanent Secretary                          | (246) 535-4357 |
| Permanent Secretary (Blue and Green Economy)                  | (246) 535-0038 |
| Secretary to the Permanent Secretary (Blue and Green Economy) | (246) 535-0042 |</pre>
</div>

- **Type:** phone
- **Status:** discrepant — (246) 535-4354 is published on gov.bb as the Permanent Secretary's direct number but is absent from the alpha.gov.bb directory table
- **Sources:** [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment) (lists "(246) 535-4354" for "Permanent Secretary"); [UNCCD — David Leacock, Barbados focal point](https://www.unccd.int/focal-points/barbados/mr-david-leacock) (records +1-246 535-4354 for Ministry PS)
- **Certainty:** 97%
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — citizens needing the Permanent Secretary directly cannot find the number on this page.

---

### Claim 9 — Minister name and title (from `ministries.ts` lines 356–359)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on live page)</div>
<pre class="claim-block-content">The Hon. Santia J. O. Bradshaw, M.P.
Deputy Prime Minister, Minister of Environment, National Beautification and Fisheries, and Leader of Government Business in the House of Assembly</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (adding "the" before Environment)</div>
<pre class="claim-block-content">The Hon. Santia J. O. Bradshaw, M.P.
Deputy Prime Minister, Minister of the Environment, National Beautification and Fisheries, and Leader of Government Business in the House of Assembly</pre>
</div>

- **Type:** agency name
- **Status:** discrepant — `ministries.ts` omits the article "the" before "Environment." Barbados Today's sworn-in article and ozone.gov.bb both use "Minister of the Environment." Parliament's own page is inconsistent, making this a low-confidence discrepancy.
- **Sources:** [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8) (Parliament omits "the": "Minister of Environment, National Beautification and Fisheries"); [Barbados Today — Cabinet sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) (includes "the": "Minister of the Environment, National Beautification and Fisheries"); [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/) (uses "Ministry of the Environment")
- **Certainty:** 80%
- **Confidence it's wrong:** 65% — Parliament itself is inconsistent on the article; this is a low-confidence discrepancy
- **Citizen impact:** LOW — naming variation; does not affect services.

---

### Claim 10 — Ministry address (from `ministries.ts` lines 375–381)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts (rendered on live page)</div>
<pre class="claim-block-content">10th Floor Warrens Tower II
Warrens
St. Michael, BB12001
Barbados, W. I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">10th Floor Warrens Tower II
Warrens
St. Michael, BB12001
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Status:** verified
- **Sources:** [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)
- **Certainty:** 99%

---

### Claim 11 — biodiversity.gov.bb link (line 90)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Go to biodiversity.gov.bb
(href: https://biodiversity.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Go to biodiversity.gov.bb
(href: https://biodiversity.gov.bb/)</pre>
</div>

- **Type:** URL
- **Status:** verified — live, updated as recently as May 2026, maintained by MENB
- **Sources:** [biodiversity.gov.bb](https://biodiversity.gov.bb/) (live; most recent article dated May 22, 2026)
- **Certainty:** 99%

---

### Claim 12 — nhdbdos.com link for Natural Heritage (line 119)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Go to nhdbdos.com
(href: http://www.nhdbdos.com/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say — replace with live authoritative URL</div>
<pre class="claim-block-content">Go to gov.bb/Departments/natural-heritage
(href: https://www.gov.bb/Departments/natural-heritage)

Alternative: https://biodiversity.gov.bb/ministry/natural-heritage-department/</pre>
</div>

- **Type:** URL
- **Status:** discrepant — `http://www.nhdbdos.com/` returns ECONNREFUSED as of 2026-05-29; the site is not live. The Natural Heritage Department has authoritative pages on gov.bb and biodiversity.gov.bb. Re-confirmed broken on this pass.
- **Sources:** [nhdbdos.com attempt](http://www.nhdbdos.com/) (ECONNREFUSED); [gov.bb — Natural Heritage Department](https://www.gov.bb/Departments/natural-heritage) (live; lists director Steve Devonish, location St. Thomas); [biodiversity.gov.bb — Natural Heritage Department](https://biodiversity.gov.bb/ministry/natural-heritage-department/) (live)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — broken link on a government page erodes trust; citizens seeking Natural Heritage information are left without a working destination.

---

### Claim 13 — solid.gov.bb link for Solid Waste programmes (line 129)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Go to solid.gov.bb
(href: https://solid.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Go to solid.gov.bb
(href: https://solid.gov.bb/)</pre>
</div>

- **Type:** URL
- **Status:** verified — live and operational; belongs to Barbados Solid Waste Management Programme (MENB); contact email pmcu.swmp@barbados.gov.bb, phone +246 535-4880
- **Sources:** [solid.gov.bb](https://solid.gov.bb/)
- **Certainty:** 99%

---

### Claim 14 — National Botanical Garden at Waterford (line 164)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To develop the National Botanical Garden at Waterford as a safe habitat for biodiversity, a place of beauty, art, culture, recreation and low-impact entertainment</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To develop the National Botanical Garden at Waterford as a safe habitat for biodiversity, a place of beauty, art, culture, recreation and low-impact entertainment</pre>
</div>

- **Type:** address / descriptive
- **Status:** verified — the National Botanical Gardens is confirmed at Waterford, St. Michael, established 2019, spanning approx. 36 acres
- **Sources:** [barbados.org — National Botanical Gardens](https://barbados.org/barbados-botanical-gardens.htm); [events.barbados.org — National Botanical Gardens venue](https://events.barbados.org/venue/national-botanical-gardens/); [GIS — Plans For National Botanical Gardens](https://gisbarbados.gov.bb/blog/plans-for-national-botanical-gardens/) (confirms Waterford)
- **Certainty:** 90%

---

### Claim 15 — Montreal Protocol / Vienna Convention reference (lines 80–82)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Developing and implementing measures for the eventual phase-out of Ozone Depleting Substances (ODS) in compliance with national obligations and targets established under the Montreal Protocol to the Vienna Convention on the Protection of the Ozone Layer</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Developing and implementing measures for the eventual phase-out of Ozone Depleting Substances (ODS) in compliance with national obligations and targets established under the Montreal Protocol to the Vienna Convention on the Protection of the Ozone Layer</pre>
</div>

- **Type:** legal reference / descriptive
- **Status:** verified — the Montreal Protocol is formally a protocol under the Vienna Convention for the Protection of the Ozone Layer (1985). The phrasing is the standard accepted description. Barbados operates the National Ozone Unit under MENB in compliance with this protocol.
- **Sources:** [ozone.unep.org — Montreal Protocol](https://ozone.unep.org/treaties/montreal-protocol); [ozone.gov.bb — The Ministry](https://ozone.gov.bb/the-ministry/) (confirms Barbados MENB's ODS phase-out mandate)
- **Certainty:** 98%

---

### Claim 16 — Clean and Green Facebook page (line 177)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Facebook: facebook.com/officalcleanandgreen
(href: https://www.facebook.com/officalcleanandgreen/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Facebook: facebook.com/officalcleanandgreen
(href: https://www.facebook.com/officalcleanandgreen/)</pre>
</div>

- **Type:** URL
- **Status:** verified — Facebook page is live and titled "Clean And Green Barbados"
- **Sources:** [facebook.com/officalcleanandgreen](https://www.facebook.com/officalcleanandgreen/) (live; returns "Clean And Green Barbados"); [PMO — Creating a clean and green Barbados (2021)](https://pmo.gov.bb/2021/03/17/creating-a-clean-and-green-barbados/) (references the programme)
- **Certainty:** 85%
- **Note:** The handle "offical" (one 'i') is the programme's own chosen username — it is a misspelling of "official" but not an error introduced by alpha.gov.bb.

---

### Claim 17 — Clean and Green Instagram handle (line 178)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Instagram: @cleanandgreenbarbados
(href: https://instagram.com/cleanandgreenbarbados)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — account status not confirmable</div>
<pre class="claim-block-content">The URL https://instagram.com/cleanandgreenbarbados could not be confirmed as live. Instagram's anti-scraping measures prevented verification via WebFetch. A web search for "cleanandgreenbarbados" returned no direct match confirming this as the current official account. Gov.bb's Ministry of Environment page does not list any social media handles.

Checked: [instagram.com/cleanandgreenbarbados](https://instagram.com/cleanandgreenbarbados) (page loads; content unreadable via automated fetch); [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment) (no social handles listed).</pre>
</div>

- **Type:** URL
- **Status:** unverifiable — cannot confirm whether @cleanandgreenbarbados is the active official Instagram account
- **Sources:** [instagram.com/cleanandgreenbarbados](https://instagram.com/cleanandgreenbarbados) (attempted; unconfirmable); [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)
- **Certainty:** 45%
- **Open question:** Confirm with MENB / Clean and Green team whether @cleanandgreenbarbados is the current active Instagram handle for the programme.

---

### Claim 18 — Clean and Green Twitter handle (line 179)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Twitter: @BarbadosGreen
(href: http://twitter.com/BarbadosGreen)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — Twitter/X anti-scraping prevents confirmation</div>
<pre class="claim-block-content">Twitter.com redirects to X.com and requires login for most profile views. Web searches for "@BarbadosGreen Clean Green Barbados" did not return direct confirmation of the account's current status or ownership. Gov.bb does not list any Twitter handle for the ministry or the Clean and Green programme.

Checked: [twitter.com/BarbadosGreen](http://twitter.com/BarbadosGreen) (unconfirmable via automated fetch); [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment) (no social handles listed); [PMO — Clean and Green (2021)](https://pmo.gov.bb/2021/03/17/creating-a-clean-and-green-barbados/) (does not reference Twitter handle).</pre>
</div>

- **Type:** URL
- **Status:** unverifiable — Twitter/X's anti-scraping measures prevent automated verification; no Tier 1 or Tier 2 source confirms @BarbadosGreen as the official handle
- **Sources:** [twitter.com/BarbadosGreen attempt](http://twitter.com/BarbadosGreen) (unconfirmable); [gov.bb — Ministry of Environment](https://www.gov.bb/Ministries/environment)
- **Certainty:** 45%
- **Open question:** Confirm with MENB / Clean and Green team whether @BarbadosGreen on X (formerly Twitter) is the current official account for the programme.

---

### Claim 19 — weplantin.org link (line 202)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Go to weplantin.org
(href: http://www.weplantin.org/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say — replace with live NCC page</div>
<pre class="claim-block-content">Go to nccbarbados.com/a-million-trees/
(href: https://www.nccbarbados.com/a-million-trees/)</pre>
</div>

- **Type:** URL
- **Status:** discrepant — `http://www.weplantin.org/` returns ECONNREFUSED as of 2026-05-29 (re-confirmed on this pass). The programme is confirmed active (NCC administers it with hotline 536-TREE / (246) 536-8733; most recent dated content from 2025). The authoritative live page is hosted by the NCC.
- **Sources:** [weplantin.org attempt](http://www.weplantin.org/) (ECONNREFUSED); [nccbarbados.com — We Plantin'](https://www.nccbarbados.com/a-million-trees/) (live; programme active, tree counter and participation guidance included); [Barbados Today — Tree planting drive (Jan 2026)](https://barbadostoday.bb/2026/01/11/tree-planting-drive-strengthens-environmental-food-security-goals-2/)
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — broken link to an active national programme; citizens wishing to participate in the national tree planting initiative cannot reach the site.

---

## Additional findings (not on the page but should be)

### Ministry name discrepancy: `ministries.ts` name field vs full official name

`ministries.ts` line 349 stores `name: "Ministry of Environment and National Beautification"`. The current official full name is **"Ministry of the Environment, National Beautification and Fisheries"**. The minister's role title in line 358 correctly includes "Fisheries" in the portfolio description, creating an internal inconsistency: the ministry `name` field does not match the minister's own portfolio description. This discrepancy also propagates to the page `<title>` tag and any breadcrumb that uses `ministry.name`.

### "Natural Beautification" typo only on line 1 — four other occurrences are correct

The source file uses "National Beautification" correctly at lines 17, 39, 41, and 169. Only line 1 has the "Natural" typo. The fix is surgical: change one word on one line.

### Main PBX (535-4350) present in `ministries.ts` but not in source markdown

The main PBX (246) 535-4350 is stored in `ministries.ts` line 367 and rendered on the live page via the data file's contact array. It is not in the source markdown's directory table. This is by design (data file drives the contact rendering for ministries) but means the markdown directory table is incomplete relative to what citizens actually see on the live page.

### Fisheries Division and Coastal Zone Management Unit now associated departments

`ministries.ts` lines 397–401 correctly includes Fisheries Division and Coastal Zone Management Unit under the "Blue Economy" category in `associatedDepartments`. This is consistent with the expanded Fisheries portfolio. No discrepancy in the data file for this.

---

## Sources cited

- [gov.bb — Ministry of Environment and National Beautification](https://www.gov.bb/Ministries/environment) — primary authoritative source; all phones, fax, email, address verified here
- [ozone.gov.bb — About the MENB](https://ozone.gov.bb/the-ministry/) — ministry's dedicated National Ozone Unit site; current mission statement, vision, core values, and full official name
- [biodiversity.gov.bb](https://biodiversity.gov.bb/) — MENB biodiversity site; confirmed live May 2026
- [biodiversity.gov.bb — Natural Heritage Department](https://biodiversity.gov.bb/ministry/natural-heritage-department/) — live replacement for defunct nhdbdos.com
- [gov.bb — Natural Heritage Department](https://www.gov.bb/Departments/natural-heritage) — second live replacement for nhdbdos.com; lists director Steve Devonish
- [solid.gov.bb](https://solid.gov.bb/) — Solid Waste Management Programme; confirmed live
- [nccbarbados.com — We Plantin'](https://www.nccbarbados.com/a-million-trees/) — NCC's live We Plantin' programme page; replacement for weplantin.org; hotline (246) 536-8733
- [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8) — confirms Santia Bradshaw's portfolio title
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — confirms "Minister of the Environment, National Beautification and Fisheries" with article "the"
- [Barbados Today — Tree planting drive (Jan 2026)](https://barbadostoday.bb/2026/01/11/tree-planting-drive-strengthens-environmental-food-security-goals-2/) — confirms We Plantin' programme is still active
- [facebook.com/officalcleanandgreen](https://www.facebook.com/officalcleanandgreen/) — Clean and Green Barbados Facebook; confirmed live
- [PMO — Creating a clean and green Barbados (Mar 2021)](https://pmo.gov.bb/2021/03/17/creating-a-clean-and-green-barbados/) — background on the programme
- [UNCCD — David Leacock, Barbados focal point](https://www.unccd.int/focal-points/barbados/mr-david-leacock) — corroborates PS direct line 535-4354
- [ozone.unep.org — Montreal Protocol](https://ozone.unep.org/treaties/montreal-protocol) — confirms Montreal Protocol is under Vienna Convention
- [barbados.org — National Botanical Gardens](https://barbados.org/barbados-botanical-gardens.htm) — confirms Waterford, St. Michael location; 36 acres; established 2019
- [nhdbdos.com attempt](http://www.nhdbdos.com/) — ECONNREFUSED; confirmed dead link (re-confirmed 2026-05-29)
- [weplantin.org attempt](http://www.weplantin.org/) — ECONNREFUSED; confirmed dead link (re-confirmed 2026-05-29)
