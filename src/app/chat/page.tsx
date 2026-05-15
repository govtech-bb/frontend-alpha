"use client";

import type { UIMessage } from "@tanstack/ai";
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TridentAvatar } from "@/components/trident-avatar";
import { presentChoicesDef } from "@/lib/chat-tools";

type Source = {
  id: string;
  url: string;
  title: string;
  section?: string;
  score: number;
};

const SUGGESTIONS = [
  "How do I get a passport?",
  "How do I register a birth?",
  "What financial assistance is available?",
  "How do I apply for a driver's licence?",
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [sourcesByIndex, setSourcesByIndex] = useState<
    Record<number, Source[]>
  >({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const choiceResolverRef = useRef<
    ((output: { shown: boolean }) => void) | null
  >(null);

  const presentChoices = presentChoicesDef.client(
    () =>
      new Promise<{ shown: boolean }>((resolve) => {
        choiceResolverRef.current = resolve;
      })
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
    tools: [presentChoices],
    onCustomEvent: (eventType, data) => {
      if (eventType === "sources") {
        setSourcesByIndex((prev) => ({
          ...prev,
          [Object.keys(prev).length]: data as Source[],
        }));
      }
    },
  });

  function pickChoice(choice: string) {
    choiceResolverRef.current?.({ shown: true });
    choiceResolverRef.current = null;
    sendMessage(choice);
  }

  const formActive = messages.some((m) =>
    m.parts.some(
      (p) =>
        p.type === "tool-call" &&
        ((p as { name?: string }).name === "present_choices" ||
          (p as { name?: string }).name === "submit_form")
    )
  );

  // True if the user's first message looks like an intent to apply for a service.
  const intentToApply = (() => {
    const firstUser = messages.find((m) => m.role === "user");
    if (!firstUser) return false;
    const text = firstUser.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { content?: string }).content ?? "")
      .join(" ")
      .toLowerCase();
    return /\b(apply|register|sign up|get a|i want|i need|start)\b/.test(text);
  })();

  function showSourcesFor(message: UIMessage): boolean {
    if (formActive || intentToApply) return false;
    const text = message.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { content?: string }).content ?? "")
      .join(" ")
      .trim();
    // Bot is collecting info if its message ends with a question.
    if (/\?\s*$/.test(text)) return false;
    return true;
  }

  const isStreaming = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isStreaming]);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    sendMessage(trimmed);
    setInput("");
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-[100dvh] flex-col bg-grey-50">
      <header className="flex items-center justify-between px-4 py-3">
        <Link
          aria-label="Back to alpha.gov.bb"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-grey-700 shadow-sm hover:bg-grey-100"
          href="/"
        >
          ←
        </Link>
        <span className="font-medium text-grey-700 text-sm">
          Ask alpha.gov.bb
        </span>
        <TridentAvatar size="sm" />
      </header>

      {empty ? (
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <TridentAvatar size="lg" />
          <h1 className="mt-6 font-bold text-4xl text-grey-900">Hello.</h1>
          <p className="mt-1 text-lg text-mid-grey-00">
            What can we help you with today?
          </p>
          <ul className="mt-8 flex w-full max-w-md flex-col gap-2 text-left">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  className="w-full rounded-[10px] border border-grey-00 bg-white px-4 py-3 text-grey-900 text-sm transition hover:-translate-y-px hover:border-blue-100"
                  onClick={() => submit(s)}
                  type="button"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </main>
      ) : (
        <main className="flex-1 overflow-y-auto px-4 pb-4" ref={scrollRef}>
          <div className="mx-auto max-w-2xl space-y-4 py-4">
            {messages.map((m, i) => (
              <Bubble
                key={m.id}
                message={m}
                onChoice={pickChoice}
                sources={
                  m.role === "assistant" && showSourcesFor(m)
                    ? sourcesByIndex[assistantIndex(messages, i)]
                    : undefined
                }
              />
            ))}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-center gap-2 text-grey-500 text-sm">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-grey-500" />
                Thinking…
              </div>
            )}
            {error && (
              <div className="rounded-md bg-red-50 px-3 py-2 text-red-700 text-sm">
                {error.message}
              </div>
            )}
          </div>
        </main>
      )}

      <footer className="px-4 pb-4">
        <form
          className="relative mx-auto flex max-w-2xl flex-col rounded-3xl border border-grey-00 bg-white p-4 pr-16 shadow-sm focus-within:border-grey-300"
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
        >
          <textarea
            aria-label="Ask anything"
            className="max-h-48 min-h-[48px] w-full resize-none border-none bg-transparent text-grey-900 text-sm placeholder:text-mid-grey-00 focus:outline-none"
            disabled={isStreaming}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            placeholder="Ask anything"
            rows={2}
            value={input}
          />
          {isStreaming ? (
            <button
              aria-label="Stop"
              className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-xl bg-grey-200 text-grey-700 hover:bg-grey-300"
              onClick={stop}
              type="button"
            >
              ■
            </button>
          ) : (
            <button
              aria-label="Send"
              className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-xl bg-grey-900 text-white transition hover:bg-grey-700 disabled:bg-grey-300"
              disabled={!input.trim()}
              type="submit"
            >
              ↑
            </button>
          )}
        </form>
        <p className="mt-2 text-center text-mid-grey-00 text-xs">
          AI can make mistakes. Please double-check responses.
        </p>
      </footer>
    </div>
  );
}

