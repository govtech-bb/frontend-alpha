import type { Env, Source } from "../utils/schema";

export type Retrieved = {
  contexts: { title: string; section?: string; text: string }[];
  sources: Source[];
};

export async function retrieve(
  env: Env,
  qvec: number[],
  topK = 8
): Promise<Retrieved> {
  const res = await env.VECTORIZE.query(qvec, {
    topK,
    returnValues: false,
    returnMetadata: "all",
  });

  const contexts: Retrieved["contexts"] = [];
  const sources: Source[] = [];

  for (const m of res.matches) {
    const meta = m.metadata as Record<string, unknown> | undefined;
    if (!meta) continue;
    const text = typeof meta.text === "string" ? meta.text : "";
    const title =
      typeof meta.title === "string"
        ? meta.title
        : ((meta.slug as string) ?? m.id);
    const url = typeof meta.url === "string" ? meta.url : "#";
    const section = typeof meta.section === "string" ? meta.section : undefined;
    if (!text) continue;

    contexts.push({ title, section, text });
    sources.push({
      id: m.id,
      url,
      title,
      section,
      score: m.score,
      excerpt: pickExcerpt(text, section),
    });
  }

  return { contexts, sources };
}

function pickExcerpt(text: string, section?: string): string {
  let body = text;
  if (section && body.startsWith(section)) {
    body = body.slice(section.length).replace(/^[\s\n]+/, "");
  }
  // First non-empty line that isn't a list bullet/heading marker.
  const firstLine =
    body
      .split("\n")
      .map((s) => s.trim())
      .find((s) => s && !/^[#\-*>|`]/.test(s)) ?? "";

  // Strip markdown formatting that won't appear in rendered HTML.
  const clean = firstLine
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) -> text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold**
    .replace(/\*([^*]+)\*/g, "$1") // *italic*
    .replace(/`([^`]+)`/g, "$1") // `code`
    .replace(/\s+/g, " ")
    .trim();

  // Take first sentence OR first ~8 words — short fragments match more reliably.
  const sentenceEnd = clean.search(/[.!?](\s|$)/);
  const candidate =
    sentenceEnd > 20 && sentenceEnd < 80 ? clean.slice(0, sentenceEnd) : clean;

  const words = candidate.split(" ").slice(0, 10).join(" ");
  return words;
}
