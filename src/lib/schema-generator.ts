/** biome-ignore-all lint/complexity/noForEach: <explanation> */
import { z } from "zod";
import { isValidBirthDate } from "@/lib/dates";
import { formSteps } from "@/schema/sports-training-programme-form-schema";
import type { FormField } from "@/types";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
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

  // Handle conditional fields - make them optional at the schema level
  // Validation will only apply when the field is visible
  if (field.conditionalOn) {
    // For conditional fields, we make the base schema optional
    // but still apply the validation rules when the field is shown
    let conditionalSchema: z.ZodTypeAny = z.string();

    if (validation.required) {
      conditionalSchema = z.string().min(1, validation.required);
    }

    if (validation.minLength) {
      conditionalSchema = (conditionalSchema as z.ZodString).min(
        validation.minLength.value,
        validation.minLength.message
      );
    }

    if (validation.maxLength) {
      conditionalSchema = (conditionalSchema as z.ZodString).max(
        validation.maxLength.value,
        validation.maxLength.message
      );
    }

    if (validation.pattern) {
      conditionalSchema = (conditionalSchema as z.ZodString).regex(
        new RegExp(validation.pattern.value),
        validation.pattern.message
      );
    }

    // Make it optional - validation only applies when field is visible
    return conditionalSchema.optional().or(z.literal(""));
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

  if (field.type === "email") {
    schema = z.email("Invalid email address");
    if (validation.required) {
      schema = (schema as z.ZodString).min(1, validation.required);
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

// Generate schemas for each step
export const stepSchemas = formSteps.map((step) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  step.fields.forEach((field) => {
    schemaShape[field.name] = createFieldSchema(field);
  });

  return z.object(schemaShape);
});

// Combined schema for the entire form
export const formSchema = z.object(
  formSteps.reduce(
    (acc, step) => {
      step.fields.forEach((field) => {
        acc[field.name] = createFieldSchema(field);
      });
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>
  )
);

export type FormData = z.infer<typeof formSchema>;
