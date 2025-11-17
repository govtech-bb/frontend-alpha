/**
 * Tell us about yourself
 * Collects first name, last name, date of birth, gender
 */

import { Input, Select } from "@govtech-bb/react";
import { DateInput, StepContainer, useStepValidation } from "@govtech-bb/forms";
import { personalDetailsValidation } from "../schema";

export type PersonalDetailsValue = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
};

export type PersonalDetailsProps = {
  value: PersonalDetailsValue;
  onChange: (value: PersonalDetailsValue) => void;
  onNext: () => void;
};

export function PersonalDetails({
  value,
  onChange,
  onNext,
}: PersonalDetailsProps) {
  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: personalDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "personal-details-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="YDP Community Sports Training Programme"
      onSubmit={handleSubmit}
      title="Tell us about yourself"
    >
      <Input
        aria-required="true"
        error={fieldErrors.firstName}
        id="personal-details-firstName"
        label="First name"
        onChange={(e) => handleChange("firstName", e.target.value)}
        required
        value={value.firstName || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.lastName}
        id="personal-details-lastName"
        label="Last name"
        onChange={(e) => handleChange("lastName", e.target.value)}
        required
        value={value.lastName || ""}
      />

      <DateInput
        errors={dateFieldErrors.dateOfBirth}
        hint="For example, 15, 03, 1984"
        id="personal-details-dateOfBirth"
        label="Date of birth"
        onChange={(date) => handleChange("dateOfBirth", date)}
        value={value.dateOfBirth || ""}
      />

      <Select
        error={fieldErrors.gender}
        id="personal-details-gender"
        label="Gender"
        onChange={(e) => handleChange("gender", e.target.value)}
        required
        value={value.gender || ""}
      >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
      </Select>
    </StepContainer>
  );
}
