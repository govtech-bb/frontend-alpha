"use client";

import { useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import { formSteps } from "@/schema/sports-training-programme-form-schema";

type ReviewStepProps = {
  onEdit: (stepIndex: number) => void;
};

type SectionData = {
  title: string;
  stepIndex: number;
  items: { label: string; value: string }[];
};

export function ReviewStep({ onEdit }: ReviewStepProps) {
  const { getValues } = useFormContext<FormData>();
  const formValues = getValues();

  // Map form values to their respective sections
  const sections: SectionData[] = formSteps
    .filter((step) => step.fields.length > 0) // Exclude review step
    .map((step, index) => {
      const items = step.fields
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
        .map((field) => {
          const value = formValues[field.name as keyof FormData];

          // Skip conditional fields that shouldn't be shown
          if (field.conditionalOn) {
            const watchedValue =
              formValues[field.conditionalOn.field as keyof FormData];
            if (watchedValue !== field.conditionalOn.value) {
              return null; // Don't show if condition not met
            }
          }

          // Skip empty optional fields
          if (!value || value === "") return null;

          // Format the value based on field type
          let displayValue = value as unknown;

          if (field.type === "select" && field.options) {
            const option = field.options.find((opt) => opt.value === value);
            displayValue = option?.label || value;
          }

          if (field.type === "radio" && field.options) {
            const option = field.options.find((opt) => opt.value === value);
            displayValue = option?.label || value;
          }

          if (field.type === "date" && value) {
            // Format date to readable format
            displayValue = new Date(value as string).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            );
          }

          return {
            label: field.label,
            value: displayValue,
          };
        })
        .filter(
          (item): item is { label: string; value: string } => item !== null
        );

      return {
        title: step.title,
        stepIndex: index,
        items,
      };
    })
    .filter((section) => section.items.length > 0); // Only show sections with data

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h1 className="mb-4 font-bold text-[56px] leading-[1.15] focus:outline-none lg:mb-2">
          Check your answers
        </h1>
        <p className="mt-1 text-gray-600">
          Review the answers you've given carefully.
        </p>
        <p className="mt-1 text-gray-600">
          Incorrect information may be difficult to change after registration.
        </p>
      </div>

      {sections.map((section) => (
        <div className="border-gray-200 border-b pb-6" key={section.title}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-lg">
              {section.title}
            </h3>
            <button
              className="font-medium text-blue-600 text-sm underline hover:text-blue-800"
              onClick={() => onEdit(section.stepIndex)}
              type="button"
            >
              Change
            </button>
          </div>

          <dl className="grid grid-cols-1 gap-4">
            {section.items.map((item, index) => (
              <div className="flex flex-col sm:flex-row sm:gap-4" key={index}>
                <dt className="font-medium text-gray-500 text-sm sm:w-1/3">
                  {item.label}
                </dt>
                <dd className="mt-1 text-gray-900 text-sm sm:mt-0 sm:w-2/3">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
