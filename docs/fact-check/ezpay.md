# Fact-check: EZPay

- **Live page:** <https://alpha.gov.bb/money-financial-support/ezpay>
- **Source file:** `src/content/ezpay.md`
- **Last checked:** 2026-05-29
- **Summary:** 16 claims reviewed — 13 verified, 2 discrepant, 1 unverifiable. Average certainty: **84%**.

---

## Headline issues for triage

1. **Intro copy error: "Visa Debit Cards" omits Mastercard (line 11) — unfixed since prior pass.** The intro paragraph lists "Visa Debit Cards" while the body of the same page (line 25) correctly says "Visa or Mastercard Debit Cards". bra.gov.bb independently confirms "VISA or Mastercard debit or credit cards". A citizen with only a Mastercard Debit card reading only the intro could incorrectly conclude EZpay does not accept their card. This was flagged on 2026-05-28 and remains unchanged.

2. **Intro copy error: "Barbados Post Office" is the wrong official name (line 11) — unfixed since prior pass.** The intro uses "Barbados Post Office" while the official name is "Barbados Postal Service" (confirmed by bps.gov.bb). The body of the page (line 31) correctly uses "Barbados Postal Service". gov.bb's own intro paragraph also uses "Barbados Post Office", but alpha.gov.bb should lead with the correct name. Flagged 2026-05-28, still unchanged.

3. **Frontmatter `section` field mismatch.** `src/content/ezpay.md` line 6 reads `section: "Work and Employment"` but the page lives under the `money-financial-support` category in content-directory.ts (title: "Money and financial support"). If the `section` field drives breadcrumbs or navigation, citizens will see the wrong category label.

4. **Portal carries "EZ123" branding, not "EZpay+".** Every page under ezpay.gov.bb (login, homepage) displays the title "EZ123" rather than "EZpay+". No formal rebrand announcement was found on gisbarbados.gov.bb or gov.bb. The GovBB team should confirm whether a rebrand is in progress. If so, all "EZpay+" references on alpha.gov.bb would need updating.

---

## Claims

### Claim 1 — Intro: payment options list including "Visa Debit Cards" and "Barbados Post Office" (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">citizens can pay for various government services using multiple payment options such as Credit Cards, Visa Debit Cards, Direct Debit, Payce Digital and the Barbados Post Office.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">citizens can pay for various government services using multiple payment options such as Credit Cards, Visa or Mastercard Debit Cards, Direct Debit, Payce Digital and the Barbados Postal Service.</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [gov.bb — EZpay+ (canonical)](https://www.gov.bb/ezpay) — intro paragraph reads "Credit Cards, Visa Debit Cards, Direct Debit, Payce Digital and the Barbados Post Office" (same upstream error); body section reads "Visa or Mastercard Debit Card"; [bps.gov.bb — Barbados Postal Service homepage](https://bps.gov.bb/) — official name is "Barbados Postal Service" throughout; [bra.gov.bb — Land Tax payments](https://bra.gov.bb/Popular-Topics/Property/How-can-I-make-Land-Tax-payments/Overview) — independently refers to EZpay+ accepting "VISA or Mastercard debit or credit cards"
- **Status:** discrepant — two sub-issues:
  - **"Visa Debit Cards"**: Mastercard Debit is omitted from the intro. The same page (line 25) and bra.gov.bb both confirm "Visa or Mastercard Debit Cards" is the correct enumeration.
  - **"Barbados Post Office"**: the official name is "Barbados Postal Service" per bps.gov.bb. The body of the same page (line 31) uses the correct name.
- **Certainty:** 85%
- **Confidence it's wrong:** 92% (Mastercard omission — confirmed by the same page's body and bra.gov.bb); 95% (wrong postal service name — confirmed by bps.gov.bb)
- **Citizen impact:** LOW — both errors are in introductory copy. The body of the page (lines 25, 31) correctly states both Mastercard Debit and Barbados Postal Service. A citizen reading only the intro might hesitate, but the body resolves it.
- **Suggested fix:** Replace line 11 intro with: "…using multiple payment options such as Credit Cards, Visa or Mastercard Debit Cards, Direct Debit, Payce Digital and the Barbados Postal Service."

---

