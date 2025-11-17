/**
 * Tell us about your experience
 * Collects what level of experience do you have?, please specify, years of experience
 */

import { Input, Radio, RadioGroup } from "@govtech-bb/react";
import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { experienceDetailsValidation } from "../schema";

export type ExperienceDetailsValue = {
  experienceLevel?: string;
  experienceOther?: string;
  yearsOfExperience?: string;
};

export type ExperienceDetailsProps = {
  value: ExperienceDetailsValue;
  onChange: (value: ExperienceDetailsValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ExperienceDetails({
  value,
  onChange,
  onNext,
  onBack,
}: ExperienceDetailsProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: experienceDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "experience-details-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="YDP Community Sports Training Programme"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Tell us about your experience"
    >
      <RadioGroup
        error={fieldErrors.experienceLevel}
        label="What level of experience do you have?"
        onValueChange={(value) => handleChange("experienceLevel", value)}
        value={value.experienceLevel || ""}
      >
        <Radio id="experience-details-experienceLevel-0" label="School" value="school" />
        <Radio id="experience-details-experienceLevel-1" label="Club" value="club" />
        <Radio id="experience-details-experienceLevel-2" label="National" value="national" />
        <Radio id="experience-details-experienceLevel-3" label="Other (please specify)" value="other" />
      </RadioGroup>

      {/* Conditional field - shown when experienceLevel === "other" */}
      {value.experienceLevel === "other" && (
        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
          <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
            <Input
              aria-required="true"
              error={fieldErrors.experienceOther}
              id="experience-details-experienceOther"
              label="Please specify"
              onChange={(e) => handleChange("experienceOther", e.target.value)}
              required
              value={value.experienceOther || ""}
            />
          </div>
        </div>
      )}

      <Input
        aria-required="true"
        error={fieldErrors.yearsOfExperience}
        id="experience-details-yearsOfExperience"
        label="Years of experience"
        onChange={(e) => handleChange("yearsOfExperience", e.target.value)}
        required
        type="number"
        value={value.yearsOfExperience || ""}
      />
    </StepContainer>
  );
}
