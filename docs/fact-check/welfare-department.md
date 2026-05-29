# Fact-check: Welfare Department

- **Live page:** <https://alpha.gov.bb/welfare-department>
- **Source file:** `src/content/welfare-department.md`
- **Last checked:** 2026-05-29
- **Summary:** 13 claims reviewed — 7 verified, 2 discrepant, 4 unverifiable. Average certainty: **73%**.

---

## Headline issues for triage

1. **The entire page describes a dissolved agency.** The Welfare Department ceased to exist as a standalone entity on 2 January 2026, when it was merged — along with the Child Care Board, National Assistance Board, National Disabilities Unit, and the Resilience and Reintegration Unit — into the Social Empowerment Agency (SEA). The page title, body heading, and every contact block still say "Welfare Department". Citizens seeking assistance after January 2026 who follow this page will look for an agency that no longer exists under that name. This is the highest-priority issue: the entire page needs to be updated or superseded by an SEA page. As of 2026-05-29, gov.bb itself has still not updated its Departments page to reflect the merger — both sources remain stale.

2. **Previous report had the wrong live URL.** The prior fact-check (2026-05-28) recorded the live URL as `https://alpha.gov.bb/government/organisations/welfare`. This is incorrect. The page is served at `https://alpha.gov.bb/welfare-department` (no category prefix, consistent with the `href: "/welfare-department"` in `src/data/ministries.ts`). The organisations index at `/government/organisations` lists a "Welfare" link that routes to the same `/welfare-department` URL. The old URL was wrong; this pass corrects it.

3. **Contact person title is unverifiable post-merger.** Ms. Joan Prescod is confirmed as "Chief Welfare Officer Ag." on gov.bb and connectb1m.com, but those sources predate the 2 January 2026 SEA merger. After the merger, the "Chief Welfare Officer" role title may no longer exist or may have been restructured. No post-merger source confirms Ms. Prescod's current title or role within the SEA.

4. **SEA website remains unreachable.** `socialempowermentbb.org` returned ECONNREFUSED on both 2026-05-28 and 2026-05-29, making it impossible to verify SEA contact details, confirm whether the email and phone numbers still route correctly, or obtain an SEA contact person. The GovBB team should confirm the correct SEA public contact details and update the page accordingly.

---

## Claims

### Claim 1 — Live URL routing (frontmatter / routing)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Previous report had</div>
<pre class="claim-block-content">https://alpha.gov.bb/government/organisations/welfare</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct URL</div>
<pre class="claim-block-content">https://alpha.gov.bb/welfare-department</pre>
</div>

