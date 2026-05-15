const SENTENCE_BOUNDARY = /(?<=[.!?])\s+(?=[A-Z(])/;
const HEADING_RE = /^(#{1,6})\s+(.+)$/gm;

export type Chunk = {
  text: string;
  section?: string;
};

export function chunkMarkdown(
  input: string,
  opts: { maxLen?: number; overlap?: number } = {}
): Chunk[] {
  const maxLen = opts.maxLen ?? 900;
  const overlap = opts.overlap ?? 100;

  const cleaned = stripFrontmatter(input).replace(/\r\n/g, "\n").trim();
  if (!cleaned) return [];

  const sections = splitByHeadings(cleaned);
  const chunks: Chunk[] = [];

  for (const sec of sections) {
    if (sec.body.length <= maxLen) {
      chunks.push({
        text: composeChunk(sec.heading, sec.body),
        section: sec.heading,
      });
      continue;
    }
    for (const piece of splitLong(sec.body, maxLen, overlap)) {
      chunks.push({
        text: composeChunk(sec.heading, piece),
        section: sec.heading,
      });
    }
  }

  return chunks.filter((c) => c.text.trim().length >= 40);
}

function stripFrontmatter(input: string): string {
  if (!input.startsWith("---")) return input;
  const end = input.indexOf("\n---", 3);
  return end === -1 ? input : input.slice(end + 4);
}

function splitByHeadings(input: string): { heading?: string; body: string }[] {
  const matches = [...input.matchAll(HEADING_RE)];
  if (matches.length === 0) return [{ body: input }];

  const sections: { heading?: string; body: string }[] = [];
  const firstIdx = matches[0].index ?? 0;
  if (firstIdx > 0) {
    const intro = input.slice(0, firstIdx).trim();
    if (intro) sections.push({ body: intro });
  }

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const heading = m[2].trim();
    const start = (m.index ?? 0) + m[0].length;
    const end =
      i + 1 < matches.length
        ? (matches[i + 1].index ?? input.length)
        : input.length;
    const body = input.slice(start, end).trim();
    if (body) sections.push({ heading, body });
  }
  return sections;
}

function splitLong(body: string, maxLen: number, overlap: number): string[] {
  const sentences = body.split(SENTENCE_BOUNDARY);
  const out: string[] = [];
  let buf = "";

  for (const s of sentences) {
    const sentence = s.trim();
    if (!sentence) continue;
    if (buf.length + sentence.length + 1 > maxLen && buf) {
      out.push(buf.trim());
      buf = overlap > 0 ? buf.slice(-overlap) + " " + sentence : sentence;
    } else {
      buf = buf ? `${buf} ${sentence}` : sentence;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

function composeChunk(heading: string | undefined, body: string): string {
  return heading ? `${heading}\n\n${body}` : body;
}
