# Fact-check: Get a document notarised

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised>
- **Source file:** `src/content/get-a-document-notarised.md`
- **Last checked:** 2026-05-29
- **Summary:** 14 claims reviewed — 6 verified, 4 discrepant, 4 unverifiable. Average certainty: 68%.

---

## Headline issues for triage

1. **Notarial seal fee conflict — $50 vs $20.** The page says "Notarial seal — BBD $50". The official Barbados Judicial System site currently states "The fee for affixing a notarial seal is BDS$20.00 for each notarial act." A GIS press release from April 2017 announced a change *to* $50. The 2024 Notaries Public Act says "no change in fees from the previous regime." It is unclear whether the court's own website has not been updated since the 2017 change (and $50 is correct) or whether $50 applied to a different category and the Registrar still charges $20. A citizen could overpay or underpay. Recommend agency confirmation. (Status now elevated to discrepant/conflicted — prior report marked this verified at 85%.)

2. **CAIPO / Intellectual Property Office address is wrong.** Page says "Baobab Tower, Highway 2, Saint Michael." Authoritative sources (CAIPO website and gov.bb State Bodies page) confirm the address is "Ground Floor, Baobab Towers, Warrens, St. Michael." Building name is plural (Towers), and location is Warrens, not Highway 2.

3. **Missing citizen requirement: $10 adhesive postage stamp.** The Barbados Judicial System site explicitly states "Persons desirous of having a document notarized are required to bring a $10.00 adhesive postage stamp which will be affixed to the document and cancelled by the registrar." This is omitted from the page's "What to take" section — a citizen arriving without it would be turned away or charged extra.

4. **Broken declared source URL.** `https://www.gov.bb/Citizens/notarize-document` (in `src/data/content-directory.ts`) returns HTTP 404. The correct live source is the Barbados Judicial System's notarising page.

5. **New Notaries Public Act 2024 in effect since 1 September 2024.** The 2024 Act replaced the 2017 Act and expanded who can be a notary (attorneys-at-law, chartered accountants, qualified professionals with 15+ years experience). The page's description — which implies notarisation is only available at three specific government offices — may now be incomplete, since private notaries are now more accessible. The page should be reviewed in light of the expanded notary pool.

---

## Claims

