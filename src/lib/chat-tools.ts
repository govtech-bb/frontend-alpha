import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";

export const submitFormDef = toolDefinition({
  name: "submit_form",
  description:
    "Submit a completed service application on the user's behalf. Call this ONLY after you have collected every field the service needs and the user has confirmed the details. Do not call speculatively. The system will return a reference number you should share with the user.",
  inputSchema: z.object({
    service: z.string().meta({
      description:
        "The service slug, e.g. 'get-birth-certificate', 'apply-for-a-passport'. Use the slug from the source pages, not a free-form name.",
    }),
    serviceTitle: z.string().meta({
      description: "Human-readable service name to show in the confirmation.",
    }),
    fields: z.record(z.string(), z.string()).meta({
      description:
        "All collected field values keyed by short snake_case field names (e.g. applicant_name, baby_dob).",
    }),
  }),
  outputSchema: z.object({
    reference: z.string(),
    status: z.literal("received"),
    message: z.string(),
  }),
});

export const presentChoicesDef = toolDefinition({
  name: "present_choices",
  description:
    "Show the user a multiple-choice question with clickable buttons. Use this when the user's next answer falls into a small closed set (e.g. yes/no, choosing a service type, type of certificate, parent vs someone else). Do NOT use for open-ended answers like names, dates, or addresses.",
  inputSchema: z.object({
    question: z
      .string()
      .meta({ description: "The question to display to the user." }),
    choices: z.array(z.string()).min(2).max(6).meta({
      description:
        "Between 2 and 6 short option labels. Each becomes a button the user can click to answer.",
    }),
  }),
  outputSchema: z.object({ shown: z.boolean() }),
});
