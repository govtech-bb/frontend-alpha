---
name: ref-bank-holidays-public-holidays-act
description: Public Holidays Act Cap 352 — verified citation, 12 holidays, National Heroes count discrepancy, Whit Monday formula, Ministry of Labour source
metadata:
  type: reference
---

## Public Holidays Act, Cap. 352

- **Citation verified:** "Public Holidays Act, Cap. 352" — confirmed at barbadoslawcourts.gov.bb (PDF), ILO NATLEX (Act No. 49), barbadosparliament-laws.com, and multiple Ministry of Labour publications. Certainty: 98%.
- **Act PDF URL:** https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicHolidaysCAP352.pdf (binary-encoded, not machine-readable via WebFetch)
- **Authoritative source for annual holiday lists:** https://labour.gov.bb/library/library-publications/holidays/ (live; PDFs for 2012–2026)
- **2026 PDF:** https://labour.gov.bb/wp-content/uploads/2026/04/Public-Holidays-for-the-Year-2026.pdf (binary; text extractable via python zlib)
- **2025 PDF:** https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf (text extracted successfully)

## 12 Statutory Holidays

Official names (from 2025 Ministry of Labour PDF — text extracted):
1. New Year's Day — 1 January
2. Errol Barrow Day — 21 January
3. Good Friday — movable (Easter −2)
4. Easter Monday — movable (Easter +1)
5. National Heroes Day — 28 April
6. Labour Day (May Day) — 1 May
7. Whit Monday — movable (Easter +50)
8. Emancipation Day — 1 August
9. "Kadooment" Day — first Monday in August (note: official list uses quotation marks around Kadooment)
10. Independence Day — 30 November
11. Christmas Day — 25 December
12. Boxing Day — 26 December

## Key Discrepancies Found (2026-05-28)

### National Heroes: 10 vs 11
- **alpha.gov.bb says:** "ten official National Heroes"
- **Correct:** eleven. Rihanna (Robyn Rihanna Fenty) was named the 11th National Hero on 30 November 2021 at the republic investiture ceremony.
- **Source:** https://gisbarbados.gov.bb/blog/rihanna-named-barbados-11th-national-hero/
- **F-number:** F-032 (Tier A)

### Whit Monday note: "7th Monday after Easter" is wrong
- **alpha.gov.bb says:** `note: "7th Monday after Easter"`
- **Correct:** "Day after Pentecost" (Pentecost = Easter +49; Whit Monday = Easter +50 = 8th Monday after Easter counting Easter Monday as 1st)
- **Verified by computation** across 2024–2028: always 8 Mondays from Easter Sunday to Whit Monday inclusive
- **F-number:** F-033 (Tier B)

## Other Notes

- The Emancipation Day note "abolition of slavery in 1834" is technically accurate (Slavery Abolition Act took effect 1 Aug 1834) but incomplete (full freedom came 1 Aug 1838 after apprenticeship period ended). Not flagged as discrepant — defensible.
- Errol Barrow is correctly described as "first Prime Minister of Barbados" — confirmed by GIS.
- `source_url` in content-directory.ts is blank for bank-holiday-calendar; should be `https://labour.gov.bb/library/library-publications/holidays/`
- The live URL is `https://alpha.gov.bb/bank-holiday-calendar` (NOT under work-employment category), because content-directory.ts sets `href: "/bank-holiday-calendar"`.
- `LAST_UPDATED` is hardcoded as "5 May 2026" in page.tsx — needs manual update when Act amended or one-off holidays declared.

[[ref-jp-appointments]]
