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

export const FORM_LONG_TO_SHORT: Record<string, string> = {
  "get-birth-certificate": "birth-cert",
  "get-death-certificate": "death-cert",
  "get-marriage-certificate": "marriage-cert",
  "register-a-birth": "birth-reg",
  "get-a-primary-school-textbook-grant": "textbook-grant",
  "register-for-community-sports-training-programme": "sports-training",
  "apply-to-be-a-project-protege-mentor": "protege-mentor",
  "apply-to-jobstart-plus-programme": "jobstart-plus",
  "apply-for-conductor-licence": "conductor-licence",
  "post-office-redirection-individual": "mail-individual",
  "post-office-redirection-deceased": "mail-deceased",
  "post-office-redirection-business": "mail-business",
  "sell-goods-services-beach-park": "beach-park-vendor",
  "reserve-society-name": "society-name",
  "request-a-fire-service-inspection": "fire-inspection",
  "exit-survey": "exit-survey",
} as const;

export function getShortFormName(longFormName: string): string {
  return FORM_LONG_TO_SHORT[longFormName] ?? longFormName;
}

export const CATEGORY_LONG_TO_SHORT: Record<string, string> = {
  "family-birth-relationships": "family",
  "work-employment": "employment",
  "money-financial-support": "financial",
  "travel-id-citizenship": "travel",
  "business-trade": "business",
  "public-safety": "safety",
};

export function getShortCategoryName(longCategoryName: string): string {
  return CATEGORY_LONG_TO_SHORT[longCategoryName] ?? longCategoryName;
}
