import { ErrorSummary, Heading, Text } from "@govtech-bb/react";
import { type FieldError, useFormContext } from "react-hook-form";
import { StageBanner } from "@/components/stage-banner";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

export function DynamicStep({ step }: { step: FormStep }) {
  const {
    formState: { errors },
    watch,
  } = useFormContext<FormData>();

  // Get errors for the current step's fields (supports nested field names)
  const stepFieldNames = step.fields.map((f) => f.name);
  const stepErrors = stepFieldNames
    .map((fieldName) => {
      const error = getNestedValue<FieldError>(
        errors as Record<string, unknown>,
        fieldName
      );
      const field = step.fields.find((f) => f.name === fieldName);

      // Skip errors for fields that are conditionally hidden
      if (field?.conditionalOn) {
        const watchedValue = watch(field.conditionalOn.field as keyof FormData);
        if (watchedValue !== field.conditionalOn.value) {
          return null; // Don't show error if field is hidden
        }
      }

      if (error?.message && field) {
        return {
          target: `#${fieldName}`,
          text: `${error.message}`,
        };
      }
      return null;
    })
    .filter(
      (error): error is { target: string; text: string } => error !== null
    );

  return (
    <div className="space-y-8">
      <StageBanner stage="alpha" />
      <div>
        <Heading as="h1" className="mb-4 focus:outline-none lg:mb-2">
          {step.title}
        </Heading>

        {step.description && <Text as="p">{step.description}</Text>}
      </div>

      {/* Error Summary - only show if there are errors */}
      {stepErrors.length > 0 && (
        <div id="error-summary">
          <ErrorSummary errors={stepErrors} title="There is a problem" />
        </div>
      )}

      <div className="space-y-4">
        {step.fields
          .filter((field) => !field.conditionalOn)
          .map((field) => {
            // Find conditional fields that depend on this field
            const conditionalFields = step.fields.filter(
              (f) => f.conditionalOn?.field === field.name
            );
            return (
              <DynamicField
                conditionalFields={conditionalFields}
                field={field}
                key={field.name}
              />
            );
          })}
      </div>
    </div>
  );
}
