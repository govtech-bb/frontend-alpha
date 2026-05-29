---
name: fact-check
description: Fact-check a GovBB alpha content page. Extract every verifiable claim, verify against authoritative sources (gov.bb, GIS, Acts of Barbados), and write a structured report at docs/fact-check/<slug>.md with a certainty % per claim. Then update the docs/fact-check/README.md dashboard. Use when the user invokes /fact-check.
---

# fact-check

Fact-check one content page (or a batch) on the GovBB alpha site. Produce
auditable, source-cited evidence per claim — not a vibes-based read.

If the line below has content after the colon, treat it as the target.
Otherwise, ask the user what to fact-check (a specific slug, a list, or
"the next unchecked page").

Target: $ARGUMENTS

## 1. Resolve the target

The target is one of:

- A content slug like `apply-for-a-passport` or a path like
  `src/content/get-birth-certificate/start.md`.
- A category — "all featured pages", "all youth pages", etc.
- "next" — pick the first content file that doesn't yet have a report at
  `docs/fact-check/<slug>.md`.

For each target page:

1. Read `src/content/<slug>.md` (or `src/content/<slug>/index.md`).
2. Derive the live URL from `INFORMATION_ARCHITECTURE` in
   `src/data/content-directory.ts`. Two routing patterns to know:
   - **Default pages** are served at
     `https://alpha.gov.bb/<category-slug>/<page-slug>` (base from
     `src/lib/site-url.ts`).
   - **`protected: true` pages** are served at
     `https://alpha.gov.bb/<page-slug>` — no category prefix. The
     category-prefixed URL returns HTTP 404 for protected pages.
   - Sub-pages append `/<subpage-slug>` to the parent's URL.
   Always live-check the URL with WebFetch before recording it in the
   report header. Getting it wrong propagates a 404 link through the
   dashboard.
3. Note any `source_url` declared in `content-directory.ts` — verify it's
   live as part of the audit.

## 2. Extract claims

Walk the markdown and list every verifiable factual statement. Categorise
each as one of:

- **address** — street addresses, building names, parish
- **phone** — telephone numbers, fax
- **email**
- **URL** — external links
- **fee** — dollar amounts, fee names
- **hours** — opening hours, deadlines, turnaround times
- **eligibility** — who can/can't use the service
- **document requirement** — what to bring
- **process step** — procedural claims about how the service works
- **legal reference** — Acts, statutes, sections
- **agency name** — ministry / department / agency names (cross-check
  against `src/data/ministries.ts` and `src/data/departments.ts`)
- **statistic** — counts, percentages, dates
- **descriptive** — general copy that's still verifiable
- **link / CTA** — every `<a href>` in the source markdown, including
  button-style CTAs (`<a data-start-link>`), in-page anchors, links to
  sibling pages, PDFs, and external sites. A broken CTA is usually the
  worst bug on a page.
- **negative statement** — "the JP cannot…", "we do not show…",
  "you are not eligible if…" — restrictions and policy claims verify
  the same way as positive ones.
- **procedural instruction** — "do not sign before you arrive", "bring
  the original" — direct instructions to the citizen, verifiable against
  standard practice or agency-published guidance.

Include line numbers from the source markdown.

### Coverage discipline

Walk the page bullet-by-bullet, sentence-by-sentence. Categories that get
overlooked when the audit drifts toward "phones and emails":

- **"What the service cannot do" bullets** — negative statements verify
  the same way as positive ones; don't skip them because they're
  restrictions.
- **Procedural instructions** — verifiable against standard practice or
  the agency's published guidance.
