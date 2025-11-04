import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { FormStep } from "@/types/forms";

/**
 * Options for configuring form navigation behavior
 */
export type FormNavigationOptions = {
  /**
   * Enable URL query parameter sync for browser history support
   * When enabled, navigation will update the URL and respond to browser back/forward buttons
   */
  syncWithUrl?: boolean;
  /**
   * Name of the URL query parameter to use for step tracking
   * @default "step"
   */
  urlParamName?: string;
  /**
   * Base path for the form (used for URL construction)
   * @default current pathname
   */
  basePath?: string;
  /**
   * Indicates whether the form is ready for navigation
   * When false, prevents redirects for "invalid" URL steps during data loading
   * Useful for SSR/hydration scenarios where form data loads asynchronously
   * @default true
   */
  isReady?: boolean;
};

/**
 * Generic hook for managing navigation through a multi-step form
 *
 * This hook is "dumb" about business logic - it only manages:
 * - Current step tracking
 * - Linear navigation (next/back)
 * - Direct navigation (goToStep)
 * - Optional URL sync for browser history support
 *
 * Form-specific logic (conditional steps, branching) should be handled
 * by a separate hook that generates the steps array.
 *
 * Features:
 * - Linear navigation with next/back
 * - Direct navigation to specific steps
 * - Boundary checking (can't go before first or after last)
 * - Works with FormStep objects for rich metadata
 * - Optional URL query parameter sync for browser back/forward button support
 *
 * @param steps - Array of form steps to navigate through
 * @param options - Configuration options for navigation behavior
 * @returns Navigation state and controls
 *
 * @example
 * // Without URL sync (default, backward compatible)
 * const { currentStep, goNext, goBack } = useFormNavigation(steps);
 *
 * @example
 * // With URL sync for browser history support
 * const { currentStep, goNext, goBack } = useFormNavigation(steps, {
 *   syncWithUrl: true,
 *   urlParamName: 'step',
 * });
 */
export function useFormNavigation(
  steps: FormStep[],
  options?: FormNavigationOptions
) {
  // Extract options with defaults
  const {
    syncWithUrl = false,
    urlParamName = "step",
    basePath,
    isReady = true,
  } = options || {};

  // Next.js hooks for URL management (must be called unconditionally per React rules)
  // Values are only used if syncWithUrl is true
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track whether we initiated a URL change (to prevent race conditions)
  // When true, the sync useEffect will ignore the URL change
  const isNavigatingRef = useRef(false);

  // Initialize step index from URL if sync is enabled
  const getInitialStepIndex = (): number => {
    if (syncWithUrl) {
      const stepFromUrl = searchParams.get(urlParamName);
      if (stepFromUrl) {
        const index = steps.findIndex((step) => step.id === stepFromUrl);
        // Return valid index or default to 0
        return index !== -1 ? index : 0;
      }
    }
    return 0;
  };

  const [currentStepIndex, setCurrentStepIndex] = useState(getInitialStepIndex);

  // Current step based on index
  const currentStep = steps[currentStepIndex];

  // Total number of steps
  const totalSteps = steps.length;

  // Helper function to update URL (deferred to avoid React warning)
  const updateUrl = useCallback(
    (stepIndex: number, useReplace = false) => {
      if (syncWithUrl) {
        // Use startTransition to defer URL update to after state commit
        // This avoids "Cannot update component during render" error
        // and properly integrates with React's rendering model
        startTransition(() => {
          const path = basePath || pathname || "";
          const params = new URLSearchParams(searchParams);
          params.set(urlParamName, steps[stepIndex].id);
          const url = `${path}?${params}`;

          if (useReplace) {
            router.replace(url, { scroll: false });
          } else {
            router.push(url, { scroll: false });
          }
        });
      }
    },
    [syncWithUrl, basePath, pathname, searchParams, urlParamName, steps, router]
  );

  // Sync with URL when searchParams change (browser back/forward navigation)
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex logic needed to handle all URL sync cases (missing params, invalid steps, race conditions)
  useEffect(() => {
    if (syncWithUrl) {
      const stepFromUrl = searchParams.get(urlParamName);

      // Handle missing URL param as navigation to first step
      // This fixes browser back button when going back to first step (no param)
      const targetStepId = stepFromUrl || steps[0]?.id;

      if (!targetStepId) {
        // No steps available, nothing to do
        return;
      }

      const index = steps.findIndex((step) => step.id === targetStepId);

      if (index !== -1) {
        // Valid step found
        if (!isNavigatingRef.current && index !== currentStepIndex) {
          // Only update if this was browser navigation (not our own URL change)
          setCurrentStepIndex(index);
        }
        // Clear flag after processing (handles both programmatic and browser nav)
        isNavigatingRef.current = false;
      } else if (stepFromUrl && isReady) {
        // Invalid step in URL - redirect to first step
        // Only redirect if form is ready (data has loaded)
        // This prevents premature redirects during SSR/hydration when data loads async
        updateUrl(0, true); // Use replace for invalid steps
        setCurrentStepIndex(0);
      }
    }
  }, [
    syncWithUrl,
    searchParams,
    urlParamName,
    steps,
    isReady,
    currentStepIndex,
    updateUrl,
  ]);

  /**
   * Navigate to the next step
   * Prevents going beyond the last step
   * Updates URL if sync is enabled (deferred to avoid React warning)
   */
  const goNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const nextIndex = Math.min(prev + 1, steps.length - 1);
      if (nextIndex !== prev) {
        // Set flag to indicate we initiated this navigation
        isNavigatingRef.current = true;
        updateUrl(nextIndex);
      }
      return nextIndex;
    });
  }, [steps.length, updateUrl]);

  /**
   * Navigate to the previous step
   * Prevents going before the first step
   * Updates URL if sync is enabled (deferred to avoid React warning)
   */
  const goBack = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const prevIndex = Math.max(prev - 1, 0);
      if (prevIndex !== prev) {
        // Set flag to indicate we initiated this navigation
        isNavigatingRef.current = true;
        updateUrl(prevIndex);
      }
      return prevIndex;
    });
  }, [updateUrl]);

  /**
   * Jump to a specific step by ID
   * Enables non-linear navigation (e.g., from a review page)
   *
   * Only navigates if the step exists in the current path.
   * This allows forms to support "Edit" links on review pages.
   * Updates URL if sync is enabled (deferred to avoid React warning)
   *
   * @param stepId - The ID of the step to navigate to
   * @param useReplace - If true, use replace instead of push (for URL redirects)
   */
  const goToStep = useCallback(
    (stepId: string, useReplace = false) => {
      const index = steps.findIndex((step) => step.id === stepId);
      if (index !== -1) {
        // Set flag to indicate we initiated this navigation
        isNavigatingRef.current = true;
        setCurrentStepIndex(index);
        updateUrl(index, useReplace);
      }
    },
    [steps, updateUrl]
  );

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    steps,
    goNext,
    goBack,
    goToStep,
  };
}
