# Fact-check: Registering a business name

- **Live page:** <https://alpha.gov.bb/business-trade/registering-a-business-name>
- **Source file:** `src/content/registering-a-business-name.md`
- **Last checked:** 2026-05-29
- **Summary:** 6 claims reviewed — 3 verified, 2 discrepant, 1 unverifiable. Average certainty: **74%**.

---

## Headline issues for triage

1. **Link text "CAIPO WEBSITE" is stale — the body rebranded to Business Barbados on 1 February 2025.** CAIPO completed its transition to "Business Barbados" under the Ministry of Energy, Business Development and Consumer Affairs. The `caipo.gov.bb` domain still resolves and now serves the Business Barbados portal, but the link text names the old organisation. Citizen confusion risk is low because the URL works, but the name is wrong and should be updated to "Business Barbados website."

2. **Ministry attribution discrepancy: onlineServices link under MIIST in ministries.ts, but CAIPO is associated with Ministry of Energy and Business Development.** In `src/data/ministries.ts`, "Register a business name" is listed as an `onlineServices` entry under `ministry-of-industry-innovation-science-and-technology` (MIIST, lines 733–740). However, the same file's entry for `ministry-of-energy-and-business-development` (lines 341–343) lists "Corporate Affairs and Intellectual Property Office" in its `associatedDepartments`. Business Barbados/caipo.gov.bb footer confirms the Ministry of Energy, Business Development and Consumer Affairs. Citizens surfaced via the MIIST ministry page receive incorrect ministry contact details.

3. **The page contains almost no actionable content — the most significant citizen-impact gap.** Apart from a one-sentence description and a link to the Business Barbados website, citizens receive nothing: no fees, no required documents, no eligibility, no governing Act, no timeline, no contact details. The Registration of Business Names Act, Cap. 317 imposes a 14-day registration obligation that is entirely absent; fees (BDS $30 name reservation, BDS $100 application) are entirely absent. This is a content-gap issue rather than a factual error.

4. **source_url resolves and mirrors the same thin content.** `https://www.gov.bb/Business/registering-business-name` is live. Its footer still attributes the page to MIIST — matching the same stale attribution in ministries.ts — but this is gov.bb's own stale data, not something alpha.gov.bb introduced.

No findings from the previous pass (2026-05-28) have been reversed — source content is unchanged.

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
- **Sources:** [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name) — identical phrasing on the source gov.bb page
- **Status:** verified (alpha.gov.bb faithfully reproduces gov.bb copy; phrase is government-authored marketing text with no external benchmark cited)
- **Certainty:** 80%
- **Open question:** Neither source cites a Doing Business ranking or similar index to underpin "simple." Not appropriate to flag as discrepant for a descriptor of this type.

---

### Claim 2 — CAIPO website URL resolves (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For more information please visit [CAIPO WEBSITE](https://caipo.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">For more information please visit [Business Barbados website](https://caipo.gov.bb/)</pre>
</div>

