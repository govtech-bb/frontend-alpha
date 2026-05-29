# Fact-check dashboard

Last updated: 2026-05-28

This directory holds structured fact-check reports for every page on
[alpha.gov.bb](https://alpha.gov.bb). Every claim is scored with an
explicit certainty %; everything that can't be verified from the public
web is flagged for the GovBB team to confirm with the responsible
agency.

> **Status — Slice 1.** Phases A, B, C complete (light pass). Phase D
> complete for **all 10 worked-example pages — externally verified** against
> `.gov.bb`, GIS, and Acts of Barbados sources. Remaining ~190 pages
> queued for later slices.

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
| Get a document notarised ★ | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised) | [Report](/docs/fact-check/get-a-document-notarised.md) | 12 | 6 | 3 (incl. 1 broken URL) | 3 | **73%** |
| Apply for a passport | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/apply-for-a-passport) | [Report](/docs/fact-check/apply-for-a-passport.md) | 14 | 11 | 1 (stale date stamp) | 2 | **85%** |
| Register a birth ★ | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/register-a-birth) | [Report](/docs/fact-check/register-a-birth.md) | 15 | 11 | 1 (typo) | 3 | **84%** |
| Loud music permit ★ | [alpha.gov.bb](https://alpha.gov.bb/business-trade/loud-music-permit) | [Report](/docs/fact-check/loud-music-permit.md) | 14 | 5 | 1 (TLS error) | 8 | **72%** |
| Register for a summer camp ★ | [alpha.gov.bb](https://alpha.gov.bb/work-employment/register-summer-camp) | [Report](/docs/fact-check/register-summer-camp.md) | 14 | 8 | 1 (live status) | 5 | **76%** |
| Apply for a driver's licence | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/apply-for-a-drivers-licence) | [Report](/docs/fact-check/apply-for-a-drivers-licence.md) | 15 | 12 | 2 (30-day rule, phone) | 1 | **87%** |
| Justice of the Peace | [alpha.gov.bb](https://alpha.gov.bb/justice-of-the-peace) | [Report](/docs/fact-check/justice-of-the-peace.md) | 28 | 18 | 4 (broken Find-a-JP link, OAG phone ×3 sites, OAG email, phone repeat) | 6 | **82%** |
| Find an open pharmacy | [alpha.gov.bb](https://alpha.gov.bb/health-and-emergency-services/open-pharmacy) | [Report](/docs/fact-check/open-pharmacy.md) | 18 | 13 | 2 (Immigration address, polyclinic count) | 3 | **80%** |
| Apply for financial assistance | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/apply-financial-assistance) | [Report](/docs/fact-check/apply-financial-assistance.md) | 18 | 8 | 2 (phone, Speightstown bldg) | 8 | **74%** |
| Get a copy of a birth certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate) | [Report](/docs/fact-check/get-birth-certificate.md) | 8 | 4 | 0 | 4 | **84%** |
| EZPay | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/ezpay) | [Report](/docs/fact-check/ezpay.md) | 15 | 14 | 1 (intro copy errors) | 0 | **84%** |
| Register a marriage | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/register-a-marriage) | [Report](/docs/fact-check/register-a-marriage.md) | 11 | 8 | 1 (wrong address in opening paragraph) | 2 | **83%** |
| Get a copy of a marriage certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-marriage-certificate) | [Report](/docs/fact-check/get-marriage-certificate.md) | 14 | 7 | 3 (hours, heading copy-paste, typo) | 4 | **75%** |
| Get a copy of a death certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) | [Report](/docs/fact-check/get-death-certificate.md) | 13 | 7 | 2 (hours, cause-of-death field) | 4 | **76%** |
| Marriage licences | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/marriage-licences) | [Report](/docs/fact-check/marriage-licences.md) | 22 | 16 | 3 (bldg name, fax, gender lang) | 3 | **84%** |
| Apply for a position as a temporary teacher | [alpha.gov.bb](https://alpha.gov.bb/work-employment/apply-for-a-position-as-a-temporary-teacher) | [Report](/docs/fact-check/apply-for-a-position-as-a-temporary-teacher.md) | 13 | 8 | 0 | 4 (primary-school scope, CSEC requirements, form nav path, form scope) | **76%** |
| Business policies and law | [alpha.gov.bb](https://alpha.gov.bb/business-trade/business-policies-and-law) | [Report](/docs/fact-check/business-policies-and-law.md) | 6 | 4 | 1 (ministry name truncated) | 1 (page scope / IA) | **82%** |
| Financial services for businesses | [alpha.gov.bb](https://alpha.gov.bb/business-trade/financial-services-for-businesses) | [Report](/docs/fact-check/financial-services-for-businesses.md) | 10 | 7 | 2 (fax labelled as phone, Act spelling) | 1 (http vs https) | **92%** |
| Bank holiday calendar | [alpha.gov.bb](https://alpha.gov.bb/bank-holiday-calendar) | [Report](/docs/fact-check/bank-holiday-calendar.md) | 15 | 11 | 2 (National Heroes count, Whit Monday note) | 2 (substitution rules text, source_url gap) | **84%** |
| Calculate severance pay | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/calculate-severance-pay) | [Report](/docs/fact-check/calculate-severance-pay.md) | 13 | 9 | 2 (gross pay instruction, dept name) | 2 | **82%** |
| Calculate your pension | [alpha.gov.bb](https://alpha.gov.bb/pensions-and-gratuities/calculate-your-pension) | [Report](/docs/fact-check/calculate-your-pension.md) | 9 | 4 | 3 (PAD dissolved, vol. retirement boundary, compulsory table incomplete) | 2 | **77%** |
| Get disaster relief assistance | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/get-disaster-relief-assistance) | [Report](/docs/fact-check/get-disaster-relief-assistance.md) | 14 | 7 | 3 (agency name, address, phone) | 4 | **74%** |
| Get a primary school textbook grant | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/get-a-primary-school-textbook-grant) | [Report](/docs/fact-check/get-a-primary-school-textbook-grant.md) | 15 | 9 | 2 (form-per-child rule, currency code "BDD") | 3 (timing, completion time, 3-month bank rule) | **78%** |
| Get support for a victim of domestic abuse ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/public-safety/get-support-for-a-victim-of-domestic-abuse) | [Report](/docs/fact-check/get-support-for-a-victim-of-domestic-abuse.md) | 17 | 7 | 4 (crisis hotline label, FCU address, 2 of 3 FCU phone numbers) | 6 (2 FCU phone numbers, Victim Rights Form 7, FCU aftercare, FCU relocation/medical, FCU follow-up) | **62%** |
| Getting around Barbados | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/getting-around-barbados) | [Report](/docs/fact-check/getting-around-barbados.md) | 13 | 7 | 3 (permit section obsolete, ZR route count) | 3 (tour flat rate, Car Rental Levy detail, fare exemptions) | **68%** |
| Jobseekers | [alpha.gov.bb](https://alpha.gov.bb/work-employment/jobseekers) | [Report](/docs/fact-check/jobseekers.md) | 11 | 5 | 5 (ministry name ×4, NEB renamed) | 1 (MPS short name) | **86%** |
| Local information | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/local-information) | [Report](/docs/fact-check/local-information.md) | 5 | 3 | 1 ("population indexes" wrong term) | 1 (promotional copy) | **72%** |
| Information about business tax ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/business-trade/information-about-business-tax) | [Report](/docs/fact-check/information-about-business-tax.md) | 22 | 11 | 5 (general rate 25%→9%, insurance rates, loss carry-forward, group relief exclusions) | 6 (dividend threshold, FIFO, initial allowances, investment allowance, manufacturing rate, residential rental rate) | **68%** |
| Medical requirements | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/medical-requirements) | [Report](/docs/fact-check/medical-requirements.md) | 8 | 4 | 2 (clinic name outdated, address incomplete) | 2 (scheduling method, page scope) | **72%** |
| National registration | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/national-registration) | [Report](/docs/fact-check/national-registration.md) | 12 | 4 | 4 (photo reqs incomplete, governing Act stale, doc-list terminology, fax unverified) | 4 (doc list detail, certified-copy process, fax number, legacy programme name) | **71%** |
| Redirect my business mail | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business) | [Report](/docs/fact-check/post-office-redirection-business.md) | 13 | 4 | 3 (agency name, copy-paste field, Certificate of Incorporation unverified) | 6 (duration, NID requirement, biz reg no., any-branch claim, EZPay status, form time) | **62%** |
| Ports of Entry | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/ports-of-entry) | [Report](/docs/fact-check/ports-of-entry.md) | 23 | 19 | 3 (BTA name, west vs northwest coast, 5 vs 6 bedrooms) | 2 (quayside entertainment detail, GAIA terminal services) | **87%** |
| Visa information ★ | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/visa-information) | [Report](/docs/fact-check/visa-information.md) | 8 | 1 | 5 (process now online, address, phones ×2, email ×2) | 2 (old fax numbers) | **52%** |
| Tell the Post Office someone has died | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased) | [Report](/docs/fact-check/post-office-redirection-deceased.md) | 13 | 6 | 2 ("lasting power of attorney" wrong doc, agency name inconsistency) | 5 (duration, fee for deceased category, National ID spec, EZPay+ confirmation, online form) | **69%** |
| Redirect my personal mail | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual) | [Report](/docs/fact-check/post-office-redirection-individual.md) | 14 | 5 | 2 (agency name in frontmatter, age threshold 18→16) | 7 (duration, dependants scope, NID field, end-date field, online form status, any-branch, form time) | **59%** |
| Register for a YDP Community Sports Training programme | [alpha.gov.bb](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme) | [Report](/docs/fact-check/register-for-community-sports-training-programme.md) | 12 | 6 | 2 (age eligibility 30→29, age range in description) | 4 (rolling intake claim, form time, save/resume, form fields) | **72%** |
| Get a reminder before a document expires | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/renew-reminder) | [Report](/docs/fact-check/renew-reminder.md) | 9 | 7 | 1 (National ID Card omitted from body copy) | 1 (completion time) | **92%** |
| Registering a business name | [alpha.gov.bb](https://alpha.gov.bb/business-trade/registering-a-business-name) | [Report](/docs/fact-check/registering-a-business-name.md) | 5 | 2 | 2 (CAIPO → Business Barbados rebrand, ministry attribution) | 1 (source_url thinness) | **70%** |
| Start a business | [alpha.gov.bb](https://alpha.gov.bb/business-trade/start-a-business) | [Report](/docs/fact-check/start-a-business.md) | 5 | 2 | 2 ("Analytical Services" label wrong, ministry attribution uncertain) | 1 (Invest Barbados link 403) | **62%** |
| Report a concern about a child ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/public-safety/report-a-concern-about-a-child) | [Report](/docs/fact-check/report-a-concern-about-a-child.md) | 16 | 9 | 3 (CCB name stale post-SEA merger, police address missing "Lower") | 4 (serious-danger response time, under-5 24hr standard, abuse definition source, info-required list) | **71%** |
| Request a Presidential Visit for a Centenarian | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian) | [Report](/docs/fact-check/request-a-presidential-visit-for-a-centenarian.md) | 9 | 3 | 1 (presidential title missing honorific) | 5 (3-month notice, all doc reqs, letter fields, form time) | **58%** |
| Report elderly abuse ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/public-safety/report-elderly-abuse) | [Report](/docs/fact-check/report-elderly-abuse.md) | 14 | 7 | 3 (NAB dissolved → SEA Jan 2026, address missing building name, agency name in after-report step) | 4 (email unverifiable, welfare officer title post-merger, online channel status, intake question list) | **65%** |
| Sell goods or services at a beach or park | [alpha.gov.bb](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park) | [Report](/docs/fact-check/sell-goods-services-beach-park.md) | 14 | 7 | 1 (NCC address: "Bridgetown" → "Waterford") | 6 (fees, referees, testimonials, photos, site visit, letter of authorisation) | **72%** |
| Tax online | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/tax-online) | [Report](/docs/fact-check/tax-online.md) | 10 | 8 | 1 (heading/CTA scope-limited to income tax) | 1 (section frontmatter mismatch) | **83%** |
| Terms & Conditions | [alpha.gov.bb](https://alpha.gov.bb/terms-conditions) | [Report](/docs/fact-check/terms-conditions.md) | 11 | 6 | 2 (ministry name wrong, operator identity imprecise) | 3 (AWS claim, 72hr deletion, session-storage/cookie, privacy email) | **72%** |
| Visitor permit application ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/visitor-permit-application) | [Report](/docs/fact-check/visitor-permit-application.md) | 12 | 0 | 10 (entire service abolished Oct 2025, all fees/process steps/URLs obsolete) | 2 (email and phone status post-abolition) | **22%** |
| Visa information | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/visa-information) | [Report](/docs/fact-check/visa-information.md) | 8 | 0 | 6 (process now online, address, phones ×2, emails ×2) | 2 (old fax numbers) | **46%** |
| Welfare Department ⚠️ | [alpha.gov.bb](https://alpha.gov.bb/government/organisations/welfare) | [Report](/docs/fact-check/welfare-department.md) | 11 | 6 | 2 (agency dissolved into SEA Jan 2026, contact person title stale) | 3 (post-merger contact person, email inbox status, third phone missing) | **72%** |
| What's changing? | [alpha.gov.bb](https://alpha.gov.bb/whats-changing) | [Report](/docs/fact-check/whats-changing.md) | 10 | 7 | 0 | 3 (data security commitment, publish_date, privacy implementation) | **79%** |

★ = page has `featured: true` in its frontmatter. ⚠️ = HIGH citizen impact (crisis service) — triage immediately.

**Totals across the 49 worked-example pages:** 635 claims · 352 verified · 122 discrepant · 160 unverifiable from public web. Overall verified rate: **55%**. Average page certainty: **76%**.

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

Opinionated read on what's most likely broken, ordered by my confidence that it's wrong AND how much it'll cost a citizen who acts on it.

Each finding below is formatted as a stand-alone issue-ready card. Copy the title + body into `gh issue create` to file. A bulk-create snippet is at the bottom of this section.

> **Tiers:** **A** = almost certainly wrong, fix today (confidence ≥ 90%). **B** = probably wrong, verify before publishing more (60–89%). **C** = unverifiable from public web — needs agency confirmation (< 60%).

---

### F-000 · Tier A · Fix Office of the Attorney General contact info on JP page

- **Where:** `src/content/justice-of-the-peace.md` lines 61, 71, 75
- **Confidence it's wrong:** 95% (re-verified 29 May 2026 against two independent Tier-1 sources)
- **Citizen impact:** **HIGH** — citizens calling the wrong number won't reach the AG.
- **What's wrong:** Page lists phone `(246) 467-7370` and email `agoffice@barbados.gov.bb`. Both [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general) and [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) publish:
  - Phone: `(246) 535-0467` (PBX); `(246) 535-0434` (AG direct); `(246) 535-0437` (Permanent Secretary)
  - Email: `ps.oag@barbados.gov.bb` (oag.gov.bb) / `ps@oag.gov.bb` (gov.bb)
  - Address: Jones Building, Webster's Business Park, Wildey, St. Michael
- **Fix:** replace both the phone and email at all three occurrences (lines 61, 71, 75); for the "check whether someone is a JP" use case at line 75, consider the Permanent Secretary direct line `(246) 535-0437`.
- **Suggested issue title:** `Fix Office of the Attorney General contact details on Justice of the Peace page`

---

### F-00A · Tier A · Update Immigration Department address (moved from Careenage House)

- **Where:** `src/content/open-pharmacy.md` lines 53, 99 (and likely other pages — sweep needed)
- **Confidence it's wrong:** 90%
- **Citizen impact:** **HIGH** — citizens go to the wrong building.
- **What's wrong:** Page says Immigration is at "Careenage House, The Wharf, Bridgetown". Department has relocated (per [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/)).
- **Fix:** update to "BTI Corporate Centre, Princess Alice Highway, Bridgetown, BB11093, St. Michael". Then search the rest of `src/content/` for any other "Careenage House" mention.
- **Suggested issue title:** `Update Immigration Department address (moved from Careenage House to BTI Corporate Centre)`

---

### F-00B · Tier A · Fix "12 polyclinic locations" — actual is 9 polyclinics + 2 satellites

- **Where:** `src/content/open-pharmacy.md` line 72
- **Confidence it's wrong:** 85%
- **Citizen impact:** Low (descriptive copy), but a credibility signal.
- **What's wrong:** Page says "12 locations across the island". Ministry of Health publishes 9 polyclinics + 2 satellite clinics = 11.
- **Fix:** change to "9 polyclinics plus 2 satellite clinics across the island". Verify via [Ministry of Health — Primary Health Care](https://www.health.gov.bb/For-Public/Primary-Health-Care).
- **Suggested issue title:** `Fix polyclinic count on Find an open pharmacy page (12 → 9 polyclinics + 2 satellites)`

---

### F-097 · Tier A · Fix broken "Find a JP" link on Justice of the Peace page

- **Where:** `src/content/justice-of-the-peace.md` line 53
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — "Find a JP" is the primary CTA on the page. Clicking it lands citizens on a 404, breaking the page's main task.
- **What's wrong:** The link `href="/travel-id-citizenship/justice-of-the-peace/find"` returns HTTP 404 on the live site. The JP page itself loads at `/justice-of-the-peace` (no category prefix) because it is `protected: true` in `src/data/content-directory.ts`. The find subpage at either candidate path (`/justice-of-the-peace/find` or the prefixed path) currently 404s to anonymous fetch.
- **Fix:** Update the link to whichever path serves the find component once it is reachable. Confirm by deploying and clicking the link as an anonymous citizen — and verify protected-page routing doesn't lock out the find subpage.
- **Source:** Live check 29 May 2026 — both candidate URLs return HTTP 404; see also [/docs/fact-check/justice-of-the-peace.md](/docs/fact-check/justice-of-the-peace.md) Claim 17.
- **Suggested issue title:** `Fix broken "Find a JP" link on Justice of the Peace page`

---

### F-00D · Tier A · Fix Barbados Licensing Authority phone

- **Where:** `src/content/apply-for-a-drivers-licence.md` line 67
- **Confidence it's wrong:** 80%
- **Citizen impact:** Medium — citizens may dial a wrong number.
- **What's wrong:** Page lists `1-246-536-0264 / 1-246-536-0265`. BLA publishes `+1 (246) 536-0265 / 0267 / 0278`. `0264` is not on the BLA's list; `0267` and `0278` are missing from the page.
- **Fix:** update to `(246) 536-0265 / 0267 / 0278` per the BLA website.
- **Source:** [bla.gov.bb](https://bla.gov.bb)
- **Suggested issue title:** `Fix BLA phone numbers on Apply for driver's licence page`

---

### F-00E · Tier A · Fix Welfare Department phone format

- **Where:** `src/content/apply-financial-assistance.md` line 103
- **Confidence it's wrong:** 75%
- **Citizen impact:** Medium — citizens can't parse what to dial.
- **What's wrong:** Page lists `+1 246-535-1000/16/23`. The Welfare Department publishes `1 (246) 535-1000` and `1 (246) 535-1023`. The `/16/` extension is not on the official list.
- **Fix:** rewrite as `(246) 535-1000` and `(246) 535-1023`. If `1016` is a real extension, list it as such.
- **Source:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare)
- **Suggested issue title:** `Fix Welfare Department phone format on Apply for financial assistance page`

---

### F-00F · Tier B · Fix Driving Test eligibility: "30 days" should be "3 months"

- **Where:** `src/content/apply-for-a-drivers-licence.md` line 35
- **Confidence it's wrong:** 80%
- **Citizen impact:** **HIGH** — a citizen applying at day 31 will be told to wait.
- **What's wrong:** Page says "must apply after 30 days and within 180 days of issue of the Learner's Permit". The BLA states first-time permit holders must "**practice for a minimum three (3) months** before applying for the driving examination".
- **Fix:** change "30 days" to "3 months (90 days)". Verify the 180-day upper bound with BLA.
- **Source:** [BLA — Learner Permit](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=)
- **Suggested issue title:** `Fix driving-test eligibility timeline (30 days → 3 months) on Apply for driver's licence page`

---

### F-001 · Tier A · Fix CAIPO/Intellectual Property Office address

- **Where:** `src/content/get-a-document-notarised.md` lines 31–35
- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised>
- **Confidence it's wrong:** 90%
- **Citizen impact:** **High** — a citizen could turn up to the wrong place.
- **What's wrong:** Page says "Baobab Tower / Highway 2 / Saint Michael". Building name is singular; location is "Highway 2".
- **Fix:** change to "Ground Floor / Baobab Towers / Warrens / St. Michael". Building is **Towers** plural; address is **Warrens**, not Highway 2.
- **Sources:** [CAIPO](https://caipo.gov.bb/) · [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property)
- **Suggested issue title:** `Fix CAIPO address on Get a document notarised page (Baobab Tower → Baobab Towers, Warrens)`

---

### F-002 · Tier A · Replace broken `source_url` for the notarisation page

- **Where:** `src/data/content-directory.ts` line 431
- **Confidence it's wrong:** 100% (directly verified — HTTP 404)
- **Citizen impact:** Low (it's a metadata field), but indicates the underlying source has moved.
- **What's wrong:** `source_url` is set to `https://www.gov.bb/Citizens/notarize-document`, which returns 404. Other `gov.bb/Citizens/*` URLs are live, so this one's been renamed or removed.
- **Fix:** point to [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates).
- **Suggested issue title:** `Replace broken source_url for Get a document notarised`

---

### F-003 · Tier A · Fix typo "Cane Carden" → "Cane Garden"

- **Where:** `src/content/register-a-birth/index.md` line 120
- **Confidence it's wrong:** 95% (no place called "Cane Carden" in St. Thomas exists; "Cane Garden" does)
- **Citizen impact:** Medium — citizens searching for the district court won't find it on a map.
- **What's wrong:** "District D Magistrate's Court, **Cane Carden** St. Thomas"
- **Fix:** change to "Cane Garden, St. Thomas"
- **Suggested issue title:** `Typo: "Cane Carden" → "Cane Garden" on Register a birth page`

---

### F-004 · Tier A · Fix typo "assitance" → "assistance"

- **Where:** `src/content/apply-financial-assistance.md` line 33
- **Confidence it's wrong:** 100%
- **Citizen impact:** Low (trust signal), but visible heading on a welfare page.
- **What's wrong:** Heading reads "How to apply for financial **assitance**".
- **Fix:** "How to apply for financial assistance".
- **Suggested issue title:** `Typo: "assitance" → "assistance" on Apply for financial assistance page`

---

### F-005 · Tier A · Remove stray ` ``` ` markdown blocks (2 pages)

- **Where:** `src/content/apply-for-a-passport.md` line 59 AND `src/content/apply-for-a-drivers-licence.md` line 68
- **Confidence it's wrong:** 100%
- **Citizen impact:** Medium — renders an unclosed code block, breaking page layout below it.
- **What's wrong:** Stray triple-backtick at the end of the file with no opening fence above. Markdown renders everything after it as a code block.
- **Fix:** delete the trailing ` ``` ` line on both files.
- **Suggested issue title:** `Remove stray ``` markdown on Apply for passport and Apply for driver's licence pages`

---

### F-006 · Tier A · Update ministry names to canonical forms

- **Where:** 4 content files + 1 ministry page
- **Confidence it's wrong:** 95% (canonical names verified in `src/data/ministries.ts`)
- **Citizen impact:** Medium — outdated ministry names undermine trust and search.
- **What's wrong (5 sub-fixes):**
  - `src/content/jobseekers.md` lines 3, 11, 19, 30: "Ministry of Labour and Social Partnership Relations" → **"Ministry of Labour, Social Security and Third Sector"**
  - `src/content/business-policies-and-law.md` lines 3, 11, 13: bare "Ministry of Labour" → **"Ministry of Labour, Social Security and Third Sector"**
  - `src/content/apply-for-conductor-licence/index.md` lines 22, 27: "Ministry of Transport and Works" → **"Ministry of Transport, Works and Water Resources"**
  - `src/content/apply-to-the-barbados-youthadvance-corps.md` lines 28, 82: "Ministry of Youth and Community Empowerment" → **"Ministry of Youth, Sports and Community Empowerment"**
  - `src/content/ministries/ministry-of-environment-and-national-beautification.md` line 1: "Natural Beautification" → **"National Beautification"**
- **Sources:** `src/data/ministries.ts` (canonical list)
- **Suggested issue title:** `Update ministry names to canonical forms (5 places across 5 files)`

---

### F-007 · Tier B · "Documents that can be notarised" list looks UK-template-derived

- **Where:** `src/content/get-a-document-notarised.md` lines 64–71
- **Confidence it's wrong:** 65%
- **Citizen impact:** Medium — citizens may bring wrong documents or assume notarisation does something it doesn't.
- **What's wrong:** The list (passports, photocard driving licences, letters from a Ministry, bank statements, gas or electricity bills, letters from a hospital or doctor) is the canonical UK Home Office proof-of-address checklist. Barbadian notarisation is dominated by overseas-use authentication (per [GIS](https://gisbarbados.gov.bb/blog/notarisation-of-documents-affixing-of-apostilles/)), not address verification.
- **Fix:** confirm with the Registrar's office what documents are actually presented for notarisation; replace this list with the Barbados-specific one.
- **Suggested issue title:** `Verify "Documents that can be notarised" list matches Barbados practice`

---

### F-008 · Tier B · "Execution of a document $20" notary fee has no authoritative source

- **Where:** `src/content/get-a-document-notarised.md` line 83
- **Confidence it's wrong:** 60%
- **Citizen impact:** Medium — wrong fee leads to either underpayment (rejected) or overpayment.
- **What's wrong:** Neither the [GIS fee update](https://gisbarbados.gov.bb/blog/change-in-notary-fees/), the [Barbados Judicial System notarisation page](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates), nor the [Notaries Public Act 2017-09](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf) lists "execution of a document" as a fee category. My read: someone took the pre-April-2017 notarial seal fee ($20) and mislabelled it as a separate "execution" fee, distinct from the current $50 notarial seal.
- **Fix:** confirm with the Registrar's office whether "execution" is a distinct fee; if not, remove the line.
- **Suggested issue title:** `Verify "Execution of a document $20" notary fee or remove`

---

### F-009 · Tier B · Update "Registration opens in May 2026" — date is now

- **Where:** `src/content/register-summer-camp.md` line 13
- **Confidence it's wrong:** 80% (operational status; today is 2026-05-27 so registration has either just opened or is about to)
- **Citizen impact:** **High** — parents acting on this page need accurate current status.
- **What's wrong:** The page says "**Registration opens in May 2026.**" in bold. Today is 2026-05-27. Either registration is now open (and the message should change to "Registration is open — register by X") or it's slipping (and the date is wrong).
- **Fix:** check with Ministry of Youth, Sports and Community Empowerment for live status; rewrite the line to reflect current state, not future tense.
- **Suggested issue title:** `Update Summer Camp registration status — "opens in May 2026" needs live status`

---

### F-010 · Tier B · Reword passport page "Effective December 01, 2010" header

- **Where:** `src/content/apply-for-a-passport.md` line 47
- **Confidence it's wrong:** 0% on the facts (fees match `immigration.gov.bb` exactly), 95% on the framing
- **Citizen impact:** Medium — undermines citizen trust in the page's freshness; not a fact error.
- **What's wrong:** Header reads "New Passport Fees Effective December 01, 2010". Fees are still right but the 2010 stamp suggests the page hasn't been updated in 16 years.
- **Fix:** change to "Passport fees" or "Passport fees (current as of 2026)". The information is fine; only the framing is bad.
- **Suggested issue title:** `Reword passport fee header to remove "Effective December 01, 2010"`

---

### F-011 · Tier B · Verify loud-music attendance thresholds (1,000 / 1,500)

- **Where:** `src/content/loud-music-permit.md` lines 19, 21
- **Confidence it's wrong:** 50% — could be right; could be off-by-one-zero or out of date.
- **Citizen impact:** **High** — event organisers act on these thresholds; wrong numbers = wrong police/fire presence at events.
- **What's wrong:** Page asserts ">1,000 attendees needs police presence" and ">1,500 needs fire service presence" with no citation. Specific numbers but no source.
- **Fix:** confirm with Barbados Police Service and Barbados Fire Service in writing; add a citation to whatever public source confirms it.
- **Suggested issue title:** `Verify attendance thresholds (1,000 police / 1,500 fire) on Loud music permit page`

---

### F-012 · Tier B · Fix broken-English sentence on driver's licence page

- **Where:** `src/content/apply-for-a-drivers-licence.md` line 14
- **Confidence it's wrong:** 100% (text is structurally broken)
- **Citizen impact:** Medium — citizens can't parse the eligibility rules.
- **What's wrong:** Sentence reads: "If you are at least 16 years old you may be obtaining a Learner's License for a private motor vehicle **for a vehicle is 16 years** (if the applicant's parents or guardians give their consent)." Conflates applicant age with vehicle age; structurally broken.
- **Fix:** rewrite to clarify the age-16-with-parental-consent rule for a Learner's Licence.
- **Suggested issue title:** `Rewrite broken sentence on Apply for driver's licence page (line 14)`

---

### F-013 · Tier B · Verify open-pharmacy operational details

Three related claims on the same page — group as one issue or split into three.

- **Where:** `src/content/open-pharmacy.md` lines 36, 64–66, 72
- **Confidence it's wrong:** 30–40% per item; medium-high probability that at least one is stale.
- **Citizen impact:** **High** — citizens act on this to collect prescriptions.
- **What's wrong (3 sub-fixes):**
  - **Line 72:** "12 government polyclinic locations" — specific number; verify against Ministry of Health.
  - **Lines 64–66:** prescription colour scheme (blue/pink/yellow/green) — operational detail that changes; verify with BDS.
  - **Line 36:** chronic conditions list (asthma, cancer, diabetes, epilepsy, glaucoma, hypertension) — may be incomplete if new conditions have been added; verify with BDS.
- **Fix:** Barbados Drug Service (246) 535-4300 or <director@drugservice.gov.bb> to confirm all three.
- **Suggested issue title:** `Verify open-pharmacy operational details (polyclinic count, prescription colours, conditions list)`

---

### F-014 · Tier C · Welfare Department phone format is unparseable

- **Where:** `src/content/apply-financial-assistance.md` line 103
- **Confidence it's wrong:** 60% (something is wrong, unclear what)
- **Citizen impact:** Medium — citizens can't tell what to dial.
- **What's wrong:** Phone is written as `+1 246-535-1000/16/23`. The `/16/23` is presumably extensions or alternate line endings, but isn't formatted in any standard way.
- **Fix:** ask the Welfare Department; rewrite as e.g. `(246) 535-1000`, `(246) 535-1016`, `(246) 535-1023` if those are the actual numbers.
- **Suggested issue title:** `Clarify Welfare Department phone format on Apply for financial assistance`

---

### F-015 · Tier C · Welfare Department "Country Road" address is incomplete

- **Where:** `src/content/apply-financial-assistance.md` lines 51–53
- **Confidence it's wrong:** 50%
- **Citizen impact:** Medium — citizens can't find the office.
- **What's wrong:** Listed as just "Country Road / Bridgetown / St. Michael" — no building name, no number. Unusually sparse compared to the other two welfare office addresses on the same page.
- **Fix:** ask Welfare for the full address; complete the entry.
- **Suggested issue title:** `Complete "Country Road" welfare office address on Apply for financial assistance`

---

### F-016 · Tier C · "Electronic transfer of funds is not available yet" — verify current

- **Where:** `src/content/apply-financial-assistance.md` line 68
- **Confidence it's wrong:** unknown; flagged because it's a time-bound operational claim that shouldn't live in static content.
- **Citizen impact:** Low/medium — citizens may give bank details that are then unused.
- **What's wrong:** Sentence "The electronic transfer of funds is not available yet but details are being taken in preparation" is an operational status that may have changed since publication.
- **Fix:** confirm with the Welfare Department whether EFT is now available; if yes, rewrite; if no, add a "as of [date]" stamp.
- **Suggested issue title:** `Verify "electronic transfer of funds not available" claim on Apply for financial assistance`

---

### F-017 · Tier C · Confirm "436 names" count on the JP 2024 PDF

- **Where:** `src/content/justice-of-the-peace.md` line 75
- **Confidence it's wrong:** unknown — public web doesn't enumerate the PDF row count.
- **Citizen impact:** Low (provenance text), but a credibility signal.
- **What's wrong:** Page asserts "the official 2024 list (PDF, 436 names)". The PDF at `public/justices-of-the-peace-2024.pdf` (322 KB, 15 pages) downloads successfully but no external source publishes the row count. The other two stats on line 75 are now verified — "30 April 2023" matches the GIS listing title; "563 JPs appointed in January 2026" matches Barbados Today's post-ceremony report (which used the PM's own figure).
- **Fix:** Run a row count on `public/justices-of-the-peace-2024.pdf`. If it differs from 436, update the page. If it matches, mark this finding resolved.
- **Suggested issue title:** `Confirm "436 names" count on the JP 2024 PDF`

---

### F-019 · Tier B · Fix intro line on EZPay page (missing Mastercard, wrong postal service name)

- **Where:** `src/content/ezpay.md` line 11
- **Confidence it's wrong:** 90% (Mastercard omission); 95% (postal service name)
- **Citizen impact:** LOW — a citizen with only a Mastercard Debit card might hesitate to use the platform, but the body text (line 25) does correctly list Mastercard.
- **What's wrong:** Intro lists "Visa Debit Cards" (Mastercard Debit is also accepted per line 25 and gov.bb source) and "Barbados Post Office" (the official name is "Barbados Postal Service" per bps.gov.bb; line 31 of the same page uses the correct name).
- **Fix:** Change line 11 to read "Credit Cards, Visa or Mastercard Debit Cards, Direct Debit, Payce Digital and the Barbados Postal Service."
- **Source:** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay) · [bps.gov.bb](https://bps.gov.bb/)
- **Suggested issue title:** `Fix EZPay intro: add Mastercard Debit and correct postal service name`

---

### F-018 · Tier C · Flag TLS certificate error on `publicentertainment.bra.gov.bb`

- **Where:** linked from `src/content/loud-music-permit.md` line 45
- **Confidence it's wrong:** 100% (verified — TLS cert validation error)
- **Citizen impact:** **High** — citizens clicking the "apply for an annual permit" link see a browser security warning.
- **What's wrong:** The destination site has an invalid/unverifiable SSL certificate.
- **Fix:** flag to the Barbados Revenue Authority's IT team to renew the cert. Not a content fix but a citizen-facing bug.
- **Suggested issue title:** `Flag TLS cert error on publicentertainment.bra.gov.bb (linked from Loud music permit)`

---

### F-020 · Tier A · Fix Registration Department address on Register a marriage page

- **Where:** `src/content/register-a-marriage.md` line 11
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — citizens directed to "Coleridge Street, Bridgetown" will go to the wrong building (Henry Forde and David Simmons Judicial Complex, where courts relocated in 2023). The Registration Department is at Level 1, Supreme Court Complex, Whitepark Road, St. Michael.
- **What's wrong:** Opening paragraph says "Registration Department, Coleridge Street, Bridgetown". Every primary source (barbadoslawcourts.gov.bb, gov.bb/Departments/registration, GIS Facebook, gov.bb news 2019) confirms the address is Supreme Court Complex, Whitepark Road.
- **Fix:** Change "Registration Department, Coleridge Street, Bridgetown" to "Registration Department, Level 1, Supreme Court Complex, Whitepark Road, St. Michael".
- **Source:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages); [gov.bb — Registration Department](https://www.gov.bb/Departments/registration)
- **Suggested issue title:** `Fix Registration Department address on Register a marriage page (Coleridge Street → Whitepark Road)`

---

### F-020 · Tier A · Fix opening hours on marriage certificate page (3:15pm → 3:30pm)

- **Where:** `src/content/get-marriage-certificate/index.md` line 43
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — citizen arriving at 3:20pm could be turned away.
- **What's wrong:** Page states "Open Monday to Friday: 8:30am to 3:15pm". Both `gov.bb/register-birth` and `gov.bb/Citizens/register-birth` state the hours as "8:30 am and 3:30 pm Monday to Friday". The 3:15pm figure originates from a May 2020 Barbados Today article about a temporary COVID-era schedule. The same error is present on the death certificate page and was already confirmed discrepant on the birth certificate page (F-number not yet filed for that page).
- **Fix:** Change "3:15pm" to "3:30pm". Apply the same fix to `src/content/get-birth-certificate/index.md` and `src/content/get-death-certificate/index.md` (same error on all three pages).
- **Source:** [gov.bb — Register a Birth](https://www.gov.bb/register-birth)
- **Suggested issue title:** `Fix Registration Department hours on certificate pages (3:15pm → 3:30pm; affects marriage, birth, death cert pages)`

---

### F-021 · Tier A · Fix heading copy-paste error: "birth certificate" → "marriage certificate" in overseas section

- **Where:** `src/content/get-marriage-certificate/index.md` line 61
- **Confidence it's wrong:** 100%
- **Citizen impact:** MEDIUM — heading reads "Get a copy of a birth certificate if you live overseas" on the marriage certificate page. A citizen would be confused and might navigate away.
- **What's wrong:** The heading "Get a copy of a birth certificate if you live overseas" was copied from the birth certificate page and not updated.
- **Fix:** Change to "Get a copy of a marriage certificate if you live overseas".
- **Source:** Content file: `src/content/get-marriage-certificate/index.md`
- **Suggested issue title:** `Fix copy-paste heading error on marriage certificate page ("birth certificate" → "marriage certificate" in overseas section)`

---

### F-023 · Tier B · Clarify "cause of death" field in online death certificate form

- **Where:** `src/content/get-death-certificate/start.md` line 29
- **Confidence it's wrong:** 65%
- **Citizen impact:** MEDIUM — index.md line 29 explicitly states cause-of-death certificates cannot be obtained online; but start.md line 29 lists "the cause of death" as a mandatory form field in the online application. A citizen who needs a cause-of-death certificate (not just a standard death certificate) may attempt the online form, then be turned away.
- **What's wrong:** There is no editorial note explaining whether "cause of death" is a search/identification field (used to locate the death register entry) or an application field for a cause-of-death certificate. The two interpretations lead to opposite citizen journeys.
- **Fix:** Add a bracketed note to the start.md field description, e.g. "the cause of death (used to identify the record — this is not an application for a cause-of-death certificate)". Also confirm the field is present in the online form and serves the search-identifier function, not the certificate-type-selection function.
- **Source:** [get-death-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-death-certificate.md) Claim 13; [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates)
- **Suggested issue title:** `Clarify "cause of death" field in online death certificate form (distinguish from cause-of-death certificate application)`

---

### F-022 · Tier A · Fix typo "unknwon" → "unknown" on marriage certificate page

- **Where:** `src/content/get-marriage-certificate/index.md` line 57
- **Confidence it's wrong:** 100%
- **Citizen impact:** LOW — trust signal.
- **What's wrong:** Section heading reads "If basic information is unknwon".
- **Fix:** Change to "If basic information is unknown".
- **Source:** Content file: `src/content/get-marriage-certificate/index.md`
- **Suggested issue title:** `Typo: "unknwon" → "unknown" on Get a copy of a marriage certificate page`

---

### F-024 · Tier A · Fix Registration Department building name on marriage licences page ("Judicial Centre" → "Supreme Court Complex")

- **Where:** `src/content/marriage-licences.md` lines 114–115
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — a citizen using this page to obtain their marriage certificate after the ceremony could have difficulty finding the building. "Judicial Centre" does not appear on any authoritative source checked.
- **What's wrong:** Page says "Judicial Centre" as the Registration Department building name. All authoritative sources — gov.bb/Departments/registration, barbadoslawcourts.gov.bb/Certificates, and the Supreme Court Registry page — consistently use "Supreme Court Complex". Additionally, the road name "White Park Road" (two words) should be "Whitepark Road" (one word).
- **Fix:** Change "Judicial Centre" to "Supreme Court Complex" and "White Park Road" to "Whitepark Road".
- **Source:** [gov.bb — Registration Department](https://www.gov.bb/Departments/registration); [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates)
- **Suggested issue title:** `Fix Registration Department building name on marriage licences page ("Judicial Centre" → "Supreme Court Complex")`

---

### F-025 · Tier B · Review "male and female" language on marriage licences page (legal review required)

- **Where:** `src/content/marriage-licences.md` line 13
- **Confidence it's wrong:** 65%
- **Citizen impact:** HIGH — if same-sex couples are not legally barred from marrying in Barbados (a live question after the December 2022 Sexual Offences Act ruling), this language either misstates the law or incorrectly signals that same-sex couples cannot apply.
- **What's wrong:** Page states "Application for a marriage licence must be made by both (male and female) persons". The Marriage Act CAP 218A uses predominantly gender-neutral language ("two persons" in most sections). The source gov.bb page uses the same "male and female" phrasing, which appears to reflect administrative practice rather than clear statutory language.
- **Fix:** Seek a written opinion from the Office of the Attorney General on whether the Marriage Act restricts licences to opposite-sex couples. If yes, the language can stay (with a statutory citation). If the legal position is contested or unclear, replace with "both persons" and note the statutory authority.
- **Source:** [Marriage Act CAP 218A — LII/Gender Justice](https://www.law.cornell.edu/gender-justice/resource/Marriage_Act_1978-40_Cap_218A_Barbados); [gov.bb — Get a Marriage Licence](https://www.gov.bb/marriage-licence)
- **Suggested issue title:** `Legal review: "male and female" language on marriage licences page — confirm statutory basis or replace`

---

### F-026 · Tier C · Confirm Registration Department fax number on marriage licences page

- **Where:** `src/content/marriage-licences.md` line 126
- **Confidence it's wrong:** 65%
- **Citizen impact:** LOW — fax is rarely the primary contact method for citizens.
- **What's wrong:** Page lists fax `(246) 426-2405`. gov.bb/Departments/registration (likely the more recently maintained page, as it names the current Acting Registrar) lists fax `1 (246) 427-8917`. Both appear in authoritative sources; neither can be dismissed.
- **Fix:** contact the Registration Department to confirm the current fax number. Also confirm whether the `registrar@lawcourt.gov.bb` email (page) or `registrar@lawcourts.gov.bb` (gov.bb departments) or `registrarsupremecourt@barbados.gov.bb` (barbadoslawcourts.gov.bb) is current — three variants appear across Tier 1 sources.
- **Source:** [gov.bb — Registration Department](https://www.gov.bb/Departments/registration); [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates)
- **Suggested issue title:** `Confirm Registration Department fax and email on marriage licences page (conflicting sources)`

---

### F-027 · Tier C · Verify CSEC eligibility threshold (5 subjects including maths and science) for temporary teachers

- **Where:** `src/content/apply-for-a-position-as-a-temporary-teacher.md` line 17
- **Confidence it's wrong:** unknown — MPS circular PDF not machine-readable; secondary summary cited 4 subjects (not 5), English only (not maths/science)
- **Citizen impact:** HIGH — if the real threshold is 4 subjects (or if maths/science are not mandatory), qualified candidates may incorrectly self-screen out.
- **What's wrong:** Page states "at least 5 CXC subjects at CSEC general proficiency level, including English language, maths and a science subject." The Ministry of Public Service circular for teacher appointments (June 2025) was located but its PDF was not machine-readable. A secondary description of the circular referenced 4 subjects and English Language for the Teacher Special Grade, with no mention of maths or science.
- **Fix:** Request the current eligibility criteria directly from the Ministry of Educational Transformation (teachervacancy@mes.gov.bb or (246) 535-0600). If the requirements differ from what the page states, update accordingly.
- **Source:** [MPS — Circular Application for the Post of Teacher (PDF, June 2025)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf)
- **Suggested issue title:** `Verify CSEC subject threshold for temporary teachers (5 subjects with maths + science vs. 4 subjects with English)`

---

### F-029 · Tier A · Fix `ministries.ts` categorisation of "Business policies and law" (belongs under Labour, not MIIST)

- **Where:** `src/data/ministries.ts` lines 741–745
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — the Ministry of Industry, Innovation, Science and Technology currently lists this page in its "Online services" section; the content is entirely about the Ministry of Labour's mandate, so citizens arriving via MIIST's ministry page are misled.
- **What's wrong:** The `business-policies-and-law` page is listed as an `onlineServices` entry under `ministry-of-industry-innovation-science-and-technology`. The page content describes only the Ministry of Labour's mandate and links to `labour.gov.bb`. It should be associated with `ministry-of-labour-social-security-and-third-sector`.
- **Fix:** Remove the `business-policies-and-law` entry from MIIST's `onlineServices` array and add it to the `ministry-of-labour-social-security-and-third-sector` `onlineServices` array instead.
- **Source:** [`src/data/ministries.ts`](/home/gavin/frontend-alpha/src/data/ministries.ts); [Report: business-policies-and-law.md](/docs/fact-check/business-policies-and-law.md)
- **Suggested issue title:** `Fix ministries.ts: move "Business policies and law" from MIIST to Ministry of Labour`

---

### F-030 · Tier A · Fix "gross pay — include overtime or bonuses" on Calculate severance pay (start.md)

- **Where:** `src/content/calculate-severance-pay/start.md` line 22
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — the calculator will produce an inflated estimate for any worker who regularly earns overtime, commissions, or bonuses. Severance is computed on *basic pay*, not gross pay. A newly redundant worker who over-estimates their entitlement could face real financial hardship when the actual payment is lower.
- **What's wrong:** Page instructs citizens to enter "your usual gross pay (weekly or monthly) — include overtime or bonuses". The NIS calculates severance on **basic average weekly pay** (total basic earnings over the last 104 weeks divided by 104). The NIS explicitly distinguishes basic pay from insurable earnings: "Insurable earnings include … Overtime payments, Commission on sales or profits on sales, Service charge, Production bonus" — these are excluded from basic pay for severance computation.
- **Fix:** Change to "your usual basic pay (weekly or monthly) — do not include overtime, commissions, service charges, or bonuses". Add a note that the estimate is capped at the NIS maximum insurable earnings ceiling ($1,201 weekly as of January 2024).
- **Source:** [NIS — Severance](https://www.nis.gov.bb/severance/)
- **Suggested issue title:** `Fix severance calculator pay instruction: "gross pay / include overtime" → "basic pay / exclude overtime and bonuses"`

---

### F-031 · Tier B · Correct NIS department name on Calculate severance pay page

- **Where:** `src/content/calculate-severance-pay/index.md` line 31
- **Confidence it's wrong:** 75%
- **Citizen impact:** LOW — citizens will still reach the correct department.
- **What's wrong:** Page uses "NIS Severance Payment Department". The NIS Contact Us page lists the department as "Severance" and the official email slug is `severancedepartment@bginis.gov.bb` — neither source uses "Payment" as part of the department name.
- **Fix:** Change to "NIS Severance Department". Optionally add the email address: severancedepartment@bginis.gov.bb.
- **Source:** [NIS — Contact Us](https://www.nis.gov.bb/contact-us/); [NIS — Severance](https://www.nis.gov.bb/severance/)
- **Suggested issue title:** `Fix NIS department name on Calculate severance pay page ("Severance Payment Department" → "Severance Department")`

---

### F-032 · Tier A · Fix National Heroes count: "ten" → "eleven"

- **Where:** `src/app/bank-holiday-calendar/page.tsx` line 166
- **Confidence it's wrong:** 98%
- **Citizen impact:** MEDIUM — factually incorrect; Rihanna was named the 11th National Hero on 30 November 2021.
- **What's wrong:** The National Heroes Day note reads `"Honouring Barbados's ten official National Heroes"`. Barbados has had eleven National Heroes since Robyn Rihanna Fenty was honoured at the republic investiture ceremony on 30 November 2021. GIS confirmed: "Robyn Rihanna Fenty is the 11th National Heroine of Barbados."
- **Fix:** Change `"Honouring Barbados's ten official National Heroes"` to `"Honouring Barbados's eleven official National Heroes"`.
- **Source:** [GIS — Rihanna Named Barbados' 11th National Hero](https://gisbarbados.gov.bb/blog/rihanna-named-barbados-11th-national-hero/); [CARICOM Today](https://today.caricom.org/2021/12/01/rihanna-named-barbados-11th-national-hero/)
- **Suggested issue title:** `Fix National Heroes count on bank holiday calendar: "ten" → "eleven" (Rihanna named 11th in 2021)`

---

### F-033 · Tier B · Fix Whit Monday note: "7th Monday after Easter" → "Day after Pentecost"

- **Where:** `src/app/bank-holiday-calendar/page.tsx` line 177
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — display-only note, no citizen acts on it. Factual accuracy and public trust.
- **What's wrong:** The note reads `"7th Monday after Easter"`. Whit Monday = Easter + 50 days. Counting all Mondays from Easter Sunday to Whit Monday inclusive, there are 8 Mondays — not 7. The correct standard description is "day after Pentecost" (Pentecost Sunday = Easter + 49 days; Whit Monday = Easter + 50 days). Confirmed by computation across 2024–2028.
- **Fix:** Change `note: "7th Monday after Easter"` to `note: "Day after Pentecost"`.
- **Source:** [Wikipedia — Pentecost](https://en.wikipedia.org/wiki/Pentecost); [PublicHolidays.la — Pentecost Barbados](https://publicholidays.la/barbados/pentecost/)
- **Suggested issue title:** `Fix Whit Monday note on bank holiday calendar: "7th Monday after Easter" → "Day after Pentecost"`

---

### F-028 · Tier C · Confirm whether temporary teacher form covers primary schools only

- **Where:** `src/content/apply-for-a-position-as-a-temporary-teacher.md` line 9
- **Confidence it's wrong:** unknown — form itself is untitled by school level; original MET announcement page is inaccessible (404)
- **Citizen impact:** MEDIUM — secondary-school teacher candidates may incorrectly believe this form does not apply to them.
- **What's wrong:** Page restricts scope to "a government-funded primary school in Barbados." The seamlessdocs form is titled simply "Application for Temporary Teacher" with no reference to primary schools. The MPS teacher circular covers general teacher appointments. The original MET announcement page (mes.gov.bb/News/Latest/Application-Form-for-Temporary-Teachers.aspx) now redirects to a 404 via education.gov.bb, so the intended scope cannot be confirmed.
- **Fix:** Confirm with the Ministry of Educational Transformation (teachervacancy@mes.gov.bb) whether the form applies to primary schools only, or also secondary and other government schools. Update the opening sentence accordingly.
- **Source:** [barbados.seamlessdocs.com — Application for Temporary Teacher form](https://barbados.seamlessdocs.com/f/pvyf07u3v0j2); [MET announcement page (redirects to 404)](https://mes.gov.bb/News/Latest/Application-Form-for-Temporary-Teachers.aspx)
- **Suggested issue title:** `Confirm temporary teacher form scope: primary only, or also secondary schools?`

---

### F-034 · Tier A · Update "PAD" references to Ministry of Public Service (pension page)

- **Where:** `src/content/calculate-your-pension/index.md` lines 15–17 and 23–24
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — citizens contacting "the PAD" for pensionable service records cannot locate the dissolved division; enquiries may go unanswered.
- **What's wrong:** Page references "the Personnel Administration Division (PAD)" in two places as the body holding pensionable service records. The PAD was dissolved in January 2019 and absorbed into the Ministry of Public Service (People Resourcing and Compliance Directorate). The MPS FAQ explicitly states the Ministry "was created in January 2019, through the amalgamation of the entities: Ministry of the Civil Service, Personnel Administration Division, and Training Administration Division."
- **Fix:** Replace both occurrences of "the Personnel Administration Division (PAD)" with "the Ministry of Public Service (People Resourcing and Compliance Directorate)". Add contact: 1st Floor E. Humphrey Walcott Building, Cnr. Collymore Rock & Culloden Road, St. Michael, Tel. (246) 535-4500.
- **Source:** [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php); [MPS — Pension Processing](https://mps.gov.bb/People_Resourcing/pension_processing)
- **Suggested issue title:** `Update "PAD" references on Calculate your pension page — PAD dissolved January 2019, now Ministry of Public Service`

---

### F-035 · Tier A · Fix voluntary retirement age boundary: "Before 15 July 1985" → "On or before 15 July 1985"

- **Where:** `src/content/calculate-your-pension/index.md` lines 33–35
- **Confidence it's wrong:** 85%
- **Citizen impact:** LOW in aggregate (affects only persons appointed on exactly 15 July 1985), but a factual error in a legal table.
- **What's wrong:** Row 1 says "Before 15 July 1985 → 55". Row 2 says "On or after 15 July 1985 → 60". Both MPS and Treasury confirm the threshold is "on or before the 15th July 1985 → 55 years" and "after 15th July 1985 → 60 years". A person appointed on exactly 15 July 1985 is assigned to the wrong (age-60) group by the current table.
- **Fix:** Change row 1 from "Before 15 July 1985" to "On or before 15 July 1985"; change row 2 from "On or after 15 July 1985" to "After 15 July 1985".
- **Source:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — "permanently appointed with effect from 15th July, 1985 and before → age 55"; [MPS — FAQ](https://mps.gov.bb/People_Resourcing/faq.php) — "on or before the 15th July 1985 → 55 years"
- **Suggested issue title:** `Fix voluntary retirement age table boundary: "Before 15 July 1985" → "On or before 15 July 1985" on Calculate your pension page`

---

### F-037 · Tier B · Label FSC fax number correctly — currently listed as a second phone line

- **Where:** `src/content/financial-services-for-businesses.md` line 26
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a citizen dialling (246) 421-2146 expecting a voice answer will reach a fax machine
- **What's wrong:** Page lists `(246) 421-2146` as a second telephone number, with no label. The FSC's own Contact Us page lists only one voice phone (`+1 (246) 421 2142`); multiple authoritative search results identify 421-2146 as the FSC fax number.
- **Fix:** Either (a) relabel the line as `Fax: (246) 421-2146`, or (b) remove the fax number if alpha.gov.bb's convention is to list only voice telephone numbers. Confirm with FSC if needed.
- **Source:** [FSC — Contact Us](https://www.fsc.gov.bb/contact-us); [gov.bb — Financial Services Commission](https://www.gov.bb/State-Bodies/financial-services-commission)
- **Suggested issue title:** `Label FSC fax number on Financial services for businesses page (421-2146 is a fax, not a second phone)`

---

### F-038 · Tier B · Fix "Co-operatives Societies Act" spelling — should be "Co-operative Societies Act"

- **Where:** `src/content/financial-services-for-businesses.md` line 18
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — a business user searching for the Act by name using the page text may fail to find it; the typo misrepresents the statute title
- **What's wrong:** Page writes "Co-operatives Societies Act, Cap. 378A". The correct title is "Co-operative Societies Act, Cap. 378A" (singular "Co-operative"). The Barbados Law Courts statutory repository uses `Co-operativeSocietiesCAP378A.pdf`; the FSC Legislation page lists "Co-operative Societies Act Cap. 378A".
- **Fix:** Change "Co-operatives Societies Act" to "Co-operative Societies Act".
- **Source:** [Barbados Law Courts — Co-operative Societies Act, Cap. 378A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/Co-operativeSocietiesCAP378A.pdf); [FSC — Legislation](https://www.fsc.gov.bb/legislation)
- **Suggested issue title:** `Fix "Co-operatives Societies Act" spelling on Financial services for businesses page (should be "Co-operative Societies Act")`

---

### F-037 · Tier A · Replace "Welfare Department" with Social Empowerment Agency on disaster relief page

- **Where:** `src/content/get-disaster-relief-assistance.md` lines 21, 38, 44, 75, 76, 96
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — the Welfare Department was dissolved 2 January 2026 and merged into the Social Empowerment Agency (SEA). Citizens directed to the "Welfare Department" will encounter an agency that no longer exists under that name; SEA client centres are at new locations (Six Roads, St Philip; Southern Plaza, Oistins).
- **What's wrong:** Every reference to "Welfare Department" on the page is now outdated. The SEA merged the Child Care Board, Welfare Department, National Assistance Board, National Disabilities Unit, and Resilience and Reintegration Unit on 2 January 2026.
- **Fix:** Replace all six occurrences of "Welfare Department" with "Social Empowerment Agency (SEA)". Consider adding a note "(formerly the Welfare Department)" on first use. Update addresses to reflect new SEA client centre locations once confirmed with the agency.
- **Source:** [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/); [socialempowermentbb.org](https://socialempowermentbb.org/)
- **Suggested issue title:** `Update "Welfare Department" to "Social Empowerment Agency" on disaster relief page (merged Jan 2026)`

---

### F-038 · Tier A · Fix Welfare Department address: "Perry Gap" → "Weymouth Corporate Centre, Roebuck Street"

- **Where:** `src/content/get-disaster-relief-assistance.md` lines 22–24, 40–43
- **Confidence it's wrong:** 90%
- **Citizen impact:** HIGH — a citizen travelling to "Perry Gap, Bridgetown" during or after a disaster will not find the welfare/SEA office. The correct address, confirmed by gov.bb, GIS, and govserv.org, is Weymouth Corporate Centre, Roebuck Street, Bridgetown, St. Michael.
- **What's wrong:** Page lists "Perry Gap, Bridgetown, Saint Michael" as the Welfare Department address. No Tier 1 or Tier 2 source places the Welfare Department at Perry Gap. All authoritative sources consistently give Weymouth Corporate Centre, Roebuck Street.
- **Fix:** Change both address blocks to "Weymouth Corporate Centre, Roebuck Street, Bridgetown, St. Michael" (or to the relevant SEA client centre address once confirmed — see F-037).
- **Source:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare); [GIS — New Numbers For Welfare Dept.](https://gisbarbados.gov.bb/blog/new-numbers-for-welfare-dept/); [govserv.org — Barbados Welfare Department](https://www.govserv.org/BB/St-Michael/1153517008123538/Barbados-Welfare-Department)
- **Suggested issue title:** `Fix Welfare Department address on disaster relief page ("Perry Gap" → "Weymouth Corporate Centre, Roebuck Street")`

---

### F-039 · Tier B · Add DEM phone number to disaster relief page

- **Where:** `src/content/get-disaster-relief-assistance.md` lines 80–84
- **Confidence it's wrong:** 100% (omission, not an error on the content present)
- **Citizen impact:** MEDIUM — the DEM address is listed but no phone number is given; citizens in a disaster situation need to be able to call DEM directly.
- **What's wrong:** The DEM block (lines 80–84) lists the building and address but omits the telephone number. DEM's published number is (246) 438-7575.
- **Fix:** Add `+(246) 438-7575` (or `(246) 438-7575`) after the address block; optionally add email `deminfo@barbados.gov.bb`.
- **Source:** [DEM — Contact Us](https://dem.gov.bb/contact); [gov.bb — Department of Emergency Management](https://www.gov.bb/Departments/emergency-management)
- **Suggested issue title:** `Add DEM phone number to disaster relief page ((246) 438-7575)`

---

### F-040 · Tier A · Fix form-per-child rule on Get a primary school textbook grant page

- **Where:** `src/content/get-a-primary-school-textbook-grant/index.md` lines 16–17
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — a parent who submits one form for three children at the same school will have only one child's claim processed; the other children's grants will be missed.
- **What's wrong:** Page states "If you have more than one child at the same school, you only need to complete one form to claim on behalf of each child." The Ministry of Educational Transformation's own announcement and GIS reporting confirm that one form per child (not one form per family per school) is required: "If you are a parent or guardian of three children, you are required to complete one form per student."
- **Fix:** Change to "If you have more than one child at the same school, you need to complete a separate form for each child."
- **Source:** [mes.gov.bb — Textbook Grant 2023 announcement](https://mes.gov.bb/News/Latest/The-Primary-School-100-Textbook-Grant-2023.aspx); [Barbados Today — Education ministry ready to accept claims (2023-09-30)](https://barbadostoday.bb/2023/09/30/education-ministry-ready-to-accept-claims-for-textbook-grants/)
- **Suggested issue title:** `Fix textbook grant form-per-child rule: one form per child, not one form per family per school`

---

### F-041 · Tier B · Fix currency code "BDD" → "BDS" on primary school textbook grant page

- **Where:** `src/content/get-a-primary-school-textbook-grant/index.md` line 8
- **Confidence it's wrong:** 99%
- **Citizen impact:** LOW — citizens are unlikely to be confused by the dollar amount; trust and accuracy signal.
- **What's wrong:** Page reads "$100 BDD textbook grant". "BDD" is not a valid ISO 4217 currency code and is not used by any Government of Barbados source. The correct local abbreviation is "BDS$" (or ISO code BBD). Note: `src/data/content-directory.ts` line 280 correctly uses "BDS $100".
- **Fix:** Change "BDD" to "BDS" to match the currency abbreviation used by the Central Bank of Barbados and Government of Barbados publications.
- **Source:** [Central Bank of Barbados currency conventions](https://www.centralbank.org.bb); [ISO 4217 — BBD](https://www.xe.com/currency/bbd-barbadian-or-bajan-dollar/)
- **Suggested issue title:** `Fix currency code typo "BDD" → "BDS" on Get a primary school textbook grant page`

---

### F-042 · Tier A · Fix "Crisis Hotline" label — 435-8222 is the BPW Crisis Centre, not a government hotline

- **Where:** `src/content/get-support-for-a-victim-of-domestic-abuse.md` line 37
- **Confidence it's wrong:** 90%
- **Citizen impact:** HIGH — a person in crisis who dials expecting a government crisis line will reach an NGO. The number is still helpful, but the misidentification undermines trust and omits the caller's right to know they are reaching a civil society organisation.
- **What's wrong:** Page labels 435-8222 as "the Crisis Hotline". This number belongs to the Barbados Professional Women (BPW) Crisis Centre and Shelter, a non-governmental organisation, confirmed by BPW's own website and multiple secondary sources.
- **Fix:** Change "the Crisis Hotline on 435-8222" to "the BPW (Barbados Professional Women) Crisis Centre on 435-8222". Also consider adding the BPW's secondary number 845-0623 (WhatsApp/calls) for completeness.
- **Source:** [BPW Crisis Centre (bpwbarbados.wordpress.com)](https://bpwbarbados.wordpress.com/bpw-crisis-centre-and-shelter/); [findahelpline.com — Barbados](https://findahelpline.com/countries/bb/topics/abuse-domestic-violence)
- **Suggested issue title:** `Fix "Crisis Hotline" label on domestic abuse page — 435-8222 is the BPW Crisis Centre (NGO), not a government hotline`

---

### F-043 · Tier A · Replace unverified FCU phone numbers with confirmed numbers

- **Where:** `src/content/get-support-for-a-victim-of-domestic-abuse.md` line 45
- **Confidence it's wrong:** 80% (845-0623 is a BPW number, not FCU); >80% (836-5070 has no authoritative source)
- **Citizen impact:** HIGH — crisis service. A victim dialling an incorrect or dead FCU number receives no help.
- **What's wrong:** The page lists three FCU numbers: 435-8222 (BPW hotline, not FCU), 845-0623 (BPW secondary line, not FCU), and 836-5070 (no authoritative source found). The official FCU numbers — 430-7316/7323 (Mental Health Services Directory) and 430-7328 (Barbados Police Service Facebook) — are absent from the page.
- **Fix:** Replace the three current numbers with the verified FCU numbers: (246) 430-7316 / (246) 430-7323. Confirm 430-7328 with the RBPF and add if correct. Keep 435-8222 in a separate "Other support" block labelled as BPW. Remove 836-5070 unless the RBPF confirms it is active.
- **Source:** [Barbados Mental Health Services Directory](https://fliphtml5.com/yxtji/jgmr/DIRECTORY_OF_MENTAL_HEALTH_SERVICES_IN_BARBADOS/) — lists FCU as 430-7316/7323 at Old Black Rock Police Station; [Barbados Police Service Facebook — FCU 430-7328](https://www.facebook.com/permalink.php/?story_fbid=979961630833230&id=100064582068302)
- **Suggested issue title:** `Fix FCU phone numbers on domestic abuse page — replace unverified 845-0623 / 836-5070 with confirmed 430-7316/7323`

---

### F-044 · Tier A · Fix FCU address — "Black Rock Police Station Annex" → "Old Black Rock Police Station, Black Rock, St. Michael"

- **Where:** `src/content/get-support-for-a-victim-of-domestic-abuse.md` lines 47–48
- **Confidence it's wrong:** 75%
- **Citizen impact:** HIGH — a victim searching Google Maps for the "Black Rock Police Station Annex" will not find a match; "Old Black Rock Police Station" is the correct navigable landmark.
- **What's wrong:** Page says "Black Rock Police Station Annex, Saint Michael." No authoritative source uses "Annex." The Barbados Mental Health Services Directory and Barbados Advocate reporting both use "Old Black Rock Police Station, Black Rock, St. Michael."
- **Fix:** Change to "Old Black Rock Police Station, Black Rock, St. Michael".
- **Source:** [Barbados Mental Health Services Directory](https://fliphtml5.com/yxtji/jgmr/DIRECTORY_OF_MENTAL_HEALTH_SERVICES_IN_BARBADOS/); [Barbados Advocate — Black Rock Police Station opens](https://www.barbadosadvocate.com/news/black-rock-police-station-opens)
- **Suggested issue title:** `Fix FCU address on domestic abuse page: "Black Rock Police Station Annex" → "Old Black Rock Police Station, Black Rock, St. Michael"`

---

### F-045 · Tier C · Verify or remove "Victim Rights Form 7" reference

- **Where:** `src/content/get-support-for-a-victim-of-domestic-abuse.md` line 84
- **Confidence it's wrong:** 65% (no authoritative source confirms this form name or number)
- **Citizen impact:** HIGH — a victim asking police for a non-existent or wrongly-named form risks being dismissed; this is a life-safety concern.
- **What's wrong:** Page refers to "Victim Rights Form 7" as a form used to apply for trauma-related support. No Barbados government source — not the Domestic Violence (Protection Orders) Act CAP. 130A, not the 2016 Amendment, not gov.bb, not GIS — names a form called "Victim Rights Form 7." The Act's Schedule contains Forms 1–6.
- **Fix:** Contact the Royal Barbados Police Force and/or Bureau of Gender Affairs to confirm whether this form exists, and if so, what its correct name is. If it does not exist, remove the reference. If confirmed, add a source citation.
- **Source:** [Domestic Violence (Protection Orders) Act CAP. 130A](https://barbadosparliament-laws.com/en/showdoc/cs/130A); [Baker McKenzie — Topic 4](https://resourcehub.bakermckenzie.com/en/resources/fighting-domestic-violence/north-and-central--america/barbados/topics/4-protection-for-domestic-violence-victims-and-relief-granted) — neither confirms "Form 7"
- **Suggested issue title:** `Verify or remove "Victim Rights Form 7" reference on domestic abuse page — form name not confirmed by any Barbados source`

---

### F-036 · Tier B · Add missing 2006–2009 row to compulsory retirement age table

- **Where:** `src/content/calculate-your-pension/index.md` lines 38–43
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — officers compulsorily retired under the 2006–2009 rule (age 65½) are not served by the current table.
- **What's wrong:** The compulsory retirement age table shows three rows beginning "1 January 2010". The Ministry of Public Service's authoritative table begins one row earlier: "1 January 2006 to 31 December 2009 → 65½". The Treasury Dept "Considerations" page also omits this row, but MPS is the definitive authority for public service conditions. The table is also more readable if each period includes its end-date ("1 January 2010 to 31 December 2013") rather than just the start date.
- **Fix:** Add a row: "1 January 2006 to 31 December 2009 | 65½" at the top of the table. Also update the remaining rows to show end dates for the bounded periods, matching the MPS format.
- **Source:** [MPS — Age](https://mps.gov.bb/People_Resourcing/age) — four-row table beginning 1 January 2006
- **Suggested issue title:** `Add missing 2006–2009 row (age 65½) to compulsory retirement age table on Calculate your pension page`

---

### F-046 · Tier A · Remove obsolete visitor driving permit section — permits abolished October 2025

- **Where:** `src/content/getting-around-barbados.md` lines 9–17
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a visitor reading this page may attempt to apply for a permit that no longer exists, or mistakenly believe they cannot legally drive without one. The entire section ("Obtaining a Drivers Permit") is obsolete.
- **What's wrong:** The Barbados Revenue Authority abolished visitor driving permits effective 15 October 2025. Visitors may now drive in Barbados on a valid home-country driving licence for the class of vehicle they intend to drive. A Car Rental Levy (BBD $5/day, max $35 per rental contract) is now collected by rental companies — it is not a citizen-facing application. The BLA service page has not yet been updated to reflect the change, but the BRA policy note is the governing authority.
- **Fix:** Remove the entire "Obtaining a Drivers Permit" section (lines 9–17). Add a note: "Visitors may drive in Barbados on a valid home-country driving licence. If renting a vehicle, a Car Rental Levy of BBD $5 per day (maximum $35 per rental) is included in your rental rate." Also confirm the position for temporary residents (those staying longer term) and whether the 12-month CARICOM free-movement provision applies.
- **Source:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources); [barbadosdigital.com — Driving licences](https://barbadosdigital.com/articles/driving-licences)
- **Suggested issue title:** `Remove obsolete visitor driving permit section — permits abolished 15 October 2025, replaced by Car Rental Levy`

---

### F-047 · Tier B · Update ZR route description: not "numbered one through eleven"

- **Where:** `src/content/getting-around-barbados.md` line 36
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — a visitor looking for Route 15 (Groves Development), Route 19 (Dash Valley), or Route 3O (Speightstown to Oistins) will not know these routes exist if the page implies routes stop at 11.
- **What's wrong:** Page says ZRs "run specific routes numbered one through eleven." The Transport Authority (ta.gov.bb) lists 31 route-taxi routes, numbered up to Route 61, plus lettered variants (1A, 1B, 3C, 3D, 3L, 3M, 3N, 3O, 3Q, 3R, 3V, 3W, 8B, and Route 61). Routes 01–11 are the original numbered core routes; the full network is significantly larger.
- **Fix:** Change "run specific routes numbered one through eleven" to "run specific routes across the island" and add a link to ta.gov.bb/Routes/RouteTaxis/ for the full route list.
- **Source:** [Transport Authority — Route Taxis](https://ta.gov.bb/Routes/RouteTaxis/)
- **Suggested issue title:** `Update ZR route description on Getting around Barbados: "one through eleven" is outdated (31 routes now listed by Transport Authority)`

---

### F-048 · Tier B · Replace "National Employment Bureau" with "BECCS" on Jobseekers page

- **Where:** `src/content/jobseekers.md` line 13
- **Confidence it's wrong:** 88%
- **Citizen impact:** MEDIUM — the National Employment Bureau was renamed the Barbados Employment and Career Counselling Service (BECCS) effective 1 April (announced May 2017 per Loop Barbados/GIS). No Tier 1 source now uses "National Employment Bureau". The One Stop Resource Centre page on labour.gov.bb explicitly describes itself as serving BECCS, not the NEB. A citizen searching "National Employment Bureau" may struggle to locate the current service.
- **What's wrong:** Page says "One Stop Resource Centre under the **National Employment Bureau**". The bureau operating the One Stop Resource Centre is now named the Barbados Employment and Career Counselling Service (BECCS).
- **Fix:** Change "under the National Employment Bureau" to "under the Barbados Employment and Career Counselling Service (BECCS)".
- **Source:** [labour.gov.bb — One Stop Resource Centre](https://labour.gov.bb/employment-services/one-stop-resource-centre/) — references BECCS exclusively; [GIS — Name Change For Employment Bureau April 1st](https://gisbarbados.gov.bb/blog/name-change-for-employment-bureau-april-1st/) (HTTP 403 on direct fetch; URL confirmed via search index)
- **Suggested issue title:** `Update "National Employment Bureau" to "BECCS" on Jobseekers page`

---

### F-049 · Tier C · Confirm preferred form of "Ministry of the Public Service" name on Jobseekers page

- **Where:** `src/content/jobseekers.md` line 36
- **Confidence it's wrong:** 60%
- **Citizen impact:** LOW — citizens will still reach the correct ministry via the URL; this is a naming precision issue.
- **What's wrong:** Page says "Visit the Ministry of the Public Service". The canonical gov.bb/ministries name is "Ministry of the Public Service and Talent Development" (MPSTD); `src/data/ministries.ts` line 919 uses the full form. The mps.gov.bb site header itself uses "Ministry of Public Service" (drops "the" as well), creating three variant forms in use.
- **Fix:** Consider updating to the full canonical form "Ministry of the Public Service and Talent Development" to match gov.bb and the canonical data file. Alternatively, confirm with the Ministry whether the short form is acceptable in running text.
- **Source:** [gov.bb — Ministries listing](https://www.gov.bb/ministries) — "Ministry of the Public Service and Talent Development"; `src/data/ministries.ts` line 919
- **Suggested issue title:** `Update "Ministry of the Public Service" to full canonical name on Jobseekers page`

---

### F-051 · Tier A · Replace obsolete 25% corporation tax rate on Information about business tax page

- **Where:** `src/content/information-about-business-tax.md` lines 57–65
- **Confidence it's wrong:** 98%
- **Citizen impact:** HIGH — the general corporation tax rate is stated as 25%. The Income Tax (Amendment and Validation) Act, 2024-15 (enacted 24 May 2024, effective 1 January 2024) replaced this with a tiered structure; from income year 2025 the standard rate is a flat 9% for most companies, with 5.5% for approved small businesses and 4.5% for qualifying IP income. The entire tax rates table requires replacement.
- **What's wrong:** Page states "The rate of tax applicable generally to both resident and non-resident companies in Barbados is 25%." Also wrong: general insurance at 25% (should be 0%–2% under the Class 1/2/3 structure) and life insurance at 5% (also superseded by Class 1/2/3). Manufacturing 15% and residential rental 15% also likely superseded but unconfirmed — flag for BRA confirmation.
- **Fix:** Replace the entire Tax Rates section with: standard rate 9% (income year 2025+); approved small businesses 5.5%; qualifying IP 4.5%; insurance (Class 1: 0%, Class 2: 2%, Class 3: 2%); confirm manufacturing and residential rental rates with BRA. Remove all references to "25%" and "5%".
- **Source:** [BRA — Income Tax Corporations (current rate table)](https://bra.gov.bb/About/Tax-Types/Income-Tax/Corporations); [PwC — Barbados Corporate Taxes on Income](https://taxsummaries.pwc.com/barbados/corporate/taxes-on-corporate-income); [Centralis Group — New Tax Rates 2024](https://centralisgroup.com/news-insights/barbados-an-overview-of-new-incentives-and-tax-rates-for-2024/)
- **Suggested issue title:** `Replace obsolete 25% corporation tax rate on Information about business tax page (new rate: 9% from income year 2025)`

---

### F-052 · Tier A · Fix loss carry-forward period: "nine years" is doubly stale

- **Where:** `src/content/information-about-business-tax.md` lines 39–41
- **Confidence it's wrong:** 92%
- **Citizen impact:** HIGH — a business incorrectly believing it can carry a loss for nine years may fail to claim deductions that expire after five years, resulting in a permanent tax overcharge.
- **What's wrong:** Page states losses may be carried forward for "nine years". The nine-year period was reduced to seven years for income years 2015–2024, and then further reduced to five years effective income year 2025 under the Income Tax (Amendment and Validation) Act, 2024-15. The page was published October 2025, so it was already wrong on publication (should have said seven years) and is now doubly wrong (should say five years). Also, from income year 2019, carried-forward losses may only offset up to 50% of taxable income in any given year — a utilisation cap not mentioned on the page.
- **Fix:** Change both nine-year references to "five years (from income year 2025)". Add a note that losses from income years 2015–2024 may be carried forward for seven years from the year incurred. Add a note about the 50% annual utilisation cap (from income year 2019). Separately, confirm insurance company carry-forward: PwC states general insurers are limited to five years; life insurers cannot carry forward losses.
- **Source:** [PwC — Barbados Corporate Deductions](https://taxsummaries.pwc.com/barbados/corporate/deductions); [PwC — Significant Developments](https://taxsummaries.pwc.com/barbados/corporate/significant-developments)
- **Suggested issue title:** `Fix loss carry-forward period on Information about business tax page ("nine years" → "five years" from income year 2025)`

---

### F-053 · Tier B · Update group relief exclusions list — refers to abolished regime categories

- **Where:** `src/content/information-about-business-tax.md` line 53
- **Confidence it's wrong:** 85%
- **Citizen impact:** HIGH — a business in a group structure could incorrectly apply or waive group relief based on outdated eligibility rules.
- **What's wrong:** Page excludes "international business companies, exempt insurance companies, societies with restricted liability, offshore banks and other companies granted special tax concessions" from group relief. These regime categories (IBCs, EICs, offshore banks, SRLs) were frozen for new entrants as of 31 December 2018. Under the reformed regime (effective from income years 2024/2025), group relief eligibility turns on whether companies are subject to tax at 9% and meet the 75% subsidiary test. The 50% relief cap (group relief may not exceed 50% of tax otherwise payable) is also missing from the page.
- **Fix:** Replace the exclusions paragraph with the current eligibility test: both companies must be Barbados-resident, subject to tax at 9%, and meet the 75% subsidiary test. Add that relief is capped at 50% of the tax otherwise payable. Remove the IBC/EIC/SRL/offshore bank exclusions as these entity types no longer exist for new entrants.
- **Source:** [PwC — Barbados Group Taxation](https://taxsummaries.pwc.com/barbados/corporate/group-taxation); [PwC — Significant Developments](https://taxsummaries.pwc.com/barbados/corporate/significant-developments)
- **Suggested issue title:** `Update group relief exclusions list on Information about business tax page — IBC/EIC/SRL/offshore-bank categories abolished (2018); current test is 9% tax rate + 75% subsidiary test`

---

### F-050 · Tier B · Fix "global population indexes" — wrong term on Local information page

- **Where:** `src/content/local-information.md` line 11
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — this is introductory promotional copy; no citizen will act on it. The error is a credibility and accuracy risk, not a citizen-misdirection risk.
- **What's wrong:** Page says "Ranked highly in most global population indexes." Population indexes rank countries by population size or growth rate — Barbados ranks approximately 186th in the world by population (~282,000 people), which is not a high ranking. The intended meaning is almost certainly quality-of-life, human development, or passport/competitiveness indices in which Barbados does rank highly (HDI rank 69/189 in the UNDP 2025 Human Development Report; Passport Index rank 22/199; Freedom in the World rank 13/210; Gender Development Index rank 12/189). Using "population indexes" is a factual error that misrepresents why Barbados attracts international attention.
- **Fix:** Replace "global population indexes" with "international development and quality-of-life indexes" (or simply "international indexes"). Optionally, name a specific example for credibility: "including ranking 69th globally in the UNDP Human Development Index."
- **Source:** [Barbados Statistical Service — International Indices](https://stats.gov.bb/international-indices/); [UNDP 2025 HDR — Statistical Annex Table 1 (PDF)](https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Statistical_Annex_HDI_Table.pdf); [Worldometer — Barbados Population](https://www.worldometers.info/world-population/barbados-population/)
- **Suggested issue title:** `Fix "global population indexes" on Local Information page — wrong term; should be "international development/quality-of-life indexes"`

---

### F-054 · Tier A · Update clinic name on Medical requirements page ("The Diagnostic Clinic" → "MedPlus Management Services, Inc.")

- **Where:** `src/content/medical-requirements.md` lines 15–18
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — a citizen arriving at the Beckles Road premises asking for "The Diagnostic Clinic" may be confused if staff identify the practice under the MedPlus brand; the name change also affects any pre-visit confirmation or correspondence.
- **What's wrong:** Page names the designated US immigrant visa examination facility as "The Diagnostic Clinic". The US State Department's authoritative Bridgetown supplement (BGN, dated April 30, 2025) lists the approved facility exclusively as "MedPlus Management Services, Inc." at two locations. No mention of "The Diagnostic Clinic" appears anywhere in the current State Department supplement. The same phone number (246-426-5051) is associated with the MedPlus Beckles Road location in business directories, confirming the premises were rebranded, not replaced.
- **Fix:** Replace "Diagnostic Clinic" with "MedPlus Management Services, Inc." Also add the second MedPlus location (Clapham Court, Wildey Main Road — see F-055). The Beckles Road address should also be updated to include the cross-street reference used by the State Department: "Corner of Jessamie Ave., Beckles Road, St. Michael."
- **Source:** [US State Department — BGN Bridgetown supplement](https://travel.state.gov/content/travel/en/us-visas/Supplements/Supplements_by_Post/BGN-Bridgetown.html)
- **Suggested issue title:** `Update clinic name on Medical requirements page — "The Diagnostic Clinic" is now "MedPlus Management Services, Inc."`

---

### F-055 · Tier B · Add missing MedPlus Wildey location to Medical requirements page

- **Where:** `src/content/medical-requirements.md` (addition — content is entirely absent)
- **Confidence it's wrong:** 85% (omission verified against State Department BGN supplement April 2025)
- **Citizen impact:** MEDIUM — US immigrant visa applicants travelling to Barbados for the mandatory medical exam have no knowledge of the primary/walk-in MedPlus location at Wildey. This is particularly important because the Wildey site operates as a walk-in (arrive by 7:00 a.m., Monday–Friday), which may be more convenient than the Beckles Road appointment-based model.
- **What's wrong:** The current page lists only one clinic location (Beckles Road). The US State Department BGN supplement (April 30, 2025) lists a second, separately staffed MedPlus location: Clapham Court, Wildey Main Road, St. Michael, Barbados, W.I. BB14007 (panel physicians: Dr. Sandra Reece, Dr. Ingrid Durrant). This location is described as the primary listing in the supplement and appears to have been set up specifically for walk-in exam scheduling.
- **Fix:** Add a second contact block to the page with the Wildey location details. Confirm the phone number and any appointment requirements with MedPlus directly. Also add the exam fees (USD $200 age 15+, USD $120 under 15) and the 72-hour result turnaround advisory — both are on the BGN supplement and directly relevant to citizens planning their travel.
- **Source:** [US State Department — BGN Bridgetown supplement](https://travel.state.gov/content/travel/en/us-visas/Supplements/Supplements_by_Post/BGN-Bridgetown.html)
- **Suggested issue title:** `Add missing MedPlus Wildey location to Medical requirements page (second authorised US visa exam clinic)`

---

### F-056 · Tier B · Add two missing photo requirements to National registration page

- **Where:** `src/content/national-registration.md` lines 18–21
- **Confidence it's wrong:** 98%
- **Citizen impact:** MEDIUM — a citizen arriving for their ID photo wearing a white sleeveless top will have their photo rejected. The EBC's published dress code clearly adds two requirements not on the page.
- **What's wrong:** The page lists only two prohibited items (head coverings; tinted glasses). The EBC's current registration guidance (ebc.gov.bb/registration-information/ and trident.gov.bb/registering/) adds two further restrictions: (a) no sleeveless clothing — shoulders must be covered; (b) no white clothing — photographs are taken against a white background. The head-coverings bullet is also missing the official religious-reasons exception.
- **Fix:** Add two new bullets: "Sleeveless clothing (shoulders must be covered)" and "White clothing (photographs are taken against a white background)". Add "(except for religious reasons)" to the head coverings bullet.
- **Source:** [EBC — Registration Information](https://www.ebc.gov.bb/registration-information/); [Barbados Digital ID — Registering](https://trident.gov.bb/registering/)
- **Suggested issue title:** `Add missing photo requirements to National registration page (no white, no sleeveless clothing)`

---

### F-057 · Tier B · Update National registration page — governing Act and programme name are stale

- **Where:** `src/content/national-registration.md` lines 9–16 (broadly)
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW/MEDIUM — citizens can still register; the stale terminology ("National Registration Number", no mention of Identity Management Act 2021) undermines accuracy and trust. A citizen told they need a "National Registration Number" may be confused when the EBC uses "Trident ID" and "Barbados Identity Management Act 2021" language.
- **What's wrong:** The page uses the terminology of the superseded Statistics Act regime ("National Registration"). The Barbados Identity Management Act 2021 replaced the Statistics Act, Cap. 192 and the Statistics (Registration Census of Barbadian Residents) Regulations 1979. The current programme is the "Trident" digital ID. The page does not name the governing Act.
- **Fix:** Update heading and body to reference the Barbados Identity Management Act 2021. Replace "National Registration Number" with "National Identification Number" or "Trident ID registration" (confirm preferred terminology with EBC). Add a brief sentence: "Registration is governed by the Barbados Identity Management Act 2021, which replaced the Statistics Act, Cap. 192."
- **Source:** [EBC — FAQs About Registration](https://www.ebc.gov.bb/faqs-about-registration/); [EBC — Barbados Identity Management Act (PDF)](https://www.ebc.gov.bb/wp-content/uploads/2021/09/Barbados-Identity-Management-Act.pdf); [GIS — Ministerial Statement On Barbados National Identity Programme](https://gisbarbados.gov.bb/blog/ministerial-statement-on-barbados-national-identity-programme/)
- **Suggested issue title:** `Update National registration page — governing Act is Identity Management Act 2021 (not Statistics Act); programme is now "Trident ID"`

---

### F-058 · Tier C · Verify EBC fax number on National registration page

- **Where:** `src/content/national-registration.md` line 33
- **Confidence it's wrong:** 65%
- **Citizen impact:** LOW — fax is not a primary contact channel; but a dead fax line on an official page is a trust signal.
- **What's wrong:** Page lists fax (246) 535-4863. The EBC's own contact page (ebc.gov.bb/contact/) does not list any fax number. The number is not found on any current EBC-controlled URL. It appears only in the gov.bb source page and older third-party directories.
- **Fix:** Contact the EBC (ebcsupport@barbados.gov.bb or (246) 535-4800) to confirm whether (246) 535-4863 is a current fax line. If decommissioned, remove from the page.
- **Source:** [EBC — Contact](https://www.ebc.gov.bb/contact/) — fax absent; checked: [ebc.gov.bb site search for "535-4863"](https://www.ebc.gov.bb/) — no match
- **Suggested issue title:** `Verify EBC fax number on National registration page — (246) 535-4863 not confirmed on ebc.gov.bb`

---

### F-059 · Tier B · Fix agency name in frontmatter description on business mail redirection page

- **Where:** `src/content/post-office-redirection-business/index.md` line 3
- **Confidence it's wrong:** 95%
- **Citizen impact:** LOW — the frontmatter `description` field propagates into search engine snippets and social previews; body copy on the same page is correct
- **What's wrong:** The `description` field reads "Tell the Barbados Post Office to redirect your business mail…". The canonical name, confirmed by bps.gov.bb and gov.bb, is "Barbados Postal Service" (not "Barbados Post Office"). This same error was previously flagged on the EZPay page (F-019).
- **Fix:** Change "Barbados Post Office" to "Barbados Postal Service" in the `description` frontmatter field.
- **Source:** [bps.gov.bb — Home](https://bps.gov.bb/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- **Suggested issue title:** `Fix agency name in frontmatter: "Barbados Post Office" → "Barbados Postal Service" on business mail redirection page`

---

### F-060 · Tier A · Remove copy-paste "other persons" field from business mail redirection start.md

- **Where:** `src/content/post-office-redirection-business/start.md` line 21
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a business applicant using the online form will encounter a field asking for "name(s) of every other person who also wants to redirect their mail", which makes no sense in a business context. This will cause confusion and may lead to form abandonment or incorrect data entry.
- **What's wrong:** Line 21 reads "name(s) of every other person who also wants to redirect their mail". This field is copied verbatim from `src/content/post-office-redirection-individual/start.md` and is appropriate for household members, not for a business. The corresponding `index.md` "What you will need to share" section (lines 44–51) does not include this field.
- **Fix:** Remove line 21 from `start.md`. Review the entire `start.md` file against the individual redirection `start.md` for any other carried-over fields that do not apply to a business context.
- **Source:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — business requirements: company name in capitals + company stamp; no "other persons" field; `src/content/post-office-redirection-business/index.md` lines 44–51 — does not list this field
- **Suggested issue title:** `Remove copy-paste "other persons" field from business mail redirection start.md (line 21)`

---

### F-061 · Tier C · Verify 6-month duration limit for business mail redirection

- **Where:** `src/content/post-office-redirection-business/index.md` lines 15 and 67
- **Confidence it's wrong:** unknown — cannot confirm or contradict from public web
- **Citizen impact:** MEDIUM — a business acting on a 6-month duration will plan mail-address update communications accordingly; if the actual permitted period differs, mail delivery will fail at expiry
- **What's wrong:** The page states "A redirection notice will last for 6 months" and "Your redirection notice will last for a maximum of 6 months." The BPS change-of-address page (bps.gov.bb/change-of-address/) does not state any duration for the service. The form PDF could not be parsed (binary). No GIS or gov.bb source corroborates or contradicts the 6-month figure.
- **Fix:** Contact BPS customer services — (246) 535-3956 or customerservice@bps.bb — to confirm the maximum permitted duration of a business redirection. Update the page and add a BPS source citation.
- **Source:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no duration stated; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Suggested issue title:** `Verify 6-month duration claim for business mail redirection — no BPS source confirms this figure`

---

### F-062 · Tier C · Verify Certificate of Incorporation and National ID requirements for business mail redirection

- **Where:** `src/content/post-office-redirection-business/index.md` lines 57–59
- **Confidence it's wrong:** unknown — unverifiable from public web, not contradicted
- **Citizen impact:** HIGH — a business representative arriving without their Certificate of Incorporation or National ID will be turned away if genuinely required; unnecessary friction if not required
- **What's wrong:** The page states applicants must (1) verify identity with a National ID card and (2) present the Certificate of Incorporation with official stamp. The BPS change-of-address page mentions only the company stamp (with signature) as a business identifier — no National ID card or Certificate of Incorporation are mentioned in any BPS-published guidance.
- **Fix:** Contact BPS (customerservice@bps.bb or (246) 535-3956) to confirm exactly what documents must be presented at the counter for a business redirection. Update the page to match confirmed requirements and cite the BPS source.
- **Source:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — company stamp only, no Certificate of Incorporation or NID; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Suggested issue title:** `Verify Certificate of Incorporation and National ID requirements for business mail redirection — not in BPS published guidance`

---

### F-063 · Tier B · Replace "BTA" with current tourism body name on Ports of Entry page

- **Where:** `src/content/ports-of-entry.md` line 11
- **Confidence it's wrong:** 80%
- **Citizen impact:** LOW — visitors still receive the entertainment; this is an accuracy and credibility issue for a government page.
- **What's wrong:** Page says entertainment is "organized by the BTA." The Barbados Tourism Authority (BTA) was restructured in 2014 into two successor bodies: Barbados Tourism Marketing Inc. (BTMI) and the Barbados Tourism Product Authority (BTPA). The acronym "BTA" has no current official standing. The responsible successor is most likely BTMI (the marketing/tourism-experience body) but should be confirmed with Barbados Port Inc. or BTMI directly.
- **Fix:** Replace "the BTA" with "the BTMI (Barbados Tourism Marketing Inc.)" — or the correct body if confirmed otherwise.
- **Source:** [tourism.gov.bb — Agencies](https://www.tourism.gov.bb/About/Agencies/); [corporate.visitbarbados.org — Our Company](https://corporate.visitbarbados.org/our-company/)
- **Suggested issue title:** `Update "BTA" to current tourism body name on Ports of Entry page (BTA restructured into BTMI/BTPA in 2014)`

---

### F-064 · Tier B · Fix Port Saint Charles coastal description: "western coast" → "northwest coast"

- **Where:** `src/content/ports-of-entry.md` line 21
- **Confidence it's wrong:** 75%
- **Citizen impact:** LOW — a visitor will not miss the port; geographic accuracy issue.
- **What's wrong:** Page describes Port St. Charles as "situated on the western coast of Barbados." The official Port St. Charles website (portstcharles.com) consistently uses "northwest coast of Barbados." Saint Peter parish occupies the upper northwest of the island; "western coast" is imprecise.
- **Fix:** Change "western coast" to "northwest coast".
- **Source:** [portstcharles.com — Home](https://www.portstcharles.com/) — "Located on the beautiful northwest coast of Barbados"; [visitbarbados.org — Port St. Charles](https://www.visitbarbados.org/port-st-charles)
- **Suggested issue title:** `Fix Port Saint Charles coastal description on Ports of Entry page: "western coast" → "northwest coast"`

---

### F-065 · Tier B · Fix Port Saint Charles bedroom count: "five bedroom" → "six bedroom"

- **Where:** `src/content/ports-of-entry.md` line 21
- **Confidence it's wrong:** 75%
- **Citizen impact:** LOW — informational description; factually incorrect per the official property website.
- **What's wrong:** Page says "our luxury homes vary from one bedroom to five bedroom homes." The official Port St. Charles website lists 6-bedroom units in its villa-rental section. Multiple independent villa-rental aggregators confirm the maximum is 6 bedrooms.
- **Fix:** Change "five bedroom homes" to "six bedroom homes".
- **Source:** [portstcharles.com — Villa Rentals](https://www.portstcharles.com/villa-rentals) — lists 6-bedroom unit; [insandoutsbarbados.com — Port St. Charles](https://www.insandoutsbarbados.com/listing/port-st-charles) — "one-bedroom apartments to six-bedroom villas"
- **Suggested issue title:** `Fix Port Saint Charles bedroom count on Ports of Entry page: "five bedroom" → "six bedroom"`

---

### F-066 · Tier A · Fix "lasting power of attorney" on deceased mail redirection start page

- **Where:** `src/content/post-office-redirection-deceased/start.md` line 20
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a citizen reading only `start.md` before visiting the Post Office will arrive with a power of attorney document that (a) is legally void on the death of the grantor and (b) does not exist as a "lasting" form in Barbados statute. They will be turned away. The correct documents — Letters Testamentary or Letters of Administration — are correctly stated in `index.md`, making the two files internally contradictory.
- **What's wrong:** `start.md` line 20 lists "proof you have lasting power of attorney" as a required document. This is wrong on two grounds: (1) a power of attorney terminates at the death of the grantor, so it cannot authorise anyone to act on behalf of a deceased person's estate; (2) Barbados has no statutory framework for "lasting" or "enduring" powers of attorney — ordinary PoA exists but is automatically revoked on death or incapacity (confirmed by STEP country assessment). The correct authority documents are Letters Testamentary (if there is a will) or Letters of Administration (if there is no will), both issued by the Supreme Court Probate Unit.
- **Fix:** Replace "proof you have lasting power of attorney" with "proof you have authority to act on behalf of the deceased person — either Letters Testamentary (if there is a will) or Letters of Administration (if there is no will), obtained from the Supreme Court." Align `start.md` with the correct description already in `index.md` lines 20–24 and 60.
- **Source:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit); [STEP — Power of Attorney in Barbados](https://www.step.org/mental-capacity/public/what-power-attorney-or-power-representation-can-i-get-one-where-i-live)
- **Suggested issue title:** `Fix "lasting power of attorney" on deceased mail redirection start page — wrong document; correct documents are Letters Testamentary / Letters of Administration`

---

### F-067 · Tier C · Verify 6-month duration and BDS$13 fee for deceased mail redirection

- **Where:** `src/content/post-office-redirection-deceased/index.md` lines 11, 42, 52, 66
- **Confidence it's wrong:** unknown — the 6-month duration and BDS$13 fee cannot be confirmed or contradicted from public BPS sources
- **Citizen impact:** MEDIUM — a citizen who plans estate administration around a 6-month mail window may find mail stopping sooner or later than expected. An incorrect fee could cause a visit to be wasted.
- **What's wrong:** The page states twice that "A redirection notice will last for 6 months" and that the fee is "$13 BBD". The BPS change-of-address page (bps.gov.bb/change-of-address/) confirms BDS$13 for domestic customers but does not list a separate category or fee for deceased-estate redirections. No BPS source confirms the 6-month duration for any redirection category. The figures may be correct but cannot be verified from the public web.
- **Fix:** Contact BPS customer services — (246) 535-3956 or customerservice@bps.bb — to confirm: (1) the maximum duration of a deceased-estate mail redirection; (2) whether the BDS$13 domestic rate applies to this category or a different fee applies. Add a source citation once confirmed.
- **Source:** [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms BDS$13 domestic rate; no duration; no deceased-estate category; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — PDF not machine-readable
- **Suggested issue title:** `Verify 6-month duration and BDS$13 fee for deceased mail redirection — not confirmed in any BPS public source`

---

### F-068 · Tier A · Fix agency name in frontmatter description on individual mail redirection page

- **Where:** `src/content/post-office-redirection-individual/index.md` line 3
- **Confidence it's wrong:** 95%
- **Citizen impact:** LOW — the frontmatter `description` propagates into search engine snippets and social previews; body copy on the same page correctly uses "Barbados Postal Service"
- **What's wrong:** The `description` field reads "Tell the Barbados Post Office to redirect your personal mail…". The canonical name, confirmed by bps.gov.bb and gov.bb, is "Barbados Postal Service". Same error as F-019 (EZPay) and F-059 (business mail).
- **Fix:** Change "Barbados Post Office" to "Barbados Postal Service" in the `description` frontmatter field.
- **Source:** [bps.gov.bb — Home](https://bps.gov.bb/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- **Suggested issue title:** `Fix agency name in frontmatter: "Barbados Post Office" → "Barbados Postal Service" on individual mail redirection page`

---

### F-069 · Tier A · Fix eligibility age threshold on individual mail redirection page: 18 → 16

- **Where:** `src/content/post-office-redirection-individual/index.md` lines 12–13 and 60
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a 16- or 17-year-old living independently cannot redirect their mail if they follow the page's instruction; a household with only 16–17-year-old adults would incorrectly believe they are ineligible
- **What's wrong:** Page states "If you are an adult (18 years old or over), you can complete a redirection form" and "Everyone who is 18 years old and over … must visit any Post Office." The BPS change-of-address page explicitly states "all persons over the age of sixteen years old, residing in the same household must write their names and sign the redirection form." The threshold is 16, not 18.
- **Fix:** Change "18 years old or over" to "16 years old or over" on lines 12–13. Change "Everyone who is 18 years old and over" to "Everyone who is 16 years old and over" on line 60. Also reconsider the "dependants are: children under 18" definition on line 15 — if signing threshold is 16, dependants may more precisely be "children under 16."
- **Source:** [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — "all persons over the age of sixteen years old … must write their names and sign"; [BPS — General Client page 2](https://bps.gov.bb/category/general-client/page/2/)
- **Suggested issue title:** `Fix eligibility age threshold on personal mail redirection page: "18 years old" → "16 years old" (BPS threshold is 16)`

---

### F-070 · Tier A · Add missing BDS $13 fee to individual mail redirection page

- **Where:** `src/content/post-office-redirection-individual/index.md` — absent from the entire file; `src/content/post-office-redirection-individual/start.md` — also absent
- **Confidence it's wrong:** 90% (fee published by BPS, missing from page)
- **Citizen impact:** HIGH — citizens who arrive at the Post Office without BDS $13 will be turned away. The sibling business page correctly discloses "$30 BBD" in two places; the individual page omits its fee entirely.
- **What's wrong:** The BPS charges BDS $13.00 for domestic/individual change-of-address applications (confirmed at bps.gov.bb/change-of-address/). No fee is disclosed anywhere on `index.md` or `start.md`. The paper-form section and the in-person visit section both omit payment information.
- **Fix:** Add fee disclosure in at least two places: (1) the paper form option — "You can pay the BDS $13.00 by credit or debit card, or in cash, at the Post Office."; (2) the in-person visit section — "You will need to pay BDS $13.00 when you visit." Mirror the phrasing from `post-office-redirection-business/index.md` line 40.
- **Source:** [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — "Domestic customers: BDS$13.00"; [BPS — General Client page 2](https://bps.gov.bb/category/general-client/page/2/)
- **Suggested issue title:** `Add missing BDS $13 fee to individual mail redirection page — fee published by BPS but not disclosed anywhere`

---

### F-071 · Tier A · Add "National ID Card" to body copy on Get a reminder before a document expires page

- **Where:** `src/content/renew-reminder/index.md` line 17
- **Confidence it's wrong:** 97%
- **Citizen impact:** MEDIUM — a citizen whose National ID Card is expiring may read the start page, see no mention of National ID Cards, and conclude the service does not apply to them — then not set a reminder.
- **What's wrong:** The body text reads "driver's licence, vehicle registration, passport, or other government permit." The live form at `/travel-id-citizenship/renew-reminder/form` lists "National ID Card — Barbados National Identification Card" as its first selectable document type. The `content-directory.ts` description for this page (lines 448–449) correctly includes "National ID Card". The frontmatter `keywords` field (line 11) also includes "national ID". The omission is in the start-page body copy only.
- **Fix:** Change line 17 to read: "Use this service to set a free reminder before your driver's licence, vehicle registration, passport, National ID Card, or other government permit runs out."
- **Source:** [live form — /travel-id-citizenship/renew-reminder/form](https://alpha.gov.bb/travel-id-citizenship/renew-reminder/form); [Report: renew-reminder.md](/docs/fact-check/renew-reminder.md) Claim 1
- **Suggested issue title:** `Add "National ID Card" to body copy on Get a reminder before a document expires page (present in form but missing from start-page text)`

---

### F-072 · Tier A · Fix age eligibility upper bound on YDP Community Sports Training programme page: "30 and under" → "9 to 29"

- **Where:** `src/content/register-for-community-sports-training-programme/index.md` lines 3 (frontmatter description) and 9 (body)
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a 30-year-old who registers in good faith expecting to be accepted may be turned away by Youth Commissioners who follow the official 9–29 mandate.
- **What's wrong:** The page states "Open to residents aged 30 and under" and "Anyone living in Barbados, aged 30 and under, can register." The YDP's published mandate is "nine (9) to twenty-nine (29)" — confirmed across youthaffairs.gov.bb/about-youth-development-programme/, the YDP Director's Message, and multiple gov.bb pages. "30 and under" is one year beyond the programme's stated upper bound.
- **Fix:** Change "aged 30 and under" to "aged 9 to 29" (or "between the ages of 9 and 29") in both the frontmatter description and body copy. If the community sports programme intentionally extends to age 30, confirm this in writing with the Division of Youth Affairs before publishing.
- **Source:** [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — "nine (9) to twenty-nine (29)"; [youthaffairs.gov.bb — YDP Director's Message](https://youthaffairs.gov.bb/messages/ydp-directors-message/) — "nine (9) to twenty-nine (29) age group"
- **Suggested issue title:** `Fix age eligibility on YDP Community Sports Training programme page: "30 and under" should be "9 to 29" per YDP mandate`

---

### F-073 · Tier B · YDP programme link leads to page with no current sports listings

- **Where:** `src/content/register-for-community-sports-training-programme/index.md` line 46
- **Confidence it's wrong:** 70%
- **Citizen impact:** MEDIUM — a citizen who follows the link to find current sports programmes will see only non-sports workshops; they may conclude no sports programmes are running and abandon the registration process.
- **What's wrong:** The page directs citizens to `https://youthaffairs.gov.bb/programme-channels/youth-development-programme/` for "a list of current programmes." As of 2026-05-28 that page lists only non-sports content (web design, cyber security, entrepreneurship, arts, fatherhood workshop). No community sports training programme appears in the listing.
- **Fix:** Add the Division of Youth Affairs contact page (`https://youthaffairs.gov.bb/contact-us/`) as a supplementary link so citizens can enquire directly when no sports listing is visible. Alternatively confirm with MYSCE whether a dedicated sports programme listing URL exists and replace the current link.
- **Source:** [youthaffairs.gov.bb — Youth Development Programme channel](https://youthaffairs.gov.bb/programme-channels/youth-development-programme/) — page content confirmed via WebFetch 2026-05-28; no sports listing present
- **Suggested issue title:** `YDP programme link on community sports page shows no sports listings — supplement with contact page link or replace with correct URL`

---

### F-074 · Tier B · Update link text "CAIPO WEBSITE" — agency rebranded to Business Barbados (February 2025)

- **Where:** `src/content/registering-a-business-name.md` line 13
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — the URL (`https://caipo.gov.bb/`) still resolves correctly; a citizen following the link reaches the correct site. The wrong name is an accuracy and trust issue, not a misdirection risk.
- **What's wrong:** Link text reads "CAIPO WEBSITE". The Corporate Affairs and Intellectual Property Office completed its transition to the entity "Business Barbados" on 1 February 2025. The `caipo.gov.bb` homepage now identifies itself as "Business Barbados: Digital Platform for Corporate Affairs Services" under the Ministry of Energy and Business Development. The CAIPO acronym no longer appears on the homepage.
- **Fix:** Change link text from "CAIPO WEBSITE" to "Business Barbados website". Optionally add a parenthetical "(formerly CAIPO — Corporate Affairs and Intellectual Property Office)" on first use. No URL change needed.
- **Source:** [caipo.gov.bb — homepage](https://caipo.gov.bb/); [Nation News — CAIPO now part of Business Barbados (2 Feb 2025)](https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/); [CBC — CAIPO officially completes transition (16 Sep 2025)](https://www.cbc.bb/news/local-news/caipo-officially-completes-transition-to-business-barbados/)
- **Suggested issue title:** `Update "CAIPO WEBSITE" link text on Registering a business name page — agency rebranded to Business Barbados (February 2025)`

---

### F-075 · Tier B · Fix ministry attribution for "Registering a business name" in ministries.ts (MIIST → Ministry of Energy and Business Development)

- **Where:** `src/data/ministries.ts` lines 736–740 (onlineServices entry under `ministry-of-industry-innovation-science-and-technology`)
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — if the page is surfaced via the MIIST ministry profile, citizens receive MIIST contact details (phone: (246) 535-1200) rather than Ministry of Energy and Business Development contact details (phone: (246) 535-2500). A citizen seeking help with business registration who calls MIIST will reach the wrong ministry.
- **What's wrong:** `registering-a-business-name` is listed as an `onlineServices` entry under `ministry-of-industry-innovation-science-and-technology`. Business Barbados (formerly CAIPO) moved to the **Ministry of Energy and Business Development** in February 2025. The gov.bb `/ministries/energy-water-resources` page places CAIPO under that ministry; the caipo.gov.bb homepage footer identifies "Ministry of Energy, Business Development and Consumer Affairs" as the responsible ministry. The same fix likely applies to `start-a-business`.
- **Fix:** Move the `registering-a-business-name` entry from MIIST's `onlineServices` array to the `ministry-of-energy-and-business-development` `onlineServices` array. Also update `src/data/departments.ts` (lines 336–378) and `src/data/state-bodies.ts` (lines 480–513) to reflect the Business Barbados rebrand — rename "Corporate Affairs and Intellectual Property Office (CAIPO)" to "Business Barbados (formerly CAIPO — Corporate Affairs and Intellectual Property Office)". Confirm `start-a-business` attribution with the same fix.
- **Source:** [gov.bb — Ministry of Energy and Business Development](https://www.gov.bb/ministries/energy-water-resources); [caipo.gov.bb — homepage footer](https://caipo.gov.bb/); [Nation News — CAIPO now part of Business Barbados (2 Feb 2025)](https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/)
- **Suggested issue title:** `Fix ministries.ts: move "Registering a business name" from MIIST to Ministry of Energy and Business Development (CAIPO rebranded to Business Barbados, Feb 2025)`

---

### F-076 · Tier B · Fix President's title on centenarian visit page — missing "The Most Honourable" honorific

- **Where:** `src/content/request-a-presidential-visit-for-a-centenarian/index.md` line 8
- **Confidence it's wrong:** 80%
- **Citizen impact:** LOW — the right person is named; this is a formal-title accuracy issue, not a misdirection risk. However, a government service page should use the correct presidential honorific.
- **What's wrong:** Page refers to the President as "Lieutenant Colonel Jeffrey Bostic." Since taking office on 30 November 2025, his formal style is "The Most Honourable Jeffrey Bostic" or in full "Lieutenant Colonel the Most Honourable Jeffrey Bostic." GIS press releases, CBC, and all official sources use "The Most Honourable" as the presidential honorific. No current Government of Barbados page uses the bare military-rank-only form to refer to the sitting President.
- **Fix:** Change "Lieutenant Colonel Jeffrey Bostic" to "The Most Honourable Jeffrey Bostic" (preferred for running text), or "Lieutenant Colonel the Most Honourable Jeffrey Bostic" if the full title is desired. Confirm preferred house style with the Office of the President or Cabinet Office.
- **Source:** [CBC — Lt. Col. Jeffrey Bostic officially declared as next President](https://www.cbc.bb/news/local-news/lt-col-jeffrey-bostic-officially-declared-as-next-president-of-barbados/); [Advomag — The Most Honourable Lieutenant Colonel Jeffrey Bostic](https://advomag.com/the-most-honourable-lieutenant-colonel-jeffrey-bostic-to-be-barbados-second-president/)
- **Suggested issue title:** `Fix President's title on centenarian visit page: add "The Most Honourable" honorific`

---

### F-077 · Tier A · Replace "Child Care Board (CCB)" with "Social Empowerment Agency (SEA)" on child concern page

- **Where:** `src/content/report-a-concern-about-a-child.md` lines 9, 25, 27, 63, 65, 71
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — the CCB was dissolved into the SEA on 2 January 2026. Every mention of "Child Care Board" and "CCB" on this page is now stale. A citizen searching online for "Social Empowerment Agency" will not find this page. A citizen following the page instructions to contact "the Child Care Board" may reach a transitional or discontinued channel.
- **What's wrong:** The page consistently refers to the "Child Care Board (CCB)" and "CCB officers". The Social Empowerment Agency (SEA), launched 2 January 2026, merged the Child Care Board, Welfare Department, National Assistance Board, National Disabilities Unit, and Resilience and Reintegration Unit. As of April 2026 the agency runs child abuse awareness and response work under the "Social Care Delivery and Support Directorate" at the SEA. The childcareboard.gov.bb site and childcareboard@barbados.gov.bb email appear to still be live but should be confirmed as the SEA's active child protection contact points before they are updated or retained on the page.
- **Fix:** Replace all instances of "Child Care Board (CCB)" with "Social Empowerment Agency (SEA)"; replace "CCB officers" with "SEA child care officers"; confirm with the SEA whether phone (246) 535-2800 and email childcareboard@barbados.gov.bb remain the active child protection reporting contacts, and update accordingly.
- **Source:** [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/); [Bajan Reporter — SEA launches Child Abuse Awareness Month (Apr 2026)](https://www.bajanreporter.com/2026/04/social-empowerment-agency-launches-child-abuse-awareness-prevention-month-activities/)
- **Suggested issue title:** `Update "Child Care Board (CCB)" → "Social Empowerment Agency (SEA)" throughout Report a concern about a child page`

---

### F-078 · Tier B · Fix police address on child concern page: "Roebuck Street" → "Lower Roebuck Street"

- **Where:** `src/content/report-a-concern-about-a-child.md` line 39
- **Confidence it's wrong:** 80%
- **Citizen impact:** LOW — omission of "Lower" is a minor directional imprecision. However, gov.bb, the OAG, and govserv.org all consistently use "Lower Roebuck Street."
- **What's wrong:** The page lists "Roebuck Street" as the Barbados Police Service headquarters address. Every authoritative source uses "Lower Roebuck Street, Bridgetown, St. Michael."
- **Fix:** Change "Roebuck Street" to "Lower Roebuck Street".
- **Source:** [gov.bb — The Police Department](https://www.gov.bb/Departments/police-department); [OAG — The Barbados Police Service](https://oag.gov.bb/Departments/Police/)
- **Suggested issue title:** `Fix police address on Report a concern about a child page: "Roebuck Street" → "Lower Roebuck Street"`

---

### F-079 · Tier C · Verify or remove "under 5 / 24-hour investigation" and "serious danger / immediate" response-time standards

- **Where:** `src/content/report-a-concern-about-a-child.md` lines 64–67
- **Confidence it's wrong:** unknown — no authoritative source found confirming or denying these specific standards
- **Citizen impact:** HIGH — these are specific operational commitments on a child safety page. If the response times are not a published standard, a citizen whose child is not attended to within the stated timeframe may not escalate.
- **What's wrong:** The page states "in serious danger, CCB officers attend immediately with the police" and "under 5, CCB officers begin their investigation in less than 24 hours." Neither standard appears in any published government source — not on childcareboard.gov.bb, gov.bb, GIS, or reporting on the new Protection of Children Act (2026). The 24-hour reference in CCB sources refers to the mandatory *reporting* obligation on professionals (reporters must report within 24 hours), not an agency response-time standard.
- **Fix:** Confirm these response standards with the Social Empowerment Agency (SEA). If published, cite the source. If unpublished operational policy, revise to more conservative language. If unconfirmed, remove the specific time commitments.
- **Source checked:** [childcareboard.gov.bb — Reporting Child Abuse](https://childcareboard.gov.bb/reporting-child-abuse/); [Nation News — Neglect tops child abuse cases (Apr 2026)](https://nationnews.com/2026/04/10/neglect-tops-child-abuse-cases/)
- **Suggested issue title:** `Verify or remove response-time standards ("serious danger/immediate" and "under 5/24 hours") on Report a concern about a child page`

---

### F-080 · Tier A · Replace "National Assistance Board" with "Social Empowerment Agency (SEA)" on Report elderly abuse page

- **Where:** `src/content/report-elderly-abuse.md` lines 27, 54
- **Confidence it's wrong:** 90%
- **Citizen impact:** HIGH — the National Assistance Board was dissolved 2 January 2026 and merged into the Social Empowerment Agency (SEA). A citizen directed to the "National Assistance Board" will encounter a dissolved body. While the 535-3131 number still rings at Murrell House (now an SEA location), the wrong agency name undermines trust and may prevent a citizen from obtaining help.
- **What's wrong:** Line 27 says "Go to, call or email the National Assistance Board" and line 54 says "The police or the National Assistance Board will do an assessment." The NAB is no longer a separate entity — it is part of the SEA as of 2 January 2026.
- **Fix:** Replace "National Assistance Board" with "Social Empowerment Agency (SEA)" in both places. Consider adding "(formerly the National Assistance Board)" on first use. Also update the address heading (line 29) from "National Assistance Board" to "Social Empowerment Agency (SEA)".
- **Source:** [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/); [Barbados Today — Abusing elderly (21 Apr 2026)](https://barbadostoday.bb/2026/04/21/abusing-elderly-could-bring-100k-fine-jail-under-new-bill/)
- **Suggested issue title:** `Update "National Assistance Board" → "Social Empowerment Agency (SEA)" on Report elderly abuse page (NAB dissolved Jan 2026)`

---

### F-081 · Tier B · Add missing building name "Murrell House" to address on Report elderly abuse page

- **Where:** `src/content/report-elderly-abuse.md` lines 29–32
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — omitting the building name "Murrell House" makes the address harder to locate on a map or by asking directions. Three independent authoritative sources (gov.bb, connectb1m.com, centenariansofbarbados.com) all lead with "Murrell House" as the building name. The current address also abbreviates "Road" as "Rd" and includes "Bridgetown" which does not appear in any authoritative source for this address.
- **What's wrong:** Page shows "Country Rd / National Assistance Board / Bridgetown / Saint Michael". All three Tier 1/2 sources give "Murrell House, Country Road, St. Michael."
- **Fix:** Replace the address block with "Murrell House / Country Road / St. Michael". Make this fix in conjunction with F-080 (updating "National Assistance Board" to "Social Empowerment Agency (SEA)").
- **Source:** [gov.bb — The National Assistance Board](https://www.gov.bb/State-Bodies/national-assistance); [connectb1m.com — National Assistance Board](https://connectb1m.com/national-assistance-board/); [centenariansofbarbados.com — Services Directory](https://centenariansofbarbados.com/services-directory/)
- **Suggested issue title:** `Add building name "Murrell House" to address on Report elderly abuse page (Country Road, St. Michael)`

---

### F-082 · Tier C · Verify email `nab.department@barbados.gov.bb` on Report elderly abuse page — not in any authoritative source

- **Where:** `src/content/report-elderly-abuse.md` line 34
- **Confidence it's wrong:** unknown — could not confirm or contradict
- **Citizen impact:** HIGH — this is a contact email on a crisis-service page. If the inbox is unmonitored or has been retired following the SEA merger (2 January 2026), a carer or victim who emails receives no response. No gov.bb, GIS, NAB Facebook, or third-party directory source publishes this address.
- **What's wrong:** `nab.department@barbados.gov.bb` appears on the page but cannot be found in any authoritative source: not on gov.bb/State-Bodies/national-assistance (which lists no email), not in any GIS release, not on the NAB Facebook page, not in any third-party directory.
- **Fix:** Contact the Social Empowerment Agency (SEA) to confirm whether `nab.department@barbados.gov.bb` is a live, monitored inbox or has been replaced. If unconfirmed, remove the email and list phone-only contact until the correct SEA email is established.
- **Source checked:** [gov.bb — The National Assistance Board](https://www.gov.bb/State-Bodies/national-assistance) — no email listed; [gisbarbados.gov.bb — NAB tag](https://gisbarbados.gov.bb/blog/tag/national-assistance-board/) — no email; [connectb1m.com — NAB](https://connectb1m.com/national-assistance-board/) — no email; [centenariansofbarbados.com](https://centenariansofbarbados.com/services-directory/) — no email
- **Suggested issue title:** `Verify nab.department@barbados.gov.bb on Report elderly abuse page — email not confirmed by any authoritative source; may be inactive post-SEA merger`

---

### F-083 · Tier B · Fix NCC address on beach-park vendor licence page: "Bridgetown" → "Waterford"

- **Where:** `src/content/sell-goods-services-beach-park/index.md` lines 30–32
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a citizen posting a paper application addressed to "Codrington Road, Bridgetown" rather than "Codrington Road, Waterford" may experience mail delivery delays; using the address in a mapping app will not reliably locate the NCC under "Bridgetown".
- **What's wrong:** The page gives the NCC address as "Codrington Road, Bridgetown, Saint Michael". Multiple independent Tier 1 and Tier 2 sources give the locality as "Waterford", not "Bridgetown": gov.bb/State-Bodies/national-conservation-commission (no "Bridgetown" — building is "Codrington House"); BARP Business Directory ("Codrington Road, Waterford, Saint Michael, BB11042"); mapcarta/OpenStreetMap data ("Codrington Road, Waterford, Saint Michael, BB11042"); GIS NCC location page title ("National Conservation Commission — Codrington House") confirms no "Bridgetown" qualifier.
- **Fix:** Change line 31 from "Bridgetown," to "Waterford,". Full corrected address: "Codrington Road, / Waterford, / Saint Michael".
- **Source:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission); [BARP Business Directory — NCC](https://barpmember.com/directory/directory/national-conservation-commission/); [mapcarta — NCC Headquarters](https://mapcarta.com/N5219008439)
- **Suggested issue title:** `Fix NCC address on beach/park vendor licence page: "Bridgetown" → "Waterford" (Codrington Road, Waterford, Saint Michael)`

---

### F-084 · Tier C · Verify all four NCC vendor licence fee amounts on beach-park page

- **Where:** `src/content/sell-goods-services-beach-park/index.md` lines 70–77
- **Confidence it's wrong:** unknown — fee figures are internally VAT-consistent but no NCC public source publishes them
- **Citizen impact:** HIGH — a vendor arriving at the NCC Accounts Department with the wrong amount will be unable to collect their licence documentation that day.
- **What's wrong:** The page lists four fees including VAT: Licence $117.50, Watersports licence $176.25, Licence book $11.75, ID badge $12.87. The NCC's "Fees & Licenses" page (nccbarbados.com/process-for-using-nccs-facilities/) does not publish specific dollar amounts. The renewal notice for July 2024–June 2025 directs vendors to the Accounts Department for pricing. The figures cannot be confirmed or contradicted from any public NCC source.
- **Fix:** Contact NCC Accounts Department — (246) 536-0617 or ncc@ncc.gov.bb — to confirm the current fee schedule for regular licence, watersports licence, licence book, and ID badge. Update the page with confirmed figures and add "Fees last verified: [date]".
- **Source checked:** [nccbarbados.com — Fees & Licenses](https://www.nccbarbados.com/process-for-using-nccs-facilities/) — no dollar amounts; [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "contact Accounts Department for pricing"; [BRA — VAT Rates](https://bra.gov.bb/Popular-Topics/Value-Added-Tax/VAT-Rates) — 17.5% standard rate confirmed
- **Suggested issue title:** `Verify NCC vendor licence fees on beach/park licence page — not published in any NCC public source; confirm with Accounts Dept`

---

### F-085 · Tier C · Verify referee and testimonial requirements on beach-park vendor licence page

- **Where:** `src/content/sell-goods-services-beach-park/index.md` lines 46–49; `start.md` lines 17–20
- **Confidence it's wrong:** unknown — not contradicted, but not confirmed by any NCC public source
- **Citizen impact:** MEDIUM — a vendor who omits the referee details or testimonials from their application will have their application rejected or delayed.
- **What's wrong:** The page requires 2 referees (one professional, one personal) and 2 separate testimonials. No NCC public source — nccbarbados.com, gov.bb NCC page, GIS beach-vending article, or the NCC renewal notice — mentions referees or testimonials. The only documented requirements for new applications (per GIS) are a police certificate of character and information about the proposed beach/business.
- **Fix:** Contact NCC at (246) 536-0617 or ncc@ncc.gov.bb to confirm whether the current application form requires referees and testimonials. If confirmed, add a source citation. If requirements have changed, update the page.
- **Source checked:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission); [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/); [GIS — Beach Vending](https://gisbarbados.gov.bb/blog/beach-vending/) (403); [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/)
- **Suggested issue title:** `Verify referee and testimonial requirements on beach/park vendor licence page — not confirmed by any NCC public source`

---

### F-086 · Tier A · Remove "Analytical Services" category label from Start a business page

- **Where:** `src/content/start-a-business.md` lines 15–18
- **Confidence it's wrong:** 98%
- **Citizen impact:** LOW — the label is visible to citizens and refers to an unrelated government laboratory. Trust and accuracy issue.
- **What's wrong:** Lines 15–18 contain `### Category` followed by `* Analytical Services`. This is an internal gov.bb content-taxonomy field for the Analytical Services Department — a laboratory/technical body under MIST at Culloden Road, St. Michael, headed by Dr. Beverley P. Wood. It has no connection to business facilitation or Invest Barbados. The label renders as citizen-facing content on the live alpha.gov.bb page (`https://alpha.gov.bb/business-trade/start-a-business`).
- **Fix:** Delete lines 15–18 from `src/content/start-a-business.md` (the `### Category\n\n*   Analytical Services` block). This metadata artefact was mechanically imported from gov.bb and should not appear in alpha.gov.bb content.
- **Source:** [gov.bb — Analytical Services Department](https://www.gov.bb/Departments/analytical-services) — confirms Analytical Services is a laboratory body with no connection to business registration; [alpha.gov.bb — Start a business](https://alpha.gov.bb/business-trade/start-a-business) — label confirmed visible to citizens
- **Suggested issue title:** `Remove "Analytical Services" category label from Start a business page — stale gov.bb metadata artefact`

---

### F-088 · Tier B · Broaden TAMIS heading and CTA: scope-limited to "income tax" when TAMIS covers all major taxes

- **Where:** `src/content/tax-online.md` lines 9, 20, 22
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — businesses and employers filing Corporate Income Tax, PAYE, VAT, or Withholding Tax must also use TAMIS. The heading "File My Income Tax Online" and button "FILE INCOME TAX" do not signal this. A citizen reading only the heading may not recognise that TAMIS is also their required portal for non-income-tax obligations.
- **What's wrong:** The heading and CTA restrict TAMIS to income tax only. BRA's own pages confirm TAMIS handles Corporate Income Tax, PAYE, Personal Income Tax, Withholding Tax, Betting and Gaming Fees, VAT, Excise Tax, and Premium Tax. The body description ("manage your taxes online") is already broader and correct; the heading contradicts it.
- **Fix:** Change `## File My Income Tax Online` to `## File and Pay Tax Online`. Change "Click the button below to file income tax." to "Click the button below to access TAMIS, where you can file and pay income tax, corporate tax, PAYE, VAT, withholding tax, and other taxes online." Change the button label from "FILE INCOME TAX" to "GO TO TAMIS".
- **Source:** [BRA — Pay/Income-Tax](https://bra.gov.bb/Pay/Income-Tax) — "Corporate Income Tax (CIT), Pay As You Earn (PAYE), Personal Income Tax (PIT), Withholding Tax (WHT) and Betting and Gaming Fees are filed and paid in TAMIS"; [BRA — Press Release: BRA Launches Phase 1 of New Tax System](https://bra.gov.bb/News/Press-Releases/BRA-Launches-Phase-1-of-New-Tax-Sy) — VAT, Excise, NSRL also confirmed in Phase 1
- **Suggested issue title:** `Broaden TAMIS heading and CTA on Tax online page — "income tax" should be "taxes" (TAMIS covers CIT, PAYE, VAT, WHT and more)`

---

### F-089 · Tier C · Fix frontmatter `section` mismatch on Tax online page ("Work and Employment" → "Money and Financial Support")

- **Where:** `src/content/tax-online.md` line 6
- **Confidence it's wrong:** 95% (internal inconsistency — `content-directory.ts` is the structural authority)
- **Citizen impact:** LOW — if `section` is unused by the build, no visible impact; if it drives navigation or search facets it will surface the page under the wrong category.
- **What's wrong:** Frontmatter declares `section: "Work and Employment"`. The page is listed under the `money-financial-support` category in `src/data/content-directory.ts` (lines 262–268), producing the live URL `https://alpha.gov.bb/money-financial-support/tax-online`. The same mismatch was previously found on the EZPay page (see [ezpay.md](/home/gavin/frontend-alpha/docs/fact-check/ezpay.md) Additional findings).
- **Fix:** Change `section: "Work and Employment"` to `section: "Money and Financial Support"` to match the content-directory.ts category. Audit whether any other `money-financial-support` pages have a similar stale `section` value.
- **Source:** [`src/data/content-directory.ts`](/home/gavin/frontend-alpha/src/data/content-directory.ts) lines 228–291; [EZPay fact-check report](/home/gavin/frontend-alpha/docs/fact-check/ezpay.md) Additional findings — identical mismatch on that page
- **Suggested issue title:** `Fix frontmatter section on Tax online page: "Work and Employment" → "Money and Financial Support" (matches content-directory.ts)`

---

### F-090 · Tier A · Fix ministry name on Terms & Conditions page ("Ministry of Innovation, Science and Smart Technology" → "Ministry of Industry, Innovation, Science and Technology")

- **Where:** `src/content/terms-conditions.md` line 29
- **Confidence it's wrong:** 98%
- **Citizen impact:** MEDIUM — the only named responsible authority on the Terms & Conditions page is wrong. A citizen seeking to exercise data rights or escalate a complaint may contact the wrong body. The word "Industry" is missing and "Smart" does not appear in the official name.
- **What's wrong:** Page states "alpha.gov.bb is run by the Ministry of Innovation, Science and Smart Technology." The canonical name, confirmed on [gov.bb/Ministries](https://www.gov.bb/Ministries) and the ministry's own page [gov.bb — MIST](https://www.gov.bb/Ministries/innovation-science-smart-technology), is **"Ministry of Industry, Innovation, Science and Technology (MIST)"**.
- **Fix:** Change "Ministry of Innovation, Science and Smart Technology" to "Ministry of Industry, Innovation, Science and Technology (MIST)". Also consider noting that alpha.gov.bb is operated by GovTech Barbados Ltd. (see F-091).
- **Source:** [gov.bb — Ministries](https://www.gov.bb/Ministries); [gov.bb — Ministry of Industry, Innovation, Science and Technology](https://www.gov.bb/Ministries/innovation-science-smart-technology)
- **Suggested issue title:** `Fix ministry name on Terms & Conditions page: "Ministry of Innovation, Science and Smart Technology" → "Ministry of Industry, Innovation, Science and Technology (MIST)"`

---

### F-091 · Tier B · Clarify that alpha.gov.bb is operated by GovTech Barbados Ltd. (not directly by the ministry)

- **Where:** `src/content/terms-conditions.md` line 29
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — under the Data Protection Act 2019, citizens must be able to identify the data controller. If GovTech Barbados Ltd. is the data controller (as the operator of the site), the page should say so. Citizens who raise a data-subject request directed "to the Ministry" may find the request going to the wrong entity.
- **What's wrong:** The page says alpha.gov.bb is "run by" the ministry. GovTech Barbados Ltd. — a government-owned company incorporated 18 September 2023 under the Companies Act — is the entity that built and operates alpha.gov.bb. The ministry is the responsible portfolio minister, not the legal data controller.
- **Fix:** Clarify the sentence, e.g.: "alpha.gov.bb is operated by GovTech Barbados Ltd., a government-owned company working under the Ministry of Industry, Innovation, Science and Technology (MIST)." Confirm with GovTech's data protection officer which entity is registered as the data controller with the Data Protection Commission, then update the page accordingly.
- **Source:** [GovTech Barbados — About](https://govtech.bb/2024/04/16/hello-world/); [Barbados Today — GovTech Barbados launches alpha.gov.bb, Oct 2025](https://barbadostoday.bb/2025/10/18/govtech-barbados-launches-test-site-to-unify-simplify-public-services/); [gov.bb — Data Protection Commission](https://www.gov.bb/General/data-protection-commissioner)
- **Suggested issue title:** `Clarify data controller identity on Terms & Conditions page — alpha.gov.bb is operated by GovTech Barbados Ltd., not directly by the ministry`

---

### F-087 · Tier B · Verify Invest Barbados link destination (`investbarbados.org/starting-a-business-in-barbados/`)

- **Where:** `src/content/start-a-business.md` line 13
- **Confidence it's wrong:** 35% (link is likely live for human browsers; 403 is probably anti-bot only)
- **Citizen impact:** HIGH — this is the sole actionable item on the page. If it is broken, citizens have nowhere to go.
- **What's wrong:** `https://www.investbarbados.org/starting-a-business-in-barbados/` returns HTTP 403 Forbidden on programmatic fetch. The root domain also returns 403. The URL appears in the Google Search index and mirrors the gov.bb source page link, suggesting it is live for human browsers but blocked for bots. The content team should manually confirm the destination is current. Note also: Invest Barbados's statutory mandate under BIBPC Act CAP 340A is international investment promotion — domestic entrepreneurs may need Business Barbados / caipo.gov.bb instead. The page does not clarify which audience it serves.
- **Fix:** Manually verify the URL resolves in a standard browser. If live, optionally add Invest Barbados contact details as a fallback (Phone: (246) 626-2000; Email: info@investbarbados.org; Address: Trident Financial Centre, Hastings, Christ Church). Clarify in the page copy whether the Invest Barbados service is for international investors, domestic investors, or both.
- **Source:** [gov.bb — State Bodies: Invest Barbados](https://www.gov.bb/State-Bodies/invest-barbados) — confirms org, address, phone; [investbarbados.org — Starting a Business in Barbados](https://www.investbarbados.org/starting-a-business-in-barbados/) — URL in search index; [Report: start-a-business.md](/home/gavin/frontend-alpha/docs/fact-check/start-a-business.md) Claim 2
- **Suggested issue title:** `Verify Invest Barbados link on Start a business page — returns 403 on programmatic fetch; confirm live for human browsers and clarify audience (international vs. domestic investors)`

---

### F-092 · Tier A · Update Immigration Department address on Visa information page (Careenage House → BTI Corporate Centre)

- **Where:** `src/content/visa-information.md` lines 11–13
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — a citizen travelling to Careenage House, Wharf Road will not find the Immigration Department. The department relocated to BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael c. 2018–2020. This is the same issue previously flagged on `open-pharmacy.md` (F-00A); visa-information.md is a second instance.
- **What's wrong:** Page header reads "Careenage House / Wharf Road / Bridgetown / BARBADOS". All current Tier 1 sources confirm the address is BTI Corporate Centre, Princess Alice Highway.
- **Fix:** Replace the Careenage House heading and address block with "BTI Corporate Centre / Princess Alice Highway / Bridgetown BB11093 / St. Michael / BARBADOS".
- **Source:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx); [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration); [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/)
- **Suggested issue title:** `Update Immigration Department address on Visa information page (Careenage House → BTI Corporate Centre, Princess Alice Highway)`

---

### F-093 · Tier A · Update stale phone numbers on Visa information page (434-4100 and 418-4180 are pre-2017)

- **Where:** `src/content/visa-information.md` lines 14, 24
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — a citizen dialling either listed number will not reach the Immigration Department. Both numbers were replaced in the February 2017 renumbering.
- **What's wrong:** Main office is listed as `(246) 434-4100` (correct up to ~2017; current is `(246) 535-4100`). Airport GAIA office is listed as `(246) 418-4180` (correct up to ~2017; current is `(246) 535-4180`).
- **Fix:** Change line 14 to `Phone: (246) 535-4100`. Change line 24 to `Phone: (246) 535-4180`. Optionally add the secondary GAIA lines `(246) 535-4119 / 535-4187`.
- **Source:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx); [GIS — Immigration Department Telephone Numbers Change](https://gisbarbados.gov.bb/blog/immigration-department-telephone-numbers-change-2/)
- **Suggested issue title:** `Fix stale phone numbers on Visa information page: 434-4100 → 535-4100 (main); 418-4180 → 535-4180 (GAIA)`

---

### F-094 · Tier A · Replace obsolete caribsurf.com email on Visa information page

- **Where:** `src/content/visa-information.md` lines 16, 26
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — emails to `imm-dept@caribsurf.com` will bounce or go unread. This address appears for both offices on the page.
- **What's wrong:** Both the main office and GAIA airport contact blocks use `imm-dept@caribsurf.com`. Immigration's current authoritative emails are: main office `Immigration.department@barbados.gov.bb`; GAIA office `Immigration.gaia@barbados.gov.bb`.
- **Fix:** Change line 16 to `Email: Immigration.department@barbados.gov.bb`. Change line 26 to `Email: Immigration.gaia@barbados.gov.bb`.
- **Source:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx); [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration)
- **Suggested issue title:** `Replace obsolete caribsurf.com email on Visa information page — correct emails are Immigration.department@barbados.gov.bb and Immigration.gaia@barbados.gov.bb`

---

### F-095 · Tier A · Update visa application instruction — process is now fully online (no paper form)

- **Where:** `src/content/visa-information.md` line 9
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a visitor who prepares a paper form and duplicate cannot submit it; they will be redirected online. The caribsurf.com email address (F-094) means there is no working submission channel on the current page.
- **What's wrong:** The page instructs applicants to "complete [the application form] in duplicate" accompanied by "two (2) passport-size photographs." The Barbados Entry Visa process went fully online in 2025 (announced 1 July 2025). The online application requires one photograph (not two), and there is no paper form or in-person submission at Careenage House.
- **Fix:** Replace the introductory sentence with: "Barbados entry visa applications are now made fully online. Apply and pay at [apps.immigration.gov.bb](https://apps.immigration.gov.bb/portal/portal/login). Processing takes approximately three weeks. Fees: single entry US$107.00 (valid three months); multiple entry US$211.00 (valid six months)." Remove the duplicate-form and two-photograph requirements.
- **Source:** [immigration.gov.bb — Home](https://immigration.gov.bb/) — "The Barbados Entry visa process is now a fully online process"; [Barbados Today — Govt rolls out new online visa and payment systems (1 Jul 2025)](https://barbadostoday.bb/2025/07/01/govt-rolls-out-new-online-visa-and-payment-systems/); [immigration.gov.bb — Visa Requirements](https://immigration.gov.bb/pages/visa_requirements.aspx) — one photograph, processing three weeks, US$107/$211 fees
- **Suggested issue title:** `Update Visa information page — application is now fully online (no paper form); add fees and processing time`

---

### F-096 · Tier A · Update Welfare Department organisation page — agency dissolved into SEA (Jan 2026)

- **Where:** `src/content/welfare-department.md` lines 10–35; `src/data/departments.ts` slug "welfare"
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a citizen seeking welfare assistance finds a page describing a dissolved agency. The "Welfare Department" heading, contact person title, and legacy email give no indication that all welfare services are now delivered by the Social Empowerment Agency (SEA). Citizens acting on this page may waste time trying to contact a dissolved body.
- **What's wrong:** The Welfare Department was dissolved 2 January 2026 and merged into the Social Empowerment Agency (SEA) along with the Child Care Board, National Assistance Board, National Disabilities Unit, and the Resilience and Reintegration Unit. The page heading, section title, and all contact details still say "Welfare Department". The title "Chief Welfare Officer Ag." (Ms. Joan Prescod) cannot be confirmed as current post-merger. The email `welfare.department@barbados.gov.bb` cannot be confirmed as monitored under the SEA. The phone numbers (535-1000, 535-1023) are confirmed as valid building numbers but should be attributed to the SEA, not the Welfare Department. A third number (535-1005, published by GIS May 2024) is also missing. The `departments.ts` "welfare" entry has the same staleness issues and omits two of the three published phone numbers.
- **Fix:** Replace the page with an SEA profile or add a prominent notice: "The Welfare Department merged into the Social Empowerment Agency (SEA) on 2 January 2026. For welfare and social assistance, contact the SEA at [details]." Confirm with SEA: (a) current head contact and title; (b) whether `welfare.department@barbados.gov.bb` is still monitored; (c) SEA-specific email address; (d) whether 535-1005 still applies. Update `departments.ts` slug "welfare" to reflect the SEA (or retire the entry). Add SEA client centre addresses once confirmed (Six Roads, St. Philip; Southern Plaza, Oistins).
- **Source:** [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/); [Caribbean News Global — Barbados launches SEA (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/); [Barbados Today — Second SEA centre (27 Mar 2026)](https://barbadostoday.bb/2026/03/27/govt-opens-second-sea-social-services-centre/); [welfare-department.md fact-check](/docs/fact-check/welfare-department.md) Claim 1
- **Suggested issue title:** `Update Welfare Department org page — agency dissolved into Social Empowerment Agency (SEA) January 2026`

---

### F-098 · Tier A · Unpublish or replace entire visitor permit application page — service abolished October 2025

- **Where:** `src/content/visitor-permit-application.md` (entire file); `src/data/content-directory.ts` line 373
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — the Barbados Revenue Authority abolished Visitor Driving Permits effective 15 October 2025. Every claim on this page — the permit requirement, both fee tiers ($10 / $100), the application email, the phone line, the portal URL, the SurePay payment step, the next-business-day turnaround, and the PDF form — applies to a permit that no longer exists. A visitor reading this page may attempt to apply for something that cannot be obtained, or may mistakenly believe they cannot legally drive in Barbados without a permit (they can, on a valid home-country licence). The page was published 24 October 2025 — nine days after the abolition — and was therefore wrong from the moment of publication.
- **What's wrong:** The entire page content describes the pre-15 October 2025 Visitor Registration Certificate (Visitor Driving Permit) system. The BRA policy note (3 October 2025, effective 15 October 2025) abolished the permit and replaced it with the Car Rental Levy (BBD $5/day, max $35 per rental contract), collected by rental companies. No citizen-facing application step exists under the new regime. The BLA service page (`bla.gov.bb/servicedetails/VmlzaXRvciBQZXJtaXQ=`) has also not been updated, creating a second misleading source.
- **Fix:** Either (a) unpublish the page entirely and redirect `/travel-id-citizenship/visitor-permit-application` to `/travel-id-citizenship/getting-around-barbados`; or (b) replace the entire content with: “Visitor Driving Permits were abolished effective 15 October 2025. Visitors may now drive in Barbados on a valid home-country licence for the class of vehicle they intend to drive. If renting a vehicle, a Car Rental Levy of BBD $5 per day (maximum BBD $35 per rental contract) is included in your rental rate by the car hire company — no separate application is required.” Update `source_url` in `content-directory.ts` once BRA publishes a replacement page.
- **Source:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources); [barbadosdigital.com — Driving licences](https://barbadosdigital.com/articles/driving-licences); [Report: visitor-permit-application.md](/home/gavin/frontend-alpha/docs/fact-check/visitor-permit-application.md)
- **Suggested issue title:** `Unpublish or replace visitor-permit-application page — service abolished 15 October 2025, page wrong from date of publication`

---

### F-099 · Tier A · Fix portal.bra.gov.bb/VisitorPermit TLS certificate error (linked twice on visitor permit page)

- **Where:** `src/content/visitor-permit-application.md` lines 11 and 18
- **Confidence it's wrong:** 98%
- **Citizen impact:** HIGH — both inline links and the “Please click here” CTA resolve to a portal with a TLS certificate error. Even if the permit system were still active, the portal would be unreachable. The TLS error on `portal.bra.gov.bb` mirrors the previously documented error on `publicentertainment.bra.gov.bb` (F-018).
- **What's wrong:** `https://portal.bra.gov.bb/VisitorPermit` returns a TLS certificate verification error on fetch. Citizens clicking the link in a browser will see a browser security warning page. This is the same infrastructure pattern as F-018.
- **Fix:** Flag to the BRA IT team that the TLS certificate for `portal.bra.gov.bb` is failing. In the short term, removing the link (since the underlying service is abolished per F-098) resolves the citizen-facing issue. The TLS fix is still needed for any BRA portal content that remains on that subdomain.
- **Source:** `https://portal.bra.gov.bb/VisitorPermit` — TLS error confirmed on fetch 2026-05-28; [visitor-permit-application.md](/home/gavin/frontend-alpha/docs/fact-check/visitor-permit-application.md) Claim 4; see also F-018 (same pattern on `publicentertainment.bra.gov.bb`)
- **Suggested issue title:** `Flag TLS cert error on portal.bra.gov.bb — linked twice from visitor-permit-application page; same infrastructure issue as publicentertainment.bra.gov.bb (F-018)`

---

## What I checked and found correct

So you know what I *didn't* flag as suspect:

- **Passport fee table** (every line item) — matches `immigration.gov.bb` exactly.
- **Land Registry address** — verified.
- **Supreme Court Complex address** — verified (minor: drop "Bridgetown" line to match official phrasing).
- **Barbados Judicial System phone (246) 535-9700** — verified.
- **Notarial certificate $50** — verified, two sources agree.
- **Notarial seal $50** — verified against GIS press release (the Judicial System site still lists $20 but appears stale).
- **Form A / Form B** on passport — verified.
- **`liquorlicence.gov.bb`, `bla.gov.bb`, `caipo.gov.bb`, `immigration.gov.bb`** — verified live.

---

## Filing these as GitHub issues

Each finding above has a **suggested issue title** and a self-contained body. When you want to file them:

```bash
# Single issue — copy the title and body from the finding card
gh issue create --title "Fix CAIPO address on Get a document notarised page (Baobab Tower → Baobab Towers, Warrens)" \
  --label "fact-check,tier-a" \
  --body "$(cat <<'EOF'
**Where:** `src/content/get-a-document-notarised.md` lines 31–35
**Live page:** https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised
**Confidence it's wrong:** 90%
**Citizen impact:** High — a citizen could turn up to the wrong place.

**What's wrong:** Page says "Baobab Tower / Highway 2 / Saint Michael". Building name is singular; location is "Highway 2".

**Fix:** change to "Ground Floor / Baobab Towers / Warrens / St. Michael". Building is **Towers** plural; address is **Warrens**, not Highway 2.

**Sources:**
- CAIPO: https://caipo.gov.bb/
- gov.bb State Bodies: https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property

From fact-check: docs/fact-check/get-a-document-notarised.md
EOF
)"
```

Suggested labels to set up first:
- `fact-check` — all findings
- `tier-a`, `tier-b`, `tier-c` — priority
- `citizen-impact:high` / `citizen-impact:medium` / `citizen-impact:low`
- `needs-agency-confirmation` — Tier C items

If you want, I can generate the full `gh issue create` commands for all 18 findings as a shell script in a follow-up.

---

## What's NOT in Slice 1

To set expectations for the team reviewing this:

- Full external verification of the 8 skeleton reports — claims are extracted but most external sources have not yet been checked.
- Per-page fact-check reports for the remaining ~190 content pages.
- Full link sweep across all `src/content/` and `src/data/*.json` files (Slice 1 only spot-checked URLs referenced by the 10 worked examples).
- A scripted pass over `src/data/opportunities.json`, `src/data/pharmacies.json`, `src/data/justices-of-the-peace.json` for internal consistency with their associated content pages.

The user reviews the **format and rubric** here. Once they're happy, we scale across the rest of the site in subsequent slices.

---

## File status

These files live under `docs/fact-check/`. **No PR opened** — files are local to this branch (`gavinwye/hong-kong-v1`), uncommitted, for user review. The user decides when (and whether) to open a PR.
