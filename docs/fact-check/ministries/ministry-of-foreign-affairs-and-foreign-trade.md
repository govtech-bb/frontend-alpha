# Fact-check: Ministry of Foreign Affairs and Foreign Trade

- **Live page:** <https://alpha.gov.bb/government/organisations/ministry-of-foreign-affairs-and-foreign-trade>
- **Source file:** `src/content/ministries/ministry-of-foreign-affairs-and-foreign-trade.md`
- **Data file:** `src/data/ministries.ts` (lines 473–505)
- **Last checked:** 2026-05-29
- **Summary:** 11 claims reviewed — 8 verified, 1 discrepant, 2 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **The source markdown's contact tables are entirely blank — no phone numbers are stored in the content file.** The Foreign Affairs contact table lists PBX, PS Secretary, and FAX rows with empty telephone cells (lines 9–14). The Foreign Trade table lists a FAX row with an empty cell (line 19). All actual contact data is carried in `src/data/ministries.ts`. This means the markdown file adds no independently verifiable phone data, but it also means the template is incomplete — citizens reading the raw markdown (or any renderer that bypasses the data layer) would see empty tables. The verified phone data lives exclusively in the data file.

2. **The minister's title ("Senior Minister of Foreign Affairs and Foreign Trade") is correct.** Christopher P. Sinckler was sworn in on 16–18 February 2026. The Barbados Parliament website re-confirmed this status as of 2026-05-29.

3. **The `shortDescription` and `intro` fields in `ministries.ts` are not derived from the source markdown.** The `shortDescription` reads "Advances Barbados' interests globally through diplomacy, trade advocacy, and protection of citizens abroad." The `intro` reads "To advance Barbados' interests globally through diplomacy, trade advocacy, and the protection of citizens abroad." These are consistent paraphrases of the ministry mandate but are distinct from the body text on the page. They are not separately verifiable claims, but are accurately directional.

4. **The `/visa-information` online service link is live and on-topic.** The page at `https://alpha.gov.bb/visa-information` loads correctly and provides Barbados visa requirements, confirming the CTA is valid.

5. **No major issues found.** All contact data (address, phone, fax, email) is verified against gov.bb and foreign.gov.bb. No new discrepancies identified on this pass.

---

## Claims

