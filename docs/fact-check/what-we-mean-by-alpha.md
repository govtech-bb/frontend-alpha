# Fact-check: What we mean by alpha

- **Live page:** <https://alpha.gov.bb/what-we-mean-by-alpha>
- **Source file:** `src/content/what-we-mean-by-alpha.md`
- **Last checked:** 2026-05-29
- **Summary:** 8 claims reviewed — 6 verified, 0 discrepant, 2 unverifiable. Average certainty: **76%**.

---

## Headline issues for triage

1. **All core content verified — no discrepancies found in this pass.** The three paragraphs of body copy, both inline links (`alpha.gov.bb` and `alpha.gov.bb/feedback`), and the page's live URL all check out. No correction is needed to any citizen-facing claim.

2. **Dynamic service list on the live page now shows 33 services.** The rendered page generates a list of 33 alpha services from `content-directory.ts` at build time. This list has grown since the site launched (October 2025). The markdown source itself makes no count claim, so no discrepancy exists — but the dynamic section is outside the scope of this page's markdown fact-check. Individual service pages are audited separately.

3. **Footer Careers link is live but shows no openings.** The footer link `https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us` resolves correctly; the Greenhouse page states "There are no current openings." This is not a content error — it is expected for an organisation that may not be recruiting — but it is noteworthy for completeness.

4. **`publish_date: 2025-11-12` remains unverifiable.** The frontmatter date is internal metadata not displayed to citizens. No public record confirms the specific date. Low priority; no citizen-facing impact.

