"use client";

import { useEffect } from "react";
import {
  convertFromInputFormat,
  convertToInputFormat,
} from "@/lib/date-format";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { getFieldClassName } from "../../common/form-utils";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { childDetailsValidation } from "../schema";
import type { ChildDetails as ChildDetailsType } from "../types";

type ChildDetailsProps = {
  value: Partial<ChildDetailsType>;
  onChange: (value: Partial<ChildDetailsType>) => void;
  onNext: () => void;
  onBack: () => void;
  prefillSurname?: string;
};

/**
 * Step: Child's Details
 * Collects information about the child being registered
 *
 * @param prefillSurname - Pre-filled from father or mother's surname
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Error handling logic requires validation state management
export function ChildDetails({
  value,
  onChange,
  onNext,
  onBack,
  prefillSurname,
}: ChildDetailsProps) {
  const titleRef = useStepFocus("Tell us about the child", "Register a Birth");

  // Use generic validation hook
  const { errors, fieldErrors, handleChange, handleBlur, handleSubmit } =
    useStepValidation({
      schema: childDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "child-",
    });

  // Pre-fill lastName with surname if not already set
  useEffect(() => {
    if (prefillSurname && !value.lastName) {
      onChange({ ...value, lastName: prefillSurname });
    }
  }, [prefillSurname, value.lastName, onChange, value]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Tell us about the child
      </h1>

      <ErrorSummary errors={errors} />

      {/* First name(s) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-firstNames"
        >
          First name
        </label>
        <input
          aria-describedby={
            fieldErrors.firstNames ? "child-firstNames-error" : undefined
          }
          aria-invalid={fieldErrors.firstNames ? true : undefined}
          className={getFieldClassName("firstNames", fieldErrors)}
          id="child-firstNames"
          onBlur={() => handleBlur("firstNames")}
          onChange={(e) => handleChange("firstNames", e.target.value)}
          type="text"
          value={value.firstNames || ""}
        />
        <FormFieldError
          id="child-firstNames"
          message={fieldErrors.firstNames}
        />
      </div>

      {/* Middle name(s) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-middleNames"
        >
          Middle name(s)
        </label>
        <p className="mb-2 text-base text-gray-600">
          If they have more than one, add them in order
        </p>
        <input
          className={getFieldClassName("middleNames", fieldErrors)}
          id="child-middleNames"
          onChange={(e) => handleChange("middleNames", e.target.value)}
          type="text"
          value={value.middleNames || ""}
        />
      </div>

      {/* Last name (prefilled) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-lastName"
        >
          Last name
        </label>
        <input
          aria-describedby={
            fieldErrors.lastName ? "child-lastName-error" : undefined
          }
          aria-invalid={fieldErrors.lastName ? true : undefined}
          className={getFieldClassName("lastName", fieldErrors)}
          id="child-lastName"
          onBlur={() => handleBlur("lastName")}
          onChange={(e) => handleChange("lastName", e.target.value)}
          type="text"
          value={value.lastName || prefillSurname || ""}
        />
        <FormFieldError id="child-lastName" message={fieldErrors.lastName} />
      </div>

      {/* Date of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-dateOfBirth"
        >
          Date of birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          Use the calendar picker or enter in MM/DD/YYYY format
        </p>
        <input
          aria-describedby={
            fieldErrors.dateOfBirth ? "child-dateOfBirth-error" : undefined
          }
          aria-invalid={fieldErrors.dateOfBirth ? true : undefined}
          className="w-full max-w-sm rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-dateOfBirth"
          lang="en-US"
          onBlur={() => handleBlur("dateOfBirth")}
          onChange={(e) =>
            handleChange("dateOfBirth", convertFromInputFormat(e.target.value))
          }
          type="date"
          value={convertToInputFormat(value.dateOfBirth || "")}
        />
        <FormFieldError
          id="child-dateOfBirth"
          message={fieldErrors.dateOfBirth}
        />
      </div>

      {/* Sex at birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-sexAtBirth"
        >
          Sex at birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          We ask this so that we can monitor population trends.
        </p>
        <select
          aria-describedby={
            fieldErrors.sexAtBirth ? "child-sexAtBirth-error" : undefined
          }
          aria-invalid={fieldErrors.sexAtBirth ? true : undefined}
          className={getFieldClassName("sexAtBirth", fieldErrors)}
          id="child-sexAtBirth"
          onBlur={() => handleBlur("sexAtBirth")}
          onChange={(e) => handleChange("sexAtBirth", e.target.value)}
          value={value.sexAtBirth || ""}
        >
          <option value="">Select an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Intersex">Intersex</option>
        </select>
        <FormFieldError
          id="child-sexAtBirth"
          message={fieldErrors.sexAtBirth}
        />
      </div>

      {/* Place of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-parishOfBirth"
        >
          Place of birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          Include the town and parish in your answer.
        </p>
        <p className="mb-2 text-base text-gray-600">
          For example, Queen Elizabeth Hospital, Bridgetown, St. Michael.
        </p>
        <p className="mb-2 text-base text-gray-600">
          Or a home address if they were born at home.
        </p>
        <input
          aria-describedby={
            fieldErrors.parishOfBirth ? "child-parishOfBirth-error" : undefined
          }
          aria-invalid={fieldErrors.parishOfBirth ? true : undefined}
          className={getFieldClassName("parishOfBirth", fieldErrors)}
          id="child-parishOfBirth"
          onBlur={() => handleBlur("parishOfBirth")}
          onChange={(e) => handleChange("parishOfBirth", e.target.value)}
          type="text"
          value={value.parishOfBirth || ""}
        />
        <FormFieldError
          id="child-parishOfBirth"
          message={fieldErrors.parishOfBirth}
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