- **Type:** URL / link text
- **Sources:** [caipo.gov.bb — homepage](https://caipo.gov.bb/) — page title and branding reads "Business Barbados: Digital Platform for Corporate Affairs Services", footer: "Ministry of Energy, Business Development and Consumer Affairs"; [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name) — live, content consistent with alpha.gov.bb
- **Status:** discrepant — the URL resolves correctly (HTTP 200, correct destination), but the link text "CAIPO WEBSITE" uses the old organisation name. The body rebranded to "Business Barbados" on 1 February 2025.
- **Certainty:** 95%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — the link works; citizens reach the correct site. The incorrect name is a trust/accuracy issue rather than misdirection.

---

### Claim 3 — Implied agency name: CAIPO as registering body (line 13, implicit)

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
- **Sources:** [caipo.gov.bb — homepage](https://caipo.gov.bb/) — "Business Barbados", footer: "Ministry of Energy, Business Development and Consumer Affairs, Ground Floor, Baobab Towers, Warrens, St. Michael"; [gov.bb — Corporate Affairs and Intellectual Property Office](https://www.gov.bb/Departments/corporate-affairs-intellectual-property)
- **Status:** discrepant — the body is now "Business Barbados", not "CAIPO." `src/data/departments.ts` and `src/data/state-bodies.ts` also still use the old "Corporate Affairs and Intellectual Property Office (CAIPO)" name.
- **Certainty:** 92%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — functional impact nil because URL works. Accuracy/trust impact only.

---

### Claim 4 — Ministry attribution in ministries.ts (lines 733–740)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This page is listed as an onlineServices entry under
ministry-of-industry-innovation-science-and-technology
(src/data/ministries.ts lines 733–740)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">This page should be listed as an onlineServices entry under
ministry-of-energy-and-business-development
(Business Barbados / CAIPO is under Ministry of Energy,
Business Development and Consumer Affairs since February 2025)</pre>
</div>

- **Type:** agency name
- **Sources:** [caipo.gov.bb footer](https://caipo.gov.bb/) — "Ministry of Energy, Business Development and Consumer Affairs"; `src/data/ministries.ts` lines 341–343 — "Corporate Affairs and Intellectual Property Office" listed in `associatedDepartments` of `ministry-of-energy-and-business-development`; [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources)
- **Status:** discrepant — `ministries.ts` places the "Register a business name" onlineService under MIIST, but Business Barbados/CAIPO moved under the Ministry of Energy and Business Development in 2025. Notably, `ministries.ts` itself has CAIPO in the Energy ministry's `associatedDepartments`, making the MIIST onlineServices link internally inconsistent within the same file.
- **Certainty:** 85%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — if page is surfaced via the MIIST ministry page, citizens receive the wrong ministry's contact details (MIIST: (246) 535-1201; Ministry of Energy and Business Development: (246) 535-2500).
- **Note on canonical ministry name:** Variant forms in current use — `src/data/ministries.ts` uses "Ministry of Energy and Business Development"; caipo.gov.bb footer uses "Ministry of Energy, Business Development and Consumer Affairs." The data file name is treated as the project-canonical form.

---

### Claim 5 — source_url resolves (content-directory.ts line 539)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/Business/registering-business-name"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.gov.bb/Business/registering-business-name
resolves with HTTP 200. Content is identical: same
one-sentence description, same CAIPO link.
Footer ministry: Ministry of Industry, Innovation,
Science and Technology (MIST) — stale gov.bb attribution,
not introduced by alpha.gov.bb.</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name) — confirmed live, content retrieved 2026-05-29
- **Status:** verified (URL resolves; content consistent with alpha.gov.bb)
- **Certainty:** 95%

---

### Claim 6 — Live page URL resolves (routing check)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://alpha.gov.bb/business-trade/registering-a-business-name</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Page loads successfully at
https://alpha.gov.bb/business-trade/registering-a-business-name
with correct title "Registering a business name" and all
expected content. Not a protected page; category prefix applies.</pre>
</div>

- **Type:** URL
- **Sources:** [alpha.gov.bb — Registering a business name](https://alpha.gov.bb/business-trade/registering-a-business-name) — fetched 2026-05-29
- **Status:** verified
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

The most significant citizen-facing problems are absent facts rather than wrong facts. The following information is publicly available and directly relevant to a citizen attempting to register a business name:

**Governing legislation (absent):**
- Registration of Business Names Act, Cap. 317 — confirmed on [caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/](https://caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/)

**Key legal obligation (absent):**
- Every individual or firm carrying on business under a name that does not consist of their true name(s) must register with the Registrar within **14 days** of commencing business. Source: Cap. 317.

**Fees (absent — confirmed at caipo.gov.bb/fees/):**
- Name Search/Reservation: BDS $30
- Business Name Application: BDS $100
- Business Name Inquiry: BDS $2
- Copy of Business Name Application: BDS $4
- Copy of Business Name Certificate: BDS $40
- Notice of Cessation of Business: BDS $50
- Notice of Change of Business: BDS $50
- Source: [caipo.gov.bb — Fees](https://caipo.gov.bb/fees/)

**Contact details (absent):**
- Ground Floor, Baobab Towers, Warrens, St. Michael
- Phone: (246) 535-2401 / 535-2402 / 535-2404
- Email: caipo.general@barbados.gov.bb
- Hours: Monday–Friday, 08:30–16:30
- Source: [caipo.gov.bb homepage](https://caipo.gov.bb/)

The page gives a citizen almost no information with which to act. The Business Barbados site is more complete, but alpha.gov.bb should at minimum list the governing Act, the 14-day obligation, the fees, and the contact details.

---

## Sources cited

- [alpha.gov.bb — Registering a business name](https://alpha.gov.bb/business-trade/registering-a-business-name)
- [gov.bb — Registering a Business Name](https://www.gov.bb/Business/registering-business-name)
- [caipo.gov.bb — Business Barbados homepage](https://caipo.gov.bb/)
- [caipo.gov.bb — Fees](https://caipo.gov.bb/fees/)
- [caipo.gov.bb — Registration of Business Names Act, Cap. 317 (legislation page)](https://caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/)
- [gov.bb — Corporate Affairs and Intellectual Property Office](https://www.gov.bb/Departments/corporate-affairs-intellectual-property)
- [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources)
- `src/data/ministries.ts` — internal project data file
