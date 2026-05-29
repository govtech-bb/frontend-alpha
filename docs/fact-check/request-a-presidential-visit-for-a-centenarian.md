# Fact-check: Request a Presidential Visit for a Centenarian

- **Live page:** <https://alpha.gov.bb/request-a-presidential-visit-for-a-centenarian>
- **Source file:** `src/content/request-a-presidential-visit-for-a-centenarian/index.md`
- **Last checked:** 2026-05-29
- **Summary:** 10 claims reviewed — 3 verified, 2 discrepant, 5 unverifiable. Average certainty: **55%**.

---

## Headline issues for triage

1. **"Start now" CTA is broken — primary citizen action fails with HTTP 404.** The "Start now" link in the source markdown (`/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form`) uses the category-prefixed path. Because this page is `protected: true` in `content-directory.ts`, it is served at `/request-a-presidential-visit-for-a-centenarian` (no category prefix) — and its sub-pages follow the same root. The form URL `/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form` returns HTTP 404 when fetched directly. Citizens clicking "Start now" cannot access the application form. This is the highest-priority fix.

2. **Live URL in earlier report was wrong — now corrected.** The previous pass recorded the live URL as `https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian`. That URL returns HTTP 404. The correct live URL, confirmed on 2026-05-29, is `https://alpha.gov.bb/request-a-presidential-visit-for-a-centenarian` (no category prefix, consistent with `protected: true` routing). The per-page report header has been updated.

3. **President's formal title is wrong.** The page identifies the President as "Lieutenant Colonel Jeffrey Bostic". The correct presidential title — used consistently by CBC, GIS, and all official sources since 30 November 2025 — is "Lieutenant Colonel the Most Honourable Jeffrey Bostic." Dropping the honorific is non-standard for a head of state reference on a government service page.

4. **"3 months before the birthday" advance-notice requirement is unverifiable.** No Tier-1 or Tier-2 source documents this specific lead time. The Office of the President website returns no procedural content. If the real window differs, citizens could miss the opportunity entirely.

5. **All document requirements are unverifiable.** The original birth certificate requirement, original marriage certificate requirement (female centenarians only), and the affidavit provision appear on no Government of Barbados public source.

---

## Claims

### Claim 1 — Service description: "ask the President to visit a Barbadian who is turning 100" (line 8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Use this service to ask the President, Lieutenant Colonel Jeffrey Bostic, to visit a Barbadian who is turning 100 years old.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Use this service to ask the President, Lieutenant Colonel Jeffrey Bostic, to visit a Barbadian who is turning 100 years old.</pre>
</div>

