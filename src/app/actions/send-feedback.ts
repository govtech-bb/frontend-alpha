"use server";

import { z } from "zod";

const trelloApiKey = process.env.TRELLO_API_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const trelloListId = process.env.TRELLO_LIST_ID;

const FeedbackSchema = z.object({
  visitReason: z.string().trim().min(1, "Please enter a reason."),
  whatWentWrong: z.string().trim().min(1, "Please enter a reason."),
  referrer: z.string(),
});

export type FeedbackState = {
  error: string | null;
  fieldErrors?: Record<string, string>;
  success?: boolean;
};

async function createTrelloCard({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  if (!(trelloApiKey && trelloToken && trelloListId)) {
    console.warn("Trello env vars not set");
    return;
  }
  const url = new URL("https://api.trello.com/1/cards");
  url.searchParams.set("idList", trelloListId);
  url.searchParams.set("name", name);
  url.searchParams.set("desc", desc);
  url.searchParams.set("pos", "top");
  url.searchParams.set("key", trelloApiKey);
  url.searchParams.set("token", trelloToken);

  const res = await fetch(url, { method: "POST" });
  if (!res.ok) {
    throw new Error(`Trello API error: ${res.status} ${await res.text()}`);
  }
}

export async function sendFeedback(
  _prev: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const parsed = FeedbackSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key] = issue.message;
      }
    }
    return { error: null, fieldErrors };
  }

  const { visitReason, whatWentWrong, referrer } = parsed.data;

  const cardName = "alpha.gov.bb Feedback";
  const referrerUrl = referrer
    ? new URL(referrer, "https://alpha.gov.bb").toString()
    : null;
  const referrerMarkdown = referrerUrl
    ? `[${referrerUrl}](${referrerUrl})`
    : null;

  const cardDesc = [
    referrerMarkdown && `**Page:** ${referrerMarkdown}`,
    `**Why did you visit alpha.gov.bb?**\n\n${visitReason}`,
    `**What went wrong?**\n\n${whatWentWrong}`,
    "\n---\n_Sent from alpha.gov.bb Feedback Form_",
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    await createTrelloCard({ name: cardName, desc: cardDesc });
  } catch (err) {
    console.error("Trello card creation failed:", err);
    return {
      error:
        "Sorry, there was an error sending your feedback. Please try again.",
    };
  }

  return { error: null, success: true };
}
