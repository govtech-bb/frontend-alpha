import { z } from "zod";
import {
  createDateSchema,
  dateValidation,
} from "@/lib/validation/date-validation";
import type { FormField, FormStep } from "@/types";

/**
 * Sets a nested value in an object using dot notation path
 * Creates intermediate objects as needed
 * @example setNestedValue({}, "guardian.firstName", schema) -> { guardian: { firstName: schema } }
 */
function setNestedValue<T>(
  obj: Record<string, unknown>,
  path: string,
  value: T
): void {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys.at(-1);
  if (lastKey) {
    current[lastKey] = value;
  }
}

/**
 * Gets a nested value from an object using dot notation path
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

/**
 * Converts a nested plain object of schemas into a nested Zod object schema
 */
function objectToZodSchema(
  obj: Record<string, unknown>
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof z.ZodType) {
      shape[key] = value;
    } else if (typeof value === "object" && value !== null) {
      shape[key] = objectToZodSchema(value as Record<string, unknown>);
    }
  }

  return z.object(shape);
}

function createFieldSchema(field: FormField): z.ZodTypeAny {
  let schema: z.ZodTypeAny = z.string();

  const validation = field.validation;

  // Handle showHide fields - the state field needs to be optional string
  if (field.type === "showHide") {
    return z.string().optional();
  }

  // Handle fields with conditional required validation
  // These are made optional at schema level and validated in superRefine
  if (validation.requiredUnless || validation.requiredWhen) {
    return z.string().optional();
  }

  // Handle field arrays
  if (field.type === "fieldArray") {
    let itemSchema: z.ZodTypeAny = z.string();

    if (validation.required) {
      itemSchema = z.string().min(1, validation.required);
    }

    if (validation.minLength) {
      itemSchema = (itemSchema as z.ZodString).min(
        validation.minLength.value,
        validation.minLength.message
      );
    }

    if (validation.maxLength) {
      itemSchema = (itemSchema as z.ZodString).max(
        validation.maxLength.value,
        validation.maxLength.message
      );
    }

    if (validation.pattern) {
      itemSchema = (itemSchema as z.ZodString).regex(
        new RegExp(validation.pattern.value),
        validation.pattern.message
      );
    }

    // Create array schema with object wrapper for each item
    const arraySchema = z.array(z.object({ value: itemSchema }));

    // If conditional, make it optional (allows undefined or array)
    if (field.conditionalOn) {
      return arraySchema.optional();
    }

    return arraySchema;
  }

  // Handle conditional fields - make them optional at schema level
  // Conditional validation is handled by superRefine in generateFormSchema
  if (field.conditionalOn) {
    // Date fields need the DateInputValue object schema
    if (field.type === "date") {
      return createDateSchema(field.label.toLowerCase()).optional();
    }
    // For all other conditional fields, accept string, number or undefined
    // Number validation is handled in superRefine
    return z.union([z.string(), z.number(), z.undefined()]);
  }

  // Handle date fields (DateInputValue object: { day, month, year })
  if (field.type === "date") {
    const label = field.label;
    const dateFieldValidation = field.validation;
    let dateSchema = createDateSchema(label);

    // Apply required validation if specified
    if (dateFieldValidation.required) {
      dateSchema = dateValidation.required(dateSchema, label);
    }

    // Apply date-specific validation based on config
    if (dateFieldValidation.date) {
      const rule = dateFieldValidation.date;
      switch (rule.type) {
        case "past":
          dateSchema = dateValidation.past(dateSchema, label);
          break;
        case "pastOrToday":
          dateSchema = dateValidation.pastOrToday(dateSchema, label);
          break;
        case "future":
          dateSchema = dateValidation.future(dateSchema, label);
          break;
        case "futureOrToday":
          dateSchema = dateValidation.futureOrToday(dateSchema, label);
          break;
        case "after":
          dateSchema = dateValidation.after(
            dateSchema,
            new Date(rule.date),
            label,
            rule.description
          );
          break;
        case "before":
          dateSchema = dateValidation.before(
            dateSchema,
            new Date(rule.date),
            label,
            rule.description
          );
          break;
        case "onOrAfter":
          dateSchema = dateValidation.onOrAfter(
            dateSchema,
            new Date(rule.date),
            label,
            rule.description
          );
          break;
        case "onOrBefore":
          dateSchema = dateValidation.onOrBefore(
            dateSchema,
            new Date(rule.date),
            label,
            rule.description
          );
          break;
        case "between":
          dateSchema = dateValidation.between(
            dateSchema,
            { start: new Date(rule.start), end: new Date(rule.end) },
            label,
            rule.description
          );
          break;
        case "minYear":
          dateSchema = dateValidation.minYear(dateSchema, rule.year, label);
          break;
        default: {
          const _exhaustiveCheck: never = rule;
          throw new Error(`Unknown date validation type: ${_exhaustiveCheck}`);
        }
      }
    }

    return dateSchema;
  }

  // Handle radio buttons with boolean values
  if (
    field.type === "radio" &&
    (field.name === "disciplineExperience" ||
      field.name === "belongsToOrganizations")
  ) {
    // schema = z.enum(["true", "false"]); //TODO: Fix validation message
    schema = z.enum(["true", "false"], {
      message: validation.required || "This field is required",
    });
    return schema;
  }

  // Handle other radio buttons
  if (field.type === "radio" && field.options) {
    const values = field.options.map((opt) => opt.value) as [
      string,
      ...string[],
    ];
    // schema = z.enum(values); //TODO: Fix validation message
    schema = z.enum(values, {
      error: () => ({
        message: validation.required || "This field is required",
      }),
    });
    return schema;
  }

  // Handle optional fields (no validation rules)
  if (!validation.required && Object.keys(validation).length === 0) {
    return z.string().optional();
  }

  // Handle email type first to avoid pattern overwriting
  if (field.type === "email") {
    // Chain validations: first check required (min length), then email format
    schema = z.string();
    if (validation.required) {
      schema = (schema as z.ZodString).min(1, validation.required);
    }
    schema = (schema as z.ZodString).email("Email address is invalid");
    return schema;
  }

  if (validation.required) {
    schema = z.string().min(1, validation.required);
  }

  if (validation.minLength) {
    schema = (schema as z.ZodString).min(
      validation.minLength.value,
      validation.minLength.message
    );
  }

  if (validation.maxLength) {
    schema = (schema as z.ZodString).max(
      validation.maxLength.value,
      validation.maxLength.message
    );
  }

  if (validation.pattern) {
    schema = (schema as z.ZodString).regex(
      new RegExp(validation.pattern.value),
      validation.pattern.message
    );
  }

  if (field.type === "number") {
    schema = z.coerce.number();
    if (validation.required) {
      schema = (schema as z.ZodNumber).min(0, validation.required);
    }
    if (validation.min) {
      schema = (schema as z.ZodNumber).min(
        validation.min.value,
        validation.min.message
      );
    }
    if (validation.max) {
      schema = (schema as z.ZodNumber).max(
        validation.max.value,
        validation.max.message
      );
    }
  }

  return schema;
}

