# Building Multi-Step Forms: Complete Guide

This guide shows how to build GOV.BB multi-step forms following the proven architecture from the Register Birth form.

## Core Principles

1. **Explicit over implicit** - No clever abstractions, clear conditional paths
2. **Separation of concerns** - Business logic separate from navigation mechanics
3. **Type safety first** - Discriminated unions for different form paths
4. **Progressive enhancement** - Works without JS, enhanced with auto-save
5. **Accessibility by default** - Focus management, ARIA, semantic HTML

## Quick Start: File Structure

```
src/components/forms/[form-name]/
├── [form-name]-form.tsx              # Main orchestrator
├── types.ts                          # TypeScript definitions
├── schema.ts                         # Zod validation schemas
├── use-[form-name]-steps.ts          # Business logic for step calculation
├── tests/
│   ├── schema.test.ts
│   └── use-[form-name]-steps.test.ts
└── steps/
    ├── step-1.tsx                    # Individual step components
    ├── step-2.tsx
    ├── check-answers.tsx             # Summary page
    ├── confirmation.tsx              # Success page
    └── tests/
        ├── step-1.test.tsx
        └── step-2.test.tsx
```

## Step 1: Define Types (`types.ts`)

### Pattern: Discriminated Unions for Multiple Paths

If your form has different paths based on user choices, use discriminated unions:

```typescript
// Common fields across all paths
type BaseFields = {
  field1: string;
  field2: number;
};

// Path A - Full flow
export interface PathA extends BaseFields {
  decisionField: "yes";
  conditionalData: SomeType;
}

// Path B - Short flow
export interface PathB extends BaseFields {
  decisionField: "no";
  conditionalData: undefined;
}

// Union of all possible valid states
export type MyFormData = PathA | PathB;

// Partial version for form filling
export type PartialMyFormData = {
  field1?: string;
  field2?: number;
  decisionField?: "yes" | "no" | "";
  conditionalData?: SomeType;
};

// Step identifiers
export type StepName =
  | "step-1"
  | "step-2"
  | "conditional-step"
  | "check-answers"
  | "confirmation";
```

### Why Discriminated Unions?

- TypeScript can narrow types based on discriminator field
- Impossible states are unrepresentable
- Self-documenting valid form states

### Simple Linear Forms

If your form has NO conditional paths (all users see the same steps), use a simpler structure:

```typescript
// No discriminated union needed
export interface MyFormData {
  field1: string;
  field2: number;
  field3: string;
}

// Partial version for progressive filling
export type PartialMyFormData = Partial<MyFormData>;

// Step identifiers
export type StepName =
  | "step-1"
  | "step-2"
  | "step-3"
  | "check-answers"
  | "confirmation";
```

And a simple linear hook with no dependencies:

```typescript
export function useMyFormSteps(): FormStep[] {
  return useMemo<FormStep[]>(
    () => [
      { id: "step-1", title: "Step 1" },
      { id: "step-2", title: "Step 2" },
      { id: "step-3", title: "Step 3" },
      { id: "check-answers", title: "Check your answers" },
      { id: "confirmation", title: "Confirmation" },
    ],
    [] // No dependencies - steps never change
  );
}
```

**Use discriminated unions only when:**
- Different user choices lead to different step sequences
- Some fields are only required in certain paths
- Form structure changes based on user input

## Step 2: Create Validation Schemas (`schema.ts`)

### Two-Layer Validation Strategy

**Layer 1: Storage Schema (Permissive)**
- Used for auto-save to sessionStorage
- All fields optional (allows partial saves)

```typescript
import { z } from "zod";

export const myFormStorageSchema = z.object({
  field1: z.string().optional(),
  field2: z.number().optional(),
  decisionField: z.enum(["yes", "no", ""]).optional(),
  conditionalData: z.object({
    // ...
  }).optional(),
});
```

**Layer 2: Per-Step Schemas (Strict)**
- Used for step-by-step validation
- Required fields enforced

```typescript
// Step 1: Simple field
export const step1Validation = z.object({
  field1: z.string().min(1, "Enter field 1"),
});

// Step 2: Decision point
export const step2Validation = z.object({
  decisionField: z.enum(["yes", "no"], {
    message: "Select an option",
  }),
});

// Conditional step (only shown if decisionField === "yes")
export const conditionalStepValidation = z.object({
  conditionalData: z.object({
    name: z.string().min(1, "Enter name"),
    age: z.number().min(0, "Age must be positive"),
  }),
});
```

