import { ErrorSummary, Heading, Text } from "@govtech-bb/react";
import { type FieldError, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { ConditionalRule, FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

type DynamicStepProps = {
  step: FormStep;
  serviceTitle: string;
};

/**
 * Type guard to check if a ConditionalRule is a simple field/value rule (not an OR rule)
 */
function isSimpleConditionalRule(
  rule: ConditionalRule
): rule is { field: string; value: string } {
  return "field" in rule;
}

export function DynamicStep({ step, serviceTitle }: DynamicStepProps) {
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
      if (
        field?.conditionalOn &&
        isSimpleConditionalRule(field.conditionalOn)
      ) {
        const watchedValue = watch(field.conditionalOn.field as keyof FormData);
        if (watchedValue !== field.conditionalOn.value) {
          return null; // Don't show error if field is hidden
        }
      }

      if (field) {
        const escapedSelector = `#${CSS.escape(fieldName)}`;

        // If it's a field error with a direct message
        if (error && "message" in error && typeof error.message === "string") {
          return {
            target: escapedSelector,
            text: error.message,
          };
        }

        // If it's a field array with item errors (error is an array or object without direct message)
        if (
          error &&
          (Array.isArray(error) ||
            (typeof error === "object" && Object.keys(error).length > 0))
        ) {
          return {
            target: escapedSelector,
            text: field.validation.required || "This field is required",
          };
        }
      }
      return null;
    })
    .filter(
      (error): error is { target: string; text: string } => error !== null
    );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="border-blue-40 border-l-4 py-xs pl-s">
          <Text as="p" className="text-neutral-midgrey">
            {serviceTitle}
          </Text>
        </div>
        <Heading as="h1" className="focus:outline-none">
          {step.title}
        </Heading>
        {step.description && (
          <Text as="p" className="whitespace-pre-line leading-[1.5]">
            {step.description}
          </Text>
        )}
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
          .map((field, index) => {
            // Find conditional fields that depend on this field
            const conditionalFields = step.fields.filter(
              (f) =>
                f.conditionalOn &&
                isSimpleConditionalRule(f.conditionalOn) &&
                f.conditionalOn.field === field.name
            );
            // Use field name if available, otherwise use index to ensure unique keys
            // This is especially important for heading fields with empty names
            const fieldKey = field.name || `${field.type}-${index}`;
            return (
              <DynamicField
                conditionalFields={conditionalFields}
                field={field}
                key={fieldKey}
              />
            );
          })}
      </div>
    </div>
  );
}
