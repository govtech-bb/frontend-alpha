---
name: caipo-business-barbados-rebrand
description: CAIPO rebranded to Business Barbados on 1 Feb 2025; now under Ministry of Energy and Business Development; caipo.gov.bb domain unchanged
metadata:
  type: reference
---

The Corporate Affairs and Intellectual Property Office (CAIPO) completed its transition to the entity **Business Barbados** on **1 February 2025**.

- **New entity name:** Business Barbados
- **Website:** https://caipo.gov.bb/ (domain unchanged; homepage now says "Business Barbados: Digital Platform for Corporate Affairs Services")
- **Responsible ministry:** Ministry of Energy and Business Development (also seen as "Ministry of Energy, Business Development and Consumer Affairs" on caipo.gov.bb footer)
- **Address:** Ground Floor, Baobab Towers, Warrens, St. Michael (unchanged)
- **Phones:** (246) 535-2401 / 535-2402 / 535-2404
- **Email:** caipo.general@barbados.gov.bb (unchanged)
- **Hours:** Monday–Friday 08:30–16:30

**Services affected:** Registration of business names, company incorporation, intellectual property (trademarks, patents, copyright), bills of sale, trade unions, newspapers, limited partnerships — all now under Business Barbados.

**Registration of Business Names Act, Cap. 317:**
- Governing Act confirmed at caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/
- 14-day registration obligation after commencing business
- Fees (per caipo.gov.bb/fees/): Name reservation BDS $30; Business name application BDS $100; Certificate copy BDS $40
- Process: reserve name → complete form → pay via EZPay+ → email to caipo.general@barbados.gov.bb with 2 forms of ID per signatory → cert within ~5 working days

**alpha.gov.bb impact:**
- `src/content/registering-a-business-name.md` line 13: link text "CAIPO WEBSITE" is stale → should be "Business Barbados website" (F-074)
- `src/data/ministries.ts` lines 736–740: page listed under MIIST (wrong) → should be under Ministry of Energy and Business Development (F-075)
- `src/data/departments.ts` lines 336–378 and `src/data/state-bodies.ts` lines 480–513: both still use "Corporate Affairs and Intellectual Property Office (CAIPO)" — need rename to "Business Barbados"
- gov.gov also stale: gov.bb/Departments/corporate-affairs and departments listing still say CAIPO; no Ministry of Energy update reflected yet

**Sources:**
- https://caipo.gov.bb/ — homepage (rebranded)
- https://nationnews.com/2025/02/02/caipo-now-part-of-business-barbados/ — transition date 1 Feb 2025
- https://www.cbc.bb/news/local-news/caipo-officially-completes-transition-to-business-barbados/ — Sep 2025 completion announcement
- https://www.gov.bb/ministries/energy-water-resources — confirms CAIPO under Ministry of Energy and Business Development
- https://caipo.gov.bb/fees/ — current fee schedule
- https://caipo.gov.bb/legislation/registration-of-business-names-act-cap-317/ — Cap. 317 page

**Why:** The registering-a-business-name.md fact-check (2026-05-28) confirmed this rebrand. All future fact-checks touching CAIPO, business registration, or Business Barbados should use this memory.

[[ref-ministry-of-labour-business-policies]] — see also MIIST ministry page issues
