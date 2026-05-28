# Claim inventory

- **Last checked:** 2026-05-27
- **Scope (Slice 1):** Inventory across the 10 fact-checked pages. A full sweep across all ~200 content files is scheduled for a later slice.
- **Method:** Manual extraction during Phase D, deduped by canonical fact (so e.g. "Supreme Court Complex address" appears once, not 4 times).

This file is the master list of every distinct factual claim made on the fact-checked pages, plus where each claim appears, so a single update can be propagated to every place that asserts the same fact.

---

## How to read this

- **Dedup key:** a canonical statement of the fact (not a quote from any one page).
- **Appears on:** every page that asserts this fact.
- **Status / certainty:** the highest-confidence status across all pages that assert it.
- **Best source:** the most authoritative public-web reference identified during Phase D.

---

## Addresses

### Supreme Court Complex / Registration Department
- **Canonical:** Whitepark Road, St. Michael, Barbados
- **Appears on:** `register-a-birth/index.md` (l.90, l.108), `apply-for-a-passport.md` (l.41 — "White Park Road" variant), `apply-financial-assistance.md` (cross-mentioned), and implicitly any page referencing the Registrar.
- **Status:** verified
- **Certainty:** 95%
- **Best source:** [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/)

### Land Registry
- **Canonical:** Ground Floor, Warrens Office Complex, Warrens, St. Michael
- **Appears on:** `get-a-document-notarised.md` (l.19-23)
- **Status:** verified
- **Certainty:** 95%
- **Best source:** [Lands and Surveys Department — Contact](https://www.landsandsurveys.gov.bb/pages/ContactUs.html)

### Corporate Affairs and Intellectual Property Office (CAIPO)
- **Canonical:** Ground Floor, Baobab Towers, Warrens, St. Michael
- **Appears on:** `get-a-document-notarised.md` (l.31-35 — currently incorrect)
- **Status:** **discrepant**
- **Certainty:** 90%
- **Best source:** [CAIPO](https://caipo.gov.bb/) / [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property)

### Welfare Department head office
- **Canonical:** Weymouth Corporate Centre, Roebuck Street, Bridgetown, St. Michael
- **Appears on:** `apply-financial-assistance.md` (l.42-44, l.97-101)
- **Status:** pending external verification
- **Certainty:** 80%

### Barbados Immigration Department
- **Canonical (per content):** Careenage House, The Wharf, Bridgetown
- **Appears on:** `open-pharmacy.md` (l.53, l.99)
- **Status:** pending external verification
- **Certainty:** 85%

### Magistrates' Court districts
- See `register-a-birth/index.md` claims 8–13 — six distinct district-court addresses, two of which are flagged as "currently located at…" (temporary). Each needs an individual verification + as-of date.

---

## Phone numbers

### Barbados Judicial System / Registration Department
- **Canonical:** (246) 535-9700
- **Appears on:** `register-a-birth/index.md` (l.92), `justice-of-the-peace.md` (l.65), implicit on `get-a-document-notarised.md`
- **Status:** verified
- **Certainty:** 95%
- **Best source:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)

### Office of the Attorney General
- **Canonical:** (246) 467-7370
- **Appears on:** `justice-of-the-peace.md` (l.61, l.71, l.75)
- **Status:** pending
- **Certainty:** 85%

### Barbados Drug Service
- **Canonical:** (246) 535-4300
- **Appears on:** `open-pharmacy.md` (l.22, l.83, l.99, l.106, l.120)
- **Status:** pending
- **Certainty:** 85%

### Welfare Department
- **Canonical:** +1 246-535-1000 (with extensions 16 and 23?)
- **Appears on:** `apply-financial-assistance.md` (l.103)
- **Status:** pending; format ambiguous
- **Certainty:** 70%

### Barbados Licensing Authority
- **Canonical:** 1-246-536-0264 / 1-246-536-0265
- **Appears on:** `apply-for-a-drivers-licence.md` (l.67)
- **Status:** pending
- **Certainty:** 85%

---

## Fees

### Notarial seal
- **Canonical:** BDS $50 (per April 2017 GIS announcement)
- **Appears on:** `get-a-document-notarised.md` (l.79)
- **Status:** verified, but Barbados Judicial System page still lists $20 (likely stale)
- **Certainty:** 85%

### Notarial certificate
- **Canonical:** BDS $50
- **Appears on:** `get-a-document-notarised.md` (l.81)
- **Status:** verified
- **Certainty:** 95%

### Exhibit certification (notarial)
- **Canonical:** BDS $5 per exhibit (per Barbados Judicial System; per 2017 GIS update: $10)
- **Appears on:** *not currently mentioned in content* — gap.
- **Status:** missing from page
- **Certainty:** 90%

### $10 adhesive postage stamp for notarisation
- **Canonical:** BDS $10 — required per Barbados Judicial System.
- **Appears on:** *not currently mentioned in content* — gap.
- **Status:** missing from page
- **Certainty:** 90%

### Birth certificate copy
- **Canonical:** BDS $5 (standard), BDS $1 (age 60+)
- **Appears on:** `register-a-birth/index.md` (l.23 — $5 only), `get-birth-certificate/start.md` (l.19 — $5 + $1 senior rate)
- **Status:** internally consistent on the $5; senior rate only on one page (gap on the other)
- **Certainty:** 85%

### Late birth registration
- **Canonical:** BDS $20 (per content)
- **Appears on:** `register-a-birth/index.md` (l.98)
- **Status:** pending external verification
- **Certainty:** 60%

### Passport fees (full table)
- See `apply-for-a-passport.md` fact-check report (Claim 12) — every fee matches immigration.gov.bb.

### Driver's licence fees (full table)
- See `apply-for-a-drivers-licence.md` fact-check skeleton (Claims 5–9) — verification pending against BLA.

### Police Certificate of Character
- **Canonical:** BBD $20 (per `apply-for-a-position-as-a-temporary-teacher.md` l.47)
- **Appears on:** 4 pages reference this certificate (l.47 of that page, plus `apply-to-volunteer-at-a-sports-camp.md`, `apply-for-conductor-licence/start.md`, `sell-goods-services-beach-park/*.md`)
- **Status:** pending external verification
- **Certainty:** 75%

---

## Agency / ministry / department names

See `_internal-consistency.md` for the canonical list. Variants found:

- **Ministry of Labour, Social Security and Third Sector** — used in 1 location; older names "Ministry of Labour" and "Ministry of Labour and Social Partnership Relations" used in 4 others.
- **Ministry of Transport, Works and Water Resources** — older name "Ministry of Transport and Works" used in `apply-for-conductor-licence`.
- **Ministry of Youth, Sports and Community Empowerment** — older name "Ministry of Youth and Community Empowerment" used in YouthADVANCE Corps page.
- **Ministry of Environment and National Beautification** — typo "Natural Beautification" in one location.

---

## Statutory / legal references

### Public Holidays Act, Cap. 352
- **Appears on:** `content-directory.ts` (description for bank-holiday-calendar)
- **Status:** pending verification of citation
- **Certainty:** 80%

### Motor Vehicles Act, 1988
- **Appears on:** `apply-for-a-drivers-licence.md` (l.11)
- **Status:** pending — confirm not superseded by later amendments
- **Certainty:** 75%

### Severance Payments Act (Cap. 355A)
- **Appears on:** `calculate-severance-pay/index.md` (l.9), linked to nis.gov.bb
- **Status:** pending
- **Certainty:** 85%

### Notaries Public Act, 2017-09
- **Appears on:** implicit (notarisation fees derived from it)
- **Best source:** [CAIPO — Notaries Public Act PDF](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf)
- **Status:** verified
- **Certainty:** 90%

### Liquor Licence Act, 2021
- **Appears on:** `loud-music-permit.md` (implicit via link to liquorlicence.gov.bb)
- **Status:** verified existence (referenced on the liquorlicence.gov.bb portal)
- **Certainty:** 85%

### Registration of Births Act
- **Appears on:** implicit on `register-a-birth/index.md`
- **Status:** pending citation verification
- **Certainty:** 80%

### National Assistance framework
- **Appears on:** `apply-financial-assistance.md` (l.13)
- **Status:** pending; likely refers to the National Assistance Act
- **Certainty:** 75%

---

## Statistics

- **"~45 summer camps held across Barbados each year"** — `register-summer-camp.md` (l.9). Provisional 55%.
- **"436 names on the official 2024 JP list"** — `justice-of-the-peace.md` (l.75). Provisional 85% (verifiable from the linked PDF).
- **"563 JPs appointed in January 2026"** — `justice-of-the-peace.md` (l.75). Provisional 70%.
- **"12 government polyclinic locations"** — `open-pharmacy.md` (l.72). Provisional 75%.
- **"more than 1,000 attendees → police presence; more than 1,500 → fire service presence"** — `loud-music-permit.md` (l.19, l.21). Provisional 50%.

---

## Out-of-scope for Slice 1

This inventory only covers the 10 fact-checked pages. The full deduped inventory across all ~200 content files is scheduled for a later slice — once Phase D has been run against each page.
