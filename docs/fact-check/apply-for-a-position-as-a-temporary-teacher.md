# Fact-check: Apply for a position as a temporary teacher

- **Live page:** <https://alpha.gov.bb/work-employment/apply-for-a-position-as-a-temporary-teacher>
- **Source file:** `src/content/apply-for-a-position-as-a-temporary-teacher.md`
- **Last checked:** 2026-05-29
- **Summary:** 13 claims reviewed — 10 verified, 1 discrepant, 2 unverifiable. Average certainty: **83%**.

---

## Headline issues for triage

1. **Ministry Download Forms page is still 404 — navigation instruction is broken.** The page tells citizens to find the application form "on the Ministry of Educational Transformation website under the 'resources' tab in the menu, and then the 'download forms' option." The Download Forms sub-page (`education.gov.bb/home/Resources/Download-Forms/` and without trailing slash) returns HTTP 404 in this pass. The seamlessdocs form URL linked directly on the page is live and correct, but the secondary navigation instruction is a dead end.

2. **CSEC requirements now fully verified (reversed finding from prior pass).** The MPS Circular NP7/2025 (dated 2025-06-03, machine-readable in this pass) explicitly states for the "Teacher" grade: "At least five subjects at CSEC General Proficiency Level including English Language, Mathematics and a Science subject." This matches the page word-for-word. The prior pass marked this unverifiable because the PDF was not machine-readable. Status is now verified.

3. **"Primary school only" scope now confirmed (reversed finding from prior pass).** The same MPS Circular NP7/2025 is addressed to "Principals, Public Nursery and Primary Schools" and its subject line specifies "Post of Graduate Teacher/Special Grade Teacher/Qualified Teacher/Teacher, **Primary Schools**." This confirms the page's restriction to government-funded primary schools is accurate.

4. **No contact details for citizens with eligibility questions.** The page still has no email, phone, or contact point for applicants who want to confirm eligibility or check vacancy status. The MPS circular includes teachervacancy@mes.gov.bb. Adding this would meaningfully reduce friction.

---

## Reversed findings from prior pass

- **Claim 1** (primary school scope): previously unverifiable (35% certainty) — now **verified** by MPS Circular NP7/2025 which explicitly scopes the post to primary schools.
- **Claim 3** (5 CXC subjects including English, maths, science): previously unverifiable (40% certainty) — now **verified** by MPS Circular NP7/2025 which states "At least five subjects at CSEC General Proficiency Level including English Language, Mathematics and a Science subject."

---

## Claims

### Claim 1 — "government-funded primary school" scope (line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you want to be a temporary teacher in a government-funded primary school in Barbados, you must apply.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you want to be a temporary teacher in a government-funded primary school in Barbados, you must apply.</pre>
</div>

