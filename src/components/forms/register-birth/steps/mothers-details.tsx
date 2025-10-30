"use client";

import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import {
  getFieldClassName,
  getTextareaClassName,
} from "../../common/form-utils";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { usePersonDetailsValidation } from "../hooks/use-person-details-validation";
import { motherDetailsValidation } from "../schema";
import type { PersonDetails } from "../types";

type MothersDetailsProps = {
  value: Partial<PersonDetails>;
  onChange: (value: Partial<PersonDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Mother's Details
 * Collects information about the mother
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity from JSX conditional rendering, validation logic extracted to hook
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

  const { errors, fieldErrors, handleChange, handleBlur, handleSubmit } =
    usePersonDetailsValidation({
      value,
      onChange,
      onNext,
      validationSchema: motherDetailsValidation,
      fieldPrefix: "mother-",
    });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight"
        ref={titleRef}
        tabIndex={-1}
      >
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
          className={getFieldClassName("firstName", fieldErrors)}
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
          className={getFieldClassName("middleName", fieldErrors)}
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
          className={getFieldClassName("lastName", fieldErrors)}
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
          className={getTextareaClassName("address", fieldErrors)}
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
          className={getFieldClassName(
            "nationalRegistrationNumber",
            fieldErrors
          )}
          id="mother-nationalRegistrationNumber"
          onBlur={() => handleBlur("nationalRegistrationNumber")}
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          placeholder="123456-7890"
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />
        <FormFieldError
          id="mother-nationalRegistrationNumber"
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
              htmlFor="mother-passportNumber"
            >
              Passport number
            </label>
            <input
              aria-describedby={
                fieldErrors.passportNumber
                  ? "mother-passportNumber-error"
                  : undefined
              }
              aria-invalid={fieldErrors.passportNumber ? true : undefined}
              className={getFieldClassName("passportNumber", fieldErrors)}
              id="mother-passportNumber"
              onBlur={() => handleBlur("passportNumber")}
              onChange={(e) => handleChange("passportNumber", e.target.value)}
              type="text"
              value={value.passportNumber || ""}
            />
            <FormFieldError
              id="mother-passportNumber"
              message={fieldErrors.passportNumber}
            />
          </div>
        </details>
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
          className={getFieldClassName("occupation", fieldErrors)}
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
