import { z } from "zod";
import {
  createDateSchema,
  dateValidation,
} from "@/lib/validation/date-validation";
import type {
  DateFieldValidation,
  FormField,
  FormStep,
  NestedFormField,
  NonDateFieldValidation,
} from "@/types";

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

function createFieldSchema(field: FormField | NestedFormField): z.ZodTypeAny {
  let schema: z.ZodTypeAny = z.string();

  const validation = field.validation as NonDateFieldValidation &
    DateFieldValidation;

  // Handle showHide fields - the state field needs to be optional string
  if (field.type === "showHide") {
    return z.string().optional();
  }

  // Handle field arrays
  if (field.type === "fieldArray" && "fieldArray" in field) {
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
    if ("conditionalOn" in field && field.conditionalOn) {
      return arraySchema.optional();
    }

    return arraySchema;
  }

  // Handle conditional fields - make them optional at schema level
  // Conditional validation is handled by superRefine in generateFormSchema
  if ("conditionalOn" in field && field.conditionalOn) {
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
    if ("date" in dateFieldValidation && dateFieldValidation.date) {
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
          const _exhaustiveCheck: never = rule as never;
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

  // Handle checkboxes (values are "yes" or "no")
  if (field.type === "checkbox") {
    schema = z.string();
    if (validation.required) {
      // When required, checkbox must be "yes"
      schema = z.string().refine((val) => val === "yes", {
        message: validation.required || "This field is required",
      });
    } else {
      // Optional checkbox accepts "yes" or "no"
      schema = z.enum(["yes", "no"]).optional();
    }
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
  return formSteps
    .filter((step) => step.fields && step.fields.length > 0)
    .flatMap((step) => step.fields.filter((field) => field.conditionalOn));
}

// Generate combined schema for the entire form dynamically (supports nested field names)
export function generateFormSchema(formSteps: FormStep[]) {
  const schemaShape: Record<string, unknown> = {};

  // Filter out review/confirmation steps that have no fields
  const stepsWithFields = formSteps.filter(
    (step) => step.fields && step.fields.length > 0
  );

  for (const step of stepsWithFields) {
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

        // Add child field schemas as optional - they'll be validated conditionally via superRefine
        for (const childField of field.showHide.fields) {
          // Make child fields optional at schema level
          setNestedValue(schemaShape, childField.name, z.string().optional());
        }
      }
    }
  }

  const baseSchema = objectToZodSchema(schemaShape);

  const conditionalFields = getConditionalFields(formSteps);

  // Add conditional field validation via superRefine
  return baseSchema.superRefine((data, ctx) => {
    // Helper to check if a field value is empty
    const isFieldEmpty = (fieldValue: unknown, fieldType: string): boolean => {
      if (fieldType === "checkbox") {
        // For checkboxes, empty means not "yes"
        return fieldValue !== "yes";
      }
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

    // Validate ShowHide child fields when ShowHide is open
    for (const step of formSteps) {
      for (const field of step.fields) {
        if (field.type === "showHide" && field.showHide) {
          const showHideState = getNestedValue(
            data as Record<string, unknown>,
            field.showHide.stateFieldName
          );

          // Only validate child fields when ShowHide is open
          if (showHideState === "open") {
            for (const childField of field.showHide.fields) {
              const childValue = getNestedValue(
                data as Record<string, unknown>,
                childField.name
              );

              // Validate required
              if (
                childField.validation.required &&
                isFieldEmpty(childValue, childField.type)
              ) {
                const pathParts = childField.name.split(".");
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: childField.validation.required,
                  path: pathParts,
                });
              }

              // Validate minLength
              if (
                childField.validation.minLength &&
                !isFieldEmpty(childValue, childField.type) &&
                typeof childValue === "string" &&
                childValue.length < childField.validation.minLength.value
              ) {
                const pathParts = childField.name.split(".");
                ctx.addIssue({
                  code: z.ZodIssueCode.too_small,
                  minimum: childField.validation.minLength.value,
                  type: "string",
                  inclusive: true,
                  origin: "string",
                  message: childField.validation.minLength.message,
                  path: pathParts,
                });
              }

              // Validate pattern
              if (
                childField.validation.pattern &&
                !isFieldEmpty(childValue, childField.type) &&
                typeof childValue === "string"
              ) {
                const regex = new RegExp(childField.validation.pattern.value);
                if (!regex.test(childValue)) {
                  const pathParts = childField.name.split(".");
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: childField.validation.pattern.message,
                    path: pathParts,
                  });
                }
              }
            }
          }
        }
      }
    }
  });
}

// Type helper for form data
export type FormData = Record<string, unknown>;
