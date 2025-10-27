"use client";

import { Typography } from "@/components/ui/typography";
import { useStepFocus } from "../../common/hooks/use-step-focus";

type MarriageStatusProps = {
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
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
  onBack,
  stepNumber,
  totalSteps,
}: MarriageStatusProps) {
  const titleRef = useStepFocus("Marriage status", stepNumber, totalSteps);

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
          When the child was born, were the mother and father married to each
          other?
        </h1>

        <Typography className="mb-4" variant="paragraph">
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
              checked={value === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="married-yes"
              name="marriageStatus"
              onChange={() => onChange("yes")}
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
              checked={value === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="married-no"
              name="marriageStatus"
              onChange={() => onChange("no")}
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
          Next
        </button>
      </div>
    </form>
  );
}
