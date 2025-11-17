/**
 * What is your employment status?
 * Collects what is your employment status?, please specify, institution name
 */

import { Input, Radio, RadioGroup } from "@govtech-bb/react";
import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { employmentStatusValidation } from "../schema";

export type EmploymentStatusValue = {
  employmentStatus?: string;
  employmentOther?: string;
  institutionName?: string;
};

export type EmploymentStatusProps = {
  value: EmploymentStatusValue;
  onChange: (value: EmploymentStatusValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function EmploymentStatus({
  value,
  onChange,
  onNext,
  onBack,
}: EmploymentStatusProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: employmentStatusValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "employment-status-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="YDP Community Sports Training Programme"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="What is your employment status?"
    >
      <RadioGroup
        error={fieldErrors.employmentStatus}
        label="What is your employment status?"
        onValueChange={(value) => handleChange("employmentStatus", value)}
        value={value.employmentStatus || ""}
      >
        <Radio id="employment-status-employmentStatus-0" label="Studying" value="studying" />
        <Radio id="employment-status-employmentStatus-1" label="Employed" value="employed" />
        <Radio id="employment-status-employmentStatus-2" label="Unemployed" value="unemployed" />
        <Radio id="employment-status-employmentStatus-3" label="Other (please specify)" value="other" />
      </RadioGroup>

      {/* Conditional field - shown when employmentStatus === "other" */}
      {value.employmentStatus === "other" && (
        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
          <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
            <Input
              aria-required="true"
              error={fieldErrors.employmentOther}
              id="employment-status-employmentOther"
              label="Please specify"
              onChange={(e) => handleChange("employmentOther", e.target.value)}
              required
              value={value.employmentOther || ""}
            />
          </div>
        </div>
      )}

      {/* Conditional field - shown when employmentStatus === "studying" */}
      {value.employmentStatus === "studying" && (
        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
          <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
            <Input
              aria-required="true"
              error={fieldErrors.institutionName}
              id="employment-status-institutionName"
              label="Institution name"
              onChange={(e) => handleChange("institutionName", e.target.value)}
              required
              value={value.institutionName || ""}
            />
          </div>
        </div>
      )}
    </StepContainer>
  );
}
