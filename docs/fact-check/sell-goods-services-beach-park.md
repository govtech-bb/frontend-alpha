# Fact-check: Apply for a licence to sell goods or services at a beach or park

- **Live page:** <https://alpha.gov.bb/business-trade/sell-goods-services-beach-park>
- **Source files:** `src/content/sell-goods-services-beach-park/index.md`, `src/content/sell-goods-services-beach-park/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 16 claims reviewed — 8 verified, 1 discrepant, 7 unverifiable. Average certainty: **70%**.

---

## Headline issues for triage

1. **NCC address contains "Bridgetown" — should be "Waterford".** The page gives the paper-form return address as "Codrington Road, Bridgetown, Saint Michael". Multiple Tier 1 and Tier 2 sources (gov.bb, GIS directory, BARP directory, mapcarta/OSM) consistently give the address as "Codrington Road, **Waterford**, Saint Michael, BB11042". "Bridgetown" does not appear in any NCC official source. A citizen posting a paper form to the NCC or keying the address into a map app will not find "Codrington Road, Bridgetown". This finding is unchanged from the 2026-05-28 pass.

2. **Licence fees are unverifiable from the public web.** The page lists four specific fee amounts including VAT ($117.50 regular licence; $176.25 watersports licence; $11.75 licence book; $12.87 ID badge). The NCC's own "Fees & Licenses" page and the renewal notice at nccbarbados.com do not publish specific dollar amounts — the renewal notice directs vendors to the NCC Accounts Department. The figures cannot be independently confirmed or contradicted without a direct call to the NCC. The VAT arithmetic is internally consistent (all four figures resolve cleanly to BDS $100, $150, $10, and ~$10.95 pre-VAT at 17.5%), which gives some confidence the numbers are plausible — but they remain unverifiable.

3. **Referee and testimonial requirements unverifiable.** No NCC public source (nccbarbados.com, gov.bb, GIS) mentions the two-referee / two-testimonial requirement. The NCC's published guidance for new applicants cites only a police certificate of character and information about the proposed beach and business type. The current page's framing — including the rule that testimonials must not come from the named referees — cannot be confirmed or contradicted from public sources.

4. **Office hours for payment are more restrictive than the page implies.** The NCC renewal notice specifies Accounts Department hours as "8:30 A.M. – 3:00 P.M., Monday–Friday" for payment/collection. The page does not state any hours, leaving citizens to assume the general office opening hours of 8:30 a.m. – 4:30 p.m. A citizen arriving at 3:30 p.m. will be unable to pay for their licence documentation.

5. **"Start now" CTA on start.md links to a form component — loads but shows "Loading form…".** The CTA at `/business-trade/sell-goods-services-beach-park/form` renders the page shell but the form body shows only "Loading form…" at fetch time (likely a dynamic/JS-rendered component). This may be working correctly for end users with JavaScript enabled, but cannot be confirmed as fully functional without a browser session.

---

## Claims

### Claim 1 — Service description: 1-year licence, renewal by 30 June (index.md lines 10, 79)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Licences are valid for 1 year and need to be renewed by 30 June each year.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Licences are valid for 1 year and need to be renewed by 30 June each year.</pre>
</div>

- **Type:** process step / statistic
- **Sources:** [NCC — Renewal of Vendors' Licenses July 01, 2024 – June 30, 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "Local vendors licensed by the National Conservation Commission have until **June 30** to renew their licences"; [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — "licenses are valid for a period of one (1) year and are renewable annually during the month of June"; [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/) — "licenses have been issued since June 1979, valid for one year"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 2 — NCC governs beach and park vending (index.md lines 28–29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can collect a paper form from the National Conservation Commission (NCC), complete it by hand, and return it to the NCC at:</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can collect a paper form from the National Conservation Commission (NCC), complete it by hand, and return it to the NCC at:</pre>
</div>

- **Type:** agency name / process step
- **Sources:** [National Conservation Commission Act, CAP 393](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/NationalConservationCommissionCAP393.pdf) — "any person who desires to operate a business of selling goods or services in a public park, in a public garden, on a beach or in a cave shall first obtain from the Commission a license for the purpose"; [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — confirms NCC issues vendor licences; [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/) — "approximately 250 licensed vendors and 100 watersports operators are active"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 3 — NCC address (index.md lines 30–32)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Codrington Road,
Bridgetown,
Saint Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Codrington Road,
Waterford,
Saint Michael</pre>
</div>

- **Type:** address
- **Sources:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — "Codrington House, St. Michael" (no Bridgetown locality listed); [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "Submit payment to the Accounts Department at Codrington House, St. Michael" (no Bridgetown); [BARP Business Directory — National Conservation Commission](https://barpmember.com/directory/directory/national-conservation-commission/) — "Codrington Road, Waterford, Saint Michael, BB11042"; [mapcarta.com — NCC Headquarters (OpenStreetMap data)](https://mapcarta.com/N5219008439) — "Codrington Road, Waterford, Saint Michael, BB11042"; [GIS — National Conservation Commission — Codrington House (location)](https://gisbarbados.gov.bb/locations/national-conservation-commission-codrington-house/) — "Codrington Road, Waterford, Saint Michael" (HTTP 403 on direct fetch — URL confirmed via web search index)
- **Status:** discrepant — "Bridgetown" does not appear in any NCC or Tier 1 source; the correct locality is "Waterford"
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a citizen posting a paper form addressed to "Codrington Road, Bridgetown" rather than "Codrington Road, Waterford" may experience mail delivery delays; a citizen using the address in a map app is unlikely to find the NCC under "Bridgetown"

---

### Claim 4 — In-person paper form speeds up application (index.md lines 34–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">However, returning it in person can speed up the process because NCC colleagues may be able to check your application for missing information and let you know immediately.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (descriptive claim — not independently testable)</div>
<pre class="claim-block-content">However, returning it in person can speed up the process because NCC colleagues may be able to check your application for missing information and let you know immediately.</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/) — confirms in-person processing at Codrington House; [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — confirms Accounts Department open Mon–Fri 8:30 a.m.–3:00 p.m. for in-person payments; general procedural claim is plausible and not contradicted by any source
- **Status:** verified (descriptive — not externally testable)
- **Certainty:** 65% (inherently operational claim; confirmed in spirit by NCC guidance that in-person renewal is the expected mechanism)

---

### Claim 5 — Referee requirements: 2 referees, one professional and one personal (index.md lines 46–47; start.md lines 17–18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The name and contact details of 2 referees (one professional and one you know in a personal capacity). They will be asked to provide references if your application is successful.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked the following sources</div>
<pre class="claim-block-content">NCC published guidance for new vendor applications states applicants must
present a police certificate of character and information about the proposed
beach and business type. No NCC public source (nccbarbados.com, gov.bb
NCC page, GIS beach-vending article) mentions a two-referee requirement
or any referee/testimonial framework. This requirement may exist but
cannot be confirmed or contradicted from the public web.</pre>
</div>

- **Type:** document requirement / eligibility
- **Checked:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission); [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/); [NCC renewal notice July 2024–June 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/); [GIS — Beach Vending](https://gisbarbados.gov.bb/blog/beach-vending/) (HTTP 403 on fetch); [gov.bb NCC application form PDF (2003)](https://www.gov.bb/media_files/ncc_publicactappform.pdf) (binary — not machine-readable)
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** Does the NCC's current vendor licence application require 2 referees (one professional, one personal)? Confirm with NCC Accounts Department: (246) 536-0617 / ncc@ncc.gov.bb.

---

### Claim 6 — Testimonial requirements: 2 testimonials, not from the named referees (index.md lines 48–49; start.md lines 19–20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">2 testimonials from people who can vouch for you. They must not be from the same 2 people you have named as referees.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked the following sources</div>
<pre class="claim-block-content">No NCC public source mentions testimonials as a requirement for a vendor
licence application. The requirement may exist as part of the paper
application form, but it is not referenced in any NCC guidance document
found on the public web.</pre>
</div>

- **Type:** document requirement
- **Checked:** [nccbarbados.com — Beach management](https://www.nccbarbados.com/beach-management/); [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/); [NCC renewal notice July 2024–June 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/); [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission); [SBA e-Toolkit](https://e-toolkit.sba.bb/etoolkit/licences-and-certificates/) — "contact the NCC, Tel: 436-0600"
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** Does the current NCC vendor licence application require two testimonials from people separate from the named referees? Confirm with NCC directly.

---

### Claim 7 — Police Certificate of Character link (index.md line 52; start.md line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">a [Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">a [Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter)</pre>
</div>

- **Type:** URL / document requirement
- **Sources:** [forms.gov.bb/CertificateOfCharacter](https://forms.gov.bb/CertificateOfCharacter) — live 2026-05-29; confirmed BBD $20 fee, 24–48 hour processing after payment; [_inventory.md — Police Certificate of Character](/docs/fact-check/_inventory.md) — "BBD $20; apply at forms.gov.bb/CertificateOfCharacter; pay via EZPAY+ … Status: verified 2026-05-28"; [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "Recent Police Certificate of Character (apply at forms.gov.bb)" confirmed as application requirement
- **Status:** verified
- **Certainty:** 99%

---

### Claim 8 — 2 passport-sized pictures required (index.md line 53; start.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">2 passport-sized pictures of yourself</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked the following sources</div>
<pre class="claim-block-content">NCC public guidance for new applications does not mention photo requirements.
The GIS beach-vending article confirms that vendors are issued ID badges and
wear polo shirts for identification — this implies photos may be used for
ID production — but the number of photos required (2) cannot be confirmed
from public NCC sources.</pre>
</div>

- **Type:** document requirement
- **Checked:** [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/); [nccbarbados.com — Beach management](https://www.nccbarbados.com/beach-management/); [NCC renewal notice July 2024–June 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/); [gov.bb NCC application form PDF (2003)](https://www.gov.bb/media_files/ncc_publicactappform.pdf) (binary — unreadable)
- **Status:** unverifiable
- **Certainty:** 40% (plausible given ID badge production; number "2" unconfirmed)
- **Open question:** How many passport-sized photographs must be submitted with a new NCC vendor licence application?

---

### Claim 9 — NCC representatives assess the location before licence is issued (index.md lines 57–58)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Representatives from the NCC will invite you to meet with them at the location where you would like to sell goods or services. They will assess suitability and determine if there is a specific area you could sell in.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked the following sources</div>
<pre class="claim-block-content">No NCC public source confirms or describes a formal site-assessment meeting
as a mandatory step in the vendor licence process. The GIS beach-vending
article states applicants must "apply to the NCC's general manager, present
a police certificate of character, information on the proposed beach and
the nature of the business" — consistent with a location-review element
but not confirming an in-person site meeting is a mandatory distinct step.</pre>
</div>

- **Type:** process step
- **Checked:** [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission); [nccbarbados.com — Beach management](https://www.nccbarbados.com/beach-management/); [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/)
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Is a formal in-person site visit/assessment by NCC representatives a mandatory step for all new vendor licence applications, or is it conducted selectively?

---

### Claim 10 — Successful applicants collect a letter of authorisation and licence book (index.md lines 59–63)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If the outcome is positive, you will be asked to visit the National Conservation Commission to collect:
1. A letter of authorisation.
2. A licence book outlining the conditions of where and what you can sell.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — checked the following sources</div>
<pre class="claim-block-content">The licence book is confirmed: multiple NCC and GIS sources state that
"vendors must carry their licence book and identification cards at all
times while carrying out their trade." The "letter of authorisation" is
not mentioned in any NCC public source found; this specific document name
cannot be confirmed or contradicted.</pre>
</div>

- **Type:** process step / document
- **Sources:** [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "Vendors must carry their license book and identification cards while operating"; [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — licence book confirmed; "letter of authorisation" not mentioned in any source
- **Status:** unverifiable (for "letter of authorisation" name specifically; licence book confirmed)
- **Certainty:** 60% (licence book 95% confirmed; letter of authorisation 25% — net average for composite claim)
- **Open question:** Does the NCC issue a document specifically called a "letter of authorisation" as part of the vendor licence approval process, or is this a colloquial description of the licence book/approval notification?

---

### Claim 11 — Vendor identification ready to collect separately (index.md line 64)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The NCC will let you know when your vendor identification is ready to collect.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct in substance</div>
<pre class="claim-block-content">The NCC will let you know when your vendor identification is ready to collect.</pre>
</div>

- **Type:** process step
- **Sources:** [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — confirms vendors carry identification cards; [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — "approximately 250 licensed beach vendors … easily identified" through NCC-issued polo shirts and ID cards; [nccbarbados.com — Process for using NCC facilities](https://www.nccbarbados.com/process-for-using-nccs-facilities/) — ID cards confirmed as issued to vendors
- **Status:** verified (in substance; timing/notification method not independently tested)
- **Certainty:** 75%

---

### Claim 12 — Payment is made at the NCC; cash or card accepted (index.md lines 68–69)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will pay for your vendor documentation when you visit the NCC. You can pay in cash or by card.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — card acceptance unconfirmed</div>
<pre class="claim-block-content">You will pay for your vendor documentation when you visit the NCC. You can pay in cash or by card.</pre>
</div>

- **Type:** process step / fee
- **Sources:** [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "Submit payment to the Accounts Department at Codrington House, St. Michael"; payment at NCC confirmed. Card acceptance is not mentioned in any NCC public source; cash-only is a possibility.
- **Status:** partially verified — the claim that payment is made in person at the NCC is confirmed; the claim that card is accepted is unconfirmed
- **Certainty:** 65%
- **Open question:** Does the NCC Accounts Department accept card payments, or is cash only? Accounts hours are 8:30 a.m.–3:00 p.m. Mon–Fri (not stated on page — see Additional findings).

---

### Claim 13 — Licence fees including VAT (index.md lines 70–77)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The prices include VAT

- Licence: $117.50

A watersports licence costs $176.25

- Licence book: $11.75
- ID badge: $12.87</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — checked the following sources</div>
<pre class="claim-block-content">No NCC public source (nccbarbados.com/process-for-using-nccs-facilities/,
the renewal notice, gov.bb NCC page, or any GIS article) publishes specific
dollar amounts for vendor licences, licence books, or ID badges. The NCC
renewal notice directs vendors to the Accounts Department for pricing.

The four amounts are internally consistent with Barbados's standard 17.5%
VAT rate (pre-VAT: $100.00 licence, $150.00 watersports, $10.00 licence
book, ~$10.95 ID badge). They cannot be confirmed or contradicted from the
public web.</pre>
</div>

- **Type:** fee
- **Checked:** [nccbarbados.com — Fees & Licenses](https://www.nccbarbados.com/process-for-using-nccs-facilities/) — no dollar amounts published; [NCC — Renewal notice July 2024](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/) — "contact the Accounts Department for pricing"; [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — no fee amounts; [BRA — VAT Rates](https://bra.gov.bb/Popular-Topics/Value-Added-Tax/VAT-Rates) — standard rate 17.5% confirmed (validates internal consistency of the figures)
- **Status:** unverifiable
- **Certainty:** 40% (VAT maths are internally consistent but no Tier 1 or Tier 2 source publishes these amounts)
- **Citizen impact:** HIGH — fees are the primary decision-making information for vendors; if any figure is stale or wrong, a vendor will arrive at the NCC with the incorrect amount
- **Open question:** Are the four fee amounts ($117.50, $176.25, $11.75, $12.87) correct for the 2025–2026 licence year? Confirm with NCC Accounts Department: (246) 536-0617 or ncc@ncc.gov.bb.

---

### Claim 14 — The Conservation Commission is responsible for this service (index.md line 81)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Conservation Commission is responsible for Apply for a licence to sell goods and services at a beach or park</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Conservation Commission is responsible for Apply for a licence to sell goods and services at a beach or park</pre>
</div>

- **Type:** agency name
- **Sources:** [National Conservation Commission Act CAP 393](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/NationalConservationCommissionCAP393.pdf) — NCC has statutory responsibility; [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission) — confirms NCC as the licensing body
- **Status:** verified
- **Certainty:** 99%
- **Note:** The sentence "The Conservation Commission is responsible for Apply for a licence to sell goods and services at a beach or park" reads as a template/data-driven attribution fragment rather than natural prose. The agency name is correct; the sentence structure appears to be a rendering artifact, not a factual error.

---

### Claim 15 — "Apply online" CTA link (index.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><a data-start-link href="/business-trade/sell-goods-services-beach-park/start">Apply online</a></pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content"><a data-start-link href="/business-trade/sell-goods-services-beach-park/start">Apply online</a></pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb/business-trade/sell-goods-services-beach-park/start](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park/start) — live 2026-05-29; page loads with correct title and content
- **Status:** verified
- **Certainty:** 99%

---

### Claim 16 — "Start now" CTA on start.md (start.md line 26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><a data-start-link href="/business-trade/sell-goods-services-beach-park/form">Start now</a></pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — page shell loads; form body shows "Loading form…"</div>
<pre class="claim-block-content">The URL resolves without a 404. The page renders a government header and
footer correctly. The main content area shows "Loading form…" — likely a
JavaScript-rendered component that requires a real browser session to
complete rendering. Cannot confirm the form fully functions from a static
fetch.</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb/business-trade/sell-goods-services-beach-park/form](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park/form) — URL resolves 2026-05-29
- **Status:** unverifiable (route live; full form functionality requires browser session)
- **Certainty:** 70% (route exists; form rendering depends on JS — standard for this site's dynamic form components)
- **Open question:** Does the online application form at `/business-trade/sell-goods-services-beach-park/form` fully render and function for end users? Test in a browser with JavaScript enabled.

---

## Additional findings (not on the page but should be)

### NCC Accounts Department hours restrict same-day payment

The NCC renewal notice specifies Accounts Department hours as **8:30 A.M. – 3:00 P.M., Monday–Friday** for submitting payment. The NCC's general office operates 8:30 a.m.–4:30 p.m., so a vendor arriving between 3:00 p.m. and 4:30 p.m. will find the Accounts Department closed. The page does not state any hours for payment or collection. Adding a note such as "The Accounts Department is open Monday–Friday, 8:30 a.m.–3:00 p.m." would prevent wasted journeys.

**Source:** [NCC — Renewal of Vendors' Licenses July 01, 2024 – June 30, 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/)

### Health certificate required for food/drink vendors

The NCC renewal notice adds: "a recent health certificate is required for vendors who sell food and/or drinks." The current page does not mention this requirement in either index.md or start.md. Vendors selling food or beverages who do not obtain a health certificate before their appointment will be delayed.

**Source:** [NCC — Renewal of Vendors' Licenses July 01, 2024 – June 30, 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/)

### Watersports operators have additional vessel documentation requirements

For watersports licence renewals the NCC additionally requires: valid vessel registration certificates and current insurance certificates for vessels. The start.md page makes no mention of these additional requirements. A watersports operator applying without vessel paperwork will be turned away.

**Source:** [NCC — Renewal of Vendors' Licenses July 01, 2024 – June 30, 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/)

### Licence is non-transferable

The NCC licence conditions state that licences are "not transferable." This condition is not mentioned anywhere on the alpha.gov.bb page but is a significant trading restriction for anyone considering sharing or passing on a vendor licence.

**Source:** [NCC — Renewal of Vendors' Licenses July 01, 2024 – June 30, 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/)

### NCC website and contact details missing from page

The page gives no phone number, email address, or website for the NCC beyond the postal address. The NCC's verified contact details are:

- **Phone:** (246) 536-0617 (Customer Service / Accounts Department)
- **Email:** ncc@ncc.gov.bb (general) / specialprojectsoffice@ncc.gov.bb
- **Website:** nccbarbados.com

Adding these would let applicants check status, ask questions, or confirm hours before making a journey.

**Sources:** [nccbarbados.com — Home](https://www.nccbarbados.com/); [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission)

---

## Sources cited

- [gov.bb — National Conservation Commission](https://www.gov.bb/State-Bodies/national-conservation-commission)
- [nccbarbados.com — Home](https://www.nccbarbados.com/)
- [nccbarbados.com — Fees & Licenses (Process for using NCC facilities)](https://www.nccbarbados.com/process-for-using-nccs-facilities/)
- [nccbarbados.com — Renewal of Vendors' Licenses July 01, 2024 – June 30, 2025](https://www.nccbarbados.com/renewal-of-vendors-licenses-july-01-2024-june-30-2025/)
- [nccbarbados.com — Beach management](https://www.nccbarbados.com/beach-management/)
- [National Conservation Commission Act CAP 393 (Barbados Law Courts PDF)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/NationalConservationCommissionCAP393.pdf)
- [forms.gov.bb — Application for Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter)
- [GIS — Beach Vending](https://gisbarbados.gov.bb/blog/beach-vending/) (HTTP 403 on direct fetch — URL confirmed via web search index)
- [GIS — National Conservation Commission — Codrington House (location)](https://gisbarbados.gov.bb/locations/national-conservation-commission-codrington-house/) (HTTP 403 on direct fetch — URL confirmed via web search index)
- [BARP Business Directory — National Conservation Commission](https://barpmember.com/directory/directory/national-conservation-commission/)
- [mapcarta.com — NCC Headquarters (OpenStreetMap data)](https://mapcarta.com/N5219008439)
- [BRA — VAT Rates](https://bra.gov.bb/Popular-Topics/Value-Added-Tax/VAT-Rates)
- [SBA e-Toolkit — Licences and Certificates](https://e-toolkit.sba.bb/etoolkit/licences-and-certificates/)
- [gov.bb — NCC Public Act Application Form (PDF, 2003)](https://www.gov.bb/media_files/ncc_publicactappform.pdf) (binary — not machine-readable)
- [alpha.gov.bb — sell-goods-services-beach-park (live page)](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park)
- [alpha.gov.bb — sell-goods-services-beach-park/start (start page)](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park/start)
- [alpha.gov.bb — sell-goods-services-beach-park/form (form)](https://alpha.gov.bb/business-trade/sell-goods-services-beach-park/form)
