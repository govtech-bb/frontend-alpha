"use client";

import { Button, Input, Radio, RadioGroup, TextArea } from "@govtech-bb/react";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { motherDetailsValidation } from "../schema";
import type { PersonDetails } from "../types";

type MothersDetailsProps = {
  value: Partial<PersonDetails>;
  onChange: (value: Partial<PersonDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Mother's Details
 * Collects information about the mother
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity from JSX conditional rendering, validation logic extracted to hook
export function MothersDetails({
  value,
  onChange,
  onNext,
  onBack,
}: MothersDetailsProps) {
  const titleRef = useStepFocus(
    "Tell us about the child's mother",
    "Register a Birth"
  );

  const { errors, fieldErrors, handleChange, handleBlur, handleSubmit } =
    useStepValidation({
      schema: motherDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "mother-",
    });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight"
        ref={titleRef}
        tabIndex={-1}
      >
        Tell us about the child's mother
      </h1>

      <ErrorSummary errors={errors} />

      {/* First name */}
      <Input
        error={fieldErrors.firstName}
        id="mother-firstName"
        label="First name"
        onBlur={() => handleBlur("firstName")}
        onChange={(e) => handleChange("firstName", e.target.value)}
        type="text"
        value={value.firstName || ""}
      />

      {/* Middle name */}
      <Input
        description="If they have more than one, add them in order"
        id="mother-middleName"
        label="Middle name(s)"
        onChange={(e) => handleChange("middleName", e.target.value)}
        type="text"
        value={value.middleName || ""}
      />

      {/* Last name */}
      <Input
        error={fieldErrors.lastName}
        id="mother-lastName"
        label="Last name"
        onBlur={() => handleBlur("lastName")}
        onChange={(e) => handleChange("lastName", e.target.value)}
        type="text"
        value={value.lastName || ""}
      />

      {/* Had other surname */}
      <div>
        <RadioGroup
          description="For example, a maiden name"
          label="Has the mother had any other last name?"
          onValueChange={(val) => handleChange("hadOtherSurname", val)}
          value={value.hadOtherSurname || ""}
        >
          <Radio id="mother-hadOtherSurname-yes" label="Yes" value="yes" />
          <Radio id="mother-hadOtherSurname-no" label="No" value="no" />
        </RadioGroup>

        {value.hadOtherSurname === "yes" && (
          <div className="mt-4">
            <Input
              id="mother-otherSurname"
              label="What was it"
              onChange={(e) => handleChange("otherSurname", e.target.value)}
              type="text"
              value={value.otherSurname || ""}
            />
          </div>
        )}
      </div>

      {/* Date of birth */}
      <Input
        description="For example, 07/30/1986"
        error={fieldErrors.dateOfBirth}
        id="mother-dateOfBirth"
        label="Date of birth"
        onBlur={() => handleBlur("dateOfBirth")}
        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        placeholder="MM/DD/YYYY"
        type="text"
        value={value.dateOfBirth || ""}
      />

      {/* Address */}
      <TextArea
        error={fieldErrors.address}
        id="mother-address"
        label="Current address"
        onBlur={() => handleBlur("address")}
        onChange={(e) => handleChange("address", e.target.value)}
        rows={3}
        value={value.address || ""}
      />

      {/* National registration number */}
      <div>
        <Input
          error={fieldErrors.nationalRegistrationNumber}
          id="mother-nationalRegistrationNumber"
          label="National registration number"
          onBlur={() => handleBlur("nationalRegistrationNumber")}
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          placeholder="123456-7890"
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />

        {/* Passport number disclosure */}
        <details className="mt-4">
          <summary className="cursor-pointer list-none text-[#1E787D] underline">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block transition-transform [details[open]_&]:rotate-90">
                ▸
              </span>
              Use passport number instead
            </span>
          </summary>
          <div className="mt-4">
            <p className="mb-4 text-base text-gray-600">
              If you don't have a National Registration number, you can use your
              passport number instead.
            </p>
            <Input
              error={fieldErrors.passportNumber}
              id="mother-passportNumber"
              label="Passport number"
              onBlur={() => handleBlur("passportNumber")}
              onChange={(e) => handleChange("passportNumber", e.target.value)}
              type="text"
              value={value.passportNumber || ""}
            />
          </div>
        </details>
      </div>

      {/* Occupation (optional) */}
      <Input
        description="This will be included on the child's birth certificate and in official records."
        id="mother-occupation"
        label="Occupation (optional)"
        onChange={(e) => handleChange("occupation", e.target.value)}
        type="text"
        value={value.occupation || ""}
      />

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
