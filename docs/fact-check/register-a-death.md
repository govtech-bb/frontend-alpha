# Fact-check: Register a death

- **Live page:** <https://alpha.gov.bb/family-birth-relationships/register-a-death>
- **Source file:** `src/content/register-a-death.md`
- **Last checked:** 2026-05-29
- **Summary:** 10 claims reviewed — 6 verified, 2 discrepant, 2 unverifiable. Average certainty: **80%**.

---

## Headline issues for triage

1. **Page conflates death registration with death certificate applications — the actual registration process is missing.** The page is titled "Register a death" but its content describes how to apply for a death certificate copy, not how to register a death (i.e., give Notice of Death). Under the Vital Statistics Registration Act Cap. 192A, a Notice of Death must be given within five (5) days of death, and the Funeral Director in charge of the body is responsible for registering the death. None of this appears on the page. Citizens looking for guidance on their legal obligation after a death will not find it here. This is the most significant content gap in the entire page and was present in the previous pass.

2. **"White Park Road" (two words) is inconsistent with the authoritative one-word spelling "Whitepark Road".** The authoritative address used by `barbadoslawcourts.gov.bb` (both the Certificates page and the Registration of Deaths page) and `gov.bb/Departments/registration` is "Whitepark Road" (one word). The companion `get-death-certificate` alpha.gov.bb page also uses "Whitepark Road". The page (and its source URL `gov.bb/Citizens/register-death`) use the two-word variant. Verified discrepant; the barbadoslawcourts.gov.bb pages are the highest-authority source for the building's own address.

3. **Mail-application money order amount hardcoded at BDS$5.00 — incorrect for Cause of Death certificate applicants.** The page instructs mail applicants to include "a Money Order in the amount of BDS$5.00". The Cause of Death certificate costs BDS$10.00. The `barbadoslawcourts.gov.bb` Certificates page correctly says "a Money Order for the relevant processing fee" (no fixed amount). A citizen mailing a Cause of Death certificate application with only BDS$5.00 would face rejection or delay. Finding persists from previous pass.

4. **Missing email, overseas phone, and office hours.** The companion `get-death-certificate` page lists `registrarsupremecourt@barbados.gov.bb`, overseas line `+1 (246) 535-9751`, and hours `Monday–Friday, 8:30 am–3:15 pm`. The `barbadoslawcourts.gov.bb` Registration of Deaths page also lists the email and fax `1-246-426-2405`. None of these appear on the `register-a-death` page, leaving overseas applicants with no non-phone contact option.

5. **Two different email addresses appear in gov.bb authoritative sources.** `barbadoslawcourts.gov.bb` lists `registrarsupremecourt@barbados.gov.bb`; `gov.bb/Departments/registration` lists `registrar@lawcourts.gov.bb`. The alpha.gov.bb `get-death-certificate` page uses the `@barbados.gov.bb` address. This conflict is an open question requiring agency confirmation; the `@barbados.gov.bb` address is the more recent-looking domain and appears on the sister page.

---

## Claims

### Claim 1 — Application location: Registration Department, New Supreme Court Complex, White Park Road, St. Michael (lines 9, 21–26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Applications for death certificates are made at the Registration Department, New Supreme Court Complex White Park Road, St. Michael.

