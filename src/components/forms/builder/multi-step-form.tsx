"use client";

import { Button } from "@govtech-bb/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ReviewStep } from "@/components/forms/builder/review-step";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { type FormData, generateFormSchema } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import { submitFormData } from "@/services/api";
import { createFormStore } from "@/store/form-store";
import type { ConditionalRule, FormField, FormStep } from "@/types";
import { ConfirmationPage } from "./confirmation-step";
import { DynamicStep } from "./dynamic-step";

/**
 * Type guard to check if a ConditionalRule is a simple field/value rule (not an OR rule)
 */
function isSimpleConditionalRule(
  rule: ConditionalRule
): rule is { field: string; value: string } {
  return "field" in rule;
}

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

/**
 * Checks if an object has only consecutive numeric keys starting from 0.
 * This identifies objects that react-hook-form creates from indexed field names
 * (e.g., `beneficiaries.0`, `beneficiaries.1`) which should be arrays.
 */
function hasOnlyNumericKeys(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj);
  if (keys.length === 0) return false;

  // Check if all keys are numeric and consecutive starting from 0
  const numericKeys = keys.map(Number).sort((a, b) => a - b);
  return numericKeys.every((key, index) => key === index && !Number.isNaN(key));
}

/**
 * Recursively converts objects with numeric keys to arrays.
 * React-hook-form creates objects like `{ "0": {...}, "1": {...} }` when using
 * indexed field names (e.g., `beneficiaries.0.firstName`). This function
 * transforms them to proper arrays `[{...}, {...}]`.
 */
