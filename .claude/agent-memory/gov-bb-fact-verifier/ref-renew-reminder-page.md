---
name: ref-renew-reminder-page
description: Renew-reminder page — internal utility with no external agency facts; one discrepancy (National ID Card missing from body copy); F-071 filed
metadata:
  type: reference
---

## Renew reminder page (alpha.gov.bb)

**Live page:** https://alpha.gov.bb/travel-id-citizenship/renew-reminder
**Source file:** `src/content/renew-reminder/index.md`
**Fact-check report:** `/docs/fact-check/renew-reminder.md`
**Last checked:** 2026-05-28

### Key findings

**This is an all-internal utility page** — no fees, addresses, phone numbers, legal references, or external government agency names appear. All facts are self-referential (what the service does/does not collect). No cross-verification against .gov.bb external sources was needed or possible.

**One discrepancy (F-071, Tier A):**
- Body text (line 17) lists "driver's licence, vehicle registration, passport, or other government permit" but omits "National ID Card."
- The live form at `/travel-id-citizenship/renew-reminder/form` lists "National ID Card — Barbados National Identification Card" as its *first* document-type option.
- `content-directory.ts` description (lines 448–449) correctly includes "National ID Card."
- Frontmatter keywords (line 11) also include "national ID."
- Fix: add "National ID Card" to the body-text list before "or other government permit."

**One unverifiable claim:**
- "It takes less than a minute" — plausible given the minimal inputs (document type + expiry date only), but untested end-to-end.

**Privacy notice URL verified:**
- `https://alpha.gov.bb/terms-conditions` resolves with full Terms & Conditions content including a data-handling section referencing the Barbados Data Protection Act 2019.
- Caveat: page is titled "Terms & Conditions", not "Privacy Notice" — the link text says "privacy notice" which is a label mismatch. Low-stakes editorial issue.

**Form document types (6 options confirmed on live form):**
1. National ID Card — Barbados National Identification Card
2. Driver's Licence — Issued by the Barbados Licensing Authority
3. Passport — Travel document
4. Vehicle Registration — Registration certificate for a car, van, or motorcycle
5. Permit — Work permit, business permit, or similar
6. Other — Anything else with an expiry date

### Pattern note
When fact-checking utility/tool pages (calculator, reminder, form), external .gov.bb cross-verification is not applicable — focus verification on: (a) internal consistency (body vs form vs content-directory.ts vs keywords), (b) privacy/data claims vs terms-conditions page, (c) any referenced external URLs.
