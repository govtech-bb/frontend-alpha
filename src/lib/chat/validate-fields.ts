import { generateFormSchema } from "@/lib/schema-generator";
import { setNestedValue } from "@/lib/utils";
import type { FormStep } from "@/types";

interface SchemaModule {
  formSteps: FormStep[];
}

// The user signs the declaration on the review/declaration step itself, so
// the chat doesn't collect it and the schema used for chat validation must
// not require it. Same for the auto-stamped date inside the declaration.
const STEPS_SKIPPED_FOR_CHAT = new Set(["declaration"]);

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DMY_SLASH_RE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const DMY_DASH_RE = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;

interface DateParts {
  day: string;
  month: string;
  year: string;
}

function tryParseDate(raw: string): DateParts | null {
  const iso = raw.match(ISO_DATE_RE);
  if (iso) return { year: iso[1], month: iso[2], day: iso[3] };
  const dmySlash = raw.match(DMY_SLASH_RE);
  if (dmySlash)
    return { day: dmySlash[1], month: dmySlash[2], year: dmySlash[3] };
  const dmyDash = raw.match(DMY_DASH_RE);
  if (dmyDash) return { day: dmyDash[1], month: dmyDash[2], year: dmyDash[3] };
  return null;
}

export function coerceValue(value: string): string | DateParts {
  const date = tryParseDate(value);
  return date ?? value;
}

export function shouldSkipChatField(path: string): boolean {
  return path.startsWith("declaration.");
}

const SCHEMA_LOADERS: Record<string, () => Promise<SchemaModule>> = {
  "apply-for-conductor-licence": () =>
    import("@/schema/apply-for-conductor-licence"),
  "community-sports-programme": () =>
    import("@/schema/sports-training-programme-form-schema"),
  "get-birth-certificate": () => import("@/schema/get-birth-certificate"),
  "get-death-certificate": () => import("@/schema/get-death-certificate"),
  "get-marriage-certificate": () => import("@/schema/get-marriage-certificate"),
  "jobstart-plus-programme": () => import("@/schema/jobstart-plus-programme"),
  "post-office-redirection-business": () =>
    import("@/schema/post-office-redirection-business"),
  "post-office-redirection-deceased": () =>
    import("@/schema/post-office-redirection-deceased"),
  "post-office-redirection-individual": () =>
    import("@/schema/post-office-redirection-individual"),
  "primary-school-textbook-grant": () =>
    import("@/schema/primary-school-textbook-grant"),
  "project-protege-mentor": () => import("@/schema/project-protege-mentor"),
  "request-a-fire-service-inspection": () =>
    import("@/schema/request-a-fire-service-inspection"),
  "request-a-presidential-visit-for-a-centenarian": () =>
    import("@/schema/request-a-presidential-visit-for-a-centenarian"),
  "reserve-society-name": () => import("@/schema/reserve-society-name"),
  "sell-goods-services-beach-park": () =>
    import("@/schema/sell-goods-services-beach-park"),
};

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; errors: ValidationError[] };

const SCHEMA_CACHE = new Map<string, ReturnType<typeof generateFormSchema>>();

async function getSchema(slug: string) {
  const cached = SCHEMA_CACHE.get(slug);
  if (cached) return cached;
  const loader = SCHEMA_LOADERS[slug];
  if (!loader) return undefined;
  const mod = await loader();
  const stepsForChat = mod.formSteps.filter(
    (s) => !STEPS_SKIPPED_FOR_CHAT.has(s.id)
  );
  const built = generateFormSchema(stepsForChat);
  SCHEMA_CACHE.set(slug, built);
  return built;
}

export async function validateFormFields(
  slug: string,
  fields: Record<string, string>
): Promise<ValidationResult> {
  const schema = await getSchema(slug);
  // Unknown slug — route already gates on known slugs, treat as pass-through.
  if (!schema) return { ok: true, data: fields };

  const hydrated: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (shouldSkipChatField(key)) continue;
    setNestedValue(hydrated, key, coerceValue(value));
  }
  const result = schema.safeParse(hydrated);
  if (result.success) return { ok: true, data: result.data };

  const errors: ValidationError[] = result.error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
  return { ok: false, errors };
}