function convertIndexedObjectsToArrays(
  data: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const objValue = value as Record<string, unknown>;

      if (hasOnlyNumericKeys(objValue)) {
        // Convert to array and recursively process each item
        const sortedKeys = Object.keys(objValue)
          .map(Number)
          .sort((a, b) => a - b);
        result[key] = sortedKeys.map((numKey) => {
          const item = objValue[String(numKey)];
          if (item && typeof item === "object" && !Array.isArray(item)) {
            return convertIndexedObjectsToArrays(
              item as Record<string, unknown>
            );
          }
          return item;
        });
      } else {
        // Recursively process nested objects
        result[key] = convertIndexedObjectsToArrays(objValue);
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Returns the ordinal word for a given number (e.g., 2 -> "second", 3 -> "third")
 */
function getOrdinalWord(n: number): string {
  const ordinals = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
  ];
  return ordinals[n - 1] ?? `${n}th`;
}

/**
 * Updates a step title with ordinal numbering for subsequent instances.
 * Replaces "the X" with "the second X", "the third X", etc.
 * Only applies to instances after the first (index > 0).
 */
function getOrdinalTitle(title: string, index: number): string {
  if (index === 0) return title;

  const ordinal = getOrdinalWord(index + 1);
  // Replace "the " with "the second " (or third, fourth, etc.)
  // This handles titles like "Tell us about the child" -> "Tell us about the second child"
  return title.replace(/\bthe\s+/i, `the ${ordinal} `);
}

/**
 * Creates a repeatable step instance with indexed field names
 * @param baseStep - The template step with repeatable config
 * @param index - The instance index (0-based)
 * @param shouldAddAnotherField - Whether to add the "add another" question to this step
 * @param isSubStep - Whether this is a sub-step (conditionalOn should be indexed)
 */
function createRepeatableStepInstance(
  baseStep: FormStep,
  index: number,
  shouldAddAnotherField: boolean,
  isSubStep: boolean
): FormStep {
  const config = baseStep.repeatable;
  if (!config) return baseStep;

  const { arrayFieldName, addAnotherLabel } = config;

  // Helper to prefix a field name with the array path
  const indexFieldName = (fieldName: string) =>
    `${arrayFieldName}.${index}.${fieldName}`;

  // Create indexed field names (e.g., minorDetails.0.firstName)
  // Also update any field references (conditionalOn, skipValidationWhenShowHideOpen, showHide)
  const indexedFields: FormField[] = baseStep.fields.map((field) => {
    const indexed: FormField = {
      ...field,
      name: indexFieldName(field.name),
    };

    // Update conditionalOn.field reference to include the array index
    // Only handle simple conditional rules (not OR rules)
    if (field.conditionalOn && isSimpleConditionalRule(field.conditionalOn)) {
      indexed.conditionalOn = {
        ...field.conditionalOn,
        field: indexFieldName(field.conditionalOn.field),
      };
    }

    // Update skipValidationWhenShowHideOpen reference
    if (field.skipValidationWhenShowHideOpen) {
      indexed.skipValidationWhenShowHideOpen = indexFieldName(
        field.skipValidationWhenShowHideOpen
      );
    }

    // Update showHide config with indexed field names
    if (field.showHide) {
      indexed.showHide = {
        ...field.showHide,
        stateFieldName: indexFieldName(field.showHide.stateFieldName),
        fields: field.showHide.fields.map((nestedField) => ({
          ...nestedField,
          name: indexFieldName(nestedField.name),
          // Also update conditionalOn in nested fields if present (only simple rules)
          ...(nestedField.conditionalOn &&
            "field" in nestedField.conditionalOn && {
              conditionalOn: {
                ...nestedField.conditionalOn,
                field: indexFieldName(nestedField.conditionalOn.field),
              },
            }),
        })),
      };
    }

    return indexed;
  });

  // Add "add another" radio field if this step should have it
  if (shouldAddAnotherField) {
    const addAnotherField: FormField = {
      name: `_addAnother_${arrayFieldName}_${index}`,
      label: addAnotherLabel ?? "Do you need to add another?",
      type: "radio",
      validation: {
        required: "Select an option",
      },
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    };
    indexedFields.push(addAnotherField);
  }

  // Determine the conditionalOn for this step instance
  let stepConditionalOn = baseStep.conditionalOn;

  if (
    isSubStep &&
    baseStep.conditionalOn &&
    isSimpleConditionalRule(baseStep.conditionalOn)
  ) {
    // Sub-steps: index the conditionalOn.field reference (e.g., isParentOrGuardian -> beneficiaries.0.isParentOrGuardian)
    stepConditionalOn = {
      ...baseStep.conditionalOn,
      field: indexFieldName(baseStep.conditionalOn.field),
    };
  } else if (index > 0 && !isSubStep) {
    // Primary steps after the first: conditional on previous "add another" being "yes"
    stepConditionalOn = {
      field: `_addAnother_${arrayFieldName}_${index - 1}`,
      value: "yes",
    };
  }

  return {
    ...baseStep,
    id: `${baseStep.id}-${index}`,
    // Update title with ordinal for subsequent instances (e.g., "Tell us about the second child")
    title: getOrdinalTitle(baseStep.title, index),
    fields: indexedFields,
    conditionalOn: stepConditionalOn,
    // Clear the repeatable config from instances (they're already expanded)
    repeatable: undefined,
  };
}

/**
 * Groups consecutive steps that share the same repeatable arrayFieldName
 * @returns Array of step groups, where each group is an array of steps sharing the same arrayFieldName
 */
function groupRepeatableSteps(steps: FormStep[]): FormStep[][] {
  const groups: FormStep[][] = [];
  let currentGroup: FormStep[] = [];
  let currentArrayFieldName: string | null = null;

  for (const step of steps) {
    const arrayFieldName = step.repeatable?.arrayFieldName;

    if (arrayFieldName) {
      if (arrayFieldName === currentArrayFieldName) {
        // Same group, add to current
        currentGroup.push(step);
      } else {
        // Different arrayFieldName, start new group
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [step];
        currentArrayFieldName = arrayFieldName;
      }
    } else {
      // Non-repeatable step
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
        currentArrayFieldName = null;
      }
      groups.push([step]);
    }
  }

  // Don't forget the last group
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

/**
 * Expands form steps by generating instances of repeatable steps
 * Consecutive steps with the same arrayFieldName are grouped and expanded together
 * (e.g., child-0, guardian-0, child-1, guardian-1, etc.)
 * @param steps - Original form steps
 * @param repeatableCounts - Map of primary step ID to instance count
 */
function expandFormSteps(
  steps: FormStep[],
  repeatableCounts: Record<string, number>
): FormStep[] {
  const expanded: FormStep[] = [];
  const groups = groupRepeatableSteps(steps);

  for (const group of groups) {
    // Non-repeatable step (single step in group with no repeatable config)
    if (group.length === 1 && !group[0].repeatable) {
      expanded.push(group[0]);
      continue;
    }

    // Find the primary step (the one without skipAddAnother) to get the count
    const primaryStep = group.find((s) => !s.repeatable?.skipAddAnother);
    if (!primaryStep?.repeatable) {
      // Fallback: just use the first step
      expanded.push(...group);
      continue;
    }

    const count = repeatableCounts[primaryStep.id] ?? 1;
    const maxItems = primaryStep.repeatable.maxItems ?? 10;

    // Expand the group: for each instance, add all steps in the group
    for (let i = 0; i < count; i++) {
      const isLastInstance = i >= maxItems - 1;

      for (const step of group) {
        const isSubStep = step.repeatable?.skipAddAnother === true;
        // Only the last non-sub-step in the group should have the "add another" field
        const lastNonSubStep = [...group]
          .reverse()
          .find((s) => !s.repeatable?.skipAddAnother);
        const shouldAddAnotherField =
          !(isLastInstance || isSubStep) && step === lastNonSubStep;

        expanded.push(
          createRepeatableStepInstance(
            step,
            i,
            shouldAddAnotherField,
            isSubStep
          )
        );
      }
    }
  }

  return expanded;
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

  // Track instance counts for repeatable steps (key: base step ID, value: count)
  const [repeatableCounts, setRepeatableCounts] = useState<
    Record<string, number>
  >(() => {
    // Initialize with 1 instance for each repeatable step
    const initial: Record<string, number> = {};
    for (const step of formSteps) {
      if (step.repeatable) {
        initial[step.id] = 1;
      }
    }
    return initial;
  });

  // Expand form steps based on current repeatable counts
  const expandedFormSteps = useMemo(
    () => expandFormSteps(formSteps, repeatableCounts),
    [formSteps, repeatableCounts]
  );

  // Generate schema dynamically from the expanded formSteps
  const formSchema = useMemo(
    () => generateFormSchema(expandedFormSteps),
    [expandedFormSteps]
  );

  // Helper to add another repeatable step instance
  const addRepeatableInstance = useCallback(
    (baseStepId: string) => {
      const baseStep = formSteps.find((s) => s.id === baseStepId);
      if (!baseStep?.repeatable) return;

      const maxItems = baseStep.repeatable.maxItems ?? 10;
      setRepeatableCounts((prev) => ({
        ...prev,
        [baseStepId]: Math.min((prev[baseStepId] ?? 1) + 1, maxItems),
      }));
    },
    [formSteps]
  );

  // Generate default values with support for nested field names
  const defaultValues = useMemo(() => {
    const values: Record<string, unknown> = {};
    // Filter out review/confirmation steps that have no fields
    const stepsWithFields = expandedFormSteps.filter(
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
            if (field.fieldArray?.fields) {
              const initialItem: Record<string, string> = {};
              for (const f of field.fieldArray.fields) {
                initialItem[f.name] = "";
              }
              defaultValue = [initialItem];
            } else {
              defaultValue = [{ value: "" }];
            }
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
  }, [expandedFormSteps]);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues,
  });

  // Helper function to check if a step should be visible based on form values
  const isStepVisible = useCallback(
    (step: FormStep, formValues?: FormData): boolean => {
      if (!step.conditionalOn) return true;

      const values = formValues ?? methods.getValues();

      if (isSimpleConditionalRule(step.conditionalOn)) {
        const watchedValue = getNestedValue<unknown>(
          values as Record<string, unknown>,
          step.conditionalOn.field
        );
        return watchedValue === step.conditionalOn.value;
      }

      // Handle OR logic
      if ("or" in step.conditionalOn) {
        return step.conditionalOn.or.some((condition) => {
          const fieldValue = getNestedValue(
            values as Record<string, unknown>,
            condition.field
          );
          return fieldValue === condition.value;
        });
      }

      return false;
    },
    [methods]
  );

  // Extract fields that affect step visibility (memoized to prevent unnecessary re-renders)
  const conditionalFields = useMemo(() => {
    const fields = new Set<string>();
    for (const step of formSteps) {
      if (step.conditionalOn) {
        if ("or" in step.conditionalOn) {
          for (const condition of step.conditionalOn.or) {
            fields.add(condition.field);
          }
        } else if (isSimpleConditionalRule(step.conditionalOn)) {
          fields.add(step.conditionalOn.field);
        }
      }
    }
    return Array.from(fields);
  }, [formSteps]);

  // Compute visible steps based on current form values
  const computeVisibleSteps = useCallback(() => {
    const currentValues = methods.getValues();
    return formSteps.filter((step) => isStepVisible(step, currentValues));
  }, [formSteps, methods]);

  // Track visible steps in state
  const [visibleSteps, setVisibleSteps] = useState<FormStep[]>(() =>
    computeVisibleSteps()
  );

  // Update visible steps only when conditional fields change
  useEffect(() => {
    if (!conditionalFields.length) return;

    const subscription = methods.watch((_value, { name }) => {
      // Only recompute if a conditional field changed
      if (name && conditionalFields.includes(name)) {
        setVisibleSteps(computeVisibleSteps());
      }
    });
    return () => subscription.unsubscribe();
  }, [conditionalFields, computeVisibleSteps, methods]);

  // Update URL when step changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: expandedFormSteps changes are tracked, searchParams intentionally omitted to prevent circular updates
  useEffect(() => {
    if (!(_hasHydrated && isFormReady)) return;
    // Skip URL update if form is submitted (confirmation page handles its own URL)
    if (isSubmitted && referenceNumber) return;

    const stepName = expandedFormSteps[currentStep]?.id;
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
    expandedFormSteps,
  ]);

  // Initialize step from URL on mount and handle browser back/forward
  // biome-ignore lint/correctness/useExhaustiveDependencies: expandedFormSteps is tracked and doesn't need to be in deps
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
      const stepIndex = expandedFormSteps.findIndex(
        (step) => step.id === urlStep
      );
      const step = expandedFormSteps[stepIndex];

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
  }, [
    _hasHydrated,
    searchParams,
    completedSteps,
    currentStep,
    setCurrentStep,
    visibleSteps,
  ]);

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
  // Converts indexed objects to arrays before storing
  useEffect(() => {
    if (!isFormReady) return;
    const subscription = methods.watch((value) => {
      // Convert indexed objects to arrays before storing in sessionStorage
      const arrayifiedData = convertIndexedObjectsToArrays(
        value as Record<string, unknown>
      );
      updateFormData(arrayifiedData as Partial<FormData>);
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

    // First, collect parent keys from ALL steps (not just conditional ones)
    // This ensures we track keys used by repeatable/non-conditional steps
    for (const step of expandedFormSteps) {
      // Skip steps without fields
      if (!step.fields || step.fields.length === 0) continue;

      // Check if step is visible (for conditional steps)
      const isVisible =
        !step.conditionalOn ||
        getNestedValue<unknown>(cleanedData, step.conditionalOn.field) ===
          step.conditionalOn.value;

      for (const field of step.fields) {
        const fieldParts = field.name?.split(".");

        if (fieldParts.length > 1) {
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

    // Get all conditional steps from expanded steps
    const conditionalSteps = expandedFormSteps.filter(
      (step) => step.conditionalOn
    );

    // For each conditional step, check if it should be shown and remove hidden fields
    for (const step of conditionalSteps) {
      if (!step.conditionalOn) continue;

      const watchedValue = getNestedValue<unknown>(
        cleanedData,
        step.conditionalOn.field
      );

      // Check if step is visible (for conditional steps)
      const isVisible =
        !step.conditionalOn ||
        getNestedValue<unknown>(cleanedData, step.conditionalOn.field) ===
          step.conditionalOn.value;

      // Only delete simple (non-nested) fields from hidden steps
      if (!isVisible) {
        for (const field of step.fields) {
          const fieldParts = field.name?.split(".");
          if (fieldParts.length === 1) {
            // Simple field - delete directly if step is hidden
            delete cleanedData[field.name];
          }
        }
      }
    }

    // Get all conditional steps from expanded steps
    const conditionalSteps = expandedFormSteps.filter(
      (step) => step.conditionalOn
    );

    // For each conditional step, check if it should be shown and remove hidden fields
    for (const step of conditionalSteps) {
      if (!step.conditionalOn) continue;

      // Use isStepVisible helper which handles both simple and OR logic
      const isVisible = isStepVisible(step, cleanedData as FormData);

      // Only delete simple (non-nested) fields from hidden steps
      if (!isVisible) {
        for (const field of step.fields) {
          const fieldParts = field.name?.split(".");
          if (fieldParts.length === 1) {
            // Simple field - delete directly if step is hidden
            delete cleanedData[field.name];
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

    // Convert indexed objects (e.g., { "0": {...}, "1": {...} }) to arrays
    const arrayifiedData = convertIndexedObjectsToArrays(cleanedData);

    return arrayifiedData as FormData;
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
          result.data?.integrations?.opencrvs?.trackingId ||
            result.data?.submissionId ||
            "N/A",
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
  const isStepVisibleInNav = (step: FormStep): boolean => {
    // Exclude final steps (confirmation/thank-you) from regular navigation
    if (step.id === "confirmation" || step.id === "thank-you") return false;

    if (!step.conditionalOn) return true;

    const formValues = methods.getValues();
    if (isSimpleConditionalRule(step.conditionalOn)) {
      const watchedValue = getNestedValue<unknown>(
        formValues as Record<string, unknown>,
        step.conditionalOn.field
      );
      return watchedValue === step.conditionalOn.value;
    }

    // Handle OR logic
    if ("or" in step.conditionalOn) {
      return step.conditionalOn.or.some((condition) => {
        const fieldValue = getNestedValue(
          formValues as Record<string, unknown>,
          condition.field
        );
        return fieldValue === condition.value;
      });
    }

    return false;
  };

  // Helper function to find the next visible step index
  const findNextVisibleStep = (fromIndex: number): number => {
    for (let i = fromIndex + 1; i < expandedFormSteps.length; i++) {
      if (isStepVisible(expandedFormSteps[i])) {
        return i;
      }
    }
    // If no visible step found, return the last step (confirmation)
    return expandedFormSteps.length - 1;
  };

  // Helper function to find the previous visible step index
  const findPrevVisibleStep = (fromIndex: number): number => {
    for (let i = fromIndex - 1; i >= 0; i--) {
      if (isStepVisible(expandedFormSteps[i])) {
        return i;
      }
    }
    // If no visible step found, return 0
    return 0;
  };

  const nextStep = async () => {
    // Check if current step is the review step (has no fields)
    const currentStepData = expandedFormSteps[currentStep];
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
    const visibleFields = expandedFormSteps[currentStep].fields.filter(
      (field) => {
        // Include field if it has no conditional rule
        if (!field.conditionalOn) return true;

        // Only handle simple conditional rules (not OR rules)
        if (!isSimpleConditionalRule(field.conditionalOn)) return true;

        // Check if conditional field should be visible
        const watchedValue = methods.watch(
          field.conditionalOn.field as keyof FormData
        );
        return watchedValue === field.conditionalOn.value;
      }
    );

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

    for (const field of visibleFields) {
      if (!field.conditionalOn && field.validation.pattern) {
        const fieldValue = methods.getValues(field.name as keyof FormData);
        const stringValue = typeof fieldValue === "string" ? fieldValue : "";

        if (stringValue && stringValue.trim() !== "") {
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

      // Check if current step has an "add another" field and if user selected "yes"
      // This triggers adding a new repeatable step instance
      const addAnotherField = currentStepData.fields.find((field) =>
        field.name.startsWith("_addAnother_")
      );

      if (addAnotherField) {
        const addAnotherValue = methods.getValues(
          addAnotherField.name as keyof FormData
        );
        if (addAnotherValue === "yes") {
          // Extract base step ID from the field name: _addAnother_{baseStepId}_{index}
          const match = addAnotherField.name.match(/^_addAnother_(.+)_(\d+)$/);
          if (match) {
            const baseStepId = match[1];
            // Find the original step to get its ID
            const baseStep = formSteps.find(
              (s) => s.repeatable?.arrayFieldName === baseStepId
            );
            if (baseStep) {
              addRepeatableInstance(baseStep.id);
            }
          }
        }
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
          const escapedSelector = `#${CSS.escape(firstErrorField)}`;
          const element = document.querySelector(escapedSelector);
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

  const currentStepDataRender = expandedFormSteps[currentStep];
  const isReviewStep =
    currentStepDataRender?.fields.length === 0 &&
    currentStepDataRender?.id === "check-your-answers";
  const isDeclarationStep = currentStepDataRender?.id === "declaration";
  const isFinalStep =
    currentStepDataRender?.id === "confirmation" ||
    currentStepDataRender?.id === "thank-you";

  // Check if this is the last navigable step (excluding confirmation/thank-you)
  const lastNavigableStepIndex = expandedFormSteps.findLastIndex(
    (step) => step.id !== "confirmation" && step.id !== "thank-you"
  );
  const isLastStep = currentStep === lastNavigableStepIndex;

  if (isSubmitted && referenceNumber) {
    // Show confirmation page if submitted
    const confirmationStep = expandedFormSteps.find(
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
          <ReviewStep
            formSteps={expandedFormSteps}
            onEdit={handleEditFromReview}
          />
        ) : (
          <DynamicStep
            serviceTitle={serviceTitle}
            step={expandedFormSteps[currentStep]}
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
                Back
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
