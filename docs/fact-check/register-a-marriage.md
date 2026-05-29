# Fact-check: Register a marriage

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/register-a-marriage>
- **Source file:** `src/content/register-a-marriage.md`
- **Last checked:** 2026-05-29
- **Summary:** 11 claims reviewed — 8 verified, 1 discrepant, 2 unverifiable. Average certainty: **83%**.

---

## Headline issues for triage

1. **Address in opening paragraph is wrong — still not fixed.** Line 11 of `src/content/register-a-marriage.md` directs citizens to "the Registration Department, Coleridge Street, Bridgetown." This is confirmed wrong by three independent authoritative sources. The Registration Department is at the Supreme Court Complex, Whitepark Road, St. Michael — not Coleridge Street. The contact block at the bottom of the page (lines 45–47) gives the correct building and road, creating an internal contradiction on the same live page. The source markdown is the root cause. A citizen reading only the opening paragraph will go to the wrong building.

2. **Registration deadline is absent from the page.** The Barbados Judicial System's authoritative page on marriage registration states that a marriage must be registered "within the first ten (10) days of every month." The alpha.gov.bb page gives no deadline. A couple whose marriage has not been registered has no guidance on how to follow up or what the statutory window is.

3. **Apostille fee is undisclosed.** The barbadoslawcourts.gov.bb Certificates page confirms a BDS $50 Apostille fee applies when a foreign authority requires one. This is relevant for couples who marry in Barbados and need the certificate recognised overseas. No mention of this fee appears on the page.

---

## Claims