The Registrar of the Supreme Court
Registration Department
New Supreme Court Complex
White Park Road
St. Michael
BARBADOS</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (address correct; street spelling and building name inconsistent with verified sources)</div>
<pre class="claim-block-content">Registration Department
Supreme Court Complex
Whitepark Road
St. Michael
Barbados, W.I.</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Registration Department, Supreme Court Complex, Whitepark Road, St. Michael" (one-word spelling, no "New"); [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) — "Registration Department, Whitepark Road, Bridgetown"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "Supreme Court Complex, Whitepark Road, St. Michael, Barbados, W.I."; [alpha.gov.bb — get-death-certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — "Supreme Court Complex, Whitepark Road, St. Michael" (one-word, no "New"); [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — uses "White Park Road" (two-word, same as this page).
- **Status:** discrepant — "White Park Road" (two words) differs from "Whitepark Road" (one word) used by three independent authoritative sources and the sister page on alpha.gov.bb. "New Supreme Court Complex" also deviates; the building is referenced as "Supreme Court Complex" by all authoritative sources checked.
- **Certainty:** 90%
- **Confidence it's wrong:** 75% — three independent gov.bb/lawcourts.gov.bb sources use one word; alpha.gov.bb's own companion page uses one word. The upstream source URL also uses two words, so the error may be propagated from gov.bb rather than introduced by alpha.gov.bb.
- **Citizen impact:** LOW — the physical address is identifiable either way; this is a formatting inconsistency rather than a wrong street name.
- **Cross-reference:** see [_inventory.md](/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department address entry (canonical: Whitepark Road, St. Michael, verified 95%); consistent with [register-a-birth.md](/docs/fact-check/register-a-birth.md) Claim 7 and [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 6.

---

### Claim 2 — Processing fee BDS$5.00 (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Applications are processed for a fee of BDS$5.00.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (for a standard death certificate copy)</div>
<pre class="claim-block-content">Applications are processed for a fee of BDS$5.00.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "Applications are processed for a fee of BDS$5.00. For a Cause of Death certificate, the fee is BDS$10.00."; [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — "A fee of $5.00 (per copy) is charged for the certificate".
- **Status:** verified
- **Certainty:** 95%
- **Note:** This fee is for a copy of a standard death certificate only. Registration itself is free (see Claim 4). The Cause of Death certificate has a separate $10.00 fee (see Claim 6).

---

### Claim 3 — Mail application: Money Order BDS$5.00 payable to the Registrar, plus self-addressed stamped envelope (lines 11–12)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Completed application forms may also be mailed to the Registration Department and should be accompanied by a Money Order in the amount of BDS$5.00 and should be made out to the Registrar of the Supreme Court. Persons opting for this method of application should also enclose a self-addressed envelope with sufficient return postage.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (BDS$5.00 is wrong for Cause of Death certificate applicants)</div>
<pre class="claim-block-content">Completed application forms may also be mailed to the Registration Department and should be accompanied by a Money Order for the relevant processing fee (BDS$5.00 for a standard death certificate; BDS$10.00 for a Cause of Death certificate) and should be made out to the Registrar of the Supreme Court. Persons opting for this method of application should also enclose a self-addressed envelope with sufficient return postage.</pre>
</div>

- **Type:** process step / fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — source uses "a Money Order for the relevant processing fee" (not a fixed BDS$5.00 amount), covering both certificate types; [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — same hardcoded BDS$5.00 as the alpha.gov.bb page (error propagated from source).
- **Status:** discrepant — hardcoding BDS$5.00 in the mail instructions is incorrect for Cause of Death certificate applicants who owe BDS$10.00. The barbadoslawcourts.gov.bb source correctly leaves the amount unspecified ("the relevant processing fee"). The gov.bb source URL shares this error.
- **Certainty:** 95%
- **Confidence it's wrong:** 90% — barbadoslawcourts.gov.bb explicitly avoids naming a fixed amount precisely to cover both certificate types.
- **Citizen impact:** MEDIUM — a citizen mailing a Cause of Death certificate application with only BDS$5.00 will have their application rejected or delayed.

---

### Claim 4 — Registration is free of cost (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Registration for a Death Certificate is free of cost.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Registration for a Death Certificate is free of cost.</pre>
</div>

- **Type:** fee
- **Sources:** [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — "Registration for a Death Certificate is free of cost"; [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) — no fee mentioned for registration itself.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 5 — Standard death certificate copy fee: $5.00 per copy (line 16)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A fee of $5.00 (per copy) is charged for the certificate.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A fee of $5.00 (per copy) is charged for the certificate.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$5.00 — Death Certificate"; [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — "A fee of $5.00 (per copy) is charged for the certificate"; [alpha.gov.bb — get-death-certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — "$5 BBD per certified copy".
- **Status:** verified
- **Certainty:** 95%

---

### Claim 6 — Cause of Death certificate fee: $10.00 per copy (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A fee of $10.00 (per copy) is charged for the "Cause of Death" certificate.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A fee of $10.00 (per copy) is charged for the "Cause of Death" certificate.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) — "BDS$10.00 — Cause of Death Certificate"; [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — "A fee of $10.00 (per copy) is charged for the 'Cause of Death' certificate".
- **Status:** verified
- **Certainty:** 95%
- **Note:** This is a separate document from the standard death certificate. The `get-death-certificate` alpha.gov.bb page also notes that Cause of Death certificates must be requested via paper form (not the online option).

---

### Claim 7 — Phone number 1 (246) 535-9700 (line 30)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">(Tel.) 1 (246) 535-9700</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">1 (246) 535-9700</pre>
</div>

- **Type:** phone
- **Sources:** [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) — "1-246-535-9700"; [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) — "1 (246) 535-9700"; [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — "(Tel.) 1 (246) 535-9700"; [alpha.gov.bb — get-death-certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) — "(246) 535-9700".
- **Status:** verified
- **Certainty:** 95%
- **Cross-reference:** see [_inventory.md](/docs/fact-check/_inventory.md) — Barbados Judicial System / Registration Department phone entry (canonical verified 95%); consistent with [register-a-birth.md](/docs/fact-check/register-a-birth.md) Claim 8 and [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) Claim 7.

---

### Claim 8 — Page title and framing: "Register a death" describes how to apply for a death certificate (lines 1–9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Applications for death certificates are made at the Registration Department, New Supreme Court Complex White Park Road, St. Michael.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Content is about certificate applications, not the legal act of registering a death — significant framing gap</div>
<pre class="claim-block-content">The Barbados Judicial System (barbadoslawcourts.gov.bb) distinguishes clearly between
two separate processes:

1. REGISTERING A DEATH (legal obligation): A Notice of Death must be given within five
   (5) days after death. The Funeral Director in charge of the body has the
   responsibility for registering the Death. Required documents include the Medical
   Certificate of Death, Notice of Death, and identification of the deceased.

2. OBTAINING A DEATH CERTIFICATE COPY (service): Applying for a copy of a death
   certificate or Cause of Death certificate — the process the alpha.gov.bb page
   actually describes.

The alpha.gov.bb page is titled "Register a death" but only describes process 2
(certificate applications). Process 1 — the legal obligation with a 5-day deadline
and the funeral director's responsibility — is entirely absent.

A citizen seeking to understand their legal obligations after a death will not find
guidance on this page. The declared source_url (gov.bb/Citizens/register-death)
contains the same certificate-application-only content, suggesting the upstream source
also omits the registration process.</pre>
</div>

- **Type:** process step / eligibility / legal reference
- **Checked:** [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) — "A Notice of Death must be given within five (5) days after death. The Funeral Director in charge of the body has the responsibility for registering the Death." Required documents listed; [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — confirmed live; same certificate-application content as the alpha.gov.bb page; neither page covers the legal registration obligation.
- **Status:** unverifiable (the certificate-application content is correct; the missing registration-process content cannot be verified from the alpha.gov.bb page because it is absent)
- **Certainty:** 40% (for the claim that the page adequately covers "registering a death")
- **Citizen impact:** HIGH — a family that has just experienced a bereavement and visits this page to find out what they must legally do will not learn that a Notice of Death must be filed within 5 days, that the funeral director is normally responsible, or what documents are needed for registration. This is the most important guidance the page should provide.
- **Open question:** confirm with the Registration Department or Records Branch whether the 5-day deadline and funeral-director responsibility should be surfaced on the alpha.gov.bb page, and whether the page should be split into (a) "Register a death" (legal notification) and (b) "Get a copy of a death certificate" (which already exists at alpha.gov.bb/family-birth-relationships/get-death-certificate).

---

### Claim 9 — Source URL declared in content-directory.ts: https://www.gov.bb/Citizens/register-death (content-directory.ts line 76)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: https://www.gov.bb/Citizens/register-death</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — URL is live</div>
<pre class="claim-block-content">https://www.gov.bb/Citizens/register-death — confirmed live and accessible (2026-05-29).
The page contains the same certificate-application content as alpha.gov.bb, including
the same fees, the same address, and the same money-order instructions.</pre>
</div>

- **Type:** URL
- **Sources:** [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) — fetched successfully 2026-05-29; page content confirmed.
- **Status:** verified
- **Certainty:** 95%
- **Note:** The source URL is live. However, both the source URL and the alpha.gov.bb page share the same content gap identified in Claim 8 — neither covers the actual death registration process (Notice of Death, 5-day deadline, funeral director's role). The alpha.gov.bb content faithfully reproduces the gov.bb source, but the source itself is incomplete for the task it describes.

---

### Claim 10 — Live page URL routing (no protected: true flag)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://alpha.gov.bb/family-birth-relationships/register-a-death</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct — page loads at category-prefixed URL</div>
<pre class="claim-block-content">https://alpha.gov.bb/family-birth-relationships/register-a-death — confirmed live 2026-05-29.
No protected: true flag in content-directory.ts; standard /<category>/<slug> routing applies.</pre>
</div>

- **Type:** URL
- **Sources:** [alpha.gov.bb — register-a-death](https://alpha.gov.bb/family-birth-relationships/register-a-death) — fetched successfully 2026-05-29, content matches source markdown; [content-directory.ts](../src/data/content-directory.ts) — no `protected: true` flag on this entry.
- **Status:** verified
- **Certainty:** 95%

---

## Additional findings (not on the page but should be)

- **5-day Notice of Death deadline and funeral director's responsibility** — confirmed on [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths). The page currently only covers how to obtain a certificate copy; the legal obligation to give Notice of Death is entirely absent. This is the most consequential missing content.

- **Required documents for death registration** — barbadoslawcourts.gov.bb lists: Medical Certificate of Death, Notice of Death, identification document of the deceased. None of these are mentioned on the page.

- **Email address conflict across authoritative sources.** `barbadoslawcourts.gov.bb` and the companion alpha.gov.bb `get-death-certificate` page list `registrarsupremecourt@barbados.gov.bb`; `gov.bb/Departments/registration` lists `registrar@lawcourts.gov.bb`. The `@barbados.gov.bb` address is preferred given its use on the sister page but the conflict should be confirmed with the Registration Department before adding an email to this page.

- **Overseas phone number missing.** The `get-death-certificate` page lists an overseas line `+1 (246) 535-9751`. This would benefit callers outside Barbados and is absent here.

- **Office hours missing.** The `get-death-certificate` page lists Monday–Friday, 8:30 am–3:15 pm. Not listed on this page.

- **Fax number.** `barbadoslawcourts.gov.bb` lists fax `1-246-426-2405` (Registration of Deaths page). This is a secondary contact channel worth including.

- **Money Order amount for mail applications should vary by certificate type** — the page hardcodes BDS$5.00 in the mail-application instructions but the Cause of Death certificate costs BDS$10.00. The barbadoslawcourts.gov.bb Certificates page correctly says "a Money Order for the relevant processing fee" (unspecified amount).

- **February 2025 proposal to transfer death registrations to the Electoral and Boundaries Commission (EBC)** — Attorney General Dale Marshall announced in February 2025 that the EBC would "hopefully, very soon" assume responsibility for birth and death registrations. As of 2026-05-29 this transfer has not yet taken effect, but the page should be flagged for re-verification once the change is implemented. See [Barbados Today — Electoral commission to take over birth, death registrations (2025-02-19)](https://barbadostoday.bb/2025/02/19/electoral-commission-to-take-over-birth-death-registrations-ag/).

- **Overlap with `get-death-certificate` page** — the alpha.gov.bb page `get-death-certificate` at `https://alpha.gov.bb/family-birth-relationships/get-death-certificate` covers essentially the same certificate-copy process (but with more detail, including an online option and office hours). The two pages should be reconciled so "register a death" covers the legal notification process and "get a death certificate" covers obtaining copies.

---

## Sources cited

- [Barbados Judicial System — Registration of Deaths](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/registration-of-deaths) (accessed 2026-05-29)
- [Barbados Judicial System — Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/how-to-order/certificates) (accessed 2026-05-29)
- [Barbados Judicial System — Vital Statistics Registration](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/services/vital-statistics-registration/) (accessed 2026-05-29)
- [gov.bb — register-death](https://www.gov.bb/register-death) (accessed 2026-05-29)
- [gov.bb — Citizens/register-death](https://www.gov.bb/Citizens/register-death) (accessed 2026-05-29 — declared source_url; confirmed live)
- [gov.bb — Registration Department](https://www.gov.bb/Departments/registration) (accessed 2026-05-29)
- [alpha.gov.bb — get-death-certificate](https://alpha.gov.bb/family-birth-relationships/get-death-certificate) (accessed 2026-05-29 — cross-page consistency)
- [alpha.gov.bb — register-a-death (live page)](https://alpha.gov.bb/family-birth-relationships/register-a-death) (accessed 2026-05-29)
- [Barbados Today — Electoral commission to take over birth, death registrations (2025-02-19)](https://barbadostoday.bb/2025/02/19/electoral-commission-to-take-over-birth-death-registrations-ag/) (accessed 2026-05-29)
- [_inventory.md](/docs/fact-check/_inventory.md) — Supreme Court Complex / Registration Department address entry; Registration Department phone entry
- [register-a-birth.md](/docs/fact-check/register-a-birth.md) — cross-page consistency (address, phone)
- [get-birth-certificate.md](/docs/fact-check/get-birth-certificate.md) — cross-page consistency (address, phone, email)