// Generate schemas for each step dynamically (supports nested field names)
export function generateStepSchemas(formSteps: FormStep[]) {
  return formSteps.map((step) => {
    const schemaShape: Record<string, unknown> = {};

    for (const field of step.fields) {
      setNestedValue(schemaShape, field.name, createFieldSchema(field));
    }

    return objectToZodSchema(schemaShape);
  });
}

// Collect all conditional fields from form steps for validation
function getConditionalFields(formSteps: FormStep[]): FormField[] {
  return formSteps.flatMap((step) =>
    step.fields.filter((field) => field.conditionalOn)
  );
}

// Collect all fields with conditional required validation (requiredUnless/requiredWhen)
function getConditionalRequiredFields(formSteps: FormStep[]): FormField[] {
  const fields: FormField[] = [];

  for (const step of formSteps) {
    for (const field of step.fields) {
      if (field.validation.requiredUnless || field.validation.requiredWhen) {
        fields.push(field);
      }
      // Also check ShowHide child fields
      if (field.type === "showHide" && field.showHide?.fields) {
        for (const childField of field.showHide.fields) {
          if (
            childField.validation.requiredUnless ||
            childField.validation.requiredWhen
          ) {
            fields.push(childField as FormField);
          }
        }
      }
    }
  }

  return fields;
}