### Claim 2 — "Payments can be made 24/7 at your convenience." (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Payments can be made 24/7 at your convenience.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Payments can be made 24/7 at your convenience.</pre>
</div>

- **Type:** descriptive
- **Sources:** [gov.bb — EZpay+ (canonical)](https://www.gov.bb/ezpay) — same wording confirmed verbatim; [gov.bb — EZpay+ (Citizens URL)](https://www.gov.bb/Citizens/ezpay) — also confirmed
- **Status:** verified
- **Certainty:** 90%

---

### Claim 3 — "An account on the Barbados Payment Portal - www.ezpay.gov.bb" (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">An account on the Barbados Payment Portal - www.ezpay.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">An account on the Barbados Payment Portal - www.ezpay.gov.bb</pre>
</div>

- **Type:** URL / process step
- **Sources:** [ezpay.gov.bb — portal](https://www.ezpay.gov.bb) — URL is live and resolves to the Government of Barbados payment portal (currently displaying "EZ123" branding, page title "EZ123 | LOGIN"); [gov.bb — EZpay+](https://www.gov.bb/ezpay) — confirms "www.ezpay.gov.bb" as the registration URL
- **Status:** verified — URL is live and functional.
- **Certainty:** 90%
- **Note:** The portal at ezpay.gov.bb currently displays "EZ123" branding rather than "EZpay+". This is a portal-side branding discrepancy; the URL itself is correct.

---

### Claim 4 — "For Direct Debit — A bank account at any of the commercial banks in Barbados." (line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For Direct Debit - A bank account at any of the commercial banks in Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">For Direct Debit - A bank account at any of the commercial banks in Barbados.</pre>
</div>

- **Type:** eligibility
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — confirmed verbatim; [bra.gov.bb — Land Tax payments](https://bra.gov.bb/Popular-Topics/Property/How-can-I-make-Land-Tax-payments/Overview) — corroborates "direct debit transaction account" at commercial banks
- **Status:** verified
- **Certainty:** 90%

---

### Claim 5 — "It is recommended that you register for online banking … to speed up the process of the Bank Account Number validation." (line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It is recommended that you register for online banking if provided. This is to speed up the process of the Bank Account Number validation.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">It is recommended that you register for online banking if provided. This is to speed up the process of the Bank Account Number validation.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — same recommendation confirmed verbatim
- **Status:** verified
- **Certainty:** 85%

---

### Claim 6 — "A valid billing account at the particular government agency … e.g. the NIS Department, if applicable." (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A valid billing account at the particular government agency to which payment is being made e.g. the NIS Department, if applicable.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A valid billing account at the particular government agency to which payment is being made e.g. the NIS Department, if applicable.</pre>
</div>

- **Type:** eligibility / agency name
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — confirmed verbatim
- **Status:** verified
- **Certainty:** 85%

---

### Claim 7 — "Credit Card … The transaction is processed immediately." (line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can use your Credit Card to make payment by choosing the Credit Card option and completing the online payment process. The transaction is processed immediately.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can use your Credit Card to make payment by choosing the Credit Card option and completing the online payment process. The transaction is processed immediately.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — exact wording confirmed
- **Status:** verified
- **Certainty:** 85%

---

### Claim 8 — "Visa or Mastercard Debit Card … processed immediately." (line 25)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can use your Visa or Mastercard Debit Card to make payment by following the same process as to make payment via Credit Card. The transaction will be processed immediately.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can use your Visa or Mastercard Debit Card to make payment by following the same process as to make payment via Credit Card. The transaction will be processed immediately.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — confirmed verbatim; [bra.gov.bb — Land Tax payments](https://bra.gov.bb/Popular-Topics/Property/How-can-I-make-Land-Tax-payments/Overview) — corroborates "VISA or Mastercard debit or credit cards" on EZpay+
- **Status:** verified
- **Certainty:** 90%

---

### Claim 9 — "Direct Debit — bank account validation takes two-three (2-3) working days." (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can proceed to add your Bank Account for validation, which will take a period of two-three (2-3) working days.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can proceed to add your Bank Account for validation, which will take a period of two-three (2-3) working days.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — exact wording confirmed ("which will take a period of two-three (2-3) working days")
- **Status:** verified
- **Certainty:** 85%

---

### Claim 10 — "Direct Debit transactions are processed within five (5) business days by your bank." (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Direct Debit transactions are processed within five (5) business days by your bank.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Direct Debit transactions are processed within five (5) business days by your bank.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — exact wording confirmed verbatim
- **Status:** verified
- **Certainty:** 85%
- **Citizen impact:** MEDIUM — a citizen paying a deadline-sensitive bill (e.g. land tax) via Direct Debit needs to know payment takes up to 5 business days to clear before the department renders the service.

---

### Claim 11 — "payment will have to be cleared by your bank first before the department renders the service." (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Please note that your payment will have to be cleared by your bank first before the department renders the service.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Please note that your payment will have to be cleared by your bank first before the department renders the service.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — confirmed verbatim
- **Status:** verified
- **Certainty:** 85%

---

### Claim 12 — "Payce Digital — use Payce mobile app to scan and make payments on the portal." (line 29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can use your Payce mobile app to scan and make payments on the portal.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can use your Payce mobile app to scan and make payments on the portal.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — Payce Digital listed as a payment option; [IDB Invest — Payce Digital Senior Loan (Sep 2025)](https://idbinvest.org/en/news-media/idb-invest-and-payce-digital-join-forces-strengthen-access-financial-services-barbados) — confirms Payce Digital is an active, operating service in Barbados as of September 2025; [Barbados Today — EZPAY on Payce Digital (Sep 2021)](https://barbadostoday.bb/2021/09/14/ezpay-now-available-on-payce-digital-mobile-app/) — confirms the EZpay/Payce Digital integration
- **Status:** verified
- **Certainty:** 80%

---

### Claim 13 — "Barbados Postal Service — print Payment Note, take to Post Office, Post Office must SCAN the Barcode." (line 31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can choose to pay by CASH by choosing the Barbados Postal Service option. On completion of the payment process, print the Payment Note and take it to the Post Office to pay by cash. The Post Office must SCAN the Barcode on your Payment Note for EZpay+ to register your payment.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">You can choose to pay by CASH by choosing the Barbados Postal Service option. On completion of the payment process, print the Payment Note and take it to the Post Office to pay by cash. The Post Office must SCAN the Barcode on your Payment Note for EZpay+ to register your payment.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — same process described verbatim in the body; [bps.gov.bb — Barbados Postal Service](https://bps.gov.bb/) — confirms official name is "Barbados Postal Service" (so "Barbados Postal Service" in this line is correct)
- **Status:** verified — the body of the page correctly uses "Barbados Postal Service" (the naming error is only in the intro at line 11, addressed in Claim 1)
- **Certainty:** 85%

---

### Claim 14 — "the date that the payment is initiated will be used when there is a need to calculate whether a discount, penalty or interest is to be applied." (line 35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">After logging on the portal the date that the payment is initiated will be used when there is a need to calculate whether a discount, penalty or interest is to be applied.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">After logging on the portal the date that the payment is initiated will be used when there is a need to calculate whether a discount, penalty or interest is to be applied.</pre>
</div>

- **Type:** process step
- **Sources:** [gov.bb — EZpay+](https://www.gov.bb/ezpay) — exact wording confirmed verbatim
- **Status:** verified
- **Certainty:** 85%
- **Citizen impact:** MEDIUM — a citizen paying close to a penalty or discount deadline needs to understand it is the initiation date that counts, not the clearing date. Particularly relevant for Direct Debit users, since payment takes up to 5 business days to clear.

---

### Claim 15 — Login URL: https://www.ezpay.gov.bb/login.php (line 37)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">LOG IN TO EZpay+ — https://www.ezpay.gov.bb/login.php</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Verified functional — canonical form unclear</div>
<pre class="claim-block-content">https://www.ezpay.gov.bb/login.php — resolves and returns the login page (title: "EZ123 | LOGIN").
The .php extension is functional and matches the URL cited by gov.bb's own EZpay+ page.
The portal branding shows "EZ123" throughout, not "EZpay+".</pre>
</div>

- **Type:** URL / link CTA
- **Sources:** [ezpay.gov.bb/login.php](https://www.ezpay.gov.bb/login.php) — confirmed live and returns login form (page title: "EZ123 | LOGIN", footer: "Copyright 2023 Government of Barbados. All Rights Reserved"); [gov.bb — EZpay+](https://www.gov.bb/ezpay) — gov.bb also cites `https://www.ezpay.gov.bb/login.php` as the login URL
- **Status:** unverifiable (canonical form) — the `/login.php` URL is functional and matches the upstream gov.bb source citation, so it is not wrong. Whether a redirect path exists cannot be confirmed from a static fetch.
- **Certainty:** 80% — URL is functional and matches gov.bb's own citation; canonical form question is a minor housekeeping issue
- **Open question:** Confirm with the Data Processing Department whether `/login.php` is the canonical path or whether a cleaner URL (e.g. `/login`) is preferred. If `/login` is canonical, update the link.

---

### Claim 16 — Frontmatter section field: "Work and Employment" (line 6)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">section: "Work and Employment"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">section: "Money and financial support"
(or be removed if the field is unused)</pre>
</div>

- **Type:** descriptive / process step (frontmatter that affects citizens)
- **Sources:** [src/data/content-directory.ts line 229–230](../../../src/data/content-directory.ts) — category slug is `money-financial-support`, title is "Money and financial support"; `src/content/ezpay.md` line 6 — reads `section: "Work and Employment"`
- **Status:** discrepant — the frontmatter `section` value does not match the category the page is filed under in content-directory.ts.
- **Certainty:** 90%
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW to MEDIUM — if the `section` field is used to drive breadcrumbs, navigation labels, or search facets, citizens will see "Work and Employment" as the category for a financial payments page.

---

## Additional findings (not on the page but should be)

- **"EZ123" portal branding.** Every page under ezpay.gov.bb — including `/login.php` and the homepage — displays "EZ123" branding in the page title and interface. The public-facing name used on gov.bb and alpha.gov.bb remains "EZpay+". No formal rebrand announcement was found on gisbarbados.gov.bb or gov.bb (search conducted 2026-05-29). The GovBB team should confirm whether a rebrand is underway and, if so, when alpha.gov.bb should be updated.

- **bps.gov.bb does not mention EZpay.** The Barbados Postal Service website (bps.gov.bb) lists "Money Orders" and "Cashing Government Cheques" under financial services — no reference to EZpay or the barcode-scan cash payment process. Citizens visiting bps.gov.bb to confirm EZpay cash payments are accepted at post offices will find no corroboration. GovBB may wish to flag this to the postal service for inclusion in their service listing.

- **Source URL is live.** The `source_url` in `content-directory.ts` for this page (`https://www.gov.bb/Citizens/ezpay`) resolves successfully and contains matching content. Status: confirmed live.

- **No mentions of EFT.** A search of all EZpay-related gov.bb pages, bra.gov.bb, and GIS found no mention of "Electronic Funds Transfer" or "EFT" as a distinct payment option. The EZpay+ Terms and Conditions describe the system as using "the Barbados Automated Clearing House" (ACH) for direct debit. No EFT-related claim appears on the alpha page, so no correction is required.

---

## Sources cited

- [gov.bb — EZpay+ (canonical URL)](https://www.gov.bb/ezpay)
- [gov.bb — EZpay+ (Citizens URL)](https://www.gov.bb/Citizens/ezpay)
- [ezpay.gov.bb — portal homepage](https://www.ezpay.gov.bb)
- [ezpay.gov.bb — login page (/login.php)](https://www.ezpay.gov.bb/login.php)
- [bps.gov.bb — Barbados Postal Service homepage](https://bps.gov.bb/)
- [bra.gov.bb — Where can I make Land Tax Payments?](https://bra.gov.bb/Popular-Topics/Property/How-can-I-make-Land-Tax-payments/Overview)
- [IDB Invest — Payce Digital Senior Loan (Sep 2025)](https://idbinvest.org/en/news-media/idb-invest-and-payce-digital-join-forces-strengthen-access-financial-services-barbados)
- [Barbados Today — EZPAY on Payce Digital Mobile App (Sep 2021)](https://barbadostoday.bb/2021/09/14/ezpay-now-available-on-payce-digital-mobile-app/)
- [alpha.gov.bb — EZPay live page](https://alpha.gov.bb/money-financial-support/ezpay)
