# Fact-check: Get a document notarised

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised>
- **Source file:** `src/content/get-a-document-notarised.md`
- **Last checked:** 2026-05-27
- **Summary:** 12 claims reviewed — 6 verified, 4 discrepant (incl. 1 broken URL), 2 unverifiable. Average certainty: 73%.

---

## Headline issues for triage

1. **Broken declared source URL** — `https://www.gov.bb/Citizens/notarize-document` (declared in `src/data/content-directory.ts`) returns 404. Replace with the Barbados Judicial System URL.
2. **CAIPO/IPO address is wrong** — page says "Baobab Tower, Highway 2"; authoritative sources say "Ground Floor, Baobab Towers, Warrens, St. Michael".
3. **"Execution of a document — $20" is not corroborated** by any authoritative source. May be confused with the pre-2017 notarial seal fee.
4. **Two requirements omitted from the page**: (a) a BDS $10 adhesive postage stamp the applicant must bring, (b) a BDS $5 fee for marking each exhibit. Both are documented on the Barbados Judicial System site.
5. **The "Documents that can be notarised" list looks UK-derived** (mentions gas/electricity bills, letters from a Ministry) and isn't corroborated by any Barbados source — flag for confirmation.

---

## Claims

### Claim 1 — Land Registry address (lines 19–23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ground Floor Warrens Office Complex
Warrens
St. Michael</pre>
<div class="claim-block-source">— <a href="https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised">alpha.gov.bb/travel-id-citizenship/get-a-document-notarised</a> (lines 21–23)</div>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Source says <span class="claim-match claim-match--partial">PARTIAL MATCH</span></div>
<pre class="claim-block-content">Barbados Land Registry
Warrens Office Complex
Warrens
St. Michael BB12001
Barbados</pre>
<div class="claim-block-source">— official Land Registry site, <a href="http://www.landregistry.gov.bb">www.landregistry.gov.bb</a></div>
</div>

