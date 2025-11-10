"use client";

import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import { useFormNavigation } from "../common/hooks/use-form-navigation";
import { useFormStorage } from "../common/hooks/use-form-storage";
import { deathCertificateStorageSchema } from "./schema";
import { ApplicantDetails } from "./steps/applicant-details";
import { CheckAnswers } from "./steps/check-answers";
import { Confirmation } from "./steps/confirmation";
import { DeathDetails } from "./steps/death-details";
import { RelationshipRequest } from "./steps/relationship-request";
import type { PartialDeathCertificateData } from "./types";
import { useDeathCertificateSteps } from "./use-death-certificate-steps";

/**
 * Main orchestrator for the Death Certificate Application multi-step form
 *
 * Features:
 * - Manages form state with TanStack Form
 * - Auto-saves to sessionStorage with debouncing
 * - Linear navigation (all users follow the same path)
 * - Accessibility-compliant focus management
 * - GOV.BB styling
 */
export function DeathCertificateForm() {
  // Storage with versioning and Zod validation
  const { saveFormData, loadFormData, clearFormData } = useFormStorage({
    storageKey: "govbb_death_certificate_draft",
    version: "death-cert-v1.0.0",
    schema: deathCertificateStorageSchema,
    expiryDays: 7,
  });

  // Track submission errors
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track whether we've completed hydration and data loading
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Initialize TanStack Form with empty defaults
  // We'll load saved data after hydration to avoid mismatch
  const form = useForm({
    defaultValues: {
      applicantName: "",
      applicantAddress: "",
      applicantNationalRegistrationNo: "",
      relationshipToDeceased: "",
      reasonForRequest: "",
      numberOfCertificates: undefined,
      causeOfDeath: "",
      deceasedSurname: "",
      deceasedChristianNames: "",
      dateOfDeath: "",
      deceasedNationalRegistrationNo: "",
      placeOfDeath: "",
    } as PartialDeathCertificateData,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        // Submit to API
        const response = await fetch("/api/death-certificate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              "Failed to submit death certificate application"
          );
        }

        // Success - go to confirmation and clear saved data
        goNext();
        clearFormData();
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: needed for debugging submission errors
        console.error("Error submitting death certificate application:", error);

        // Set error message for user
        setSubmissionError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again."
        );

        // DO NOT navigate to confirmation or clear form data on error
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Get current form values for step calculation
  const formValues = useStore(form.store, (state) => state.values);

  // Calculate steps based on form state (business logic)
  // Note: This form has linear flow, so steps don't change
  const steps = useDeathCertificateSteps(formValues);

  // Generic navigation (no business logic)
  // Enable URL sync for browser back/forward button support
  // Only enable navigation after data is loaded to prevent premature redirects
  const { currentStep, goNext, goBack, goToStep } = useFormNavigation(steps, {
    syncWithUrl: true,
    urlParamName: "step",
    isReady: isDataLoaded,
  });

  // Load data after first client-side render to avoid hydration mismatch
  useEffect(() => {
    const loaded = loadFormData();
    if (loaded) {
      // Set all form values from loaded data
      for (const [key, value] of Object.entries(loaded)) {
        form.setFieldValue(key as keyof PartialDeathCertificateData, value);
      }
    }

    // Mark data as loaded (whether we found saved data or not)
    setIsDataLoaded(true);
  }, [loadFormData, form]);

  // Auto-save form data when it changes (debounced)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const unsubscribe = form.store.subscribe(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const values = form.store.state.values;
        if (values.applicantName) {
          // Only save if form has been started
          saveFormData(values);
        }
      }, 1000); // 1 second debounce
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [form.store, saveFormData]);

  const handleSubmit = () => {
    // Trigger form submission which calls onSubmit
    form.handleSubmit();
  };

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
      {currentStep.id === "applicant-details" && (
        <ApplicantDetails
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialDeathCertificateData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            applicantName: formValues.applicantName,
            applicantAddress: formValues.applicantAddress,
            applicantNationalRegistrationNo:
              formValues.applicantNationalRegistrationNo,
          }}
        />
      )}

      {currentStep.id === "relationship-request" && (
        <RelationshipRequest
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialDeathCertificateData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            relationshipToDeceased: formValues.relationshipToDeceased,
            reasonForRequest: formValues.reasonForRequest,
            numberOfCertificates: formValues.numberOfCertificates,
            causeOfDeath: formValues.causeOfDeath,
          }}
        />
      )}

      {currentStep.id === "death-details" && (
        <DeathDetails
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialDeathCertificateData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            deceasedSurname: formValues.deceasedSurname,
            deceasedChristianNames: formValues.deceasedChristianNames,
            dateOfDeath: formValues.dateOfDeath,
            deceasedNationalRegistrationNo:
              formValues.deceasedNationalRegistrationNo,
            placeOfDeath: formValues.placeOfDeath,
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
          numberOfCertificates={formValues.numberOfCertificates || 0}
        />
      )}
    </>
  );
}