- **Policy claims about the page itself** ("we do not show personal
  contact details online") — testable by inspecting what the page
  actually renders for an end user.
- **In-page links and CTAs** — every `<a href>` is a claim that the link
  resolves; capture each one and live-check it (see §3).
- **Frontmatter that affects citizens** — `publish_date`, `source_url`,
  category placement, `protected: true`.

If the source markdown has N distinct factual statements and the report
has fewer than ~80% of N claims, re-read the source end-to-end before
writing — you've probably skipped a section.

## 3. Verify each claim

For each claim, search authoritative sources in this priority order:

1. **`.gov.bb` domain** — the canonical Government of Barbados site.
   Common subdomains: `immigration.gov.bb`, `caipo.gov.bb`, `bla.gov.bb`,
   `bra.gov.bb`, `landsandsurveys.gov.bb`, `barbadoslawcourts.gov.bb`,
   `health.gov.bb`, `drugservice.gov.bb`, `oag.gov.bb`,
   `youthaffairs.gov.bb`, `labour.gov.bb`, `fireservice.gov.bb`,
   `liquorlicence.gov.bb`.
2. **GIS press releases** (`gisbarbados.gov.bb`) — operational changes,
   address moves, fee updates, ceremonies.
3. **Acts of Barbados** — `barbadoslawcourts.gov.bb/assets/content/pdfs/statutes/`
   and `oag.gov.bb/Laws/`.
4. **Specific agency websites** (e.g. specific ministry sub-portals).

Use `/browse` (gstack) for authenticated or anti-bot-protected sites.
Use `WebFetch` and `WebSearch` for routine `.gov.bb` checks — they're
faster and don't require a browser.

**Quote** the exact source phrasing in the report. Cite source URLs
inline. If two authoritative sources disagree, capture both and explain
which one this fact-check trusts.

### Every claim must link to its sources

**Rule:** every `Source:` / `Sources:` line in the report MUST contain
at least one clickable markdown link, so a human reader can click
through and verify the fact-check.

- **For verified claims:** link to the authoritative page(s) you
  checked, e.g. `- Source: [BLA — Learner Permit](https://bla.gov.bb/...)`.
- **For unverifiable claims:** still link — record what you *tried*,
  e.g. `- Checked: [gov.bb — Welfare Department](https://www.gov.bb/Departments/welfare), [GIS — Welfare tag](https://gisbarbados.gov.bb/blog/tag/welfare-department/) — neither itemises the 6-week service standard.`
  This lets the reader repeat your search.
- **For claims testable only by doing them** (e.g. "the form takes 20
  minutes to complete") — say `Source: testable against the form at <link>`
  with the form URL.
- **For internal cross-references:** link to the related fact-check
  report file using an **absolute workspace path** (Conductor's preview
  doesn't follow `./relative` paths). Example:
  `Source: see [get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md) Claim 7`.

Never write a bare "Source: not publicly documented." Either provide
the URLs you searched (so the reader can repeat), or escalate the claim
to the Open Question section for agency confirmation.

### Verifying in-page links

Every `<a href>` extracted in §2 must be live-checked. For each:

- **Internal links** (`/some/path`) — WebFetch the full URL using the
  live base. Pay attention to the protected-pages routing rule in §1:
  a link that hard-codes `/<category>/<protected-slug>` will 404 even
  though the page exists at `/<protected-slug>`. A broken CTA is at
  least Tier B, usually Tier A if it's the primary citizen action.
- **External links** (`https://…`) — WebFetch and confirm the page
  loads and is on-topic. Note URL paths that have moved (site reorgs
  are common).
- **Asset links** (PDFs, images) — confirm the file downloads. For
  PDFs the page makes claims about (e.g. "PDF, 436 names"), note size
  and page count; flag the row count as unverifiable from public web
  if it can only be confirmed by counting locally.
- **In-page anchors** (`#section`) — verify the target heading exists
  on the current page.

## 4. Score certainty

Every claim gets a **certainty %** using this rubric. Do not invent
numbers; pick the band that matches what the verification produced.

| % | Meaning |
|---|---|
| **95–100** | Two or more independent authoritative sources agree (e.g. a `.gov.bb` page + a GIS press release; or a `.gov.bb` page + an Act). |
| **80–94** | One authoritative source confirms (a `.gov.bb` page or an Act). |
| **60–79** | Secondary source confirms (GIS press release alone, embassy page, reputable Barbados news outlet within last 12 months). |
| **40–59** | Only a single non-authoritative source confirms (older news, third-party directory). |
| **< 40** | Unverifiable from the public web — flag for the GovBB team to confirm with the agency. |

Every claim must cite the source URL(s) so the certainty score is
auditable.

## 5. Mark status

- **verified** — claim is correct against authoritative source(s)
- **discrepant** — claim is wrong; record the suggested fix and a
  `Confidence it's wrong: NN%` line. (This is the probability the page
  is wrong, not "% wrong" — facts are binary.)
- **unverifiable** — public web doesn't answer; flag for agency
  confirmation

## 6. Write the per-page report

Write to `docs/fact-check/<slug>.md` using this exact structure:

```markdown
# Fact-check: <page title>

- **Live page:** <https://alpha.gov.bb/<category>/<slug>>
- **Source file:** `src/content/<slug>.md`
- **Last checked:** YYYY-MM-DD
- **Summary:** N claims reviewed — X verified, Y discrepant, Z unverifiable. Average certainty: **NN%**.

---

## Headline issues for triage

1. **<short title>.** <one-paragraph explanation of the biggest problem and its citizen impact>
2. ...

(3–5 items. The biggest discrepancies and the highest-stakes
unverifiable claims. If everything checks out, write "No major issues
found in this pass.")

---

## Claims

### Claim 1 — <short title> (lines X–Y)

<div class="claim-block claim-block--current">
<div class="claim-block-label">Currently on the page</div>
<pre class="claim-block-content">VERBATIM page content
with line breaks preserved
exactly as the citizen sees it</pre>
</div>

<div class="claim-block claim-block--correct">
<div class="claim-block-label">Verified correct  (or "Should say" if discrepant)</div>
<pre class="claim-block-content">The verified-correct content
(same as above if verified;
different if discrepant)</pre>
</div>

- **Type:** address | phone | fee | ...
- **Sources:** [link1](url); [link2](url)
- **Status:** verified | discrepant | unverifiable
- **Certainty:** NN%
- (if discrepant) **Confidence it's wrong:** NN%
- (if high-stakes) **Citizen impact:** HIGH | MEDIUM | LOW — one-line reason
- (if unverifiable) **Open question:** what the GovBB team needs to confirm

### Claim 2 — ...

---

## Additional findings (not on the page but should be)

(Optional. Useful additions discovered during verification — e.g. a
phone number citizens would want that isn't currently on the page.)

## Sources cited

(Bulleted list of every authoritative URL consulted in this report.)
```

### Claim block rules (CRITICAL)

These map to red/green/amber sidebar styling in the HTML site.

- **Two blocks per claim**, always:
  - `claim-block--current` (red sidebar) = verbatim quote of what's on the page
  - `claim-block--correct` (green sidebar) = verified-correct content (same as current if verified, different if discrepant)
  - **OR** `claim-block--pending` (amber sidebar) = used in place of `--correct` when the claim is unverifiable; content explains what was checked
- **Quote VERBATIM.** Preserve line breaks, punctuation, spacing exactly so a reader can copy-paste into a search and find the content on the source page. Never substitute slashes for newlines.
- Use `<pre class="claim-block-content">` for the content. CSS overrides the default monospace so it renders as normal prose with newlines preserved.
- For multi-line addresses, lists, fee tables: keep each item on its own line inside the `<pre>`.

**Reference examples** for what a finished report should look like:

- `docs/fact-check/get-a-document-notarised.md` — full Tier-A discrepancies, multiple sources per claim, broken `source_url` finding.
- `docs/fact-check/apply-for-a-passport.md` — happy-path report where most claims verify cleanly.
- `docs/fact-check/open-pharmacy.md` — mixed: high verified rate plus a major "agency has moved" finding.

## 7. Update the dashboard

After writing the per-page report, update `docs/fact-check/README.md`:

1. **Per-page table row** — update or add the row for this page with
   the new Claims / Verified / Discrepant / Unverifiable / Avg
   certainty figures. Drop the `‡` provisional mark if it had one.

2. **Totals row** under the table — recompute the four totals (claims,
   verified, discrepant, unverifiable) and the average certainty across
   all pages with reports.

3. **Triage section** — for each *new* discrepant claim, add an
   issue-ready card. Pick the next free finding ID by running
   `grep -oE '### F-[0-9A-F]+' docs/fact-check/README.md | sort -u`
   and choosing the first gap (or one past the highest existing
   number). Gaps from earlier removed findings are fine to fill.
   Each card:

   ```markdown
   ### F-NNN · Tier <A|B|C> · <short imperative title>

   - **Where:** `src/content/<file>.md` line N
   - **Confidence it's wrong:** NN%
   - **Citizen impact:** HIGH | MEDIUM | LOW — <one-line reason>
   - **What's wrong:** <description>
   - **Fix:** <specific correction>
   - **Source:** <markdown link>
   - **Suggested issue title:** `<concrete, copy-pasteable into gh issue create>`
   ```

   Tier rule:
   - **A** = ≥ 90% confidence it's wrong AND/OR high citizen impact.
   - **B** = 60–89% confidence wrong, medium citizen impact.
   - **C** = unverifiable; needs agency confirmation.

4. **Highest-priority findings list** at the top of the README is
   curated by hand — only update it if a new finding belongs in the
   top 10 by citizen impact.

5. **Resolve stale findings.** If this pass re-verifies a claim that an
   earlier pass flagged as discrepant and the new evidence shows the
   page is now correct (or was correct all along), **remove** the
   corresponding F-NNN card from the Triage section and note the
   reversal in the per-page report's "Headline issues" section. Don't
   leave outdated findings on the dashboard — they cause teams to file
   issues against text that is actually correct.

   If a finding was correct but its scope has narrowed (e.g. one of
   three sub-claims now verified, two still open), edit the card to
   reflect the reduced scope rather than removing it entirely. Bump
   the `Confidence it's wrong:` figure to reflect the re-verified
   evidence.

## Link format rule

All internal links to other files in this repo MUST use **absolute
workspace paths** (e.g. `/docs/fact-check/foo.md`, not `./foo.md` or
`foo.md`). Conductor's chat/preview doesn't follow relative paths in
markdown; absolute paths render correctly. This applies to per-page
cross-references, dashboard report links, and any PDF/asset links.

## 8. Cross-page consistency

If the claim involves a shared fact (e.g. Supreme Court address,
Registration Department phone, Immigration HQ location), update
`docs/fact-check/_inventory.md` so the same fact is verified once and
reused across pages.

If the claim involves a ministry / department / agency name, cross-check
against `src/data/ministries.ts`, `src/data/departments.ts`,
`src/data/state-bodies.ts`. Add any mismatch to
`docs/fact-check/_internal-consistency.md`.

If the claim involves an external URL, add it to
`docs/fact-check/_links.md` with its verified status (✅ Live / ⚠️ Live
with concerns / ❌ Broken).

## 9. Rebuild + serve the static HTML site

After updating any report, regenerate the browsable HTML site so
reviewers can navigate it in a browser. Two commands:

```
npm run fact-check:build       # generate docs/fact-check/site/
npm run fact-check:serve       # build (if needed) + serve at http://127.0.0.1:4321/
npm run fact-check:deploy      # build + deploy to Netlify (govbb-fact-check.netlify.app)
```

`fact-check:build` walks `docs/fact-check/*.md`, converts each to HTML,
and writes a dashboard at `docs/fact-check/site/index.html` with filter
chips, status badges, and Fixed-tickboxes that persist to localStorage.

`fact-check:serve` starts a local HTTP server on port 4321 and opens
the browser automatically. **Use the server, not file://** — Conductor's
chat preview and some browsers sandbox `file://` HTML in ways that
block stylesheets and JS.

Re-run `fact-check:build` after every report update; the server picks
up changes on the next page load.

Scripts: `scripts/build-fact-check-site.mjs` and
`scripts/serve-fact-check-site.mjs`. The only dep is `marked` (already
in devDependencies).

## 10. Do not open a PR

Files stay local for user review. Do not commit, do not push, do not
open a PR unless the user explicitly asks. The user will review the
report(s), then decide what to ship.

## Operating rules

- **Don't invent facts.** If a search returns "I cannot find this",
  mark the claim as unverifiable. Never fill in plausible-looking
  numbers from training data.
- **Quote sources.** Every certainty score above 60% must have at least
  one source URL cited.
- **Be opinionated about discrepancies.** Don't hedge with "may be
  wrong" when you have authoritative-source disagreement. Say it's
  discrepant and give a confidence %.
- **Don't over-verify low-stakes claims.** A "general description" claim
  in introductory copy doesn't need a 95% certainty score. Spend
  research effort on fees, addresses, phone numbers, eligibility, legal
  references, and statistics — those are what citizens act on.
- **Note operational claims explicitly.** Anything time-sensitive
  ("Registration opens in May 2026", "EFT is not available yet") should
  be flagged for re-verification on a cadence, even if true today.
- **Cross-check internal data files.** Ministry names, department lists,
  pharmacy lists, JP counts — verify against the canonical data in
  `src/data/` before going to the web.

## When to ask the user

- If the target is ambiguous (e.g. user said "the youth page" and there
  are several) — list options and ask.
- If a discrepancy could be either-way (e.g. site says "BNB Building",
  source says "Republic Bank Building" — could be a rebrand of the same
  building) — flag it as uncertain rather than discrepant, and note the
  open question in the report.
- If the user invokes the skill with no target — ask whether to
  fact-check a specific page, a batch (e.g. "all featured"), or pick
  "next" (the next page with no report yet).
