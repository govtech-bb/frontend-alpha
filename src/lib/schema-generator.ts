/** biome-ignore-all lint/complexity/noForEach: <explanation> */
import { z } from "zod";
import { formSteps } from "@/schema/sports-training-programme-form-schema";
import type { FormField } from "@/types";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
function createFieldSchema(field: FormField): z.ZodTypeAny {
  let schema: z.ZodTypeAny = z.string();

  const validation = field.validation;

  // Handle date fields
  if (field.type === "date") {
    schema = z.string().min(1, validation.required || "Date is required");
    schema = (schema as z.ZodString).refine(
      (val) => {
        if (!val) return false;
        const date = new Date(val);
        return !Number.isNaN(date.getTime());
      },
      { message: "Invalid date" }
    );
    return schema;
  }

  // Handle radio buttons with boolean values
  if (
    field.type === "radio" &&
    (field.name === "disciplineExperience" ||
      field.name === "belongsToOrganizations")
  ) {
    schema = z.enum(["true", "false"], {
      required_error: validation.required || "This field is required",
    });
    return schema;
  }

  // Handle other radio buttons
  if (field.type === "radio" && field.options) {
    const values = field.options.map((opt) => opt.value) as [
      string,
      ...string[],
    ];
    schema = z.enum(values, {
      required_error: validation.required || "This field is required",
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
    schema = z.string().email("Invalid email address");
    if (validation.required) {
      schema = schema.min(1, validation.required);
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
