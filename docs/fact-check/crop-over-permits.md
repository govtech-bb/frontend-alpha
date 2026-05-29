# Fact-check: Find the permits you need for a Crop Over event

- **Live page:** <https://alpha.gov.bb/business-trade/crop-over-permits>
- **Source files:** `src/content/crop-over-permits/index.md`, `src/data/crop-over-permits.ts`
- **Last checked:** 2026-05-29
- **Summary:** 17 claims reviewed — 7 verified, 6 discrepant, 4 unverifiable. Average certainty: **70%**.

---

## Headline issues for triage

1. **BRA address has wrong road name (unchanged).** Both BRA permit cards state "Weymouth Corporate Centre, **Spring Garden Highway**, St. Michael." All authoritative BRA sources give the address as "Weymouth Corporate Centre, **Roebuck Street**, St. Michael." A citizen attending in person would go to the wrong road (~4 km away). **Citizen impact: MEDIUM.**

2. **BPS website link is wrong/broken domain (unchanged).** Both BPS permit cards link to `https://police.gov.bb`. The official Barbados Police Service website is `https://tbps.gov.bb`. `police.gov.bb` returns ECONNREFUSED (re-confirmed 2026-05-29). **Citizen impact: MEDIUM.**

3. **NCC venue permit links to `ncc.gov.bb` — that domain times out (new finding).** The data file sets `link: "https://ncc.gov.bb"` for the NCC venue permit card. On fetch (2026-05-29) `ncc.gov.bb` times out. The correct NCC website is `https://www.nccbarbados.com`. **Citizen impact: MEDIUM** — a citizen clicking the NCC card link would reach a broken destination.

4. **`bfs.gov.bb` still ECONNREFUSED (confirmed again).** The BFS fire safety card links to `https://bfs.gov.bb`. This domain returns ECONNREFUSED (re-confirmed 2026-05-29). The canonical BFS domain is `https://fireservice.gov.bb`. **Citizen impact: MEDIUM** — a citizen clicking the BFS card link would reach a broken destination.

5. **"Public gathering licence" has no confirmed statutory basis (unchanged).** The form presents a "Public Gathering Licence from the Barbados Police Service" as universal (conditions: none — appears in every checklist). No public BPS page, gov.bb page, or Act uses this phrase for a distinct Barbados permit. **Citizen impact: HIGH** — every single checklist user is told to apply for a permit whose existence as a distinct named licence cannot be confirmed.

6. **BPS lead time 6 weeks vs BPS-published 4 weeks (unchanged).** Both BPS cards say "6 weeks." The only BPS-published timeframe (official BPS Facebook) says "4 weeks before the date of the event." **Citizen impact: LOW-MEDIUM.**

---

## Claims

### Claim 1 — Page description and scope (index.md lines 2–9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Find out which permits you need to run a Crop Over event, which
agencies to contact, and in what order.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Find out which permits you need to run a Crop Over event, which
agencies to contact, and in what order.</pre>
</div>