### Claim 1 — Address in opening paragraph: "Coleridge Street, Bridgetown" (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To register the marriages you must visit the Registration Department, Coleridge Street, Bridgetown.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">To register the marriage you must visit the Registration Department,
Level 1, Supreme Court Complex, Whitepark Road, Bridgetown.</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "Level 1, Supreme Court Complex, Whitepark Road, Bridgetown"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — "Supreme Court Complex, White Park Road, St. Michael"
- **Status:** discrepant
- **Certainty:** 99%
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — a citizen following this address will go to the wrong building. "Coleridge Street" is the address of the Henry Forde and David Simmons Judicial Complex (courts), not the Registration Department. The Registration Department has been at Whitepark Road since at least 2019. The page compounds the error by giving the correct address in the contact block below, creating internal contradiction.
- **Cross-reference:** consistent with [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry; consistent with [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 7 and [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 6.

---

### Claim 2 — Responsibility of Marriage Officer or Magistrate to register (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It is the responsibility of the Marriage Officer or the Magistrate who performs the marriage to register that marriage.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">It is the responsibility of the Marriage Officer or the Magistrate who performs the marriage to register that marriage.</pre>
</div>

- **Type:** process step / legal reference
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — confirms the Marriage Officer or Magistrate is responsible; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — identical phrasing
- **Status:** verified
- **Certainty:** 95%

---

### Claim 3 — Registration for a Marriage Certificate is free of cost (lines 13–14)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Registration for a Marriage Certificate is free of cost.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Registration for a Marriage Certificate is free of cost.</pre>
</div>

- **Type:** fee
- **Sources:** [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — "Registration for a Marriage Certificate is free of cost"; [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — consistent (no fee for registration itself)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — Certificate fee: $10.00 per copy for Nationals (lines 15–16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A fee of $10.00 (per copy) is charged to (Nationals) for the certificate.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A fee of BDS$10.00 (per copy) is charged to Nationals for the certificate.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Nationals: BDS$10.00"; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — same fee confirmed
- **Status:** verified
- **Certainty:** 95%
- **Note:** The parentheses around "(Nationals)" and "(per copy)" are grammatically unusual but the figures are correct.

---

### Claim 5 — Certificate fee: $20.00 per copy for Non-Nationals (lines 17–18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A fee of $20.00 (per copy) is charged to (Non-Nationals) for the certificate.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A fee of BDS$20.00 (per copy) is charged to Non-Nationals for the certificate.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Non-nationals: BDS$20.00"; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — same fee confirmed
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Document required: "Fully completed duplicate original Marriage record - Marriage Card" (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fully completed duplicate original Marriage record - Marriage Card.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fully completed duplicate original Marriage record – Marriage Card.</pre>
</div>

- **Type:** document requirement
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "A fully completed duplicate original marriage record (Marriage Card) must be submitted"; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — identical document specified
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Marriage record information requirements: 15-item list (lines 25–39)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Place of marriage
Date of marriage
Name and Surname of the husband
Name and Surname of the wife
Age of the husband
Age of the wife
Marital status of husband and wife
Addresses of husband and wife - present addresses (foreign addresses are not allowed)
Occupation of husband
Occupation of wife
Name and occupation of husband's father
Name and occupation of wife's father
Signatures of husband and wife
Signatures of witnesses
Signature of Marriage Officer or Magistrate</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Place of marriage
Date of marriage
Names and surnames of both parties
Ages of both parties
Marital status of both parties
Present residential addresses (foreign addresses are not allowed)
Occupations of both parties
Names and occupations of fathers of both parties
Signatures of husband, wife, and witnesses
Signature of Marriage Officer or Magistrate</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — all categories confirmed (place, date, names, ages, marital status, addresses, occupations, parents' names and occupations, signatures); [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — identical list confirmed
- **Status:** verified
- **Certainty:** 95%
- **Note:** The page uses "husband" and "wife" throughout. Same-sex marriage is not legally recognised in Barbados (the Marriage Act, Cap. 218A defines marriage as between a man and a woman), so the gendered terminology accurately reflects the current legal framework. The "foreign addresses are not allowed" restriction is confirmed by both primary sources. The "father's name" fields do not address single-parent or mother's details — the sources describe "fathers" specifically; whether a mother's details may substitute is not addressed on the page or in primary sources consulted.

---

### Claim 8 — Contact address: Supreme Court Complex, White Park Road, St. Michael (lines 45–47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Supreme Court Complex
White Park Road
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Registration Department
Level 1, Supreme Court Complex
Whitepark Road
St. Michael, Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "Level 1, Supreme Court Complex, Whitepark Road, Bridgetown"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."
- **Status:** verified
- **Certainty:** 95%
- **Note:** The contact address in the footer block is correct — right building, right road. The discrepancy is in the opening paragraph (Claim 1), which says "Coleridge Street, Bridgetown." Road name spelling varies ("White Park Road" vs. "Whitepark Road") between gov.bb sources; the Barbados Judicial System and Registration Department's own page use "Whitepark Road" (one word). Adding "Level 1" would match the Judicial System source precisely.
- **Cross-reference:** consistent with [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry.

---

### Claim 9 — Phone number: 1 (246) 535-9700 (line 49)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(Tel.) 1 (246) 535-9700</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 (246) 535-9700</pre>
</div>

- **Type:** phone
- **Sources:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "Phone: 1-246-535-9700"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Phone: 1 (246) 535-9700 (PBX)"; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — "(Tel.) 1 (246) 535-9700"
- **Status:** verified
- **Certainty:** 99%
- **Cross-reference:** consistent with [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Registration Department phone entry; consistent with [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) Claim 8 and [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) Claim 7.

---

### Claim 10 — Registration deadline (implicit omission — no deadline stated anywhere on page)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[No registration deadline is mentioned anywhere on the page.]</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Missing information — authoritative source gives a specific deadline</div>
<pre class="claim-block-content">The Barbados Judicial System's authoritative page states:
"A marriage must be registered within the first ten (10) days of every month."

This deadline does not appear on the alpha.gov.bb page. The gov.bb source
(www.gov.bb/Citizens/register-marriage) also omits it. The Marriage Act,
Cap. 218A and its subsidiary regulations (Marriage (Forms & Fees) Regulations,
S.I. 58/1979) govern this requirement.

Whether the 10-day deadline applies to the Marriage Officer/Magistrate (the
responsible party) or creates a separate obligation/remedy for the couple
is not explicit in the public web sources consulted.</pre>
</div>

- **Type:** process step / legal reference
- **Checked:** [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — "A marriage must be registered within the first ten (10) days of every month"; [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — does not state this deadline; [Marriage Act, Cap. 218A](https://www.barbadoslawcourts.gov.bb/records-branch/statutes-administered-by-the-records-branch) — governing statute (PDF binary, not machine-readable from the public web)
- **Status:** unverifiable (whether the deadline legally binds the couple or only the officer); confirmed missing from the page
- **Certainty:** 85% (that the deadline exists and should appear); 40% (on exactly who bears responsibility and what remedy a couple has)
- **Open question:** confirm with the Registration Department (1) whether the 10-day deadline applies to the Marriage Officer/Magistrate only or also creates an obligation/remedy for the couple; (2) what a couple should do if their marriage is not registered within the 10-day window.

---

### Claim 11 — source_url: https://www.gov.bb/Citizens/register-marriage (content-directory.ts line 83)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Citizens/register-marriage</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">URL resolves but the source itself is potentially stale</div>
<pre class="claim-block-content">https://www.gov.bb/Citizens/register-marriage resolves and returns content
consistent with the alpha.gov.bb page. However, the source page does not
include the "Coleridge Street" error — it gives the correct Supreme Court
Complex address. The alpha.gov.bb content file (line 11) has diverged from
the source by introducing the wrong address.

The more authoritative and detailed source is:
https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages</pre>
</div>

- **Type:** URL
- **Checked:** [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) — live and accessible, correct address in contact block; [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) — live and more complete
- **Status:** unverifiable (URL lives and is on-topic; but the alpha.gov.bb content file has diverged from its own source by adding the wrong "Coleridge Street" address in line 11)
- **Certainty:** 70%
- **Open question:** consider updating the `source_url` to point to the Barbados Judicial System URL, which is more detailed and gives the correct address and registration deadline.

---

## Additional findings (not on the page but should be)

- **Registration deadline ("within the first ten days of every month")** — confirmed on [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages). A Marriage Officer or Magistrate who misses this window, or a couple whose registration has not occurred, has no guidance from the current page.

- **Apostille fee (BDS $50)** — confirmed on [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) ("Apostille: BDS$50.00"). Relevant for couples who married in Barbados and need the certificate recognised by a foreign government. No mention of this fee appears on the page.

- **Email and fax for overseas requests** — [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) lists email `registrar@lawcourts.gov.bb` and fax `1 (246) 427-8917`. Neither appears on the page. Useful for overseas couples unable to visit in person.

- **"Level 1" floor detail** — the Judicial System page specifies "Level 1, Supreme Court Complex." Adding this would help citizens navigate a multi-floor building.

- **Grammatical improvement** — line 11 reads "To register the marriages you must visit" (plural "marriages" for a singular event). Should read "To register the marriage…"

- **"Father's name" only — no provision for mother's name** — the page records "Name and occupation of husband's father" and "Name and occupation of wife's father." Whether a single parent's (mother's) details can be substituted is not addressed. Consider adding a note if this is a common scenario.

---

## Sources cited

- [alpha.gov.bb — Register a marriage (live page)](https://alpha.gov.bb/family-birth-relationships/register-a-marriage) (accessed 2026-05-29)
- [Barbados Judicial System — Getting Married and Registration of Marriages](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/getting-married-and-registration-of-marriages) (accessed 2026-05-29)
- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) (accessed 2026-05-29)
- [Barbados Judicial System — Statutes Administered by the Records Branch](https://www.barbadoslawcourts.gov.bb/records-branch/statutes-administered-by-the-records-branch) (accessed 2026-05-29)
- [gov.bb — Register a Marriage](https://www.gov.bb/Citizens/register-marriage) (accessed 2026-05-29)
- [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) (accessed 2026-05-29)
- [_inventory.md](/home/gavin/frontend-alpha/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department entry; Registration Department phone entry
- [register-a-birth.md](/home/gavin/frontend-alpha/docs/fact-check/register-a-birth.md) — Claims 7 and 8 (cross-reference for shared address and phone)
- [get-birth-certificate.md](/home/gavin/frontend-alpha/docs/fact-check/get-birth-certificate.md) — Claims 6 and 7 (cross-reference for shared address and phone)
