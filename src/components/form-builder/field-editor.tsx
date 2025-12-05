"use client";

import { Plus, Trash2, X } from "lucide-react";
import {
  useCurrentStepFields,
  useFormBuilderStore,
} from "@/store/form-builder-store";

export function FieldEditor() {
  const { selectedFieldId, selectField, updateField } = useFormBuilderStore();
  const fields = useCurrentStepFields();

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <p className="text-slate-400 text-sm">
          Select a field to edit its properties
        </p>
      </div>
    );
  }

  const handleAddOption = () => {
    const currentOptions = selectedField.options || [];
    const newOption = {
      label: `Option ${currentOptions.length + 1}`,
      value: `option_${currentOptions.length + 1}`,
    };
    updateField(selectedField.id, {
      options: [...currentOptions, newOption],
    });
  };

  const handleUpdateOption = (
    index: number,
    key: "label" | "value",
    value: string
  ) => {
    const currentOptions = [...(selectedField.options || [])];
    currentOptions[index] = { ...currentOptions[index], [key]: value };
    updateField(selectedField.id, { options: currentOptions });
  };

  const handleRemoveOption = (index: number) => {
    const currentOptions = [...(selectedField.options || [])];
    currentOptions.splice(index, 1);
    updateField(selectedField.id, { options: currentOptions });
  };

  const showOptionsEditor =
    selectedField.type === "select" || selectedField.type === "radio";

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-slate-200 border-b p-4">
        <h3 className="font-semibold text-slate-900">Edit Field</h3>
        <button
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          onClick={() => selectField(null)}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-5">
          {/* Field ID Input */}
          <div>
            <label
              className="mb-1.5 block font-medium text-slate-700 text-sm"
              htmlFor="field-id"
            >
              Field ID
            </label>
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
              id="field-id"
              onChange={(e) => {
                // Sanitize: lowercase, replace spaces with underscores, remove special chars
                const sanitized = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "_")
                  .replace(/[^a-z0-9_]/g, "");
                updateField(selectedField.id, { id: sanitized });
              }}
              placeholder="field_name"
              type="text"
              value={selectedField.id}
            />
            <p className="mt-1 text-slate-500 text-xs">
              Used as the field name in form submissions
            </p>
          </div>

          {/* Label Input */}
          <div>
            <label
              className="mb-1.5 block font-medium text-slate-700 text-sm"
              htmlFor="field-label"
            >
              Label
            </label>
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              id="field-label"
              onChange={(e) =>
                updateField(selectedField.id, { label: e.target.value })
              }
              placeholder="Enter field label"
              type="text"
              value={selectedField.label}
            />
          </div>

          {/* Placeholder Input - hide for checkbox and radio */}
          {selectedField.type !== "checkbox" &&
            selectedField.type !== "radio" && (
              <div>
                <label
                  className="mb-1.5 block font-medium text-slate-700 text-sm"
                  htmlFor="field-placeholder"
                >
                  Placeholder
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                  id="field-placeholder"
                  onChange={(e) =>
                    updateField(selectedField.id, {
                      placeholder: e.target.value,
                    })
                  }
                  placeholder="Enter placeholder text"
                  type="text"
                  value={selectedField.placeholder}
                />
              </div>
            )}

          {/* Description Input */}
          <div>
            <label
              className="mb-1.5 block font-medium text-slate-700 text-sm"
              htmlFor="field-description"
            >
              Description
            </label>
            <textarea
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              id="field-description"
              onChange={(e) =>
                updateField(selectedField.id, { description: e.target.value })
              }
              placeholder="Help text shown below the field"
              rows={2}
              value={selectedField.description}
            />
          </div>

          {/* Required Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div>
              <p className="font-medium text-slate-700 text-sm">Required</p>
              <p className="text-slate-500 text-xs">
                Field must be filled to submit
              </p>
            </div>
            <button
              aria-checked={selectedField.required}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${selectedField.required ? "bg-teal-600" : "bg-slate-200"}
              `}
              onClick={() =>
                updateField(selectedField.id, {
                  required: !selectedField.required,
                })
              }
              role="switch"
              type="button"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${selectedField.required ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          {/* Options Editor for Select and Radio */}
          {showOptionsEditor && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                {/* biome-ignore lint/a11y/noLabelWithoutControl: Visual heading for options section */}
                <label className="font-medium text-slate-700 text-sm">
                  Options
                </label>
                <button
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-teal-600 text-xs transition-colors hover:bg-teal-50"
                  onClick={handleAddOption}
                  type="button"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add option
                </button>
              </div>
              <div className="space-y-2">
                {selectedField.options?.map((option, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <input
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                      onChange={(e) =>
                        handleUpdateOption(index, "label", e.target.value)
                      }
                      placeholder="Option label"
                      type="text"
                      value={option.label}
                    />
                    <button
                      className="rounded p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      disabled={(selectedField.options?.length ?? 0) <= 1}
                      onClick={() => handleRemoveOption(index)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
