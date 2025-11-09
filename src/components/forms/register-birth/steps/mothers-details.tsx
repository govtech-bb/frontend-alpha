"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  ErrorSummary,
  Input,
  Radio,
  RadioGroup,
  ShowHide,
  TextArea,
} from "@govtech-bb/react";
import { DateInput } from "../../common/date-input";
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

  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: motherDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "mother-",
    });

  // Convert ValidationError[] to ErrorItem[] for ErrorSummary
  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-2 font-bold text-[56px] leading-[1.15]"
        ref={titleRef}
        tabIndex={-1}
      >
        Tell us about the child's mother
      </h1>

      {errorItems.length > 0 && (
        <ErrorSummary
          errors={errorItems}
          onErrorClick={handleErrorClick}
          title="There is a problem"
        />
      )}

      {/* First name */}
      <Input
        error={fieldErrors.firstName}
        id="mother-firstName"
        label="First name"
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

          {value.hadOtherSurname === "yes" && (
            <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
              <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
                <Input
                  className="w-80"
                  id="mother-otherSurname"
                  label="Previous last name"
                  onChange={(e) => handleChange("otherSurname", e.target.value)}
                  type="text"
                  value={value.otherSurname || ""}
                />
              </div>
            </div>
          )}
          <Radio id="mother-hadOtherSurname-no" label="No" value="no" />
        </RadioGroup>
      </div>

      {/* Date of birth */}
      <DateInput
        errors={dateFieldErrors.dateOfBirth}
        hint="For example, 27 3 2007 or 27 Mar 2007"
        id="mother-dateOfBirth"
        label="Date of birth"
        onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
        value={value.dateOfBirth || ""}
      />

      {/* Address */}
      <TextArea
        error={fieldErrors.address}
        id="mother-address"
        label="Current address"
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
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          placeholder="123456-7890"
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />

        {/* Passport number disclosure */}
        <ShowHide summary="Use passport number instead">
          <div>
            <p className="mb-4 text-[20px] text-neutral-midgrey leading-[1.7]">
              If you don't have a National Registration number, you can use your
              passport number instead.
            </p>
            <Input
              error={fieldErrors.passportNumber}
              id="father-passportNumber"
              label="Passport number"
              onChange={(e) => handleChange("passportNumber", e.target.value)}
              type="text"
              value={value.passportNumber || ""}
            />
          </div>
        </ShowHide>
      </div>

      {/* Occupation */}
      <Input
        description="This will be included on the child's birth certificate and in official records."
        id="mother-occupation"
        label="Occupation"
        onChange={(e) => handleChange("occupation", e.target.value)}
        type="text"
        value={value.occupation || ""}
      />

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
