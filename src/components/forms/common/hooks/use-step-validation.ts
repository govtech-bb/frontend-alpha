import { useState } from "react";
import type { z } from "zod";
import type { DateFieldErrors } from "@/lib/dates";
import type { ValidationError } from "../error-summary";

type UseStepValidationParams<T> = {
  schema: z.ZodSchema<T>;
  value: Partial<T>;
  onChange: (value: Partial<T>) => void;
  onNext: () => void;
  fieldPrefix?: string;
};

/**
 * Generic validation hook for form steps
 * Manages validation state and provides handlers for change, blur, and submit events
 *
 * @param schema - Zod schema for validation
 * @param value - Current form values
 * @param onChange - Callback to update form values
 * @param onNext - Callback to proceed to next step
 * @param fieldPrefix - Optional prefix for error field IDs (e.g., "child-")
 */
export function useStepValidation<T extends Record<string, unknown>>({
  schema,
  value,
  onChange,
  onNext,
  fieldPrefix = "",
}: UseStepValidationParams<T>) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [dateFieldErrors, setDateFieldErrors] = useState<
    Record<string, DateFieldErrors | undefined>
  >({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  /**
   * Validate a single field
   */
  const validateField = (field: keyof T, fieldValue: unknown) => {
    const testValue = { ...value, [field]: fieldValue };
    const result = schema.safeParse(testValue);

    if (result.success) {
      // Clear error for this field
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
      setErrors((prev) =>
        prev.filter((e) => e.field !== `${fieldPrefix}${String(field)}`)
      );
    } else {
      // Set error for this field
      const fieldError = result.error.issues.find((e) => e.path[0] === field);
      if (fieldError) {
        setFieldErrors((prev) => ({
          ...prev,
          [field]: fieldError.message,
        }));
        setErrors((prev) => {
          const filtered = prev.filter(
            (e) => e.field !== `${fieldPrefix}${String(field)}`
          );
          return [
            ...filtered,
            {
              field: `${fieldPrefix}${String(field)}`,
              message: fieldError.message,
            },
          ];
        });
      }
    }
  };

  /**
   * Handle field value changes
   * Validates field after first submit attempt
   */
  const handleChange = (field: keyof T, fieldValue: unknown) => {
    onChange({ ...value, [field]: fieldValue } as Partial<T>);

    if (hasSubmitted && field !== "dateOfBirth") {
      validateField(field, fieldValue);
    }
  };

  /**
   * Handle field blur events
   * Validates field if form has been submitted at least once
   */
  const handleBlur = (field: keyof T) => {
    if (hasSubmitted && field !== "dateOfBirth") {
      validateField(field, value[field]);
    }
  };

  /**
   * Handle form submission
   * Validates all fields and proceeds to next step if valid
   */
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex validation logic with field-specific error handling
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const result = schema.safeParse(value);

    if (result.success) {
      setErrors([]);
      setFieldErrors({});
      setDateFieldErrors({});
      onNext();
    } else {
      // Build error list for summary and field errors
      // Deduplicate errors by field to avoid duplicate keys in error summary
      const errorsByField = new Map<string, (typeof result.error.issues)[0]>();

      for (const error of result.error.issues) {
        const field = error.path[0] as string;
        // Keep only the first error per field (typically the most relevant)
        if (!errorsByField.has(field)) {
          errorsByField.set(field, error);
        }
      }

      const validationErrors: ValidationError[] = [];
      const newFieldErrors: Record<string, string> = {};
      const newDateFieldErrors: Record<string, DateFieldErrors | undefined> =
        {};

      for (const [field, error] of errorsByField) {
        validationErrors.push({
          field: `${fieldPrefix}${field}`,
          message: error.message,
        });
        newFieldErrors[field] = error.message;

        // For dateOfBirth fields, extract per-field errors from Zod issues
        // For dateOfBirth fields, get per-field errors
        // if (field === "dateOfBirth" && typeof value[field] === "string") {
        //   const dateValue = value[field] as string;
        //   const perFieldErrors = validateFields(dateValue);
        //   if (perFieldErrors) {
        //     newDateFieldErrors[field] = perFieldErrors;
        //   }
        // }

        if (field === "dateOfBirth") {
          const dateFieldErrorsForField: DateFieldErrors = {};

          // Find all issues related to this date field's subfields
          for (const issue of result.error.issues) {
            if (
              issue.path[0] === field &&
              issue.path.length === 2 &&
              (issue.path[1] === "day" ||
                issue.path[1] === "month" ||
                issue.path[1] === "year")
            ) {
              const subField = issue.path[1] as "day" | "month" | "year";
              dateFieldErrorsForField[subField] = issue.message;
            }
          }

          if (Object.keys(dateFieldErrorsForField).length > 0) {
            newDateFieldErrors[field] = dateFieldErrorsForField;
          }
        }
      }

      setErrors(validationErrors);
      setFieldErrors(newFieldErrors);
      setDateFieldErrors(newDateFieldErrors);
    }
  };

  return {
    errors,
    fieldErrors,
    dateFieldErrors,
    hasSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
