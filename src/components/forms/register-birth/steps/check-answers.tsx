"use client";

import { Button } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";
import { formatForDisplay } from "@/lib/dates";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { finalSubmissionSchema } from "../schema";
import type { PartialBirthRegistrationFormData, StepName } from "../types";

type CheckAnswersProps = {
  formData: PartialBirthRegistrationFormData;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: StepName) => void;
  submissionError?: string | null;
  isSubmitting?: boolean;
};

type SummarySectionProps = {
  title: string;
  stepName: StepName;
  onEdit: (step: StepName) => void;
  children: React.ReactNode;
};

function SummarySection({
  title,
  stepName,
  onEdit,
  children,
}: SummarySectionProps) {
  return (
    <div className="border-neutral-grey border-b-4 pb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-[40px] leading-[1.25]">{title}</h2>
        <button
          className="text-teal-dark underline hover:text-teal-dark/80"
          onClick={() => onEdit(stepName)}
          type="button"
        >
          Change
        </button>
      </div>
      {children}
    </div>
  );
}

/**
 * Step: Check Your Answers
 * Summary page showing all entered data with edit links
 * Based on PDF pages 8 and 18
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex form summary with conditional rendering
export function CheckAnswers({
  formData,
  onSubmit,
  onBack,
  onEdit,
  submissionError,
  isSubmitting = false,
}: CheckAnswersProps) {
  const titleRef = useStepFocus("Check your answers", "Register a Birth");

  // Validate form data against final submission schema
  const validationResult = finalSubmissionSchema.safeParse(formData);
  const hasMissingData = !validationResult.success;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate again on submit
    const result = finalSubmissionSchema.safeParse(formData);
    if (!result.success) {
      // Navigate back if validation fails
      onBack();
      return;
    }

    onSubmit();
  };

  const hasFather =
    formData.marriageStatus === "yes" ||
    formData.includeFatherDetails === "yes";

  // Each certificate costs $5 BBD
  const totalCost = (formData.numberOfCertificates || 0) * 5.0;

  // Show error if required data is missing (e.g., user navigated here incorrectly)
  if (hasMissingData) {
    return (
      <div className="space-y-6">
        <h1
          className="mb-2 font-bold text-[56px] leading-[1.15]"
          ref={titleRef}
          tabIndex={-1}
        >
          Check your answers
        </h1>

        <div className="border-4 border-red-600 p-4">
          <h2 className="mb-2 font-bold text-red-600 text-xl">
            Missing or invalid information
          </h2>
          <Typography variant="paragraph">
            Some required information is missing or invalid. Please go back and
            complete all steps correctly.
          </Typography>

          {/* Show specific validation errors */}
          {validationResult.error && (
            <ul className="mt-4 list-disc space-y-1 pl-5">
              {validationResult.error.issues.slice(0, 5).map((issue, index) => (
                <li className="text-red-600" key={index}>
                  {issue.path.join(".")}: {issue.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          onClick={onBack}
          type="button"
          variant={"secondary"}
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <form
      className="container space-y-8 pt-8 pb-16 lg:grid lg:grid-cols-3"
      onSubmit={handleSubmit}
    >
      <div className="col-span-2 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1
            className="mb-2 font-bold text-[56px] leading-[1.15]"
            ref={titleRef}
            tabIndex={-1}
          >
            Check your answers
          </h1>

          <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
            <p>Review the answers you've given carefully.</p>
            <p>
              Incorrect information may be difficult to change after
              registration.
            </p>
          </div>

          {/* Father's details (if included) */}
          {hasFather && formData.father && (
            <SummarySection
              onEdit={onEdit}
              stepName="father-details"
              title="Tell us about the child's father"
            >
              <dl className="grid grid-cols-3 gap-4 font-normal text-[20px] leading-[1.7] [&_dt]:font-bold">
                <dt>First name</dt>
                <dd className="col-span-2">{formData.father.firstName}</dd>

                <dt>Middle name(s)</dt>
                <dd className="col-span-2">{formData.father.middleName}</dd>

                <dt>Last name</dt>
                <dd className="col-span-2">{formData.father.lastName}</dd>

                <dt>Current address</dt>
                <dd className="col-span-2 whitespace-pre-line">
                  {formData.father.address}
                </dd>

                <dt>National registration number</dt>
                <dd className="col-span-2">
                  {formData.father.nationalRegistrationNumber ||
                    formData.father.passportNumber}
                </dd>

                <dt>Occupation</dt>
                <dd className="col-span-2">{formData.father.occupation}</dd>
              </dl>
            </SummarySection>
          )}

          {/* Mother's details */}
          <SummarySection
            onEdit={onEdit}
            stepName="mother-details"
            title="Tell us about the child's mother"
          >
            <dl className="grid grid-cols-3 gap-4 font-normal text-[20px] leading-[1.7] [&_dt]:font-bold">
              <dt>First name</dt>
              <dd className="col-span-2">{formData.mother?.firstName}</dd>

              <dt>Middle name(s)</dt>
              <dd className="col-span-2">{formData.mother?.middleName}</dd>

              <dt>Last name</dt>
              <dd className="col-span-2">{formData.mother?.lastName}</dd>

              {formData.mother?.hadOtherSurname === "yes" &&
                formData.mother?.otherSurname && (
                  <>
                    <dt>Previous last name</dt>
                    <dd className="col-span-2">
                      {formData.mother.otherSurname}
                    </dd>
                  </>
                )}

              <dt>Current address</dt>
              <dd className="col-span-2 whitespace-pre-line">
                {formData.mother?.address}
              </dd>

              <dt>National registration number</dt>
              <dd className="col-span-2">
                {formData.mother?.nationalRegistrationNumber ||
                  formData.mother?.passportNumber}
              </dd>

              <dt>Occupation</dt>
              <dd className="col-span-2">{formData.mother?.occupation}</dd>
            </dl>
          </SummarySection>

          {/* Child's details */}
          <SummarySection
            onEdit={onEdit}
            stepName="child-details"
            title="Tell us about the child"
          >
            <dl className="grid grid-cols-3 gap-4 font-normal text-[20px] leading-[1.7] [&_dt]:font-bold">
              <dt>First name</dt>
              <dd className="col-span-2">{formData.child?.firstNames}</dd>

              <dt>Middle name(s)</dt>
              <dd className="col-span-2">{formData.child?.middleNames}</dd>

              <dt>Last name</dt>
              <dd className="col-span-2">{formData.child?.lastName}</dd>

              <dt>Date of birth</dt>
              <dd className="col-span-2">
                {formData.child?.dateOfBirth &&
                  formatForDisplay(formData.child.dateOfBirth)}
              </dd>

              <dt>Sex at birth</dt>
              <dd className="col-span-2">{formData.child?.sexAtBirth}</dd>

              <dt>Place of birth</dt>
              <dd className="col-span-2">{formData.child?.parishOfBirth}</dd>
            </dl>
          </SummarySection>

          {/* Certificates */}
          <SummarySection
            onEdit={onEdit}
            stepName="certificates"
            title="Certificates"
          >
            <dl className="grid grid-cols-3 gap-4 font-normal text-[20px] leading-[1.7] [&_dt]:font-bold">
              <dt>Number ordered</dt>
              <dd className="col-span-2">
                {formData.numberOfCertificates || 0}
              </dd>

              <dt>Total cost</dt>
              <dd className="col-span-2">
                {totalCost === 0 ? "Free" : `BBD$${totalCost.toFixed(2)}`}
              </dd>
            </dl>
          </SummarySection>

          {/* Contact information */}
          <SummarySection
            onEdit={onEdit}
            stepName="contact-info"
            title="Contact information"
          >
            <dl className="grid grid-cols-3 gap-4 font-normal text-[20px] leading-[1.7] [&_dt]:font-bold">
              <dt>Email address</dt>
              <dd className="col-span-2">{formData.email}</dd>

              {formData.wantContact === "yes" && formData.phoneNumber && (
                <>
                  <dt>Phone number</dt>
                  <dd className="col-span-2">{formData.phoneNumber}</dd>
                </>
              )}
            </dl>
          </SummarySection>

          {/* Submission error display */}
          {submissionError && (
            <div className="border-4 border-red-600 p-4">
              <h2 className="mb-2 font-bold text-red-600 text-xl">
                Submission failed
              </h2>
              <Typography variant="paragraph">{submissionError}</Typography>
              <Typography className="mt-2" variant="paragraph">
                Please try again or contact support if the problem persists.
              </Typography>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            disabled={isSubmitting}
            onClick={onBack}
            type="button"
            variant={"secondary"}
          >
            Back
          </Button>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Confirm and send"}
          </Button>
        </div>
      </div>
    </form>
  );
}
