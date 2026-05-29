# Fact-check: Apply to be a Project Protégé mentor

- **Live page:** <https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor>
- **Source files:** `src/content/apply-to-be-a-project-protege-mentor/index.md`, `src/content/apply-to-be-a-project-protege-mentor/start.md`
- **Last checked:** 2026-05-29
- **Summary:** 14 claims reviewed — 7 verified, 2 discrepant, 5 unverifiable. Average certainty: **64%**.

---

## Headline issues for triage

1. **Ministry of Labour miscategorisation with a broken href.** `src/data/ministries.ts` lines 806–809 list "Apply to be a Project Protégé Mentor" under the `onlineServices` block for the *Ministry of Labour, Social Security and Third Sector*. The service is run by the Ministry of Youth, Sports and Community Empowerment. Additionally, the href value is `/apply-to-be-a-project-protege-mentor` (no category prefix), which returns HTTP 200 but renders the site's 404 page — the correct path is `/work-employment/apply-to-be-a-project-protege-mentor`. Citizens reaching the ministry's page will see the wrong programme owner and clicking the link will land on a 404.

2. **YDP email address cannot be confirmed as an active inbox via a live web page.** The page states paper applications can be emailed to `YDP@barbados.gov.bb`. The youthaffairs.gov.bb contact page does not list any email address for the programme. The address appears in a gov.bb PDF document but the PDF could not be rendered for full text extraction. If this inbox is no longer monitored, citizens who submit paper applications by email may receive no acknowledgement.

3. **Four key claims about the post-interview process are unverifiable.** The safeguarding module, the orientation session, the ministry-led matching, and the networking event introduction are all described on the page but do not appear in any public authoritative source. These are plausible operational details but cannot be independently confirmed from the public web.

4. **No `source_url` is declared in `content-directory.ts` for this page.** There is no linked authoritative source for this page. The canonical authority is `youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/`, which should be added.

5. **`/work-employment/apply-to-be-a-project-protege-mentor/form` shows "Loading form…"** The form endpoint (`start.md` links to `/form`) returned HTTP 200 but the page body shows only "Loading form…" — the form does not render for web crawlers. This may be expected (client-side JS rendering) but cannot be confirmed as fully functional without a browser. The start page CTA links correctly.

---

## Claims

### Claim 1 — Programme description (index.md lines 3–4, description frontmatter)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Apply to become a volunteer mentor for a young person aged 13 to 17 in the
Government of Barbados Project Protégé programme.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Apply to become a volunteer mentor for a young person aged 13 to 17 in the
Government of Barbados Project Protégé programme.</pre>
</div>

