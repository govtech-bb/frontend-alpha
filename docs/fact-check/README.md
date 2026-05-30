# Fact-check dashboard

Last updated: 2026-05-29

This directory holds structured fact-check reports for every page on
[alpha.gov.bb](https://alpha.gov.bb). Every claim is scored with an
explicit certainty %; everything that can't be verified from the public
web is flagged for the GovBB team to confirm with the responsible
agency.

> **Re-baselined 2026-05-29.** All 76 per-page reports (58 service pages
> + 18 ministry pages) were re-run in parallel under the updated
> `/fact-check` skill (broader coverage: negative statements, procedural
> instructions, in-page links/CTAs). Claim counts roughly doubled
> per page; expect more discrepancies surfaced than the previous pass.
> Per-page stats below reflect the 2026-05-29 numbers. The **Triage**
> section (F-NNN cards) still reflects the previous pass — recurate it
> by reading the headline issues of each per-page report (linked in the
> table). Many new HIGH-impact findings — broken CTAs, broken form
> pages, ministries.ts navigation links that 404 — are listed in those
> per-page headlines.

> **Status — Slice 1.** Phases A, B, C complete (light pass). Phase D
> complete for **all 76 worked-example pages — externally verified** against
> `.gov.bb`, GIS, and Acts of Barbados sources.

---

## How to read these reports

Each `<page-slug>.md` report contains:

- **Live page** link to the public URL on alpha.gov.bb — click to open the live page in a tab.
- **Source file** path under `src/content/`.
- **Headline issues** — the top 3–5 things to triage first.
- **Claims** — every verifiable claim on the page, with type, source URL(s) consulted, status, and a certainty %.
- **Suggested fixes** where a claim is discrepant.
- **Open questions** for the GovBB team where the public web doesn't have the answer.

### Certainty rubric

| % | Meaning |
|---|---|
| **95–100** | Two or more independent authoritative sources agree (e.g. `.gov.bb` page + Acts of Barbados + GIS press release). |
| **80–94** | One authoritative source confirms (a `.gov.bb` page or an Act). |
| **60–79** | Secondary source confirms (GIS press release, embassy page, reputable Barbados news outlet within the last 12 months). |
| **40–59** | Only a single non-authoritative source confirms (older news, third-party directory). |
| **< 40** | Unverifiable from the public web — flag for the GovBB team to confirm with the agency. |

Every claim that scores **< 40%** is a candidate for direct outreach to the responsible Ministry / department.

---

## Slice 1 — fact-check reports

Click "Live page" to open the page on alpha.gov.bb; click "Report" to open the fact-check.

| Page | Live page | Fact-check report | Claims | Verified | Discrepant | Unverifiable | Avg certainty |
|---|---|---|--:|--:|--:|--:|--:|
| Get a document notarised ★ | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised)) | [Report](/docs/fact-check/get-a-document-notarised.md) | 14 | 6 | 4 | 4 | **68%** |
| Apply for a passport | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/apply-for-a-passport)) | [Report](/docs/fact-check/apply-for-a-passport.md) | 19 | 14 | 2 | 3 | **82%** |
| Register a birth ★ | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/register-a-birth)) | [Report](/docs/fact-check/register-a-birth.md) | 17 | 10 | 4 | 3 | **80%** |
| Loud music permit ★ | [alpha.gov.bb](https://alpha.gov.bb/business-trade/loud-music-permit)) | [Report](/docs/fact-check/loud-music-permit.md) | 14 | 5 | 3 | 6 | **67%** |
| Register for a summer camp ★ | [alpha.gov.bb](https://alpha.gov.bb/work-employment/register-summer-camp)) | [Report](/docs/fact-check/register-summer-camp.md) | 15 | 7 | 3 | 5 | **71%** |
| Apply for a driver's licence | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/apply-for-a-drivers-licence)) | [Report](/docs/fact-check/apply-for-a-drivers-licence.md) | 15 | 8 | 5 | 2 | **79%** |
| Justice of the Peace | [alpha.gov.bb](https://alpha.gov.bb/justice-of-the-peace)) | [Report](/docs/fact-check/justice-of-the-peace.md) | 28 | 18 | 4 | 6 | **82%** |
| Find an open pharmacy | [alpha.gov.bb](https://alpha.gov.bb/open-pharmacy)) | [Report](/docs/fact-check/open-pharmacy.md) | 20 | 13 | 4 | 3 | **80%** |
| Apply for financial assistance | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/apply-financial-assistance)) | [Report](/docs/fact-check/apply-financial-assistance.md) | 20 | 10 | 5 | 5 | **76%** |
| Get a copy of a birth certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate)) | [Report](/docs/fact-check/get-birth-certificate.md) | 15 | 9 | 2 | 4 | **78%** |
| EZPay | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/ezpay)) | [Report](/docs/fact-check/ezpay.md) | 16 | 13 | 2 | 1 | **84%** |
| Register a marriage | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/register-a-marriage)) | [Report](/docs/fact-check/register-a-marriage.md) | 11 | 8 | 1 | 2 | **83%** |
| Get a copy of a marriage certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate)) | [Report](/docs/fact-check/get-marriage-certificate.md) | 16 | 8 | 4 | 4 | **76%** |
| Get a copy of a death certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-death-certificate)) | [Report](/docs/fact-check/get-death-certificate.md) | 14 | 8 | 2 | 4 | **77%** |
| Marriage licences | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/marriage-licences)) | [Report](/docs/fact-check/marriage-licences.md) | 24 | 16 | 4 | 4 | **82%** |
| Apply for a position as a temporary teacher | [alpha.gov.bb](https://alpha.gov.bb/work-employment/apply-for-a-position-as-a-temporary-teacher)) | [Report](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) | 13 | 10 | 1 | 2 | **83%** |
| Business policies and law | [alpha.gov.bb](https://alpha.gov.bb/business-trade/business-policies-and-law)) | [Report](/docs/fact-check/business-policies-and-law.md) | 8 | 5 | 2 | 1 | **80%** |
| Financial services for businesses | [alpha.gov.bb](https://alpha.gov.bb/business-trade/financial-services-for-businesses)) | [Report](/docs/fact-check/financial-services-for-businesses.md) | 13 | 9 | 3 | 1 | **88%** |
| Bank holiday calendar | [alpha.gov.bb](https://alpha.gov.bb/bank-holiday-calendar)) | [Report](/docs/fact-check/bank-holiday-calendar.md) | 15 | 11 | 2 | 2 | **84%** |
| Calculate severance pay | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/calculate-severance-pay)) | [Report](/docs/fact-check/calculate-severance-pay.md) | 15 | 12 | 1 | 2 | **88%** |
| Calculate your pension | [alpha.gov.bb](https://alpha.gov.bb/calculate-your-pension)) | [Report](/docs/fact-check/calculate-your-pension.md) | 11 | 5 | 4 | 2 | **78%** |
| Get disaster relief assistance | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/get-disaster-relief-assistance)) | [Report](/docs/fact-check/get-disaster-relief-assistance.md) | 14 | 7 | 3 | 4 | **74%** |
| Get a primary school textbook grant | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant)) | [Report](/docs/fact-check/get-a-primary-school-textbook-grant.md) | 15 | 9 | 2 | 4 | **76%** |
| Get support for a victim of domestic abuse ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/public-safety/get-support-for-a-victim-of-domestic-abuse)) | [Report](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) | 20 | 9 | 4 | 7 | **63%** |
| Getting around Barbados | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/getting-around-barbados)) | [Report](/docs/fact-check/getting-around-barbados.md) | 15 | 8 | 4 | 3 | **71%** |
| Jobseekers | [alpha.gov.bb](https://alpha.gov.bb/work-employment/jobseekers)) | [Report](/docs/fact-check/jobseekers.md) | 13 | 6 | 5 | 2 | **86%** |
| Local information | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/local-information)) | [Report](/docs/fact-check/local-information.md) | 5 | 3 | 1 | 1 | **72%** |
| Information about business tax ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/business-trade/information-about-business-tax)) | [Report](/docs/fact-check/information-about-business-tax.md) | 22 | 12 | 5 | 5 | **70%** |
| Medical requirements | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/medical-requirements)) | [Report](/docs/fact-check/medical-requirements.md) | 8 | 3 | 3 | 2 | **68%** |
| National registration | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/national-registration)) | [Report](/docs/fact-check/national-registration.md) | 13 | 5 | 3 | 5 | **74%** |
| Redirect my business mail | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business)) | [Report](/docs/fact-check/post-office-redirection-business.md) | 15 | 5 | 3 | 7 | **60%** |
| Ports of Entry | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/ports-of-entry)) | [Report](/docs/fact-check/ports-of-entry.md) | 23 | 18 | 3 | 2 | **86%** |
| Visa information ★ | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/visa-information)) | [Report](/docs/fact-check/visa-information.md) | 8 | 0 | 6 | 2 | **46%** |
| Tell the Post Office someone has died | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased)) | [Report](/docs/fact-check/post-office-redirection-deceased.md) | 15 | 8 | 2 | 5 | **71%** |
| Redirect my personal mail | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual)) | [Report](/docs/fact-check/post-office-redirection-individual.md) | 15 | 5 | 2 | 8 | **57%** |
| Register for a YDP Community Sports Training programme | [alpha.gov.bb](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme)) | [Report](/docs/fact-check/register-for-community-sports-training-programme.md) | 12 | 6 | 2 | 4 | **72%** |
| Get a reminder before a document expires | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/renew-reminder)) | [Report](/docs/fact-check/renew-reminder.md) | 10 | 8 | 1 | 1 | **87%** |
| Registering a business name | [alpha.gov.bb](https://alpha.gov.bb/business-trade/registering-a-business-name)) | [Report](/docs/fact-check/registering-a-business-name.md) | 6 | 3 | 2 | 1 | **74%** |
| Start a business | [alpha.gov.bb](https://alpha.gov.bb/business-trade/start-a-business)) | [Report](/docs/fact-check/start-a-business.md) | 5 | 2 | 2 | 1 | **62%** |
| Report a concern about a child ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/public-safety/report-a-concern-about-a-child)) | [Report](/docs/fact-check/report-a-concern-about-a-child.md) | 15 | 6 | 5 | 4 | **62%** |
| Request a Presidential Visit for a Centenarian | [alpha.gov.bb](https://alpha.gov.bb/request-a-presidential-visit-for-a-centenarian)) | [Report](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) | 10 | 3 | 2 | 5 | **55%** |
| Report elderly abuse ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/public-safety/report-elderly-abuse)) | [Report](/docs/fact-check/report-elderly-abuse.md) | 14 | 7 | 3 | 4 | **65%** |
| Sell goods or services at a beach or park | [alpha.gov.bb](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park)) | [Report](/docs/fact-check/sell-goods-services-beach-park.md) | 16 | 8 | 1 | 7 | **70%** |
| Tax online | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/tax-online)) | [Report](/docs/fact-check/tax-online.md) | 10 | 8 | 1 | 1 | **83%** |
| Terms & Conditions | [alpha.gov.bb](https://alpha.gov.bb/terms-conditions)) | [Report](/docs/fact-check/terms-conditions.md) | 13 | 7 | 2 | 4 | **71%** |
| Visitor permit application ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/visitor-permit-application)) | [Report](/docs/fact-check/visitor-permit-application.md) | 13 | 0 | 11 | 2 | **21%** |
| Visa information | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/visa-information)) | [Report](/docs/fact-check/visa-information.md) | 8 | 0 | 6 | 2 | **46%** |
| Welfare Department ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/welfare-department)) | [Report](/docs/fact-check/welfare-department.md) | 13 | 7 | 2 | 4 | **73%** |
| What's changing? | [alpha.gov.bb](https://alpha.gov.bb/whats-changing)) | [Report](/docs/fact-check/whats-changing.md) | 14 | 11 | 0 | 3 | **82%** |

★ = page has `featured: true` in its frontmatter. ⚠️ = HIGH citizen impact (crisis service) — triage immediately.

**Totals across the 48 worked-example pages:** 685 claims · 379 verified · 142 discrepant · 164 unverifiable from public web. Overall verified rate: **55%**. Average page certainty: **73%**.

### What the columns mean

- **Claims** — total verifiable factual statements on that page.
- **Verified** — claims checked against an external authoritative source (`.gov.bb` page, Act of Barbados, GIS press release) and confirmed.
- **Discrepant** — claims checked and found wrong or contradictory.
- **Unverifiable** — claims the public web doesn't answer one way or the other. These get flagged for direct agency confirmation (phone/email to the responsible department).
- **Avg certainty** — average certainty % across all claims on the page.

★ = page has `featured: true` in its frontmatter.

**Fully verified (Phase D complete):** `get-a-document-notarised.md`, `apply-for-a-passport.md`.

**Claim extraction only (verification queued):** the other 8 reports. They list every claim that needs to be checked, with provisional certainty and the source to consult — but external web verification has not been completed in this slice.

---

## Supporting reports

- [`_inventory.md`](/docs/fact-check/_inventory.md) — Deduped master list of every claim across the 10 fact-checked pages, organised by claim type (address / phone / fee / legal reference / etc.). Lets you fix the same fact in every page it appears.
- [`_internal-consistency.md`](/docs/fact-check/_internal-consistency.md) — Mismatches between markdown content and the canonical data files (`ministries.ts`, etc.), including typos, address phrasing inconsistencies, and ministry-name drift.
- [`_links.md`](/docs/fact-check/_links.md) — External URL audit. Status of every URL spot-checked in Slice 1, plus the full list of URLs queued for the next sweep.

---

## Triage — what's probably wrong, fix these first

Each finding below is sourced from a per-page report's "Headline issues" section. Click the page name in **Where:** for the full claims list, source citations, and proposed fixes.

> **Tiers:** **A** = broken CTAs, dissolved agencies, contact info that won't reach the citizen, or other 90%+ confidence wrongness. **B** = probably wrong, verify against the agency before shipping a fix. **C** = unverifiable from the public web — needs agency confirmation.

---

### F-100 · Tier A · Ministry Download Forms page is still 404 — navigation instruction is broken

