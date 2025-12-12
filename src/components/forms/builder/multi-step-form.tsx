"use client";

import { Button } from "@govtech-bb/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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
    setCurrentStep,
    nextStep: nextStepStore,
    prevStep: prevStepStore,
    markStepComplete,
    updateFormData,
    resetForm,
    // getProgress,
    markAsSubmitted,
  } = useFormStore();

  const [isFormReady, setIsFormReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
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
        // Date fields need object default, all others get empty string
        const defaultValue =
          field.type === "date" ? { day: "", month: "", year: "" } : "";
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

    const stepName = formSteps[currentStep]?.id;
    if (stepName) {
      // App Router approach
      const params = new URLSearchParams(searchParams?.toString());
      params.set("step", stepName);
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [currentStep, _hasHydrated, isFormReady, router]);

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

    // console.log("Hydration complete, loading form data:", formData);
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
            details: `Your payment has been processed. Transaction: ${tx}`,
          });
          break;
        case "Initiated":
          setPaymentMessage({
            type: "pending",
            message: "Payment initiated",
            details:
              "Your Direct Debit payment is being processed. It will settle in approximately 5 business days.",
          });
          break;
        case "Failed":
          setPaymentMessage({
            type: "error",
            message: "Payment failed",
            details:
              "Your payment could not be processed. Please try again or use a different payment method.",
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
  }, [_hasHydrated, searchParams]);

  // Watch form changes and sync with Zustand (debounced)
  useEffect(() => {
    if (!isFormReady) return;
    const subscription = methods.watch((value) => {
      updateFormData(value as Partial<FormData>);
    });
    return () => subscription.unsubscribe();
  }, [isFormReady, methods.watch, updateFormData]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Submit to API
      const result = await submitFormData({ data, formKey: storageKey });
      markAsSubmitted(result.data?.submissionId || "N/A");
      //NOTE: Temporarily disabling
      // if (result.success) {
      //   // Mark as submitted in store
      //   markAsSubmitted(result.data?.submissionId || "N/A");
      // } else {
      //   const errorMessage = result.errors
      //     ? result.errors[0]?.message
      //     : "An unexpected error occurred";
      //   // biome-ignore lint/suspicious/noConsole: Intentionally logging form submission errors
      //   console.error(`Submission failed: ${errorMessage}`);
      //   // throw new Error("Submission failed");
      // }
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "An error occurred during submission"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    // Check if current step is the review step
    const isReviewStep = formSteps[currentStep]?.fields.length === 0;

    if (isReviewStep) {
      // Review step complete, trigger form submission
      markStepComplete(currentStep);
      // Trigger the form submission
      await methods.handleSubmit(onSubmit)();
      return;
    }

    // Helper to check if a field value is empty
    const isFieldEmpty = (fieldValue: unknown): boolean =>
      fieldValue === undefined ||
      fieldValue === null ||
      fieldValue === "" ||
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
        if (field.validation.required && isFieldEmpty(fieldValue)) {
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
      // Move to next step
      isProgrammaticNavigation.current = true;
      nextStepStore();
    } else {
      // Scroll to ErrorSummary if it exists, otherwise scroll to first error field
      const errorSummary = document.querySelector("#error-summary");
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback to first error field if ErrorSummary not found
        const firstErrorField = currentFieldNames.find(
          (field) => methods.formState.errors[field]
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
    prevStepStore();
  };

  const handleReset = () => {
    resetForm();
    methods.reset();
  };

  const isReviewStep = formSteps[currentStep]?.fields.length === 0;
  const isLastStep = currentStep === formSteps.length - 1;

  if (isSubmitted && referenceNumber) {
    // Show confirmation page if submitted
    const confirmationStep = formSteps.find(
      (step) => step.id === "confirmation"
    );

    if (!confirmationStep) {
      console.error("Confirmation step not found in form schema");
      return null;
    }

    return (
      <ConfirmationPage
        confirmationStep={confirmationStep}
        onReset={handleReset}
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
              <div className="flex-shrink-0">
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
                  <p
                    className={`mt-1 text-sm ${
                      paymentMessage.type === "success"
                        ? "text-green-700"
                        : paymentMessage.type === "pending"
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}
                  >
                    {paymentMessage.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submissionError && (
          <div className="mb-6 border-red-500 border-l-4 bg-red-50 p-4">
            <div className="flex">
              <div className="shrink-0">
                <span className="text-red-500">⚠</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-red-800 text-sm">
                  Submission Error
                </h3>
                <p className="mt-1 text-red-700 text-sm">{submissionError}</p>
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

        {/* Navigation Buttons */}
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

          {/* Show Continue button on review step, even if it's technically the last step */}
          {isReviewStep ? (
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
              Next
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
