import { Input, Radio, RadioGroup, Select, TextArea } from "@govtech-bb/react";
import { Fragment, useEffect } from "react";
import { Controller, type FieldError, useFormContext } from "react-hook-form";
import { DateInput } from "@/components/forms/common/date-input";
import type { DateFieldErrors } from "@/lib/dates";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
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

  // Support nested field names (e.g., "guardian.firstName")
  const error = getNestedValue<FieldError>(
    errors as Record<string, unknown>,
    field.name
  );

  // Watch the current field value for conditional logic
  const currentFieldValue = watch(field.name as keyof FormData);

  // Clear conditional field values when they shouldn't be shown
  // biome-ignore lint/correctness/useExhaustiveDependencies: conditionalFields is derived from static schema and causes infinite loop if included
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
          // Check if another conditional field with the same name IS being shown
          // This handles cases where multiple conditional fields share a name (e.g., bank branches)
          const anotherFieldWithSameNameIsShown = conditionalFields.some(
            (cf) =>
              cf.name === conditionalField.name &&
              cf.conditionalOn?.field === field.name &&
              currentFieldValue === cf.conditionalOn?.value
          );

          // Only clear if no other conditional field with this name is visible
          if (!anotherFieldWithSameNameIsShown) {
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
    }
  }, [currentFieldValue, field.name, setValue, getValues]);

  // Helper to render a conditional field
  const renderConditionalField = (conditionalField: FormField) => {
    const conditionalError = getNestedValue<FieldError>(
      errors as Record<string, unknown>,
      conditionalField.name
    );
    const watchedValue = conditionalField.conditionalOn
      ? watch(conditionalField.conditionalOn.field as keyof FormData)
      : null;
    const shouldShow = watchedValue === conditionalField.conditionalOn?.value;

    if (!shouldShow) return null;

    return (
      <div
        className="motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-6 pl-[20px] motion-safe:animate-in motion-safe:duration-200"
        key={`${conditionalField.name}-${conditionalField.conditionalOn?.value}`}
      >
        <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
          {conditionalField.type === "fieldArray" ? (
            <DynamicFieldArray field={conditionalField} />
          ) : conditionalField.type === "date" ? (
            <Controller
              control={control}
              name={conditionalField.name as keyof FormData}
              render={({ field: controllerField }) => {
                // Ensure we always have a string value (handle undefined/null)
                const stringValue =
                  typeof controllerField.value === "string"
                    ? controllerField.value
                    : "";

                // Parse error message into DateFieldErrors format if needed
                const dateErrors: DateFieldErrors | undefined =
                  conditionalError?.message
                    ? {
                        day: conditionalError.message,
                        month: conditionalError.message,
                        year: conditionalError.message,
                      }
                    : undefined;

                return (
                  <DateInput
                    errors={dateErrors}
                    hint={conditionalField.placeholder}
                    id={conditionalField.name}
                    label={conditionalField.label}
                    onChange={controllerField.onChange}
                    value={stringValue}
                  />
                );
              }}
            />
          ) : conditionalField.type === "select" ? (
            <Select
              error={conditionalError?.message}
              label={conditionalField.label}
              {...register(conditionalField.name as keyof FormData)}
            >
              {conditionalField.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
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
      {field.type === "date" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => {
            // Ensure we always have a string value (handle undefined/null)
            const stringValue =
              typeof controllerField.value === "string"
                ? controllerField.value
                : "";

            // Parse error message into DateFieldErrors format if needed
            const dateErrors: DateFieldErrors | undefined = error?.message
              ? {
                  day: error.message,
                  month: error.message,
                  year: error.message,
                }
              : undefined;

            return (
              <DateInput
                errors={dateErrors}
                hint={field.placeholder}
                id={field.name}
                label={field.label}
                onChange={controllerField.onChange}
                value={stringValue}
              />
            );
          }}
        />
      ) : field.type === "select" ? (
        <>
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
          {/* Render conditional fields for select */}
          {conditionalFields.map((cf) => renderConditionalField(cf))}
        </>
      ) : field.type === "radio" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => (
            <RadioGroup
              description={field.hint}
              error={error?.message}
              label={field.label}
              onValueChange={controllerField.onChange}
              value={controllerField.value as string}
            >
              {field.options?.map((option) => (
                <Fragment key={option.value}>
                  <Radio
                    id={option.value}
                    label={option.label}
                    value={option.value}
                  />
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
        <div className="flex flex-col gap-1">
          <label className="font-bold text-lg" htmlFor={field.name}>
            {field.label}
          </label>
          {field.hint && <p className="text-neutral-600">{field.hint}</p>}
          <TextArea
            {...register(field.name as keyof FormData)}
            error={error?.message}
            id={field.name}
            placeholder={field.placeholder}
            rows={field.rows || 4}
          />
        </div>
      ) : field.hint ? (
        <div className="flex flex-col gap-1">
          <label className="font-bold text-lg" htmlFor={field.name}>
            {field.label}
          </label>
          <p className="text-neutral-600">{field.hint}</p>
          <Input
            error={error?.message}
            id={field.name}
            type={field.type}
            {...register(field.name as keyof FormData)}
            placeholder={field.placeholder}
          />
        </div>
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
