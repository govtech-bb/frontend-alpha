"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  ErrorSummary,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { seaDetailsValidation } from "../schema";

type SeaDetailsValue = {
  hasBoat: "yes" | "no" | "";
  vesselRegistration?: string;
  intendedZone: string;
};

type SeaDetailsProps = {
  value: Partial<SeaDetailsValue>;
  onChange: (value: Partial<SeaDetailsValue>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step 2b: Sea Fishing Details
 *
 * Collects sea-specific information for the fishing license application.
 * Only shown when user selects "sea" in the license type step.
 */
export function SeaDetails({
  value,
  onChange,
  onNext,
  onBack,
}: SeaDetailsProps) {
  const titleRef = useStepFocus("Sea fishing details", "Fishing License");

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: seaDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "sea-",
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

  const showVesselRegistration = value.hasBoat === "yes";

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
            Sea fishing details
          </h1>

          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              title="There is a problem"
            />
          )}

          <fieldset className="border-0 p-0">
            <legend className="mb-2 font-bold text-[19px]">
              Do you own a boat?
            </legend>
            <RadioGroup
              aria-describedby={
                fieldErrors.hasBoat ? "sea-hasBoat-error" : undefined
              }
              aria-invalid={!!fieldErrors.hasBoat}
              aria-label="Boat ownership"
              onValueChange={(val) =>
                handleChange("hasBoat", val as "yes" | "no")
              }
              value={value.hasBoat || undefined}
            >
              <Radio id="sea-hasBoat-yes" label="Yes" value="yes" />
              <Radio id="sea-hasBoat-no" label="No" value="no" />
            </RadioGroup>
            {fieldErrors.hasBoat && (
              <p
                className="mt-2 text-[16px] text-red-dark"
                id="sea-hasBoat-error"
              >
                {fieldErrors.hasBoat}
              </p>
            )}
          </fieldset>

          {showVesselRegistration && (
            <Input
              error={fieldErrors.vesselRegistration}
              hint="Enter your boat's registration number"
              id="sea-vesselRegistration"
              label="Vessel registration number"
              onChange={(e) =>
                handleChange("vesselRegistration", e.target.value)
              }
              value={value.vesselRegistration || ""}
            />
          )}

          <Select
            error={fieldErrors.intendedZone}
            hint="Select the primary area where you plan to fish"
            id="sea-intendedZone"
            label="Intended fishing zone"
            onChange={(e) => handleChange("intendedZone", e.target.value)}
            value={value.intendedZone || ""}
          >
            <option value="">Select an option</option>
            <option value="coastal-waters">
              Coastal waters (within 3 miles)
            </option>
            <option value="offshore">Offshore (3-12 miles)</option>
            <option value="deep-sea">Deep sea (beyond 12 miles)</option>
            <option value="reef-fishing">Reef fishing</option>
            <option value="sport-fishing">Sport fishing grounds</option>
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
