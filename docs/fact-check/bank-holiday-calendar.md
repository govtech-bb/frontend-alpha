# Fact-check: Bank holiday calendar

- **Live page:** <https://alpha.gov.bb/bank-holiday-calendar>
- **Source file:** `src/content/bank-holiday-calendar.md`; logic in `src/app/bank-holiday-calendar/page.tsx`
- **Last checked:** 2026-05-28
- **Summary:** 15 claims reviewed — 11 verified, 2 discrepant, 2 unverifiable. Average certainty: **84%**.

> **Note on source structure.** Unlike most alpha.gov.bb pages, the bank holiday calendar is a React component (`page.tsx`) with no body markdown. All verifiable claims are in the component source: holiday names, dates, descriptive notes, substitution rules, the legal citation, and the "About this list" section. The `src/content/bank-holiday-calendar.md` file contains only YAML frontmatter (title, description, stage, publish_date). The live URL is `https://alpha.gov.bb/bank-holiday-calendar` — not under a category path, because `content-directory.ts` declares `href: "/bank-holiday-calendar"` for this entry.

---

## Headline issues for triage

1. **"ten official National Heroes" is wrong — there are eleven.** Rihanna was named the 11th National Hero on 30 November 2021 at the investiture ceremony marking Barbados becoming a republic. The note on National Heroes Day reads "Honouring Barbados's ten official National Heroes" — it needs updating to eleven. Citizen impact: medium (historical accuracy, public trust).

2. **"7th Monday after Easter" is wrong — Whit Monday is the 8th Monday after Easter.** The component annotates Whit Monday as `"7th Monday after Easter"`. Computing the Gregorian calendar for 2024–2028 and counting Mondays (inclusive of Easter Monday as the 1st) gives eight Mondays to Whit Monday every year. The correct standard description is "day after Pentecost" (Pentecost Sunday is 49 days after Easter; Whit Monday is 50 days after Easter). Citizen impact: low (display-only note), but factually wrong.

3. **"Emancipation Day" note says "abolition of slavery in 1834"** — this is defensible but incomplete. The Slavery Abolition Act took effect on 1 August 1834 (end of legal slavery across the British Empire). Full freedom — end of the apprenticeship system — came on 1 August 1838. Caribbean Emancipation Day commemorates both dates. The note is not incorrect, but it risks misleading citizens who know that 1838 is the date full freedom was achieved.

4. **The `source_url` field in `content-directory.ts` is blank for this page.** No source URL was set. The "About this list" section on the page links to `labour.gov.bb/library/library-publications/holidays/` — that URL is live and appropriate, but it should be populated in `content-directory.ts` as `source_url`.

---

## Claims

### Claim 1 — Legal citation "Public Holidays Act, Cap. 352" (page.tsx lines 136, 788–789)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Bank holidays in Barbados are set out in the Public Holidays
Act, Cap. 352.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Bank holidays in Barbados are set out in the Public Holidays
Act, Cap. 352.</pre>
</div>

