import { useState } from "react";
import type { z } from "zod";
import type { ValidationError } from "../../common/error-summary";
import type { PersonDetails } from "../types";

type UsePersonDetailsValidationParams<T extends z.ZodTypeAny> = {
  value: Partial<PersonDetails>;
  onChange: (value: Partial<PersonDetails>) => void;
  onNext: () => void;
  validationSchema: T;
  fieldPrefix: string;
};

/**
 * Custom hook for managing person details form validation
 * Eliminates duplicate validation logic between father and mother details forms
 */
export function usePersonDetailsValidation<T extends z.ZodTypeAny>({
  value,
  onChange,
  onNext,
  validationSchema,
  fieldPrefix,
}: UsePersonDetailsValidationParams<T>) {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (field: keyof PersonDetails, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });

    // Clear error for this field when user starts typing (after first submit)
    if (hasSubmitted) {
      validateField(field, fieldValue);
    }
  };

  const validateField = (field: keyof PersonDetails, fieldValue: string) => {
    const testValue = { ...value, [field]: fieldValue };
    const result = validationSchema.safeParse(testValue);

    if (result.success) {
      // Clear error for this field
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setErrors((prev) =>
        prev.filter((e) => e.field !== `${fieldPrefix}${field}`)
      );
    } else {
      // Set error for this field
      const fieldError = result.error.issues.find((e) => e.path[0] === field);
      if (fieldError) {
        setFieldErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        setErrors((prev) => {
          const filtered = prev.filter(
            (e) => e.field !== `${fieldPrefix}${field}`
          );
          return [
            ...filtered,
            { field: `${fieldPrefix}${field}`, message: fieldError.message },
          ];
        });
      }
    }
  };

  const handleBlur = (field: keyof PersonDetails) => {
    if (hasSubmitted) {
      validateField(field, value[field] || "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const result = validationSchema.safeParse(value);

    if (result.success) {
      setErrors([]);
      setFieldErrors({});
      onNext();
    } else {
      // Build error list for summary and field errors
      const validationErrors: ValidationError[] = [];
      const newFieldErrors: Record<string, string> = {};

      for (const error of result.error.issues) {
        const field = error.path[0] as string;
        validationErrors.push({
          field: `${fieldPrefix}${field}`,
          message: error.message,
        });
        newFieldErrors[field] = error.message;
      }

      setErrors(validationErrors);
      setFieldErrors(newFieldErrors);
    }
  };

  return {
    errors,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
