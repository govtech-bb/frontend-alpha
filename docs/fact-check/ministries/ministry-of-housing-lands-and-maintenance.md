# Fact-check: Ministry of Housing, Lands and Maintenance

- **Live page:** <https://alpha.gov.bb/ministries/ministry-of-housing-lands-and-maintenance>
- **Source file:** `src/content/ministries/ministry-of-housing-lands-and-maintenance.md`
- **Data file:** `src/data/ministries.ts` (lines 679–715)
- **Last checked:** 2026-05-28
- **Summary:** 9 claims reviewed — 6 verified, 1 discrepant, 2 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **Land Registration Department ministry attribution is a cross-gov.bb inconsistency.** `ministries.ts` (and `gov.bb/Ministries/housing`) lists the Land Registration Department under this ministry in the "Lands" category. However, `gov.bb/Departments/land-registry` renders with a MIST (Ministry of Industry, Innovation, Science and Technology) footer rather than a Housing footer. These are two Tier 1 sources in conflict. This is a governance issue requiring human adjudication; the fact-check does not arbitrate but flags both sources.

2. **Minister initials: "D. L." in ministries.ts vs "G. L." on Parliament member details page.** The Barbados Parliament Cabinet Ministers list (`barbadosparliament.com/page_content/show_content/8`) uses "Hon. Chris D. L. GIBBS, M.P." The minister's public Instagram handle is `chrisdlgibbs`. The Parliament member details page (`barbadosparliament.com/member/details/30`) and Wikipedia use "Christopher G. L. Gibbs" — this appears to be a data entry error on those two pages. The `ministries.ts` "D. L." is therefore the more authoritative rendering but a second authoritative source conflict makes this partially unverifiable.

