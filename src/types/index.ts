// formConfig.ts
export type FieldType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "date"
  | "select"
  | "textarea"
  | "radio";

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

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation: ValidationRule;
  options?: SelectOption[]; // For select and radio fields
  rows?: number; // For textarea
};

export type FormStep = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
};