- **Type:** descriptive / process step
- **Status:** verified — visiting centenarians on their 100th birthday is a well-documented practice of the Barbados head of state. Barbados Today (2026-03-29) confirms President Jeffrey Bostic attended in person for the Dilworth centenary: "She also received a special visit from President Jeffrey Bostic, to which she was visibly pleased." Multiple GIS articles and news reports confirm this practice for both President Bostic and his predecessor Dame Sandra Mason.
- **Sources:** [Barbados Today — Dilworth Turns 100 in signature style (2026-03-29)](https://barbadostoday.bb/2026/03/29/dilworth-turns-100-in-signature-style/)
- **Certainty:** 95%

---

### Claim 2 — President's name and rank: "Lieutenant Colonel Jeffrey Bostic" (line 8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Lieutenant Colonel Jeffrey Bostic</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Lieutenant Colonel the Most Honourable Jeffrey Bostic</pre>
</div>

- **Type:** agency name / statistic
- **Status:** discrepant — Jeffrey Bostic is correctly identified as the current President, and his pre-presidential rank of Lieutenant Colonel is accurate. However, on assuming office as President of Barbados on 30 November 2025, he received the presidential honorific "The Most Honourable." CBC reports Parliament's declaration using the exact phrase: "Lieutenant Colonel the Most Honourable Jeffrey Bostic becoming the next President of Barbados." No current Government of Barbados publication uses the bare form "Lieutenant Colonel Jeffrey Bostic" in his presidential capacity.
- **Sources:** [CBC — Lt. Col. Jeffrey Bostic officially declared as next President of Barbados](https://www.cbc.bb/news/local-news/lt-col-jeffrey-bostic-officially-declared-as-next-president-of-barbados/) — quotes Parliament's declaration: "Lieutenant Colonel the Most Honourable Jeffrey Bostic"
- **Certainty:** 90%
- **Confidence it's wrong:** 80%
- **Citizen impact:** LOW — the page correctly identifies the right person; this is a formal-title accuracy issue affecting the professional presentation of a government service page.

---

### Claim 3 — Advance notice: "at least 3 months before the birthday" (line 10)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You must submit this request at least 3 months before the birthday.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not confirmed by any public source</div>
<pre class="claim-block-content">Checked: presidentofbarbados.org (no procedural content);
gov.bb/Visit-Barbados/president (stale — still names Dame Sandra Mason);
GIS centenarian articles (descriptive only, no lead-time information);
Barbados Today centenarian articles (no procedural detail).</pre>
</div>

- **Type:** eligibility / process step
- **Status:** unverifiable — the 3-month advance-notice requirement does not appear on any publicly accessible Government of Barbados source. GIS articles covering centenarian visits describe the visit itself but contain no procedural guidance. This requirement is almost certainly set internally by the Office of the President and has not been published externally. Note: `content-directory.ts` line 105 also references this requirement in the page description, suggesting it originates from the GovBB team's engagement with the Office.
- **Sources:** Checked: [presidentofbarbados.org](https://www.presidentofbarbados.org/) — title only, no procedural content; [gov.bb — President page](https://www.gov.bb/Visit-Barbados/president) — stale (Sandra Mason); [GIS — centenarian tag](https://gisbarbados.gov.bb/blog/tag/president-of-barbados/) — HTTP 403; [Barbados Today — Dilworth Turns 100](https://barbadostoday.bb/2026/03/29/dilworth-turns-100-in-signature-style/) — no lead-time detail
- **Certainty:** 30%
- **Open question:** Can the GovBB team obtain written confirmation from the Office of the President that the 3-month advance notice period is correct? If confirmed, add a note "as required by the Office of the President" to the page.

---

### Claim 4 — Document requirement: original birth certificate with names (lines 21–22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Original birth certificate with names included (required for all centenarians).</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not confirmed by any public source</div>
<pre class="claim-block-content">Checked: presidentofbarbados.org, gov.bb/Visit-Barbados/president,
GIS centenarian articles — none document a birth certificate requirement
for a presidential visit request.</pre>
</div>

- **Type:** document requirement
- **Status:** unverifiable — no Government of Barbados public source documents the requirement to present or upload an original birth certificate when requesting a presidential centenarian visit. The requirement is plausible (proof of age is needed) but cannot be independently verified. The phrase "with names included" is unexplained — presumably parents' names on the certificate, but the reason is unstated.
- **Sources:** Checked: [presidentofbarbados.org](https://www.presidentofbarbados.org/) — no content; [gov.bb — President page](https://www.gov.bb/Visit-Barbados/president) — no procedural content
- **Certainty:** 30%
- **Open question:** Can the GovBB team confirm with the Office of the President that (a) a birth certificate is required, (b) it must be the original (or is a certified copy acceptable?), and (c) what "with names included" means?

---

### Claim 5 — Document requirement: marriage certificate(s) for female centenarians (lines 23–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Original marriage certificate(s) if she is or has been married (female centenarians only).</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not confirmed by any public source</div>
<pre class="claim-block-content">Checked: presidentofbarbados.org, gov.bb/Visit-Barbados/president,
GIS centenarian articles — none document a marriage certificate requirement.
The female-only scope of this requirement is also unconfirmed.</pre>
</div>

- **Type:** document requirement / eligibility
- **Status:** unverifiable — no public source documents this requirement. The female-only scoping is notable: if the purpose is to verify identity across name changes due to marriage, male centenarians could also theoretically have changed names. The rationale for limiting this requirement to female centenarians is not explained.
- **Sources:** Checked: [presidentofbarbados.org](https://www.presidentofbarbados.org/) — no content; [gov.bb — President page](https://www.gov.bb/Visit-Barbados/president) — no procedural content
- **Certainty:** 30%
- **Open question:** Can the GovBB team confirm with the Office of the President that (a) marriage certificates are required for female centenarians, (b) the originals are required (not certified copies), and (c) whether this requirement also applies to male centenarians who have changed their legal name?

---

### Claim 6 — Affidavit requirement for document discrepancies (line 26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If there is a discrepancy in the documents, an affidavit may also be required.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not confirmed by any public source</div>
<pre class="claim-block-content">Checked: presidentofbarbados.org, gov.bb/Visit-Barbados/president,
GIS centenarian articles — none mention an affidavit for centenarian visit requests.</pre>
</div>

- **Type:** document requirement / process step
- **Status:** unverifiable — no public source documents this requirement. The affidavit provision is a standard mechanism used by the Registration Department for certificate applications, so its appearance here is plausible but cannot be confirmed as applying to this specific service.
- **Sources:** Checked: [presidentofbarbados.org](https://www.presidentofbarbados.org/) — no content; [gov.bb — President page](https://www.gov.bb/Visit-Barbados/president) — no procedural content; [GIS — centenarian tags](https://gisbarbados.gov.bb/) — HTTP 403
- **Certainty:** 30%
- **Open question:** Can the GovBB team confirm with the Office of the President that an affidavit is accepted or required to resolve name/date discrepancies between the centenarian's documents?

---

### Claim 7 — CTA link: "Start now" button pointing to form (line 32)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">&lt;a data-start-link href="/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form"&gt;Start now&lt;/a&gt;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">&lt;a data-start-link href="/request-a-presidential-visit-for-a-centenarian/form"&gt;Start now&lt;/a&gt;</pre>
</div>

- **Type:** link / CTA
- **Status:** discrepant — the "Start now" button hardcodes `/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form`. Because the parent page has `protected: true` in `content-directory.ts`, it is served at the root path `/request-a-presidential-visit-for-a-centenarian` with no category prefix. Its sub-page (the form) follows the same root. WebFetch of the category-prefixed form URL returns HTTP 404. The live page on `alpha.gov.bb` renders the broken href directly in the "Start now" button. Citizens clicking this button cannot access the application form.
- **Sources:** [Live page — confirmed Start now href](https://alpha.gov.bb/request-a-presidential-visit-for-a-centenarian) — href is `/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form`; [Category-prefixed form URL — HTTP 404](https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form); `src/data/content-directory.ts` line 103 — `protected: true`
- **Certainty:** 97%
- **Confidence it's wrong:** 97%
- **Citizen impact:** HIGH — the primary online application route is completely inaccessible. Citizens cannot submit the form; only postal applications remain available as a workaround.

---

### Claim 8 — Process time: "Most people finish this in about 10 minutes" (line 31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Most people finish this in about 10 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — testable against the form</div>
<pre class="claim-block-content">Form URL returns HTTP 404 (broken CTA — see Claim 7).
Cannot assess completion time independently.</pre>
</div>

- **Type:** descriptive / process step
- **Status:** unverifiable — the form is inaccessible (see Claim 7). Even if fixed, the 10-minute claim would need usability testing to validate. Given that the form requires scanning and uploading original documents, 10 minutes may be optimistic for less digitally confident users.
- **Sources:** Checked: [live form URL — HTTP 404](https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form)
- **Certainty:** 35%
- **Open question:** Is the 10-minute estimate based on user testing of the actual form? If documents need to be scanned and uploaded, this may be optimistic for many users.

---

### Claim 9 — Postal address: "State House / Government Hill / St Michael" (lines 38–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Private Secretary to the President
Office of the President
State House
Government Hill
St Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Private Secretary to the President
Office of the President
State House
Government Hill
St Michael</pre>
</div>

- **Type:** address
- **Status:** verified — State House is confirmed as located on Government Hill, St. Michael, Barbados by Wikipedia ("located on Government Hill, St. Michael, Barbados") and Wikidata (Q12058894, geographic coordinates confirming the Government Hill site). The designation "Office of the President" and the tradition of addressing correspondence to the "Private Secretary" are consistent with established Government of Barbados practice. No public source specifies a BB-series postal code for State House.
- **Sources:** [Wikipedia — State House, Barbados](https://en.wikipedia.org/wiki/State_House,_Barbados) — "located on Government Hill, St. Michael, Barbados"; [Wikidata — Q12058894](https://www.wikidata.org/wiki/Q12058894) — coordinates confirm Government Hill site
- **Certainty:** 88%
- **Note:** No Tier-1 `.gov.bb` source confirmed the address (presidentofbarbados.org returned only a title; gov.bb/Visit-Barbados/president is stale). The 88% score reflects strong corroboration from Wikipedia and geographic data.

---

### Claim 10 — Postal application process: letter with specified fields (lines 36–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Write a letter with the centenarian's name, date of birth, home address,
visit address (if different), and the name, address, and phone number of
the contact person. Include the required original documents and send to:

Private Secretary to the President
Office of the President
State House
Government Hill
St Michael</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable — not confirmed by any public source</div>
<pre class="claim-block-content">Checked: presidentofbarbados.org, gov.bb/Visit-Barbados/president,
GIS centenarian articles — none document a formal postal application
process for requesting a presidential visit.</pre>
</div>

- **Type:** process step
- **Status:** unverifiable — no Government of Barbados public source describes a formal postal application process for requesting a presidential centenarian visit. The specific fields required in the letter cannot be verified against any official guidance. An additional concern: the instruction to include "required original documents" and send them by post creates a risk of original documents being lost in transit — there is no guidance about using registered or tracked mail.
- **Sources:** Checked: [presidentofbarbados.org](https://www.presidentofbarbados.org/) — no procedural content; [GIS — centenarian articles](https://gisbarbados.gov.bb/) — HTTP 403; [gov.bb — President](https://www.gov.bb/Visit-Barbados/president) — stale
- **Certainty:** 30%
- **Open question:** Can the GovBB team confirm with the Office of the President that a postal application is an accepted route? Should the page advise using registered/tracked mail given that original documents are sent?

---

## Additional findings (not on the page but should be)

**Missing contact details for the Office of the President.** The page provides only a postal address. For a time-sensitive request with a stated 3-month advance notice requirement, phone or email contact is more practical. The GovBB team should obtain and publish verified contact details for the Office of the President directly.

**gov.bb/Visit-Barbados/president is stale — still showing Dame Sandra Mason.** As of 2026-05-29, the official gov.bb page for the President still displays the profile of Dame Sandra Mason (installed 30 November 2021). Jeffrey Bostic took office on 30 November 2025 — this page has not been updated in over 6 months. This is a separate finding for escalation to the Cabinet Office or Office of the President, but it also means there is no authoritative `.gov.bb` page to verify this service's content against.

---

## Sources cited

- [CBC — Lt. Col. Jeffrey Bostic officially declared as next President of Barbados](https://www.cbc.bb/news/local-news/lt-col-jeffrey-bostic-officially-declared-as-next-president-of-barbados/) — formal title "Lieutenant Colonel the Most Honourable Jeffrey Bostic"
- [Barbados Today — Dilworth Turns 100 in signature style (2026-03-29)](https://barbadostoday.bb/2026/03/29/dilworth-turns-100-in-signature-style/)
- [Barbados Today — Centenarian, family celebrate milestone (2026-01-08)](https://barbadostoday.bb/2026/01/08/centenarian-family-celebrate-milestone/)
- [Wikipedia — State House, Barbados](https://en.wikipedia.org/wiki/State_House,_Barbados)
- [Wikidata — Q12058894 (State House, Barbados)](https://www.wikidata.org/wiki/Q12058894)
- [gov.bb — President page (stale — Dame Sandra Mason)](https://www.gov.bb/Visit-Barbados/president)
- [presidentofbarbados.org](https://www.presidentofbarbados.org/) — title only, no substantive content
- [Live page — alpha.gov.bb](https://alpha.gov.bb/request-a-presidential-visit-for-a-centenarian) — confirmed correct live URL; confirmed broken "Start now" CTA href
- [Category-prefixed URL — HTTP 404](https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian) — confirms protected-page routing; category-prefix returns 404
- [Form URL — HTTP 404](https://alpha.gov.bb/family-birth-relationships/request-a-presidential-visit-for-a-centenarian/form) — broken CTA destination
