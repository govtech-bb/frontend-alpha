"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Radio, RadioGroup } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { licenseTypeValidation } from "../schema";

type LicenseTypeProps = {
  value: "river" | "sea" | "";
  onChange: (value: "river" | "sea") => void;
  onNext: () => void;
};

/**
 * Step 1: License Type Selection
 *
 * Branching decision point - determines which subsequent steps are shown.
 * User chooses between river fishing or sea fishing license.
 */
export function LicenseType({ value, onChange, onNext }: LicenseTypeProps) {
  const titleRef = useStepFocus("License type", "Fishing License");

  // Wrap value for validation hook (expects object)
  const formValue = { licenseType: value === "" ? undefined : value };
  const handleFormChange = (newValue: { licenseType?: "river" | "sea" }) => {
    if (newValue.licenseType) {
      onChange(newValue.licenseType);
    }
  };

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: licenseTypeValidation,
      value: formValue,
      onChange: handleFormChange,
      onNext,
      fieldPrefix: "licenseType-",
    }
  );

  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

  const handleErrorClick = (error: ErrorItem, event: React.MouseEvent) => {
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
            className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
            ref={titleRef}
            tabIndex={-1}
          >
            What type of fishing license do you need?
          </h1>

          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              title="There is a problem"
            />
          )}

          <RadioGroup
            aria-describedby={
              fieldErrors.licenseType
                ? "licenseType-licenseType-error"
                : undefined
            }
            aria-invalid={!!fieldErrors.licenseType}
            aria-label="License type"
            onValueChange={(val) =>
              handleChange("licenseType", val as "river" | "sea")
            }
            value={value || undefined}
          >
            <Radio
              hint="For freshwater fishing in rivers, streams, and inland waterways"
              id="licenseType-river"
              label="River fishing"
              value="river"
            />
            <Radio
              hint="For saltwater fishing in coastal waters and the open sea"
              id="licenseType-sea"
              label="Sea fishing"
              value="sea"
            />
          </RadioGroup>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
}
