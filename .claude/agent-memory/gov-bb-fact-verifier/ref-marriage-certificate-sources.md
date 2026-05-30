---
name: ref-marriage-certificate-sources
description: Marriage certificate fees, form fields, governing act, cross-page hours error, and senior rate absence — verified 2026-05-28
metadata:
  type: reference
---

## Marriage certificate — key verified facts (2026-05-28)

### Fees
- Nationals: BDS$10.00 per copy
- Non-nationals: BDS$20.00 per copy
- Apostille (if required by foreign authority): additional BDS$50.00
- **No senior citizen discount** for marriage certificates. The BDS$1.00 (60+) rate applies only to birth certificates. barbadoslawcourts.gov.bb is explicit on this.

### Governing statute
- **Marriage Act, Cap. 218A** — administered by the Records Branch, Supreme Court
- Records Branch also administers: Vital Statistics Registration Act Cap. 192A, Registration Office Act Cap. 33, Change of Name Act Cap. 212A, and others

### Registration location
- Registration Department, Level 1, Supreme Court Complex, Whitepark Road, Bridgetown (some sources say "White Park Road" — two words; barbadoslawcourts.gov.bb uses "Whitepark" — one word, which is canonical)
- Note: gov.bb/Citizens/register-marriage also mentions "Coleridge Street, Bridgetown" as an older/alternate records location; the current operative address is the Supreme Court Complex

### Contact details
- Phone: 1-246-535-9700 (verified, Tier 1)
- Email: registrarsupremecourt@barbados.gov.bb (verified, Tier 1)
- Alternate email: registrar@lawcourts.gov.bb (on gov.bb/Departments/registration)
- Fax: 1-246-426-2405 (barbadoslawcourts.gov.bb)
- Phone +1 (246) 535-9751 (appears on alpha.gov.bb marriage, birth, death cert pages) — NOT found on any Tier 1 source; unverified

### Opening hours
- Authoritative: 8:30am to 3:30pm Monday to Friday (gov.bb/register-birth, gov.bb/Citizens/register-birth)
- alpha.gov.bb marriage cert page states 3:15pm — **discrepant** (same error on birth cert and death cert pages; appears to be a templating bug from a COVID-era 2020 schedule)

### Turnaround time
- No Tier 1 source states a turnaround time for marriage certificate copies
- "5 to 7 business days" appears on alpha.gov.bb marriage, birth, and death cert pages — appears to be templated copy; not independently verified for marriage certificates

### Form fields (partial — PDF binary unreadable)
- Date of marriage, place of marriage, names of both parties confirmed on Getting Married page
- "husband and wife" terminology used in Marriage Act Cap. 218A; may be reflected on form — needs manual inspection
- National ID number field plausible but not confirmed from readable source

### Sources
- [barbadoslawcourts.gov.bb — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates)
- [barbadoslawcourts.gov.bb — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages)
- [barbadoslawcourts.gov.bb — Application for Marriage Certificate (PDF — binary)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Appl-for-Marriage-Cert.pdf)
- [gov.bb/Citizens/register-marriage](https://www.gov.bb/Citizens/register-marriage)
- [gov.bb/Departments/registration](https://www.gov.bb/Departments/registration)
- GIS blog on applying for certificates: returns HTTP 403 consistently

### Cross-page templating issue to watch
The blocks "5 to 7 business days", "same-day emergency issuance", and "3:15pm closing hours" all appear verbatim across the marriage, birth, and death certificate pages on alpha.gov.bb. The hours figure is confirmed wrong (should be 3:30pm). The turnaround and emergency clause are unverifiable for all three. This is a shared template error — fixing one page should trigger fixes to the other two.
