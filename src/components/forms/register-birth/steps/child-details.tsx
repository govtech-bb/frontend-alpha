"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  ErrorSummary,
  Input,
  Radio,
  RadioGroup,
} from "@govtech-bb/react";
import { DateInput } from "../../common/date-input";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { childDetailsValidation } from "../schema";
import type { ChildDetails as ChildDetailsType } from "../types";

type ChildDetailsProps = {
  value: Partial<ChildDetailsType>;
  onChange: (value: Partial<ChildDetailsType>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Child's Details
 * Collects information about the child being registered
 */
export function ChildDetails({
  value,
  onChange,
  onNext,
  onBack,
}: ChildDetailsProps) {
  const titleRef = useStepFocus("Tell us about the child", "Register a Birth");

  // Use generic validation hook
  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: childDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "child-",
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
            Tell us about the child
          </h1>

          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              title="There is a problem"
            />
          )}

          {/* First name(s) */}
          <Input
            error={fieldErrors.firstNames}
            id="child-firstNames"
            label="First name"
            onChange={(e) => handleChange("firstNames", e.target.value)}
            type="text"
            value={value.firstNames || ""}
          />

          {/* Middle name(s) */}
          <Input
            description="If they have more than one, add them in order"
            id="child-middleNames"
            label="Middle name(s)"
            onChange={(e) => handleChange("middleNames", e.target.value)}
            type="text"
            value={value.middleNames || ""}
          />

          {/* Last name (prefilled) */}
          <Input
            error={fieldErrors.lastName}
            id="child-lastName"
            label="Last name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
            value={value.lastName || ""}
          />

          {/* Date of birth */}
          <DateInput
            errors={dateFieldErrors.dateOfBirth}
            hint="For example, 27 3 2007 or 27 Mar 2007"
            id="child-dateOfBirth"
            label="Date of birth"
            onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
            value={value.dateOfBirth || ""}
          />

          {/* Sex at birth */}
          <fieldset>
            <legend className="font-bold text-[24px]">Sex at birth</legend>
            <p className="mb-4 text-[20px] leading-[1.7]">
              We ask this so that we can monitor population trends.
            </p>
            {fieldErrors.sexAtBirth && (
              <p className="mb-4 text-red-600" id="child-sexAtBirth-error">
                {fieldErrors.sexAtBirth}
              </p>
            )}
            <RadioGroup
              aria-describedby={
                fieldErrors.sexAtBirth ? "child-sexAtBirth-error" : undefined
              }
              aria-invalid={!!fieldErrors.sexAtBirth}
              aria-label="Sex at birth"
              onValueChange={(val) =>
                handleChange("sexAtBirth", val as "Male" | "Female")
              }
              value={value.sexAtBirth || undefined}
            >
              <Radio id="child-sexAtBirth-male" label="Male" value="Male" />
              <Radio
                id="child-sexAtBirth-female"
                label="Female"
                value="Female"
              />
            </RadioGroup>
          </fieldset>

          {/* Place of birth */}
          <div>
            <label
              className="block font-bold text-[20px] leading-[1.7]"
              htmlFor="child-parishOfBirth"
            >
              Place of birth
            </label>
            <div className="mb-2 text-[20px] leading-[1.7]">
              <p className="mb-4">
                Include the town and parish in your answer.
              </p>
              <p>
                For example, Queen Elizabeth Hospital, Bridgetown, St. Michael.
                <br />
                Or a home address if they were born at home.
              </p>
            </div>
            <Input
              error={fieldErrors.parishOfBirth}
              id="child-parishOfBirth"
              onChange={(e) => handleChange("parishOfBirth", e.target.value)}
              type="text"
              value={value.parishOfBirth || ""}
            />
          </div>
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
