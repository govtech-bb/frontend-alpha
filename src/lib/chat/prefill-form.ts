import { getFormPageSlug } from "@/lib/form-registry";
import { findCategoryByPageSlug, setNestedValue } from "@/lib/utils";
import { CHAT_FORM_SCHEMA_LOADERS } from "./schema-registry";
import { coerceValue, shouldSkipChatField } from "./validate-fields";

interface PersistedFormState {
  currentStep: number;
  completedSteps: number[];
  formData: Record<string, unknown>;
  lastSaved: string | null;
  isSubmitted: boolean;
  referenceNumber: string | null;
  customerName: string | null;
  paymentData: unknown;
  totalSteps: number;
  _hasHydrated?: boolean;
}

interface PersistedEnvelope {
  state: PersistedFormState;
  version: number;
}

export async function prefillFormSession(
  slug: string,
  fields: Record<string, string>
): Promise<string> {
  const url = formReviewUrl(slug);
  if (!url) {
    throw new Error(
      `No local form route for slug "${slug}". Chat must use a slug listed in FORM_STORAGE_KEYS.`
    );
  }

  const loader = CHAT_FORM_SCHEMA_LOADERS[slug];
  if (!loader) {
    throw new Error(`No schema registered for slug "${slug}".`);
  }
  const { formSteps } = await loader();

  // Seed currentStep to the review step's index and mark every preceding step
  // complete so the form's URL-effect can navigate to ?step=review on mount.
  const reviewIndex = Math.max(
    formSteps.findIndex((s) => s.id === "review"),
    0
  );

  const formData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (shouldSkipChatField(key)) continue;
    setNestedValue(formData, key, coerceValue(value));
  }

  const envelope: PersistedEnvelope = {
    state: {
      currentStep: reviewIndex,
      completedSteps: Array.from({ length: reviewIndex + 1 }, (_, i) => i),
      formData,
      lastSaved: new Date().toISOString(),
      isSubmitted: false,
      referenceNumber: null,
      customerName: null,
      paymentData: null,
      totalSteps: formSteps.length,
    },
    version: 0,
  };

  sessionStorage.setItem(slug, JSON.stringify(envelope));

  return url;
}

function formReviewUrl(storageSlug: string): string | undefined {
  const pageSlug = getFormPageSlug(storageSlug);
  if (!pageSlug) return undefined;
  const category = findCategoryByPageSlug(pageSlug);
  if (!category) return undefined;
  return `/${category.slug}/${pageSlug}/form?step=review`;
}
