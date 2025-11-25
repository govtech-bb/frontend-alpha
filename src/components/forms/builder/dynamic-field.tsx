import { Input, Radio, RadioGroup, Select, TextArea } from "@govtech-bb/react";
import { Fragment, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import type { FormField } from "@/types";
import { DynamicFieldArray } from "./dynamic-field-array";

type DynamicFieldProps = {
  field: FormField;
  conditionalFields?: FormField[];
};

export function DynamicField({
  field,
  conditionalFields = [],
}: DynamicFieldProps) {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
  } = useFormContext<FormData>();

  const error = errors[field.name as keyof FormData];

  // Watch the current field value for conditional logic
  const currentFieldValue = watch(field.name as keyof FormData);

  // Clear conditional field values when they shouldn't be shown
  // biome-ignore lint/correctness/useExhaustiveDependencies: conditionalFields is derived from static schema and causes infinite loop if included
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: conditional logic requires nested checks for different field types
  useEffect(() => {
    for (const conditionalField of conditionalFields) {
      if (
        conditionalField.conditionalOn &&
        conditionalField.conditionalOn.field === field.name
      ) {
        const shouldShow =
          currentFieldValue === conditionalField.conditionalOn.value;
        const currentValue = getValues(conditionalField.name as keyof FormData);

        // Only clear if field should be hidden AND has a value
        if (!shouldShow && currentValue) {
          // Check if value is non-empty
          const hasValue =
            conditionalField.type === "fieldArray"
              ? Array.isArray(currentValue) && currentValue.length > 0
              : currentValue !== "";

          if (hasValue) {
            // Set appropriate empty value based on field type
            const emptyValue =
              conditionalField.type === "fieldArray"
                ? ([] as FormData[keyof FormData])
                : ("" as FormData[keyof FormData]);

            setValue(conditionalField.name as keyof FormData, emptyValue, {
              shouldValidate: false,
              shouldDirty: false,
            });
          }
        }
      }
    }
  }, [currentFieldValue, field.name, setValue, getValues]);

  // Helper to render a conditional field
  const renderConditionalField = (conditionalField: FormField) => {
    const conditionalError = errors[conditionalField.name as keyof FormData];
    const watchedValue = conditionalField.conditionalOn
      ? watch(conditionalField.conditionalOn.field as keyof FormData)
      : null;
    const shouldShow = watchedValue === conditionalField.conditionalOn?.value;

    if (!shouldShow) return null;

    return (
      <div
        className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200"
        key={conditionalField.name}
      >
        <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
          {conditionalField.type === "fieldArray" ? (
            <DynamicFieldArray field={conditionalField} />
          ) : (
            <Input
              error={conditionalError?.message}
              id={conditionalField.name}
              label={conditionalField.label}
              placeholder={conditionalField.placeholder}
              type={conditionalField.type}
              {...register(conditionalField.name as keyof FormData)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div id={field.name}>
      {/* TODO: Display custom date input if field.type === "date" */}
      {field.type === "select" ? (
        <Select
          error={error?.message}
          label={field.label}
          {...register(field.name as keyof FormData)}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : field.type === "radio" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => (
            <RadioGroup
              error={error?.message}
              label={field.label}
              onValueChange={controllerField.onChange}
              value={controllerField.value as string}
            >
              {field.options?.map((option) => (
                <Fragment key={option.value}>
                  <Radio label={option.label} value={option.value} />
                  {/* Render conditional fields that match this option */}
                  {conditionalFields
                    .filter((cf) => cf.conditionalOn?.value === option.value)
                    .map((cf) => renderConditionalField(cf))}
                </Fragment>
              ))}
            </RadioGroup>
          )}
        />
      ) : field.type === "textarea" ? (
        <TextArea
          {...register(field.name as keyof FormData)}
          error={error?.message}
          label={field.label}
          placeholder={field.placeholder}
          rows={field.rows || 4}
        />
      ) : (
        <Input
          error={error?.message}
          label={field.label}
          type={field.type}
          {...register(field.name as keyof FormData)}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
}
