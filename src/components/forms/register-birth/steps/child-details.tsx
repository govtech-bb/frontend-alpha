"use client";

import { Button, Input, Select } from "@govtech-bb/react";
import { DateInput } from "../../common/date-input";
import { ErrorSummary } from "../../common/error-summary";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { childDetailsValidation } from "../schema";
import type { ChildDetails as ChildDetailsType } from "../types";

type ChildDetailsProps = {
  value: Partial<ChildDetailsType>;
  onChange: (value: Partial<ChildDetailsType>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Child's Details
 * Collects information about the child being registered
 */
export function ChildDetails({
  value,
  onChange,
  onNext,
  onBack,
}: ChildDetailsProps) {
  const titleRef = useStepFocus("Tell us about the child", "Register a Birth");

  // Use generic validation hook
  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: childDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "child-",
    });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Tell us about the child
      </h1>

      <ErrorSummary errors={errors} />

      {/* First name(s) */}
      <Input
        error={fieldErrors.firstNames}
        id="child-firstNames"
        label="First name"
        onChange={(e) => handleChange("firstNames", e.target.value)}
        type="text"
        value={value.firstNames || ""}
      />

      {/* Middle name(s) */}
      <Input
        description="If they have more than one, add them in order"
        id="child-middleNames"
        label="Middle name(s)"
        onChange={(e) => handleChange("middleNames", e.target.value)}
        type="text"
        value={value.middleNames || ""}
      />

      {/* Last name (prefilled) */}
      <Input
        error={fieldErrors.lastName}
        id="child-lastName"
        label="Last name"
        onChange={(e) => handleChange("lastName", e.target.value)}
        type="text"
        value={value.lastName || ""}
      />

      {/* Date of birth */}
      <DateInput
        errors={dateFieldErrors.dateOfBirth}
        hint="For example, 27 3 2007 or 27 Mar 2007"
        id="child-dateOfBirth"
        label="Date of birth"
        onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
        value={value.dateOfBirth || ""}
      />

      {/* Sex at birth */}
      <Select
        description="We ask this so that we can monitor population trends."
        error={fieldErrors.sexAtBirth}
        id="child-sexAtBirth"
        label="Sex at birth"
        onChange={(e) => handleChange("sexAtBirth", e.target.value)}
        value={value.sexAtBirth || ""}
      >
        <option value="">Select an option</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Select>

      {/* Place of birth */}
      <div>
        <label
          className="block font-bold text-[20px] leading-[1.7]"
          htmlFor="child-parishOfBirth"
        >
          Place of birth
        </label>
        <div className="mb-2 text-[20px] leading-[1.7]">
          <p className="mb-4">Include the town and parish in your answer.</p>
          <p>
            For example, Queen Elizabeth Hospital, Bridgetown, St. Michael.
            <br />
            Or a home address if they were born at home.
          </p>
        </div>
        <Input
          error={fieldErrors.parishOfBirth}
          id="child-parishOfBirth"
          onChange={(e) => handleChange("parishOfBirth", e.target.value)}
          type="text"
          value={value.parishOfBirth || ""}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
