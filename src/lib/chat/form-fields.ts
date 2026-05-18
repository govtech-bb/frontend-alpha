import type { FormField } from "@/types";
import { CHAT_FORM_SCHEMA_LOADERS } from "./schema-registry";

function isRequired(field: FormField): boolean {
  const req = field.validation?.required;
  return typeof req === "string" && req.length > 0;
}

function describeField(field: FormField, indent = ""): string[] {
  const lines: string[] = [];

  if (field.type === "showHide") {
    for (const nested of field.showHide.fields) {
      lines.push(...describeField(nested, indent));
    }
    return lines;
  }

  if (field.type === "fieldArray") {
    lines.push(
      `${indent}- ${field.name}[] (${field.label}) — repeatable group:`
    );
    for (const nested of field.fieldArray.fields ?? []) {
      lines.push(...describeField(nested, `${indent}  `));
    }
    return lines;
  }

  if (!isRequired(field)) return lines;

  let suffix = "";
  if (
    (field.type === "select" ||
      field.type === "radio" ||
      field.type === "checkbox") &&
    field.options?.length
  ) {
    const values = field.options.map((o) => o.value).filter(Boolean);
    suffix = ` [one of: ${values.join(", ")}]`;
  } else {
    suffix = ` [${field.type}]`;
  }

  lines.push(`${indent}- ${field.name}${suffix} — ${field.label}`);
  return lines;
}

const SUMMARY_CACHE = new Map<string, string | null>();

export async function summarizeFormFields(
  slug: string
): Promise<string | null> {
  const cached = SUMMARY_CACHE.get(slug);
  if (cached !== undefined) return cached;

  const loader = CHAT_FORM_SCHEMA_LOADERS[slug];
  if (!loader) {
    SUMMARY_CACHE.set(slug, null);
    return null;
  }

  const { formSteps } = await loader();
  const sections: string[] = [];
  for (const step of formSteps) {
    if (!step.fields?.length) continue;
    if (step.id === "review" || step.id === "declaration") continue;
    const lines: string[] = [];
    for (const field of step.fields) {
      lines.push(...describeField(field));
    }
    if (lines.length) {
      sections.push(
        `### ${step.title} (step: ${step.id})\n${lines.join("\n")}`
      );
    }
  }
  const result = sections.join("\n\n");
  SUMMARY_CACHE.set(slug, result);
  return result;
}
