"use client";

import { BackButton, Button, Input } from "@govtech-bb/react";
import type { UIMessage } from "@tanstack/ai";
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bubble } from "@/components/chat/bubble";
import { TridentAvatar } from "@/components/trident-avatar";
import { extractText, hasAnyToolCall } from "@/lib/chat/messages";
import { prefillFormSession } from "@/lib/chat/prefill-form";
import type { Source } from "@/lib/chat/types";
import { validateFormFields } from "@/lib/chat/validate-fields";
import { openFormReviewDef, presentChoicesDef } from "@/lib/chat-tools";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [sourcesByMessageId, setSourcesByMessageId] = useState<
    Record<string, Source[]>
  >({});
  const pendingSourcesRef = useRef<Source[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingNavRef = useRef<string | null>(null);
  const lastFieldsByService = useRef<Map<string, Record<string, string>>>(
    new Map()
  );

  const router = useRouter();

  const presentChoices = useMemo(
    () => presentChoicesDef.client(async () => ({ shown: true })),
    []
  );
  const openFormReview = useMemo(
    () =>
      openFormReviewDef.client(async ({ service, fields }) => {
        const prior = lastFieldsByService.current.get(service) ?? {};
        const merged = { ...prior, ...fields };
        lastFieldsByService.current.set(service, merged);
        const result = await validateFormFields(service, merged);
        if (!result.ok) return { ok: false, errors: result.errors };
        try {
          const url = await prefillFormSession(service, merged);
          pendingNavRef.current = url;
          return { ok: true, redirectedTo: url };
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Unable to open review page";
          return { ok: false, errors: [{ field: "service", message }] };
        }
      }),
    []
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
        pendingSourcesRef.current = data as Source[];
      }
    },
  });

  const isStreaming = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isStreaming) return;
    const url = pendingNavRef.current;
    if (!url) return;
    pendingNavRef.current = null;
    router.push(url);
  }, [isStreaming, router]);

  const last = messages.at(-1);

  useEffect(() => {
    if (!pendingSourcesRef.current) return;
    if (last?.role !== "assistant") return;
    if (sourcesByMessageId[last.id]) return;
    const sources = pendingSourcesRef.current;
    pendingSourcesRef.current = null;
    setSourcesByMessageId((prev) => ({ ...prev, [last.id]: sources }));
  }, [last, sourcesByMessageId]);

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
    pendingNavRef.current = null;
    sendMessage(trimmed);
    setInput("");
  }

  const formFlowStartIdx = useMemo(() => {
    const formToolNames = [presentChoicesDef.name, openFormReviewDef.name];
    return messages.findIndex((m) => hasAnyToolCall([m], formToolNames));
  }, [messages]);

  function sourcesForMessage(
    m: UIMessage,
    index: number
  ): Source[] | undefined {
    if (m.role !== "assistant") return;
    if (formFlowStartIdx !== -1 && index >= formFlowStartIdx) return;
    return sourcesByMessageId[m.id];
  }

  return (
    <div className="flex flex-col">
      <ChatHeader />

      <main className="flex-1 overflow-y-auto px-s pb-s" ref={scrollRef}>
        <div className="mx-auto max-w-2xl space-y-s py-s">
          <WelcomeBubble />
          {messages.map((m, i) => (
            <Bubble
              key={m.id}
              message={m}
              onChoice={pickChoice}
              sources={sourcesForMessage(m, i)}
            />
          ))}
          {isStreaming && shouldShowThinking(messages) && <ThinkingIndicator />}
          {error && (
            <div className="rounded-md bg-red-10 px-3 py-2 text-red-00 text-sm">
              {error.message}
            </div>
          )}
        </div>
      </main>

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

function ChatHeader() {
  return (
    <header className="bg-white-00">
      <div className="flex items-center justify-between gap-s px-s py-xm md:px-xl">
        <BackButton href="/">Back</BackButton>
        <TridentAvatar size="sm" tone="filled" />
      </div>
    </header>
  );
}

function WelcomeBubble() {
  return (
    <div className="flex max-w-[92%] items-start gap-2.5">
      <TridentAvatar size="sm" tone="filled" />
      <div className="rounded-[16px_16px_16px_4px] bg-blue-10 px-4 py-3 text-black-00 text-bubble sm:px-5 sm:py-3.5">
        Welcome to <strong className="font-bold">alpha.gov.bb.</strong> I can
        help you find the right government service, understand what you need to
        apply, or point you to the right organisation. What would you like help
        with today?
      </div>
    </div>
  );
}

function shouldShowThinking(messages: UIMessage[]): boolean {
  const last = messages.at(-1);
  if (!last) return false;
  if (last.role === "user") return true;
  return extractText(last).length === 0;
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2.5">
      <TridentAvatar size="sm" tone="filled" />
      <span
        className="animate-[shimmer_2.5s_linear_infinite] bg-clip-text font-medium text-bubble text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-blue-40) 0%, var(--color-teal-00) 35%, var(--color-teal-100) 50%, var(--color-teal-00) 65%, var(--color-blue-40) 100%)",
          backgroundSize: "200% 100%",
        }}
      >
        Thinking
      </span>
    </div>
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
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!streaming) inputRef.current?.focus();
  }, [streaming]);

  const hasInput = input.trim().length > 0;

  return (
    <footer className="px-s pb-s">
      <form
        className="mx-auto flex max-w-2xl flex-col items-center gap-xs"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex w-full items-center gap-xs">
          <Input
            aria-label="Ask the government assistant"
            className="flex-1 text-black-00"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!streaming) onSubmit();
              }
            }}
            placeholder="Ask a question..."
            ref={inputRef}
            value={input}
          />
          {streaming ? (
            <Button onClick={onStop} type="button">
              Stop
            </Button>
          ) : (
            <Button disabled={!hasInput} type="submit">
              Send
            </Button>
          )}
        </div>
        <p className="text-center text-disclaimer text-mid-grey-00">
          Responses are based on official Government of Barbados information
        </p>
      </form>
    </footer>
  );
}
