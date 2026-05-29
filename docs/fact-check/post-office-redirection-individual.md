# Fact-check: Redirect my personal mail

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual>
- **Source files:** `src/content/post-office-redirection-individual/index.md`, `src/content/post-office-redirection-individual/start.md`
- **Last checked:** 2026-05-28
- **Summary:** 14 claims reviewed — 5 verified, 2 discrepant, 7 unverifiable. Average certainty: **59%**.

---

## Headline issues for triage

1. **Age threshold is wrong: "18 years old" should be "16 years old".** The page states that only adults aged 18 and over may complete a redirection form. The Barbados Postal Service's own change-of-address page explicitly states: *"all persons over the age of sixteen years old, residing in the same household must write their names and sign the redirection form."* The threshold is 16, not 18. A 16- or 17-year-old living independently, or a household whose primary adult is 17, could incorrectly believe they are ineligible. This is a Tier A discrepancy.

2. **No fee is disclosed anywhere on the page.** The BPS charges BDS $13.00 for domestic/individual customers. Neither `index.md` nor `start.md` mentions any fee. Citizens who arrive at the Post Office without payment will be sent away. The business redirection page (`post-office-redirection-business/index.md`) correctly discloses its $30 BBD fee; the individual page omits the analogous $13 figure entirely.

3. **Six-month duration limit is unverifiable.** Both `index.md` (lines 23 and 70) assert the redirection lasts a maximum of 6 months. The BPS change-of-address page does not state any duration period. This claim cannot be confirmed or contradicted from the public web and needs direct BPS confirmation — consistent with the same unverifiable finding on the sibling business redirection page (F-061).

4. **National ID card requirement at the counter has no published basis.** The page states that every adult household member must bring a National ID card to verify identity. The BPS's own published guidance for domestic customers says only that all persons over 16 must "write their names and sign the redirection form" — no mention of National ID card presentation. Plausible, but unconfirmed from any BPS-published source.

5. **"Any Post Office" claim is unverifiable.** The BPS change-of-address page references the General Post Office (Cheapside, Bridgetown, Mon–Fri 8:00am–4:00pm) as the service location. Whether all 19 branch offices across the island can accept and process individual redirection applications is not confirmed by BPS-published information.

---

## Claims

### Claim 1 — Agency name in frontmatter description (index.md line 3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Tell the Barbados Post Office to redirect your personal mail to a new address. You must complete one redirection notice per household.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Tell the Barbados Postal Service to redirect your personal mail to a new address. You must complete one redirection notice per household.</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Postal Service — Home (bps.gov.bb)](https://bps.gov.bb/) — site logo, About Us and all page headings consistently use "Barbados Postal Service"; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — lists the department as "Barbados Postal Service"; see also [EZPay fact-check](/home/gavin/frontend-alpha/docs/fact-check/ezpay.md) and [post-office-redirection-business.md](/home/gavin/frontend-alpha/docs/fact-check/post-office-redirection-business.md) Claim 1 (F-059)
- **Status:** discrepant — "Barbados Post Office" is not the canonical name
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** LOW — frontmatter description propagates into search snippets and social previews; body copy at lines 68 and 73 correctly uses "Barbados Postal Service"

---

### Claim 2 — Eligibility age threshold (index.md lines 12–13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you are an adult (18 years old or over), you can complete a redirection form to redirect mail addressed to you.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">If you are 16 years old or over, you can complete a redirection form to redirect mail addressed to you.</pre>
</div>

- **Type:** eligibility
- **Sources:** [Barbados Postal Service — Change Of Address (bps.gov.bb)](https://bps.gov.bb/change-of-address/) — "all persons over the age of sixteen years old, residing in the same household must write their names and sign the redirection form in the spaces provided"; [Barbados Postal Service — General Client page 2 (bps.gov.bb)](https://bps.gov.bb/category/general-client/page/2/) — same threshold stated in service summary
- **Status:** discrepant — BPS sets the threshold at 16, not 18
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a 16- or 17-year-old living independently cannot lawfully redirect their mail if they follow the page's instruction; a household including only 16–17-year-old adults (e.g. student household) would be incorrectly told they are ineligible

---

### Claim 3 — Dependants definition (index.md lines 15–18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Dependants are:

* children under 18
* vulnerable relatives (those with physical or mental infirmity or care needs)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — no BPS source confirms or contradicts</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) states that all household members
over 16 must sign the form, but does not define "dependants" or explain who may be included under
another person's application. No GIS article, gov.bb page, or other BPS-published source confirms
or contradicts the definition of "dependants" as used on this page. The term and its scope (children
under 18, vulnerable relatives) are plausible procedural guidance but have no published authoritative
basis found during this check.</pre>
</div>

