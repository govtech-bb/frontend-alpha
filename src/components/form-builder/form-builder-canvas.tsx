"use client";

import { Input, Select, TextArea } from "@govtech-bb/react";
import {
  AlignLeft,
  Calendar,
  ChevronDown,
  Circle,
  GripVertical,
  Hash,
  Mail,
  Phone,
  Plus,
  Square,
  Trash2,
  Type,
  X,
} from "lucide-react";
import {
  type FormFieldConfig,
  type FormFieldType,
  useCurrentStep,
  useFormBuilderStore,
} from "@/store/form-builder-store";

const fieldTypeIcons: Record<FormFieldType, React.ReactNode> = {
  text: <Type className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  tel: <Phone className="h-4 w-4" />,
  number: <Hash className="h-4 w-4" />,
  date: <Calendar className="h-4 w-4" />,
  textarea: <AlignLeft className="h-4 w-4" />,
  select: <ChevronDown className="h-4 w-4" />,
  radio: <Circle className="h-4 w-4" />,
  checkbox: <Square className="h-4 w-4" />,
};

export function FormBuilderCanvas() {
  const {
    steps,
    currentStepIndex,
    selectedFieldId,
    selectField,
    removeField,
    formTitle,
    formDescription,
    setFormTitle,
    setFormDescription,
    addStep,
    removeStep,
    setCurrentStep,
    updateStepTitle,
  } = useFormBuilderStore();

  const currentStep = useCurrentStep();
  const fields = currentStep?.fields ?? [];

  return (
    <div className="mx-auto max-w-2xl">
      {/* Form Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Form Header - Editable Title */}
        <div className="border-slate-100 border-b p-6">
          <input
            className="w-full border-none bg-transparent font-bold text-2xl text-slate-900 placeholder-slate-400 outline-none focus:ring-0"
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Form Title"
            type="text"
            value={formTitle}
          />
          <input
            className="mt-2 w-full border-none bg-transparent text-slate-500 placeholder-slate-400 outline-none focus:ring-0"
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Add a description..."
            type="text"
            value={formDescription}
          />
        </div>

        {/* Step Navigation Tabs */}
        <div className="border-slate-100 border-b bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-1 overflow-x-auto">
              {steps.map((step, index) => (
                <div
                  className={`group relative flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                    index === currentStepIndex
                      ? "bg-white font-medium text-slate-900 shadow-sm ring-1 ring-slate-200"
                      : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                  }`}
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setCurrentStep(index);
                    }
                  }}
                  role="tab"
                  tabIndex={0}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs">
                    {index + 1}
                  </span>
                  <input
                    className="w-20 cursor-text bg-transparent text-sm outline-none focus:ring-0"
                    onChange={(e) => updateStepTitle(index, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={() => setCurrentStep(index)}
                    value={step.title}
                  />
                  {steps.length > 1 && (
                    <button
                      className="ml-1 rounded p-0.5 text-slate-400 opacity-0 transition-opacity hover:bg-slate-200 hover:text-slate-600 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStep(index);
                      }}
                      title="Remove step"
                      type="button"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-300 border-dashed px-3 py-2 text-slate-500 text-sm transition-colors hover:border-teal-400 hover:bg-teal-50 hover:text-teal-600"
              onClick={addStep}
              type="button"
            >
              <Plus className="h-4 w-4" />
              Add Step
            </button>
          </div>
          {steps.length > 1 && (
            <p className="mt-2 text-slate-500 text-xs">
              {steps.length} steps · Editing step {currentStepIndex + 1}
            </p>
          )}
        </div>

        {/* Form Fields for Current Step */}
        <div className="p-6">
          {fields.length === 0 ? (
            <EmptyState stepNumber={currentStepIndex + 1} />
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                // biome-ignore lint/a11y/useSemanticElements: Container has nested interactive elements
                <div
                  className={`group relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    selectedFieldId === field.id
                      ? "border-teal-500 bg-teal-50/50 ring-4 ring-teal-100"
                      : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                  }
                  `}
                  key={field.id}
                  onClick={() => selectField(field.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      selectField(field.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {/* Field Controls */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                      title="Drag to reorder"
                      type="button"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded p-1.5 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(field.id);
                      }}
                      title="Delete field"
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Field Type Badge */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-2 py-1 text-slate-600 text-xs">
                      {fieldTypeIcons[field.type]}
                      <span className="capitalize">{field.type}</span>
                    </span>
                    {field.required && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700 text-xs">
                        Required
                      </span>
                    )}
                    <span className="ml-auto text-slate-400 text-xs">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Field Preview */}
                  <FieldPreview field={field} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldPreview({ field }: { field: FormFieldConfig }) {
  const commonProps = {
    id: field.id,
    disabled: true,
  };

  // Render description if present
  const descriptionElement = field.description && (
    <p className="mt-1 text-slate-500 text-sm">{field.description}</p>
  );

  switch (field.type) {
    case "textarea":
      return (
        <div className="pointer-events-none">
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <TextArea {...commonProps} placeholder={field.placeholder} rows={3} />
        </div>
      );

    case "select":
      return (
        <div className="pointer-events-none">
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <Select {...commonProps}>
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      );

    case "radio":
      return (
        <div className="pointer-events-none">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: Radio group label is for visual grouping */}
          <label className="mb-2 block font-medium text-slate-700">
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <div className="mt-2 space-y-2">
            {field.options?.map((opt) => (
              <label
                className="flex items-center gap-2 text-slate-600"
                key={opt.value}
              >
                <input
                  className="h-4 w-4 border-slate-300"
                  disabled
                  name={field.id}
                  type="radio"
                  value={opt.value}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className="pointer-events-none">
          <label className="flex items-center gap-3 text-slate-700">
            <input
              className="h-5 w-5 rounded border-slate-300"
              disabled
              type="checkbox"
            />
            <span className="font-medium">
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </span>
          </label>
          {descriptionElement}
        </div>
      );

    case "date":
      return (
        <div className="pointer-events-none">
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <Input {...commonProps} placeholder={field.placeholder} type="date" />
        </div>
      );

    default:
      return (
        <div className="pointer-events-none">
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <Input
            {...commonProps}
            placeholder={field.placeholder}
            type={field.type}
          />
        </div>
      );
  }
}

function EmptyState({ stepNumber }: { stepNumber: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-teal-50">
        <svg
          aria-hidden="true"
          className="h-8 w-8 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      </div>
      <h3 className="mb-2 font-semibold text-lg text-slate-900">
        Add fields to Step {stepNumber}
      </h3>
      <p className="max-w-sm text-slate-500">
        Click on elements from the sidebar to add form fields to this step.
      </p>
    </div>
  );
}
