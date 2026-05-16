"use client";

import type { UIMessage } from "@tanstack/ai";
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bubble } from "@/components/chat/bubble";
import { TridentAvatar } from "@/components/trident-avatar";
import { extractText, toolCallsOf } from "@/lib/chat/messages";
import { prefillFormSession } from "@/lib/chat/prefill-form";
import type { Source } from "@/lib/chat/types";
import { validateFormFields } from "@/lib/chat/validate-fields";
import { openFormReviewDef, presentChoicesDef } from "@/lib/chat-tools";

const SUGGESTIONS = [
  "How do I get a passport?",
  "How do I register a birth?",
  "What financial assistance is available?",
  "How do I apply for a driver's licence?",
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [sourcesByTurn, setSourcesByTurn] = useState<Source[][]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const presentChoices = useMemo(
    () => presentChoicesDef.client(async () => ({ shown: true })),
    []
  );
  const openFormReview = useMemo(
    () =>
      openFormReviewDef.client(async ({ service, fields }) => {
        console.log("[open_form_review] called", { service, fields });
        const result = await validateFormFields(service, fields);
        if (!result.ok) {
          console.log("[open_form_review] validation errors", result.errors);
          return { ok: false, errors: result.errors };
        }
        try {
          const url = prefillFormSession(service, fields);
          console.log("[open_form_review] redirecting", url);
          router.push(url);
          return { ok: true, redirectedTo: url };
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Unable to open review page";
          console.error("[open_form_review] redirect failed", err);
          return {
            ok: false,
            errors: [{ field: "service", message }],
          };
        }
      }),
    [router]
  );
  const tools = useMemo(
    () => [presentChoices, openFormReview],
    [presentChoices, openFormReview]
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
    tools,
    onCustomEvent: (eventType, data) => {
      if (eventType === "sources") {
        setSourcesByTurn((prev) => [...prev, data as Source[]]);
      }
    },
  });

  const isStreaming = status === "submitted" || status === "streaming";
  const empty = messages.length === 0;

  const assistantIndices = useMemo(
    () => buildAssistantIndexMap(messages),
    [messages]
  );

  const last = messages.at(-1);
  const scrollSignal =
    messages.length * 1_000_000 +
    (last ? last.parts.length + extractText(last).length : 0);
  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollSignal is the intentional trigger
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [scrollSignal]);

  const pickChoice = useCallback(
    (choice: string) => {
      sendMessage(choice);
    },
    [sendMessage]
  );

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    sendMessage(trimmed);
    setInput("");
  }

  function sourcesForMessage(m: UIMessage, idx: number): Source[] | undefined {
    if (m.role !== "assistant") return;
    const isFormFlow = toolCallsOf(m).some(
      (c) => c.name === "present_choices" || c.name === "open_form_review"
    );
    if (isFormFlow) return;
    return sourcesByTurn[assistantIndices[idx]];
  }

  return (
    <div className="flex h-dvh flex-col bg-grey-50">
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
        <EmptyState onPick={submit} />
      ) : (
        <main className="flex-1 overflow-y-auto px-4 pb-4" ref={scrollRef}>
          <div className="mx-auto max-w-2xl space-y-4 py-4">
            {messages.map((m, i) => (
              <Bubble
                key={m.id}
                message={m}
                onChoice={pickChoice}
                sources={sourcesForMessage(m, i)}
              />
            ))}
            {isStreaming && shouldShowThinking(messages) && <ThinkingShimmer />}
            {error && (
              <div className="rounded-md bg-red-50 px-3 py-2 text-red-700 text-sm">
                {error.message}
              </div>
            )}
          </div>
        </main>
      )}

      <Composer
        input={input}
        onChange={setInput}
        onStop={stop}
        onSubmit={() => submit(input)}
        streaming={isStreaming}
      />
    </div>
  );
}

function shouldShowThinking(messages: UIMessage[]): boolean {
  const last = messages.at(-1);
  if (!last) return false;
  if (last.role === "user") return true;
  return extractText(last).length === 0;
}

function ThinkingShimmer() {
  return (
    <div className="flex items-center px-1">
      <span
        className="animate-[shimmer_2.5s_linear_infinite] font-medium text-sm"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #9ca3af 40%, #111827 50%, #9ca3af 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Thinking
      </span>
    </div>
  );
}

function buildAssistantIndexMap(messages: UIMessage[]): number[] {
  const map: number[] = [];
  let count = -1;
  for (const m of messages) {
    if (m.role === "assistant") count += 1;
    map.push(count);
  }
  return map;
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <TridentAvatar size="lg" />
      <h1 className="mt-6 font-bold text-4xl text-grey-900">Hello.</h1>
      <p className="mt-1 text-lg text-mid-grey-00">
        What can we help you with today?
      </p>
      <div className="mt-8 flex w-full max-w-md flex-col gap-2 text-left">
        {SUGGESTIONS.map((s) => (
          <button
            className="w-full rounded-[10px] border border-grey-00 bg-white px-4 py-3 text-grey-900 text-sm transition hover:-translate-y-px hover:border-blue-100"
            key={s}
            onClick={() => onPick(s)}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
    </main>
  );
}

function Composer({
  input,
  onChange,
  onSubmit,
  onStop,
  streaming,
}: {
  input: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  streaming: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!streaming) textareaRef.current?.focus();
  }, [streaming]);

  return (
    <footer className="px-4 pb-4">
      <form
        className="relative mx-auto flex max-w-2xl flex-col rounded-3xl border border-grey-00 bg-white p-4 pr-16 shadow-sm focus-within:border-grey-300"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <textarea
          aria-label="Ask anything"
          className="max-h-48 min-h-12 w-full resize-none border-none bg-transparent text-grey-900 text-sm placeholder:text-mid-grey-00 focus:outline-none"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Ask anything"
          ref={textareaRef}
          rows={2}
          value={input}
        />
        {streaming ? (
          <button
            aria-label="Stop"
            className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-xl bg-grey-200 text-grey-700 hover:bg-grey-300"
            onClick={onStop}
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
  );
}
