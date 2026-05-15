import type { StreamChunk, UIMessage } from "@tanstack/ai";
import {
  chat,
  convertMessagesToModelMessages,
  toServerSentEventsResponse,
} from "@tanstack/ai";
import { anthropicText } from "@tanstack/ai-anthropic";
import { presentChoicesDef, submitFormDef } from "@/lib/chat-tools";

const RAG_URL = process.env.NEXT_PUBLIC_RAG_URL ?? "";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const LLM_MODEL = (process.env.LLM_MODEL ?? "claude-haiku-4-5") as Parameters<
  typeof anthropicText
>[0];

const submitForm = submitFormDef.server(
  async ({ service, serviceTitle, fields }) => {
    const reference = `BB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    console.log("[chat-form-submit]", {
      reference,
      service,
      serviceTitle,
      fields,
    });
    return {
      reference,
      status: "received" as const,
      message: `Application for "${serviceTitle}" received. Reference ${reference}. We will be in touch shortly.`,
    };
  }
);

const SYSTEM_PROMPT = `You help people find Barbados government services on alpha.gov.bb.

VOICE:
- Talk like a helpful person, not a brochure. Conversational, warm, direct.
- No "I'm here to help you with..." intros. No listing of capabilities. Skip filler.
- If the user just says hi, reply with one short friendly line and ask what they need. Nothing else.
- Use contractions ("you'll", "it's"). Sound human.

ANSWERS:
- 2–4 sentences. Headline answer first, then STOP.
- End with a short question that nudges to the next useful detail ("Want the docs you'll need?" / "Want the fees?").
- Only expand into bullets/details when the user explicitly asks for more.
- No raw URLs — sources show separately.
- Never invent fees, eligibility, documents, or office locations. If the context doesn't cover it, say so plainly.

CONTEXT USE:
- Use the prior conversation to interpret follow-ups. "What documents", "how much", "where do I go" → same service as the previous turn. Don't ask the user which service they mean if it's obvious from history.
- Off-topic? Politely redirect in one line.

INTERACTIVE CHOICES:
- When you ask the user a question whose answer is a SHORT CLOSED SET (yes/no, certificate type, role like parent vs guardian, regular vs urgent processing), call the \`present_choices\` tool instead of typing the options as text. The UI will render them as clickable buttons. Pair the tool call with a one-line text message that frames the question.
- Do NOT use \`present_choices\` for open-ended answers (names, dates, addresses, free text).
- Do NOT call \`present_choices\` more than once per assistant turn.

APPLYING FOR A SERVICE (form flow):
- If the user wants to apply for a service that the context describes (birth certificate, passport, etc), walk them through the required fields ONE OR TWO AT A TIME. Use \`present_choices\` when an answer is a closed set; otherwise plain text question.
- After collecting all required fields, show a short summary and ask the user to confirm. Use \`present_choices\` with ["Yes, submit", "Edit something"] for the confirmation.
- Once confirmed, call the \`submit_form\` tool with the service slug (from the source page URL, last path segment), a human serviceTitle, and the fields you collected. Then in your next text message share the reference number the tool returns.
- Do NOT call \`submit_form\` before the user has confirmed.`;

type Source = {
  id: string;
  url: string;
  title: string;
  section?: string;
  score: number;
  excerpt?: string;
};

type RetrieveResponse = {
  contexts: { title: string; section?: string; text: string }[];
  sources: Source[];
};

export async function POST(req: Request): Promise<Response> {
  if (!(RAG_URL && ANTHROPIC_API_KEY)) {
    return new Response(
      JSON.stringify({
        error: "NEXT_PUBLIC_RAG_URL or ANTHROPIC_API_KEY missing",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = (await req.json()) as { messages: UIMessage[] };
  const messages = body.messages ?? [];

  const query = buildRetrievalQuery(messages);
  const retrieved = await fetch(`${RAG_URL}/retrieve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, topK: 8 }),
  });
  if (!retrieved.ok) {
    return new Response(
      JSON.stringify({ error: `Retrieve failed ${retrieved.status}` }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const { contexts, sources: rawSources } =
    (await retrieved.json()) as RetrieveResponse;

  const sources = filterSources(rawSources, query);

  const contextBlock = contexts.length
    ? contexts
        .map((c, i) => {
          const head = c.section ? `${c.title} — ${c.section}` : c.title;
          return `[${i + 1}] ${head}\n${c.text}`;
        })
        .join("\n\n---\n\n")
    : "(no relevant context found)";

  const abortController = new AbortController();

  const llmStream = chat({
    adapter: anthropicText(LLM_MODEL, { apiKey: ANTHROPIC_API_KEY }),
    // biome-ignore lint/suspicious/noExplicitAny: adapter type narrowing too strict for our generic conversion
    messages: convertMessagesToModelMessages(messages) as any,
    systemPrompts: [SYSTEM_PROMPT, `Context for this turn:\n${contextBlock}`],
    tools: [presentChoicesDef, submitForm],
    maxTokens: 350,
    abortController,
  });

  const stream = withSourcesPrefix(llmStream, sources);
  return toServerSentEventsResponse(stream, { abortController });
}

async function* withSourcesPrefix(
  inner: AsyncIterable<StreamChunk>,
  sources: Source[]
): AsyncGenerator<StreamChunk> {
  yield {
    type: "CUSTOM",
    name: "sources",
    value: sources,
  } as unknown as StreamChunk;
  for await (const chunk of inner) yield chunk;
}

const SCORE_THRESHOLD = 0.55;
const MAX_SOURCES = 3;
const GREETING_RE =
  /^(hi|hello|hey|yo|sup|good (morning|afternoon|evening)|howdy)[!.\s]*$/i;

function filterSources(sources: Source[], query: string): Source[] {
  const lastLine = query.split("\n").pop()?.trim() ?? "";
  if (GREETING_RE.test(lastLine) || lastLine.length < 8) return [];

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
  // Strip markdown like **bold** or [text](url)
  const clean = excerpt
    .replace(/\*\*?([^*]+)\*\*?/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
  if (!clean) return url;
  return `${url}#:~:text=${encodeURIComponent(clean)}`;
}

function buildRetrievalQuery(messages: UIMessage[]): string {
  const lastUserMsgs: string[] = [];
  let lastAssistant = "";
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    const text = extractText(m);
    if (!text) continue;
    if (m.role === "user" && lastUserMsgs.length < 3) {
      lastUserMsgs.unshift(text);
    } else if (m.role === "assistant" && !lastAssistant) {
      lastAssistant = text;
    }
    if (lastUserMsgs.length >= 3 && lastAssistant) break;
  }
  return [...lastUserMsgs, lastAssistant].filter(Boolean).join("\n");
}

function extractText(message: UIMessage): string {
  return message.parts
    .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
    .map((p) => p.content ?? "")
    .join(" ")
    .trim();
}
