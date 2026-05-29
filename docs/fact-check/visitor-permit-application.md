# Fact-check: Visitor permit application

- **Live page:** <https://alpha.gov.bb/visitor-permit-application>
- **Source file:** `src/content/visitor-permit-application.md`
- **Last checked:** 2026-05-29
- **Summary:** 13 claims reviewed — 0 verified, 11 discrepant, 2 unverifiable. Average certainty: **21%**.

---

## Headline issues for triage

1. **The entire page describes a service that no longer exists.** The Barbados Revenue Authority abolished Visitor Driving Permits effective 15 October 2025, replacing the system with a Car Rental Levy (BBD $5/day, max $35 per contract) collected automatically by rental companies. Every procedural claim, every fee, every URL on the page applies to a permit that visitors can no longer apply for. The page should either be unpublished or replaced with guidance about the Car Rental Levy and the current rules for visitor driving. Citizen impact is HIGH: a visitor reading this page and attempting to apply will either try to pay for a non-existent service or — worse — assume they cannot legally drive without obtaining a permit.

2. **The live URL in the previous report was wrong (now corrected).** The page has `protected: true` in `src/data/content-directory.ts`, so it is served at `https://alpha.gov.bb/visitor-permit-application` — no category prefix. The category-prefixed URL `https://alpha.gov.bb/travel-id-citizenship/visitor-permit-application` returns HTTP 404. This report corrects the live URL. No content has changed on the page itself.

3. **The online portal URL has a TLS certificate error.** `https://portal.bra.gov.bb/VisitorPermit` (linked twice on the page) returns a TLS certificate error when fetched — the portal is unreachable. Even if the permit system were still active, citizens clicking this link would see a browser security warning and be unable to proceed.

4. **The SurePay payment URL does not resolve.** The page gives `https://bb.surepaybillsonline.com/cc` as the SurePay payment link. That URL issues a 301 redirect to `http://bb.surepaybillsonline.com/cc/` which returns no content. SurePay's own site states the correct URL for online payments is `https://app.surepayonline.com`. This link is broken regardless of whether the permit system still exists.

5. **The declared `source_url` (gov.bb/Visit-Barbados/visitorpermitapplication) still carries the same abolished-permit content.** The gov.bb source page has not been updated to reflect the October 2025 abolition. Both the alpha page and its source are simultaneously wrong on the same facts — the source_url cannot be used to justify retaining the obsolete content.

---

## Claims

### Claim 1 — Service description: visitors required to apply for a permit to drive (lines 9–11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A visitor who wishes to drive on the roads of Barbados is required to apply for a
Visitor's Registration Certificate commonly known as a Visitor's Permit. Persons
should submit their application online using our secure, simple and easy-to-use
online Application Form.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor Driving Permits were abolished effective 15 October 2025. Visitors may
now drive in Barbados on a valid home-country driving licence without obtaining
any permit. A Car Rental Levy (BBD $5 per day, maximum $35 per rental contract)
is collected by car rental companies at the point of hire.</pre>
</div>

- **Type:** process step / eligibility
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — the requirement described was abolished 15 October 2025
- **Certainty:** 10%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — visitors reading this page may attempt to apply for a permit that no longer exists, or may mistakenly believe they cannot drive legally without one.

---

### Claim 2 — Fee: $10.00 for stay under 2 months (lines 15–16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Under 2 months at a fee of $10.00</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor driving permits were abolished effective 15 October 2025.
This fee no longer applies. Rental companies now collect a Car Rental Levy of
BBD $5.00 per day (maximum $35.00 per rental contract) automatically.</pre>
</div>

- **Type:** fee
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — fee applies to a permit that no longer exists
- **Certainty:** 10%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a visitor attempting to pay this fee is trying to purchase a service that no longer exists.

---

### Claim 3 — Fee: $100.00 for stay over 2 months (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Over 2 months, at a fee of $100.00</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor driving permits were abolished effective 15 October 2025.
This fee no longer applies. Rental companies now collect a Car Rental Levy of
BBD $5.00 per day (maximum $35.00 per rental contract) automatically.</pre>
</div>

- **Type:** fee
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — fee applies to a permit that no longer exists
- **Certainty:** 10%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH

---

### Claim 4 — Portal URL: `https://portal.bra.gov.bb/VisitorPermit` (lines 11, 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://portal.bra.gov.bb/VisitorPermit</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">URL has a TLS certificate error — not reachable by visitors. Additionally, the
permit system this portal supports was abolished 15 October 2025. The link
should be removed when the page is updated or unpublished.</pre>
</div>

