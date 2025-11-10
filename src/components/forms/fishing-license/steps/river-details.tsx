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
import { riverDetailsValidation } from "../schema";

type RiverDetailsValue = {
  preferredLocation: string;
  equipmentType: string;
  experienceLevel: "beginner" | "intermediate" | "advanced" | "";
};

type RiverDetailsProps = {
  value: Partial<RiverDetailsValue>;
  onChange: (value: Partial<RiverDetailsValue>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step 2a: River Fishing Details
 *
 * Collects river-specific information for the fishing license application.
 * Only shown when user selects "river" in the license type step.
 */
export function RiverDetails({
  value,
  onChange,
  onNext,
  onBack,
}: RiverDetailsProps) {
  const titleRef = useStepFocus("River fishing details", "Fishing License");

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: riverDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "river-",
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
            River fishing details
          </h1>

          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              title="There is a problem"
            />
          )}

          <Input
            error={fieldErrors.preferredLocation}
            hint="For example, Codrington River, Constitution River, or St. Lucy"
            id="river-preferredLocation"
            label="Preferred river or location"
            onChange={(e) => handleChange("preferredLocation", e.target.value)}
            value={value.preferredLocation || ""}
          />

          <Select
            error={fieldErrors.equipmentType}
            hint="Select the primary equipment you will use"
            id="river-equipmentType"
            label="Fishing equipment type"
            onChange={(e) => handleChange("equipmentType", e.target.value)}
            value={value.equipmentType || ""}
          >
            <option value="">Select an option</option>
            <option value="rod-and-reel">Rod and reel</option>
            <option value="fly-fishing">Fly fishing gear</option>
            <option value="net">Net fishing</option>
            <option value="trap">Trap/cage</option>
            <option value="other">Other equipment</option>
          </Select>

          <fieldset className="border-0 p-0">
            <legend className="mb-2 font-bold text-[19px]">
              Experience level
            </legend>
            <RadioGroup
              aria-describedby={
                fieldErrors.experienceLevel
                  ? "river-experienceLevel-error"
                  : undefined
              }
              aria-invalid={!!fieldErrors.experienceLevel}
              aria-label="Experience level"
              onValueChange={(val) =>
                handleChange(
                  "experienceLevel",
                  val as "beginner" | "intermediate" | "advanced"
                )
              }
              value={value.experienceLevel || undefined}
            >
              <Radio
                hint="Less than 1 year of experience"
                id="river-beginner"
                label="Beginner"
                value="beginner"
              />
              <Radio
                hint="1-5 years of experience"
                id="river-intermediate"
                label="Intermediate"
                value="intermediate"
              />
              <Radio
                hint="More than 5 years of experience"
                id="river-advanced"
                label="Advanced"
                value="advanced"
              />
            </RadioGroup>
            {fieldErrors.experienceLevel && (
              <p
                className="mt-2 text-[16px] text-red-dark"
                id="river-experienceLevel-error"
              >
                {fieldErrors.experienceLevel}
              </p>
            )}
          </fieldset>
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
