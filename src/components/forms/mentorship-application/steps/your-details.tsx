/**
 * Tell us about yourself
 * Collects first name, last name, date of birth, your employment status, please specify
 */

import { DateInput, StepContainer, useStepValidation } from "@govtech-bb/forms";
import { Input, Radio, RadioGroup } from "@govtech-bb/react";
import { yourDetailsValidation } from "../schema";

export type YourDetailsValue = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  employmentStatus?: string;
  employmentStatusOther?: string;
};

export type YourDetailsProps = {
  value: YourDetailsValue;
  onChange: (value: YourDetailsValue) => void;
  onNext: () => void;
};

export function YourDetails({ value, onChange, onNext }: YourDetailsProps) {
  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: yourDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "your-details-",
    });

  return (
    <StepContainer
      errors={errors}
      formTitle="Mentorship Application"
      onSubmit={handleSubmit}
      title="Tell us about yourself"
    >
      <Input
        aria-required="true"
        error={fieldErrors.firstName}
        id="your-details-firstName"
        label="First name"
        onChange={(e) => handleChange("firstName", e.target.value)}
        required
        value={value.firstName || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.lastName}
        id="your-details-lastName"
        label="Last name"
        onChange={(e) => handleChange("lastName", e.target.value)}
        required
        value={value.lastName || ""}
      />

      <DateInput
        errors={dateFieldErrors.dateOfBirth}
        id="your-details-dateOfBirth"
        label="Date of birth"
        onChange={(date) => handleChange("dateOfBirth", date)}
        value={value.dateOfBirth || ""}
      />

      <RadioGroup
        error={fieldErrors.employmentStatus}
        label="Your employment status"
        onValueChange={(value) => handleChange("employmentStatus", value)}
        value={value.employmentStatus || ""}
      >
        <Radio
          id="your-details-employmentStatus-0"
          label="Studying"
          value="studying"
        />
        <Radio
          id="your-details-employmentStatus-1"
          label="Employed"
          value="employed"
        />
        <Radio
          id="your-details-employmentStatus-2"
          label="Unemployed"
          value="unemployed"
        />
        <Radio
          id="your-details-employmentStatus-3"
          label="Other (please specify)"
          value="other"
        />
      </RadioGroup>

      {/* Conditional field - shown when employmentStatus === "other" */}
      {value.employmentStatus === "other" && (
        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
          <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
            <Input
              aria-required="true"
              error={fieldErrors.employmentStatusOther}
              id="your-details-employmentStatusOther"
              label="Please specify"
              onChange={(e) =>
                handleChange("employmentStatusOther", e.target.value)
              }
              required
              value={value.employmentStatusOther || ""}
            />
          </div>
        </div>
      )}
    </StepContainer>
  );
}