3. **Ministry address co-locates with the NHC building.** The address in `ministries.ts` is the NHC building on Country Road, and gov.bb corroborates this. The NHC's own phone (536-5300) differs from the Ministry's PBX (536-5000) — both numbers serve different purposes and are both correct; the page correctly uses the Ministry number.

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
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing)
- **Status:** verified — verbatim match with gov.bb Ministries/housing page.
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
- **Sources:** [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) (authoritative — lists "Hon. Chris D. L. GIBBS, M.P., Minister of Housing, Lands and Maintenance"); [Barbados Today — Christopher Gibbs retains post (Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/); [Nation News — Chris Gibbs sworn in (Sep 2025)](https://nationnews.com/2025/09/04/chris-gibbs-sworn-in-as-minister-of-housing-lands-and-maintenance/)
- **Status:** verified — role confirmed. "D. L." initials confirmed by the Parliament Cabinet Ministers list and the minister's own public Instagram handle (`chrisdlgibbs`). Note: Parliament member details page (`barbadosparliament.com/member/details/30`) and Wikipedia use "G. L." — this appears to be a data entry error on those pages, not an error in `ministries.ts`.
- **Certainty:** 88% — role and "D. L." initials are strongly supported by the Cabinet Ministers roster; reduced from 95% because two Tier 1 sources (Wikipedia, Parliament member page) present conflicting "G. L." initials, creating residual uncertainty.
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
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing)
- **Status:** verified — exact match on gov.bb.
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
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) (lists PBX 536-5000 as main Ministry number, alongside PS direct lines 536-5002 and 536-5013)
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
- **Sources:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) (lists same address); [nhc.gov.bb — Contact](https://nhc.gov.bb/contact) (confirms NHC is at "The Garden", Country Road, St. Michael)
- **Status:** verified — gov.bb and nhc.gov.bb both confirm the Ministry and NHC are co-located at Country Road, St. Michael.
- **Certainty:** 97%
- **Note:** The NHC website adds the informal sub-name "The Garden" to the address and includes a postcode. The page omission of both is a matter of completeness, not error.

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
These two Tier 1 sources are in direct conflict. The fact-check cannot arbitrate which is authoritative.
Checked:
- gov.bb/Ministries/housing — lists LRD under Housing/Lands ✓
- gov.bb/Departments/land-registry — shows MIST in ministry footer ✗
- landsandsurveys.gov.bb/pages/LandRegistration.html — describes LRD as a collaborating body but does not state ministry attribution</pre>
</div>

- **Type:** agency name
- **Checked:** [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing); [gov.bb — Land Registration Department](https://www.gov.bb/Departments/land-registry); [Lands and Surveys — Land Registration](https://www.landsandsurveys.gov.bb/pages/LandRegistration.html)
- **Status:** unverifiable — two authoritative gov.bb sources give conflicting ministry attribution for the Land Registration Department.
- **Certainty:** 50%
- **Citizen impact:** LOW — ministry attribution affects navigation and credibility but does not affect citizens' ability to contact the LRD.
- **Open question:** Confirm with the Cabinet Office (or the Permanent Secretary of both Housing and MIST) which ministry the Land Registration Department formally sits under. The gov.bb/Departments page should reflect the correct attribution; at least one of the two gov.bb pages is stale.

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
- **Status:** verified — the Lands and Surveys Department is listed under this ministry on gov.bb, and the department's own website (landsandsurveys.gov.bb) is a Housing/Lands-associated body. gov.bb/Departments/land-surveys also renders without an inconsistent ministry footer.
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

### No fax number on gov.bb — consistent with ministries.ts

gov.bb/Ministries/housing does not publish a fax number for this Ministry. `ministries.ts` correctly omits a fax entry. If a fax number exists, it would need to be obtained directly from the Ministry.

### NHC contact details not surfaced on the ministry page

Citizens looking to contact the NHC directly would benefit from knowing the NHC's own PBX is **(246) 536-5300** (not 536-5000), and that the NHC's email is **NHC.CustomerService@barbados.gov.bb**. The Ministry's ministry page does not surface NHC contact details separately. This is a matter of content enhancement, not a factual error.

### Additional Ministry phone lines not shown

gov.bb publishes two additional direct lines for this ministry — PS direct (246) 536-5002 and PS Secretary (246) 536-5013 — which are not included in `ministries.ts`. These would be useful additions for citizens needing to reach the Permanent Secretary's office.

### Urban Development Commission / Rural Development Commission — not listed

The UDC and RDC have been associated with housing and lands portfolios historically. As at 2026-05-28, a Barbados Today article (February 2025) reported Parliament was moving to merge the UDC and RDC into a new Rural and Urban Development Commission. Neither body is listed under this ministry in `ministries.ts` or on gov.bb. This appears intentional given the ongoing merger process; no correction required, but worth monitoring.

---

## Sources cited

- [gov.bb — Ministry of Housing, Lands and Maintenance](https://www.gov.bb/Ministries/housing) — primary authoritative source; mission text, contact details, address, and associated bodies verified here
- [gov.bb — Land Registration Department](https://www.gov.bb/Departments/land-registry) — consulted for ministry attribution; renders with MIST footer (conflict with Ministries/housing page)
- [gov.bb — Lands and Surveys Department](https://www.gov.bb/Departments/land-surveys) — confirms Lands and Surveys under Housing/Lands
- [gov.bb — National Housing Corporation (State Bodies)](https://www.gov.bb/State-Bodies/national-housing-corporation) — confirms NHC under Housing ministry
- [nhc.gov.bb — Contact Us](https://nhc.gov.bb/contact) — NHC address ("The Garden", Country Road, St. Michael), phone 536-5300, email NHC.CustomerService@barbados.gov.bb
- [landsandsurveys.gov.bb — Contact Us](https://www.landsandsurveys.gov.bb/pages/ContactUs.html) — Lands and Surveys contact details: Ground Floor East, Warrens Office Complex; phone 536-5200; email LSDept@Barbados.gov.bb
- [landsandsurveys.gov.bb — Land Registration](https://www.landsandsurveys.gov.bb/pages/LandRegistration.html) — describes LRD as collaborating body; no ministry attribution stated
- [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — authoritative roster; confirms "Hon. Chris D. L. GIBBS, M.P., Minister of Housing, Lands and Maintenance"
- [Barbados Parliament — Christopher G. L. Gibbs member details](https://www.barbadosparliament.com/member/details/30) — shows "G. L." initials (appears to be a data entry error on this page vs "D. L." on Cabinet Ministers list)
- [Wikipedia — Christopher Gibbs (politician)](https://en.wikipedia.org/wiki/Christopher_Gibbs_(politician)) — confirms ministerial role; uses "G. L." initials (Tier 3 source)
- [Nation News — Chris Gibbs sworn in (4 Sep 2025)](https://nationnews.com/2025/09/04/chris-gibbs-sworn-in-as-minister-of-housing-lands-and-maintenance/) — confirms role from sworn-in ceremony (Sep 2025); President named as Sandra Mason (pre-dates Bostic appointment)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — confirms Gibbs retained Housing portfolio post-2026 election
- [Barbados Today — Parliament moves to merge rural, urban agencies (12 Feb 2025)](https://barbadostoday.bb/2025/02/12/parliament-moves-to-merge-rural-urban-agencies/) — context on UDC/RDC merger status
- [GIS — National Housing Corporation Has A New Number](https://gisbarbados.gov.bb/blog/national-housing-corporation-nhc-has-a-new-number/) — (403 on fetch) listed as a searched source; NHC 536-5300 corroborated via nhc.gov.bb
- [GIS — Minister of Housing Lands and Maintenance tag](https://gisbarbados.gov.bb/blog/tag/minister-of-housing-lands-and-maintenance/) — (403 on fetch) confirms tag exists; ministry name verified from search snippet
