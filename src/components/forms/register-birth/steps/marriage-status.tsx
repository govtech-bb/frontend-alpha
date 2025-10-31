"use client";

import { Button, Radio, RadioGroup } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";
import { useStepFocus } from "../../common/hooks/use-step-focus";

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
  onBack,
}: MarriageStatusProps) {
  const titleRef = useStepFocus("Marriage status", "Register a Birth");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onNext();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
          <RadioGroup onValueChange={onChange} value={value}>
            <Radio id="married-yes" label="Yes" value="yes" />
            <Radio id="married-no" label="No" value="no" />
          </RadioGroup>
        </div>
      </fieldset>

      <div className="flex gap-4">
        <Button onClick={onBack} variant={"secondary"}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