function parseArgs<T>(raw: string | undefined): T | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
}

function SubmitCard({
  args,
  output,
  state,
}: {
  args?: {
    service?: string;
    serviceTitle?: string;
    fields?: Record<string, string>;
  };
  output?: { reference?: string; message?: string };
  state?: string;
}) {
  const fields = args?.fields ?? {};
  const title = args?.serviceTitle ?? args?.service ?? "Application";
  const done = state === "result" || !!output?.reference;

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-10/40 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span
          className={
            done
              ? "h-2 w-2 rounded-full bg-green-100"
              : "h-2 w-2 animate-pulse rounded-full bg-blue-100"
          }
        />
        <p className="font-bold text-blue-100 text-sm">
          {done ? `${title} — submitted` : `Submitting ${title}…`}
        </p>
      </div>
      {Object.keys(fields).length > 0 && (
        <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-1 text-grey-900 text-xs">
          {Object.entries(fields).map(([k, v]) => (
            <div className="contents" key={k}>
              <dt className="font-medium text-mid-grey-00">
                {k.replace(/_/g, " ")}
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {output?.reference && (
        <p className="mt-3 font-mono text-blue-100 text-xs">
          Ref: {output.reference}
        </p>
      )}
    </div>
  );
}

function assistantIndex(messages: UIMessage[], current: number): number {
  let count = 0;
  for (let i = 0; i <= current; i++) {
    if (messages[i].role === "assistant") count++;
  }
  return count - 1;
}

function Bubble({
  message,
  sources,
  onChoice,
}: {
  message: UIMessage;
  sources?: Source[];
  onChoice: (choice: string) => void;
}) {
  const text = message.parts
    .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
    .map((p) => p.content ?? "")
    .join("");

  const toolCalls = message.parts.filter(
    (p) => p.type === "tool-call"
  ) as Array<{
    type: "tool-call";
    id: string;
    name: string;
    arguments: string;
    state?: string;
    output?: unknown;
  }>;

  const choicesPart = toolCalls.find((p) => p.name === "present_choices");
  const submitPart = toolCalls.find((p) => p.name === "submit_form");

  const choicesArgs = parseArgs<{ question?: string; choices?: string[] }>(
    choicesPart?.arguments
  );
  const submitArgs = parseArgs<{
    service?: string;
    serviceTitle?: string;
    fields?: Record<string, string>;
  }>(submitPart?.arguments);

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-[14px_14px_4px_14px] bg-blue-10 px-4 py-2 text-blue-00 text-sm">
          {text}
        </div>
      </div>
    );
  }

  const question = choicesArgs?.question;
  const choices = choicesArgs?.choices ?? [];

  return (
    <div className="flex max-w-[92%] gap-3">
      <TridentAvatar size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {text && (
          <div className="prose-sm prose max-w-none text-grey-900 text-sm">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}

        {choicesPart && (
          <div className="flex flex-col gap-2">
            {question && (
              <p className="font-medium text-grey-900 text-sm">{question}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {choices.map((c) => (
                <button
                  className="rounded-full border border-blue-100 bg-white px-4 py-2 text-blue-100 text-sm transition hover:bg-blue-10"
                  key={c}
                  onClick={() => onChoice(c)}
                  type="button"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {submitPart && (
          <SubmitCard
            args={submitArgs}
            output={
              submitPart.output as
                | { reference?: string; message?: string }
                | undefined
            }
            state={submitPart.state}
          />
        )}

        {sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sources.map((s) => (
              <a
                className="rounded-full border border-grey-00 bg-white px-3 py-1 text-blue-100 text-xs hover:bg-blue-10"
                href={s.url}
                key={s.id}
                rel="noopener"
                target="_blank"
              >
                {s.title}
                {s.section ? ` — ${s.section}` : ""}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
