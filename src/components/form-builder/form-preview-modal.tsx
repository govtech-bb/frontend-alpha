"use client";

import { Input, Select, TextArea } from "@govtech-bb/react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  type FormFieldConfig,
  useFormBuilderStore,
} from "@/store/form-builder-store";

type FormPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FormPreviewModal({ isOpen, onClose }: FormPreviewModalProps) {
  const { steps, formTitle, formDescription } = useFormBuilderStore();
  const [currentPreviewStep, setCurrentPreviewStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset to first step when modal opens
  const handleClose = () => {
    setCurrentPreviewStep(0);
    onClose();
  };

  if (!isOpen) return null;

  const totalSteps = steps.length;
  const isFirstStep = currentPreviewStep === 0;
  const isLastStep = currentPreviewStep === totalSteps - 1;
  const currentStep = steps[currentPreviewStep];
  const hasAnyFields = steps.some((step) => step.fields.length > 0);

  const validateCurrentStep = (): boolean => {
    if (!formRef.current) return true;
    // reportValidity() shows validation messages and returns validity status
    return formRef.current.reportValidity();
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    // Validate current step before navigating
    if (!validateCurrentStep()) {
      return;
    }
    if (!isLastStep) {
      setCurrentPreviewStep((prev) => prev + 1);
    }
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!isFirstStep) {
      setCurrentPreviewStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If not on last step, validate and navigate to next step
    // This handles Enter key presses in form fields
    if (!isLastStep) {
      if (validateCurrentStep()) {
        setCurrentPreviewStep((prev) => prev + 1);
      }
      return;
    }
    // biome-ignore lint/suspicious/noAlert: Used for demo purposes in preview mode
    alert("Form submitted! (Preview mode)");
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-slate-200 border-b px-6 py-4">
          <div>
            <h2 className="font-semibold text-lg text-slate-900">
              Form Preview
            </h2>
            <p className="text-slate-500 text-sm">
              This is how your form will appear to users
            </p>
          </div>
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            onClick={handleClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {hasAnyFields ? (
            <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
              {/* Form Header */}
              <div className="mb-6">
                <h1 className="font-bold text-2xl text-slate-900">
                  {formTitle}
                </h1>
                {formDescription && (
                  <p className="mt-2 text-slate-600">{formDescription}</p>
                )}
              </div>

              {/* Step Progress Indicator (only show if multiple steps) */}
              {totalSteps > 1 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div className="flex flex-1 items-center" key={step.id}>
                        {/* Step Circle */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-medium text-sm transition-colors ${
                              index < currentPreviewStep
                                ? "border-teal-600 bg-teal-600 text-white"
                                : index === currentPreviewStep
                                  ? "border-teal-600 bg-teal-50 text-teal-600"
                                  : "border-slate-200 bg-white text-slate-400"
                            }`}
                          >
                            {index < currentPreviewStep ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <span
                            className={`mt-2 text-xs ${
                              index <= currentPreviewStep
                                ? "font-medium text-slate-900"
                                : "text-slate-400"
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>

                        {/* Connector Line */}
                        {index < totalSteps - 1 && (
                          <div
                            className={`mx-2 h-0.5 flex-1 ${
                              index < currentPreviewStep
                                ? "bg-teal-600"
                                : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Step Title (for multi-step forms) */}
              {totalSteps > 1 && (
                <div className="mb-4 border-slate-200 border-b pb-4">
                  <h2 className="font-semibold text-lg text-slate-800">
                    {currentStep.title}
                  </h2>
                </div>
              )}

              {/* Form Fields for Current Step */}
              {currentStep.fields.length === 0 ? (
                <div className="rounded-lg bg-slate-50 p-8 text-center">
                  <p className="text-slate-500">No fields in this step yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentStep.fields.map((field) => (
                    <PreviewField field={field} key={field.id} />
                  ))}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4 pt-6">
                {totalSteps > 1 && !isFirstStep ? (
                  <button
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    onClick={handlePrevious}
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                {isLastStep ? (
                  <button
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-teal-700"
                    type="submit"
                  >
                    Submit Form
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-teal-700"
                    onClick={handleNext}
                    type="button"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-slate-500">
                No fields added yet. Add some fields to preview your form.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewField({ field }: { field: FormFieldConfig }) {
  const descriptionElement = field.description && (
    <p className="mt-1 text-slate-500 text-sm">{field.description}</p>
  );

  switch (field.type) {
    case "textarea":
      return (
        <div>
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <TextArea
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
          />
        </div>
      );

    case "select":
      return (
        <div>
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <Select id={field.id} name={field.id} required={field.required}>
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
        <fieldset>
          <legend className="mb-2 font-medium text-slate-700">
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </legend>
          {descriptionElement}
          <div className="mt-2 space-y-2">
            {field.options?.map((opt) => (
              <label
                className="flex cursor-pointer items-center gap-3 text-slate-600"
                key={opt.value}
              >
                <input
                  className="h-4 w-4 border-slate-300 text-teal-600 focus:ring-teal-500"
                  name={field.id}
                  required={field.required}
                  type="radio"
                  value={opt.value}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>
      );

    case "checkbox":
      return (
        <div>
          <label className="flex cursor-pointer items-center gap-3 text-slate-700">
            <input
              className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              name={field.id}
              required={field.required}
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
        <div>
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <Input
            id={field.id}
            name={field.id}
            required={field.required}
            type="date"
          />
        </div>
      );

    default:
      return (
        <div>
          <label
            className="mb-1 block font-medium text-slate-700"
            htmlFor={field.id}
          >
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {descriptionElement}
          <Input
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            type={field.type}
          />
        </div>
      );
  }
}
