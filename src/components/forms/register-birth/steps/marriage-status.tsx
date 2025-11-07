"use client";

import { Button, Radio, RadioGroup } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";
import { ErrorSummary } from "../../common/error-summary";
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
          className="mb-4 font-bold text-5xl leading-tight focus:outline-none"
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

      <RadioGroup
        aria-describedby={
          fieldErrors.marriageStatus
            ? "marriageStatus-marriageStatus-error"
            : undefined
        }
        aria-invalid={fieldErrors.marriageStatus ? "true" : undefined}
        aria-label="Marriage status"
        onValueChange={(val) =>
          handleChange("marriageStatus", val as "yes" | "no")
        }
        value={value || undefined}
      >
        <Radio id="married-yes" label="Yes" value="yes" />
        <Radio id="married-no" label="No" value="no" />
      </RadioGroup>

      {fieldErrors.marriageStatus && (
        <p
          className="mt-2 text-[20px] text-red-dark"
          id="marriageStatus-marriageStatus-error"
        >
          {fieldErrors.marriageStatus}
        </p>
      )}

      <div className="flex gap-4">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
