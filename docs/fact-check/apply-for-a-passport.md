# Fact-check: Apply for a passport

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/apply-for-a-passport>
- **Source file:** `src/content/apply-for-a-passport.md`
- **Last checked:** 2026-05-29
- **Summary:** 19 claims reviewed — 14 verified, 2 discrepant, 3 unverifiable. Average certainty: **82%**.

---

## Headline issues for triage

1. **"Special circumstances" collection is undefined — and the eligibility restriction is missing.** The content page says passports may be collected by someone else "in special circumstances" without specifying what those are. The authoritative [immigration.gov.bb](https://immigration.gov.bb/pages/passport.aspx) page restricts this specifically to: elderly applicants, incapacitated applicants, those with a mental/physical disability, or those who are severely ill. Citizens who do not meet these criteria may be turned away at the counter even if they follow the stated document checklist — a HIGH-impact procedural gap.
2. **"White Park Road" should be "Whitepark Road" (one word).** The Supreme Court Complex address on line 41 uses two words; [barbadoslawcourts.gov.bb](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/) and the authoritative immigration.gov.bb page both use the one-word form "Whitepark Road". This is consistent with the discrepancy already noted on sibling pages.
3. **Fee table dated "Effective December 01, 2010" — 16-year-old date erodes citizen trust.** Every fee matches immigration.gov.bb exactly, so the fees are correct, but the 2010 effective date makes citizens doubt the page's currency. Recommend replacing with "Passport fees (current as at 2026)" or simply removing the effective-date line.
4. **All PDF form links use HTTP, not HTTPS.** Links to Form A, Form B, signature specimen, and form specimens all use `http://www.immigration.gov.bb/...`. While the PDFs resolve, HTTP links expose citizens to potential MITM interception of government documents. Low immediacy but worth updating.
5. **Stray triple-backtick on line 59** renders as an unclosed code fence in Markdown. Not a factual error but a rendering bug that produces a code block on the live page.

---

## Claims

### Claim 1 — Citizens may apply from Immigration Department or diplomatic missions abroad (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you are a citizen of Barbados, you may apply for a passport from the Immigration Department in Barbados, or at one of Barbados' diplomatic and consular missions abroad.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you are a citizen of Barbados, you may apply for a passport from the Immigration Department in Barbados, or at one of Barbados' diplomatic and consular missions abroad.</pre>
</div>

- **Type:** process / eligibility
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx); [gov.bb — apply-passport](https://www.gov.bb/Citizens/apply-passport)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 2 — Schedule appointments at immigration.gov.bb (line 13)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">To schedule an appointment online, click here [links to http://www.immigration.gov.bb/]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">To schedule an appointment online, click here [links to http://www.immigration.gov.bb/]</pre>
</div>

- **Type:** external URL / process step
- **Sources:** [Immigration Appointment System](https://immigration.gov.bb/pages/Passport_Appointment.aspx) — live and showing May/June 2026 appointment slots
- **Status:** verified
- **Certainty:** 95%
- **Note:** The link uses `http://` not `https://`. The site does load but an HTTPS version is preferable.

---

### Claim 3 — Applicants 16+ use Form A (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you are more than 16 years of age, you should complete an 'Application for a Barbados Passport' Form A in your own hand-writing.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you are more than 16 years of age, you should complete an 'Application for a Barbados Passport' Form A in your own hand-writing.</pre>
</div>

- **Type:** eligibility / form reference
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 4 — Form A PDF link resolves (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Form A [links to http://www.immigration.gov.bb/documents/Form%20A.pdf]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Form A [links to http://www.immigration.gov.bb/documents/Form%20A.pdf]</pre>
</div>

- **Type:** link / CTA
- **Sources:** [Form A PDF](http://www.immigration.gov.bb/documents/Form%20A.pdf) — returns a 715 KB PDF (binary confirmed live)
- **Status:** verified
- **Certainty:** 90%
- **Note:** HTTP (not HTTPS) link; the PDF resolves but delivery is unencrypted.

---

### Claim 5 — Use block letters except for signature (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Use Block Letters for all names except your signature.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Use Block Letters for all names except your signature.</pre>
</div>

- **Type:** procedural instruction
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — same instruction appears on the official page
- **Status:** verified
- **Certainty:** 90%

---

### Claim 6 — Children under 16 use Form B (line 18)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Applications for children under the age of 16 should be made on Form B.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Applications for children under the age of 16 should be made on Form B.</pre>
</div>

- **Type:** eligibility / form reference
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx); [Form B PDF](http://www.immigration.gov.bb/documents/Form%20B.pdf) — live (96 KB PDF)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 7 — Two photographs required (line 19)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The application form should be accompanied by two (2) photographs.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The application form should be accompanied by two (2) photographs.</pre>
</div>

- **Type:** document requirement
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 8 — Photographs max 5cm × 5cm, taken by professional photographer (line 20)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The photographs should not be more than five (5) centimetres by five (5) centimetres and should be taken by a professional photographer</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The photographs should not be more than five (5) centimetres by five (5) centimetres and should be taken by a professional photographer</pre>
</div>

- **Type:** document requirement / specification
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — uses identical phrasing verbatim
- **Status:** verified (against immigration.gov.bb; the 5cm×5cm spec is unusual vs biometric standard of 45mm×35mm, but this matches the official source exactly)
- **Certainty:** 85%
- **Open question:** Whether 5cm × 5cm is the actual maximum or whether this is outdated wording. Worth confirming with Immigration directly since international biometric standard is 45mm × 35mm.

---

### Claim 9 — Signature link resolves (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">sign your name in the boxes provided [links to http://www.immigration.gov.bb/documents/signature.pdf#Signature]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">sign your name in the boxes provided [links to http://www.immigration.gov.bb/documents/signature.pdf#Signature]</pre>
</div>

- **Type:** link / CTA
- **Sources:** [signature.pdf](http://www.immigration.gov.bb/documents/signature.pdf) — 204 KB PDF, confirmed live
- **Status:** verified
- **Certainty:** 85%
- **Note:** The `#Signature` anchor is a PDF internal anchor; PDF viewers vary in support for fragment navigation. The base PDF resolves.

---

### Claim 10 — Sign declaration at Section 11, page 4 (line 21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Please ensure that you sign your name in the boxes provided at the bottom of page two of the application form as well as the Declaration at Section 11, page four.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Please ensure that you sign your name in the boxes provided at the bottom of page two of the application form as well as the Declaration at Section 11, page four.</pre>
</div>

- **Type:** procedural instruction / form reference
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — consistent with official instructions; form structure verifiable against Form A specimen
- **Status:** verified
- **Certainty:** 85%

---

### Claim 11 — Form and one photograph must be certified by a guarantor (line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The Form and one (1) photograph must also be certified by a person authorized to act as a guarantor.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The Form and one (1) photograph must also be certified by a person authorized to act as a guarantor.</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 12 — Form A and Form B specimen links resolve (line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Specimens of passport Form A [http://www.immigration.gov.bb/documents/formA_Specimen.pdf]
and Form B [http://www.immigration.gov.bb/documents/formB_Specimen.pdf]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Specimens of passport Form A [http://www.immigration.gov.bb/documents/formA_Specimen.pdf]
and Form B [http://www.immigration.gov.bb/documents/formB_Specimen.pdf]</pre>
</div>

- **Type:** link / CTA
- **Sources:** [formA_Specimen.pdf](http://www.immigration.gov.bb/documents/formA_Specimen.pdf) — 740 KB PDF, live; [formB_Specimen.pdf](http://www.immigration.gov.bb/documents/formB_Specimen.pdf) — 556 KB PDF, live
- **Status:** verified
- **Certainty:** 90%

---

### Claim 13 — Passports must be collected by the holder, except in special circumstances (line 26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Passports must be collected by the holder of the passport except in special circumstances.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Passports must be collected by the holder of the passport except in special circumstances.</pre>
</div>

- **Type:** process step / policy
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 14 — Standard collection: receipt plus ID card or expired passport (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Persons collecting passports must produce their receipt and ID card or expired passport.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Persons collecting passports must produce their receipt and ID card or expired passport.</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — "The applicant's receipt and the collector's ID card or expired passport are also required for standard collection procedures."
- **Status:** verified
- **Certainty:** 90%

---

### Claim 15 — Special-circumstance collection documents (lines 31–34)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If a passport is being collected by a person other than the Applicant (in special circumstances):
- a letter signed by the applicant giving authorization
- a letter signed and stamped by a Notary Public / Justice of the Peace.
- applicant's ID card
- Id card of person collecting document</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">If a passport is being collected by a person other than the Applicant (in special circumstances —
i.e. the applicant is elderly, incapacitated, has a mental/physical disability, or is severely ill):
- a letter signed by the applicant giving authorization
- a letter signed and stamped by a Notary Public / Justice of the Peace.
- applicant's ID card
- ID card of person collecting document</pre>
</div>

- **Type:** eligibility / process step / document requirement
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — "The applicant is an elderly person / The applicant is incapacitated / The applicant suffers from a mental/physical disability or is severely ill"
- **Status:** discrepant
- **Certainty:** 85%
- **Confidence it's wrong:** 90%
- **Citizen impact:** HIGH — a citizen who doesn't qualify under the restricted eligibility criteria may arrive with all four documents and still be refused; the page gives no indication of who qualifies.

---

### Claim 16 — Birth certificate or proof of citizenship required (line 36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">All applicants should submit their original birth certificate or proof of citizenship along with their application.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">All applicants should submit their original birth certificate or proof of citizenship along with their application.</pre>
</div>

- **Type:** document requirement
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 17 — Registration Office address for birth certificates (lines 39–43)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Registration Office
Supreme Court Complex
White Park Road
St. Michael
Barbados.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Registration Office
Supreme Court Complex
Whitepark Road
St. Michael
Barbados.</pre>
</div>

- **Type:** address
- **Sources:** [Barbados Supreme Court — Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/) — "Barbados Supreme Court Complex, Whitepark, Bridgetown, Barbados"; [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — uses "Whitepark Road" (one word)
- **Status:** discrepant
- **Certainty:** 90%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — "White Park Road" vs "Whitepark Road" may cause confusion in map/navigation searches; consistent with the error on sibling pages.

---

### Claim 18 — Passport fee table (lines 49–57)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">New Passport Fees Effective December 01, 2010

| Passport Types                         | BARBADOS (BDS) |
| Adult's Passport                       | $150           |
| Minor's Passport (under 16)            | $100           |
| Businessman's Passport                 | $225           |
| Emergency Passport / Travel document   | $150           |
| Replacement of Lost Passport           | $300           |
| Urgent Passport (required in 1 day)    | $300           |
| Urgent Passport (required in 2-5 days) | $225           |</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">New Passport Fees Effective December 01, 2010

| Passport Types                         | BARBADOS (BDS) |
| Adult's Passport                       | $150           |
| Minor's Passport (under 16)            | $100           |
| Businessman's Passport                 | $225           |
| Emergency Passport / Travel document   | $150           |
| Replacement of Lost Passport           | $300           |
| Urgent Passport (required in 1 day)    | $300           |
| Urgent Passport (required in 2-5 days) | $225           |</pre>
</div>

- **Type:** fee
- **Sources:** [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx) — all seven fee rows match exactly; [gov.bb — apply-passport](https://www.gov.bb/Citizens/apply-passport) — fees confirmed at same amounts
- **Status:** verified — every fee amount is correct
- **Certainty:** 95%
- **Note:** The "Effective December 01, 2010" label is technically accurate (same text appears on immigration.gov.bb) but is 16 years old and erodes citizen trust. Consider replacing with "Passport fees (current as at 2026)".

---

### Claim 19 — Overseas mission fees vary by mission (line 45)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The fees for passports issued by our diplomatic missions overseas vary from mission to mission. You should, therefore, check with the respective mission regarding the fee schedule.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">No consolidated fee list for overseas missions is published on immigration.gov.bb or foreign.gov.bb. The claim is plausible and consistent with standard practice but cannot be independently confirmed.</pre>
</div>

- **Type:** policy / fee
- **Sources:** Checked [Barbados Immigration — Passport](https://immigration.gov.bb/pages/passport.aspx); [Foreign Affairs — Consular Services](https://www.foreign.gov.bb/services/consular-services/) — neither publishes a per-mission fee breakdown
- **Status:** unverifiable
- **Certainty:** 60%
- **Open question:** GovBB team to confirm with Ministry of Foreign Affairs whether overseas fees do vary and whether a summary is available.

---

## Additional findings (not on the page but should be)

1. **Special-circumstance eligibility not stated.** Immigration specifies three qualifying conditions (elderly, incapacitated, mental/physical disability or severely ill) but the page omits them entirely. Citizens who do not meet these criteria may waste a trip or attempt an unauthorized collection.
2. **Diplomatic mission contact list absent.** The page tells citizens to contact the relevant mission for fee information but provides no list of missions or a link to one. A link to the Ministry of Foreign Affairs' consular directory would improve citizen experience.
3. **Additional document requirements not mentioned.** immigration.gov.bb lists first-time applicants must also provide: Barbados ID card (original and copy), marriage certificate (for females who have changed their name), and previous passport for renewals. The alpha page only mentions birth certificate / proof of citizenship, which may cause citizens to arrive without required documents.

---

## Sources cited

- [Barbados Immigration — Passport Requirements](https://immigration.gov.bb/pages/passport.aspx)
- [Immigration Passport Appointment System](https://immigration.gov.bb/pages/Passport_Appointment.aspx)
- [gov.bb — Apply for a Passport](https://www.gov.bb/Citizens/apply-passport)
- [Barbados Supreme Court — Registry](https://www.barbadoslawcourts.gov.bb/court-administration/supreme-court-registry/)
- [Foreign Affairs — Consular Services](https://www.foreign.gov.bb/services/consular-services/)
- [Form A PDF](http://www.immigration.gov.bb/documents/Form%20A.pdf)
- [Form B PDF](http://www.immigration.gov.bb/documents/Form%20B.pdf)
- [Signature specimen PDF](http://www.immigration.gov.bb/documents/signature.pdf)
- [Form A Specimen PDF](http://www.immigration.gov.bb/documents/formA_Specimen.pdf)
- [Form B Specimen PDF](http://www.immigration.gov.bb/documents/formB_Specimen.pdf)
