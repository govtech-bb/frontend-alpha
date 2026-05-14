import { ErrorSummary, Heading, Text } from "@govtech-bb/react";
import { Fragment } from "react";
import { type FieldError, useFormContext } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "@/components/markdown-content";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue, resolveStepTitle } from "@/lib/utils";
import type { FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

type DynamicStepProps = {
  step: FormStep;
  serviceTitle: string;
};

export function DynamicStep({ step, serviceTitle }: DynamicStepProps) {
  const {
    formState: { errors },
    watch,
  } = useFormContext<FormData>();

  let conditionalFieldValue: unknown;
  if (step.conditionalTitle) {
    conditionalFieldValue = watch(step.conditionalTitle.field);
  }
  const resolvedTitle = resolveStepTitle(step, conditionalFieldValue);

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
        const watchedValue = watch(field.conditionalOn.field);
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
          <Text as="p" className="text-mid-grey-00">
            {serviceTitle}
          </Text>
        </div>
        <Heading
          as="h1"
          className="hyphens-auto focus:outline-none"
          id="step-heading"
          tabIndex={-1}
        >
          {resolvedTitle}
        </Heading>
        {step.description && (
          <ReactMarkdown components={markdownComponents}>
            {step.description}
          </ReactMarkdown>
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
          .map((field) => {
            // Find conditional fields that depend on this field
            const conditionalFields = step.fields.filter(
              (f) => f.conditionalOn?.field === field.name
            );
            const notices = step.inlineNotices?.filter(
              (n) => n.afterField === field.name
            );
            return (
              <Fragment key={field.name}>
                <DynamicField
                  conditionalFields={conditionalFields}
                  field={field}
                />
                {notices?.map((notice) => (
                  <div
                    className="space-y-1 rounded-sm bg-blue-10 p-s text-[1.25rem] leading-normal"
                    key={`${notice.afterField}-${notice.title}`}
                  >
                    <p className="font-bold">{notice.title}</p>
                    <p className="text-mid-grey-00">{notice.body}</p>
                  </div>
                ))}
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
