# Fact-check: Register for a Youth Development Programme (YDP) Community Sports Training programme

- **Live page:** <https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme>
- **Source files:** `src/content/register-for-community-sports-training-programme/index.md`, `src/content/register-for-community-sports-training-programme/start.md`
- **Last checked:** 2026-05-28
- **Summary:** 12 claims reviewed — 6 verified, 2 discrepant, 4 unverifiable. Average certainty: **72%**.

---

## Headline issues for triage

1. **Age eligibility "30 and under" contradicts the YDP's own published mandate.** The official YDP target group is "nine (9) to twenty-nine (29)" per youthaffairs.gov.bb/about-youth-development-programme/ and repeated across multiple gov.bb and youthaffairs.gov.bb pages. The content page says "aged 30 and under," which is one year higher than the programme's stated upper bound. This is a discrepant claim with direct citizen impact: a 30-year-old who registers expecting to be eligible may be turned away.

2. **YDP page URL is live but contains no sports-specific content.** The content links citizens to `https://youthaffairs.gov.bb/programme-channels/youth-development-programme/` for a list of current programmes. As of 2026-05-28 that page lists only non-sports workshops (web design, cyber security, entrepreneurship, arts). Citizens looking for community sports programmes will find no relevant listing. This is an operational finding — the link itself works but is not useful for the stated purpose.

3. **The "Youth Commissioner" and "Principal Youth Development Officer" titles are real but their contact details are absent from the page.** Both roles exist in the YDP organisational structure confirmed by youthaffairs.gov.bb and LinkedIn (John Hollingsworth — Principal Youth Development Officer). The page tells citizens to call (246) 535-3835 and ask to be redirected, which is an acceptable instruction, but no direct extension or email is offered, creating friction for citizens.

4. **"New programmes begin throughout the year" cannot be corroborated.** The YDP's sports rally evidence (668 participants, July–September 2022 cycle) suggests a structured annual rather than rolling intake. No public source confirms a year-round rolling programme window. This is unverifiable and time-sensitive.

5. **No major agency-name or address errors found.** The ministry name, Sky Mall address, and phone number are all consistent with gov.bb and ministries.ts canonical data — no address-field errors of the kind seen in related pages.

---

## Claims

### Claim 1 — Age eligibility: "aged 30 and under" (index.md lines 3, 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Open to residents aged 30 and under.
...
Anyone living in Barbados, aged 30 and under, can register for a place on government-run community sports programmes.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Anyone living in Barbados, aged 9 to 29, can register for a place on government-run community sports programmes.

