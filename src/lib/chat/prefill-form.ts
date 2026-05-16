import { getFormPageSlug } from "@/lib/form-registry";
import { findCategoryByPageSlug, setNestedValue } from "@/lib/utils";
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

// Number of "completed step" slots to seed. Large enough that the review step
// is reachable by URL on any reasonable form (its index < MAX_STEPS).
const MAX_STEPS = 50;

export function prefillFormSession(
  slug: string,
  fields: Record<string, string>
): string {
  const url = formReviewUrl(slug);
  if (!url) {
    throw new Error(
      `No local form route for slug "${slug}". Chat must use a slug listed in FORM_STORAGE_KEYS.`
    );
  }

  const formData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (shouldSkipChatField(key)) continue;
    setNestedValue(formData, key, coerceValue(value));
  }

  const envelope: PersistedEnvelope = {
    state: {
      // Render-safe initial index; the form's URL-effect navigates to the real
      // review step on mount once ?step=review is parsed.
      currentStep: 0,
      completedSteps: Array.from({ length: MAX_STEPS }, (_, i) => i),
      formData,
      lastSaved: new Date().toISOString(),
      isSubmitted: false,
      referenceNumber: null,
      customerName: null,
      paymentData: null,
      totalSteps: MAX_STEPS,
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
