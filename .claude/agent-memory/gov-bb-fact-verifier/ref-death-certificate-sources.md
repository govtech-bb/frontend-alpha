---
name: death-certificate-sources
description: Death certificate fees, turnaround, opening hours, form fields, and sources verified 2026-05-28 — including cause-of-death cert fee and the 3:15pm hours error
metadata:
  type: reference
---

## Death certificate — canonical facts (verified 2026-05-28)

**Fee:** BDS$5.00 per standard copy. Source: barbadoslawcourts.gov.bb/Certificates + gov.bb/register-death (both confirmed).

**Cause-of-death certificate fee:** BDS$10.00 per copy. In-person only — cannot be obtained online. Source: barbadoslawcourts.gov.bb/Certificates.

**Address:** Registration Department, Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I.
- barbadoslawcourts.gov.bb uses "Supreme Court Complex, Whitepark Road"
- gov.bb/register-death uses "New Supreme Court Complex, White Park Road" (same building)
- gov.bb/Departments/registration uses "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."

**Phone:** 1 (246) 535-9700 (PBX). Confirmed on all three primary sources above.

**Email:** registrarsupremecourt@barbados.gov.bb — confirmed on barbadoslawcourts.gov.bb.
Alternate: registrar@lawcourts.gov.bb (gov.bb/Departments/registration).

**Overseas number +1 (246) 535-9751:** Not on any Tier 1 source. A third-party directory (givebackbarbados.com) associates it with the "Registrar's Secretary" — likely a direct extension, not a public switchboard. Appears on both the death and birth certificate alpha.gov.bb pages. Treat as unverified until confirmed.

**Opening hours discrepancy:** All three certificate content pages (death, birth, marriage) state "8:30am to 3:15pm". gov.bb/register-birth and gov.bb/Citizens/register-birth both state "8:30am to 3:30pm Monday to Friday". The 3:15pm figure comes from a May 2020 Barbados Today article about a temporary COVID-era schedule — not current hours. Fix is 3:30pm on all three pages. This is captured as triage card F-020.

**Turnaround time:** No Tier 1 source (barbadoslawcourts.gov.bb, gov.bb, GIS) states a "5 to 7 business days" figure for death certificate copies. UK gov.uk says "usually within 3 days of the post-mortem" — but that is first-registration issuance, not a copy request. The 5–7 day claim on the alpha.gov.bb page is unverified. The same text appears verbatim on the birth certificate page — one may have been copied from the other. GIS article https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/ returns HTTP 403 — inaccessible.

**Coroner pathway:** When a coroner's certificate is required, death registration (and therefore copies) takes longer. Operationally confirmed; barbadoslawcourts.gov.bb/registration-of-deaths requires a Medical Certificate of Death before registration.

**Same-day emergency provision:** Not confirmed on any Tier 1 source, but operationally plausible for death certs (estate/repatriation/cremation urgency). No evidence it applies to birth certs.

**Form fields (start.md):** The online form asks for applicant name/address/NID and deceased name/date of death/place of death/NID/cause of death. The official paper form PDF (Death-Cert-Appl.pdf at barbadoslawcourts.gov.bb) is confirmed live but is binary and cannot be machine-read. The "cause of death" field raises an internal consistency concern — the page states cause-of-death certificates cannot be obtained online, but the form asks for cause of death. Likely a search-identifier field, not a certificate-type selector. Needs clarification (triage F-023).

## Key sources

- https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates
- https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths
- https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/applications-forms/Death-Cert-Appl.pdf (binary PDF)
- https://www.gov.bb/register-death
- https://www.gov.bb/Citizens/register-death
- https://www.gov.bb/Departments/registration
- https://www.gov.uk/guidance/what-to-do-after-a-british-person-dies-in-barbados

See also [[birth-registration-sources]] for the parallel birth certificate facts.
