import type { MaskType } from "@/lib/masks";

/** All supported form field input types. */
export type FieldType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "date"
  | "select"
  | "textarea"
  | "radio"
  | "checkbox"
  | "fieldArray"
  | "showHide"
  | "file";

/**
 * Date-specific validation rules.
 * Only applicable when the field type is `"date"`.
 */
export type DateValidationRule =
  | { type: "past" }
  | { type: "pastOrToday" }
  | { type: "future" }
  | { type: "futureOrToday" }
  | { type: "after"; date: string; description?: string }
  | { type: "before"; date: string; description?: string }
  | { type: "onOrAfter"; date: string; description?: string }
  | { type: "onOrBefore"; date: string; description?: string }
  | { type: "between"; start: string; end: string; description?: string }
  | { type: "minYear"; year: number };

/** Base validation rules shared by all field types. */
export type BaseValidationRule = {
  /** Error message when the field is required, or `false` to explicitly mark as optional */
  required?: string | false;
  /** Minimum character length constraint */
  minLength?: { value: number; message: string };
  /** Maximum character length constraint */
  maxLength?: { value: number; message: string };
  /** Regex pattern the field value must match */
  pattern?: { value: string; message: string };
  /** Minimum numeric value constraint */
  min?: { value: number; message: string };
  /** Maximum numeric value constraint */
  max?: { value: number; message: string };
  /** Exact file count constraint for file upload fields */
  numberOfFiles?: { isEqual: number; message: string };
};

/** Validation rules for date fields, extending base rules with date-specific constraints. */
export type DateFieldValidation = BaseValidationRule & {
  date?: DateValidationRule;
};

/** Validation rules for non-date fields (alias for base rules). */
export type NonDateFieldValidation = BaseValidationRule;

/** A selectable option for `select` and `radio` field types. */
export type SelectOption = {
  label: string;
  value: string;
};

/** Defines when a field or step should be conditionally visible. */
export type ConditionalRule = {
  /** The field name to watch for changes */
  field: string;
  /** The value that triggers visibility */
  value: string;
};

/** Configuration for repeatable field groups rendered as an array of items. */
export type FieldArrayConfig = {
  /** Label for each array item (e.g., "Name of the organisation") */
  itemLabel: string;
  /** Text for the "Add another" button */
  addButtonText: string;
  /** Text for the remove button (defaults to "Remove") */
  removeButtonText?: string;
  /** Minimum number of items (defaults to 1) */
  minItems?: number;
  /** Maximum number of items (no limit if not specified) */
  maxItems?: number;
  /** Fields to render for each array item (for complex field arrays) */
  fields?: NestedFormField[];
};

/** Configuration for a collapsible disclosure (details/summary) section. */
export type ShowHideConfig = {
  /** The clickable text to expand/collapse (e.g., "Use passport number instead") */
  summary: string;
  /** Optional description text shown inside the disclosure */
  description?: string;
  /** Field name to store the open/closed state (value will be "open" or "closed") */
  stateFieldName: string;
  /** Fields to render inside the disclosure when expanded */
  fields: NestedFormField[];
};

/** Shared properties common to all form field types. */
export type BaseFormField = {
  /** Unique field name used as the form data key (supports dot notation for nested values) */
  name: string;
  /** Display label shown above the field */
  label: string;
  /** Placeholder text displayed inside the input when empty */
  placeholder?: string;
  /** Help text displayed below the label */
  hint?: string;
  /** When true, hides the label on the form but still shows it on the review screen */
  hidden?: boolean;
  /** Validation rules applied to this field */
  validation: ValidationRule;
  /** Condition that must be met for this field to be visible */
  conditionalOn?: ConditionalRule;
  /** Field name of a ShowHide state field — when that state is "open", validation is skipped for this field */
  skipValidationWhenShowHideOpen?: string;
  /** Controls the rendered width of the field */
  width?: "short" | "medium" | "full";
};

/** A date input field with date-specific validation. */
export type DateFormField = BaseFormField & {
  type: "date";
  validation: DateFieldValidation;
};

/** A select dropdown or radio button group requiring predefined options. */
export type OptionFormField = BaseFormField & {
  type: "select" | "radio";
  validation: NonDateFieldValidation;
  /** The list of selectable options */
  options: SelectOption[];
};

/** A single checkbox field. */
export type CheckboxFormField = BaseFormField & {
  type: "checkbox";
  validation: NonDateFieldValidation;
};

/** A multi-line text input field. */
export type TextareaFormField = BaseFormField & {
  type: "textarea";
  validation: NonDateFieldValidation;
  /** Number of visible text rows (controls initial height) */
  rows?: number;
};