// Generate combined schema for the entire form dynamically (supports nested field names)
export function generateFormSchema(formSteps: FormStep[]) {
  const schemaShape: Record<string, unknown> = {};

  for (const step of formSteps) {
    for (const field of step.fields) {
      setNestedValue(schemaShape, field.name, createFieldSchema(field));

      // Also add schemas for ShowHide child fields
      if (field.type === "showHide" && field.showHide) {
        // Add the state field
        setNestedValue(
          schemaShape,
          field.showHide.stateFieldName,
          z.string().optional()
        );

        // Add child field schemas
        for (const childField of field.showHide.fields) {
          setNestedValue(
            schemaShape,
            childField.name,
            createFieldSchema(childField as FormField)
          );
        }
      }
    }
  }

  const baseSchema = objectToZodSchema(schemaShape);

  const conditionalFields = getConditionalFields(formSteps);
  const conditionalRequiredFields = getConditionalRequiredFields(formSteps);

  // Add conditional field validation via superRefine
  return baseSchema.superRefine((data, ctx) => {
    // Helper to check if a field value is empty
    const isFieldEmpty = (fieldValue: unknown, fieldType: string): boolean => {
      if (fieldType === "number") {
        return (
          fieldValue === undefined ||
          fieldValue === null ||
          fieldValue === "" ||
          (typeof fieldValue === "number" && Number.isNaN(fieldValue)) ||
          (typeof fieldValue === "string" &&
            (fieldValue as string).trim() === "")
        );
      }
      return (
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === "" ||
        (typeof fieldValue === "string" && (fieldValue as string).trim() === "")
      );
    };

    // Validate conditional fields (conditionalOn)
    for (const field of conditionalFields) {
      if (!field.conditionalOn) continue;

      const parentValue = getNestedValue(
        data as Record<string, unknown>,
        field.conditionalOn.field
      );
      const fieldValue = getNestedValue(
        data as Record<string, unknown>,
        field.name
      );
      const isVisible = parentValue === field.conditionalOn.value;

      if (
        isVisible &&
        field.validation.required &&
        isFieldEmpty(fieldValue, field.type)
      ) {
        const pathParts = field.name.split(".");
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: field.validation.required,
          path: pathParts,
        });
      }
    }

    // Validate requiredUnless fields
    for (const field of conditionalRequiredFields) {
      const fieldValue = getNestedValue(
        data as Record<string, unknown>,
        field.name
      );

      // Handle requiredUnless - field is required UNLESS another field has a specific value
      if (field.validation.requiredUnless) {
        const conditionValue = getNestedValue(
          data as Record<string, unknown>,
          field.validation.requiredUnless.field
        );
        const isRequired =
          conditionValue !== field.validation.requiredUnless.value;

        if (isRequired && isFieldEmpty(fieldValue, field.type)) {
          const pathParts = field.name.split(".");
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: field.validation.requiredUnless.message,
            path: pathParts,
          });
        }
      }

      // Handle requiredWhen - field is required WHEN another field has a specific value
      if (field.validation.requiredWhen) {
        const conditionValue = getNestedValue(
          data as Record<string, unknown>,
          field.validation.requiredWhen.field
        );
        const isRequired =
          conditionValue === field.validation.requiredWhen.value;

        if (isRequired && isFieldEmpty(fieldValue, field.type)) {
          const pathParts = field.name.split(".");
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: field.validation.requiredWhen.message,
            path: pathParts,
          });
        }
      }
    }
  });
}

// Type helper for form data
export type FormData = Record<string, unknown>;
