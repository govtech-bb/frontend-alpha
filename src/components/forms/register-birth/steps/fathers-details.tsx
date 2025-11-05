"use client";

import { DateInput } from "../../common/date-input";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import {
  getFieldClassName,
  getTextareaClassName,
} from "../../common/form-utils";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
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
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity from JSX conditional rendering, validation logic extracted to hook
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

  const { errors, fieldErrors, handleChange, handleBlur, handleSubmit } =
    useStepValidation({
      schema: fatherDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "father-",
    });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
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
          className={getFieldClassName("firstName", fieldErrors)}
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
          className={getFieldClassName("middleName", fieldErrors)}
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
          className={getFieldClassName("lastName", fieldErrors)}
          id="father-lastName"
          onBlur={() => handleBlur("lastName")}
          onChange={(e) => handleChange("lastName", e.target.value)}
          type="text"
          value={value.lastName || ""}
        />
        <FormFieldError id="father-lastName" message={fieldErrors.lastName} />
      </div>

      {/* Date of birth */}
      <DateInput
        error={fieldErrors.dateOfBirth}
        hint="For example, 27 3 2007"
        id="father-dateOfBirth"
        label="Date of birth"
        onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
        required
        value={value.dateOfBirth || ""}
      />

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
          className={getTextareaClassName("address", fieldErrors)}
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
          className={getFieldClassName(
            "nationalRegistrationNumber",
            fieldErrors
          )}
          id="father-nationalRegistrationNumber"
          onBlur={() => handleBlur("nationalRegistrationNumber")}
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          placeholder="123456-7890"
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />
        <FormFieldError
          id="father-nationalRegistrationNumber"
          message={fieldErrors.nationalRegistrationNumber}
        />

        {/* Passport number disclosure */}
        <details className="mt-4">
          <summary className="cursor-pointer list-none text-[#1E787D] underline">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block transition-transform [details[open]_&]:rotate-90">
                ▸
              </span>
              Use passport number instead
            </span>
          </summary>
          <div className="mt-4">
            <p className="mb-4 text-base text-gray-600">
              If you don't have a National Registration number, you can use your
              passport number instead.
            </p>
            <label
              className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
              htmlFor="father-passportNumber"
            >
              Passport number
            </label>
            <input
              aria-describedby={
                fieldErrors.passportNumber
                  ? "father-passportNumber-error"
                  : undefined
              }
              aria-invalid={fieldErrors.passportNumber ? true : undefined}
              className={getFieldClassName("passportNumber", fieldErrors)}
              id="father-passportNumber"
              onBlur={() => handleBlur("passportNumber")}
              onChange={(e) => handleChange("passportNumber", e.target.value)}
              type="text"
              value={value.passportNumber || ""}
            />
            <FormFieldError
              id="father-passportNumber"
              message={fieldErrors.passportNumber}
            />
          </div>
        </details>
      </div>

      {/* Occupation */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-occupation"
        >
          Occupation
        </label>
        <p className="mb-2 text-base text-gray-600">
          This will be included on the child's birth certificate and in official
          records.
        </p>
        <input
          aria-describedby={
            fieldErrors.occupation ? "father-occupation-error" : undefined
          }
          aria-invalid={fieldErrors.occupation ? true : undefined}
          className={getFieldClassName("occupation", fieldErrors)}
          id="father-occupation"
          onBlur={() => handleBlur("occupation")}
          onChange={(e) => handleChange("occupation", e.target.value)}
          type="text"
          value={value.occupation || ""}
        />
        <FormFieldError
          id="father-occupation"
          message={fieldErrors.occupation}
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
