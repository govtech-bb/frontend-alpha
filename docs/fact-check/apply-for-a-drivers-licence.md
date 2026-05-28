# Fact-check: Apply for a driver's licence

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/apply-for-a-drivers-licence>
- **Source file:** `src/content/apply-for-a-drivers-licence.md`
- **Last checked:** 2026-05-27
- **Summary:** 15 claims reviewed — 12 verified, 2 discrepant, 1 unverifiable. Average certainty: **87%**.

---

## Headline issues for triage

1. **"30 days minimum before driving test" appears to be wrong.** The BLA states first-time learners must "practice for a minimum three (3) months before applying for the driving examination" — 90 days, not 30. ([BLA — Learner Permit](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=))
2. **Phone "1-246-536-0264 / 1-246-536-0265"** — only `0265` is on the BLA's official contact list. The BLA publishes `+1 (246) 536-0265 / 0267 / 0278`. `0264` is either obsolete or wrong.
3. **Broken sentence on line 14** — same as flagged in F-012, needs rewriting.
4. **Stray ` ``` ` on line 68** — markdown bug, same as F-005.

---

## Claims

### Claim 1 — Motor Vehicles Act, 1988 governs driving licences (line 11)
- Type: legal reference
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence) confirms "Motor Vehicles Act, 1988"
- Status: **verified**
- Certainty: **90%**

### Claim 2 — Minimum age for Learner's Permit is 16 (line 14)
- Type: legal/age threshold
- Sources: [gov.bb](https://www.gov.bb/Citizens/driver-licence); [BLA](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=)
- Status: **verified** — both sources confirm.
- Certainty: **95%**

### Claim 3 — Minimum age for permanent licence is 18 (line 16)
- Type: legal/age threshold
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence)
- Status: **verified**
- Certainty: **95%**

### Claim 4 — Minimum age for commercial vehicle licence is 20 (line 18)
- Type: legal/age threshold
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence)
- Status: **verified**
- Certainty: **95%**

### Claim 5 — Regulations Test fee $30 BDS (line 31, line 56)
- Type: fee
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence) — confirms $30.00
- Status: **verified**
- Certainty: **95%**

### Claim 6 — Learner's Permit fee $80 (line 55)
- Type: fee
- Sources: [gov.bb](https://www.gov.bb/Citizens/driver-licence) and [BLA — Learner Permit](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=) — both confirm $80.00.
- Status: **verified**
- Certainty: **95%**

### Claim 7 — Driving Test fee $100 (line 57)
- Type: fee
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence)
- Status: **verified**
- Certainty: **95%**

### Claim 8 — Driver's Licence fee $50 (line 58)
- Type: fee
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence)
- Status: **verified**
- Certainty: **95%**

### Claim 9 — International Driver's Licence fee $65 (line 59)
- Type: fee
- Source: [gov.bb — Driver Licence](https://www.gov.bb/Citizens/driver-licence)
- Status: **verified**
- Certainty: **95%**

### Claim 10 — Driving Test eligibility: 30–180 days after Learner's Permit (line 35)
- Type: process/timeline
- Source: [BLA — Learner Permit](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=) — confirms "First-time permit holders must practice for a **minimum three (3) months** before applying for the driving examination." That's **90 days**, not 30.
- Status: **DISCREPANT**
- Confidence it's wrong: **80%**
- **Suggested fix:** change "after 30 days" to "after 3 months (90 days)". The 180-day upper bound was not corroborated by the BLA page; verify or remove.

### Claim 11 — International Driving Licence validity = 1 year max (line 39)
- Type: validity period
- Checked: [Barbados Licensing Authority](https://bla.gov.bb/); [gov.bb — Get a Driver Licence](https://www.gov.bb/Citizens/driver-licence) — validity period not explicitly stated on either. International driving permits commonly have 1-year validity by convention.
- Status: **unverifiable from public web**
- Certainty: **70%**

### Claim 12 — Documents required for International Driving Permit (lines 43–49)
- Type: document list
- Checked: [Barbados Licensing Authority](https://bla.gov.bb/) — IDP document list not detailed on public site. Basic items (valid licence, passport, photos) are standard; "Itinerary for countries to be visited" is unusual.
- Status: **partially verifiable**
- Certainty: **70%**

### Claim 13 — BLA website URL https://bla.gov.bb (line 61)
- Type: external URL
- Source: [bla.gov.bb](https://bla.gov.bb) — directly fetched, returned valid content.
- Status: **verified — live**
- Certainty: **100%**

### Claim 14 — BLA email `blasupport@barbados.gov.bb` (line 65)
- Type: contact
- Source: [BLA homepage](https://bla.gov.bb) — confirms `BLASupport@barbados.gov.bb`
- Status: **verified** (case-insensitive match)
- Certainty: **95%**

### Claim 15 — BLA phone 1-246-536-0264 / 1-246-536-0265 (line 67)
- Type: phone
- Source: [BLA homepage](https://bla.gov.bb) — publishes `+1 (246) 536-0265 / 0267 / 0278`. Only `0265` overlaps with the site's list. `0264` is not on the BLA's published contact.
- Status: **DISCREPANT** — `0264` not on BLA's list; `0267` and `0278` missing from site.
- Confidence it's wrong: **80%**
- **Suggested fix:** update to `(246) 536-0265 / 0267 / 0278` per the BLA's published contact.

---

## Additional finding (not on the page but should be)

- **BLA physical address:** "Pine East–West Boulevard, Bridgetown, St. Michael" — per the BLA website. The page has no physical address for the BLA; useful for citizens needing in-person service.

## Sources cited

- [gov.bb — Get a Driver Licence](https://www.gov.bb/Citizens/driver-licence)
- [Barbados Licensing Authority — Home](https://bla.gov.bb/)
- [BLA — Learner Permit Service Details](https://bla.gov.bb/servicedetails/TGVhcm5lciBQZXJtaXQ=)
- [Road Traffic Act CAP 295 (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/RoadTrafficCAP295.pdf) — also relevant; cross-reference with Motor Vehicles Act 1988 to confirm which governs licences.