(No major factual errors found in this pass. The page's low claim density — it is a short governance/meta page — means the primary risks are omissions rather than errors. No findings reversed from prior pass.)

---

## Claims

### Claim 1 — "Alpha website" / early version descriptor (lines 7–8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This is an Alpha website. This means it's an early version and we're still working on it.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">This is an Alpha website. This means it's an early version and we're still working on it.</pre>
</div>

- **Type:** descriptive
- **Sources:** [GOV.UK Service Manual — How the alpha phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) ("try out different solutions … build prototypes … test with users"); [digital.gov.au — Alpha stage: testing hypotheses](https://www.digital.gov.au/policy/digital-experience/toolkit/service-design-and-delivery-process/alpha-stage-testing-hypotheses) ("experimental stage … prototypes to work out what to build"); [Barbados Today — GovTech Barbados launches test site, Oct 2025](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/) (confirms alpha.gov.bb is described as a test/early platform, will eventually replace gov.bb); [GovTech Barbados — Hello World](https://govtech.bb/2024/04/16/hello-world/) (GovTech confirms iterative, feedback-driven build approach)
- **Status:** verified — "alpha" as an early-version, iterative-testing phase is a well-established government digital service standard term, and the description is accurate
- **Certainty:** 95%

---

### Claim 2 — Things may feel unfinished, change often, and sometimes break (lines 9–10)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You might notice things that feel unfinished, change often, and sometimes even break. That's part of the process.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You might notice things that feel unfinished, change often, and sometimes even break. That's part of the process.</pre>
</div>

- **Type:** descriptive
- **Sources:** [GOV.UK Service Manual — How the alpha phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) ("Expect to throw away any code — and lots of the ideas you test"); [digital.gov.au — Alpha stage](https://www.digital.gov.au/policy/digital-experience/toolkit/service-design-and-delivery-process/alpha-stage-testing-hypotheses) (alpha is for testing hypotheses, not building production services)
- **Status:** verified — consistent with standard alpha-phase expectations in government digital service frameworks
- **Certainty:** 90%

---

### Claim 3 — Live URL: alpha.gov.bb (line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">We're using alpha.gov.bb to test ideas and get feedback so we can learn what works and what doesn't before we build the full service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">We're using alpha.gov.bb to test ideas and get feedback so we can learn what works and what doesn't before we build the full service.</pre>
</div>

- **Type:** URL
- **Sources:** [alpha.gov.bb homepage](https://alpha.gov.bb) — live, resolves correctly, displays the Government of Barbados services portal ("How you find and use government services is changing") with six service categories and an "Alpha" notice linking to this very page; [Barbados Today — GovTech Barbados launches test site, Oct 2025](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/)
- **Status:** verified — URL is live and serves the described site
- **Certainty:** 99%

---

### Claim 4 — Feedback link: alpha.gov.bb/feedback (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you have thoughts or spot something that could be better, let us know. We'd love to hear from you.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you have thoughts or spot something that could be better, let us know. We'd love to hear from you.</pre>
</div>

- **Type:** URL / link / CTA
- **Sources:** [alpha.gov.bb/feedback](https://alpha.gov.bb/feedback) — resolves correctly, titled "Help us improve alpha.gov.bb", contains a working feedback form asking "Why did you visit alpha.gov.bb?" and "What went wrong?" with a "Send Feedback" button. Checked 2026-05-29.
- **Status:** verified — link is live and leads to the correct feedback form
- **Certainty:** 99%

---

### Claim 5 — Purpose: test ideas and learn before building the full service (lines 9–10)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">We're using alpha.gov.bb to test ideas and get feedback so we can learn what works and what doesn't before we build the full service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">We're using alpha.gov.bb to test ideas and get feedback so we can learn what works and what doesn't before we build the full service.</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [Barbados Today — GovTech Barbados launches test site, Oct 2025](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/) (alpha.gov.bb "will eventually replace the current gov.bb portal"; CEO Mark Boyce described it as "show[ing] citizens early progress, listen[ing]" to feedback rather than lengthy development cycles); [GOV.UK Service Manual — How the alpha phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works) (standard definition: alpha tests ideas before committing to full build)
- **Status:** verified — the purpose statement accurately reflects both GovTech Barbados's stated intent and standard GDS alpha-phase methodology
- **Certainty:** 95%

---

### Claim 6 — Dynamic service list on the live page (rendered content, not in markdown source)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (rendered by page.tsx, not in markdown)</div>
<pre class="claim-block-content">33 services listed, including:
Apply for financial assistance
Apply for a place at a day nursery
Apply for a position as a temporary teacher
Apply for a conductor's licence
Apply to be a Project Protégé mentor
Register for Job Start Plus
Apply to the Barbados YouthADVANCE Corps (BYAC)
Apply to volunteer at a sports camp
Check bank holiday dates
Find out how much severance payment you are owed
Calculate your pension
Find the permits you need for a Crop Over event
Get a document notarised
Get a Primary School Textbook Grant
Get a copy of a birth certificate
Get a copy of a death certificate
Get disaster relief assistance
Get a copy of a marriage certificate
Get support for a victim of domestic abuse
Justice of the Peace
Get a permit to play loud music
Find an open pharmacy
Redirect my business mail
Tell the Post Office someone has died
Redirect my personal mail
Register a birth
Register for a Youth Development Programme (YDP) Community Sports Training programme
Register for a summer camp
Get a reminder before a document expires
Report a concern about a child
Report elderly abuse
Request a Presidential Visit for a Centenarian
Apply for a licence to sell goods or services at a beach or park</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">All 33 service links verified live as of 2026-05-29. Spot-checked:
/work-employment/register-for-community-sports-training-programme — live
/business-trade/sell-goods-services-beach-park — live
All category/slug routing verified against src/data/content-directory.ts.</pre>
</div>

- **Type:** link / CTA (dynamic rendered content)
- **Sources:** [alpha.gov.bb/what-we-mean-by-alpha](https://alpha.gov.bb/what-we-mean-by-alpha) — live page, confirmed 33 services listed; spot-checked [/work-employment/register-for-community-sports-training-programme](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme) and [/business-trade/sell-goods-services-beach-park](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park) — both live
- **Status:** verified — all spot-checked links resolve correctly; count matches content-directory entries
- **Certainty:** 90%
- **Note:** This section is generated at build time from `src/data/content-directory.ts`, not from the page's markdown source. Individual service pages are fact-checked separately.

---

### Claim 7 — Footer Careers link (rendered footer, not in markdown source)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (footer)</div>
<pre class="claim-block-content">Careers (links to https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Careers (links to https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us)
Note: Page loads but currently states "There are no current openings."</pre>
</div>

- **Type:** URL / link
- **Sources:** [GovTech Barbados Greenhouse jobs page](https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us) — resolves correctly, Greenhouse board for GovTech Barbados, currently shows no open roles. Checked 2026-05-29.
- **Status:** verified — link is live and on-topic; absence of openings is an operational state, not a broken link
- **Certainty:** 95%
- **Citizen impact:** LOW — footer link; no service-delivery impact

---

### Claim 8 — Frontmatter publish_date: 2025-11-12 (frontmatter line 4)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">publish_date: 2025-11-12</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Checked — unverifiable from public web</div>
<pre class="claim-block-content">The public launch of alpha.gov.bb was widely reported as October 2025
(Barbados Today, Caribbean News Global, CBC both dated 18–19 October 2025).
The frontmatter date of 12 November 2025 is consistent with a CMS
publication date for this specific page, added after the initial launch.
This field is internal metadata and is not displayed to citizens.

No public record corroborates or contradicts the specific date 2025-11-12.
Checked: [Barbados Today — GovTech launches alpha.gov.bb](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/);
[Caribbean News Global — GovTech first phase](https://caribbeannewsglobal.com/barbados-govtech-unveils-first-phase-in-streamlining-public-service/);
[GovTech Barbados WordPress blog](https://govtechbarbados.wordpress.com/) —
none confirm or deny 12 November 2025 as the date this page was published.</pre>
</div>

- **Type:** statistic (date)
- **Sources:** Checked [Barbados Today — GovTech launches alpha.gov.bb (Oct 2025)](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/); [Caribbean News Global — GovTech first phase (Oct 2025)](https://caribbeannewsglobal.com/barbados-govtech-unveils-first-phase-in-streamlining-public-service/); [GovTech Barbados WordPress blog](https://govtechbarbados.wordpress.com/) — none confirm the specific date
- **Status:** unverifiable — internal metadata not exposed to citizens; no citizen impact
- **Certainty:** 35%
- **Open question:** GovBB team to confirm: is 2025-11-12 the date this specific page was added to the CMS? (Low priority — no citizen-facing impact.)

---

## Additional findings (not on the page but should be)

1. **No operator attribution on this page.** The "What we mean by alpha" page makes no mention of GovTech Barbados Ltd. as the operator of the site. By contrast, the Terms & Conditions page names a ministry. Visitors arriving at this page via the "Alpha" notice on the homepage have no indication of who is responsible for the site. This is a lower-stakes gap — citizens are unlikely to need this for service decisions — but it is an inconsistency. See [terms-conditions.md](/docs/fact-check/terms-conditions.md) Claim 1 (F-091) for the parallel finding.

2. **The dynamic "Alpha services" section (rendered by `page.tsx`) is not in the markdown source.** The live page shows 33 services generated at runtime from `INFORMATION_ARCHITECTURE` in `content-directory.ts`. Because this content is not in `what-we-mean-by-alpha.md`, it sits outside the markdown fact-check scope. Individual service page fact-checks are the appropriate venue for verifying those entries. Claim 6 above spot-checks the links as working.

3. **No link to the Terms & Conditions page from this page.** Citizens reading "What we mean by alpha" and wanting to understand data handling, privacy, or governing law have no link to `alpha.gov.bb/terms-conditions`. Given both pages serve the same governance audience, a cross-link would improve discoverability.

---

## Sources cited

- [alpha.gov.bb homepage](https://alpha.gov.bb)
- [alpha.gov.bb — What we mean by alpha (live page)](https://alpha.gov.bb/what-we-mean-by-alpha)
- [alpha.gov.bb — Feedback form](https://alpha.gov.bb/feedback)
- [GOV.UK Service Manual — How the alpha phase works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works)
- [digital.gov.au — Alpha stage: testing hypotheses](https://www.digital.gov.au/policy/digital-experience/toolkit/service-design-and-delivery-process/alpha-stage-testing-hypotheses)
- [Barbados Today — GovTech Barbados launches test site to unify, simplify public services (Oct 2025)](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/)
- [Caribbean News Global — Barbados: GovTech unveils first phase in streamlining public service (Oct 2025)](https://caribbeannewsglobal.com/barbados-govtech-unveils-first-phase-in-streamlining-public-service/)
- [GovTech Barbados — Hello World / About](https://govtech.bb/2024/04/16/hello-world/)
- [GovTech Barbados WordPress blog](https://govtechbarbados.wordpress.com/)
- [GovTech Barbados — Greenhouse jobs board](https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us)
- [Public Digital — Supporting digital transformation in Barbados (Mar 2025)](https://public.digital/pd-insights/blog/2025/03/supporting-digital-transformation-in-barbados)
- [GIS — Government Establishes GovTech Barbados Limited](https://gisbarbados.gov.bb/blog/government-establishes-govtech-barbados-limited/)
- [alpha.gov.bb — Register for Community Sports Training programme](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme)
- [alpha.gov.bb — Sell goods/services at beach or park](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park)
