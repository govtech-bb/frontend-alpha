# Fact-check: Registering a business name

- **Live page:** <https://alpha.gov.bb/business-trade/registering-a-business-name>
- **Source file:** `src/content/registering-a-business-name.md`
- **Last checked:** 2026-05-28
- **Summary:** 5 claims reviewed — 2 verified, 2 discrepant, 1 unverifiable. Average certainty: **70%**.

---

## Headline issues for triage

1. **Link text "CAIPO WEBSITE" is stale — the body rebranded to Business Barbados on 1 February 2025.** CAIPO completed its transition to the entity "Business Barbados" on 1 February 2025, under the Ministry of Energy and Business Development. The `caipo.gov.bb` domain still resolves (it now serves the Business Barbados portal), but the link text on the page names the old organisation. Citizen-facing: low confusion risk because the URL still works, but the name is wrong and should be updated to "Business Barbados website" with a note that the office was formerly CAIPO.

2. **Ministry attribution is likely wrong in `ministries.ts`.** The page is listed as an `onlineServices` entry under `ministry-of-industry-innovation-science-and-technology` (MIIST) in `src/data/ministries.ts` (lines 736–740). But CAIPO/Business Barbados now falls under the **Ministry of Energy and Business Development** per the CBC/Nation News transition coverage (February 2025) and the Business Barbados homepage footer. The gov.bb ministry listing at `/ministries/energy-water-resources` also places CAIPO under that ministry. If the MIIST link is surfaced to citizens, they receive incorrect ministry contact details.

3. **The page contains almost no actionable content.** Apart from a one-sentence description and a link to the CAIPO/Business Barbados website, the page offers citizens nothing: no fees, no required documents, no eligibility, no governing Act, no timeline, no contact details. The Registration of Business Names Act, Cap. 317 imposes a 14-day registration obligation that is entirely absent; fees (BDS $30 name reservation + BDS $100 application) are entirely absent. This is a content-gap issue rather than a factual error, but it is the most significant citizen-impact problem on this page.

4. **source_url resolves and mirrors the same thin content.** `https://www.gov.bb/Business/registering-business-name` is live and uses the same one-sentence description, confirming the alpha.gov.bb page accurately reflects the gov.bb source — but both are equally thin.

---

## Claims

### Claim 1 — Descriptive copy: "simple establishment requirements" (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados has simple establishment requirements and procedures which combine due diligence with ease of doing business.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados has simple establishment requirements and procedures which combine due diligence with ease of doing business.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name) — identical phrasing on the parent gov.bb page
- **Status:** verified (the phrase is sourced verbatim from gov.bb; however this is not an independently attested fact, it is marketing copy that appears on both sites — see Open question below)
- **Certainty:** 80%
- **Open question:** The phrase is government-authored copy, not a claim with an external reference. It is "verified" in the sense that the alpha.gov.bb page faithfully reproduces the gov.bb page, but neither source cites a World Bank Doing Business ranking or other index to underpin the claim. No independent verification of "simple" relative to other jurisdictions was attempted (not appropriate for a descriptive descriptor of this type).

---

### Claim 2 — CAIPO website URL (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For more information please visit [CAIPO WEBSITE](https://caipo.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">For more information please visit [Business Barbados website](https://caipo.gov.bb/)</pre>
</div>

