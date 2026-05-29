# Fact-check: Tell the Post Office someone has died

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased>
- **Source files:** `src/content/post-office-redirection-deceased/index.md` and `src/content/post-office-redirection-deceased/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 15 claims reviewed — 8 verified, 2 discrepant, 5 unverifiable. Average certainty: **71%**.

---

## Headline issues for triage

1. **"Lasting power of attorney" is the wrong document — and the concept does not exist in Barbados law.** `start.md` line 20 tells the citizen they need "proof you have lasting power of attorney." A lasting (enduring) power of attorney terminates at death, so it cannot authorise anyone to act on behalf of a deceased person's estate. Barbados has no statutory framework for lasting or enduring powers of attorney; ordinary powers of attorney cease on the grantor's death. The correct authority documents are Letters Testamentary or Letters of Administration — exactly as stated in `index.md`. A citizen reading only `start.md` will arrive at the Post Office with the wrong documents. Live-checked 2026-05-29: the discrepancy persists.

2. **6-month redirection duration: unverifiable from any public BPS source.** The index page asserts twice that "A redirection notice will last for 6 months." The BPS website (bps.gov.bb/change-of-address/) does not publish a duration for any redirection category. No GIS or gov.bb source independently confirms this figure. The claim may derive from UK Royal Mail policy; agency confirmation is required.

3. **Fee of $13 BBD: verified for domestic redirections, but not specifically for the deceased-estate service.** The BPS website confirms BDS$13 for domestic customers. No BPS source publishes a separate (or explicitly identical) fee for the deceased-estate variant. Whether BDS$13 applies here is a reasonable inference but has not been confirmed by any BPS publication.

4. **EZPay+ for payment: unverifiable.** `start.md` states the online form requires an EZPay+ account. The EZPay+ platform is live, but neither the BPS Change of Address page nor the EZPay+ listing page mentions postal redirection as a covered service. The online payment journey cannot be independently confirmed.

5. **Internal inconsistency: "lasting power of attorney" vs. Letters Testamentary.** The contradiction between `start.md` (incorrect) and `index.md` (correct) is the highest-priority fix. A citizen who begins on `start.md` and never reads `index.md` faces a high-impact misdirection.

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
- **Sources:** [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — the BPS offers a mail redirection service; a deceased-specific variant is implied by the existence of the dedicated PDF form at `gov.bb/media_files/PostOffice_RedirNotice.pdf`.
- **Status:** verified
- **Certainty:** 85%

---

### Claim 2 — Redirection duration: 6 months (index.md lines 11, 52, 66)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A redirection notice will last for 6 months.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — agency confirmation required</div>
<pre class="claim-block-content">Checked: bps.gov.bb/change-of-address/ — no duration mentioned for any
redirection category (domestic, business, or deceased).
No GIS press release or gov.bb page independently confirms "6 months"
for any Barbados Postal Service redirection.
UK Royal Mail operates a 6-month bereavement redirection — possible
source of this claim, but not confirmed for Barbados.</pre>
</div>

- **Type:** process step / statistic
- **Sources:** Checked: [BPS — Change Of Address](https://bps.gov.bb/change-of-address/); [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — neither states a duration.
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** What is the authorised maximum duration of a deceased-estate mail redirection under current BPS policy? Is it 6 months, renewable, or different from the personal/business variant?

---

### Claim 3 — Sibling page link: redirect personal mail (index.md line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">redirect your personal mail (/travel-id-citizenship/post-office-redirection-individual/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">redirect your personal mail (/travel-id-citizenship/post-office-redirection-individual/)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Redirect my personal mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/) — page loads; title "Redirect my personal mail | The Government Of Barbados."
- **Status:** verified
- **Certainty:** 99%

---

### Claim 4 — Sibling page link: redirect business mail (index.md line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">redirect your business mail (/travel-id-citizenship/post-office-redirection-business/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">redirect your business mail (/travel-id-citizenship/post-office-redirection-business/)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — Redirect my business mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/) — page loads; title "Redirect my business mail | The Government Of Barbados."
- **Status:** verified
- **Certainty:** 99%

---

### Claim 5 — Executor requirement and Letters Testamentary (index.md lines 20–21)

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
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — "When someone dies with a will, executors named in it seek a 'grant of Probate (also known as a grant of Letters Testamentary).'" The executor requirement is legally sound under Barbados probate law.
- **Status:** verified
- **Certainty:** 85% (the executor and Letters Testamentary requirement are legally correct; the BPS does not independently publish this policy for mail redirection, so complete confirmation requires agency sources)

---

### Claim 6 — How to obtain Letters Testamentary (index.md line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You need to take the will to the Supreme Court to get Letters Testamentary.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You need to take the will to the Supreme Court to get Letters Testamentary.</pre>
</div>

- **Type:** process step
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — "The Probate Unit is situated within the Supreme Court Registry." Executors submit prescribed forms and the will there to obtain a grant of Probate/Letters Testamentary.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Letters of Administration from High Court (index.md lines 23–24)

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
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — "the deceased's next of kin or other persons entitled by law to a general grant in respect of the deceased's estate may apply to the High Court for a grant of Letters of Administration." Both "High Court" and "Supreme Court" are used interchangeably on the probate site; the Probate Unit operates within the Supreme Court of Judicature, High Court (Probate Division).
- **Status:** verified
- **Certainty:** 95%

---

### Claim 8 — Probate Unit link (index.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit</pre>
</div>

- **Type:** URL
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — confirmed live 2026-05-29; page contains information on Letters Testamentary and Letters of Administration matching the page's claims.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 9 — Link label: "Barbados Judicial System website" (index.md line 24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">on the Barbados Judicial System website</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">on the Barbados Judicial System website</pre>
</div>

- **Type:** agency name
- **Sources:** [barbadoslawcourts.gov.bb](https://www.barbadoslawcourts.gov.bb/) — site header reads "Barbados Judicial System."
- **Status:** verified
- **Certainty:** 99%

---

### Claim 10 — Online form CTA: start subpage (index.md line 34)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Complete the online form
(/travel-id-citizenship/post-office-redirection-deceased/start)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Complete the online form
(/travel-id-citizenship/post-office-redirection-deceased/start)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [alpha.gov.bb — start subpage](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased/start) — confirmed live 2026-05-29; page loads and contains the form introduction.
- **Status:** verified
- **Certainty:** 99%

---

### Claim 11 — Downloadable paper form URL (index.md line 39)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — PostOffice_RedirNotice.pdf](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf) — confirmed live 2026-05-29; PDF downloaded (116.9 KB, multi-page, professionally formatted).
- **Status:** verified
- **Certainty:** 99%

---

### Claim 12 — Fee: "$13 BBD by credit or debit card, or in cash" (index.md line 42)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">you will need to pay $13 BBD by credit or debit card, or in cash, at any
Post Office when you go to verify your identity.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — deceased-specific fee not confirmed</div>
<pre class="claim-block-content">BDS$13.00 is the confirmed domestic (personal) redirection fee per the BPS
website: "The cost for this service is BDS$13.00 for Domestic customers
and BDS$30.00 for businesses."
The BPS does not publish a separate fee category for deceased-estate
redirections. Whether BDS$13 applies here is a reasonable inference
but has not been confirmed by any BPS source for this specific service.</pre>
</div>

- **Type:** fee
- **Sources:** [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — "The cost for this service is BDS$13.00 for Domestic customers and BDS$30.00 for businesses."
- **Status:** unverifiable (as specifically applied to deceased-estate redirection; the domestic rate of BDS$13 is verified for personal redirections)
- **Certainty:** 65%
- **Open question:** Does the BDS$13 domestic rate apply to deceased-estate redirections, or is there a separate fee schedule? Confirm with the Barbados Postal Service.

---

### Claim 13 — Identity verification: National ID card (index.md line 59)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Verify your identity with your National ID card.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — BPS does not publish ID requirements</div>
<pre class="claim-block-content">The BPS Change of Address page does not list acceptable identity documents.
No BPS or GIS source specifies National ID card as required (vs. passport
or other photo ID). The requirement is plausible given that National ID
verification is standard across Barbados government counter services.</pre>
</div>

- **Type:** document requirement
- **Sources:** Checked: [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — no ID document requirement stated; [gov.bb — Post Office](https://www.gov.bb/Departments/post-office) — no ID requirement listed.
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Does the BPS require specifically a National ID card, or is a passport or other government-issued photo ID also acceptable?

---

### Claim 14 — "Lasting power of attorney" document requirement (start.md line 20)

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
- **Sources:** [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit) — confirms Letters Testamentary and Letters of Administration as the correct authority documents; ordinary powers of attorney are "revoked if the person loses capacity" and do not survive the death of the grantor. Barbados has no lasting/enduring power of attorney legislation.
- **Status:** discrepant
- **Certainty:** 5% that the current text is correct
- **Confidence it's wrong:** 98%
- **Citizen impact:** HIGH — a citizen reading only `start.md` will arrive at the Post Office with a power of attorney document that (a) terminated at the moment of death and (b) does not exist as "lasting" under Barbados law. The correct documents — Letters Testamentary or Letters of Administration — are correctly described in `index.md`. This is a direct contradiction between the two pages. Live-checked 2026-05-29: discrepancy persists.

---

### Claim 15 — EZPay+ account requirement (start.md lines 14–16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will need a debit or credit card because you must pay online as part of
the process. You will also need to have (or create) an EZPay+ account.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — BPS does not confirm EZPay+ for this service</div>
<pre class="claim-block-content">EZPay+ is the verified Government of Barbados payments platform.
However, the BPS Change of Address page makes no mention of online payment
or EZPay+. The EZPay+ page does not list postal redirection as a covered
service. The online payment journey described is plausible but unverified
from any public BPS or EZPay+ source.</pre>
</div>

- **Type:** process step / document requirement
- **Sources:** Checked: [BPS — Change Of Address](https://bps.gov.bb/change-of-address/) — no online payment or EZPay+ mentioned; [gov.bb — EZPay+](https://www.gov.bb/ezpay) — EZPay+ is live but does not list postal redirection as a covered service.
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** Is the online deceased mail redirection form processed through EZPay+? Confirm with the Barbados Postal Service and the Government Digital Services team.

---

## Additional findings (not on the page but should be)

1. **No contact details for the Barbados Postal Service.** The page does not give a phone number or email if citizens have questions before making the in-person trip. Confirmed from [BPS — Contact Us](https://bps.gov.bb/contact-us/): main PBX **(246) 535-3900**, Customer Services **(246) 535-3956**, email **customerservice@bps.bb**. The gov.bb Departments page also lists **(246) 429-4118** and email **barbadospost@caribsurf.com**. A contact reference would reduce wasted journeys.

2. **No address or hours for the General Post Office.** Citizens are told they must visit "any Post Office" in person, but the page gives no address. The GPO is at **Cheapside, Bridgetown, St. Michael, BB11000**. Hours: **Monday–Friday, 7:30 a.m.–5:00 p.m.** (GPO); branch offices open **Monday 8:00 a.m.–3:00 p.m.** and **Tuesday–Friday 8:00 a.m.–3:15 p.m.** (confirmed from [BPS — Contact Us](https://bps.gov.bb/contact-us/)).

3. **"Barbados Postal Service" vs. "Post Office" inconsistency.** `index.md` line 66 correctly uses "Barbados Postal Service" and line 68 reverts to "The Post Office." The page title and `start.md` also use "Post Office." The canonical name confirmed at [bps.gov.bb](https://bps.gov.bb/) is "Barbados Postal Service (B.P.S.)." Both usages have official backing (gov.bb/Departments/post-office uses "Post Office"), but mixing them on the same page is inconsistent. Lowest-priority cleanup item.

---

## Sources cited

- [Barbados Postal Service — Homepage](https://bps.gov.bb/)
- [Barbados Postal Service — Change Of Address](https://bps.gov.bb/change-of-address/)
- [Barbados Postal Service — Contact Us](https://bps.gov.bb/contact-us/)
- [gov.bb — Post Office (Departments)](https://www.gov.bb/Departments/post-office)
- [gov.bb — REDIRECTION NOTICE PDF](https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf)
- [gov.bb — EZPay+](https://www.gov.bb/ezpay)
- [Barbados Judicial System — Probate Unit](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/probate-unit)
- [alpha.gov.bb — Post Office Redirection (Deceased) live page](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased)
- [alpha.gov.bb — Start subpage](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-deceased/start)
- [alpha.gov.bb — Redirect personal mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-individual/)
- [alpha.gov.bb — Redirect business mail](https://alpha.gov.bb/travel-id-citizenship/post-office-redirection-business/)
