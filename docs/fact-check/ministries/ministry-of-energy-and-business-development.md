# Fact-check: Ministry of Energy and Business Development

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-energy-and-business-development>
- **Source file:** `src/content/ministries/ministry-of-energy-and-business-development.md`
- **Data file:** `src/data/ministries.ts` (lines 288–347)
- **Last checked:** 2026-05-28
- **Summary:** 32 claims reviewed — 25 verified, 4 discrepant, 3 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **Chief Project Analyst phone number is wrong.** The directory on the page lists `(246) 535-2506` for the Chief Project Analyst role. The energy.gov.bb Our Team page (Tier 1) lists the Chief Project Analyst (Mrs. Claire Corbin) at `+1246 535-2536`. The connectb1m.com directory (sourced from the gov.bb directory) also lists 535-2506 for this role, creating a genuine conflict between two secondary-derived sources. However, the energy.gov.bb Our Team page is a first-party Tier 1 source and should be authoritative for current personal assignments. This warrants agency confirmation.

2. **Both Facebook URLs on the page point to non-canonical slugs.** The page lists `facebook.com/energydivisionbarbados` and `facebook.com/energydivision-barbados` as two separate Facebook entries. The actual canonical Facebook page for the Energy Division is `facebook.com/EnergyBarbados/` — confirmed by Facebook search results, GIS Barbados's own Facebook posts linking to that page, and the Energy Division's own published contact info. The two slugs listed on the page do not exist as active standalone pages; `EnergyBarbados` is the live canonical URL. Citizens clicking either listed link may encounter a dead end or be redirected unexpectedly.

3. **`ministries.ts` minister role title omits "Commerce".** The `ministries.ts` data file (line 294) records the minister's role as "Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector" — this is **correct**. However, the ministry slug name "Ministry of Energy and Business Development" does not include "Commerce", whereas the Barbados Parliament cabinet list (February 2026) and Barbados Today report the portfolio as "Energy, Business Development and Commerce". The ministry's own commercial website is `commerce.gov.bb`. The omission of "Commerce" from the ministry name as displayed to citizens may create confusion.

4. **Renewable Energy Licence link resolves to a raw PDF with no context.** The inline hyperlink on line 5 (`?wpdmdl=1885&ind=1616784951507`) downloads a PDF directly from energy.gov.bb with no landing page. The PDF was created in Adobe InDesign CS6 in November 2017 and is 430 KB. There is no way to verify from public sources that this is the current, in-force version of the licence form — the Electric Light and Power Act has been amended multiple times since 2017 (2015, 2019, 2021 amendments confirmed), and an Electricity Supply Bill 2023 is in draft. Citizens clicking this link receive an undated PDF download with no surrounding guidance.

---

## Claims

### Claim 1 — Mandate: Energy Division responsibilities (lines 1–8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Energy Division is responsible for all matters related to energy in Barbados. These include:

- Energy policy and planning
- Energy Licencing — renewable and non-renewable
- Matters related to Oil and Gas
- Matters related to Renewable Energy and Energy Efficiency
- Geology and Mining</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Energy Division is responsible for all matters related to energy in Barbados. These include:

