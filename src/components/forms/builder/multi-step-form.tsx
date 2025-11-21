"use client";

import { Button } from "@govtech-bb/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ReviewStep } from "@/components/forms/builder/review-step";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { type FormData, formSchema } from "@/lib/schema-generator";
import { submitFormData } from "@/services/api";
import { useFormStore } from "@/store/form-store";
import type { FormStep } from "@/types";
import { ConfirmationPage } from "./confirmation-step";
import { DynamicStep } from "./dynamic-step";

export default function DynamicMultiStepForm({
  formSteps,
}: {
  formSteps: FormStep[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    // resetForm,
    // getProgress,
    markAsSubmitted,
  } = useFormStore();
  // console.log(formData);

  const [isFormReady, setIsFormReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const isProgrammaticNavigation = useRef(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: formSteps.reduce((acc, step) => {
      for (const field of step.fields) {
        acc[field.name as keyof FormData] = "" as FormData[keyof FormData];
      }
      return acc;
    }, {} as FormData),
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
      const result = await submitFormData(data);

      if (result.success) {
        // Mark as submitted in store
        markAsSubmitted(result.referenceNumber || "N/A");
      } else {
        throw new Error(result.error || "Submission failed");
      }
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

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: validation and navigation logic requires conditional checks
  const nextStep = async () => {
    // Check if current step is the review step
    const isReviewStep = formSteps[currentStep].fields.length === 0;

    if (isReviewStep) {
      // No validation needed for review step, just proceed
      markStepComplete(currentStep);
      isProgrammaticNavigation.current = true;
      nextStepStore();
      return;
    }
    const currentFields = formSteps[currentStep].fields.map((f) => f.name);
    const isValid = await methods.trigger(currentFields as (keyof FormData)[]);

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
        const firstErrorField = currentFields.find(
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

  const isReviewStep = formSteps[currentStep]?.fields.length === 0;
  const isLastStep = currentStep === formSteps.length - 1;

  if (isSubmitted && referenceNumber) {
    // Show confirmation page if submitted
    return <ConfirmationPage referenceNumber={referenceNumber} />;
  }

  if (!_hasHydrated) {
    // Show loading state while hydrating
    return <FormSkeleton />;
  }

  return (
    <FormProvider {...methods}>
      <form className="p-6" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Error Message */}
        {submissionError && (
          <div className="mb-6 border-red-500 border-l-4 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
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
          <ReviewStep onEdit={handleEditFromReview} />
        ) : (
          <DynamicStep step={formSteps[currentStep]} />
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4">
          {currentStep > 0 && !isSubmitting && (
            <Button
              //   className="rounded bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300"
              onClick={prevStep}
              type="button"
              variant="secondary"
            >
              Previous
            </Button>
          )}

          {/* {currentStep < formSteps.length - 1 ? (
            <Button onClick={nextStep} type="button">
              Continue
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )} */}

          {isLastStep ? (
            <Button
              // className="ml-auto flex items-center gap-2 rounded bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
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
            <Button
              // className="ml-auto rounded bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
              onClick={nextStep}
              type="button"
            >
              {isReviewStep ? "Continue" : "Next"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
