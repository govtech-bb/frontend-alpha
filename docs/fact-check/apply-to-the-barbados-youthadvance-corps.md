# Fact-check: Apply to the Barbados YouthADVANCE Corps

- **Live page:** <https://alpha.gov.bb/work-employment/apply-to-the-barbados-youthadvance-corps>
- **Source file:** `src/content/apply-to-the-barbados-youthadvance-corps.md`
- **Last checked:** 2026-05-29
- **Summary:** 18 claims reviewed — 8 verified, 4 discrepant, 6 unverifiable. Average certainty: **70%**.

---

## Headline issues for triage

1. **Police Certificate of Character link is missing — "here" has no href.** Line 67 of the source reads "a Police Certificate of Character – you can apply for one here" but no hyperlink exists (no markdown link syntax). On the live page the word "here" is plain text, not a link. Citizens cannot click through to `https://forms.gov.bb/CertificateOfCharacter`. This is a broken primary CTA and HIGH citizen impact.

2. **Ministry name is wrong throughout the page.** Lines 28 and 82 use "Ministry of Youth and Community Empowerment." The correct current name is "Ministry of Youth, Sports and Community Empowerment," confirmed in `src/data/ministries.ts`, on `youthaffairs.gov.bb`, `byac.gov.bb`, and `gisbarbados.gov.bb`. Both occurrences need correcting.

