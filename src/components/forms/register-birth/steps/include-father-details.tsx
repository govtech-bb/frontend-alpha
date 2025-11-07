"use client";

import { Typography } from "@/components/ui/typography";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { includeFatherDetailsValidation } from "../schema";

type IncludeFatherDetailsProps = {
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step 2 (Path B & C only): Include Father Details
 * Shown when parents are unmarried
 * Asks: "Do you want to include the father's details on the birth record?"
 *
 * This determines:
 * - Yes: Collect father details (Path C)
 * - No: Skip father details (Path B)
 */
export function IncludeFatherDetails({
  value,
  onChange,
  onNext,
  onBack,
}: IncludeFatherDetailsProps) {
  const titleRef = useStepFocus("Include father's details", "Register a Birth");

  // Wrap value in object for validation hook, converting empty string to undefined
  const formValue = { includeFatherDetails: value === "" ? undefined : value };

  // Wrap onChange to extract includeFatherDetails from object
  const handleFormChange = (newValue: {
    includeFatherDetails?: "yes" | "no";
  }) => {
    // Only call onChange if value is defined (user made a selection)
    if (newValue.includeFatherDetails) {
      onChange(newValue.includeFatherDetails);
    }
  };

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: includeFatherDetailsValidation,
      value: formValue,
      onChange: handleFormChange,
      onNext,
      fieldPrefix: "includeFatherDetails-",
    }
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <ErrorSummary errors={errors} />

      <div>
        <h1
          className="mb-4 font-bold text-5xl leading-tight focus:outline-none"
          ref={titleRef}
          tabIndex={-1}
        >
          Do you want to include the father's details on the birth record?
        </h1>

        <div className="mb-6 space-y-4">
          <Typography className="leading-tight" variant="paragraph">
            If you choose 'Yes', both parents must go to the Registration
            Department and sign the official register together.
          </Typography>

          <Typography className="leading-tight" variant="paragraph">
            If you choose 'No', the mother must go to the Registration
            Department but it is not necessary for the father to attend.
          </Typography>
        </div>
      </div>

      <fieldset>
        <legend className="sr-only">Include father's details</legend>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              aria-describedby={
                fieldErrors.includeFatherDetails
                  ? "includeFatherDetails-includeFatherDetails-error"
                  : undefined
              }
              aria-invalid={fieldErrors.includeFatherDetails ? "true" : "false"}
              checked={value === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="include-father-yes"
              name="includeFatherDetails"
              onChange={() => handleChange("includeFatherDetails", "yes")}
              type="radio"
              value="yes"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="include-father-yes"
            >
              Yes, include the father's details
            </label>
          </div>

          <div className="flex items-start">
            <input
              aria-describedby={
                fieldErrors.includeFatherDetails
                  ? "includeFatherDetails-includeFatherDetails-error"
                  : undefined
              }
              aria-invalid={fieldErrors.includeFatherDetails ? "true" : "false"}
              checked={value === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="include-father-no"
              name="includeFatherDetails"
              onChange={() => handleChange("includeFatherDetails", "no")}
              type="radio"
              value="no"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="include-father-no"
            >
              No, do not include the father's details
            </label>
          </div>
        </div>

        <FormFieldError
          id="includeFatherDetails-includeFatherDetails"
          message={fieldErrors.includeFatherDetails}
        />
      </fieldset>

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
