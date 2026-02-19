import { getNestedValue, isEmpty } from "./utils";

export const TRACKED_EVENTS = {
  FORM_START_EVENT: "form-start",
  FORM_STEP_BACK_EVENT: "form-step-back",
  FORM_STEP_EDIT_EVENT: "form-step-edit",
  FORM_STEP_COMPLETE_EVENT: "form-step-complete",
  FORM_ADD_ANOTHER_EVENT: "form-add-another",
  FORM_REMOVE_ITEM_EVENT: "form-remove-item",
  FORM_SUBMIT_EVENT: "form-submit",
  FORM_SUBMIT_ERROR_EVENT: "form-submit-error",
  FORM_VALIDATION_ERROR_EVENT: "form-validation-error",
} as const;

export const FORM_NAMES = {
  SIMPLE_FEEDBACK_FORM: "simple-feedback-form",
} as const;

export const SHORT_NAME_MAP_TYPE = {
  FORM: "FORM",
  CATEGORY: "CATEGORY",
} as const;

export type ShortNameMapType =
  (typeof SHORT_NAME_MAP_TYPE)[keyof typeof SHORT_NAME_MAP_TYPE];

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
};

export const CATEGORY_LONG_TO_SHORT: Record<string, string> = {
  "family-birth-relationships": "family",
  "work-employment": "employment",
  "money-financial-support": "financial",
  "travel-id-citizenship": "travel",
  "business-trade": "business",
  "public-safety": "safety",
};

export const SHORT_NAME_MAPS: Record<
  ShortNameMapType,
  Record<string, string>
> = {
  [SHORT_NAME_MAP_TYPE.FORM]: FORM_LONG_TO_SHORT,
  [SHORT_NAME_MAP_TYPE.CATEGORY]: CATEGORY_LONG_TO_SHORT,
};

export function getShortName(mapType: ShortNameMapType, key: string): string {
  const map = SHORT_NAME_MAPS[mapType];
  return map[key] ?? key;
}

export function getFormBaseContext(
  form: string,
  category: string
): { form: string; category: string } {
  return {
    form: getShortName(SHORT_NAME_MAP_TYPE.FORM, form),
    category: getShortName(SHORT_NAME_MAP_TYPE.CATEGORY, category),
  };
}

export function getStepForTracking(form: string, stepId: string): string {
  const formShort = getShortName(SHORT_NAME_MAP_TYPE.FORM, form);
  return `${formShort}-${stepId}`;
}

const MESSAGE_CATEGORIES: Record<
  "required" | "minLength" | "pattern",
  string[]
> = {
  required: ["required"],
  minLength: ["at least"],
  pattern: ["contain only", "valid"],
};

function categorizeByMessage(
  message?: string
): "required" | "minLength" | "pattern" | null {
  if (!message) return null;

  const lower = message.toLowerCase();

  for (const [category, keywords] of Object.entries(MESSAGE_CATEGORIES)) {
    if (keywords.some((word) => lower.includes(word))) {
      return category as "required" | "minLength" | "pattern";
    }
  }

  return null;
}

export const toAnalyticsErrorType = (
  rawType: string,
  fieldName: string,
  formValues: Record<string, any>,
  message?: string
): "required" | "minLength" | "pattern" | "other" => {
  const fromMessage = categorizeByMessage(message);
  if (fromMessage) return fromMessage;

  switch (rawType) {
    case "too_small": {
      const value = getNestedValue(formValues, fieldName);
      return isEmpty(value) ? "required" : "minLength";
    }
    case "invalid_format":
    case "invalid_string":
      return "pattern";
    default:
      return "other";
  }
};
