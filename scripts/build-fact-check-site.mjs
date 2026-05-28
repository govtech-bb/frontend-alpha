#!/usr/bin/env node

// Build a static HTML site from docs/fact-check/*.md
// Output: docs/fact-check/site/
//
// Usage: node scripts/build-fact-check-site.mjs
//        or: npm run fact-check:build

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(REPO_ROOT, "docs", "fact-check");
const OUT_DIR = path.join(SRC_DIR, "site");

const marked = new Marked({
  gfm: true,
  breaks: false,
});

// --- helpers ---------------------------------------------------------

function readAllReports() {
  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();
  return files.map((f) => {
    const src = fs.readFileSync(path.join(SRC_DIR, f), "utf8");
    return { file: f, src, ...parseMeta(src) };
  });
}

function parseMeta(src) {
  // Title: first `# ` heading
  const titleMatch = src.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : "Untitled";

  // Summary line: `- **Summary:** N claims reviewed — X verified, Y discrepant, Z unverifiable. Average certainty: NN%.`
  const summary = src.match(
    /\*\*Summary:\*\*\s*(\d+)\s+claims?\s+reviewed.*?(\d+)\s+verified.*?(\d+)\s+discrepant.*?(\d+)\s+unverifiable.*?(\d+)%/i
  );
  const stats = summary
    ? {
        claims: Number(summary[1]),
        verified: Number(summary[2]),
        discrepant: Number(summary[3]),
        unverifiable: Number(summary[4]),
        certainty: Number(summary[5]),
      }
    : null;

  // Live page URL
  const liveMatch = src.match(/\*\*Live page:\*\*\s*<?(https?:[^\s>]+)>?/);
  const livePage = liveMatch ? liveMatch[1] : null;

  return { title, stats, livePage };
}

function slugFor(file) {
  return file.replace(/\.md$/, "");
}

function htmlNameFor(file) {
  return `${slugFor(file)}.html`;
}

