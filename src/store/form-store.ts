import type { StoreApi, UseBoundStore } from "zustand";
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
  customerName: string | null;
  totalSteps: number;
};

type FormStore = {
  // State
  currentStep: number;
  completedSteps: number[];
  formData: Partial<FormData>;
  lastSaved: string | null;
  isSubmitted: boolean;
  referenceNumber: string | null;
  customerName: string | null;
  totalSteps: number;
  _hasHydrated: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  getProgress: () => number;
  setHasHydrated: (state: boolean) => void;
  markAsSubmitted: (referenceNumber: string, customerName?: string) => void;
  clearFormDataKeepSubmission: () => void;
};

const initialState: FormProgress = {
  currentStep: 0,
  completedSteps: [],
  formData: {},
  lastSaved: null,
  isSubmitted: false,
  referenceNumber: null,
  customerName: null,
  totalSteps: 1,
};

// Store cache to ensure singleton pattern per storage key
const storeCache = new Map<string, UseBoundStore<StoreApi<FormStore>>>();

/**
 * Creates or retrieves a cached form store with a custom storage key
 * This allows multiple forms to maintain separate storage while ensuring
 * each storage key maps to a single store instance (singleton pattern)
 *
 * @param storageKey - Unique identifier for the form storage (e.g., "sports-training-form")
 * @returns Zustand store hook with persist middleware
 *
 * @example
 * const useFormStore = createFormStore("sports-training-form");
 * const useBirthRegistrationStore = createFormStore("birth-registration-form");
 */
export function createFormStore(
  storageKey: string
): UseBoundStore<StoreApi<FormStore>> {
  // Return cached store if it exists
  if (storeCache.has(storageKey)) {
    return storeCache.get(storageKey)!;
  }

  // Create new store
  const store = create<FormStore>()(
    persist(
      (set, get) => ({
        ...initialState,
        _hasHydrated: false,

        setCurrentStep: (step: number) => {
          set({ currentStep: step });
        },

        setTotalSteps: (total: number) => {
          set({ totalSteps: total });
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
          const totalSteps = state.totalSteps || 1;
          return Math.round((state.completedSteps.length / totalSteps) * 100);
        },

        setHasHydrated: (state: boolean) => {
          set({ _hasHydrated: state });
        },

        markAsSubmitted: (referenceNumber: string, customerName?: string) => {
          set({
            isSubmitted: true,
            referenceNumber,
            customerName: customerName || null,
          });
        },

        clearFormDataKeepSubmission: () => {
          set((state) => ({
            currentStep: 0,
            completedSteps: [],
            formData: {},
            lastSaved: null,
            // Keep submission state
            isSubmitted: state.isSubmitted,
            referenceNumber: state.referenceNumber,
            customerName: state.customerName,
          }));
        },
      }),
      {
        name: storageKey,
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  );

  // Cache the store
  storeCache.set(storageKey, store);

  return store;
}
