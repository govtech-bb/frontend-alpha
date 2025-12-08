export type FieldType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "date"
  | "select"
  | "textarea"
  | "radio"
  | "fieldArray";

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

type DateFieldValidation = BaseValidationRule & {
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
  type: Exclude<FieldType, "fieldArray">;
  placeholder?: string;
  hint?: string;
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

type BaseFormField = {
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  conditionalOn?: ConditionalRule;
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

export type FormField =
  | DateFormField
  | OptionFormField
  | TextareaFormField
  | FieldArrayFormField
  | TextFormField;

export type ValidationRule = DateFieldValidation;

export type FormStep = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
};