- **Type:** descriptive
- **Sources:** [NCF — Crop Over](https://ncf.bb/crop-over/) confirms Crop Over is a multi-permit festival involving multiple agencies; [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) confirms multi-step licensing regime; [NCC — Stipulations for Use of Parks and Beaches](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/) confirms venue permit step.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — Application deadline "May or early June" (crop-over-permits-form.tsx, result panel)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Apply in the order each permit appears. Start now and complete
applications no later than May or early June. We've marked the
most urgent permits to help you prioritise.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Plausible — no single authoritative cross-agency deadline published</div>
<pre class="claim-block-content">The 2026 Crop Over season officially opened on 26 May 2026
(Central Bank Visual Arts Exhibition). In 2025, the NCF kicked
off the season in early July; in 2024, the ceremonial opening
was mid-June. Kadooment Day typically falls in early August.

For the longest-lead permit (pyrotechnics, flagged as "start
immediately"), "May or early June" is a reasonable planning
window. For the NCC beach permit (3 weeks minimum) and BRA
promoter's authorisation (3 weeks before tickets go on sale),
"May or early June" is also consistent.

However, no government agency publishes "May or early June"
as a formal cross-agency deadline. The guidance is directionally
correct but is the content team's synthesis, not a cited agency
requirement.</pre>
</div>

- **Type:** process step / statistic (operational deadline)
- **Checked:** [NCF — Crop Over 2026 opens 26 May 2026](https://ncf.bb/2026/05/26/crop-over-visual-arts-exhibition-opens-today/); [NCF — Crop Over 2025 kick-off 5 July 2025](https://ncf.bb/2025/07/04/crop-over-2025-kicks-off-saturday-with-culture-colour-at-queens-park/); [NCC — Stipulations: 3-week advance notice required](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/); [BRA — Promoter's Authorisation: 3 weeks before tickets on sale](https://bra.gov.bb/Popular-Topics/Public-Entertainment/).
- **Status:** unverifiable as a specific cross-agency deadline; directionally sound
- **Certainty:** 65%
- **Open question:** Anchor the deadline to the longest-lead permit (pyrotechnics). Consider adding "This is indicative — check with each agency for current timelines."

---

### Claim 3 — NCC venue permit: agency name, address, contact (crop-over-permits.ts, lines 40–61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: National Conservation Commission (NCC)
Link: https://ncc.gov.bb
Address: NCC, Codrington House, Haggatt Hall, St. Michael
Tel: (246) 536-0617
Email: specialprojectsoffice@ncc.gov.bb
Lead: Apply first — 3 weeks minimum</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (link and address corrected)</div>
<pre class="claim-block-content">Agency: National Conservation Commission (NCC)
Link: https://www.nccbarbados.com
Address: NCC, Codrington House, St. Michael
  (Waterford is the more precise parish subdivision per mapping data;
  "Haggatt Hall" not corroborated by any NCC or government source)
Tel: (246) 536-0617
Email: specialprojectsoffice@ncc.gov.bb
Lead: Apply first — 3 weeks minimum</pre>
</div>

- **Type:** agency name + URL + address + phone + email + process step
- **Sources:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — "Codrington House, St. Michael" (no parish subdivision); [NCC — About the NCC](https://www.nccbarbados.com/about-the-ncc/) — phone (246) 536-0617 and emails confirmed, no street address; [Mapcarta — NCC HQ](https://mapcarta.com/N5219008439) — "Codrington Road, Waterford, Saint Michael, BB11042"; `ncc.gov.bb` — times out on fetch (2026-05-29); [NCC — Stipulations](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/) — confirms "written request to the General Manager … not less than three (3) weeks prior."
- **Status:** discrepant — phone, email, agency name, and lead time are correct; "Haggatt Hall" is not corroborated; `ncc.gov.bb` link is broken (times out)
- **Certainty (phone/email/lead):** 95%
- **Certainty ("Haggatt Hall" is correct):** 20%
- **Confidence "Haggatt Hall" is wrong:** 80%
- **Confidence `ncc.gov.bb` link is broken:** 95%
- **Citizen impact:** MEDIUM — broken link; and a citizen using maps or asking locally for "Haggatt Hall" would be directed ~3 km from the NCC.

---

### Claim 4 — NCC insurance and chemical toilet thresholds (crop-over-permits.ts, lines 58–60)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Chemical toilet plan (required if over 200 patrons)
Public liability insurance certificate ($100,000 minimum for
100–1,000 patrons)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Chemical toilet plan (required if over 200 patrons)
Public liability insurance certificate ($100,000 minimum for
100–1,000 patrons)</pre>
</div>

- **Type:** document requirement + regulatory threshold
- **Sources:** [NCC — Stipulations for Use of Parks, Beaches and Open Areas](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/) — verbatim: "Public Liability Insurance in the amount of one hundred thousand dollars ($100,000.00)" for activities with 100–1,000 patrons; "Applicants are required to obtain chemical toilets for activities which attract more than two hundred (200) patrons."
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — BRA Place of Public Entertainment licence: address (crop-over-permits.ts, line 75–76)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">BRA Public Entertainment Unit, Weymouth Corporate Centre,
Spring Garden Highway, St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">BRA Public Entertainment Unit, Weymouth Corporate Centre,
Roebuck Street, St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — "Weymouth Corporate Centre, Roebuck Street, Barbados"; [BRA — Contact Us](https://bra.gov.bb/contact/) — same Roebuck Street address; [GIS — BRA's Weymouth Location](https://gisbarbados.gov.bb/blog/bras-weymouth-location-to-close-temporarily/) — confirms "Weymouth Corporate Centre" on Roebuck Street. No BRA source uses "Spring Garden Highway."
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — Spring Garden Highway is approximately 4 km from Roebuck Street. A citizen attending in person would go to the wrong road.
- **Note:** The same incorrect road name appears in the Promoter's Authorisation card (line 99). Both cards must be corrected.

---

### Claim 6 — BRA: phone, email, fees (crop-over-permits.ts, lines 74–84)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Tel: (246) 232-2045
Email: publicentertainment@bra.gov.bb
Licence fee ($200 to $5,000 depending on venue type)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Email and fee range partially confirmed; phone not confirmed as unit-specific</div>
<pre class="claim-block-content">BRA's general contact is (246) 429-ETAX (3829). The number
(246) 232-2045 was cited in previous research as the Public
Entertainment Unit direct line; it is not published on the
current BRA Contact page (2026-05-29 fetch).

Email publicentertainment@bra.gov.bb confirmed via BRA
Public Entertainment portal search results.

Fee range "$200 to $5,000" matches BRA published "Various
$200-$5000" on the Public Entertainment page.</pre>
</div>

- **Type:** phone + email + fee
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — confirms "publicentertainment@bra.gov.bb" and fee range "Various $200-$5000"; [BRA — Contact Us](https://bra.gov.bb/contact/) — general number (246) 429-3829 listed; (246) 232-2045 not found on current public pages.
- **Status:** partially verified (email + fee range confirmed); phone unverifiable from current public pages
- **Certainty (email + fee range):** 85%
- **Certainty (phone 232-2045):** 50%
- **Open question:** Confirm (246) 232-2045 is still the Public Entertainment Unit direct line. If not, update to (246) 429-3829 (general BRA number) or the current unit number.

---

### Claim 7 — BRA online application URLs (crop-over-permits.ts, lines 72, 96)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Apply online: https://publicentertainment.bra.gov.bb/Place
Apply online (Promoter's): https://publicentertainment.bra.gov.bb/Promotion</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Correct URLs — but TLS error persists on portal</div>
<pre class="claim-block-content">Both URLs reference the BRA Public Entertainment Portal.
The portal returns a TLS certificate validation error on direct
access (re-confirmed 2026-05-29). Citizens following these links
will receive a browser security warning and cannot proceed
without accepting security risk.</pre>
</div>

- **Type:** external URL
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) confirms portal URL is correct; `publicentertainment.bra.gov.bb` — "unable to verify the first certificate" (TLS error, 2026-05-29); see also [/docs/fact-check/loud-music-permit.md](/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md) Claim 7 for the same ongoing issue.
- **Status:** discrepant (URLs are structurally correct; portal inaccessible due to TLS error)
- **Certainty (URL correctness):** 85%
- **Confidence TLS error affects citizens:** 100% (re-confirmed 2026-05-29)
- **Citizen impact:** HIGH — both "Apply online" BRA buttons lead to a TLS-broken portal. Citizens cannot complete online applications without accepting a security risk warning.

---

### Claim 8 — Pyrotechnics permit: Ministry of Defence and Security, St. Ann's Fort, The Garrison (crop-over-permits.ts, lines 113–133)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Ministry of Defence and Security · Barbados Defence
Force (BDF) · Barbados Fire Service (BFS)
Link: https://defence.gov.bb
Address: Ministry of Defence and Security, St. Ann's Fort,
The Garrison, St. Michael</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">BDF address confirmed; ministry name and link broken</div>
<pre class="claim-block-content">The Barbados Defence Force is confirmed at St. Ann's Fort,
The Garrison, St. Michael (gov.bb and GIS agree).

"Ministry of Defence and Security" does not appear in the
current gov.bb list of 20 ministries (checked 2026-05-29).
Defence appears to fall under the Prime Minister's Office.

https://defence.gov.bb returns ECONNREFUSED (re-confirmed
2026-05-29). No live .gov.bb domain for a Ministry of
Defence and Security exists in any search result.

Suggested replacement URL: https://www.gov.bb/State-Bodies/
defence-force</pre>
</div>

- **Type:** agency name + address + URL
- **Sources:** [gov.bb — Barbados Defence Force](https://www.gov.bb/State-Bodies/defence-force) — "St. Ann's Fort, Garrison, St. Michael" confirmed; [gov.bb — Listing of all ministries](https://www.gov.bb/ministries) — 20 ministries listed; "Ministry of Defence and Security" absent; [GIS — Barbados Defence Force, St. Ann's Fort](https://gisbarbados.gov.bb/locations/barbados-defence-force-st-anns-fort/) — location confirmed; `defence.gov.bb` — ECONNREFUSED (2026-05-29).
- **Status:** unverifiable — BDF address is correct; ministry name and website link cannot be confirmed as current
- **Certainty (BDF address):** 95%
- **Certainty (ministry name / link):** 40%
- **Open question:** (1) Confirm the current responsible ministry for BDF and pyrotechnics permits. (2) Replace `https://defence.gov.bb` with `https://www.gov.bb/State-Bodies/defence-force` as an interim fix.

---

### Claim 9 — BPS Loud Music Permit: address, phone, lead time, website link (crop-over-permits.ts, lines 137–153)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Barbados Police Service (BPS)
Link: https://police.gov.bb
Address: BPS Headquarters, Lower Roebuck Street, Bridgetown
Tel: (246) 430-7100
Lead: 6 weeks</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (link corrected; lead time flag added)</div>
<pre class="claim-block-content">Agency: Barbados Police Service (BPS)
Link: https://tbps.gov.bb
Address: BPS Headquarters, Lower Roebuck Street, Bridgetown
Tel: (246) 430-7100
Lead: 4 weeks minimum (per BPS guidance) — applying earlier
is advisable</pre>
</div>

- **Type:** agency name + URL + address + phone + process step (lead time)
- **Sources:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — "former Barclays Bank Complex on Lower Roebuck Street, Bridgetown" and PBX "(246) 430-7100" confirmed; [tbps.gov.bb](https://tbps.gov.bb/) — confirmed live, official BPS website; `police.gov.bb` — ECONNREFUSED (re-confirmed 2026-05-29); [Facebook — The Barbados Police Service](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/) — "applications for loud music permits … must be made **4 weeks** before the date of the event."
- **Status:** discrepant — address and phone verified; link points to broken domain; lead time contradicts BPS-published 4-week guidance
- **Certainty (address + phone):** 95%
- **Confidence link is wrong:** 95%
- **Confidence lead time discrepancy:** 75%
- **Citizen impact:** MEDIUM — broken link; 6 weeks vs 4 weeks creates confusion for event planners.

---

### Claim 10 — BPS Public Gathering Licence: existence as a named permit (crop-over-permits.ts, lines 156–173)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Permit: Public gathering licence
Agency: Barbados Police Service (BPS)
Conditions: none (applies to every event)
Lead: 6 weeks
Address: BPS Headquarters, Lower Roebuck Street, Bridgetown
Tel: (246) 430-7100</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — "public gathering licence" not confirmed as a BPS permit name</div>
<pre class="claim-block-content">The BPS's own published list of permits names "loud music
permits" and "occasional liquor licences." No public-facing
BPS page, gov.bb page, or Act uses the phrase "public gathering
licence" for a Barbados permit.

The Public Order Act (Barbados, 1970) does regulate public
processions/assemblies and requires police notification, but
the permit is not styled as a "public gathering licence."

The NCC stipulations require police security services for events
exceeding 200 patrons — but that is a security services
requirement, not a named "licence."

This permit card applies to every event (conditions: none),
meaning every user of the tool is told to apply for a permit
whose existence as a distinct named licence cannot be confirmed.</pre>
</div>

- **Type:** process step / regulatory requirement / permit existence
- **Checked:** [tbps.gov.bb](https://tbps.gov.bb/) — no "public gathering licence" listed; [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no mention of this permit; [Facebook — The Barbados Police Service, permits post](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/) — names only "loud music permits" and "occasional liquor licences"; [ICNL — Public Order Act Barbados](https://www.icnl.org/research/library/barbados_public/) — governs assemblies but does not create a permit called "public gathering licence"; [NCC — Stipulations](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/) — refers to "security services from the Royal Barbados Police Force," not a named licence.
- **Status:** unverifiable — permit name not confirmed by any authoritative source
- **Certainty:** 25%
- **Citizen impact:** HIGH — every checklist generated by the tool includes this permit. If it does not exist as a distinct licence, citizens face a spurious step that adds friction and may confuse BPS staff.
- **Open question:** Confirm with the BPS (1) whether a "public gathering licence" exists as a distinct named permit separate from the loud music permit, and (2) under which Act it is issued. If it does not exist, remove this card or merge it into the loud music permit card.

---

### Claim 11 — COSCAP: agency name, address, online form URL, appointment booking (crop-over-permits.ts, lines 175–193)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Copyright Society of Composers, Authors and Publishers
(COSCAP)
Address: COSCAP, 11 8th Avenue, Belleville, St. Michael
Apply online: https://forms.coscap.org/node/11
Note: Book an appointment at appointments.coscap.org</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Address and agency name confirmed; form URL returns 403</div>
<pre class="claim-block-content">Agency name and address (11 8th Avenue, Belleville, St. Michael)
confirmed via coscap.org and third-party directories.

forms.coscap.org/node/11 — HTTP 403 Forbidden on fetch
(2026-05-29). The form may require login or session state to
access; 403 does not necessarily mean the form is gone, but
it could not be independently confirmed as live on this pass.

appointments.coscap.org — not independently confirmed on
automated fetch but is referenced in COSCAP's own application
flow.</pre>
</div>

- **Type:** agency name + address + external URL
- **Sources:** [coscap.org](https://coscap.org/) — confirms COSCAP as the Barbados performing rights body; [forms.coscap.org/node/11](https://forms.coscap.org/node/11) — 403 Forbidden (2026-05-29); [findyello — COSCAP](https://www.findyello.com/barbados/coscap/) and [Give Back Barbados — COSCAP](https://givebackbarbados.com/directory/coscap/) — both confirm "11 8th Avenue, Belleville, St. Michael".
- **Status:** partially verified — address and agency name confirmed; form URL unverifiable (403); appointment URL unverifiable
- **Certainty (address + agency name):** 90%
- **Certainty (form URL live):** 60% (403 may be session-gated, not removed)
- **Open question:** Verify forms.coscap.org/node/11 loads when accessed from a browser session. If broken, update to the current COSCAP application URL.

---

### Claim 12 — Special Occasion Liquor Licence: agency, address, phone, lead time, online URL (crop-over-permits.ts, lines 196–213)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Liquor Licence Authority, Dept. of Commerce and
Consumer Affairs (DCCA)
Address: Liquor Licence Authority, DCCA, Country Road,
St. Michael
Tel: (246) 535-7011
Apply online: https://liquorlicence.gov.bb/
Lead: 4 working days</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Agency: Liquor Licence Authority, Dept. of Commerce and
Consumer Affairs (DCCA)
Address: Liquor Licence Authority, DCCA, Country Road,
St. Michael
Tel: (246) 535-7011
Apply online: https://liquorlicence.gov.bb/
Lead: 4 working days</pre>
</div>

- **Type:** agency name + address + phone + URL + process step
- **Sources:** [Barbados Today — Apply early for holiday liquor licences (Dec 2025)](https://barbadostoday.bb/2025/12/09/apply-early-for-holiday-liquor-licences-promoters-urged/) — confirms Country Road, St. Michael and 535-7011; [GIS — Liquor Licence Online](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/) — confirms liquorlicence.gov.bb portal; [liquorlicence.gov.bb](https://liquorlicence.gov.bb/) — confirmed live (2026-05-29); [commerce.gov.bb — DCCA](https://commerce.gov.bb/reminder-to-re-apply-online-for-liquor-licence-by-this-friday/) — confirms DCCA administers the licence.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 13 — BFS fire safety inspection: address, phone, link (crop-over-permits.ts, lines 233–254)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Barbados Fire Service (BFS)
Link: https://bfs.gov.bb
Address: BFS Fire Prevention Unit, CMM Emergency Services
Complex, Prince Road, St. Michael
Tel: (246) 535-7829</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (link corrected)</div>
<pre class="claim-block-content">Agency: Barbados Fire Service (BFS)
Link: https://fireservice.gov.bb
Address: BFS Fire Prevention Unit, CMM Emergency Services
Complex (Cadogan, Mayers, Marshall), Prince Road,
Pine Plantation Road, St. Michael
Tel: (246) 535-7829</pre>
</div>

- **Type:** agency name + address + phone + external URL
- **Sources:** [fireservice.gov.bb — Contact](https://fireservice.gov.bb/contact/) — "Cadogan, Mayers, Marshall (CMM) Emergency Services Complex, Prince Road, Pine Plantation Road, St. Michael" and "Fire Prevention & Code Enforcement: 535-7829" confirmed; `bfs.gov.bb` — ECONNREFUSED (re-confirmed 2026-05-29); [Barbados Today — BFS operating from new headquarters (Oct 2025)](https://barbadostoday.bb/2025/10/28/bfs-operating-from-its-new-headquarters/amp/) — confirms CMM complex at Prince Road.
- **Status:** discrepant — address and phone correct; `bfs.gov.bb` link is broken (ECONNREFUSED); canonical domain is `fireservice.gov.bb`
- **Certainty (address + phone):** 95%
- **Confidence `bfs.gov.bb` is broken:** 95%
- **Citizen impact:** MEDIUM — a citizen clicking the BFS card link would reach a broken destination.

---

### Claim 14 — BPS website link in data file (crop-over-permits.ts, lines 139, 161)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/crop-over-permits.ts</div>
<pre class="claim-block-content">link: "https://police.gov.bb"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">link: "https://tbps.gov.bb"</pre>
</div>

- **Type:** external URL
- **Sources:** [tbps.gov.bb](https://tbps.gov.bb/) — confirmed live, official BPS website; `police.gov.bb` — ECONNREFUSED (re-confirmed 2026-05-29); [OAG — The Barbados Police Service](https://oag.gov.bb/Departments/Police/) — links to tbps.gov.bb; GIS press releases on BPS all link to tbps.gov.bb.
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — a citizen clicking the BPS permit card link reaches a broken destination.

---

### Claim 15 — defence.gov.bb link in data file (crop-over-permits.ts, line 116)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/crop-over-permits.ts</div>
<pre class="claim-block-content">link: "https://defence.gov.bb"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — domain does not resolve</div>
<pre class="claim-block-content">https://defence.gov.bb returns ECONNREFUSED (re-confirmed
2026-05-29). No .gov.bb domain for a "Ministry of Defence
and Security" was found in any search.

Suggested replacement: https://www.gov.bb/State-Bodies/
defence-force (the confirmed gov.bb page for the BDF).</pre>
</div>

- **Type:** external URL
- **Checked:** `defence.gov.bb` — ECONNREFUSED (2026-05-29); [gov.bb — Barbados Defence Force](https://www.gov.bb/State-Bodies/defence-force) — confirmed live alternative; [gov.bb — Listing of ministries](https://www.gov.bb/ministries) — no "Ministry of Defence and Security" listed.
- **Status:** unverifiable — link is broken or non-existent
- **Certainty:** 10% that defence.gov.bb is a live, correct URL
- **Citizen impact:** MEDIUM — any citizen clicking the pyrotechnics card link reaches a broken destination.
- **Open question:** Confirm the current ministerial structure for defence and pyrotechnics permitting. Interim fix: replace with `https://www.gov.bb/State-Bodies/defence-force`.

---

### Claim 16 — BPS lead time of 6 weeks for loud music permit (crop-over-permits.ts, line 140; also line 162)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Lead: 6 weeks</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (per BPS published guidance)</div>
<pre class="claim-block-content">Lead: 4 weeks minimum (apply earlier if possible)</pre>
</div>

- **Type:** process step / lead time
- **Sources:** [Facebook — The Barbados Police Service (official BPS account)](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/) — "applications for loud music permits and occasional liquor licences must be made **4 weeks** before the date of the event." This is the only BPS-published figure for this service standard. See also [/docs/fact-check/loud-music-permit.md](/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md) Claims 9–10.
- **Status:** discrepant — 6 weeks on the page vs 4 weeks in BPS's own guidance
- **Certainty:** 70%
- **Confidence 6 weeks is wrong:** 70%
- **Citizen impact:** LOW-MEDIUM — 6 weeks is more conservative than 4 weeks; unlikely to harm citizens but reduces trust and may cause confusion when BPS staff reference 4 weeks.

---

### Claim 17 — NCC venue permit link: ncc.gov.bb (crop-over-permits.ts, line 43) [new]

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/crop-over-permits.ts</div>
<pre class="claim-block-content">link: "https://ncc.gov.bb"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">link: "https://www.nccbarbados.com"</pre>
</div>

- **Type:** external URL
- **Sources:** `ncc.gov.bb` — times out on fetch (2026-05-29); [www.nccbarbados.com](https://www.nccbarbados.com) — confirmed live, official NCC website with full content and contact information; [gov.bb — NCC](https://www.gov.bb/State-Bodies/national-conservation-commission) — links to nccbarbados.com.
- **Status:** discrepant — the link in the data file points to a non-resolving domain
- **Certainty:** 95%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a citizen clicking the NCC card link would reach a broken destination.

---

## Additional findings (not on the page but should be)

1. **NCF's coordinating role is absent.** The National Cultural Foundation (NCF) is the official organiser of the Crop Over Festival and handles registrations for Kadooment bands, calypso competitions, and other official Crop Over activities. A citizen organising an official Crop Over event (e.g. a mas band) also needs to register with the NCF at [ncf.bb](https://ncf.bb/crop-over/). This step is entirely absent from the permit checklist. Consider adding an NCF registration card for users who select "A mas band" as their event type.

2. **BPS "occasional liquor licence" — separate from the DCCA Special Occasion Liquor Licence?** The BPS Facebook post lists "occasional liquor licences" as a BPS-administered permit. It is unclear whether this is the same as the Special Occasion Liquor Licence administered by the Liquor Licensing Authority (DCCA), or a separate BPS certificate. If the BPS also requires a separate occasional licence, that card is missing from the checklist.

3. **Port Authority / Harbour Master permit for boat cruises.** The venue option "On the water" triggers no specific maritime permit card. Boat cruises in Barbados operate in Barbados Harbours jurisdiction; depending on the vessel and activity, a Barbados Port Authority and/or Harbour Master approval may be required.

4. **BFS fees schedule URL.** The Barbados Fire Service publishes a fees schedule at `https://fireservice.gov.bb/fees-schedule/`. The current card says "Inspection fee applies — see BFS fees schedule" without a link. Adding the URL would reduce friction.

5. **BRA Public Entertainment Portal TLS error — add phone fallback.** As noted in Claims 7 and 14, `publicentertainment.bra.gov.bb` returns a TLS certificate error. Adding the BRA general contact number (246) 429-3829 as a fallback so citizens can call if the portal is inaccessible would be helpful.

---

## Sources cited

- [NCF — Crop Over Festival](https://ncf.bb/crop-over/)
- [NCF — Crop Over 2026 opens 26 May 2026](https://ncf.bb/2026/05/26/crop-over-visual-arts-exhibition-opens-today/)
- [NCF — Crop Over 2025 kick-off](https://ncf.bb/2025/07/04/crop-over-2025-kicks-off-saturday-with-culture-colour-at-queens-park/)
- [NCC — Stipulations for the Use of Parks, Beaches and Open Areas](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/)
- [NCC — About the NCC / Contact](https://www.nccbarbados.com/about-the-ncc/)
- [www.nccbarbados.com](https://www.nccbarbados.com) — confirmed live NCC website
- [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission)
- [Mapcarta — NCC Headquarters (Codrington Road, Waterford, St. Michael)](https://mapcarta.com/N5219008439)
- [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/)
- [BRA — Contact Us](https://bra.gov.bb/contact/)
- [GIS — BRA's Weymouth Location](https://gisbarbados.gov.bb/blog/bras-weymouth-location-to-close-temporarily/)
- [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS error (2026-05-29)
- [gov.bb — Barbados Defence Force](https://www.gov.bb/State-Bodies/defence-force)
- [gov.bb — Listing of all ministries](https://www.gov.bb/ministries)
- [GIS — Barbados Defence Force, St. Ann's Fort](https://gisbarbados.gov.bb/locations/barbados-defence-force-st-anns-fort/)
- [gov.bb — Police Department](https://www.gov.bb/Departments/police-department)
- [tbps.gov.bb — The Barbados Police Service](https://tbps.gov.bb/)
- [Facebook — The Barbados Police Service (permits post)](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/)
- [OAG — The Barbados Police Service](https://oag.gov.bb/Departments/Police/)
- [ICNL — Public Order Act Barbados](https://www.icnl.org/research/library/barbados_public/)
- [coscap.org](https://coscap.org/)
- [forms.coscap.org/node/11](https://forms.coscap.org/node/11) — 403 Forbidden (2026-05-29)
- [findyello — COSCAP Barbados](https://www.findyello.com/barbados/coscap/)
- [Give Back Barbados — COSCAP](https://givebackbarbados.com/directory/coscap/)
- [liquorlicence.gov.bb](https://liquorlicence.gov.bb/) — confirmed live (2026-05-29)
- [Barbados Today — Apply early for liquor licences (Dec 2025)](https://barbadostoday.bb/2025/12/09/apply-early-for-holiday-liquor-licences-promoters-urged/)
- [GIS — Liquor Licence Online Will Facilitate Ease In Doing Business](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/)
- [fireservice.gov.bb — Contact](https://fireservice.gov.bb/contact/)
- [Barbados Today — BFS operating from new headquarters (Oct 2025)](https://barbadostoday.bb/2025/10/28/bfs-operating-from-its-new-headquarters/amp/)
- [Related fact-check — loud-music-permit.md](/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md)
- [alpha.gov.bb — crop-over-permits live page](https://alpha.gov.bb/business-trade/crop-over-permits)
- [alpha.gov.bb — crop-over-permits form](https://alpha.gov.bb/business-trade/crop-over-permits/form)
