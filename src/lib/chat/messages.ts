import type { UIMessage } from "@tanstack/ai";

type TextPart = Extract<UIMessage["parts"][number], { type: "text" }>;
type ToolCallPart = Extract<UIMessage["parts"][number], { type: "tool-call" }>;

export function extractText(message: UIMessage): string {
  return message.parts
    .filter((p): p is TextPart => p.type === "text")
    .map((p) => p.content ?? "")
    .join(" ")
    .trim();
}

export function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") return extractText(messages[i]);
  }
  return "";
}

export function lastAssistantText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") return extractText(messages[i]);
  }
  return "";
}

export function firstUserText(messages: UIMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  return firstUser ? extractText(firstUser) : "";
}

export function toolCallsOf(message: UIMessage): ToolCallPart[] {
  return message.parts.filter((p): p is ToolCallPart => p.type === "tool-call");
}

export function findToolCall(
  message: UIMessage,
  name: string
): ToolCallPart | undefined {
  return toolCallsOf(message).find((p) => p.name === name);
}

export function hasAnyToolCall(
  messages: UIMessage[],
  names: string[]
): boolean {
  return messages.some((m) =>
    toolCallsOf(m).some((p) => names.includes(p.name))
  );
}
