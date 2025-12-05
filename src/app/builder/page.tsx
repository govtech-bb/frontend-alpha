"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { ExportModal } from "@/components/form-builder/export-modal";
import { FieldEditor } from "@/components/form-builder/field-editor";
import { FormBuilderCanvas } from "@/components/form-builder/form-builder-canvas";
import { FormBuilderSidebar } from "@/components/form-builder/form-builder-sidebar";
import { FormPreviewModal } from "@/components/form-builder/form-preview-modal";
import { useFormBuilderStore } from "@/store/form-builder-store";
import type { FormStep as ExportFormStep, FormField } from "@/types";

export default function FormBuilderPage() {
  const selectedFieldId = useFormBuilderStore((state) => state.selectedFieldId);
  const steps = useFormBuilderStore((state) => state.steps);
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  const formDescription = useFormBuilderStore((state) => state.formDescription);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Generate export data
  const { jsonContent, filename } = useMemo(() => {
    const exportedSteps: ExportFormStep[] = steps.map((step) => ({
      id: step.id,
      title: step.title,
      description: "",
      fields: step.fields.map((field): FormField => {
        const typeMapping: Record<string, FormField["type"]> = {
          text: "text",
          email: "email",
          tel: "tel",
          number: "number",
          date: "date",
          textarea: "textarea",
          select: "select",
          radio: "radio",
          checkbox: "radio",
        };

        const mappedType = typeMapping[field.type] || "text";

        const formField: FormField = {
          name: field.id,
          label: field.label,
          type: mappedType,
          placeholder: field.placeholder || undefined,
          hint: field.description || undefined,
          validation: field.required
            ? { required: `${field.label} is required` }
            : {},
          options: field.options,
          rows: field.type === "textarea" ? 5 : undefined,
        };

        return Object.fromEntries(
          Object.entries(formField).filter(([, v]) => v !== undefined)
        ) as FormField;
      }),
    }));

    const exportData = {
      formTitle,
      formDescription,
      formSteps: exportedSteps,
    };

    return {
      jsonContent: JSON.stringify(exportData, null, 2),
      filename: `${formTitle.toLowerCase().replace(/\s+/g, "-")}-schema.json`,
    };
  }, [steps, formTitle, formDescription]);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-slate-50">
      {/* Preview Modal */}
      <FormPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* Export Modal */}
      <ExportModal
        filename={filename}
        isOpen={isExportOpen}
        jsonContent={jsonContent}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Main Canvas Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-slate-200 border-b bg-white px-6 py-4">
          <div>
            <h1 className="font-semibold text-slate-900 text-xl">
              Form Builder
            </h1>
            <p className="text-slate-500 text-sm">
              Drag and drop elements to build your form
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700 text-sm transition-colors hover:bg-slate-50"
              onClick={() => setIsPreviewOpen(true)}
              type="button"
            >
              Preview
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-teal-700"
              onClick={() => setIsExportOpen(true)}
              type="button"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Form Canvas */}
          <div className="flex-1 overflow-y-auto p-8">
            <FormBuilderCanvas />
          </div>

          {/* Field Editor Panel - slides in when a field is selected */}
          <div
            className={`w-80 shrink-0 border-slate-200 border-l bg-white transition-all duration-300 ease-in-out ${selectedFieldId ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <FieldEditor />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Element Picker */}
      <FormBuilderSidebar />
    </div>
  );
}
