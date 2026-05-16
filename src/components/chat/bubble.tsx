import type { UIMessage } from "@tanstack/ai";
import { Allow, parse as parsePartialJson } from "partial-json";
import { memo, type ReactNode, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TridentAvatar } from "@/components/trident-avatar";
import { extractText, findToolCall } from "@/lib/chat/messages";
import { normalizeMarkdown } from "@/lib/chat/normalize-markdown";
import type { Source } from "@/lib/chat/types";

const Heading = ({ children }: { children?: ReactNode }) => (
  <h3 className="mt-4 mb-1 font-semibold text-grey-900">{children}</h3>
);

const MARKDOWN_COMPONENTS = {
  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-2 first:mt-0 last:mb-0">{children}</p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-grey-900">{children}</strong>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mt-1 mb-4 list-disc space-y-1 pl-5">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mt-1 mb-4 list-decimal space-y-1 pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  h1: Heading,
  h2: Heading,
  h3: Heading,
  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a
      className="text-blue-100 underline hover:text-blue-200"
      href={href}
      rel="noopener"
      target="_blank"
    >
      {children}
    </a>
  ),
};

interface ChoicesArgs {
  question?: string;
  choices?: string[];
}

function sourceDomain(rawUrl: string): string | null {
  try {
    return new URL(rawUrl, "https://alpha.gov.bb").hostname.replace(
      /^www\./,
      ""
    );
  } catch {
    return null;
  }
}

const FAVICON =
  "https://www.google.com/s2/favicons?sz=64&domain_url=https%3A%2F%2Falpha.gov.bb";

function SourcePill({ source }: { source: Source }) {
  const host = sourceDomain(source.url) ?? "source";
  const label = source.title || host;
  return (
    <a
      className="inline-flex h-6 max-w-44 items-center gap-1.5 overflow-hidden rounded-full bg-grey-50 py-0 pr-2.5 pl-1 text-grey-700 text-xs no-underline transition-colors hover:bg-grey-100 hover:text-blue-100"
      href={source.url}
      rel="noopener noreferrer"
      target="_blank"
      title={source.section ? `${label} — ${source.section}` : label}
    >
      {/* biome-ignore lint/performance/noImgElement: tiny third-party favicon, next/image is overkill */}
      <img
        alt=""
        className="size-4 rounded-full"
        height={16}
        src={FAVICON}
        width={16}
      />
      <span className="truncate font-normal tabular-nums">{label}</span>
    </a>
  );
}

function parsePartialArgs<T>(raw: string | undefined): Partial<T> | undefined {
  if (!raw) return undefined;
  try {
    return parsePartialJson(raw, Allow.ALL) as Partial<T>;
  } catch {
    return undefined;
  }
}

function BubbleImpl({
  message,
  sources,
  onChoice,
}: {
  message: UIMessage;
  sources?: Source[];
  onChoice: (choice: string) => void;
}) {
  const text = useMemo(() => extractText(message), [message]);
  const renderedMarkdown = useMemo(() => normalizeMarkdown(text), [text]);

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-[14px_14px_4px_14px] bg-blue-10 px-4 py-2 text-blue-00 text-sm">
          {text}
        </div>
      </div>
    );
  }

  const choicesPart = findToolCall(message, "present_choices");
  // Use partial-json so a still-streaming tool call (or a truncated one)
  // still renders the buttons that have arrived so far.
  const choicesArgs = parsePartialArgs<ChoicesArgs>(choicesPart?.arguments);
  const choices = (choicesArgs?.choices ?? []).filter(
    (c): c is string => typeof c === "string" && c.length > 0
  );
  // When the model emits both a text question AND the present_choices tool,
  // the question would render twice. Tool is the source of truth — hide text.
  const showText = !choicesPart && text.length > 0;

  return (
    <div className="flex max-w-[92%] gap-3">
      <TridentAvatar size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {showText && (
          <div className="text-grey-900 text-sm leading-relaxed">
            <ReactMarkdown
              components={MARKDOWN_COMPONENTS}
              remarkPlugins={[remarkGfm]}
            >
              {renderedMarkdown}
            </ReactMarkdown>
          </div>
        )}

        {sources && sources.length > 0 && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {sources.map((s) => (
              <SourcePill key={s.id} source={s} />
            ))}
          </div>
        )}

        {choicesPart && (
          <div className="flex flex-col gap-2">
            {choicesArgs?.question && (
              <p className="font-medium text-grey-900 text-sm">
                {choicesArgs.question}
              </p>
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
      </div>
    </div>
  );
}

export const Bubble = memo(BubbleImpl);
