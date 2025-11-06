"use client";

import { Button, ErrorSummary, Input } from "@/components/ds";
import { validateDateFields } from "@/lib/date-validation";
import { DateInput } from "../../common/date-input";
import { FormFieldError } from "../../common/form-field-error";
import { getTextareaClassName } from "../../common/form-utils";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { fatherDetailsValidation } from "../schema";
import type { PersonDetails } from "../types";

type FathersDetailsProps = {
  value: Partial<PersonDetails>;
  onChange: (value: Partial<PersonDetails>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Father's Details
 * Collects comprehensive information about the father
 * Based on PDF page 2
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity from JSX conditional rendering, validation logic extracted to hook
export function FathersDetails({
  value,
  onChange,
  onNext,
  onBack,
}: FathersDetailsProps) {
  const titleRef = useStepFocus(
    "Tell us about the child's father",
    "Register a Birth"
  );

  const {
    errors,
    fieldErrors,
    hasSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useStepValidation({
    schema: fatherDetailsValidation,
    value,
    onChange,
    onNext,
    fieldPrefix: "father-",
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Tell us about the child's father
      </h1>

      <ErrorSummary errors={errors} title="There is a problem" />

      {/* First name */}
      <div>
        <Input
          error={fieldErrors.firstName}
          id="father-firstName"
          label="First name"
          onBlur={() => handleBlur("firstName")}
          onChange={(e) => handleChange("firstName", e.target.value)}
          type="text"
          value={value.firstName || ""}
        />
      </div>

      {/* Middle name */}
      <div>
        <Input
          description="If they have more than one, add them in order"
          id="father-middleName"
          label="Middle name(s)"
          onChange={(e) => handleChange("middleName", e.target.value)}
          type="text"
          value={value.middleName || ""}
        />
      </div>

      {/* Last name */}
      <div>
        <Input
          error={fieldErrors.lastName}
          id="father-lastName"
          label="Last name"
          onBlur={() => handleBlur("lastName")}
          onChange={(e) => handleChange("lastName", e.target.value)}
          type="text"
          value={value.lastName || ""}
        />
      </div>

      {/* Date of birth */}
      <DateInput
        errors={
          hasSubmitted
            ? (validateDateFields(value.dateOfBirth || "") ?? undefined)
            : undefined
        }
        hint="For example, 27 3 2007"
        id="father-dateOfBirth"
        label="Date of birth"
        onBlur={() => handleBlur("dateOfBirth")}
        onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
        value={value.dateOfBirth || ""}
      />

      {/* Address */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="father-address"
        >
          Current address
        </label>
        <textarea
          aria-describedby={
            fieldErrors.address ? "father-address-error" : undefined
          }
          aria-invalid={fieldErrors.address ? true : undefined}
          className={getTextareaClassName("address", fieldErrors)}
          id="father-address"
          onBlur={() => handleBlur("address")}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
          value={value.address || ""}
        />
        <FormFieldError id="father-address" message={fieldErrors.address} />
      </div>

      {/* National registration number */}
      <div>
        <Input
          error={fieldErrors.nationalRegistrationNumber}
          id="father-nationalRegistrationNumber"
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
              id="father-passportNumber"
              label="Passport number"
              onBlur={() => handleBlur("passportNumber")}
              onChange={(e) => handleChange("passportNumber", e.target.value)}
              type="text"
              value={value.passportNumber || ""}
            />
          </div>
        </details>
      </div>

      {/* Occupation */}
      <div>
        <Input
          description="This will be included on the child's birth certificate and in official records."
          error={fieldErrors.occupation}
          id="father-occupation"
          label="Occupation"
          onBlur={() => handleBlur("occupation")}
          onChange={(e) => handleChange("occupation", e.target.value)}
          type="text"
          value={value.occupation || ""}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>

        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
}
