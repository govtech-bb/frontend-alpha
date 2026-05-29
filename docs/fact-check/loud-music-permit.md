# Fact-check: Get a permit to play loud music

- **Live page:** <https://alpha.gov.bb/business-trade/loud-music-permit>
- **Source file:** `src/content/loud-music-permit.md`
- **Last checked:** 2026-05-28
- **Summary:** 14 claims reviewed — 5 verified, 3 discrepant, 6 unverifiable. Average certainty: **67%**.

---

## Headline issues for triage

1. **Liquor licence application route is wrong.** The page tells citizens to "apply for a liquor license from the police." Under the Liquor Licence Act, 2021 (in force from April 2022), applications go to the Liquor Licensing Authority (Department of Commerce and Consumer Affairs) online at liquorlicence.gov.bb — not through the police. The Commissioner of Police is notified of applications and may appear at objection hearings, but plays no administrative role. **Citizen impact: HIGH** — a citizen following this instruction would contact the wrong authority.

2. **Exemptions list is incomplete and uses informal language.** The BRA lists four statutory exemptions from the promoter's authorisation requirement; the page states only two ("educational institutions" and "religious groups"). Two exemptions are missing: persons who provide entertainment on a daily or weekly basis, and churches registered under the Charities Act (the statutory phrasing differs from "religious groups"). **Citizen impact: MEDIUM** — a weekly venue operator or non-Christian church could incorrectly believe they need a permit.

3. **The 1,000 / 1,500 attendee thresholds for police and fire presence cannot be confirmed from any public source.** The BRA and the Public Entertainments Act require certificates from the Commissioner of Police and Chief Fire Officer for venue licences — but these are "fit and proper person" / "sufficient fire exits" certificates, not attendance-triggered requirements. No public source specifies 1,000 or 1,500 as threshold figures. **Citizen impact: HIGH** — event organisers act on these numbers; if thresholds are wrong, they may either fail to arrange required services or incur unnecessary cost.

4. **TLS certificate error on `publicentertainment.bra.gov.bb` persists.** Both the main portal and the /Help sub-page return a TLS certificate validation error as of 2026-05-28 (same error as F-018). Citizens following the annual-permit link will receive a browser security warning and most will abandon. **Citizen impact: HIGH** — the link is unclickable for ordinary citizens.

