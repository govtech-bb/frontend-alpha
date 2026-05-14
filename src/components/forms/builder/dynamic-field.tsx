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
  TextArea,
} from "@govtech-bb/react";
import { useMaskito } from "@maskito/react";
import { differenceInYears } from "date-fns";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  type FieldError,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { masks } from "@/lib/masks";
import type { FormData } from "@/lib/schema-generator";
import { getNestedValue, normalizeTextValue } from "@/lib/utils";
import { uploadFile } from "@/services/api";
import type {
  FieldArrayFormField,
  FileFormField,
  FormField,
  TextFormField,
} from "@/types";
import { DynamicFieldArray } from "./dynamic-field-array";

type FileUploadFieldProps = {
  field: FileFormField;
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
      // description={isUploading ? "Uploading..." : (uploadError ?? field.hint)}
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

function ageYearsFromDateInputValue(dob: unknown): string {
  if (!dob || typeof dob !== "object") {
    return "";
  }
  const o = dob as { day?: string; month?: string; year?: string };
  const d = Number.parseInt(String(o.day ?? ""), 10);
  const m = Number.parseInt(String(o.month ?? ""), 10);
  const y = Number.parseInt(String(o.year ?? ""), 10);
  if (!(y && m && d)) {
    return "";
  }
  const birth = new Date(y, m - 1, d);
  if (Number.isNaN(birth.getTime())) {
    return "";
  }
  const age = differenceInYears(new Date(), birth);
  return String(age >= 0 ? age : "");
}

type AgeComputedTextField = TextFormField & {
  computedFrom: { field: string; calculation: "ageYears" };
};

type ComputedAgeFromDateFieldProps = {
  field: AgeComputedTextField;
  fieldError: FieldError | undefined;
};

/**
 * Read-only text field derived from a date field (National ID style DOB object).
 * Keeps RHF state in sync for review/submit steps.
 */
function ComputedAgeFromDateField({
  field,
  fieldError,
}: ComputedAgeFromDateFieldProps) {
  const { control, setValue, getValues } = useFormContext<FormData>();
  const sourceName = field.computedFrom.field;
  const dob = useWatch({ control, name: sourceName as keyof FormData });
  const age = useMemo(() => ageYearsFromDateInputValue(dob), [dob]);

  useEffect(() => {
    const current = getValues(field.name as keyof FormData);
    if (String(current ?? "") === age) {
      return;
    }
    setValue(field.name as keyof FormData, age, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [age, field.name, setValue, getValues]);

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: controllerField }) => (
        <Input
          description={fieldError?.message ?? field.hint}
          error={fieldError?.message}
          id={field.name}
          label={field.hidden ? "" : field.label}
          name={controllerField.name}
          onBlur={controllerField.onBlur}
          onChange={() => {
            controllerField.onChange(age);
          }}
          readOnly
          ref={controllerField.ref}
          type={field.type}
          value={String(controllerField.value ?? age ?? "")}
        />
      )}
    />
  );
}

/**
 * Get the CSS class for field width
 */
