# Fact-check: Business policies and law

- **Live page:** <https://alpha.gov.bb/business-trade/business-policies-and-law>
- **Source file:** `src/content/business-policies-and-law.md`
- **Last checked:** 2026-05-28
- **Summary:** 6 claims reviewed — 4 verified, 1 discrepant, 1 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **Ministry name is truncated.** The page uses "The Ministry of Labour" throughout, but the canonical name is "Ministry of Labour, Social Security and Third Sector". This issue was already identified in `F-006` (covering `src/content/business-policies-and-law.md` lines 3, 11, 13). The fix is ready to apply.

2. **Page title and category do not match the content.** The page is titled "Business policies and law" and lives in the "Business and trade" category, but every line of substantive content is about labour laws and the Ministry of Labour's workforce mandate. It contains no information about business-specific legislation (e.g. Companies Act, Consumer Protection Act, Intellectual Property). Citizens visiting from a business-law context will find only a one-paragraph labour ministry overview. The page title either needs to be narrowed to "Labour laws and regulations" or the content needs substantial expansion to reflect the breadth its title implies.

3. **The `source_url` resolves live, but the GOV.BB source page uses the title "Labour Laws and Regulations" — not "Business policies and law".** The alpha.gov.bb page title is a mismatch with the upstream source it draws from.

---

## Claims

### Claim 1 — Agency name: "The Ministry of Labour" (lines 11, 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Labour assists the Government and its Social Partners...

The Ministry of Labour strives to develop a Barbadian workforce...</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Ministry of Labour, Social Security and Third Sector assists the Government and its Social Partners...

The Ministry of Labour, Social Security and Third Sector strives to develop a Barbadian workforce...</pre>
</div>

- **Type:** agency name
- **Status:** discrepant — "The Ministry of Labour" is the informal short-form used on the ministry's own website branding, but the canonical official name registered on `gov.bb` and in `src/data/ministries.ts` is "Ministry of Labour, Social Security and Third Sector".
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security); [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/); [`src/data/ministries.ts` slug `ministry-of-labour-social-security-and-third-sector`](/home/gavin/frontend-alpha/src/data/ministries.ts)
- **Certainty:** 95%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — citizen-facing trust issue; citizens expect the official name on a government portal.
- **Note:** This discrepancy is already tracked as [F-006](/home/gavin/frontend-alpha/docs/fact-check/README.md) in the triage backlog.

---

### Claim 2 — Ministry mandate: "assists the Government and its Social Partners in promoting opportunities for the provision of decent and productive work, in conditions of freedom of association, equity, security and human dignity and to provide quality social and economic benefits for Barbadians" (lines 11–12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Labour assists the Government and its Social Partners in promoting
opportunities for the provision of decent and productive work, in conditions of
freedom of association, equity, security and human dignity and to provide quality
social and economic benefits for Barbadians.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry of Labour assists the Government and its Social Partners in promoting
opportunities for the provision of decent and productive work, in conditions of
freedom of association, equity, security and human dignity and to provide quality
social and economic benefits for Barbadians.</pre>
</div>

