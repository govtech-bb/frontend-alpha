# Internal consistency report

- **Last checked:** 2026-05-27
- **Scope:** Mismatches between markdown content and the canonical data files (`src/data/*.{ts,json}`).
- **Method:** Grep-based comparison against the canonical lists in `ministries.ts`, `departments.ts`, etc., supplemented by manual reading during Phase D.

This file flags **specific** mismatches the team can fix mechanically. For broader fact-checking against external authorities, see the per-page reports in `docs/fact-check/<slug>.md`.

---

## Canonical ministry names (from `src/data/ministries.ts`)

The following names are authoritative. Any deviation in content should be normalised to these:

- Ministry of Agriculture and Food and Nutritional Security
- Ministry of Educational Transformation
- Ministry of Energy and Business Development
- Ministry of Environment and National Beautification
- Ministry of Finance, Economic Affairs and Investment
- Ministry of Foreign Affairs and Foreign Trade
- Ministry of Health and Wellness
- Ministry of Home Affairs and Information
- Ministry of Housing, Lands and Maintenance
- Ministry of Industry, Innovation, Science and Technology
- Ministry of Labour, Social Security and Third Sector
- Ministry of People Empowerment and Elder Affairs
- Ministry of the Public Service and Talent Development
- Ministry of Tourism and International Transport
- Ministry of Training and Tertiary Education
- Ministry of Transport, Works and Water Resources
- Ministry of Youth, Sports and Community Empowerment

---

## Mismatches found

### "Ministry of Labour" / "Ministry of Labour and Social Partnership Relations" vs canonical "Ministry of Labour, Social Security and Third Sector"

- **Canonical:** Ministry of Labour, Social Security and Third Sector
- **Used in content:**
  - `src/content/jobseekers.md` lines 3, 11, 19, 30 — uses "Ministry of Labour and Social Partnership Relations" (an older ministry name).
  - `src/content/business-policies-and-law.md` lines 3, 11, 13 — uses bare "Ministry of Labour" without the full title.
  - `src/content/apply-to-jobstart-plus-programme/index.md` lines 50, 54, 70 — uses the canonical form. ✅
- **Action:** Update the older naming on `jobseekers.md` and `business-policies-and-law.md` to the canonical form.

### "Ministry of Transport and Works" vs canonical "Ministry of Transport, Works and Water Resources"

- **Canonical:** Ministry of Transport, Works and Water Resources
- **Used in content:**
  - `src/content/apply-for-conductor-licence/index.md` lines 22, 27 — uses "Ministry of Transport and Works" (older name).
- **Action:** Update to the full canonical form.

### "Ministry of Youth and Community Empowerment" vs canonical "Ministry of Youth, Sports and Community Empowerment"

- **Canonical:** Ministry of Youth, Sports and Community Empowerment
- **Used in content:**
  - `src/content/apply-to-the-barbados-youthadvance-corps.md` lines 28, 82 — drops "Sports".
  - `src/content/register-for-community-sports-training-programme/index.md` line 27 — uses canonical. ✅
  - `src/content/apply-to-be-a-project-protege-mentor/index.md` line 26 — uses canonical. ✅
- **Action:** Add "Sports," to the YouthADVANCE content.

### "Ministry of Environment and Natural Beautification" vs canonical "Ministry of Environment and National Beautification"

- **Canonical:** Ministry of Environment and **National** Beautification
- **Used in content:**
  - `src/content/ministries/ministry-of-environment-and-national-beautification.md` line 1 — uses "Natural Beautification" (typo) in the first line; subsequent lines use the canonical "National". 🐛
- **Action:** Fix the typo on line 1.

---

## Address inconsistencies

### Supreme Court Complex address

- **Canonical phrasing (per Barbados Judicial System):** "Whitepark Road, St. Michael"
- **Used in content:**
  - `src/content/register-a-birth/index.md` line 90 — "Whitepark Road / St. Michael" ✅
  - `src/content/apply-for-a-passport.md` line 41 — "White Park Road / St. Michael" (two words instead of one)
  - `src/content/get-a-document-notarised.md` line 27 — "Whitepark Road / Bridgetown / Saint Michael" — adds "Bridgetown" which is loose but not wrong
- **Action:** Standardise on "Whitepark Road" (one word) on the passport page.

### Welfare Department address spelling

- `src/content/apply-financial-assistance.md` line 42 uses "Weymouth Corporate **Center**" (American)
- `src/content/apply-financial-assistance.md` line 98 uses "Weymouth Corporate **Centre**" (British)
- **Action:** Standardise on "Centre" (Barbados uses British spelling).

### CAIPO (Intellectual Property Office) address

- `src/content/get-a-document-notarised.md` lines 31–35 says "Baobab Tower / Highway 2 / Saint Michael"
- **Canonical (per caipo.gov.bb, gov.bb State-Bodies):** "Ground Floor, Baobab Towers, Warrens, St. Michael" — "Towers" plural; located at Warrens, not "Highway 2".
- **Action:** Fix on the notarisation page.

---

## Typos and minor errors found

- `src/content/apply-financial-assistance.md` line 33 — heading reads "How to apply for financial **assitance**" (missing 's').
- `src/content/register-a-birth/index.md` line 120 — "**Cane Carden** St. Thomas" likely "Cane Garden".
- `src/content/apply-for-a-passport.md` line 59 — stray ` ``` ` triple-backtick (markdown rendering bug).
- `src/content/apply-for-a-drivers-licence.md` line 68 — stray ` ``` ` triple-backtick (same rendering bug).
- `src/content/apply-for-a-drivers-licence.md` line 14 — sentence is broken English: "you may be obtaining a Learner's License for a private motor vehicle for a vehicle is 16 years".

---

## Phone-format inconsistency (cosmetic)

The site uses at least four phone number formats across pages:

- `(246) 535-9700` — `justice-of-the-peace.md`, `register-a-birth/index.md`
- `1-246-536-0264` — `apply-for-a-drivers-licence.md`
- `+1 246-535-1000/16/23` — `apply-financial-assistance.md`
- `tel:+12465359700` (in href) — `justice-of-the-peace.md`

Pick one display format (suggest `(246) XXX-XXXX`) and standardise across pages. This is cosmetic but consistent formatting improves trust.

---

## Out-of-scope for Slice 1 (queued for later slices)

- Full cross-check of `src/data/opportunities.json` entries against the youth content pages.
- Full cross-check of `src/data/justices-of-the-peace.json` count against the `/justices-of-the-peace-2024.pdf` and the JP-page claims (436 names, 563 new appointments).
- Full cross-check of `src/data/pharmacies.json` against the BDS-participating pharmacies list.
- Full cross-check of `src/data/departments.ts` against department names mentioned in markdown.
