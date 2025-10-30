"use client";

import { useState } from "react";
import { ErrorSummary, type ValidationError } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { motherDetailsValidation } from "../schema";
import type { PersonDetails, SimplifiedMotherDetails } from "../types";

type MothersDetailsProps = {
  value: Partial<PersonDetails | SimplifiedMotherDetails>;
  onChange: (value: Partial<PersonDetails | SimplifiedMotherDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Mother's Details
 * Collects information about the mother
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Error handling logic requires validation state management
export function MothersDetails({
  value,
  onChange,
  onNext,
  onBack,
}: MothersDetailsProps) {
  const titleRef = useStepFocus(
    "Tell us about the child's mother",
    "Register a Birth"
  );

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (
    field: keyof (PersonDetails | SimplifiedMotherDetails),
    fieldValue: string
  ) => {
    onChange({ ...value, [field]: fieldValue });

    // Clear error for this field when user starts typing (after first submit)
    if (hasSubmitted) {
      validateField(field, fieldValue);
    }
  };

  const validateField = (
    field: keyof (PersonDetails | SimplifiedMotherDetails),
    fieldValue: string
  ) => {
    const testValue = { ...value, [field]: fieldValue };
    const result = motherDetailsValidation.safeParse(testValue);

    if (result.success) {
      // Clear error for this field
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setErrors((prev) => prev.filter((e) => e.field !== `mother-${field}`));
    } else {
      // Set error for this field
      const fieldError = result.error.issues.find((e) => e.path[0] === field);
      if (fieldError) {
        setFieldErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        setErrors((prev) => {
          const filtered = prev.filter((e) => e.field !== `mother-${field}`);
          return [
            ...filtered,
            { field: `mother-${field}`, message: fieldError.message },
          ];
        });
      }
    }
  };

  const handleBlur = (
    field: keyof (PersonDetails | SimplifiedMotherDetails)
  ) => {
    if (hasSubmitted) {
      validateField(field, value[field] || "");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const result = motherDetailsValidation.safeParse(value);

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
          field: `mother-${field}`,
          message: error.message,
        });
        newFieldErrors[field] = error.message;
      }

      setErrors(validationErrors);
      setFieldErrors(newFieldErrors);
    }
  };

  const getFieldClassName = (
    field: keyof (PersonDetails | SimplifiedMotherDetails)
  ) => {
    const baseClass =
      "w-full max-w-md rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
    const errorClass = fieldErrors[field]
      ? "border-red-600"
      : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  const getTextareaClassName = (
    field: keyof (PersonDetails | SimplifiedMotherDetails)
  ) => {
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
        Tell us about the child's mother
      </h1>

      <ErrorSummary errors={errors} />

      {/* First name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-firstName"
        >
          First name
        </label>
        <input
          aria-describedby={
            fieldErrors.firstName ? "mother-firstName-error" : undefined
          }
          aria-invalid={fieldErrors.firstName ? true : undefined}
          className={getFieldClassName("firstName")}
          id="mother-firstName"
          onBlur={() => handleBlur("firstName")}
          onChange={(e) => handleChange("firstName", e.target.value)}
          type="text"
          value={value.firstName || ""}
        />
        <FormFieldError id="mother-firstName" message={fieldErrors.firstName} />
      </div>

      {/* Middle name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-middleName"
        >
          Middle name(s)
        </label>
        <p className="mb-2 text-base text-gray-600">
          If they have more than one, add them in order
        </p>
        <input
          className={getFieldClassName("middleName")}
          id="mother-middleName"
          onChange={(e) => handleChange("middleName", e.target.value)}
          type="text"
          value={value.middleName || ""}
        />
      </div>

      {/* Last name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-lastName"
        >
          Last name
        </label>
        <input
          aria-describedby={
            fieldErrors.lastName ? "mother-lastName-error" : undefined
          }
          aria-invalid={fieldErrors.lastName ? true : undefined}
          className={getFieldClassName("lastName")}
          id="mother-lastName"
          onBlur={() => handleBlur("lastName")}
          onChange={(e) => handleChange("lastName", e.target.value)}
          type="text"
          value={value.lastName || ""}
        />
        <FormFieldError id="mother-lastName" message={fieldErrors.lastName} />
      </div>

      {/* Had other surname */}
      <fieldset>
        <legend className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]">
          Has the mother had any other last name?
        </legend>
        <p className="mb-2 text-base text-gray-600">
          For example, a maiden name
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <input
              checked={value.hadOtherSurname === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="mother-hadOtherSurname-yes"
              name="mother-hadOtherSurname"
              onChange={() => handleChange("hadOtherSurname", "yes")}
              type="radio"
              value="yes"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="mother-hadOtherSurname-yes"
            >
              Yes
            </label>
          </div>

          <div className="flex items-start">
            <input
              checked={value.hadOtherSurname === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="mother-hadOtherSurname-no"
              name="mother-hadOtherSurname"
              onChange={() => handleChange("hadOtherSurname", "no")}
              type="radio"
              value="no"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="mother-hadOtherSurname-no"
            >
              No
            </label>
          </div>
        </div>

        {value.hadOtherSurname === "yes" && (
          <div className="mt-4">
            <label
              className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
              htmlFor="mother-otherSurname"
            >
              What was it
            </label>
            <input
              className="w-full max-w-sm rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
              id="mother-otherSurname"
              onChange={(e) => handleChange("otherSurname", e.target.value)}
              type="text"
              value={value.otherSurname || ""}
            />
          </div>
        )}
      </fieldset>

      {/* Date of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-dateOfBirth"
        >
          Date of birth
        </label>
        <p className="mb-2 text-base text-gray-600">For example, 07/30/1986</p>
        <input
          aria-describedby={
            fieldErrors.dateOfBirth ? "mother-dateOfBirth-error" : undefined
          }
          aria-invalid={fieldErrors.dateOfBirth ? true : undefined}
          className="w-full max-w-xs rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-dateOfBirth"
          onBlur={() => handleBlur("dateOfBirth")}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          placeholder="MM/DD/YYYY"
          type="text"
          value={value.dateOfBirth || ""}
        />
        <FormFieldError
          id="mother-dateOfBirth"
          message={fieldErrors.dateOfBirth}
        />
      </div>

      {/* Address */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-address"
        >
          Current address
        </label>
        <textarea
          aria-describedby={
            fieldErrors.address ? "mother-address-error" : undefined
          }
          aria-invalid={fieldErrors.address ? true : undefined}
          className={getTextareaClassName("address")}
          id="mother-address"
          onBlur={() => handleBlur("address")}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
          value={value.address || ""}
        />
        <FormFieldError id="mother-address" message={fieldErrors.address} />
      </div>

      {/* National registration number */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-nationalRegistrationNumber"
        >
          National registration number
        </label>
        <input
          aria-describedby={
            fieldErrors.nationalRegistrationNumber
              ? "mother-nationalRegistrationNumber-error"
              : undefined
          }
          aria-invalid={
            fieldErrors.nationalRegistrationNumber ? true : undefined
          }
          className={getFieldClassName("nationalRegistrationNumber")}
          id="mother-nationalRegistrationNumber"
          onBlur={() => handleBlur("nationalRegistrationNumber")}
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />
        <FormFieldError
          id="mother-nationalRegistrationNumber"
          message={fieldErrors.nationalRegistrationNumber}
        />
      </div>

      {/* Occupation (optional) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-occupation"
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
          id="mother-occupation"
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
