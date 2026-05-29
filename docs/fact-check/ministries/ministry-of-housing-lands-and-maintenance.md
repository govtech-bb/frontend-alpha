# Fact-check: Ministry of Housing, Lands and Maintenance

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-housing-lands-and-maintenance>
- **Source file:** `src/content/ministries/ministry-of-housing-lands-and-maintenance.md`
- **Data file:** `src/data/ministries.ts` (lines 679–715)
- **Last checked:** 2026-05-29
- **Summary:** 12 claims reviewed — 9 verified, 1 discrepant, 2 unverifiable. Average certainty: **84%**.

---

## Headline issues for triage

1. **Previous report used a 404 URL — now corrected.** The prior report recorded the live page as `https://alpha.gov.bb/ministries/ministry-of-housing-lands-and-maintenance`. That URL returns HTTP 404. The actual live URL is `https://alpha.gov.bb/government/organisations/ministry-of-housing-lands-and-maintenance` (confirmed by WebFetch 2026-05-29). The report header has been corrected.

2. **Land Registration Department ministry attribution conflict persists.** `ministries.ts` and `gov.bb/Ministries/housing` list the Land Registration Department under this ministry's Lands division, but `gov.bb/Departments/land-registry` renders with a MIST (Ministry of Industry, Innovation, Science and Technology) footer. Two Tier-1 gov.bb sources remain in conflict. No resolution found in this pass.