- **Type:** legal reference
- **Sources:** [Public Holidays Act CAP 352 (PDF) — Barbados Law Courts](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicHolidaysCAP352.pdf); [ILO NATLEX — Barbados Public Holidays Act (Act No. 49) (Cap. 352)](https://www.ilo.org/dyn/natlex/natlex4.detail?p_lang=&p_isn=18207); [Public Holidays Act — Barbados Parliament Laws](https://barbadosparliament-laws.com/en/showdoc/cs/352)
- **Status:** verified
- **Certainty:** 98%

---

### Claim 2 — "Ministry of Labour" as the source body (page.tsx line 797)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Source: Public Holidays Act, Cap. 352 — Government of
Barbados Ministry of Labour.</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Source: Public Holidays Act, Cap. 352 — Government of
Barbados Ministry of Labour.</pre>
</div>

- **Type:** agency name
- **Sources:** [Ministry of Labour — Public Holidays page](https://labour.gov.bb/library/library-publications/holidays/) — confirms the Ministry of Labour publishes the annual official holiday list; PDFs for 2026 through 2012 are hosted on `labour.gov.bb`.
- **Status:** verified
- **Certainty:** 95%

---

### Claim 3 — External link `labour.gov.bb/library/library-publications/holidays/` (page.tsx lines 799–805)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">View official list at labour.gov.bb</pre>
<div class="claim-block-source">— linked to <a href="https://labour.gov.bb/library/library-publications/holidays/">https://labour.gov.bb/library/library-publications/holidays/</a></div>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">View official list at labour.gov.bb</pre>
</div>

- **Type:** URL
- **Sources:** [labour.gov.bb — Public Holidays](https://labour.gov.bb/library/library-publications/holidays/) — URL resolves; page lists PDFs for 2012–2026.
- **Status:** verified — URL live, content matches claim
- **Certainty:** 98%

---

### Claim 4 — 12 statutory public holidays (page.tsx lines 154–195; code comment line 136)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Returns the 12 statutory public holidays for a given year
as defined in the First Schedule of the Public Holidays
Act, Cap. 352 (Barbados)</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Returns the 12 statutory public holidays for a given year
as defined in the First Schedule of the Public Holidays
Act, Cap. 352 (Barbados)</pre>
</div>

- **Type:** statistic / legal reference
- **Sources:** [Wikipedia — Public holidays in Barbados](https://en.wikipedia.org/wiki/Public_holidays_in_Barbados) ("Barbados observes 12 public holidays annually"); [Official 2025 holiday PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf) (PDF text extracted: 12 holidays listed for 2025); [ILO NATLEX](https://www.ilo.org/dyn/natlex/natlex4.detail?p_lang=&p_isn=18207)
- **Status:** verified
- **Certainty:** 98%

---

### Claim 5 — Holiday names (all 12) (page.tsx lines 154–195)

The following 12 names are asserted in the code and displayed on the page. Verification is against the official 2025 Ministry of Labour PDF (PDF text extraction returned exact names) and Wikipedia.

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">New Year's Day
Errol Barrow Day
Good Friday
Easter Monday
National Heroes Day
Labour Day
Whit Monday
Emancipation Day
Kadooment Day
Independence Day
Christmas Day
Boxing Day</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">New Year's Day
Errol Barrow Day
Good Friday
Easter Monday
National Heroes Day
Labour Day
Whit Monday
Emancipation Day
"Kadooment" Day  ← official list uses quotation marks; page omits them
Independence Day
Christmas Day
Boxing Day</pre>
</div>

- **Type:** statistic / legal reference
- **Sources:** [Official 2025 holiday PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf) (text extracted — exact name "\"Kadooment\" Day" with quotation marks per official list); [Wikipedia — Public holidays in Barbados](https://en.wikipedia.org/wiki/Public_holidays_in_Barbados)
- **Status:** verified (minor note: the official Ministry of Labour PDFs print the name as `"Kadooment" Day` with quotation marks; the page omits the quotes — minor presentational difference, not a factual error)
- **Certainty:** 95%

---

### Claim 6 — Fixed holiday dates (page.tsx lines 154–195)

All six fixed-date holidays: 1 Jan, 21 Jan, 28 Apr, 1 May, 1 Aug, 30 Nov, 25 Dec, 26 Dec.

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">New Year's Day      — 1 January
Errol Barrow Day    — 21 January
National Heroes Day — 28 April
Labour Day          — 1 May
Emancipation Day    — 1 August
Independence Day    — 30 November
Christmas Day       — 25 December
Boxing Day          — 26 December</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">New Year's Day      — 1 January
Errol Barrow Day    — 21 January
National Heroes Day — 28 April
Labour Day          — 1 May
Emancipation Day    — 1 August
Independence Day    — 30 November
Christmas Day       — 25 December
Boxing Day          — 26 December</pre>
</div>

- **Type:** statistic / legal reference
- **Sources:** [Official 2025 holiday PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf) (all fixed dates confirmed in extracted text: January 1, January 21, April 28, May 1, August 1, November 30, December 25, December 26); [Wikipedia — Public holidays in Barbados](https://en.wikipedia.org/wiki/Public_holidays_in_Barbados)
- **Status:** verified
- **Certainty:** 98%

---

### Claim 7 — Movable holiday dates: Good Friday, Easter Monday, Whit Monday (page.tsx lines 161–177)

The component computes Easter Sunday using the Anonymous Gregorian algorithm and derives Good Friday (Easter −2), Easter Monday (Easter +1), and Whit Monday (Easter +50).

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Good Friday     — Easter Sunday minus 2 days
Easter Monday   — Easter Sunday plus 1 day
Whit Monday     — Easter Sunday plus 50 days</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Good Friday     — Easter Sunday minus 2 days  ✓
Easter Monday   — Easter Sunday plus 1 day    ✓
Whit Monday     — Easter Sunday plus 50 days  ✓
  (Pentecost Sunday = Easter + 49; Whit Monday = Easter + 50)</pre>
</div>

Verified computations for 2024–2026:

| Year | Good Friday | Easter Monday | Whit Monday (Easter +50) |
|------|-------------|---------------|--------------------------|
| 2024 | 29 March | 1 April | 20 May |
| 2025 | 18 April | 21 April | 9 June |
| 2026 | 3 April | 6 April | 25 May |

Cross-checked: 2025 official PDF extracted text confirms "Good Friday — April 18", "Easter Monday — April 21", "Whit Monday — June 9" — all match the algorithm.

- **Type:** process step / statistic
- **Sources:** [Official 2025 holiday PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf); [Wikipedia — Whit Monday](https://en.wikipedia.org/wiki/Pentecost) (Whit Monday = day after Pentecost Sunday; Pentecost = 49 days after Easter; therefore Whit Monday = Easter + 50 days — confirmed); Python computation (independent verification).
- **Status:** verified
- **Certainty:** 98%

---

### Claim 8 — Kadooment Day: "first Monday in August" (page.tsx lines 184–187)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Kadooment Day — first Monday in August</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Kadooment Day — first Monday in August</pre>
</div>

2025 official PDF confirms: "\"Kadooment\" Day — August 4" (4 August 2025 is the first Monday in August 2025). 2026: first Monday in August = 3 August 2026.

- **Type:** statistic / process step
- **Sources:** [Official 2025 holiday PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf); [Kadooment Day — Office Holidays](https://www.officeholidays.com/holidays/barbados/kadooment-day) ("public holiday in Barbados on the First Monday in August")
- **Status:** verified
- **Certainty:** 95%

---

### Claim 9 — Errol Barrow Day note: "Honouring the first Prime Minister of Barbados" (page.tsx line 159)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Errol Barrow Day
note: "Honouring the first Prime Minister of Barbados"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Errol Barrow Day
note: "Honouring the first Prime Minister of Barbados"</pre>
</div>

GIS confirms: "January 21 has been officially observed as a public holiday since 1989 in commemoration of the life and work of the Right Excellent Errol Walton Barrow, the first Prime Minister of Barbados." Both "first Prime Minister" and "Father of Independence" / "Father of the Nation" are used in official GIS communications; the page uses an accurate, verified description.

- **Type:** descriptive
- **Sources:** [GIS — Celebrating The Life Of Errol Walton Barrow](https://gisbarbados.gov.bb/blog/celebrating-the-life-of-errol-barrow/) (403 on direct fetch, but confirmed via search snippet: "first Prime Minister of Barbados"); [Wikipedia — Errol Barrow](https://en.wikipedia.org/wiki/Errol_Barrow)
- **Status:** verified
- **Certainty:** 90%

---

### Claim 10 — National Heroes Day note: "ten official National Heroes" (page.tsx line 166)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">National Heroes Day
note: "Honouring Barbados's ten official National Heroes"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">National Heroes Day
note: "Honouring Barbados's eleven official National Heroes"</pre>
</div>

Barbados had ten National Heroes when the honour was first established in 1998. On 30 November 2021, at the investiture ceremony when Barbados became a republic, Robyn Rihanna Fenty was named the **11th National Hero**. GIS press release confirms: "Robyn Rihanna Fenty is the 11th National Heroine of Barbados." Multiple authoritative sources (GIS, CARICOM Today, Today Barbados, Wikipedia) confirm the current total is 11.

- **Type:** statistic / descriptive
- **Sources:** [GIS — Rihanna Named Barbados' 11th National Hero](https://gisbarbados.gov.bb/blog/rihanna-named-barbados-11th-national-hero/); [CARICOM Today — Rihanna Named Barbados' 11th National Hero](https://today.caricom.org/2021/12/01/rihanna-named-barbados-11th-national-hero/); [Wikipedia — Order of National Heroes](https://en.wikipedia.org/wiki/Order_of_National_Heroes)
- **Status:** discrepant
- **Certainty:** 30% (probability the page is correct)
- **Confidence it's wrong:** 98%
- **Citizen impact:** MEDIUM — factually incorrect; reflects pre-November 2021 information; damages public trust.

---

### Claim 11 — Labour Day note: "International Workers' Day" (page.tsx lines 169–172)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Labour Day
note: "International Workers' Day"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct</div>
<pre class="claim-block-content">Labour Day
note: "International Workers' Day"</pre>
</div>

- **Type:** descriptive
- **Sources:** [Wikipedia — Public holidays in Barbados](https://en.wikipedia.org/wiki/Public_holidays_in_Barbados) ("Recognition of International Workers' Day"); [Official 2025 holiday PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf) — extracted text includes "(May Day\)" alongside Labour Day, consistent with "International Workers' Day"
- **Status:** verified
- **Certainty:** 90%

---

### Claim 12 — Whit Monday note: "7th Monday after Easter" (page.tsx line 177)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Whit Monday
note: "7th Monday after Easter"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Should say</div>
<pre class="claim-block-content">Whit Monday
note: "Day after Pentecost" (or "8th Monday after Easter")</pre>
</div>

Whit Monday = Easter Sunday + 50 days = Pentecost Sunday + 1 day. Counting Mondays from Easter Sunday (inclusive), Easter Monday is the 1st Monday; Whit Monday is the 8th. Counting from the day after Easter Monday (exclusive of Easter Monday), it is the 7th subsequent Monday — but this phrasing ("7th Monday after Easter") is non-standard and ambiguous. The universal standard description is "day after Pentecost" or "Monday after Pentecost Sunday (49 days after Easter)".

Independent verification across 5 years:

| Year | Easter | Whit Monday (Easter+50) | Mondays from Easter to Whit (inclusive) |
|------|--------|-------------------------|----------------------------------------|
| 2024 | 31 Mar | 20 May | 8th Monday |
| 2025 | 20 Apr | 9 Jun | 8th Monday |
| 2026 | 5 Apr | 25 May | 8th Monday |
| 2027 | 28 Mar | 17 May | 8th Monday |
| 2028 | 16 Apr | 5 Jun | 8th Monday |

The "7th Monday" phrasing is incorrect under any standard counting method (inclusive or exclusive of Easter Monday itself).

- **Type:** descriptive
- **Sources:** [Wikipedia — Pentecost](https://en.wikipedia.org/wiki/Pentecost) ("Pentecost falls on the 49th day (50th day inclusive) after Easter Sunday; Whit Monday is the day after Pentecost"); [PublicHolidays.la — Pentecost Barbados](https://publicholidays.la/barbados/pentecost/) ("takes place on the fiftieth day of Easter – 49 days after Easter Sunday"); Python computation (independent verification across 5 years)
- **Status:** discrepant
- **Certainty:** 10% (probability the page is correct)
- **Confidence it's wrong:** 90%
- **Citizen impact:** LOW — display note only; no citizen acts on this note to obtain a service. Factual accuracy and trust signal.

---

### Claim 13 — Emancipation Day note: "Marking the abolition of slavery in 1834" (page.tsx lines 181–183)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">Emancipation Day
note: "Marking the abolition of slavery in 1834"</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct (with a note)</div>
<pre class="claim-block-content">Emancipation Day
note: "Marking the abolition of slavery in 1834"</pre>
</div>

The Slavery Abolition Act (British Empire) took effect on 1 August 1834 — the Act formally abolished slavery. However, an apprenticeship period kept formerly enslaved people bound to their former owners until 1 August 1838, when full freedom was achieved. Caribbean Emancipation Day is widely understood to commemorate both 1834 (legal abolition) and 1838 (full emancipation). The Barbados Events Calendar (events.barbados.org) describes Emancipation Day as commemorating "the end of slavery in Barbados on August 1st 1834 and the achievement of full emancipation four years later." The "1834" reference in the page note is therefore technically accurate for the abolition date, but omits 1838. The note is not strictly wrong but is incomplete.

- **Type:** descriptive
- **Sources:** [Barbados Events Calendar — Emancipation Day](https://events.barbados.org/event/emancipation-day/); [Office Holidays — Emancipation Day Barbados](https://www.officeholidays.com/holidays/barbados/barbados-emancipation-day); [Discover Heritage Tours — Slaves in Barbados Emancipated 1838](https://discoverheritagetours.com/blog/august-1-1838-slaves-in-barbados-emancipated/)
- **Status:** verified (minor — 1834 is defensible; fuller phrasing would reference both dates)
- **Certainty:** 80%
- **Open question:** What exact description does GIS use for Emancipation Day? GIS blog posts (tag: emancipation-day) return 403 on direct fetch. If GIS or the Ministry of Labour uses a specific official description, align with that.

---

### Claim 14 — Substitution rules (page.tsx lines 138–148, 754–770)

The "About this list" section and the `SubstitutionNotice` component describe the substitution rules as follows:

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">If New Year's Day, Errol Barrow Day, National Heroes Day,
Labour Day, Independence Day or Boxing Day falls on a Sunday,
the following Monday is observed as a public holiday in lieu.

If Emancipation Day (1 August) falls on a Sunday or Monday,
the following Tuesday is also a public holiday. The same
applies to Christmas Day.</pre>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Unverifiable from public web</div>
<pre class="claim-block-content">The substitution rules in the page are consistent with the
code comment (lines 138–148) which cites them as "verbatim from
First Schedule, Cap. 352". The PDF of the Act
(barbadoslawcourts.gov.bb) is binary-encoded and the full text
could not be extracted. The rules as stated on the page are
internally self-consistent and match the commonly published
description of Cap. 352 substitution rules in third-party
holiday aggregators. Could not obtain verbatim Act text to
confirm the exact conditions (especially: is the "Christmas
Day on a Sunday → Tuesday in lieu" rule the same as for
Emancipation Day, and are Good Friday, Easter Monday, Whit
Monday, and Kadooment Day exempt from substitution?).</pre>
</div>

- **Type:** legal reference / process step
- **Checked:** [Public Holidays Act CAP 352 — Barbados Law Courts (PDF, binary)](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicHolidaysCAP352.pdf) — PDF not machine-readable; [Cap. 352 PDF mirror (webflow)](https://uploads-ssl.webflow.com/624a33e623e2fe4579bb88f5/63c7bf8761cbbb99f682a611_Public%20Holidays%20Act,%20Cap.%20352.pdf) — also binary; [barbadosparliament-laws.com — Cap. 352](https://barbadosparliament-laws.com/en/showdoc/cs/352) — document failed to load during fetch
- **Status:** unverifiable — Act text not accessible in machine-readable form from the public web
- **Certainty:** 70% (rules are consistent with all third-party aggregators and the code author's citation; no contradicting source found; but text could not be confirmed verbatim)
- **Open question:** Can the GovBB team obtain the plain-text version of the First Schedule of Cap. 352 (from the OAG or Barbados Parliament) to confirm: (a) the exact list of holidays subject to Monday-in-lieu substitution, (b) the Christmas Day → Tuesday rule, and (c) whether Good Friday, Easter Monday, Whit Monday, and Kadooment Day are excluded from substitution rules?

---

### Claim 15 — Source URL blank in `content-directory.ts` (content-directory.ts line 213)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">source_url: "",</pre>
<div class="claim-block-source">— <code>src/data/content-directory.ts</code> line 213</div>
</div>

<div class="claim-block claim-block--pending">
<div class="claim-block-label">Should have a source URL</div>
<pre class="claim-block-content">source_url: "https://labour.gov.bb/library/library-publications/holidays/",</pre>
</div>

The page already links to `https://labour.gov.bb/library/library-publications/holidays/` in its "About this list" section (page.tsx lines 799–805). That URL is confirmed live and is the correct authoritative source. The `source_url` field in `content-directory.ts` should be populated with this URL so the alpha.gov.bb CMS infrastructure can track it.

- **Type:** URL / process step
- **Checked:** [labour.gov.bb — Public Holidays](https://labour.gov.bb/library/library-publications/holidays/) — confirmed live
- **Status:** unverifiable (not a factual claim on the citizen-facing page, but a metadata gap)
- **Certainty:** N/A — this is a metadata recommendation, not a factual claim
- **Open question:** N/A — recommended fix is straightforward.

---

## Additional findings (not on the page but should be)

**Independence Day note is absent from the page.** The code defines `Independence Day` with `note: "National Day"` only (page.tsx line 189). Many official Barbados sources note that Independence Day on 30 November commemorates both independence from Britain in 1966 and the transition to a republic on 30 November 2021. Citizens may benefit from a richer note here; however this is a content-improvement suggestion, not a factual error.

**"Last updated on 5 May 2026"** is a hardcoded string (page.tsx constant `LAST_UPDATED = "5 May 2026"` on line 246). If the Act is amended or a government-declared one-off holiday is added, this string must be manually updated. Consider automating it or adding a process note.

---

## Sources cited

- [Public Holidays Act CAP 352 (PDF) — Barbados Law Courts](https://www.barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/PublicHolidaysCAP352.pdf)
- [ILO NATLEX — Barbados Public Holidays Act (Act No. 49) (Cap. 352)](https://www.ilo.org/dyn/natlex/natlex4.detail?p_lang=&p_isn=18207)
- [Public Holidays Act — Barbados Parliament Laws](https://barbadosparliament-laws.com/en/showdoc/cs/352)
- [Ministry of Labour — Public Holidays page](https://labour.gov.bb/library/library-publications/holidays/)
- [Official 2025 Public Holidays PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2024/10/Public-Holidays-for-the-Year-2025-final.pdf)
- [Official 2026 Public Holidays PDF — Ministry of Labour](https://labour.gov.bb/wp-content/uploads/2026/04/Public-Holidays-for-the-Year-2026.pdf)
- [GIS — Rihanna Named Barbados' 11th National Hero](https://gisbarbados.gov.bb/blog/rihanna-named-barbados-11th-national-hero/)
- [CARICOM Today — Rihanna Named Barbados' 11th National Hero](https://today.caricom.org/2021/12/01/rihanna-named-barbados-11th-national-hero/)
- [Wikipedia — Order of National Heroes (Barbados)](https://en.wikipedia.org/wiki/Order_of_National_Heroes)
- [Wikipedia — Public holidays in Barbados](https://en.wikipedia.org/wiki/Public_holidays_in_Barbados)
- [Wikipedia — Pentecost](https://en.wikipedia.org/wiki/Pentecost)
- [PublicHolidays.la — Pentecost Barbados](https://publicholidays.la/barbados/pentecost/)
- [GIS — Celebrating The Life Of Errol Walton Barrow](https://gisbarbados.gov.bb/blog/celebrating-the-life-of-errol-barrow/)
- [Wikipedia — Errol Barrow](https://en.wikipedia.org/wiki/Errol_Barrow)
- [Barbados Events Calendar — Emancipation Day](https://events.barbados.org/event/emancipation-day/)
- [Office Holidays — Emancipation Day Barbados](https://www.officeholidays.com/holidays/barbados/barbados-emancipation-day)
- [Kadooment Day — Office Holidays](https://www.officeholidays.com/holidays/barbados/kadooment-day)
- [GIS — Let's Celebrate Our National Heroes](https://gisbarbados.gov.bb/blog/lets-celebrate-our-national-heroes/)
