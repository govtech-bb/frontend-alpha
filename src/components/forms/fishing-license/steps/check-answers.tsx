"use client";

import { Button } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { finalSubmissionSchema } from "../schema";
import type { PartialFishingLicenseFormData, StepName } from "../types";

type CheckAnswersProps = {
  formData: PartialFishingLicenseFormData;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: StepName) => void;
  submissionError?: string | null;
  isSubmitting?: boolean;
};

/**
 * Step 4: Check Your Answers
 *
 * Displays a summary of all collected information before final submission.
 * Validates that all required data is present.
 * Allows user to edit individual sections.
 */
export function CheckAnswers({
  formData,
  onSubmit,
  onBack,
  onEdit,
  submissionError,
  isSubmitting,
}: CheckAnswersProps) {
  const titleRef = useStepFocus("Check your answers", "Fishing License");

  // Validate complete data
  const validationResult = finalSubmissionSchema.safeParse(formData);
  const hasMissingData = !validationResult.success;

  if (hasMissingData) {
    return (
      <div className="container py-8">
        <h1 className="mb-4 font-bold text-[56px] leading-[1.15]">
          Missing or invalid information
        </h1>
        <p className="mb-6 text-[20px] leading-[1.7]">
          Please go back and complete all steps correctly before submitting your
          application.
        </p>
        <Button onClick={onBack}>Back</Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const licenseDurationLabel =
    formData.licenseDuration === "1"
      ? "1 year"
      : formData.licenseDuration === "3"
        ? "3 years"
        : "5 years";

  return (
    <form
      className="container space-y-8 pt-8 pb-8 lg:pb-16"
      onSubmit={handleSubmit}
    >
      <h1
        className="mb-4 font-bold text-[56px] leading-[1.15]"
        ref={titleRef}
        tabIndex={-1}
      >
        Check your answers before submitting
      </h1>

      <div className="space-y-6">
        {/* License Type Section */}
        <div className="border-gray-300 border-l-4 pl-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[24px]">License type</h2>
            <button
              className="text-[19px] text-teal-dark underline"
              onClick={() => onEdit("license-type")}
              type="button"
            >
              Change
            </button>
          </div>
          <dl className="space-y-2">
            <div>
              <dt className="font-bold">Type</dt>
              <dd>
                {formData.licenseType === "river"
                  ? "River fishing"
                  : "Sea fishing"}
              </dd>
            </div>
          </dl>
        </div>

        {/* River-specific details */}
        {formData.licenseType === "river" && (
          <div className="border-gray-300 border-l-4 pl-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-[24px]">River fishing details</h2>
              <button
                className="text-[19px] text-teal-dark underline"
                onClick={() => onEdit("river-details")}
                type="button"
              >
                Change
              </button>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="font-bold">Preferred location</dt>
                <dd>{formData.preferredLocation}</dd>
              </div>
              <div>
                <dt className="font-bold">Equipment type</dt>
                <dd>{formData.equipmentType}</dd>
              </div>
              <div>
                <dt className="font-bold">Experience level</dt>
                <dd className="capitalize">{formData.experienceLevel}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* Sea-specific details */}
        {formData.licenseType === "sea" && (
          <div className="border-gray-300 border-l-4 pl-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-[24px]">Sea fishing details</h2>
              <button
                className="text-[19px] text-teal-dark underline"
                onClick={() => onEdit("sea-details")}
                type="button"
              >
                Change
              </button>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="font-bold">Boat ownership</dt>
                <dd>{formData.hasBoat === "yes" ? "Yes" : "No"}</dd>
              </div>
              {formData.hasBoat === "yes" && formData.vesselRegistration && (
                <div>
                  <dt className="font-bold">Vessel registration</dt>
                  <dd>{formData.vesselRegistration}</dd>
                </div>
              )}
              <div>
                <dt className="font-bold">Intended fishing zone</dt>
                <dd>{formData.intendedZone}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* Personal information */}
        <div className="border-gray-300 border-l-4 pl-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-[24px]">Your details</h2>
            <button
              className="text-[19px] text-teal-dark underline"
              onClick={() => onEdit("additional-questions")}
              type="button"
            >
              Change
            </button>
          </div>
          <dl className="space-y-2">
            <div>
              <dt className="font-bold">Full name</dt>
              <dd>{formData.fullName}</dd>
            </div>
            <div>
              <dt className="font-bold">Email address</dt>
              <dd>{formData.email}</dd>
            </div>
            <div>
              <dt className="font-bold">Phone number</dt>
              <dd>{formData.phone}</dd>
            </div>
            <div>
              <dt className="font-bold">License duration</dt>
              <dd>{licenseDurationLabel}</dd>
            </div>
            <div>
              <dt className="font-bold">Emergency contact name</dt>
              <dd>{formData.emergencyContactName}</dd>
            </div>
            <div>
              <dt className="font-bold">Emergency contact phone</dt>
              <dd>{formData.emergencyContactPhone}</dd>
            </div>
          </dl>
        </div>
      </div>

      {submissionError && (
        <div className="border-red-dark border-l-4 bg-red-light p-4">
          <h2 className="mb-2 font-bold">Submission failed</h2>
          <p>{submissionError}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Confirm and send application"}
        </Button>
      </div>
    </form>
  );
}