### Claim 1 — Land Registry address (lines 21–23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ground Floor Warrens Office Complex
Warrens
St. Michael</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — "Ground Floor" unconfirmed</div>
<pre class="claim-block-content">Barbados Land Registry
Warrens Office Complex
Warrens
St. Michael BB12001
Barbados</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Land Registry](http://www.landregistry.gov.bb) — lists "Warrens Office Complex, Warrens, St. Michael BB12001" but does not specify which floor; [Lands and Surveys Department — Contact Us](https://www.landsandsurveys.gov.bb/pages/ContactUs.html) — separate department in the same building, on "Ground Floor East"
- **Status:** partial match — building and parish are correct; "Ground Floor" qualifier is plausible but not confirmed on the Land Registry's own website
- **Certainty:** 75%
- **Open question:** confirm with the Registrar of Lands which floor the Land Registry counter service operates from.

### Claim 2 — Supreme Court address (lines 27–29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Whitepark Road
Bridgetown
Saint Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (minor phrasing variation)</div>
<pre class="claim-block-content">Barbados Supreme Court Complex
Whitepark
Bridgetown
Barbados</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/) — "level 2/3, Barbados Supreme Court Complex, Whitepark, Bridgetown, Barbados"; [GIS — Supreme Court Complex](https://gisbarbados.gov.bb/blog/tag/supreme-court-complex/)
- **Status:** verified (minor) — "Whitepark Road, Bridgetown" is close to official phrasing "Whitepark, Bridgetown". "Saint Michael" vs "Barbados" is a minor difference; Bridgetown lies within St. Michael. The street name "Whitepark Road" vs "Whitepark" is a small discrepancy but not citizen-impacting.
- **Certainty:** 85%

### Claim 3 — Intellectual Property Office address (lines 33–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Baobab Tower
Highway 2
Saint Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Ground Floor, Baobab Towers
Warrens
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [CAIPO — caipo.gov.bb](https://caipo.gov.bb/) — "Ground Floor, Baobab Towers, Warrens, St. Michael, Barbados, W.I."; [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property) — same address confirmed
- **Status:** discrepant
- **Certainty:** 30% (page is likely wrong)
- **Confidence it's wrong:** 92%
- **Citizen impact:** HIGH — a citizen could arrive at the wrong location; "Highway 2" is not how the building is addressed, and "Baobab Tower" (singular) differs from the official "Baobab Towers" (plural).

### Claim 4 — Notarial seal fee BBD $50 (line 79)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Notarial seal (when a notary issues an official stamp to authenticate a document) BBD $50</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Conflicting authoritative sources</div>
<pre class="claim-block-content">Barbados Judicial System site (current): BDS$20.00 per notarial act
GIS press release (April 2017): fee changed to $50 per seal
Notaries Public Act 2024: "no change in fees from previous regime"
Resolution unclear — court website may not have been updated since 2017.</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — "The fee for affixing a notarial seal is BDS$20.00 for each notarial act"; [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/) — announced $50 per seal from 18 April 2017; [businessbarbados.com — Barbados Enhances Notarial Services](https://www.businessbarbados.com/articles/barbados-enhances-notarial-services) — 2024 Act: "no change in fees from previous regime"
- **Status:** unverifiable — authoritative sources conflict
- **Certainty:** 50%
- **Citizen impact:** MEDIUM — citizen may overpay or be refused service if the court counter charges $20 but expects $50 (or vice versa).
- **Open question:** confirm with the Supreme Court Registrar's office (1-246-535-9700 / registrarsupremecourt@barbados.gov.bb) which fee is currently charged at the counter.

### Claim 5 — Notarial certificate fee BBD $50 (line 81)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Notarial certificate (when a notary issues a statement to authenticate a document) BBD $50</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Notarial certificate: BBD $50 (BDS$50 per Barbados Judicial System site)</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — "The fee for issuing a notarized Registrar's Certificate is BDS$50.00"
- **Status:** verified
- **Certainty:** 90%

### Claim 6 — "Execution of a document" fee BBD $20 (line 83)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Execution of a document (when a notary verifies someone's identity and witnesses them signing a document) BBD $20</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify</div>
<pre class="claim-block-content">No authoritative Barbados source lists "execution of a document" as a distinct notarial fee category. The $20 figure matches what the Barbados Judicial System site currently lists as the notarial seal fee — possible misclassification.</pre>
</div>

- **Type:** fee
- **Sources consulted:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates); [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/); [Notaries Public Act, 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf) — none lists "execution of a document" as a distinct fee line
- **Status:** unverifiable — likely discrepant
- **Certainty:** 35%
- **Confidence it's wrong:** 65%
- **Open question:** confirm with the Registrar whether "execution of a document" is a distinct fee, or whether $20 is the notarial seal fee (possibly pre-2017 or currently charged at the counter despite the GIS announcement).

### Claim 7 — "Most fees are between BBD $10–50" (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fees are standardised across notary publics and locations but they vary depending on the document. Most are between BBD $10–50.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fee range $10–$50 is consistent with documented fees: $5 exhibit marking, $10 adhesive stamp, $20 notarial seal (per court site), $50 notarial certificate.</pre>
</div>

- **Type:** fee range
- **Sources:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- **Status:** verified
- **Certainty:** 80%

### Claim 8 — "Fees are standardised across notary publics and locations" (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fees are standardised across notary publics and locations</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially verified — new Act strengthens this claim</div>
<pre class="claim-block-content">The Notaries Public Act 2024 prescribes fixed fees that notaries cannot exceed. Notaries may voluntarily waive fees. The 2024 Act thus supports standardisation but allows downward flexibility.</pre>
</div>

- **Type:** pricing / policy
- **Sources:** [businessbarbados.com — Barbados Enhances Notarial Services](https://www.businessbarbados.com/articles/barbados-enhances-notarial-services) — "The legislation also prescribes fixed fees to be charged for notarial acts"; [chancerychambers.com — Barbados Enhances Notarial Services](https://chancerychambers.com/2024/09/06/barbados-enhances-notarial-services/)
- **Status:** partially verified — fixed maximum fees are prescribed; individual notaries may waive fees below that maximum
- **Certainty:** 70%

### Claim 9 — Documents that can be notarised (lines 64–71)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Copies of documents that can be notarised include:

- passports
- photocard driving licences
- letters from a Ministry
- bank statements
- gas or electricity bills
- letters from a hospital or doctor</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — likely template-derived</div>
<pre class="claim-block-content">No Barbados source enumerates an accepted-document list of this form. The list appears adapted from UK address-verification guidance (where "gas or electricity bills" and "letters from a hospital or doctor" are canonical proof-of-address examples). In Barbados, utility bills are less commonly used for this purpose.</pre>
</div>

- **Type:** document list
- **Sources consulted:** [Notaries Public Act, 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf); [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — neither enumerates an accepted-document list
- **Status:** unverifiable — likely template-derived, not Barbados-specific
- **Certainty:** 40%
- **Confidence it's wrong:** 65%
- **Open question:** confirm with the Registrar what documents are actually presented for notarisation in Barbados, and whether "gas or electricity bills" are a meaningful example.

### Claim 10 — "Notarisation is used for documents that need to be authenticated for use overseas" (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Often, notarisation is used for documents that need to be authenticated before for use overseas. However, it is also sometimes used in domestic circumstances.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Notarisation in Barbados is primarily used to authenticate documents for use overseas. Also used domestically for land transfers, commercial contracts, etc. Note: "authenticated before for use overseas" contains a typo ("before for").</pre>
</div>

- **Type:** descriptive claim
- **Sources:** [GIS — Notarisation Of Documents & Affixing Of Apostilles](https://gisbarbados.gov.bb/blog/notarisation-of-documents-affixing-of-apostilles/) (403 on this pass — confirmed in prior pass); general description consistent with Notaries Public Act 2024 scope
- **Status:** verified
- **Certainty:** 85%
- **Note:** "authenticated before for use overseas" contains a typo — "before" is redundant and should be removed.

### Claim 11 — The process description (lines 49–56)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The notary will:

1. Compare your original document and the photocopy.

2. Sign and date the copy if they are happy it is a true copy.
   If the original document is small (for example, your passport) the notary will issue a notarial certificate and attach it to the original instead.

3. Return your original document and your notarised photocopy to you immediately afterwards.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Plausible but unverifiable in detail</div>
<pre class="claim-block-content">Consistent with general description of registrar notarial practice on the Barbados Judicial System site, but no source enumerates these exact procedural steps. "Immediately afterwards" turnaround may vary. Also: step 2 describes the notarial certificate for small documents, but the court site says certificates attract a separate $50 fee — this distinction is not flagged to the citizen.</pre>
</div>

- **Type:** process step
- **Sources consulted:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- **Status:** plausible — unverifiable in this level of detail
- **Certainty:** 55%
- **Open question:** confirm with the Registrar's office whether the described process matches actual practice; confirm whether the $50 certificate fee applies when a notarial certificate is issued for a small document.

### Claim 12 — "You can pay by card or cash" (line 60)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can pay by card or cash.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify</div>
<pre class="claim-block-content">No authoritative source confirms payment methods accepted at the Supreme Court Registry or Land Registry notarial counter. Card acceptance at government counters in Barbados is not universal.</pre>
</div>

- **Type:** process step / payment
- **Sources consulted:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — no payment method mentioned; [Barbados Judicial System — Other Services](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/) — no payment methods listed
- **Status:** unverifiable
- **Certainty:** 40%
- **Open question:** confirm with the Registrar's office (and the Land Registry and IPO counters) whether card payment is accepted.

### Claim 13 — Declared `source_url` in `content-directory.ts` (line 431)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/content-directory.ts (line 431)</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/Citizens/notarize-document"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should be</div>
<pre class="claim-block-content">source_url: "https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates"</pre>
</div>

- **Type:** URL (metadata field in data file)
- **Verification:** [gov.bb/Citizens/notarize-document](https://www.gov.bb/Citizens/notarize-document) — direct fetch returned HTTP 404 (confirmed this pass 2026-05-29).
- **Status:** discrepant — broken
- **Certainty:** 100% (404 confirmed directly)
- **Confidence it's wrong:** 100%
- **Citizen impact:** LOW for the metadata field itself, but indicates the underlying source has moved and the content may be out of date.

### Claim 14 — Notaries Public Act 2024 and expanded notary access (new finding)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">This service is not available online yet so you will need to visit a notary public in person. You can go to any of the following places to get a document notarised: [Land Registry, Supreme Court, Intellectual Property Office]</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Outdated — new Act expands notary pool</div>
<pre class="claim-block-content">The Notaries Public Act 2024 (in force from 1 September 2024) allows attorneys-at-law, chartered accountants, and professionals with 15+ years experience to be appointed as notaries. Citizens now have a wider choice of notaries beyond the three government offices listed.</pre>
</div>

- **Type:** descriptive / eligibility claim
- **Sources:** [businessbarbados.com — Barbados Enhances Notarial Services](https://www.businessbarbados.com/articles/barbados-enhances-notarial-services); [chancerychambers.com — Barbados Enhances Notarial Services](https://chancerychambers.com/2024/09/06/barbados-enhances-notarial-services/)
- **Status:** discrepant — the page presents only three government offices; since September 2024 the notary pool has substantially expanded
- **Certainty:** 85% (that the page is now incomplete)
- **Confidence it's wrong:** 80%
- **Citizen impact:** MEDIUM — citizens who cannot easily reach these three offices (or want a private notary) are not informed of their options under the new Act.

---

## Additional findings (not on the page but should be)

- **$10 adhesive postage stamp (missing requirement):** The Barbados Judicial System site states "Persons desirous of having a document notarized are required to bring a $10.00 adhesive postage stamp which will be affixed to the document and cancelled by the registrar at the time of notarization." This should appear in the "What to take" section (currently: original document, photocopy, photo ID). A citizen arriving without this stamp would be turned away or delayed.
- **$5 fee for marking each exhibit:** Documented on the Barbados Judicial System site ("The fee for marking each exhibit is BDS$5.00"); absent from the fee table.
- **Registrar contact details:** Phone 1-246-535-9700 and email registrarsupremecourt@barbados.gov.bb are not mentioned on the page; useful for citizens with questions before attending in person.
- **Remote notarisation (future):** The 2024 Act contemplates future regulations allowing remote notarisation; the page could note this is coming even if not yet available.
- **Typo in body copy (line 11):** "authenticated before for use overseas" — the word "before" is redundant and should be removed.

---

## Sources cited

- [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/)
- [Barbados Judicial System — Other Services and Registrations](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/)
- [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/) (HTTP 403 on this pass — content summarised from prior pass and web search snippet)
- [GIS — Notarisation Of Documents & Affixing Of Apostilles](https://gisbarbados.gov.bb/blog/notarisation-of-documents-affixing-of-apostilles/) (HTTP 403 on this pass — confirmed in prior pass)
- [CAIPO — caipo.gov.bb](https://caipo.gov.bb/)
- [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property)
- [Barbados Land Registry — landregistry.gov.bb](http://www.landregistry.gov.bb)
- [Notaries Public Act, 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf)
- [businessbarbados.com — Barbados Enhances Notarial Services (2024)](https://www.businessbarbados.com/articles/barbados-enhances-notarial-services)
- [chancerychambers.com — Barbados Enhances Notarial Services (2024)](https://chancerychambers.com/2024/09/06/barbados-enhances-notarial-services/)
- [gov.bb/Citizens/notarize-document](https://www.gov.bb/Citizens/notarize-document) — 404 confirmed
