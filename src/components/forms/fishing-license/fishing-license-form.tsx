"use client";

import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import { useFormNavigation } from "../common/hooks/use-form-navigation";
import { useFormStorage } from "../common/hooks/use-form-storage";
import { finalSubmissionSchema, fishingLicenseStorageSchema } from "./schema";
import { AdditionalQuestions } from "./steps/additional-questions";
import { CheckAnswers } from "./steps/check-answers";
import { Confirmation } from "./steps/confirmation";
// Import step components
import { LicenseType } from "./steps/license-type";
import { RiverDetails } from "./steps/river-details";
import { SeaDetails } from "./steps/sea-details";
import type { PartialFishingLicenseFormData, StepName } from "./types";
import { useFishingLicenseSteps } from "./use-fishing-license-steps";

/**
 * Main orchestrator for the Fishing License application form
 *
 * Coordinates:
 * - Form state management (TanStack Form)
 * - Auto-save to sessionStorage
 * - Step calculation and navigation
 * - Form submission
 */
export function FishingLicenseForm() {
  // 1. Storage with versioning
  const { saveFormData, loadFormData, clearFormData } = useFormStorage({
    storageKey: "govbb_fishing_license_draft",
    version: "fishing-v1.0.0",
    schema: fishingLicenseStorageSchema,
    expiryDays: 7,
  });

  // 2. Track submission state
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 3. Initialize TanStack Form
  const form = useForm({
    defaultValues: {
      licenseType: "",
      preferredLocation: "",
      equipmentType: "",
      experienceLevel: "",
      hasBoat: "",
      vesselRegistration: "",
      intendedZone: "",
      fullName: "",
      email: "",
      phone: "",
      licenseDuration: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    } as PartialFishingLicenseFormData,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        // Validate final data
        const _validData = finalSubmissionSchema.parse(value);

        // TODO: Submit to API
        // For now, simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate random failure for testing (10% chance)
        if (Math.random() < 0.1) {
          throw new Error("Network error - please try again");
        }

        // Success - go to confirmation and clear saved data
        goNext();
        clearFormData();
      } catch (error) {
        if (error instanceof Error) {
          setSubmissionError(error.message);
        } else {
          setSubmissionError("An unexpected error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // 4. Get reactive form values
  const formValues = useStore(form.store, (state) => state.values);

  // 5. Calculate steps based on form state (business logic)
  const steps = useFishingLicenseSteps(formValues);

  // 6. Navigation (generic)
  const { currentStep, goNext, goBack, goToStep } = useFormNavigation(steps, {
    syncWithUrl: true,
    urlParamName: "step",
    isReady: isDataLoaded,
  });

  // 7. Load saved data after hydration
  useEffect(() => {
    const loaded = loadFormData();
    if (loaded) {
      for (const [key, value] of Object.entries(loaded)) {
        form.setFieldValue(key as keyof PartialFishingLicenseFormData, value);
      }
    }
    setIsDataLoaded(true);
  }, [loadFormData, form]);

  // 8. Auto-save with debounce
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const unsubscribe = form.store.subscribe(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const values = form.store.state.values;
        // Only save if form has been started
        if (values.licenseType) {
          saveFormData(values);
        }
      }, 1000);
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [form.store, saveFormData]);

  const handleSubmit = () => {
    form.handleSubmit();
  };

  // 9. Show skeleton loader until hydration completes
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

  // 10. Render current step (EXPLICIT - no clever mapping)
  return (
    <>
      {currentStep.id === "license-type" && (
        <LicenseType
          onChange={(value) => form.setFieldValue("licenseType", value)}
          onNext={goNext}
          value={formValues.licenseType || ""}
        />
      )}

      {currentStep.id === "river-details" && (
        <RiverDetails
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialFishingLicenseFormData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            preferredLocation: formValues.preferredLocation || "",
            equipmentType: formValues.equipmentType || "",
            experienceLevel: formValues.experienceLevel || "",
          }}
        />
      )}

      {currentStep.id === "sea-details" && (
        <SeaDetails
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialFishingLicenseFormData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            hasBoat: formValues.hasBoat || "",
            vesselRegistration: formValues.vesselRegistration || "",
            intendedZone: formValues.intendedZone || "",
          }}
        />
      )}

      {currentStep.id === "additional-questions" && (
        <AdditionalQuestions
          onBack={goBack}
          onChange={(update) => {
            for (const [key, value] of Object.entries(update)) {
              form.setFieldValue(
                key as keyof PartialFishingLicenseFormData,
                value
              );
            }
          }}
          onNext={goNext}
          value={{
            fullName: formValues.fullName || "",
            email: formValues.email || "",
            phone: formValues.phone || "",
            licenseDuration: formValues.licenseDuration || "",
            emergencyContactName: formValues.emergencyContactName || "",
            emergencyContactPhone: formValues.emergencyContactPhone || "",
          }}
        />
      )}

      {currentStep.id === "check-answers" && (
        <CheckAnswers
          formData={formValues}
          isSubmitting={isSubmitting}
          onBack={goBack}
          onEdit={(stepName: StepName) => goToStep(stepName)}
          onSubmit={handleSubmit}
          submissionError={submissionError}
        />
      )}

      {currentStep.id === "confirmation" && (
        <Confirmation formData={formValues} />
      )}
    </>
  );
}