- **Type:** eligibility
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — checked 2026-05-28, no definition of dependants; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no eligibility details; [REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF, content not machine-readable
- **Status:** unverifiable
- **Certainty:** 35%
- **Citizen impact:** LOW — if BPS accepts the form for children under 18 and vulnerable relatives without separate forms, the guidance is helpful; if not, the citizen's application will be rejected or they will be charged an additional fee
- **Open question:** Does BPS allow one household form to cover children under 18 and vulnerable relatives? Or does each person require a separate form? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 4 — Redirection notice duration (index.md lines 23 and 70)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A redirection notice will last for 6 months.
[...]
Your redirection notice will last for a maximum of 6 months. After the notice has expired, all mail
will be delivered to the address it has on it.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — awaiting agency confirmation</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) states the fee and signing
requirements but does not specify any duration or maximum period for the redirection service.
Neither the form PDF (gov.bb/media_files/PostOffice_RedirNotice.pdf — binary, not machine-readable)
nor any other BPS or GIS source checked on 2026-05-28 confirms or contradicts the 6-month figure.
The same claim appears on both sibling pages (post-office-redirection-business/index.md lines 15, 67
and post-office-redirection-deceased/index.md lines 10, 52, 66) and is equally unverified on all
three. See also F-061 (business page) for the identical open question.</pre>
</div>

