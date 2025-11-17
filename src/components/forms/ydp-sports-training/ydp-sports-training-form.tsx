"use client";

import { useFormOrchestrator } from "@govtech-bb/forms";
import { ydpCommunitySportsTrainingStorageSchema } from "./schema";
import { PersonalDetails } from "./steps/personal-details";
import { SportInterest } from "./steps/sport-interest";
import { ExperienceDetails } from "./steps/experience-details";
import { EmploymentStatus } from "./steps/employment-status";
import { Organisations } from "./steps/organisations";
import { ContactDetails } from "./steps/contact-details";
import { EmergencyContact } from "./steps/emergency-contact";
import { CheckAnswers } from "./steps/check-answers";
import { Confirmation } from "./steps/confirmation";
import type { PartialYdpCommunitySportsTrainingData } from "./types";
import { useYdpCommunitySportsTrainingSteps } from "./use-ydp-sports-training-steps";

const defaultValues: PartialYdpCommunitySportsTrainingData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: undefined,
  disciplineOfInterest: "",
  hasExperience: undefined,
  experienceLevel: undefined,
  experienceOther: "",
  yearsOfExperience: undefined,
  employmentStatus: undefined,
  employmentOther: "",
  institutionName: "",
  belongsToOrganisation: undefined,
  organisationName: "",
  addressLine1: "",
  addressLine2: "",
  parish: undefined,
  telephoneNumber: "",
  emergencyFirstName: "",
  emergencyLastName: "",
  emergencyAddressLine1: "",
  emergencyAddressLine2: "",
  emergencyParish: undefined,
  emergencyTelephoneNumber: "",
};

/**
 * Main orchestrator for the YDP Community Sports Training Programme multi-step form
 *
 * Features:
 * - Manages form state with TanStack Form
 * - Auto-saves to sessionStorage with debouncing
 * - Linear navigation (all users follow the same path)
 * - Accessibility-compliant focus management
 * - GOV.BB styling
 */
export default function YdpCommunitySportsTrainingFormApp() {
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
    storageKey: "govbb_ydp_community_sports_training",
    version: "v1.0.0",
    storageSchema: ydpCommunitySportsTrainingStorageSchema,
    defaultValues,
    expiryDays: 7,
    useSteps: useYdpCommunitySportsTrainingSteps,
    submitEndpoint: "/api/ydp-community-sports-training",
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
      {currentStep.id === "personal-details" && (
        <PersonalDetails
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            dateOfBirth: formValues.dateOfBirth,
            gender: formValues.gender,
          }}
        />
      )}

      {currentStep.id === "sport-interest" && (
        <SportInterest
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            disciplineOfInterest: formValues.disciplineOfInterest,
            hasExperience: formValues.hasExperience,
          }}
        />
      )}

      {currentStep.id === "experience-details" && (
        <ExperienceDetails
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            experienceLevel: formValues.experienceLevel,
            experienceOther: formValues.experienceOther,
            yearsOfExperience: formValues.yearsOfExperience,
          }}
        />
      )}

      {currentStep.id === "employment-status" && (
        <EmploymentStatus
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            employmentStatus: formValues.employmentStatus,
            employmentOther: formValues.employmentOther,
            institutionName: formValues.institutionName,
          }}
        />
      )}

      {currentStep.id === "organisations" && (
        <Organisations
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            belongsToOrganisation: formValues.belongsToOrganisation,
            organisationName: formValues.organisationName,
          }}
        />
      )}

      {currentStep.id === "contact-details" && (
        <ContactDetails
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
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
          }}
        />
      )}

      {currentStep.id === "emergency-contact" && (
        <EmergencyContact
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialYdpCommunitySportsTrainingData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            emergencyFirstName: formValues.emergencyFirstName,
            emergencyLastName: formValues.emergencyLastName,
            emergencyAddressLine1: formValues.emergencyAddressLine1,
            emergencyAddressLine2: formValues.emergencyAddressLine2,
            emergencyParish: formValues.emergencyParish,
            emergencyTelephoneNumber: formValues.emergencyTelephoneNumber,
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
          yearsOfExperience={Number(formValues.yearsOfExperience) || 0}
        />
      )}
    </>
  );
}