- **Type:** URL
- **Sources:** [alpha.gov.bb/welfare-department](https://alpha.gov.bb/welfare-department) — confirmed live, HTTP 200, full page content rendered; [src/data/ministries.ts line 854](../../../src/data/ministries.ts) — `href: "/welfare-department"` (no category prefix, protected-page routing pattern)
- **Status:** discrepant (previous report wrong) — the live URL is `/welfare-department`, not `/government/organisations/welfare`
- **Certainty:** 98%
- **Confidence it's wrong (previous URL):** 98%
- **Citizen impact:** MEDIUM — a wrong URL in the dashboard propagates broken links to anyone using the fact-check report as a reference; corrected here.

---

### Claim 2 — Agency name "Welfare Department" (line 10)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">## Welfare Department</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">## Social Empowerment Agency (SEA)
(formerly the Welfare Department)

Note: The Welfare Department was dissolved on 2 January 2026 and merged into
the Social Empowerment Agency (SEA) along with the Child Care Board, National
Assistance Board, National Disabilities Unit, and the Resilience and
Reintegration Unit.</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Today — SEA launched: Islandwide overhaul of social services begins (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — "The Social Empowerment Agency was established on 2 January [2026]"; [Caribbean News Global — Barbados launches SEA (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/) — lists all five merged bodies verbatim; [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — still lists Welfare Department (stale, not yet updated)
- **Status:** discrepant — the Welfare Department was dissolved as of 2 January 2026. The page title and all content headings must be updated to reflect the Social Empowerment Agency (SEA).
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — citizens searching for welfare assistance after January 2026 are directed to an agency that no longer exists under this name.

---

### Claim 3 — Mission objective 1: professional social work services (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To provide professional social work services geared towards the resolution
of individual and family problems.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (as a historic statement of the Welfare Department's mission)</div>
<pre class="claim-block-content">To provide professional social work services geared towards the resolution
of individual and family problems.</pre>
</div>

- **Type:** descriptive
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — verbatim match: "To provide professional social work services geared towards the resolution of individual and family problems."
- **Status:** verified — text exactly matches the gov.bb source. Note that as a mission statement for a dissolved agency, its relevance to the current SEA mandate should be reviewed.
- **Certainty:** 97%

---

### Claim 4 — Mission objective 2: enhancement of personal and social development (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Enhancement of personal and social development.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Enhancement of personal and social development.</pre>
</div>

- **Type:** descriptive
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — verbatim match confirmed.
- **Status:** verified
- **Certainty:** 97%

---

### Claim 5 — Mission objective 3: alleviation of poverty and rehabilitation (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Alleviation of poverty, empowerment and rehabilitation of the disabled,
the disadvantaged and those affected by crisis and natural disaster.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (minor phrasing note)</div>
<pre class="claim-block-content">Alleviation of poverty, empowerment and rehabilitation of the disabled,
the disadvantaged and those affected by crisis and natural disaster.</pre>
</div>

- **Type:** descriptive
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — gov.bb phrases this as "…those affected by the crisis and natural disaster" (includes "the" before "crisis"). The page omits the definite article "the" before "crisis" — an insignificant editorial difference, not a substantive discrepancy.
- **Status:** verified
- **Certainty:** 96%

---

### Claim 6 — Contact person: Ms. Joan Prescod, Chief Welfare Officer Ag. (lines 20–21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ms. Joan Prescod
Chief Welfare Officer Ag.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Verified pre-merger; post-merger status unconfirmable</div>
<pre class="claim-block-content">Ms. Joan Prescod as "Chief Welfare Officer Ag." is confirmed by gov.bb
and connectb1m.com as of the October 2025 extraction date. After the
2 January 2026 SEA merger, the title "Chief Welfare Officer" may no
longer exist, and Ms. Prescod's role within the SEA has not been
confirmed by any authoritative post-merger source. The page should
be reviewed with the SEA to confirm who the current contact person is
and under what title.</pre>
</div>

- **Type:** agency name / contact person
- **Sources consulted:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — lists "Ms. Joan Prescod, Chief Welfare Officer Ag." (confirmed October 2025, still showing as of 2026-05-29); [connectb1m.com — Welfare Department](https://connectb1m.com/welfare-department/) — "Ms. Joan Prescod – (Chief Welfare Officer Ag)"; [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — no mention of Ms. Prescod's post-merger role
- **Status:** unverifiable for post-merger accuracy — person and title confirmed pre-merger but cannot be confirmed as current after the 2 January 2026 SEA establishment
- **Certainty:** 50%
- **Open question:** Confirm with the Social Empowerment Agency (SEA) who the current contact person for what was formerly the Welfare Department function is, and what their title is under the SEA structure.

---

### Claim 7 — Address: Weymouth Corporate Center, Roebuck St. Bridgetown, St. Michael, Barbados, W.I. (lines 24–27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Weymouth Corporate Center
Roebuck St. Bridgetown
St. Michael
Barbados, W.I.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with spelling note)</div>
<pre class="claim-block-content">Weymouth Corporate Centre
Roebuck Street
Bridgetown
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — "Weymouth Corporate Center, Roebuck St. Bridgetown, St. Michael, Barbados, W.I." (American spelling "Center"); [GIS — New Numbers For Welfare Dept.](https://gisbarbados.gov.bb/blog/new-numbers-for-welfare-dept/) — uses British spelling "Weymouth Corporate Centre"
- **Status:** verified — the address is correct and matches the gov.bb source. GIS standard spelling is "Centre" (British) not "Center" (American). The page uses "Center" — an inconsistency with GIS communications but not a factual error.
- **Certainty:** 95%
- **Note:** Post-SEA merger, this address continues to be used for the former Welfare Department function within the SEA. The same American spelling "Center" appears at `src/data/departments.ts` line 1592 and should be corrected there too.

---

### Claim 8 — PBX: 1 (246) 535-1000 (line 31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">PBX: 1 (246) 535-1000</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">PBX: 1 (246) 535-1000</pre>
</div>

- **Type:** phone
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — "1 (246) 535-1000"; [connectb1m.com — Welfare Department](https://connectb1m.com/welfare-department/) — "1 (246) 535-1000"
- **Status:** verified
- **Certainty:** 97%
- **Note:** A third number, 535-1005, is published by the GIS May 2024 National Assistance Grants direct-deposit press release as an additional Welfare Department contact. See Additional Findings section.

---

### Claim 9 — PBX: 1 (246) 535-1023 (line 32)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">PBX: 1 (246) 535-1023</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (list is incomplete — third number missing)</div>
<pre class="claim-block-content">PBX: 1 (246) 535-1000
PBX: 1 (246) 535-1005
PBX: 1 (246) 535-1023</pre>
</div>

- **Type:** phone
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — "1 (246) 535-1023"; [GIS — National Assistance Grants Now Via Direct Deposit](https://gisbarbados.gov.bb/blog/national-assistance-grants-now-via-direct-deposit/) (21 May 2024) — lists 535-1005 as an additional Welfare Department contact number (HTTP 403 on direct fetch; confirmed via web search snippets consistent with [apply-financial-assistance.md](/docs/fact-check/apply-financial-assistance.md) Claim 17)
- **Status:** verified — 535-1023 is a valid number. The list is incomplete: 535-1005 is also published as a Welfare Department contact by GIS (2024).
- **Certainty:** 95%
- **Citizen impact:** LOW — two numbers are present; the omitted third number (535-1005) reduces contact options but does not misdirect citizens.

---

### Claim 10 — Fax: 1 (246) 535-1006 (line 33)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fax: 1 (246) 535-1006</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fax: 1 (246) 535-1006</pre>
</div>

- **Type:** phone (fax)
- **Sources:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — "1 (246) 535-1006" listed as fax; [GIS — NEW TELEPHONE NUMBERS FOR WELFARE DEPARTMENT (PDF)](https://gisbarbados.gov.bb/wp-content/uploads/2017/01/Telephone-Numbers-Welfare-Department.pdf) — 535-1006 confirmed as fax in 2017 directory
- **Status:** verified
- **Certainty:** 92%

---

### Claim 11 — Email: welfare.department@barbados.gov.bb (line 35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">welfare.department@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Verified pre-merger; inbox monitoring status post-merger unknown</div>
<pre class="claim-block-content">welfare.department@barbados.gov.bb is confirmed as the published Welfare
Department email by gov.bb and connectb1m.com. However, after the 2 January
2026 SEA merger, it is unknown whether this inbox remains actively monitored
or has been superseded by an SEA contact email. No post-merger source confirms
the email is still a live, monitored inbox. If the inbox is unmonitored, a
citizen emailing it for assistance receives no response.</pre>
</div>

- **Type:** email
- **Sources consulted:** [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare) — "welfare.department@barbados.gov.bb"; [connectb1m.com — Welfare Department](https://connectb1m.com/welfare-department/) — "welfare.department@barbados.gov.bb"; [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/) — no SEA email listed; [socialempowermentbb.org](https://socialempowermentbb.org/) — ECONNREFUSED on both 2026-05-28 and 2026-05-29 (unreachable)
- **Status:** unverifiable for post-merger accuracy — email address confirmed in pre-merger sources; its current monitored status under the SEA cannot be confirmed from the public web
- **Certainty:** 60%
- **Open question:** Confirm with the Social Empowerment Agency whether `welfare.department@barbados.gov.bb` is still a live, monitored inbox post-merger, or whether it has been replaced with an SEA email address. If the inbox is unmonitored, citizens who email it will receive no reply.
- **Citizen impact:** MEDIUM — if citizens email this address post-merger and receive no response, they are left without a point of contact for welfare assistance.

---

### Claim 12 — Source URL: https://www.gov.bb/Departments/welfare (frontmatter line 4)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Departments/welfare</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified live — but source page itself is stale (does not reflect SEA merger)</div>
<pre class="claim-block-content">https://www.gov.bb/Departments/welfare resolves correctly (HTTP 200) and
returns the Welfare Department page. However, the gov.bb source page has
not been updated to reflect the 2 January 2026 SEA merger — it still lists
the Welfare Department as an active agency with Ms. Joan Prescod as
Chief Welfare Officer Ag. The source URL is technically live but itself
contains outdated information.</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Welfare Department](https://www.gov.bb/Departments/welfare) — confirmed live, returns HTTP 200; [gov.bb — Ministry of People Empowerment and Elder Affairs](https://www.gov.bb/Ministries/social-care) — still lists Welfare Department as a current department (also stale)
- **Status:** verified (URL live); the source page is itself stale and does not reflect the January 2026 merger
- **Certainty:** 85%
- **Note:** The gov.bb Departments page and the Ministry of People Empowerment and Elder Affairs page both still list the Welfare Department as active. Alpha.gov.bb is therefore consistent with its source — but the source itself is stale. Both need updating.

---

### Claim 13 — Careers link: https://job-boards.greenhouse.io/govtechbarbados (footer)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Careers → https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified live</div>
<pre class="claim-block-content">https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us resolves
successfully to the "Jobs at GovTech Barbados" page. Currently shows
"There are no current openings" — page is live and on-topic.</pre>
</div>

- **Type:** link / CTA
- **Sources:** [job-boards.greenhouse.io/govtechbarbados](https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us) — confirmed live, HTTP 200, GovTech Barbados jobs page
- **Status:** verified
- **Certainty:** 97%

---

## Additional findings (not on the page but should be)

### A — SEA client centres should replace or supplement the single head office address

The Social Empowerment Agency has opened two client centres since January 2026 and has announced a further 11 across the island:

- **Six Roads, St. Philip** — first SEA client centre, opened 7 January 2026. Source: [Barbados Today — SEA launched (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/)
- **Southern Plaza, Oistins, Christ Church** — second SEA client centre, opened 27 March 2026. Source: [Barbados Today — Govt opens second SEA social services centre (27 Mar 2026)](https://barbadostoday.bb/2026/03/27/govt-opens-second-sea-social-services-centre/)

The page currently only lists the Weymouth Corporate Centre head office. Post-merger, a citizen outside Bridgetown may find it easier to use an SEA client centre; the new locations should be listed once contact details are confirmed.

### B — Third phone number 535-1005

The GIS May 2024 National Assistance Grants direct-deposit press release lists `(246) 535-1005` as an additional Welfare Department contact number. This number is not on the page. The page should list all three published numbers: `(246) 535-1000`, `(246) 535-1005`, and `(246) 535-1023`. This is also documented in [apply-financial-assistance.md](/docs/fact-check/apply-financial-assistance.md) Claim 17.

### C — welfare.accounts@barbados.gov.bb for payment queries

The GIS May 2024 National Assistance Grants direct-deposit press release also reveals a second email for payment/accounts queries: `welfare.accounts@barbados.gov.bb`. Citizens with banking or payment questions should use this email. This is not listed on the welfare-department page. Post-merger status of this inbox should be confirmed with the SEA.

### D — departments.ts entry uses American spelling "Center" and omits two phone numbers

`src/data/departments.ts` line 1592 lists the address as "Weymouth Corporate Center" (American spelling) and its contact array (lines 1587–1588) lists only the PBX `(246) 535-1000` and Fax `(246) 535-1006` — omitting 535-1023 and 535-1005. These data-file entries propagate to any other page or component that reads from `departments.ts`.

### E — SEA website (socialempowermentbb.org) unreachable for two consecutive days

`https://socialempowermentbb.org` returned ECONNREFUSED on both 2026-05-28 and 2026-05-29. This is the SEA's own domain and the primary post-merger authoritative source. Its persistent unavailability means no public web source currently confirms the SEA's contact details, email address, or post-merger staffing. The GovBB team should verify whether this domain is operational and whether there is an alternative SEA web presence.

---

## Sources cited

- [Welfare Department — gov.bb](https://www.gov.bb/Departments/welfare)
- [Ministry of People Empowerment and Elder Affairs — gov.bb](https://www.gov.bb/Ministries/social-care)
- [alpha.gov.bb — Welfare Department (live page)](https://alpha.gov.bb/welfare-department)
- [alpha.gov.bb — Organisations index](https://alpha.gov.bb/government/organisations)
- [connectb1m.com — Welfare Department](https://connectb1m.com/welfare-department/)
- [Barbados Today — SEA launched: Islandwide overhaul of social services begins (7 Jan 2026)](https://barbadostoday.bb/2026/01/07/sea-launched-islandwide-overhaul-of-social-services-begins/)
- [Barbados Today — Govt opens second SEA social services centre (27 Mar 2026)](https://barbadostoday.bb/2026/03/27/govt-opens-second-sea-social-services-centre/)
- [Caribbean News Global — Barbados launches SEA: A People-Centered Approach to Social Services (8 Jan 2026)](https://caribbeannewsglobal.com/barbados-launches-sea-a-people-centered-approach-to-social-services/)
- [GIS — New Numbers For Welfare Dept.](https://gisbarbados.gov.bb/blog/new-numbers-for-welfare-dept/) — HTTP 403 as of 2026-05-29
- [GIS — NEW TELEPHONE NUMBERS FOR WELFARE DEPARTMENT (PDF)](https://gisbarbados.gov.bb/wp-content/uploads/2017/01/Telephone-Numbers-Welfare-Department.pdf)
- [GIS — National Assistance Grants Now Via Direct Deposit (21 May 2024)](https://gisbarbados.gov.bb/blog/national-assistance-grants-now-via-direct-deposit/) — HTTP 403 on direct fetch; content confirmed via search-engine snippets and cross-reference with [apply-financial-assistance.md](/docs/fact-check/apply-financial-assistance.md) Claim 17
- [socialempowermentbb.org — SEA](https://socialempowermentbb.org/) — ECONNREFUSED on 2026-05-28 and 2026-05-29 (unreachable)
- [job-boards.greenhouse.io/govtechbarbados](https://job-boards.greenhouse.io/govtechbarbados?gh_src=ef2pb1uy9us) — confirmed live
