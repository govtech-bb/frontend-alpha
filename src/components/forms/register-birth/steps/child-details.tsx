"use client";

import { Button, Input, Select } from "@govtech-bb/react";
import { useEffect } from "react";
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
  prefillSurname?: string;
};

/**
 * Step: Child's Details
 * Collects information about the child being registered
 *
 * @param prefillSurname - Pre-filled from father or mother's surname
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Error handling logic requires validation state management
export function ChildDetails({
  value,
  onChange,
  onNext,
  onBack,
  prefillSurname,
}: ChildDetailsProps) {
  const titleRef = useStepFocus("Tell us about the child", "Register a Birth");

  // Use generic validation hook
  const { errors, fieldErrors, handleChange, handleBlur, handleSubmit } =
    useStepValidation({
      schema: childDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "child-",
    });

  // Pre-fill lastName with surname if not already set
  useEffect(() => {
    if (prefillSurname && !value.lastName) {
      onChange({ ...value, lastName: prefillSurname });
    }
  }, [prefillSurname, value.lastName, onChange, value]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight"
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
        onBlur={() => handleBlur("firstNames")}
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
        onBlur={() => handleBlur("lastName")}
        onChange={(e) => handleChange("lastName", e.target.value)}
        type="text"
        value={value.lastName || prefillSurname || ""}
      />

      {/* Date of birth */}
      <Input
        description="For example, 10/22/2025"
        error={fieldErrors.dateOfBirth}
        id="child-dateOfBirth"
        label="Date of birth"
        onBlur={() => handleBlur("dateOfBirth")}
        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        placeholder="MM/DD/YYYY"
        type="text"
        value={value.dateOfBirth || ""}
      />

      {/* Sex at birth */}
      <Select
        description="We ask this so that we can monitor population trends."
        error={fieldErrors.sexAtBirth}
        id="child-sexAtBirth"
        label="Sex at birth"
        onBlur={() => handleBlur("sexAtBirth")}
        onChange={(e) => handleChange("sexAtBirth", e.target.value)}
        value={value.sexAtBirth || ""}
      >
        <option value="">Select an option</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Intersex">Intersex</option>
      </Select>

      {/* Place of birth */}
      <div>
        <Input
          error={fieldErrors.parishOfBirth}
          id="child-parishOfBirth"
          label="Place of birth"
          onBlur={() => handleBlur("parishOfBirth")}
          onChange={(e) => handleChange("parishOfBirth", e.target.value)}
          type="text"
          value={value.parishOfBirth || ""}
        />
        <p className="mt-2 text-base text-gray-600">
          Include the town and parish in your answer.
        </p>
        <p className="mt-1 text-base text-gray-600">
          For example, Queen Elizabeth Hospital, Bridgetown, St. Michael.
        </p>
        <p className="mt-1 text-base text-gray-600">
          Or a home address if they were born at home.
        </p>
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
