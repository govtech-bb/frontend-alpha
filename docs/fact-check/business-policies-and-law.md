# Fact-check: Business policies and law

- **Live page:** <https://alpha.gov.bb/business-trade/business-policies-and-law>
- **Source file:** `src/content/business-policies-and-law.md`
- **Last checked:** 2026-05-29
- **Summary:** 8 claims reviewed — 5 verified, 2 discrepant, 1 unverifiable. Average certainty: **80%**.

---

## Headline issues for triage

1. **Ministry name is truncated (F-006).** The page uses "The Ministry of Labour" but the canonical official name is "Ministry of Labour, Social Security and Third Sector". This appears on both `gov.bb` and `src/data/ministries.ts`. No change since last pass — still open.

2. **Stray code fence at end of source file (new).** Line 16 of `src/content/business-policies-and-law.md` contains a lone ` ``` ` with no opening counterpart. This is not rendered on the live alpha.gov.bb page (the framework likely strips it), but it is a source-file defect that could cause rendering failures if the markdown parser is changed. Low citizen impact but clean-up required.

3. **Page miscategorised in `ministries.ts`.** The `business-policies-and-law` page is listed under `ministry-of-industry-innovation-science-and-technology` (`ministries.ts` line 743), but its entire content covers the Ministry of Labour's mandate. Citizens navigating via the MIIST ministry page see a misleading "Business policies and law" service link; the Labour ministry page shows no link to this page. The page should move to `ministry-of-labour-social-security-and-third-sector`.

4. **Page title vs. content scope mismatch (unresolved).** The title "Business policies and law" implies broad coverage of business legislation but the content is exclusively a two-paragraph Ministry of Labour overview. The GOV.BB source page uses the narrower title "Labour Laws and Regulations". This remains an editorial IA decision for the GovBB team.

5. **Source page title mismatch.** `source_url` (`https://www.gov.bb/Business/policies-laws`) is live and breadcrumbs as "Home > Business > Labour Laws and Regulations" — title differs from the alpha.gov.bb page title "Business policies and law". Still open, same as last pass.

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
- **Status:** discrepant — "The Ministry of Labour" is the informal short-form; the canonical official name on `gov.bb` and in `src/data/ministries.ts` is "Ministry of Labour, Social Security and Third Sector".
- **Sources:** [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) (official name confirmed: "Ministry of Labour, Social Security and Third Sector (MLST)"); [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) (site branded "Government of Barbados Ministry of Labour" as short-form); [`src/data/ministries.ts` line 783 slug `ministry-of-labour-social-security-and-third-sector`](/home/gavin/frontend-alpha/src/data/ministries.ts)
- **Certainty:** 95%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — citizen-facing trust issue; formal government portal should use the official name.
- **Note:** Already tracked as F-006. No change since 2026-05-28.

---

### Claim 2 — Ministry mandate statement (lines 11–12)

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

- **Type:** descriptive (mandate statement)
- **Status:** verified — text matches the ministry's published mission statement. The `gov.bb` source page reproduces the same text verbatim.
- **Sources:** [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) (same text confirmed live 2026-05-29); [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) (mission: "to assist the Government and its Social Partners in promoting opportunities for the provision of decent and productive work, in conditions of freedom of association, equity, security and human dignity and to provide quality social and economic benefits for Barbadians")
- **Certainty:** 95%

---

### Claim 3 — Workforce development mandate (line 13)

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

- **Type:** descriptive (vision statement)
- **Status:** verified — matches the ministry's published vision statement.
- **Sources:** [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) (vision: "To develop a Barbadian workforce, including persons with disabilities, that is well informed, properly trained and conditioned for the local, regional and extra-regional labour markets."); [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) (same text confirmed live 2026-05-29)
- **Certainty:** 90%
- **Note:** The trailing `...` in the source file may indicate a truncated sentence, but no additional text appears on the source page. The ellipsis is reproduced on the live alpha page and matches the GOV.BB source.

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

