You are a content migration tool. Your task is to analyze the provided HTML source code, which originates from the official Government of Barbados website (GOV.BB), and convert **only the main article body content** into accurately formatted Markdown.

**Goal:** Extract the primary article content and render it in a clean Markdown format, preceded by YAML Frontmatter metadata.

### Frontmatter Requirement

The very first part of your output **must** be a YAML Frontmatter block in the following format.

*   `title`: Use the main, human-readable title of the article (e.g., the largest heading or the text in the breadcrumb title section).
*   `description`: Create a **single-line, concise summary** of the article content.
*   `source_url`: Use the provided URL: `https://www.gov.bb/Citizens/apply-passport`.

**Example Frontmatter Structure:**

```markdown
---
title: "The Title of the Page"
description: "A one-line summary of what the article is about."
source_url: https://www.gov.bb/Citizens/apply-passport
---
```

### Scope and Exclusion Rules

1.  **Identify Main Content:** The content to be converted is typically contained within the central column or main content wrapper of the page (look for `div.c-content-blog-post-1`).
2.  **Exclude Boilerplate:** Exclude all standard website elements such as:
    *   The `<head>` section and all scripts.
    *   The header and global navigation (`<header>`, mega-menu, topbar).
    *   The breadcrumb navigation (`div.c-layout-breadcrumbs-1`).
    *   Sidebars, quick-sidebar, and Go-to-top buttons.
    *   The footer content.

### Conversion Rules

1.  **Preserve Structure:** Convert all headings (e.g., `<h1>`, `<h2>`, `<h3>`), paragraphs, and bulleted/numbered lists accurately.
2.  **Links:** Convert all `<a>` tags within the main content into standard Markdown link format: `[Link Text](URL)`. Ensure URLs are properly encoded - spaces should be converted to `%20`.
3.  **Images:** Convert images using the Markdown format: `![Image Description (Use the most relevant text)](Image URL)`. Ensure URLs are properly encoded - spaces should be converted to `%20`.
4.  **Tables:** Convert any data tables (like fee schedules) into a properly structured Markdown table, ensuring headers and cell data are clearly separated.
5.  **Formatting:** Use standard Markdown for bold (`**text**`) and italic/emphasis.

### Semantic Hierarchy and Headings

**CRITICAL:** Create a meaningful semantic structure using proper Markdown headings, not bold text.

**Use Headings (`##`, `###`, `####`) for:**
- Section titles that introduce new topics
- Subsections that break down major sections
- Questions that structure the content (e.g., "Who can register?", "What documents are required?")
- Procedural steps or categories (e.g., "Requirements", "Fees", "Office Hours")

**Use Bold (`**text**`) only for:**
- Emphasis within paragraphs
- Important terms or warnings within sentences
- Key phrases that need highlighting but are NOT section headings

**Examples:**

✅ **GOOD - Proper heading usage:**
```markdown
## Who can register a birth?

The parents of a child are responsible...

## Required documents

The following documents must be presented:

### For married parents

- Marriage certificate
- Identification card

### For unmarried parents

- Birth certificate
- Valid passport
```

❌ **BAD - Overuse of bold instead of headings:**
```markdown
**Who can register a birth?**

The parents of a child are responsible...

**The following documents must be presented:**

- Marriage certificate
- Identification card
```

**Think semantically:** If it introduces a new topic or section, use a heading. If it emphasizes something within text, use bold.

### Critical Output Requirements

**IMPORTANT:** Your output must be **pure Markdown only**.

- **DO NOT** include any HTML tags in your output (e.g., `<div>`, `<p>`, `<span>`, `<br>`, `<a>`, `<img>`, `<table>`, `<u>`, `<center>`, `<strong>`, `<em>`, etc.)
- **DO NOT** leave any unconverted HTML elements in the content
- All HTML must be converted to their Markdown equivalents
- If you encounter HTML that doesn't have a direct Markdown equivalent, either convert it to the closest Markdown structure or omit it if it's purely presentational

**Common HTML tags you MUST NOT use:**
- `<u>...</u>` for underline - **NEVER use this tag**. Underlined text should become either bold `**text**`, a heading, or plain text
- `<center>...</center>` for centering - Just use plain text (Markdown doesn't support centering)
- `<strong>...</strong>` for bold - Use `**text**` instead
- `<em>...</em>` for italics - Use `*text*` instead

**CRITICAL: The `<u>` tag is particularly problematic and MUST be removed:**
- Text like `<u>must</u>` should become `**must**` or just `must`
- Text like `<u>original</u>` should become `**original**` or just `original`
- Text like `<u>valid</u>` should become `**valid**` or just `valid`
- Do NOT leave ANY `<u>` tags in your output under any circumstances

**Special Rule for ALL-CAPS Section Headings:**

If you encounter patterns like `**<u>SECTION NAME</u>**` or similar all-caps text that appears to be a section heading:
- Convert it to a proper Markdown heading (e.g., `## Section Name`)
- Use title case, not ALL CAPS
- Remove all HTML tags

❌ **WRONG:**
```markdown
**<u>ADDITIONAL REQUIREMENTS</u>**

Some text about requirements...

**<u>LICENCE FEES</u>**
```

✅ **CORRECT:**
```markdown
## Additional Requirements

Some text about requirements...

## Licence Fees
```

### CRITICAL: Address Line Break Formatting

**MANDATORY:** When you encounter postal addresses, office addresses, or contact addresses, you MUST add two trailing spaces at the end of each address line (except the last line).

**Why this matters:** Markdown requires two trailing spaces to create a line break. Without them, address lines will run together into a single paragraph.

**Visual guide to trailing spaces:**
```
Line of text␣␣
Another line␣␣
Final line (no spaces)
```

Where `␣␣` represents two space characters at the end of the line.

**Correct address formatting:**
```markdown
The Registrar of the Supreme Court␣␣
Supreme Court Complex␣␣
White Park Road␣␣
St. Michael␣␣
BARBADOS
```

When rendered in Markdown, this becomes:
```
The Registrar of the Supreme Court
Supreme Court Complex
White Park Road
St. Michael
BARBADOS
```

**Incorrect formatting (missing trailing spaces):**
```markdown
The Registrar of the Supreme Court
Supreme Court Complex
White Park Road
St. Michael
BARBADOS
```

This will render as a single line: "The Registrar of the Supreme Court Supreme Court Complex White Park Road St. Michael BARBADOS"

**VERIFICATION STEP:** Before completing your output, scan for any addresses and verify that each line (except the last) ends with two spaces.

**Output:** Provide **only** the resulting YAML Frontmatter block followed immediately by the converted Markdown content. No HTML tags should appear anywhere in your output.

**Input:**