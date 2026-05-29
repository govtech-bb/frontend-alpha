# Fact-check: Redirect my personal mail

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual>
- **Source files:** `src/content/post-office-redirection-individual/index.md`, `src/content/post-office-redirection-individual/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 5 verified, 2 discrepant, 8 unverifiable. Average certainty: **57%**.

---

## Headline issues for triage

1. **Age threshold is wrong: "18 years old" should be "16 years old".** The page (index.md lines 12–13 and 60) states that only adults aged 18 and over may complete a redirection form. The Barbados Postal Service's own change-of-address page explicitly states: *"all persons over the age of sixteen years old, residing in the same household must write their names and sign the redirection form."* The threshold is 16, not 18. This error persists on re-check (2026-05-29). A 16- or 17-year-old living independently, or a household whose primary adult is 17, could incorrectly believe they are ineligible. Tier A discrepancy.

2. **Missing fee disclosure.** The BPS charges BDS $13.00 for domestic/individual customers. Neither `index.md` nor `start.md` mentions any fee. Citizens who arrive at the Post Office without payment will be turned away. The sibling business redirection page correctly discloses its $30 BBD fee; the individual page omits the analogous $13 figure entirely. Still unresolved on re-check (2026-05-29).

3. **Online form not functional.** The "Complete online form" CTA (index.md line 39) links to `/travel-id-citizenship/post-office-redirection-individual/form`. Fetching that URL on 2026-05-29 shows only "Loading form..." — no actual form renders. Citizens clicking the primary digital CTA will encounter a non-functional page. The start.md "Start now" link points to the same route and is equally broken. Tier A finding — new on this pass.

4. **Six-month duration limit is unverifiable.** Both `index.md` (lines 23 and 70) assert the redirection lasts a maximum of 6 months. The BPS change-of-address page does not state any duration period. This claim cannot be confirmed or contradicted from the public web and needs direct BPS confirmation.

5. **"Any Post Office" claim is unverifiable.** The BPS change-of-address page references the General Post Office (Cheapside, Bridgetown, Mon–Fri 8:00am–4:00pm) as the service location. Whether all branch offices across the island can accept and process individual redirection applications is not confirmed by BPS-published information.

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
- **Sources:** [Barbados Postal Service — Home (bps.gov.bb)](https://bps.gov.bb/) — site logo, About Us and all page headings consistently use "Barbados Postal Service"; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — lists the department as "Barbados Postal Service"; body copy at lines 68 and 73 correctly uses "Barbados Postal Service"
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
- **Sources:** [Barbados Postal Service — Change Of Address (bps.gov.bb)](https://bps.gov.bb/change-of-address/) — "all persons over the age of sixteen years old, residing in the same household must write their names and sign the redirection form in the spaces provided"
- **Status:** discrepant — BPS sets the threshold at 16, not 18; confirmed still wrong on re-check 2026-05-29
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a 16- or 17-year-old living independently cannot lawfully redirect their mail if they follow the page's instruction; a household including only 16–17-year-old adults would be incorrectly told they are ineligible

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
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — checked 2026-05-29, no definition of dependants; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no eligibility details; [REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF, content not machine-readable
- **Status:** unverifiable
- **Certainty:** 35%
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
nor any other BPS or GIS source checked on 2026-05-29 confirms or contradicts the 6-month figure.
The same claim appears on both sibling pages (post-office-redirection-business/index.md and
post-office-redirection-deceased/index.md) and is equally unverified on all three.</pre>
</div>

- **Type:** hours (service duration / expiry)
- **Sources:** [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/) — checked 2026-05-29, no duration stated; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no duration stated; [REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF, content not machine-readable
- **Status:** unverifiable
- **Certainty:** 35%
- **Citizen impact:** MEDIUM — a household acting on a stated 6-month limit will plan mail-address update communications accordingly; if the actual period is different, mail will be mis-delivered after expiry
- **Open question:** What is the maximum permitted duration of an individual/household mail redirection? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 5 — Sibling page link: redirect business mail (index.md line 26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[redirect your business mail](/travel-id-citizenship/post-office-redirection-business)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">[redirect your business mail](/travel-id-citizenship/post-office-redirection-business)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Redirect business mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business) — live and loads content, verified 2026-05-29
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Sibling page link: tell the Post Office someone has died (index.md line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[tell the Post Office that someone has died](/travel-id-citizenship/post-office-redirection-deceased)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">[tell the Post Office that someone has died](/travel-id-citizenship/post-office-redirection-deceased)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Post Office redirection deceased](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased) — live and loads content, verified 2026-05-29
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Primary CTA: "Complete online form" (index.md line 39)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">&lt;a data-start-link href="/travel-id-citizenship/post-office-redirection-individual/start"&gt;Complete online form&lt;/a&gt;</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — online form not functional</div>
<pre class="claim-block-content">The /start page loads correctly and shows the pre-form intro ("It shouldn't take longer than 10 minutes")
and a "Start now" link pointing to /travel-id-citizenship/post-office-redirection-individual/form.
However, fetching /form on 2026-05-29 shows only "Loading form..." — the form component does not
render. Citizens clicking "Complete online form" → "Start now" reach a non-functional page.</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — /start page](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/start) — live; [alpha.gov.bb — /form page](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/form) — shows "Loading form..." only, 2026-05-29
- **Status:** unverifiable (form functionality); the /start URL itself is live
- **Certainty:** 30%
- **Citizen impact:** HIGH — this is the primary digital CTA; citizens who attempt the online route will be unable to complete the service
- **Open question:** Is the online form intentionally gated or is it a deployment issue? When is it expected to be fully functional?

---

### Claim 8 — Form download URL (index.md line 43)

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
- **Sources:** [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — 116.9 KB binary PDF responded on 2026-05-29, confirming the URL is live; [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — references a downloadable "Redirection Notice" form consistent with this URL
- **Status:** verified
- **Certainty:** 85%
- **Note:** The PDF is binary and its form fields could not be audited programmatically. A human reviewer should open the PDF to confirm the form matches the page's stated field requirements.

---

### Claim 9 — Form fields: name and National Identification number (index.md lines 52–54)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the name and National Identification number of every person who wants to redirect their mail</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable — name confirmed; National ID number unconfirmed</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) confirms that "all persons over
the age of sixteen years old, residing in the same household must write their names … in the
spaces provided." The name requirement is therefore verified. However, the National Identification
number as a form field is not mentioned on the BPS page. The form PDF is binary and could not be
inspected. The National ID number requirement is plausible but cannot be independently confirmed
from BPS-published guidance.</pre>
</div>

- **Type:** document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms name field for all persons 16+; no mention of National Identification number; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Does the BPS individual redirection form require a National Identification number for each household member? Confirm with BPS: customerservice@bps.bb or (246) 535-3956.

---

### Claim 10 — Form fields: old address, new address, start date, end date (index.md lines 55–57)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the old address
the new address
start date of redirection
end date of the redirection</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable — addresses and start date confirmed; end date unconfirmed</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) confirms that the form captures
addresses and that "the date written on the form must be the day of submission … OR a future date
(if the customer is in the process of moving or hasn't moved as yet)." This is consistent with a
start-date field. An end date field is implied by the stated 6-month maximum (Claim 4), but
neither the BPS page nor any other source explicitly confirms an "end date" field. The form PDF
is binary and could not be inspected.</pre>
</div>

- **Type:** document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms addresses and start/submission date logic; no explicit mention of an end-date field; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 55%
- **Open question:** Does the form include a dedicated "end date" field, or is the end date automatically set to 6 months from the start date? Confirm with BPS.

---

### Claim 11 — In-person signing and National ID card verification (index.md lines 60–63)

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

In-person visit: the BPS page confirms the form is submitted in person ("the person submitting
the form and making the payment in person"). Consistent with requiring a Post Office visit.

Signing: BPS confirms "all persons over the age of sixteen … must write their names and sign
the redirection form." Consistent with the signing step.

National ID card: not mentioned in any BPS-published guidance. The BPS says the primary applicant
must have "their name as the primary applicant affixed to the top of the form, signed &amp; dated"
but does not specify presenting a National ID card at the counter. The requirement is plausible
but unconfirmed from BPS-published sources.</pre>
</div>

- **Type:** process step / eligibility / document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms in-person signing; no National ID card requirement stated; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable (National ID claim); discrepant (age threshold — see Claim 2)
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — a household member who arrives without their National ID card will be turned away if it is genuinely required; the age threshold error compounds this
- **Open question:** Does the BPS counter require National ID card presentation for individual redirection applications? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 12 — Reference number on confirmation email for online form (index.md lines 65–66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For households who complete the online redirection form, the Post Office cashier will ask for the
reference number on the confirmation email.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — online form not yet functional</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) describes only in-person or
paper-form submission and does not mention an online form or a confirmation email / reference
number workflow. The /form route on alpha.gov.bb shows only "Loading form..." on 2026-05-29,
so neither the confirmation email flow nor the reference number can be tested. The EZPay+ service
list (ezpay.gov.bb/common_service) does not list postal redirection.</pre>
</div>

- **Type:** process step
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no online form described; [alpha.gov.bb — /form](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/form) — "Loading form..." only; [EZPay+ service list](https://ezpay.gov.bb/common_service) — postal redirection not listed
- **Status:** unverifiable
- **Certainty:** 30%
- **Open question:** Is the online individual mail redirection form live? If not, when is the launch planned? Confirm with GovBB / BPS.

---

### Claim 13 — Barbados Postal Service delivers from start date (index.md lines 68–69)

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
- **Status:** verified (note: back-dating is prohibited per BPS — see Additional findings)
- **Certainty:** 85%

---

### Claim 14 — "The Post Office is responsible for this service" (index.md line 73)

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

### Claim 15 — start.md: "10 minutes" completion time (start.md line 12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It shouldn't take longer than 10 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — form not live; no external source</div>
<pre class="claim-block-content">No BPS or GIS source publishes a time estimate for completing the individual redirection form.
The 10-minute estimate cannot be confirmed or contradicted from the public web. As the /form
route shows only "Loading form..." on 2026-05-29, this estimate cannot be tested against the
live form. The same estimate appears on the sibling business redirection start.md, also unverified.</pre>
</div>

- **Type:** hours (completion time estimate)
- **Sources:** Testable against the live online form (route `/travel-id-citizenship/post-office-redirection-individual/form` — not currently functional); [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no time estimate given
- **Status:** unverifiable
- **Certainty:** 30%
- **Open question:** Does the live online form take approximately 10 minutes? Test against the form when confirmed live.

---

## Additional findings (not on the page but should be)

**1. Missing fee disclosure.** The BPS charges BDS $13.00 for domestic/individual change-of-address applications. This fee is published at [bps.gov.bb/change-of-address/](https://bps.gov.bb/change-of-address/). Neither `index.md` nor `start.md` discloses this fee anywhere. By contrast, the sibling business page correctly states "$30 BBD" in two places. Citizens who arrive at the Post Office without BDS $13 will be turned away. Recommend adding: "You will need to pay BDS $13.00 at the Post Office when you go to sign the form."

**2. Back-dating restriction absent from page.** The BPS explicitly states: "Forms cannot be back dated for this service. The date written on the form must be the day of submission (once the customer has already moved) OR a future date (if the customer is in the process of moving or hasn't moved as yet)." A household that has already moved and tries to set a past start date will be refused. This should be added to the "After you have submitted the form" section.

**3. BPS contact details absent.** The page contains no BPS contact details for follow-up queries. General Post Office: Cheapside, St. Michael, BB11000. Phone: (246) 535-3900 (PBX); Customer Services: (246) 535-3956. Email: customerservice@bps.bb. Opening hours: Monday–Friday 7:30am–5:00pm (GPO); branches: Monday 8:00am–3:00pm, Tuesday–Friday 8:00am–3:15pm. Source: [bps.gov.bb — Contact Us](https://bps.gov.bb/contact-us/).

**4. Online form route not functional.** The `/form` route (the destination of the primary digital CTA) shows only "Loading form..." as of 2026-05-29. While the `/start` intro page renders correctly, the actual form does not load. This should be resolved before citizens are directed to the online route, or the online option should be clearly marked as "coming soon."

---

## Sources cited

- [Barbados Postal Service — Change Of Address (bps.gov.bb)](https://bps.gov.bb/change-of-address/)
- [Barbados Postal Service — Home (bps.gov.bb)](https://bps.gov.bb/)
- [Barbados Postal Service — Contact Us](https://bps.gov.bb/contact-us/)
- [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- [REDIRECTION NOTICE PDF (gov.bb)](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — 116.9 KB binary PDF; URL confirmed live 2026-05-29; content not machine-readable
- [alpha.gov.bb — Redirect personal mail (live page)](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual) — live, verified 2026-05-29
- [alpha.gov.bb — /start intro page](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/start) — live, verified 2026-05-29
- [alpha.gov.bb — /form route](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/form) — shows "Loading form..." only, 2026-05-29
- [alpha.gov.bb — Redirect business mail (sibling)](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business) — live, verified 2026-05-29
- [alpha.gov.bb — Post Office deceased (sibling)](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased) — live, verified 2026-05-29
- [EZPay+ service list (ezpay.gov.bb)](https://ezpay.gov.bb/common_service) — postal redirection not listed
