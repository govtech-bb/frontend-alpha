"use client";

import { Typography } from "@/components/ui/typography";
import { useStepFocus } from "../useStepFocus";

type IncludeFatherDetailsProps = {
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
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
  stepNumber,
  totalSteps,
}: IncludeFatherDetailsProps) {
  const titleRef = useStepFocus(
    "Include father's details",
    stepNumber,
    totalSteps
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onNext();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h1 className="mb-4 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
          Do you want to include the father's details on the birth record?
        </h1>

        <div className="mb-6 space-y-4">
          <Typography variant="paragraph">
            If you select 'Yes' the father's name will be legally recorded, and
            both parents must attend the registration appointment together to
            sign the official register.
          </Typography>

          <Typography variant="paragraph">
            If you select 'No', the mother must register the birth alone.
          </Typography>
        </div>
      </div>

      <fieldset>
        <legend className="sr-only">Include father's details</legend>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              checked={value === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="include-father-yes"
              name="includeFatherDetails"
              onChange={() => onChange("yes")}
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
              checked={value === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="include-father-no"
              name="includeFatherDetails"
              onChange={() => onChange("no")}
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
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!value}
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
