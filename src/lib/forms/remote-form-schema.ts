import { z } from "zod";
import type { FormField, FormStep, NestedFormField } from "@/types";

const conditionalRuleSchema = z.object({
  field: z.string(),
  value: z.string(),
});

const selectOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const nonDateValidationSchema = z
  .object({
    required: z.union([z.string(), z.literal(false)]).optional(),
    minLength: z.object({ value: z.number(), message: z.string() }).optional(),
    maxLength: z.object({ value: z.number(), message: z.string() }).optional(),
    pattern: z.object({ value: z.string(), message: z.string() }).optional(),
    min: z.object({ value: z.number(), message: z.string() }).optional(),
    max: z.object({ value: z.number(), message: z.string() }).optional(),
    numberOfFiles: z
      .object({ isEqual: z.number(), message: z.string() })
      .optional(),
    operator: z
      .object({
        condition: z.literal("gte"),
        field: z.string(),
        message: z.string(),
      })
      .optional(),
  })
  .passthrough();

const dateValidationRuleSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("past") }),
  z.object({ type: z.literal("pastOrToday") }),
  z.object({ type: z.literal("future") }),
  z.object({ type: z.literal("futureOrToday") }),
  z.object({
    type: z.literal("after"),
    date: z.string(),
    description: z.string().optional(),
  }),
  z.object({
    type: z.literal("before"),
    date: z.string(),
    description: z.string().optional(),
  }),
  z.object({
    type: z.literal("onOrAfter"),
    date: z.string(),
    description: z.string().optional(),
  }),
  z.object({
    type: z.literal("onOrBefore"),
    date: z.string(),
    description: z.string().optional(),
  }),
  z.object({
    type: z.literal("between"),
    start: z.string(),
    end: z.string(),
    description: z.string().optional(),
  }),
  z.object({ type: z.literal("minYear"), year: z.number() }),
]);

const dateFieldValidationSchema = nonDateValidationSchema
  .extend({
    date: dateValidationRuleSchema.optional(),
  })
  .passthrough();

const baseFieldShape = {
  name: z.string().min(1),
  label: z.string(),
  placeholder: z.string().optional(),
  hint: z.string().optional(),
  hidden: z.boolean().optional(),
  conditionalOn: conditionalRuleSchema.optional(),
  skipValidationWhenShowHideOpen: z.string().optional(),
  width: z.enum(["short", "medium", "two-thirds", "full"]).optional(),
};

const textLikeFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.enum(["text", "email", "number", "tel"]),
    validation: nonDateValidationSchema,
    mask: z.literal("nid").optional(),
    numberConfig: z
      .object({
        default: z.number().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      })
      .optional(),
    readOnly: z.boolean().optional(),
    computedFrom: z
      .object({
        field: z.string(),
        calculation: z.enum(["ageYears"]),
      })
      .optional(),
  })
  .passthrough();

const dateFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.literal("date"),
    validation: dateFieldValidationSchema,
  })
  .passthrough();

const optionFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.enum(["select", "radio"]),
    validation: nonDateValidationSchema,
    options: z.array(selectOptionSchema).min(1),
  })
  .passthrough();

const checkboxFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.literal("checkbox"),
    validation: nonDateValidationSchema,
    options: z.array(selectOptionSchema).optional(),
  })
  .passthrough();

const textareaFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.literal("textarea"),
    validation: nonDateValidationSchema,
    rows: z.number().optional(),
  })
  .passthrough();

const fileFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.literal("file"),
    validation: nonDateValidationSchema,
    accept: z.string().optional(),
    multiple: z.boolean().optional(),
  })
  .passthrough();

const nestedFormFieldSchema: z.ZodType<NestedFormField> = z.lazy(() =>
  z.discriminatedUnion("type", [
    textLikeFormFieldSchema,
    dateFormFieldSchema,
    optionFormFieldSchema,
    checkboxFormFieldSchema,
    textareaFormFieldSchema,
    fileFormFieldSchema,
  ])
) as z.ZodType<NestedFormField>;

const fieldArrayFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.literal("fieldArray"),
    validation: nonDateValidationSchema,
    fieldArray: z.object({
      itemLabel: z.string(),
      addButtonText: z.string(),
      removeButtonText: z.string().optional(),
      minItems: z.number().optional(),
      maxItems: z.number().optional(),
      fields: z.array(nestedFormFieldSchema).optional(),
    }),
  })
  .passthrough();

const showHideFormFieldSchema = z
  .object({
    ...baseFieldShape,
    type: z.literal("showHide"),
    validation: nonDateValidationSchema,
    showHide: z.object({
      summary: z.string(),
      description: z.string().optional(),
      stateFieldName: z.string(),
      fields: z.array(nestedFormFieldSchema),
    }),
  })
  .passthrough();

const formFieldSchema: z.ZodType<FormField> = z.union([
  nestedFormFieldSchema,
  fieldArrayFormFieldSchema,
  showHideFormFieldSchema,
]) as z.ZodType<FormField>;

const contactDetailsSchema = z.object({
  title: z.string(),
  telephoneNumber: z.string(),
  email: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    country: z.string().optional(),
  }),
});

const repeatableStepConfigSchema = z.object({
  arrayFieldName: z.string(),
  maxItems: z.number().optional(),
  addAnotherLabel: z.string().optional(),
  skipAddAnother: z.boolean().optional(),
  sharedFields: z.array(z.string()).optional(),
});

const formStepSchema = z
  .object({
    id: z.string().min(1),
    title: z.string(),
    conditionalTitle: conditionalRuleSchema
      .extend({ title: z.string() })
      .optional(),
    description: z.string().optional(),
    fields: z.array(formFieldSchema),
    conditionalOn: conditionalRuleSchema.optional(),
    bodyContent: z.string().optional(),
    contactDetails: contactDetailsSchema.optional(),
    enableFeedback: z.boolean().optional(),
    referenceNumberLabel: z.string().optional(),
    showReferenceNumber: z.boolean().optional(),
    repeatable: repeatableStepConfigSchema.optional(),
  })
  .passthrough();

/** Top-level JSON envelope stored in S3 (and used by the parser). */
export const remoteFormEnvelopeSchema = z
  .object({
    formName: z.string().min(1),
    formSlug: z.string().min(1),
    ministryName: z.string().optional(),
    ministryDepartment: z.string().optional(),
    program: z.string().optional(),
    contact: z
      .object({
        email: z.string().optional(),
        locations: z.array(z.unknown()).optional(),
      })
      .passthrough()
      .optional(),
    preRequisites: z.array(z.string()).optional(),
    steps: z.array(formStepSchema).min(1),
    lastUpdatedDate: z.string().optional(),
    category: z.string().optional(),
  })
  .passthrough();

export type RemoteFormEnvelope = z.infer<typeof remoteFormEnvelopeSchema>;

export type ParsedRemoteFormDefinition = RemoteFormEnvelope & {
  formSteps: FormStep[];
};

/**
 * Validates unknown JSON from S3 and returns data ready for `DynamicMultiStepForm`.
 * Throws ZodError on failure.
 */
export function parseRemoteFormDefinition(
  data: unknown
): ParsedRemoteFormDefinition {
  const parsed = remoteFormEnvelopeSchema.parse(data);
  return {
    ...parsed,
    formSteps: parsed.steps as FormStep[],
  };
}