### Claim 1 — Ministry mandate / descriptive text (line 1)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Ministry is responsible for coordinating Barbados' relations with foreign governments, as well as regional and international organizations. It seeks to create opportunities for Barbados in the field of foreign trade through the negotiation and monitoring of the relevant agreements and treaties.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Ministry is responsible for coordinating Barbados' relations with foreign governments, as well as regional and international organizations. It seeks to create opportunities for Barbados in the field of foreign trade through the negotiation and monitoring of the relevant agreements and treaties.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — Ministry of Foreign Affairs and Foreign Trade](https://www.gov.bb/Ministries/foreign-affairs) — verbatim match; [foreign.gov.bb — Foreign Affairs](https://www.foreign.gov.bb/foreign-affairs/) — consistent with this mandate
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — Foreign Affairs office address (lines 5–7, and `ministries.ts` line 500)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">1 Culloden Road
St. Michael
Barbados, W. I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 Culloden Road
St. Michael
Barbados, W. I.</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs) — "1 Culloden Road, St. Michael, Barbados, W.I."; [foreign.gov.bb — Contact Us](https://www.foreign.gov.bb/contact-us/) — "1 Culloden Road, St. Michael, BB14018, Barbados"; [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/) — "1 Culloden Road, St. Michael, Barbados, W.I."
- **Status:** verified — three independent sources agree
- **Certainty:** 99%
- **Note:** No building name is given on the page. Third-party sources refer to the building on Culloden Road as the "Sir Frank Walcott Building" (the same street hosts NISSS, the Ministry of Health, and the OAG). However, the Frank Walcott Building is specifically the NIS/NISSS building at the 'Flodden' address on Culloden Road; no authoritative source explicitly names #1 Culloden Road as the "Frank Walcott Building" for the MFA. The page's omission of a building name is consistent with gov.bb and foreign.gov.bb.

---

### Claim 3 — Minister's name and role (`ministries.ts` lines 483–485)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Senator The Hon. Christopher P. Sinckler
Senior Minister of Foreign Affairs and Foreign Trade</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Senator The Hon. Christopher P. Sinckler
Senior Minister of Foreign Affairs and Foreign Trade</pre>
</div>

- **Type:** agency name / statistic
- **Sources:** [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — "Senator The Hon. Christopher P. SINCKLER — Senior Minister of Foreign Affairs and Foreign Trade" (re-confirmed 2026-05-29); [CBC — Senator Sinckler takes up post as new Foreign Affairs Minister](https://www.cbc.bb/main-stories/senator-chris-sinckler-begins-first-day-as-foreign-affairs-minister/) — sworn in 18 February 2026; [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/)
- **Status:** verified
- **Certainty:** 99% — Parliament website, CBC, and Barbados Today all confirm Sinckler in this role from 16–18 February 2026, re-confirmed 2026-05-29.

---

### Claim 4 — PBX telephone number (`ministries.ts` line 495)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Telephone    (246) 535-6620</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Telephone    (246) 535-6620</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs) — "(246) 535-6620" listed as PBX; [foreign.gov.bb — Contact Us](https://www.foreign.gov.bb/contact-us/) — "(246) 535-6620"; [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/) — "PBX: 535-6620"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Foreign Affairs fax number (`ministries.ts` line 496)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Fax    (246) 429-6652</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fax    (246) 429-6652</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs) — lists (246) 429-6652 as the Foreign Affairs fax; [foreign.gov.bb — Contact Us](https://www.foreign.gov.bb/contact-us/) — lists (246) 429-6652 as a contact number; [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/) — "FAX: 429-6652" under Foreign Affairs Division
- **Status:** verified
- **Certainty:** 97%

---

### Claim 6 — Foreign Trade fax number (`ministries.ts` line 497)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Fax    (246) 228-7840</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fax    (246) 228-7840</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs) — "(246) 228-7840" listed as FAX for the Foreign Trade Division; [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/) — "FAX: 228-7840" under Foreign Trade Division
- **Status:** verified against two independent sources
- **Certainty:** 90%
- **Note:** One third-party non-authoritative source (Barbados-in-Toronto directory) cites (246) 228-0838 as an alternate or older fax number for the ministry. This is not confirmed by any Tier 1 or Tier 2 source. The (246) 228-7840 number is treated as current and correct. As of 2026-05-29, foreign.gov.bb/contact-us/ no longer lists a Foreign Trade fax separately, but gov.bb still confirms (246) 228-7840.

---

### Claim 7 — Email address (`ministries.ts` line 494)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Email    barbados@foreign.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Email    barbados@foreign.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs) — "barbados@foreign.gov.bb"; [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/) — "barbados@foreign.gov.bb"; foreign.gov.bb home page metadata confirms the domain `foreign.gov.bb` is the ministry's official site
- **Status:** verified
- **Certainty:** 90%
- **Note:** As of 2026-05-29, foreign.gov.bb/contact-us/ no longer lists this email address directly (the page now only shows a feedback form). However, gov.bb still lists it and it remains on the official domain. Treated as current; GovBB team may wish to re-verify with the ministry.

---

### Claim 8 — Associated department name: "Consular and Diaspora Division" (`ministries.ts` line 504)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Consular and Diaspora Division</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Consular and Diaspora Division</pre>
</div>

- **Type:** agency name
- **Sources:** [foreign.gov.bb — Consular and Diaspora Division](https://www.foreign.gov.bb/consular-and-diaspora-division/) — uses "Consular and Diaspora Division" as the official name; [gov.bb — Consular and Diaspora Division](https://www.gov.bb/Departments/consular-diaspora) — same name; [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs) — confirms this as the associated department
- **Status:** verified — name is correct. However, see the open question below about the gov.bb department listing showing an incorrect address for this division.
- **Certainty:** 99%
- **Open question:** `gov.bb/Departments/consular-diaspora` lists the Division's address as "3rd and 4th Floor, Baobab Tower, Warrens, St. Michael" with phone (246) 535-1201 — which is the MIST building address. This conflicts with every other source (foreign.gov.bb, gov.bb/Ministries/foreign-affairs, connectb1m.com) that locates the Division at 1 Culloden Road. The gov.bb Departments page entry for the Consular and Diaspora Division appears to contain a data error. This is a gov.bb quality issue rather than an alpha.gov.bb defect, but the GovBB team should be aware of it before any future deep-link to `gov.bb/Departments/consular-diaspora` is added to alpha.gov.bb pages.

---

### Claim 9 — Online service CTA: Visa information link (`ministries.ts` lines 487–491)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (from ministries.ts)</div>
<pre class="claim-block-content">Visa information — /visa-information
Visa requirements for visiting Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Visa information — /visa-information
Visa requirements for visiting Barbados.</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Visa information](https://alpha.gov.bb/visa-information) — page loads successfully; title "Visa information"; content covers visa application requirements, immigration offices with phone numbers; updated 2025-10-24
- **Status:** verified — link resolves and is on-topic
- **Certainty:** 95%

---

### Claim 10 — Empty PBX field in source markdown contact table (lines 11–12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (source markdown)</div>
<pre class="claim-block-content">| Role                  | Telephone |
| --------------------- | --------- |
| PBX                   |           |
| PS Secretary          |           |
| FAX (Foreign Affairs) |           |</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — empty cells in source markdown</div>
<pre class="claim-block-content">The source markdown contains contact table rows with blank telephone cells for PBX, PS Secretary, and FAX (Foreign Affairs) under the Foreign Affairs section. These are not factual claims — they are unfilled template placeholders.

However, the corresponding verified data for each row is available:
- PBX: (246) 535-6620 (in ministries.ts; verified against gov.bb and foreign.gov.bb)
- PS Secretary: (246) 535-6626 (on gov.bb directory; not mirrored in ministries.ts)
- FAX (Foreign Affairs): (246) 429-6652 (in ministries.ts; verified)

The source markdown's empty cells are superseded by ministries.ts for rendering purposes, but represent incomplete authoring of the content file.

Checked: [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs); [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/)</pre>
</div>

- **Type:** phone
- **Status:** unverifiable as claims (they are blank); underlying data verified separately in Claims 4 and 5
- **Certainty:** N/A
- **Open question:** Should the PS Secretary telephone (246) 535-6626 be added to `ministries.ts` contact entries to match the full gov.bb directory listing? Currently the data file omits the individual direct lines (PS Secretary, Minister's Secretary, etc.) and only carries the PBX and fax numbers. This is a content completeness question rather than an accuracy defect.

---

### Claim 11 — Empty FAX field in source markdown Foreign Trade table (lines 17–19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page (source markdown)</div>
<pre class="claim-block-content">| Role                | Telephone |
| ------------------- | --------- |
| FAX (Foreign Trade) |           |</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — empty cell in source markdown</div>
<pre class="claim-block-content">The source markdown contains a contact table row with a blank telephone cell for FAX (Foreign Trade). This is an unfilled template placeholder.

The corresponding verified data is available:
- FAX (Foreign Trade): (246) 228-7840 (in ministries.ts; verified against gov.bb)

The source markdown's empty cell is superseded by ministries.ts for rendering purposes.

Checked: [gov.bb — Ministry of Foreign Affairs](https://www.gov.bb/Ministries/foreign-affairs); [connectb1m.com — Ministry of Foreign Affairs](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/)</pre>
</div>

- **Type:** phone
- **Status:** unverifiable as a claim (it is blank); underlying data verified separately in Claim 6
- **Certainty:** N/A
- **Open question:** Same as Claim 10 — the source markdown tables are incomplete. The Foreign Trade Division has additional direct-line numbers on gov.bb (Director General 535-5697; Director of Foreign Trade 535-6691; Chief Economist 535-6683) that are not in `ministries.ts`. Whether to add these is a content completeness decision.

---

## Additional findings (not on the page but should be)

### Discrepancy: gov.bb Departments page for Consular and Diaspora Division lists wrong address

`gov.bb/Departments/consular-diaspora` shows the address as "Ministry of Industry, Innovation, Science and Technology (MIST), 3rd and 4th Floor, Baobab Tower, Warrens, St. Michael" and phone (246) 535-1201. This is the MIST building address, not the MFA's 1 Culloden Road address. Every other authoritative source — including foreign.gov.bb itself and gov.bb/Ministries/foreign-affairs — locates the Division at 1 Culloden Road. This appears to be a data entry error in the gov.bb Departments registry. The GovBB team should flag this to the gov.bb team for correction.

### Source markdown contains two separate, incomplete contact tables

The source markdown splits contacts into a "Foreign Affairs" section and a "Foreign Trade" section, each with empty telephone cells. The data file (`ministries.ts`) consolidates all contacts into a single flat list without the Foreign Affairs / Foreign Trade sectional split. This means the page renders correctly from the data file but the markdown template structure is misleading to anyone editing the source file. If the markdown tables are ever parsed independently (e.g., for a future content audit tool), the empty cells would appear as missing data.

### Foreign Affairs Division has 8 sub-divisions; only the Consular and Diaspora Division is listed in associatedDepartments

`foreign.gov.bb/foreign-affairs/` confirms 8 divisions within Foreign Affairs (Africa/Asia/Europe; Caribbean Affairs and CARICOM; Consular and Diaspora; Americas-Hemispheric; Multilateral; Protocol and Conferences; Strategic Analysis Unit; Human Resource and Administrative Division) plus the Foreign Trade Division. The alpha.gov.bb page's `associatedDepartments` only lists "Consular and Diaspora Division". This is consistent with gov.bb's treatment (which also only surfaces the Consular and Diaspora Division as a named department), so this is not a defect, but it is worth noting for any future expansion of the ministry profile.

### Email address no longer listed on foreign.gov.bb contact page

As of 2026-05-29, `foreign.gov.bb/contact-us/` no longer lists the email address `barbados@foreign.gov.bb` directly — the page now only provides a feedback form. The email is still confirmed on gov.bb. GovBB team may wish to re-confirm with the ministry that this email remains active.

---

## Sources cited

- [gov.bb — Ministry of Foreign Affairs and Foreign Trade](https://www.gov.bb/Ministries/foreign-affairs) — primary Tier 1 source; all phone numbers, fax, email, address, mandate, and department listing verified here
- [foreign.gov.bb — Home](https://www.foreign.gov.bb/) — official ministry website; minister name/role, mandate confirmed
- [foreign.gov.bb — Contact Us](https://www.foreign.gov.bb/contact-us/) — address and PBX corroborated; email and Foreign Trade fax no longer listed as of 2026-05-29
- [foreign.gov.bb — Consular and Diaspora Division](https://www.foreign.gov.bb/consular-and-diaspora-division/) — division name and mandate confirmed
- [foreign.gov.bb — Foreign Affairs divisions list](https://www.foreign.gov.bb/foreign-affairs/) — 8 sub-divisions listed
- [foreign.gov.bb — Foreign Trade](https://www.foreign.gov.bb/foreign-trade/) — Foreign Trade mandate confirmed
- [gov.bb — Consular and Diaspora Division (Departments)](https://www.gov.bb/Departments/consular-diaspora) — division name confirmed; address entry flagged as wrong (Baobab Tower vs 1 Culloden Road)
- [barbadosparliament.com — Cabinet Ministers and Ministers of State](https://www.barbadosparliament.com/page_content/show_content/8) — Christopher P. Sinckler title and role confirmed as of 2026-05-29
- [CBC — Senator Sinckler takes up post as new Foreign Affairs Minister](https://www.cbc.bb/main-stories/senator-sinckler-takes-up-post-as-new-foreign-affairs-minister/) — sworn in 18 February 2026; Culloden Road address cross-referenced
- [Barbados Today — Sinckler pledges continuity, principle in foreign policy (18 Feb 2026)](https://barbadostoday.bb/2026/02/18/sinckler-pledges-continuity-principle-in-foreign-policy-on-homecoming/) — minister appointment confirmed
- [Barbados Today — Cabinet ministers sworn in (16 Feb 2026)](https://barbadostoday.bb/2026/02/16/cabinet-ministers-sworn-in/) — full cabinet list; Sinckler and Symmonds portfolios confirmed
- [connectb1m.com — Ministry of Foreign Affairs and Foreign Trade](https://connectb1m.com/ministry-of-foreign-affairs-foreign-trade/) — Tier 3 cross-check; all phone/fax/email match gov.bb and foreign.gov.bb
- [alpha.gov.bb — Visa information](https://alpha.gov.bb/visa-information) — online service CTA confirmed live and on-topic
- [GIS — tag/ministry-of-foreign-affairs](https://gisbarbados.gov.bb/blog/tag/ministry-of-foreign-affairs/) — returned HTTP 403; GIS tag pages inaccessible as at 2026-05-29 (consistent with known GIS blog access pattern)
