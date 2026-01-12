"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  DateInput,
  ErrorSummary,
  Input,
  Select,
} from "@govtech-bb/react";
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
            description="For example, 27 3 2007"
            error={dateFieldErrors.dateOfBirth || fieldErrors.dateOfBirth}
            id="child-dateOfBirth"
            label="Date of birth"
            name="child-dateOfBirth"
            onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
            value={value.dateOfBirth}
          />

          {/* Sex */}
          <Select
            error={fieldErrors.sexAtBirth}
            id="child-sexAtBirth"
            label="Sex"
            onChange={(e) =>
              handleChange("sexAtBirth", e.target.value as "Male" | "Female")
            }
            value={value.sexAtBirth || ""}
          >
            <option key="male" value="Male">
              Male
            </option>
            <option key="female" value="Female">
              Female
            </option>
          </Select>
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
