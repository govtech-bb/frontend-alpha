/**
 * What sport discipline are you interested in?
 * Collects discipline of interest, do you have experience in this discipline?
 */

import { Input, Radio, RadioGroup } from "@govtech-bb/react";
import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { sportInterestValidation } from "../schema";

export type SportInterestValue = {
  disciplineOfInterest?: string;
  hasExperience?: string;
};

export type SportInterestProps = {
  value: SportInterestValue;
  onChange: (value: SportInterestValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function SportInterest({
  value,
  onChange,
  onNext,
  onBack,
}: SportInterestProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: sportInterestValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "sport-interest-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="YDP Community Sports Training Programme"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="What sport discipline are you interested in?"
    >
      <Input
        aria-required="true"
        error={fieldErrors.disciplineOfInterest}
        id="sport-interest-disciplineOfInterest"
        label="Discipline of interest"
        onChange={(e) => handleChange("disciplineOfInterest", e.target.value)}
        required
        value={value.disciplineOfInterest || ""}
      />

      <RadioGroup
        error={fieldErrors.hasExperience}
        label="Do you have experience in this discipline?"
        onValueChange={(value) => handleChange("hasExperience", value)}
        value={value.hasExperience || ""}
      >
        <Radio id="sport-interest-hasExperience-0" label="Yes" value="yes" />
        <Radio id="sport-interest-hasExperience-1" label="No" value="no" />
      </RadioGroup>
    </StepContainer>
  );
}
