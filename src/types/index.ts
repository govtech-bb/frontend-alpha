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
  | "showHide";

// Date-specific validation rules (only applicable when type === "date")
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

// Base validation rules (all fields can use these)
type BaseValidationRule = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: string; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

export type DateFieldValidation = BaseValidationRule & {
  date?: DateValidationRule;
};

export type NonDateFieldValidation = BaseValidationRule;

export type SelectOption = {
  label: string;
  value: string;
};

export type ConditionalRule = {
  field: string; // The field name to watch
  value: string; // The value that triggers this field to show
};

export type NestedFormField = {
  name: string;
  label: string;
  type: Exclude<FieldType, "fieldArray" | "showHide">;
  placeholder?: string;
  hint?: string;
  hidden?: boolean; // Hide label on form but show on review screen
  validation: NonDateFieldValidation | DateFieldValidation;
  options?: SelectOption[];
  rows?: number;
};

export type FieldArrayConfig = {
  itemLabel: string; // Label for each item (e.g., "Name of the organisation")
  addButtonText: string; // Text for the "Add another" button
  removeButtonText?: string; // Text for remove button (defaults to "Remove")
  minItems?: number; // Minimum number of items (defaults to 1)
  /** Fields to render for each array item (for complex field arrays) */
  fields?: NestedFormField[];
};

export type ShowHideConfig = {
  summary: string; // The clickable text to expand/collapse (e.g., "Use passport number instead")
  description?: string; // Optional description text shown inside the disclosure
  /** Field name to store the open/closed state (value will be "open" or "closed") */
  stateFieldName: string;
  /** Fields to render inside the ShowHide disclosure */
  fields: NestedFormField[];
};

export type BaseFormField = {
  name: string;
  label: string;
  placeholder?: string;
  hint?: string; // Description text displayed below the label
  hidden?: boolean; // Hide label on form but show on review screen
  validation: ValidationRule;
  options?: SelectOption[]; // For select and radio fields
  rows?: number; // For textarea
  conditionalOn?: ConditionalRule; // For conditional fields
  fieldArray?: FieldArrayConfig; // For fieldArray type
  showHide?: ShowHideConfig; // For showHide type (collapsible disclosure)
  /** Field name of ShowHide state - when this state is "open", validation is skipped for this field */
  skipValidationWhenShowHideOpen?: string;
};

type DateFormField = BaseFormField & {
  type: "date";
  validation: DateFieldValidation;
};

type OptionFormField = BaseFormField & {
  type: "select" | "radio";
  validation: NonDateFieldValidation;
  options: SelectOption[];
};

type CheckboxFormField = BaseFormField & {
  type: "checkbox";
  validation: NonDateFieldValidation;
};

type TextareaFormField = BaseFormField & {
  type: "textarea";
  validation: NonDateFieldValidation;
  rows?: number;
};

type FieldArrayFormField = BaseFormField & {
  type: "fieldArray";
  validation: NonDateFieldValidation;
  fieldArray: FieldArrayConfig;
};

type TextFormField = BaseFormField & {
  type: "text" | "email" | "number" | "tel";
  validation: NonDateFieldValidation;
};

type ShowHideFormField = BaseFormField & {
  type: "showHide";
  validation: NonDateFieldValidation;
  showHide: ShowHideConfig;
};

export type FormField =
  | DateFormField
  | OptionFormField
  | CheckboxFormField
  | TextareaFormField
  | FieldArrayFormField
  | TextFormField
  | ShowHideFormField;

export type ValidationRule = NonDateFieldValidation | DateFieldValidation;

export type ConfirmationStepItem = {
  title: string;
  content: string;
  items: string[];
};

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

export type FormStep = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  conditionalOn?: ConditionalRule; // For conditional steps
  steps?: ConfirmationStepItem[]; // For confirmation pages
  payment?: {
    amount: number;
    service: string;
  };
  contactDetails?: ContactDetails; // For confirmation pages
};

export type ApiResponse = {
  success: boolean;
  data?: {
    submissionId: string;
    formId: string;
    status: string;
    processedAt: string;
  };
  errors?: { field: string; message: string; code: string }[];
  message?: string;
};

export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type DateObject = {
  day: string;
  month: string;
  year: string;
};