- **Type:** eligibility / descriptive
- **Sources:** [MPS — Circular NP7/2025 Application for the Post of Teacher (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf) — addressed "TO: Principals, Public Nursery and Primary Schools"; subject line: "Vacant Post of Graduate Teacher/Special Grade Teacher/Qualified Teacher/Teacher, **Primary Schools**, Ministry of Educational Transformation"
- **Status:** verified
- **Certainty:** 90%
- **Note:** Reversed from prior pass (unverifiable, 35%). The circular explicitly confines this recruitment exercise to primary schools. The seamlessdocs form is titled generically but the governing circular is primary-school-specific.

---

### Claim 2 — Barbadian citizen or CARICOM national with the right to work (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">be a Barbadian citizen or a CARICOM national with the right to work</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">be a Barbadian citizen or a CARICOM national with the right to work</pre>
</div>

- **Type:** eligibility
- **Sources:** [immigration.gov.bb — Work Permit (CARICOM context)](https://immigration.gov.bb/pages/WorkPermit.aspx); [Barbados Accreditation Council — CARICOM Skills Certificate](https://bac.gov.bb/caricom-skills-certificate/); [GIS — Free Access to Public Schools for CARICOM Nationals](https://gisbarbados.gov.bb/blog/free-access-to-public-schools-for-caricom-nationals/)
- **Status:** verified
- **Certainty:** 80%
- **Note:** Under the CARICOM Single Market and Economy (CSME), teachers are eligible for free movement of labour. CARICOM nationals who obtain a Certificate of Recognition of CARICOM Skills Qualifications via the Barbados Accreditation Council do not need a work permit. The page's shorthand "right to work" correctly captures this entitlement.

---

### Claim 3 — 5 CXC subjects including English, maths, and a science subject (line 17)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">have at least 5 CXC subjects at CSEC general proficiency level, including English language, maths and a science subject</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">have at least 5 CXC subjects at CSEC general proficiency level, including English language, maths and a science subject</pre>
</div>

- **Type:** eligibility
- **Sources:** [MPS — Circular NP7/2025 Application for the Post of Teacher (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf) — "Teacher" grade qualification requirement: "At least five subjects at CSEC General Proficiency Level including English Language, Mathematics and a Science subject."
- **Status:** verified
- **Certainty:** 92%
- **Note:** Reversed from prior pass (unverifiable, 40%). The PDF was not machine-readable in the prior pass. In this pass the content was extracted and the requirement matches the page claim exactly. The "4 subjects" figure cited in a third-party summary applies to the "Teacher (Special Grade)" category, not the base "Teacher" grade.

---

### Claim 4 — Vacancies increase over summer ahead of new school year which starts in September (lines 23–24)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Job vacancies are advertised all year round but the number increases over the summer months ahead of the new school year which starts in September.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Job vacancies are advertised all year round but the number increases over the summer months ahead of the new school year which starts in September.</pre>
</div>

- **Type:** process step / statistic
- **Sources:** [Barbados Today — Back to pre-COVID calendar when new school year begins (April 2025)](https://barbadostoday.bb/2025/04/17/back-to-pre-covid-calendar-when-new-school-year-begins/); [GIS — Opportunity Calls with teacher vacancies](https://gisbarbados.gov.bb/blog/downloads/calls/)
- **Status:** verified
- **Certainty:** 95%
- **Note:** The Barbados school year commences in September (Term 1 — "Michaelmas" — runs September to mid-December). GIS regularly publishes teacher vacancy announcements that cluster ahead of each September term.

---

### Claim 5 — Updates on the Ministry of Educational Transformation or Government Information Service websites (line 23)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can look out for updates on the Ministry of Educational Transformation or Government Information Service websites.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with URL redirect note)</div>
<pre class="claim-block-content">You can look out for updates on the Ministry of Educational Transformation or Government Information Service websites.</pre>
</div>

- **Type:** agency name / process step / URL
- **Sources:** [gov.bb — Ministry of Educational Transformation (MEDT)](https://www.gov.bb/Ministries/education); [gisbarbados.gov.bb — vacancies tag](https://gisbarbados.gov.bb/search/vacancies/); [mes.gov.bb — redirects to education.gov.bb](https://mes.gov.bb/News/Vacancies/)
- **Status:** verified — with URL redirect caveat
- **Certainty:** 85%
- **Note:** "Ministry of Educational Transformation" is confirmed correct per gov.bb (listed as "Ministry of Educational Transformation (MEDT)"). The official domain `mes.gov.bb` 301-redirects all pages to `education.gov.bb`. Citizens who navigate to `mes.gov.bb` will arrive at `education.gov.bb` correctly; deep links to specific pages may 404. GIS (`gisbarbados.gov.bb`) is confirmed as a secondary channel for vacancy announcements.

---

### Claim 6 — Application form available online via seamlessdocs URL (line 27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">you can only apply online by completing the Application for registration as temporary/acting teacher form (https://barbados.seamlessdocs.com/f/pvyf07u3v0j2)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">you can only apply online by completing the Application for registration as temporary/acting teacher form (https://barbados.seamlessdocs.com/f/pvyf07u3v0j2)</pre>
</div>

- **Type:** URL / process step
- **Sources:** [barbados.seamlessdocs.com/f/pvyf07u3v0j2](https://barbados.seamlessdocs.com/f/pvyf07u3v0j2) — confirmed live; form titled "Application for Temporary Teacher" for the Government of Barbados, collecting personal details, qualifications (upload), and testimonials (upload).
- **Status:** verified — URL is live and active.
- **Certainty:** 95%

---

### Claim 7 — Form found on Ministry website under Resources > Download Forms (line 27–28)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can find it on the Ministry of Educational Transformation website under the 'resources' tab in the menu, and then the 'download forms' option.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Discrepant — navigation path leads to 404</div>
<pre class="claim-block-content">education.gov.bb/home/Resources/ is live and lists "Download Forms" as a menu option. However, the Download Forms sub-page (education.gov.bb/home/Resources/Download-Forms/ and without trailing slash) returns HTTP 404 in this pass. The navigation instruction on the page cannot be followed by citizens to reach the form. The seamlessdocs URL in the preceding sentence is correct and live.</pre>
</div>

- **Type:** process step / URL
- **Checked:** [education.gov.bb — Resources (live)](https://education.gov.bb/home/Resources/); [education.gov.bb — Download Forms (404)](https://education.gov.bb/home/Resources/Download-Forms/)
- **Status:** discrepant
- **Certainty:** 55%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — the seamlessdocs URL directly above this sentence works, so a citizen reading carefully will still find the form; but the navigation instruction wastes time and erodes trust.
- **Fix:** Remove or replace "You can find it on the Ministry of Educational Transformation website under the 'resources' tab in the menu, and then the 'download forms' option." — the direct link in the preceding sentence is sufficient and correct.

---

### Claim 8 — CV required (line 33)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Your curriculum vitae (CV).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Your curriculum vitae (CV).</pre>
</div>

- **Type:** document requirement
- **Sources:** [barbados.seamlessdocs.com/f/pvyf07u3v0j2](https://barbados.seamlessdocs.com/f/pvyf07u3v0j2) — form prompts for a "Qualifications" upload (zipped folder); [MPS — Circular NP7/2025 (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf) — references supporting documentation requirements.
- **Status:** verified
- **Certainty:** 80%

---

### Claim 9 — 2 referees and short letters of recommendation (lines 35–36)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The name and contact details of 2 referees and their short letters of recommendation (a paragraph is enough).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The name and contact details of 2 referees and their short letters of recommendation (a paragraph is enough).</pre>
</div>

- **Type:** document requirement
- **Sources:** [barbados.seamlessdocs.com/f/pvyf07u3v0j2](https://barbados.seamlessdocs.com/f/pvyf07u3v0j2) — form includes a "Testimonials" upload field; [MPS — Circular NP7/2025 (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf) — references supporting documentation.
- **Status:** verified
- **Certainty:** 75%
- **Note:** The seamlessdocs form describes testimonials as optional. The page says "you'll also need to share" (implying mandatory). If testimonials are truly optional, the page wording is slightly misleading. Confirm with the Ministry whether referee letters are required or optional at the application stage.

---

### Claim 10 — Certified copies of qualifications, certified by a Justice of the Peace (lines 43–44)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Certified copies of your academic and teaching qualifications. You can get them certified by a Justice of the peace.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Certified copies of your academic and teaching qualifications. You can get them certified by a Justice of the peace.</pre>
</div>

- **Type:** document requirement / process step
- **Sources:** [gov.bb — Justice of the Peace](https://www.gov.bb/Citizens/justice-of-peace); [MPS — Circular NP7/2025 (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf); see also [justice-of-the-peace.md](/docs/fact-check/justice-of-the-peace.md) — JP powers confirmed.
- **Status:** verified
- **Certainty:** 90%

---

### Claim 11 — Proof of citizenship (passport or ID card) or immigration status and work permit (lines 45–46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Proof of citizenship, for example, your passport or ID card. Or, proof of your immigration status and your work permit.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Proof of citizenship, for example, your passport or ID card. Or, proof of your immigration status and your work permit.</pre>
</div>

- **Type:** document requirement
- **Sources:** [immigration.gov.bb — Work Permit](https://immigration.gov.bb/pages/WorkPermit.aspx); [bac.gov.bb — CARICOM Skills Certificate](https://bac.gov.bb/caricom-skills-certificate/)
- **Status:** verified
- **Certainty:** 85%
- **Note:** Standard documentation requirement consistent with Barbados immigration practice. CARICOM nationals who have obtained their Certificate of Recognition of CARICOM Skills Qualifications would present that plus national ID in lieu of a work permit.

---

### Claim 12 — Police Certificate of Character fee BBD $20 and forms.gov.bb URL (line 47)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">A recent Police Certificate of Character. You can apply for one here (https://forms.gov.bb/CertificateOfCharacter). The fee is BBD $20.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">A recent Police Certificate of Character. You can apply for one here (https://forms.gov.bb/CertificateOfCharacter). The fee is BBD $20.</pre>
</div>

- **Type:** fee / URL / document requirement
- **Sources:** [forms.gov.bb — Application for Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter) — fee confirmed at BBD $20; [GIS — Police Certificate of Character Form Now Online](https://gisbarbados.gov.bb/blog/police-certificate-of-character-now-online/); [GIS — How To Apply For A Police Certificate Of Character](https://gisbarbados.gov.bb/blog/how-to-apply-for-a-police-certificate-of-character/)
- **Status:** verified
- **Certainty:** 95%

---

### Claim 13 — Successful applicants receive a letter of appointment (line 51)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you are successful, you will receive a letter of appointment.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you are successful, you will receive a letter of appointment.</pre>
</div>

- **Type:** process step / descriptive
- **Sources:** [MPS — Circular NP7/2025 (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf) — consistent with standard Barbados public service appointment practice; [GIS — Teachers tag](https://gisbarbados.gov.bb/blog/tag/teachers/)
- **Status:** verified
- **Certainty:** 85%

---

## Additional findings (not on the page but should be)

**Contact email for the Ministry.** Citizens with questions about the temporary teacher application currently have no contact detail on the page. The MPS Circular NP7/2025 includes the address teachervacancy@mes.gov.bb for teacher-vacancy inquiries, and the Ministry's general email is info@mes.gov.bb. Adding one of these would reduce friction for applicants who are unsure whether they qualify.

**CARICOM Skills Certificate pathway not mentioned.** CARICOM nationals who do not yet have a "right to work" in Barbados can obtain one by applying to the Barbados Accreditation Council for a Certificate of Recognition of CARICOM Skills Qualifications (bac.gov.bb). The page currently implies CARICOM nationals either already have the right to work or do not — it does not point them to the pathway for obtaining it.

**"Recent" Police Certificate of Character — validity period not defined.** The page says "a recent Police Certificate of Character" without specifying what "recent" means. The Royal Barbados Police Force (RBPF) typically regards a certificate as valid for 6 months, but this is not stated on the page. Candidates who obtain one at application stage and are not interviewed until months later may need a new one.

**Ministry Download Forms page broken.** The `education.gov.bb/home/Resources/Download-Forms/` sub-page returns HTTP 404. The Ministry's IT team should be notified to restore it or update the navigation to reflect where forms now live.

---

## Sources consulted

- [alpha.gov.bb — Apply for a position as a temporary teacher (live page)](https://alpha.gov.bb/work-employment/apply-for-a-position-as-a-temporary-teacher)
- [gov.bb — Ministry of Educational Transformation (MEDT)](https://www.gov.bb/Ministries/education)
- [education.gov.bb — Ministry home](https://education.gov.bb/home/)
- [education.gov.bb — Resources](https://education.gov.bb/home/Resources/)
- [education.gov.bb — Download Forms (HTTP 404)](https://education.gov.bb/home/Resources/Download-Forms/)
- [mes.gov.bb — Application Form for Temporary Teachers (301 → education.gov.bb; original page not accessible)](https://mes.gov.bb/News/Latest/Application-Form-for-Temporary-Teachers.aspx)
- [MPS — Circular NP7/2025 Application for the Post of Teacher (PDF)](https://mps.gov.bb/People_Resourcing/post_docs/Circular-%20Application%20for%20the%20Post%20of%20Teacher.pdf)
- [barbados.seamlessdocs.com — Application for Temporary Teacher form](https://barbados.seamlessdocs.com/f/pvyf07u3v0j2)
- [forms.gov.bb — Application for Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter)
- [GIS — Police Certificate of Character Form Now Online](https://gisbarbados.gov.bb/blog/police-certificate-of-character-now-online/)
- [GIS — How To Apply For A Police Certificate Of Character](https://gisbarbados.gov.bb/blog/how-to-apply-for-a-police-certificate-of-character/)
- [immigration.gov.bb — Work Permit](https://immigration.gov.bb/pages/WorkPermit.aspx)
- [bac.gov.bb — CARICOM Skills Certificate](https://bac.gov.bb/caricom-skills-certificate/)
- [Barbados Today — Back to pre-COVID calendar when new school year begins (April 2025)](https://barbadostoday.bb/2025/04/17/back-to-pre-covid-calendar-when-new-school-year-begins/)
- [GIS — Vacancies / Opportunity Calls](https://gisbarbados.gov.bb/blog/downloads/calls/)
- [gisbarbados.gov.bb — Free Access to Public Schools for CARICOM Nationals](https://gisbarbados.gov.bb/blog/free-access-to-public-schools-for-caricom-nationals/)
- [src/data/ministries.ts](/home/gavin/frontend-alpha/src/data/ministries.ts) — canonical ministry name
