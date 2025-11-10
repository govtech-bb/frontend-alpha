"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  ErrorSummary,
  Input,
  Radio,
  RadioGroup,
} from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { additionalQuestionsValidation } from "../schema";

type AdditionalQuestionsValue = {
  fullName: string;
  email: string;
  phone: string;
  licenseDuration: "1" | "3" | "5" | "";
  emergencyContactName: string;
  emergencyContactPhone: string;
};

type AdditionalQuestionsProps = {
  value: Partial<AdditionalQuestionsValue>;
  onChange: (value: Partial<AdditionalQuestionsValue>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step 3: Additional Questions
 *
 * Collects applicant contact information and license preferences.
 * Common step shown for both river and sea fishing paths.
 */
export function AdditionalQuestions({
  value,
  onChange,
  onNext,
  onBack,
}: AdditionalQuestionsProps) {
  const titleRef = useStepFocus("Your details", "Fishing License");

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: additionalQuestionsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "additional-",
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
            Your details
          </h1>

          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              title="There is a problem"
            />
          )}

          <h2 className="mt-4 font-bold text-[24px]">Personal information</h2>

          <Input
            error={fieldErrors.fullName}
            hint="Enter your full legal name as it appears on official documents"
            id="additional-fullName"
            label="Full name"
            onChange={(e) => handleChange("fullName", e.target.value)}
            value={value.fullName || ""}
          />

          <Input
            error={fieldErrors.email}
            hint="We'll send your license confirmation to this address"
            id="additional-email"
            label="Email address"
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            value={value.email || ""}
          />

          <Input
            error={fieldErrors.phone}
            hint="Include country code if outside Barbados"
            id="additional-phone"
            label="Phone number"
            onChange={(e) => handleChange("phone", e.target.value)}
            type="tel"
            value={value.phone || ""}
          />

          <fieldset className="mt-6 border-0 p-0">
            <legend className="mb-2 font-bold text-[24px]">
              License duration
            </legend>
            <p className="mb-4 text-[16px] text-gray-700">
              How long would you like your fishing license to be valid?
            </p>
            <RadioGroup
              aria-describedby={
                fieldErrors.licenseDuration
                  ? "additional-licenseDuration-error"
                  : undefined
              }
              aria-invalid={!!fieldErrors.licenseDuration}
              aria-label="License duration"
              onValueChange={(val) =>
                handleChange("licenseDuration", val as "1" | "3" | "5")
              }
              value={value.licenseDuration || undefined}
            >
              <Radio
                hint="$50 - Valid until December 31st of current year"
                id="additional-duration-1"
                label="1 year"
                value="1"
              />
              <Radio
                hint="$120 - Save $30 compared to annual renewals"
                id="additional-duration-3"
                label="3 years"
                value="3"
              />
              <Radio
                hint="$175 - Save $75 compared to annual renewals"
                id="additional-duration-5"
                label="5 years"
                value="5"
              />
            </RadioGroup>
            {fieldErrors.licenseDuration && (
              <p
                className="mt-2 text-[16px] text-red-dark"
                id="additional-licenseDuration-error"
              >
                {fieldErrors.licenseDuration}
              </p>
            )}
          </fieldset>

          <h2 className="mt-6 font-bold text-[24px]">Emergency contact</h2>
          <p className="text-[16px] text-gray-700">
            Provide details of someone we can contact in case of emergency while
            you're fishing.
          </p>

          <Input
            error={fieldErrors.emergencyContactName}
            id="additional-emergencyContactName"
            label="Emergency contact name"
            onChange={(e) =>
              handleChange("emergencyContactName", e.target.value)
            }
            value={value.emergencyContactName || ""}
          />

          <Input
            error={fieldErrors.emergencyContactPhone}
            id="additional-emergencyContactPhone"
            label="Emergency contact phone number"
            onChange={(e) =>
              handleChange("emergencyContactPhone", e.target.value)
            }
            type="tel"
            value={value.emergencyContactPhone || ""}
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
