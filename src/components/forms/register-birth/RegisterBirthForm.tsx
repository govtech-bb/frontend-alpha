"use client";

import { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Certificates } from "./steps/Certificates";
import { CheckAnswers } from "./steps/CheckAnswers";
import { ChildDetails } from "./steps/ChildDetails";
import { Confirmation } from "./steps/Confirmation";
import { ContactInfo } from "./steps/ContactInfo";
import { FathersDetails } from "./steps/FathersDetails";
import { IncludeFatherDetails } from "./steps/IncludeFatherDetails";
// Step components
import { MarriageStatus } from "./steps/MarriageStatus";
import { MothersDetails } from "./steps/MothersDetails";
import type { PartialBirthRegistrationFormData } from "./types";
import { useBirthRegistrationStorage } from "./useBirthRegistrationStorage";
import { useFormNavigation } from "./useFormNavigation";

/**
 * Main orchestrator for the Register a Birth multi-step form
 *
 * Features:
 * - Manages form state across all steps
 * - Auto-saves to localStorage with debouncing
 * - Handles conditional navigation (3 different paths)
 * - Accessibility-compliant focus management
 * - GOV.BB styling
 */
export function RegisterBirthForm() {
  const [formData, setFormData] = useState<PartialBirthRegistrationFormData>({
    marriageStatus: "",
    includeFatherDetails: "",
    numberOfCertificates: 0,
    email: "",
    wantContact: "",
    phoneNumber: "",
  });

  const { saveFormData, loadFormData, clearFormData, getSavedDate } =
    useBirthRegistrationStorage();

  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    goNext,
    goBack,
    goToStep,
  } = useFormNavigation(formData);

  const [showRestoredBanner, setShowRestoredBanner] = useState(false);
  const [savedDate, setSavedDate] = useState<Date | null>(null);

  // Load saved form data on mount
  useEffect(() => {
    const loaded = loadFormData();
    if (loaded) {
      setFormData(loaded);
      setShowRestoredBanner(true);
      setSavedDate(getSavedDate());
    }
  }, [loadFormData, getSavedDate]);

  // Auto-save form data when it changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.marriageStatus) {
        // Only save if form has been started
        saveFormData(formData);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [formData, saveFormData]);

  // Update form data
  const updateFormData = (
    updates: Partial<PartialBirthRegistrationFormData>
  ) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleClearSavedData = () => {
    if (
      confirm("Are you sure you want to clear your saved data and start over?")
    ) {
      clearFormData();
      setFormData({
        marriageStatus: "",
        includeFatherDetails: "",
        numberOfCertificates: 0,
        email: "",
        wantContact: "",
        phoneNumber: "",
      });
      setShowRestoredBanner(false);
    }
  };

  const handleSubmit = () => {
    // For now, just go to confirmation
    // In future: POST to /api/register-birth
    goNext();

    // Clear saved data after successful submission
    clearFormData();
  };

  // Determine variant for mother/child details
  const detailsVariant =
    formData.marriageStatus === "yes" || formData.includeFatherDetails === "yes"
      ? "with-father"
      : "without-father";

  // Pre-fill child's surname
  const childSurnamePrefill =
    detailsVariant === "with-father"
      ? formData.father?.lastName
      : formData.mother?.lastName;

  const hasFatherDetails =
    formData.marriageStatus === "yes" ||
    formData.includeFatherDetails === "yes";

  return (
    <div className="min-h-screen bg-neutral-white">
      <div className="container max-w-3xl py-8">
        {/* Restored data banner */}
        {showRestoredBanner && savedDate && (
          <div className="mb-6 border-teal-bright border-l-4 bg-teal-light p-4">
            <Typography
              className="mb-2 font-bold text-black"
              variant="paragraph"
            >
              Welcome back!
            </Typography>
            <Typography className="mb-2 text-black" variant="paragraph">
              We've restored your progress from{" "}
              {savedDate.toLocaleDateString("en-BB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </Typography>
            <button
              className="text-black underline hover:no-underline"
              onClick={handleClearSavedData}
              type="button"
            >
              Start over with a blank form
            </button>
          </div>
        )}

        {/* Auto-save banner */}
        {!showRestoredBanner && currentStep !== "confirmation" && (
          <div className="mb-6 border-blue-bright border-l-4 bg-blue-light/30 p-4">
            <Typography className="text-neutral-black" variant="paragraph">
              Your progress is automatically saved on this device.{" "}
              <button
                className="underline hover:no-underline"
                onClick={handleClearSavedData}
                type="button"
              >
                Clear saved data
              </button>
            </Typography>
          </div>
        )}

        {/* Progress indicator (except on confirmation) */}
        {currentStep !== "confirmation" && (
          <div className="mb-6">
            <Typography className="text-gray-600" variant="paragraph">
              Step {currentStepIndex + 1} of {totalSteps}
            </Typography>
          </div>
        )}

        {/* Render current step */}
        {currentStep === "marriage-status" && (
          <MarriageStatus
            onBack={goBack}
            onChange={(value) => updateFormData({ marriageStatus: value })}
            onNext={goNext}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            value={formData.marriageStatus || ""}
          />
        )}

        {currentStep === "include-father" && (
          <IncludeFatherDetails
            onBack={goBack}
            onChange={(value) =>
              updateFormData({ includeFatherDetails: value })
            }
            onNext={goNext}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            value={formData.includeFatherDetails || ""}
          />
        )}

        {currentStep === "father-details" && (
          <FathersDetails
            onBack={goBack}
            onChange={(value) => updateFormData({ father: value as any })}
            onNext={goNext}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            value={formData.father || {}}
          />
        )}

        {currentStep === "mother-details" && (
          <MothersDetails
            onBack={goBack}
            onChange={(value) => updateFormData({ mother: value as any })}
            onNext={goNext}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            value={formData.mother || {}}
            variant={detailsVariant}
          />
        )}

        {currentStep === "child-details" && (
          <ChildDetails
            onBack={goBack}
            onChange={(value) => updateFormData({ child: value })}
            onNext={goNext}
            prefillSurname={childSurnamePrefill}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            value={formData.child || {}}
            variant={detailsVariant}
          />
        )}

        {currentStep === "certificates" && (
          <Certificates
            onBack={goBack}
            onChange={(value) =>
              updateFormData({ numberOfCertificates: value })
            }
            onNext={goNext}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            value={formData.numberOfCertificates || 0}
          />
        )}

        {currentStep === "contact-info" && (
          <ContactInfo
            email={formData.email || ""}
            onBack={goBack}
            onChange={(field, value) => updateFormData({ [field]: value })}
            onNext={goNext}
            phoneNumber={formData.phoneNumber || ""}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
            wantContact={formData.wantContact || ""}
          />
        )}

        {currentStep === "check-answers" && (
          <CheckAnswers
            formData={formData}
            onBack={goBack}
            onEdit={goToStep}
            onSubmit={handleSubmit}
            stepNumber={currentStepIndex + 1}
            totalSteps={totalSteps}
          />
        )}

        {currentStep === "confirmation" && (
          <Confirmation
            hasFatherDetails={hasFatherDetails}
            numberOfCertificates={formData.numberOfCertificates || 0}
          />
        )}
      </div>
    </div>
  );
}