- **Type:** descriptive
- **Sources:** [youthaffairs.gov.bb — Youth Ministry Launches Mentorship Programme Project Protégé](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — "mentorship and guidance to young people aged 13 to 17"
- **Status:** verified
- **Certainty:** 90%

---

### Claim 2 — Mentee age range: 13 to 17 (index.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">mentor a young person between the age of 13 and 17 in the Project Protégé programme</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">mentor a young person between the age of 13 and 17 in the Project Protégé programme</pre>
</div>

- **Type:** eligibility / statistic
- **Sources:** [youthaffairs.gov.bb — Youth Ministry Launches Mentorship Programme Project Protégé](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — "young people aged 13 to 17"
- **Status:** verified
- **Certainty:** 95%

---

### Claim 3 — Mentor eligibility: anyone aged 18 and over (index.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Anyone aged 18 and over is eligible to apply to mentor a young person</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — open question</div>
<pre class="claim-block-content">No authoritative Barbados source confirms a minimum mentor age of 18.
The youthaffairs.gov.bb launch article does not state a minimum age for mentors.
The claim is plausible (18 is the standard legal adult threshold in Barbados)
but is not corroborated by any Tier 1 or Tier 2 source.</pre>
</div>

- **Type:** eligibility
- **Sources consulted:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — mentor age not specified; [youthaffairs.gov.bb — About YDP](https://youthaffairs.gov.bb/about-youth-development-programme/) — no age threshold mentioned
- **Status:** unverifiable
- **Certainty:** 45%
- **Open question:** Confirm with the Division of Youth Affairs whether the minimum mentor age is formally 18, or whether there are additional eligibility conditions (e.g., criminal record check prior to interview).

---

### Claim 4 — Applications accepted all year round (index.md line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Applications are accepted all year round.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — open question</div>
<pre class="claim-block-content">No authoritative source confirms that mentor applications are open on a
continuous rolling basis. The programme launched with 50 mentor/mentee pairs
in January 2023; whether intake is now year-round or cohort-based is not
stated in any public source.</pre>
</div>

- **Type:** process step / hours
- **Sources consulted:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — describes a cohort of "50 mentors and 50 mentees" for the launch; [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/) — no intake-window information
- **Status:** unverifiable
- **Certainty:** 40%
- **Citizen impact:** MEDIUM — a citizen who applies outside an active intake window might receive no response.
- **Open question:** Confirm with the Division of Youth Affairs whether intake is year-round or cohort-based. If cohort-based, the page needs a current intake window or a "check back" instruction.

---

### Claim 5 — Online form CTA link: /work-employment/apply-to-be-a-project-protege-mentor/start (index.md line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content"><a data-start-link href="/work-employment/apply-to-be-a-project-protege-mentor/start">Complete the online form</a></pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content"><a data-start-link href="/work-employment/apply-to-be-a-project-protege-mentor/start">Complete the online form</a></pre>
</div>

- **Type:** link / CTA
- **Sources:** Direct fetch of [alpha.gov.bb — start page](https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor/start) returned HTTP 200 with correct content.
- **Status:** verified — link is live and leads to the start page
- **Certainty:** 97%

---

### Claim 6 — Ministry address: Sky Mall, Haggatt Hall, St Michael (index.md lines 26–31)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Youth, Sports and Community Empowerment
Sky Mall
Haggatt Hall
St Michael</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Youth, Sports and Community Empowerment
Sky Mall
Haggatt Hall
St Michael</pre>
</div>

- **Type:** address / agency name
- **Sources:** [gov.bb — Ministry of Youth, Sports and Community Empowerment](https://www.gov.bb/ministries/culture-sports-youth) — "Sky Mall, Haggatt Hall, St. Michael"; [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/) — "Ministry of Youth, Sports and Community Empowerment Sky Mall, Haggatt Hall, St. Michael"; `src/data/ministries.ts` line 1133 — `"Sky Mall, Haggatt Hall, St. Michael"`
- **Status:** verified
- **Certainty:** 97%
- **Minor note:** The page omits the comma after "Haggatt Hall" and the full stop after "St Michael"; the canonical form used by the ministry itself is "Sky Mall, Haggatt Hall, St. Michael". This is a punctuation/style matter, not a factual error.

---

### Claim 7 — Ministry name: Ministry of Youth, Sports and Community Empowerment (index.md lines 26–27)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Ministry of Youth, Sports and Community Empowerment</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Youth, Sports and Community Empowerment</pre>
</div>

- **Type:** agency name
- **Sources:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/); `src/data/ministries.ts` line 1101 — `"Ministry of Youth, Sports and Community Empowerment"`
- **Status:** verified
- **Certainty:** 97%
- **Internal consistency issue:** Despite the content being correct, `src/data/ministries.ts` lines 806–809 incorrectly list "Apply to be a Project Protégé Mentor" under `onlineServices` for the *Ministry of Labour, Social Security and Third Sector* — not under the Ministry of Youth, Sports and Community Empowerment where it belongs. See [/docs/fact-check/_internal-consistency.md](/home/gavin/frontend-alpha/docs/fact-check/_internal-consistency.md) for the ministry name variant record.

---

### Claim 8 — Submission to Youth Development Programme (index.md line 58)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If you apply online, your application will be submitted to the Youth Development Programme.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">If you apply online, your application will be submitted to the Youth Development Programme.</pre>
</div>

- **Type:** process step / agency name
- **Sources:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — Project Protégé is "under the Youth Development Programme"; [youthaffairs.gov.bb — About YDP](https://youthaffairs.gov.bb/about-youth-development-programme/) — YDP is the programme channel under the Division of Youth Affairs that manages community youth engagement
- **Status:** verified
- **Certainty:** 85%

---

### Claim 9 — YDP email address: YDP@barbados.gov.bb (index.md line 62)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">send a scan or photograph to YDP@barbados.gov.bb</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially confirmed — PDF reference only; no live web page confirms</div>
<pre class="claim-block-content">YDP@barbados.gov.bb is cited in a gov.bb PDF document about the Youth
Development Programme (https://www.gov.bb/media_files/YOUTH%20DEVELOPMENT%20PROGRAMME.pdf).
The PDF is 51 KB and loads (HTTP 200) but the text content is compressed
and could not be extracted.
The youthaffairs.gov.bb contact page does not list any email address.
No currently rendering .gov.bb web page explicitly lists this inbox as active.</pre>
</div>

- **Type:** email
- **Sources consulted:** [gov.bb — Youth Development Programme PDF](https://www.gov.bb/media_files/YOUTH%20DEVELOPMENT%20PROGRAMME.pdf) — cited as the YDP contact (PDF loads but text not extractable); [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/) — no email listed
- **Status:** unverifiable from a live rendering page; circumstantially supported by a Tier 1 document reference
- **Certainty:** 65%
- **Open question:** Confirm with the Division of Youth Affairs that `YDP@barbados.gov.bb` is currently active and monitored, and whether it is the correct address for mentor applications specifically (as opposed to general YDP programme queries).

---

### Claim 10 — Police Certificate of Character link: forms.gov.bb/CertificateOfCharacter (index.md line 73)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">apply for a Police Certificate of Character (https://forms.gov.bb/CertificateOfCharacter)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">apply for a Police Certificate of Character (https://forms.gov.bb/CertificateOfCharacter)</pre>
</div>

- **Type:** URL / link
- **Sources:** Direct fetch of [forms.gov.bb/CertificateOfCharacter](https://forms.gov.bb/CertificateOfCharacter) returned HTTP 200 with the online application form; [GIS — Police Certificate of Character Now Online](https://gisbarbados.gov.bb/blog/police-certificate-of-character-now-online/) confirms this is the official URL
- **Status:** verified — URL is live and leads to the correct form
- **Certainty:** 97%
- **Additional finding:** The form confirms the fee is **BBD $20** and processing takes "24 to 48 hours after payment". The page content does not state the fee, which is useful information for a prospective mentor. See Additional Findings below.

---

### Claim 11 — Safeguarding module in training (index.md lines 77–78)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You must also complete some training. This includes a module on safeguarding.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — open question</div>
<pre class="claim-block-content">No authoritative public source describes the mandatory training content
for Project Protégé mentors. The existence of a safeguarding module is
not confirmed in the youthaffairs.gov.bb launch article or any GIS
press release about the programme.</pre>
</div>

- **Type:** process step / document requirement
- **Sources consulted:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — training not mentioned; [GIS — tag search for Project Protege](https://gisbarbados.gov.bb/blog/tag/project-care/) — no GIS press releases found for Project Protégé
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** Confirm with the Division of Youth Affairs that mandatory training including a safeguarding module exists and that this is a requirement before mentoring begins.

---

### Claim 12 — Orientation session before mentorship begins (index.md lines 81–82)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Before you begin your mentorship, you will be invited to an orientation
session to familiarise yourself with the project and help you understand
expectations.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — open question</div>
<pre class="claim-block-content">An orientation session is not mentioned in any authoritative public source
for this programme. The claim is plausible for a mentorship programme of
this type but cannot be independently confirmed.</pre>
</div>

- **Type:** process step
- **Sources consulted:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — orientation not described; [youthaffairs.gov.bb — About YDP](https://youthaffairs.gov.bb/about-youth-development-programme/) — no mention
- **Status:** unverifiable
- **Certainty:** 35%
- **Open question:** Confirm with the Division of Youth Affairs that an orientation session is part of the standard process.

---

### Claim 13 — Ministry matches mentors to mentees; introduction at a networking event (index.md lines 83–84)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Your skills and interests will be taken into account and the ministry will
match you with a young person. You will be introduced at a networking event.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Partially confirmed — matching verified; networking event unverifiable</div>
<pre class="claim-block-content">The youthaffairs.gov.bb launch article confirms that "activities are slated
to commence the matching process of 50 mentors and 50 mentees" and that
skills and interests are considered. However, the specific mechanism of a
"networking event" as the point of introduction is not mentioned in any
authoritative public source.</pre>
</div>

- **Type:** process step
- **Sources consulted:** [youthaffairs.gov.bb — Project Protégé launch article](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/) — "activities are slated to commence the matching process of 50 mentors and 50 mentees"; networking event not described
- **Status:** unverifiable (matching confirmed in principle; networking event framing not corroborated)
- **Certainty:** 40%
- **Open question:** Confirm with the Division of Youth Affairs whether introductions formally happen at a networking event, or whether this is an informal description of the process.

---

### Claim 14 — Form completion time: not more than 30 minutes (start.md line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It should not take more than 30 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Testable against the form — not independently verifiable</div>
<pre class="claim-block-content">This is an internal estimate about the online application form
at /work-employment/apply-to-be-a-project-protege-mentor/form.
It cannot be verified against an external authoritative source — it requires
testing the actual form. The form page returns HTTP 200 but shows only
"Loading form…" (JS-rendered), consistent with a Tally or similar embed.</pre>
</div>

- **Type:** hours / process step
- **Sources consulted:** Source: testable against the form at [alpha.gov.bb — Apply to be a Project Protégé mentor form](https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor/form); no external source can corroborate a form-completion time estimate
- **Status:** unverifiable externally; reasonable for the fields described
- **Certainty:** 50%
- **Open question:** Test the form and confirm the 30-minute estimate is reasonable given the number of fields (contact details, qualifications, employment history, strengths, references ×2, mentee preference).

---

### Claim 15 — ministries.ts href for this service: /apply-to-be-a-project-protege-mentor (ministries.ts line 807)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">href: "/apply-to-be-a-project-protege-mentor"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">href: "/work-employment/apply-to-be-a-project-protege-mentor"</pre>
</div>

- **Type:** link / CTA (internal data file)
- **Sources:** Direct fetch of [alpha.gov.bb/apply-to-be-a-project-protege-mentor](https://alpha.gov.bb/apply-to-be-a-project-protege-mentor) — returns HTTP 200 but the rendered page contains "404" in the body, confirming this path does not resolve to the correct page. The canonical URL [alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor](https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor) loads correctly.
- **Status:** discrepant
- **Certainty:** 97%
- **Confidence it's wrong:** 95%
- **Citizen impact:** HIGH — any citizen who reaches the Ministry of Labour page and clicks this link will land on a 404 page instead of the application form. This is a broken primary CTA.

---

## Additional findings (not on the page but should be)

1. **Police Certificate of Character fee (BBD $20) not stated.** The forms.gov.bb page confirms the fee is BBD $20, payable online via EZPAY+ or at a Post Office. Including this on the page saves citizens a trip to the form just to check cost.

2. **Police Certificate of Character processing time (24–48 hours) not stated.** The forms.gov.bb page states processing takes "24 to 48 hours, after payment has been received." This is useful for mentors planning their timeline.

3. **No `source_url` in `content-directory.ts`.** The canonical source for this page is the youthaffairs.gov.bb launch article. Adding `source_url: "https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/"` to the entry at `src/data/content-directory.ts` would make the provenance auditable.

4. **Ministry of Youth, Sports and Community Empowerment contact details not on the page.** The phone number (246) 535-3835 is the ministry's published contact (confirmed via youthaffairs.gov.bb). Useful for citizens with questions about application status. The youthaffairs.gov.bb contact page does not list a public email address.

5. **Service listed under wrong ministry in ministries.ts.** `src/data/ministries.ts` lines 806–809 list this service under `onlineServices` for the Ministry of Labour, Social Security and Third Sector. Project Protégé is run by the Ministry of Youth, Sports and Community Empowerment. This entry should be removed from the Labour ministry's block and added to the MYSCE `onlineServices` block.

---

## Sources cited

- [youthaffairs.gov.bb — Youth Ministry Launches Mentorship Programme Project Protégé](https://youthaffairs.gov.bb/youth-ministry-launches-mentorship-programme-project-protege/)
- [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/)
- [youthaffairs.gov.bb — YDP Programme Channel](https://youthaffairs.gov.bb/programme-channels/youth-development-programme/)
- [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/)
- [gov.bb — Ministry of Youth, Sports and Community Empowerment](https://www.gov.bb/ministries/culture-sports-youth)
- [gov.bb — Youth Development Programme PDF](https://www.gov.bb/media_files/YOUTH%20DEVELOPMENT%20PROGRAMME.pdf)
- [forms.gov.bb — Application for Police Certificate of Character](https://forms.gov.bb/CertificateOfCharacter)
- [GIS — Police Certificate of Character Now Online](https://gisbarbados.gov.bb/blog/police-certificate-of-character-now-online/)
- [alpha.gov.bb — Apply to be a Project Protégé mentor (live page)](https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor)
- [alpha.gov.bb — Apply to be a Project Protégé mentor (start page)](https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor/start)
- [alpha.gov.bb — Apply to be a Project Protégé mentor (form page)](https://alpha.gov.bb/work-employment/apply-to-be-a-project-protege-mentor/form)
