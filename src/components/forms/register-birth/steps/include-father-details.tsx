"use client";

import { Button, Radio, RadioGroup } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";
import { ErrorSummary } from "../../common/error-summary";
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

      <RadioGroup
        aria-describedby={
          fieldErrors.includeFatherDetails
            ? "includeFatherDetails-includeFatherDetails-error"
            : undefined
        }
        aria-invalid={fieldErrors.includeFatherDetails ? "true" : undefined}
        onValueChange={(val) =>
          handleChange("includeFatherDetails", val as "yes" | "no")
        }
        value={value}
      >
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
