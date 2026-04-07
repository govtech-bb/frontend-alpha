type FormTrackingData = {
  "form-start": { form: string; category: string };
  "form-step-complete": { form: string; category: string; step: string };
  "form-step-back": { form: string; category: string; step: string };
  "form-step-edit": { form: string; category: string; step: string };
  "form-submit": {
    form: string;
    category: string;
    duration_seconds: number;
  };
  "form-submit-error": { form: string; category: string; errors: string };
  "form-review": {
    form: string;
    category: string;
    duration_seconds: number;
  };
  "form-validation-error": {
    form: string;
    category: string;
    step: string;
    errorCount: number;
    fields: string;
    errorTypes: string;
  };
  "page-service-view": { form: string; category: string };
  "page-start-view": { form: string; category: string };
};

export type TrackingEventName = keyof FormTrackingData;

/**
 * Sends a typed custom event to Umami, prefixed with the form slug
 * so events are immediately identifiable in the dashboard
 * (e.g. "get-birth-certificate:form-start").
 *
 * No-ops gracefully when Umami is not loaded (missing env var, ad-blocker).
 */
export function trackFormEvent<E extends TrackingEventName>(
  event: E,
  data: FormTrackingData[E]
): void {
  const prefixedName = `${(data as { form: string }).form}:${event}`;
  window.umami?.track(prefixedName, data);
}

const NUMBER_WORDS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
] as const;

/** Converts a 1-based step number to a word ("one"–"ten"), falling back to the digit. */
export function stepNumberToWord(n: number): string {
  return NUMBER_WORDS[n - 1] ?? String(n);
}

const START_TIME_PREFIX = "form-start-time:";

export function persistFormStartTime(storageKey: string): void {
  sessionStorage.setItem(
    `${START_TIME_PREFIX}${storageKey}`,
    String(Date.now())
  );
}

export function getFormStartTime(storageKey: string): number | null {
  const raw = sessionStorage.getItem(`${START_TIME_PREFIX}${storageKey}`);
  return raw ? Number(raw) : null;
}

export function clearFormStartTime(storageKey: string): void {
  sessionStorage.removeItem(`${START_TIME_PREFIX}${storageKey}`);
}
