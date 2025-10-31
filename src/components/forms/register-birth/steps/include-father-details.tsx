"use client";

import { Button, Radio, RadioGroup } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";
import { useStepFocus } from "../../common/hooks/use-step-focus";

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

      <RadioGroup onValueChange={onChange} value={value}>
        <Radio
          id="include-father-yes"
          label="Yes, include the father's details"
          value="yes"
        />
        <Radio
          id="include-father-no"
          label="No, do not include the father's details"
          value="no"
        />
      </RadioGroup>

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
