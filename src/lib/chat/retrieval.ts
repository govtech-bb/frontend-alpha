import type { UIMessage } from "@tanstack/ai";
import { firstUserText, lastAssistantText, lastUserText } from "./messages";
import type { RetrievedContext, RetrieveResponse, Source } from "./types";

const SCORE_THRESHOLD = 0.55;
const MAX_SOURCES = 3;
const MAX_CONTEXT_CHARS = 6000;
const TOP_K = 8;
const GREETING_RE =
  /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening)|howdy)[!.\s]*$/i;

export function isGreetingOrTooShort(line: string): boolean {
  return GREETING_RE.test(line) || line.length < 8;
}

export function buildRetrievalQuery(messages: UIMessage[]): string {
  // Anchor on the FIRST user message so service context stays loaded mid-form
  // when later messages are just field values (names, dates).
  const first = firstUserText(messages);
  const last = lastUserText(messages);
  const assistant = lastAssistantText(messages);
  return [first, assistant, last].filter(Boolean).join("\n");
}

export type RetrieveOk = { ok: true; data: RetrieveResponse };
export type RetrieveErr = { ok: false; status: number; reason: string };
export type RetrieveResult = RetrieveOk | RetrieveErr;

export async function retrieve(
  ragUrl: string,
  query: string,
  parentSignal: AbortSignal,
  timeoutMs = 4000
): Promise<RetrieveResult> {
  const signal = AbortSignal.any([
    parentSignal,
    AbortSignal.timeout(timeoutMs),
  ]);

  try {
    const res = await fetch(`${ragUrl}/retrieve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, topK: TOP_K }),
      signal,
    });
    if (!res.ok) {
      return {
        ok: false,
        status: 502,
        reason: `Retrieve failed ${res.status}`,
      };
    }
    return { ok: true, data: (await res.json()) as RetrieveResponse };
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    // Treat timeout/disconnect as empty so the chat can still answer.
    if (aborted) return { ok: true, data: { contexts: [], sources: [] } };
    return { ok: false, status: 502, reason: "Retrieve failed" };
  }
}

export function filterSources(sources: Source[], query: string): Source[] {
  const lastLine = query.split("\n").pop()?.trim() ?? "";
  if (isGreetingOrTooShort(lastLine)) return [];

  const seen = new Set<string>();
  const filtered: Source[] = [];
  for (const s of sources) {
    if (s.score < SCORE_THRESHOLD) continue;
    const key = s.url + (s.section ?? "");
    if (seen.has(key)) continue;
    seen.add(key);
    filtered.push({ ...s, url: withTextFragment(s.url, s.excerpt) });
    if (filtered.length >= MAX_SOURCES) break;
  }
  return filtered;
}

function withTextFragment(url: string, excerpt?: string): string {
  if (!excerpt || url === "#") return url;
  const clean = excerpt
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
  if (!clean) return url;
  return `${url}#:~:text=${encodeURIComponent(clean)}`;
}

export function onlyLegacySources(sources: Source[]): boolean {
  return sources.length > 0 && sources.every((s) => s.source === "legacy");
}

export function buildContextBlock(contexts: RetrievedContext[]): string {
  if (!contexts.length) return "(no relevant context found)";

  const seen = new Set<string>();
  const parts: string[] = [];
  let total = 0;
  let idx = 0;
  for (const c of contexts) {
    const key = `${c.title}::${c.section ?? ""}::${c.text.slice(0, 80)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    idx += 1;
    const head = c.section ? `${c.title} — ${c.section}` : c.title;
    const block = `[${idx}] ${head}\n${c.text}`;
    if (total + block.length > MAX_CONTEXT_CHARS) break;
    parts.push(block);
    total += block.length;
  }
  return parts.join("\n\n---\n\n");
}