function transformInternalLinks(html) {
  // Convert "/docs/fact-check/foo.md" → "foo.html"
  // Convert "./foo.md" → "foo.html"
  // Convert "foo.md" (bare) → "foo.html"
  return html.replace(
    /href="(?:\/docs\/fact-check\/|\.\/)?([a-z_][a-z0-9_-]*)\.md"/gi,
    'href="$1.html"'
  );
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// --- finding parsing (for filter chips + checkboxes) ------------------

function annotateFindings(html) {
  // Wrap each F-NNN finding card in a <section> with data-tier and data-id.
  // Finding headings render as: <h3 ...>F-NNN · Tier A · Title</h3>
  // The heading content MUST start with F-NNN to qualify.
  return html.replace(
    /<h3([^>]*)>(F-[0-9A-F]+\s*[·.]\s*Tier\s+([ABC])[^]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>F-[0-9A-F]+|<h2|<hr\s*\/?>|$)/g,
    (_match, hAttrs, hContent, tier, body) => {
      const idMatch = hContent.match(/F-([0-9A-F]+)/);
      const id = idMatch ? `F-${idMatch[1]}` : "";
      const checked = id
        ? `<label class="tick"><input type="checkbox" data-finding="${id}"><span>Fixed</span></label>`
        : "";
      return `<section class="finding" data-tier="${tier}" data-finding-id="${id}">${checked}<h3${hAttrs}>${hContent}</h3>${body}</section>`;
    }
  );
}

// --- sidebar ---------------------------------------------------------

function buildSidebar(reports, currentFile) {
  const dashboard = reports.find((r) => r.file === "README.md");
  const supporting = reports.filter((r) => r.file.startsWith("_"));
  const perPage = reports.filter(
    (r) => r.file !== "README.md" && !r.file.startsWith("_")
  );

  function navItem(r) {
    const isCurrent = r.file === currentFile;
    const cls = isCurrent ? "current" : "";
    const badge = r.stats
      ? `<span class="badge badge-cert">${r.stats.certainty}%</span>`
      : "";
    const tag = r.stats?.discrepant
      ? `<span class="badge badge-bad">${r.stats.discrepant}</span>`
      : "";
    const title =
      r.file === "README.md"
        ? "Dashboard"
        : r.title.replace(/^Fact-check:\s*/, "");
    return `<li class="${cls}"><a href="${htmlNameFor(r.file)}">${escapeHtml(title)}${badge}${tag}</a></li>`;
  }

  return `
    <aside class="sidebar">
      <h1><a href="index.html">GovBB fact-check</a></h1>
      <nav>
        ${dashboard ? `<ul class="nav-group"><li class="${currentFile === "README.md" ? "current" : ""}"><a href="index.html">📋 Dashboard</a></li></ul>` : ""}
        <div class="nav-label">Per-page reports</div>
        <ul class="nav-group">${perPage.map(navItem).join("")}</ul>
        <div class="nav-label">Supporting</div>
        <ul class="nav-group">${supporting.map(navItem).join("")}</ul>
      </nav>
    </aside>
  `;
}

// --- filter chips (dashboard only) ------------------------------------

function buildFilterChips() {
  return `
    <div class="filter-chips" id="filter-chips">
      <button data-filter="all" class="chip active">All findings</button>
      <button data-filter="A" class="chip">Tier A only</button>
      <button data-filter="B" class="chip">Tier B only</button>
      <button data-filter="C" class="chip">Tier C only</button>
      <button data-filter="open" class="chip">Hide fixed</button>
    </div>
  `;
}

// --- page template ---------------------------------------------------

function renderPage({ title, body, sidebar, isDashboard }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} — GovBB fact-check</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body${isDashboard ? ' class="dashboard"' : ""}>
  <div class="layout">
    ${sidebar}
    <main class="content">
      ${isDashboard ? buildFilterChips() : ""}
      <article>${body}</article>
    </main>
  </div>
  <script src="app.js" defer></script>
</body>
</html>
`;
}

// --- styles ----------------------------------------------------------

const STYLES = `
:root {
  --fg: #1c2541;
  --muted: #5a6478;
  --bg: #f8f9fb;
  --card: #fff;
  --border: #e5e7ec;
  --accent: #0c5fbf;
  --accent-bg: #e7f0fb;
  --good: #1f7a3a;
  --good-bg: #e3f4e8;
  --bad: #b3261e;
  --bad-bg: #fde7e6;
  --warn: #8a5a00;
  --warn-bg: #fef3d6;
  --tier-a: #b3261e;
  --tier-b: #8a5a00;
  --tier-c: #0c5fbf;
  --shadow: 0 1px 3px rgba(0,0,0,.06);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
  color: var(--fg);
  background: var(--bg);
  line-height: 1.55;
}
.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
}
.sidebar {
  background: #fff;
  border-right: 1px solid var(--border);
  padding: 24px 18px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.sidebar h1 {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin: 0 0 16px 0;
}
.sidebar h1 a { color: inherit; text-decoration: none; }
.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}
.sidebar nav li {
  margin: 0;
}
.sidebar nav li a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 6px;
  color: var(--fg);
  text-decoration: none;
  font-size: 14px;
  line-height: 1.35;
}
.sidebar nav li a:hover {
  background: var(--accent-bg);
}
.sidebar nav li.current a {
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 600;
}
.nav-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin: 16px 10px 4px;
}
.badge {
  margin-left: auto;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--border);
  color: var(--muted);
  font-weight: 600;
}
.badge-cert { background: var(--accent-bg); color: var(--accent); }
.badge-bad { background: var(--bad-bg); color: var(--bad); }
.content {
  padding: 36px 56px 80px;
  max-width: 1280px;
  width: 100%;
}
.content article {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 36px 48px;
  box-shadow: var(--shadow);
}
/* Tables and findings can use full width even when prose is constrained */
.content article > p,
.content article > ul,
.content article > ol,
.content article > h1,
.content article > h2,
.content article > h3,
.content article > h4,
.content article > blockquote {
  max-width: 78ch;
}
.content article > table,
.content article > .filter-chips,
.content article > .finding,
.content article > hr {
  max-width: none;
}
h1, h2, h3, h4, h5 { color: var(--fg); }
h1 { font-size: 28px; margin: 0 0 16px; line-height: 1.25; }
h2 { font-size: 22px; margin: 32px 0 12px; padding-bottom: 6px; border-bottom: 1px solid var(--border); }
h3 { font-size: 17px; margin: 24px 0 10px; }
h4 { font-size: 15px; margin: 16px 0 8px; color: var(--muted); }
p, ul, ol { margin: 8px 0 12px; }
ul, ol { padding-left: 22px; }
li { margin: 4px 0; }
a { color: var(--accent); }
a[href^="http"]::after {
  content: " ↗";
  font-size: 0.8em;
  opacity: 0.6;
}
hr { border: 0; border-top: 1px solid var(--border); margin: 28px 0; }
code {
  background: #f1f3f6;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
pre {
  background: #1c2541;
  color: #e6edf6;
  padding: 16px 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
}
pre code { background: transparent; padding: 0; color: inherit; }
blockquote {
  margin: 12px 0;
  padding: 8px 16px;
  border-left: 4px solid var(--accent);
  background: var(--accent-bg);
  border-radius: 0 6px 6px 0;
  color: var(--fg);
}
blockquote p { margin: 4px 0; }
table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 14px;
}
th, td {
  padding: 8px 10px;
  border: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}
th { background: #f1f3f6; font-weight: 600; }
td:has(✅), td:has(❌), td:has(⚠️) { text-align: center; }
strong { color: var(--fg); }
em { color: var(--muted); }

/* --- filter chips --- */
.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 0 20px;
}
.chip {
  appearance: none;
  border: 1px solid var(--border);
  background: var(--card);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  color: var(--fg);
  font-weight: 500;
}
.chip:hover { border-color: var(--accent); }
.chip.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* --- findings --- */
.finding {
  position: relative;
  margin: 16px 0;
  padding: 16px 20px 16px 56px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--card);
}
.finding[data-tier="A"] { border-left: 4px solid var(--tier-a); }
.finding[data-tier="B"] { border-left: 4px solid var(--tier-b); }
.finding[data-tier="C"] { border-left: 4px solid var(--tier-c); }
.finding h3 { margin-top: 0; }
.finding .tick {
  position: absolute;
  left: 18px;
  top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  user-select: none;
}
.finding .tick input { width: 18px; height: 18px; cursor: pointer; }
.finding.is-fixed {
  opacity: 0.5;
  background: #f4f5f7;
}
.finding.is-fixed h3 { text-decoration: line-through; }
.finding.is-hidden { display: none; }

