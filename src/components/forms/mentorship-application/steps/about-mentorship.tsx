/**
 * Tell us about being a mentor
 * Collects why are you applying to be a mentor?, strongest competencies, what do you think a mentee can learn from you
 */

import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { TextArea } from "@govtech-bb/react";
import { aboutMentorshipValidation } from "../schema";

export type AboutMentorshipValue = {
  whyMentor?: string;
  strongestCompetencies?: string;
  whatCanMenteeLearn?: string;
};

export type AboutMentorshipProps = {
  value: AboutMentorshipValue;
  onChange: (value: AboutMentorshipValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function AboutMentorship({
  value,
  onChange,
  onNext,
  onBack,
}: AboutMentorshipProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: aboutMentorshipValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "about-mentorship-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="Mentorship Application"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Tell us about being a mentor"
    >
      <TextArea
        aria-required="true"
        error={fieldErrors.whyMentor}
        id="about-mentorship-whyMentor"
        label="Why are you applying to be a mentor?"
        onChange={(e) => handleChange("whyMentor", e.target.value)}
        required
        rows={3}
        value={value.whyMentor || ""}
      />

      <TextArea
        aria-required="true"
        error={fieldErrors.strongestCompetencies}
        id="about-mentorship-strongestCompetencies"
        label="Strongest competencies"
        onChange={(e) => handleChange("strongestCompetencies", e.target.value)}
        required
        rows={3}
        value={value.strongestCompetencies || ""}
      />

      <TextArea
        aria-required="true"
        error={fieldErrors.whatCanMenteeLearn}
        id="about-mentorship-whatCanMenteeLearn"
        label="What do you think a mentee can learn from you"
        onChange={(e) => handleChange("whatCanMenteeLearn", e.target.value)}
        required
        rows={3}
        value={value.whatCanMenteeLearn || ""}
      />
    </StepContainer>
  );
}
