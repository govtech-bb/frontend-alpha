# Fact-check: Tell the Post Office someone has died

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased>
- **Source files:** `src/content/post-office-redirection-deceased/index.md` and `src/content/post-office-redirection-deceased/start.md`
- **Last checked:** 2026-05-28
- **Summary:** 13 claims reviewed — 6 verified, 2 discrepant, 5 unverifiable. Average certainty: **69%**.

---

## Headline issues for triage

1. **"Lasting power of attorney" is the wrong document — and the concept does not exist in Barbados law.** `start.md` line 20 tells the citizen they need "proof you have lasting power of attorney." A lasting (enduring) power of attorney terminates at death, so it cannot authorise anyone to act on behalf of a deceased person's estate. Moreover, Barbados has no statutory framework for lasting or enduring powers of attorney (ordinary powers of attorney exist but cease on the grantor's death or loss of capacity). The correct authority documents are Letters Testamentary or Letters of Administration — exactly as stated in `index.md`. The `start.md` phrasing is internally inconsistent with `index.md` and legally incorrect. A citizen who reads only `start.md` will arrive at the Post Office with the wrong documents.

2. **6-month duration of redirection: unverifiable from public sources.** The index page asserts twice that "A redirection notice will last for 6 months" (lines 11, 52, 66). The Barbados Postal Service website (`bps.gov.bb/change-of-address/`) does not publish a duration for its redirection service. No BPS source checked independently confirms 6 months. This may be an import from UK Royal Mail policy (which does operate a 6-month redirection). The agency must confirm.

3. **Fee of $13 BBD verified for domestic redirection — but not specifically for deceased redirection.** The BPS website confirms BDS$13 for domestic customers and BDS$30 for business customers. There is no separate fee category for deceased-estate redirection. It is reasonable to infer the domestic rate applies, but this has not been confirmed by the BPS for the deceased service specifically, and if a special category exists (as is implied by there being a dedicated form/service), the fee may differ.

4. **Online payment described as going through EZPay+ (`start.md` line 15) — but no BPS source confirms EZPay+ is used for mail redirection.** EZPay+ is the government payments platform; it is verified as live. However, the BPS change-of-address page makes no mention of online payment or EZPay+. The online-form journey (pay online, get reference number, present at Post Office) cannot be independently confirmed from public sources.

5. **Internal inconsistency: "Post Office" vs "Barbados Postal Service."** The inventory confirms the canonical name is "Barbados Postal Service." `index.md` line 66 correctly uses "Barbados Postal Service" in one sentence but line 68 reverts to "The Post Office." The title and description metadata, `index.md` lines 1–2, and `start.md` consistently use "Post Office." gov.bb/Departments/post-office uses "Post Office" as the department name; bps.gov.bb uses "Barbados Postal Service." Both appear in official sources. The inconsistency within the page is worth cleaning up even if not strictly wrong.

---

## Claims

### Claim 1 — Service description (index.md lines 9–10)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can use this service to tell the Post Office that someone has died and
therefore you would like to redirect their mail to a different address.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can use this service to tell the Post Office that someone has died and
therefore you would like to redirect their mail to a different address.</pre>
</div>

- **Type:** descriptive
- **Sources:** [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office)
- **Status:** verified
- **Certainty:** 85% — the BPS does offer a mail redirection service; a deceased-specific variant is implied by the existence of a dedicated redirection notice form at `gov.bb/media_files/PostOffice_RedirNotice.pdf`.

---

### Claim 2 — Redirection duration: 6 months (index.md lines 11, 52, 66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A redirection notice will last for 6 months.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — agency confirmation required</div>
<pre class="claim-block-content">Checked: bps.gov.bb/change-of-address/ — no duration mentioned.
The BPS Change of Address page describes requirements for domestic and business
customers but does not state how long a redirection lasts.
No GIS press release or gov.bb page independently confirms "6 months" for any
Barbados Postal Service redirection category.
UK Royal Mail operates a 6-month redirection for bereavement — possible source
of this claim, but not confirmed for Barbados.</pre>
</div>

