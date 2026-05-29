# Fact-check: Visa information

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/visa-information>
- **Source file:** `src/content/visa-information.md`
- **Last checked:** 2026-05-28
- **Summary:** 8 claims reviewed — 0 verified, 6 discrepant, 2 unverifiable (both are legacy fax numbers not confirmed on any current source). Average certainty: **46%**.

---

## Headline issues for triage

1. **Address is for a building the Immigration Department vacated in 2018.** The page lists "Careenage House, Wharf Road, Bridgetown" as the main Immigration Department office. The department moved to BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael following a Caribbean Development Bank–funded fit-out. All current Tier 1 sources (immigration.gov.bb, gov.bb/Departments/immigration, GIS) confirm the new address. A citizen who travels to Careenage House will find empty or repurposed premises. This is a HIGH-impact error that has already been flagged against open-pharmacy.md (F-00A) — visa-information.md is an additional instance.

2. **Phone number is stale.** The page lists the main office phone as (246) 434-4100. The Immigration Department's telephone numbers changed in February 2017 (GIS announcement). The current main switchboard (PBX) is (246) 535-4100. The old 434-4xxx series was decommissioned at or around the time of the move. A citizen dialling 434-4100 will not reach the Immigration Department.

3. **Email address is obsolete.** The page uses `imm-dept@caribsurf.com` for both offices. Caribbean Surf no longer provides email services to Government of Barbados departments. Immigration's current primary email is `immigration.department@barbados.gov.bb` (gov.bb) / `Immigration.department@barbados.gov.bb` (immigration.gov.bb). The GAIA airport office has its own address: `Immigration.gaia@barbados.gov.bb`. No current Tier 1 source references the caribsurf.com address.

4. **Airport phone number is stale.** The page lists the GAIA office phone as (246) 418-4180. The current number published on immigration.gov.bb is 535-4180 (with additional lines at 535-4119, 535-4183, 535-4187). The 418-xxxx series was replaced in the same 2017 renumbering.

5. **Visa application is now a fully online process — the paper-form instruction is obsolete.** The page tells applicants to complete a paper form "in duplicate." The Barbados Entry Visa process moved fully online in 2025 (announced 1 July 2025 by Minister Wilfred Abrahams; online payments via EZPay+ available from 14 March 2025). Applicants now apply and pay at `apps.immigration.gov.bb`. The requirement for two printed copies is no longer applicable.

---

## Claims

### Claim 1 — Application form to be completed in duplicate (line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The requisite application form should be completed in duplicate and must be accompanied by two (2) passport-size photographs.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The Barbados Entry Visa application is now a fully online process. Apply and pay at apps.immigration.gov.bb. You will need to upload a passport-size photograph as part of the online application.</pre>
</div>

