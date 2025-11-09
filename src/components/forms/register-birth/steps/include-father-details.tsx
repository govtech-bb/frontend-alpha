"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Radio, RadioGroup } from "@govtech-bb/react";
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

  // Convert ValidationError[] to ErrorItem[] for ErrorSummary
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
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <h1
          className="mb-2 font-bold text-[56px] leading-[1.15]"
          ref={titleRef}
          tabIndex={-1}
        >
          Do you want to include the father's details on the birth record?
        </h1>

        {errorItems.length > 0 && (
          <ErrorSummary
            errors={errorItems}
            onErrorClick={handleErrorClick}
            title="There is a problem"
          />
        )}
      </div>

      <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
        <p>
          If you choose ‘Yes’, both parents must go to the Registration
          Department and sign the official register together.
        </p>
        <p>
          If you choose ‘No’, the mother must go to the Registration Department
          but it is not necessary for the father to attend.
        </p>
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
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
