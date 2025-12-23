import {
  Checkbox,
  DateInput,
  type DateInputValue,
  FileUpload,
  Input,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  ShowHide,
  Text,
  TextArea,
} from "@govtech-bb/react";
import { Fragment, useEffect, useState } from "react";
import { Controller, type FieldError, useFormContext } from "react-hook-form";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue } from "@/lib/utils";
import { uploadFile } from "@/services/api";
import type { FormField } from "@/types";
import { DynamicFieldArray } from "./dynamic-field-array";

type FileUploadFieldProps = {
  field: FormField & { type: "file" };
  error?: FieldError;
  value: File[];
  onChange: (files: File[]) => void;
  /** Callback to save uploaded file URLs to form state */
  onUploadComplete: (urls: string[]) => void;
};

/**
 * Wrapper component for FileUpload that handles API upload on file selection
 * and saves uploaded file URLs to form progress storage
 */
function FileUploadField({
  field,
  error,
  value,
  onChange,
  onUploadComplete,
}: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (files: File[]) => {
    // Update form state with the files
    onChange(files);

    // Upload each new file to the API
    if (files.length > 0) {
      setIsUploading(true);
      setUploadError(null);

      try {
        const uploadedUrls: string[] = [];

        // Upload files sequentially
        for (const file of files) {
          const result = await uploadFile(file);
          if (!result.success) {
            setUploadError(result.message ?? "Failed to upload file");
            break;
          }
          // Collect the URL from successful upload
          if (result.data?.url) {
            uploadedUrls.push(result.data.url);
          }
        }

        // Save uploaded URLs to form progress storage
        if (uploadedUrls.length > 0) {
          onUploadComplete(uploadedUrls);
        }
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <FileUpload
      accept={field.accept}
      description={isUploading ? "Uploading..." : (uploadError ?? field.hint)}
      disabled={isUploading}
      error={uploadError ?? error?.message}
      label={field.hidden ? "" : field.label}
      multiple={field.multiple}
      onChange={handleFileChange}
      value={value}
    />
  );
}

type DynamicFieldProps = {
  field: FormField;
  conditionalFields?: FormField[];
};

/**
 * Type guard to check if a ConditionalRule is a simple field/value rule (not an OR rule)
 */
function isSimpleConditionalRule(
  rule: ConditionalRule
): rule is { field: string; value: string } {
  return "field" in rule;
}

/**
 * Get the CSS class for field width
 */
function getWidthClass(width?: "short" | "medium" | "full"): string {
  switch (width) {
    case "short":
      return "w-full md:w-1/3";
    case "medium":
      return "w-full md:w-1/2";
    case "full":
      return "w-full";
    default:
      return "w-full";
  }
}

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
        isSimpleConditionalRule(conditionalField.conditionalOn) &&
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
              cf.conditionalOn &&
              isSimpleConditionalRule(cf.conditionalOn) &&
              cf.conditionalOn.field === field.name &&
              currentFieldValue === cf.conditionalOn.value
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
    const watchedValue =
      conditionalField.conditionalOn &&
      isSimpleConditionalRule(conditionalField.conditionalOn)
        ? watch(conditionalField.conditionalOn.field as keyof FormData)
        : null;
    const shouldShow =
      conditionalField.conditionalOn &&
      isSimpleConditionalRule(conditionalField.conditionalOn)
        ? watchedValue === conditionalField.conditionalOn.value
        : false;

    if (!shouldShow) return null;

    const conditionalKey =
      conditionalField.conditionalOn &&
      isSimpleConditionalRule(conditionalField.conditionalOn)
        ? conditionalField.conditionalOn.value
        : "conditional";

    return (
      <div
        className="motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-6 pl-5 motion-safe:animate-in motion-safe:duration-200"
        key={`${conditionalField.name}-${conditionalKey}`}
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
            conditionalField.hint ? (
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
                <Select
                  error={conditionalError?.message}
                  id={conditionalField.name}
                  {...register(conditionalField.name as keyof FormData)}
                >
                  {conditionalField.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            ) : (
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
            )
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
          ) : conditionalField.type === "number" ? (
            <Controller
              control={control}
              name={conditionalField.name as keyof FormData}
              render={({ field: controllerField }) => (
                <NumberInput
                  description={conditionalField.hint}
                  error={conditionalError?.message}
                  label={conditionalField.hidden ? "" : conditionalField.label}
                  name={controllerField.name}
                  onBlur={controllerField.onBlur}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    controllerField.onChange(value === "" ? "" : Number(value));
                  }}
                  placeholder={conditionalField.placeholder}
                  value={controllerField.value as number | ""}
                />
              )}
            />
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
    <div className={getWidthClass(field.width)} id={field.name}>
      {field.type === "fieldArray" ? (
        <DynamicFieldArray field={field} />
      ) : field.type === "date" ? (
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
          {field.hint ? (
            <div className="flex flex-col gap-1">
              {!field.hidden && (
                <label className="font-bold text-lg" htmlFor={field.name}>
                  {field.label}
                </label>
              )}
              <Text as="p" className="text-neutral-midgrey" size="body">
                {field.hint}
              </Text>
              <Select
                error={error?.message}
                id={field.name}
                {...register(field.name as keyof FormData)}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          ) : (
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
          )}
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
                    .filter(
                      (cf) =>
                        cf.conditionalOn &&
                        isSimpleConditionalRule(cf.conditionalOn) &&
                        cf.conditionalOn.value === option.value
                    )
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
                      ) : childField.type === "number" ? (
                        <Controller
                          control={control}
                          name={childField.name as keyof FormData}
                          render={({ field: controllerField }) => (
                            <NumberInput
                              description={childField.hint}
                              error={childError?.message}
                              label={childField.hidden ? "" : childField.label}
                              name={controllerField.name}
                              onBlur={controllerField.onBlur}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = e.target.value;
                                controllerField.onChange(
                                  value === "" ? "" : Number(value)
                                );
                              }}
                              placeholder={childField.placeholder}
                              value={controllerField.value as number | ""}
                            />
                          )}
                        />
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
      ) : field.type === "file" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => (
            <FileUploadField
              error={error}
              field={field as FormField & { type: "file" }}
              onChange={(files) => controllerField.onChange(files)}
              onUploadComplete={(urls) => {
                // Save uploaded file URLs to a related field in form state
                // This persists the URLs with form progress in session storage
                const urlFieldName = `${field.name}Urls` as keyof FormData;
                setValue(urlFieldName, urls as FormData[keyof FormData], {
                  shouldValidate: false,
                });
              }}
              value={(controllerField.value as File[]) ?? []}
            />
          )}
        />
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
      ) : field.type === "number" ? (
        <Controller
          control={control}
          name={field.name as keyof FormData}
          render={({ field: controllerField }) => (
            <NumberInput
              description={field.hint}
              error={error?.message}
              label={field.hidden ? "" : field.label}
              name={controllerField.name}
              onBlur={controllerField.onBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                controllerField.onChange(value === "" ? "" : Number(value));
              }}
              placeholder={field.placeholder}
              value={controllerField.value as number | ""}
            />
          )}
        />
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