3. **Residential programme duration is contradicted by multiple authoritative sources.** Line 101 states "a 6-week residential programme." Three Tier-1 sources (Division of Youth Affairs programme page, BYAC's own programme page, and youthaffairs.gov.bb programme channels) state "Residential Training (10 weeks)." A single byac.gov.bb sub-page also states 6 weeks — creating an internal BYAC inconsistency — but the weight of evidence favours 10 weeks. Understating by 4 weeks is a significant misrepresentation for families.

4. **"National Insurance Scheme" is an outdated name.** Line 49 describes the application form as asking about "your National Insurance Scheme." The NIS was formally renamed the National Insurance and Social Security Service (NISSS) on 1 December 2023. The old name has been superseded for over two years.

5. **The $600/month stipend figure has not been confirmed in any current Tier-1 source.** The only publicly documented source for this figure is a 2019 Barbados Today article — before the programme launched. No current official page (youthaffairs.gov.bb, byac.gov.bb, gov.bb) publishes the current stipend amount. The figure may have changed.

---

## Claims

### Claim 1 — Age eligibility: 16 to 20 years old (line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Young people between the ages of 16 and 20 years old are eligible to apply to the Barbados YouthADVANCE Corps (BYAC).</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Young people between the ages of 16 and 20 years old are eligible to apply to the Barbados YouthADVANCE Corps (BYAC).</pre>
</div>

- **Type:** eligibility
- **Sources:** [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "males and females 16 to 20 years old"; [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/) — "ages 16 to 20 years old"; [byac.gov.bb — Programme](https://byac.gov.bb/programme/) — "young individuals ranging from age sixteen (16) to twenty (20)"
- **Status:** verified
- **Certainty:** 99%
- **Note:** A 2019 Barbados Today article cited ages 16–23, but that predates the programme's launch. All post-launch authoritative sources confirm 16–20.

---

### Claim 2 — Programme purpose: skills for higher education, workplace, personal growth (line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">BYAC is an initiative aimed at helping young people develop the skills they need to enter higher education, the workplace or for their own personal growth.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">BYAC is an initiative aimed at helping young people develop the skills they need to enter higher education, the workplace or for their own personal growth.</pre>
</div>

- **Type:** descriptive
- **Sources:** [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "two-year developmental training programme" combining residential, technical, vocational, and life-skills training; [byac.gov.bb](https://byac.gov.bb/) — programme scope confirmed; second-year placement into employment/apprenticeships corroborates the "workplace" aim
- **Status:** verified (editorial paraphrase is consistent with documented aims)
- **Certainty:** 85%

---

### Claim 3 — Monthly stipend: BDS $600 (line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Providing they are fully participating, students receive BDS $600 per month to cover expenses like travel and food.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify current amount — 2019 source only; no current Tier-1 confirmation</div>
<pre class="claim-block-content">The $600/month figure appears in a 2019 Barbados Today article: "The students are to be given a stipend of $600 per month." No current official page (youthaffairs.gov.bb, byac.gov.bb, gov.bb) publishes a stipend amount. The figure may have been updated since the programme launched. The "fully participating" condition is also not corroborated in any official source.</pre>
</div>

- **Type:** fee / financial benefit
- **Checked:** [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — no stipend amount; [byac.gov.bb — Programme](https://byac.gov.bb/programme/) — no stipend amount; [gov.bb — Barbados Youth Advance Corps](https://www.gov.bb/State-Bodies/barbados-youth-advance-corps) — no stipend amount; [Barbados Today — "Youth Service to get '$20 million replacement'" (16 Aug 2019)](https://barbadostoday.bb/2019/08/16/youth-service-to-get-20-million-replacement/) — "The students are to be given a stipend of $600 per month"
- **Status:** unverifiable from current authoritative sources
- **Certainty:** 45%
- **Citizen impact:** HIGH — a stipend is a material incentive to apply; if the amount has changed, citizens are being given incorrect information
- **Open question:** confirm with BYAC or Ministry of Youth, Sports and Community Empowerment the current stipend amount and whether BDS dollars is correct. Confirm whether "fully participating" is the formal condition used in programme documents.

---

### Claim 4 — Apply all year round (line 15)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can apply to BYAC all year round.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Not explicitly confirmed — intake-based cohorts are documented</div>
<pre class="claim-block-content">No Tier-1 source explicitly confirms that BYAC accepts applications on a rolling year-round basis. Official sources reference specific intake dates (e.g. "September 2021 and January 2022" cohorts). Whether a form submitted outside an intake window is held for the next cohort is not documented publicly.</pre>
</div>

- **Type:** process step / timeline
- **Checked:** [byac.gov.bb — Applications](https://byac.gov.bb/category/blog/application/) — references specific intake periods; [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — no statement about year-round applications; [gisbarbados.gov.bb — BYAC Accepting Applications](https://gisbarbados.gov.bb/blog/barbados-youth-advance-corps-accepting-applications/) — GIS announces specific application windows (HTTP 403 on direct fetch; confirmed via search-result snippets)
- **Status:** unverifiable
- **Certainty:** 50%
- **Open question:** confirm with BYAC whether forms can be submitted at any time or only during announced windows, and whether submitted forms are held for the next cohort if no current intake is open.

---

### Claim 5 — BYAC headquarters address (lines 23–26)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados YouthADVANCE Corps
No. 33 Warrens Industrial Park
Warrens
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados YouthADVANCE Corps
No. 33 Warrens Industrial Park
Warrens
St. Michael</pre>
</div>

- **Type:** address
- **Sources:** [byac.gov.bb](https://byac.gov.bb/) — "No. 33 Warrens Industrial Park, Warrens, St. Michael"; [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/) — "#33 Warrens Industrial Park, Warrens, St. Michael"; [gov.bb — Barbados Youth Advance Corps](https://www.gov.bb/State-Bodies/barbados-youth-advance-corps) — "#33 Warrens Industrial Park, St. Michael"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 6 — Ministry name and address for form collection/submission (lines 28–31 and 82–85)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Youth and Community Empowerment
Sky Mall
Haggatt Hall
St. Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (ministry name corrected)</div>
<pre class="claim-block-content">Ministry of Youth, Sports and Community Empowerment
Sky Mall
Haggatt Hall
St. Michael</pre>
</div>

- **Type:** agency name + address
- **Sources:** [byac.gov.bb — Accepting Applications](https://byac.gov.bb/barbados-youth-advance-corps-accepting-applications/) — "Ministry of Youth, Sports and Community Empowerment, Sky Mall, Haggatt Hall"; [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/) — "Ministry of Youth, Sports and Community Empowerment … Sky Mall, Haggatt Hall, St. Michael"; [src/data/ministries.ts](/home/gavin/frontend-alpha/src/data/ministries.ts) line 1101 — `name: "Ministry of Youth, Sports and Community Empowerment"` with address `"Sky Mall, Haggatt Hall, St. Michael"`; see also [register-summer-camp.md](/docs/fact-check/register-summer-camp.md) Additional Findings
- **Status:** discrepant — ministry name is wrong; the physical address (Sky Mall, Haggatt Hall, St. Michael) is correct
- **Confidence it's wrong:** 99%
- **Citizen impact:** MEDIUM — wrong ministry name undermines page credibility and may confuse citizens searching for the ministry. Address is correct so citizens can still reach the office.
- **Note:** This discrepancy appears twice (lines 28–31 and 82–85); both must be corrected.

---

### Claim 7 — Application form fields including "National Insurance Scheme" (lines 35–49)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Application forms ask about:
- your education
- your qualifications
- your ideal job or career
- your hobbies and interests
- any disabilities you have
- your physical and mental health
- your National Insurance Scheme</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (correction to last item; other fields verified)</div>
<pre class="claim-block-content">Application forms ask about:
- your education
- your qualifications
- your ideal job or career
- your hobbies and interests
- any disabilities you have
- your physical and mental health
- your National Insurance and Social Security Service (NISSS) number</pre>
</div>

- **Type:** process step + agency name
- **Sources:** [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/) — "On 1st December 2023, the NIS transitioned to a statutory corporation and was renamed the National Insurance and Social Security Service"; [byac.gov.bb — Recruitment form](https://byac.gov.bb/recruitment/) — form confirms personal details, educational history, qualifications, hobbies, career aspirations, disabilities, and medical information — all categories align with the page list; National Insurance Number is a field on the form
- **Status:** discrepant — "National Insurance Scheme" is the pre–December 2023 name; correct name is "National Insurance and Social Security Service (NISSS)"; all other form-field categories are verified against the live BYAC recruitment form
- **Confidence it's wrong:** 95% (on "National Insurance Scheme" label)
- **Certainty:** 90% (other form-field categories confirmed against live form)
- **Citizen impact:** LOW — form itself will use the current name; citizens are unlikely to be prevented from applying. However it signals the page has not been updated since before December 2023.

---

### Claim 8 — Supporting documents: certified copies (lines 53–61)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will be asked to share certified copies of:
- your birth certificate
- your qualifications and or exam grades
- 2 passport photos

To certify a document you must find a Justice of the Peace.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (items confirmed; "certified copies" and JP requirement unconfirmed)</div>
<pre class="claim-block-content">The BYAC online recruitment form lists these as required attachments: birth certificate, qualification copies, and photographs — consistent with the page. The "certified copies" requirement and need to use a JP are not stated on the BYAC recruitment form; the form simply says "attachments needed."</pre>
</div>

- **Type:** document requirement
- **Sources:** [byac.gov.bb — Recruitment form](https://byac.gov.bb/recruitment/) — "Required Documents: The form specifies six attachments needed: birth certificate, qualification copies, police character certificate, school report, medical certificate, and photographs" — confirms birth certificate, qualifications, and photos as required
- **Status:** verified for the document list items; "certified copies" requirement and JP instruction are unverifiable
- **Certainty:** 75%
- **Open question:** confirm with BYAC whether certification by a JP is required, or whether plain copies/originals suffice.

---

### Claim 9 — Supporting documents: uncertified items (lines 63–71)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You will also be asked to share:
- your last school report
- a Police Certificate of Character – you can apply for one here
- a medical certificate completed by a doctor
- the contact details for 2 references</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (items confirmed by BYAC form)</div>
<pre class="claim-block-content">You will also be asked to share:
- your last school report
- a Police Certificate of Character – you can apply for one here [LINK MISSING — see Claim 10]
- a medical certificate completed by a doctor
- the contact details for 2 references</pre>
</div>

- **Type:** document requirement
- **Sources:** [byac.gov.bb — Recruitment form](https://byac.gov.bb/recruitment/) — "Required Documents: birth certificate, qualification copies, police character certificate, school report, medical certificate, and photographs" — directly confirms all four items (school report, police character certificate, medical certificate, and 2 references/reference forms confirmed separately by [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/) — "reference forms, identification, and Health Assessment form")
- **Status:** verified
- **Certainty:** 90%
- **Note:** The "here" link in line 67 is missing — see Claim 10.

---

### Claim 10 — Police Certificate of Character link: "you can apply for one here" (line 67)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">a Police Certificate of Character – you can apply for one here</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (with working link)</div>
<pre class="claim-block-content">a Police Certificate of Character – you can [apply for one here](https://forms.gov.bb/CertificateOfCharacter)</pre>
</div>

- **Type:** link / CTA
- **Sources:** [forms.gov.bb — Certificate of Character](https://forms.gov.bb/CertificateOfCharacter) — page loads successfully; online form confirmed live; source markdown at line 67 has no markdown link syntax — plain text only; live page renders "here" as unlinked text
- **Status:** discrepant — the text promises a link ("here") but no href exists in the source markdown or on the live page
- **Confidence it's wrong:** 99%
- **Citizen impact:** HIGH — a citizen cannot follow the link to apply for the required Police Certificate of Character. They would need to search for the form themselves.

---

### Claim 11 — Post-application: recruitment officer contacts successful applicants (lines 89–90)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If your application is successful, a recruitment officer will contact you and arrange a time to meet with you and your parent(s) or guardian(s).</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Post-application process not publicly documented</div>
<pre class="claim-block-content">No Tier-1 or Tier-2 source (youthaffairs.gov.bb, byac.gov.bb, GIS press releases) documents the post-submission process, the role of a "recruitment officer," or a requirement for a meeting involving parents or guardians. The claim is plausible given the age of participants (16–20) but cannot be confirmed from the public web.</pre>
</div>

- **Type:** process step
- **Checked:** [byac.gov.bb — Recruitment](https://byac.gov.bb/recruitment/) — shows the application form only; no post-submission steps described; [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — no post-application process described
- **Status:** unverifiable from public web
- **Certainty:** 55%
- **Open question:** confirm with BYAC whether a recruitment officer contacts successful applicants and whether a parent/guardian meeting is a formal requirement before enrolment.

---

### Claim 12 — Deferred place policy (line 91)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If a place isn't available for the start date you applied for, you can defer your place.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Deferral policy not publicly documented</div>
<pre class="claim-block-content">No Tier-1 or Tier-2 source describes a formal deferral policy for BYAC places. The claim cannot be confirmed or refuted from the public web.</pre>
</div>

- **Type:** process step
- **Checked:** [byac.gov.bb — Programme](https://byac.gov.bb/programme/); [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/); [byac.gov.bb — Applications](https://byac.gov.bb/category/blog/application/) — none document a deferral policy
- **Status:** unverifiable from public web
- **Certainty:** 50%
- **Open question:** confirm with BYAC whether a formal deferral policy exists and under what conditions a place can be deferred to a future cohort.

---

### Claim 13 — Programme duration: 2 years (line 95)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The BYAC is a 2-year programme.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The BYAC is a 2-year programme.</pre>
</div>

- **Type:** statistic
- **Sources:** [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "two-year developmental training programme"; [byac.gov.bb — Programme](https://byac.gov.bb/programme/) — "two (2) year programme"; [Barbados Today (3 Dec 2022)](https://barbadostoday.bb/2022/12/03/barbados-youthadvance-corps-starts-two-year-programme/) — "two-year youth development programme"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 14 — Year 1 skills content (lines 99–100)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The first year focuses on developing skills including disciplinary training, citizenship and civic education, self-esteem building, etiquette and personal development, as well as a technical and vocational training component.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The first year focuses on developing skills including disciplinary training, citizenship and civic education, self-esteem building, etiquette and personal development, as well as a technical and vocational training component.</pre>
</div>

- **Type:** programme description
- **Sources:** [byac.gov.bb — Accepting Applications](https://byac.gov.bb/barbados-youth-advance-corps-accepting-applications/) — "discipline, citizenship and civic education, self-esteem building, etiquette and personal development, as well as a technical and vocational training component"; [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "Residential training … and technical and vocational training" in Year 1
- **Status:** verified
- **Certainty:** 95%

---

### Claim 15 — Year 1 residential programme: duration stated as 6 weeks (lines 101–102)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It also includes a 6-week residential programme where the focus is on adolescent development, team building and a counselling programme.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say (duration to be corrected to 10 weeks — agency to confirm)</div>
<pre class="claim-block-content">It also includes a 10-week residential programme where the focus is on adolescent development, team building and a counselling programme.</pre>
</div>

- **Type:** statistic / programme description
- **Sources:**
  - Page says "6 weeks" — [byac.gov.bb — Accepting Applications](https://byac.gov.bb/barbados-youth-advance-corps-accepting-applications/) — one byac.gov.bb sub-page also states six weeks, creating an internal BYAC inconsistency
  - Three Tier-1 sources say "10 weeks" — [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "First Year – Residential training (10 weeks)"; [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/) — "Residential Training (10 weeks)"; [byac.gov.bb — Programme](https://byac.gov.bb/programme/) — "Residential Training (10 weeks)"
  - Barbados Today reports a two-phase residential — [Barbados Today (3 Dec 2022)](https://barbadostoday.bb/2022/12/03/barbados-youthadvance-corps-starts-two-year-programme/) — "six-week, pre-residential preparatory programme" before going to the Barbados Defence Force Paragon Base "for the next nine weeks"
- **Status:** discrepant — three authoritative sources state 10 weeks; one byac.gov.bb sub-page states six weeks; weight of evidence strongly favours 10 weeks
- **Confidence it's wrong:** 80%
- **Citizen impact:** HIGH — families need accurate information about the duration of a residential programme away from home. Understating by 4 weeks is a significant misrepresentation.
- **Note:** The focus content ("adolescent development, team building and a counselling programme") is a reasonable editorial description consistent with the programme's documented aims but is not independently corroborated in those exact terms.

---

### Claim 16 — Year 2 content: apprenticeships, internships, community service, national projects (lines 105–106)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">The second year focuses on applying the skills students have developed in the first year. The focus is on preparing for apprenticeships and internships, community service and participation in national projects.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">The second year focuses on applying the skills students have developed in the first year. The focus is on preparing for apprenticeships and internships, community service and participation in national projects.</pre>
</div>

- **Type:** programme description
- **Sources:** [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "Second Year – Job attachments, apprenticeships and internships as well as participation in community service and national projects"; [byac.gov.bb — Programme](https://byac.gov.bb/programme/) — "Job attachments, apprenticeships and internships as well as participation in community service and national projects"; [byac.gov.bb — Accepting Applications](https://byac.gov.bb/barbados-youth-advance-corps-accepting-applications/) — "Year Two focuses on apprenticeships and internships, community service and participation in national projects"
- **Status:** verified
- **Certainty:** 99%

---

### Claim 17 — Qualifications: academic, technical and vocational training certificates over 2 years (lines 109–110)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Over 2 years, students have the opportunity to receive academic, technical and vocational training certificates.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (broad characterisation)</div>
<pre class="claim-block-content">Over 2 years, students have the opportunity to receive academic, technical and vocational training certificates.</pre>
</div>

- **Type:** qualification
- **Sources:** [byac.gov.bb — Training](https://byac.gov.bb/training/) — courses include City & Guilds English/Maths and CSEC-aligned subjects (English, Maths, IT, Health & Social Biology) — confirming academic certificates; [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/) — training institutions cited include SJPI, BIMAP, Barbados Community College, and Barbados Vocational Training Board; [Barbados Today (25 Mar 2022)](https://barbadostoday.bb/2022/03/25/byac-trainees-excel-in-technical-vocational-training/) — trainees completing certificates in Child Care Nursery Attendant, Graphic Design and Animation, Home Economics
- **Status:** verified (as a broad characterisation; specific awarding bodies and qualification names are more detailed than the page states)
- **Certainty:** 90%

---

### Claim 18 — Programme branding: "Barbados YouthADVANCE Corps (BYAC)" (title, lines 2, 9, 15, 23, 77)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Barbados YouthADVANCE Corps (BYAC)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Barbados YouthADVANCE Corps (BYAC)</pre>
</div>

- **Type:** agency name / branding
- **Sources:** [byac.gov.bb](https://byac.gov.bb/) — "Barbados YouthADVANCE Corps"; [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/) — "Barbados YouthADVANCE Corps (BYAC)"; note: gov.bb and some GIS articles use "Barbados Youth Advance Corps" (without all-caps "ADVANCE"), but the dedicated byac.gov.bb domain consistently uses the all-caps branding
- **Status:** verified (all-caps "ADVANCE" is the Corps's own preferred styling)
- **Certainty:** 95%

---

## Reversed findings from previous pass

- **Claim 8 and 9 (supporting documents)** — previously marked unverifiable; now verified against the live BYAC online recruitment form at [byac.gov.bb/recruitment/](https://byac.gov.bb/recruitment/), which explicitly lists all six required attachments: birth certificate, qualification copies, police character certificate, school report, medical certificate, and photographs. The document list on the page is correct. The "certified copies" and JP requirement remain unverifiable.

---

## Additional findings (not on the page but should be)

- **BYAC contact details missing.** The page provides addresses for form collection and submission but no phone number or email. The BYAC publishes the following contact details which citizens would benefit from having:
  - Phone: `(246) 535-0180` / `(246) 535-0184`
  - Email: `byac@barbados.gov.bb`
  - Source: [byac.gov.bb](https://byac.gov.bb/); [youthaffairs.gov.bb — Programme Channels](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/)

- **Applications can also be submitted online.** The page describes only paper-form submission. The official BYAC application is also available via [byac.gov.bb/recruitment/](https://byac.gov.bb/recruitment/). Citizens may expect a digital option to be signposted.

- **Content-directory has no source_url.** The page is filed under the "work-employment" category. The content-directory entry has no `source_url` set. Consider adding `https://byac.gov.bb/` as the `source_url`.

- **Paragon Military Base location.** The residential component takes place at Barbados Defence Force Paragon Base, Christ Church. This detail is not on the page. Families asking "where will my child be staying?" would benefit from knowing the location. Source: [Barbados Today (3 Dec 2022)](https://barbadostoday.bb/2022/12/03/barbados-youthadvance-corps-starts-two-year-programme/)

---

## Sources consulted

- [byac.gov.bb — Home](https://byac.gov.bb/)
- [byac.gov.bb — Programme](https://byac.gov.bb/programme/)
- [byac.gov.bb — Accepting Applications](https://byac.gov.bb/barbados-youth-advance-corps-accepting-applications/)
- [byac.gov.bb — Applications category](https://byac.gov.bb/category/blog/application/)
- [byac.gov.bb — Recruitment form](https://byac.gov.bb/recruitment/)
- [byac.gov.bb — Training](https://byac.gov.bb/training/)
- [youthaffairs.gov.bb — About the BYAC](https://youthaffairs.gov.bb/about-the-youth-advance-corps/)
- [youthaffairs.gov.bb — Programme Channels: BYAC](https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/)
- [youthaffairs.gov.bb — BYAC category](https://youthaffairs.gov.bb/category/programmes/youth-advance-corps/)
- [gov.bb — Barbados Youth Advance Corps](https://www.gov.bb/State-Bodies/barbados-youth-advance-corps)
- [gisbarbados.gov.bb — BYAC Accepting Applications](https://gisbarbados.gov.bb/blog/barbados-youth-advance-corps-accepting-applications/) (HTTP 403 on direct fetch; confirmed via search-result snippets)
- [nis.gov.bb — About Us](https://www.nis.gov.bb/about-us/)
- [forms.gov.bb — Certificate of Character](https://forms.gov.bb/CertificateOfCharacter)
- [Barbados Today — "YouthADVANCE Corps starts two-year programme" (3 Dec 2022)](https://barbadostoday.bb/2022/12/03/barbados-youthadvance-corps-starts-two-year-programme/)
- [Barbados Today — "Youth Service to get '$20 million replacement'" (16 Aug 2019)](https://barbadostoday.bb/2019/08/16/youth-service-to-get-20-million-replacement/)
- [Barbados Today — "BYAC trainees excel in technical, vocational training" (25 Mar 2022)](https://barbadostoday.bb/2022/03/25/byac-trainees-excel-in-technical-vocational-training/)
- [src/data/ministries.ts](/home/gavin/frontend-alpha/src/data/ministries.ts) — Ministry of Youth, Sports and Community Empowerment entry
- [docs/fact-check/register-summer-camp.md](/docs/fact-check/register-summer-camp.md) — sister youth-affairs service, ministry name and address cross-checked
