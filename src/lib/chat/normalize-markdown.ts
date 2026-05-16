// LLM reliably emits **Bold** headings but often skips "- " list markers.
// Treat short lines immediately under a heading as bullets.

const HEADING_RE = /^\*\*[^*\n]+\*\*$/;
const LIST_ITEM_RE = /^(?:[-*+]\s|\d+\.\s)/;
const MAX_BULLET_LENGTH = 240;

export function normalizeMarkdown(raw: string): string {
  if (!raw) return raw;

  const lines = raw.split("\n");
  const out: string[] = [];
  let inSection = false;
  let prevWasBlank = false;

  for (const original of lines) {
    const line = original.replace(/\s+$/, "");
    const trimmed = line.trim();

    if (!trimmed) {
      if (prevWasBlank) inSection = false;
      prevWasBlank = true;
      out.push("");
      continue;
    }

    if (HEADING_RE.test(trimmed)) {
      inSection = true;
      prevWasBlank = false;
      if (out.length > 0 && out.at(-1) !== "") out.push("");
      out.push(trimmed);
      out.push("");
      continue;
    }

    if (LIST_ITEM_RE.test(trimmed)) {
      out.push(trimmed);
      prevWasBlank = false;
      continue;
    }

    // Follow-up question — render as a paragraph, never a bullet.
    if (trimmed.endsWith("?")) {
      inSection = false;
      prevWasBlank = false;
      if (out.length > 0 && out.at(-1) !== "") out.push("");
      out.push(trimmed);
      continue;
    }

    const lastOut = out.at(-1) ?? "";
    const stillInList =
      inSection && (HEADING_RE.test(lastOut) || LIST_ITEM_RE.test(lastOut));

    if (stillInList && trimmed.length <= MAX_BULLET_LENGTH) {
      out.push(`- ${trimmed}`);
      prevWasBlank = false;
      continue;
    }

    inSection = false;
    prevWasBlank = false;
    out.push(line);
  }

  return out.join("\n");
}
