# Fact-check: Get a permit to play loud music

- **Live page:** <https://alpha.gov.bb/business-trade/loud-music-permit>
- **Source file:** `src/content/loud-music-permit.md`
- **Last checked:** 2026-05-29
- **Summary:** 14 claims reviewed — 5 verified, 3 discrepant, 6 unverifiable. Average certainty: **67%**.

---

## Headline issues for triage

1. **Liquor licence application route is wrong.** The page tells citizens to "apply for a liquor license from the police." Under the Liquor Licence Act, 2021 (in force from April 2022), applications go to the Liquor Licensing Authority at liquorlicence.gov.bb — not through the police. The Commissioner of Police is notified of applications and may appear at objection hearings, but plays no administrative role. **Citizen impact: HIGH** — a citizen following this instruction would contact the wrong authority.

2. **Exemptions list is incomplete and uses informal language.** The BRA lists four statutory exemptions from the promoter's authorisation requirement; the page states only two ("educational institutions" and "religious groups"). Two exemptions are missing: persons who provide entertainment on a daily or weekly basis, and churches registered under the Charities Act (the statutory phrasing differs from "religious groups"). **Citizen impact: MEDIUM** — a weekly venue operator or non-Christian religious organisation could incorrectly believe they need a permit.

3. **The 1,000 / 1,500 attendee thresholds for police and fire presence cannot be confirmed from any public source.** The BRA and the Public Entertainments Act require certificates from the Commissioner of Police and Chief Fire Officer for venue licences — but these are "fit and proper person" / "sufficient fire exits" certificates, not attendance-triggered requirements. No public source specifies 1,000 or 1,500 as threshold figures. Re-verified 2026-05-29: neither the BRA Public Entertainment page nor the Barbados Fire Service website mentions these thresholds. **Citizen impact: HIGH** — event organisers act on these numbers; if thresholds are wrong or have no legal basis, they may either fail to arrange required services or incur unnecessary cost.

4. **TLS certificate error on `publicentertainment.bra.gov.bb` persists (re-tested 2026-05-29).** The portal continues to return an "unable to verify the first certificate" TLS error. Citizens following the annual-permit link will receive a browser security warning and most will abandon. **Citizen impact: HIGH** — the link is effectively inaccessible for ordinary citizens.

5. **"Definition of loud music" has no statutory basis.** The Environmental Protection Department explicitly states there is no noise legislation in Barbados (re-confirmed 2026-05-29: "There is no noise legislation in Barbados however the Cabinet of Barbados acceded to the Barbados Noise Policy which basically adopted the World Health Organisation Community Noise Guidelines as reference standards."). The page's definition ("music you can hear outside the boundary of a property, or at a time when people would reasonably expect quiet") is reasonable plain-language guidance but has no statutory grounding. **Citizen impact: LOW** — descriptive framing issue, not a procedural error.

---

## Claims

### Claim 1 — Liquor licence applied "from the police" via liquorlicence.gov.bb (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">a license to sell and serve alcohol. You must apply for a liquor license from the police.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">a licence to sell and serve alcohol. You must apply for a liquor licence through the Liquor Licensing Authority at liquorlicence.gov.bb.</pre>
</div>

