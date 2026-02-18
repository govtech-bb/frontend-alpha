export const TRACKED_EVENTS = {
  FORM_SUBMIT_EVENT: "form-submit",
  FORM_STEP_COMPLETE_EVENT: "form-step-complete",
} as const;

export const FORM_SUBMIT_STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
} as const;

export type TYPE_FORM_SUBMIT_STATUS =
  (typeof FORM_SUBMIT_STATUS)[keyof typeof FORM_SUBMIT_STATUS];

export const FORM_NAMES = {
  SIMPLE_FEEDBACK_FORM: "simple-feedback-form",
} as const;