- **Type:** descriptive / process step (mandate statement)
- **Status:** verified — the text matches the ministry's published mission statement verbatim.
- **Sources:** [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) (exact wording: "to assist the Government and its Social Partners in promoting opportunities for the provision of decent and productive work, in conditions of freedom of association, equity, security and human dignity and to provide quality social and economic benefits for Barbadians"); [gov.bb — Ministries/policies-laws](https://www.gov.bb/Ministries/policies-laws) (same text reproduced on the source page)
- **Certainty:** 95%

---

### Claim 3 — Workforce development claim: "strives to develop a Barbadian workforce, including persons with disabilities, that is well informed, properly trained and conditioned for the local, regional and extra-regional labour markets" (lines 13–14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry of Labour strives to develop a Barbadian workforce, including persons
with disabilities, that is well informed, properly trained and conditioned for the
local, regional and extra-regional labour markets ...</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry of Labour strives to develop a Barbadian workforce, including persons
with disabilities, that is well informed, properly trained and conditioned for the
local, regional and extra-regional labour markets ...</pre>
</div>

- **Type:** descriptive (vision/mandate statement)
- **Status:** verified — this matches the ministry's published vision statement. The `labour.gov.bb` About Us page states: "To develop a Barbadian workforce, including persons with disabilities, that is well informed, properly trained and conditioned for the local, regional and extra-regional labour markets."
- **Sources:** [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/)
- **Certainty:** 90%
- **Note:** The trailing `...` in the source content file suggests the original sentence may be truncated. The source page text ends at "labour markets" with no continuation. The ellipsis may imply omitted content or simply that the sentence is complete as stated. No additional text found on the GOV.BB source page (`gov.bb/Ministries/policies-laws`) or the ministry's own site.

---

### Claim 4 — External link: `https://labour.gov.bb/` (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[LEARN MORE](https://labour.gov.bb/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">[LEARN MORE](https://labour.gov.bb/)</pre>
</div>

- **Type:** URL (external link)
- **Status:** verified — the URL resolves to the active Ministry of Labour website. Page title confirmed as "Home - Government of Barbados Ministry of Labour".
- **Sources:** [labour.gov.bb](https://labour.gov.bb/) — confirmed live 2026-05-28.
- **Certainty:** 99%

---

### Claim 5 — Declared `source_url`: `https://www.gov.bb/Business/policies-laws` (from `src/data/content-directory.ts` line 546)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Business/policies-laws</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (URL resolves)</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Business/policies-laws
(resolves to a live GOV.BB page titled "Labour Laws and Regulations"
under the Business section — content matches alpha.gov.bb page)</pre>
</div>

- **Type:** URL (declared source)
- **Status:** verified — URL is live and returns the Labour Laws and Regulations content that matches the alpha.gov.bb page. Note: the GOV.BB source page title is "Labour Laws and Regulations", which differs from the alpha.gov.bb title "Business policies and law". No HTTP errors observed.
- **Sources:** [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) — confirmed live 2026-05-28. Navigation breadcrumbs on the source page: "Home > Business > Labour Laws and Regulations".
- **Certainty:** 95%

---

### Claim 6 — Page title and category scope: "Business policies and law" in the "Business and trade" category (frontmatter lines 2, 6)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">title: "Business policies and law"
section: "Business and Trade"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — needs editorial decision</div>
<pre class="claim-block-content">The page title implies broad coverage of business legislation (Companies Act,
consumer protection, IP law, etc.) but the entire content covers only
the Ministry of Labour's labour laws mandate. The GOV.BB source page
uses the narrower title "Labour Laws and Regulations".

No authoritative source confirms that "Business policies and law" is
the correct, intentional scope for this page — or that the content gap
is known and accepted.</pre>
</div>

- **Type:** descriptive (page scope / IA decision)
- **Status:** unverifiable — this is an editorial and information-architecture question, not a factual error that can be confirmed or denied from external sources. The content-directory.ts description says "Information on Labour Laws and Regulations in Barbados, including the Ministry of Labour's role in promoting decent work and workforce development", which accurately describes the current content but does not match the broader page title.
- **Checked:** [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) (source page uses narrower title "Labour Laws and Regulations"); [labour.gov.bb — Labour Legislation](https://labour.gov.bb/labour-legislation) (lists 25 specific Acts and regulations — none of this content is on the alpha.gov.bb page)
- **Certainty:** N/A — editorial scope question, not a factual claim.
- **Open question:** Is the intent of this page to cover all business policy and law in Barbados (in which case the content is severely incomplete), or only the Ministry of Labour's mandate (in which case the title should be narrowed to match the GOV.BB source title "Labour Laws and Regulations")? The GovBB team should decide and either expand the content or retitle the page.

---

## Additional findings (not on the page but should be)

**Labour legislation list is missing.** The Ministry of Labour publishes a full list of 25 Acts and regulations governing labour in Barbados at [labour.gov.bb/labour-legislation](https://labour.gov.bb/labour-legislation). None of these are named on the alpha.gov.bb page. Citizens who arrive at "Business policies and law" looking for specific statutory references (e.g. the Severance Payments Act Cap. 355A, the Employment Rights Act 2012, the Safety and Health at Work Act) will find only a two-paragraph ministry overview with no entry points into the actual legislation. Adding a curated list of the most-used Acts (with links to `oag.gov.bb/Laws/` or `barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/`) would substantially increase the page's utility.

**Page categorisation in `ministries.ts` is inconsistent with page content.** In `src/data/ministries.ts`, the `business-policies-and-law` page is listed under `ministry-of-industry-innovation-science-and-technology` (lines 741–745). However, the page content is entirely about the Ministry of Labour. This means the Ministry of Industry, Innovation, Science and Technology will show a link to this page in its "Online services" section, which is misleading. The page should be re-associated with `ministry-of-labour-social-security-and-third-sector` in `ministries.ts`.

---

## Sources cited

- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — confirmed ministry name and mandate
- [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) — declared `source_url`, confirmed live; title is "Labour Laws and Regulations"
- [labour.gov.bb — Home](https://labour.gov.bb/) — confirmed live; official ministry website
- [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — mission and vision statements verified verbatim
- [labour.gov.bb — Labour Legislation](https://labour.gov.bb/labour-legislation) — lists 25 Acts and regulations; none appear on the alpha.gov.bb page
- [`src/data/ministries.ts`](/home/gavin/frontend-alpha/src/data/ministries.ts) — canonical ministry name (`ministry-of-labour-social-security-and-third-sector`); page miscategorised under MIIST (lines 741–745)
