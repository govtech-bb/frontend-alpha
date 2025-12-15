import {
  Checkbox,
  DateInput,
  type DateInputValue,
  Input,
  Radio,
  RadioGroup,
  Select,
  ShowHide,
  Text,
  TextArea,
} from "@govtech-bb/react";
import { Fragment, useEffect } from "react";
import { Controller, type FieldError, useFormContext } from "react-hook-form";
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
        className="motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-6 pl-5 motion-safe:animate-in motion-safe:duration-200"
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
                const dateValue: DateInputValue =
                  controllerField.value &&
                  typeof controllerField.value === "object"
                    ? (controllerField.value as DateInputValue)
                    : { day: "", month: "", year: "" };

                return (
                  <DateInput
                    description={conditionalField.placeholder}
                    error={conditionalError?.message}
                    id={conditionalField.name}
                    label={
                      conditionalField.hidden ? "" : conditionalField.label
                    }
                    name={conditionalField.name}
                    onChange={controllerField.onChange}
                    value={dateValue}
                  />
                );
              }}
            />
          ) : conditionalField.type === "select" ? (
            <Select
              error={conditionalError?.message}
              label={conditionalField.hidden ? "" : conditionalField.label}
              {...register(conditionalField.name as keyof FormData)}
            >
              {conditionalField.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ) : conditionalField.type === "textarea" ? (
            <div className="flex flex-col gap-1">
              {!conditionalField.hidden && (
                <label
                  className="font-bold text-lg"
                  htmlFor={conditionalField.name}
                >
                  {conditionalField.label}
                </label>
              )}
              {conditionalField.hint && (
                <Text as="p" className="text-neutral-midgrey" size="body">
                  {conditionalField.hint}
                </Text>
              )}
              <TextArea
                {...register(conditionalField.name as keyof FormData)}
                error={conditionalError?.message}
                id={conditionalField.name}
                placeholder={conditionalField.placeholder}
                rows={conditionalField.rows || 4}
              />
            </div>
          ) : conditionalField.hint ? (
            <div className="flex flex-col gap-1">
              {!conditionalField.hidden && (
                <label
                  className="font-bold text-lg"
                  htmlFor={conditionalField.name}
                >
                  {conditionalField.label}
                </label>
              )}
              <Text as="p" className="text-neutral-midgrey" size="body">
                {conditionalField.hint}
              </Text>
              <Input
                error={conditionalError?.message}
                id={conditionalField.name}
                placeholder={conditionalField.placeholder}
                type={conditionalField.type}
                {...register(conditionalField.name as keyof FormData)}
              />
            </div>
          ) : (
            <Input
              error={conditionalError?.message}
              id={conditionalField.name}
              label={conditionalField.hidden ? "" : conditionalField.label}
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
            // Ensure we always have a DateInputValue object
            const dateValue: DateInputValue =
              controllerField.value && typeof controllerField.value === "object"
                ? (controllerField.value as DateInputValue)
                : { day: "", month: "", year: "" };

            return (
              <DateInput
                description={field.placeholder}
                error={error?.message}
                id={field.name}
                label={field.hidden ? "" : field.label}
                name={field.name}
                onChange={controllerField.onChange}
                value={dateValue}
              />
            );
          }}
        />
      ) : field.type === "select" ? (
        <>
          <Select
            error={error?.message}
            label={field.hidden ? "" : field.label}
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
              label={field.hidden ? "" : field.label}
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
      ) : field.type === "checkbox" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => (
            <Checkbox
              checked={controllerField.value === "yes"}
              id={field.name}
              label={field.hidden ? "" : field.label}
              onCheckedChange={(checked) => {
                controllerField.onChange(checked ? "yes" : "no");
              }}
            />
          )}
        />
      ) : field.type === "showHide" && field.showHide ? (
        (() => {
          // Extract showHide config to help TypeScript narrow the type
          const showHideConfig = field.showHide;
          // Watch the state field to control open/closed state
          const stateValue = watch(
            showHideConfig.stateFieldName as keyof FormData
          );
          const isOpen = stateValue === "open";
          return (
            <ShowHide
              onToggle={(event) => {
                const newIsOpen = (event.target as HTMLDetailsElement).open;
                setValue(
                  showHideConfig.stateFieldName as keyof FormData,
                  (newIsOpen ? "open" : "closed") as FormData[keyof FormData],
                  { shouldValidate: false }
                );

                // Clear passport number field when closing ShowHide
                if (!newIsOpen) {
                  for (const childField of showHideConfig.fields) {
                    setValue(
                      childField.name as keyof FormData,
                      "" as FormData[keyof FormData],
                      { shouldValidate: false }
                    );
                  }
                }
              }}
              open={isOpen}
              summary={showHideConfig.summary}
            >
              <div className="flex flex-col gap-6">
                {showHideConfig.description && (
                  <p className="text-[20px] text-neutral-midgrey leading-[1.7]">
                    {showHideConfig.description}
                  </p>
                )}
                {showHideConfig.fields.map((childField) => {
                  const childError = getNestedValue<FieldError>(
                    errors as Record<string, unknown>,
                    childField.name
                  );
                  return (
                    <div key={childField.name}>
                      {childField.type === "textarea" ? (
                        <div className="flex flex-col gap-1">
                          {!childField.hidden && (
                            <label
                              className="font-bold text-lg"
                              htmlFor={childField.name}
                            >
                              {childField.label}
                            </label>
                          )}
                          {childField.hint && (
                            <Text
                              as="p"
                              className="text-neutral-midgrey"
                              size="body"
                            >
                              {childField.hint}
                            </Text>
                          )}
                          <TextArea
                            {...register(childField.name as keyof FormData)}
                            error={childError?.message}
                            id={childField.name}
                            placeholder={childField.placeholder}
                            rows={childField.rows || 4}
                          />
                        </div>
                      ) : (
                        <Input
                          error={childError?.message}
                          id={childField.name}
                          label={childField.hidden ? "" : childField.label}
                          placeholder={childField.placeholder}
                          type={childField.type}
                          {...register(childField.name as keyof FormData)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </ShowHide>
          );
        })()
      ) : field.type === "textarea" ? (
        <div className="flex flex-col gap-1">
          {!field.hidden && (
            <label className="font-bold text-lg" htmlFor={field.name}>
              {field.label}
            </label>
          )}
          {field.hint && (
            <Text as="p" className="text-neutral-midgrey" size="body">
              {field.hint}
            </Text>
          )}
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
          {!field.hidden && (
            <label className="font-bold text-lg" htmlFor={field.name}>
              {field.label}
            </label>
          )}
          <Text as="p" className="text-neutral-midgrey" size="body">
            {field.hint}
          </Text>
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
          label={field.hidden ? "" : field.label}
          type={field.type}
          {...register(field.name as keyof FormData)}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
}
