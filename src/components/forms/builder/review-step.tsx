"use client";

import { Button, Heading, Text } from "@govtech-bb/react";
import { useFormContext } from "react-hook-form";
import { formatForDisplay } from "@/lib/dates";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import type { DateObject, FormStep } from "@/types";

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
    .map((step, index) => {
      // Exclude review step, declaration step, and confirmation step
      if (
        step.fields.length === 0 ||
        step.id === "declaration" ||
        step.id === "confirmation"
      ) {
        return null;
      }

      // Exclude conditional steps that don't meet their conditions
      if (step.conditionalOn) {
        const watchedValue = getNestedValue<unknown>(
          formValues as Record<string, unknown>,
          step.conditionalOn.field
        );
        if (watchedValue !== step.conditionalOn.value) {
          return null;
        }
      }

      // Create section data with original step index
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
            if (value.length === 0) return null;

            const nestedFields = field.fieldArray?.fields;

            // Complex field array with nested fields
            if (nestedFields && nestedFields.length > 0) {
              const formattedItems = value.map(
                (item: Record<string, string>, idx: number) => {
                  const parts = nestedFields
                    .map((nf) => {
                      const fieldValue = item[nf.name];
                      if (!fieldValue) return null;
                      return `${nf.label}: ${fieldValue}`;
                    })
                    .filter(Boolean);
                  return parts.length > 0
                    ? `${idx + 1}. ${parts.join(" — ")}`
                    : null;
                }
              );

              displayValue = formattedItems.filter(Boolean).join("\n");
              if (!displayValue) return null;
            } else {
              // Simple field array with { value: string }
              const arrayValues = value as Array<{ value: string }>;
              displayValue = arrayValues
                .map((item) => item.value)
                .filter((v) => v && v !== "")
                .join(", ");

              if (!displayValue) return null;
            }
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
            displayValue = formatForDisplay(value as DateObject);
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
    .filter((section): section is SectionData => section !== null) // Remove excluded conditional steps
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
          className="grid grid-cols-1 gap-y-2 border-grey-00 border-b-4 pb-8 [grid-template-areas:'heading'_'content'_'button'] lg:grid-cols-[1fr_auto] lg:gap-x-2 lg:[grid-template-areas:'heading_button'_'content_content']"
          key={section.title}
        >
          <Heading as="h2" className="[grid-area:heading]">
            {section.title}
          </Heading>

          {/* !!! To replace with the link variant on button component */}
          <Button
            className="justify-self-start [grid-area:button] lg:self-center lg:justify-self-end"
            onClick={() => onEdit(section.stepIndex)}
            type="button"
            variant="link"
          >
            Change
          </Button>

          <dl className="grid grid-cols-1 gap-2 font-normal text-[20px] leading-[1.7] [grid-area:content] lg:gap-4">
            {section.items.map((item, index) => (
              <div className="flex flex-col sm:flex-row lg:gap-x-2" key={index}>
                <dt className="font-bold sm:w-1/3">{item.label}</dt>
                <dd className="sm:w-2/3">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
