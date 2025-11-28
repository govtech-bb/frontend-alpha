"use client";

import { Heading, Text } from "@govtech-bb/react";
import { useFormContext } from "react-hook-form";
import { formatForDisplay } from "@/lib/dates";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { FormStep } from "@/types";

type ReviewStepProps = {
  formSteps: FormStep[];
  onEdit: (stepIndex: number) => void;
};

type SectionData = {
  title: string;
  stepIndex: number;
  items: { label: string; value: string }[];
};

export function ReviewStep({ formSteps, onEdit }: ReviewStepProps) {
  const { getValues } = useFormContext<FormData>();
  const formValues = getValues();

  // Map form values to their respective sections
  const sections: SectionData[] = formSteps
    .filter((step) => step.fields.length > 0) // Exclude review step
    .map((step, index) => {
      const items = step.fields
        .map((field) => {
          // Support nested field names (e.g., "guardian.firstName")
          const value = getNestedValue<unknown>(
            formValues as Record<string, unknown>,
            field.name
          );

          // Skip conditional fields that shouldn't be shown
          if (field.conditionalOn) {
            const watchedValue = getNestedValue<unknown>(
              formValues as Record<string, unknown>,
              field.conditionalOn.field
            );
            if (watchedValue !== field.conditionalOn.value) {
              return null; // Don't show if condition not met
            }
          }

          // Skip empty optional fields (but allow 0 for number fields)
          if (value === undefined || value === null || value === "")
            return null;

          // Format the value based on field type
          let displayValue = value as unknown;

          // Handle field arrays
          if (field.type === "fieldArray" && Array.isArray(value)) {
            const arrayValues = value as Array<{ value: string }>;
            if (arrayValues.length === 0) return null;

            // Join array values with comma
            displayValue = arrayValues
              .map((item) => item.value)
              .filter((v) => v && v !== "")
              .join(", ");

            if (!displayValue) return null;
          }

          if (field.type === "select" && field.options) {
            const option = field.options.find((opt) => opt.value === value);
            displayValue = option?.label || value;
          }

          if (field.type === "radio" && field.options) {
            const option = field.options.find((opt) => opt.value === value);
            displayValue = option?.label || value;
          }

          if (field.type === "date" && value) {
            // Format date to readable format (e.g., "Jul 30, 2011")
            displayValue = formatForDisplay(value as string);
            if (!displayValue) return null; // Invalid date
          }

          if (field.type === "number") {
            displayValue = String(value);
          }

          return {
            label: field.label,
            value: String(displayValue),
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
    <div className="space-y-6 lg:w-2/3 lg:space-y-8">
      <div>
        <Heading className="mb-4 focus:outline-none" size="h1">
          Check your answers
        </Heading>
        <Text as="p">Review the answers you&apos;ve given carefully.</Text>

        <Text as="p" className="hidden lg:block">
          Incorrect information may be difficult to change after registration.
        </Text>
      </div>

      {sections.map((section) => (
        <div
          className="border-neutral-grey border-b-4 pb-7"
          key={section.title}
        >
          <div className="mb-4 flex items-center justify-between lg:gap-x-2">
            <Heading as="h2">{section.title}</Heading>
            {/* !!! To replace with the link variant on button component */}
            <button
              className="hidden text-[20px] text-teal-dark leading-[1.7] underline hover:text-teal-dark/80 lg:inline"
              onClick={() => onEdit(section.stepIndex)}
              type="button"
            >
              Change
            </button>
          </div>

          <dl className="grid grid-cols-1 gap-2 font-normal text-[20px] leading-[1.7] lg:gap-4">
            {section.items.map((item, index) => (
              <div className="flex flex-col sm:flex-row lg:gap-x-2" key={index}>
                <dt className="font-bold sm:w-1/3">{item.label}</dt>
                <dd className="sm:w-2/3">{item.value}</dd>
              </div>
            ))}
          </dl>
          {/* !!! To replace with the link variant on button component */}
          <button
            className="py-2 font-normal text-[20px] text-teal-dark leading-[1.7] underline hover:text-teal-dark/80 lg:hidden"
            onClick={() => onEdit(section.stepIndex)}
            type="button"
          >
            Change
          </button>
        </div>
      ))}
    </div>
  );
}