/** A repeatable group of fields rendered as a dynamic array. */
export type FieldArrayFormField = BaseFormField & {
  type: "fieldArray";
  validation: NonDateFieldValidation;
  /** Configuration for the field array behavior and nested fields */
  fieldArray: FieldArrayConfig;
};

/** A single-line text input (text, email, number, or telephone). */
export type TextFormField = BaseFormField & {
  type: "text" | "email" | "number" | "tel";
  validation: NonDateFieldValidation;
  /** Input mask to apply (e.g., "nid" for National ID format xxxxxx-xxxx) */
  mask?: MaskType;
};

/** A collapsible disclosure section containing nested fields. */
export type ShowHideFormField = BaseFormField & {
  type: "showHide";
  validation: NonDateFieldValidation;
  /** Configuration for the disclosure behavior and nested fields */
  showHide: ShowHideConfig;
};

/** A file upload field supporting single or multiple file selection. */
export type FileFormField = BaseFormField & {
  type: "file";
  validation: NonDateFieldValidation;
  /** Accepted file types (e.g., ".pdf,.docx,.png" or "image/*") */
  accept?: string;
  /** Whether multiple files can be selected */
  multiple?: boolean;
};

/**
 * Discriminated union of all form field types.
 * Discriminant: `type` property.
 *
 * Use `field.type` to narrow to a specific variant and access type-specific properties.
 */
export type FormField =
  | DateFormField
  | OptionFormField
  | CheckboxFormField
  | TextareaFormField
  | FieldArrayFormField
  | TextFormField
  | ShowHideFormField
  | FileFormField;

/** Fields allowed inside FieldArrayConfig and ShowHideConfig (no recursive containers). */
export type NestedFormField = Exclude<
  FormField,
  FieldArrayFormField | ShowHideFormField
>;

/** Validation rules — either date-specific or general. */
export type ValidationRule = NonDateFieldValidation | DateFieldValidation;

/** Contact information displayed on confirmation pages. */
export type ContactDetails = {
  title: string;
  telephoneNumber: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    country?: string;
  };
};

/**
 * Configuration for repeatable steps that can be dynamically added/removed.
 * Field names are automatically prefixed with the array index (e.g., `arrayFieldName.0.fieldName`).
 */
export type RepeatableStepConfig = {
  /** Base field name for array storage (e.g., "minorDetails") */
  arrayFieldName: string;
  /** Maximum number of repetitions allowed (defaults to 10) */
  maxItems?: number;
  /** Label for the "add another" question (defaults to "Do you need to add another?") */
  addAnotherLabel?: string;
  /**
   * When true, this step won't include the "add another" question.
   * Use this for conditional sub-steps that appear within a repeatable group
   * (e.g., guardian details that appear after each child entry when applicable).
   */
  skipAddAnother?: boolean;
  /** Field names that are shared across all repeatable instances */
  sharedFields?: string[];
};

/** A single step in a multi-step form wizard. */
export type FormStep = {
  /** Unique step identifier */
  id: string;
  /** Step title displayed in the heading and progress indicator */
  title: string;
  /** Override the title based on a field value condition */
  conditionalTitle?: ConditionalRule & { title: string };
  /** Step description displayed below the title */
  description?: string;
  /** Fields to render in this step */
  fields: FormField[];
  /** Condition that must be met for this step to be visible */
  conditionalOn?: ConditionalRule;
  /** Markdown content for confirmation page body (replaces fields) */
  bodyContent?: string;
  /** Contact details displayed on confirmation pages */
  contactDetails?: ContactDetails;
  /** Enable feedback section on confirmation page */
  enableFeedback?: boolean;
  /** Custom label for the reference number (defaults to "Your submission ID is") */
  referenceNumberLabel?: string;
  /** Whether to show the reference number on the confirmation page (defaults to true) */
  showReferenceNumber?: boolean;
  /** Configuration for repeatable steps — when set, this step can be repeated */
  repeatable?: RepeatableStepConfig;
};

/** API response structure for form submissions. */
export type ApiResponse = {
  success: boolean;
  data?: {
    submissionId: string;
    formId: string;
    status: string;
    processedAt: string;
    paymentRequired?: boolean;
    paymentUrl?: string;
    paymentToken?: string;
    paymentId?: string;
    referenceNumber?: string;
    amount?: number;
    description?: string;
    numberOfCopies?: number;
  };
  errors?: { field: string; message: string; code: string }[];
  message?: string;
};

export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/** Parsed date components from a date string. */
export type DateObject = {
  day: string;
  month: string;
  year: string;
};