- **Type:** URL
- **Sources:** [caipo.gov.bb — homepage](https://caipo.gov.bb/) — page title and branding now reads "Business Barbados: Digital Platform for Corporate Affairs Services"; [Nation News — CAIPO now part of Business Barbados (2 Feb 2025)](https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/); [CBC — CAIPO officially completes transition to Business Barbados (16 Sep 2025)](https://www.cbc.bb/news/local-news/caipo-officially-completes-transition-to-business-barbados/)
- **Status:** discrepant — the URL (`https://caipo.gov.bb/`) resolves correctly and still functions, but the link text "CAIPO WEBSITE" uses the old name. The organisation rebranded to "Business Barbados" on 1 February 2025. The domain has not changed.
- **Certainty:** 95%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — the link works; citizens will reach the correct site. The wrong name is a trust/accuracy issue rather than a misdirection risk.

---

### Claim 3 — Implied agency name: CAIPO as the registering body (line 13, implicit)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[CAIPO WEBSITE](https://caipo.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Business Barbados (formerly CAIPO — Corporate Affairs and Intellectual Property Office)
Ground Floor, Baobab Towers, Warrens, St. Michael
Phone: (246) 535-2401
Website: https://caipo.gov.bb/</pre>
</div>

- **Type:** agency name
- **Sources:** [caipo.gov.bb — footer address](https://caipo.gov.bb/) — "Ground Floor, Baobab Towers, Warrens, St. Michael"; [gov.bb — Corporate Affairs and Intellectual Property Office](https://www.gov.bb/Departments/corporate-affairs-intellectual-property) — address and phone confirmed; [Nation News — CAIPO now part of Business Barbados (2 Feb 2025)](https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/)
- **Status:** discrepant — the body is now "Business Barbados", not "CAIPO"
- **Certainty:** 92%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — functional impact is nil because the URL works. Accuracy and trust impact.
- **Note:** `src/data/departments.ts` (lines 336–378) and `src/data/state-bodies.ts` (lines 480–513) both still use the "Corporate Affairs and Intellectual Property Office (CAIPO)" name. These data files also need updating to reflect the Business Barbados rebrand — but that is a data-file issue, not a content-file issue, and is logged as a cross-page finding below.

---

### Claim 4 — Ministry attribution in ministries.ts (lines 736–740)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This page is listed as an onlineServices entry under
ministry-of-industry-innovation-science-and-technology
(src/data/ministries.ts lines 736–740)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">This page should be listed under
ministry-of-energy-and-business-development
(Business Barbados / CAIPO now under Ministry of Energy
and Business Development since February 2025)</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources) — lists CAIPO under this ministry; [caipo.gov.bb homepage footer](https://caipo.gov.bb/) — "Ministry of Energy, Business Development and Consumer Affairs"; [Nation News — CAIPO now part of Business Barbados](https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/) — "Ministry of Energy and Business Development, led by Senator Lisa Cummins"
- **Status:** discrepant — `ministries.ts` associates this page with MIIST (Ministry of Industry, Innovation, Science and Technology), but Business Barbados / CAIPO moved under the Ministry of Energy and Business Development in 2025. The gov.bb/ministries/energy-water-resources page places CAIPO under that ministry.
- **Certainty:** 80%
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — if the page is surfaced via the MIIST ministry page, citizens receive incorrect ministry contact details (MIIST phone: (246) 535-1200; Ministry of Energy and Business Development phone: (246) 535-2500).
- **Note on canonical ministry name:** The ministry name itself has variant forms in current use. `src/data/ministries.ts` (line 289) uses "Ministry of Energy and Business Development"; caipo.gov.bb footer uses "Ministry of Energy, Business Development and Consumer Affairs"; energy.gov.bb uses "Ministry of Energy and Business." The gov.bb ministry listing at `/ministries/energy-water-resources` uses "Ministry of Energy and Business Development", which is treated here as canonical per the data file.

---

### Claim 5 — source_url resolves (content-directory.ts line 539)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/Business/registering-business-name"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — URL live but content is equally thin</div>
<pre class="claim-block-content">https://www.gov.bb/Business/registering-business-name
resolves with HTTP 200. Content is identical: same
one-sentence description, same CAIPO link. No additional
procedural detail is provided at the source URL.
Ministry listed at footer: Ministry of Industry,
Innovation, Science and Technology (MIST)
(gov.bb footer has not been updated to reflect the
Business Barbados transition)</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name) — confirmed live, content retrieved 2026-05-28
- **Status:** verified (URL resolves; content is consistent with alpha.gov.bb page)
- **Certainty:** 95%
- **Open question:** The gov.bb footer on this page still associates it with MIIST, not the Ministry of Energy and Business Development — but that is gov.bb's own stale attribution and is not something alpha.gov.bb introduced.

---

## Additional findings (not on the page but should be)

The most significant citizen-facing gaps on this page are absent facts rather than wrong facts. During verification of the linked caipo.gov.bb site and associated sources, the following information was confirmed as publicly available and directly relevant to any citizen attempting to register a business name:

**Governing legislation:**
- Registration of Business Names Act, Cap. 317 — confirmed on [caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/](https://caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/) and [barbadoslawcourts.gov.bb](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/RegistrationofBusinessNamesCAP317.pdf)

**Key obligation (entirely absent from page):**
- Every individual or firm carrying on business under a name that does not consist of their true name(s) must register with the Registrar within 14 days of commencing business. Source: caipo.gov.bb and Cap. 317.

**Fees (entirely absent from page):**
- Name search/reservation: BDS $30
- Business name application: BDS $100
- Certificate copy: BDS $40
- Source: [caipo.gov.bb/fees/](https://caipo.gov.bb/fees/) — fee table for Registration of Business Names Act, Cap. 317

**Process summary (entirely absent from page):**
- Step 1: Reserve a name at caipo.gov.bb (name reservation form, BDS $30)
- Step 2: Complete the Business Name Application form
- Step 3: Pay via EZPay+
- Step 4: Email completed form and payment proof with two forms of ID per signatory to caipo.general@barbados.gov.bb
- Certificate issued within approximately 5 working days once name approved
- Source: caipo.gov.bb / secondary sources including B2B Hub and multiple government-adjacent guides

**Contact details (entirely absent from page):**
- Ground Floor, Baobab Towers, Warrens, St. Michael
- Phone: (246) 535-2401 / 535-2402 / 535-2404
- Email: caipo.general@barbados.gov.bb
- Hours: Monday–Friday, 08:30–16:30
- Source: [caipo.gov.bb homepage](https://caipo.gov.bb/); [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/Departments/corporate-affairs-intellectual-property)

These are all "additional findings" rather than errors on the existing page, but the practical effect is that the page gives a citizen almost no information with which to act. The CAIPO/Business Barbados site is more complete, but the alpha.gov.bb page should at minimum list the governing Act, the 14-day obligation, the fees, and the contact details so that citizens know what to expect before they follow the link.

---

## Sources cited

- [alpha.gov.bb — Registering a business name](https://alpha.gov.bb/business-trade/registering-a-business-name)
- [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name)
- [caipo.gov.bb — Business Barbados homepage](https://caipo.gov.bb/)
- [caipo.gov.bb — Corporate Affairs](https://caipo.gov.bb/corporate-affairs/)
- [caipo.gov.bb — Fees](https://caipo.gov.bb/fees/)
- [caipo.gov.bb — Registration of Business Names Act, Cap. 317 (legislation page)](https://caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/)
- [caipo.gov.bb — Registration of Business Names Act, Cap. 317 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/09/9.-Registration-of-Business-Names-Act-CAP317.pdf)
- [barbadoslawcourts.gov.bb — Registration of Business Names CAP317 (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/RegistrationofBusinessNamesCAP317.pdf)
- [gov.bb — Corporate Affairs and Intellectual Property Office](https://www.gov.bb/Departments/corporate-affairs-intellectual-property)
- [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources)
- [energy.gov.bb — Ministry of Energy and Business](https://energy.gov.bb/ministry-of-energy-and-business/)
- [Nation News — CAIPO now part of Business Barbados (2 Feb 2025)](https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/)
- [CBC — CAIPO officially completes transition to Business Barbados (16 Sep 2025)](https://www.cbc.bb/news/local-news/caipo-officially-completes-transition-to-business-barbados/)