- **Type:** URL / link CTA
- **Sources:** [portal.bra.gov.bb/VisitorPermit](https://portal.bra.gov.bb/VisitorPermit) — returns TLS cert error on fetch (confirmed this pass: 2026-05-29); [BRA — Car Rental Levy Policy Note](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio)
- **Status:** discrepant — TLS certificate error and the underlying service is abolished
- **Certainty:** 5%
- **Confidence it's wrong:** 98%
- **Citizen impact:** HIGH — clicking this primary CTA link shows a browser security warning, then leads to a portal for a defunct service.

---

### Claim 5 — Application email: `permits@bra.gov.bb` (line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">permits@bra.gov.bb</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot fully verify from authoritative sources</div>
<pre class="claim-block-content">This email address is cited on the gov.bb source page for visitor permits and
corroborated by BLA and third-party car rental operator pages. It appears to be
the correct BRA address for what was the permit service. However, since the permit
system was abolished October 2025, whether this address remains monitored or
redirects to current BRA staff is unknown. The email should be removed when the
page is updated.</pre>
</div>

- **Type:** email
- **Sources:** [gov.bb — Online Application for Visitor's Permit](https://www.gov.bb/Visit-Barbados/visitorpermitapplication); [BLA — Visitor Permit](https://bla.gov.bb/servicedetails/VmlzaXRvciBQZXJtaXQ=)
- **Status:** unverifiable — email format and domain are plausible; whether it is still active post-abolition is unknown
- **Certainty:** 35%
- **Open question:** Is `permits@bra.gov.bb` still monitored? Has the BRA redirected enquiries to a different address following the October 2025 abolition?

---

### Claim 6 — Dedicated phone: (246) 243 1698 (line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(246) 243 1698</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot fully verify from authoritative sources</div>
<pre class="claim-block-content">This phone number appears on the gov.bb source page and is corroborated by BLA
and third-party rental operator pages. It appears to have been the correct
dedicated BRA line for visitor permit enquiries. Whether the line remains active
or has been reassigned following the October 2025 abolition is unknown from the
public web.</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Online Application for Visitor's Permit](https://www.gov.bb/Visit-Barbados/visitorpermitapplication); [BLA — Visitor Permit](https://bla.gov.bb/servicedetails/VmlzaXRvciBQZXJtaXQ=)
- **Status:** unverifiable — the number is corroborated as the former permit enquiry line but its current status post-abolition is unknown
- **Certainty:** 35%
- **Open question:** Is (246) 243 1698 still staffed? Has BRA announced a replacement contact for Car Rental Levy queries?

---

### Claim 7 — SurePay payment URL: `https://bb.surepaybillsonline.com/cc` (line 48)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://bb.surepaybillsonline.com/cc</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The URL https://bb.surepaybillsonline.com/cc issues a 301 redirect to
http://bb.surepaybillsonline.com/cc/ which returns no content. SurePay's
authoritative site states the correct online payment URL is
https://app.surepayonline.com. Additionally, this payment step is part of a
permit process abolished October 2025 and the entire section should be removed.</pre>
</div>

- **Type:** URL / fee process
- **Sources:** [SurePay Barbados — Home](https://surepaybills.com/home-barbados/) (states `https://app.surepayonline.com` as correct online payment URL); confirmed 301 redirect on fetch (this pass: 2026-05-29), redirect target returns no content; [BRA — Car Rental Levy and Discontinuation](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio)
- **Status:** discrepant — URL does not resolve correctly and the service is defunct
- **Certainty:** 5%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — clicking this link fails even if the permit system were still active.

---

### Claim 8 — Process step: unique identifier issued, payment via SurePay (lines 48–49)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Online applications are reviewed and approved then a unique identifier number is
issued to the applicant. This number is to be used to facilitate payment via
SurePay online at https://bb.surepaybillsonline.com/cc or at any SurePay
location on island.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor driving permits were abolished effective 15 October 2025. This payment
process no longer applies. Visitors may now drive on a valid home-country licence
without any application or payment step to the BRA.</pre>
</div>

- **Type:** process step
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — process step applies to an abolished service
- **Certainty:** 10%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH

---

### Claim 9 — Process step: visitor receives receipt from SurePay cashier (line 49)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The visitor is given a receipt from the SurePay cashier.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor driving permits were abolished effective 15 October 2025. This step
no longer applies. Receipts citizens receive from car rental companies should
now itemise the Car Rental Levy separately.</pre>
</div>

- **Type:** process step
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — refers to a step in a discontinued process
- **Certainty:** 10%
- **Confidence it's wrong:** 95%

---

### Claim 10 — Process step: SurePay generates payment confirmation sent to BRA hourly (lines 50–51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">SurePay generates a Payment confirmation report which is sent to the Barbados
Revenue Authority hourly.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor driving permits were abolished effective 15 October 2025. This step is
no longer applicable.</pre>
</div>

- **Type:** process step
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [gov.bb — visitorpermitapplication source page](https://www.gov.bb/Visit-Barbados/visitorpermitapplication) (repeats claim but is itself not updated)
- **Status:** discrepant — process applies to an abolished service
- **Certainty:** 10%
- **Confidence it's wrong:** 95%

---

### Claim 11 — Process step: permit issued by next business day via email (line 52)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Visitors Permit will be issued by the next business day via email.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Visitor driving permits were abolished effective 15 October 2025. No permit
is issued. Visitors drive on their valid home-country licence.</pre>
</div>

- **Type:** process step / turnaround time
- **Sources:** [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — refers to an abolished service
- **Certainty:** 10%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — a visitor awaiting a next-day email permit will never receive one.

---

### Claim 12 — PDF application form link: `https://www.gov.bb/media_files/Visitor_Permit_Application.pdf` (line 53)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://www.gov.bb/media_files/Visitor_Permit_Application.pdf</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The PDF resolves (136.2 KB binary, confirmed 2026-05-29) but pre-dates
the BRA online portal and was created circa October 2020. The permit this form
applies for was abolished October 2025. This link should be removed when the
page is updated or unpublished.</pre>
</div>

- **Type:** URL / document reference
- **Sources:** [gov.bb — Visitor_Permit_Application.pdf](https://www.gov.bb/media_files/Visitor_Permit_Application.pdf) — confirmed accessible as 136.2 KB binary PDF (2026-05-29); [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio)
- **Status:** discrepant — form is accessible but describes a service that no longer exists
- **Certainty:** 15%
- **Confidence it's wrong:** 90%
- **Citizen impact:** MEDIUM — a visitor who downloads and completes this paper form will receive no response as the service no longer operates.

---

### Claim 13 — `source_url` in `content-directory.ts`: `https://www.gov.bb/Visit-Barbados/visitorpermitapplication`

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/content-directory.ts</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/Visit-Barbados/visitorpermitapplication"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">The URL resolves (HTTP 200) and the page is live. However, the gov.bb source
page carries the same abolished visitor-permit content as of 2026-05-29 — it has
not been updated to reflect the October 2025 abolition. Both the source and the
derived alpha page are simultaneously wrong. The source_url should be updated
when a replacement BRA page (describing the Car Rental Levy regime) is published.</pre>
</div>

- **Type:** URL (declared in data file)
- **Sources:** [gov.bb — Online Application for Visitor's Permit](https://www.gov.bb/Visit-Barbados/visitorpermitapplication) — confirmed live but still carrying obsolete permit content (2026-05-29); [BRA — Car Rental Levy Guide and Resources](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- **Status:** discrepant — URL is live but the source content it points to is itself obsolete
- **Certainty:** 10% (for currency of content)
- **Confidence it's wrong (for currency):** 95%

---

## Additional findings (not on the page but should be)

- **Car Rental Levy details** — since visitor permits were abolished, the only transport-related cost for visiting drivers renting a car is the Car Rental Levy of BBD $5/day capped at BBD $35 per rental contract. BRA guidance (October 2025) requires rental companies to clearly itemise this levy on receipts and invoices. A replacement page should explain this so visitors can verify the charge appears on their rental agreement.
- **CARICOM special provision** — citizens exercising freedom of movement may have different rules for driving on a foreign licence (up to 12 months before exchange). Worth clarifying in a replacement page for completeness.
- **BLA page not yet updated** — `https://bla.gov.bb/servicedetails/VmlzaXRvciBQZXJtaXQ=` still describes visitor permits as active with the same fee structure ($10/$100) as of the previous check. This creates a second authoritative-looking page contradicting BRA's October 2025 policy note. Citizens comparing sources will receive conflicting signals.
- **Live URL correction** — the page is `protected: true` in `src/data/content-directory.ts`, so the correct live URL is `https://alpha.gov.bb/visitor-permit-application`. The category-prefixed URL `https://alpha.gov.bb/travel-id-citizenship/visitor-permit-application` returns HTTP 404, confirmed 2026-05-29.

---

## Sources cited

- [BRA — Car Rental Levy and Discontinuation of Visitor Driving Permits (Policy Note)](https://bra.gov.bb/News/Policy-Notes/Car-Rental-Levy-and-Discontinuatio)
- [BRA — Car Rental Levy Guide and Resources (Announcement, 29 October 2025)](https://bra.gov.bb/News/Announcements/Car-Rental-Levy-Guide-and-Resources)
- [gov.bb — Online Application for Visitor's Permit (source URL, not updated)](https://www.gov.bb/Visit-Barbados/visitorpermitapplication)
- [gov.bb — media_files/Visitor_Permit_Application.pdf](https://www.gov.bb/media_files/Visitor_Permit_Application.pdf) — confirmed accessible 136.2 KB, 2026-05-29
- [portal.bra.gov.bb/VisitorPermit](https://portal.bra.gov.bb/VisitorPermit) — TLS certificate error, confirmed 2026-05-29
- [bb.surepaybillsonline.com/cc](https://bb.surepaybillsonline.com/cc) — 301 redirect, target returns no content, confirmed 2026-05-29
- [SurePay Barbados — Home](https://surepaybills.com/home-barbados/)
- [BLA — Visitor Permit service page](https://bla.gov.bb/servicedetails/VmlzaXRvciBQZXJtaXQ=) — not yet updated to reflect abolishment
- [alpha.gov.bb/visitor-permit-application](https://alpha.gov.bb/visitor-permit-application) — confirmed live, 2026-05-29
- [alpha.gov.bb/travel-id-citizenship/visitor-permit-application](https://alpha.gov.bb/travel-id-citizenship/visitor-permit-application) — HTTP 404, confirmed 2026-05-29
- [Getting around Barbados fact-check](/docs/fact-check/getting-around-barbados.md) — documented same abolition in Claims 1, 3, 4