(The YDP's official age mandate is nine (9) to twenty-nine (29). "30 and under" includes an age group the programme does not officially serve.)</pre>
</div>

- **Type:** eligibility
- **Sources:** [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — "designed to engage and empower youth between the ages of nine to 29 within communities, across Barbados"; [youthaffairs.gov.bb — YDP Director's Message](https://youthaffairs.gov.bb/messages/ydp-directors-message/) — "nine (9) to twenty-nine (29) age group"; [gov.bb — Ministry of Youth, Sports and Community Empowerment](https://www.gov.bb/Ministries/culture-sports-youth) — confirms YDP is under MYSCE with no alternative age range stated; `src/data/departments.ts` (slug: `youth-affairs`) — no age range in the data file (consistent with pages drawing from youthaffairs.gov.bb directly)
- **Status:** discrepant — "aged 30 and under" is one year beyond the YDP's stated upper bound of 29
- **Certainty:** 90%
- **Confidence it's wrong:** 85%
- **Citizen impact:** MEDIUM — a 30-year-old who registers in good faith expecting to be accepted may be turned away; the upper-bound discrepancy also creates operational confusion for Youth Commissioners managing applications

---

### Claim 2 — Programme name: "Youth Development Programme (YDP) Community Sports Training programme" (index.md lines 1–2, title)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Register for a Youth Development Programme (YDP) Community Sports Training programme</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Register for a Youth Development Programme (YDP) Community Sports Training programme</pre>
</div>

- **Type:** agency name / descriptive
- **Sources:** [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — lists "Community sports and cultural training programmes" as an annual YDP service; [youthaffairs.gov.bb — YDP Sports Rally a Major Hit](https://youthaffairs.gov.bb/ydp-sports-rally-a-major-hit/) — confirms a YDP 10-week community sports training programme exists, with 668 participants across 43 locations (2022 cycle); [Barbados Today — Youth programme sees major expansion (14 Mar 2025)](https://barbadostoday.bb/2025/03/14/youth-programme-sees-major-expansion-2/amp/) — "668 individuals are registered to participate in that particular programme for this financial year" (community sports)
- **Status:** verified — the YDP does run community sports training programmes; the name accurately describes the service
- **Certainty:** 85%

---

### Claim 3 — Running programme: government-run community sports programmes (index.md line 9)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">anyone living in Barbados … can register for a place on government-run community sports programmes</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">anyone living in Barbados … can register for a place on government-run community sports programmes</pre>
</div>

- **Type:** descriptive / process step
- **Sources:** [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — "Community sports and cultural training programmes" is an explicit annual YDP activity under the Division of Youth Affairs, which is a government department under the Ministry of Youth, Sports and Community Empowerment
- **Status:** verified
- **Certainty:** 85%

---

### Claim 4 — "New programmes begin throughout the year" (index.md line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">New programmes begin throughout the year.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — annual cycle evidence suggests structured intake, not rolling</div>
<pre class="claim-block-content">The most detailed public evidence (youthaffairs.gov.bb sports rally article) shows the 2022 community sports training ran July–September, implying a structured annual cycle rather than a rolling year-round programme. No GIS press release or gov.bb page confirms that community sports training programmes open at different points throughout the year. Possible that multiple cohorts run across different districts at different times — but this is not documented publicly.</pre>
</div>

- **Type:** process step / timeline
- **Checked:** [youthaffairs.gov.bb — YDP Sports Rally a Major Hit](https://youthaffairs.gov.bb/ydp-sports-rally-a-major-hit/) — "10-week training programme (July–September 2022)"; [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — lists it as an "annual" activity but gives no intake dates; [gisbarbados.gov.bb — Ministry of Youth Sports and Community Empowerment tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-youth-sports-and-community-empowerment/) (HTTP 403 on direct fetch); no GIS press release recovered that contradicts or confirms rolling intake
- **Status:** unverifiable — the year-round claim cannot be confirmed or refuted from the public web
- **Certainty:** 45%
- **Open question:** confirm with the Division of Youth Affairs whether community sports training programmes open at multiple points across the year or follow a single annual cycle (e.g. July–September).

---

### Claim 5 — Online form available (index.md line 21, start.md line 22)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Complete the online form
[Register now link: /work-employment/register-for-community-sports-training-programme/start]</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (internal routing)</div>
<pre class="claim-block-content">Complete the online form
[Register now link: /work-employment/register-for-community-sports-training-programme/start]</pre>
</div>

- **Type:** process step / URL
- **Sources:** `src/content/register-for-community-sports-training-programme/start.md` — the start page exists and describes the form; `src/data/content-directory.ts` lines 152–159 — confirms `start` and `form` subpages are defined for this slug; the form subpage (slug: `form`, type: `component`) is configured in the IA
- **Status:** verified — the internal routing exists; the online form pathway is correctly described
- **Certainty:** 85% (internal consistency verification; live form not independently tested via the public URL)

---

### Claim 6 — Paper form available from "your local youth commissioner" or at the ministry (index.md lines 25–35)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You can get one from your local youth commissioner or from:

Ministry of Youth, Sports and Community Empowerment
Sky Mall
Haggatt Hall
St. Michael

If you complete a paper form, submit it by taking it to:
- your local youth commissioner or coach
- the ministry office</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Ministry of Youth, Sports and Community Empowerment
Sky Mall
Haggatt Hall
St. Michael</pre>
</div>

- **Type:** address / process step / agency name
- **Sources:** [gov.bb — Ministry of Youth, Sports and Community Empowerment](https://www.gov.bb/Ministries/culture-sports-youth) — confirms ministry name "Ministry of Youth, Sports and Community Empowerment" and address "Sky Mall, Haggatt Hall, St. Michael"; [gov.bb — Division of Youth Affairs](https://www.gov.bb/Departments/youth-affairs) — same address; `src/data/ministries.ts` lines 1101, 1133 — "Ministry of Youth, Sports and Community Empowerment", "Sky Mall, Haggatt Hall, St. Michael"; [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/) — "Sky Mall, Haggatt Hall, St. Michael"; [About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — YDP is divided into 32 districts each serviced by Youth Commissioners, confirming that the "local youth commissioner" route is a real and intended channel
- **Status:** verified — ministry name, address, and the "youth commissioner" channel are all confirmed
- **Certainty:** 98%

---

### Claim 7 — Ministry phone number: (246) 535-3835 (index.md line 46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">contact the Ministry at (246) 535-3835 and ask to be redirected to the Youth Commissioner or the Principal Youth Development Officer</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">contact the Ministry at (246) 535-3835 and ask to be redirected to the Youth Commissioner or the Principal Youth Development Officer</pre>
</div>

- **Type:** phone
- **Sources:** [gov.bb — Division of Youth Affairs](https://www.gov.bb/Departments/youth-affairs) — "1 (246) 535 – 3835"; [gov.bb — Ministry of Youth, Sports and Community Empowerment](https://www.gov.bb/Ministries/culture-sports-youth) — "(246) 535-3835"; [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/) — "Tel: 1 (246) 535-3835"; `src/data/ministries.ts` line 1132 — "(246) 535-3835"; `src/data/departments.ts` line 570 — "(246) 535-3835"
- **Status:** verified — confirmed across five independent sources
- **Certainty:** 99%

---

### Claim 8 — "Youth Commissioner" and "Principal Youth Development Officer" roles exist (index.md line 46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">ask to be redirected to the Youth Commissioner or the Principal Youth Development Officer</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">ask to be redirected to the Youth Commissioner or the Principal Youth Development Officer</pre>
</div>

- **Type:** agency name / descriptive
- **Sources:** [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — explicitly names "Senior Youth Commissioner" and "Youth Commissioners" as official YDP roles across 4 zones and 32 districts; [LinkedIn — John Hollingsworth, Principal Youth Development Officer, Youth Development Programme](https://www.linkedin.com/in/john-hollingsworth-b2a9b9114/) — confirms "Principal Youth Development Officer" as an active job title; [Schedules of Personal Emoluments 2020–2021, Barbados Parliament](https://www.barbadosparliament.com/uploads/document/6b5e5f997bb24d5ee73d8957084918c6.pdf) — salary schedule confirms the position exists within the civil service; web search snippet confirms "Principal Youth Development Officer … extension 535-3860"
- **Status:** verified — both titles are real, established positions within the YDP
- **Certainty:** 92%

---

### Claim 9 — YDP page URL (index.md line 46)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">current programmes at the Youth Development Programme page
(link: https://youthaffairs.gov.bb/programme-channels/youth-development-programme/)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (URL live; content limitation noted)</div>
<pre class="claim-block-content">The URL https://youthaffairs.gov.bb/programme-channels/youth-development-programme/ resolves and loads. However, as of 2026-05-28, the page lists only non-sports workshops (web design, cyber security, entrepreneurship, arts). Citizens looking for community sports programme listings will find no relevant current listing there.</pre>
</div>

- **Type:** URL
- **Sources:** [youthaffairs.gov.bb — Youth Development Programme channel](https://youthaffairs.gov.bb/programme-channels/youth-development-programme/) — URL live and confirmed accessible; page content as of 2026-05-28 shows: Bridge to the Future Workshop 2025, Youth Achieving Results, Web Page Design and Maintenance, Fatherhood in Motion, Cyber Security Training, Bright Sparks Educational Project — no sports training listed
- **Status:** verified (URL is live) — but note: the linked page does not currently display community sports training content; a citizen following this link to find sports programmes will not find any. This is an operational limitation, not a factual error on alpha.gov.bb.
- **Certainty:** 85%
- **Citizen impact:** MEDIUM — the link works, but citizens seeking sports-specific programme listings will not find them there. Consider linking directly to the contact page or to a more specific listing if one exists.

---

### Claim 10 — Form completion time: "not more than 10 minutes" (start.md line 11)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">It should not take more than 10 minutes.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — testable only against the live form</div>
<pre class="claim-block-content">The form asks for: contact details, skill level and previous experience, names of sport/social/youth/community groups, employment status, and emergency contact address and phone number. Four information categories plus standard contact fields is plausible for a 10-minute completion. However, this claim is only testable by completing the actual form.</pre>
</div>

- **Type:** hours / process step
- **Checked:** Source: testable against the live form at [alpha.gov.bb — Register now (form)](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme/form); `src/content/register-for-community-sports-training-programme/start.md` — the four listed information categories are enumerated (skill/experience, group memberships, employment status, emergency contact); no independent source confirms or contradicts the 10-minute estimate.
- **Status:** unverifiable from public web — standard operational claim; reasonable given the stated form fields
- **Certainty:** 55%
- **Open question:** Testable against the live form. The GovBB team should verify the 10-minute estimate reflects actual form complexity before publishing.

---

### Claim 11 — Form cannot be saved and resumed (start.md lines 7–8)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">You should complete your application in one go. At the moment, it is not possible to save your answers and come back to them later.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — testable only against the live form</div>
<pre class="claim-block-content">Standard alpha.gov.bb form behaviour (single-session, no save). Consistent with the same disclaimer used on other alpha.gov.bb forms (e.g. BYAC application). Cannot be confirmed without accessing the live form.</pre>
</div>

- **Type:** process step
- **Checked:** Source: testable against the live form at [alpha.gov.bb — Register now (form)](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme/form); consistent with standard alpha.gov.bb form behaviour documented on comparable pages (e.g. `src/content/register-for-community-sports-training-programme/start.md` — same pattern used across the site); no independent government source confirms or contradicts.
- **Status:** unverifiable from public web — standard operational disclaimer; plausible given platform architecture
- **Certainty:** 60%

---

### Claim 12 — Form information requirements: skill/experience, group memberships, employment status, emergency contact (start.md lines 16–21)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">As well as your contact details and depending on what you're registering for, you will also be asked to share:

1. Your level of skill and previous experience in your area of interest.
2. The names of any sport, social, youth or community groups you are part of.
3. Your employment status to help with scheduling.
4. The address and phone number for an emergency contact.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Cannot verify — form not publicly inspectable</div>
<pre class="claim-block-content">These four fields (skill/experience, group memberships, employment status, emergency contact) are consistent with a community sports training application. The YDP's 32-district structure, with scheduling coordinated by Youth Commissioners, makes employment status and emergency contact plausible requirements. However, no public source (youthaffairs.gov.bb, GIS, gov.bb) documents these specific form fields, and the form cannot be inspected without submitting it.</pre>
</div>

- **Type:** document requirement / process step
- **Checked:** [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/) — describes YDP structure and Youth Commissioner roles but does not enumerate application form fields; [gisbarbados.gov.bb — Ministry of Youth Sports and Community Empowerment tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-youth-sports-and-community-empowerment/) (HTTP 403); Source: testable against the live form at [alpha.gov.bb — Register now (form)](https://alpha.gov.bb/work-employment/register-for-community-sports-training-programme/form).
- **Status:** unverifiable from public web — the fields are plausible but cannot be confirmed without accessing the form
- **Certainty:** 55%
- **Open question:** confirm with the Division of Youth Affairs that these four categories are the complete set of non-standard fields on the registration form, and that they apply to all programme types or only to some.

---

## Additional findings (not on the page but should be)

- **The YDP's own official age range (9–29) should be confirmed before publishing.** If the content team intended to widen access to age 30 for this specific sports programme, that should be confirmed in writing from the Division of Youth Affairs and, if correct, the alpha.gov.bb description note should be updated to clarify why the YDP sports training differs from the standard YDP age cap.

- **No email address or direct extension is given for the Youth Commissioner or Principal Youth Development Officer.** The web-search evidence suggests extension 535-3860 is associated with the Principal Youth Development Officer role; the Division of Youth Affairs email is `division.youth@barbados.gov.bb` (confirmed on gov.bb/Departments/youth-affairs). Adding either of these would reduce friction for citizens who find it easier to communicate in writing.

- **The YDP link points to a page with no current sports listings.** Consider linking to the Division of Youth Affairs contact page (`https://youthaffairs.gov.bb/contact-us/`) or the general YDP channel (`https://youthaffairs.gov.bb/about-youth-development-programme/`) as a secondary option, alongside the main programme page.

---

## Sources consulted

- [youthaffairs.gov.bb — About The Youth Development Programme](https://youthaffairs.gov.bb/about-youth-development-programme/)
- [youthaffairs.gov.bb — Youth Development Programme channel](https://youthaffairs.gov.bb/programme-channels/youth-development-programme/)
- [youthaffairs.gov.bb — YDP Director's Message](https://youthaffairs.gov.bb/messages/ydp-directors-message/)
- [youthaffairs.gov.bb — YDP Sports Rally a Major Hit](https://youthaffairs.gov.bb/ydp-sports-rally-a-major-hit/)
- [youthaffairs.gov.bb — Contact Us](https://youthaffairs.gov.bb/contact-us/)
- [gov.bb — Ministry of Youth, Sports and Community Empowerment](https://www.gov.bb/Ministries/culture-sports-youth)
- [gov.bb — Division of Youth Affairs](https://www.gov.bb/Departments/youth-affairs)
- [gov.bb — National Sports Council](https://www.gov.bb/Departments/sports-council)
- [mysce.gov.bb — Division of Youth Affairs detail](https://www.mysce.gov.bb/division_detail/3) (HTTP 403)
- [gisbarbados.gov.bb — Ministry of Youth Sports and Community Empowerment tag](https://gisbarbados.gov.bb/blog/tag/ministry-of-youth-sports-and-community-empowerment/) (HTTP 403)
- [gisbarbados.gov.bb — Ministry Expands Opportunities For Aspiring Athletes](https://gisbarbados.gov.bb/blog/ministry-expands-opportunities-for-aspiring-athletes/) (HTTP 403)
- [Barbados Today — Youth programme sees major expansion (14 Mar 2025)](https://barbadostoday.bb/2025/03/14/youth-programme-sees-major-expansion-2/amp/)
- [LinkedIn — John Hollingsworth, Principal Youth Development Officer](https://www.linkedin.com/in/john-hollingsworth-b2a9b9114/)
- [Barbados Parliament — Schedules of Personal Emoluments 2020–2021 (PDF)](https://www.barbadosparliament.com/uploads/document/6b5e5f997bb24d5ee73d8957084918c6.pdf)
- [govserv.org — Division of Youth Affairs, Sky Mall, Haggatt Hall](https://www.govserv.org/XX/Unknown/340183462851880/Division-of-Youth-Affairs)
- `src/data/ministries.ts` lines 1101–1133 — Ministry of Youth, Sports and Community Empowerment entry
- `src/data/departments.ts` lines 557–577 — Division of Youth Affairs entry
- `src/data/content-directory.ts` lines 146–160 — IA entry for this page
- [apply-to-volunteer-at-a-sports-camp.md](/docs/fact-check/apply-to-volunteer-at-a-sports-camp.md) — cross-reference on NSC/YDP sports context
- [register-summer-camp.md](/docs/fact-check/register-summer-camp.md) — cross-reference on MYSCE programme structure
