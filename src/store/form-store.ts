import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FormData } from "@/lib/schema-generator";

type FormProgress = {
  currentStep: number;
  completedSteps: number[];
  formData: Partial<FormData>;
  lastSaved: string | null;
  isSubmitted: boolean;
  referenceNumber: string | null;
};

type FormStore = {
  // State
  currentStep: number;
  completedSteps: number[];
  formData: Partial<FormData>;
  lastSaved: string | null;
  isSubmitted: boolean;
  referenceNumber: string | null;
  _hasHydrated: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  getProgress: () => number;
  setHasHydrated: (state: boolean) => void;
  markAsSubmitted: (referenceNumber: string) => void;
};

const initialState: FormProgress = {
  currentStep: 0,
  completedSteps: [],
  formData: {},
  lastSaved: null,
  isSubmitted: false,
  referenceNumber: null,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      _hasHydrated: false,

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        set((state) => {
          const nextStep = state.currentStep + 1;
          return {
            currentStep: nextStep,
          };
        });
      },

      prevStep: () => {
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        }));
      },

      markStepComplete: (step: number) => {
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])],
          lastSaved: new Date().toISOString(),
        }));
      },

      updateFormData: (data: Partial<FormData>) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
          lastSaved: new Date().toISOString(),
        }));
      },

      resetForm: () => {
        set({ ...initialState, _hasHydrated: true });
      },

      getProgress: () => {
        const state = get();
        const totalSteps = 8;
        return Math.round((state.completedSteps.length / totalSteps) * 100);
      },

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },

      markAsSubmitted: (referenceNumber: string) => {
        set({
          isSubmitted: true,
          referenceNumber,
        });
      },
    }),
    {
      name: "multi-step-form-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
