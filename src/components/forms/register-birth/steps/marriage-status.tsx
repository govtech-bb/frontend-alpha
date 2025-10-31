"use client";

import { Typography } from "@/components/ui/typography";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { marriageStatusValidation } from "../schema";

type MarriageStatusProps = {
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step 1: Marriage Status
 * Asks: "When the child was born, were the mother and father married to each other?"
 *
 * This answer determines the form flow:
 * - Yes: Direct to father details (Path A)
 * - No: Ask about including father details (Path B or C)
 */
export function MarriageStatus({
  value,
  onChange,
  onNext,
}: MarriageStatusProps) {
  const titleRef = useStepFocus("Marriage status", "Register a Birth");

  // Wrap value in object for validation hook, converting empty string to undefined
  const formValue = { marriageStatus: value === "" ? undefined : value };

  // Wrap onChange to extract marriageStatus from object
  const handleFormChange = (newValue: { marriageStatus?: "yes" | "no" }) => {
    // Only call onChange if value is defined (user made a selection)
    if (newValue.marriageStatus) {
      onChange(newValue.marriageStatus);
    }
  };

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: marriageStatusValidation,
      value: formValue,
      onChange: handleFormChange,
      onNext,
      fieldPrefix: "marriageStatus-",
    }
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <ErrorSummary errors={errors} />

      <div>
        <h1
          className="mb-4 font-bold text-5xl leading-tight"
          ref={titleRef}
          tabIndex={-1}
        >
          When the child was born, were the mother and father married to each
          other?
        </h1>

        <Typography className="mb-4 leading-tight" variant="paragraph">
          We ask this because your answer determines:
        </Typography>

        <ul className="mb-6 list-disc pl-6">
          <li>the surname of the child</li>
          <li>who can register the birth</li>
        </ul>
      </div>

      <fieldset>
        <legend className="sr-only">Marriage status</legend>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              aria-describedby={
                fieldErrors.marriageStatus
                  ? "marriageStatus-marriageStatus-error"
                  : undefined
              }
              aria-invalid={fieldErrors.marriageStatus ? "true" : "false"}
              checked={value === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="married-yes"
              name="marriageStatus"
              onChange={() => handleChange("marriageStatus", "yes")}
              type="radio"
              value="yes"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="married-yes"
            >
              Yes
            </label>
          </div>

          <div className="flex items-start">
            <input
              aria-describedby={
                fieldErrors.marriageStatus
                  ? "marriageStatus-marriageStatus-error"
                  : undefined
              }
              aria-invalid={fieldErrors.marriageStatus ? "true" : "false"}
              checked={value === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="married-no"
              name="marriageStatus"
              onChange={() => handleChange("marriageStatus", "no")}
              type="radio"
              value="no"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="married-no"
            >
              No
            </label>
          </div>
        </div>

        <FormFieldError
          id="marriageStatus-marriageStatus"
          message={fieldErrors.marriageStatus}
        />
      </fieldset>

      <button
        className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90"
        type="submit"
      >
        Next
      </button>
    </form>
  );
}