- Energy policy and planning
- Energy Licencing — renewable and non-renewable
- Matters related to Oil and Gas
- Matters related to Renewable Energy and Energy Efficiency
- Geology and Mining</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [energy.gov.bb — Ministry of Energy and Business](https://energy.gov.bb/ministry-of-energy-and-business/); [smartenergybarbados.com — Energy Division About](https://smartenergybarbados.com/energy-division/about/) — both confirm oil and gas, renewable energy, geology and mining as core responsibilities; [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources)
- **Status:** verified
- **Certainty:** 90%
- **Note:** The term "Energy Division" is the operating unit name used throughout the ministry's own websites. "Geology and Mining" as a responsibility is confirmed by the energy.gov.bb "Natural Resources Department" having earth science and geology functions. Note that the energy.gov.bb legislation page lists the Mines Regulation Act, Quarries Act, and related instruments as within the ministry's legislative remit.

---

### Claim 2 — Renewable Energy Licence link (line 5)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[Renewable Energy Licence](https://energy.gov.bb/?wpdmdl=1885&ind=1616784951507)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify currency — needs agency confirmation</div>
<pre class="claim-block-content">The URL resolves and downloads a PDF (430 KB, created November 2017 in Adobe InDesign CS6).
The Electric Light and Power Act CAP.278 has been amended in 2015, 2019, and 2021, and a
replacement Electricity Supply Bill 2023 is in draft. Whether this is the current
in-force licence form cannot be confirmed from public sources.</pre>
</div>

- **Type:** URL / document link
- **Sources:** [energy.gov.bb — Barbados Legislation](https://energy.gov.bb/our-publications/barbados-legislation/) — lists Electric Light & Power Act (CAP.278), amendments 2015, 2019, Control of Inefficient Lighting Act 2021, and Draft Electricity Supply Bill 2023; [Barbados Today — Govt, Light & Power sign licences (Nov 2025)](https://barbadostoday.bb/2025/11/29/govt-light-power-sign-licences-to-unlock-500m-in-renewable-projects/) — confirms active licensing under current legislation
- **Status:** unverifiable (URL resolves; currency of the form cannot be confirmed)
- **Certainty:** 50%
- **Citizen impact:** MEDIUM — a citizen downloading an outdated licence form and submitting it could face rejection or delay.
- **Open question:** Has this PDF form been superseded by an updated version under the 2019 or 2021 amendments? The Energy Division should confirm whether `?wpdmdl=1885` is still the current application form and, if so, add a version date to the link text.

---

### Claim 3 — Online channel: energy.gov.bb website (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Website   energy.gov.bb   https://energy.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Website   energy.gov.bb   https://energy.gov.bb</pre>
</div>

- **Type:** URL
- **Sources:** [energy.gov.bb](https://energy.gov.bb) — live, loads correctly, is the official ministry website
- **Status:** verified
- **Certainty:** 99%

---

### Claim 4 — Online channel: smartenergybarbados.com (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Website   smartenergybarbados.com   https://smartenergybarbados.com</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Website   smartenergybarbados.com   https://smartenergybarbados.com</pre>
</div>

- **Type:** URL
- **Sources:** [smartenergybarbados.com](https://smartenergybarbados.com) — live, is an official platform of the Energy Division for the Barbados National Energy Policy; [GIS Barbados — Smart Energy Barbados launch](https://gisbarbados.gov.bb/blog/householders-right-to-renewable-energy-policy-now-in-operation/)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Instagram: @smartenergybarbados (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Instagram   @smartenergybarbados   https://instagram.com/smartenergybarbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Instagram   @smartenergybarbados   https://instagram.com/smartenergybarbados</pre>
</div>

- **Type:** URL
- **Sources:** [smartenergybarbados.com Contact Us](https://smartenergybarbados.com/energy-division/contact-us/) — lists `instagram.com/smartenergybarbados` as an official channel
- **Status:** verified
- **Certainty:** 90%

---

### Claim 6 — Instagram: @energybarbados (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Instagram   @energybarbados   https://instagram.com/energybarbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Instagram   @energybarbados   https://instagram.com/energybarbados</pre>
</div>

- **Type:** URL
- **Sources:** [instagram.com/energybarbados](https://www.instagram.com/energybarbados/) — confirmed live by search results as "Energy Division - Barbados" official Instagram account with 1,445 followers (as of 2025–2026 search results)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 7 — Facebook: energydivisionbarbados (lines 18–19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Facebook   energydivisionbarbados    https://facebook.com/energydivisionbarbados
Facebook   @energydivision-barbados  https://facebook.com/energydivision-barbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Facebook   EnergyBarbados   https://www.facebook.com/EnergyBarbados/</pre>
</div>

- **Type:** URL
- **Sources:** [GIS Barbados Facebook — post linking to EnergyBarbados](https://www.facebook.com/gisbarbados/posts/the-ministry-of-energy-and-business-meb-energy-division-at-trinity-business-cent/1118467866986295/); [facebook.com/EnergyBarbados/](https://www.facebook.com/EnergyBarbados/) — confirmed via search as the live canonical Facebook page for the Energy Division, located at "Trinity Business Centre, Country Road, Bridgetown"; connectb1m.com directory also maps the Energy Division to this page
- **Status:** discrepant
- **Certainty:** 80%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — both listed Facebook slugs (`energydivisionbarbados` and `energydivision-barbados`) do not correspond to the live canonical page (`EnergyBarbados`). A citizen following either link may reach a dead page or an unrelated page. The two separate table rows suggesting two distinct Facebook accounts add confusion; there is one Facebook page.
- **Note:** The connectb1m.com directory (which mirrors the gov.bb directory) lists both "energydivisionbarbados" and "@energydivision-barbados" as the social handles — it appears both alpha.gov.bb and connectb1m.com sourced from an outdated internal gov.bb directory entry. The live page is `EnergyBarbados`.

---

### Claim 8 — LinkedIn URL (line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">LinkedIn   linkedin.com/company/energy-barbados   https://www.linkedin.com/company/energy-barbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">LinkedIn   linkedin.com/company/energy-barbados   https://www.linkedin.com/company/energy-barbados</pre>
</div>

- **Type:** URL
- **Sources:** [bb.linkedin.com/company/energy-barbados](https://bb.linkedin.com/company/energy-barbados) — confirmed by search result "Energy Division - Government of Barbados" at this URL
- **Status:** verified
- **Certainty:** 90%

---

### Claim 9 — General phone (246) 535-2500 (line 26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">General   (246) 535-2500</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">General   (246) 535-2500</pre>
</div>

- **Type:** phone
- **Sources:** [energy.gov.bb — Contact Us](https://energy.gov.bb/contact-us/); [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [smartenergybarbados.com — Contact Us](https://smartenergybarbados.com/energy-division/contact-us/)
- **Status:** verified
- **Certainty:** 99% — consistent across three independent Tier 1 sources.

---

### Claim 10 — Minister phone (246) 535-7709 (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Minister   (246) 535-7709</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Minister   (246) 535-7709</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 11 — Minister's PA phone (246) 535-7714 (line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Minister's PA   (246) 535-7714</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Minister's PA   (246) 535-7714</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 12 — Minister's Secretary phone (246) 535-7734 (line 29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Minister's Secretary   (246) 535-7734</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Minister's Secretary   (246) 535-7734</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 13 — Permanent Secretary phone (246) 535-2531 (line 30)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Permanent Secretary   (246) 535-2531</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Permanent Secretary   (246) 535-2531</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%
- **Note:** The energy.gov.bb Our Team page lists 535-2531 against Ms. Keisha Reid with the title "Deputy Permanent Secretary" — not Permanent Secretary. This may indicate a data entry swap on the Our Team page, or a recent role reassignment. The gov.bb Ministries page and connectb1m.com consistently place 535-2531 with "Permanent Secretary", which is the more widely reproduced figure. This warrants agency confirmation if the page's Our Team listing is current.

---

### Claim 14 — Secretary to the Permanent Secretary phone (246) 535-2530 (line 31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Secretary to the Permanent Secretary   (246) 535-2530</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Secretary to the Permanent Secretary   (246) 535-2530</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 15 — Permanent Secretary (Special Assignment) phone (246) 535-2581 (line 32)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Permanent Secretary (Special Assignment)   (246) 535-2581</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Permanent Secretary (Special Assignment)   (246) 535-2581</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 16 — Deputy Permanent Secretary phone (246) 535-2503 (line 33)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Deputy Permanent Secretary   (246) 535-2503</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Deputy Permanent Secretary   (246) 535-2503</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 85%
- **Note:** The energy.gov.bb Our Team page records Ms. Keisha Reid (Deputy Permanent Secretary) at 535-2531 — the same number the page and gov.bb assign to "Permanent Secretary". There appears to be a swap in the energy.gov.bb Our Team list. Given two consistent independent sources (gov.bb + connectb1m.com) confirm 535-2503 for "Deputy Permanent Secretary", this claim is treated as verified.

---

### Claim 17 — Chief Legal Officer phone (246) 535-2508 (line 34)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Chief Legal Officer   (246) 535-2508</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Chief Legal Officer   (246) 535-2508</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/); [energy.gov.bb — Our Team](https://energy.gov.bb/ministry-of-energy-and-business/our-team/) — Ms. Samantha Cummins (Chief Legal Officer) at 535-2508
- **Status:** verified
- **Certainty:** 99% — three independent sources agree.

---

### Claim 18 — Director, Natural Resources phone (246) 535-2507 (line 35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Director, Natural Resources   (246) 535-2507</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Director, Natural Resources   (246) 535-2507</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/); [energy.gov.bb — Our Team](https://energy.gov.bb/ministry-of-energy-and-business/our-team/) — Mr. Jamar White (Director) at (246) 535-2507
- **Status:** verified
- **Certainty:** 99% — three independent sources agree.

---

### Claim 19 — Chief Project Analyst phone (246) 535-2506 (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Chief Project Analyst   (246) 535-2506</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Chief Project Analyst   (246) 535-2536</pre>
</div>

- **Type:** phone
- **Sources:** [energy.gov.bb — Our Team](https://energy.gov.bb/ministry-of-energy-and-business/our-team/) — Mrs. Claire Corbin (Chief Project Analyst) at `+1246 535-2536`; [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources) and [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/) — both list 535-2506 for this role
- **Status:** discrepant
- **Certainty:** 60%
- **Confidence it's wrong:** 65%
- **Citizen impact:** LOW — a caller dialling 535-2506 will likely reach another ministry desk rather than the Chief Project Analyst; minor inconvenience.
- **Open question:** energy.gov.bb Our Team (Tier 1, first-party) shows 535-2536 for Mrs. Claire Corbin. The gov.bb Ministries directory (also Tier 1) shows 535-2506. The two authoritative sources conflict. Agency confirmation is needed to determine which number is current. The two digits "06" vs "36" suggest a possible transcription error in one of the sources.

---

### Claim 20 — Chief Energy Conservation Officer phone (246) 535-2541 (line 37)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Chief Energy Conservation Officer   (246) 535-2541</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Chief Energy Conservation Officer   (246) 535-2541</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 21 — Accountant phone (246) 535-2504 (line 38)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Accountant   (246) 535-2504</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Accountant   (246) 535-2504</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/); [energy.gov.bb — Our Team](https://energy.gov.bb/ministry-of-energy-and-business/our-team/) — Ms. Juanita Small (Accountant) at 535-2504
- **Status:** verified
- **Certainty:** 99%

---

### Claim 22 — Programme Manager phone (246) 535-2509 (line 39)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Programme Manager   (246) 535-2509</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Programme Manager   (246) 535-2509</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 23 — Project Director phone (246) 535-2584 (line 40)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Project Director   (246) 535-2584</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Project Director   (246) 535-2584</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [connectb1m.com — Energy Division directory](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 24 — Ministry name: "Ministry of Energy and Business Development" (ministries.ts line 289)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Ministry of Energy and Business Development</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — "Commerce" may be omitted</div>
<pre class="claim-block-content">The Barbados Parliament cabinet list (February 2026) gives Kerrie Symmonds's portfolio as
"Energy, Business Development and Commerce" — i.e. the word "Commerce" is present.
The ministry's own commerce website is commerce.gov.bb. However, gov.bb's own ministry
directory page uses the slug "energy-water-resources" and displays the name as
"Ministry of Energy and Business Development" (without "Commerce"). Both usages
coexist in official sources; the full legal name requires confirmation.</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Energy, Business Development and Commerce" portfolio; [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources) — uses "Ministry of Energy and Business Development"; [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- **Status:** unverifiable (conflicting authoritative sources on whether "Commerce" is part of the ministry name)
- **Certainty:** 70%
- **Open question:** What is the gazetted/legal name of this ministry as at 2026? The Parliament website gives "Energy, Business Development and Commerce" as the portfolio; gov.bb uses "Ministry of Energy and Business Development". These could reflect the portfolio title vs. the ministry name, or a naming inconsistency. The GovBB team should confirm with the Cabinet Secretariat which is the formal ministry name for use on alpha.gov.bb.

---

### Claim 25 — Minister name: "The Hon. Kerrie D. Symmonds, M.P." (ministries.ts line 292)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">The Hon. Kerrie D. Symmonds, M.P.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Hon. Kerrie D. Symmonds, M.P.</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8); [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/); [Barbados Parliament — Hon. Kerrie D. Symmonds, M.P.](https://www.barbadosparliament.com/member/details/9)
- **Status:** verified
- **Certainty:** 99%

---

### Claim 26 — Minister role title (ministries.ts line 294)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Hon. Kerrie D. Symmonds, M.P. – Energy, Business Development and Commerce"; [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — "Minister of Energy, Business Development and Commerce, and Senior Minister coordinating the Productive Sector"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 27 — Email: info@energy.gov.bb (ministries.ts line 297)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">info@energy.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">info@energy.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [energy.gov.bb — Contact Us](https://energy.gov.bb/contact-us/); [facebook.com/EnergyBarbados/](https://www.facebook.com/EnergyBarbados/) — both list info@energy.gov.bb as the official email
- **Status:** verified
- **Certainty:** 95%

---

### Claim 28 — General telephone (246) 535-2500 in ministries.ts (line 300)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts</div>
<pre class="claim-block-content">(246) 535-2500</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">(246) 535-2500</pre>
</div>

- **Type:** phone
- **Sources:** [energy.gov.bb — Contact Us](https://energy.gov.bb/contact-us/); [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [smartenergybarbados.com — Contact Us](https://smartenergybarbados.com/energy-division/contact-us/)
- **Status:** verified
- **Certainty:** 99%
- **Note:** This is the same as Claim 9; included here to audit the ministries.ts data file entry separately from the content markdown directory table.

---

### Claim 29 — Address: Trinity Business Centre, Country Road, St. Michael (ministries.ts lines 305–309)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Trinity Business Centre
Country Road
St. Michael
Barbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Trinity Business Centre
Country Road
St. Michael
Barbados</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources); [smartenergybarbados.com — Contact Us](https://smartenergybarbados.com/energy-division/contact-us/) — "Trinity Business Center, Country Road, St. Michael, Barbados"; [govserv.org — Energy Division - Barbados (2025)](https://www.govserv.org/BB/Bridgetown/134629793307560/Energy-Division---Barbados); [GIS Barbados Facebook post — confirms Trinity Business Centre, Country Road](https://www.facebook.com/gisbarbados/posts/the-ministry-of-energy-and-business-meb-energy-division-at-trinity-business-cent/1118467866986295/)
- **Status:** verified
- **Certainty:** 99% — four independent sources confirm this address.

---

### Claim 30 — originalSource URL in ministries.ts (line 314)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts</div>
<pre class="claim-block-content">https://www.gov.bb/Ministries/energy-water-resources</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.gov.bb/Ministries/energy-water-resources</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources) — URL is live and serves the ministry page
- **Status:** verified
- **Certainty:** 95%
- **Note:** The URL slug `energy-water-resources` is a legacy slug from when the ministry was named "Ministry of Energy and Water Resources". The page content at this URL now describes the current "Ministry of Energy and Business Development", so the slug mismatch does not affect citizens — but it is evidence of a former ministry name that may appear in older documents.

---

### Claim 31 — Associated department: "Small Business Development Unit" (ministries.ts line 326)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts</div>
<pre class="claim-block-content">Small Business Development Unit</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — name may be outdated</div>
<pre class="claim-block-content">The energy.gov.bb Contact Us page refers to the ministry unit responsible for small business
as "Energy, Small Business and Entrepreneurship" (the ministry HQ heading for that section).
The Barbados Today Feb 2026 cabinet article refers to an "$81 million plan" across
"Microenterprise Development, Cooperative Development" and other units under Symmonds.
Whether the operative unit name is "Small Business Development Unit" or a differently-titled
body (e.g. Small Business Development Centre, or a unit under commerce.gov.bb) cannot be
confirmed from Tier 1 sources checked.</pre>
</div>

- **Type:** agency name
- **Sources:** [energy.gov.bb — Contact Us](https://energy.gov.bb/contact-us/) — labels this section "Energy, Small Business and Entrepreneurship"; [Barbados Today — Energy minister $81m plan (6 Mar 2026)](https://barbadostoday.bb/2026/03/06/energy-minister-oil-price-surge-demands-vigilance-policy-interventions/); [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources)
- **Status:** unverifiable (unit name partially corroborated but exact title not confirmed from Tier 1)
- **Certainty:** 55%
- **Open question:** What is the current official name of the small business unit within MEBD? The energy.gov.bb portal groups it under "Energy, Small Business and Entrepreneurship" but the formal unit name for citizen-facing directories is unclear.

---

### Claim 32 — Associated department: "Corporate Affairs and Intellectual Property Office" (ministries.ts line 340)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in ministries.ts</div>
<pre class="claim-block-content">Corporate Affairs and Intellectual Property Office</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (noting rebrand to Business Barbados Feb 2025)</div>
<pre class="claim-block-content">Corporate Affairs and Intellectual Property Office
(rebranded as "Business Barbados" on 1 February 2025; caipo.gov.bb
now redirects to the Business Barbados portal)</pre>
</div>

- **Type:** agency name
- **Sources:** [caipo.gov.bb](https://caipo.gov.bb) — domain live, now serves Business Barbados portal per prior verification; see [/docs/fact-check/registering-a-business-name.md](/home/gavin/frontend-alpha/docs/fact-check/registering-a-business-name.md) Claim 2 and Headline Issue 1
- **Status:** verified (the CAIPO name is still in use on the gov.bb directory alongside "Business Barbados"; the listing is not wrong, just incomplete as a citizen-facing name)
- **Certainty:** 90%
- **Note:** Per memory note `ref-caipo-business-barbados-rebrand.md`, CAIPO rebranded to Business Barbados on 1 February 2025. The ministries.ts entry uses the former name. For citizen clarity, this should ideally read "Business Barbados (formerly CAIPO)". This is a Tier-B content quality issue, not a factual error — caipo.gov.bb still resolves and the body is attributed to the correct ministry.

---

## Additional findings (not on the page but should be)

1. **commerce.gov.bb is the ministry's third official website** and hosts the ministry's commercial/trade functions (Fair Trading Commission matters, vendor support, small business directory, consumer affairs). It is not listed in the Online channels table. However, the site has a TLS certificate error that prevents automated access — citizens may encounter this. Ministry may wish to add it once the TLS issue is resolved, or link to the FTC directly.

2. **The "Barbados National Energy Policy 2019–2030" (BNEP)** is a major policy document the energy.gov.bb site prominently features. The ministry page on alpha.gov.bb makes no reference to it. Adding a link would benefit citizens seeking to understand the broader energy strategy context.

3. **No physical address in the content markdown.** The address "Trinity Business Centre, Country Road, St. Michael" is stored only in `ministries.ts` (and rendered to citizens via the data file). If a citizen views a cached or stripped version of the page, the address may not appear. The address is correct and fully verified.

4. **energy.gov.bb opening hours: Mon–Fri 08:15–16:30.** This is confirmed by the energy.gov.bb Contact Us page but is not listed on the alpha.gov.bb page or in `ministries.ts`.

---

## Sources cited

- [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/Ministries/energy-water-resources)
- [energy.gov.bb — Home](https://energy.gov.bb/)
- [energy.gov.bb — Ministry of Energy and Business](https://energy.gov.bb/ministry-of-energy-and-business/)
- [energy.gov.bb — Contact Us](https://energy.gov.bb/contact-us/)
- [energy.gov.bb — Our Team](https://energy.gov.bb/ministry-of-energy-and-business/our-team/)
- [energy.gov.bb — Barbados Legislation](https://energy.gov.bb/our-publications/barbados-legislation/)
- [smartenergybarbados.com — Energy Division](https://smartenergybarbados.com/energy-division/)
- [smartenergybarbados.com — Contact Us](https://smartenergybarbados.com/energy-division/contact-us/)
- [Barbados Parliament — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8)
- [Barbados Parliament — Hon. Kerrie D. Symmonds, M.P.](https://www.barbadosparliament.com/member/details/9)
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- [Barbados Today — Energy minister: Oil price surge (6 Mar 2026)](https://barbadostoday.bb/2026/03/06/energy-minister-oil-price-surge-demands-vigilance-policy-interventions/)
- [Barbados Today — Govt, Light & Power sign licences (29 Nov 2025)](https://barbadostoday.bb/2025/11/29/govt-light-power-sign-licences-to-unlock-500m-in-renewable-projects/)
- [connectb1m.com — Ministry of Energy and Business Development (Energy Division)](https://connectb1m.com/ministry-of-energy-and-business-development-energy-division/)
- [govserv.org — Energy Division - Barbados (2025)](https://www.govserv.org/BB/Bridgetown/134629793307560/Energy-Division---Barbados)
- [GIS Barbados — Tag: Minister of Energy and Business Development](https://gisbarbados.gov.bb/blog/tag/minister-of-energy-and-business-development/)
- [GIS Barbados — Householders' Right To Renewable Energy Policy Now In Operation](https://gisbarbados.gov.bb/blog/householders-right-to-renewable-energy-policy-now-in-operation/)
- [GIS Barbados Facebook — Trinity Business Centre post](https://www.facebook.com/gisbarbados/posts/the-ministry-of-energy-and-business-meb-energy-division-at-trinity-business-cent/1118467866986295/)
- [instagram.com/energybarbados](https://www.instagram.com/energybarbados/)
- [facebook.com/EnergyBarbados/](https://www.facebook.com/EnergyBarbados/)
- [bb.linkedin.com/company/energy-barbados](https://bb.linkedin.com/company/energy-barbados)
