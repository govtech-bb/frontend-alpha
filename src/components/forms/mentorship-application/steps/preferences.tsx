/**
 * Preferences
 * Collects would you prefer a male or female mentee, would it be acceptable to give your mentee your personal phone number?, do you have someone in mind that you'd like to mentor?, what is their name
 */

import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { Input, Radio, RadioGroup } from "@govtech-bb/react";
import { preferencesValidation } from "../schema";

export type PreferencesValue = {
  preferFormat?: string;
  inPersonMentee?: string;
  mindsetTraining?: string;
  menteeName?: string;
};

export type PreferencesProps = {
  value: PreferencesValue;
  onChange: (value: PreferencesValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function Preferences({
  value,
  onChange,
  onNext,
  onBack,
}: PreferencesProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: preferencesValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "preferences-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="Mentorship Application"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Preferences"
    >
      <RadioGroup
        error={fieldErrors.preferFormat}
        label="Would you prefer a male or female mentee"
        onValueChange={(value) => handleChange("preferFormat", value)}
        value={value.preferFormat || ""}
      >
        <Radio id="preferences-preferFormat-0" label="Male" value="male" />
        <Radio id="preferences-preferFormat-1" label="Female" value="female" />
        <Radio
          id="preferences-preferFormat-2"
          label="No preference"
          value="no-preference"
        />
      </RadioGroup>

      <RadioGroup
        error={fieldErrors.inPersonMentee}
        label="Would it be acceptable to give your mentee your personal phone number?"
        onValueChange={(value) => handleChange("inPersonMentee", value)}
        value={value.inPersonMentee || ""}
      >
        <Radio id="preferences-inPersonMentee-0" label="Yes" value="yes" />
        <Radio id="preferences-inPersonMentee-1" label="No" value="no" />
      </RadioGroup>

      <RadioGroup
        error={fieldErrors.mindsetTraining}
        label="Do you have someone in mind that you'd like to mentor?"
        onValueChange={(value) => handleChange("mindsetTraining", value)}
        value={value.mindsetTraining || ""}
      >
        <Radio id="preferences-mindsetTraining-0" label="Yes" value="yes" />
        <Radio id="preferences-mindsetTraining-1" label="No" value="no" />
      </RadioGroup>

      {/* Conditional field - shown when mindsetTraining === "yes" */}
      {value.mindsetTraining === "yes" && (
        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
          <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
            <Input
              aria-required="true"
              error={fieldErrors.menteeName}
              id="preferences-menteeName"
              label="What is their name"
              onChange={(e) => handleChange("menteeName", e.target.value)}
              required
              value={value.menteeName || ""}
            />
          </div>
        </div>
      )}
    </StepContainer>
  );
}