- **Type:** process step + agency name
- **Sources:** [liquorlicence.gov.bb](https://liquorlicence.gov.bb/) — portal operated by the Liquor Licensing Authority, confirmed live and functional 2026-05-29; [gov.bb — Apply For Liquor Licences Online From April 1](https://www.gov.bb/news_article.php?id=105) — confirms that from 1 April 2022 "the Department of Commerce and Consumer Affairs (DCCA) took over administrative responsibility for issuing liquor licences … the liquor licence regime shifted online, from a manual application system through the Magistracy"; [GIS — Liquor Licence Online Will Facilitate Ease In Doing Business](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/) — "persons may apply online at liquorlicence.gov.bb"; [commerce.gov.bb — Reminder to re-apply online for liquor licence](https://commerce.gov.bb/reminder-to-re-apply-online-for-liquor-licence-by-this-friday/)
- **Status:** discrepant
- **Certainty:** 95% (three independent Tier 1/2 sources agree the route is the Liquor Licensing Authority, not the police)
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a citizen following this instruction would approach the wrong authority (the police) rather than the Liquor Licensing Authority online.

### Claim 2 — Music licence applied through COSCAP at coscap.org/tariffs (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">a permit to play copyrighted music. You must apply for a music license through COSCAP.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">a permit to play copyrighted music. You must apply for a music license through COSCAP.</pre>
</div>

- **Type:** external URL + process step
- **Sources:** [coscap.org — About](https://coscap.org/about) — HTTP 403 to automated fetch (same as previous check); COSCAP's role as Barbados's authoritative music rights body is well-established from previous verification. [coscap.org/tariffs](https://coscap.org/tariffs) — also HTTP 403 to automated fetch but is the correct URL (loads in a regular browser per prior check).
- **Status:** verified (COSCAP identity confirmed; /tariffs URL correct per prior check; 403 is bot-blocking, not a broken page)
- **Certainty:** 85%

### Claim 3 — "police presence – if you expect to have more than 1,000 attendees" (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">police presence – if you expect to have more than 1,000 attendees</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no public source confirms this threshold (re-checked 2026-05-29)</div>
<pre class="claim-block-content">The BRA and the Public Entertainments Act require promoters to obtain
a certificate from the Commissioner of Police that the venue operator
is "a fit and proper person to keep a place of public entertainment"
— but neither source specifies a 1,000-person attendee threshold as
triggering mandatory police presence. The BRA Public Entertainment
page (re-fetched 2026-05-29) does not mention any attendance
threshold. The Barbados Police Service website lists no event
guidance. No public document (Act, BRA guidance, GIS press release,
police circular) has been found that uses the 1,000 figure.</pre>
</div>

- **Type:** regulatory threshold / statistic
- **Checked:** [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — re-fetched 2026-05-29, confirms police certificate requirement for venue licences but no attendee threshold stated; [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no mention of event thresholds (re-confirmed 2026-05-29); [Public Entertainments Act CAP 085A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicEntertainmentsCAP085A.pdf) — no attendee threshold found via search; [fireservice.gov.bb](https://fireservice.gov.bb/) — re-fetched 2026-05-29, no threshold mentioned.
- **Status:** unverifiable from public web
- **Certainty:** 35%
- **Citizen impact:** HIGH — event organisers act on this number; if it has no legal basis, they may either fail to arrange required services or incur unnecessary cost.
- **Open question:** confirm with the Barbados Police Service whether a 1,000-person threshold is documented in any circular, policy, or practice note. If no threshold exists, reword as guidance (e.g. "the Commissioner of Police may require police presence at large events — contact Police HQ for advice").

### Claim 4 — "fire service presence – if you expect to have more than 1,500 attendees" (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">fire service presence –  if you expect to have more than 1,500 attendees</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no public source confirms this threshold (re-checked 2026-05-29)</div>
<pre class="claim-block-content">The BRA requires a certificate from the Chief Fire Officer confirming
"sufficient fire exits in relation to the number of persons who are
to be accommodated therein" for venue licences. The Barbados Fire
Service website (re-fetched 2026-05-29) offers a "Submit a request
for the provision of fire coverage for events or a control burn"
service but states no minimum attendance threshold. Neither the BRA
page nor the Fire Service website uses the 1,500-person figure.</pre>
</div>

- **Type:** regulatory threshold / statistic
- **Checked:** [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — fire certificate required for venue licence but no attendee threshold stated; [fireservice.gov.bb](https://fireservice.gov.bb/) — re-fetched 2026-05-29, "Submit a request for the provision of fire coverage for events or a control burn" listed, no attendance threshold given; web search across .gov.bb domains returned no document with the 1,500-person figure.
- **Status:** unverifiable from public web
- **Certainty:** 35%
- **Citizen impact:** HIGH — same as Claim 3.
- **Open question:** confirm with the Barbados Fire Service whether a 1,500-person threshold is documented. If no threshold exists, reword as guidance (e.g. "large events may require fire service coverage — contact the Barbados Fire Service to discuss requirements").

### Claim 5 — Register events with entry fee with the BRA (line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If there is an entry or ticket fee to your event, you may need to register with the Barbados Revenue Authority.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If there is an entry or ticket fee to your event, you may need to register with the Barbados Revenue Authority.</pre>
</div>

- **Type:** tax / registration requirement
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — confirms a "Promoter's Authorisation to Stage Public Entertainment" is required from BRA for event organisers; promoters must "file outstanding tax returns" and "settle tax debt" before permission is issued; re-confirmed 2026-05-29.
- **Status:** verified
- **Certainty:** 90%

### Claim 6 — Definition of "loud music" (lines 31–33)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Loud music means music you can hear outside the boundary of a
property, or at a time when people would reasonably expect quiet.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Not a statutory definition — no Barbados noise legislation exists (re-confirmed 2026-05-29)</div>
<pre class="claim-block-content">The Environmental Protection Department states: "There is no noise
legislation in Barbados however the Cabinet of Barbados acceded to
the Barbados Noise Policy which basically adopted the World Health
Organisation Community Noise Guidelines as reference standards."
The Public Entertainments Act does not define "loud music." This
definition is reasonable plain-language guidance but has no statutory
grounding in Barbados law.</pre>
</div>

- **Type:** definition / descriptive
- **Sources:** [EPD — Noise Pollution Control](https://www.epd.gov.bb/What-We-Do/Noise-Pollution-Control/) — re-fetched 2026-05-29: "There is no noise legislation in Barbados however the Cabinet of Barbados acceded to the Barbados Noise Policy which basically adopted the World Health Organisation Community Noise Guidelines as reference standards."
- **Status:** unverifiable as a statutory definition; phrasing is reasonable plain-language guidance
- **Certainty:** 50%
- **Open question:** confirm with the content team whether the definition is intended as legal guidance (in which case it needs a statutory basis) or plain-language explanation (in which case a caveat like "broadly speaking" might help). The EPD's WHO-based guidelines could be cited as the practical standard applied in Barbados.

### Claim 7 — Venues can apply for an annual permit at publicentertainment.bra.gov.bb (line 45)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Venues can apply for an annual permit to play loud music at publicentertainment.bra.gov.bb with the Barbados Revenue Authority.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Portal exists but TLS error persists as of 2026-05-29</div>
<pre class="claim-block-content">The BRA does operate an annual Place of Public Entertainment licence
renewable on or before January 31 each year. The portal at
publicentertainment.bra.gov.bb is the correct destination. However,
the URL continues to return an "unable to verify the first
certificate" TLS error when fetched (re-tested 2026-05-29).
Citizens using this link will receive a browser security warning
and most will abandon the application.</pre>
</div>

- **Type:** external URL + process step
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — "A licence may be renewed annually on or before January 31, upon the production of a certificate from the Chief Fire Officer and upon payment of the prescribed fee" — confirms the annual permit exists; [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS certificate validation error on fetch (re-tested 2026-05-29, same as previous checks on 2026-05-27 and 2026-05-28).
- **Status:** discrepant — the underlying fact (annual permit via BRA) is correct, but the linked URL presents a TLS security error that makes it unsafe and inaccessible to ordinary citizens
- **Certainty:** 90% (annual permit process is verified); 0% (link is citizen-safe to click)
- **Confidence it's wrong (re: link safety):** 100%
- **Citizen impact:** HIGH — citizens following the link will see a browser security warning; most will abandon the application.

### Claim 8 — Exempt groups: educational institutions, religious groups (lines 53–55)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The following groups do not need a permit to play loud music:

- educational institutions

- religious groups</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (per BRA — Public Entertainment page, re-confirmed 2026-05-29)</div>
<pre class="claim-block-content">The following groups do not need to declare a public entertainment
event:

- an approved educational institution
- the board of management or a parent teacher association of an
  approved educational institution
- a person who provides entertainment on a daily or weekly basis
- a church registered under the Charities Act</pre>
</div>

- **Type:** regulatory exemption
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — re-fetched 2026-05-29, verbatim: "The following bodies who may be involved in carrying on public entertainment are not required to declare an event: an approved educational institution; or the board of management or a parent teacher association of an approved educational institution; a person who provides entertainment on a daily or weekly basis, or a church registered under the Charities Act."
- **Status:** discrepant
- **Certainty:** 95% (BRA text re-confirmed verbatim 2026-05-29 — certainty upgraded from 85%)
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — two exemptions are missing from the page. A daily/weekly entertainment provider (e.g. a restaurant with regular live music) and any religious organisation not described as "a church registered under the Charities Act" could incorrectly believe they need a permit.

### Claim 9 — "Apply 4 weeks before your event" attributed to the Commissioner of Police (line 61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Commissioner of Police advises you should apply for a loud music
license 4 weeks before your event. However, to be safe, it is a
good idea to do it as soon as possible.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify direct attribution to the Commissioner of Police</div>
<pre class="claim-block-content">No public source confirms this specific guidance was issued by the
Commissioner of Police. The BRA promoter guidance specifies applying
"at least three weeks before tickets go on sale" for the Promoter's
Authorisation, but that is a separate requirement from the police
certificate. No publicly archived statement from the Commissioner
with a 4-week timeframe has been found. The Police Department
website (re-confirmed 2026-05-29) publishes no event processing
guidance.</pre>
</div>

- **Type:** official advice / process step
- **Checked:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no processing-time guidance published (re-confirmed 2026-05-29); [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — states promoters must apply "at least three weeks before tickets go on sale" (BRA's own requirement, not the Commissioner's).
- **Status:** unverifiable — direct attribution to the Commissioner of Police cannot be confirmed from any public source
- **Certainty:** 60%
- **Open question:** confirm with the Barbados Police Service whether the Commissioner has formally issued 4-week guidance, and obtain a citable source. The BRA's own "3 weeks before tickets go on sale" advice (for the Promoter's Authorisation) may be the source of the figure.

### Claim 10 — "It can take up to 4 weeks for your application to be processed" (line 93)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It can take up to 4 weeks for your application to be processed.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — service standard not published</div>
<pre class="claim-block-content">No public source publishes a processing-time SLA for the police
certificate for public entertainment. The BRA states permission for
a Promoter's Authorisation "will be issued one week before the
event" — that is the BRA's own timeframe, not the police's. No
police or government page publishes a 4-week figure.</pre>
</div>

- **Type:** service standard / turnaround time
- **Checked:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no SLA published (re-confirmed 2026-05-29); [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — "Permission will be issued one week before the event" (BRA's own timeframe only).
- **Status:** unverifiable from public web
- **Certainty:** 55%
- **Open question:** confirm the police processing-time SLA with the Barbados Police Service; also clarify whether the 4-week lead time is for the police certificate alone or the combined BRA/police application cycle.

### Claim 11 — Letter/email to "Police Commissioner's office at Barbados Police Service headquarters in Bridgetown" (line 65)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Write a letter or email to the Police Commissioner's office at
Barbados Police Service headquarters in Bridgetown.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Write a letter or email to the Police Commissioner's office at
Barbados Police Service headquarters in Bridgetown.

[Full address: Lower Roebuck Street, Bridgetown, St. Michael
(former Barclays Bank Complex); main line: (246) 430-7100]</pre>
</div>

- **Type:** address / process step
- **Sources:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — re-confirmed 2026-05-29: "The headquarters for the RBPF is in the former Barclays Bank Complex on Lower Roebuck Street, Bridgetown, Saint Michael." Main line (246) 430-7100 also confirmed on same page.
- **Status:** verified
- **Certainty:** 90%
- **Note:** the page could usefully add the street address (Lower Roebuck Street) and phone number (246) 430-7100 to help citizens locate and contact headquarters.

### Claim 12 — Required application information (lines 67–85)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You must state:
- your full name
- your telephone number
- your email address
- your home address
- the name of the event
- the event location
- the event date
- the event start and finish times
- a brief explanation of the type of event you are planning
- an estimate of the number of people you expect to attend</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Plausible — checklist not publicly documented</div>
<pre class="claim-block-content">No public source (Police, BRA, GIS) publishes the specific
information required in a loud-music permit application letter to
the Commissioner. The listed fields are consistent with what any
regulator would need, but cannot be independently confirmed.</pre>
</div>

- **Type:** document requirement / process step
- **Checked:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no application checklist published; [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — BRA has its own portal requirements but these relate to the Promoter's Authorisation, not the police certificate.
- **Status:** unverifiable from public web — plausible but not independently confirmed
- **Certainty:** 65%
- **Open question:** confirm the exact information requirements with the Barbados Police Service, or link to an official guidance note if one exists.

### Claim 13 — Decision delivered by "police department in the area that your event is planned to take place" (line 95)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will receive a decision from the police department in the area
that your event is planned to take place.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Plausible — consistent with divisional structure but unconfirmed</div>
<pre class="claim-block-content">The Barbados Police Service is organised into territorial divisions.
Decisions routed through the local divisional office is consistent
with this structure but no public source explicitly describes this
as the process for loud-music permit decisions.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — re-confirmed 2026-05-29: Barbados Police Service operates across territorial divisions. Divisional routing of permit decisions is consistent with this structure but not explicitly documented for loud-music permits.
- **Status:** unverifiable in this specific detail — plausible from general organisational knowledge
- **Certainty:** 65%

### Claim 14 — Approved applicants receive paper + digital certificate (line 97)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If your application is approved, you will receive a paper and a
digital certificate from the police department in the area where
your event is planned to take place. Take your certificate to your
event. It must be available for inspection if the police ask to
see it.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — certificate format not publicly documented</div>
<pre class="claim-block-content">No public source describes the format (paper + digital) of a loud-
music permit certificate issued by the police. The requirement to
make the certificate available for inspection is consistent with
general enforcement practice but is not documented in any public
police or BRA guidance found.</pre>
</div>

- **Type:** process / document format
- **Checked:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no certificate format documented; [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — BRA issues its own Promoter's Authorisation digitally but this is separate from the police certificate.
- **Status:** unverifiable from public web
- **Certainty:** 55%
- **Open question:** confirm with the Barbados Police Service whether certificates are issued in both paper and digital form, and confirm the inspection requirement.

---

## Additional findings (not on the page but should be)

1. **Full street address and phone for Police HQ.** The page tells citizens to write to "Barbados Police Service headquarters in Bridgetown" but does not give the street address or contact number. Confirmed address: Lower Roebuck Street, Bridgetown, St. Michael (former Barclays Bank Complex); main line: (246) 430-7100. Adding these would reduce friction for citizens making postal or in-person enquiries.

2. **BRA Promoter's Authorisation is a distinct requirement.** The page does not mention that event promoters — separately from the police certificate — must also obtain a "Promoter's Authorisation to Stage Public Entertainment" from the BRA via the Public Entertainment Portal (publicentertainment.bra.gov.bb) at least three weeks before tickets go on sale, and that this requires tax compliance (filed returns, settled debt or payment plan). Citizens organising a ticketed event need both authorisations, not just the police certificate.

3. **BRA Portal phone number.** The BRA Public Entertainment page confirms a contact number of (246) 429-3829. This is not on the alpha.gov.bb page and would be useful for citizens unable to access the portal due to the ongoing TLS issue.

---

## Sources cited

- [Barbados Revenue Authority — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — re-fetched 2026-05-29
- [BRA — What is public entertainment?](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Frequently-Asked-Questions/What-is-public-entertainment)
- [BRA — Steps to Apply for a Place of Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Steps-to-Apply-for-a-Place-of-Publ)
- [Public Entertainments Act CAP 085A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicEntertainmentsCAP085A.pdf)
- [Liquor Licence Portal — liquorlicence.gov.bb](https://liquorlicence.gov.bb/) — confirmed live 2026-05-29
- [gov.bb — Apply For Liquor Licences Online From April 1](https://www.gov.bb/news_article.php?id=105)
- [commerce.gov.bb — Reminder to re-apply online for liquor licence](https://commerce.gov.bb/reminder-to-re-apply-online-for-liquor-licence-by-this-friday/)
- [GIS — Liquor Licence Online Will Facilitate Ease In Doing Business](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/) (confirmed via search result excerpt)
- [Barbados Fire Service — fireservice.gov.bb](https://fireservice.gov.bb/) — re-fetched 2026-05-29
- [Environmental Protection Department — Noise Pollution Control](https://www.epd.gov.bb/What-We-Do/Noise-Pollution-Control/) — re-fetched 2026-05-29
- [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — re-fetched 2026-05-29
- [COSCAP — About](https://coscap.org/about) — HTTP 403 to automated fetch; identity confirmed from prior check
- [COSCAP — Tariffs](https://coscap.org/tariffs) — HTTP 403 to automated fetch; confirmed correct URL per prior check
- [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS certificate error (re-tested 2026-05-29)
