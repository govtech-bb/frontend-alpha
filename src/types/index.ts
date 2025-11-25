// formConfig.ts
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

export type ValidationRule = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: string; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

export type SelectOption = {
  label: string;
  value: string;
};

export type ConditionalRule = {
  field: string; // The field name to watch
  value: string; // The value that triggers this field to show
};

export type FieldArrayConfig = {
  itemLabel: string; // Label for each item (e.g., "Name of the organisation")
  addButtonText: string; // Text for the "Add another" button
  removeButtonText?: string; // Text for remove button (defaults to "Remove")
  minItems?: number; // Minimum number of items (defaults to 1)
};

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation: ValidationRule;
  options?: SelectOption[]; // For select and radio fields
  rows?: number; // For textarea
  conditionalOn?: ConditionalRule; // For conditional fields
  fieldArray?: FieldArrayConfig; // For fieldArray type
};

export type FormStep = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
};
