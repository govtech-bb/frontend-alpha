import { z } from "zod";
import { isValidBirthDate } from "@/lib/dates";
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
    // For all conditional fields, accept string or undefined
    // Number validation is handled in superRefine
    return z.union([z.string(), z.number(), z.undefined()]);
  }

  // Handle date fields (YYYY-MM-DD format)
  if (field.type === "date") {
    schema = z.string().min(1, validation.required || "Date is required");
    // Use isValidBirthDate for proper validation (checks format, range, and not future)
    schema = (schema as z.ZodString).refine(
      (val) => {
        if (!val) return false;
        // Ensure val is a string before validation
        if (typeof val !== "string") return false;
        return isValidBirthDate(val);
      },
      { message: "Enter a valid date of birth" }
    );
    return schema;
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

// Generate combined schema for the entire form dynamically (supports nested field names)
export function generateFormSchema(formSteps: FormStep[]) {
  const schemaShape: Record<string, unknown> = {};

  for (const step of formSteps) {
    for (const field of step.fields) {
      setNestedValue(schemaShape, field.name, createFieldSchema(field));
    }
  }

  const baseSchema = objectToZodSchema(schemaShape);

  const conditionalFields = getConditionalFields(formSteps);

  // Add conditional field validation via superRefine
  return baseSchema.superRefine((data, ctx) => {
    for (const field of conditionalFields) {
      if (!field.conditionalOn) continue;

      // Use nested value access for both parent and field values
      const parentValue = getNestedValue(
        data as Record<string, unknown>,
        field.conditionalOn.field
      );
      const fieldValue = getNestedValue(
        data as Record<string, unknown>,
        field.name
      );
      const isVisible = parentValue === field.conditionalOn.value;

      // Only validate if the field is visible
      if (isVisible && field.validation.required) {
        let isEmpty = false;

        if (field.type === "number") {
          // For number fields: empty string, undefined, null, or NaN are empty
          isEmpty =
            fieldValue === undefined ||
            fieldValue === null ||
            fieldValue === "" ||
            (typeof fieldValue === "number" && Number.isNaN(fieldValue)) ||
            (typeof fieldValue === "string" &&
              (fieldValue as string).trim() === "");
        } else {
          // For other fields: undefined, null, or empty string
          isEmpty =
            fieldValue === undefined ||
            fieldValue === null ||
            fieldValue === "" ||
            (typeof fieldValue === "string" &&
              (fieldValue as string).trim() === "");
        }

        if (isEmpty) {
          // Split path for nested field names
          const pathParts = field.name.split(".");
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: field.validation.required,
            path: pathParts,
          });
        }
      }
    }
  });
}

// Type helper for form data
export type FormData = Record<string, unknown>;
