"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Radio, RadioGroup } from "@govtech-bb/react";
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

  // Map ValidationError[] to ErrorItem[] for @govtech-bb/react ErrorSummary
  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <form className="container space-y-8 pt-8 pb-16" onSubmit={handleSubmit}>
      <div>
        <h1
          className="mb-2 font-bold text-[56px] leading-[1.15]"
          ref={titleRef}
          tabIndex={-1}
        >
          When the child was born, were the mother and father married to each
          other?
        </h1>

        {errorItems.length > 0 && (
          <ErrorSummary
            errors={errorItems}
            onErrorClick={handleErrorClick}
            title="There is a problem"
          />
        )}

        <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
          <p>We ask this because your answer might determine:</p>
          <ul className="mb-6 list-disc pl-6 text-[20px] leading-[1.5]">
            <li className="mb-2">the surname of the child</li>
            <li>who can register the birth</li>
          </ul>
        </div>
      </div>

      <RadioGroup
        aria-describedby={
          fieldErrors.marriageStatus
            ? "marriageStatus-marriageStatus-error"
            : undefined
        }
        aria-invalid={!!fieldErrors.marriageStatus}
        aria-label="Marriage status"
        onValueChange={(val) =>
          handleChange("marriageStatus", val as "yes" | "no")
        }
        value={value || undefined}
      >
        <Radio id="married-yes" label="Yes" value="yes" />
        <Radio id="married-no" label="No" value="no" />
      </RadioGroup>

      <div className="flex gap-4">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