/* --- claim blocks (verbatim page content vs verified) --- */
.claim-block {
  background: var(--card);
  border: 1px solid var(--border);
  border-left-width: 4px;
  border-radius: 6px;
  padding: 14px 18px;
  margin: 10px 0;
  max-width: none;
}
.claim-block--current { border-left-color: var(--bad); background: #fffafa; }
.claim-block--correct { border-left-color: var(--good); background: #f6fbf7; }
.claim-block--pending { border-left-color: var(--warn); background: #fffbf2; }

.claim-block-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 700;
  margin: 0 0 6px;
}
.claim-block--current .claim-block-label { color: var(--bad); }
.claim-block--correct .claim-block-label { color: var(--good); }
.claim-block--pending .claim-block-label { color: var(--warn); }

.claim-block-content {
  font-family: inherit;
  font-size: 15px;
  line-height: 1.45;
  background: transparent;
  color: var(--fg);
  padding: 0;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
}
.claim-block-source {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
  font-style: italic;
}
.claim-block-source a {
  color: var(--muted);
  text-decoration: underline;
}
.claim-match {
  display: inline-block;
  margin-left: 8px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}
.claim-match--yes { background: var(--good-bg); color: var(--good); }
.claim-match--partial { background: var(--warn-bg); color: var(--warn); }
.claim-match--no { background: var(--bad-bg); color: var(--bad); }

/* Certainty visual */
.certainty-bar {
  display: inline-block;
  width: 60px;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  vertical-align: middle;
  margin-left: 4px;
  overflow: hidden;
}
.certainty-bar::after {
  content: "";
  display: block;
  height: 100%;
  background: var(--accent);
  width: var(--cert, 0%);
}

/* Print */
@media print {
  .sidebar, .filter-chips, .tick { display: none; }
  .layout { grid-template-columns: 1fr; }
  .content { max-width: 100%; padding: 0; }
  .content article { border: none; padding: 0; box-shadow: none; }
  .finding { break-inside: avoid; }
  a::after { content: ""; }
}

/* Mobile */
@media (max-width: 800px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { position: static; height: auto; }
  .content { padding: 20px; }
  .content article { padding: 20px; }
}
`;

// --- JS --------------------------------------------------------------

const APP_JS = `// Persists "Fixed" checkbox state and filters findings.
(() => {
  const LS_KEY = "fact-check-fixed";
  const fixed = new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));

  document.querySelectorAll(".finding").forEach(card => {
    const id = card.dataset.findingId;
    if (!id) return;
    if (fixed.has(id)) card.classList.add("is-fixed");
    const cb = card.querySelector("input[type=checkbox]");
    if (cb) {
      cb.checked = fixed.has(id);
      cb.addEventListener("change", () => {
        if (cb.checked) fixed.add(id); else fixed.delete(id);
        localStorage.setItem(LS_KEY, JSON.stringify([...fixed]));
        card.classList.toggle("is-fixed", cb.checked);
      });
    }
  });

  // Filter chips
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      document.querySelectorAll(".finding").forEach(card => {
        let show = true;
        if (f === "A" || f === "B" || f === "C") {
          show = card.dataset.tier === f;
        } else if (f === "open") {
          show = !card.classList.contains("is-fixed");
        }
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Highlight in-page anchor on direct link
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView();
  }
})();
`;

// --- main ------------------------------------------------------------

function build() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const reports = readAllReports();
  if (reports.length === 0) {
    console.error("No markdown files found in", SRC_DIR);
    process.exit(1);
  }

  for (const r of reports) {
    const sidebar = buildSidebar(reports, r.file);
    let html = marked.parse(r.src);
    html = transformInternalLinks(html);
    const isDashboard = r.file === "README.md";
    if (isDashboard) html = annotateFindings(html);
    const fileName = isDashboard ? "index.html" : htmlNameFor(r.file);
    const page = renderPage({
      title: r.title,
      body: html,
      sidebar,
      isDashboard,
    });
    fs.writeFileSync(path.join(OUT_DIR, fileName), page);
    console.log(`  wrote ${fileName}`);
  }

  fs.writeFileSync(path.join(OUT_DIR, "styles.css"), STYLES);
  fs.writeFileSync(path.join(OUT_DIR, "app.js"), APP_JS);
  console.log("  wrote styles.css, app.js");
  console.log(
    `\nDone. Open ${path.relative(REPO_ROOT, OUT_DIR)}/index.html in a browser.`
  );
}

build();