**Note on Number Fields:**

Number inputs with `.min()` validation may show generic Zod errors like "Expected number, received nan" when the field is empty. Consider using custom error messages:

```typescript
export const myStepValidation = z.object({
  numberOfItems: z
    .number({
      required_error: "Enter the number of items",
      invalid_type_error: "Enter the number of items",
    })
    .int("Number must be a whole number")
    .min(1, "You must request at least 1 item")
    .max(10, "You can request a maximum of 10 items"),
});
```

### Pattern: Factory Functions to Avoid Duplication

If you have similar validation for different entities:

```typescript
function createPersonSchema(personType: "applicant" | "spouse") {
  return z.object({
    firstName: z.string().min(1, `Enter ${personType}'s first name`),
    lastName: z.string().min(1, `Enter ${personType}'s last name`),
    email: z.string().email(`Enter valid ${personType}'s email`),
  });
}

export const applicantValidation = createPersonSchema("applicant");
export const spouseValidation = createPersonSchema("spouse");
```

### Final Submission Schema with Conditional Validation

```typescript
export const finalSubmissionSchema = z.object({
  field1: z.string().min(1),
  field2: z.number(),
  decisionField: z.enum(["yes", "no"]),
  conditionalData: z.object({}).optional(), // Conditionally required
}).superRefine((data, ctx) => {
  // Conditional validation
  if (data.decisionField === "yes") {
    const result = conditionalStepValidation.safeParse({ conditionalData: data.conditionalData });
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          ...issue,
          path: ["conditionalData", ...issue.path],
        });
      }
    }
  }
});
```

### Date Validation with Existing Utilities

The project has existing date validation utilities in `@/lib/dates.ts`. Use these instead of creating new validation functions:

```typescript
import { validateFields } from "@/lib/dates";

export const myStepValidation = z.object({
  dateField: z
    .string()
    .min(1, "Enter the date")
    .refine(
      (val) => {
        if (!val) return false;
        const errors = validateFields(val);
        return errors === null;
      },
      { message: "Enter a valid date" }
    )
    .refine(
      (val) => {
        const date = new Date(val);
        return date <= new Date();
      },
      { message: "Date cannot be in the future" }
    ),
});
```

**Available utilities:**
- `validateFields(dateString)` - Validates YYYY-MM-DD format
- `formatForDisplay(dateString)` - Formats for check-answers page (e.g., "15 January 2024")
- See `src/lib/dates.ts` for all available functions

## Step 3: Business Logic Hook (`use-[form-name]-steps.ts`)

This hook contains ALL business logic for determining which steps to show.

```typescript
import { useMemo } from "react";
import type { FormStep } from "@/types/forms";
import type { PartialMyFormData } from "./types";

