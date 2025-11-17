/**
 * Experience
 * Collects please list qualifications / experience, how many years experience as a mentor, volunteer or helpline outside of work
 */

import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { Input, TextArea } from "@govtech-bb/react";
import { experienceValidation } from "../schema";

export type ExperienceValue = {
  qualificationsExperience?: string;
  yearsExperienceMentor?: string;
  workExperienceOutside?: string;
};

export type ExperienceProps = {
  value: ExperienceValue;
  onChange: (value: ExperienceValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function Experience({
  value,
  onChange,
  onNext,
  onBack,
}: ExperienceProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: experienceValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "experience-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="Mentorship Application"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Experience"
    >
      <TextArea
        aria-required="true"
        error={fieldErrors.qualificationsExperience}
        id="experience-qualificationsExperience"
        label="Please list qualifications / experience"
        onChange={(e) =>
          handleChange("qualificationsExperience", e.target.value)
        }
        required
        rows={3}
        value={value.qualificationsExperience || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.yearsExperienceMentor}
        id="experience-yearsExperienceMentor"
        label="How many years experience as a mentor"
        onChange={(e) => handleChange("yearsExperienceMentor", e.target.value)}
        required
        type="number"
        value={value.yearsExperienceMentor || ""}
      />

      <TextArea
        aria-required="true"
        error={fieldErrors.workExperienceOutside}
        id="experience-workExperienceOutside"
        label="Volunteer or helpline outside of work"
        onChange={(e) => handleChange("workExperienceOutside", e.target.value)}
        required
        rows={3}
        value={value.workExperienceOutside || ""}
      />
    </StepContainer>
  );
}
