"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  ErrorSummary,
  Input,
  Select,
  ShowHide,
  TextArea,
} from "@govtech-bb/react";
import { barbadosParishes } from "@/data/constants";
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

  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: fatherDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "father-",
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
    <form
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      onSubmit={handleSubmit}
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <h1
            className="mb-4 font-bold text-[56px] leading-[1.15] focus:outline-none lg:mb-2"
            ref={titleRef}
            tabIndex={-1}
          >
            Tell us about the child's father
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
            id="father-firstName"
            label="First name"
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
            value={value.firstName || ""}
          />

          {/* Middle name */}
          <Input
            description="If they have more than one, add them in order"
            id="father-middleName"
            label="Middle name(s)"
            onChange={(e) => handleChange("middleName", e.target.value)}
            type="text"
            value={value.middleName || ""}
          />

          {/* Last name */}
          <Input
            error={fieldErrors.lastName}
            id="father-lastName"
            label="Last name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            value={value.lastName || ""}
          />

          {/* National Identification (ID) number */}
          <div>
            <Input
              error={fieldErrors.nationalRegistrationNumber}
              id="father-nationalRegistrationNumber"
              label="National Identification (ID) number"
              onChange={(e) =>
                handleChange("nationalRegistrationNumber", e.target.value)
              }
              placeholder="123456-7890"
              type="text"
              value={value.nationalRegistrationNumber || ""}
            />

            {/* Passport number disclosure */}
            <ShowHide className="mt-3" summary="Use passport number instead">
              <div>
                <p className="mb-4 text-[20px] text-neutral-midgrey leading-[1.7]">
                  If you don't have a National Identification number, you can
                  use your passport number instead.
                </p>
                <div className="space-y-2">
                  <Input
                    error={fieldErrors.passportNumber}
                    id="father-passportNumber"
                    label="Passport number"
                    onChange={(e) =>
                      handleChange("passportNumber", e.target.value)
                    }
                    type="text"
                    value={value.passportNumber || ""}
                  />
                  <Input
                    error={fieldErrors.passportPlaceOfIssue}
                    id="father-passportPlaceOfIssue"
                    label="Place of issue"
                    onChange={(e) =>
                      handleChange("passportPlaceOfIssue", e.target.value)
                    }
                    type="text"
                    value={value.passportPlaceOfIssue || ""}
                  />
                </div>
              </div>
            </ShowHide>
          </div>

          <hr className="my-5 border-2 border-gray-200" />

          <h2 className="mb-4 font-bold text-[40px] leading-[1.25]">
            Current address
          </h2>

          {/* Parish */}
          <Select
            error={fieldErrors.parish}
            id="father-parish"
            label="Parish"
            onChange={(e) => handleChange("parish", e.target.value)}
            value={value.parish || ""}
          >
            {barbadosParishes.map((parish) => (
              <option key={parish.value} value={parish.value}>
                {parish.label}
              </option>
            ))}
          </Select>

          {/* Street address */}
          <TextArea
            error={fieldErrors.streetAddress}
            id="father-streetAddress"
            label="Street address"
            onChange={(e) => handleChange("streetAddress", e.target.value)}
            rows={3}
            value={value.streetAddress || ""}
          />

          <hr className="my-5 border-2 border-gray-200" />

          {/* Occupation */}
          <Input
            description="This will be included on the child's birth certificate and in official records."
            id="father-occupation"
            label="Occupation"
            onChange={(e) => handleChange("occupation", e.target.value)}
            type="text"
            value={value.occupation || ""}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={onBack} type="button" variant="secondary">
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
}
