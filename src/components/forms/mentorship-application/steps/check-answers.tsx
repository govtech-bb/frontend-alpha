"use client";

import { formatForDisplay, useStepFocus } from "@govtech-bb/forms";
import { Button } from "@govtech-bb/react";
import { finalMentorshipApplicationValidation } from "../schema";
import type { PartialMentorshipApplicationData, StepName } from "../types";

type CheckAnswersProps = {
  formData: PartialMentorshipApplicationData;
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
        <h2 className="mb-4 font-bold text-[40px] leading-[1.25] lg:mb-0">
          {title}
        </h2>
        <button
          className="hidden text-teal-dark underline hover:text-teal-dark/80 lg:inline"
          onClick={() => onEdit(stepName)}
          type="button"
        >
          Change
        </button>
      </div>
      {children}
      <button
        className="mt-2 font-normal text-[20px] text-teal-dark leading-[1.7] underline hover:text-teal-dark/80 lg:hidden"
        onClick={() => onEdit(stepName)}
        type="button"
      >
        Change
      </button>
    </div>
  );
}

/**
 * Check Your Answers
 * Summary page showing all entered data with edit links
 */
export function CheckAnswers({
  formData,
  onSubmit,
  onBack,
  onEdit,
  submissionError,
  isSubmitting = false,
}: CheckAnswersProps) {
  const titleRef = useStepFocus("Check your answers", "Mentorship Application");

  // Validate form data against final submission schema
  const validationResult =
    finalMentorshipApplicationValidation.safeParse(formData);
  const hasMissingData = !validationResult.success;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate again on submit
    const result = finalMentorshipApplicationValidation.safeParse(formData);
    if (!result.success) {
      // Navigate back if validation fails
      onBack();
      return;
    }

    onSubmit();
  };

  // Show error if required data is missing
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
          <p className="font-normal text-[20px] leading-[1.7]">
            Some required information is missing or invalid. Please go back and
            complete all steps correctly.
          </p>

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
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6 lg:col-span-2 lg:gap-8">
        <div className="flex flex-col gap-4">
          <h1
            className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
            ref={titleRef}
            tabIndex={-1}
          >
            Check your answers
          </h1>

          <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
            <p>Review the answers you&apos;ve given carefully.</p>
            <p>
              Incorrect information may delay processing of your
              mentorshipApplication application.
            </p>
          </div>

          {/* Tell us about yourself */}
          <SummarySection
            onEdit={onEdit}
            stepName="your-details"
            title="Tell us about yourself"
          >
            <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
              <dt>First name</dt>
              <dd className="lg:col-span-2">{formData.firstName}</dd>

              <dt>Last name</dt>
              <dd className="lg:col-span-2">{formData.lastName}</dd>

              <dt>Date of birth</dt>
              <dd className="lg:col-span-2">
                {formData.dateOfBirth && formatForDisplay(formData.dateOfBirth)}
              </dd>

              <dt>Your employment status</dt>
              <dd className="lg:col-span-2">{formData.employmentStatus}</dd>

              {formData.employmentStatus === "other" && (
                <>
                  <dt>Please specify</dt>
                  <dd className="lg:col-span-2">
                    {formData.employmentStatusOther}
                  </dd>
                </>
              )}
            </dl>
          </SummarySection>

          {/* Your contact details */}
          <SummarySection
            onEdit={onEdit}
            stepName="contact-details"
            title="Your contact details"
          >
            <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
              <dt>Address line 1</dt>
              <dd className="lg:col-span-2">{formData.addressLine1}</dd>

              <dt>Address line 2</dt>
              <dd className="lg:col-span-2">{formData.addressLine2}</dd>

              <dt>Parish</dt>
              <dd className="lg:col-span-2">{formData.parish}</dd>

              <dt>Telephone number</dt>
              <dd className="lg:col-span-2">{formData.telephoneNumber}</dd>

              <dt>Email address</dt>
              <dd className="lg:col-span-2">{formData.emailAddress}</dd>
            </dl>
          </SummarySection>

          {/* Tell us about being a mentor */}
          <SummarySection
            onEdit={onEdit}
            stepName="about-mentorship"
            title="Tell us about being a mentor"
          >
            <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
              <dt>Why are you applying to be a mentor?</dt>
              <dd className="lg:col-span-2">{formData.whyMentor}</dd>

              <dt>Strongest competencies</dt>
              <dd className="lg:col-span-2">
                {formData.strongestCompetencies}
              </dd>

              <dt>What do you think a mentee can learn from you</dt>
              <dd className="lg:col-span-2">{formData.whatCanMenteeLearn}</dd>
            </dl>
          </SummarySection>

          {/* Preferences */}
          <SummarySection
            onEdit={onEdit}
            stepName="preferences"
            title="Preferences"
          >
            <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
              <dt>Would you prefer a male or female mentee</dt>
              <dd className="lg:col-span-2">{formData.preferFormat}</dd>

              <dt>
                Would it be acceptable to give your mentee your personal phone
                number?
              </dt>
              <dd className="lg:col-span-2">
                {formData.inPersonMentee === "yes" ? "Yes" : "No"}
              </dd>

              <dt>Do you have someone in mind that you'd like to mentor?</dt>
              <dd className="lg:col-span-2">
                {formData.mindsetTraining === "yes" ? "Yes" : "No"}
              </dd>

              {formData.mindsetTraining === "yes" && (
                <>
                  <dt>What is their name</dt>
                  <dd className="lg:col-span-2">{formData.menteeName}</dd>
                </>
              )}
            </dl>
          </SummarySection>

          {/* Experience */}
          <SummarySection
            onEdit={onEdit}
            stepName="experience"
            title="Experience"
          >
            <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
              <dt>Please list qualifications / experience</dt>
              <dd className="lg:col-span-2">
                {formData.qualificationsExperience}
              </dd>

              <dt>How many years experience as a mentor</dt>
              <dd className="lg:col-span-2">
                {formData.yearsExperienceMentor}
              </dd>

              <dt>Volunteer or helpline outside of work</dt>
              <dd className="lg:col-span-2">
                {formData.workExperienceOutside}
              </dd>
            </dl>
          </SummarySection>

          {/* References */}
          <SummarySection
            onEdit={onEdit}
            stepName="references"
            title="References"
          >
            <dl className="flex flex-col gap-2 font-normal text-[20px] leading-[1.7] lg:grid lg:grid-cols-3 lg:gap-4 [&_dt]:font-bold">
              <dt>Please provide a professional reference</dt>
              <dd className="lg:col-span-2">
                {formData.professionalReference}
              </dd>

              <dt>Please provide a personal reference</dt>
              <dd className="lg:col-span-2">{formData.personalReference}</dd>
            </dl>
          </SummarySection>

          {/* Submission error display */}
          {submissionError && (
            <div className="border-4 border-red-600 p-4">
              <h2 className="mb-2 font-bold text-red-600 text-xl">
                Submission failed
              </h2>
              <p className="font-normal text-[20px] leading-[1.7]">
                {submissionError}
              </p>
              <p className="mt-2 font-normal text-[20px] leading-[1.7]">
                Please try again or contact support if the problem persists.
              </p>
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
