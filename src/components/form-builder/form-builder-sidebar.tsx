"use client";

import {
  AlignLeft,
  Calendar,
  ChevronDown,
  Circle,
  Hash,
  Mail,
  Phone,
  Square,
  Type,
} from "lucide-react";
import {
  type FormFieldType,
  useFormBuilderStore,
} from "@/store/form-builder-store";

type FieldTypeOption = {
  type: FormFieldType;
  label: string;
  icon: React.ReactNode;
  description: string;
};

const fieldTypes: FieldTypeOption[] = [
  {
    type: "text",
    label: "Text Input",
    icon: <Type className="h-5 w-5" />,
    description: "Single line text",
  },
  {
    type: "email",
    label: "Email",
    icon: <Mail className="h-5 w-5" />,
    description: "Email address field",
  },
  {
    type: "tel",
    label: "Phone",
    icon: <Phone className="h-5 w-5" />,
    description: "Phone number input",
  },
  {
    type: "number",
    label: "Number",
    icon: <Hash className="h-5 w-5" />,
    description: "Numeric input",
  },
  {
    type: "date",
    label: "Date",
    icon: <Calendar className="h-5 w-5" />,
    description: "Date picker",
  },
  {
    type: "textarea",
    label: "Long Text",
    icon: <AlignLeft className="h-5 w-5" />,
    description: "Multi-line text area",
  },
  {
    type: "select",
    label: "Dropdown",
    icon: <ChevronDown className="h-5 w-5" />,
    description: "Select from options",
  },
  {
    type: "radio",
    label: "Radio Group",
    icon: <Circle className="h-5 w-5" />,
    description: "Single choice options",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: <Square className="h-5 w-5" />,
    description: "Toggle yes/no",
  },
];

export function FormBuilderSidebar() {
  const addField = useFormBuilderStore((state) => state.addField);

  return (
    <aside className="w-72 shrink-0 border-slate-200 border-l bg-white">
      <div className="border-slate-200 border-b p-4">
        <h2 className="font-semibold text-slate-900">Form Elements</h2>
        <p className="mt-1 text-slate-500 text-sm">
          Click to add fields to your form
        </p>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {fieldTypes.map((field) => (
            <button
              className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition-all hover:border-teal-300 hover:bg-teal-50 hover:shadow-sm active:scale-[0.98]"
              key={field.type}
              onClick={() => addField(field.type)}
              type="button"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-teal-100 group-hover:text-teal-700">
                {field.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900 text-sm">
                  {field.label}
                </p>
                <p className="truncate text-slate-500 text-xs">
                  {field.description}
                </p>
              </div>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