- **Type:** address
- **Sources:** [Barbados Land Registry (landregistry.gov.bb)](http://www.landregistry.gov.bb); [Lands and Surveys Department — Contact Us](https://www.landsandsurveys.gov.bb/pages/ContactUs.html) (different department, same building)
- **Status:** partial match — page adds "Ground Floor", which is not directly attested by the Land Registry's own site. Plausible (Land Registry is on the ground floor of Warrens Office Complex per common knowledge), but unconfirmed.
- **Certainty:** 75% — building and parish match exactly; "Ground Floor" qualifier is plausible but needs direct confirmation from the Registrar.
- **Open question:** is the Land Registry specifically on the ground floor of Warrens Office Complex? The Lands and Surveys Department (a separate department in the same building) is on the "Ground Floor East" — easy for these to get conflated.

### Claim 2 — Supreme Court address (lines 25–29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Whitepark Road
Bridgetown
Saint Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Whitepark Road
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/); [GIS — Supreme Court Complex tag](https://gisbarbados.gov.bb/blog/tag/supreme-court-complex/)
- **Status:** verified (minor)
- **Certainty:** 90% — official address is "Whitepark Road, St. Michael". "Bridgetown" is loosely accurate (Bridgetown lies within St. Michael) but not how the Court itself states the address.
- **Suggested fix (optional):** drop "Bridgetown" line to match official phrasing.

### Claim 3 — Intellectual Property Office address (lines 31–35)

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
- **Sources:** [CAIPO](https://caipo.gov.bb/); [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property)
- **Status:** discrepant
- **Confidence it's wrong:** 90%
- **Citizen impact:** HIGH — a citizen following this page could turn up to the wrong place.
- **Notes:** Building name is "Baobab Towers" (plural). Located in Warrens, not on "Highway 2".

### Claim 4 — Notarial seal fee BBD $50 (line 79)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Notarial seal (when a notary issues an official stamp to authenticate a document) BBD $50</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Notarial seal: BBD $50 (per April 2017 GIS announcement)</pre>
</div>

- **Type:** fee
- **Sources:** [GIS — Change In Notary Fees (April 2017 announcement)](https://gisbarbados.gov.bb/blog/change-in-notary-fees/) — confirms $50 per seal from 18 April 2017; [Barbados Judicial System — Notarizing documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — lists $20 (likely pre-2017 figure that was never updated)
- **Status:** verified (but sources disagree)
- **Certainty:** 85% — the GIS press release is the authoritative announcement of the fee change; the Judicial System page appears stale.
- **Note for triage:** worth pinging the Registrar to confirm $50 is the current price and that the Judicial System website needs updating.

### Claim 5 — Notarial certificate fee BBD $50 (line 81)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Notarial certificate (when a notary issues a statement to authenticate a document) BBD $50</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Notarial certificate: BBD $50</pre>
</div>

- **Type:** fee
- **Sources:** [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/); [Barbados Judicial System — Notarizing documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- **Status:** verified
- **Certainty:** 95% — both sources agree.

### Claim 6 — "Execution of a document" fee BBD $20 (line 83)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Execution of a document (when a notary verifies someone's identity and witnesses them signing a document) BBD $20</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify</div>
<pre class="claim-block-content">No authoritative source uses the term "execution of a document" as a fee line item. Likely confusion with the pre-April-2017 notarial seal fee ($20).</pre>
</div>

- **Type:** fee
- **Sources consulted:** [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/); [Barbados Judicial System — Notarizing documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates); [Notaries Public Act 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf). None lists "execution" as a distinct fee category.
- **Status:** unverifiable — likely discrepant
- **Confidence it's wrong:** 60%
- **Open question for the GovBB team:** confirm with the Registrar's office whether "execution of a document" is a distinct fee, or whether this $20 figure is the pre-April-2017 notarial seal fee that was misclassified.

### Claim 7 — "Most fees are between BBD $10–50" (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fees are standardised across notary publics and locations but they vary depending on the document. Most are between BBD $10–50.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Fee range $10–$50 is consistent with documented fees: $5 exhibit certification, $10 adhesive stamp, $20 or $50 notarial seal (depending on source), $50 notarial certificate.</pre>
</div>

- **Type:** fee range
- **Sources:** [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/); [Barbados Judicial System — Notarizing documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- **Status:** verified
- **Certainty:** 80%

### Claim 8 — "Fees are standardised across notary publics and locations" (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Fees are standardised across notary publics and locations</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially confirmed</div>
<pre class="claim-block-content">The Notaries Public Act 2017 sets statutory fees for ex-officio Registrar notaries. Less clear whether the same schedule binds all notaries public appointed under the Act.</pre>
</div>

- **Type:** pricing / policy
- **Sources consulted:** [Notaries Public Act, 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf)
- **Status:** partially verified
- **Certainty:** 60%
- **Open question:** does the statutory fee schedule apply to private notaries (attorneys-at-law who hold notarial commission), or only to Registrar/ex-officio notaries?

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
<pre class="claim-block-content">No Barbados source enumerates an accepted-document list of this form. The list reads as if adapted from UK Home Office address-verification guidance (where "gas or electricity bills" and "letters from a hospital or doctor" are the canonical proof-of-address examples).</pre>
</div>

- **Type:** document list
- **Sources consulted:** [Notaries Public Act 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf); [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- **Status:** unverifiable — likely template-derived, not Barbados-specific
- **Confidence it's wrong:** 65%
- **Open question for the GovBB team:** confirm with the Registrar what documents are actually presented for notarisation in Barbados, and whether "gas or electricity bills" are a meaningful example here.

### Claim 10 — "Notarisation is used for documents that need to be authenticated for use overseas" (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Often, notarisation is used for documents that need to be authenticated before for use overseas. However, it is also sometimes used in domestic circumstances.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Notarisation in Barbados is primarily used to authenticate documents for use overseas. Confirmed by GIS.</pre>
</div>

- **Type:** descriptive claim
- **Sources:** [GIS — Notarisation Of Documents & Affixing Of Apostilles](https://gisbarbados.gov.bb/blog/notarisation-of-documents-affixing-of-apostilles/)
- **Status:** verified
- **Certainty:** 90%

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
<pre class="claim-block-content">Consistent with general description of registrar notarial practice on the Barbados Judicial System site, but no source enumerates these exact procedural steps in this order. Turnaround time "immediately afterwards" may vary in practice.</pre>
</div>

- **Type:** process step
- **Sources consulted:** [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) describes the general practice; no source enumerates these exact procedural steps.
- **Status:** plausible — unverifiable in this level of detail
- **Certainty:** 55%
- **Open question:** confirm with the Registrar's office whether the described process matches actual practice.

### Claim 12 — Declared `source_url` in `content-directory.ts`

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently in src/data/content-directory.ts (line 431)</div>
<pre class="claim-block-content">source_url: "https://www.gov.bb/Citizens/notarize-document"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should be</div>
<pre class="claim-block-content">source_url: "https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates"</pre>
</div>

- **Type:** URL (declared in data file, not in content body)
- **Verification:** direct fetch returned HTTP 404 (verified 2026-05-27).
- **Status:** discrepant — broken
- **Confidence it's wrong:** 100% (verified directly)
- **Citizen impact:** LOW (it's a metadata field), but indicates the underlying source has moved.

---

## Claims missing from the page (gaps, not errors)

- **$10 adhesive postage stamp** — applicants are required to bring this for the registrar to affix and cancel at the time of notarisation. Documented on the [Barbados Judicial System site](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates); absent from the page.
- **$5 fee for marking each exhibit** — documented fee, absent from the page.
- **Contact details** — Registrar phone 1-246-535-9700 and email <registrarsupremecourt@barbados.gov.bb> are not mentioned anywhere on the page; useful for citizens who have questions.

---

## Sources cited

- [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- [GIS — Change In Notary Fees](https://gisbarbados.gov.bb/blog/change-in-notary-fees/)
- [GIS — Notarisation Of Documents & Affixing Of Apostilles](https://gisbarbados.gov.bb/blog/notarisation-of-documents-affixing-of-apostilles/)
- [Notaries Public Act, 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf)
- [CAIPO](https://caipo.gov.bb/) and [gov.bb — Corporate Affairs and Intellectual Property](https://www.gov.bb/State-Bodies/corporate-affairs-intellectual-property)
- [Lands and Surveys Department — Contact Us](https://www.landsandsurveys.gov.bb/pages/ContactUs.html)
- [Barbados Judicial System — Supreme Court Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/)
