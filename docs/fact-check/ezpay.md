# Fact-check: EZPay

- **Live page:** <https://alpha.gov.bb/money-financial-support/ezpay>
- **Source file:** `src/content/ezpay.md`
- **Last checked:** 2026-05-27
- **Summary:** 15 claims reviewed — 14 verified, 1 discrepant, 0 unverifiable. Average certainty: **84%**.

---

## Headline issues for triage

1. **Intro line omits Mastercard Debit Cards.** Line 11 lists "Visa Debit Cards" in the intro but line 25 correctly says "Visa or Mastercard Debit Cards". The gov.bb authoritative source confirms Mastercard Debit is a valid payment method. A citizen with only a Mastercard Debit card might incorrectly believe it isn't accepted.

2. **"Barbados Post Office" is the wrong official name.** Line 11 calls the postal service "Barbados Post Office" but the official name is **Barbados Postal Service** (bps.gov.bb). Ironically, line 31 of the same page uses the correct name. Two different names for the same organisation in the same page is a trust signal. (Note: the gov.bb/Citizens/ezpay source itself uses "Barbados Post Office" in its intro text — this is an upstream inconsistency the alpha page should correct even if the source doesn't.)

3. **Portal's internal system name is "EZ123", not "EZpay+".** The portal at ezpay.gov.bb shows "EZ123 | LOGIN" as the browser page title. The gov.bb public page still calls the service "EZpay+". No formal rebrand announcement was found. This is not a content discrepancy (the public name is still EZpay+) but it's worth the GovBB team checking whether a rebrand is underway — if so, the alpha page should be updated accordingly.

4. **Login URL `/login.php` may not be canonical.** Search engine indexing shows the login URL as `https://ezpay.gov.bb/login` (no `.php` extension). The `/login.php` URL does resolve and returns the login form, so it's functional — but if it's a redirect target, citizens could be unnecessarily redirected.

---

## Claims

### Claim 1 — "citizens can pay … using multiple payment options such as Credit Cards, Visa Debit Cards, Direct Debit, Payce Digital and the Barbados Post Office" (line 11)

- **Type:** descriptive / process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay); [gov.bb — EZpay+](https://www.gov.bb/ezpay); [bps.gov.bb — Barbados Postal Service](https://bps.gov.bb/)
- **Status:** **discrepant** — two sub-issues:
  - **"Visa Debit Cards"** — the gov.bb source and the body of the same page (line 25) both say "Visa or Mastercard Debit Cards". Mastercard Debit is omitted from the intro.
  - **"Barbados Post Office"** — the official name of the postal service is "Barbados Postal Service" per [bps.gov.bb](https://bps.gov.bb/). Line 31 of the same page uses the correct name; line 11 does not.
- **Certainty:** **85%**
- **Confidence it's wrong:** 90% (Mastercard omission confirmed by same page body + gov.bb source); 95% (wrong postal service name confirmed by bps.gov.bb)
- **Suggested fix:** Change intro to read "Credit Cards, Visa or Mastercard Debit Cards, Direct Debit, Payce Digital and the Barbados Postal Service."
- **Citizen impact:** LOW — both issues are in introductory copy. A citizen with only a Mastercard Debit card might hesitate, but the body text (line 25) does correctly list Mastercard.

---

### Claim 2 — "Payments can be made 24/7 at your convenience." (line 13)

- **Type:** descriptive
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — same wording on the gov.bb source page.
- **Certainty:** **85%**

---

### Claim 3 — "An account on the Barbados Payment Portal - www.ezpay.gov.bb" (line 17)

- **Type:** URL / process step
- **Source(s):** [ezpay.gov.bb](https://www.ezpay.gov.bb) — live and functional; [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — URL is live and resolves to the government payment portal.
- **Certainty:** **85%**

---

### Claim 4 — "For Direct Debit — A bank account at any of the commercial banks in Barbados." (line 18)

- **Type:** eligibility
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified**
- **Certainty:** **85%**

---

### Claim 5 — "It is recommended that you register for online banking … to speed up the process of the Bank Account Number validation." (line 18)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — same recommendation on the gov.bb source.
- **Certainty:** **85%**

---

### Claim 6 — "A valid billing account at the particular government agency … e.g. the NIS Department, if applicable." (line 19)

- **Type:** eligibility / agency name
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified**
- **Certainty:** **85%**

---

### Claim 7 — "Credit Card … The transaction is processed immediately." (line 23)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — exact wording on gov.bb source.
- **Certainty:** **85%**

---

### Claim 8 — "Visa or Mastercard Debit Card … processed immediately." (line 25)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified**
- **Certainty:** **85%**

---

### Claim 9 — "Direct Debit — bank account validation takes two-three (2-3) working days." (line 27)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — exact wording ("two-three (2-3) working days") matches gov.bb source.
- **Certainty:** **85%**

---

### Claim 10 — "Direct Debit transactions are processed within five (5) business days by your bank." (line 27)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — exact wording matches gov.bb source.
- **Certainty:** **85%**
- **Citizen impact:** MEDIUM — a citizen paying a deadline-sensitive bill (e.g. land tax) who chooses Direct Debit needs to know payment takes up to 5 business days to clear.

---

### Claim 11 — "payment will have to be cleared by your bank first before the department renders the service." (line 27)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified**
- **Certainty:** **85%**

---

### Claim 12 — "Payce Digital — use Payce mobile app to scan and make payments on the portal." (line 29)

- **Type:** process step
- **Source(s):** [IDB Invest — Payce Digital (Sep 2025)](https://idbinvest.org/en/news-media/idb-invest-and-payce-digital-join-forces-strengthen-access-financial-services-barbados); [Barbados Today — EZPAY on Payce Digital (2021)](https://barbadostoday.bb/2021/09/14/ezpay-now-available-on-payce-digital-mobile-app/)
- **Status:** **verified** — Payce Digital is an active service (IDB Invest senior loan announced September 2025 confirming operation); the EZpay+ integration is confirmed by Barbados Today and Payce's own documentation.
- **Certainty:** **80%**

---

### Claim 13 — "Barbados Postal Service — print Payment Note, take to Post Office, Post Office must SCAN the Barcode." (line 31)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — same process described on gov.bb source.
- **Certainty:** **85%**

---

### Claim 14 — "the date that the payment is initiated will be used when there is a need to calculate whether a discount, penalty or interest is to be applied." (line 35)

- **Type:** process step
- **Source(s):** [gov.bb — EZpay+](https://www.gov.bb/Citizens/ezpay)
- **Status:** **verified** — exact wording matches gov.bb source.
- **Certainty:** **85%**
- **Citizen impact:** MEDIUM — a citizen paying close to a penalty deadline needs to understand it's the initiation date that counts, not the clearing date.

---

### Claim 15 — Login URL: https://www.ezpay.gov.bb/login.php (line 37)

- **Type:** URL
- **Source(s):** Direct fetch of [https://www.ezpay.gov.bb/login.php](https://www.ezpay.gov.bb/login.php) — page loads and returns the login/registration form.
- **Status:** **verified** — URL resolves to a functional login page.
- **Certainty:** **80%**
- **Note:** Search engines index the login URL as `https://ezpay.gov.bb/login` (without `.php`). The `/login.php` variant works but may be a redirect alias. Recommend testing whether `/login.php` redirects — if so, updating to `/login` is cleaner. Also: the portal page title reads "EZ123 | LOGIN", not "EZpay+ | LOGIN". No public rebrand announcement found; the gov.bb source still uses "EZpay+".

---

## Additional findings (not on the page but should be)

- **"EZ123" portal branding.** The portal at ezpay.gov.bb shows "EZ123" as the system name in browser titles across multiple pages (login, payment page, service page). The Government of Barbados public-facing content still calls it "EZpay+". This is not a content error on the alpha page (which correctly says EZpay+), but the GovBB team should confirm whether a rebrand is in progress and, if so, when the alpha page should be updated.

- **Source URL is live.** The `source_url` in `content-directory.ts` for this page (`https://www.gov.bb/Citizens/ezpay`) resolves successfully — update `_links.md` from ⏳ to ✅.

- **Frontmatter `section` field mismatch.** `src/content/ezpay.md` line 6 reads `section: "Work and Employment"` but the page lives under `money-financial-support` in content-directory.ts. If the `section` field is used anywhere to drive navigation or breadcrumbs, this will produce wrong output.

---

## Sources cited

- [gov.bb — EZpay+ (Citizens URL)](https://www.gov.bb/Citizens/ezpay)
- [gov.bb — EZpay+ (canonical URL)](https://www.gov.bb/ezpay)
- [ezpay.gov.bb — portal homepage](https://www.ezpay.gov.bb)
- [ezpay.gov.bb — login page](https://www.ezpay.gov.bb/login.php)
- [bps.gov.bb — Barbados Postal Service homepage](https://bps.gov.bb/)
- [IDB Invest — Payce Digital Senior Loan (Sep 2025)](https://idbinvest.org/en/news-media/idb-invest-and-payce-digital-join-forces-strengthen-access-financial-services-barbados)
- [Barbados Today — EZPAY on Payce Digital Mobile App (Sep 2021)](https://barbadostoday.bb/2021/09/14/ezpay-now-available-on-payce-digital-mobile-app/)
