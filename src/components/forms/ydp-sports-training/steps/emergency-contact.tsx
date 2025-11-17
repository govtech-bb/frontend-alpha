/**
 * Emergency contact
 * Collects first name, last name, address line 1, address line 2, parish, telephone number
 */

import { Input, Select } from "@govtech-bb/react";
import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { emergencyContactValidation } from "../schema";

export type EmergencyContactValue = {
  emergencyFirstName?: string;
  emergencyLastName?: string;
  emergencyAddressLine1?: string;
  emergencyAddressLine2?: string;
  emergencyParish?: string;
  emergencyTelephoneNumber?: string;
};

export type EmergencyContactProps = {
  value: EmergencyContactValue;
  onChange: (value: EmergencyContactValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function EmergencyContact({
  value,
  onChange,
  onNext,
  onBack,
}: EmergencyContactProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: emergencyContactValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "emergency-contact-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="YDP Community Sports Training Programme"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Emergency contact"
    >
      <Input
        aria-required="true"
        error={fieldErrors.emergencyFirstName}
        id="emergency-contact-emergencyFirstName"
        label="First name"
        onChange={(e) => handleChange("emergencyFirstName", e.target.value)}
        required
        value={value.emergencyFirstName || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.emergencyLastName}
        id="emergency-contact-emergencyLastName"
        label="Last name"
        onChange={(e) => handleChange("emergencyLastName", e.target.value)}
        required
        value={value.emergencyLastName || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.emergencyAddressLine1}
        id="emergency-contact-emergencyAddressLine1"
        label="Address line 1"
        onChange={(e) => handleChange("emergencyAddressLine1", e.target.value)}
        required
        value={value.emergencyAddressLine1 || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.emergencyAddressLine2}
        id="emergency-contact-emergencyAddressLine2"
        label="Address line 2"
        onChange={(e) => handleChange("emergencyAddressLine2", e.target.value)}
        required
        value={value.emergencyAddressLine2 || ""}
      />

      <Select
        error={fieldErrors.emergencyParish}
        id="emergency-contact-emergencyParish"
        label="Parish"
        onChange={(e) => handleChange("emergencyParish", e.target.value)}
        required
        value={value.emergencyParish || ""}
      >
          <option value="christ-church">Christ Church</option>
          <option value="st-andrew">St. Andrew</option>
          <option value="st-george">St. George</option>
          <option value="st-james">St. James</option>
          <option value="st-john">St. John</option>
          <option value="st-joseph">St. Joseph</option>
          <option value="st-lucy">St. Lucy</option>
          <option value="st-michael">St. Michael</option>
          <option value="st-peter">St. Peter</option>
          <option value="st-philip">St. Philip</option>
          <option value="st-thomas">St. Thomas</option>
      </Select>

      <Input
        aria-required="true"
        error={fieldErrors.emergencyTelephoneNumber}
        id="emergency-contact-emergencyTelephoneNumber"
        label="Telephone number"
        onChange={(e) => handleChange("emergencyTelephoneNumber", e.target.value)}
        required
        value={value.emergencyTelephoneNumber || ""}
      />
    </StepContainer>
  );
}
