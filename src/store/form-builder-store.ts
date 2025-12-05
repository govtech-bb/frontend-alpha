import { create } from "zustand";

export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export type FormFieldConfig = {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder: string;
  description: string;
  required: boolean;
  options?: { label: string; value: string }[];
};

export type FormStep = {
  id: string;
  title: string;
  fields: FormFieldConfig[];
};

type FormBuilderState = {
  steps: FormStep[];
  currentStepIndex: number;
  selectedFieldId: string | null;
  formTitle: string;
  formDescription: string;
};

type FormBuilderActions = {
  // Step actions
  addStep: () => void;
  removeStep: (stepIndex: number) => void;
  setCurrentStep: (stepIndex: number) => void;
  updateStepTitle: (stepIndex: number, title: string) => void;
  // Field actions
  addField: (type: FormFieldType) => void;
  removeField: (id: string) => void;
  selectField: (id: string | null) => void;
  updateField: (id: string, updates: Partial<FormFieldConfig>) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  // Form metadata actions
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  reset: () => void;
};

const getDefaultLabel = (type: FormFieldType): string => {
  const labels: Record<FormFieldType, string> = {
    text: "Text Field",
    email: "Email Address",
    tel: "Phone Number",
    number: "Number",
    date: "Date",
    textarea: "Long Text",
    select: "Dropdown",
    radio: "Radio Options",
    checkbox: "Checkbox",
  };
  return labels[type];
};

const getDefaultPlaceholder = (type: FormFieldType): string => {
  const placeholders: Record<FormFieldType, string> = {
    text: "Enter text...",
    email: "you@example.com",
    tel: "+1 (246) 555-0123",
    number: "0",
    date: "",
    textarea: "Enter your response...",
    select: "Select an option",
    radio: "",
    checkbox: "",
  };
  return placeholders[type];
};

const generateId = (): string =>
  `field_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const generateStepId = (): string =>
  `step_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const createDefaultStep = (stepNumber: number): FormStep => ({
  id: generateStepId(),
  title: `Step ${stepNumber}`,
  fields: [],
});

const initialState: FormBuilderState = {
  steps: [createDefaultStep(1)],
  currentStepIndex: 0,
  selectedFieldId: null,
  formTitle: "Untitled Form",
  formDescription: "Add a description for your form",
};

export const useFormBuilderStore = create<
  FormBuilderState & FormBuilderActions
>((set, _get) => ({
  ...initialState,

  // Step actions
  addStep: () => {
    set((state) => {
      const newStep = createDefaultStep(state.steps.length + 1);
      return {
        steps: [...state.steps, newStep],
        currentStepIndex: state.steps.length,
        selectedFieldId: null,
      };
    });
  },

  removeStep: (stepIndex) => {
    set((state) => {
      // Don't allow removing the last step
      if (state.steps.length <= 1) return state;

      const newSteps = state.steps.filter((_, index) => index !== stepIndex);
      const newCurrentIndex = Math.min(
        state.currentStepIndex,
        newSteps.length - 1
      );

      return {
        steps: newSteps,
        currentStepIndex: newCurrentIndex,
        selectedFieldId: null,
      };
    });
  },

  setCurrentStep: (stepIndex) => {
    set({
      currentStepIndex: stepIndex,
      selectedFieldId: null,
    });
  },

  updateStepTitle: (stepIndex, title) => {
    set((state) => ({
      steps: state.steps.map((step, index) =>
        index === stepIndex ? { ...step, title } : step
      ),
    }));
  },

  // Field actions
  addField: (type) => {
    const newField: FormFieldConfig = {
      id: generateId(),
      type,
      label: getDefaultLabel(type),
      placeholder: getDefaultPlaceholder(type),
      description: "",
      required: false,
      options:
        type === "select" || type === "radio"
          ? [
              { label: "Option 1", value: "option_1" },
              { label: "Option 2", value: "option_2" },
            ]
          : undefined,
    };

    set((state) => ({
      steps: state.steps.map((step, index) =>
        index === state.currentStepIndex
          ? { ...step, fields: [...step.fields, newField] }
          : step
      ),
      selectedFieldId: newField.id,
    }));
  },

  removeField: (id) => {
    set((state) => ({
      steps: state.steps.map((step, index) =>
        index === state.currentStepIndex
          ? { ...step, fields: step.fields.filter((f) => f.id !== id) }
          : step
      ),
      selectedFieldId:
        state.selectedFieldId === id ? null : state.selectedFieldId,
    }));
  },

  selectField: (id) => {
    set({ selectedFieldId: id });
  },

  updateField: (id, updates) => {
    set((state) => {
      const newSelectedFieldId =
        updates.id && state.selectedFieldId === id
          ? updates.id
          : state.selectedFieldId;

      return {
        steps: state.steps.map((step, index) =>
          index === state.currentStepIndex
            ? {
                ...step,
                fields: step.fields.map((f) =>
                  f.id === id ? { ...f, ...updates } : f
                ),
              }
            : step
        ),
        selectedFieldId: newSelectedFieldId,
      };
    });
  },

  reorderFields: (fromIndex, toIndex) => {
    set((state) => {
      const currentStep = state.steps[state.currentStepIndex];
      const newFields = [...currentStep.fields];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);

      return {
        steps: state.steps.map((step, index) =>
          index === state.currentStepIndex
            ? { ...step, fields: newFields }
            : step
        ),
      };
    });
  },

  setFormTitle: (title) => {
    set({ formTitle: title });
  },

  setFormDescription: (description) => {
    set({ formDescription: description });
  },

  reset: () => {
    set({
      ...initialState,
      steps: [createDefaultStep(1)],
    });
  },
}));

// Helper selector to get current step's fields
export const useCurrentStepFields = () =>
  useFormBuilderStore(
    (state) => state.steps[state.currentStepIndex]?.fields ?? []
  );

// Helper selector to get current step
export const useCurrentStep = () =>
  useFormBuilderStore((state) => state.steps[state.currentStepIndex]);
