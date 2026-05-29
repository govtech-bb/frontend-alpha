# Fact-check: Start a business

- **Live page:** <https://alpha.gov.bb/business-trade/start-a-business>
- **Source file:** `src/content/start-a-business.md`
- **Last checked:** 2026-05-28
- **Summary:** 5 claims reviewed — 2 verified, 2 discrepant, 1 unverifiable. Average certainty: **62%**.

---

## Headline issues for triage

1. **"Analytical Services" category label is a stale gov.bb metadata artefact — it is wrong and visible to citizens.** The source file (`src/content/start-a-business.md` lines 16–18) contains a `### Category` heading with a single bullet `Analytical Services`. The live alpha.gov.bb page renders this as a citizen-facing label. The Analytical Services department (gov.bb/Departments/analytical-services) is a laboratory and technical-analysis body under MIST with no connection to business facilitation. The category label appears to have been mechanically imported from gov.bb's internal content taxonomy and never cleaned up. Citizens see an irrelevant label that undermines trust.

2. **Invest Barbados link destination returns HTTP 403 — cannot verify the content citizens actually reach.** The sole functional link on the page (`https://www.investbarbados.org/starting-a-business-in-barbados/`) returns HTTP 403 Forbidden when fetched programmatically. investbarbados.org also returns 403 at the root. The site is likely applying anti-bot or geo-restriction measures. The URL appears in search-engine indexes and is consistent with Invest Barbados's known URL structure. However, the alpha.gov.bb content team cannot verify what citizens see when they follow this link, and the link has no fallback.

3. **Ministry attribution in `ministries.ts` is uncertain and may be wrong.** The `start-a-business` page is listed as an `onlineServices` entry under `ministry-of-industry-innovation-science-and-technology` (MIIST) in `src/data/ministries.ts` lines 731–734. Invest Barbados is a statutory corporation (the Barbados International Business Promotion Corporation, BIBPC) whose responsible minister as of the current cabinet listing is the **Minister of Public and Private Investment** (Hon. Indar A. Weir, M.P.) — a portfolio not reflected in any of the ministry-specific pages. The gov.bb/State-Bodies/invest-barbados footer lists MIST, which is consistent with the current ministries.ts attribution, but no gov.bb ministry page lists Invest Barbados in its associated bodies. This is an ambiguous situation — see Open question in Claim 4.

4. **Page is extremely thin — contains almost no actionable information.** The entire page is one sentence plus a link. Citizens cannot learn from this page what the process for starting a business is, what it costs, which agencies are involved, what documents are required, or what legal obligations apply. This is a content-gap problem rather than a factual error, but it is the most significant practical problem with the page. The sister page `registering-a-business-name.md` has the same thin-content issue and has already been documented.

5. **`source_url` is live but is the origin of the thin content.** `https://www.gov.bb/Business/start-business` resolves and mirrors the same one-sentence description. Fixing this page in isolation from the gov.bb source will produce a divergence; the better fix is to supplement alpha.gov.bb with additional verified content from Invest Barbados and Business Barbados sources.

---

## Claims