- **Type:** hours (service duration / expiry)
- **Sources:** [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/) — checked 2026-05-28, no duration stated; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no duration stated; [REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF, content not machine-readable; [post-office-redirection-business.md](/home/gavin/frontend-alpha/docs/fact-check/post-office-redirection-business.md) Claim 3 — same finding (F-061)
- **Status:** unverifiable
- **Certainty:** 35%
- **Citizen impact:** MEDIUM — a household acting on a stated 6-month limit will plan mail-address update communications accordingly; if the actual period is different, mail will be mis-delivered after expiry
- **Open question:** What is the maximum permitted duration of an individual/household mail redirection? Does the printed form include "start date" and "end date" fields? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 5 — Form download URL (index.md line 43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Download and print the form from the Barbados Postal Service website.
[link: https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Download and print the form from the Barbados Postal Service website.
[link: https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf]</pre>
</div>

- **Type:** URL
- **Sources:** [Google — "REDIRECTION NOTICE" site:gov.bb](https://www.google.com/search?q=%22REDIRECTION+NOTICE%22+site%3Agov.bb) — search returns this URL directly as the "REDIRECTION NOTICE" document hosted at gov.bb; [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — references a downloadable "Redirection Notice" form consistent with this URL; same URL verified on sibling pages and in [post-office-redirection-business.md](/home/gavin/frontend-alpha/docs/fact-check/post-office-redirection-business.md) Claim 4
- **Status:** verified
- **Certainty:** 85%
- **Note:** The PDF is binary and its fields could not be audited programmatically. A human reviewer should open the PDF to confirm the form matches the page's stated field requirements. The URL host is gov.bb rather than bps.gov.bb, but this is consistent with how other government forms are hosted.

---

### Claim 6 — Form fields: name and National Identification number (index.md lines 52–54)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the name and National Identification number of every person who wants to redirect their mail</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — partially consistent with BPS guidance</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) confirms that "all persons over
the age of sixteen years old, residing in the same household must write their names … in the
spaces provided." The name requirement is therefore verified. However, the National Identification
number as a form field is not mentioned on the BPS page. The form PDF is binary and could not be
inspected. The National ID number requirement is plausible and consistent with how other government
services operate in Barbados, but cannot be independently confirmed from BPS-published guidance.</pre>
</div>

- **Type:** document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms name field for all persons 16+; no mention of National Identification number; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Does the BPS individual redirection form require a National Identification number for each household member? Confirm with BPS: customerservice@bps.bb or (246) 535-3956.

---

### Claim 7 — Form fields: old address, new address, start date, end date (index.md lines 55–57)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the old address
the new address
start date of redirection
end date of the redirection</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable — addresses confirmed; dates unverifiable</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) confirms that the form captures
addresses and that "the date written on the form must be the day of submission … OR a future date
(if the customer is in the process of moving or hasn't moved as yet)." This is consistent with a
start-date field. An end date field is implied by the stated 6-month maximum (Claim 4), but neither
the BPS page nor any other source explicitly confirms an "end date" field on the form. The form PDF
is binary and could not be inspected.</pre>
</div>

- **Type:** document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms addresses and start/submission date logic; no explicit mention of an end-date field; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 55%
- **Open question:** Does the form include a dedicated "end date" field, or is the end date automatically set to 6 months from the start date? Confirm with BPS.

---

### Claim 8 — In-person signing and National ID card verification (index.md lines 60–63)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Everyone who is 18 years old and over who wants to redirect their personal mail must visit any
Post Office, in person, to:

1. Sign the form.
2. Verify their identity with their National ID card.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable — age threshold wrong; signing confirmed; National ID card unconfirmed</div>
<pre class="claim-block-content">Age threshold: 16 (not 18) per bps.gov.bb/change-of-address/ — see Claim 2.

In-person visit: the BPS page confirms the form is submitted in person ("the person submitting the
form and making the payment in person"). This is consistent with the requirement to visit a Post
Office.

Signing: BPS confirms "all persons over the age of sixteen … must write their names and sign the
redirection form." Consistent with the signing step.

National ID card: not mentioned in any BPS-published guidance. The BPS says the primary applicant
must have "their name as the primary applicant affixed to the top of the form, signed &amp; dated" but
does not specify presenting a National ID card at the counter. The requirement is plausible
(corroborated by the business page requiring the same) but unconfirmed from BPS-published sources.</pre>
</div>

- **Type:** process step / eligibility / document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms in-person signing; no National ID card requirement stated; [bps.gov.bb — General Client page 2](https://bps.gov.bb/category/general-client/page/2/) — same guidance; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable (National ID claim); discrepant (age threshold) — see Claim 2
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — a household member who arrives without their National ID card will be turned away if it is genuinely required; the age threshold error compounds this (a 16–17-year-old will incorrectly believe they do not need to attend)
- **Open question:** Does the BPS counter require National ID card presentation for individual redirection applications? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 9 — Reference number on confirmation email for online form (index.md lines 65–66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For households who complete the online redirection form, the Post Office cashier will ask for the
reference number on the confirmation email.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — online form status unknown</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) describes only in-person or
paper-form submission and does not mention an online form or a confirmation email / reference
number workflow. No GIS article or BPS announcement has been located confirming that an online
redirection form is live. The alpha.gov.bb page itself provides a "Complete online form" link
(index.md line 39 → /start route), but it is not confirmed whether the online application is
currently in operation. The EZPay+ service list (ezpay.gov.bb/common_service) does not list
postal redirection. See also: the business redirection page has the same payment step commented
out in HTML (post-office-redirection-business/index.md line 30), suggesting the online route
may not yet be fully live.</pre>
</div>

- **Type:** process step
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no online form described; [EZPay+ service list — ezpay.gov.bb](https://ezpay.gov.bb/common_service) — postal redirection not listed; [post-office-redirection-business.md](/home/gavin/frontend-alpha/docs/fact-check/post-office-redirection-business.md) Claim 5 — same finding for business page
- **Status:** unverifiable
- **Certainty:** 30%
- **Open question:** Is the online individual mail redirection form currently live? If so, what is the direct URL? If not, when is the launch planned? Confirm with GovBB / BPS.

---

### Claim 10 — "Any Post Office" can process the application (index.md lines 44, 60)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Collect a paper form from any Post Office.
[...]
Everyone who is 18 years old and over … must visit any Post Office, in person</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — BPS guidance specifies General Post Office</div>
<pre class="claim-block-content">The BPS change-of-address page references the General Post Office, Cheapside, Bridgetown,
Monday–Friday 8:00 AM–4:00 PM as the service location. It is not confirmed whether branch offices
also accept and process redirection forms. BPS operates 19 postal counters across the island
(per bps.gov.bb/about-us/) but BPS-published guidance does not confirm that all branches handle
redirection applications. The same finding appears on the sibling business page (post-office-
redirection-business.md Claim 9).</pre>
</div>

- **Type:** process step / address
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — references General Post Office, Cheapside only; [bps.gov.bb — About Us](https://bps.gov.bb/about-us/) — 19 postal counters; [bps.gov.bb — Contact Us](https://bps.gov.bb/contact-us/) — branch offices Mon 8:00–3:00, Tue–Fri 8:00–3:15
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Can individual redirection forms be submitted at any BPS branch, or only at the General Post Office in Cheapside, Bridgetown? Confirm with BPS.

---

### Claim 11 — Barbados Postal Service delivers from start date (index.md lines 68–69)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Barbados Postal Service will begin to deliver your mail to your new address from the start date
you gave on the form.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with caveat)</div>
<pre class="claim-block-content">The Barbados Postal Service will begin to deliver your mail to your new address from the start date
you gave on the form.</pre>
</div>

- **Type:** process step / descriptive
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — "The date written on the form must be the day of submission (once the customer has already moved) OR a future date (if the customer is in the process of moving or hasn't moved as yet)." Consistent with delivery starting from the stated date; forms cannot be backdated
- **Status:** verified (with a note that back-dating is prohibited — see Additional findings)
- **Certainty:** 85%

---

### Claim 12 — "The Post Office is responsible for this service" (index.md line 73)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Post Office is responsible for this service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Post Office is responsible for this service.</pre>
</div>

- **Type:** agency name / descriptive
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- **Status:** verified — "The Post Office" is acceptable colloquial shorthand; canonical name is "Barbados Postal Service"
- **Certainty:** 99%

---

### Claim 13 — start.md: "10 minutes" completion time (start.md line 12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It shouldn't take longer than 10 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — no external source</div>
<pre class="claim-block-content">No BPS or GIS source publishes a time estimate for completing the individual redirection form.
The 10-minute estimate cannot be confirmed or contradicted from the public web. This is an
operational/editorial claim testable only against the live form. The same estimate appears on
the sibling business redirection start.md (post-office-redirection-business/start.md line 11),
also unverified.</pre>
</div>

- **Type:** hours (completion time estimate)
- **Sources:** Testable against the live online form (component route at `/travel-id-citizenship/post-office-redirection-individual/form`) — no external source available; [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no time estimate given
- **Status:** unverifiable
- **Certainty:** 30%
- **Open question:** Does the live online form take approximately 10 minutes? Test against the form when confirmed live.

---

### Claim 14 — start.md: form fields mirror index.md (start.md lines 16–20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">* the name and National Identification number of every person who wants to redirect their mail
* the old address
* the new address
* start date of redirection
* end date of the redirection</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (internal consistency)</div>
<pre class="claim-block-content">* the name and National Identification number of every person who wants to redirect their mail
* the old address
* the new address
* start date of redirection
* end date of the redirection</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [src/content/post-office-redirection-individual/index.md lines 52–57] — fields listed here are identical, confirming internal consistency between index.md and start.md; [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — name field confirmed; other fields partially corroborated (start date confirmed; National ID number and end date not confirmed — see Claims 6 and 7)
- **Status:** verified (internal consistency only); the underlying claim about what the form requires remains partially unverifiable
- **Certainty:** 80% (internal consistency); 45% (against BPS external source — see Claim 6)
- **Note:** Unlike the sibling business page (post-office-redirection-business/start.md line 21), `start.md` for the individual page does NOT contain any copy-paste artefact fields — the two files are internally consistent with each other.

---

## Additional findings (not on the page but should be)

**1. Missing fee disclosure.** The BPS charges BDS $13.00 for domestic/individual change-of-address applications. This fee is published at bps.gov.bb/change-of-address/ and confirmed by multiple search results. Neither `index.md` nor `start.md` discloses this fee anywhere. The paper form section (index.md lines 42–46) does not mention payment; the in-person visit section (lines 60–63) does not mention payment. By contrast, the sibling business page correctly states "$30 BBD" in two places. Citizens who arrive at the Post Office without BDS $13 will be turned away. Recommend adding: "You will need to pay BDS $13.00 by credit or debit card, or in cash, at the Post Office when you go to sign the form."

**2. Back-dating restriction.** The BPS explicitly states: "Forms cannot be back dated for this service. The date written on the form must be the day of submission (once the customer has already moved) OR a future date (if the customer is in the process of moving or hasn't moved as yet)." This is an important practical restriction missing from the page. A household that has already moved and tries to set a past start date will be refused. This should be added to the "After you have submitted the form" or "After the Post Office has processed your request" section.

**3. BPS contact details absent.** The page contains no BPS contact details for follow-up queries. The General Post Office is: Cheapside, St. Michael, BB11000. Phone: (246) 535-3900 (PBX); Customer Services: (246) 535-3956. Email: customerservice@bps.bb. Opening hours: Monday–Friday 7:30am–5:00pm (GPO); branches: Monday 8:00am–3:00pm, Tuesday–Friday 8:00am–3:15pm. Source: [bps.gov.bb — Contact Us](https://bps.gov.bb/contact-us/).

**4. gov.bb Post Office page shows stale email.** The gov.bb/Departments/post-office page lists `barbadospost@caribsurf.com` as the BPS email address and `Mr. Nigel Cobham` as Acting Postmaster General. The BPS website itself (bps.gov.bb/contact-us/) publishes `customerservice@bps.bb` and `pmg@bps.bb`. As of November 2025, Joann Busby serves as Postmaster General (per search results). The gov.bb page appears stale on both counts. This is not an error on the alpha.gov.bb page, but noted for completeness.

---

## Sources cited

- [Barbados Postal Service — Change Of Address (bps.gov.bb)](https://bps.gov.bb/change-of-address/)
- [Barbados Postal Service — Home (bps.gov.bb)](https://bps.gov.bb/)
- [Barbados Postal Service — About Us](https://bps.gov.bb/about-us/)
- [Barbados Postal Service — Contact Us](https://bps.gov.bb/contact-us/)
- [Barbados Postal Service — General Client page 2](https://bps.gov.bb/category/general-client/page/2/)
- [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- [REDIRECTION NOTICE PDF (gov.bb)](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF; URL confirmed live; content not machine-readable
- [EZPay+ service list (ezpay.gov.bb)](https://ezpay.gov.bb/common_service)
- [GIS — Change In Price For Post Office Fee](https://gisbarbados.gov.bb/blog/change-in-price-for-post-office-fee/) — HTTP 403 on direct fetch; confirmed via search index as announcing Advice of Arrival Fee (not redirection fee)
- [GIS — Increase In Rates For Postal Services](https://gisbarbados.gov.bb/blog/increase-in-rates-for-postal-services/) — HTTP 403 on direct fetch; confirmed via search as announcing general postal rate increase effective May 18
- [GIS — Convenient Way To Change Address](https://gisbarbados.gov.bb/blog/convenient-way-to-change-address-2/) — HTTP 403 on direct fetch; URL confirmed via search index
- [Post Office Act, CAP 27A — Barbados Law Courts](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PostOfficeCAP027A.pdf) — governing statute; consulted to check for redirection provisions (PDF binary, not machine-readable)
- [Post Office (Delivery) Regulations, 2019 — Barbados Parliament](https://www.barbadosparliament.com/uploads/sittings/attachments/8a48d5d4be55f33b2fd19cf556aff023.pdf) — subsidiary legislation; consulted to check for redirection provisions (PDF binary, not machine-readable)