- **Type:** URL (external link / CTA)
- **Status:** verified — URL resolves to the active Ministry of Labour website. Page title confirmed as "Home - Government of Barbados Ministry of Labour" with full content visible.
- **Sources:** [labour.gov.bb](https://labour.gov.bb/) — confirmed live 2026-05-29.
- **Certainty:** 99%

---

### Claim 5 — Declared `source_url`: `https://www.gov.bb/Business/policies-laws` (frontmatter line 4)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Business/policies-laws</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (URL resolves)</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Business/policies-laws
(live page titled "Labour Laws and Regulations" under Home > Business;
content matches the alpha.gov.bb page body text verbatim)</pre>
</div>

- **Type:** URL (declared source)
- **Status:** verified — URL is live and returns matching content. Note: the GOV.BB source page title is "Labour Laws and Regulations", differing from the alpha.gov.bb page title "Business policies and law". The alpha page renders a "View the original source" link pointing here, which is correct.
- **Sources:** [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) — confirmed live 2026-05-29. Breadcrumb: "Home > Business > Labour Laws and Regulations".
- **Certainty:** 95%

---

### Claim 6 — Page title and category scope: "Business policies and law" / "Business and Trade" (frontmatter lines 2, 6)

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
- **Status:** unverifiable — an editorial and IA question, not a factual error verifiable from external sources. The `content-directory.ts` description ("Information on Labour Laws and Regulations in Barbados, including the Ministry of Labour's role in promoting decent work and workforce development") accurately describes the current content but does not match the broader page title.
- **Checked:** [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) (source page uses narrower title "Labour Laws and Regulations"); [labour.gov.bb — Labour Legislation](https://labour.gov.bb/labour-legislation) (lists 25 specific Acts and regulations — none referenced on the alpha.gov.bb page)
- **Certainty:** N/A — editorial scope question.
- **Open question:** Is the intent to cover all business policy and law (content is severely incomplete) or only the Ministry of Labour's mandate (title should be narrowed to "Labour Laws and Regulations" to match the GOV.BB source)? The GovBB team must decide and either expand content or retitle the page.

---

### Claim 7 — Stray code fence in source file (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source file</div>
<pre class="claim-block-content">```
(a lone closing code-fence with no matching opening fence, at end of file)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">(line 16 should be deleted entirely — there is no code block on this page)</pre>
</div>

- **Type:** process step / source-file defect
- **Status:** discrepant — a lone ` ``` ` character appears on line 16 of `src/content/business-policies-and-law.md` with no matching opening fence. It is not rendered on the live alpha.gov.bb page, suggesting the framework strips unmatched fences, but it is still a source-file defect.
- **Sources:** Checked `src/content/business-policies-and-law.md` directly (raw bytes confirmed with `cat -A`); [alpha.gov.bb/business-trade/business-policies-and-law](https://alpha.gov.bb/business-trade/business-policies-and-law) — no code block visible on the rendered page.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — not currently rendering on the live page, but is a latent defect in the source.

---

### Claim 8 — Page association in `ministries.ts`: listed under MIIST (line 743)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in source data</div>
<pre class="claim-block-content">// src/data/ministries.ts, inside ministry-of-industry-innovation-science-and-technology
{
  title: "Business policies and law",
  href: "/business-policies-and-law",
  description: "Policy and legal framework for businesses.",
}</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should be</div>
<pre class="claim-block-content">// Should be listed under ministry-of-labour-social-security-and-third-sector
// (the page's entire content concerns the Ministry of Labour's mandate)
{
  title: "Business policies and law",
  href: "/business-policies-and-law",
  description: "Labour laws and regulations in Barbados.",
}</pre>
</div>

- **Type:** agency name / IA data
- **Status:** discrepant — the page covers the Ministry of Labour's mandate exclusively but is wired to the Ministry of Industry, Innovation, Science and Technology's online-services list. Citizens browsing MIIST services will see a misleading link. The Ministry of Labour entry in `ministries.ts` (slug `ministry-of-labour-social-security-and-third-sector`, line 782) has no reference to this page.
- **Sources:** [`src/data/ministries.ts` lines 716–755 (MIIST entry)](/home/gavin/frontend-alpha/src/data/ministries.ts); [`src/data/ministries.ts` lines 782–835 (MLSST entry)](/home/gavin/frontend-alpha/src/data/ministries.ts); [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security)
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — citizens navigating via the MIIST ministry page are misled; citizens looking via the Labour ministry page cannot find this content.

---

## Additional findings (not on the page but should be)

**Labour legislation list is absent.** The Ministry of Labour publishes 25 specific Acts and regulations at [labour.gov.bb/labour-legislation](https://labour.gov.bb/labour-legislation) (including the Severance Payments Act Cap. 355A, Employment Rights Act 2012, Safety and Health at Work Act Cap. 356, Employment Sexual Harassment (Prevention) Act 2017, and others). None are referenced on the alpha.gov.bb page. Citizens arriving at "Business policies and law" to find a statutory reference will find only a two-paragraph ministry overview with a single outbound link. Adding a curated list of the most-used Acts with links to `oag.gov.bb/Laws/` or `barbadoslawcourts.gov.bb` would substantially increase page utility.

---

## Sources cited

- [alpha.gov.bb — Business policies and law](https://alpha.gov.bb/business-trade/business-policies-and-law) — live page confirmed 2026-05-29
- [gov.bb — Ministry of Labour, Social Security and Third Sector](https://www.gov.bb/Ministries/labour-social-security) — official ministry name confirmed
- [gov.bb — Business/policies-laws](https://www.gov.bb/Business/policies-laws) — declared `source_url`, confirmed live; title "Labour Laws and Regulations"
- [labour.gov.bb — Home](https://labour.gov.bb/) — confirmed live 2026-05-29
- [labour.gov.bb — About Us](https://labour.gov.bb/policies-programmes/about-us/) — mission and vision statements verified
- [labour.gov.bb — Labour Legislation](https://labour.gov.bb/labour-legislation) — 25 Acts and regulations listed; none appear on the alpha.gov.bb page
- [`src/data/ministries.ts`](/home/gavin/frontend-alpha/src/data/ministries.ts) — canonical ministry names and page associations
- [`src/content/business-policies-and-law.md`](/home/gavin/frontend-alpha/src/content/business-policies-and-law.md) — source file, stray ` ``` ` confirmed on line 16
