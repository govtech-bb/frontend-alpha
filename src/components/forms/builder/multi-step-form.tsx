"use client";

import { Button } from "@govtech-bb/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ReviewStep } from "@/components/forms/builder/review-step";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { type FormData, generateFormSchema } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import { submitFormData } from "@/services/api";
import { createFormStore } from "@/store/form-store";
import type { FormStep } from "@/types";
import { ConfirmationPage } from "./confirmation-step";
import { DynamicStep } from "./dynamic-step";

/**
 * Sets a nested value in an object using dot notation path
 * Creates intermediate objects as needed
 */
function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): void {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  const lastKey = keys.at(-1);
  if (lastKey) {
    current[lastKey] = value;
  }
}

type DynamicMultiStepFormProps = {
  formSteps: FormStep[];
  serviceTitle: string;
  storageKey?: string;
};

export default function DynamicMultiStepForm({
  formSteps,
  serviceTitle,
  storageKey = "multi-step-form-storage",
}: DynamicMultiStepFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const formId = pathname.split("/").filter(Boolean)[1]; // Extract form ID from URL

  // Get store hook (uses singleton cache internally)
  const useFormStore = createFormStore(storageKey);

  const {
    currentStep,
    completedSteps,
    formData,
    // lastSaved,
    _hasHydrated,
    isSubmitted,
    referenceNumber,
    customerName: storedCustomerName,
    paymentData,
    setCurrentStep,
    markStepComplete,
    updateFormData,
    resetForm,
    // getProgress,
    markAsSubmitted,
    clearFormDataKeepSubmission,
  } = useFormStore();

  const [isFormReady, setIsFormReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<{
    message: string;
    errors?: { field: string; message: string }[];
  } | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<{
    type: "success" | "pending" | "error";
    message: string;
    details?: string;
  } | null>(null);
  const isProgrammaticNavigation = useRef(false);

  // Generate schema dynamically from the formSteps prop
  const formSchema = useMemo(() => generateFormSchema(formSteps), [formSteps]);

  // Generate default values with support for nested field names
  const defaultValues = useMemo(() => {
    const values: Record<string, unknown> = {};
    // Filter out review/confirmation steps that have no fields
    const stepsWithFields = formSteps.filter(
      (step) => step.fields && step.fields.length > 0
    );
    for (const step of stepsWithFields) {
      for (const field of step.fields) {
        // Set appropriate default values based on field type
        let defaultValue: unknown = "";
        if (field.type === "date") {
          defaultValue = { day: "", month: "", year: "" };
        } else if (field.type === "checkbox") {
          defaultValue = "no";
        } else if (field.type === "fieldArray") {
          const minItems = field.fieldArray?.minItems ?? 1;
          if (minItems > 0) {
            const items: Record<string, string>[] = [];
            for (let i = 0; i < minItems; i++) {
              if (field.fieldArray?.fields) {
                const initialItem: Record<string, string> = {};
                for (const f of field.fieldArray.fields) {
                  initialItem[f.name] = "";
                }
                items.push(initialItem);
              } else {
                items.push({ value: "" });
              }
            }
            defaultValue = items;
          } else {
            defaultValue = [];
          }
        }
        setNestedValue(values, field.name, defaultValue);

        // Add default values for ShowHide child fields and state field
        if (field.type === "showHide" && field.showHide) {
          // Initialize state field to "closed"
          setNestedValue(values, field.showHide.stateFieldName, "closed");
          // Initialize child fields
          for (const childField of field.showHide.fields) {
            setNestedValue(values, childField.name, "");
          }
        }
      }
    }
    return values as FormData;
  }, [formSteps]);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues,
  });

  // Update URL when step changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: formSteps is stable, searchParams intentionally omitted to prevent circular updates
  useEffect(() => {
    if (!(_hasHydrated && isFormReady)) return;
    // Skip URL update if form is submitted (confirmation page handles its own URL)
    if (isSubmitted && referenceNumber) return;

    const stepName = formSteps[currentStep]?.id;
    if (stepName) {
      // App Router approach
      const params = new URLSearchParams(searchParams?.toString());
      params.set("step", stepName);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [
    currentStep,
    _hasHydrated,
    isFormReady,
    isSubmitted,
    referenceNumber,
    router,
  ]);

  // Initialize step from URL on mount and handle browser back/forward
  // biome-ignore lint/correctness/useExhaustiveDependencies: formSteps is stable and doesn't need to be in deps
  useEffect(() => {
    if (!_hasHydrated) return;

    // Skip if this is a programmatic navigation
    if (isProgrammaticNavigation.current) {
      isProgrammaticNavigation.current = false;
      return;
    }

    const urlStep = searchParams?.get("step"); // App Router
    // For Pages Router: const urlStep = router.query.step as string;

    if (urlStep) {
      const stepIndex = formSteps.findIndex((step) => step.id === urlStep);
      const step = formSteps[stepIndex];

      // Prevent navigation to final steps (confirmation/thank-you) via URL if not submitted
      if (
        step &&
        (step.id === "confirmation" || step.id === "thank-you") &&
        !(isSubmitted && referenceNumber)
      ) {
        // Redirect to first step if trying to access final step without submission
        setCurrentStep(0);
        return;
      }

      if (
        stepIndex !== -1 &&
        stepIndex !== currentStep &&
        (stepIndex <= currentStep || completedSteps.includes(stepIndex))
      ) {
        // Only navigate to step if it's completed or is the next step
        setCurrentStep(stepIndex);
      }
    }
  }, [_hasHydrated, searchParams, completedSteps, currentStep, setCurrentStep]);

  // Load saved form data on mount
  useEffect(() => {
    if (!(_hasHydrated && !isFormReady)) return;

    if (formData && Object.keys(formData).length > 0) {
      // Reset form with saved data
      for (const key of Object.keys(formData)) {
        const value = formData[key as keyof FormData];
        if (value !== undefined && value !== null) {
          methods.setValue(key as keyof FormData, value, {
            shouldValidate: false,
            shouldDirty: false,
          });
        }
      }
    }
    setIsFormReady(true);
  }, [_hasHydrated, formData, methods, isFormReady]); // Run only once on mount

  // Check for payment status on mount
  useEffect(() => {
    if (!_hasHydrated) return;

    const paymentStatus = searchParams?.get("payment_status");
    const tx = searchParams?.get("tx");

    if (paymentStatus) {
      switch (paymentStatus) {
        case "Success":
          setPaymentMessage({
            type: "success",
            message: "Payment successful!",
            details: paymentData
              ? `Service: ${paymentData.description}\nAmount: $${paymentData.amount.toFixed(2)}\nTransaction: ${tx || "N/A"}`
              : `Your payment has been processed. Transaction: ${tx}`,
          });
          break;
        case "Initiated":
          setPaymentMessage({
            type: "pending",
            message: "Payment initiated",
            details: paymentData
              ? `Service: ${paymentData.description}\nAmount: $${paymentData.amount.toFixed(2)}\n\nYour Direct Debit payment is being processed. It will settle in approximately 5 business days.`
              : "Your Direct Debit payment is being processed. It will settle in approximately 5 business days.",
          });
          break;
        case "Failed":
          setPaymentMessage({
            type: "error",
            message: "Payment failed",
            details: paymentData
              ? `Service: ${paymentData.description}\nAmount: $${paymentData.amount.toFixed(2)}\n\nYour payment could not be processed. Please try again or use a different payment method.`
              : "Your payment could not be processed. Please try again or use a different payment method.",
          });
          break;
        case "error": {
          const errorMessage = searchParams?.get("payment_error");
          setPaymentMessage({
            type: "error",
            message: "Payment verification error",
            details:
              errorMessage ||
              "There was an error verifying your payment. Please contact support with your reference number.",
          });
          break;
        }
        default:
          // Unknown payment status, don't show message
          break;
      }

      // Optional: Clear query params after showing message
      // setTimeout(() => {
      //   window.history.replaceState({}, '', window.location.pathname);
      // }, 100);
    }
  }, [_hasHydrated, searchParams, paymentData]);

  // Watch form changes and sync with Zustand (debounced)
  useEffect(() => {
    if (!isFormReady) return;
    const subscription = methods.watch((value) => {
      updateFormData(value as Partial<FormData>);
    });
    return () => subscription.unsubscribe();
  }, [isFormReady, methods.watch, updateFormData]);

  // Clear form data when submission is complete and showing confirmation
  useEffect(() => {
    if (isSubmitted && referenceNumber && _hasHydrated) {
      // Clear form data but keep submission state
      clearFormDataKeepSubmission();
    }
  }, [isSubmitted, referenceNumber, _hasHydrated, clearFormDataKeepSubmission]);

  // Update URL to show confirmation step when form is submitted
  useEffect(() => {
    if (isSubmitted && referenceNumber && _hasHydrated) {
      const params = new URLSearchParams(searchParams?.toString());
      if (params.get("step") !== "confirmation") {
        params.set("step", "confirmation");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [isSubmitted, referenceNumber, _hasHydrated, searchParams, router]);

  // Helper function to remove fields from conditional steps that aren't visible
  const cleanFormDataForSubmission = (data: FormData): FormData => {
    const cleanedData = { ...data } as Record<string, unknown>;

    // Track parent keys that are used by hidden steps
    const parentKeysFromHiddenSteps = new Set<string>();
    // Track parent keys that are used by visible steps
    const parentKeysFromVisibleSteps = new Set<string>();

    // Get all conditional steps
    const conditionalSteps = formSteps.filter((step) => step.conditionalOn);

    // For each conditional step, check if it should be shown
    for (const step of conditionalSteps) {
      if (!step.conditionalOn) continue;

      const watchedValue = getNestedValue<unknown>(
        cleanedData,
        step.conditionalOn.field
      );

      const isVisible = watchedValue === step.conditionalOn.value;

      for (const field of step.fields) {
        const fieldParts = field.name?.split(".");

        if (fieldParts.length === 1) {
          // Simple field - delete directly if step is hidden
          if (!isVisible) {
            delete cleanedData[field.name];
          }
        } else {
          // Nested field - track the parent key
          const parentKey = fieldParts[0];
          if (isVisible) {
            parentKeysFromVisibleSteps.add(parentKey);
          } else {
            parentKeysFromHiddenSteps.add(parentKey);
          }
        }
      }
    }

    // Only remove parent keys that are in hidden steps but not in any visible steps
    for (const parentKey of parentKeysFromHiddenSteps) {
      if (!parentKeysFromVisibleSteps.has(parentKey)) {
        delete cleanedData[parentKey];
      }
    }

    return cleanedData as FormData;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Extract customer name before cleaning data
      const applicantFirstName = (data["applicant.firstName"] as string) || "";
      const applicantLastName = (data["applicant.lastName"] as string) || "";
      const customerName = `${applicantFirstName} ${applicantLastName}`.trim();

      // Clean up data to remove fields from hidden conditional steps
      const cleanedData = cleanFormDataForSubmission(data);

      // Submit to API
      const result = await submitFormData({
        data: cleanedData,
        formKey: storageKey,
      });

      if (result.success) {
        // Extract payment data from API response
        const apiPaymentData =
          result.data?.amount !== undefined
            ? {
                amount: result.data.amount,
                description: result.data.description || "",
                numberOfCopies: result.data.numberOfCopies,
                paymentUrl: result.data.paymentUrl,
                paymentToken: result.data.paymentToken,
                paymentId: result.data.paymentId,
              }
            : undefined;

        // Mark as submitted in store with customer name and payment data
        markAsSubmitted(
          result.data?.submissionId || "N/A",
          customerName,
          apiPaymentData
        );
      } else {
        setSubmissionError({
          message: result.message || "An unexpected error occurred",
          errors: result.errors?.map((err) => ({
            field: err.field,
            message: err.message,
          })),
        });
      }
    } catch (error) {
      setSubmissionError({
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during submission",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to check if a step should be shown based on its conditionalOn property
  const isStepVisible = (step: FormStep): boolean => {
    // Exclude final steps (confirmation/thank-you) from regular navigation
    if (step.id === "confirmation" || step.id === "thank-you") return false;

    if (!step.conditionalOn) return true;

    const formValues = methods.getValues();
    const watchedValue = getNestedValue<unknown>(
      formValues as Record<string, unknown>,
      step.conditionalOn.field
    );
    return watchedValue === step.conditionalOn.value;
  };

  // Helper function to find the next visible step index
  const findNextVisibleStep = (fromIndex: number): number => {
    for (let i = fromIndex + 1; i < formSteps.length; i++) {
      if (isStepVisible(formSteps[i])) {
        return i;
      }
    }
    // If no visible step found, return the last step (confirmation)
    return formSteps.length - 1;
  };

  // Helper function to find the previous visible step index
  const findPrevVisibleStep = (fromIndex: number): number => {
    for (let i = fromIndex - 1; i >= 0; i--) {
      if (isStepVisible(formSteps[i])) {
        return i;
      }
    }
    // If no visible step found, return 0
    return 0;
  };

  const nextStep = async () => {
    // Check if current step is the review step (has no fields)
    const currentStepData = formSteps[currentStep];
    const isReviewStep =
      currentStepData?.fields.length === 0 &&
      currentStepData?.id === "check-your-answers";

    if (isReviewStep) {
      // Review step complete, just move to next step
      markStepComplete(currentStep);
      isProgrammaticNavigation.current = true;
      const nextVisibleStep = findNextVisibleStep(currentStep);
      setCurrentStep(nextVisibleStep);
      return;
    }

    // Check if current step is the declaration step (final step before submission)
    const isDeclarationStep = currentStepData?.id === "declaration";

    // Helper to check if a field value is empty
    const isFieldEmpty = (fieldValue: unknown): boolean =>
      fieldValue === undefined ||
      fieldValue === null ||
      fieldValue === "" ||
      (Array.isArray(fieldValue) && fieldValue.length === 0) ||
      (typeof fieldValue === "string" && fieldValue.trim() === "") ||
      (typeof fieldValue === "number" && Number.isNaN(fieldValue));

    // Get all form values for checking ShowHide states
    const allValues = methods.getValues();

    // Filter out fields that are conditionally hidden
    const visibleFields = formSteps[currentStep].fields.filter((field) => {
      // Include field if it has no conditional rule
      if (!field.conditionalOn) return true;

      // Check if conditional field should be visible
      const watchedValue = methods.watch(
        field.conditionalOn.field as keyof FormData
      );
      return watchedValue === field.conditionalOn.value;
    });

    // Collect field names, handling ShowHide state for conditional validation
    const currentFieldNames: string[] = [];
    const fieldsToSkipValidation: string[] = [];

    for (const field of visibleFields) {
      // Check if this field should skip validation when ShowHide is open
      if (
        "skipValidationWhenShowHideOpen" in field &&
        field.skipValidationWhenShowHideOpen
      ) {
        const showHideState = getNestedValue(
          allValues as Record<string, unknown>,
          field.skipValidationWhenShowHideOpen
        );
        if (showHideState === "open") {
          // Skip validation for this field - add to skip list and clear any existing errors
          fieldsToSkipValidation.push(field.name);
          methods.clearErrors(field.name as keyof FormData);
        } else {
          currentFieldNames.push(field.name);
        }
      } else {
        currentFieldNames.push(field.name);
      }

      // Add ShowHide child fields only when ShowHide is open
      if (field.type === "showHide" && field.showHide?.fields) {
        const showHideState = getNestedValue(
          allValues as Record<string, unknown>,
          field.showHide.stateFieldName
        );
        if (showHideState === "open") {
          // ShowHide is open - validate child fields
          for (const childField of field.showHide.fields) {
            currentFieldNames.push(childField.name);
          }
        } else {
          // ShowHide is closed - clear child field errors
          for (const childField of field.showHide.fields) {
            methods.clearErrors(childField.name as keyof FormData);
          }
        }
      }
    }

    // Trigger standard validation
    let isValid = await methods.trigger(
      currentFieldNames as (keyof FormData)[]
    );

    // Manually validate conditional fields (required and pattern)
    for (const field of visibleFields) {
      if (field.conditionalOn) {
        const fieldValue = methods.getValues(field.name as keyof FormData);
        const stringValue = typeof fieldValue === "string" ? fieldValue : "";

        // Check required validation
        // For checkboxes, require value to be "yes"
        const isEmpty =
          field.type === "checkbox"
            ? fieldValue !== "yes"
            : isFieldEmpty(fieldValue);

        if (field.validation.required && isEmpty) {
          methods.setError(field.name as keyof FormData, {
            type: "required",
            message: field.validation.required,
          });
          isValid = false;
          continue; // Skip pattern check if empty
        }

        // Check pattern validation
        if (field.validation.pattern && stringValue) {
          const regex = new RegExp(field.validation.pattern.value);
          if (!regex.test(stringValue)) {
            methods.setError(field.name as keyof FormData, {
              type: "pattern",
              message: field.validation.pattern.message,
            });
            isValid = false;
          }
        }
      }
    }

    if (isValid) {
      // Mark current step as complete
      markStepComplete(currentStep);

      // If this is the declaration step, submit the form
      if (isDeclarationStep) {
        const formData = methods.getValues();
        await onSubmit(formData);
        return;
      }

      // Move to next visible step (skipping conditional steps that don't match)
      isProgrammaticNavigation.current = true;
      const nextVisibleStep = findNextVisibleStep(currentStep);
      setCurrentStep(nextVisibleStep);
    } else {
      // Scroll to ErrorSummary if it exists, otherwise scroll to first error field
      const errorSummary = document.querySelector("#error-summary");
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback to first error field if ErrorSummary not found
        const firstErrorField = currentFieldNames.find((field) =>
          getNestedValue(
            methods.formState.errors as Record<string, unknown>,
            field
          )
        );
        if (firstErrorField) {
          const element = document.querySelector(`#${String(firstErrorField)}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    }
  };

  const handleEditFromReview = (stepIndex: number) => {
    isProgrammaticNavigation.current = true;
    setCurrentStep(stepIndex);
  };

  const prevStep = () => {
    isProgrammaticNavigation.current = true;
    const prevVisibleStep = findPrevVisibleStep(currentStep);
    setCurrentStep(prevVisibleStep);
  };

  const handleReset = () => {
    resetForm();
    methods.reset();
  };

  const currentStepData = formSteps[currentStep];
  const isReviewStep =
    currentStepData?.fields.length === 0 &&
    currentStepData?.id === "check-your-answers";
  const isDeclarationStep = currentStepData?.id === "declaration";
  const isFinalStep =
    currentStepData?.id === "confirmation" ||
    currentStepData?.id === "thank-you";

  // Check if this is the last navigable step (excluding confirmation/thank-you)
  const lastNavigableStepIndex = formSteps.findLastIndex(
    (step) => step.id !== "confirmation" && step.id !== "thank-you"
  );
  const isLastStep = currentStep === lastNavigableStepIndex;

  if (isSubmitted && referenceNumber) {
    // Show confirmation page if submitted
    const confirmationStep = formSteps.find(
      (step) => step.id === "confirmation" || step.id === "thank-you"
    );

    if (!confirmationStep) {
      return null;
    }

    // Use stored customer name (persists even after form data is cleared)
    // TODO: Add email field to form schema to capture customer email
    const customerEmail = undefined; // Will use default in PaymentBlock

    return (
      <ConfirmationPage
        confirmationStep={confirmationStep}
        customerEmail={customerEmail}
        customerName={storedCustomerName || undefined}
        formId={formId}
        onReset={handleReset}
        paymentData={paymentData || undefined}
        referenceNumber={referenceNumber}
      />
    );
  }

  if (!_hasHydrated) {
    // Show loading state while hydrating
    return <FormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Payment Status Message */}
        {paymentMessage && (
          <div
            className={`mb-6 border-l-4 p-4 ${
              paymentMessage.type === "success"
                ? "border-green-500 bg-green-50"
                : paymentMessage.type === "pending"
                  ? "border-amber-500 bg-amber-50"
                  : "border-red-500 bg-red-50"
            }`}
          >
            <div className="flex">
              <div className="shrink-0">
                <span
                  className={
                    paymentMessage.type === "success"
                      ? "text-green-500"
                      : paymentMessage.type === "pending"
                        ? "text-amber-500"
                        : "text-red-500"
                  }
                >
                  {paymentMessage.type === "success"
                    ? "✓"
                    : paymentMessage.type === "pending"
                      ? "⏳"
                      : "⚠"}
                </span>
              </div>
              <div className="ml-3">
                <h3
                  className={`font-medium text-sm ${
                    paymentMessage.type === "success"
                      ? "text-green-800"
                      : paymentMessage.type === "pending"
                        ? "text-amber-800"
                        : "text-red-800"
                  }`}
                >
                  {paymentMessage.message}
                </h3>
                {paymentMessage.details && (
                  <div
                    className={`mt-1 text-sm ${
                      paymentMessage.type === "success"
                        ? "text-green-700"
                        : paymentMessage.type === "pending"
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}
                  >
                    {paymentMessage.details?.split("\n").map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submission Error */}
        {submissionError && (
          <div className="mb-6 border-red-500 border-l-8 bg-red-50 p-6">
            <div className="flex">
              <div className="shrink-0">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-bold text-lg text-red-800">
                  There was a problem submitting your form
                </h3>
                <p className="mt-2 text-red-700">{submissionError.message}</p>
                {submissionError.errors &&
                  submissionError.errors.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {submissionError.errors.map((error, index) => (
                        <li className="text-red-700" key={index}>
                          <span className="font-semibold">
                            {error.field
                              ?.split(".")
                              .map(
                                (part) =>
                                  part.charAt(0).toUpperCase() +
                                  part.slice(1).replace(/([A-Z])/g, " $1")
                              )
                              .join(" - ")}
                            :
                          </span>{" "}
                          {error.message}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>
          </div>
        )}
        {/* Current Step - Show Review or Regular Step */}
        {isReviewStep ? (
          <ReviewStep formSteps={formSteps} onEdit={handleEditFromReview} />
        ) : (
          <DynamicStep
            serviceTitle={serviceTitle}
            step={formSteps[currentStep]}
          />
        )}

        {/* Navigation Buttons - Don't show on confirmation/thank-you steps */}
        {!isFinalStep && (
          <div className="mt-8 flex gap-4">
            {currentStep > 0 && (
              <Button
                disabled={isSubmitting}
                onClick={prevStep}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
            )}

            {/* Show Continue button on review step, Submit on declaration step */}
            {isReviewStep ? (
              <Button disabled={isSubmitting} onClick={nextStep} type="button">
                Continue
              </Button>
            ) : isDeclarationStep ? (
              <Button disabled={isSubmitting} onClick={nextStep} type="button">
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-white border-b-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            ) : isLastStep ? (
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-white border-b-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            ) : (
              <Button disabled={isSubmitting} onClick={nextStep} type="button">
                Continue
              </Button>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
