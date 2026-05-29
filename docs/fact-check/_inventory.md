# Claim inventory

- **Last checked:** 2026-05-28
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
- **Canonical:** Level 1, Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I. (NOT "Coleridge Street, Bridgetown")
- **Appears on:** `register-a-birth/index.md` (l.90, l.108), `apply-for-a-passport.md` (l.41 — "White Park Road" variant), `apply-financial-assistance.md` (cross-mentioned), `register-a-marriage.md` (l.11 — DISCREPANT: says "Coleridge Street, Bridgetown"), and implicitly any page referencing the Registrar.
- **Status:** verified (contact section on l.45–47 of register-a-marriage is correct; opening paragraph l.11 is wrong)
- **Certainty:** 99%
- **Discrepancy note:** "Coleridge Street, Bridgetown" is the address of the Henry Forde and David Simmons Judicial Complex, to which courts relocated from 2023 — not the Registration Department. The Registration Department has been at Whitepark Road since at least 2019.
- **Best sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages); [gov.bb — Registration Department](https://www.gov.bb/Departments/registration); [gov.bb news 2019](https://www.gov.bb/news_article.php?id=28)

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

### Welfare Department / Social Empowerment Agency head office
- **Canonical:** Weymouth Corporate Centre, Roebuck Street, Bridgetown, St. Michael (at corner of Country Road and Roebuck St)
- **Note:** The Welfare Department was dissolved 2 January 2026 and merged into the Social Empowerment Agency (SEA). SEA new client centres: Six Roads St Philip (opened 7 Jan 2026); Southern Plaza, Oistins (opened 27 Mar 2026); additional St Michael centres planned. Gov.bb departments page has not yet been updated to reflect the merger.
- **Appears on:** `apply-financial-assistance.md` (l.42-44, l.97-101); `get-disaster-relief-assistance.md` (l.21-24, l.40-43) — DISCREPANT: disaster relief page incorrectly lists "Perry Gap, Bridgetown" instead of Weymouth Corporate Centre
- **Status:** verified (Weymouth address). "Perry Gap" on `get-disaster-relief-assistance.md` is **discrepant** — no Tier 1 or Tier 2 source corroborates Perry Gap as the Welfare Department / SEA address.
- **Certainty:** 95%
- **Best source:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare); [govserv.org — Barbados Welfare Department](https://www.govserv.org/BB/St-Michael/1153517008123538/Barbados-Welfare-Department); [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/)

### National Assistance Board / Social Empowerment Agency — Murrell House, Country Road
- **Canonical:** Murrell House, Country Road, St. Michael (NOT "Country Rd, Bridgetown, Saint Michael")
- **Phone:** (246) 535-3131 (PBX — building still in use post-SEA merger)
- **Email:** `nab.department@barbados.gov.bb` — UNVERIFIED. Not published on gov.bb NAB page, GIS, NAB Facebook, or any third-party directory. Needs confirmation with SEA.
- **Note:** The National Assistance Board was dissolved 2 January 2026 and merged into the Social Empowerment Agency (SEA). The Murrell House building continues to operate as an SEA location. Pages should reference "Social Empowerment Agency (SEA)" not "National Assistance Board".
- **Appears on:** `report-elderly-abuse.md` (l.27–34) — DISCREPANT: agency name stale; "Murrell House" missing from address; "Bridgetown" added but not in any authoritative source
- **Status:** discrepant (agency name); phone verified; email unverifiable
- **Certainty (phone):** 92%
- **Best sources:** [gov.bb — The National Assistance Board](https://www.gov.bb/State-Bodies/national-assistance); [connectb1m.com — National Assistance Board](https://connectb1m.com/national-assistance-board/); [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/)

### Welfare Department Speightstown branch
- **Canonical:** BNB Building, Chapel Street, Speightstown, Saint Peter (NOT "Republic Bank Building")
- **Appears on:** `apply-financial-assistance.md` (l.46-49)
- **Status:** discrepant — page uses "Republic Bank Building"; GIS 2017 directory and all government sources use "BNB Building"
- **Certainty:** 75%
- **Best source:** [GIS — NEW TELEPHONE NUMBERS FOR WELFARE DEPARTMENT (PDF)](https://gisbarbados.gov.bb/wp-content/uploads/2017/01/Telephone-Numbers-Welfare-Department.pdf)

### Welfare Department Country Road branch
- **Canonical:** Country Road, St. Michael, opposite the National Housing Corporation
- **Appears on:** `apply-financial-assistance.md` (l.51-53)
- **Status:** verified — landmark "opposite the National Housing Corporation" confirmed by GIS; omitted from page
- **Certainty:** 85%
- **Best source:** [GIS — New Numbers For Welfare Dept.](https://gisbarbados.gov.bb/blog/new-numbers-for-welfare-dept/)

### Department of Emergency Management (DEM)
- **Canonical:** The George Greaves Building, #24 Warrens Industrial Park, Warrens, St. Michael
- **Phone:** (246) 438-7575; Fax: (246) 421-8612; Email: deminfo@barbados.gov.bb
- **Appears on:** `get-disaster-relief-assistance.md` (l.80-84) — address verified; phone number MISSING from page (F-039)
- **Status:** verified (address). Phone omission flagged as triage item.
- **Certainty:** 98%
- **Best source:** [DEM — Contact Us](https://dem.gov.bb/contact); [gov.bb — Department of Emergency Management](https://www.gov.bb/Departments/emergency-management)

### Barbados Immigration Department
- **Canonical:** BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael
- **Former address (pre-2018):** Careenage House, The Wharf, Bridgetown — INCORRECT; department moved 2018
- **Appears on:** `open-pharmacy.md` (l.53, l.99) — DISCREPANT (still says Careenage House)
- **Status:** verified (page is discrepant)
- **Certainty:** 99%
- **Best source:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx); [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration); [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/)
- **Phone:** (246) 535-4100 (main); (246) 535-4195 (Chief Immigration Officer direct); email: Immigration.department@barbados.gov.bb

### Magistrates' Court districts
- See `register-a-birth/index.md` claims 8–13 — six distinct district-court addresses, two of which are flagged as "currently located at…" (temporary). Each needs an individual verification + as-of date.

---

## Phone numbers

### Barbados Judicial System / Registration Department
- **Canonical:** (246) 535-9700
- **Appears on:** `register-a-birth/index.md` (l.92), `register-a-marriage.md` (l.49), `justice-of-the-peace.md` (l.65), implicit on `get-a-document-notarised.md`
- **Status:** verified
- **Certainty:** 95%
- **Best source:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)

### Office of the Attorney General
- **Canonical:** (246) 535-0467 (main PBX) — NOT (246) 467-7370
- **Appears on:** `justice-of-the-peace.md` (l.61, l.71, l.75) — all three occurrences are wrong
- **Status:** **discrepant** — the page incorrectly lists 467-7370; both gov.bb and oag.gov.bb publish 535-0467
- **Certainty:** 95%
- **Best source:** [oag.gov.bb — Contact Us](https://oag.gov.bb/contact); [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general)
- **Additional numbers (OAG):** AG direct: 535-0434; Permanent Secretary: 535-0437; PS email: ps.oag@barbados.gov.bb (oag.gov.bb) / ps@oag.gov.bb (gov.bb)

### Barbados Drug Service
- **Canonical:** 1 (246) 535-4300
- **Appears on:** `open-pharmacy.md` (l.22, l.83, l.99, l.106, l.120) — page uses "(246) 535-4300" (correct locally; no country prefix)
- **Status:** verified
- **Certainty:** 95%
- **Best source:** [gov.bb — Barbados Drug Service](https://www.gov.bb/Departments/drug-service)
- **Additional:** email director@drugservice.gov.bb; fax 1 (246) 535-4342 / 4320; address 6th & 7th Floors, Warrens Towers II, Warrens, St. Michael

### Welfare Department
- **Canonical:** (246) 535-1000, (246) 535-1005, (246) 535-1023. No extension "16" found in any source. The "/16/" in alpha.gov.bb format is unverifiable and non-standard.
- **Appears on:** `apply-financial-assistance.md` (l.103)
- **Status:** discrepant — published numbers are 535-1000, 535-1005, 535-1023; "/16/" segment is not corroborated
- **Certainty:** 90%
- **Best source:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare); [GIS — National Assistance Grants Now Via Direct Deposit](https://gisbarbados.gov.bb/blog/national-assistance-grants-now-via-direct-deposit/)

### Barbados Licensing Authority
- **Canonical:** +1 (246) 536-0264 / 536-0265 / 536-0267 / 536-0278 (four numbers published)
- **Appears on:** `apply-for-a-drivers-licence.md` (l.67)
- **Status:** **discrepant** — page lists only 0264/0265; BLA contact page also publishes 0267 and 0278. Note: 0264 IS a valid BLA number (earlier phases queried this — confirmed 2026-05-28).
- **Certainty:** 90%
- **Best source:** [BLA homepage — contact](https://bla.gov.bb); [BLA — Learner Permit footer](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=)

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

### Marriage certificate copy
- **Canonical:** BDS $10 (Nationals/citizens/residents), BDS $20 (Non-Nationals/non-citizens); Apostille BDS $50 (additional, when required by a foreign government)
- **Appears on:** `register-a-marriage.md` (lines 15–18)
- **Status:** verified
- **Certainty:** 95%
- **Best sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates); [gov.bb — List of Marriage Licence Fees](https://www.gov.bb/Citizens/marriage-fees)

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
- See `apply-for-a-drivers-licence.md` fact-check report (Claims 5–9) — all five fees verified 2026-05-28 against both gov.bb and individual BLA service pages. Learner's Permit $80, Regulation Test $30, Driving Test $100, Driver's Licence $50, International Permit $65 — all confirmed.
- **Best sources:** [gov.bb — Get a Driver Licence](https://www.gov.bb/Citizens/driver-licence); [BLA — Learner Permit](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=); [BLA — International Permit](https://bla.gov.bb/servicedetails/SW50ZXJuYXRpb25hbCBQZXJtaXQ=)

### Police Certificate of Character
- **Canonical:** BBD $20; apply at forms.gov.bb/CertificateOfCharacter; pay via EZPAY+ (credit card, direct debit, mMoney) or cash at any Post Office island-wide
- **Appears on:** 4 pages reference this certificate (l.47 of that page, plus `apply-to-volunteer-at-a-sports-camp.md`, `apply-for-conductor-licence/start.md`, `sell-goods-services-beach-park/*.md`)
- **Status:** verified 2026-05-28 — fee BBD $20 confirmed by forms.gov.bb and multiple GIS articles
- **Certainty:** 95%
- **Best sources:** [forms.gov.bb — Application for Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter); [GIS — Police Certificate of Character Form Now Online](https://gisbarbados.gov.bb/blog/police-certificate-of-character-now-online/); [GIS — How To Apply For A Police Certificate Of Character](https://gisbarbados.gov.bb/blog/how-to-apply-for-a-police-certificate-of-character/)

---

## Agency / ministry / department names

See `_internal-consistency.md` for the canonical list. Variants found:

- **Ministry of Labour, Social Security and Third Sector** — used in 1 location; older names "Ministry of Labour" and "Ministry of Labour and Social Partnership Relations" used in 4 others.
- **Ministry of Transport, Works and Water Resources** — older name "Ministry of Transport and Works" used in `apply-for-conductor-licence`.
- **Ministry of Youth, Sports and Community Empowerment** — older name "Ministry of Youth and Community Empowerment" used in YouthADVANCE Corps page.
- **Ministry of Environment and National Beautification** — typo "Natural Beautification" in one location.
- **Social Empowerment Agency (SEA)** — launched 2 January 2026, merging Welfare Department, Child Care Board, National Assistance Board, National Disabilities Unit, and Resilience and Reintegration Unit. `get-disaster-relief-assistance.md` (6 lines) still says "Welfare Department" — discrepant as of 2026-05-28. See F-037. gov.bb Departments page has not been updated yet; socialempowermentbb.org is the new agency's website (connection refused as at 2026-05-28 — may be intermittent).

---

## Statutory / legal references

### Public Holidays Act, Cap. 352
- **Appears on:** `content-directory.ts` (description for bank-holiday-calendar); `src/app/bank-holiday-calendar/page.tsx` (lines 136, 788–789)
- **Status:** verified — confirmed at barbadoslawcourts.gov.bb, ILO NATLEX (Act No. 49, Cap. 352), barbadosparliament-laws.com, and Ministry of Labour publications
- **Certainty:** 98%
- **Best sources:** [Public Holidays Act CAP 352 — Barbados Law Courts (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicHolidaysCAP352.pdf); [ILO NATLEX](https://www.ilo.org/dyn/natlex/natlex4.detail?p_lang=&p_isn=18207); [Ministry of Labour — Public Holidays](https://labour.gov.bb/library/library-publications/holidays/)

### Motor Vehicles Act, 1988
- **Appears on:** `apply-for-a-drivers-licence.md` (l.11)
- **Status:** **discrepant** — no Barbados statute by this name exists. "Motor Vehicles Act, 1988" is an Act of the Indian Parliament (Act No. 59 of 1988). The governing Barbados legislation is the **Road Traffic Act, CAP 295**, most recently consolidated to 2022. The content appears to have been templated from an Indian government source.
- **Certainty:** 15% that the cited name is correct
- **Confidence it's wrong:** 85%
- **Best source:** [Road Traffic Act CAP 295 — Barbados Law Courts (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/RoadTrafficCAP295.pdf); [Road Traffic Act consolidated 2022 — MTW (PDF)](https://mtw.gov.bb/wp-content/uploads/2024/04/Road-Traffic-Act-295-consolidated-up-to-2022-21-2022-12-23-1-1.pdf); [India Code — Motor Vehicles Act 1988 (Indian, not Barbados)](https://www.indiacode.nic.in/handle/123456789/1798)

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

### National Assistance framework / National Assistance Act Cap. 48
- **Appears on:** `apply-financial-assistance.md` (l.13)
- **Status:** verified — "National Assistance framework" correctly refers to the National Assistance Act, Cap. 48 in the Laws of Barbados
- **Certainty:** 85%
- **Best source:** [National Assistance Act Cap. 48 — Barbados Law Courts (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/NationalAssistanceCAP048.pdf)

---

## Statistics

- **"~45 summer camps held across Barbados each year"** — `register-summer-camp.md` (l.9). Provisional 55%.
- **"436 names on the official 2024 JP list"** — `justice-of-the-peace.md` (l.75). Unverifiable from public web (60%); requires row-count of `/public/justices-of-the-peace-2024.pdf`. No external source confirms 436.
- **"563 JPs appointed in January 2026"** — `justice-of-the-peace.md` (l.75). Verified 80%. GIS pre-announced 560 (13 Jan 2026); Barbados Today post-ceremony report (15 Jan 2026) gives 563 — the figure PM Mottley used when addressing the new JPs. 563 is correct.
- **"12 government polyclinic locations"** — `open-pharmacy.md` (l.72). **DISCREPANT — 90% confident wrong.** Ministry of Health states "nine polyclinics and two satellite clinics" (11 total). BDS states its pharmacies are in "nine (9) polyclinics". Sources: [Ministry of Health — Primary Health Care](https://www.health.gov.bb/For-Public/Primary-Health-Care); [BDS — Pharmacy Service](http://drugservice.gov.bb/index.php?id=777). Correct phrasing: "9 polyclinics and 2 satellite clinics".
- **"more than 1,000 attendees → police presence; more than 1,500 → fire service presence"** — `loud-music-permit.md` (l.19, l.21). Provisional 50%.

---

## Out-of-scope for Slice 1

This inventory only covers the 10 fact-checked pages. The full deduped inventory across all ~200 content files is scheduled for a later slice — once Phase D has been run against each page.
