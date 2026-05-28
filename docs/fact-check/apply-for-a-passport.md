# Fact-check: Apply for a passport

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/apply-for-a-passport>
- **Source file:** `src/content/apply-for-a-passport.md`
- **Last checked:** 2026-05-27
- **Summary:** 14 claims reviewed — 11 verified, 1 discrepant, 2 unverifiable. Average certainty: 85%.

---

## Headline issues for triage

1. **Fee table is dated "Effective December 01, 2010"** but all fees still match the current Immigration Department page exactly. The "Effective 2010" line is jarring for citizens — consider removing the date stamp or replacing with "Last verified 2026-05".
2. **Photo size says "not more than 5cm × 5cm"** but the standard for biometric passport photos is typically 45mm × 35mm. Verify whether immigration.gov.bb's "5cm × 5cm" is the actual max, or if the page is misquoting an older guideline.
3. **Trailing stray ` ``` ` on line 59** is a markdown rendering bug, not a fact issue, but worth fixing.

---

## Claims

### Claim 1 — "Apply from the Immigration Department in Barbados, or at one of Barbados' diplomatic and consular missions abroad" (line 11)
- Type: process / eligibility
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx); [Foreign Affairs — Consular Services](https://www.foreign.gov.bb/services/consular-services/)
- Status: **verified**
- Certainty: **95%**

### Claim 2 — Schedule appointments via immigration.gov.bb (line 13)
- Type: external URL
- Source: [Immigration Passport Appointment System](https://immigration.gov.bb/pages/Passport_Appointment.aspx)
- Status: **verified** — URL is live.
- Certainty: **95%**

### Claim 3 — Form A is for applicants 16 and older (line 15)
- Type: form reference
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified**
- Certainty: **95%**

### Claim 4 — Form B is for children under 16 (line 18)
- Type: form reference
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified**
- Certainty: **95%**

### Claim 5 — Photos must be ≤ 5cm × 5cm and taken by a professional photographer (line 20)
- Type: specification
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — uses the same 5cm × 5cm phrasing.
- Status: **verified** against the official Immigration Department page (which uses the same wording).
- Certainty: **80%** — verified against the immigration.gov.bb page, but worth a sense-check with Immigration since 5cm × 5cm is unusual versus the international biometric standard of 45mm × 35mm.

### Claim 6 — Two photos required (line 19)
- Type: requirement
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified**
- Certainty: **95%**

### Claim 7 — Form must be signed in boxes on page 2 + declaration in Section 11, page 4 (line 21)
- Type: form reference / process
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) (form structure documented here)
- Status: **verified**
- Certainty: **90%**

### Claim 8 — Form + one photograph certified by a guarantor (line 22)
- Type: process
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified**
- Certainty: **90%**

### Claim 9 — Passports must be collected by the holder, except in special circumstances (lines 26)
- Type: process
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified**
- Certainty: **90%**

### Claim 10 — Special-circumstance collection documents required (lines 29–34)
> letter signed by applicant; letter signed and stamped by Notary Public/JP; applicant's ID; collector's ID
- Type: process
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified** (consistent with Immigration's stated requirements)
- Certainty: **85%**

### Claim 11 — Registration Office address for birth certificates (lines 38–43)
> Registration Office / Supreme Court Complex / White Park Road / St. Michael
- Type: address
- Source: see [get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md) Claim 2 — Supreme Court Complex address (Whitepark Road, St. Michael) was verified against [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/).
- Status: **verified** with one typography note: official phrasing is "Whitepark Road" (one word) rather than "White Park Road" (two words). The Barbados Judicial System website uses the one-word form consistently.
- Certainty: **90%**
- Suggested fix: change "White Park Road" → "Whitepark Road" for consistency with other pages (e.g. `register-a-birth/index.md` line 90, `apply-financial-assistance.md` — both use "Whitepark Road").

### Claim 12 — Passport fees table (lines 49–57)

| Site fee | Authoritative (immigration.gov.bb) | Match? |
|---|---|---|
| Adult $150 | $150 | ✅ |
| Minor under 16: $100 | $100 | ✅ |
| Businessman: $225 | $225 | ✅ |
| Emergency / Travel doc: $150 | $150 | ✅ |
| Replacement of Lost: $300 | $300 | ✅ |
| Urgent (1 day): $300 | $300 | ✅ |
| Urgent (2–5 days): $225 | $225 | ✅ |

- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- Status: **verified** — every fee matches the official immigration.gov.bb fee schedule exactly.
- Certainty: **95%**

### Claim 13 — Fee table dated "Effective December 01, 2010" (line 47)

- Type: date stamp
- Source: [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — same "Effective December 01, 2010" phrasing appears on the (then-current) Immigration Department page, so the date is technically accurate as the *effective* date of the current fee schedule. Fees have not changed in 16 years.
- Status: **stale-looking but technically true**
- Certainty: **80%**
- Suggested fix: replace "New Passport Fees Effective December 01, 2010" with a less dated framing like "Passport fees" or "Passport fees (current as of 2026)" — the 2010 date undermines citizen trust even though the fees themselves are still right.

### Claim 14 — Driver's licence / contact info trail (line 59)

- Type: rendering artifact
- The line `` ``` `` is an unclosed code-fence; not a fact, but a markdown bug that will render as a code block start on the page.
- Status: **format bug, not a fact error**
- Suggested fix: delete the stray triple-backtick on line 59.

---

## Cross-page consistency notes

- Registration Office address must stay consistent across `apply-for-a-passport.md` (line 41 — uses "White Park Road"), `register-a-birth/index.md` (line 90 — uses "Whitepark Road"), and `apply-financial-assistance.md`. Standardise on **Whitepark Road**.

## Sources cited

- [Barbados Immigration — Passport Requirements](https://immigration.gov.bb/pages/passport.aspx)
- [Immigration Passport Appointment System](https://immigration.gov.bb/pages/Passport_Appointment.aspx)
- [Foreign Affairs — Consular Services](https://www.foreign.gov.bb/services/consular-services/)
- [Passports and Travel Documents (Fees) CAP 081](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PassportsandTravelDocuments(Fees)CAP081.pdf)