### Claim 1 — Descriptive copy: Invest Barbados facilitation role (lines 11–12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados wants your investment and the Invest Barbados facilitation team makes it
as seamless as possible for you to start or expand business operations in Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados wants your investment and the Invest Barbados facilitation team makes it
as seamless as possible for you to start or expand business operations in Barbados.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Starting a Business](https://www.gov.bb/Business/start-business) — page reproduces this sentence verbatim; [WebSearch — Invest Barbados mandate](https://www.investbarbados.org/) — confirmed: "Invest Barbados is the economic development agency of the Government of Barbados… provides personalised assistance to each client, helping at every stage of doing business in Barbados."
- **Status:** verified — the sentence accurately describes Invest Barbados's role as the government's investment facilitation body and is faithfully reproduced from the gov.bb source page
- **Certainty:** 90%
- **Note:** The phrase is marketing copy, not a claim with an external independent reference. "Seamless" is a subjective assertion. The verification confirms that alpha.gov.bb faithfully mirrors the gov.bb source; neither page cites evidence for "seamless."

---

### Claim 2 — External link: `https://www.investbarbados.org/starting-a-business-in-barbados/` (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[Visit Invest Barbados](https://www.investbarbados.org/starting-a-business-in-barbados/)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot fully verify — HTTP 403 on fetch; URL indexed by search engines</div>
<pre class="claim-block-content">https://www.investbarbados.org/starting-a-business-in-barbados/ returns HTTP 403
Forbidden when programmatically fetched (anti-bot/geo-restriction). The root domain
https://www.investbarbados.org/ also returns 403. The URL appears in Google Search
index and in gov.bb source page as the correct link target. Citizens using a standard
browser are likely to reach the page successfully. The content team cannot verify
current destination content via automated tools.

Alternative contact route confirmed: Invest Barbados at Trident Financial Centre,
Hastings, Christ Church, Barbados — Phone: (246) 626-2000 / (246) 626-2099 —
Email: info@investbarbados.org (verified via gov.bb/State-Bodies/invest-barbados)</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Start a Business](https://www.gov.bb/Business/start-business) — same link confirmed on source page; [Google index — investbarbados.org/starting-a-business-in-barbados/](https://www.investbarbados.org/starting-a-business-in-barbados/) — URL in search-engine index consistent with Invest Barbados site structure; [gov.bb — State Bodies: Invest Barbados](https://www.gov.bb/State-Bodies/invest-barbados) — confirms organisation exists, address and phone verified
- **Status:** unverifiable by automated fetch — anti-bot measures on investbarbados.org block programmatic access; URL is plausibly live based on search-index presence but destination content not confirmed
- **Certainty:** 65%
- **Citizen impact:** HIGH — this link is the sole actionable item on the page; if it is broken, citizens have nowhere to go
- **Open question:** Manually verify that `https://www.investbarbados.org/starting-a-business-in-barbados/` resolves for a human browser user and that the destination content is current and accurate. Check whether the page serves both domestic and foreign investors, or only international investors (Invest Barbados's statutory mandate is international business promotion — domestic entrepreneurs may need to be directed to Business Barbados / caipo.gov.bb instead).

---

### Claim 3 — Category label: "Analytical Services" (lines 16–18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">### Category

*   Analytical Services</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">(This section should be removed entirely. "Analytical Services" is an
internal gov.bb content-taxonomy label for a laboratory department under
MIST. It has no connection to business facilitation or Invest Barbados
and should not be rendered as citizen-facing content.)</pre>
</div>

- **Type:** descriptive / agency name
- **Sources:** [gov.bb — Analytical Services Department](https://www.gov.bb/Departments/analytical-services) — confirmed: Analytical Services is "a timely and reliable analytical service" (laboratory/technical department), directed by Dr. Beverley P. Wood, Culloden Road, St. Michael. No connection to business registration or investment promotion; [alpha.gov.bb — Start a business (live page)](https://alpha.gov.bb/business-trade/start-a-business) — label "Analytical Services" confirmed visible to citizens in the rendered page
- **Status:** discrepant — "Analytical Services" is factually wrong as a category for this page. It is a gov.bb internal metadata field that refers to an unrelated government laboratory department. Citizens see this label on the live alpha.gov.bb page.
- **Certainty:** 5% that "Analytical Services" is the correct category for this page
- **Confidence it's wrong:** 98%
- **Citizen impact:** LOW in isolation (citizens will likely ignore an unexplained label), but it is a trust and accuracy issue on a government page.

---

### Claim 4 — Ministry attribution: page listed under MIIST in `ministries.ts` (line 731–734)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/ministries.ts (lines 731–734)</div>
<pre class="claim-block-content">onlineServices: [
  {
    title: "Start a business",
    href: "/start-a-business",
    description: "How to start a business in Barbados.",
  },
  ...]
// under slug: "ministry-of-industry-innovation-science-and-technology"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially corroborated — ambiguous, not clearly wrong</div>
<pre class="claim-block-content">gov.bb/State-Bodies/invest-barbados lists MIST in its footer, consistent with
the current ministries.ts attribution.

However:
- No gov.bb ministry page (MIST, Ministry of Energy and Business Development,
  Ministry of Finance) explicitly lists Invest Barbados in its associated bodies.
- The current cabinet listing (barbadosparliament.com) places investment
  promotion under the "Minister of Public and Private Investment"
  (Hon. Indar A. Weir, M.P.) — a portfolio not mapped to any specific ministry
  in ministries.ts.
- Invest Barbados's statutory basis is the BIBPC Act, CAP 340A — the responsible
  minister under that Act is not confirmed from the public web as MIST.
- Business Barbados (the former CAIPO, now under the Ministry of Energy and
  Business Development) and Invest Barbados are distinct bodies. The MIIST
  attribution of "registering-a-business-name" is already flagged as wrong
  (F-075). The "start-a-business" attribution is separate but similarly uncertain.</pre>
</div>

- **Type:** agency name
- **Sources:** [gov.bb — State Bodies: Invest Barbados](https://www.gov.bb/State-Bodies/invest-barbados) — footer: MIST (consistent with ministries.ts); [gov.bb — Ministry of Industry, Innovation, Science and Technology](https://www.gov.bb/Ministries/innovation-science-smart-technology) — Invest Barbados not listed in that ministry's associated bodies; [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources) — Invest Barbados not listed; [barbadosparliament.com — Cabinet Ministers](https://www.barbadosparliament.com/page_content/show_content/8) — investment portfolio held by Minister of Public and Private Investment (Hon. Indar A. Weir); [src/data/ministries.ts lines 731–734](/home/gavin/frontend-alpha/src/data/ministries.ts)
- **Status:** unverifiable — the ministry attribution is partially corroborated by the gov.bb footer but not confirmed by any ministry's own associated-bodies listing. The statutory parent under BIBPC Act CAP 340A is not established from the public web. The MIST attribution in ministries.ts is plausible but not authoritative.
- **Certainty:** 50%
- **Open question:** Confirm the responsible ministry for Invest Barbados (BIBPC) under the current cabinet structure. The Minister of Public and Private Investment (Hon. Indar Weir) appears to hold the investment portfolio; clarify whether Invest Barbados falls under MIST, the Ministry of Finance, Economic Affairs and Investment, or a direct PMO/Cabinet Office arrangement. Also confirm whether the `start-a-business` page should be associated with Invest Barbados (international investors) or Business Barbados (domestic/general business registration) or both.

---

### Claim 5 — `source_url` resolves: `https://www.gov.bb/Business/start-business` (content-directory.ts line 532)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/content-directory.ts (line 532)</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/Business/start-business"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (URL live; content is equally thin)</div>
<pre class="claim-block-content">https://www.gov.bb/Business/start-business resolves successfully. The
page mirrors the same one-sentence description and same Invest Barbados
link. The footer on this gov.bb page attributes the page to the Ministry
of Industry, Innovation, Science and Technology (MIST). No additional
content is present at the source URL beyond what appears on alpha.gov.bb.</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Start a Business](https://www.gov.bb/Business/start-business) — confirmed live 2026-05-28; content confirmed to match alpha.gov.bb source file
- **Status:** verified (URL resolves; content is consistent with alpha.gov.bb)
- **Certainty:** 95%
- **Note:** As with the `registering-a-business-name` sister page (see [registering-a-business-name.md](/home/gavin/frontend-alpha/docs/fact-check/registering-a-business-name.md)), the source_url is live and accurate, but both gov.bb and alpha.gov.bb share the same thin content. The practical problem is not a factual error but the absence of actionable information.

---

## Additional findings (not on the page but should be)

**Invest Barbados's mandate is international investment promotion, not domestic business registration.** The Barbados International Business Promotion Corporation (BIBPC) Act CAP 340A establishes Invest Barbados to "attract, land, facilitate and sustain international investment." Citizens who are Barbadian residents seeking to register a domestic business name, company, or sole trader are better served by **Business Barbados** (formerly CAIPO, at caipo.gov.bb) and by the `registering-a-business-name` page. The `start-a-business` page does not make this distinction. Citizens who follow the Invest Barbados link expecting domestic business registration support may receive no relevant service.

**Contact details for Invest Barbados** (absent from the page):
- Address: Trident Financial Centre, Hastings, Christ Church, Barbados, BB15156
- Phone: (246) 626-2000 or (246) 626-2099
- Email: info@investbarbados.org
- Source: [gov.bb — State Bodies: Invest Barbados](https://www.gov.bb/State-Bodies/invest-barbados)

**Process information entirely absent.** Invest Barbados describes its services as: conducting one-stop-shop facilitation; acting as liaison with government departments; advising on the laws, rules, procedures, and registration requirements. Citizens would benefit from knowing that Invest Barbados services are available and what sectors they cover. Investment categories covered: Financial Services, Insurance, BPO/ICT, Niche Manufacturing, Global Education, Fintech, Medicinal Cannabis, Renewable Energy, R&D, Life Sciences, Tourism, HNWIs and Digital Nomads. Source: search results from investbarbados.org/business-investment-opportunities/.

**Cross-reference with `registering-a-business-name` page.** The two pages serve different audiences (international investors vs. domestic business name registrants) but are presented in the same "Business and trade" category without any distinction. Citizens expecting an end-to-end "how to start a business in Barbados" guide will find only two thin pages pointing to external sites. The `registering-a-business-name` fact-check ([registering-a-business-name.md](/home/gavin/frontend-alpha/docs/fact-check/registering-a-business-name.md)) documents the same thin-content pattern.

---

## Sources cited

- [alpha.gov.bb — Start a business (live page)](https://alpha.gov.bb/business-trade/start-a-business)
- [gov.bb — Starting a Business (source_url)](https://www.gov.bb/Business/start-business)
- [gov.bb — State Bodies: Invest Barbados](https://www.gov.bb/State-Bodies/invest-barbados)
- [gov.bb — Ministry of Industry, Innovation, Science and Technology](https://www.gov.bb/Ministries/innovation-science-smart-technology)
- [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources)
- [gov.bb — Ministry of Finance, Economic Affairs and Investment](https://www.gov.bb/ministries/finance-economic-affairs)
- [gov.bb — Analytical Services Department](https://www.gov.bb/Departments/analytical-services)
- [investbarbados.org — Invest Barbados homepage](https://www.investbarbados.org/) (HTTP 403 on fetch; confirmed in search index)
- [investbarbados.org — Starting a Business in Barbados](https://www.investbarbados.org/starting-a-business-in-barbados/) (HTTP 403 on fetch; URL confirmed in search index)
- [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8)
- [US State Department — 2025 Barbados Investment Climate Statement](https://www.state.gov/reports/2025-investment-climate-statements/barbados)
- [Business Barbados (formerly CAIPO)](https://caipo.gov.bb/) — cross-reference for domestic business registration route
- [`src/data/ministries.ts`](/home/gavin/frontend-alpha/src/data/ministries.ts) lines 729–734 — current MIIST attribution for this page
- [Report: registering-a-business-name.md](/home/gavin/frontend-alpha/docs/fact-check/registering-a-business-name.md) — sister page with same thin-content pattern and MIIST/Business Barbados ministry issues
