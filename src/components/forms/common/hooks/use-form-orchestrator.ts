import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import type { z } from "zod";
import { useFormNavigation } from "./use-form-navigation";
import { useFormStorage } from "./use-form-storage";

export type UseFormOrchestratorParams<
  TFormData extends Record<string, unknown>,
  TStepId extends string,
> = {
  /** Unique storage key for sessionStorage (e.g., "govbb_death_certificate_draft") */
  storageKey: string;
  /** Version string for storage (e.g., "death-cert-v1.0.0") */
  version: string;
  /** Zod schema for validating stored data */
  storageSchema: z.ZodSchema<Partial<TFormData>>;
  /** Default/initial form values */
  defaultValues: TFormData;
  /** Number of days before stored data expires */
  expiryDays?: number;
  /** Hook that returns steps based on form values */
  useSteps: (
    formValues: TFormData
  ) => Array<{ id: TStepId; isComplete?: boolean }>;
  /** API endpoint for form submission */
  submitEndpoint: string;
  /** Enable URL sync for browser back/forward button support */
  syncWithUrl?: boolean;
  /** URL parameter name for step (default: "step") */
  urlParamName?: string;
  /** Optional callback after successful submission (before navigation to confirmation) */
  onSubmitSuccess?: () => void;
};

/**
 * Unified orchestration hook for multi-step forms
 * Combines TanStack Form, storage, navigation, and submission handling
 *
 * Eliminates ~130 lines of boilerplate per form orchestrator
 *
 * @example
 * ```typescript
 * export function MyForm() {
 *   const {
 *     form,
 *     formValues,
 *     currentStep,
 *     goNext,
 *     goBack,
 *     goToStep,
 *     isDataLoaded,
 *     isSubmitting,
 *     submissionError,
 *     handleSubmit,
 *     clearFormData,
 *   } = useFormOrchestrator({
 *     storageKey: "govbb_my_form_draft",
 *     version: "my-form-v1.0.0",
 *     storageSchema: myFormStorageSchema,
 *     defaultValues: defaultMyFormData,
 *     expiryDays: 7,
 *     useSteps: useMyFormSteps,
 *     submitEndpoint: "/api/my-form",
 *     syncWithUrl: true,
 *   });
 *
 *   if (!isDataLoaded) {
 *     return <LoadingSkeleton />;
 *   }
 *
 *   return (
 *     <>
 *       {currentStep.id === "step-1" && (
 *         <Step1 value={...} onChange={...} onNext={goNext} />
 *       )}
 *       ...
 *     </>
 *   );
 * }
 * ```
 */
export function useFormOrchestrator<
  TFormData extends Record<string, unknown>,
  TStepId extends string,
>({
  storageKey,
  version,
  storageSchema,
  defaultValues,
  expiryDays = 7,
  useSteps,
  submitEndpoint,
  syncWithUrl = true,
  urlParamName = "step",
  onSubmitSuccess,
}: UseFormOrchestratorParams<TFormData, TStepId>) {
  // Storage with versioning and Zod validation
  const { saveFormData, loadFormData, clearFormData } = useFormStorage({
    storageKey,
    version,
    schema: storageSchema,
    expiryDays,
  });

  // Track submission state
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track whether we've completed hydration and data loading
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Initialize TanStack Form with defaults
  // We'll load saved data after hydration to avoid mismatch
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        // Submit to API
        const response = await fetch(submitEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to submit form");
        }

        // Success - call optional callback, navigate to confirmation, and clear saved data
        onSubmitSuccess?.();
        goNext();
        clearFormData();
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: needed for debugging submission errors
        console.error("Error submitting form:", error);

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

  // Get current form values
  const formValues = useStore(form.store, (state) => state.values);

  // Calculate steps based on form state (business logic)
  const steps = useSteps(formValues);

  // Generic navigation (no business logic)
  // Enable URL sync for browser back/forward button support
  // Only enable navigation after data is loaded to prevent premature redirects
  const { currentStep, goNext, goBack, goToStep } = useFormNavigation(steps, {
    syncWithUrl,
    urlParamName,
    isReady: isDataLoaded,
  });

  // Load data after first client-side render to avoid hydration mismatch
  useEffect(() => {
    const loaded = loadFormData();
    if (loaded) {
      // Set all form values from loaded data
      for (const [key, value] of Object.entries(loaded)) {
        form.setFieldValue(key as keyof TFormData, value);
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
        // Only save if form has been started (check first field)
        const firstFieldKey = Object.keys(defaultValues)[0];
        if (values[firstFieldKey]) {
          saveFormData(values);
        }
      }, 1000); // 1 second debounce
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [form.store, saveFormData, defaultValues]);

  const handleSubmit = () => {
    // Trigger form submission which calls onSubmit
    form.handleSubmit();
  };

  return {
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
    clearFormData,
  };
}
