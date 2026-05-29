# Fact-check: Redirect my business mail

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business>
- **Source files:** `src/content/post-office-redirection-business/index.md`, `src/content/post-office-redirection-business/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 5 verified, 3 discrepant, 7 unverifiable. Average certainty: **60%**.

---

## Headline issues for triage

1. **Agency name "Barbados Post Office" in frontmatter is wrong.** The `description` field in `index.md` (line 3) reads "Tell the Barbados Post Office to redirect your business mail…". The canonical agency name confirmed by the agency's own website (bps.gov.bb) is "Barbados Postal Service". This error propagates into search engine snippets and social previews. Body copy uses the correct name. (Same class of error as F-019 on EZPay.)

2. **start.md contains a copy-paste error from the individual redirection form.** Line 21 of `start.md` reads "name(s) of every other person who also wants to redirect their mail". This is lifted verbatim from the personal/individual redirection form and makes no sense in a business context. A business does not have "other persons who want to redirect their mail". This field is not listed in `index.md`'s "What you will need to share" section (lines 44–51) either, creating an internal inconsistency. Confirmed still live on 2026-05-29.

3. **Six-month duration limit is unverifiable from authoritative sources.** Both `index.md` (lines 15 and 67) assert "a redirection notice will last for 6 months". The Barbados Postal Service's own change-of-address page (`bps.gov.bb/change-of-address/`) states the fee and form requirements but does not specify any duration. No BPS or GIS source checked confirms or contradicts this figure.

4. **Certificate of Incorporation and National ID requirements have no authoritative basis.** The page states (index.md lines 57–59) that the applicant must present a Certificate of Incorporation with official stamp and verify identity with a National ID card at the Post Office. The BPS's own published guidance says only that the company name (in capitals) and company stamp (with signature) are required — no mention of Certificate of Incorporation or National ID card for business customers. These requirements are plausible but need BPS confirmation.

5. **Business registration number not confirmed by BPS.** The page lists "the business registration number" as a required form field (index.md line 47). The BPS change-of-address page mentions only the company name and company stamp — no registration number. This is unverifiable from the public web.

---

## Claims

### Claim 1 — Agency name in frontmatter description (index.md line 3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Tell the Barbados Post Office to redirect your business mail to a new address when your business relocates.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Tell the Barbados Postal Service to redirect your business mail to a new address when your business relocates.</pre>
</div>

- **Type:** agency name
- **Sources:** [Barbados Postal Service — Home (bps.gov.bb)](https://bps.gov.bb/) — logo and all headings read "Barbados Postal Service"; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — lists the organisation as "Barbados Postal Service"
- **Status:** discrepant
- **Certainty:** 95%
- **Confidence it's wrong:** 95%
- **Citizen impact:** LOW — frontmatter description propagates into search snippets and social previews; body copy is correct

---

### Claim 2 — Redirection fee ($30 BBD) (index.md lines 40–41)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You must pay $30 BBD online as part of the process so you will need a credit or debit card
[...]
You can pay the $30 BBD by credit or debit card, or in cash, at the branch.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You must pay $30 BBD online as part of the process so you will need a credit or debit card
[...]
You can pay the $30 BBD by credit or debit card, or in cash, at the branch.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Postal Service — Change Of Address (bps.gov.bb)](https://bps.gov.bb/change-of-address/) — "BDS$30.00 for businesses"
- **Status:** verified
- **Certainty:** 95%
- **Citizen impact:** HIGH — fee amount directly affects what citizens need to bring

---

### Claim 3 — Redirection notice duration (index.md lines 15 and 67)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A redirection notice will last for 6 months.
[...]
Your redirection notice will last for a maximum of 6 months. After the notice has expired, all mail will be delivered to the address it has on it.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — awaiting agency confirmation</div>
<pre class="claim-block-content">The Barbados Postal Service change-of-address page (bps.gov.bb/change-of-address/) states the
fee and form requirements but does not specify any duration or maximum period for the redirection
service. Neither any BPS nor any GIS source checked on 2026-05-29 confirms or contradicts the
6-month figure. The PDF form URL is live (binary content confirmed) but is not machine-readable.</pre>
</div>

- **Type:** hours (service duration / expiry)
- **Sources:** [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/) — checked 2026-05-29, no duration stated; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no duration stated; [REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF, URL confirmed live, content not machine-readable
- **Status:** unverifiable
- **Certainty:** 35%
- **Citizen impact:** MEDIUM — a business acting on a stated 6-month limit will plan accordingly; if the actual period differs, mail will be mis-delivered
- **Open question:** What is the maximum permitted duration of a business mail redirection at the Barbados Postal Service — is it 6 months? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 4 — Download form URL (index.md line 37)

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
- **Sources:** [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — URL confirmed live (200 OK, binary PDF 116.9 KB downloaded on 2026-05-29); [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — references a downloadable "Redirection Notice" form consistent with this URL
- **Status:** verified
- **Certainty:** 90%
- **Note:** The PDF itself is binary and not machine-readable via WebFetch. The URL resolves and is referenced by bps.gov.bb, but form content (fields, fee schedule, duration options) could not be independently audited. A human reviewer should open the PDF to confirm the form matches the page's stated requirements.

---

### Claim 5 — Commented-out online form / EZPay reference (index.md lines 30–31; start.md line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><!-- You can complete the redirection form online. You must pay $30 BBD online as part of the
process so you will need a credit or debit card, and you will need to have (or create) an
EZPay+ account. --></pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — partially corroborated, feature not yet live</div>
<pre class="claim-block-content">EZPay+ is a real Government of Barbados payment platform (ezpay.gov.bb). However, no public
source confirms that the Barbados Postal Service's redirection form is available as an online
application through EZPay+. The BPS change-of-address page describes only in-person submission.
The content is in an HTML comment so citizens do not see it. The comment suggests this feature
is planned but not yet live.</pre>
</div>

- **Type:** process step / URL
- **Sources:** [EZPay+ — ezpay.gov.bb](https://ezpay.gov.bb/login); [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no online form mentioned
- **Status:** unverifiable (content is commented out — presumably not yet live)
- **Certainty:** 30%
- **Citizen impact:** LOW — citizens do not see this content. Flag for the team: the online form / EZPay integration should only be uncommented once the service is confirmed live.
- **Open question:** Has the BPS / GovBB online redirection form been launched? If so, what is the direct URL?

---

### Claim 6 — Form fields: National Identification number of applicant (index.md line 46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the full name and National Identification number of the person applying on behalf of the business</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not contradicted, not confirmed</div>
<pre class="claim-block-content">The BPS change-of-address page (bps.gov.bb/change-of-address/) states that for businesses, the
applicant section requires "the name of the business written in capitals along with the company
stamp (which must have a signature)." It does not mention a National Identification number for
the business applicant. The individual redirection form requires NID numbers, so this requirement
may apply to the business form too — but it cannot be confirmed from the public web.</pre>
</div>

- **Type:** document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — company stamp + business name in capitals; no mention of NID number for business form; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Does the business redirection form require the National Identification number of the individual applicant? Confirm with BPS: customerservice@bps.bb or (246) 535-3956.

---

### Claim 7 — Form field: business registration number (index.md line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the business registration number</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not in any BPS published source</div>
<pre class="claim-block-content">The BPS change-of-address page makes no mention of a business registration number as a required
form field. Only the company name (in capitals) and company stamp are mentioned. The PDF form
could not be parsed. A business registration number is plausible as a means of verifying
legitimacy, but cannot be confirmed or denied from the public web.</pre>
</div>

- **Type:** document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — company stamp + name in capitals; no mention of registration number; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** Does the BPS redirection form include a "business registration number" field? Confirm with BPS.

---

### Claim 8 — In-person signing, National ID card, and Certificate of Incorporation (index.md lines 55–59)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The person who is applying on behalf of the business must visit any Post Office, in person, to:

1. Sign the form.
2. Verify your identity with your National ID card.
3. Present the Certificate of Incorporation with the official stamp.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verifiable — in-person visit confirmed; documents not confirmed</div>
<pre class="claim-block-content">The BPS change-of-address page confirms in-person submission and that the form must be signed
("primary applicant ... signed &amp; dated"). However, the BPS does not publish any requirement to
present a National ID card or Certificate of Incorporation at the counter for business customers.
The company stamp (with signature) is the only published counter requirement. The Certificate of
Incorporation requirement is unique to this page and has no published basis.</pre>
</div>

- **Type:** process step / document requirement
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — confirms in-person submission and signing; no mention of National ID card or Certificate of Incorporation for businesses; [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary, unreadable
- **Status:** unverifiable
- **Certainty:** 40%
- **Citizen impact:** HIGH — a business representative who arrives without their Certificate of Incorporation or National ID will be turned away if these are genuinely required; conversely, if not required, the page creates unnecessary friction
- **Open question:** Does the BPS counter-service require (a) a National ID card and/or (b) a Certificate of Incorporation with official stamp from the person submitting a business redirection? Confirm with BPS: (246) 535-3956 or customerservice@bps.bb.

---

### Claim 9 — "Any Post Office" branch can process the application (index.md lines 38, 55)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Collect a paper form from any Post Office.
[...]
The person who is applying on behalf of the business must visit any Post Office, in person</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — BPS guidance specifies General Post Office only</div>
<pre class="claim-block-content">The BPS change-of-address page references the General Post Office, Cheapside, Bridgetown,
Monday–Friday 8:00 AM–4:00 PM as the location for this service. It is not confirmed whether
branch offices can also accept and process redirection forms.</pre>
</div>

- **Type:** process step / address
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — references General Post Office, Cheapside only; [bps.gov.bb — About Us](https://bps.gov.bb/about-us/) — 19 postal counters across Barbados
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Can business redirection forms be submitted at any BPS branch office, or only at the General Post Office in Cheapside, Bridgetown?

---

### Claim 10 — Barbados Postal Service is responsible for this service (index.md line 69)

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
- **Status:** verified
- **Certainty:** 99%
- **Note:** "The Post Office" is acceptable informal shorthand for "Barbados Postal Service" in this attribution line.

---

### Claim 11 — start.md copy-paste error: "other persons" field (start.md line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">name(s) of every other person who also wants to redirect their mail</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">[This field should be removed. It is copied verbatim from the individual/personal redirection
start.md and has no equivalent in the business redirection context. The index.md "What you will
need to share" section (lines 44–51) does not list this field either.]</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no "other persons" requirement for business customers; confirmed still rendering live on 2026-05-29 at [alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/start](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/start)
- **Status:** discrepant
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a business applicant sees a field asking for "other persons who want to redirect their mail", causing confusion and potential form abandonment

---

### Claim 12 — start.md: "10 minutes" completion time (start.md line 12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It shouldn't take longer than 10 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — editorial claim, no external source</div>
<pre class="claim-block-content">No BPS or GIS source publishes a time estimate for completing the redirection form. The 10-minute
estimate cannot be confirmed or contradicted from the public web. Testable only against the live
form.</pre>
</div>

- **Type:** hours (completion time estimate)
- **Sources:** Testable against the live form at [alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/form](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/form) — no external source available; [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — no time estimate given
- **Status:** unverifiable
- **Certainty:** 30%
- **Open question:** Does the live business redirection online form take approximately 10 minutes? Test against the form when it goes live.

---

### Claim 13 — Delivery from the start date given on the form (index.md lines 65–67)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Barbados Postal Service will begin to deliver your mail to your new address from the start date you gave on the form.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with caveat)</div>
<pre class="claim-block-content">The Barbados Postal Service will begin to deliver your mail to your new address from the start date you gave on the form.</pre>
</div>

- **Type:** process step / descriptive
- **Sources:** [bps.gov.bb — Change Of Address](https://bps.gov.bb/change-of-address/) — "The date written on the form must be the day of submission (once the customer has already moved) OR a future date (if the customer is in the process of moving or hasn't moved as yet)" — consistent with delivery from the stated start date; forms cannot be backdated
- **Status:** verified
- **Certainty:** 85%
- **Note:** The BPS caveat — that forms cannot be backdated — is not mentioned on the alpha.gov.bb page. This is useful guidance worth adding.

---

### Claim 14 — Internal link: redirect personal mail (index.md line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[redirect your personal mail](/travel-id-citizenship/post-office-redirection-individual/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">[redirect your personal mail](/travel-id-citizenship/post-office-redirection-individual/)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Redirect my personal mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/) — 200 OK, page loads correctly
- **Status:** verified
- **Certainty:** 99%

---

### Claim 15 — Internal link: tell the Post Office that someone has died (index.md line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[tell the Post Office that someone has died](/travel-id-citizenship/post-office-redirection-deceased/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">[tell the Post Office that someone has died](/travel-id-citizenship/post-office-redirection-deceased/)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Tell the Post Office someone has died](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased/) — 200 OK, page loads correctly
- **Status:** verified
- **Certainty:** 99%

---

## Additional findings (not on the page but should be)

**1. Back-dating restriction.** The BPS's own guidance explicitly states: "Forms cannot be back dated for this service. The date written on the form must be the day of submission (once the customer has already moved) OR a future date." This is an important practical restriction absent from the alpha.gov.bb page. A business that has already moved and tries to set a past start date will be refused. This should be added to the "After you have submitted the form" section.

**2. Company stamp requirement.** The BPS requires that the company stamp (with signature) appear in the applicant field. This is documented at bps.gov.bb but absent from index.md's "What you will need to share" list. The page lists "National Identification number" and "business registration number" instead — neither of which appears in the BPS's own instructions. Consider whether the company stamp is a pre-fill requirement on the form or a counter-service requirement, and add it to the page.

**3. BPS contact details.** The page contains no BPS contact details for follow-up queries. The General Post Office is: Cheapside, Bridgetown, St. Michael, BB11000. Phone: (246) 535-3900 (PBX); Customer Services: (246) 535-3956. Email: customerservice@bps.bb. Opening hours: Monday–Friday 7:30am–5:00pm (GPO); branches Mon 8:00am–3:00pm, Tue–Fri 8:00am–3:15pm.

---

## Sources cited

- [Barbados Postal Service — Change Of Address (bps.gov.bb)](https://bps.gov.bb/change-of-address/)
- [Barbados Postal Service — Home (bps.gov.bb)](https://bps.gov.bb/)
- [Barbados Postal Service — About Us](https://bps.gov.bb/about-us/)
- [Barbados Postal Service — Contact Us](https://bps.gov.bb/contact-us/)
- [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- [REDIRECTION NOTICE PDF (gov.bb)](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — binary PDF; URL confirmed live (116.9 KB); content not machine-readable
- [alpha.gov.bb — Redirect my business mail (live page)](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business) — 200 OK
- [alpha.gov.bb — Start page](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/start) — 200 OK
- [alpha.gov.bb — Form page](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/form) — 200 OK (dynamic load)
- [alpha.gov.bb — Redirect my personal mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/) — 200 OK
- [alpha.gov.bb — Tell the Post Office someone has died](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased/) — 200 OK