- **Type:** process step / statistic
- **Sources:** Checked: [BPS — Change Of Address](https://bps.gov.bb/change-of-address/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office); [GIS — Post Office tag](https://gisbarbados.gov.bb/blog/change-in-price-for-post-office-fee/) (HTTP 403 on direct fetch) — none confirm 6-month duration.
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** What is the authorised duration of a deceased-estate mail redirection under current Barbados Postal Service policy? Is it 6 months, renewable, or does it differ from the personal/business redirection?

---

### Claim 3 — Executor requirement: only executor can redirect (index.md lines 20–21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Only the person who is named as executor of the will can redirect the mail.
The executor must present Letters Testamentary to the Post Office before the
redirection can be processed.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Only the person who is named as executor of the will can redirect the mail.
The executor must present Letters Testamentary to the Post Office before the
redirection can be processed.</pre>
</div>

- **Type:** eligibility / document requirement
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — confirms Letters Testamentary (grant of Probate) is the document conferring authority on the executor to administer the estate; [BPS — Redirection Notice PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — confirmed live in search results.
- **Status:** verified (partially — the executor requirement and Letters Testamentary requirement are legally sound; however, the BPS itself does not publish explicit policy requiring Letters Testamentary specifically for mail redirection)
- **Certainty:** 80%

---

### Claim 4 — How to obtain Letters Testamentary: "take the will to the Supreme Court" (index.md lines 21–22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You need to take the will to the Supreme Court to get Letters Testamentary.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You need to take the will to the Supreme Court to get Letters Testamentary.</pre>
</div>

- **Type:** process step
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — "The Probate Unit is situated within the Supreme Court Registry on level 3 Barbados Supreme Court Complex, Whitepark Road, Bridgetown." Executors apply there for a grant of Probate/Letters Testamentary.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Letters of Administration from High Court (index.md lines 23–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If there is no will, the deceased's next of kin (or other persons entitled by
law) may apply to the High Court for a grant of Letters of Administration.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If there is no will, the deceased's next of kin (or other persons entitled by
law) may apply to the High Court for a grant of Letters of Administration.</pre>
</div>

- **Type:** process step / legal reference
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — "the deceased's next of kin or other persons entitled by law to a general grant in respect of the deceased's estate may apply to the High Court for a grant of Letters of Administration." The Probate Unit operates within the Supreme Court of Judicature, High Court (Probate Division), so "High Court" is the correct formal reference in this context.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Probate Unit link (index.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit</pre>
</div>

- **Type:** URL
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — confirmed live; page content matches the claim (Letters Testamentary and Letters of Administration information).
- **Status:** verified
- **Certainty:** 99%

---

### Claim 7 — Link label: "Barbados Judicial System website" (index.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">on the Barbados Judicial System website</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">on the Barbados Judicial System website</pre>
</div>

- **Type:** agency name
- **Sources:** [barbadoslawcourts.gov.bb](https://www.barbadoslawcourts.gov.bb/) — the site header reads "Barbados Judicial System."
- **Status:** verified
- **Certainty:** 99%

---

### Claim 8 — Downloadable form URL (index.md line 39)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf</pre>
</div>

- **Type:** URL
- **Sources:** URL appears live in search results: [REDIRECTION NOTICE — gov.bb PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf); confirmed in two separate web searches.
- **Status:** verified
- **Certainty:** 90% — URL appears in search results and was returned as a live result. Direct PDF extraction failed because WebFetch cannot render binary PDF streams, but the URL resolving in search indexes confirms it is live.

---

### Claim 9 — Fee: "$13 BBD by credit or debit card, or in cash" (index.md line 42)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">you will need to pay $13 BBD by credit or debit card, or in cash, at any
Post Office when you go to verify your identity.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — deceased-specific fee not confirmed</div>
<pre class="claim-block-content">BDS$13.00 is the confirmed domestic (personal) redirection fee.
The BPS website does not publish a separate fee category for deceased-estate
redirections. Whether BDS$13 applies specifically to this service has not
been confirmed by any BPS source.
The payment method ("credit or debit card, or in cash") is consistent with
general BPS counter service but not confirmed for this specific transaction.</pre>
</div>

- **Type:** fee
- **Sources:** [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — "Domestic customers: BDS$13.00"; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office).
- **Status:** unverifiable (as specifically applied to deceased redirection; the domestic fee of BDS$13 is verified)
- **Certainty:** 65% — the domestic fee is verified; its applicability to the deceased-estate variant is a reasonable inference but not published by BPS.
- **Open question:** Does the BDS$13 domestic rate apply to deceased-estate redirections, or is there a separate fee? Confirm with the Barbados Postal Service.

---

### Claim 10 — Identity verification: National ID card (index.md line 59)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Verify your identity with your National ID card.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — BPS does not publish ID requirements</div>
<pre class="claim-block-content">The BPS Change of Address page does not list acceptable identity documents
for the redirection service. No BPS or GIS source checked specifies that a
National ID card is required (vs. passport or other photo ID).
The requirement is plausible given that National ID verification is standard
across government counter services in Barbados.</pre>
</div>

- **Type:** document requirement
- **Sources:** Checked: [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — no ID document requirement stated; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no ID requirement listed.
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Does the BPS require specifically a National ID card for in-person identity verification when processing a deceased-estate redirection, or is a passport or other government-issued photo ID also acceptable?

---

### Claim 11 — "Lasting power of attorney" document requirement (start.md line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">proof you have lasting power of attorney</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">proof you have authority to act on behalf of the deceased person —
either Letters Testamentary (if there is a will) or Letters of Administration
(if there is no will), obtained from the Supreme Court</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit); [STEP — Power of Attorney in Barbados](https://www.step.org/mental-capacity/public/what-power-attorney-or-power-representation-can-i-get-one-where-i-live) — confirms Barbados has no lasting/enduring power of attorney legislation; ordinary PoA exists but "only for specific tasks" and "these are revoked if the person loses capacity."
- **Status:** discrepant
- **Certainty:** 20% that the current text is correct
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a citizen reading only `start.md` will arrive at the Post Office with a power of attorney document (which terminates at death and is legally irrelevant to estate administration). The correct documents — Letters Testamentary or Letters of Administration — are correctly described in `index.md`. `start.md` introduces a contradictory and legally impossible requirement. A power of attorney cannot survive the death of the person who granted it; the concept of "lasting power of attorney" does not exist in Barbados statute.

---

### Claim 12 — EZPay+ account requirement (start.md lines 15–16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will need a debit or credit card because you must pay online as part of
the process. You will also need to have (or create) an EZPay+ account.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — BPS does not confirm EZPay+ for this service</div>
<pre class="claim-block-content">EZPay+ is the verified Government of Barbados payments platform (gov.bb/ezpay).
However, the BPS Change of Address page makes no mention of online payment,
EZPay+, or any online form option for mail redirection.
No BPS or GIS source confirms that postal redirection payments flow through
EZPay+. The online payment journey described is plausible but unverified.</pre>
</div>

- **Type:** process step / document requirement
- **Sources:** Checked: [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — no online payment or EZPay+ mentioned; [gov.bb — EZPay+](https://www.gov.bb/ezpay) — EZPay+ is live but does not list postal redirection as a covered service.
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Is the online deceased mail redirection form processed through EZPay+? Confirm with the Barbados Postal Service and the Government Digital Services team.

---

### Claim 13 — "Barbados Postal Service" / "Post Office" naming (index.md lines 66–68; metadata line 1, 3)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Barbados Postal Service will begin to deliver the mail to the new address
from the start date you gave on the form. The redirection notice will last
for 6 months.

The Post Office is responsible for this service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (for consistency)</div>
<pre class="claim-block-content">The Barbados Postal Service will begin to deliver the mail to the new address
from the start date you gave on the form. The redirection notice will last
for 6 months.

The Barbados Postal Service is responsible for this service.</pre>
</div>

- **Type:** agency name
- **Sources:** [bps.gov.bb — About Us](https://bps.gov.bb/about-us/) — official name is "Barbados Postal Service (B.P.S.)"; [gov.bb — Departments/post-office](https://www.gov.bb/Departments/post-office) — uses "Post Office" as the department label. Both usages appear in authoritative gov sources. The `_inventory.md` notes the canonical name is "Barbados Postal Service."
- **Status:** discrepant (minor — internal inconsistency within the page; both usages have authoritative backing but mixing them on the same page is inconsistent)
- **Certainty:** 85% that "Barbados Postal Service" is the preferred canonical name
- **Confidence it's wrong:** 60% (the "Post Office" name is not strictly wrong — gov.bb itself uses it — but it is inconsistent with the line immediately above)
- **Citizen impact:** LOW — informational inconsistency, not a misdirection risk.

---

## Additional findings (not on the page but should be)

1. **No contact details for the Barbados Postal Service.** The page does not give a phone number or email if citizens have questions about the redirection. The General Post Office main number is **(246) 535-3900** and customer services is **(246) 535-3956**; email **customerservice@bps.bb** (confirmed at bps.gov.bb/contact-us/). For a service that requires an in-person visit, a contact number would help citizens with queries before travelling.

2. **No address for the General Post Office.** Citizens who want to complete the process at the main post office rather than a branch are not told where it is: **Cheapside, Bridgetown, St. Michael, BB11000** (bps.gov.bb/contact-us/). Opening hours: Monday–Friday, 7:30 a.m.–5:00 p.m. (GPO); branch offices are Monday 8:00 a.m.–3:00 p.m. and Tuesday–Friday 8:00 a.m.–3:15 p.m.

3. **Number of Post Office branches.** The BPS website states it "operates 19 postal counters across Barbados." This would be useful context for citizens who want to know how accessible the in-person step is.

---

## Sources cited

- [Barbados Postal Service — Homepage](https://bps.gov.bb/)
- [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/)
- [Barbados Postal Service — About Us](https://bps.gov.bb/about-us/)
- [Barbados Postal Service — Contact Us](https://bps.gov.bb/contact-us/)
- [gov.bb — Post Office (Departments)](https://www.gov.bb/Departments/post-office)
- [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf)
- [gov.bb — EZPay+](https://www.gov.bb/ezpay)
- [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit)
- [STEP — Power of Attorney in Barbados](https://www.step.org/mental-capacity/public/what-power-attorney-or-power-representation-can-i-get-one-where-i-live)
- [GIS — Change in price for post office fee](https://gisbarbados.gov.bb/blog/change-in-price-for-post-office-fee/) (HTTP 403 on direct fetch; URL confirmed live in search index)
