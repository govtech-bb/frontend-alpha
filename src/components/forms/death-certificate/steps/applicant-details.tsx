/**
 * Step 1: Applicant Details
 * Collects applicant's name, address, and National Registration Number
 */

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Input, TextArea } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { applicantDetailsValidation } from "../schema";

export type ApplicantDetailsValue = {
  applicantName?: string;
  applicantAddress?: string;
  applicantNationalRegistrationNo?: string;
};

export type ApplicantDetailsProps = {
  value: ApplicantDetailsValue;
  onChange: (value: ApplicantDetailsValue) => void;
  onNext: () => void;
};

export function ApplicantDetails({
  value,
  onChange,
  onNext,
}: ApplicantDetailsProps) {
  const titleRef = useStepFocus(
    "Applicant's Details",
    "Death Certificate Application"
  );

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: applicantDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "applicant-details-",
    }
  );

  // Map ValidationError[] to ErrorItem[] for @govtech-bb/react ErrorSummary
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
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="pt-2 lg:pt-0">
            <h1
              className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
              ref={titleRef}
              tabIndex={-1}
            >
              Applicant&apos;s Details
            </h1>

            {errorItems.length > 0 && (
              <ErrorSummary
                errors={errorItems}
                onErrorClick={handleErrorClick}
                title="There is a problem"
              />
            )}
          </div>

          <Input
            aria-required="true"
            error={fieldErrors.applicantName}
            id="applicant-details-applicantName"
            label="Your full name"
            onChange={(e) => handleChange("applicantName", e.target.value)}
            required
            value={value.applicantName || ""}
          />

          <TextArea
            aria-required="true"
            error={fieldErrors.applicantAddress}
            id="applicant-details-applicantAddress"
            label="Your address"
            onChange={(e) => handleChange("applicantAddress", e.target.value)}
            required
            rows={4}
            value={value.applicantAddress || ""}
          />

          <Input
            aria-required="true"
            error={fieldErrors.applicantNationalRegistrationNo}
            hint="For example, ABC-123456"
            id="applicant-details-applicantNationalRegistrationNo"
            label="Your National Registration Number"
            onChange={(e) =>
              handleChange("applicantNationalRegistrationNo", e.target.value)
            }
            required
            value={value.applicantNationalRegistrationNo || ""}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
}