export function useMyFormSteps(formData: PartialMyFormData): FormStep[] {
  const { decisionField } = formData;

  return useMemo<FormStep[]>(() => {
    // Path A: User selected "yes" - show conditional step
    if (decisionField === "yes") {
      return [
        { id: "step-1", title: "Step 1" },
        { id: "step-2", title: "Decision" },
        { id: "conditional-step", title: "Additional Info" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Path B: User selected "no" - skip conditional step
    if (decisionField === "no") {
      return [
        { id: "step-1", title: "Step 1" },
        { id: "step-2", title: "Decision" },
        { id: "check-answers", title: "Check your answers" },
        { id: "confirmation", title: "Confirmation" },
      ];
    }

    // Intermediate: Haven't answered decision yet
    if (formData.field1) {
      return [
        { id: "step-1", title: "Step 1" },
        { id: "step-2", title: "Decision" },
      ];
    }

    // Initial: No data yet
    return [{ id: "step-1", title: "Step 1" }];
  }, [decisionField, formData.field1]);
}
```

### Key Principles

- Use `useMemo` with relevant dependencies
- Return explicit arrays for each path
- Handle intermediate states (partial completion)
- No clever algorithms - just clear if/else logic

## Step 4: The Orchestrator (`[form-name]-form.tsx`)

The orchestrator coordinates all pieces.

```typescript
"use client";

import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { useEffect, useState } from "react";
import { useFormNavigation } from "../common/hooks/use-form-navigation";
import { useFormStorage } from "../common/hooks/use-form-storage";
import { myFormStorageSchema, finalSubmissionSchema } from "./schema";
import { useMyFormSteps } from "./use-my-form-steps";
import type { PartialMyFormData } from "./types";

// Import step components
import { Step1 } from "./steps/step-1";
import { Step2 } from "./steps/step-2";
import { ConditionalStep } from "./steps/conditional-step";
import { CheckAnswers } from "./steps/check-answers";
import { Confirmation } from "./steps/confirmation";

export function MyForm() {
  // 1. Storage with versioning
  const { saveFormData, loadFormData, clearFormData } = useFormStorage({
    storageKey: "govbb_my_form_draft",
    version: "my-form-v1.0.0",
    schema: myFormStorageSchema,
    expiryDays: 7,
  });

  // 2. Track submission state
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // 3. Initialize TanStack Form
  const form = useForm({
    defaultValues: {
      field1: "",
      field2: 0,
      decisionField: "",
    } as PartialMyFormData,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        // Validate final data
        const validData = finalSubmissionSchema.parse(value);

        // Submit to API
        const response = await fetch("/api/my-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Submission failed");
        }

        // Success - go to confirmation and clear saved data
        goNext();
        clearFormData();
      } catch (error) {
        setSubmissionError(
          error instanceof Error ? error.message : "An unexpected error occurred"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // 4. Get reactive form values
  const formValues = useStore(form.store, (state) => state.values);

  // 5. Calculate steps based on form state (business logic)
  const steps = useMyFormSteps(formValues);

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
        form.setFieldValue(key as keyof PartialMyFormData, value);
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
        if (values.field1) {
          // Only save if form has been started
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
      {currentStep.id === "step-1" && (
        <Step1
          value={formValues.field1 || ""}
          onChange={(value) => form.setFieldValue("field1", value)}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep.id === "step-2" && (
        <Step2
          value={formValues.decisionField || ""}
          onChange={(value) => form.setFieldValue("decisionField", value)}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {currentStep.id === "conditional-step" && (
        <ConditionalStep
          value={formValues.conditionalData || {}}
          onChange={(update) =>
            form.setFieldValue("conditionalData", {
              ...(formValues.conditionalData || {}),
              ...update,
            })
          }
          onNext={goNext}
          onBack={goBack}
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
        <Confirmation formData={formValues} />
      )}
    </>
  );
}
```

### Why Explicit Step Rendering?

```typescript
// GOOD: Explicit (what we use)
{currentStep.id === "step-1" && (
  <Step1
    value={formValues.field1}
    onChange={(value) => form.setFieldValue("field1", value)}
    onNext={goNext}
  />
)}

// BAD: Implicit component mapping (avoid)
{renderStepFromConfig(currentStep, formValues)}
```

**Explicit wins because:**
- Full TypeScript type checking
- Clear data flow
- Easy to debug
- IDE autocomplete works
- No indirection

## Step 5: Step Components

### Container Classes and Layout

All step components MUST use these exact container classes for proper GOV.BB styling:

```typescript
<form
  className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
  onSubmit={handleSubmit}
  noValidate
>
  <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
    <div className="flex flex-col gap-4">
      <div className="pt-2 lg:pt-0">
        <h1
          className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
          ref={titleRef}
          tabIndex={-1}
        >
          {/* Step title */}
        </h1>
        {/* Form fields */}
      </div>
    </div>

    <div className="flex gap-4">
      <Button type="button" variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button type="submit">Continue</Button>
    </div>
  </div>
</form>
```

**Key classes:**
- `container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16` - Main form container
- `col-span-2 flex flex-col gap-6 lg:gap-8` - Content wrapper
- `text-[56px] leading-[1.15]` - Required h1 size
- `flex gap-4` - Button container spacing

### Pattern 1: Simple Single-Field Step

```typescript
"use client";

import { Button, Radio, RadioGroup } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { step2Validation } from "../schema";

type Step2Props = {
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  onNext: () => void;
  onBack: () => void;
};

export function Step2({ value, onChange, onNext, onBack }: Step2Props) {
  const titleRef = useStepFocus("Decision", "My Form");

  // Wrap value for validation hook (expects object)
  const formValue = { decisionField: value === "" ? undefined : value };
  const handleFormChange = (newValue: { decisionField?: "yes" | "no" }) => {
    if (newValue.decisionField) {
      onChange(newValue.decisionField);
    }
  };

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation({
    schema: step2Validation,
    value: formValue,
    onChange: handleFormChange,
    onNext,
    fieldPrefix: "decision-",
  });

  // Map ValidationError[] to ErrorItem[] for @govtech-bb/react ErrorSummary
  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <form
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="pt-2 lg:pt-0">
            <h1
              className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
              ref={titleRef}
              tabIndex={-1}
            >
              Do you want to provide additional information?
            </h1>

            {errorItems.length > 0 && (
              <ErrorSummary
                errors={errorItems}
                onErrorClick={handleErrorClick}
                title="There is a problem"
              />
            )}
          </div>

          <RadioGroup
            aria-describedby={fieldErrors.decisionField ? "decision-decisionField-error" : undefined}
            aria-invalid={!!fieldErrors.decisionField}
            aria-label="Decision"
            onValueChange={(val) => handleChange("decisionField", val as "yes" | "no")}
            value={value || undefined}
          >
            <Radio id="decision-yes" label="Yes" value="yes" />
            <Radio id="decision-no" label="No" value="no" />
          </RadioGroup>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
}
```

**Note:** Always import `ErrorItem` from `@govtech-bb/react` and map validation errors to this format. Do NOT pass raw errors directly to ErrorSummary.

### Pattern 2: Complex Multi-Field Step

```typescript
"use client";

import { Button, Input, Select } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { DateInput } from "../../common/date-input";
import { conditionalStepValidation } from "../schema";

type ConditionalStepProps = {
  value: Partial<ConditionalData>;
  onChange: (value: Partial<ConditionalData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ConditionalStep({
  value,
  onChange,
  onNext,
  onBack,
}: ConditionalStepProps) {
  const titleRef = useStepFocus("Additional Information", "My Form");

  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: conditionalStepValidation,
      value: { conditionalData: value },
      onChange: (updated) => onChange(updated.conditionalData || {}),
      onNext,
      fieldPrefix: "conditional-",
    });

  // Map ValidationError[] to ErrorItem[] for @govtech-bb/react ErrorSummary
  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <form
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="pt-2 lg:pt-0">
            <h1
              className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
              ref={titleRef}
              tabIndex={-1}
            >
              Tell us more
            </h1>

            {errorItems.length > 0 && (
              <ErrorSummary
                errors={errorItems}
                onErrorClick={handleErrorClick}
                title="There is a problem"
              />
            )}
          </div>

          <Input
            id="conditional-name"
            label="Name"
            value={value.name || ""}
            onChange={(e) => handleChange("conditionalData.name", e.target.value)}
            error={fieldErrors["conditionalData.name"]}
          />

          <Input
            id="conditional-age"
            label="Age"
            type="number"
            value={value.age || ""}
            onChange={(e) => handleChange("conditionalData.age", Number(e.target.value))}
            error={fieldErrors["conditionalData.age"]}
          />

          <DateInput
            id="conditional-date"
            label="Date"
            value={value.date || ""}
            onChange={(dateValue) => handleChange("conditionalData.date", dateValue)}
            errors={dateFieldErrors["conditionalData.date"]}
          />

          <Select
            id="conditional-category"
            label="Category"
            value={value.category || ""}
            onChange={(e) => handleChange("conditionalData.category", e.target.value)}
            error={fieldErrors["conditionalData.category"]}
          >
            <option value="">Select an option</option>
            <option value="A">Category A</option>
            <option value="B">Category B</option>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
}
```

### Pattern 3: Check Answers (Summary) Step

```typescript
"use client";

import { Button } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { finalSubmissionSchema } from "../schema";
import type { PartialMyFormData, StepName } from "../types";

type CheckAnswersProps = {
  formData: PartialMyFormData;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: StepName) => void;
  submissionError?: string | null;
  isSubmitting?: boolean;
};

export function CheckAnswers({
  formData,
  onSubmit,
  onBack,
  onEdit,
  submissionError,
  isSubmitting,
}: CheckAnswersProps) {
  const titleRef = useStepFocus("Check your answers", "My Form");

  // Validate complete data
  const validationResult = finalSubmissionSchema.safeParse(formData);
  const hasMissingData = !validationResult.success;

  if (hasMissingData) {
    return (
      <div className="container py-8">
        <h1 className="mb-4 font-bold text-[56px] leading-[1.15]">
          Missing or invalid information
        </h1>
        <p className="mb-6 text-[20px] leading-[1.7]">
          Please go back and complete all steps correctly.
        </p>
        <Button onClick={onBack}>Back</Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      onSubmit={handleSubmit}
    >
      <div className="col-span-2">
        <h1
          className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
          ref={titleRef}
          tabIndex={-1}
        >
          Check your answers before submitting
        </h1>

      {/* Summary sections */}
      <div className="space-y-6">
        <div className="border-l-4 border-gray-300 pl-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-h3">Step 1</h2>
            <button
              type="button"
              onClick={() => onEdit("step-1")}
              className="text-teal-dark underline"
            >
              Change
            </button>
          </div>
          <dl className="space-y-2">
            <div>
              <dt className="font-bold">Field 1</dt>
              <dd>{formData.field1}</dd>
            </div>
          </dl>
        </div>

        {formData.decisionField === "yes" && formData.conditionalData && (
          <div className="border-l-4 border-gray-300 pl-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-h3">Additional Information</h2>
              <button
                type="button"
                onClick={() => onEdit("conditional-step")}
                className="text-teal-dark underline"
              >
                Change
              </button>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="font-bold">Name</dt>
                <dd>{formData.conditionalData.name}</dd>
              </div>
              <div>
                <dt className="font-bold">Age</dt>
                <dd>{formData.conditionalData.age}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      {submissionError && (
        <div className="border-l-4 border-red-dark bg-red-light p-4">
          <h2 className="font-bold mb-2">Submission failed</h2>
          <p>{submissionError}</p>
        </div>
      )}

        <div className="flex gap-4">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Confirm and send"}
          </Button>
        </div>
      </div>
    </form>
  );
}
```

### Pattern 4: Confirmation Step

```typescript
"use client";

import Link from "next/link";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import type { PartialMyFormData } from "../types";

type ConfirmationProps = {
  formData: PartialMyFormData;
};

export function Confirmation({ formData }: ConfirmationProps) {
  const titleRef = useStepFocus("Application complete", "My Form");

  return (
    <div className="container py-8">
      <div className="max-w-2xl">
        <h1
          className="mb-6 font-bold text-[56px] leading-[1.15]"
          ref={titleRef}
          tabIndex={-1}
        >
          Application complete
        </h1>

        <div className="mb-8 border-l-4 border-teal-dark bg-teal-light p-4">
          <p className="font-bold">Your reference number</p>
          <p className="text-[24px]">ABC-123-XYZ</p>
        </div>

        <p className="mb-6 text-[20px] leading-[1.7]">
          We've sent a confirmation email to {formData.email}.
        </p>

        <h2 className="mb-4 font-bold text-[32px]">What happens next</h2>
        <p className="mb-6 text-[20px] leading-[1.7]">
          We'll process your application and contact you within 5 working days.
        </p>

        <Link
          href="/"
          className="inline-block bg-teal-dark text-white px-6 py-3 font-bold"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
```

## Design System Components

Use components from `@govtech-bb/react`:

### Input
```tsx
<Input
  id="field-name"
  label="Field label"
  value={value}
  onChange={(e) => handleChange("fieldName", e.target.value)}
  error={fieldErrors.fieldName}
  description="Optional helper text"
/>
```

### TextArea
```tsx
<TextArea
  id="field-address"
  label="Address"
  rows={3}
  value={value}
  onChange={(e) => handleChange("address", e.target.value)}
  error={fieldErrors.address}
/>
```

### Select
```tsx
<Select
  id="field-category"
  label="Category"
  value={value}
  onChange={(e) => handleChange("category", e.target.value)}
  error={fieldErrors.category}
>
  <option value="">Select an option</option>
  <option value="A">Option A</option>
  <option value="B">Option B</option>
</Select>
```

### RadioGroup
```tsx
<RadioGroup
  aria-invalid={!!fieldErrors.choice}
  aria-label="Your choice"
  value={value}
  onValueChange={(val) => handleChange("choice", val)}
>
  <Radio id="choice-yes" label="Yes" value="yes" />
  <Radio id="choice-no" label="No" value="no" />
</RadioGroup>
```

### Button
```tsx
<Button type="submit">Continue</Button>
<Button type="button" variant="secondary" onClick={onBack}>Back</Button>
```

### ErrorSummary

The ErrorSummary component requires `ErrorItem[]` format from `@govtech-bb/react`:

```tsx
import type { ErrorItem } from "@govtech-bb/react";
import { ErrorSummary } from "@govtech-bb/react";

// Map ValidationError[] to ErrorItem[] for ErrorSummary
const errorItems: ErrorItem[] = errors.map((error) => ({
  text: error.message,
  target: error.field,
}));

const handleErrorClick = (
  error: ErrorItem,
  event: React.MouseEvent<HTMLAnchorElement>
) => {
  event.preventDefault();
  const element = document.getElementById(error.target);
  if (element) {
    element.focus();
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

// In render:
{errorItems.length > 0 && (
  <ErrorSummary
    errors={errorItems}
    onErrorClick={handleErrorClick}
    title="There is a problem"
  />
)}
```

**IMPORTANT:** You MUST map validation errors to `ErrorItem[]` format. Do NOT pass raw errors directly to ErrorSummary.

### DateInput (Custom)
```tsx
<DateInput
  id="field-date"
  label="Date of birth"
  hint="For example, 27 3 2007 or 27 Mar 2007"
  value={value} // YYYY-MM-DD format
  onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
  errors={dateFieldErrors.dateOfBirth}
/>
```

## Testing Strategy

### Test the Business Logic Hook

```typescript
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMyFormSteps } from "./use-my-form-steps";

describe("useMyFormSteps", () => {
  it("should return 5 steps when decision is yes", () => {
    const formData = { decisionField: "yes", field1: "test" };
    const { result } = renderHook(() => useMyFormSteps(formData));

    expect(result.current).toHaveLength(5);
    expect(result.current.map((s) => s.id)).toEqual([
      "step-1",
      "step-2",
      "conditional-step",
      "check-answers",
      "confirmation",
    ]);
  });

  it("should return 4 steps when decision is no", () => {
    const formData = { decisionField: "no", field1: "test" };
    const { result } = renderHook(() => useMyFormSteps(formData));

    expect(result.current).toHaveLength(4);
    expect(result.current.map((s) => s.id)).not.toContain("conditional-step");
  });

  it("should recalculate when decision changes", () => {
    const { result, rerender } = renderHook(
      (props) => useMyFormSteps(props),
      { initialProps: { decisionField: "yes", field1: "test" } }
    );

    expect(result.current).toHaveLength(5);

    rerender({ decisionField: "no", field1: "test" });

    expect(result.current).toHaveLength(4);
  });
});
```

### Test Step Components

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Step2 } from "./step-2";

describe("Step2", () => {
  const defaultProps = {
    value: "" as "" | "yes" | "no",
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render title and radio buttons", () => {
    render(<Step2 {...defaultProps} />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Yes")).toBeInTheDocument();
    expect(screen.getByLabelText("No")).toBeInTheDocument();
  });

  it("should call onChange when radio button is clicked", () => {
    const onChange = vi.fn();
    render(<Step2 {...defaultProps} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText("Yes"));

    expect(onChange).toHaveBeenCalledWith("yes");
  });

  it("should show validation error when submitted without selection", () => {
    const onNext = vi.fn();
    render(<Step2 {...defaultProps} onNext={onNext} />);

    const form = screen.getByRole("button", { name: /continue/i }).closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should call onNext on valid submission", () => {
    const onNext = vi.fn();
    render(<Step2 {...defaultProps} value="yes" onNext={onNext} />);

    const form = screen.getByRole("button", { name: /continue/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledOnce();
  });

  it("should mark field as invalid after failed submission", () => {
    render(<Step2 {...defaultProps} />);

    const form = screen.getByRole("button", { name: /continue/i }).closest("form");
    fireEvent.submit(form!);

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveAttribute("aria-invalid", "true");
  });
});
```

### Test Validation Schemas

```typescript
import { describe, expect, it } from "vitest";
import { step2Validation, finalSubmissionSchema } from "./schema";

describe("step2Validation", () => {
  it("should accept 'yes' as valid", () => {
    const result = step2Validation.safeParse({ decisionField: "yes" });
    expect(result.success).toBe(true);
  });

  it("should reject empty string with message", () => {
    const result = step2Validation.safeParse({ decisionField: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Select an option");
    }
  });
});

describe("finalSubmissionSchema", () => {
  it("should accept complete data when decision is yes", () => {
    const data = {
      field1: "test",
      field2: 42,
      decisionField: "yes",
      conditionalData: { name: "John", age: 30 },
    };
    const result = finalSubmissionSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should reject when decision is yes but conditionalData is missing", () => {
    const data = {
      field1: "test",
      field2: 42,
      decisionField: "yes",
      // conditionalData missing
    };
    const result = finalSubmissionSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
```

## Common Test Issues and Solutions

### Issue 1: Text Split Across Elements

When testing error messages or labels that may be split across multiple DOM elements:

```typescript
// DON'T: Exact match may fail
expect(screen.getByText("Date of birth")).toBeInTheDocument();

// DO: Use flexible matchers
expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
// OR search in specific elements
expect(screen.getByRole("group", { name: /date of birth/i })).toBeInTheDocument();
```

### Issue 2: Multiple Alert Roles

When testing forms with multiple validation errors:

```typescript
// DON'T: getByRole will fail with multiple alerts
const alert = screen.getByRole("alert");

// DO: Use getAllByRole
const alerts = screen.getAllByRole("alert");
expect(alerts).toHaveLength(2);
expect(alerts[0]).toHaveTextContent(/enter your name/i);
```

### Issue 3: DateInput Component Structure

DateInput renders three separate fields (Day, Month, Year), not a single input:

```typescript
// DON'T: Look for single date input
const dateInput = screen.getByLabelText("Date of birth");

// DO: Check for the date group or individual fields
expect(screen.getByRole("group", { name: /date of birth/i })).toBeInTheDocument();
// OR test individual fields
expect(screen.getByLabelText(/day/i)).toBeInTheDocument();
expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
```

### Issue 4: Flexible Error Message Matching

Validation error messages may vary slightly from Zod defaults:

```typescript
// DON'T: Expect exact Zod default messages
expect(result.error.issues[0].message).toBe("Required");

// DO: Use flexible matching
expect(result.error.issues[0].message).toContain("required");
// OR use regex
expect(result.error.issues[0].message).toMatch(/at least 1|must be 1 or greater/i);
```

### Issue 5: Date Format in Check Answers

Dates are formatted using `formatForDisplay` utility:

```typescript
// DON'T: Expect ISO format
expect(screen.getByText("2024-01-15")).toBeInTheDocument();

// DO: Expect formatted display
expect(screen.getByText("15 January 2024")).toBeInTheDocument();
```

## Complete Checklist

Use this checklist when creating a new form:

### Setup
- [ ] Create form directory: `src/components/forms/[form-name]/`
- [ ] Create `steps/` subdirectory
- [ ] Create `tests/` subdirectories

### Types
- [ ] Create `types.ts`
- [ ] Define base fields
- [ ] Create discriminated unions for different paths (if applicable)
- [ ] Add partial type for form filling
- [ ] Export step name type

### Validation
- [ ] Create `schema.ts`
- [ ] Add storage schema (all fields optional)
- [ ] Add per-step validation schemas
- [ ] Add final submission schema with conditional validation
- [ ] Use factory functions to avoid duplication
- [ ] Write schema tests

### Business Logic
- [ ] Create `use-[form-name]-steps.ts`
- [ ] Implement hook returning `FormStep[]`
- [ ] Use `useMemo` with dependencies
- [ ] Handle all paths explicitly
- [ ] Handle intermediate states
- [ ] Write comprehensive hook tests

### Orchestrator
- [ ] Create `[form-name]-form.tsx`
- [ ] Set up TanStack Form with `useForm`
- [ ] Configure `useFormStorage`
- [ ] Call business logic hook
- [ ] Call `useFormNavigation` with URL sync
- [ ] Load data after hydration (`useEffect`)
- [ ] Implement auto-save with debounce (`useEffect`)
- [ ] Add skeleton loader for hydration
- [ ] Render steps explicitly (not with config/mapping)
- [ ] Handle submission with error recovery

### Step Components
- [ ] Create step component files in `steps/`
- [ ] Props: `value`, `onChange`, `onNext`, `onBack`
- [ ] Use `useStepFocus` for accessibility
- [ ] Use `useStepValidation` for errors
- [ ] Use design system components
- [ ] Add proper container classes (`container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16`)
- [ ] Use correct h1 typography (`text-[56px] leading-[1.15]`)
- [ ] Wrap content in `col-span-2` div
- [ ] Map errors to `ErrorItem[]` format for ErrorSummary
- [ ] Add Back button (except first step)
- [ ] Add Continue/Submit button
- [ ] Create check-answers summary component
- [ ] Create confirmation component
- [ ] Write component tests for each step

### Testing
- [ ] Test business logic hook (all paths)
- [ ] Test step components (render, interact, validate)
- [ ] Test validation schemas (success/failure cases)
- [ ] Test accessibility (ARIA, focus)
- [ ] Run full test suite and fix failures

### Accessibility
- [ ] All forms have `<form>` elements
- [ ] All inputs have labels
- [ ] Error messages use `aria-describedby`
- [ ] Invalid fields have `aria-invalid`
- [ ] Focus moves to h1 on step change
- [ ] Document title updates on step change
- [ ] Error summary has `role="alert"`

### Polish
- [ ] Add proper TypeScript types everywhere
- [ ] Add JSDoc comments to public functions
- [ ] Ensure consistent error messages
- [ ] Test in browser manually
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Add loading states
- [ ] Add error handling

## Common Patterns

### Updating Nested Objects

When a step component manages a nested object:

```typescript
// In orchestrator
{currentStep.id === "person-details" && (
  <PersonDetails
    value={formValues.person || {}}
    onChange={(update) =>
      form.setFieldValue("person", {
        ...(formValues.person || {}),
        ...update,
      })
    }
    onNext={goNext}
    onBack={goBack}
  />
)}
```

### Multi-Field Steps

When a step manages multiple independent fields:

```typescript
// In step component
type ContactInfoProps = {
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

// In orchestrator
{currentStep.id === "contact-info" && (
  <ContactInfo
    email={formValues.email || ""}
    phone={formValues.phone || ""}
    onChange={(field, value) =>
      form.setFieldValue(field as keyof PartialMyFormData, value)
    }
    onNext={goNext}
    onBack={goBack}
  />
)}
```

### Conditional Field Display

Use the form values to show/hide fields:

```typescript
export function PersonDetails({ value, onChange }: PersonDetailsProps) {
  // ... validation setup

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        value={value.hasOtherName || undefined}
        onValueChange={(val) => handleChange("hasOtherName", val)}
      >
        <Radio label="Yes" value="yes" />
        <Radio label="No" value="no" />
      </RadioGroup>

      {value.hasOtherName === "yes" && (
        <Input
          id="other-name"
          label="Other name"
          value={value.otherName || ""}
          onChange={(e) => handleChange("otherName", e.target.value)}
          error={fieldErrors.otherName}
        />
      )}
    </form>
  );
}
```

## Anti-Patterns to Avoid

### ❌ DON'T: Config-Driven Step Rendering

```typescript
// DON'T DO THIS
const stepConfig = [
  { id: "step-1", component: Step1, field: "field1" },
  { id: "step-2", component: Step2, field: "decisionField" },
];

return stepConfig.map((config) => (
  currentStep.id === config.id && (
    <config.component
      value={formValues[config.field]}
      onChange={(v) => form.setFieldValue(config.field, v)}
      {...navigationProps}
    />
  )
));
```

**Why not:** Loses type safety, harder to debug, more indirection

### ❌ DON'T: Generic Step Renderer Component

```typescript
// DON'T DO THIS
<StepRenderer
  config={getStepConfig(currentStep.id)}
  formValues={formValues}
  form={form}
  onNext={goNext}
  onBack={goBack}
/>
```

**Why not:** Props become `any`, special cases require awkward `additionalProps`, harder to understand data flow

### ❌ DON'T: Validation in Components

```typescript
// DON'T DO THIS - validation should be in schema.ts
if (value.length < 5) {
  setError("Must be at least 5 characters");
}
```

**Why not:** Validation logic scattered, not reusable, can't test in isolation

### ❌ DON'T: Uncontrolled Components

```typescript
// DON'T DO THIS
<input ref={inputRef} defaultValue={value} />
```

**Why not:** No single source of truth, auto-save won't work, harder to test

## Summary

Follow these principles:

1. **Explicit step rendering** - No clever mappings
2. **Business logic in hooks** - Separate from navigation
3. **Two-layer validation** - Permissive storage + strict steps
4. **Controlled components** - Form state is source of truth
5. **Type safety** - Use discriminated unions
6. **Accessibility** - Focus management, ARIA, semantic HTML
7. **Progressive enhancement** - Works without JS, enhanced with auto-save

This architecture has proven itself in production with the Register Birth form. It's maintainable, testable, and provides excellent user experience.