function getWidthClass(
  width?: "short" | "medium" | "two-thirds" | "full"
): string {
  switch (width) {
    case "short":
      return "w-full md:w-1/3";
    case "medium":
      return "w-full md:w-1/2";
    case "two-thirds":
      return "w-full md:w-2/3";
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

  // Input mask (e.g., "nid" for National ID format xxxxxx-xxxx)
  const maskType = "mask" in field && field.mask ? field.mask : undefined;
  const maskitoRef = useMaskito({
    options: maskType ? masks[maskType] : undefined,
  });

  /**
   * Wraps `register` for text/tel/textarea fields to normalize the value on blur:
   * strips leading whitespace and trailing whitespace or full stops before validation runs.
   * When `extraRef` is provided, merges it with the register ref (used for Maskito masking).
   */
  const textRegister = useCallback(
    (name: keyof FormData, extraRef?: (node: HTMLElement | null) => void) => {
      const { onBlur: _onBlur, ref: registerRef, ...rest } = register(name);
      return {
        ...rest,
        ref: extraRef
          ? (node: HTMLElement | null) => {
              extraRef(node);
              registerRef(node);
            }
          : registerRef,
        onBlur: (
          e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          const normalized = normalizeTextValue(e.target.value);
          setValue(name, normalized, {
            shouldValidate: false,
            shouldTouch: true,
          });
        },
      };
    },
    [register, setValue]
  );

  // Support nested field names (e.g., "guardian.firstName")
  const error = getNestedValue<FieldError>(
    errors as Record<string, unknown>,
    field.name
  );

  // Watch the current field value for conditional logic
  const currentFieldValue = watch(field.name);

  // Clear conditional field values when they shouldn't be shown
  // biome-ignore lint/correctness/useExhaustiveDependencies: conditionalFields is derived from static schema and causes infinite loop if included
  useEffect(() => {
    for (const conditionalField of conditionalFields) {
      if (!conditionalField.conditionalOn) continue;

      const shouldShow =
        currentFieldValue === conditionalField.conditionalOn.value;
      const currentValue = getValues(conditionalField.name);

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
              : conditionalField.type === "checkbox" &&
                  conditionalField.options &&
                  conditionalField.options.length > 0
                ? Array.isArray(currentValue) && currentValue.length > 0
                : currentValue !== "";

          if (hasValue) {
            // Set appropriate empty value based on field type
            const emptyValue =
              conditionalField.type === "fieldArray"
                ? []
                : conditionalField.type === "checkbox" &&
                    conditionalField.options &&
                    conditionalField.options.length > 0
                  ? []
                  : "";

            setValue(conditionalField.name, emptyValue, {
              shouldValidate: false,
              shouldDirty: false,
            });
          }
        }
      }
    }
  }, [currentFieldValue, field.name, setValue, getValues]);

  /**
   * Renders a conditional field with show/hide animation wrapper.
   * Only shown when the parent field's value matches the condition.
   */
  function renderConditionalField(conditionalField: FormField) {
    const conditionalError = getNestedValue<FieldError>(
      errors as Record<string, unknown>,
      conditionalField.name
    );
    const watchedValue = conditionalField.conditionalOn
      ? watch(conditionalField.conditionalOn.field)
      : null;
    const shouldShow = watchedValue === conditionalField.conditionalOn?.value;

    if (!shouldShow) return null;

    return (
      <div
        className="motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-6 pl-5 motion-safe:animate-in motion-safe:duration-200"
        key={`${conditionalField.name}-${conditionalField.conditionalOn?.value}`}
      >
        <div className="border-grey-00 border-l-8 border-solid pb-4 pl-[52px]">
          {renderFieldContent(conditionalField, conditionalError)}
        </div>
      </div>
    );
  }

  /**
   * Shared field rendering logic. Renders the appropriate form component
   * based on the field type. Used by the main render, conditional fields,
   * and showHide children to avoid duplicating the type-switch logic.
   *
   * @param f - The field configuration to render
   * @param fieldError - The field's current validation error (if any)
   * @param inlineConditionals - Conditional fields to render inline within
   *   select (after options) or radio (next to each matching option)
   */
  function renderFieldContent(
    f: FormField,
    fieldError: FieldError | undefined,
    inlineConditionals?: FormField[]
  ): React.ReactNode {
    switch (f.type) {
      case "fieldArray":
        return <DynamicFieldArray field={f as FieldArrayFormField} />;

      case "date":
        return (
          <Controller
            control={control}
            name={f.name}
            render={({ field: controllerField }) => {
              // Ensure we always have a DateInputValue object
              const dateValue: DateInputValue =
                controllerField.value &&
                typeof controllerField.value === "object"
                  ? (controllerField.value as DateInputValue)
                  : { day: "", month: "", year: "" };

              return (
                <DateInput
                  description={f.hint ?? f.placeholder}
                  error={fieldError?.message}
                  id={f.name}
                  label={f.hidden ? "" : f.label}
                  name={f.name}
                  onChange={controllerField.onChange}
                  value={dateValue}
                />
              );
            }}
          />
        );

      case "select":
        return (
          <>
            <Select
              description={fieldError?.message ?? f.hint}
              error={fieldError?.message}
              label={f.hidden ? "" : f.label}
              {...register(f.name)}
            >
              {f.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {/* Render conditional fields that depend on this select's value */}
            {inlineConditionals?.map((cf) => renderConditionalField(cf))}
          </>
        );

      case "radio":
        return (
          <Controller
            control={control}
            name={f.name}
            render={({ field: controllerField }) => (
              <RadioGroup
                description={f.hint}
                error={fieldError?.message}
                label={f.hidden ? "" : f.label}
                onValueChange={controllerField.onChange}
                value={controllerField.value as string}
              >
                {f.options?.map((option) => {
                  const matchingConditionals =
                    inlineConditionals?.filter(
                      (cf) => cf.conditionalOn?.value === option.value
                    ) ?? [];
                  const groupLabel = f.conditionalGroups?.[option.value]?.label;
                  const showGroup =
                    groupLabel &&
                    matchingConditionals.length > 0 &&
                    controllerField.value === option.value;
                  return (
                    <Fragment key={option.value}>
                      <Radio
                        id={
                          inlineConditionals
                            ? option.value
                            : `${f.name}-${option.value}`
                        }
                        label={option.label}
                        value={option.value}
                      />
                      {showGroup ? (
                        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 mt-6 pl-5 motion-safe:animate-in motion-safe:duration-200">
                          <div className="space-y-6 border-blue-40 border-l-4 py-2 pl-s lg:w-[50vw]">
                            <p className="font-bold text-[20px] text-mid-grey-00 leading-[1.7]">
                              {groupLabel}
                            </p>
                            {matchingConditionals.map((cf) => {
                              const condError = getNestedValue<FieldError>(
                                errors as Record<string, unknown>,
                                cf.name
                              );
                              return (
                                <div key={cf.name}>
                                  {renderFieldContent(cf, condError)}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        matchingConditionals.map((cf) =>
                          renderConditionalField(cf)
                        )
                      )}
                    </Fragment>
                  );
                })}
              </RadioGroup>
            )}
          />
        );

      case "checkbox": {
        const groupOptions = f.options;
        if (groupOptions && groupOptions.length > 0) {
          return (
            <Controller
              control={control}
              name={f.name}
              render={({ field: controllerField }) => {
                const selected: string[] = Array.isArray(controllerField.value)
                  ? controllerField.value
                  : [];
                return (
                  <fieldset
                    className={`min-w-0 border-0 p-0 ${getWidthClass(f.width)}`}
                  >
                    {f.hidden ? null : (
                      <legend className="mb-2 font-bold text-[20px] text-mid-grey-00 leading-[1.7]">
                        {f.label}
                      </legend>
                    )}
                    {f.hint ? (
                      <p className="mb-3 text-[20px] text-mid-grey-00 leading-[1.7]">
                        {f.hint}
                      </p>
                    ) : null}
                    <div className="flex flex-col gap-3">
                      {groupOptions.map((option) => (
                        <Checkbox
                          checked={selected.includes(option.value)}
                          id={`${f.name}-${option.value}`}
                          key={option.value}
                          label={option.label}
                          onCheckedChange={(checked) => {
                            const next = checked
                              ? [...selected, option.value]
                              : selected.filter((v) => v !== option.value);
                            controllerField.onChange(next);
                          }}
                        />
                      ))}
                    </div>
                    {fieldError?.message ? (
                      <p className="mt-2 text-[20px] text-red-600" role="alert">
                        {fieldError.message}
                      </p>
                    ) : null}
                  </fieldset>
                );
              }}
            />
          );
        }
        return (
          <Controller
            control={control}
            name={f.name}
            render={({ field: controllerField }) => (
              <Checkbox
                checked={controllerField.value === "yes"}
                id={f.name}
                label={f.hidden ? "" : f.label}
                onCheckedChange={(checked) => {
                  controllerField.onChange(checked ? "yes" : "no");
                }}
              />
            )}
          />
        );
      }

      case "showHide": {
        if (!f.showHide) return null;
        const showHideConfig = f.showHide;
        const stateValue = watch(showHideConfig.stateFieldName);
        const isOpen = stateValue === "open";
        return (
          <ShowHide
            onToggle={(event) => {
              const newIsOpen = (event.target as HTMLDetailsElement).open;
              setValue(
                showHideConfig.stateFieldName,
                newIsOpen ? "open" : "closed",
                { shouldValidate: false }
              );

              // Clear child field values when closing ShowHide
              if (!newIsOpen) {
                for (const childField of showHideConfig.fields) {
                  setValue(childField.name, "", { shouldValidate: false });
                }
              }
            }}
            open={isOpen}
            summary={showHideConfig.summary}
          >
            <div className="flex flex-col gap-6">
              {showHideConfig.description && (
                <p className="text-[20px] text-mid-grey-00 leading-[1.7]">
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
                    {renderFieldContent(childField, childError)}
                  </div>
                );
              })}
            </div>
          </ShowHide>
        );
      }

      case "file":
        return (
          <Controller
            control={control}
            name={f.name}
            render={({ field: controllerField }) => (
              <FileUploadField
                error={fieldError}
                field={f as FileFormField}
                onChange={(files) => controllerField.onChange(files)}
                onUploadComplete={(urls) => {
                  // Save uploaded file URLs to a related field in form state
                  // (e.g., "documentsUrls" for a "documents" file field).
                  // This persists the URLs with form progress in session storage.
                  const urlFieldName = `${f.name}Urls`;
                  setValue(urlFieldName, urls, {
                    shouldValidate: false,
                  });
                }}
                value={(controllerField.value as File[]) ?? []}
              />
            )}
          />
        );

      case "textarea":
        return (
          <TextArea
            {...textRegister(f.name)}
            description={fieldError?.message ?? f.hint}
            error={fieldError?.message}
            id={f.name}
            label={f.hidden ? "" : f.label}
            placeholder={f.placeholder}
            rows={f.rows || 4}
          />
        );

      case "number":
        return (
          <Controller
            control={control}
            name={f.name}
            render={({ field: controllerField }) => (
              <NumberInput
                description={fieldError?.message ?? f.hint}
                error={fieldError?.message}
                label={f.hidden ? "" : f.label}
                max={f.numberConfig?.max}
                min={f.numberConfig?.min}
                name={controllerField.name}
                onBlur={controllerField.onBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  controllerField.onChange(value === "" ? "" : Number(value));
                }}
                placeholder={f.placeholder}
                value={controllerField.value as number | ""}
              />
            )}
          />
        );

      default: {
        const textField = f as TextFormField;
        if (textField.computedFrom?.calculation === "ageYears") {
          return (
            <ComputedAgeFromDateField
              field={textField as AgeComputedTextField}
              fieldError={fieldError}
            />
          );
        }

        const fieldMask = "mask" in f && f.mask ? f.mask : undefined;
        const activeMaskitoRef = fieldMask ? maskitoRef : undefined;

        return (
          <Input
            description={fieldError?.message ?? f.hint}
            error={fieldError?.message}
            label={f.hidden ? "" : f.label}
            readOnly={Boolean(textField.readOnly)}
            type={f.type}
            {...textRegister(f.name, activeMaskitoRef)}
            placeholder={f.placeholder}
          />
        );
      }
    }
  }

  return (
    <div className={getWidthClass(field.width)} id={field.name}>
      {renderFieldContent(field, error, conditionalFields)}
    </div>
  );
}
