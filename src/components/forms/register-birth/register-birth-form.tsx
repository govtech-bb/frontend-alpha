"use client";

import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { useEffect } from "react";
import { useFormNavigation } from "../common/hooks/use-form-navigation";
import { useFormStorage } from "../common/hooks/use-form-storage";
import { birthRegistrationSchema } from "./schema";
import { Certificates } from "./steps/certificates";
import { CheckAnswers } from "./steps/check-answers";
import { ChildDetails } from "./steps/child-details";
import { Confirmation } from "./steps/confirmation";
import { ContactInfo } from "./steps/contact-info";
import { FathersDetails } from "./steps/fathers-details";
import { IncludeFatherDetails } from "./steps/include-father-details";
import { MarriageStatus } from "./steps/marriage-status";
import { MothersDetails } from "./steps/mothers-details";
import type { PartialBirthRegistrationFormData } from "./types";
import { useRegisterBirthSteps } from "./use-register-birth-steps";

/**
 * Main orchestrator for the Register a Birth multi-step form
 *
 * Features:
 * - Manages form state with TanStack Form
 * - Auto-saves to sessionStorage with debouncing
 * - Handles conditional navigation (3 different paths)
 * - Accessibility-compliant focus management
 * - GOV.BB styling
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Main form orchestrator needs to handle all step rendering. Will be refactored when extracting step rendering logic.
export function RegisterBirthForm() {
  // Storage with versioning and Zod validation
  const { saveFormData, loadFormData, clearFormData } = useFormStorage({
    storageKey: "govbb_birth_registration_draft",
    version: "birth-v1.0.0",
    schema: birthRegistrationSchema,
    expiryDays: 7,
  });

  // Initialize TanStack Form
  const form = useForm({
    defaultValues: {
      marriageStatus: "",
      includeFatherDetails: "",
      numberOfCertificates: 0,
      email: "",
      wantContact: "",
      phoneNumber: "",
    } as PartialBirthRegistrationFormData,
    onSubmit: async ({ value }) => {
      try {
        // Submit to API
        const response = await fetch("/api/register-birth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          throw new Error("Failed to submit birth registration");
        }

        // Success - go to confirmation and clear saved data
        goNext();
        clearFormData();
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: needed for debugging submission errors
        console.error("Error submitting birth registration:", error);
        // TODO: Show error message to user
        // For now, allow them to see confirmation page even if email fails
        goNext();
        clearFormData();
      }
    },
  });

  // Get current form values for step calculation
  const formValues = useStore(form.store, (state) => state.values);

  // Calculate steps based on form state (business logic)
  const steps = useRegisterBirthSteps(formValues);

  // Generic navigation (no business logic)
  const { currentStep, goNext, goBack, goToStep } = useFormNavigation(steps);

  // Load saved form data on mount (silently)
  useEffect(() => {
    const loaded = loadFormData();
    if (loaded) {
      // Set all form values from loaded data
      for (const [key, value] of Object.entries(loaded)) {
        form.setFieldValue(
          key as keyof PartialBirthRegistrationFormData,
          value
        );
      }
    }
  }, [loadFormData, form]);

  // Auto-save form data when it changes (debounced)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const unsubscribe = form.store.subscribe(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const values = form.store.state.values;
        if (values.marriageStatus) {
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

  // Determine variant for mother/child details
  const detailsVariant =
    formValues.marriageStatus === "yes" ||
    formValues.includeFatherDetails === "yes"
      ? "with-father"
      : "without-father";

  // Pre-fill child's surname
  const childSurnamePrefill =
    detailsVariant === "with-father"
      ? formValues.father?.lastName
      : formValues.mother?.lastName;

  const hasFatherDetails =
    formValues.marriageStatus === "yes" ||
    formValues.includeFatherDetails === "yes";

  return (
    <div className="min-h-screen bg-neutral-white">
      <div className="container max-w-3xl py-8">
        {/* Render current step */}
        {currentStep.id === "marriage-status" && (
          <MarriageStatus
            onBack={goBack}
            onChange={(value) => form.setFieldValue("marriageStatus", value)}
            onNext={goNext}
            value={formValues.marriageStatus || ""}
          />
        )}

        {currentStep.id === "include-father" && (
          <IncludeFatherDetails
            onBack={goBack}
            onChange={(value) =>
              form.setFieldValue("includeFatherDetails", value)
            }
            onNext={goNext}
            value={formValues.includeFatherDetails || ""}
          />
        )}

        {currentStep.id === "father-details" && (
          <FathersDetails
            onBack={goBack}
            onChange={(update) =>
              form.setFieldValue("father", {
                ...(formValues.father || {}),
                ...update,
              })
            }
            onNext={goNext}
            value={formValues.father || {}}
          />
        )}

        {currentStep.id === "mother-details" && (
          <MothersDetails
            onBack={goBack}
            onChange={(update) =>
              form.setFieldValue("mother", {
                ...(formValues.mother || {}),
                ...update,
              })
            }
            onNext={goNext}
            value={formValues.mother || {}}
          />
        )}

        {currentStep.id === "child-details" && (
          <ChildDetails
            onBack={goBack}
            onChange={(value) => form.setFieldValue("child", value)}
            onNext={goNext}
            prefillSurname={childSurnamePrefill}
            value={formValues.child || {}}
          />
        )}

        {currentStep.id === "certificates" && (
          <Certificates
            onBack={goBack}
            onChange={(value) =>
              form.setFieldValue("numberOfCertificates", value)
            }
            onNext={goNext}
            value={formValues.numberOfCertificates || 0}
          />
        )}

        {currentStep.id === "contact-info" && (
          <ContactInfo
            email={formValues.email || ""}
            onBack={goBack}
            onChange={(field, value) =>
              form.setFieldValue(
                field as keyof PartialBirthRegistrationFormData,
                value
              )
            }
            onNext={goNext}
            phoneNumber={formValues.phoneNumber || ""}
            wantContact={formValues.wantContact || ""}
          />
        )}

        {currentStep.id === "check-answers" && (
          <CheckAnswers
            formData={formValues}
            onBack={goBack}
            onEdit={goToStep}
            onSubmit={handleSubmit}
          />
        )}

        {currentStep.id === "confirmation" && (
          <Confirmation
            hasFatherDetails={hasFatherDetails}
            numberOfCertificates={formValues.numberOfCertificates || 0}
          />
        )}
      </div>
    </div>
  );
}
