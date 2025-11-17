"use client";

import { useFormOrchestrator } from "@govtech-bb/forms";
import { mentorshipApplicationStorageSchema } from "./schema";
import { AboutMentorship } from "./steps/about-mentorship";
import { CheckAnswers } from "./steps/check-answers";
import { Confirmation } from "./steps/confirmation";
import { ContactDetails } from "./steps/contact-details";
import { Experience } from "./steps/experience";
import { Preferences } from "./steps/preferences";
import { References } from "./steps/references";
import { YourDetails } from "./steps/your-details";
import type { PartialMentorshipApplicationData } from "./types";
import { useMentorshipApplicationSteps } from "./use-mentorship-application-steps";

const defaultValues: PartialMentorshipApplicationData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  employmentStatus: undefined,
  employmentStatusOther: "",
  addressLine1: "",
  addressLine2: "",
  parish: undefined,
  telephoneNumber: "",
  emailAddress: "",
  whyMentor: "",
  strongestCompetencies: "",
  whatCanMenteeLearn: "",
  preferFormat: undefined,
  inPersonMentee: undefined,
  mindsetTraining: undefined,
  menteeName: "",
  qualificationsExperience: "",
  yearsExperienceMentor: undefined,
  workExperienceOutside: "",
  professionalReference: "",
  personalReference: "",
};

/**
 * Main orchestrator for the Mentorship Application multi-step form
 *
 * Features:
 * - Manages form state with TanStack Form
 * - Auto-saves to sessionStorage with debouncing
 * - Linear navigation (all users follow the same path)
 * - Accessibility-compliant focus management
 * - GOV.BB styling
 */
export default function MentorshipApplicationFormApp() {
  const {
    form,
    formValues,
    currentStep,
    goNext,
    goBack,
    goToStep,
    isDataLoaded,
    isSubmitting,
    submissionError,
    handleSubmit,
  } = useFormOrchestrator({
    storageKey: "govbb_mentorship_application",
    version: "v1.0.0",
    storageSchema: mentorshipApplicationStorageSchema,
    defaultValues,
    expiryDays: 7,
    useSteps: useMentorshipApplicationSteps,
    submitEndpoint: "/api/mentorship-application",
    syncWithUrl: true,
  });

  // Show skeleton loader until hydration completes and data is loaded
  // This prevents hydration mismatch and ensures correct step is shown
  if (!isDataLoaded) {
    return (
      <div className="py-8">
        <div className="container mx-auto max-w-2xl animate-pulse">
          <div className="mb-6 h-12 w-3/4 rounded bg-gray-200" />
          <div className="mb-4 h-32 w-full rounded bg-gray-200" />
          <div className="mb-4 h-12 w-full rounded bg-gray-200" />
          <div className="h-12 w-1/3 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Render current step */}
      {currentStep.id === "your-details" && (
        <YourDetails
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialMentorshipApplicationData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            dateOfBirth: formValues.dateOfBirth,
            employmentStatus: formValues.employmentStatus,
            employmentStatusOther: formValues.employmentStatusOther,
          }}
        />
      )}

      {currentStep.id === "contact-details" && (
        <ContactDetails
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialMentorshipApplicationData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            addressLine1: formValues.addressLine1,
            addressLine2: formValues.addressLine2,
            parish: formValues.parish,
            telephoneNumber: formValues.telephoneNumber,
            emailAddress: formValues.emailAddress,
          }}
        />
      )}

      {currentStep.id === "about-mentorship" && (
        <AboutMentorship
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialMentorshipApplicationData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            whyMentor: formValues.whyMentor,
            strongestCompetencies: formValues.strongestCompetencies,
            whatCanMenteeLearn: formValues.whatCanMenteeLearn,
          }}
        />
      )}

      {currentStep.id === "preferences" && (
        <Preferences
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialMentorshipApplicationData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            preferFormat: formValues.preferFormat,
            inPersonMentee: formValues.inPersonMentee,
            mindsetTraining: formValues.mindsetTraining,
            menteeName: formValues.menteeName,
          }}
        />
      )}

      {currentStep.id === "experience" && (
        <Experience
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialMentorshipApplicationData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            qualificationsExperience: formValues.qualificationsExperience,
            yearsExperienceMentor: formValues.yearsExperienceMentor,
            workExperienceOutside: formValues.workExperienceOutside,
          }}
        />
      )}

      {currentStep.id === "references" && (
        <References
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialMentorshipApplicationData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            professionalReference: formValues.professionalReference,
            personalReference: formValues.personalReference,
          }}
        />
      )}

      {currentStep.id === "check-answers" && (
        <CheckAnswers
          formData={formValues}
          isSubmitting={isSubmitting}
          onBack={goBack}
          onEdit={goToStep}
          onSubmit={handleSubmit}
          submissionError={submissionError}
        />
      )}

      {currentStep.id === "confirmation" && (
        <Confirmation
          yearsExperienceMentor={Number(formValues.yearsExperienceMentor) || 0}
        />
      )}
    </>
  );
}
