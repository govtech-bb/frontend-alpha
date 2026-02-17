declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string>) => void;
    };
  }
}

export const TRACKED_EVENTS = {
  SUBMIT: "submit",
  SUBMIT_STEP: "submit_step",
  FORM_STEP_COMPLETE_EVENT: "form-step-complete",
  FORM_SUBMIT_EVENT: "form-submit",
} as const;

export const FORM_SUBMIT_STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
} as const;

export function buildEventName(
  name: string,
  event: (typeof TRACKED_EVENTS)[keyof typeof TRACKED_EVENTS]
): string {
  return `${name}_${event}`;
}

export function trackEvent(name: string, data?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  window.umami?.track(name, data);
}
