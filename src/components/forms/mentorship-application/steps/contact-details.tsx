/**
 * Your contact details
 * Collects address line 1, address line 2, parish, telephone number, email address
 */

import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { Input, Select } from "@govtech-bb/react";
import { contactDetailsValidation } from "../schema";

export type ContactDetailsValue = {
  addressLine1?: string;
  addressLine2?: string;
  parish?: string;
  telephoneNumber?: string;
  emailAddress?: string;
};

export type ContactDetailsProps = {
  value: ContactDetailsValue;
  onChange: (value: ContactDetailsValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ContactDetails({
  value,
  onChange,
  onNext,
  onBack,
}: ContactDetailsProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: contactDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "contact-details-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="Mentorship Application"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Your contact details"
    >
      <Input
        aria-required="true"
        error={fieldErrors.addressLine1}
        id="contact-details-addressLine1"
        label="Address line 1"
        onChange={(e) => handleChange("addressLine1", e.target.value)}
        required
        value={value.addressLine1 || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.addressLine2}
        id="contact-details-addressLine2"
        label="Address line 2"
        onChange={(e) => handleChange("addressLine2", e.target.value)}
        required
        value={value.addressLine2 || ""}
      />

      <Select
        error={fieldErrors.parish}
        id="contact-details-parish"
        label="Parish"
        onChange={(e) => handleChange("parish", e.target.value)}
        required
        value={value.parish || ""}
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
        error={fieldErrors.telephoneNumber}
        id="contact-details-telephoneNumber"
        label="Telephone number"
        onChange={(e) => handleChange("telephoneNumber", e.target.value)}
        required
        value={value.telephoneNumber || ""}
      />

      <Input
        aria-required="true"
        error={fieldErrors.emailAddress}
        id="contact-details-emailAddress"
        label="Email address"
        onChange={(e) => handleChange("emailAddress", e.target.value)}
        required
        value={value.emailAddress || ""}
      />
    </StepContainer>
  );
}