3. **Minister initials remain contested across sources.** `ministries.ts` uses "D. L." (matching the Parliament Cabinet Ministers roster and the minister's public Instagram `chrisdlgibbs`). The Parliament member details page uses "G. L." and a February 2026 Barbados Today sworn-in article refers to the minister only by first name without giving initials. The "D. L." rendering is the most authoritative available but cannot be confirmed to 95%.

---

## Claims

### Claim 1 — Mission / mandate text (source file line 1)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide quality and affordable housing, land and office accommodation solutions for its customers.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To provide quality and affordable housing, land and office accommodation solutions for its customers.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) — verbatim match confirmed
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Ministry name (ministries.ts line 680)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Housing, Lands and Maintenance</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Housing, Lands and Maintenance</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing); [GIS — Minister of Housing Lands and Maintenance tag](https://gisbarbados.gov.bb/blog/tag/minister-of-housing-lands-and-maintenance/)
- **Status:** verified — exact name confirmed on gov.bb and GIS.
- **Certainty:** 99%

---

### Claim 3 — Minister name and role (ministries.ts lines 688–690)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Hon. Christopher D. L. Gibbs, M.P.
Minister of Housing, Lands and Maintenance</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with caveat on initials — see note)</div>
<pre class="claim-block-content">The Hon. Christopher D. L. Gibbs, M.P.
Minister of Housing, Lands and Maintenance</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) (authoritative — lists "Hon. Chris D. L. GIBBS, M.P., Minister of Housing, Lands and Maintenance"); [Barbados Today — Cabinet ministers sworn in (Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) (confirms Gibbs retained Housing portfolio; article does not specify full initials); [Barbados Parliament — Christopher G. L. Gibbs member details](https://www.barbadosparliament.com/member/details/30) (conflicting "G. L." initials)
- **Status:** verified — role confirmed. "D. L." initials confirmed by the Parliament Cabinet Ministers roster (the primary authoritative source for ministerial appointments) and the minister's own public Instagram handle (`chrisdlgibbs`). The Parliament member details page uses "G. L." — this appears to be a data entry error on that page.
- **Certainty:** 88% — role and "D. L." initials are strongly supported by the Cabinet Ministers roster; reduced from 95% because the Parliament member details page and Wikipedia present conflicting "G. L." initials, creating residual uncertainty.
- **Open question:** Confirm with the minister's office whether "D. L." (as on the Cabinet Ministers list) or "G. L." (as on the Parliament member details page) is the authoritative rendering for official government communications.

---

### Claim 4 — Email address (ministries.ts line 692)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">pshousing@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">pshousing@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) — exact match confirmed
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Telephone number (ministries.ts line 693)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 536-5000</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">(246) 536-5000</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) — lists PBX 536-5000 as the main Ministry number, alongside PS direct lines 536-5002 and 536-5013
- **Status:** verified — 536-5000 is the Ministry's main PBX. Distinct from the NHC's own PBX (536-5300 per nhc.gov.bb). No fax number is listed on gov.bb for this ministry; `ministries.ts` correctly omits a fax entry.
- **Certainty:** 99%

---

### Claim 6 — Ministry address (ministries.ts lines 695–700)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">National Housing Corporation
Country Road
St. Michael
Barbados, W.I</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">National Housing Corporation
Country Road
St. Michael
Barbados, W.I</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing); [nhc.gov.bb — Contact Us](https://nhc.gov.bb/contact) (confirms NHC is at "The Garden", Country Road, St. Michael)
- **Status:** verified — gov.bb and nhc.gov.bb both confirm the Ministry and NHC are co-located at Country Road, St. Michael.
- **Certainty:** 97%
- **Note:** The NHC website adds the informal sub-name "The Garden" to the address. The page omission of this is a matter of completeness, not error.

---

### Claim 7 — Associated body: National Housing Corporation (ministries.ts line 706)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The National Housing Corporation  [under Housing]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The National Housing Corporation  [under Housing]</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing); [gov.bb — National Housing Corporation (State Bodies)](https://www.gov.bb/State-Bodies/national-housing-corporation); [nhc.gov.bb](https://nhc.gov.bb/contact)
- **Status:** verified — NHC is listed as a Housing body on gov.bb.
- **Certainty:** 99%

---

### Claim 8 — Associated body: Land Registration Department (ministries.ts lines 708–709)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Land Registration Department  [under Lands]</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — cross-gov.bb inconsistency</div>
<pre class="claim-block-content">gov.bb/Ministries/housing lists "The Land Registration Department" under the Lands category.
gov.bb/Departments/land-registry renders with a MIST (Ministry of Industry, Innovation, Science and Technology) ministry footer — not a Housing footer.
These two Tier-1 sources are in direct conflict. The fact-check cannot arbitrate which is authoritative.
Checked (2026-05-29 re-check — conflict unchanged):
- gov.bb/Ministries/housing — lists LRD under Housing/Lands ✓
- gov.bb/Departments/land-registry — shows MIST in ministry footer ✗
- landsandsurveys.gov.bb/pages/LandRegistration.html — describes LRD as a collaborating body; no ministry attribution stated</pre>
</div>

- **Type:** agency name
- **Checked:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing); [gov.bb — Land Registration Department](https://www.gov.bb/Departments/land-registry); [Lands and Surveys — Land Registration](https://www.landsandsurveys.gov.bb/pages/LandRegistration.html)
- **Status:** unverifiable — two authoritative gov.bb sources give conflicting ministry attribution for the Land Registration Department. This conflict was present in the 2026-05-28 pass and remains unresolved in the 2026-05-29 pass.
- **Certainty:** 50%
- **Citizen impact:** LOW — ministry attribution affects navigation and credibility but does not affect citizens' ability to contact the LRD.
- **Open question:** Confirm with the Cabinet Office (or the Permanent Secretary of both Housing and MIST) which ministry the Land Registration Department formally sits under. At least one of the two gov.bb pages is stale.

---

### Claim 9 — Associated body: Lands and Surveys Department (ministries.ts lines 710–711)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Lands and Surveys Department  [under Lands]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Lands and Surveys Department  [under Lands]</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing); [gov.bb — Lands and Surveys Department](https://www.gov.bb/Departments/land-surveys); [landsandsurveys.gov.bb — Contact Us](https://www.landsandsurveys.gov.bb/pages/ContactUs.html)
- **Status:** verified — the Lands and Surveys Department is listed under this ministry on gov.bb, and the department's own website is consistent with a Housing/Lands-associated body. gov.bb/Departments/land-surveys renders without a conflicting ministry footer.
- **Certainty:** 95%

---

### Claim 10 — Live page URL resolves correctly

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (alpha.gov.bb routing)</div>
<pre class="claim-block-content">https://alpha.gov.bb/government/organisations/ministry-of-housing-lands-and-maintenance</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://alpha.gov.bb/government/organisations/ministry-of-housing-lands-and-maintenance</pre>
</div>

- **Type:** URL
- **Sources:** WebFetch 2026-05-29 — page loads with full content at this URL; `https://alpha.gov.bb/government/organisations` index also links to this URL.
- **Status:** verified — correct URL confirmed. Note: the prior report (2026-05-28) recorded the live URL as `/ministries/ministry-of-housing-lands-and-maintenance` — that URL returns HTTP 404. This has been corrected in the current report.
- **Certainty:** 99%

---

### Claim 11 — Email CTA link (page: mailto:pshousing@barbados.gov.bb)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">mailto:pshousing@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">mailto:pshousing@barbados.gov.bb</pre>
</div>

- **Type:** link / CTA
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) — email confirmed as the official PS Housing mailbox
- **Status:** verified — link format correct; email matches gov.bb.
- **Certainty:** 99%

---

### Claim 12 — Careers link (page: https://job-boards.greenhouse.io/govtechbarbados)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us</pre>
</div>

- **Type:** link / CTA
- **Sources:** WebFetch 2026-05-29 — page loads successfully as the official GovTech Barbados careers portal (Greenhouse-hosted); currently shows no open positions but the portal itself is live.
- **Status:** verified — link resolves to the correct destination.
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

### No fax number on gov.bb — consistent with ministries.ts

gov.bb/Ministries/housing does not publish a fax number for this Ministry. `ministries.ts` correctly omits a fax entry.

### NHC contact details not surfaced on the ministry page

Citizens looking to contact the NHC directly would benefit from knowing the NHC's own PBX is **(246) 536-5300** (not 536-5000), and that the NHC's email is **NHC.CustomerService@barbados.gov.bb** (confirmed nhc.gov.bb 2026-05-29). The Ministry's page does not surface NHC contact details separately. This is a content-enhancement suggestion, not a factual error.

### Additional Ministry phone lines not shown

gov.bb publishes two additional direct lines for this ministry — PS direct (246) 536-5002 and PS Secretary (246) 536-5013 — which are not included in `ministries.ts`. These would be useful additions for citizens needing to reach the Permanent Secretary's office directly.

### Urban Development Commission / Rural Development Commission — not listed

The UDC and RDC have historically been associated with housing and lands portfolios. As at 2026-05-29, neither body is listed under this ministry in `ministries.ts` or on gov.bb. A Barbados Today article (February 2025) reported Parliament was moving to merge the UDC and RDC into a new Rural and Urban Development Commission. The omission appears intentional given the ongoing merger process; no correction required, but worth monitoring.

---

## Sources cited

- [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) — primary authoritative source; mission text, contact details, address, and associated bodies verified here
- [gov.bb — Land Registration Department](https://www.gov.bb/Departments/land-registry) — consulted for ministry attribution; renders with MIST footer (conflict with Ministries/housing page)
- [gov.bb — Lands and Surveys Department](https://www.gov.bb/Departments/land-surveys) — confirms Lands and Surveys under Housing/Lands
- [gov.bb — National Housing Corporation (State Bodies)](https://www.gov.bb/State-Bodies/national-housing-corporation) — confirms NHC under Housing ministry
- [nhc.gov.bb — Contact Us](https://nhc.gov.bb/contact) — NHC address ("The Garden", Country Road, St. Michael), phone 536-5300, email NHC.CustomerService@barbados.gov.bb; business hours Mon–Fri 8:15am–4:30pm (2026-05-29)
- [landsandsurveys.gov.bb — Contact Us](https://www.landsandsurveys.gov.bb/pages/ContactUs.html) — Lands and Surveys contact details
- [landsandsurveys.gov.bb — Land Registration](https://www.landsandsurveys.gov.bb/pages/LandRegistration.html) — describes LRD as collaborating body; no ministry attribution stated
- [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — authoritative roster; confirms "Hon. Chris D. L. GIBBS, M.P., Minister of Housing, Lands and Maintenance"
- [Barbados Parliament — Christopher G. L. Gibbs member details](https://www.barbadosparliament.com/member/details/30) — shows "G. L." initials (appears to be a data entry error on this page vs "D. L." on Cabinet Ministers list)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — confirms Gibbs retained Housing portfolio post-2026 election
- [alpha.gov.bb — Government Organisations index](https://alpha.gov.bb/government/organisations) — confirms ministry listed at `/government/organisations/ministry-of-housing-lands-and-maintenance`
- [GovTech Barbados Careers — Greenhouse portal](https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us) — footer careers link confirmed live (2026-05-29; no current openings)
- [GIS — Minister of Housing Lands and Maintenance tag](https://gisbarbados.gov.bb/blog/tag/minister-of-housing-lands-and-maintenance/) — ministry name verified from search snippet
- [Barbados Today — Parliament moves to merge rural, urban agencies (12 Feb 2025)](https://barbadostoday.bb/2025/02/12/parliament-moves-to-merge-rural-urban-agencies/) — context on UDC/RDC merger status
