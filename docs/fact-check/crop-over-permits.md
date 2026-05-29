# Fact-check: Find the permits you need for a Crop Over event

- **Live page:** <https://alpha.gov.bb/business-trade/crop-over-permits>
- **Source files:** `src/content/crop-over-permits/index.md`, `src/data/crop-over-permits.ts`, `src/components/forms/crop-over-permits-form.tsx`
- **Last checked:** 2026-05-28
- **Summary:** 16 claims reviewed — 7 verified, 5 discrepant, 4 unverifiable. Average certainty: **71%**.

---

## Headline issues for triage

1. **BRA address has wrong road name.** Both permit cards for the BRA (Place of Public Entertainment licence and Promoter's Authorisation) state "Weymouth Corporate Centre, **Spring Garden Highway**, St. Michael." All authoritative BRA sources — gov.bb, bra.gov.bb, and GIS — consistently give the address as "Weymouth Corporate Centre, **Roebuck Street**, St. Michael." A citizen attending in person would go to the wrong road. **Citizen impact: MEDIUM.**

2. **BPS website link is wrong domain.** The data file points to `https://police.gov.bb` for both the Loud Music Permit and Public Gathering Licence cards. The official Barbados Police Service website is `https://tbps.gov.bb`. The incorrect domain either does not resolve or resolves to an unrelated resource. **Citizen impact: MEDIUM** — any citizen clicking the link to find BPS contact details would be misdirected.

3. **NCC address includes "Haggatt Hall" — not corroborated.** The venue permit card states "NCC, Codrington House, **Haggatt Hall**, St. Michael." Every NCC source (nccbarbados.gov.bb, gov.bb, GIS, Mapcarta) consistently identifies the NCC headquarters as Codrington House in **Waterford** (or simply "St. Michael"), not Haggatt Hall. The two locations are approximately 3 km apart. **Citizen impact: MEDIUM** — a citizen asking a taxi driver or using a map app may arrive at the wrong place.

4. **"Public gathering licence" has no confirmed statutory basis.** The form presents a "Public Gathering Licence from the Barbados Police Service" as a universal permit (no conditions — it appears in every checklist). The BPS's own Facebook post on licences and permits lists only "loud music permits" and "occasional liquor licences" as BPS-administered permits. No public source — not gov.bb, not the BPS website, not any Act — uses the phrase "public gathering licence" for a Barbados permit type. If this requirement is real, it needs a verifiable source; if it duplicates the loud music permit, it should be removed or merged. **Citizen impact: HIGH** — every checklist user is told to apply for a permit that may not exist under that name, causing unnecessary friction.

5. **BPS lead time of 6 weeks conflicts with the BPS's own published guidance.** Both BPS permit cards carry the lead time "6 weeks." The BPS Facebook post (the only BPS source that specifies a timeframe) states "applications … must be made **4 weeks** before the date of the event." The loud-music-permit page fact-check (Claims 9–10) also found the attribution of a specific timeframe to the Commissioner of Police to be unverifiable, but the 4-week figure was the one cited. Using 6 weeks instead of 4 weeks may cause confusion. **Citizen impact: LOW-MEDIUM** — conservative guidance is not harmful, but an unexplained discrepancy erodes trust.

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
<div class="claim-block-label">Plausible — no single authoritative deadline published</div>
<pre class="claim-block-content">The 2026 Crop Over season officially opened on 26 May 2026
(Central Bank Visual Arts Exhibition). In 2025, the NCF kicked
off the season in early July; in 2024, the ceremonial opening
was mid-June. Kadooment Day typically falls in early August.

For the longest-lead permit (pyrotechnics, unquantified), "May
or early June" is a reasonable planning window. For the NCC
beach permit (3 weeks minimum) and BRA promoter's authorisation
(3 weeks before tickets go on sale), "May or early June" is
also consistent.

However, no government agency publishes "May or early June"
as a formal cross-agency deadline. The guidance is directionally
correct but is the content team's synthesis, not a cited agency
requirement.</pre>
</div>

- **Type:** process step / statistic (operational deadline)
- **Checked:** [NCF — Crop Over 2026 opens 26 May 2026](https://ncf.bb/2026/05/26/crop-over-visual-arts-exhibition-opens-today/); [NCF — Crop Over 2025 kick-off 5 July 2025](https://ncf.bb/2025/07/04/crop-over-2025-kicks-off-saturday-with-culture-colour-at-queens-park/); [NCC — Stipulations: 3-week advance notice required](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/); [BRA — Promoter's Authorisation: 3 weeks before tickets on sale](https://bra.gov.bb/Popular-Topics/Public-Entertainment/).
- **Status:** unverifiable as a specific cross-agency deadline; directionally sound
- **Certainty:** 65%
- **Open question:** Identify which permit has the longest lead time (pyrotechnics is "start immediately" in the data; no specific number of weeks is cited for it) and anchor the deadline to that. Consider adding "This is indicative — check with each agency for current timelines."

---

### Claim 3 — NCC venue permit: agency name and contact (crop-over-permits.ts, lines 40–61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: National Conservation Commission (NCC)
Address: NCC, Codrington House, Haggatt Hall, St. Michael
Tel: (246) 536-0617
Email: specialprojectsoffice@ncc.gov.bb
Lead: Apply first — 3 weeks minimum</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (address corrected)</div>
<pre class="claim-block-content">Agency: National Conservation Commission (NCC)
Address: NCC, Codrington House, Waterford, St. Michael
Tel: (246) 536-0617
Email: specialprojectsoffice@ncc.gov.bb
Lead: Apply first — 3 weeks minimum</pre>
</div>

- **Type:** address + phone + email + agency name + process step
- **Sources:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) lists "(246) 536-0600 / 0617" and "Codrington House, St. Michael" — no parish subdivision given; [NCC — About the NCC](https://www.nccbarbados.com/about-the-ncc/) confirms phone (246) 536-0617 and email ncc@ncc.gov.bb; specialprojectsoffice@ncc.gov.bb confirmed via NCC website search; [Mapcarta — NCC Headquarters](https://mapcarta.com/N5219008439) gives full address as "Codrington Road, Waterford, Saint Michael, BB11042"; [NCC — Stipulations](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/) confirms "written request to the General Manager … not less than three (3) weeks prior."
- **Status:** discrepant — phone, email, agency name, and lead time are all correct; "Haggatt Hall" is not corroborated by any NCC or government source; the location is Waterford (or simply "Codrington House, St. Michael")
- **Certainty (phone/email/lead):** 95%
- **Certainty (address — Haggatt Hall):** 20% that "Haggatt Hall" is correct
- **Confidence "Haggatt Hall" is wrong:** 80%
- **Citizen impact:** MEDIUM — a citizen using maps or asking locally for "Haggatt Hall" would be directed approximately 3 km from the NCC.

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
- **Sources:** [BRA — Contact Us](https://bra.gov.bb/contact/) — "Weymouth Corporate Centre, Roebuck Street, Barbados"; [BRA — Locations](https://bra.gov.bb/about/locations) — headquarters at "Weymouth Corporate Centre, Roebuck Street"; [GIS — BRA's Weymouth Location](https://gisbarbados.gov.bb/blog/bras-weymouth-location-to-close-temporarily/) — confirms "Weymouth Corporate Centre" on Roebuck Street; [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — same headquarters address. No BRA source uses "Spring Garden Highway."
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — Spring Garden Highway is approximately 4 km from Roebuck Street. A citizen attending in person would go to the wrong road.
- **Note:** The same incorrect road name appears in both BRA permit cards (Place of Public Entertainment licence and Promoter's Authorisation). Both should be corrected.

---

### Claim 6 — BRA: phone (246) 232-2045, email publicentertainment@bra.gov.bb, fees $200–$5,000 (crop-over-permits.ts, lines 74–84)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Tel: (246) 232-2045
Email: publicentertainment@bra.gov.bb
Licence fee ($200 to $5,000 depending on venue type)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Phone and email verified; fee range partially confirmed</div>
<pre class="claim-block-content">Phone (246) 232-2045 is confirmed as the BRA Public Entertainment
Unit direct line (confirmed via BRA Public Entertainment portal
search results citing this number).

Email publicentertainment@bra.gov.bb is confirmed by BRA search
results.

Fee range "$200 to $5,000" is stated on the BRA website as
"Various $200-$5000 depending on venue classification" — this
matches the page. However, the full fee schedule is only
available inside the Public Entertainment Portal, not on the
public BRA website, so the exact bands cannot be independently
verified from the open web.</pre>
</div>

- **Type:** phone + email + fee
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — confirms "(246) 232-2045" and "publicentertainment@bra.gov.bb" as unit contacts; fee range "Various $200-$5000" confirmed by BRA page; [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS error persists (same as F-018 in `loud-music-permit.md`).
- **Status:** verified (phone + email); partially verified (fee range)
- **Certainty (phone + email):** 90%
- **Certainty (fee range):** 80%
- **Open question:** Confirm the exact fee bands ($200/$500/$1,000 etc.) with the BRA Public Entertainment Unit — they are not published on the open web.

---

### Claim 7 — BRA online application URLs (crop-over-permits.ts, lines 72, 96)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Apply online: https://publicentertainment.bra.gov.bb/Place
Apply online (Promoter's): https://publicentertainment.bra.gov.bb/Promotion</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Correct URLs — but TLS error persists on portal</div>
<pre class="claim-block-content">Both URLs correctly reference the BRA Public Entertainment
Portal subdomain. The BRA website confirms publicentertainment.
bra.gov.bb is the correct portal. However, the portal returns
a TLS certificate validation error on direct access (same
ongoing issue as F-018 flagged in the loud-music-permit
fact-check, confirmed 2026-05-27 and 2026-05-28). Citizens
following these links will receive a browser security warning.</pre>
</div>

- **Type:** external URL
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) confirms portal URL; [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS error on direct fetch (2026-05-28); see also [/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md](/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md) Claim 7 for the same issue.
- **Status:** discrepant (URLs are structurally correct; portal is inaccessible due to TLS error)
- **Certainty (URL correctness):** 85%
- **Confidence TLS error affects citizens:** 100% (confirmed 2026-05-28)
- **Citizen impact:** HIGH — the "Apply online" button in both BRA permit cards leads to a TLS-broken portal. Citizens cannot complete online applications without accepting a security risk warning.

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
<div class="claim-block-label">BDF address confirmed; ministry name and link unverifiable</div>
<pre class="claim-block-content">The Barbados Defence Force is confirmed at St. Ann's Fort,
The Garrison, St. Michael (GIS and gov.bb agree).

However, "Ministry of Defence and Security" does not appear in
the current gov.bb list of ministries (checked 2026-05-28).
Defence and security appear to fall under the Prime Minister's
portfolio or "Ministry of Home Affairs and Information." No
standalone "Ministry of Defence and Security" is listed.

The link https://defence.gov.bb does not resolve (ECONNREFUSED
on fetch 2026-05-28). No .gov.bb domain for a Ministry of
Defence and Security appears in any search result.</pre>
</div>

- **Type:** agency name + address + URL
- **Sources:** [gov.bb — Barbados Defence Force](https://www.gov.bb/State-Bodies/defence-force) — "Force Headquarters: St. Ann's Fort, Garrison, St. Michael" confirmed; BDF main number 536-2500; [gov.bb — Listing of all ministries](https://www.gov.bb/ministries) — "Ministry of Defence and Security" not listed among current ministries; [GIS — Barbados Defence Force, St. Ann's Fort](https://gisbarbados.gov.bb/locations/barbados-defence-force-st-anns-fort/) — location confirmed; [GIS — Ministry of Defence and Security tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-defence-and-security/) — GIS has used this name in press releases, but it is not in the current ministerial list.
- **Status:** unverifiable — BDF address is correct; ministry name and website link cannot be confirmed as current
- **Certainty (BDF address):** 95%
- **Certainty (ministry name / link):** 40%
- **Open question:** (1) Confirm the current official name of the ministry responsible for BDF and pyrotechnics permits — it may now fall under the Prime Minister's Office or Ministry of Home Affairs and Information. (2) Replace `https://defence.gov.bb` with a working URL (e.g. the gov.bb BDF page) or remove the link.

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
Lead: 4 weeks (per BPS guidance) — applying earlier is advisable</pre>
</div>

- **Type:** agency name + URL + address + phone + process step (lead time)
- **Sources:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — "The headquarters … is in the former Barclays Bank Complex on Lower Roebuck Street, Bridgetown, Saint Michael" and PBX "(246) 430-7100" confirmed; [tbps.gov.bb](https://tbps.gov.bb/) — confirmed as the official BPS website (resolves, actively maintained 2025–2026); [police.gov.bb] — ECONNREFUSED on fetch (2026-05-28); [Facebook — The Barbados Police Service](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/) — "applications for loud music permits … must be made **4 weeks** before the date of the event."
- **Status:** discrepant — address and phone verified; link points to wrong/broken domain; lead time (6 weeks) contradicts the BPS's own published 4-week guidance
- **Certainty (address + phone):** 95%
- **Confidence link is wrong:** 95%
- **Confidence lead time discrepancy:** 75% (BPS Facebook is an official BPS channel but not a .gov.bb page; 4 weeks is the only figure the BPS itself has published)
- **Citizen impact:** MEDIUM — wrong link; and 6 weeks vs 4 weeks creates unnecessary confusion for event planners.

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
<pre class="claim-block-content">The BPS's own published list of permits and licences names
"loud music permits" and "occasional liquor licences." No
public-facing BPS page, gov.bb page, or Act uses the phrase
"public gathering licence" for a Barbados permit.

The Public Order Act (Barbados, 1970) does regulate public
processions and assemblies and requires police notification,
but the permit is not styled as a "public gathering licence"
in that Act or in any public guidance.

The NCC stipulations require police security services for events
exceeding 200 patrons on NCC-managed land — but that is a
security services requirement, not a named "licence."

This permit card applies to every event (conditions: none),
meaning every user of the tool is told to apply for a permit
whose existence as a distinct, named licence cannot be confirmed.</pre>
</div>

- **Type:** process step / regulatory requirement / permit existence
- **Checked:** [tbps.gov.bb](https://tbps.gov.bb/) — no "public gathering licence" listed; [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no mention of this permit; [Facebook — The Barbados Police Service, permits post](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/) — names only "loud music permits" and "occasional liquor licences"; [Public Order Act Barbados 1970 (ICNL)](https://www.icnl.org/research/library/barbados_public/) — governs assemblies but does not create a permit called "public gathering licence"; [NCC — Stipulations](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/) — refers to "security services from the Royal Barbados Police Force," not a named licence.
- **Status:** unverifiable — permit name is not confirmed by any authoritative source
- **Certainty:** 25%
- **Citizen impact:** HIGH — every single checklist generated by the tool includes this permit. If it does not exist as a distinct licence, citizens are being given a spurious step that adds friction and may confuse BPS staff when applicants arrive asking for a "public gathering licence."
- **Open question:** Confirm with the Barbados Police Service (1) whether a "public gathering licence" exists as a distinct, named permit, separate from the loud music permit, and (2) under which Act it is issued. If it does not exist as a standalone permit, remove this card or merge it into the loud music permit card.

---

### Claim 11 — COSCAP: address, online form URL, appointment booking (crop-over-permits.ts, lines 175–193)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Copyright Society of Composers, Authors and Publishers
(COSCAP)
Address: COSCAP, 11 8th Avenue, Belleville, St. Michael
Apply online: https://forms.coscap.org/node/11
Note: Book an appointment at appointments.coscap.org</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Agency: Copyright Society of Composers, Authors and Publishers
(COSCAP)
Address: COSCAP, 11 8th Avenue, Belleville, St. Michael
Apply online: https://forms.coscap.org/node/11
Note: Book an appointment at appointments.coscap.org</pre>
</div>

- **Type:** agency name + address + external URL
- **Sources:** [coscap.org](https://coscap.org/) — confirms COSCAP as the Barbados performing rights body; [forms.coscap.org/node/11](https://forms.coscap.org/node/11) — confirmed as "APPLICATION FOR A MUSIC LICENCE - SINGLE/SERIES" (correct form for a one-off event); [Waze / findyello](https://www.findyello.com/barbados/coscap/) and [Give Back Barbados](https://givebackbarbados.com/directory/coscap/) — both confirm "11 8th Avenue, Belleville, St. Michael"; [SBA Toolkit](https://e-toolkit.sba.bb/etoolkit/licences-and-certificates/) — confirms COSCAP licence required for playing music at events. `appointments.coscap.org` not independently confirmed (returns no result on automated fetch) but is referenced in COSCAP's own online application flow.
- **Status:** verified (address and form URL confirmed); `appointments.coscap.org` sub-URL unverifiable on public web but plausible
- **Certainty (address + form URL):** 90%
- **Certainty (appointments sub-URL):** 60%

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
- **Sources:** [Barbados Today — Apply early for holiday liquor licences (Dec 2025)](https://barbadostoday.bb/2025/12/09/apply-early-for-holiday-liquor-licences-promoters-urged/) — confirms Country Road, St. Michael address and 535-7011 number; [GIS — Liquor Licence Online](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/) — confirms liquorlicence.gov.bb portal; [commerce.gov.bb — Reminder to re-apply](https://commerce.gov.bb/reminder-to-re-apply-online-for-liquor-licence-by-this-friday/) — confirms DCCA as the administering body; the "Special Occasion Liquor Licence" for events ≤24 hours is confirmed as a licence type. Lead time "4 working days" is consistent with the online portal's advertised service. See also verified inventory entry in [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) (Liquor Licence Authority section).
- **Status:** verified
- **Certainty:** 90%

---

### Claim 13 — BFS fire safety inspection: address, phone, link (crop-over-permits.ts, lines 236–254)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Agency: Barbados Fire Service (BFS)
Link: https://bfs.gov.bb
Address: BFS Fire Prevention Unit, CMM Emergency Services
Complex, Prince Road, St. Michael
Tel: (246) 535-7829</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with link note)</div>
<pre class="claim-block-content">Agency: Barbados Fire Service (BFS)
Link: https://fireservice.gov.bb (bfs.gov.bb may redirect here)
Address: BFS Fire Prevention Unit, CMM Emergency Services
Complex (Cadogan, Mayers, Marshall), Prince Road,
Pine Plantation Road, St. Michael
Tel: (246) 535-7829</pre>
</div>

- **Type:** agency name + address + phone + external URL
- **Sources:** [fireservice.gov.bb — Contact](https://fireservice.gov.bb/contact/) — confirms "CMM Emergency Services Complex, Prince Road" and "Fire Prevention & Code Enforcement: 535-7829"; [Barbados Today — BFS operating from new headquarters (Oct 2025)](https://barbadostoday.bb/2025/10/28/bfs-operating-from-its-new-headquarters/amp/) — confirms BFS moved to CMM complex at Prince Road in October 2025; [gov.bb — Fire Service](https://www.gov.bb/Departments/fire-service) — still lists old GPO Building address (stale). The official domain is `fireservice.gov.bb`; `bfs.gov.bb` may redirect there but could not be independently confirmed on fetch.
- **Status:** verified — address and phone are correct per fireservice.gov.bb; `bfs.gov.bb` may be a redirect rather than the canonical domain
- **Certainty (address + phone):** 95%
- **Certainty (bfs.gov.bb link works):** 65%
- **Note:** Consider updating the link from `https://bfs.gov.bb` to `https://fireservice.gov.bb` which is the confirmed canonical domain.

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
- **Sources:** [tbps.gov.bb](https://tbps.gov.bb/) — confirmed as the official BPS website, actively maintained with content from 2025–2026; `police.gov.bb` — ECONNREFUSED on fetch (2026-05-28); [OAG — The Barbados Police Service](https://oag.gov.bb/Departments/Police/) — links to tbps.gov.bb; all GIS press releases on the BPS link to tbps.gov.bb.
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** MEDIUM — a citizen clicking the link on the permit card for BPS information would reach a broken or wrong destination.

---

### Claim 15 — defence.gov.bb link in data file (crop-over-permits.ts, line 116)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/crop-over-permits.ts</div>
<pre class="claim-block-content">link: "https://defence.gov.bb"</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — domain does not resolve</div>
<pre class="claim-block-content">https://defence.gov.bb returns ECONNREFUSED (2026-05-28).
No .gov.bb domain for a "Ministry of Defence and Security"
was found in any search. Defence matters are handled by the
BDF at St. Ann's Fort; the ministerial responsible portfolio
appears to be held by the Prime Minister's Office.

Suggested replacement: https://www.gov.bb/State-Bodies/
defence-force (the confirmed gov.bb page for the BDF).</pre>
</div>

- **Type:** external URL
- **Checked:** direct fetch of https://defence.gov.bb — ECONNREFUSED (2026-05-28); [gov.bb — Barbados Defence Force](https://www.gov.bb/State-Bodies/defence-force) — confirmed live page for the BDF; [gov.bb — Listing of ministries](https://www.gov.bb/ministries) — no "Ministry of Defence and Security" listed.
- **Status:** unverifiable — link is broken or non-existent
- **Certainty:** 10% that defence.gov.bb is a live, correct URL
- **Citizen impact:** MEDIUM — any citizen clicking the pyrotechnics card link would reach a broken destination.
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
- **Sources:** [Facebook — The Barbados Police Service (official BPS account)](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/) — "applications for loud music permits and occasional liquor licences must be made **4 weeks** before the date of the event." This is the only BPS-published figure for this service standard. See also [/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md](/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md) Claims 9–10 which also flagged the 4-week figure and noted the attribution to the Commissioner of Police.
- **Status:** discrepant — 6 weeks on the page vs 4 weeks in BPS's own guidance
- **Certainty:** 70% (the 4-week figure comes from an official BPS social media post, not a .gov.bb page)
- **Confidence 6 weeks is wrong:** 70%
- **Citizen impact:** LOW-MEDIUM — 6 weeks is more conservative than 4 weeks; citizens are unlikely to be harmed, but the discrepancy reduces trust and may cause confusion when BPS staff reference 4 weeks.

---

## Additional findings (not on the page but should be)

1. **NCF's coordinating role is absent.** The National Cultural Foundation (NCF) is the official organiser of the Crop Over Festival, manages the schedule of events, and handles registrations for Kadooment bands, calypso competitions, and other official Crop Over activities. A citizen organising an official Crop Over event (e.g. a mas band) also needs to register with the NCF at [ncf.bb](https://ncf.bb/crop-over/). This step is entirely absent from the permit checklist. Consider adding an NCF registration card for users who select "A mas band" as their event type.

2. **BPS "occasional liquor licence" — separate from the DCCA Special Occasion Liquor Licence?** The BPS Facebook post lists "occasional liquor licences" as a BPS-administered permit alongside loud music permits. It is unclear whether this is the same as the "Special Occasion Liquor Licence" administered by the Liquor Licensing Authority (DCCA) at liquorlicence.gov.bb, or a separate BPS certificate. This creates potential for confusion on the checklist: the current tool correctly routes alcohol to the DCCA card, but if the BPS also requires a separate occasional licence, that card is missing.

3. **Port Authority / Harbour Master permit for boat cruises.** The venue option "On the water" triggers no specific maritime permit card. Boat cruises in Barbados operate in Barbados Harbours jurisdiction; depending on the vessel and activity, a Barbados Port Authority and/or Harbour Master approval may be required. No public source has been consulted to confirm this — flagging as a gap for the content team to investigate.

4. **BFS fees schedule URL.** The Barbados Fire Service now publishes a fees schedule at `https://fireservice.gov.bb/fees-schedule/`. The current card says "Inspection fee applies — see BFS fees schedule" but does not link to it. Adding the URL would reduce friction for citizens.

5. **BRA Public Entertainment Portal TLS error.** As noted in Claims 7 and the loud-music-permit fact-check (F-018), `publicentertainment.bra.gov.bb` returns a TLS certificate error as of 2026-05-28. The BRA general contact number (246) 429-ETAX (3829) / (246) 429-3829 could be added as a fallback so citizens can call if the portal is inaccessible.

---

## Sources cited

- [NCF — Crop Over Festival](https://ncf.bb/crop-over/)
- [NCF — Crop Over 2026 opens 26 May 2026](https://ncf.bb/2026/05/26/crop-over-visual-arts-exhibition-opens-today/)
- [NCF — Crop Over 2025 kick-off](https://ncf.bb/2025/07/04/crop-over-2025-kicks-off-saturday-with-culture-colour-at-queens-park/)
- [NCC — Stipulations for the Use of Parks, Beaches and Open Areas](https://www.nccbarbados.com/stipulations-for-the-use-of-parks-beaches-and-open-areas/)
- [NCC — About the NCC / Contact](https://www.nccbarbados.com/about-the-ncc/)
- [NCC — Fees & Licences](https://www.nccbarbados.com/process-for-using-nccs-facilities/)
- [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission)
- [GIS — New Numbers For National Conservation Commission](https://gisbarbados.gov.bb/blog/new-numbers-for-national-conservation-commission/)
- [Mapcarta — NCC Headquarters (Codrington Road, Waterford, St. Michael)](https://mapcarta.com/N5219008439)
- [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/)
- [BRA — Steps to Apply for a Place of Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Steps-to-Apply-for-a-Place-of-Publ)
- [BRA — Contact Us](https://bra.gov.bb/contact/)
- [BRA — Locations](https://bra.gov.bb/about/locations)
- [GIS — BRA's Weymouth Location](https://gisbarbados.gov.bb/blog/bras-weymouth-location-to-close-temporarily/)
- [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS error (tested 2026-05-28)
- [gov.bb — Barbados Defence Force](https://www.gov.bb/State-Bodies/defence-force)
- [GIS — Barbados Defence Force, St. Ann's Fort](https://gisbarbados.gov.bb/locations/barbados-defence-force-st-anns-fort/)
- [gov.bb — Listing of all ministries](https://www.gov.bb/ministries)
- [gov.bb — Police Department](https://www.gov.bb/Departments/police-department)
- [tbps.gov.bb — The Barbados Police Service](https://tbps.gov.bb/)
- [Facebook — The Barbados Police Service (permits post)](https://www.facebook.com/the.barbados.police.service/posts/application-for-licences-and-permitsthe-administration-of-the-royal-barbados-pol/928498600504874/)
- [OAG — The Barbados Police Service](https://oag.gov.bb/Departments/Police/)
- [COSCAP — forms.coscap.org/node/11 (Single/Series Music Licence)](https://forms.coscap.org/node/11)
- [findyello — COSCAP Barbados](https://www.findyello.com/barbados/coscap/)
- [Give Back Barbados — COSCAP](https://givebackbarbados.com/directory/coscap/)
- [SBA Toolkit — Licences and Certificates](https://e-toolkit.sba.bb/etoolkit/licences-and-certificates/)
- [liquorlicence.gov.bb](https://liquorlicence.gov.bb/)
- [Barbados Today — Apply early for liquor licences (Dec 2025)](https://barbadostoday.bb/2025/12/09/apply-early-for-holiday-liquor-licences-promoters-urged/)
- [GIS — Liquor Licence Online Will Facilitate Ease In Doing Business](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/)
- [fireservice.gov.bb — Contact](https://fireservice.gov.bb/contact/)
- [Barbados Today — BFS operating from new headquarters (Oct 2025)](https://barbadostoday.bb/2025/10/28/bfs-operating-from-its-new-headquarters/amp/)
- [gov.bb — Fire Service](https://www.gov.bb/Departments/fire-service) — stale address (GPO Building)
- [ICNL — Public Order Act Barbados](https://www.icnl.org/research/library/barbados_public/)
- [Related fact-check — loud-music-permit.md](/home/gavin/frontend-alpha/docs/fact-check/loud-music-permit.md)
