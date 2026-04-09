import { z } from "zod";
import {
  fieldNameToZodPath,
  getNestedValue,
  resolveGteSiblingFieldName,
  setNestedValue,
} from "@/lib/utils";
import {
  createDateSchema,
  dateValidation,
} from "@/lib/validation/date-validation";
import type {
  BaseValidationRule,
  DateFieldValidation,
  FormField,
  FormStep,
  NonDateFieldValidation,
} from "@/types";

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

  const validation = field.validation as BaseValidationRule;

  // Handle showHide fields - the state field needs to be optional string
  if (field.type === "showHide") {
    return z.string().optional();
  }

  // Handle field arrays
  if (field.type === "fieldArray" && "fieldArray" in field) {
    const nestedFields = field.fieldArray?.fields;
    const minItems = field.fieldArray?.minItems ?? 1;
    const maxItems = field.fieldArray?.maxItems;

    // Complex field array with nested fields
    if (nestedFields && nestedFields.length > 0) {
      // Build schema for each nested field
      const nestedShape: Record<string, z.ZodTypeAny> = {};
      for (const nestedField of nestedFields) {
        let fieldSchema: z.ZodTypeAny = z.string();
        const nestedValidation =
          nestedField.validation as NonDateFieldValidation;

        if (nestedValidation.required) {
          const requiredMsg =
            typeof nestedValidation.required === "string"
              ? nestedValidation.required
              : `${nestedField.label} is required`;
          fieldSchema = z.string().min(1, requiredMsg);
        }

        if (nestedValidation.minLength) {
          fieldSchema = (fieldSchema as z.ZodString).min(
            nestedValidation.minLength.value,
            nestedValidation.minLength.message
          );
        }

        if (nestedValidation.maxLength) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            nestedValidation.maxLength.value,
            nestedValidation.maxLength.message
          );
        }

        nestedShape[nestedField.name] = fieldSchema;
      }

      let arraySchema = z.array(z.object(nestedShape));

      // Apply minimum items validation
      if (validation.required && minItems > 0) {
        arraySchema = arraySchema.min(minItems, validation.required);
      }

      // Apply maximum items validation
      if (maxItems !== undefined) {
        const itemLabel = field.fieldArray?.itemLabel || "items";
        arraySchema = arraySchema.max(
          maxItems,
          `You can add a maximum of ${maxItems} ${itemLabel.toLowerCase()}${maxItems === 1 ? "" : "s"}`
        );
      }

      // If conditional, make it optional
      if ("conditionalOn" in field && field.conditionalOn) {
        return arraySchema.optional();
      }

      return arraySchema;
    }

    // Simple field array with single value per item
    let itemSchema: z.ZodTypeAny = z.string();

    if (validation.required) {
      // Use itemLabel for individual item validation, not the array-level message
      const itemLabel = field.fieldArray?.itemLabel || "This field";
      const itemRequiredMessage = `${itemLabel} is required`;
      itemSchema = z.string().min(1, itemRequiredMessage);
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
    let arraySchema = z.array(z.object({ value: itemSchema }));

    // Apply minimum items validation to the array itself
    if (validation.required) {
      if (minItems > 0) {
        arraySchema = arraySchema.min(minItems, validation.required);
      }

      // Additional check to ensure at least minItems have non-empty values
      arraySchema = arraySchema.refine(
        (items) => {
          const nonEmptyItems = items.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              "value" in item &&
              item.value !== undefined &&
              item.value !== null &&
              String(item.value).trim() !== ""
          );
          return nonEmptyItems.length >= minItems;
        },
        { message: validation.required }
      );
    }

    // Apply maximum items validation
    if (maxItems !== undefined) {
      const itemLabel = field.fieldArray?.itemLabel || "items";
      arraySchema = arraySchema.max(
        maxItems,
        `You can add a maximum of ${maxItems} ${itemLabel.toLowerCase()}${maxItems === 1 ? "" : "s"}`
      );
    }

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

    // Required radios must select one of the allowed values
    if (validation.required) {
      schema = z.enum(values, {
        error: () => ({
          message: validation.required || "This field is required",
        }),
      });
      return schema;
    }

    // Optional radios: accept undefined, empty string, or a valid option
    return z.union([z.enum(values), z.literal("")]).optional();
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

  // Handle file uploads (stores File[] array, but we validate based on count)
  if (field.type === "file") {
    // File fields store File[] objects which can't be serialized to JSON.
    // We validate them using item-count rules (required/minItems/maxItems/numberOfFiles).
    const hasCountValidation =
      validation.required ||
      (validation as NonDateFieldValidation).numberOfFiles;

    // No validation rules: allow anything / undefined
    if (!hasCountValidation) {
      return z.any().optional();
    }

    const numberOfFiles = (validation as NonDateFieldValidation).numberOfFiles;

    const getFileCount = (val: unknown): number => {
      if (Array.isArray(val)) {
        return val.length;
      }
      if (typeof val === "string") {
        // Historical behaviour: any non-empty string was treated as "has a file"
        return val.length > 0 ? 1 : 0;
      }
      return 0;
    };

    return z.any().superRefine((val, ctx) => {
      const count = getFileCount(val);

      // Required: at least one file
      if (validation.required && count === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: validation.required || "Please upload a file",
        });
        return;
      }

      // Exact count of items (e.g. exactly 2 passport photos)
      if (
        numberOfFiles &&
        numberOfFiles.isEqual !== undefined &&
        count !== numberOfFiles.isEqual &&
        count !== 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: numberOfFiles.message,
        });
        return;
      }
    });
  }

  // Handle optional fields (explicitly marked as required: false or no validation rules)
  // Only return early if there's no pattern validation to apply
  if (
    (validation.required === false ||
      (!validation.required && Object.keys(validation).length === 0)) &&
    !validation.pattern
  ) {
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
    if (validation.required) {
      schema = (schema as z.ZodString).regex(
        new RegExp(validation.pattern.value),
        validation.pattern.message
      );
    } else {
      // For optional fields with pattern: modify regex to accept empty string OR the pattern
      // Remove existing anchors and add our own to allow empty string
      const originalPattern = validation.pattern.value;
      const patternWithoutAnchors = originalPattern.replace(/^\^|\$$/g, "");
      const optionalPattern = `^(${patternWithoutAnchors})?$`;
      schema = z
        .string()
        .regex(new RegExp(optionalPattern), validation.pattern.message)
        .optional();
    }
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
          // Make child fields optional at schema level, respecting field type
          if (childField.type === "number") {
            setNestedValue(
              schemaShape,
              childField.name,
              z.coerce.number().optional()
            );
          } else {
            setNestedValue(schemaShape, childField.name, z.string().optional());
          }
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
      if (fieldType === "fieldArray") {
        // For field arrays, empty means not an array, length 0, or all items are effectively empty
        if (!Array.isArray(fieldValue) || fieldValue.length === 0) {
          return true;
        }
        // If it's a simple field array (items have .value property), check if first item is empty
        const firstItem = fieldValue[0];
        if (
          firstItem &&
          typeof firstItem === "object" &&
          "value" in firstItem &&
          (firstItem.value === undefined ||
            firstItem.value === null ||
            String(firstItem.value).trim() === "")
        ) {
          return true;
        }
        return false;
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

    // Validate conditional fields within field arrays
    for (const step of formSteps) {
      for (const field of step.fields) {
        if (field.type === "fieldArray" && field.fieldArray?.fields) {
          const arrayValue = getNestedValue(
            data as Record<string, unknown>,
            field.name
          );

          if (Array.isArray(arrayValue)) {
            // Iterate through each array item
            for (let index = 0; index < arrayValue.length; index++) {
              const item = arrayValue[index] as Record<string, unknown>;

              // Check each nested field for conditional logic
              for (const nestedField of field.fieldArray.fields) {
                if (!nestedField.conditionalOn) continue;

                const parentValue = item[nestedField.conditionalOn.field];
                const fieldValue = item[nestedField.name];
                const isVisible =
                  parentValue === nestedField.conditionalOn.value;

                if (
                  isVisible &&
                  nestedField.validation.required &&
                  isFieldEmpty(fieldValue, nestedField.type)
                ) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: nestedField.validation.required,
                    path: [field.name, index, nestedField.name],
                  });
                }
              }
            }
          }
        }
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

    const applyGteFromSchema = (
      endFieldName: string,
      validation: NonDateFieldValidation | DateFieldValidation
    ) => {
      const v = validation as NonDateFieldValidation;
      const op = v.operator;
      if (
        !op ||
        op.condition !== "gte" ||
        typeof op.field !== "string" ||
        typeof op.message !== "string"
      ) {
        return;
      }

      const startName = resolveGteSiblingFieldName(endFieldName, op.field);
      const startVal = getNestedValue(
        data as Record<string, unknown>,
        startName
      );
      const endVal = getNestedValue(
        data as Record<string, unknown>,
        endFieldName
      );

      if (typeof startVal !== "string" || typeof endVal !== "string") {
        return;
      }
      if (!(startVal.trim() && endVal.trim())) {
        return;
      }

      const start = Number.parseInt(startVal, 10);
      const end = Number.parseInt(endVal, 10);
      if (!(Number.isNaN(start) || Number.isNaN(end)) && end < start) {
        ctx.addIssue({
          code: "custom",
          message: op.message,
          path: fieldNameToZodPath(endFieldName),
        });
      }
    };

    for (const step of formSteps) {
      for (const field of step.fields) {
        if (field.type === "fieldArray" && field.fieldArray?.fields) {
          const arrayValue = getNestedValue(
            data as Record<string, unknown>,
            field.name
          );
          if (Array.isArray(arrayValue)) {
            for (let index = 0; index < arrayValue.length; index++) {
              for (const nestedField of field.fieldArray.fields) {
                applyGteFromSchema(
                  `${field.name}.${index}.${nestedField.name}`,
                  nestedField.validation
                );
              }
            }
          }
        } else if (field.type === "showHide" && field.showHide) {
          const showHideState = getNestedValue(
            data as Record<string, unknown>,
            field.showHide.stateFieldName
          );
          if (showHideState === "open") {
            for (const childField of field.showHide.fields) {
              applyGteFromSchema(childField.name, childField.validation);
            }
          }
        } else {
          applyGteFromSchema(field.name, field.validation);
        }
      }
    }
  });
}

// Type helper for form data
export type FormData = Record<string, unknown>;
