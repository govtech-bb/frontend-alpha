"use client";

import { useState } from "react";
import { ErrorSummary, type ValidationError } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { fatherDetailsValidation } from "../schema";
import type { PersonDetails } from "../types";

type FathersDetailsProps = {
  value: Partial<PersonDetails>;
  onChange: (value: Partial<PersonDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Father's Details
 * Collects comprehensive information about the father
 * Based on PDF page 2
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Error handling logic requires validation state management
export function FathersDetails({
  value,
  onChange,
  onNext,
  onBack,
}: FathersDetailsProps) {
  const titleRef = useStepFocus(
    "Tell us about the child's father",
    "Register a Birth"
  );

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
    const result = fatherDetailsValidation.safeParse(testValue);

    if (result.success) {
      // Clear error for this field
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setErrors((prev) => prev.filter((e) => e.field !== `father-${field}`));
    } else {
      // Set error for this field
      const fieldError = result.error.issues.find((e) => e.path[0] === field);
      if (fieldError) {
        setFieldErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        setErrors((prev) => {
          const filtered = prev.filter((e) => e.field !== `father-${field}`);
          return [
            ...filtered,
            { field: `father-${field}`, message: fieldError.message },
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

    const result = fatherDetailsValidation.safeParse(value);

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
          field: `father-${field}`,
          message: error.message,
        });
        newFieldErrors[field] = error.message;
      }

      setErrors(validationErrors);
      setFieldErrors(newFieldErrors);
    }
  };

  const getFieldClassName = (field: keyof PersonDetails) => {
    const baseClass =
      "w-full max-w-md rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
    const errorClass = fieldErrors[field]
      ? "border-red-600"
      : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  const getTextareaClassName = (field: keyof PersonDetails) => {
    const baseClass =
      "w-full max-w-md resize-y rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
    const errorClass = fieldErrors[field]
      ? "border-red-600"
      : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Tell us about the child's father
      </h1>

      <ErrorSummary errors={errors} />

      {/* First name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-firstName"
        >
          First name
        </label>
        <input
          aria-describedby={
            fieldErrors.firstName ? "father-firstName-error" : undefined
          }
          aria-invalid={fieldErrors.firstName ? true : undefined}
          className={getFieldClassName("firstName")}
          id="father-firstName"
          onBlur={() => handleBlur("firstName")}
          onChange={(e) => handleChange("firstName", e.target.value)}
          type="text"
          value={value.firstName || ""}
        />
        <FormFieldError id="father-firstName" message={fieldErrors.firstName} />
      </div>

      {/* Middle name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-middleName"
        >
          Middle name(s)
        </label>
        <p className="mb-2 text-base text-gray-600">
          If they have more than one, add them in order
        </p>
        <input
          className={getFieldClassName("middleName")}
          id="father-middleName"
          onChange={(e) => handleChange("middleName", e.target.value)}
          type="text"
          value={value.middleName || ""}
        />
      </div>

      {/* Last name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-lastName"
        >
          Last name
        </label>
        <input
          aria-describedby={
            fieldErrors.lastName ? "father-lastName-error" : undefined
          }
          aria-invalid={fieldErrors.lastName ? true : undefined}
          className={getFieldClassName("lastName")}
          id="father-lastName"
          onBlur={() => handleBlur("lastName")}
          onChange={(e) => handleChange("lastName", e.target.value)}
          type="text"
          value={value.lastName || ""}
        />
        <FormFieldError id="father-lastName" message={fieldErrors.lastName} />
      </div>

      {/* Date of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-dateOfBirth"
        >
          Date of birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          For example, 30 July 1986
        </p>
        <input
          aria-describedby={
            fieldErrors.dateOfBirth ? "father-dateOfBirth-error" : undefined
          }
          aria-invalid={fieldErrors.dateOfBirth ? true : undefined}
          className="w-full max-w-xs rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="father-dateOfBirth"
          onBlur={() => handleBlur("dateOfBirth")}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          placeholder="DD/MM/YYYY"
          type="text"
          value={value.dateOfBirth || ""}
        />
        <FormFieldError
          id="father-dateOfBirth"
          message={fieldErrors.dateOfBirth}
        />
      </div>

      {/* Address */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-address"
        >
          Current address
        </label>
        <textarea
          aria-describedby={
            fieldErrors.address ? "father-address-error" : undefined
          }
          aria-invalid={fieldErrors.address ? true : undefined}
          className={getTextareaClassName("address")}
          id="father-address"
          onBlur={() => handleBlur("address")}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
          value={value.address || ""}
        />
        <FormFieldError id="father-address" message={fieldErrors.address} />
      </div>

      {/* National registration number */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-nationalRegistrationNumber"
        >
          National registration number
        </label>
        <input
          aria-describedby={
            fieldErrors.nationalRegistrationNumber
              ? "father-nationalRegistrationNumber-error"
              : undefined
          }
          aria-invalid={
            fieldErrors.nationalRegistrationNumber ? true : undefined
          }
          className={getFieldClassName("nationalRegistrationNumber")}
          id="father-nationalRegistrationNumber"
          onBlur={() => handleBlur("nationalRegistrationNumber")}
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />
        <FormFieldError
          id="father-nationalRegistrationNumber"
          message={fieldErrors.nationalRegistrationNumber}
        />
      </div>

      {/* Occupation (optional) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-occupation"
        >
          Occupation{" "}
          <span className="font-normal text-gray-600">(optional)</span>
        </label>
        <p className="mb-2 text-base text-gray-600">
          This will be included on the child's birth certificate and in official
          records.
        </p>
        <input
          className={getFieldClassName("occupation")}
          id="father-occupation"
          onChange={(e) => handleChange("occupation", e.target.value)}
          type="text"
          value={value.occupation || ""}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="rounded bg-gray-300 px-6 py-3 font-normal text-neutral-black text-xl transition-all hover:bg-gray-400"
          onClick={onBack}
          type="button"
        >
          Back
        </button>

        <button
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
}
