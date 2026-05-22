"use client";

import { Button, Heading, Input, Text } from "@govtech-bb/react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const DEFAULT_QUESTIONS = [
  "How do I get a passport?",
  "How do I register a birth?",
  "What financial assistance is available?",
  "How do I apply for a driver's licence?",
];

interface ChatAssistantProps {
  questions?: Array<string>;
  source?: string;
}

export function ChatAssistant({
  questions = DEFAULT_QUESTIONS,
  source = "home",
}: ChatAssistantProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("chat-submit", { query: input, source });
  };

  return (
    <div className="space-y-m">
      <div className="max-w-250 overflow-hidden rounded-lg border border-white-00 bg-white-00 shadow-md">
        <div className="flex items-center gap-xm bg-teal-00 p-xm text-white-00">
          <div className="flex-1 space-y-xxs">
            <Heading as="h2" size="h3">
              Ask your government assistant
            </Heading>
            <div className="flex items-center gap-xs text-grey-00">
              <div className="flex items-center gap-xs border-grey-00 border-r pr-xs">
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 rounded-full bg-green-100"
                />
                <Text as="span" size="caption">
                  Online
                </Text>
              </div>
              <Text as="span" size="caption">
                Powered by alpha.gov.bb
              </Text>
            </div>
          </div>
        </div>

        <div className="px-s pt-xm pb-m">
          <div className="flex items-start gap-2.5">
            <div
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-00 font-bold text-sm text-white-00"
            >
              A
            </div>
            <div className="rounded-2xl rounded-bl-xs bg-blue-10 px-s py-3.5 text-black-00">
              <Text as="p" className="text-pretty">
                Welcome to <strong>alpha.gov.bb.</strong> I can help you find
                the right government service, understand what you need to apply,
                or point you to the right organisation. What would you like help
                with today?
              </Text>
            </div>
          </div>
        </div>

        <div className="px-s pb-xm">
          <form
            className="flex flex-col items-center gap-xs"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full items-center gap-xs">
              <Input
                aria-label="Ask the government assistant"
                className="flex-1 text-black-00"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                value={input}
              />
              <Button disabled={!input.trim()} type="submit">
                Send
              </Button>
            </div>
            <Text className="text-center text-mid-grey-00" size="caption">
              Responses are based on official Government of Barbados information
            </Text>
          </form>
        </div>
      </div>

      <div className="max-w-250 space-y-s">
        <Heading as="h3" size="h4">
          Questions you can ask:
        </Heading>
        <div className="flex flex-wrap gap-s">
          {questions.map((q) => (
            <button
              className="pointer-coarse:min-h-11 rounded-xl border border-grey-00 bg-blue-00 px-s py-xs text-sm text-white-00 hover:bg-blue-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-100"
              key={q}
              onClick={() => {
                setInput(q);
                trackEvent("chat-suggestion", { question: q, source });
              }}
              type="button"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
