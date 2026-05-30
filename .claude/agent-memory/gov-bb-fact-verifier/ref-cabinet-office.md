---
name: ref-cabinet-office
description: Cabinet Office contacts, mandate, associated department, shared PBX with PMO, Electoral Dept name inconsistency in ministries.ts
metadata:
  type: reference
---

Cabinet Office — Government Headquarters, Bay Street, St. Michael, Barbados, W.I.

**PBX:** (246) 535-5300 (shared with PMO — both co-located in Government Headquarters)
**Cabinet Secretary line:** (246) 535-5380
**Deputy Permanent Secretary:** (246) 535-5385
**Administrative Officer I:** (246) 535-5486 (connectb1m shows 535-5385 — typo on that site)
**Administrative Officer II:** (246) 535-5499
**Senior Executive Officer:** (246) 535-5382
**Executive Officer:** (246) 535-5624
**Accounts:** (246) 535-5381
**Registry:** (246) 535-5607
**Fax:** (246) 535-5649 / 5650 (different from PMO fax 535-5659/5357/5341/5638)
**Email:** cabinetoffice@barbados.gov.bb

**Mandate (verbatim, gov.bb):** "The Cabinet Office is to be an efficient secretariat for the Cabinet and its committees and to ensure that the stated constitutional and statutory functions are executed."

**Current Cabinet Secretary:** Mrs. Donna Cadogan (appointed May 2022 as Head of the Public Service and Cabinet Secretary). Still listed as such at 2025 Government Service Delivery conference, but gov.bb profile page is stale (still shows her Tourism PS role). No Tier 1 2026 confirmation available.

**Associated department:** The Electoral and Boundaries Commission (ebc.gov.bb). Gov.bb uses this name; alpha.gov.bb Cabinet Office page also correct. HOWEVER: `src/data/ministries.ts` PMO entry (line 63) uses the older informal name "Electoral Department" instead — internal inconsistency, not a public-facing error on the Cabinet Office page.

**No minister:** Cabinet Office has no minister (it is a secretariat). `src/data/ministries.ts` Cabinet Office entry correctly omits the `minister` field.

**Sources:** gov.bb/Ministries/cabinet-office; gov.bb/government-main/directory/cabinet-office — all verified 2026-05-28.

**Why:** Needed to verify the Cabinet Office ministry page on alpha.gov.bb (src/content/ministries/cabinet-office.md). All 13 factual claims verified; 1 open question on Cabinet Secretary postholder name.

**How to apply:** When checking any page that references the Cabinet Office or Government Headquarters, use these verified contacts. Flag any use of "Electoral Department" as stale — the correct name is "Electoral and Boundaries Commission".
