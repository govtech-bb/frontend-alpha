type TrackingData = {
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
  search: { query: string; results: number };
};

export type TrackingEventName = keyof TrackingData;

/**
 * Sends a typed custom event to Umami. Events that carry a `form` slug are
 * automatically prefixed (e.g. "get-birth-certificate:form-start") for easy
 * identification in the dashboard. Pre-qualified names (those already
 * containing ":") are passed through as-is, allowing dynamic per-step event
 * names like "get-birth-certificate:form-step-one".
 *
 * No-ops gracefully when Umami is not loaded (missing env var, ad-blocker).
 */
export function trackEvent<E extends TrackingEventName>(
  event: E,
  data: TrackingData[E]
): void;
export function trackEvent(event: string, data: Record<string, unknown>): void;
export function trackEvent(event: string, data: Record<string, unknown>): void {
  if ("form" in data && typeof data.form === "string" && !event.includes(":")) {
    window.umami?.track(`${data.form}:${event}`, data);
  } else {
    window.umami?.track(event, data);
  }
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