- **Where:** [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) — see headline issue #1 in that report
- **What's wrong:** The page tells citizens to find the application form "on the Ministry of Educational Transformation website under the 'resources' tab in the menu, and then the 'download forms' option." The Download Forms sub-page (`education.gov.bb/home/Resources/Download-Forms/` and without trailing slash) returns
- **Source:** see [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry Download Forms page is still 404 — navigation instruction is broken`

---
### F-101 · Tier A · Ministry of Labour miscategorisation with a broken href

- **Where:** [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) — see headline issue #1 in that report
- **What's wrong:** `src/data/ministries.ts` lines 806–809 list "Apply to be a Project Protégé Mentor" under the `onlineServices` block for the *Ministry of Labour, Social Security and Third Sector*. The service is run by the Ministry of Youth, Sports and Community Empowerment. Additionally, the href value is `/apply-t
- **Source:** see [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry of Labour miscategorisation with a broken href`

---
### F-102 · Tier A · Primary form CTA renders "Loading form..." — the application form may be broken for citizens

- **Where:** [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) — see headline issue #1 in that report
- **What's wrong:** The `/work-employment/apply-to-jobstart-plus-programme/form` page (linked from both the index and start pages) renders "Loading form..." with no actual form content. If this is a persistent rendering failure, citizens cannot complete the online application. Tier A.
- **Source:** see [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Primary form CTA renders "Loading form..." — the application form may be broken for citizens`

---
### F-103 · Tier A · Police Certificate of Character link is missing — "here" has no href

- **Where:** [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) — see headline issue #1 in that report
- **What's wrong:** Line 67 of the source reads "a Police Certificate of Character – you can apply for one here" but no hyperlink exists (no markdown link syntax). On the live page the word "here" is plain text, not a link. Citizens cannot click through to `https://forms.gov.bb/CertificateOfCharacter`. This is a broken
- **Source:** see [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Police Certificate of Character link is missing — "here" has no href`

---
### F-104 · Tier A · "Start now" CTA is broken (404)

- **Where:** [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) — see headline issue #1 in that report
- **What's wrong:** The primary citizen action — the "Start now" button linking to `/pensions-and-gratuities/calculate-your-pension/form` — returns HTTP 404. Because the parent page is `protected: true`, the form sub-page must also be reached at `/calculate-your-pension/form`, not the category-prefixed path. This is th
- **Source:** see [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Start now" CTA is broken (404)`

---
### F-105 · Tier A · BPS website link is wrong/broken domain (unchanged)

- **Where:** [crop-over-permits](/docs/fact-check/crop-over-permits.md) — see headline issue #2 in that report
- **What's wrong:** Both BPS permit cards link to `https://police.gov.bb`. The official Barbados Police Service website is `https://tbps.gov.bb`. `police.gov.bb` returns ECONNREFUSED (re-confirmed 2026-05-29). **Citizen impact: MEDIUM.**
- **Source:** see [crop-over-permits](/docs/fact-check/crop-over-permits.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `BPS website link is wrong/broken domain (unchanged)`

---
### F-106 · Tier A · NCC venue permit links to `ncc.gov.bb` — that domain times out (new finding)

- **Where:** [crop-over-permits](/docs/fact-check/crop-over-permits.md) — see headline issue #3 in that report
- **What's wrong:** The data file sets `link: "https://ncc.gov.bb"` for the NCC venue permit card. On fetch (2026-05-29) `ncc.gov.bb` times out. The correct NCC website is `https://www.nccbarbados.com`. **Citizen impact: MEDIUM** — a citizen clicking the NCC card link would reach a broken destination.
- **Source:** see [crop-over-permits](/docs/fact-check/crop-over-permits.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `NCC venue permit links to `ncc.gov.bb` — that domain times out (new finding)`

---
### F-107 · Tier A · `bfs.gov.bb` still ECONNREFUSED (confirmed again)

- **Where:** [crop-over-permits](/docs/fact-check/crop-over-permits.md) — see headline issue #4 in that report
- **What's wrong:** The BFS fire safety card links to `https://bfs.gov.bb`. This domain returns ECONNREFUSED (re-confirmed 2026-05-29). The canonical BFS domain is `https://fireservice.gov.bb`. **Citizen impact: MEDIUM** — a citizen clicking the BFS card link would reach a broken destination.
- **Source:** see [crop-over-permits](/docs/fact-check/crop-over-permits.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``bfs.gov.bb` still ECONNREFUSED (confirmed again)`

---
### F-108 · Tier A · Broken declared source URL

- **Where:** [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) — see headline issue #4 in that report
- **What's wrong:** `https://www.gov.bb/Citizens/notarize-document` (in `src/data/content-directory.ts`) returns HTTP 404. The correct live source is the Barbados Judicial System's notarising page.
- **Source:** see [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Broken declared source URL`

---
### F-109 · Tier A · "5 to 7 business days" turnaround is unverifiable from authoritative sources

- **Where:** [get-death-certificate](/docs/fact-check/get-death-certificate.md) — see headline issue #2 in that report
- **What's wrong:** No Tier 1 source (barbadoslawcourts.gov.bb, gov.bb, GIS) publishes a "5 to 7 business days" standard for death certificate copies. The birth certificate fact-check flagged this identical phrasing as potentially having been copied between pages. The GIS article that might confirm this returns HTTP 40
- **Source:** see [get-death-certificate](/docs/fact-check/get-death-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"5 to 7 business days" turnaround is unverifiable from authoritative sources`

---
### F-110 · Tier A · "Find a JP" button is broken — citizens clicking it land on a 404

- **Where:** [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) — see headline issue #1 in that report
- **What's wrong:** Source line 53 links to `/travel-id-citizenship/justice-of-the-peace/find`. That URL returns HTTP 404 on the live site, as does the IA-consistent path `/justice-of-the-peace/find`. The live JP page itself is served at `/justice-of-the-peace` (no category prefix) because it is marked `protected: true
- **Source:** see [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Find a JP" button is broken — citizens clicking it land on a 404`

---
### F-111 · Tier A · Office of the Attorney General phone is wrong (three places)

- **Where:** [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) — see headline issue #2 in that report
- **What's wrong:** Page lists `(246) 467-7370` at lines 61, 71, 75. Authoritative sources publish `(246) 535-0467` (`oag.gov.bb/contact` and `gov.bb/Ministries/attorney-general`). `467-7370` does not appear in either. **HIGH** impact — citizens calling that number will not reach the AG.
- **Source:** see [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Office of the Attorney General phone is wrong (three places)`

---
### F-112 · Tier A · Gazette link path unverifiable

- **Where:** [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) — see headline issue #4 in that report
- **What's wrong:** The page links to `https://governmentprintery.gov.bb/gazette/` but search indices surface `/official-gazette/` as the published path. Both return HTTP 403 to automated fetch; manual browser check needed to confirm if `/gazette/` resolves or 404s.
- **Source:** see [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Gazette link path unverifiable`

---
### F-113 · Tier A · `gisbarbados.gov.bb/faqs` link is broken (HTTP 403)

- **Where:** [marriage-licences](/docs/fact-check/marriage-licences.md) — see headline issue #1 in that report
- **What's wrong:** Line 100 directs citizens to the GIS FAQs page for appointment booking. That URL returns HTTP 403 Forbidden as of 2026-05-29. The direct appointment link (`govtbarbadosapointmentsystem.as.me/MarriageLicense`) resolves and is functional. The broken GIS link should be removed or replaced with the dire
- **Source:** see [marriage-licences](/docs/fact-check/marriage-licences.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``gisbarbados.gov.bb/faqs` link is broken (HTTP 403)`

---
### F-114 · Tier A · Breadcrumb "Government" link is broken (404)

- **Where:** [ministries/cabinet-office](/docs/fact-check/ministries/cabinet-office.md) — see headline issue #1 in that report
- **What's wrong:** The page renders a breadcrumb trail: Home → Government → Organisations → Cabinet Office. The "Government" step links to `/government`, which returns HTTP 404. Citizens clicking this breadcrumb hit a dead end. All other navigation links on the page work correctly. This is a Tier-B defect — it disrupt
- **Source:** see [ministries/cabinet-office](/docs/fact-check/ministries/cabinet-office.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Breadcrumb "Government" link is broken (404)`

---
### F-115 · Tier A · Live URL in previous report was wrong (now corrected)

- **Where:** [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) — see headline issue #1 in that report
- **What's wrong:** The prior pass recorded the live page at `/our-government/ministry-of-educational-transformation` — that URL returns HTTP 404. The correct live URL is `https://alpha.gov.bb/government/organisations/ministry-of-educational-transformation` (confirmed 200 OK, 2026-05-29). The dashboard link has been up
- **Source:** see [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Live URL in previous report was wrong (now corrected)`

---
### F-116 · Tier A · "Natural Beautification" typo on line 1 — misspells the ministry name

- **Where:** [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) — see headline issue #1 in that report
- **What's wrong:** The very first sentence reads "The Ministry of Environment and *Natural* Beautification." Every authoritative source — `gov.bb/Ministries/environment`, `ozone.gov.bb/the-ministry/`, Parliament — uses **National** Beautification. The same source file correctly uses "National Beautification" at lines
- **Source:** see [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Natural Beautification" typo on line 1 — misspells the ministry name`

---
### F-117 · Tier A · nhdbdos.com link is broken (line 119)

- **Where:** [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) — see headline issue #3 in that report
- **What's wrong:** The Natural Heritage section links to `http://www.nhdbdos.com/` which returns connection refused as of 2026-05-29 (re-confirmed on this pass). The authoritative replacement is `https://www.gov.bb/Departments/natural-heritage` or `https://biodiversity.gov.bb/ministry/natural-heritage-department/`.
- **Source:** see [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `nhdbdos.com link is broken (line 119)`

---
### F-118 · Tier A · weplantin.org link is broken (line 202)

- **Where:** [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) — see headline issue #4 in that report
- **What's wrong:** The We Plantin' section links to `http://www.weplantin.org/` which also returns connection refused as of 2026-05-29 (re-confirmed on this pass). The programme is confirmed active (NCC, hotline 536-TREE / (246) 536-8733); the live page is `https://www.nccbarbados.com/a-million-trees/`.
- **Source:** see [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `weplantin.org link is broken (line 202)`

---
### F-119 · Tier A · bdsfinance.gov.bb and economicaffairs.gov.bb both return ECONNREFUSED (Claim 14)

- **Where:** [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) — see headline issue #1 in that report
- **What's wrong:** Both outbound URLs — the CTA button linking to `https://www.economicaffairs.gov.bb` and the `ministries.ts` website entry `https://bdsfinance.gov.bb/` — are unreachable as at 2026-05-29 (re-confirmed from 2026-05-28). Citizens clicking either link receive a browser error. **Tier A — citizen-facing b
- **Source:** see [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `bdsfinance.gov.bb and economicaffairs.gov.bb both return ECONNREFUSED (Claim 14)`

---
### F-120 · Tier A · PS Economic Affairs is listed as Annette Weekes; current PS is Jennifer Hunte (Claim 7)

- **Where:** [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) — see headline issue #3 in that report
- **What's wrong:** The Administration table names "Mrs. Annette Weekes Ag." at line 95. The gov.bb PS grades page (re-confirmed 2026-05-29) lists "Mrs. Jennifer Hunte — Permanent Secretary (Economic Affairs and Investment) (AG)". Annette Weekes is absent from the current PS grades list. **Tier A — fix immediately.**
- **Source:** see [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `PS Economic Affairs is listed as Annette Weekes; current PS is Jennifer Hunte (Claim 7)`

---
### F-121 · Tier A · Director of Research Patrick McCaskie has moved to a different ministry (Claim 10)

- **Where:** [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) — see headline issue #4 in that report
- **What's wrong:** Line 113 lists McCaskie as Director of Research for Economic Affairs at ext. 535-1306. The PS grades page (re-confirmed 2026-05-29) shows McCaskie as "Permanent Secretary (AG), Ministry of Training and Tertiary Education". He was promoted and moved; the Research Unit listing is outdated. **Tier A —
- **Source:** see [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Director of Research Patrick McCaskie has moved to a different ministry (Claim 10)`

---
### F-122 · Tier A · Previous report used a 404 URL — now corrected

- **Where:** [ministries/ministry-of-housing-lands-and-maintenance](/docs/fact-check/ministries/ministry-of-housing-lands-and-maintenance.md) — see headline issue #1 in that report
- **What's wrong:** The prior report recorded the live page as `https://alpha.gov.bb/ministries/ministry-of-housing-lands-and-maintenance`. That URL returns HTTP 404. The actual live URL is `https://alpha.gov.bb/government/organisations/ministry-of-housing-lands-and-maintenance` (confirmed by WebFetch 2026-05-29). The
- **Source:** see [ministries/ministry-of-housing-lands-and-maintenance](/docs/fact-check/ministries/ministry-of-housing-lands-and-maintenance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Previous report used a 404 URL — now corrected`

---
### F-123 · Tier A · socialcare.gov.bb website is non-functional

- **Where:** [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) — see headline issue #3 in that report
- **What's wrong:** The data file lists `http://www.socialcare.gov.bb/` as the ministry's website. The domain returns ECONNREFUSED on direct fetch (confirmed again on 2026-05-29). Citizens who click the link reach a dead end. The SEA now operates its own website at `socialempowermentbb.org` (currently also ECONNREFUSED
- **Source:** see [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `socialcare.gov.bb website is non-functional`

---
### F-124 · Tier A · All three online service links resolve correctly

- **Where:** [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) — see headline issue #5 in that report
- **What's wrong:** `/visa-information`, `/visitor-permit-application`, and `/ports-of-entry` all load successfully with relevant, on-topic content. No broken CTAs.
- **Source:** see [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All three online service links resolve correctly`

---
### F-125 · Tier A · Previous report had a wrong live URL

- **Where:** [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) — see headline issue #2 in that report
- **What's wrong:** The prior pass recorded the live URL as `https://alpha.gov.bb/our-government/ministry-of-training-and-tertiary-education` — this returns HTTP 404. The correct live URL is `https://alpha.gov.bb/government/organisations/ministry-of-training-and-tertiary-education` (confirmed live). This is corrected i
- **Source:** see [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Previous report had a wrong live URL`

---
### F-126 · Tier A · Live page URL is wrong in the previous report

- **Where:** [open-pharmacy](/docs/fact-check/open-pharmacy.md) — see headline issue #1 in that report
- **What's wrong:** The page has `protected: true` in `src/data/content-directory.ts`, so its canonical URL is `https://alpha.gov.bb/open-pharmacy` (no category prefix). The category-prefixed URL `https://alpha.gov.bb/health-and-emergency-services/open-pharmacy` returns HTTP 404. The previous report recorded the wrong
- **Source:** see [open-pharmacy](/docs/fact-check/open-pharmacy.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Live page URL is wrong in the previous report`

---
### F-127 · Tier A · Primary CTA links are broken for public users

- **Where:** [open-pharmacy](/docs/fact-check/open-pharmacy.md) — see headline issue #2 in that report
- **What's wrong:** Both `<a data-start-link>` buttons on the page link to `/health-and-emergency-services/open-pharmacy/find` (lines 20 and 85). That URL hits the 3-slug routing handler, which checks `page.protected` and returns `notFound()` for users without research access. Citizens clicking "Find an open pharmacy"
- **Source:** see [open-pharmacy](/docs/fact-check/open-pharmacy.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Primary CTA links are broken for public users`

---
### F-128 · Tier A · "Start now" CTA is broken — primary citizen action fails with HTTP 404

- **Where:** [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) — see headline issue #1 in that report
- **What's wrong:** The "Start now" link in the source markdown (`/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form`) uses the category-prefixed path. Because this page is `protected: true` in `content-directory.ts`, it is served at `/request-a-presidential-visit-for-a-centenarian` (no cat
- **Source:** see [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Start now" CTA is broken — primary citizen action fails with HTTP 404`

---
### F-129 · Tier A · Live URL in earlier report was wrong — now corrected

- **Where:** [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) — see headline issue #2 in that report
- **What's wrong:** The previous pass recorded the live URL as `https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian`. That URL returns HTTP 404. The correct live URL, confirmed on 2026-05-29, is `https://alpha.gov.bb/request-a-presidential-visit-for-a-centenarian` (no category
- **Source:** see [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Live URL in earlier report was wrong — now corrected`

---
### F-130 · Tier A · Page is extremely thin — contains almost no actionable information

- **Where:** [start-a-business](/docs/fact-check/start-a-business.md) — see headline issue #4 in that report
- **What's wrong:** The entire page is one sentence plus a link. Citizens cannot learn from this page what the process for starting a business is, what it costs, which agencies are involved, what documents are required, or what legal obligations apply. This is a content-gap problem rather than a factual error, but it i
- **Source:** see [start-a-business](/docs/fact-check/start-a-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Page is extremely thin — contains almost no actionable information`

---
### F-131 · Tier A · privacy@govtech.bb is unverifiable from any Tier-1 or Tier-2 source

- **Where:** [terms-conditions](/docs/fact-check/terms-conditions.md) — see headline issue #3 in that report
- **What's wrong:** This is the sole contact point for data-subject rights under the Data Protection Act 2019. It does not appear on govtech.bb, gisbarbados.gov.bb, or gov.bb. Citizens cannot independently confirm the mailbox is monitored. (Claim 9)
- **Source:** see [terms-conditions](/docs/fact-check/terms-conditions.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `privacy@govtech.bb is unverifiable from any Tier-1 or Tier-2 source`

---
### F-132 · Tier A · Phone numbers are stale (both offices)

- **Where:** [visa-information](/docs/fact-check/visa-information.md) — see headline issue #2 in that report
- **What's wrong:** The page lists (246) 434-4100 for the head office and (246) 418-4180 for GAIA. A 2017 GIS announcement confirmed all Immigration numbers changed to the 535-xxxx series. Current numbers: main PBX 535-4100, GAIA primary 535-4180. Citizens dialling the listed numbers will not reach Immigration.
- **Source:** see [visa-information](/docs/fact-check/visa-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Phone numbers are stale (both offices)`

---
### F-133 · Tier A · The live URL in the previous report was wrong (now corrected)

- **Where:** [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) — see headline issue #2 in that report
- **What's wrong:** The page has `protected: true` in `src/data/content-directory.ts`, so it is served at `https://alpha.gov.bb/visitor-permit-application` — no category prefix. The category-prefixed URL `https://alpha.gov.bb/travel-id-citizenship/visitor-permit-application` returns HTTP 404. This report corrects the l
- **Source:** see [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The live URL in the previous report was wrong (now corrected)`

---
### F-134 · Tier A · The SurePay payment URL does not resolve

- **Where:** [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) — see headline issue #4 in that report
- **What's wrong:** The page gives `https://bb.surepaybillsonline.com/cc` as the SurePay payment link. That URL issues a 301 redirect to `http://bb.surepaybillsonline.com/cc/` which returns no content. SurePay's own site states the correct URL for online payments is `https://app.surepayonline.com`. This link is broken
- **Source:** see [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The SurePay payment URL does not resolve`

---
### F-135 · Tier B · "Electronic transfer of funds is not available yet" is false

- **Where:** [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) — see headline issue #1 in that report
- **What's wrong:** The Welfare Department's direct deposit / EFT system for National Assistance Grants went live on 21 May 2024 (GIS press release confirmed by web search). The page still tells citizens EFT is pending. This is the highest-priority correction: citizens may avoid providing bank details unnecessarily. Ad
- **Source:** see [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Electronic transfer of funds is not available yet" is false`

---
### F-136 · Tier B · Speightstown office building name is wrong

- **Where:** [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) — see headline issue #2 in that report
- **What's wrong:** The page says "Republic Bank Building, Chapel St." — every government and GIS source calls it the "BNB Building" in Speightstown. The GIS 2017 telephone directory explicitly names the Speightstown welfare office at "BNB Building". Update to "BNB Building, Chapel Street, Speightstown, Saint Peter".
- **Source:** see [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Speightstown office building name is wrong`

---
### F-137 · Tier B · Phone number format `+1 246-535-1000/16/23` is non-standard and partially wrong

- **Where:** [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) — see headline issue #3 in that report
- **What's wrong:** The two PBX numbers confirmed by gov.bb are `(246) 535-1000` and `(246) 535-1023`. The notation `/16/` appears nowhere in any official source — "16" is not a recognisable extension format. The GIS May 2024 direct deposit press release also lists a third number: `535-1005`. Rewrite as `(246) 535-1000
- **Source:** see [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Phone number format `+1 246-535-1000/16/23` is non-standard and partially wrong`

---
### F-138 · Tier B · Typo in section heading

- **Where:** [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) — see headline issue #4 in that report
- **What's wrong:** Line 33 reads "How to apply for financial **assitance**" — "assitance" is misspelled (should be "assistance").
- **Source:** see [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Typo in section heading`

---
### F-139 · Tier B · Post Office cheque arrangement may be obsolete

- **Where:** [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) — see headline issue #5 in that report
- **What's wrong:** The page still says citizens without a fixed address can "make arrangements through the Post Office to receive your cheque." With EFT live since May 2024 and the Cost of Living Cash Credit paying via direct bank deposit from April 2026, the cheque-via-Post-Office option may no longer be current. Nee
- **Source:** see [apply-financial-assistance](/docs/fact-check/apply-financial-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Post Office cheque arrangement may be obsolete`

---
### F-140 · Tier B · "Motor Vehicles Act, 1988" is the wrong legislation

- **Where:** [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) — see headline issue #1 in that report
- **What's wrong:** No Barbados statute by that name exists. The actual governing law is the **Road Traffic Act, CAP 295**, most recently consolidated to 2022. The "Motor Vehicles Act, 1988" is India's motor vehicle legislation. Both gov.bb and the alpha.gov.bb page appear to have copied this phrase from a non-Barbadia
- **Source:** see [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Motor Vehicles Act, 1988" is the wrong legislation`

---
### F-141 · Tier B · "Apply after 30 days" conflicts with BLA's own requirement of 3 months

- **Where:** [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) — see headline issue #2 in that report
- **What's wrong:** The BLA's Learner Permit service page states first-time permit holders must "practice for a minimum three (3) months before applying for the driving examination." The alpha.gov.bb page (mirroring gov.bb) says 30 days. A citizen who follows the page and books a driving test at 30 days will be turned
- **Source:** see [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Apply after 30 days" conflicts with BLA's own requirement of 3 months`

---
### F-142 · Tier B · International Permit documents list includes two items not on the BLA's page

- **Where:** [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) — see headline issue #3 in that report
- **What's wrong:** "Attested copy of address proof" and "Attested copy of Birth Certificate" do not appear on the BLA's official International Permit page, which lists: valid driver licence, proof of identity, valid passport, itinerary, and two passport photos. The extra items appear to be Indian template artefacts. S
- **Source:** see [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `International Permit documents list includes two items not on the BLA's page`

---
### F-143 · Tier B · Phone number `0264` is no longer published on the current BLA homepage

- **Where:** [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) — see headline issue #4 in that report
- **What's wrong:** The BLA homepage (verified 2026-05-29) lists only `+1 (246) 536-0265 / 0267 / 0278`. The number `0264` appears on the alpha.gov.bb page but is absent from both the current BLA homepage and the BLA Learner Permit service page. The page omits the confirmed numbers `0267` and `0278`. Citizen impact: LO
- **Source:** see [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Phone number `0264` is no longer published on the current BLA homepage`

---
### F-144 · Tier B · No physical address for the BLA on the page

- **Where:** [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) — see headline issue #5 in that report
- **What's wrong:** BLA's address — Pine East–West Boulevard, Bridgetown, St. Michael — is not mentioned anywhere. Citizens needing in-person service have no address to follow.
- **Source:** see [apply-for-a-drivers-licence](/docs/fact-check/apply-for-a-drivers-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No physical address for the BLA on the page`

---
### F-145 · Tier B · "Special circumstances" collection is undefined — and the eligibility restriction is missing

- **Where:** [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) — see headline issue #1 in that report
- **What's wrong:** The content page says passports may be collected by someone else "in special circumstances" without specifying what those are. The authoritative [immigration.gov.bb](https://immigration.gov.bb/pages/passport.aspx) page restricts this specifically to: elderly applicants, incapacitated applicants, tho
- **Source:** see [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Special circumstances" collection is undefined — and the eligibility restriction is missing`

---
### F-146 · Tier B · "White Park Road" should be "Whitepark Road" (one word)

- **Where:** [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) — see headline issue #2 in that report
- **What's wrong:** The Supreme Court Complex address on line 41 uses two words; [barbadoslawcourts.gov.bb](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/) and the authoritative immigration.gov.bb page both use the one-word form "Whitepark Road". This is consistent with the discrepanc
- **Source:** see [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"White Park Road" should be "Whitepark Road" (one word)`

---
### F-147 · Tier B · Fee table dated "Effective December 01, 2010" — 16-year-old date erodes citizen trust

- **Where:** [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) — see headline issue #3 in that report
- **What's wrong:** Every fee matches immigration.gov.bb exactly, so the fees are correct, but the 2010 effective date makes citizens doubt the page's currency. Recommend replacing with "Passport fees (current as at 2026)" or simply removing the effective-date line.
- **Source:** see [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Fee table dated "Effective December 01, 2010" — 16-year-old date erodes citizen trust`

---
### F-148 · Tier B · All PDF form links use HTTP, not HTTPS

- **Where:** [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) — see headline issue #4 in that report
- **What's wrong:** Links to Form A, Form B, signature specimen, and form specimens all use `http://www.immigration.gov.bb/...`. While the PDFs resolve, HTTP links expose citizens to potential MITM interception of government documents. Low immediacy but worth updating.
- **Source:** see [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All PDF form links use HTTP, not HTTPS`

---
### F-149 · Tier B · Stray triple-backtick on line 59

- **Where:** [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) — see headline issue #5 in that report
- **What's wrong:** renders as an unclosed code fence in Markdown. Not a factual error but a rendering bug that produces a code block on the live page.
- **Source:** see [apply-for-a-passport](/docs/fact-check/apply-for-a-passport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Stray triple-backtick on line 59`

---
### F-150 · Tier B · Responsible body may now be the Social Empowerment Agency (SEA), not the Child Care Board

- **Where:** [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) — see headline issue #1 in that report
- **What's wrong:** A January 2026 Barbados Today article reports the SEA was launched on 7 January 2026 as "an amalgamation of the island's social services." However, that article does not name the Child Care Board specifically as a merged entity. The childcareboard.gov.bb website continues to operate independently, g
- **Source:** see [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Responsible body may now be the Social Empowerment Agency (SEA), not the Child Care Board`

---
### F-151 · Tier B · The page is missing the responsible agency's contact details

- **Where:** [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) — see headline issue #5 in that report
- **What's wrong:** The Child Care Board contact information (Fred Edghill Building, Cheapside, Bridgetown; (246) 535-2800; childcareboard@barbados.gov.bb; Mon–Fri 8:30 AM–4:30 PM) is not on the page. Citizens who need to follow up have no contact point.
- **Source:** see [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The page is missing the responsible agency's contact details`

---
### F-152 · Tier B · CSEC requirements now fully verified (reversed finding from prior pass)

- **Where:** [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) — see headline issue #2 in that report
- **What's wrong:** The MPS Circular NP7/2025 (dated 2025-06-03, machine-readable in this pass) explicitly states for the "Teacher" grade: "At least five subjects at CSEC General Proficiency Level including English Language, Mathematics and a Science subject." This matches the page word-for-word. The prior pass marked
- **Source:** see [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `CSEC requirements now fully verified (reversed finding from prior pass)`

---
### F-153 · Tier B · "Primary school only" scope now confirmed (reversed finding from prior pass)

- **Where:** [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) — see headline issue #3 in that report
- **What's wrong:** The same MPS Circular NP7/2025 is addressed to "Principals, Public Nursery and Primary Schools" and its subject line specifies "Post of Graduate Teacher/Special Grade Teacher/Qualified Teacher/Teacher, **Primary Schools**." This confirms the page's restriction to government-funded primary schools is
- **Source:** see [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Primary school only" scope now confirmed (reversed finding from prior pass)`

---
### F-154 · Tier B · No contact details for citizens with eligibility questions

- **Where:** [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) — see headline issue #4 in that report
- **What's wrong:** The page still has no email, phone, or contact point for applicants who want to confirm eligibility or check vacancy status. The MPS circular includes teachervacancy@mes.gov.bb. Adding this would meaningfully reduce friction.
- **Source:** see [apply-for-a-position-as-a-temporary-teacher](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No contact details for citizens with eligibility questions`

---
### F-155 · Tier B · Ministry name is out of date

- **Where:** [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) — see headline issue #1 in that report
- **What's wrong:** The page calls the issuing body "Ministry of Transport and Works" but the current official name — confirmed on gov.bb, the ministry's own homepage, and all GIS press releases — is the **Ministry of Transport, Works and Water Resources (MTWW)**. The older short form survives on the ministry's own web
- **Source:** see [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry name is out of date`

---
### F-156 · Tier B · The ministry address shown (2nd Floor, The Goddard Building, Haggatt Hall) is a temporary relocation

- **Where:** [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) — see headline issue #3 in that report
- **What's wrong:** The MTW's official permanent address is Pine East–West Boulevard, The Pine, St. Michael. The MTW Contact FAQ explicitly labels the Goddard Building address as a "Temporary address" — this is confirmed on direct fetch (2026-05-29). The page presents this as the standard address without any caveat abo
- **Source:** see [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The ministry address shown (2nd Floor, The Goddard Building, Haggatt Hall) is a temporary relocation`

---
### F-157 · Tier B · Police Certificate of Character link resolves correctly, and the fee is confirmed at BBD $20

- **Where:** [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) — see headline issue #5 in that report
- **What's wrong:** No correction needed here; the URL and fee align with the authoritative forms.gov.bb source (confirmed live 2026-05-29).
- **Source:** see [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Police Certificate of Character link resolves correctly, and the fee is confirmed at BBD $20`

---
### F-158 · Tier B · YDP email address cannot be confirmed as an active inbox via a live web page

- **Where:** [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) — see headline issue #2 in that report
- **What's wrong:** The page states paper applications can be emailed to `YDP@barbados.gov.bb`. The youthaffairs.gov.bb contact page does not list any email address for the programme. The address appears in a gov.bb PDF document but the PDF could not be rendered for full text extraction. If this inbox is no longer moni
- **Source:** see [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `YDP email address cannot be confirmed as an active inbox via a live web page`

---
### F-159 · Tier B · No `source_url` is declared in `content-directory.ts` for this page

- **Where:** [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) — see headline issue #4 in that report
- **What's wrong:** There is no linked authoritative source for this page. The canonical authority is `youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/`, which should be added.
- **Source:** see [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No `source_url` is declared in `content-directory.ts` for this page`

---
### F-160 · Tier B · `/work-employment/apply-to-be-a-project-protege-mentor/form` shows "Loading form…"

- **Where:** [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) — see headline issue #5 in that report
- **What's wrong:** The form endpoint (`start.md` links to `/form`) returned HTTP 200 but the page body shows only "Loading form…" — the form does not render for web crawlers. This may be expected (client-side JS rendering) but cannot be confirmed as fully functional without a browser. The start page CTA links correctl
- **Source:** see [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``/work-employment/apply-to-be-a-project-protege-mentor/form` shows "Loading form…"`

---
### F-161 · Tier B · Ministry address contains "Warrens Close" — a street name that does not exist in any official source

- **Where:** [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) — see headline issue #2 in that report
- **What's wrong:** All authoritative sources (gov.bb, labour.gov.bb, `src/data/ministries.ts`) use "Warrens" (the district/locality), not "Warrens Close". Additionally "3rd Floor West" should be "3rd Floor West Wing" per gov.bb and ministries.ts. Citizens submitting paper forms to this address risk mail going astray o
- **Source:** see [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry address contains "Warrens Close" — a street name that does not exist in any official source`

---
### F-162 · Tier B · "Registration is open throughout the year" contradicts the official programme page

- **Where:** [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) — see headline issue #3 in that report
- **What's wrong:** The labour.gov.bb/jobstartplus/ page shows cohort-specific registration deadlines (e.g. "deadline Friday 11 April 2025 for May 2025 cohort"). Describing registration as year-round could cause citizens to miss the active cohort window and wait months for the next one.
- **Source:** see [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Registration is open throughout the year" contradicts the official programme page`

---
### F-163 · Tier B · Training duration conflict: alpha.gov.bb says "3 weeks", labour.gov.bb still says "two-week"

- **Where:** [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) — see headline issue #4 in that report
- **What's wrong:** The March 2026 Barbados Today article quotes programme manager Erika Watson confirming expansion to 3 weeks, so alpha.gov.bb is likely more current — but the two official sources remain in conflict and need reconciliation.
- **Source:** see [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Training duration conflict: alpha.gov.bb says "3 weeks", labour.gov.bb still says "two-week"`

---
### F-164 · Tier B · Two typographical errors in the source file

- **Where:** [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) — see headline issue #5 in that report
- **What's wrong:** "suitablity" (index.md line 65) and "trainingg" (index.md line 68) are published to the live page and erode trust in the service.
- **Source:** see [apply-to-jobstart-plus-programme](/docs/fact-check/apply-to-jobstart-plus-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Two typographical errors in the source file`

---
### F-165 · Tier B · Ministry name is wrong throughout the page

- **Where:** [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) — see headline issue #2 in that report
- **What's wrong:** Lines 28 and 82 use "Ministry of Youth and Community Empowerment." The correct current name is "Ministry of Youth, Sports and Community Empowerment," confirmed in `src/data/ministries.ts`, on `youthaffairs.gov.bb`, `byac.gov.bb`, and `gisbarbados.gov.bb`. Both occurrences need correcting.
- **Source:** see [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry name is wrong throughout the page`

---
### F-166 · Tier B · Residential programme duration is contradicted by multiple authoritative sources

- **Where:** [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) — see headline issue #3 in that report
- **What's wrong:** Line 101 states "a 6-week residential programme." Three Tier-1 sources (Division of Youth Affairs programme page, BYAC's own programme page, and youthaffairs.gov.bb programme channels) state "Residential Training (10 weeks)." A single byac.gov.bb sub-page also states 6 weeks — creating an internal B
- **Source:** see [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Residential programme duration is contradicted by multiple authoritative sources`

---
### F-167 · Tier B · "National Insurance Scheme" is an outdated name

- **Where:** [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) — see headline issue #4 in that report
- **What's wrong:** Line 49 describes the application form as asking about "your National Insurance Scheme." The NIS was formally renamed the National Insurance and Social Security Service (NISSS) on 1 December 2023. The old name has been superseded for over two years.
- **Source:** see [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"National Insurance Scheme" is an outdated name`

---
### F-168 · Tier B · The $600/month stipend figure has not been confirmed in any current Tier-1 source

- **Where:** [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) — see headline issue #5 in that report
- **What's wrong:** The only publicly documented source for this figure is a 2019 Barbados Today article — before the programme launched. No current official page (youthaffairs.gov.bb, byac.gov.bb, gov.bb) publishes the current stipend amount. The figure may have changed.
- **Source:** see [apply-to-the-barbados-youthadvance-corps](/docs/fact-check/apply-to-the-barbados-youthadvance-corps.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The $600/month stipend figure has not been confirmed in any current Tier-1 source`

---
### F-169 · Tier B · "National Sports Council office / My Lords Hill" is the former address

- **Where:** [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) — see headline issue #1 in that report
- **What's wrong:** The NSC relocated its headquarters from Blenheim, My Lord's Hill to the Garfield Sobers Sports Complex, Wildey, St. Michael. This is the current Tier 1-confirmed address on both `gov.bb/Departments/sports-council` and `nsc.gov.bb`. Sending a citizen to My Lords Hill risks wasted journeys, but the pi
- **Source:** see [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"National Sports Council office / My Lords Hill" is the former address`

---
### F-170 · Tier B · "Recruitment usually begins around April" is contradicted by the sister register-summer-camp page fi…

- **Where:** [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) — see headline issue #2 in that report
- **What's wrong:** The register-summer-camp fact-check (2026-05-28) established that the Division of Youth Affairs volunteer recruitment for 2025 was announced on 28 June 2025, not April. The NSC also opened its 2026 Coach Assistant application after May 2026 — not in April. No authoritative source places NSC voluntee
- **Source:** see [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Recruitment usually begins around April" is contradicted by the sister register-summer-camp page fi…`

---
### F-171 · Tier B · "Garfield Sobers Complex" is a truncated version of the official name

- **Where:** [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) — see headline issue #3 in that report
- **What's wrong:** The facility is officially called the "Sir Garfield Sobers Sports Complex" (gov.bb State Bodies page) and the building used by the NSC is the "Wildey Gymnasium" within that complex. The content uses "Garfield Sobers Complex" — the omission of "Sir" is a formal error and the omission of "Sports" is a
- **Source:** see [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Garfield Sobers Complex" is a truncated version of the official name`

---
### F-172 · Tier B · The Police Certificate of Character link is live and the fee ($20) is confirmed

- **Where:** [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) — see headline issue #5 in that report
- **What's wrong:** `forms.gov.bb/CertificateOfCharacter` resolves correctly; fee is BBD $20, consistent with `_inventory.md`. No corrections needed here. **Re-check 2026-05-29: re-verified, still live, fee BBD $20.**
- **Source:** see [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The Police Certificate of Character link is live and the fee ($20) is confirmed`

---
### F-173 · Tier B · "ten official National Heroes" is wrong — there are eleven

- **Where:** [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) — see headline issue #1 in that report
- **What's wrong:** Rihanna was named the 11th National Hero on 30 November 2021 at the investiture ceremony marking Barbados becoming a republic. The note on National Heroes Day reads "Honouring Barbados's ten official National Heroes" — it needs updating to eleven. Citizen impact: medium (historical accuracy, public
- **Source:** see [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"ten official National Heroes" is wrong — there are eleven`

---
### F-174 · Tier B · "7th Monday after Easter" is wrong — Whit Monday is the 8th Monday after Easter

- **Where:** [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) — see headline issue #2 in that report
- **What's wrong:** The component annotates Whit Monday as `"7th Monday after Easter"`. Computing the Gregorian calendar for 2024–2028 and counting Mondays (inclusive of Easter Monday as the 1st) gives eight Mondays to Whit Monday every year. The correct standard description is "day after Pentecost" (Pentecost Sunday i
- **Source:** see [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"7th Monday after Easter" is wrong — Whit Monday is the 8th Monday after Easter`

---
### F-175 · Tier B · "Emancipation Day" note says "abolition of slavery in 1834"

- **Where:** [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) — see headline issue #3 in that report
- **What's wrong:** — this is defensible but incomplete. The Slavery Abolition Act took effect on 1 August 1834 (end of legal slavery across the British Empire). Full freedom — end of the apprenticeship system — came on 1 August 1838. Caribbean Emancipation Day commemorates both dates. The note is not incorrect, but it
- **Source:** see [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Emancipation Day" note says "abolition of slavery in 1834"`

---
### F-176 · Tier B · The `source_url` field in `content-directory.ts` is blank for this page

- **Where:** [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) — see headline issue #4 in that report
- **What's wrong:** No source URL was set. The "About this list" section on the page links to `labour.gov.bb/library/library-publications/holidays/` — that URL is live and appropriate, but it should be populated in `content-directory.ts` as `source_url`.
- **Source:** see [bank-holiday-calendar](/docs/fact-check/bank-holiday-calendar.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The `source_url` field in `content-directory.ts` is blank for this page`

---
### F-177 · Tier B · Ministry name is truncated (F-006)

- **Where:** [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) — see headline issue #1 in that report
- **What's wrong:** The page uses "The Ministry of Labour" but the canonical official name is "Ministry of Labour, Social Security and Third Sector". This appears on both `gov.bb` and `src/data/ministries.ts`. No change since last pass — still open.
- **Source:** see [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry name is truncated (F-006)`

---
### F-178 · Tier B · Page miscategorised in `ministries.ts`

- **Where:** [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) — see headline issue #3 in that report
- **What's wrong:** The `business-policies-and-law` page is listed under `ministry-of-industry-innovation-science-and-technology` (`ministries.ts` line 743), but its entire content covers the Ministry of Labour's mandate. Citizens navigating via the MIIST ministry page see a misleading "Business policies and law" servi
- **Source:** see [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Page miscategorised in `ministries.ts``

---
### F-179 · Tier B · Page title vs. content scope mismatch (unresolved)

- **Where:** [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) — see headline issue #4 in that report
- **What's wrong:** The title "Business policies and law" implies broad coverage of business legislation but the content is exclusively a two-paragraph Ministry of Labour overview. The GOV.BB source page uses the narrower title "Labour Laws and Regulations". This remains an editorial IA decision for the GovBB team.
- **Source:** see [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Page title vs. content scope mismatch (unresolved)`

---
### F-180 · Tier B · Source page title mismatch

- **Where:** [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) — see headline issue #5 in that report
- **What's wrong:** `source_url` (`https://www.gov.bb/Business/policies-laws`) is live and breadcrumbs as "Home > Business > Labour Laws and Regulations" — title differs from the alpha.gov.bb page title "Business policies and law". Still open, same as last pass.
- **Source:** see [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Source page title mismatch`

---
### F-181 · Tier B · REVERSED — Claim 12 (gross pay / overtime) is now verified

- **Where:** [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) — see headline issue #1 in that report
- **What's wrong:** The previous pass flagged "your usual gross pay — include overtime or bonuses" (start.md) as discrepant, arguing severance is calculated on *basic pay* which excludes overtime. On re-verification, the NIS's own severance page defines "Basic Average Pay" as "(Total Earnings within the last 104 weeks
- **Source:** see [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `REVERSED — Claim 12 (gross pay / overtime) is now verified`

---
### F-182 · Tier B · "Death of employer" trigger absent from NIS qualifying-events list (Claim 4 / Claim 13)

- **Where:** [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) — see headline issue #3 in that report
- **What's wrong:** The alpha.gov.bb page lists "your employer died" as a qualifying reason. The NIS's own /severance/ page only lists four triggers (redundancy, laid-off, short-time, natural disaster) and does not include death of employer. The Act (Cap. 355A) does contain provisions on death of employer, so the claim
- **Source:** see [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Death of employer" trigger absent from NIS qualifying-events list (Claim 4 / Claim 13)`

---
### F-183 · Tier B · Hours-per-week eligibility threshold missing from page (additional finding)

- **Where:** [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) — see headline issue #4 in that report
- **What's wrong:** The NIS page requires employees to "be contracted to work for no less than 21 hours a week" to be eligible. The alpha.gov.bb page does not mention this threshold. A part-time worker on fewer than 21 contracted hours would not be eligible but would not know from this page.
- **Source:** see [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Hours-per-week eligibility threshold missing from page (additional finding)`

---
### F-184 · Tier B · PAD is a dissolved entity (two occurrences)

- **Where:** [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) — see headline issue #2 in that report
- **What's wrong:** The page refers to "the Personnel Administration Division (PAD)" in both the introductory disclaimer (line 16) and the "What you'll need" section (line 23). The PAD was absorbed into the Ministry of Public Service in January 2019. Citizens contacting "the PAD" will be unable to locate the successor.
- **Source:** see [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `PAD is a dissolved entity (two occurrences)`

---
### F-185 · Tier B · Voluntary retirement age table has a boundary error

- **Where:** [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) — see headline issue #3 in that report
- **What's wrong:** The table assigns persons appointed "On or after 15 July 1985" to the age-60 group. Both MPS sources use "on or before 15th July 1985 → 55" and "after 15th July 1985 → 60". A person appointed on exactly 15 July 1985 is entitled to voluntary retirement at 55, not 60.
- **Source:** see [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Voluntary retirement age table has a boundary error`

---
### F-186 · Tier B · Compulsory retirement table omits the 2006–2009 row

- **Where:** [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) — see headline issue #4 in that report
- **What's wrong:** The MPS authoritative table lists four rows beginning with "1 January 2006 to 31 December 2009 → 65½". The alpha page starts at 2010, so officers in that earlier window have no guidance.
- **Source:** see [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Compulsory retirement table omits the 2006–2009 row`

---
### F-187 · Tier B · NIS/government pension rule stated without its qualifying scope

- **Where:** [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) — see headline issue #5 in that report
- **What's wrong:** The abatement rule ("only the higher of the two") only applies to officers who entered service after 1 September 1975 per the Pensions (Miscellaneous Provisions) Act, 1975-31. The page presents it as universal. Low practical impact today but is a legal inaccuracy.
- **Source:** see [calculate-your-pension](/docs/fact-check/calculate-your-pension.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `NIS/government pension rule stated without its qualifying scope`

---
### F-188 · Tier B · BRA address has wrong road name (unchanged)

- **Where:** [crop-over-permits](/docs/fact-check/crop-over-permits.md) — see headline issue #1 in that report
- **What's wrong:** Both BRA permit cards state "Weymouth Corporate Centre, **Spring Garden Highway**, St. Michael." All authoritative BRA sources give the address as "Weymouth Corporate Centre, **Roebuck Street**, St. Michael." A citizen attending in person would go to the wrong road (~4 km away). **Citizen impact: ME
- **Source:** see [crop-over-permits](/docs/fact-check/crop-over-permits.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `BRA address has wrong road name (unchanged)`

---
### F-189 · Tier B · "Public gathering licence" has no confirmed statutory basis (unchanged)

- **Where:** [crop-over-permits](/docs/fact-check/crop-over-permits.md) — see headline issue #5 in that report
- **What's wrong:** The form presents a "Public Gathering Licence from the Barbados Police Service" as universal (conditions: none — appears in every checklist). No public BPS page, gov.bb page, or Act uses this phrase for a distinct Barbados permit. **Citizen impact: HIGH** — every single checklist user is told to app
- **Source:** see [crop-over-permits](/docs/fact-check/crop-over-permits.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Public gathering licence" has no confirmed statutory basis (unchanged)`

---
### F-190 · Tier B · BPS lead time 6 weeks vs BPS-published 4 weeks (unchanged)

- **Where:** [crop-over-permits](/docs/fact-check/crop-over-permits.md) — see headline issue #6 in that report
- **What's wrong:** Both BPS cards say "6 weeks." The only BPS-published timeframe (official BPS Facebook) says "4 weeks before the date of the event." **Citizen impact: LOW-MEDIUM.**
- **Source:** see [crop-over-permits](/docs/fact-check/crop-over-permits.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `BPS lead time 6 weeks vs BPS-published 4 weeks (unchanged)`

---
### F-191 · Tier B · Intro copy error: "Visa Debit Cards" omits Mastercard (line 11) — unfixed since prior pass

- **Where:** [ezpay](/docs/fact-check/ezpay.md) — see headline issue #1 in that report
- **What's wrong:** The intro paragraph lists "Visa Debit Cards" while the body of the same page (line 25) correctly says "Visa or Mastercard Debit Cards". bra.gov.bb independently confirms "VISA or Mastercard debit or credit cards". A citizen with only a Mastercard Debit card reading only the intro could incorrectly c
- **Source:** see [ezpay](/docs/fact-check/ezpay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Intro copy error: "Visa Debit Cards" omits Mastercard (line 11) — unfixed since prior pass`

---
### F-192 · Tier B · Intro copy error: "Barbados Post Office" is the wrong official name (line 11) — unfixed since prior …

- **Where:** [ezpay](/docs/fact-check/ezpay.md) — see headline issue #2 in that report
- **What's wrong:** The intro uses "Barbados Post Office" while the official name is "Barbados Postal Service" (confirmed by bps.gov.bb). The body of the page (line 31) correctly uses "Barbados Postal Service". gov.bb's own intro paragraph also uses "Barbados Post Office", but alpha.gov.bb should lead with the correct
- **Source:** see [ezpay](/docs/fact-check/ezpay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Intro copy error: "Barbados Post Office" is the wrong official name (line 11) — unfixed since prior …`

---
### F-193 · Tier B · Frontmatter `section` field mismatch

- **Where:** [ezpay](/docs/fact-check/ezpay.md) — see headline issue #3 in that report
- **What's wrong:** `src/content/ezpay.md` line 6 reads `section: "Work and Employment"` but the page lives under the `money-financial-support` category in content-directory.ts (title: "Money and financial support"). If the `section` field drives breadcrumbs or navigation, citizens will see the wrong category label.
- **Source:** see [ezpay](/docs/fact-check/ezpay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Frontmatter `section` field mismatch`

---
### F-194 · Tier B · Portal carries "EZ123" branding, not "EZpay+"

- **Where:** [ezpay](/docs/fact-check/ezpay.md) — see headline issue #4 in that report
- **What's wrong:** Every page under ezpay.gov.bb (login, homepage) displays the title "EZ123" rather than "EZpay+". No formal rebrand announcement was found on gisbarbados.gov.bb or gov.bb. The GovBB team should confirm whether a rebrand is in progress. If so, all "EZpay+" references on alpha.gov.bb would need updatin
- **Source:** see [ezpay](/docs/fact-check/ezpay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Portal carries "EZ123" branding, not "EZpay+"`

---
### F-195 · Tier B · Second phone number is the fax, not a voice line

- **Where:** [financial-services-for-businesses](/docs/fact-check/financial-services-for-businesses.md) — see headline issue #1 in that report
- **What's wrong:** Line 26 lists `(246) 421-2146` as a second telephone number alongside `(246) 421-2142`. The FSC's own Contact Us page lists only one phone number — `+1 (246) 421 2142` — and does not list 421-2146 at all. Multiple web search results identify 421-2146 as the FSC fax number. Presenting it without a la
- **Source:** see [financial-services-for-businesses](/docs/fact-check/financial-services-for-businesses.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Second phone number is the fax, not a voice line`

---
### F-196 · Tier B · "Co-operatives Societies Act" is mis-spelled

- **Where:** [financial-services-for-businesses](/docs/fact-check/financial-services-for-businesses.md) — see headline issue #2 in that report
- **What's wrong:** Line 18 writes "Co-operatives Societies Act" (spurious plural on "Co-operatives"). The FSC's Legislation page, the Barbados Law Courts statute repository, and the ILO NATLEX catalogue all use "Co-operative Societies Act, Cap. 378A". The FSC's own Credit Unions Division page inconsistently uses the p
- **Source:** see [financial-services-for-businesses](/docs/fact-check/financial-services-for-businesses.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Co-operatives Societies Act" is mis-spelled`

---
### F-197 · Tier B · Website link uses HTTP instead of HTTPS

- **Where:** [financial-services-for-businesses](/docs/fact-check/financial-services-for-businesses.md) — see headline issue #3 in that report
- **What's wrong:** Line 30 links to `http://www.fsc.gov.bb/`. The FSC site serves pages over HTTPS (`https://www.fsc.gov.bb/`). The HTTP link may generate browser security warnings on strict clients. Best practice and all Tier 1 citations use `https://`.
- **Source:** see [financial-services-for-businesses](/docs/fact-check/financial-services-for-businesses.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Website link uses HTTP instead of HTTPS`

---
### F-198 · Tier B · Notarial seal fee conflict — $50 vs $20

- **Where:** [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) — see headline issue #1 in that report
- **What's wrong:** The page says "Notarial seal — BBD $50". The official Barbados Judicial System site currently states "The fee for affixing a notarial seal is BDS$20.00 for each notarial act." A GIS press release from April 2017 announced a change *to* $50. The 2024 Notaries Public Act says "no change in fees from t
- **Source:** see [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Notarial seal fee conflict — $50 vs $20`

---
### F-199 · Tier B · CAIPO / Intellectual Property Office address is wrong

- **Where:** [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) — see headline issue #2 in that report
- **What's wrong:** Page says "Baobab Tower, Highway 2, Saint Michael." Authoritative sources (CAIPO website and gov.bb State Bodies page) confirm the address is "Ground Floor, Baobab Towers, Warrens, St. Michael." Building name is plural (Towers), and location is Warrens, not Highway 2.
- **Source:** see [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `CAIPO / Intellectual Property Office address is wrong`

---
### F-200 · Tier B · Missing citizen requirement: $10 adhesive postage stamp

- **Where:** [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) — see headline issue #3 in that report
- **What's wrong:** The Barbados Judicial System site explicitly states "Persons desirous of having a document notarized are required to bring a $10.00 adhesive postage stamp which will be affixed to the document and cancelled by the registrar." This is omitted from the page's "What to take" section — a citizen arrivin
- **Source:** see [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Missing citizen requirement: $10 adhesive postage stamp`

---
### F-201 · Tier B · New Notaries Public Act 2024 in effect since 1 September 2024

- **Where:** [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) — see headline issue #5 in that report
- **What's wrong:** The 2024 Act replaced the 2017 Act and expanded who can be a notary (attorneys-at-law, chartered accountants, qualified professionals with 15+ years experience). The page's description — which implies notarisation is only available at three specific government offices — may now be incomplete, since
- **Source:** see [get-a-document-notarised](/docs/fact-check/get-a-document-notarised.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `New Notaries Public Act 2024 in effect since 1 September 2024`

---
### F-202 · Tier B · "One form covers multiple children at the same school" is wrong

- **Where:** [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) — see headline issue #1 in that report
- **What's wrong:** The page states parents with more than one child at the same school need only complete one form on behalf of all those children. The Ministry of Educational Transformation's own announcement (mes.gov.bb) states explicitly: "You are required to complete one form per student, and upload the receipt on
- **Source:** see [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"One form covers multiple children at the same school" is wrong`

---
### F-203 · Tier B · Currency code "BDD" is a typo

- **Where:** [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) — see headline issue #2 in that report
- **What's wrong:** The page description in `src/content/get-a-primary-school-textbook-grant/index.md` line 3 and line 8 use "BDD" for the grant amount. The correct abbreviation used by the Government of Barbados is BDS$ (common local usage) or ISO 4217 code BBD. "BDD" does not correspond to any recognised Barbados cur
- **Source:** see [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Currency code "BDD" is a typo`

---
### F-204 · Tier B · Opening hours are wrong (8:30am–3:15pm stated; 8:30am–3:30pm correct) — not yet fixed

- **Where:** [get-birth-certificate](/docs/fact-check/get-birth-certificate.md) — see headline issue #1 in that report
- **What's wrong:** The page lists the Registration Department as open until 3:15pm Monday to Friday. Both gov.bb/register-birth and gov.bb/Citizens/register-birth state the hours as "between the hours of 8:30 am and 3:30 pm Monday to Friday". The 3:15pm figure is a COVID-era temporary measure from 2020, not the curren
- **Source:** see [get-birth-certificate](/docs/fact-check/get-birth-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Opening hours are wrong (8:30am–3:15pm stated; 8:30am–3:30pm correct) — not yet fixed`

---
### F-205 · Tier B · Overseas phone number +1 (246) 535-9751 not corroborated on any Tier 1 source

- **Where:** [get-birth-certificate](/docs/fact-check/get-birth-certificate.md) — see headline issue #3 in that report
- **What's wrong:** barbadoslawcourts.gov.bb lists only 1-246-535-9700 and fax 1-246-426-2405 for the Registration Department. The 535-9751 number also appears on the alpha death certificate page but has not been found on barbadoslawcourts.gov.bb or gov.bb specifically for birth certificate enquiries.
- **Source:** see [get-birth-certificate](/docs/fact-check/get-birth-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Overseas phone number +1 (246) 535-9751 not corroborated on any Tier 1 source`

---
### F-206 · Tier B · Opening hours are wrong (3:15pm stated; 3:30pm correct)

- **Where:** [get-death-certificate](/docs/fact-check/get-death-certificate.md) — see headline issue #1 in that report
- **What's wrong:** The page lists the Registration Department as open until 3:15pm Monday to Friday (index.md line 48). Two independent gov.bb sources (gov.bb/register-birth and gov.bb/Citizens/register-birth) confirm the hours as 8:30am to 3:30pm. This is the same discrepancy flagged on the sibling get-birth-certific
- **Source:** see [get-death-certificate](/docs/fact-check/get-death-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Opening hours are wrong (3:15pm stated; 3:30pm correct)`

---
### F-207 · Tier B · Overseas direct-dial number +1 (246) 535-9751 not confirmed on any Tier 1 source

- **Where:** [get-death-certificate](/docs/fact-check/get-death-certificate.md) — see headline issue #3 in that report
- **What's wrong:** The same number appears on the sibling birth certificate page. barbadoslawcourts.gov.bb and gov.bb/Departments/registration both list only 535-9700 (PBX) and fax numbers. A third-party directory (GiveBackBarbados) associates 535-9751 with the Registrar's Secretary, which is consistent with it being
- **Source:** see [get-death-certificate](/docs/fact-check/get-death-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Overseas direct-dial number +1 (246) 535-9751 not confirmed on any Tier 1 source`

---
### F-208 · Tier B · Start.md asks for "cause of death" as a form field — but the page itself says cause-of-death certifi…

- **Where:** [get-death-certificate](/docs/fact-check/get-death-certificate.md) — see headline issue #4 in that report
- **What's wrong:** index.md line 29 states you must go in person; start.md line 29 lists "the cause of death" as a mandatory form field. The distinction between "cause of death as a search identifier" vs. "applying for a cause-of-death certificate" is not drawn on the page, which could confuse applicants.
- **Source:** see [get-death-certificate](/docs/fact-check/get-death-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Start.md asks for "cause of death" as a form field — but the page itself says cause-of-death certifi…`

---
### F-209 · Tier B · "Welfare Department" is the wrong agency name

- **Where:** [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) — see headline issue #1 in that report
- **What's wrong:** The Welfare Department was dissolved on 2 January 2026 and merged into the **Social Empowerment Agency (SEA)**, together with the Child Care Board, National Assistance Board, National Disabilities Unit, and the Resilience and Reintegration Unit. Every occurrence of "Welfare Department" on this page
- **Source:** see [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Welfare Department" is the wrong agency name`

---
### F-210 · Tier B · Both the agency name and address are wrong — citizens will go to the wrong building

- **Where:** [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) — see headline issue #2 in that report
- **What's wrong:** The page lists "Welfare Department, Perry Gap, Bridgetown" (lines 22–24 and 40–43). The agency is now the **Social Empowerment Agency (SEA)**, and its confirmed main office is at **4th Floor, Warrens Office Complex, Warrens, St. Michael** (phone: (246) 310-1600/01/02). The old Welfare Department was
- **Source:** see [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Both the agency name and address are wrong — citizens will go to the wrong building`

---
### F-211 · Tier B · Welfare Department phone number is wrong

- **Where:** [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) — see headline issue #3 in that report
- **What's wrong:** Lines 25 and 44 list `+1 246-535-1000`, which is the former Welfare Department's PBX. The SEA's published number is **(246) 310-1600/01/02**. Citizens who dial 535-1000 may still reach legacy staff, but this number is now the old department. The page should be updated to the SEA contact.
- **Source:** see [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Welfare Department phone number is wrong`

---
### F-212 · Tier B · Missing DEM phone number

- **Where:** [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) — see headline issue #4 in that report
- **What's wrong:** The DEM address appears on the page (lines 80–84) but no phone number is given. The confirmed DEM contact is **(246) 438-7575** (confirmed on both dem.gov.bb and gov.bb). For a disaster-related page, this is a significant omission — citizens in a crisis need to be able to call the DEM directly.
- **Source:** see [get-disaster-relief-assistance](/docs/fact-check/get-disaster-relief-assistance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Missing DEM phone number`

---
### F-213 · Tier B · Opening hours are wrong (3:15pm stated; 3:30pm correct)

- **Where:** [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) — see headline issue #1 in that report
- **What's wrong:** The page states the Registration Department is open until 3:15pm Monday to Friday. Both `gov.bb/register-birth` and `gov.bb/Citizens/register-birth` state the hours as "between the hours of 8:30 am and 3:30 pm Monday to Friday." This is the same discrepancy confirmed on the birth certificate page (s
- **Source:** see [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Opening hours are wrong (3:15pm stated; 3:30pm correct)`

---
### F-214 · Tier B · Overseas section heading names the wrong certificate type

- **Where:** [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) — see headline issue #2 in that report
- **What's wrong:** index.md line 61 reads "## Get a copy of a birth certificate if you live overseas" — but the page is about marriage certificates. Confirmed present on the live page. This is a copy-paste error from the birth certificate page. Citizens reading this section would see a heading that does not match the
- **Source:** see [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Overseas section heading names the wrong certificate type`

---
### F-215 · Tier B · Heading typo "unknwon" (index.md line 57)

- **Where:** [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) — see headline issue #3 in that report
- **What's wrong:** The heading reads "If basic information is unknwon" — a clear spelling error visible to citizens on the live page. High confidence this should be "unknown".
- **Source:** see [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Heading typo "unknwon" (index.md line 57)`

---
### F-216 · Tier B · "Crisis Hotline on 435-8222" is the BPW Crisis Centre, not a government hotline

- **Where:** [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) — see headline issue #1 in that report
- **What's wrong:** The page presents 435-8222 under "Urgent assistance" as if it were a named government crisis line. In fact this number belongs to the Barbados Professional Women (BPW) Crisis Centre and Shelter — a non-governmental organisation. The label should say "BPW Crisis Centre" so a citizen in crisis knows w
- **Source:** see [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Crisis Hotline on 435-8222" is the BPW Crisis Centre, not a government hotline`

---
### F-217 · Tier B · Two of the three FCU phone numbers cannot be corroborated

- **Where:** [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) — see headline issue #2 in that report
- **What's wrong:** The page lists three FCU numbers: 435-8222, 845-0623, and 836-5070. 435-8222 is the BPW hotline (not the FCU). 845-0623 appears as a BPW WhatsApp/calls number (not FCU). 836-5070 cannot be found in any authoritative source consulted. The official FCU/FCIU number confirmed by the BPW Crisis Centre pa
- **Source:** see [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Two of the three FCU phone numbers cannot be corroborated`

---
### F-218 · Tier B · "Black Rock Police Station Annex" — "Annex" is not corroborated

- **Where:** [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) — see headline issue #3 in that report
- **What's wrong:** Every authoritative source names the location as "Old Black Rock Police Station, Black Rock, St. Michael." No source uses the word "Annex." A citizen searching a map or asking for directions to the "Annex" may not find it.
- **Source:** see [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Black Rock Police Station Annex" — "Annex" is not corroborated`

---
### F-219 · Tier B · "Victim Rights Form 7" has no authoritative source

- **Where:** [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) — see headline issue #4 in that report
- **What's wrong:** The page states the FCU "may also help victims apply for additional trauma-related support through the Victim Rights Form 7." No authoritative Barbados source — not the Domestic Violence (Protection Orders) Act, not the 2016 Amendment, not the Baker McKenzie survey, not gov.bb, not GIS — names a for
- **Source:** see [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Victim Rights Form 7" has no authoritative source`

---
### F-220 · Tier B · No legal reference given

- **Where:** [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) — see headline issue #5 in that report
- **What's wrong:** The page describes protection orders extensively but never names the governing legislation — the Domestic Violence (Protection Orders) Act, CAP. 130A (as amended 2016-2). Citizens and advocates looking to understand their legal rights cannot do so from this page alone.
- **Source:** see [get-support-for-a-victim-of-domestic-abuse](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No legal reference given`

---
### F-221 · Tier B · Entire visitor driving permit section is obsolete

- **Where:** [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) — see headline issue #1 in that report
- **What's wrong:** The Barbados Revenue Authority abolished visitor driving permits effective 15 October 2025. Visitors may now drive in Barbados on a valid home-country licence without any permit or fee. The Car Rental Levy (BBD $5/day, max $35 per rental contract) is collected by rental companies directly — it is no
- **Source:** see [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Entire visitor driving permit section is obsolete`

---
### F-222 · Tier B · A sibling page `visitor-permit-application` on alpha.gov.bb is also obsolete and still live

- **Where:** [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) — see headline issue #2 in that report
- **What's wrong:** The protected page at `https://alpha.gov.bb/visitor-permit-application` still presents the full online application for a Visitor's Driving Permit, including the $10/$100 fee tiers and SurePay payment instructions. Two pages on the same alpha site now contradict the BRA policy. The sibling page is a
- **Source:** see [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `A sibling page `visitor-permit-application` on alpha.gov.bb is also obsolete and still live`

---
### F-223 · Tier B · ZR routes are not "numbered one through eleven."

- **Where:** [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) — see headline issue #3 in that report
- **What's wrong:** The Transport Authority's official route list at ta.gov.bb now shows 42 route-taxi routes (updated from 31 noted in prior pass), including numbered routes up to Route 61 and 16 lettered sub-routes (1A, 1B, 1D, 3C, 3D, 3E, 3L, 3M, 3N, 3O, 3Q, 3R, 3V, 3W, 8B). The "1 through 11" description is an outd
- **Source:** see [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `ZR routes are not "numbered one through eleven."`

---
### F-224 · Tier B · The `source_url` page (`gov.bb/Visit-Barbados/getting-around-barbados`) is live but itself carries t…

- **Where:** [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) — see headline issue #4 in that report
- **What's wrong:** , so it cannot be used to justify retaining the permit section. Both the alpha page and its declared source are simultaneously wrong on the same facts.
- **Source:** see [getting-around-barbados](/docs/fact-check/getting-around-barbados.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The `source_url` page (`gov.bb/Visit-Barbados/getting-around-barbados`) is live but itself carries t…`

---
### F-225 · Tier B · Entire page describes a repealed regulatory regime

- **Where:** [government-requirements](/docs/fact-check/government-requirements.md) — see headline issue #1 in that report
- **What's wrong:** The International Financial Services Act, Cap 325 (IFSA) — the implicit statutory basis for every claim on this page — was repealed effective 1 January 2019. Former IFSC licensees are now "foreign currency earning banks" (FCBs) regulated under Part IIIB of the Financial Institutions (Amendment) Act,
- **Source:** see [government-requirements](/docs/fact-check/government-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Entire page describes a repealed regulatory regime`

---
### F-226 · Tier B · "Annual returns to be filed by January 31" is discrepant

- **Where:** [government-requirements](/docs/fact-check/government-requirements.md) — see headline issue #2 in that report
- **What's wrong:** The previous audit pass marked this as verified at 88%, but CAIPO's official website and the Companies Act, Cap. 308 s.15A show the annual return deadline is **not** January 31. It depends on incorporation date: companies incorporated January–June must file by **June 30**; those incorporated July–De
- **Source:** see [government-requirements](/docs/fact-check/government-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Annual returns to be filed by January 31" is discrepant`

---
### F-227 · Tier B · "Licence renewed annually by January 1" — partially corroborated but under repealed law

- **Where:** [government-requirements](/docs/fact-check/government-requirements.md) — see headline issue #3 in that report
- **What's wrong:** The Central Bank of Barbados confirms the licence fee is "statutorily due on January 1" — this supports the claim's January 1 date. However, the CBB's confirmation uses IFSA-era language. The operative renewal requirement under the current FIA Part IIIB has not been confirmed in a publicly accessibl
- **Source:** see [government-requirements](/docs/fact-check/government-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Licence renewed annually by January 1" — partially corroborated but under repealed law`

---
### F-228 · Tier B · No enabling legislation cited anywhere on the page

- **Where:** [government-requirements](/docs/fact-check/government-requirements.md) — see headline issue #4 in that report
- **What's wrong:** The page never names the governing Act. Given the IFSA's repeal and replacement by the FIA, naming the current legislation is essential for compliance. The omission is now materially misleading.
- **Source:** see [government-requirements](/docs/fact-check/government-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No enabling legislation cited anywhere on the page`

---
### F-229 · Tier B · Capital thresholds: USD denomination unconfirmed under current law

- **Where:** [government-requirements](/docs/fact-check/government-requirements.md) — see headline issue #5 in that report
- **What's wrong:** The US$2,000,000 / US$500,000 figures are consistently cited in pre-2019 sources and CBB transition materials. No publicly accessible text of Part IIIB of the current FIA has been confirmed to retain the USD denomination.
- **Source:** see [government-requirements](/docs/fact-check/government-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Capital thresholds: USD denomination unconfirmed under current law`

---
### F-230 · Tier B · Tax rates table is entirely obsolete (lines 57–65)

- **Where:** [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) — see headline issue #1 in that report
- **What's wrong:** The page states the general corporation tax rate is 25%. Barbados enacted the Income Tax (Amendment and Validation) Act, 2024-15 (gazetted 24 May 2024, effective 1 January 2024), which replaced the 25% flat rate with a tiered structure — for income year 2024, the rates are 5.5% (income ≤ BBD $1M), 3
- **Source:** see [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Tax rates table is entirely obsolete (lines 57–65)`

---
### F-231 · Tier B · Loss carry-forward period is wrong (lines 39–41)

- **Where:** [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) — see headline issue #2 in that report
- **What's wrong:** The page says trading losses can be carried forward for nine years. BRA's own guidance also currently says nine years, but the BRA page appears not to have been updated to reflect the Income Tax (Amendment and Validation) Act, 2024-15 amendments. PwC (cited in previous pass, currently unavailable) c
- **Source:** see [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Loss carry-forward period is wrong (lines 39–41)`

---
### F-232 · Tier B · Group relief exclusions list is outdated (line 53)

- **Where:** [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) — see headline issue #3 in that report
- **What's wrong:** The page lists "international business companies, exempt insurance companies, societies with restricted liability, offshore banks and other companies granted special tax concessions" as excluded from group relief. These regime categories were abolished or frozen for new entrants as of 31 December 20
- **Source:** see [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Group relief exclusions list is outdated (line 53)`

---
### F-233 · Tier B · Declared `source_url` resolves but content is itself outdated

- **Where:** [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) — see headline issue #4 in that report
- **What's wrong:** The `source_url` (`https://www.gov.bb/tax-information`) is live and returns content — but the upstream gov.bb page has identical rate information to alpha.gov.bb (also quoting 25%). Both are sourcing from the same pre-reform text. The authoritative current source for rates is `bra.gov.bb/About/Tax-T
- **Source:** see [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Declared `source_url` resolves but content is itself outdated`

---
### F-234 · Tier B · Ministry name is wrong throughout the page (4 occurrences)

- **Where:** [jobseekers](/docs/fact-check/jobseekers.md) — see headline issue #1 in that report
- **What's wrong:** The page uses "Ministry of Labour and Social Partnership Relations" in every reference. The canonical current name, confirmed on gov.bb/ministries, labour.gov.bb, and in `src/data/ministries.ts` line 783, is "Ministry of Labour, Social Security and Third Sector". The `source_url` page at `gov.bb/Cit
- **Source:** see [jobseekers](/docs/fact-check/jobseekers.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry name is wrong throughout the page (4 occurrences)`

---
### F-235 · Tier B · "National Employment Bureau" no longer exists under that name

- **Where:** [jobseekers](/docs/fact-check/jobseekers.md) — see headline issue #2 in that report
- **What's wrong:** The One Stop Resource Centre page on labour.gov.bb, and the Employment Services overview, both reference BECCS (Barbados Employment and Career Counselling Service) exclusively — "National Employment Bureau" does not appear on either page. Citizens searching for the "National Employment Bureau" may h
- **Source:** see [jobseekers](/docs/fact-check/jobseekers.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"National Employment Bureau" no longer exists under that name`

---
### F-236 · Tier B · "Applying for Jobs Online (Coming Soon)" — likely stale

- **Where:** [jobseekers](/docs/fact-check/jobseekers.md) — see headline issue #3 in that report
- **What's wrong:** The page lists an online job application feature as "Coming Soon" with no link. The Barbados Job Register (`barbadosjobregister.gov.bb`) has existed as a live job portal for some time; however the domain returned HTTP 403 during this check so its current operational status cannot be independently co
- **Source:** see [jobseekers](/docs/fact-check/jobseekers.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Applying for Jobs Online (Coming Soon)" — likely stale`

---
### F-237 · Tier B · "Ministry of the Public Service" omits "and Talent Development"

- **Where:** [jobseekers](/docs/fact-check/jobseekers.md) — see headline issue #4 in that report
- **What's wrong:** The canonical name per gov.bb/ministries is "Ministry of the Public Service and Talent Development". The page drops the full suffix. Lower-priority than the Labour ministry error but still inconsistent with canonical naming.
- **Source:** see [jobseekers](/docs/fact-check/jobseekers.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Ministry of the Public Service" omits "and Talent Development"`

---
### F-238 · Tier B · No Guidance and Counseling or Education and Training links

- **Where:** [jobseekers](/docs/fact-check/jobseekers.md) — see headline issue #5 in that report
- **What's wrong:** Both sections are mentioned by name but provide no hyperlink to the relevant labour.gov.bb pages, leaving citizens with no direct navigation path.
- **Source:** see [jobseekers](/docs/fact-check/jobseekers.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No Guidance and Counseling or Education and Training links`

---
### F-239 · Tier B · Office of the Attorney General email is wrong

- **Where:** [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) — see headline issue #3 in that report
- **What's wrong:** Page lists `agoffice@barbados.gov.bb` (line 61). `oag.gov.bb/contact` publishes `ps.oag@barbados.gov.bb`; `gov.bb/Ministries/attorney-general` publishes `ps@oag.gov.bb`. The page's address is unattested in any authoritative source. **HIGH** impact.
- **Source:** see [justice-of-the-peace](/docs/fact-check/justice-of-the-peace.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Office of the Attorney General email is wrong`

---
### F-240 · Tier B · "Global population indexes" is the wrong term

- **Where:** [local-information](/docs/fact-check/local-information.md) — see headline issue #1 in that report
- **What's wrong:** The page says Barbados is "ranked highly in most global population indexes." "Population indexes" typically measure population size or growth — Barbados ranks approximately 186th–187th in the world by population (a very small country). The intended meaning is almost certainly quality-of-life or inte
- **Source:** see [local-information](/docs/fact-check/local-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Global population indexes" is the wrong term`

---
### F-241 · Tier B · Page body is thin and largely promotional

- **Where:** [local-information](/docs/fact-check/local-information.md) — see headline issue #2 in that report
- **What's wrong:** The two-paragraph body contains only a handful of verifiable factual assertions; the rest is promotional copy. No specific statistics, contacts, or procedural information are provided that could mislead citizens in a transactional way. The main risk is reputational (inaccurate claim about ranking po
- **Source:** see [local-information](/docs/fact-check/local-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Page body is thin and largely promotional`

---
### F-242 · Tier B · No major issues found for citizen-action claims

- **Where:** [local-information](/docs/fact-check/local-information.md) — see headline issue #3 in that report
- **What's wrong:** — this page carries no fees, procedures, contact details, or eligibility rules that could misdirect a citizen trying to use a government service. The sole discrepant claim is a terminology error in descriptive copy.
- **Source:** see [local-information](/docs/fact-check/local-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No major issues found for citizen-action claims`

---
### F-243 · Tier B · Liquor licence application route is wrong

- **Where:** [loud-music-permit](/docs/fact-check/loud-music-permit.md) — see headline issue #1 in that report
- **What's wrong:** The page tells citizens to "apply for a liquor license from the police." Under the Liquor Licence Act, 2021 (in force from April 2022), applications go to the Liquor Licensing Authority at liquorlicence.gov.bb — not through the police. The Commissioner of Police is notified of applications and may a
- **Source:** see [loud-music-permit](/docs/fact-check/loud-music-permit.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Liquor licence application route is wrong`

---
### F-244 · Tier B · Exemptions list is incomplete and uses informal language

- **Where:** [loud-music-permit](/docs/fact-check/loud-music-permit.md) — see headline issue #2 in that report
- **What's wrong:** The BRA lists four statutory exemptions from the promoter's authorisation requirement; the page states only two ("educational institutions" and "religious groups"). Two exemptions are missing: persons who provide entertainment on a daily or weekly basis, and churches registered under the Charities A
- **Source:** see [loud-music-permit](/docs/fact-check/loud-music-permit.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Exemptions list is incomplete and uses informal language`

---
### F-245 · Tier B · The 1,000 / 1,500 attendee thresholds for police and fire presence cannot be confirmed from any publ…

- **Where:** [loud-music-permit](/docs/fact-check/loud-music-permit.md) — see headline issue #3 in that report
- **What's wrong:** The BRA and the Public Entertainments Act require certificates from the Commissioner of Police and Chief Fire Officer for venue licences — but these are "fit and proper person" / "sufficient fire exits" certificates, not attendance-triggered requirements. No public source specifies 1,000 or 1,500 as
- **Source:** see [loud-music-permit](/docs/fact-check/loud-music-permit.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The 1,000 / 1,500 attendee thresholds for police and fire presence cannot be confirmed from any publ…`

---
### F-246 · Tier B · TLS certificate error on `publicentertainment.bra.gov.bb` persists (re-tested 2026-05-29)

- **Where:** [loud-music-permit](/docs/fact-check/loud-music-permit.md) — see headline issue #4 in that report
- **What's wrong:** The portal continues to return an "unable to verify the first certificate" TLS error. Citizens following the annual-permit link will receive a browser security warning and most will abandon. **Citizen impact: HIGH** — the link is effectively inaccessible for ordinary citizens.
- **Source:** see [loud-music-permit](/docs/fact-check/loud-music-permit.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `TLS certificate error on `publicentertainment.bra.gov.bb` persists (re-tested 2026-05-29)`

---
### F-247 · Tier B · "Definition of loud music" has no statutory basis

- **Where:** [loud-music-permit](/docs/fact-check/loud-music-permit.md) — see headline issue #5 in that report
- **What's wrong:** The Environmental Protection Department explicitly states there is no noise legislation in Barbados (re-confirmed 2026-05-29: "There is no noise legislation in Barbados however the Cabinet of Barbados acceded to the Barbados Noise Policy which basically adopted the World Health Organisation Communit
- **Source:** see [loud-music-permit](/docs/fact-check/loud-music-permit.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Definition of loud music" has no statutory basis`

---
### F-248 · Tier B · "Male and female" applicant language is legally out of step

- **Where:** [marriage-licences](/docs/fact-check/marriage-licences.md) — see headline issue #2 in that report
- **What's wrong:** Line 13 states applications must be made by "both (male and female) persons". The Marriage Act CAP 218A uses gender-neutral language ("two persons"), and the Sexual Offences Act sections criminalising same-sex relations were struck down in December 2022. The explicit "male and female" restriction wa
- **Source:** see [marriage-licences](/docs/fact-check/marriage-licences.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Male and female" applicant language is legally out of step`

---
### F-249 · Tier B · Registration Department building name is wrong

- **Where:** [marriage-licences](/docs/fact-check/marriage-licences.md) — see headline issue #3 in that report
- **What's wrong:** Lines 116–122 say "Judicial Centre" as the building name. Authoritative sources — `gov.bb/Departments/registration` and `barbadoslawcourts.gov.bb` — consistently use "Supreme Court Complex, Whitepark Road, St. Michael". Note: the source `gov.bb/Citizens/marriage-licence` also uses "Judicial Centre",
- **Source:** see [marriage-licences](/docs/fact-check/marriage-licences.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Registration Department building name is wrong`

---
### F-250 · Tier B · Registration Department email address has a typo

- **Where:** [marriage-licences](/docs/fact-check/marriage-licences.md) — see headline issue #4 in that report
- **What's wrong:** Line 132 lists `registrar@lawcourt.gov.bb` (singular "lawcourt"). The `gov.bb/Departments/registration` page lists `registrar@lawcourts.gov.bb` (plural "lawcourts"). The `barbadoslawcourts.gov.bb/Certificates` page lists a third variant: `registrarsupremecourt@barbados.gov.bb`. Three official source
- **Source:** see [marriage-licences](/docs/fact-check/marriage-licences.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Registration Department email address has a typo`

---
### F-251 · Tier B · Clinic name is wrong — the authorised facility is now MedPlus Management Services, Inc. at Wildey, n…

- **Where:** [medical-requirements](/docs/fact-check/medical-requirements.md) — see headline issue #1 in that report
- **What's wrong:** The US State Department's BGN Bridgetown supplement (the sole authoritative source for panel physician listings in Barbados) now lists one authorised facility: MedPlus Management Services, Inc., Clapham Court, Wildey Main Road, St. Michael, BB14007. "The Diagnostic Clinic" does not appear anywhere i
- **Source:** see [medical-requirements](/docs/fact-check/medical-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Clinic name is wrong — the authorised facility is now MedPlus Management Services, Inc. at Wildey, n…`

---
### F-252 · Tier B · Citizen impact: HIGH — address and clinic name are both wrong

- **Where:** [medical-requirements](/docs/fact-check/medical-requirements.md) — see headline issue #2 in that report
- **What's wrong:** The page gives "Beckles Road, St Michael" and the name "Diagnostic Clinic". The authorised facility is at Clapham Court, Wildey Main Road. These are different streets and neighbourhoods in St. Michael. A citizen who goes to Beckles Road will not find an authorised panel physician. This is the highes
- **Source:** see [medical-requirements](/docs/fact-check/medical-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Citizen impact: HIGH — address and clinic name are both wrong`

---
### F-253 · Tier B · Critical practical information is missing

- **Where:** [medical-requirements](/docs/fact-check/medical-requirements.md) — see headline issue #3 in that report
- **What's wrong:** The State Department supplement specifies: (a) the facility is walk-in — arrive by 7:00 a.m. Monday–Friday, no appointment needed; (b) exam fees are USD $200 (age 15+) / USD $120 (under 15); (c) results take at least 72 hours, so travel to Barbados must be planned around a minimum 3-day stay; (d) a
- **Source:** see [medical-requirements](/docs/fact-check/medical-requirements.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Critical practical information is missing`

---
### F-254 · Tier B · Open question: current Cabinet Secretary postholder name

- **Where:** [ministries/cabinet-office](/docs/fact-check/ministries/cabinet-office.md) — see headline issue #2 in that report
- **What's wrong:** The page does not name the current Cabinet Secretary (consistent with gov.bb), so no correction is needed. However, no authoritative Tier 1 source from 2025–2026 has been found to confirm who currently holds the post. Noted for any future page enhancement. Mrs. Donna Cadogan was confirmed appointed
- **Source:** see [ministries/cabinet-office](/docs/fact-check/ministries/cabinet-office.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Open question: current Cabinet Secretary postholder name`

---
### F-255 · Tier B · NAHFCP programme name is truncated on the page (still unresolved)

- **Where:** [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) — see headline issue #1 in that report
- **What's wrong:** The source content heading reads "Agricultural Health And Food Control Programme" but the official programme name on agriculture.gov.bb is "National Agricultural Health and Food Control Programme (NAHFCP)". This was flagged on the previous pass (2026-05-28) and has not been corrected. Dropping "Nati
- **Source:** see [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `NAHFCP programme name is truncated on the page (still unresolved)`

---
### F-256 · Tier B · Chief Agricultural Officer incumbent name: agriculture.gov.bb directory still stale

- **Where:** [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) — see headline issue #3 in that report
- **What's wrong:** The Senior Staff Directory (fetched 2026-05-29) continues to list Lennox Chandler as CAO at 535-5118. GIS Facebook posts and Barbados Today (May 2026) identified Paul Lucas as the new CAO. The directory has not been updated. The alpha page does not display the CAO's name (only the phone number), so
- **Source:** see [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Chief Agricultural Officer incumbent name: agriculture.gov.bb directory still stale`

---
### F-257 · Tier B · Associated departments list on alpha page diverges from ministry's own affiliated agencies page

- **Where:** [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) — see headline issue #4 in that report
- **What's wrong:** The live alpha page lists five associated bodies including "Southern Meats Inc." and "Barbados Medicinal Cannabis Licencing Authority". The ministry's own Affiliated Agencies page (fetched 2026-05-29) lists only four bodies: Barbados Agricultural Credit Trust, BADMC, Barbados Agricultural Management
- **Source:** see [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Associated departments list on alpha page diverges from ministry's own affiliated agencies page`

---
### F-258 · Tier B · Minister field is blank in `ministries.ts`

- **Where:** [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) — see headline issue #2 in that report
- **What's wrong:** The data file has an explicit comment: `// Note: Educational Transformation minister not in supplied cabinet brief — left blank.` Chad Blackman is the confirmed Minister of Educational Transformation, reappointed on 16 February 2026 after winning the St James North by-election. Any ministry page tha
- **Source:** see [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister field is blank in `ministries.ts``

---
### F-259 · Tier B · HEDU building name is incomplete

- **Where:** [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) — see headline issue #3 in that report
- **What's wrong:** The source content lists the building only as `"Anselm"` but the authoritative `gov.bb/State-Bodies/higher-education-development-unit` page names it **"Anselm House"**. Confirmed again on 2026-05-29. Citizens trying to locate the unit may be confused by the partial name.
- **Source:** see [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `HEDU building name is incomplete`

---
### F-260 · Tier B · PS direct phone number absent; only Secretary-to-PS line is published

- **Where:** [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) — see headline issue #4 in that report
- **What's wrong:** The page lists `(246) 535-0608` — the Secretary to the Permanent Secretary — but omits the PS's own direct line `(246) 535-0607`, which is published on `gov.bb/Ministries/education`. Citizens looking to reach the PS directly have no path.
- **Source:** see [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `PS direct phone number absent; only Secretary-to-PS line is published`

---
### F-261 · Tier B · HEDU's ministry attribution is uncertain post-February 2025 split

- **Where:** [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) — see headline issue #5 in that report
- **What's wrong:** The Ministry of Education, Technological and Vocational Training was split in February 2025 into the Ministry of Educational Transformation (MEDT) and the Ministry of Training and Tertiary Education (MTTE). HEDU's mandate — strengthening Barbados Community College, SJPI, and Erdiston Teachers' Colle
- **Source:** see [ministries/ministry-of-educational-transformation](/docs/fact-check/ministries/ministry-of-educational-transformation.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `HEDU's ministry attribution is uncertain post-February 2025 split`

---
### F-262 · Tier B · Chief Project Analyst phone number is wrong

- **Where:** [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) — see headline issue #1 in that report
- **What's wrong:** The directory on the page lists `(246) 535-2506` for the Chief Project Analyst role. The energy.gov.bb Our Team page (Tier 1, re-confirmed 2026-05-29) still lists the Chief Project Analyst (Mrs. Claire Corbin) at `+1246 535-2536`. The conflict persists: gov.bb Ministries directory shows 535-2506; en
- **Source:** see [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Chief Project Analyst phone number is wrong`

---
### F-263 · Tier B · Both Facebook URLs on the page point to non-canonical slugs

- **Where:** [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) — see headline issue #2 in that report
- **What's wrong:** The page lists `facebook.com/energydivisionbarbados` and `facebook.com/energydivision-barbados` as two separate Facebook entries. The actual canonical Facebook page for the Energy Division is `facebook.com/EnergyBarbados/` — confirmed by Facebook search results, GIS Barbados's own Facebook posts lin
- **Source:** see [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Both Facebook URLs on the page point to non-canonical slugs`

---
### F-264 · Tier B · `ministries.ts` minister role title omits "Commerce"

- **Where:** [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) — see headline issue #3 in that report
- **What's wrong:** The `ministries.ts` data file (line 294) records the minister's role as "Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector" — this is **correct**. However, the ministry slug name "Ministry of Energy and Business Development" does not include "C
- **Source:** see [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``ministries.ts` minister role title omits "Commerce"`

---
### F-265 · Tier B · Renewable Energy Licence link resolves to a raw PDF with no context

- **Where:** [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) — see headline issue #4 in that report
- **What's wrong:** The inline hyperlink on line 5 (`?wpdmdl=1885&ind=1616784951507`) downloads a PDF directly from energy.gov.bb with no landing page. The PDF was created in Adobe InDesign CS6 in November 2017 and is 430 KB. There is no way to verify from public sources that this is the current, in-force version of th
- **Source:** see [ministries/ministry-of-energy-and-business-development](/docs/fact-check/ministries/ministry-of-energy-and-business-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Renewable Energy Licence link resolves to a raw PDF with no context`

---
### F-266 · Tier B · Ministry name is incomplete — "Fisheries" is missing

- **Where:** [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) — see headline issue #2 in that report
- **What's wrong:** Since the 2022 cabinet appointment (reconfirmed February 2026), the full official name is **"Ministry of the Environment, National Beautification and Fisheries."** The `ozone.gov.bb` ministry site, Parliament, and Barbados Today all use this expanded name. The alpha.gov.bb page and `ministries.ts` n
- **Source:** see [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry name is incomplete — "Fisheries" is missing`

---
### F-267 · Tier B · Permanent Secretary direct line (535-4354) is absent from the directory table

- **Where:** [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) — see headline issue #5 in that report
- **What's wrong:** Gov.bb lists five contact lines for this ministry; the alpha.gov.bb source markdown includes only three, omitting the PS direct number. The main PBX (535-4350) is stored in `ministries.ts` and renders on the live page, but the PS direct line 535-4354 is absent entirely.
- **Source:** see [ministries/ministry-of-environment-and-national-beautification](/docs/fact-check/ministries/ministry-of-environment-and-national-beautification.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Permanent Secretary direct line (535-4354) is absent from the directory table`

---
### F-268 · Tier B · Parliamentary Secretary Senator Jepter Ince is not in the 2026–2031 Senate (Claims 9, 22)

- **Where:** [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) — see headline issue #2 in that report
- **What's wrong:** The page lists "Senator Jepter Ince" as Parliamentary Secretary for Economic Affairs at two locations (lines 80, 142). The Barbados Parliament website confirms Ince is not among the 23 senators for the current 2026–2031 term. The number (535-1304) may still be a live office line, but the name is wro
- **Source:** see [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Parliamentary Secretary Senator Jepter Ince is not in the 2026–2031 Senate (Claims 9, 22)`

---
### F-269 · Tier B · Truncated phone number for Secretary (ag) Heather Alleyne-Prescott (Claim 8)

- **Where:** [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) — see headline issue #5 in that report
- **What's wrong:** The number "535-131" at line 96 is a 6-digit fragment — a valid Barbados extension is 7 digits. The number is undialable. **Tier B — correct the typo.**
- **Source:** see [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Truncated phone number for Secretary (ag) Heather Alleyne-Prescott (Claim 8)`

---
### F-270 · Tier B · New finding: PM Mottley holds "Economic Affairs and Development" in 2026–2031 cabinet (Claim 23)

- **Where:** [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) — see headline issue #6 in that report
- **What's wrong:** The current cabinet (gov.bb/cabinet.php, re-confirmed 2026-05-29) shows PM Mottley as "Minister of Economic Affairs and Development" while Straughn is "Minister of Finance". The content page treats Economic Affairs as Straughn's portfolio. The ministry's institutional name is unchanged, but the poli
- **Source:** see [ministries/ministry-of-finance-economic-affairs-and-investment](/docs/fact-check/ministries/ministry-of-finance-economic-affairs-and-investment.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `New finding: PM Mottley holds "Economic Affairs and Development" in 2026–2031 cabinet (Claim 23)`

---
### F-271 · Tier B · The source markdown's contact tables are entirely blank — no phone numbers are stored in the content…

- **Where:** [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) — see headline issue #1 in that report
- **What's wrong:** The Foreign Affairs contact table lists PBX, PS Secretary, and FAX rows with empty telephone cells (lines 9–14). The Foreign Trade table lists a FAX row with an empty cell (line 19). All actual contact data is carried in `src/data/ministries.ts`. This means the markdown file adds no independently ve
- **Source:** see [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The source markdown's contact tables are entirely blank — no phone numbers are stored in the content…`

---
### F-272 · Tier B · The minister's title ("Senior Minister of Foreign Affairs and Foreign Trade") is correct

- **Where:** [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) — see headline issue #2 in that report
- **What's wrong:** Christopher P. Sinckler was sworn in on 16–18 February 2026. The Barbados Parliament website re-confirmed this status as of 2026-05-29.
- **Source:** see [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The minister's title ("Senior Minister of Foreign Affairs and Foreign Trade") is correct`

---
### F-273 · Tier B · The `shortDescription` and `intro` fields in `ministries.ts` are not derived from the source markdow…

- **Where:** [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) — see headline issue #3 in that report
- **What's wrong:** The `shortDescription` reads "Advances Barbados' interests globally through diplomacy, trade advocacy, and protection of citizens abroad." The `intro` reads "To advance Barbados' interests globally through diplomacy, trade advocacy, and the protection of citizens abroad." These are consistent paraph
- **Source:** see [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The `shortDescription` and `intro` fields in `ministries.ts` are not derived from the source markdow…`

---
### F-274 · Tier B · The `/visa-information` online service link is live and on-topic

- **Where:** [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) — see headline issue #4 in that report
- **What's wrong:** The page at `https://alpha.gov.bb/visa-information` loads correctly and provides Barbados visa requirements, confirming the CTA is valid.
- **Source:** see [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The `/visa-information` online service link is live and on-topic`

---
### F-275 · Tier B · No major issues found

- **Where:** [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) — see headline issue #5 in that report
- **What's wrong:** All contact data (address, phone, fax, email) is verified against gov.bb and foreign.gov.bb. No new discrepancies identified on this pass.
- **Source:** see [ministries/ministry-of-foreign-affairs-and-foreign-trade](/docs/fact-check/ministries/ministry-of-foreign-affairs-and-foreign-trade.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No major issues found`

---
### F-276 · Tier B · Minister of Health and Wellness missing from data file

- **Where:** [ministries/ministry-of-health-and-wellness](/docs/fact-check/ministries/ministry-of-health-and-wellness.md) — see headline issue #1 in that report
- **What's wrong:** `src/data/ministries.ts` lists only Davidson Ishmael with the role "Minister of State, Ministry of Health and Wellness". The full Minister — **Senator the Honourable Lisa R. Cummins** — is entirely absent from the data file. She was sworn in on 16 February 2026 and confirmed still in post as of 2026
- **Source:** see [ministries/ministry-of-health-and-wellness](/docs/fact-check/ministries/ministry-of-health-and-wellness.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister of Health and Wellness missing from data file`

---
### F-277 · Tier B · Senior Health Promotion Officer telephone number discrepancy

- **Where:** [ministries/ministry-of-health-and-wellness](/docs/fact-check/ministries/ministry-of-health-and-wellness.md) — see headline issue #2 in that report
- **What's wrong:** The alpha.gov.bb page (and gov.bb/Ministries/health) lists this number as **(246) 536-3867**. The Ministry's own contact directory at health.gov.bb/Contact lists it as **(246) 536-3868**. Both sources confirmed live as of 2026-05-29. The two most authoritative Tier 1 sources disagree. A citizen dial
- **Source:** see [ministries/ministry-of-health-and-wellness](/docs/fact-check/ministries/ministry-of-health-and-wellness.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Senior Health Promotion Officer telephone number discrepancy`

---
### F-278 · Tier B · Permanent Secretary identity conflict across Tier 1 sources

- **Where:** [ministries/ministry-of-health-and-wellness](/docs/fact-check/ministries/ministry-of-health-and-wellness.md) — see headline issue #3 in that report
- **What's wrong:** health.gov.bb/About/Meet-our-Executive-Team lists **Mr. Wayne Webster** as Permanent Secretary. gov.bb's PS grades page lists **Mr. Wayne Marshall**. This personnel discrepancy is not visible in the alpha.gov.bb content file (which lists the position only, not the person), but is recorded for comple
- **Source:** see [ministries/ministry-of-health-and-wellness](/docs/fact-check/ministries/ministry-of-health-and-wellness.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Permanent Secretary identity conflict across Tier 1 sources`

---
### F-279 · Tier B · Address uses "Webster Business Park" — official spelling may be "Webster's Business Park"

- **Where:** [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) — see headline issue #2 in that report
- **What's wrong:** The source content (line 7) and the gov.bb MHAI page both omit the possessive apostrophe. The OAG — co-located in the same building — uses "Webster's Business Park" on its official contact page. Confidence this is wrong is moderate (70%) because gov.bb itself also uses the non-possessive form, sugge
- **Source:** see [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Address uses "Webster Business Park" — official spelling may be "Webster's Business Park"`

---
### F-280 · Tier B · Meteorological Office ministry attribution is contested

- **Where:** [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) — see headline issue #3 in that report
- **What's wrong:** The ministries.ts data (line 658) lists "The Meteorological Office" under Home Affairs. The gov.bb Departments page attributes it to MIST; the 2025–2026 Barbados Estimates of Expenditure places it under Head 33 — Ministry of Home Affairs and Information; and agriculture.gov.bb hosts "Barbados Meteor
- **Source:** see [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Meteorological Office ministry attribution is contested`

---
### F-281 · Tier B · All 15 online-service CTAs resolve correctly

- **Where:** [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) — see headline issue #4 in that report
- **What's wrong:** This pass live-checked all 15 internal links listed in ministries.ts onlineServices (passport, national registration, register a birth/death/marriage, certificates, marriage licences, notarised, loud music permit, beach park vendor, three post-office-redirection pages). All return HTTP 200 with corr
- **Source:** see [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All 15 online-service CTAs resolve correctly`

---
### F-282 · Tier B · Land Registration Department ministry attribution conflict persists

- **Where:** [ministries/ministry-of-housing-lands-and-maintenance](/docs/fact-check/ministries/ministry-of-housing-lands-and-maintenance.md) — see headline issue #2 in that report
- **What's wrong:** `ministries.ts` and `gov.bb/Ministries/housing` list the Land Registration Department under this ministry's Lands division, but `gov.bb/Departments/land-registry` renders with a MIST (Ministry of Industry, Innovation, Science and Technology) footer. Two Tier-1 gov.bb sources remain in conflict. No r
- **Source:** see [ministries/ministry-of-housing-lands-and-maintenance](/docs/fact-check/ministries/ministry-of-housing-lands-and-maintenance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Land Registration Department ministry attribution conflict persists`

---
### F-283 · Tier B · Minister initials remain contested across sources

- **Where:** [ministries/ministry-of-housing-lands-and-maintenance](/docs/fact-check/ministries/ministry-of-housing-lands-and-maintenance.md) — see headline issue #3 in that report
- **What's wrong:** `ministries.ts` uses "D. L." (matching the Parliament Cabinet Ministers roster and the minister's public Instagram `chrisdlgibbs`). The Parliament member details page uses "G. L." and a February 2026 Barbados Today sworn-in article refers to the minister only by first name without giving initials. T
- **Source:** see [ministries/ministry-of-housing-lands-and-maintenance](/docs/fact-check/ministries/ministry-of-housing-lands-and-maintenance.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister initials remain contested across sources`

---
### F-284 · Tier B · Minister role title has wrong word order (F-096)

- **Where:** [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) — see headline issue #1 in that report
- **What's wrong:** `ministries.ts` line 727 records the minister's role as "Minister of **Innovation**, Industry, Science and Technology." The canonical order — confirmed by gov.bb/Ministries, the GIS official tag, and Barbados Today's budget coverage — is "Minister of **Industry**, Innovation, Science and Technology.
- **Source:** see [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister role title has wrong word order (F-096)`

---
### F-285 · Tier B · Primary phone number is incomplete — only one line of a three-line PBX published (F-097)

- **Where:** [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) — see headline issue #2 in that report
- **What's wrong:** `ministries.ts` lists only `(246) 535-1200`. The gov.bb ministry page publishes the full PBX range as `(246) 535-1200 /1201 /1202`, with `535-1201` as the primary directory number. A citizen calling just 535-1200 may reach a busy line with no indication that 535-1201 or 535-1202 are alternatives.
- **Source:** see [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Primary phone number is incomplete — only one line of a three-line PBX published (F-097)`

---
### F-286 · Tier B · `keywords` array uses "MIIST" (two I's); the official abbreviation is "MIST" (one I)

- **Where:** [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) — see headline issue #3 in that report
- **What's wrong:** `ministries.ts` line 719 includes `"MIIST"` as a keyword/abbreviation. Every authoritative source — gov.bb, GIS, Barbados Today budget coverage — uses the four-letter acronym "MIST." "MIIST" appears to be a typographic error that could cause search mismatches on alpha.gov.bb.
- **Source:** see [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``keywords` array uses "MIIST" (two I's); the official abbreviation is "MIST" (one I)`

---
### F-287 · Tier B · `originalSource` URL slug encodes the old ministry name

- **Where:** [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) — see headline issue #4 in that report
- **What's wrong:** The `originalSource` field (line 756–757) points to `https://www.gov.bb/Ministries/innovation-science-smart-technology`, a slug reflecting the pre-2021 name "Ministry of Innovation, Science and Smart Technology." The URL still resolves correctly; the page title is now correct. This is a stale gov.bb
- **Source:** see [ministries/ministry-of-industry-innovation-science-and-technology](/docs/fact-check/ministries/ministry-of-industry-innovation-science-and-technology.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``originalSource` URL slug encodes the old ministry name`

---
### F-288 · Tier B · All directory telephone fields are blank

- **Where:** [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) — see headline issue #1 in that report
- **What's wrong:** The source file (lines 5–20) renders a directory table with 13 role rows but every telephone column is empty. Citizens get no usable direct-dial numbers for the minister, permanent secretary, or any officer. Authoritative values for all roles — including PS Secretary (535-1412, now confirmed from go
- **Source:** see [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All directory telephone fields are blank`

---
### F-289 · Tier B · "National Insurance Department" is a stale agency name

- **Where:** [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) — see headline issue #2 in that report
- **What's wrong:** `ministries.ts` line 830 lists "National Insurance Department". That body was transformed into the **National Insurance and Social Security Service (NISSS)**, a statutory corporation, on 1 December 2023, confirmed by nis.gov.bb and enabling legislation. Alpha.gov.bb should use "National Insurance an
- **Source:** see [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"National Insurance Department" is a stale agency name`

---
### F-290 · Tier B · Minister role title has an erroneous capital "The"

- **Where:** [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) — see headline issue #3 in that report
- **What's wrong:** `ministries.ts` line 792 records "Minister of Labour, Social Security and **The** Third Sector". All authoritative sources (gov.bb, labour.gov.bb, GIS) use lowercase "the" or omit the article. This is a minor but official-styling error.
- **Source:** see [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister role title has an erroneous capital "The"`

---
### F-291 · Tier B · Reversed finding (PS Secretary extension now verified)

- **Where:** [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) — see headline issue #4 in that report
- **What's wrong:** The 2026-05-28 pass noted PS Secretary as "not published on any consulted source" (open question). On re-check, gov.bb's directory now shows **535-1412** for this role — confirmed. The open question is closed; the number should be entered in the source file.
- **Source:** see [ministries/ministry-of-labour-social-security-and-third-sector](/docs/fact-check/ministries/ministry-of-labour-social-security-and-third-sector.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Reversed finding (PS Secretary extension now verified)`

---
### F-292 · Tier B · Associated departments list names three dissolved agencies

- **Where:** [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) — see headline issue #1 in that report
- **What's wrong:** The `associatedDepartments` array in `ministries.ts` (lines 905–913) still lists "The National Assistance Board", "The Child Care Board", and "Welfare Department" as separate entities. All three were dissolved on 2 January 2026 and merged — along with the National Disabilities Unit and the Resilienc
- **Source:** see [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Associated departments list names three dissolved agencies`

---
### F-293 · Tier B · Community Development Department is listed under the wrong ministry

- **Where:** [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) — see headline issue #2 in that report
- **What's wrong:** The content markdown (lines 23–27) includes a "Community Development Department" directory block. The CDD's own website (comdev.gov.bb) and the Ministry of Youth, Sports and Community Empowerment's website confirm the CDD sits under MYSCE, not MPEEA. It appears in MPEEA's content file and in the `mi
- **Source:** see [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Community Development Department is listed under the wrong ministry`

---
### F-294 · Tier B · Five direct-line extension numbers are published on gov.bb but absent from the alpha.gov.bb data fil…

- **Where:** [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) — see headline issue #4 in that report
- **What's wrong:** The gov.bb source page lists: Minister 535-1604; PS 535-1606; PS Secretary 535-1617; Deputy PS 535-1608; SAO 535-1609; Senior Accountant 535-1613; Executive Officer 535-1605. None of these appear in `ministries.ts` or in the content markdown. The blank directory table adds no value to citizens.
- **Source:** see [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Five direct-line extension numbers are published on gov.bb but absent from the alpha.gov.bb data fil…`

---
### F-295 · Tier B · The Older Persons (Care and Protection) Bill 2026 — Senate debate completed, assent status unconfirm…

- **Where:** [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) — see headline issue #5 in that report
- **What's wrong:** The Bill passed through Senate debate in early May 2026 (senators debated 6–7 May 2026). Assent status as of 2026-05-29 is unconfirmed. Once the Act receives assent, the MPEEA page should reference the new statutory framework for elder protection, and the "Report elderly abuse" service page should b
- **Source:** see [ministries/ministry-of-people-empowerment-and-elder-affairs](/docs/fact-check/ministries/ministry-of-people-empowerment-and-elder-affairs.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The Older Persons (Care and Protection) Bill 2026 — Senate debate completed, assent status unconfirm…`

---
### F-296 · Tier B · Phone numbers missing from the content page — and `ministries.ts` carries a silent data-gap

- **Where:** [ministries/ministry-of-the-public-service-and-talent-development](/docs/fact-check/ministries/ministry-of-the-public-service-and-talent-development.md) — see headline issue #1 in that report
- **What's wrong:** The content markdown lists no phone numbers for any directorate. The `ministries.ts` entry supplies a single telephone `(246) 535-4423` (DG's office) and a fax `(246) 535-6728` (Learning and Development). Gov.bb confirms these two numbers, but the HRPS Directorate phone `(246) 535-4400` and the PRC/
- **Source:** see [ministries/ministry-of-the-public-service-and-talent-development](/docs/fact-check/ministries/ministry-of-the-public-service-and-talent-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Phone numbers missing from the content page — and `ministries.ts` carries a silent data-gap`

---
### F-297 · Tier B · `ministries.ts` fax `(246) 535-6728` is attributed at ministry level but belongs to the Learning and…

- **Where:** [ministries/ministry-of-the-public-service-and-talent-development](/docs/fact-check/ministries/ministry-of-the-public-service-and-talent-development.md) — see headline issue #2 in that report
- **What's wrong:** Gov.bb lists this fax under the Learning and Development Directorate contact block at Warrens Towers II, not as a ministry-wide fax. The current `ministries.ts` entry lists it as a general `{ label: "Fax" }` under the ministry, which implies it is the ministry's central fax — misleading citizens who
- **Source:** see [ministries/ministry-of-the-public-service-and-talent-development](/docs/fact-check/ministries/ministry-of-the-public-service-and-talent-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``ministries.ts` fax `(246) 535-6728` is attributed at ministry level but belongs to the Learning and…`

---
### F-298 · Tier B · No contact phone number appears in the content markdown for any directorate

- **Where:** [ministries/ministry-of-the-public-service-and-talent-development](/docs/fact-check/ministries/ministry-of-the-public-service-and-talent-development.md) — see headline issue #3 in that report
- **What's wrong:** The three directorate contact blocks (lines 35–64) each include only an address — no phone, no email. Gov.bb's authoritative directory entry for this ministry lists distinct phone numbers and emails for every directorate. The absence of this information on alpha.gov.bb is a meaningful omission for a
- **Source:** see [ministries/ministry-of-the-public-service-and-talent-development](/docs/fact-check/ministries/ministry-of-the-public-service-and-talent-development.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No contact phone number appears in the content markdown for any directorate`

---
### F-299 · Tier B · Ministry address in ministries.ts is stale — the ministry has moved to One Barbados Place

- **Where:** [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) — see headline issue #1 in that report
- **What's wrong:** The data file lists two addresses: "Lloyd Erskine Sandiford Center, Two Mile Hill, St. Michael" (Tourism) and "8th Floor Baobab Tower, Warrens, St. Michael" (International Transport). The ministry's own contact page at `tourism.gov.bb/contact` gives a single address: "4th and 5th Floors, One Barbado
- **Source:** see [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry address in ministries.ts is stale — the ministry has moved to One Barbados Place`

---
### F-300 · Tier B · "Barbados Civil Aviation Department (BCAD)" in ministries.ts is an outdated agency name

- **Where:** [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) — see headline issue #2 in that report
- **What's wrong:** The Civil Aviation Department was replaced by the independent Barbados Civil Aviation Authority (BCAA) when Parliament established the BCAA on 25 October 2022 under the Civil Aviation Act 2022-19. The BCAA has its own governing board, its own website (bcaa.gov.bb), and its own address (Charnocks, Ch
- **Source:** see [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Barbados Civil Aviation Department (BCAD)" in ministries.ts is an outdated agency name`

---
### F-301 · Tier B · Minister's post-nominals and name verified — no discrepancy

- **Where:** [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) — see headline issue #3 in that report
- **What's wrong:** The parliament.gov.bb Cabinet Ministers page, the barbadosparliament.com member detail page, and tourism.gov.bb all confirm "The Hon. G. P. Ian Gooding-Edghill, J.P., M.P." — which matches ministries.ts exactly. This was initially listed as a potential discrepancy in the first audit pass but was res
- **Source:** see [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister's post-nominals and name verified — no discrepancy`

---
### F-302 · Tier B · The International Transport PBX number is absent from ministries.ts contact array

- **Where:** [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) — see headline issue #4 in that report
- **What's wrong:** Gov.bb lists separate PBX numbers for Tourism (535-7500) and International Transport (535-3300). ministries.ts only records 535-7500 as the single telephone. Citizens trying to reach the International Transport division by phone cannot do so via the alpha.gov.bb page. Tier B finding. **Confirmed sti
- **Source:** see [ministries/ministry-of-tourism-and-international-transport](/docs/fact-check/ministries/ministry-of-tourism-and-international-transport.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The International Transport PBX number is absent from ministries.ts contact array`

---
### F-303 · Tier B · Minister role title is ambiguous — both titles appear in authoritative sources

- **Where:** [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) — see headline issue #1 in that report
- **What's wrong:** `ministries.ts` gives Husbands the title "Minister of Technological and Vocational Training." The Barbados Parliament Cabinet Ministers list (Tier 1) uses this same title. However, the Parliament member page for Husbands uses "Minister of Training and Tertiary Education," and GIS Facebook posts (202
- **Source:** see [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister role title is ambiguous — both titles appear in authoritative sources`

---
### F-304 · Tier B · Erdiston Teachers' Training College may belong under MEDT, not MTTE

- **Where:** [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) — see headline issue #3 in that report
- **What's wrong:** The May 2026 Barbados Today graduation coverage has Erdiston's Deputy Principal explicitly referencing the "Ministry of Education Transformation" as their ministry partner. The TVET Council's own About page still lists the Permanent Secretary of the legacy "Ministry of Education, Technological and V
- **Source:** see [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Erdiston Teachers' Training College may belong under MEDT, not MTTE`

---
### F-305 · Tier B · No contact details at all for this ministry

- **Where:** [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) — see headline issue #4 in that report
- **What's wrong:** Unlike every other ministerial entry in `ministries.ts`, the MTTE entry contains no address, phone, email, fax, or website. The Barbados Parliament member page for Husbands lists `(246) 535-0611` and Elsie Payne Complex as constituency office contacts — these likely relate to the pre-split legacy mi
- **Source:** see [ministries/ministry-of-training-and-tertiary-education](/docs/fact-check/ministries/ministry-of-training-and-tertiary-education.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No contact details at all for this ministry`

---
### F-306 · Tier B · REVERSED — "Government building" no longer discrepant

- **Where:** [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) — see headline issue #1 in that report
- **What's wrong:** The previous pass (2026-05-28) flagged "Government building" (singular) in the mission statement as discrepant, citing mtw.gov.bb "buildings" (plural) as authoritative. On re-check (2026-05-29), gov.bb — the primary authoritative source — also uses the singular "building". The alpha page therefore m
- **Source:** see [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `REVERSED — "Government building" no longer discrepant`

---
### F-307 · Tier B · Website URL stored as `http://www.mtw.gov.bb`

- **Where:** [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) — see headline issue #2 in that report
- **What's wrong:** The canonical form is `https://mtw.gov.bb/` (HTTPS, no www). The stored value uses an insecure scheme and a non-canonical www prefix. Browsers redirect transparently but the stored value should reflect the canonical form. (Persists from previous pass.)
- **Source:** see [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Website URL stored as `http://www.mtw.gov.bb``

---
### F-308 · Tier B · Temporary address not signposted on live page

- **Where:** [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) — see headline issue #3 in that report
- **What's wrong:** MTW's offices are currently at 2nd Floor, The Goddard Building, Haggatt Hall, St. Michael (confirmed on mtw.gov.bb/directory/). The alpha page shows only the permanent Pine address. Citizens visiting in person will find the ministry closed there.
- **Source:** see [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Temporary address not signposted on live page`

---
### F-309 · Tier B · Transport Authority absent from associatedDepartments

- **Where:** [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) — see headline issue #4 in that report
- **What's wrong:** The ministry's own Objective 7 names "the Barbados Licensing Authority, the Transport Authority and private operators" in the same breath, yet only BLA and Transport Board appear in the data file's Transport category. The Transport Authority (ta.gov.bb) handles PSV permitting and route licensing — a
- **Source:** see [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Transport Authority absent from associatedDepartments`

---
### F-310 · Tier B · Minister role title has minor punctuation difference vs gov.bb cabinet page

- **Where:** [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) — see headline issue #5 in that report
- **What's wrong:** ministries.ts stores "Minister of Transport and Works, and Senior Minister coordinating Infrastructure" (comma before "and"). The gov.bb/cabinet.php page shows "Minister of Transport and Works and Senior Minister coordinating Infrastructure" (no comma). The content is the same; this is a formatting
- **Source:** see [ministries/ministry-of-transport-works-and-water-resources](/docs/fact-check/ministries/ministry-of-transport-works-and-water-resources.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minister role title has minor punctuation difference vs gov.bb cabinet page`

---
### F-311 · Tier B · All four contact tables in the body content have empty phone cells

- **Where:** [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) — see headline issue #1 in that report
- **What's wrong:** The source markdown (`office-of-the-attorney-general.md`) has empty telephone columns across all four sections (OAG main, CPC, SG, DPP). While `ministries.ts` stores the main PBX (246) 535-0467 and fax numbers for sidebar rendering, the direct-dial numbers for individual roles (AG, PS, Deputy PS, Fi
- **Source:** see [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All four contact tables in the body content have empty phone cells`

---
### F-312 · Tier B · DPP address is still incomplete

- **Where:** [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) — see headline issue #2 in that report
- **What's wrong:** The source markdown says "Frank Walcott BLDG / St. Michael". The live page renders "Frank Walcott Building, St. Michael" (the abbreviation is corrected via rendering, but the street address — Culloden Road — and floor (4th Floor) remain absent). The oag.gov.bb DPP page itself now shows the Jones Bui
- **Source:** see [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `DPP address is still incomplete`

---
### F-313 · Tier B · oag.gov.bb still shows the former Attorney General

- **Where:** [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) — see headline issue #3 in that report
- **What's wrong:** oag.gov.bb/About/Meet-the-Attorney-General/ still lists Hon. Dale D. Marshall as Attorney General. The canonical current AG is The Hon. Wilfred A. Abrahams, S.C., M.P. (confirmed by gov.bb/cabinet.php as of Feb 2026 election). This is an oag.gov.bb content problem, not an alpha.gov.bb problem — alph
- **Source:** see [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `oag.gov.bb still shows the former Attorney General`

---
### F-314 · Tier B · OAG website URL in ministries.ts uses HTTP

- **Where:** [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) — see headline issue #4 in that report
- **What's wrong:** `ministries.ts` line 132 stores `http://www.oag.gov.bb/` — HTTP rather than HTTPS. The canonical URL is `https://oag.gov.bb/`. A user clicking this link will be redirected but browsers may warn on HTTP links.
- **Source:** see [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `OAG website URL in ministries.ts uses HTTP`

---
### F-315 · Tier B · Photo requirements are materially incomplete

- **Where:** [national-registration](/docs/fact-check/national-registration.md) — see headline issue #1 in that report
- **What's wrong:** The page lists only two dress-code prohibitions (head coverings and tinted glasses). The EBC's current registration guidance — confirmed on both `ebc.gov.bb/registration-information/` and `trident.gov.bb/registering/` — adds two further restrictions: no sleeveless clothing (shoulders must be covered
- **Source:** see [national-registration](/docs/fact-check/national-registration.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Photo requirements are materially incomplete`

---
### F-316 · Tier B · Governing Act is legally stale

- **Where:** [national-registration](/docs/fact-check/national-registration.md) — see headline issue #2 in that report
- **What's wrong:** The page uses the term "National Registration Number" and implies the old Statistics Act framework. The Barbados Identity Management Act 2021 replaced that Act and is now the controlling statute. The EBC FAQ page states explicitly: "The Trident ID Card complies with the Barbados Identity Management
- **Source:** see [national-registration](/docs/fact-check/national-registration.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Governing Act is legally stale`

---
### F-317 · Tier B · Replacement card fee correct ($60) but context is thin

- **Where:** [national-registration](/docs/fact-check/national-registration.md) — see headline issue #3 in that report
- **What's wrong:** The $60 figure is confirmed. The page omits: (a) first-time registration is free; (b) same-day expedited replacement costs $100; (c) persons 65+ are exempt from the replacement fee; (d) persons with qualifying disabilities and 16-year-olds transitioning to adult cards (when the minor card is surrend
- **Source:** see [national-registration](/docs/fact-check/national-registration.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Replacement card fee correct ($60) but context is thin`

---
### F-318 · Tier B · Fax number is unverified

- **Where:** [national-registration](/docs/fact-check/national-registration.md) — see headline issue #4 in that report
- **What's wrong:** The number (246) 535-4863 does not appear on the EBC's own contact page. The EBC lists only a phone number and email. The fax may have been decommissioned.
- **Source:** see [national-registration](/docs/fact-check/national-registration.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Fax number is unverified`

---
### F-319 · Tier B · Processing time stated in the previous report's additional findings was wrong

- **Where:** [national-registration](/docs/fact-check/national-registration.md) — see headline issue #5 in that report
- **What's wrong:** The prior report noted "within 12 weeks" — the current trident.gov.bb states "within eight weeks after registration." This affected only the additional findings section, not a direct page claim.
- **Source:** see [national-registration](/docs/fact-check/national-registration.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Processing time stated in the previous report's additional findings was wrong`

---
### F-320 · Tier B · Immigration Department address is wrong

- **Where:** [open-pharmacy](/docs/fact-check/open-pharmacy.md) — see headline issue #3 in that report
- **What's wrong:** Lines 53 and 99 still say "Careenage House, The Wharf, Bridgetown". The department fully relocated to BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael — confirmed by `immigration.gov.bb`, `gov.bb`, and GIS press releases. Citizens directed to Careenage House will waste a
- **Source:** see [open-pharmacy](/docs/fact-check/open-pharmacy.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Immigration Department address is wrong`

---
### F-321 · Tier B · "12 government polyclinic locations" is wrong

- **Where:** [open-pharmacy](/docs/fact-check/open-pharmacy.md) — see headline issue #4 in that report
- **What's wrong:** Line 72 says "12 locations". The Ministry of Health's Primary Health Care page states "nine polyclinics and two satellite clinics" (11 total). BDS pharmacy service operates within "nine (9) polyclinics, three (3) out-patient clinics and two (2) of the district hospitals" — still not 12 polyclinics.
- **Source:** see [open-pharmacy](/docs/fact-check/open-pharmacy.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"12 government polyclinic locations" is wrong`

---
### F-322 · Tier B · Dispensing fee described only as "small"

- **Where:** [open-pharmacy](/docs/fact-check/open-pharmacy.md) — see headline issue #5 in that report
- **What's wrong:** The fee was a tiered structure increased effective April 1, 2024, from $5/$7/$12 to $7/$10/$14 per item. The page gives no indication of the actual amounts, which affects citizen budget planning.
- **Source:** see [open-pharmacy](/docs/fact-check/open-pharmacy.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Dispensing fee described only as "small"`

---
### F-323 · Tier B · "BTA" is an obsolete acronym — still on the live page

- **Where:** [ports-of-entry](/docs/fact-check/ports-of-entry.md) — see headline issue #1 in that report
- **What's wrong:** The Barbados Tourism Authority (BTA) was restructured in 2014 into two successor bodies: Barbados Tourism Marketing Inc. (BTMI) and the Barbados Tourism Product Authority (BTPA). The acronym "BTA" no longer refers to any official body. The entertainment at the Bridgetown Cruise Terminal is organised
- **Source:** see [ports-of-entry](/docs/fact-check/ports-of-entry.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"BTA" is an obsolete acronym — still on the live page`

---
### F-324 · Tier B · Port Saint Charles is on the northwest coast, not the western coast

- **Where:** [ports-of-entry](/docs/fact-check/ports-of-entry.md) — see headline issue #2 in that report
- **What's wrong:** The [official Port St. Charles website](https://www.portstcharles.com/) states it is "Located on the beautiful northwest coast of Barbados." The alpha.gov.bb page says "western coast," which is imprecise and inconsistent with the official operator's description.
- **Source:** see [ports-of-entry](/docs/fact-check/ports-of-entry.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Port Saint Charles is on the northwest coast, not the western coast`

---
### F-325 · Tier B · Port Saint Charles offers homes up to six bedrooms, not five

- **Where:** [ports-of-entry](/docs/fact-check/ports-of-entry.md) — see headline issue #3 in that report
- **What's wrong:** The alpha.gov.bb page says "one bedroom to five bedroom homes." The [official portstcharles.com](https://www.portstcharles.com/) lists 1-, 2-, 3-, 4-, and 6-bedroom configurations — no 5-bedroom is listed, and the upper limit is 6, not 5. Multiple independent villa rental aggregators confirm 6-bedro
- **Source:** see [ports-of-entry](/docs/fact-check/ports-of-entry.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Port Saint Charles offers homes up to six bedrooms, not five`

---
### F-326 · Tier B · Agency name "Barbados Post Office" in frontmatter is wrong

- **Where:** [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) — see headline issue #1 in that report
- **What's wrong:** The `description` field in `index.md` (line 3) reads "Tell the Barbados Post Office to redirect your business mail…". The canonical agency name confirmed by the agency's own website (bps.gov.bb) is "Barbados Postal Service". This error propagates into search engine snippets and social previews. Body
- **Source:** see [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Agency name "Barbados Post Office" in frontmatter is wrong`

---
### F-327 · Tier B · start.md contains a copy-paste error from the individual redirection form

- **Where:** [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) — see headline issue #2 in that report
- **What's wrong:** Line 21 of `start.md` reads "name(s) of every other person who also wants to redirect their mail". This is lifted verbatim from the personal/individual redirection form and makes no sense in a business context. A business does not have "other persons who want to redirect their mail". This field is n
- **Source:** see [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `start.md contains a copy-paste error from the individual redirection form`

---
### F-328 · Tier B · Certificate of Incorporation and National ID requirements have no authoritative basis

- **Where:** [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) — see headline issue #4 in that report
- **What's wrong:** The page states (index.md lines 57–59) that the applicant must present a Certificate of Incorporation with official stamp and verify identity with a National ID card at the Post Office. The BPS's own published guidance says only that the company name (in capitals) and company stamp (with signature)
- **Source:** see [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Certificate of Incorporation and National ID requirements have no authoritative basis`

---
### F-329 · Tier B · "Lasting power of attorney" is the wrong document — and the concept does not exist in Barbados law

- **Where:** [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) — see headline issue #1 in that report
- **What's wrong:** `start.md` line 20 tells the citizen they need "proof you have lasting power of attorney." A lasting (enduring) power of attorney terminates at death, so it cannot authorise anyone to act on behalf of a deceased person's estate. Barbados has no statutory framework for lasting or enduring powers of a
- **Source:** see [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Lasting power of attorney" is the wrong document — and the concept does not exist in Barbados law`

---
### F-330 · Tier B · Fee of $13 BBD: verified for domestic redirections, but not specifically for the deceased-estate ser…

- **Where:** [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) — see headline issue #3 in that report
- **What's wrong:** The BPS website confirms BDS$13 for domestic customers. No BPS source publishes a separate (or explicitly identical) fee for the deceased-estate variant. Whether BDS$13 applies here is a reasonable inference but has not been confirmed by any BPS publication.
- **Source:** see [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Fee of $13 BBD: verified for domestic redirections, but not specifically for the deceased-estate ser…`

---
### F-331 · Tier B · Internal inconsistency: "lasting power of attorney" vs. Letters Testamentary

- **Where:** [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) — see headline issue #5 in that report
- **What's wrong:** The contradiction between `start.md` (incorrect) and `index.md` (correct) is the highest-priority fix. A citizen who begins on `start.md` and never reads `index.md` faces a high-impact misdirection.
- **Source:** see [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Internal inconsistency: "lasting power of attorney" vs. Letters Testamentary`

---
### F-332 · Tier B · Age threshold is wrong: "18 years old" should be "16 years old"

- **Where:** [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) — see headline issue #1 in that report
- **What's wrong:** The page (index.md lines 12–13 and 60) states that only adults aged 18 and over may complete a redirection form. The Barbados Postal Service's own change-of-address page explicitly states: *"all persons over the age of sixteen years old, residing in the same household must write their names and sign
- **Source:** see [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Age threshold is wrong: "18 years old" should be "16 years old"`

---
### F-333 · Tier B · Missing fee disclosure

- **Where:** [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) — see headline issue #2 in that report
- **What's wrong:** The BPS charges BDS $13.00 for domestic/individual customers. Neither `index.md` nor `start.md` mentions any fee. Citizens who arrive at the Post Office without payment will be turned away. The sibling business redirection page correctly discloses its $30 BBD fee; the individual page omits the analo
- **Source:** see [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Missing fee disclosure`

---
### F-334 · Tier B · Online form not functional

- **Where:** [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) — see headline issue #3 in that report
- **What's wrong:** The "Complete online form" CTA (index.md line 39) links to `/travel-id-citizenship/post-office-redirection-individual/form`. Fetching that URL on 2026-05-29 shows only "Loading form..." — no actual form renders. Citizens clicking the primary digital CTA will encounter a non-functional page. The star
- **Source:** see [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Online form not functional`

---
### F-335 · Tier B · District C temporary relocation claim is likely outdated or wrong

- **Where:** [register-a-birth](/docs/fact-check/register-a-birth.md) — see headline issue #1 in that report
- **What's wrong:** (line 116) — The alpha page says District C is "currently located at the Registration Department, in the Supreme Court Complex". The Barbados Judicial System website now lists District C at St. Matthias Court Complex with no relocation noted. Citizens who need to register a birth for a St. Philip or
- **Source:** see [register-a-birth](/docs/fact-check/register-a-birth.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `District C temporary relocation claim is likely outdated or wrong`

---
### F-336 · Tier B · Minor parent JP requirement is wrong

- **Where:** [register-a-birth](/docs/fact-check/register-a-birth.md) — see headline issue #2 in that report
- **What's wrong:** (lines 76–77) — The page says a minor without a passport must bring "an identification letter signed by a Justice of the Peace". The official gov.bb register-birth page specifies "a passport size picture certified by a Justice of the Peace". These are different documents; a minor parent could be tur
- **Source:** see [register-a-birth](/docs/fact-check/register-a-birth.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Minor parent JP requirement is wrong`

---
### F-337 · Tier B · Typo "Cane Carden" → "Cane Garden"

- **Where:** [register-a-birth](/docs/fact-check/register-a-birth.md) — see headline issue #3 in that report
- **What's wrong:** (line 120) — The District D Magistrate's Court is in Cane Garden, St. Thomas. "Cane Carden" does not exist as a place name. A citizen searching for directions could be unable to locate the court.
- **Source:** see [register-a-birth](/docs/fact-check/register-a-birth.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Typo "Cane Carden" → "Cane Garden"`

---
### F-338 · Tier B · "Grace period of 1 year" is not corroborated

- **Where:** [register-a-birth](/docs/fact-check/register-a-birth.md) — see headline issue #4 in that report
- **What's wrong:** (line 9) — Official sources do not publish a 1-year threshold. The claim is consistent with the existence of separate forms for late registration within/after one year, but no authoritative source explicitly states a "1-year grace period".
- **Source:** see [register-a-birth](/docs/fact-check/register-a-birth.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Grace period of 1 year" is not corroborated`

---
### F-339 · Tier B · Turnaround time "2 to 3 days" omits same-day option and "working days" qualifier

- **Where:** [register-a-birth](/docs/fact-check/register-a-birth.md) — see headline issue #5 in that report
- **What's wrong:** (line 23) — Official sources indicate same-day processing (before 11:30 am) is available. "2 to 3 days" is pessimistic and ambiguous about calendar vs. working days.
- **Source:** see [register-a-birth](/docs/fact-check/register-a-birth.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Turnaround time "2 to 3 days" omits same-day option and "working days" qualifier`

---
### F-340 · Tier B · Page conflates death registration with death certificate applications — the actual registration proc…

- **Where:** [register-a-death](/docs/fact-check/register-a-death.md) — see headline issue #1 in that report
- **What's wrong:** The page is titled "Register a death" but its content describes how to apply for a death certificate copy, not how to register a death (i.e., give Notice of Death). Under the Vital Statistics Registration Act Cap. 192A, a Notice of Death must be given within five (5) days of death, and the Funeral D
- **Source:** see [register-a-death](/docs/fact-check/register-a-death.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Page conflates death registration with death certificate applications — the actual registration proc…`

---
### F-341 · Tier B · "White Park Road" (two words) is inconsistent with the authoritative one-word spelling "Whitepark Ro…

- **Where:** [register-a-death](/docs/fact-check/register-a-death.md) — see headline issue #2 in that report
- **What's wrong:** The authoritative address used by `barbadoslawcourts.gov.bb` (both the Certificates page and the Registration of Deaths page) and `gov.bb/Departments/registration` is "Whitepark Road" (one word). The companion `get-death-certificate` alpha.gov.bb page also uses "Whitepark Road". The page (and its so
- **Source:** see [register-a-death](/docs/fact-check/register-a-death.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"White Park Road" (two words) is inconsistent with the authoritative one-word spelling "Whitepark Ro…`

---
### F-342 · Tier B · Mail-application money order amount hardcoded at BDS$5.00 — incorrect for Cause of Death certificate…

- **Where:** [register-a-death](/docs/fact-check/register-a-death.md) — see headline issue #3 in that report
- **What's wrong:** The page instructs mail applicants to include "a Money Order in the amount of BDS$5.00". The Cause of Death certificate costs BDS$10.00. The `barbadoslawcourts.gov.bb` Certificates page correctly says "a Money Order for the relevant processing fee" (no fixed amount). A citizen mailing a Cause of Dea
- **Source:** see [register-a-death](/docs/fact-check/register-a-death.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Mail-application money order amount hardcoded at BDS$5.00 — incorrect for Cause of Death certificate…`

---
### F-343 · Tier B · Missing email, overseas phone, and office hours

- **Where:** [register-a-death](/docs/fact-check/register-a-death.md) — see headline issue #4 in that report
- **What's wrong:** The companion `get-death-certificate` page lists `registrarsupremecourt@barbados.gov.bb`, overseas line `+1 (246) 535-9751`, and hours `Monday–Friday, 8:30 am–3:15 pm`. The `barbadoslawcourts.gov.bb` Registration of Deaths page also lists the email and fax `1-246-426-2405`. None of these appear on t
- **Source:** see [register-a-death](/docs/fact-check/register-a-death.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Missing email, overseas phone, and office hours`

---
### F-344 · Tier B · Address in opening paragraph is wrong — still not fixed

- **Where:** [register-a-marriage](/docs/fact-check/register-a-marriage.md) — see headline issue #1 in that report
- **What's wrong:** Line 11 of `src/content/register-a-marriage.md` directs citizens to "the Registration Department, Coleridge Street, Bridgetown." This is confirmed wrong by three independent authoritative sources. The Registration Department is at the Supreme Court Complex, Whitepark Road, St. Michael — not Coleridg
- **Source:** see [register-a-marriage](/docs/fact-check/register-a-marriage.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Address in opening paragraph is wrong — still not fixed`

---
### F-345 · Tier B · Registration deadline is absent from the page

- **Where:** [register-a-marriage](/docs/fact-check/register-a-marriage.md) — see headline issue #2 in that report
- **What's wrong:** The Barbados Judicial System's authoritative page on marriage registration states that a marriage must be registered "within the first ten (10) days of every month." The alpha.gov.bb page gives no deadline. A couple whose marriage has not been registered has no guidance on how to follow up or what t
- **Source:** see [register-a-marriage](/docs/fact-check/register-a-marriage.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Registration deadline is absent from the page`

---
### F-346 · Tier B · Apostille fee is undisclosed

- **Where:** [register-a-marriage](/docs/fact-check/register-a-marriage.md) — see headline issue #3 in that report
- **What's wrong:** The barbadoslawcourts.gov.bb Certificates page confirms a BDS $50 Apostille fee applies when a foreign authority requires one. This is relevant for couples who marry in Barbados and need the certificate recognised overseas. No mention of this fee appears on the page.
- **Source:** see [register-a-marriage](/docs/fact-check/register-a-marriage.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Apostille fee is undisclosed`

---
### F-347 · Tier B · Age eligibility "30 and under" contradicts the YDP's published mandate (still discrepant as of 2026-…

- **Where:** [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) — see headline issue #1 in that report
- **What's wrong:** The official YDP target group is "nine (9) to twenty-nine (29)" per youthaffairs.gov.bb/about-youth-development-programme/ and confirmed independently in the YDP Director's Message. The content page says "aged 30 and under," which is one year higher than the programme's stated upper bound. This was
- **Source:** see [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Age eligibility "30 and under" contradicts the YDP's published mandate (still discrepant as of 2026-…`

---
### F-348 · Tier B · YDP programme listing page still shows no sports content

- **Where:** [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) — see headline issue #2 in that report
- **What's wrong:** The content links citizens to `https://youthaffairs.gov.bb/programme-channels/youth-development-programme/` for a list of current programmes. As of 2026-05-29 that page lists only non-sports workshops (Bridge to the Future, Youth Achieving Results, Web Design, Fatherhood in Motion, Cyber Security, B
- **Source:** see [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `YDP programme listing page still shows no sports content`

---
### F-349 · Tier B · The "Youth Commissioner" and "Principal Youth Development Officer" titles are real but their direct …

- **Where:** [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) — see headline issue #3 in that report
- **What's wrong:** Both roles exist in YDP structure. The page instructs citizens to call (246) 535-3835 and ask to be redirected — acceptable, but no direct extension or email is offered.
- **Source:** see [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The "Youth Commissioner" and "Principal Youth Development Officer" titles are real but their direct …`

---
### F-350 · Tier B · "Registration opens in May 2026" is still unconfirmed and likely wrong

- **Where:** [register-summer-camp](/docs/fact-check/register-summer-camp.md) — see headline issue #1 in that report
- **What's wrong:** As of 2026-05-29, no 2026 summer camp registration announcement exists on youthaffairs.gov.bb, GIS, or Ministry of Youth social media. The most recent cycle (2025) announced registration on 28 June 2025 with a 15 July deadline and camps running 21 July – 22 August. Today is 29 May 2026 and registrat
- **Source:** see [register-summer-camp](/docs/fact-check/register-summer-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Registration opens in May 2026" is still unconfirmed and likely wrong`

---
### F-351 · Tier B · "Volunteer recruitment begins around April" contradicted by 2025 cycle

- **Where:** [register-summer-camp](/docs/fact-check/register-summer-camp.md) — see headline issue #2 in that report
- **What's wrong:** The Division of Youth's own 2025 volunteer recruitment post is dated 28 June 2025 — not April. The youthaffairs.gov.bb homepage currently shows "Calling All Volunteers: Join the National Summer Camp Programme 2025!" as its most recent camp-related news, confirming late June as the pattern. This clai
- **Source:** see [register-summer-camp](/docs/fact-check/register-summer-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Volunteer recruitment begins around April" contradicted by 2025 cycle`

---
### F-352 · Tier B · "Sports" as a specialty camp type is not corroborated

- **Where:** [register-summer-camp](/docs/fact-check/register-summer-camp.md) — see headline issue #3 in that report
- **What's wrong:** The Ministry of Youth lists specialty camps as entrepreneurship (YES Experience Enterprise), digital media/film (Next Steps Training Initiative), cultural arts, and special needs. "Sports" is not enumerated as a distinct specialty camp type; sports activities are embedded in the general multi-activi
- **Source:** see [register-summer-camp](/docs/fact-check/register-summer-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Sports" as a specialty camp type is not corroborated`

---
### F-353 · Tier B · "Research Department" is an unverified organisational name

- **Where:** [register-summer-camp](/docs/fact-check/register-summer-camp.md) — see headline issue #4 in that report
- **What's wrong:** No public source (youthaffairs.gov.bb/about-2/, gov.bb, or mysce.gov.bb) lists a "Research Department" within the Division of Youth Affairs. No such department name appears in any confirmed organogram or staff listing.
- **Source:** see [register-summer-camp](/docs/fact-check/register-summer-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Research Department" is an unverified organisational name`

---
### F-354 · Tier B · Contact details remain absent

- **Where:** [register-summer-camp](/docs/fact-check/register-summer-camp.md) — see headline issue #5 in that report
- **What's wrong:** The Division of Youth Affairs publishes phone `(246) 535-3835`, email `YDP@barbados.gov.bb`, and a physical address (Sky Mall, Haggatt Hall, St. Michael). None appear on the content page. Volunteers can also reach Youth Projects Coordinator David Denny at 535-3852 or mysce.youthprojects@barbados.gov
- **Source:** see [register-summer-camp](/docs/fact-check/register-summer-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Contact details remain absent`

---
### F-355 · Tier B · Link text "CAIPO WEBSITE" is stale — the body rebranded to Business Barbados on 1 February 2025

- **Where:** [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) — see headline issue #1 in that report
- **What's wrong:** CAIPO completed its transition to "Business Barbados" under the Ministry of Energy, Business Development and Consumer Affairs. The `caipo.gov.bb` domain still resolves and now serves the Business Barbados portal, but the link text names the old organisation. Citizen confusion risk is low because the
- **Source:** see [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Link text "CAIPO WEBSITE" is stale — the body rebranded to Business Barbados on 1 February 2025`

---
### F-356 · Tier B · Ministry attribution discrepancy: onlineServices link under MIIST in ministries.ts, but CAIPO is ass…

- **Where:** [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) — see headline issue #2 in that report
- **What's wrong:** In `src/data/ministries.ts`, "Register a business name" is listed as an `onlineServices` entry under `ministry-of-industry-innovation-science-and-technology` (MIIST, lines 733–740). However, the same file's entry for `ministry-of-energy-and-business-development` (lines 341–343) lists "Corporate Affa
- **Source:** see [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry attribution discrepancy: onlineServices link under MIIST in ministries.ts, but CAIPO is ass…`

---
### F-357 · Tier B · The page contains almost no actionable content — the most significant citizen-impact gap

- **Where:** [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) — see headline issue #3 in that report
- **What's wrong:** Apart from a one-sentence description and a link to the Business Barbados website, citizens receive nothing: no fees, no required documents, no eligibility, no governing Act, no timeline, no contact details. The Registration of Business Names Act, Cap. 317 imposes a 14-day registration obligation th
- **Source:** see [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The page contains almost no actionable content — the most significant citizen-impact gap`

---
### F-358 · Tier B · source_url resolves and mirrors the same thin content

- **Where:** [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) — see headline issue #4 in that report
- **What's wrong:** `https://www.gov.bb/Business/registering-business-name` is live. Its footer still attributes the page to MIIST — matching the same stale attribution in ministries.ts — but this is gov.bb's own stale data, not something alpha.gov.bb introduced. No findings from the previous pass (2026-05-28) have be
- **Source:** see [registering-a-business-name](/docs/fact-check/registering-a-business-name.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `source_url resolves and mirrors the same thin content`

---
### F-359 · Tier B · Body copy omits "National ID Card" and "Other" from document-type list (unfixed since 2026-05-28)

- **Where:** [renew-reminder](/docs/fact-check/renew-reminder.md) — see headline issue #1 in that report
- **What's wrong:** The live form offers six options: National ID Card, Driver's Licence, Passport, Vehicle Registration, Permit, and "Other — Anything else with an expiry date." The start-page body text (line 17) names only "driver's licence, vehicle registration, passport, or other government permit." A citizen with
- **Source:** see [renew-reminder](/docs/fact-check/renew-reminder.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Body copy omits "National ID Card" and "Other" from document-type list (unfixed since 2026-05-28)`

---
### F-360 · Tier B · "Other" document type not signalled anywhere on the start page (new finding)

- **Where:** [renew-reminder](/docs/fact-check/renew-reminder.md) — see headline issue #2 in that report
- **What's wrong:** The form's sixth option — "Other — Anything else with an expiry date — you'll be asked to give it a name below" — is entirely absent from the start page. Citizens with non-standard expiring documents (e.g. work permits, food-handler certificates, firearm licences) will not know the service covers th
- **Source:** see [renew-reminder](/docs/fact-check/renew-reminder.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Other" document type not signalled anywhere on the start page (new finding)`

---
### F-361 · Tier B · "Terms & Conditions" URL used as privacy notice link (editorial framing issue)

- **Where:** [renew-reminder](/docs/fact-check/renew-reminder.md) — see headline issue #3 in that report
- **What's wrong:** The page links to `https://alpha.gov.bb/terms-conditions` with link text "privacy notice." The destination page is headed "Terms & Conditions", though it contains a substantive "Your Data" section referencing the Data Protection Act 2019. No factual claim is wrong, but the label mismatch is inconsis
- **Source:** see [renew-reminder](/docs/fact-check/renew-reminder.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Terms & Conditions" URL used as privacy notice link (editorial framing issue)`

---
### F-362 · Tier B · No major structural errors

- **Where:** [renew-reminder](/docs/fact-check/renew-reminder.md) — see headline issue #4 in that report
- **What's wrong:** This is a native alpha.gov.bb utility with no external agency facts (no fees, addresses, phone numbers, or legal references requiring cross-verification). All verifiable claims about data collection and process steps are consistent with the live form and the terms-conditions page.
- **Source:** see [renew-reminder](/docs/fact-check/renew-reminder.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No major structural errors`

---
### F-363 · Tier B · "Child Care Board" is the wrong agency name

- **Where:** [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) — see headline issue #1 in that report
- **What's wrong:** The Social Empowerment Agency (SEA) was proclaimed on 2 January 2026 and now operates child protection services — SEA's "Director of Social Care and Delivery" (not a CCB officer) publicly represents the agency on child protection matters (Barbados Today, April 2026). The page uses "Child Care Board"
- **Source:** see [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Child Care Board" is the wrong agency name`

---
### F-364 · Tier B · The Police address is wrong: "Roebuck Street" should be "Lower Roebuck Street"

- **Where:** [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) — see headline issue #2 in that report
- **What's wrong:** The page lists the Barbados Police Service address as "Roebuck Street, Bridgetown, St. Michael." Every authoritative source — gov.bb, OAG, govserv.org — consistently names the headquarters as the "former Barclays Bank Complex on Lower Roebuck Street." Omitting "Lower" is a navigational error; Roebuc
- **Source:** see [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The Police address is wrong: "Roebuck Street" should be "Lower Roebuck Street"`

---
### F-365 · Tier B · Mandatory reporting is now law — the page does not mention it

- **Where:** [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) — see headline issue #4 in that report
- **What's wrong:** The Child Protection Act (proclaimed 2 January 2026) makes mandatory reporting a legal requirement for professionals and caregivers, with penalties up to $100,000 or 10 years imprisonment for failure to report. The page's framing — "can report" — does not reflect this legal duty. This is a significa
- **Source:** see [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Mandatory reporting is now law — the page does not mention it`

---
### F-366 · Tier B · The abuse definition on the page does not align with standard Barbados child-specific framing

- **Where:** [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) — see headline issue #5 in that report
- **What's wrong:** The definition given closely matches the WHO's elder-abuse / family-violence definition. Including "financial and material abuse" and "serious loss of dignity and respect" are standard elder-abuse categories in Barbados (per the Older Persons framework) but not standard child-protection categories.
- **Source:** see [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The abuse definition on the page does not align with standard Barbados child-specific framing`

---
### F-367 · Tier B · The National Assistance Board was dissolved into the Social Empowerment Agency on 2 January 2026 — b…

- **Where:** [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) — see headline issue #1 in that report
- **What's wrong:** The NAB was merged into the Social Empowerment Agency (SEA) on 2 January 2026. A citizen who calls the NAB office or physically visits the old address expecting the "National Assistance Board" will encounter an organisation that no longer exists under that name. The phone number (246) 535-3131 still
- **Source:** see [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The National Assistance Board was dissolved into the Social Empowerment Agency on 2 January 2026 — b…`

---
### F-368 · Tier B · The page lists no building name for the address, omitting "Murrell House."

- **Where:** [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) — see headline issue #2 in that report
- **What's wrong:** Every authoritative source — gov.bb, connectb1m.com, centenariansofbarbados.com — gives the address as "Murrell House, Country Road, St. Michael." The page omits "Murrell House," making it harder for a citizen to locate the correct office on a map or by asking directions.
- **Source:** see [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The page lists no building name for the address, omitting "Murrell House."`

---
### F-369 · Tier B · The email address `nab.department@barbados.gov.bb` cannot be corroborated from any authoritative sou…

- **Where:** [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) — see headline issue #3 in that report
- **What's wrong:** Neither gov.bb's NAB page, the NAB Facebook page, GIS releases, nor any third-party directory publishes this email address. The gov.bb State-Bodies page for the NAB lists no email. This is a life-safety claim; if the email bounces, a citizen in distress is cut off.
- **Source:** see [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The email address `nab.department@barbados.gov.bb` cannot be corroborated from any authoritative sou…`

---
### F-370 · Tier B · Newer legislation (Older Persons (Care and Protection) Act, 2026) may require content updates

- **Where:** [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) — see headline issue #4 in that report
- **What's wrong:** The Older Persons (Care and Protection) Bill, 2026 was debated in the House of Assembly in April 2026 and won Senate backing in May 2026. Under that Bill the Social Empowerment Agency (SEA) becomes the statutory body for managing elder abuse reports, maintaining a register, and removing older person
- **Source:** see [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Newer legislation (Older Persons (Care and Protection) Act, 2026) may require content updates`

---
### F-371 · Tier B · President's formal title is wrong

- **Where:** [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) — see headline issue #3 in that report
- **What's wrong:** The page identifies the President as "Lieutenant Colonel Jeffrey Bostic". The correct presidential title — used consistently by CBC, GIS, and all official sources since 30 November 2025 — is "Lieutenant Colonel the Most Honourable Jeffrey Bostic." Dropping the honorific is non-standard for a head of
- **Source:** see [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `President's formal title is wrong`

---
### F-372 · Tier B · NCC address contains "Bridgetown" — should be "Waterford"

- **Where:** [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) — see headline issue #1 in that report
- **What's wrong:** The page gives the paper-form return address as "Codrington Road, Bridgetown, Saint Michael". Multiple Tier 1 and Tier 2 sources (gov.bb, GIS directory, BARP directory, mapcarta/OSM) consistently give the address as "Codrington Road, **Waterford**, Saint Michael, BB11042". "Bridgetown" does not appe
- **Source:** see [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `NCC address contains "Bridgetown" — should be "Waterford"`

---
### F-373 · Tier B · Office hours for payment are more restrictive than the page implies

- **Where:** [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) — see headline issue #4 in that report
- **What's wrong:** The NCC renewal notice specifies Accounts Department hours as "8:30 A.M. – 3:00 P.M., Monday–Friday" for payment/collection. The page does not state any hours, leaving citizens to assume the general office opening hours of 8:30 a.m. – 4:30 p.m. A citizen arriving at 3:30 p.m. will be unable to pay f
- **Source:** see [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Office hours for payment are more restrictive than the page implies`

---
### F-374 · Tier B · "Start now" CTA on start.md links to a form component — loads but shows "Loading form…"

- **Where:** [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) — see headline issue #5 in that report
- **What's wrong:** The CTA at `/business-trade/sell-goods-services-beach-park/form` renders the page shell but the form body shows only "Loading form…" at fetch time (likely a dynamic/JS-rendered component). This may be working correctly for end users with JavaScript enabled, but cannot be confirmed as fully functiona
- **Source:** see [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Start now" CTA on start.md links to a form component — loads but shows "Loading form…"`

---
### F-375 · Tier B · "Analytical Services" category label is a stale gov.bb metadata artefact — it is wrong and visible t…

- **Where:** [start-a-business](/docs/fact-check/start-a-business.md) — see headline issue #1 in that report
- **What's wrong:** The source file (`src/content/start-a-business.md` lines 16–18) contains a `### Category` heading with a single bullet `Analytical Services`. The live alpha.gov.bb page renders this as a citizen-facing label (confirmed again 2026-05-29). The Analytical Services department (gov.bb/Departments/analyti
- **Source:** see [start-a-business](/docs/fact-check/start-a-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Analytical Services" category label is a stale gov.bb metadata artefact — it is wrong and visible t…`

---
### F-376 · Tier B · Invest Barbados link destination continues to return HTTP 403 — cannot verify the content citizens a…

- **Where:** [start-a-business](/docs/fact-check/start-a-business.md) — see headline issue #2 in that report
- **What's wrong:** The sole functional link on the page (`https://www.investbarbados.org/starting-a-business-in-barbados/`) returned HTTP 403 Forbidden again on 2026-05-29, consistent with the previous check on 2026-05-28. investbarbados.org also returns 403 at the root. The site is applying anti-bot or geo-restrictio
- **Source:** see [start-a-business](/docs/fact-check/start-a-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Invest Barbados link destination continues to return HTTP 403 — cannot verify the content citizens a…`

---
### F-377 · Tier B · Ministry attribution in `ministries.ts` is uncertain and may be wrong

- **Where:** [start-a-business](/docs/fact-check/start-a-business.md) — see headline issue #3 in that report
- **What's wrong:** The `start-a-business` page is listed under `ministry-of-industry-innovation-science-and-technology` (MIIST) in `src/data/ministries.ts`. Invest Barbados is a statutory corporation (the Barbados International Business Promotion Corporation, BIBPC) whose responsible minister as of the current cabinet
- **Source:** see [start-a-business](/docs/fact-check/start-a-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Ministry attribution in `ministries.ts` is uncertain and may be wrong`

---
### F-378 · Tier B · `source_url` is live but is the origin of the thin content

- **Where:** [start-a-business](/docs/fact-check/start-a-business.md) — see headline issue #5 in that report
- **What's wrong:** `https://www.gov.bb/Business/start-business` resolves and mirrors the same one-sentence description. Fixing this page in isolation from the gov.bb source will produce a divergence; the better fix is to supplement alpha.gov.bb with additional verified content from Invest Barbados and Business Barbado
- **Source:** see [start-a-business](/docs/fact-check/start-a-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``source_url` is live but is the origin of the thin content`

---
### F-379 · Tier B · Page heading and CTA button scope-limit TAMIS to income tax only (line 9 + line 22)

- **Where:** [tax-online](/docs/fact-check/tax-online.md) — see headline issue #1 in that report
- **What's wrong:** The heading reads "File My Income Tax Online" and the call-to-action button says "FILE INCOME TAX". TAMIS handles far more than income tax: the BRA's own launch press release and current bra.gov.bb guidance confirm it also processes Corporate Income Tax, PAYE, VAT, Withholding Tax, Excise Tax, Betti
- **Source:** see [tax-online](/docs/fact-check/tax-online.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Page heading and CTA button scope-limit TAMIS to income tax only (line 9 + line 22)`

---
### F-380 · Tier B · Frontmatter `section` field mismatch (frontmatter line 6)

- **Where:** [tax-online](/docs/fact-check/tax-online.md) — see headline issue #2 in that report
- **What's wrong:** The frontmatter declares `section: "Work and Employment"` but `content-directory.ts` places this page under the "Money and financial support" category (slug `money-financial-support`). If the `section` field drives navigation, breadcrumbs, or search facets it will produce incorrect output. This mirr
- **Source:** see [tax-online](/docs/fact-check/tax-online.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Frontmatter `section` field mismatch (frontmatter line 6)`

---
### F-381 · Tier B · No TAMIS support details anywhere on the page

- **Where:** [tax-online](/docs/fact-check/tax-online.md) — see headline issue #3 in that report
- **What's wrong:** The TAMIS portal publishes a dedicated help desk phone number (535-8239 / 429-3829), email (tamis@bra.gov.bb), and hours (8:30am–4:30pm Mon–Fri, excluding public holidays). None of these appear on the alpha.gov.bb page. A citizen who cannot file — an extremely common scenario — has no guidance on wh
- **Source:** see [tax-online](/docs/fact-check/tax-online.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No TAMIS support details anywhere on the page`

---
### F-382 · Tier B · Wrong ministry name — still live (F-090)

- **Where:** [terms-conditions](/docs/fact-check/terms-conditions.md) — see headline issue #1 in that report
- **What's wrong:** Line 29 says "Ministry of Innovation, Science and Smart Technology." The canonical name on `gov.bb/Ministries` and on the ministry's own page is **"Ministry of Industry, Innovation, Science and Technology (MIST)"**. The word "Industry" is missing and "Smart" is not part of the official name. The liv
- **Source:** see [terms-conditions](/docs/fact-check/terms-conditions.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Wrong ministry name — still live (F-090)`

---
### F-383 · Tier B · alpha.gov.bb is operated by GovTech Barbados Ltd., not directly by the ministry (F-091)

- **Where:** [terms-conditions](/docs/fact-check/terms-conditions.md) — see headline issue #2 in that report
- **What's wrong:** GovTech Barbados Ltd. — incorporated under the Companies Act on 18 September 2023 as a government-owned company — is the entity that built and operates alpha.gov.bb. Saying the site is "run by the Ministry" conflates policy ownership with technical operation and may mislead citizens seeking to exerc
- **Source:** see [terms-conditions](/docs/fact-check/terms-conditions.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `alpha.gov.bb is operated by GovTech Barbados Ltd., not directly by the ministry (F-091)`

---
### F-384 · Tier B · Data Protection Commission contact details are absent

- **Where:** [terms-conditions](/docs/fact-check/terms-conditions.md) — see headline issue #4 in that report
- **What's wrong:** The page tells citizens they can "complain to the Data Protection Commissioner" but gives only the alpha.gov.bb privacy email. The Commission's published contact — Tel: 1 (246) 536-1200 / (246) 536-1212, 5th Floor, SSA Building, Vaucluse, St. Thomas — is not shown, leaving citizens with no fallback
- **Source:** see [terms-conditions](/docs/fact-check/terms-conditions.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Data Protection Commission contact details are absent`

---
### F-385 · Tier B · Address is for a building the Immigration Department vacated c. 2018–2020

- **Where:** [visa-information](/docs/fact-check/visa-information.md) — see headline issue #1 in that report
- **What's wrong:** The page lists "Careenage House, Wharf Road, Bridgetown" as the main Immigration Department office. The department moved to BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael. All current Tier 1 sources (immigration.gov.bb, gov.bb/Departments/immigration) confirm the new a
- **Source:** see [visa-information](/docs/fact-check/visa-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Address is for a building the Immigration Department vacated c. 2018–2020`

---
### F-386 · Tier B · Email address is obsolete (both offices)

- **Where:** [visa-information](/docs/fact-check/visa-information.md) — see headline issue #3 in that report
- **What's wrong:** The page uses `imm-dept@caribsurf.com` for both offices. Caribbean Surf no longer provides email services to Government departments. The current head office email is `Immigration.department@barbados.gov.bb`; GAIA airport is `Immigration.gaia@barbados.gov.bb`. Emails to the caribsurf.com address will
- **Source:** see [visa-information](/docs/fact-check/visa-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Email address is obsolete (both offices)`

---
### F-387 · Tier B · Visa application is now online — the paper-form instruction is obsolete

- **Where:** [visa-information](/docs/fact-check/visa-information.md) — see headline issue #4 in that report
- **What's wrong:** The page tells applicants to complete a paper form "in duplicate." The immigration.gov.bb homepage carries a banner: "The Barbados Entry visa process is now a fully online process. Please click HERE to apply and pay for your entry visa to Barbados." The portal is live at `apps.immigration.gov.bb`. T
- **Source:** see [visa-information](/docs/fact-check/visa-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Visa application is now online — the paper-form instruction is obsolete`

---
### F-388 · Tier B · The entire page describes a service that no longer exists

- **Where:** [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) — see headline issue #1 in that report
- **What's wrong:** The Barbados Revenue Authority abolished Visitor Driving Permits effective 15 October 2025, replacing the system with a Car Rental Levy (BBD $5/day, max $35 per contract) collected automatically by rental companies. Every procedural claim, every fee, every URL on the page applies to a permit that vi
- **Source:** see [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The entire page describes a service that no longer exists`

---
### F-389 · Tier B · The online portal URL has a TLS certificate error

- **Where:** [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) — see headline issue #3 in that report
- **What's wrong:** `https://portal.bra.gov.bb/VisitorPermit` (linked twice on the page) returns a TLS certificate error when fetched — the portal is unreachable. Even if the permit system were still active, citizens clicking this link would see a browser security warning and be unable to proceed.
- **Source:** see [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The online portal URL has a TLS certificate error`

---
### F-390 · Tier B · The declared `source_url` (gov.bb/Visit-Barbados/visitorpermitapplication) still carries the same ab…

- **Where:** [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) — see headline issue #5 in that report
- **What's wrong:** The gov.bb source page has not been updated to reflect the October 2025 abolition. Both the alpha page and its source are simultaneously wrong on the same facts — the source_url cannot be used to justify retaining the obsolete content.
- **Source:** see [visitor-permit-application](/docs/fact-check/visitor-permit-application.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The declared `source_url` (gov.bb/Visit-Barbados/visitorpermitapplication) still carries the same ab…`

---
### F-391 · Tier B · The entire page describes a dissolved agency

- **Where:** [welfare-department](/docs/fact-check/welfare-department.md) — see headline issue #1 in that report
- **What's wrong:** The Welfare Department ceased to exist as a standalone entity on 2 January 2026, when it was merged — along with the Child Care Board, National Assistance Board, National Disabilities Unit, and the Resilience and Reintegration Unit — into the Social Empowerment Agency (SEA). The page title, body hea
- **Source:** see [welfare-department](/docs/fact-check/welfare-department.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The entire page describes a dissolved agency`

---
### F-392 · Tier B · Previous report had the wrong live URL

- **Where:** [welfare-department](/docs/fact-check/welfare-department.md) — see headline issue #2 in that report
- **What's wrong:** The prior fact-check (2026-05-28) recorded the live URL as `https://alpha.gov.bb/government/organisations/welfare`. This is incorrect. The page is served at `https://alpha.gov.bb/welfare-department` (no category prefix, consistent with the `href: "/welfare-department"` in `src/data/ministries.ts`).
- **Source:** see [welfare-department](/docs/fact-check/welfare-department.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Previous report had the wrong live URL`

---
### F-393 · Tier B · SEA website remains unreachable

- **Where:** [welfare-department](/docs/fact-check/welfare-department.md) — see headline issue #4 in that report
- **What's wrong:** `socialempowermentbb.org` returned ECONNREFUSED on both 2026-05-28 and 2026-05-29, making it impossible to verify SEA contact details, confirm whether the email and phone numbers still route correctly, or obtain an SEA contact person. The GovBB team should confirm the correct SEA public contact deta
- **Source:** see [welfare-department](/docs/fact-check/welfare-department.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `SEA website remains unreachable`

---
### F-394 · Tier B · All core content verified — no discrepancies found in this pass

- **Where:** [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) — see headline issue #1 in that report
- **What's wrong:** The three paragraphs of body copy, both inline links (`alpha.gov.bb` and `alpha.gov.bb/feedback`), and the page's live URL all check out. No correction is needed to any citizen-facing claim.
- **Source:** see [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All core content verified — no discrepancies found in this pass`

---
### F-395 · Tier B · Dynamic service list on the live page now shows 33 services

- **Where:** [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) — see headline issue #2 in that report
- **What's wrong:** The rendered page generates a list of 33 alpha services from `content-directory.ts` at build time. This list has grown since the site launched (October 2025). The markdown source itself makes no count claim, so no discrepancy exists — but the dynamic section is outside the scope of this page's markd
- **Source:** see [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Dynamic service list on the live page now shows 33 services`

---
### F-396 · Tier B · Footer Careers link is live but shows no openings

- **Where:** [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) — see headline issue #3 in that report
- **What's wrong:** The footer link `https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us` resolves correctly; the Greenhouse page states "There are no current openings." This is not a content error — it is expected for an organisation that may not be recruiting — but it is noteworthy for completeness.
- **Source:** see [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Footer Careers link is live but shows no openings`

---
### F-397 · Tier B · `publish_date: 2025-09-25` IS rendered citizen-facing (Claim 10 — status revised)

- **Where:** [whats-changing](/docs/fact-check/whats-changing.md) — see headline issue #1 in that report
- **What's wrong:** The previous pass incorrectly recorded this as "internal metadata not displayed to citizens." Live-checking the page on 2026-05-29 shows it renders as "Last Updated: September 25th, 2025" in the page body. The date pre-dates the public launch of alpha.gov.bb (widely reported 18 October 2025), so the
- **Source:** see [whats-changing](/docs/fact-check/whats-changing.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``publish_date: 2025-09-25` IS rendered citizen-facing (Claim 10 — status revised)`

---
### F-398 · Tier B · Homepage copy differs from this page

- **Where:** [whats-changing](/docs/fact-check/whats-changing.md) — see headline issue #2 in that report
- **What's wrong:** The alpha.gov.bb homepage hero reads "How you find and use **government** services is changing", while this page reads "How you find and use **public** services is changing." Neither is factually wrong, but the inconsistency undermines brand coherence.
- **Source:** see [whats-changing](/docs/fact-check/whats-changing.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Homepage copy differs from this page`

---
### F-399 · Tier C · Key procedural claims cannot be verified from authoritative public sources

- **Where:** [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) — see headline issue #2 in that report
- **What's wrong:** The application process described — supervisor completes the form, applicant receives a copy, senior officer reviews eligibility — is plausible but none of these steps appear on childcareboard.gov.bb, gov.bb, or in any GIS press release. The process is unverifiable at 30% certainty and requires CCB/
- **Source:** see [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Key procedural claims cannot be verified from authoritative public sources`

---
### F-400 · Tier C · "Green Book" terminology is unverifiable as an official CCB document name

- **Where:** [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) — see headline issue #3 in that report
- **What's wrong:** No authoritative Barbados government source uses the term "Green Book" for a child health record. The child immunisation/health card issued at polyclinics is confirmed to exist, but its official name and whether it matches the "Green Book" described on the page cannot be established from public sour
- **Source:** see [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Green Book" terminology is unverifiable as an official CCB document name`

---
### F-401 · Tier C · Accessibility section claim (representative at application; guardian at orientation) is unverifiable

- **Where:** [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) — see headline issue #4 in that report
- **What's wrong:** The claim added in lines 69–72 — that a representative may complete the application form on behalf of a parent, but a parent/guardian must attend orientation in person — appears nowhere on childcareboard.gov.bb, gov.bb, or GIS. This is a new unverifiable claim not covered in the prior pass.
- **Source:** see [apply-for-a-place-at-a-day-nursery](/docs/fact-check/apply-for-a-place-at-a-day-nursery.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Accessibility section claim (representative at application; guardian at orientation) is unverifiable`

---
### F-402 · Tier C · Phone number 246-536-0282 is unverifiable

- **Where:** [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) — see headline issue #2 in that report
- **What's wrong:** Neither the Ministry of Transport, Works and Water Resources directory, the BLA FAQ page, nor any published government source lists this number. The MTW main PBX is 536-0000; BLA publishes 536-0265/0267/0278. The number 536-0282 does not appear in any government contact directory searched. Citizens
- **Source:** see [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Phone number 246-536-0282 is unverifiable`

---
### F-403 · Tier C · No conductor licence fee is stated

- **Where:** [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) — see headline issue #4 in that report
- **What's wrong:** Neither the BLA service page for conductor licences nor any public source discloses the application fee. The page does not mention one either, which is a gap citizens need filled. This is flagged as an open question for the GovBB team to confirm with the BLA.
- **Source:** see [apply-for-conductor-licence](/docs/fact-check/apply-for-conductor-licence.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No conductor licence fee is stated`

---
### F-404 · Tier C · Four key claims about the post-interview process are unverifiable

- **Where:** [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) — see headline issue #3 in that report
- **What's wrong:** The safeguarding module, the orientation session, the ministry-led matching, and the networking event introduction are all described on the page but do not appear in any public authoritative source. These are plausible operational details but cannot be independently confirmed from the public web.
- **Source:** see [apply-to-be-a-project-protege-mentor](/docs/fact-check/apply-to-be-a-project-protege-mentor.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Four key claims about the post-interview process are unverifiable`

---
### F-405 · Tier C · Volunteer age eligibility (19+) cannot be corroborated from any public NSC source

- **Where:** [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) — see headline issue #4 in that report
- **What's wrong:** The NSC's own 2026 materials describe the role as "Coach Assistant" with no age floor specified on the public web. The sister programme (Division of Youth Affairs / National Summer Camp) uses 16+. This claim requires agency confirmation. The page may have applied the wrong minimum age.
- **Source:** see [apply-to-volunteer-at-a-sports-camp](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Volunteer age eligibility (19+) cannot be corroborated from any public NSC source`

---
### F-406 · Tier C · Stray code fence at end of source file (new)

- **Where:** [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) — see headline issue #2 in that report
- **What's wrong:** Line 16 of `src/content/business-policies-and-law.md` contains a lone ` ``` ` with no opening counterpart. This is not rendered on the live alpha.gov.bb page (the framework likely strips it), but it is a source-file defect that could cause rendering failures if the markdown parser is changed. Low ci
- **Source:** see [business-policies-and-law](/docs/fact-check/business-policies-and-law.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Stray code fence at end of source file (new)`

---
### F-407 · Tier C · NIS department name uses non-official styling (Claim 6)

- **Where:** [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) — see headline issue #2 in that report
- **What's wrong:** The page names the contact as "NIS Severance Payment Department." The NIS Contact Us page lists the department simply as "Severance" with email `severancedepartment@bginis.gov.bb`. The word "Payment" in the name is not used in any NIS publication. Low citizen impact but worth correcting for consiste
- **Source:** see [calculate-severance-pay](/docs/fact-check/calculate-severance-pay.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `NIS department name uses non-official styling (Claim 6)`

---
### F-408 · Tier C · Timing advice ("June or July") is unverifiable for recurring cycles

- **Where:** [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) — see headline issue #3 in that report
- **What's wrong:** All public sources relate to the 2023-2024 launch only (purchase window July 1–September 30, 2023; application deadline October 16, 2023). No 2024-2025 or 2025-2026 programme cycle has been publicly announced. The June/July advice may reflect 2023-launch messaging rather than a stable annual schedul
- **Source:** see [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Timing advice ("June or July") is unverifiable for recurring cycles`

---
### F-409 · Tier C · "Cannot save and return" claim is unverifiable

- **Where:** [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) — see headline issue #4 in that report
- **What's wrong:** The start page asserts the application cannot be saved mid-way. No official source confirms or denies this as a system property. This is testable only against the live form.
- **Source:** see [get-a-primary-school-textbook-grant](/docs/fact-check/get-a-primary-school-textbook-grant.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Cannot save and return" claim is unverifiable`

---
### F-410 · Tier C · Turnaround time "5 to 7 business days" is unverifiable for birth certificate copies

- **Where:** [get-birth-certificate](/docs/fact-check/get-birth-certificate.md) — see headline issue #2 in that report
- **What's wrong:** No authoritative source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a 5-to-7-business-day turnaround for birth certificate copies. The identical phrasing and same-day emergency clause appear verbatim on the alpha.gov.bb death certificate page, suggesting the birth certificate page may have copied
- **Source:** see [get-birth-certificate](/docs/fact-check/get-birth-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Turnaround time "5 to 7 business days" is unverifiable for birth certificate copies`

---
### F-411 · Tier C · Turnaround "5 to 7 business days" and same-day emergency clause are unverifiable for marriage certif…

- **Where:** [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) — see headline issue #4 in that report
- **What's wrong:** No authoritative Tier 1 or Tier 2 source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a 5-to-7-business-day turnaround for marriage certificate copies. The identical phrasing appears verbatim on the alpha.gov.bb death certificate page, suggesting this block was templated from death-certificate con
- **Source:** see [get-marriage-certificate](/docs/fact-check/get-marriage-certificate.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Turnaround "5 to 7 business days" and same-day emergency clause are unverifiable for marriage certif…`

---
### F-412 · Tier C · Reversed finding (Claim 3):

- **Where:** [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) — see headline issue #5 in that report
- **What's wrong:** The previous pass marked the 10% dividend participation exemption threshold as unverifiable. In this pass, the BRA Residency Status page (`bra.gov.bb/Popular-Topics/Companies/Residency-Status`) was confirmed to mention the provision — "Barbados companies generally avoid corporation tax on dividends
- **Source:** see [information-about-business-tax](/docs/fact-check/information-about-business-tax.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Reversed finding (Claim 3):`

---
### F-413 · Tier C · Registration Department fax number conflict persists

- **Where:** [marriage-licences](/docs/fact-check/marriage-licences.md) — see headline issue #5 in that report
- **What's wrong:** Line 126 lists fax `(246) 426-2405`. The `gov.bb/Departments/registration` page lists `1 (246) 427-8917`. The `barbadoslawcourts.gov.bb/Certificates` page lists `1-246-426-2405`. Two authoritative sources disagree; this requires agency confirmation.
- **Source:** see [marriage-licences](/docs/fact-check/marriage-licences.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Registration Department fax number conflict persists`

---
### F-414 · Tier C · Permanent Secretary is disputed between two government sources (still unresolved)

- **Where:** [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) — see headline issue #2 in that report
- **What's wrong:** agriculture.gov.bb Senior Staff Directory (fetched 2026-05-29) names Janet Phillips as Permanent Secretary at 535-5115. gov.bb/government/ps-related-grades (fetched 2026-05-29) still names Terry Bascombe. These two Tier-1 sources remain in direct conflict. Agency confirmation required before the pag
- **Source:** see [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Permanent Secretary is disputed between two government sources (still unresolved)`

---
### F-415 · Tier C · NAHFCP Project Coordinator telephone uses non-standard prefix (still unverifiable)

- **Where:** [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) — see headline issue #5 in that report
- **What's wrong:** The number (246) 310-2861 listed for the Project Coordinator has not been independently confirmed on any government source. All other ministry extensions use the 535-xxxx prefix. This is an unverified number that citizens may act on.
- **Source:** see [ministries/ministry-of-agriculture-and-food-and-nutritional-security](/docs/fact-check/ministries/ministry-of-agriculture-and-food-and-nutritional-security.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `NAHFCP Project Coordinator telephone uses non-standard prefix (still unverifiable)`

---
### F-416 · Tier C · Intro sentence uses "license" (American spelling) and truncates the ministry name

- **Where:** [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) — see headline issue #1 in that report
- **What's wrong:** Line 1 of the source markdown says "marriage license" and "Ministry of Home Affairs" (without "and Information"). All Barbados official sources use the British spelling "licence" and the full ministry name "Ministry of Home Affairs and Information". This is a Tier-B discrepancy with low citizen impa
- **Source:** see [ministries/ministry-of-home-affairs-and-information](/docs/fact-check/ministries/ministry-of-home-affairs-and-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Intro sentence uses "license" (American spelling) and truncates the ministry name`

---
### F-417 · Tier C · Solicitor General's Chambers fax number conflict between two Tier 1 sources

- **Where:** [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) — see headline issue #5 in that report
- **What's wrong:** gov.bb lists the SG Chambers fax as (246) 535-0561, while oag.gov.bb/Departments/Solicitor-General-s-Chambers/ lists (246) 435-9533. These differ in both area code pattern and number. Needs agency confirmation before either is published.
- **Source:** see [ministries/office-of-the-attorney-general](/docs/fact-check/ministries/office-of-the-attorney-general.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Solicitor General's Chambers fax number conflict between two Tier 1 sources`

---
### F-418 · Tier C · Six-month duration limit is unverifiable from authoritative sources

- **Where:** [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) — see headline issue #3 in that report
- **What's wrong:** Both `index.md` (lines 15 and 67) assert "a redirection notice will last for 6 months". The Barbados Postal Service's own change-of-address page (`bps.gov.bb/change-of-address/`) states the fee and form requirements but does not specify any duration. No BPS or GIS source checked confirms or contradi
- **Source:** see [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Six-month duration limit is unverifiable from authoritative sources`

---
### F-419 · Tier C · Business registration number not confirmed by BPS

- **Where:** [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) — see headline issue #5 in that report
- **What's wrong:** The page lists "the business registration number" as a required form field (index.md line 47). The BPS change-of-address page mentions only the company name and company stamp — no registration number. This is unverifiable from the public web.
- **Source:** see [post-office-redirection-business](/docs/fact-check/post-office-redirection-business.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Business registration number not confirmed by BPS`

---
### F-420 · Tier C · 6-month redirection duration: unverifiable from any public BPS source

- **Where:** [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) — see headline issue #2 in that report
- **What's wrong:** The index page asserts twice that "A redirection notice will last for 6 months." The BPS website (bps.gov.bb/change-of-address/) does not publish a duration for any redirection category. No GIS or gov.bb source independently confirms this figure. The claim may derive from UK Royal Mail policy; agenc
- **Source:** see [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `6-month redirection duration: unverifiable from any public BPS source`

---
### F-421 · Tier C · EZPay+ for payment: unverifiable

- **Where:** [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) — see headline issue #4 in that report
- **What's wrong:** `start.md` states the online form requires an EZPay+ account. The EZPay+ platform is live, but neither the BPS Change of Address page nor the EZPay+ listing page mentions postal redirection as a covered service. The online payment journey cannot be independently confirmed.
- **Source:** see [post-office-redirection-deceased](/docs/fact-check/post-office-redirection-deceased.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `EZPay+ for payment: unverifiable`

---
### F-422 · Tier C · Six-month duration limit is unverifiable

- **Where:** [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) — see headline issue #4 in that report
- **What's wrong:** Both `index.md` (lines 23 and 70) assert the redirection lasts a maximum of 6 months. The BPS change-of-address page does not state any duration period. This claim cannot be confirmed or contradicted from the public web and needs direct BPS confirmation.
- **Source:** see [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Six-month duration limit is unverifiable`

---
### F-423 · Tier C · "Any Post Office" claim is unverifiable

- **Where:** [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) — see headline issue #5 in that report
- **What's wrong:** The BPS change-of-address page references the General Post Office (Cheapside, Bridgetown, Mon–Fri 8:00am–4:00pm) as the service location. Whether all branch offices across the island can accept and process individual redirection applications is not confirmed by BPS-published information.
- **Source:** see [post-office-redirection-individual](/docs/fact-check/post-office-redirection-individual.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"Any Post Office" claim is unverifiable`

---
### F-424 · Tier C · Two different email addresses appear in gov.bb authoritative sources

- **Where:** [register-a-death](/docs/fact-check/register-a-death.md) — see headline issue #5 in that report
- **What's wrong:** `barbadoslawcourts.gov.bb` lists `registrarsupremecourt@barbados.gov.bb`; `gov.bb/Departments/registration` lists `registrar@lawcourts.gov.bb`. The alpha.gov.bb `get-death-certificate` page uses the `@barbados.gov.bb` address. This conflict is an open question requiring agency confirmation; the `@ba
- **Source:** see [register-a-death](/docs/fact-check/register-a-death.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Two different email addresses appear in gov.bb authoritative sources`

---
### F-425 · Tier C · "New programmes begin throughout the year" remains unverifiable

- **Where:** [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) — see headline issue #4 in that report
- **What's wrong:** The YDP's sports rally evidence (10-week training July–September 2022 cycle) suggests a structured annual intake. No public source confirms rolling year-round intake windows.
- **Source:** see [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"New programmes begin throughout the year" remains unverifiable`

---
### F-426 · Tier C · No reversed findings from the 2026-05-28 pass

- **Where:** [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) — see headline issue #5 in that report
- **What's wrong:** All prior discrepancies and unverifiable claims remain unchanged in status.
- **Source:** see [register-for-community-sports-training-programme](/docs/fact-check/register-for-community-sports-training-programme.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No reversed findings from the 2026-05-28 pass`

---
### F-427 · Tier C · Response-time claims ("immediately", "less than 24 hours") are unverifiable

- **Where:** [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) — see headline issue #3 in that report
- **What's wrong:** The page states that for children in serious danger, officers attend "immediately", and for children under 5, they begin investigation "in less than 24 hours." Neither the CCB website, gov.bb, the Child Care Board Act Cap. 381, nor any GIS press release publishes these specific response-time standar
- **Source:** see [report-a-concern-about-a-child](/docs/fact-check/report-a-concern-about-a-child.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Response-time claims ("immediately", "less than 24 hours") are unverifiable`

---
### F-428 · Tier C · The WHO definition of elder abuse is quoted accurately but is an abridged version of the full WHO te…

- **Where:** [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) — see headline issue #5 in that report
- **What's wrong:** The page omits the preceding sentence from the WHO fact sheet and starts mid-definition. This is not strictly wrong — the quoted passage is verbatim — but citizens reading the page in isolation will not see that "A single or repeated act…" is the continuation of a longer definition. Low citizen impa
- **Source:** see [report-elderly-abuse](/docs/fact-check/report-elderly-abuse.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `The WHO definition of elder abuse is quoted accurately but is an abridged version of the full WHO te…`

---
### F-429 · Tier C · "3 months before the birthday" advance-notice requirement is unverifiable

- **Where:** [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) — see headline issue #4 in that report
- **What's wrong:** No Tier-1 or Tier-2 source documents this specific lead time. The Office of the President website returns no procedural content. If the real window differs, citizens could miss the opportunity entirely.
- **Source:** see [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `"3 months before the birthday" advance-notice requirement is unverifiable`

---
### F-430 · Tier C · All document requirements are unverifiable

- **Where:** [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) — see headline issue #5 in that report
- **What's wrong:** The original birth certificate requirement, original marriage certificate requirement (female centenarians only), and the affidavit provision appear on no Government of Barbados public source.
- **Source:** see [request-a-presidential-visit-for-a-centenarian](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `All document requirements are unverifiable`

---
### F-431 · Tier C · Licence fees are unverifiable from the public web

- **Where:** [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) — see headline issue #2 in that report
- **What's wrong:** The page lists four specific fee amounts including VAT ($117.50 regular licence; $176.25 watersports licence; $11.75 licence book; $12.87 ID badge). The NCC's own "Fees & Licenses" page and the renewal notice at nccbarbados.com do not publish specific dollar amounts — the renewal notice directs vend
- **Source:** see [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Licence fees are unverifiable from the public web`

---
### F-432 · Tier C · Referee and testimonial requirements unverifiable

- **Where:** [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) — see headline issue #3 in that report
- **What's wrong:** No NCC public source (nccbarbados.com, gov.bb, GIS) mentions the two-referee / two-testimonial requirement. The NCC's published guidance for new applicants cites only a police certificate of character and information about the proposed beach and business type. The current page's framing — including
- **Source:** see [sell-goods-services-beach-park](/docs/fact-check/sell-goods-services-beach-park.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Referee and testimonial requirements unverifiable`

---
### F-433 · Tier C · Fax numbers unverifiable

- **Where:** [visa-information](/docs/fact-check/visa-information.md) — see headline issue #5 in that report
- **What's wrong:** Both fax numbers listed ((246) 426-0819 for head office, (246) 420-7180 for GAIA) are the Careenage House-era numbers and appear nowhere in current Tier 1 sources. immigration.gov.bb/pages/contactus.aspx lists no fax at all; gov.bb/Departments/immigration lists fax 535-4183 for the department. Wheth
- **Source:** see [visa-information](/docs/fact-check/visa-information.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Fax numbers unverifiable`

---
### F-434 · Tier C · Contact person title is unverifiable post-merger

- **Where:** [welfare-department](/docs/fact-check/welfare-department.md) — see headline issue #3 in that report
- **What's wrong:** Ms. Joan Prescod is confirmed as "Chief Welfare Officer Ag." on gov.bb and connectb1m.com, but those sources predate the 2 January 2026 SEA merger. After the merger, the "Chief Welfare Officer" role title may no longer exist or may have been restructured. No post-merger source confirms Ms. Prescod's
- **Source:** see [welfare-department](/docs/fact-check/welfare-department.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `Contact person title is unverifiable post-merger`

---
### F-435 · Tier C · `publish_date: 2025-11-12` remains unverifiable

- **Where:** [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) — see headline issue #4 in that report
- **What's wrong:** The frontmatter date is internal metadata not displayed to citizens. No public record confirms the specific date. Low priority; no citizen-facing impact. (No major factual errors found in this pass. The page's low claim density — it is a short governance/meta page — means the primary risks are omis
- **Source:** see [what-we-mean-by-alpha](/docs/fact-check/what-we-mean-by-alpha.md) for the full claims list and authoritative source citations
- **Suggested issue title:** ``publish_date: 2025-11-12` remains unverifiable`

---
### F-436 · Tier C · No link to Terms & Conditions or privacy notice from the data-security bullet

- **Where:** [whats-changing](/docs/fact-check/whats-changing.md) — see headline issue #3 in that report
- **What's wrong:** The bullet "feel confident that their data and personal information is secure and only being used when strictly necessary and with their permission" is an unverifiable platform commitment. The Terms & Conditions page at `/terms-conditions` discloses the actual data-handling policy (AWS hosting in th
- **Source:** see [whats-changing](/docs/fact-check/whats-changing.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No link to Terms & Conditions or privacy notice from the data-security bullet`

---
### F-437 · Tier C · No major factual errors

- **Where:** [whats-changing](/docs/fact-check/whats-changing.md) — see headline issue #4 in that report
- **What's wrong:** The five bullet-point commitments are all substantiated by Tier 2–3 sources (GovTech Barbados blog, Barbados Today, CBC, Caribbean News Global). The data-security commitment remains unverifiable as an implemented platform policy. All footer and navigation links resolved on 2026-05-29.
- **Source:** see [whats-changing](/docs/fact-check/whats-changing.md) for the full claims list and authoritative source citations
- **Suggested issue title:** `No major factual errors`

---