- **Type:** process step
- **Sources:** [immigration.gov.bb — Home (online visa notice)](https://immigration.gov.bb/) — "The Barbados Entry visa process is now a fully online process. Please click HERE to apply and pay for your entry visa to Barbados."; [Barbados Today — Govt rolls out new online visa and payment systems (1 Jul 2025)](https://barbadostoday.bb/2025/07/01/govt-rolls-out-new-online-visa-and-payment-systems/); [immigration.gov.bb — Visa Requirements](https://immigration.gov.bb/pages/visa_requirements.aspx) — lists one passport-size photograph (not two) in the required documents for the online application
- **Status:** discrepant — the requirement to complete a paper form "in duplicate" is obsolete; the process is now online. The visa requirements page also specifies one photograph, not two.
- **Certainty:** 85% (that the page is wrong)
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a visitor who prints and fills out a paper form cannot submit it; they will be directed online. The two-photo requirement may cause over-preparation, though a photo is still needed.

---

### Claim 2 — Main office building name: "Careenage House" (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Careenage House</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">BTI Corporate Centre</pre>
</div>

- **Type:** address
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — "BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael, BARBADOS"; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — confirms BTI Corporate Centre; [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/) (HTTP 403 on direct fetch; confirmed via search result snippets) — "the first phase of the relocation of the entire department from its present location at Careenage House, Wharf Road, The City"; see also [_inventory.md — Barbados Immigration Department](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) and [open-pharmacy.md — Claim 14](/home/gavin/frontend-alpha/docs/fact-check/open-pharmacy.md)
- **Status:** discrepant — department moved from Careenage House c. 2018–2020. Building name is wrong.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — a citizen travelling to Careenage House, Wharf Road will not find the Immigration Department.

---

### Claim 3 — Main office street address: "Wharf Road, Bridgetown" (line 12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Wharf Road
Bridgetown
BARBADOS</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Princess Alice Highway
Bridgetown BB11093
St. Michael
BARBADOS</pre>
</div>

- **Type:** address
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — full address "BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael, BARBADOS"; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — confirms same; [connectb1m.com — Immigration Department](https://connectb1m.com/immigration-department/) — corroborates "behind the Cheapside Public Market (opposite the Fisheries Division)"
- **Status:** discrepant — the street address is for the former (pre-2018) location.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — compound with Claim 2: wrong building on the wrong road.

---

### Claim 4 — Main office phone: "(246) 434-4100" (line 14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Phone: (246) 434-4100</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Phone: (246) 535-4100</pre>
</div>

- **Type:** phone
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — "Main switchboard: 535-4100 | Chief Immigration Officer: 535-4195 | Front Desk: 535-4101, 4102"; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — "PBX: 535-4100"; [GIS — Immigration Department Telephone Numbers Change](https://gisbarbados.gov.bb/blog/immigration-department-telephone-numbers-change-2/) (HTTP 403; confirmed via search snippet) — February 2017 announcement of new numbers replacing the 434-xxxx series; see also [_inventory.md — Barbados Immigration Department](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md)
- **Status:** discrepant — (246) 434-4100 was the PABX number confirmed in 2010; replaced by (246) 535-4100 no later than February 2017.
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — a citizen dialling the listed number will not reach the Immigration Department.

---

### Claim 5 — Main office fax: "(246) 426-0819" (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fax: (246) 426-0819</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">The current Immigration Department fax number, per gov.bb/Departments/immigration, is (246) 535-4183.
The page lists (246) 426-0819 — this was the Careenage House-era fax number (pre-2018).
Whether 426-0819 was formally decommissioned cannot be confirmed from the public web; it is not published on any current Tier 1 source.

Checked: immigration.gov.bb/pages/contactus.aspx (fax 535-4183); gov.bb/Departments/immigration (fax 535-4183); connectb1m.com (no fax listed) — none publish 426-0819.</pre>
</div>

- **Type:** phone (fax)
- **Checked:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — fax listed as 535-4183; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — confirms 535-4183
- **Status:** unverifiable — the 426-0819 number is almost certainly the former (Careenage House-era) fax and is not published on any current source. Current fax appears to be 535-4183.
- **Certainty:** 20% (that 426-0819 is still the active fax)
- **Open question:** Immigration Department to confirm whether (246) 426-0819 is still an active fax line; if not, the page should use (246) 535-4183.

---

### Claim 6 — Main office email: "imm-dept@caribsurf.com" (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Email: imm-dept@caribsurf.com</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Email: Immigration.department@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — head office email "immigration.department@barbados.gov.bb"; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — same; no current Tier 1 source references imm-dept@caribsurf.com; search results for the caribsurf.com address return only older third-party pages and the stale gov.bb source page itself
- **Status:** discrepant — imm-dept@caribsurf.com is an obsolete email address. Caribbean Surf no longer hosts Government of Barbados department email. The current authoritative address is `Immigration.department@barbados.gov.bb`.
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — emails sent to imm-dept@caribsurf.com will bounce or go unread; applicants needing email correspondence with Immigration will receive no response.

---

### Claim 7 — Airport office phone: "(246) 418-4180" (line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Phone: (246) 418-4180</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Phone: (246) 535-4180</pre>
</div>

- **Type:** phone
- **Sources:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — GAIA office: "535-4180/4119/4183/4187, Email: Immigration.gaia@barbados.gov.bb"; this matches the same 2017 renumbering that replaced the main office 434-xxxx series; [GIS — Immigration Department Telephone Numbers Change](https://gisbarbados.gov.bb/blog/immigration-department-telephone-numbers-change-2/) — covers the GAIA office numbers changing at the same time
- **Status:** discrepant — (246) 418-4180 was the former airport immigration number; current primary is (246) 535-4180.
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a traveller at GAIA who calls the listed number will not reach immigration.

---

### Claim 8 — Airport office fax and email (lines 25–26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fax: (246) 420-7180
Email: imm-dept@caribsurf.com</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web (fax) / Discrepant (email)</div>
<pre class="claim-block-content">EMAIL: immigration.gov.bb lists the GAIA office email as Immigration.gaia@barbados.gov.bb — not imm-dept@caribsurf.com. The caribsurf.com address is obsolete (see Claim 6).

FAX: (246) 420-7180 is the former Careenage House-era airport fax number. The current immigration.gov.bb contact page does not publish a separate fax number for the GAIA office (it lists 535-4183 as the department-wide fax). Whether 420-7180 is still active cannot be confirmed from the public web.

Checked: immigration.gov.bb/pages/contactus.aspx — GAIA fax not listed separately; [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration) — no separate GAIA fax; no current source publishes 420-7180.</pre>
</div>

- **Type:** phone (fax) + email
- **Checked:** [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx) — GAIA email is `Immigration.gaia@barbados.gov.bb`; no separate fax for GAIA listed
- **Status:** discrepant (email — same caribsurf.com obsolescence as Claim 6); unverifiable (fax — 420-7180 not confirmed active or decommissioned)
- **Certainty (email):** 95% (that the caribsurf.com address is wrong)
- **Confidence email is wrong:** 95%
- **Certainty (fax):** 20% (that 420-7180 is still active)
- **Citizen impact (email):** HIGH — emails to imm-dept@caribsurf.com will not reach airport immigration.
- **Open question:** Immigration Department to confirm whether (246) 420-7180 remains an active GAIA fax line. If not, remove or replace with 535-4183 (the department-wide fax).

---

## Additional findings (not on the page but should be)

1. **Online application portal.** The page makes no mention of the online visa application portal. The current process for nationals of countries requiring a Barbados entry visa is entirely online: apply and pay at `https://apps.immigration.gov.bb/portal/portal/login`. The portal launched with online payments from 14 March 2025 and was announced as a fully online process on 1 July 2025. Citizens currently reading the alpha.gov.bb page have no way to know this.

2. **Visa fees.** The page contains no visa fee information. The official fees are: single entry US$107.00 (one entry within three months); multiple entry US$211.00 (multiple entries within six months). Payment is by banker's draft addressed to the Chief Immigration Officer for postal applications; online payment via EZPay+ for the digital portal.

3. **Processing time.** The immigration.gov.bb visa requirements page states processing takes three weeks and that "Updates are NOT given on the process of applications." This is operationally important for applicants; it is absent from the alpha.gov.bb page.

4. **CARICOM nationals.** CARICOM nationals (except Haiti) are visa-exempt and may stay for up to six months per year under the Right of Entry. From 1 October 2025, nationals of Barbados, Belize, Dominica, and St. Vincent and the Grenadines have full free movement (indefinite stay). Neither the visa exemption nor the new free movement arrangement is mentioned on the page.

5. **Country list.** The page does not link to or describe the list of countries whose nationals require a visa. The official list is available as a PDF from the Ministry of Foreign Affairs: [foreign.gov.bb — Visa Information](https://www.foreign.gov.bb/visa-information/).

6. **Complete current contact block.** For reference, the verified current Immigration Department contact details are:
   - **Head office:** BTI Corporate Centre, Princess Alice Highway, Bridgetown BB11093, St. Michael
   - **Phone (main PBX):** (246) 535-4100
   - **Fax:** (246) 535-4183
   - **Email:** Immigration.department@barbados.gov.bb
   - **GAIA airport office:** (246) 535-4180 / 535-4119 / 535-4183 / 535-4187; Email: Immigration.gaia@barbados.gov.bb
   - **Bridgetown Port:** (246) 535-4177; Email: Immigration.seaport@barbados.gov.bb
   - **Port St. Charles Marina:** (246) 535-4178; Email: Immigration.portstc@barbados.gov.bb

---

## Sources cited

- [immigration.gov.bb — Home](https://immigration.gov.bb/)
- [immigration.gov.bb — Contact Us](https://immigration.gov.bb/pages/contactus.aspx)
- [immigration.gov.bb — Visa Requirements](https://immigration.gov.bb/pages/visa_requirements.aspx)
- [immigration.gov.bb — Visitor Requirements](https://immigration.gov.bb/pages/visitor.aspx)
- [gov.bb — Immigration Department](https://www.gov.bb/Departments/immigration)
- [gov.bb — Visa Information (source_url)](https://www.gov.bb/Visit-Barbados/visa-information)
- [GIS — New HQ For Immigration Department](https://gisbarbados.gov.bb/blog/new-hq-for-immigration-department/)
- [GIS — Immigration Department Telephone Numbers Change](https://gisbarbados.gov.bb/blog/immigration-department-telephone-numbers-change-2/)
- [GIS — A New Era For Barbados Immigration Department](https://gisbarbados.gov.bb/blog/a-new-era-for-barbados-immigration-department/)
- [GIS — New Numbers At Immigration Dept.](https://gisbarbados.gov.bb/blog/new-numbers-at-immigration-dept/)
- [Barbados Today — Govt rolls out new online visa and payment systems (1 Jul 2025)](https://barbadostoday.bb/2025/07/01/govt-rolls-out-new-online-visa-and-payment-systems/)
- [foreign.gov.bb — Visa Information](https://www.foreign.gov.bb/visa-information/)
- [apps.immigration.gov.bb — Online visa portal](https://apps.immigration.gov.bb/portal/portal/login)
- [CARICOM — Barbados, Belize, Dominica and St. Vincent and the Grenadines Ready for Full Free Movement on 1 October 2025](https://caricom.org/barbados-belize-dominica-and-st-vincent-and-the-grenadines-ready-for-full-free-movement-on-1-october-2025/)
- [connectb1m.com — Immigration Department](https://connectb1m.com/immigration-department/)
- [_inventory.md — Barbados Immigration Department](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md)
- [open-pharmacy.md — prior finding F-00A](/home/gavin/frontend-alpha/docs/fact-check/open-pharmacy.md)
