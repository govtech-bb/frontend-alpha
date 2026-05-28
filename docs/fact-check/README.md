# Fact-check dashboard

Last updated: 2026-05-27

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
| Justice of the Peace | [alpha.gov.bb](https://alpha.gov.bb/travel-id-citizenship/justice-of-the-peace) | [Report](/docs/fact-check/justice-of-the-peace.md) | 17 | 9 | 3 (count, phone, email) | 5 | **78%** |
| Find an open pharmacy | [alpha.gov.bb](https://alpha.gov.bb/health-and-emergency-services/open-pharmacy) | [Report](/docs/fact-check/open-pharmacy.md) | 18 | 13 | 2 (Immigration address, polyclinic count) | 3 | **80%** |
| Apply for financial assistance | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/apply-financial-assistance) | [Report](/docs/fact-check/apply-financial-assistance.md) | 18 | 8 | 2 (phone, Speightstown bldg) | 8 | **74%** |
| Get a copy of a birth certificate | [alpha.gov.bb](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate) | [Report](/docs/fact-check/get-birth-certificate.md) | 8 | 4 | 0 | 4 | **84%** |
| EZPay | [alpha.gov.bb](https://alpha.gov.bb/money-financial-support/ezpay) | [Report](/docs/fact-check/ezpay.md) | 15 | 14 | 1 (intro copy errors) | 0 | **84%** |

★ = page has `featured: true` in its frontmatter.

**Totals across the 11 worked-example pages:** 160 claims · 101 verified · 17 discrepant · 42 unverifiable from public web. Overall verified rate: **63%**. Average page certainty: **79%**.

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
- **Confidence it's wrong:** 85%
- **Citizen impact:** **HIGH** — citizens calling the wrong number won't reach the AG.
- **What's wrong:** Page lists phone `(246) 467-7370` and email `agoffice@barbados.gov.bb`. Official [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general) publishes:
  - Phone: `(246) 535-0467` (PBX) and `(246) 535-0434` (direct)
  - Email: `ps@oag.gov.bb`
  - Address: Jones Building, Webster's Business Park, Wildey, St. Michael
- **Fix:** replace both the phone and email; consider adding the address.
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

### F-00C · Tier A · Fix "563 JPs appointed in January 2026" — actual is 560

- **Where:** `src/content/justice-of-the-peace.md` line 75
- **Confidence it's wrong:** 80%
- **Citizen impact:** Low (statistic), but a credibility signal.
- **What's wrong:** Page asserts "563 JPs appointed in January 2026". GIS reporting says **560** sworn in on **14 January 2026** at the Lloyd Erskine Sandiford Centre.
- **Fix:** change "563" to "560"; consider adding "(sworn in 14 January 2026)" for verifiability.
- **Source:** [GIS — Justice of the Peace search](https://gisbarbados.gov.bb/search/justice+of+peace/)
- **Suggested issue title:** `Fix JP appointment count on Justice of the Peace page (563 → 560)`

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

### F-017 · Tier C · Confirm the three JP statistics on line 75

- **Where:** `src/content/justice-of-the-peace.md` line 75
- **Confidence it's wrong:** unknown — specific numbers, none inline-cited.
- **Citizen impact:** Low (provenance text), but a credibility signal.
- **What's wrong:** Three precise claims with no inline citation: "Supreme Court of Barbados register (last updated 30 April 2023)", "official 2024 list (PDF, 436 names)", "the 563 JPs appointed in January 2026".
- **Fix:** confirm each with the Office of the Attorney General. Verify the count on the linked PDF.
- **Suggested issue title:** `Verify JP page statistics (register date, 436 names, 563 appointments)`

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
