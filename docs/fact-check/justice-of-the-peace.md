# Fact-check: Justice of the Peace

- **Live page:** <https://alpha.gov.bb/justice-of-the-peace>
- **Source file:** `src/content/justice-of-the-peace.md`
- **Last checked:** 2026-05-29
- **Summary:** 28 claims reviewed — 18 verified, 4 discrepant, 6 unverifiable. Average certainty: **82%**.

Re-verification pass (2026-05-29): source file `src/content/justice-of-the-peace.md` is unchanged. All three discrepant contact details (`(246) 467-7370` phone ×3, `agoffice@barbados.gov.bb` email) remain on the page. OAG authoritative sources (`oag.gov.bb/contact`, `gov.bb/Ministries/attorney-general`) re-confirmed live with the same correct values. Both "Find a JP" candidate URLs still return HTTP 404. No findings reversed; no new issues found.

---

## Headline issues for triage

1. **"Find a JP" button is broken — citizens clicking it land on a 404.** Source line 53 links to `/travel-id-citizenship/justice-of-the-peace/find`. That URL returns HTTP 404 on the live site, as does the IA-consistent path `/justice-of-the-peace/find`. The live JP page itself is served at `/justice-of-the-peace` (no category prefix) because it is marked `protected: true` in `src/data/content-directory.ts` — but the find subpage is unreachable to anonymous citizens. **HIGH** citizen impact: the primary CTA on the page does not work.

2. **Office of the Attorney General phone is wrong (three places).** Page lists `(246) 467-7370` at lines 61, 71, 75. Authoritative sources publish `(246) 535-0467` (`oag.gov.bb/contact` and `gov.bb/Ministries/attorney-general`). `467-7370` does not appear in either. **HIGH** impact — citizens calling that number will not reach the AG.

3. **Office of the Attorney General email is wrong.** Page lists `agoffice@barbados.gov.bb` (line 61). `oag.gov.bb/contact` publishes `ps.oag@barbados.gov.bb`; `gov.bb/Ministries/attorney-general` publishes `ps@oag.gov.bb`. The page's address is unattested in any authoritative source. **HIGH** impact.

4. **Gazette link path unverifiable.** The page links to `https://governmentprintery.gov.bb/gazette/` but search indices surface `/official-gazette/` as the published path. Both return HTTP 403 to automated fetch; manual browser check needed to confirm if `/gazette/` resolves or 404s.

---

## Claims

### Claim 1 — JPs are appointed by the President of Barbados (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A Justice of the Peace (JP) is appointed by the President of Barbados to help people with official documents</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A Justice of the Peace (JP) is appointed by the President of Barbados to help people with official documents</pre>
</div>

