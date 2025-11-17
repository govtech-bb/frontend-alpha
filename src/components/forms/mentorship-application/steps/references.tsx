/**
 * References
 * Collects please provide a professional reference, please provide a personal reference
 */

import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { TextArea } from "@govtech-bb/react";
import { referencesValidation } from "../schema";

export type ReferencesValue = {
  professionalReference?: string;
  personalReference?: string;
};

export type ReferencesProps = {
  value: ReferencesValue;
  onChange: (value: ReferencesValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function References({
  value,
  onChange,
  onNext,
  onBack,
}: ReferencesProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: referencesValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "references-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="Mentorship Application"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="References"
    >
      <TextArea
        aria-required="true"
        error={fieldErrors.professionalReference}
        id="references-professionalReference"
        label="Please provide a professional reference"
        onChange={(e) => handleChange("professionalReference", e.target.value)}
        required
        rows={3}
        value={value.professionalReference || ""}
      />

      <TextArea
        aria-required="true"
        error={fieldErrors.personalReference}
        id="references-personalReference"
        label="Please provide a personal reference"
        onChange={(e) => handleChange("personalReference", e.target.value)}
        required
        rows={3}
        value={value.personalReference || ""}
      />
    </StepContainer>
  );
}