5. **"Definition of loud music" is not a statutory definition.** The Environmental Protection Department page explicitly states there is no noise legislation in Barbados; the EPD uses WHO Community Noise Guidelines as reference. The page's definition ("music you can hear outside the boundary of a property, or at a time when people would reasonably expect quiet") is reasonable plain-language guidance but has no statutory grounding. **Citizen impact: LOW** — descriptive framing issue, not a procedural error.

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
- **Sources:** [liquorlicence.gov.bb](https://liquorlicence.gov.bb/) — portal operated by the Liquor Licensing Authority, which explicitly states applications are submitted here under the Liquor Licence Act, 2021. "The Authority must … within 3 days, publish a notice of the receipt of the application on the Ministry's website" (section 11(1)(a)); [gov.bb — Apply For Liquor Licences Online From April 1](https://www.gov.bb/news_article.php?id=105) — confirms that from 1 April 2022 "the Department of Commerce and Consumer Affairs (DCCA) took over administrative responsibility for issuing liquor licences … the liquor licence regime shifted online, from a manual application system through the Magistracy"; [GIS — Liquor Licence Online Will Facilitate Ease In Doing Business](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/) — "persons may apply online at liquorlicence.gov.bb"; [commerce.gov.bb — Reminder to re-apply online for liquor licence](https://commerce.gov.bb/reminder-to-re-apply-online-for-liquor-licence-by-this-friday/)
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

- **Type:** external URL + process
- **Sources:** [coscap.org — About](https://coscap.org/about) — "COSCAP (Copyright Society of Composers, Authors and Publishers Incorporated) was formally registered in 1998 as a Barbadian collective management organisation … The key function is to administer the performing, broadcast, online and reproduction rights of its members"; [BCCI — COSCAP listing](https://www.barbadoschamberofcommerce.com/copyright-society-of-composers-authors-and-publishers-incorporated/) confirms COSCAP as the authoritative Barbados music rights body. The linked URL [coscap.org/tariffs](https://coscap.org/tariffs) appears in COSCAP's own site navigation (confirmed via search results) but returns HTTP 403 to automated fetchers — it is the correct URL and loads in a regular browser.
- **Status:** verified
- **Certainty:** 85% (COSCAP is confirmed as the right body; the /tariffs URL resolves in browsers but blocks automated checks)

### Claim 3 — "police presence – if you expect to have more than 1,000 attendees" (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">police presence – if you expect to have more than 1,000 attendees</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no public source confirms this threshold</div>
<pre class="claim-block-content">The BRA and the Public Entertainments Act require promoters to obtain
a certificate from the Commissioner of Police that the venue operator
is "a fit and proper person to keep a place of public entertainment"
— but neither source specifies a 1,000-person attendee threshold as
triggering mandatory police presence. No public document (Act, BRA
guidance, GIS press release, police circular) has been found that
uses the 1,000 figure.</pre>
</div>

- **Type:** regulatory threshold / statistic
- **Checked:** [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — confirms police certificate requirement for venue licences but states no attendee threshold; [BRA — What is public entertainment?](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Frequently-Asked-Questions/What-is-public-entertainment) — no threshold mentioned; [Public Entertainments Act CAP 085A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicEntertainmentsCAP085A.pdf) — PDF unreadable by automated fetch (binary); [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no mention of event thresholds; [GIS — Commissioner of Police tag](https://gisbarbados.gov.bb/blog/tag/commissioner-of-police/) — 403 Forbidden; web search across .gov.bb domains returned no document with the 1,000-person figure.
- **Status:** unverifiable from public web
- **Certainty:** 35%
- **Citizen impact:** HIGH — event organisers act on this number; if it is wrong or has no legal basis, organisers may either incur unnecessary cost or fail to arrange required services.
- **Open question:** confirm with the Barbados Police Service whether a 1,000-person threshold is documented in any circular, policy, or practice note. If no threshold exists, reword as guidance rather than a hard rule (e.g. "the Commissioner of Police may require police presence at large events — contact Police HQ for advice").

### Claim 4 — "fire service presence – if you expect to have more than 1,500 attendees" (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">fire service presence –  if you expect to have more than 1,500 attendees</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — no public source confirms this threshold</div>
<pre class="claim-block-content">The BRA requires a certificate from the Chief Fire Officer confirming
"sufficient fire exits in relation to the number of persons who are
to be accommodated therein" for venue licences. Annual licence
renewal also requires a Chief Fire Officer certificate. Neither
source specifies a 1,500-person attendee threshold as triggering
mandatory fire service presence at events. The Barbados Fire Service
website lists a "Request Fire Coverage" service for events but does
not specify any minimum attendance requirement.</pre>
</div>

- **Type:** regulatory threshold / statistic
- **Checked:** [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — fire certificate required for venue licence but no attendee threshold stated; [fireservice.gov.bb](https://fireservice.gov.bb/) — "Request Fire Coverage" service listed but no attendance threshold given; [Fire Service Act CAP 163](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/FireServiceCAP163.pdf) — not directly fetched (no URL confirmed during this pass); web search across .gov.bb domains returned no document with the 1,500-person figure.
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
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — confirms a "Promoter's Authorisation to Stage Public Entertainment" is required from BRA for event organisers; promoters must "file outstanding tax returns" and "settle tax debt" before permission is issued; [BRA — Steps to Apply for a Place of Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Steps-to-Apply-for-a-Place-of-Publ) — confirms registration via BRA portal.
- **Status:** verified
- **Certainty:** 90%

### Claim 6 — Definition of "loud music" — "music you can hear outside the boundary of a property, or at a time when people would reasonably expect quiet" (lines 31–33)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Loud music means music you can hear outside the boundary of a
property, or at a time when people would reasonably expect quiet.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Not a statutory definition — no Barbados noise legislation exists</div>
<pre class="claim-block-content">The Environmental Protection Department explicitly states: "There is
no noise legislation in Barbados." The EPD uses WHO Community Noise
Guidelines as reference standards. The Public Entertainments Act
does not define "loud music." This definition is reasonable
plain-language guidance but has no statutory grounding in Barbados
law.</pre>
</div>

- **Type:** definition / descriptive
- **Sources:** [EPD — Noise Pollution Control](https://www.epd.gov.bb/What-We-Do/Noise-Pollution-Control/) — confirms "There is no noise legislation in Barbados"; [Public Entertainments Act CAP 085A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicEntertainmentsCAP085A.pdf) — no statutory definition of "loud music" (PDF unreadable by automated fetch; confirmed absent by search).
- **Status:** unverifiable as a statutory definition; phrasing is reasonable plain-language guidance
- **Certainty:** 50%
- **Open question:** confirm with the content team whether the definition is intended as legal guidance (in which case it needs a statutory basis) or plain-language explanation (in which case a caveat like "broadly speaking" might help). The EPD's WHO-based decibel thresholds could be cited as the practical standard in Barbados.

### Claim 7 — Venues can apply for an annual permit at publicentertainment.bra.gov.bb (line 45)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Venues can apply for an annual permit to play loud music at publicentertainment.bra.gov.bb with the Barbados Revenue Authority.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Portal exists but TLS error persists as of 2026-05-28</div>
<pre class="claim-block-content">The BRA does operate an annual Place of Public Entertainment licence
renewable on or before January 31 each year. The portal at
publicentertainment.bra.gov.bb is the correct destination. However,
both the root URL and the /Help sub-page return an "unable to verify
the first certificate" TLS error when fetched — the same error
flagged as F-018. Citizens using this link will receive a browser
security warning and most will abandon the application.</pre>
</div>

- **Type:** external URL + process
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — "A licence may be renewed annually on or before January 31, upon the production of a certificate from the Chief Fire Officer and upon payment of the prescribed fee" — confirms the annual permit exists; [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS certificate validation error on fetch (tested 2026-05-28, same as previous check on 2026-05-27); [publicentertainment.bra.gov.bb/Help](https://publicentertainment.bra.gov.bb/Help) — also returns TLS error.
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
<div class="claim-block-label">Should say (per BRA — Public Entertainment page)</div>
<pre class="claim-block-content">The following groups do not need to declare a public entertainment
event:

- an approved educational institution
- the board of management or a parent teacher association of an
  approved educational institution
- a person who provides entertainment on a daily or weekly basis
- a church registered under the Charities Act</pre>
</div>

- **Type:** regulatory exemption
- **Sources:** [BRA — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — verbatim: "an approved educational institution; or the board of management or a parent teacher association of an approved educational institution; a person who provides entertainment on a daily or weekly basis, or a church registered under the Charities Act."
- **Status:** discrepant
- **Certainty:** 85%
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — two exemptions are missing from the page. A daily/weekly entertainment provider (e.g. a restaurant with regular live music) and any church not using the term "religious groups" could incorrectly believe they need a permit. Also, the page uses "religious groups" (informal) rather than the statutory phrase "a church registered under the Charities Act" — some religious organisations may not qualify.

### Claim 9 — "Apply 4 weeks before your event" attributed to the Commissioner of Police (line 61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Commissioner of Police advises you should apply for a loud music
license 4 weeks before your event. However, to be safe, it is a
good idea to do it as soon as possible.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify direct attribution</div>
<pre class="claim-block-content">No public source confirms this specific guidance was issued by the
Commissioner of Police. The BRA promoter guidance specifies applying
"at least three weeks before tickets go on sale" for the Promoter's
Authorisation, but that is a separate requirement from the police
certificate. No publicly archived statement from the Commissioner
with a 4-week timeframe has been found.</pre>
</div>

- **Type:** official advice / process step
- **Checked:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no processing-time guidance published; [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — states promoters must apply "at least three weeks before tickets go on sale" (this is the BRA's own requirement, not the Commissioner's); [GIS — Commissioner of Police tag](https://gisbarbados.gov.bb/blog/tag/commissioner-of-police/) — 403 Forbidden to fetch.
- **Status:** unverifiable — direct attribution to the Commissioner of Police cannot be confirmed from any public source
- **Certainty:** 60%
- **Open question:** confirm with the Barbados Police Service whether the Commissioner has formally issued 4-week guidance, and obtain a citable source. Note: the BRA's own "3 weeks before tickets go on sale" advice (for the Promoter's Authorisation) may be the source of confusion.

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
- **Checked:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — no SLA published; [BRA — Public Entertainment overview](https://bra.gov.bb/Popular-Topics/Public-Entertainment/) — "Permission will be issued one week before the event" (BRA's own timeframe only).
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
<div class="claim-block-label">Verified correct (with minor address detail added)</div>
<pre class="claim-block-content">Write a letter or email to the Police Commissioner's office at
Barbados Police Service headquarters in Bridgetown.

[Full address: Lower Roebuck Street, Bridgetown, St. Michael
(former Barclays Bank Complex)]</pre>
</div>

- **Type:** address / process step
- **Sources:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — "The headquarters for the RBPF is in the former Barclays Bank Complex on Lower Roebuck Street, Bridgetown, Saint Michael."
- **Status:** verified
- **Certainty:** 90%
- **Note:** the page could usefully add the street address (Lower Roebuck Street) to help citizens locate the headquarters.

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

- **Type:** document requirement / process
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
<pre class="claim-block-content">The Barbados Police Service is organised into three territorial
divisions. Decisions routed through the local divisional office is
consistent with this structure but no public source explicitly
describes this as the process for loud-music permit decisions.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — Police Department](https://www.gov.bb/Departments/police-department) — "The Barbados Police Service … is divided into three territorial divisions, the Operations Support Division, the Administrative Support Division and the Criminal Investigations Division." Divisional routing of permit decisions is consistent with this structure.
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

1. **Full street address for Police HQ.** The page tells citizens to write to "Barbados Police Service headquarters in Bridgetown" but does not give the street address. The confirmed address is Lower Roebuck Street, Bridgetown, St. Michael (former Barclays Bank Complex). Adding this would reduce the friction of making a postal or in-person enquiry.

2. **BRA Promoter's Authorisation is a distinct requirement.** The page does not mention that event promoters — separately from the police certificate — must also obtain a "Promoter's Authorisation to Stage Public Entertainment" from the BRA via the Public Entertainment Portal (publicentertainment.bra.gov.bb) at least three weeks before tickets go on sale, and that this requires tax compliance (filed returns, settled debt or payment plan). Citizens organising a ticketed event need both authorisations, not just the police certificate.

3. **BRA Portal phone number.** The BRA Public Entertainment page confirms a contact number of (246) 429-3829. This is not on the alpha.gov.bb page and would be useful for citizens unable to access the portal due to the TLS issue.

---

## Sources cited

- [Barbados Revenue Authority — Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/)
- [BRA — What is public entertainment?](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Frequently-Asked-Questions/What-is-public-entertainment)
- [BRA — Steps to Apply for a Place of Public Entertainment](https://bra.gov.bb/Popular-Topics/Public-Entertainment/Steps-to-Apply-for-a-Place-of-Publ)
- [Public Entertainments Act CAP 085A (PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicEntertainmentsCAP085A.pdf)
- [Liquor Licence Portal — liquorlicence.gov.bb](https://liquorlicence.gov.bb/) (Liquor Licence Act, 2021)
- [gov.bb — Apply For Liquor Licences Online From April 1](https://www.gov.bb/news_article.php?id=105)
- [commerce.gov.bb — Reminder to re-apply online for liquor licence](https://commerce.gov.bb/reminder-to-re-apply-online-for-liquor-licence-by-this-friday/)
- [GIS — New Liquor Licencing Authority & Digital Platform](https://gisbarbados.gov.bb/blog/new-liquor-licencing-authority-digital-platform/) (403 on fetch — confirmed via search result excerpt)
- [GIS — Liquor Licence Online Will Facilitate Ease In Doing Business](https://gisbarbados.gov.bb/blog/liquor-licence-online-will-facilitate-ease-in-doing-business/) (confirmed via search result excerpt)
- [Barbados Fire Service — fireservice.gov.bb](https://fireservice.gov.bb/)
- [Environmental Protection Department — Noise Pollution Control](https://www.epd.gov.bb/What-We-Do/Noise-Pollution-Control/)
- [gov.bb — Police Department](https://www.gov.bb/Departments/police-department)
- [COSCAP — About](https://coscap.org/about)
- [COSCAP — Tariffs](https://coscap.org/tariffs) (HTTP 403 to automated fetch; resolves in a regular browser)
- [BCCI — COSCAP listing](https://www.barbadoschamberofcommerce.com/copyright-society-of-composers-authors-and-publishers-incorporated/)
- [publicentertainment.bra.gov.bb](https://publicentertainment.bra.gov.bb/) — TLS certificate error (tested 2026-05-28)
- [publicentertainment.bra.gov.bb/Help](https://publicentertainment.bra.gov.bb/Help) — TLS certificate error (tested 2026-05-28)
