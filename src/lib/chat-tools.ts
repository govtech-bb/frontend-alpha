import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";

export const openFormReviewDef = toolDefinition({
  name: "open_form_review",
  description:
    "Pre-fill the official service form with the user's answers and take them to its Check-your-answers (review) page. The user reviews the answers there and submits the form themselves — this tool does NOT submit anything. Call it ONLY after every required field is collected and the user has confirmed the summary in chat. Do NOT promise a reference number; that comes from the form after the user clicks Submit on the review page.",
  inputSchema: z.object({
    service: z.string().meta({
      description:
        "The service slug, e.g. 'get-birth-certificate', 'apply-for-a-passport'. Use the slug from the source pages, not a free-form name.",
    }),
    serviceTitle: z.string().meta({
      description: "Human-readable service name to show in the handoff UI.",
    }),
    fields: z.record(z.string(), z.string()).meta({
      description:
        "All collected field values keyed by the exact field names the form expects (e.g. firstName, baby_dob). The chat retriever surfaces these names from the source pages; use them verbatim.",
    }),
  }),
  outputSchema: z.object({
    ok: z.boolean(),
    redirectedTo: z.string().optional(),
    errors: z
      .array(
        z.object({
          field: z.string(),
          message: z.string(),
        })
      )
      .optional()
      .meta({
        description:
          "Validation errors returned when one or more fields don't satisfy the form's schema. Each entry names the field and the user-facing error. Apologize, ask the user to correct, and retry open_form_review.",
      }),
  }),
});

export const presentChoicesDef = toolDefinition({
  name: "present_choices",
  description:
    "Show the user a multiple-choice question with clickable buttons. Use this when the user's next answer falls into a small closed set (e.g. yes/no, choosing a service type, type of certificate, parent vs someone else). Do NOT use for open-ended answers like names, dates, or addresses. The UI renders the question from this tool call — DO NOT also type the question as plain text in the same turn.",
  inputSchema: z.object({
    question: z
      .string()
      .meta({ description: "The question to display to the user." }),
    choices: z.array(z.string()).min(2).meta({
      description:
        "Short option labels. Each becomes a button the user can click. For select/radio fields, include EVERY option value from the form schema, in the same order — never truncate, never invent. Length is determined by the schema, not by you.",
    }),
  }),
  outputSchema: z.object({
    shown: z.boolean().meta({
      description:
        "True once the UI has rendered the buttons. Your turn ends here — wait for the user's next message (their answer arrives as a normal user message, not as more tool data).",
    }),
  }),
});
