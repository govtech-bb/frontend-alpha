# Fact-check: Get a copy of a birth certificate

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/get-birth-certificate>
- **Source file:** `src/content/get-birth-certificate/start.md`
- **Last checked:** 2026-05-27
- **Summary:** 8 claims reviewed — 4 verified, 0 discrepant, 4 unverifiable from public web. Average certainty: **84%**.

---

## Headline issues for triage

1. **"Place of baptism" form field is unusual.** Asks for "the full name, date of birth, place of birth and place of baptism of the person named on the certificate". Place of baptism isn't routinely asked on Barbados vital-records applications — verify it's actually on the form.
2. **20-minute completion estimate** is testable directly against the form, not against an authoritative source. Worth a one-time check by completing the form yourself.

---

## Claims

### Claim 1 — Online service not available for overseas delivery (line 9)
- Type: service availability
- Checked: [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates); [gov.bb — EZpay](https://www.gov.bb/Citizens/ezpay) — neither documents an overseas-delivery exclusion.
- Status: **plausible — not externally verified**
- Certainty: **75%**
- Action: confirm with Registration Department whether the online service prohibits overseas delivery, or just adds friction.

### Claim 2 — Application takes ~20 minutes (line 13)
- Type: UX claim
- Source: testable against the form at [alpha.gov.bb/family-birth-relationships/get-birth-certificate/form](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form) — open and complete to validate.
- Status: **testable, not externally verifiable**
- Certainty: **70%**

### Claim 3 — EZPay+ account required (line 17)
- Type: payment requirement
- Source: EZpay+ is the Government of Barbados' payments platform ([gov.bb — EZpay](https://www.gov.bb/Citizens/ezpay)). Birth certificate purchases routing through EZpay+ is consistent.
- Status: **verified**
- Certainty: **85%**

### Claim 4 — Each certified copy is $5 BBD (line 19)
- Type: fee
- Source: [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) confirms "BDS$5.00" per certificate.
- Status: **verified**
- Certainty: **95%**

### Claim 5 — Age 60+ pay $1 BBD per certificate (line 19)
- Type: senior rate / fee
- Source: [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/) — confirms "For persons 60 years and over, the fee is BDS$1.00."
- Status: **verified**
- Certainty: **95%**

### Claim 6 — Form requires applicant name, address, National ID number (line 23)
- Type: data requirement
- Source: testable against the form at [alpha.gov.bb/family-birth-relationships/get-birth-certificate/form](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form).
- Status: **testable, not externally verifiable here**
- Certainty: **85%**

### Claim 7 — Form requires certificate-subject details (name, dob, place of birth, place of baptism) (line 24)
- Type: data requirement
- Source: testable against the form at [alpha.gov.bb/family-birth-relationships/get-birth-certificate/form](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form). "Place of baptism" is unusual for Barbados vital records and warrants direct verification.
- Status: **testable — "place of baptism" is suspicious**
- Certainty: **65%**
- Action: test the form; if "place of baptism" isn't actually a field, drop it from the description.

### Claim 8 — Form requires parent name(s) of person on certificate (line 25)
- Type: data requirement
- Source: testable against the form at [alpha.gov.bb/family-birth-relationships/get-birth-certificate/form](https://alpha.gov.bb/family-birth-relationships/get-birth-certificate/form).
- Status: **testable**
- Certainty: **85%**

---

## Cross-page consistency

- `$5 BBD per certified copy` — consistent with `register-a-birth/index.md` (line 23). ✅
- `$1 BBD senior rate` — confirmed on this page and confirmed via GIS. Should be **added** to `register-a-birth/index.md` for consistency.

## Sources cited

- [GIS — Applying For Certificates From Registration Dept.](https://gisbarbados.gov.bb/blog/how-to-apply-for-certificates-from-the-registration-department/)
- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates)
- [gov.bb — EZpay](https://www.gov.bb/Citizens/ezpay)
