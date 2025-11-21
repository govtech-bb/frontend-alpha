import { ErrorSummary } from "@govtech-bb/react";
import { useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import type { FormStep } from "@/types";
import { DynamicField } from "./dynamic-field";

export function DynamicStep({ step }: { step: FormStep }) {
  const {
    formState: { errors },
  } = useFormContext<FormData>();

  // Get errors for the current step's fields
  const stepFieldNames = step.fields.map((f) => f.name);
  const stepErrors = stepFieldNames
    .map((fieldName) => {
      const error = errors[fieldName as keyof FormData];
      const field = step.fields.find((f) => f.name === fieldName);

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
      <div>
        <h1 className="mb-4 font-bold text-[56px] leading-[1.15] focus:outline-none lg:mb-2">
          {step.title}
        </h1>
        {step.description && (
          <p className="mt-1 text-gray-600">{step.description}</p>
        )}
      </div>

      {/* Error Summary - only show if there are errors */}
      {stepErrors.length > 0 && (
        <div id="error-summary">
          <ErrorSummary errors={stepErrors} title="There is a problem" />
        </div>
      )}

      <div className="space-y-4">
        {step.fields.map((field) => (
          <DynamicField field={field} key={field.name} />
        ))}
      </div>
    </div>
  );
}