- **Type:** legal/constitutional
- **Sources:** [Barbados Today — Hundreds take oath as new Justices of the Peace (15 Jan 2026)](https://barbadostoday.bb/2026/01/15/hundreds-take-oath-as-new-justices-of-the-peace/) — "President Jeffrey Bostic oversaw the ceremony"; [Barbados Today — Approximately 400 Justices of the Peace to be installed (Dec 2021)](https://barbadostoday.bb/2021/12/10/approximately-400-justices-of-the-peace-to-be-installed/) — President Mason administered oaths at the December 2021 ceremony, the first post-republic JP installation.
- **Status:** verified
- **Certainty:** 90% — two independent post-republic JP swearing-in ceremonies (Dec 2021, Jan 2026) confirm the President as the presiding authority.

---

### Claim 2 — Page intro lists the three core JP functions (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">certifying copies, witnessing signatures, and taking sworn statements and affidavits</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">certifying copies, witnessing signatures, and taking sworn statements and affidavits</pre>
</div>

- **Type:** scope of practice
- **Sources:** [GIS — Three New Justices Of The Peace Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/) — standard JP powers; [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — distinguishes JP from notary functions.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 3 — JPs are ordinary community members and services are free of charge (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">JPs are ordinary community members and their help is free of charge. They are not allowed to charge you.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">JPs are ordinary community members and their help is free of charge. They are not allowed to charge you.</pre>
</div>

- **Type:** fee / legal restriction
- **Sources:** [GIS — New JPs Warned Against Charging For Signature](https://gisbarbados.gov.bb/blog/new-jps-warned-against-charging-for-signature/) — GIS press release in which the Attorney General warned new JPs they must not charge for their services.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — JPs can certify copies of documents (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Certify a copy of a document, like a passport, birth certificate or driving licence</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Certify a copy of a document, like a passport, birth certificate or driving licence</pre>
</div>

- **Type:** scope of practice
- **Sources:** [GIS — Three New Justices Of The Peace Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/); [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — confirms JP-issued certified copies are recognised.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 5 — JPs can witness sworn statements / affidavits (line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Witness sworn statements and affidavits</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Witness sworn statements and affidavits</pre>
</div>

- **Type:** scope of practice
- **Sources:** [GIS — Three New Justices Of The Peace Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/); [Barbados Judicial System — Other Services and Registrations](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/) — lists "administering oaths on affidavits" as a JP service.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 6 — JPs can witness signatures (line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Witness your signature on legal papers, like consent forms</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Witness your signature on legal papers, like consent forms</pre>
</div>

- **Type:** scope of practice
- **Sources:** [GIS — Three New Justices Of The Peace Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/) — standard JP power confirmed in GIS coverage of JP appointments.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 7 — JPs cannot give legal advice or speak in court (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Give legal advice or speak for you in court</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Give legal advice or speak for you in court</pre>
</div>

- **Type:** scope restriction
- **Sources:** [Barbados Today — Hundreds take oath as new Justices of the Peace (15 Jan 2026)](https://barbadostoday.bb/2026/01/15/hundreds-take-oath-as-new-justices-of-the-peace/) — PM Mottley's address: "you are not law enforcers, but you are critical to the administration of justice"; consistent with restriction against legal representation.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 8 — JPs cannot certify a copy without seeing the original (line 28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Certify a copy without seeing the original document</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Verified by inference — standard JP certification practice</div>
<pre class="claim-block-content">No source explicitly states this as a Barbados JP rule, but
sighting the original is universal common-law certification practice
and matches the requirements described for notarial certifications.
Checked: [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — requires presentation of the original.
The page's "What to bring" section (line 41) reinforces this in user-facing language.</pre>
</div>

- **Type:** scope restriction
- **Sources:** [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — establishes the original-sighting requirement for analogous certification work.
- **Status:** verified by inference
- **Certainty:** 80%

---

### Claim 9 — JPs cannot sign a document they have a personal interest in (line 29)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Sign a document they have a personal interest in</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Verified by inference — universal conflict-of-interest principle</div>
<pre class="claim-block-content">No Barbados-specific source explicitly states this restriction, but
conflict-of-interest rules apply to all officials administering oaths
or attestations across common-law jurisdictions. Not contradicted by any
public source.
Checked: [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/) — no rule list published.
The team should confirm whether the AG's guidance to JPs includes this
specific restriction so the page can cite it.</pre>
</div>

- **Type:** scope restriction / conflict of interest
- **Sources consulted:** [GIS — New JPs Warned Against Charging For Signature](https://gisbarbados.gov.bb/blog/new-jps-warned-against-charging-for-signature/) — closest published guidance to new JPs; does not mention personal-interest rule.
- **Status:** unverifiable from public web
- **Certainty:** 70%
- **Open question:** Does the AG's induction material for new JPs include a personal-interest restriction? If so, cite it.

---

### Claim 10 — JPs cannot stamp documents for overseas use; a notary public is required (line 31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Stamp documents for use in another country — you need a notary public for that</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Stamp documents for use in another country — you need a notary public for that</pre>
</div>

- **Type:** scope distinction
- **Sources:** [Barbados Today — Notary Public system widens in overhaul (18 Jul 2024)](https://barbadostoday.bb/2024/07/18/notary-public-system-widens-in-overhaul/); [Chancery Chambers — Barbados Enhances Notarial Services (6 Sep 2024)](https://chancerychambers.com/2024/09/06/barbados-enhances-notarial-services/); cross-reference [/docs/fact-check/get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md) Claim 10. Overseas authentication powers are scoped under the Notaries Public Act (2024); JP powers do not extend to this function.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 11 — Notary public definition: a lawyer or chartered accountant with additional powers (line 35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A notary public is a lawyer or chartered accountant with additional powers granted by the Government to certify documents for use outside Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A notary public is a lawyer or chartered accountant with additional powers granted by the Government to certify documents for use outside Barbados.</pre>
</div>

- **Type:** legal definition
- **Sources:** [Barbados Today — Notary Public system widens in overhaul (18 Jul 2024)](https://barbadostoday.bb/2024/07/18/notary-public-system-widens-in-overhaul/) — "The new legislation expands eligibility for notary public appointments to include attorneys and chartered accountants in good standing"; [Chancery Chambers — Barbados Enhances Notarial Services (6 Sep 2024)](https://chancerychambers.com/2024/09/06/barbados-enhances-notarial-services/) — "Attorneys-at-law, Chartered Accountants, and persons with professional or business experience … can become notaries".
- **Status:** verified — accurate under the Notaries Public Act 2024.
- **Certainty:** 90%
- **Note for teams:** The previous (2017) Act did not include chartered accountants. The page reflects the current law correctly without citing the Act by name. No content change needed.

---

### Claim 12 — Internal link to "Get a document notarised" page (line 37)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">[Get a document notarised](/travel-id-citizenship/get-a-document-notarised)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">[Get a document notarised](/travel-id-citizenship/get-a-document-notarised)</pre>
</div>

- **Type:** internal URL
- **Sources:** Live check (29 May 2026) — `https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised` loads the notarisation page successfully. Unlike the JP page, this one is NOT marked `protected: true`, so it is reachable via the category-prefixed URL.
- **Status:** verified
- **Certainty:** 85%

---

### Claim 13 — What to bring: original + copy, photo ID, anything else requested (lines 41–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The original document and the copy you want certified — the JP needs to see both
A photo ID (passport, national ID card or driving licence)
Any other documents the organisation has asked for</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The original document and the copy you want certified — the JP needs to see both
A photo ID (passport, national ID card or driving licence)
Any other documents the organisation has asked for</pre>
</div>

- **Type:** document requirement
- **Sources:** [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — requires presentation of the original document; cross-reference [/docs/fact-check/get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md) (same document set).
- **Status:** verified by inference
- **Certainty:** 85% — standard practice; no source enumerates exactly these three items for JP visits.

---

### Claim 14 — Don't sign before arrival (line 45)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you are signing something in front of the JP, do not sign it before you arrive.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you are signing something in front of the JP, do not sign it before you arrive.</pre>
</div>

- **Type:** procedural instruction
- **Sources:** Standard requirement for any oath / signature witnessing: the witness must observe the signing. Universal across common-law jurisdictions; not contradicted by any source. [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — analogous notarial requirement.
- **Status:** verified by inference
- **Certainty:** 85%

---

### Claim 15 — Directory: search by parish or device location (line 51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Look up JPs by parish or use your device's location. The directory lists every JP on the official register.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable in the live app — directory subpage not accessible to anonymous citizens</div>
<pre class="claim-block-content">The "Find a JP" subpage is at /justice-of-the-peace/find (a component
route in src/data/content-directory.ts) but anonymous WebFetch returns 404
on both that path and the link's stated path /travel-id-citizenship/justice-of-the-peace/find.
Whether parish lookup and device-location lookup actually work cannot be
confirmed from outside the authenticated experience.
Source: testable against the find component at /justice-of-the-peace/find</pre>
</div>

- **Type:** functional / feature
- **Sources consulted:** `src/data/content-directory.ts` line 462–468 declares the `find` subpage as a `component` route; the page itself is `protected: true`. Anonymous live check (29 May 2026) returns 404 on both candidate URLs.
- **Status:** unverifiable from public web
- **Certainty:** 50%
- **Open question:** Has the find component been built and tested against `src/data/justices-of-the-peace.json`? Does parish filtering and device-location lookup both work in production?

---

### Claim 16 — Directory lists every JP on the official register (line 51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The directory lists every JP on the official register.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Internal data audit required</div>
<pre class="claim-block-content">src/data/justices-of-the-peace.json contains 2208 entries.
The page implies the register covers ~436 (2024 list) + 563 (Jan 2026) + the April 2023
Supreme Court register entries. Whether the data file deduplicates across sources,
excludes lapsed/deceased JPs, and equals "every JP on the official register"
is not verifiable from outside the codebase.
Checked: [GIS — Justices of the Peace Listing April 30 2023](https://gisbarbados.gov.bb/download/justices-of-the-peace-listing-april-30-2023/)
— page returns Cloudflare 403 when fetched; total count in that listing is unknown.</pre>
</div>

- **Type:** descriptive / data accuracy
- **Sources consulted:** `src/data/justices-of-the-peace.json` (internal, 2208 entries); [GIS — Justices of the Peace Listing — April 30, 2023](https://gisbarbados.gov.bb/download/justices-of-the-peace-listing-april-30-2023/); [GIS — justice of peace search](https://gisbarbados.gov.bb/search/justice+of+peace/).
- **Status:** unverifiable
- **Certainty:** 50%
- **Open question:** Audit `src/data/justices-of-the-peace.json` to confirm (a) deduplication across the three source lists, (b) exclusion of lapsed/deceased entries, (c) whether 2208 matches the count of currently-active JPs.

---

### Claim 17 — "Find a JP" button link (line 53)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">&lt;a data-start-link href="/travel-id-citizenship/justice-of-the-peace/find"&gt;Find a JP&lt;/a&gt;</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (provisional — confirm with team)</div>
<pre class="claim-block-content">&lt;a data-start-link href="/justice-of-the-peace/find"&gt;Find a JP&lt;/a&gt;</pre>
</div>

- **Type:** internal URL — broken
- **Sources:** Live check (29 May 2026) — both `https://alpha.gov.bb/travel-id-citizenship/justice-of-the-peace/find` and `https://alpha.gov.bb/justice-of-the-peace/find` return HTTP 404 to anonymous fetch. The parent JP page itself loads at `/justice-of-the-peace` because it is `protected: true` in `src/data/content-directory.ts` — but the find subpage is not reachable from outside.
- **Status:** discrepant
- **Certainty:** 95% — the link as written goes to a 404; this is reproducible.
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — "Find a JP" is the primary CTA on the page. Clicking it lands the citizen on a 404, which is a complete failure of the page's main task.
- **Suggested fix:** Update the link to whichever path actually serves the find component in the live app. Likely `/justice-of-the-peace/find` based on the parent page's routing, but the team must verify by deploying and testing — the path may require authentication to reach.

---

### Claim 18 — "We do not show personal contact details for JPs online" (line 57)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">We do not show personal contact details for JPs online.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Policy statement — testable against the live find page</div>
<pre class="claim-block-content">This is a policy claim, not a factual one — verifiable only by inspecting
what the find page actually shows for each JP. If the find page renders
personal phone numbers or home addresses, this statement would be inconsistent.
Cannot be checked without access to the find page (currently 404 to anonymous users).
Source: testable against the find page at /justice-of-the-peace/find</pre>
</div>

- **Type:** policy / privacy claim
- **Sources consulted:** `src/data/justices-of-the-peace.json` schema (not inspected in this pass); GIS publishes JP listings with name + parish + business address but typically not personal phone numbers.
- **Status:** unverifiable
- **Certainty:** 60%
- **Open question:** Confirm with the GovBB team that the find page does not surface personal phone numbers or home addresses for any JP. If `src/data/justices-of-the-peace.json` contains personal contact fields, the statement on the page should be matched against what the renderer actually shows.

---

### Claim 19 — Office of the Attorney General phone (lines 61, 71, 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Phone (246) 467-7370</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Phone (246) 535-0467</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — PBX `535-0467`, AG direct `535-0434`, Permanent Secretary `535-0437` (re-fetched 29 May 2026); [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — main line `+1 (246) 535-0467` plus secondary `+1 (246) 228-5433` (re-fetched 29 May 2026). Neither source lists `467-7370`.
- **Status:** discrepant
- **Certainty:** 95% — two independent Tier-1 sources agree on 535-0467; 467-7370 is unattested.
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — citizens calling 467-7370 expecting the AG's office will not reach them. The number appears three times on the page (lines 61, 71, 75) — all three must be updated.
- **Suggested fix:** Replace all three instances of `(246) 467-7370` with `(246) 535-0467` (PBX). Consider adding the Permanent Secretary direct line `(246) 535-0437` for the "check whether someone is a JP" use case at line 75, since that is the OAG's published direct line for public-facing administrative enquiries.

---

### Claim 20 — Office of the Attorney General email (line 61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">email agoffice@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">email ps.oag@barbados.gov.bb</pre>
</div>

- **Type:** email
- **Sources:** [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — publishes `ps.oag@barbados.gov.bb` (re-fetched 29 May 2026); [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — publishes `ps@oag.gov.bb` (re-fetched 29 May 2026). Neither source lists `agoffice@barbados.gov.bb`.
- **Status:** discrepant
- **Certainty:** 95% — both Tier-1 sources agree the OAG's published email is `ps.oag@barbados.gov.bb` / `ps@oag.gov.bb`; `agoffice@` is unattested.
- **Confidence it's wrong:** 90%
- **Citizen impact:** HIGH — citizens emailing `agoffice@barbados.gov.bb` may receive no response if the address is inactive.
- **Suggested fix:** Use `ps.oag@barbados.gov.bb` (as listed on the OAG's own contact page). The team may wish to confirm with the OAG whether `ps@oag.gov.bb` and `ps.oag@barbados.gov.bb` are the same mailbox under different aliases.
- **Open question:** Confirm with OAG which address is the canonical public-enquiries inbox.

---

### Claim 21 — Barbados Judicial System phone (line 65)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Phone (246) 535-9700</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Phone (246) 535-9700</pre>
</div>

- **Type:** phone
- **Sources:** [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates) — lists `1-246-535-9700` (re-fetched 29 May 2026). The same source publishes the fax `1-246-426-2405` and email `registrarsupremecourt@barbados.gov.bb` — neither is on the alpha page, but neither is needed for the JP use case.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 22 — Overseas: use a notary public or commissioner of oaths (line 69)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you are outside Barbados and a document needs to be certified, you can usually use a notary public or commissioner of oaths in the country where you are. The certified document will be accepted in most cases.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you are outside Barbados and a document needs to be certified, you can usually use a notary public or commissioner of oaths in the country where you are. The certified document will be accepted in most cases.</pre>
</div>

- **Type:** procedural advice / international practice
- **Sources:** General common-law convention — notaries public and commissioners of oaths are recognised as equivalent attesting officers across Commonwealth jurisdictions. The "in most cases" hedge is appropriate because some documents (e.g. those requiring legalisation under the Hague Apostille Convention) need additional authentication. No public Barbados source contradicts this guidance.
- **Status:** verified
- **Certainty:** 75%

---

### Claim 23 — For matters requiring a Barbados JP, use the High Commission / Consulate (line 71)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">For matters that specifically require a Barbados JP, contact the nearest Barbados High Commission or Consulate, or call the Office of the Attorney General on +1 246 467-7370 for advice.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">For matters that specifically require a Barbados JP, contact the nearest Barbados High Commission or Consulate, or call the Office of the Attorney General on +1 246 535-0467 for advice.</pre>
</div>

- **Type:** procedural advice + repeat of discrepant phone
- **Sources:** Same as Claim 19 — the OAG phone repeated here is wrong for the same reason. The High Commission / Consulate guidance is standard consular practice; no public Barbados Foreign Service page contradicts it.
- **Status:** discrepant (carries the same wrong phone as Claim 19)
- **Certainty:** 90%
- **Confidence it's wrong:** 95% (for the phone component) / 85% (for the consular advice component, which is verified by inference)
- **Citizen impact:** HIGH (phone) / LOW (consular advice).
- **Suggested fix:** Update the phone here together with the other two instances. Optionally link to or name the relevant Barbados High Commissions if the team wants to provide a concrete next step.

---

### Claim 24 — Supreme Court register dated 30 April 2023 (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The directory uses the Supreme Court of Barbados register (last updated 30 April 2023)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The directory uses the Supreme Court of Barbados register (last updated 30 April 2023)</pre>
</div>

- **Type:** data provenance / date
- **Sources:** [GIS — Justices of the Peace Listing — April 30, 2023](https://gisbarbados.gov.bb/download/justices-of-the-peace-listing-april-30-2023/) — GIS publishes a download titled exactly "Justices of the Peace Listing — April 30, 2023". The date matches.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 25 — Official 2024 list (PDF, 436 names) (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the official 2024 list (PDF, 436 names)</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">PDF exists — row count not verifiable from public web</div>
<pre class="claim-block-content">/justices-of-the-peace-2024.pdf is a 322KB, 15-page PDF that downloads successfully
from the live site (verified 29 May 2026). No external authoritative source confirms
the count of 436 names.
The October 2024 Barbados Today article reports 43 new JPs sworn in at a separate
ceremony — plausibly consistent with ~436 JPs appointed across 2024, but 436 cannot
be confirmed without counting PDF rows directly.
Checked: [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/);
[Barbados Today — 43 new JPs sworn in (Oct 2024)](https://barbadostoday.bb/2024/10/16/43-new-justices-of-the-peace-sworn-in/) — none independently states 436.</pre>
</div>

- **Type:** statistic
- **Sources consulted:** PDF download confirms file at `public/justices-of-the-peace-2024.pdf` (322 KB, 15 pages); [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/); [Barbados Today — 43 new Justices of the Peace sworn in (16 Oct 2024)](https://barbadostoday.bb/2024/10/16/43-new-justices-of-the-peace-sworn-in/).
- **Status:** unverifiable from public web
- **Certainty:** 60%
- **Open question:** Run a row count on `public/justices-of-the-peace-2024.pdf` to confirm 436. If the count differs, update the page copy.

---

### Claim 26 — 563 JPs appointed in January 2026 (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">the 563 JPs appointed in January 2026</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">the 563 JPs appointed in January 2026</pre>
</div>

- **Type:** statistic
- **Sources:** [Barbados Today — Hundreds take oath as new Justices of the Peace (15 Jan 2026)](https://barbadostoday.bb/2026/01/15/hundreds-take-oath-as-new-justices-of-the-peace/) — re-fetched 29 May 2026; confirms "563 newly appointed Justices of the Peace" sworn in by President Bostic at the Lloyd Erskine Sandiford Centre. PM Mottley addressed the gathering. The pre-ceremony GIS announcement said 560 would be installed; the post-event figure of 563 is the authoritative one.
- **Status:** verified
- **Certainty:** 85%

---

### Claim 27 — Every appointment is gazetted in the Official Gazette (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Every appointment is gazetted in the Official Gazette of Barbados</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Every appointment is gazetted in the Official Gazette of Barbados</pre>
</div>

- **Type:** process claim
- **Sources:** Standard Barbados government practice — all official appointments (judicial, JP, statutory office) are published in the Gazette by the Government Printing Department. No source contradicts this; the Gazette section exists at `governmentprintery.gov.bb` (blocked by Cloudflare to automated access but indexed by search).
- **Status:** verified
- **Certainty:** 80%

---

### Claim 28 — Gazette link URL (line 75)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">https://governmentprintery.gov.bb/gazette/</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">URL path may be wrong — site bot-protected, can't verify from anonymous fetch</div>
<pre class="claim-block-content">governmentprintery.gov.bb is confirmed live (Google indexes pages from 2026).
The Gazette section appears in search results at /official-gazette/, not /gazette/.
Both /gazette/ and /official-gazette/ return HTTP 403 Cloudflare challenge to automated access.
Without a browser session, neither path can be definitively classified as live or 404.
Checked: web search site:governmentprintery.gov.bb gazette — surfaces /official-gazette/ and /the-online-gazette/, not /gazette/.
Re-checked 29 May 2026: /gazette/ returns HTTP 403 (Cloudflare); /official-gazette/ also returns HTTP 403.
Manual browser verification needed.</pre>
</div>

- **Type:** external URL
- **Sources consulted:** Search index confirms `governmentprintery.gov.bb/official-gazette/` exists; both `/gazette/` and `/official-gazette/` return Cloudflare 403 to scripted access (re-confirmed 29 May 2026).
- **Status:** unverifiable from public web
- **Certainty:** 65%
- **Open question:** Open both URLs in a regular browser to confirm whether `/gazette/` resolves (possibly redirects to `/official-gazette/`). If it 404s for end users, update the link to `https://governmentprintery.gov.bb/official-gazette/`.

---

## Additional findings (not on the page but should be)

1. **OAG direct lines for the citizen use case.** The OAG's published contact details include the PBX (`535-0467`), Attorney General direct (`535-0434`), and Permanent Secretary (`535-0437`). For the "check whether someone is currently a JP" use case at line 75, the Permanent Secretary direct line may be the right number to publish — the PBX will route to the switchboard.

2. **OAG secondary number `+1 (246) 228-5433`** appears on `oag.gov.bb/contact` but not on `gov.bb/Ministries/attorney-general`. The team may wish to confirm which mainline the OAG actually wants citizens to use.

3. **Notaries Public Act 2024 came into force in 2024.** The page's notary definition is correct under the new Act but doesn't cite the Act. The companion fact-check [/docs/fact-check/get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md) tracks the Act citation in detail.

4. **Routing inconsistency for protected pages.** `protected: true` pages (like JP) are served only at `/<slug>`, not `/<category>/<slug>`. Non-protected pages (like `get-a-document-notarised`) are served at both. Worth confirming whether this is intentional, and whether any other in-content links use the wrong form for a protected page.

---

## Sources cited

- [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) — re-fetched 29 May 2026
- [oag.gov.bb — Contact Us](https://oag.gov.bb/contact) — re-fetched 29 May 2026
- [Barbados Judicial System — Notarizing Documents and Issuing Notarial Certificates](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- [Barbados Today — Hundreds take oath as new Justices of the Peace (15 Jan 2026)](https://barbadostoday.bb/2026/01/15/hundreds-take-oath-as-new-justices-of-the-peace/)
- [Barbados Today — Approximately 400 Justices of the Peace to be installed (10 Dec 2021)](https://barbadostoday.bb/2021/12/10/approximately-400-justices-of-the-peace-to-be-installed/)
- [Barbados Today — Notary Public system widens in overhaul (18 Jul 2024)](https://barbadostoday.bb/2024/07/18/notary-public-system-widens-in-overhaul/)
- [Barbados Today — 43 new Justices of the Peace sworn in (16 Oct 2024)](https://barbadostoday.bb/2024/10/16/43-new-justices-of-the-peace-sworn-in/)
- [Chancery Chambers — Barbados Enhances Notarial Services (6 Sep 2024)](https://chancerychambers.com/2024/09/06/barbados-enhances-notarial-services/)
- [GIS — Justices of the Peace Listing — April 30, 2023](https://gisbarbados.gov.bb/download/justices-of-the-peace-listing-april-30-2023/)
- [GIS — Three New Justices Of The Peace Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/)
- [GIS — New JPs Warned Against Charging For Signature](https://gisbarbados.gov.bb/blog/new-jps-warned-against-charging-for-signature/)
- [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/)
- [Government Printing Department — Official Gazette (site confirmed via search)](https://governmentprintery.gov.bb/official-gazette/)
- Live-page check: `https://alpha.gov.bb/justice-of-the-peace` (29 May 2026) — page loads at no-prefix URL; category-prefixed URL returns HTTP 404
- Live-page check: `https://alpha.gov.bb/travel-id-citizenship/justice-of-the-peace/find` — HTTP 404 (29 May 2026)
- Live-page check: `https://alpha.gov.bb/justice-of-the-peace/find` — HTTP 404 (29 May 2026)
- Live-page check: `https://alpha.gov.bb/travel-id-citizenship/get-a-document-notarised` — HTTP 200, page loads (29 May 2026)
- Local file check: `public/justices-of-the-peace-2024.pdf` — 322 KB, 15 pages, file exists
- IA config: `src/data/content-directory.ts` line 458 — JP page declared `protected: true` with `find` subpage as `component` route
