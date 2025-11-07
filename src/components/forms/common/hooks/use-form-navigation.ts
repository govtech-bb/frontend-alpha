import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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

  // Next.js hooks for URL management
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- Dual Mode Support ---
  // Mode 1: Without URL sync - use internal useState
  // Mode 2: With URL sync - derive from URL (source of truth)

  // Internal state for non-URL-synced mode
  const [internalStepIndex, setInternalStepIndex] = useState(0);

  // URL-derived state for URL-synced mode
  const urlStepIndex = useMemo(() => {
    if (steps.length === 0) {
      return 0;
    }
    const stepFromUrl = searchParams.get(urlParamName);

    // The first step (index 0) is represented by the absence of the URL param for a cleaner entry URL.
    if (!stepFromUrl) {
      return 0;
    }

    const index = steps.findIndex((step) => step.id === stepFromUrl);

    // If the step ID from the URL is invalid, default to the first step.
    // A separate useEffect will handle correcting the URL.
    return index !== -1 ? index : 0;
  }, [searchParams, urlParamName, steps]);

  // Use URL-derived index if syncing, otherwise use internal state
  const currentStepIndex = syncWithUrl ? urlStepIndex : internalStepIndex;

  // Current step based on derived index
  const currentStep = steps[currentStepIndex];
  // Total number of steps
  const totalSteps = steps.length;

  // Effect to handle invalid step IDs in the URL.
  // If the URL contains a step that doesn't exist, this corrects the URL
  // by redirecting to the first step, ensuring URL and state are always valid.
  useEffect(() => {
    if (syncWithUrl && isReady && steps.length > 0) {
      const stepFromUrl = searchParams.get(urlParamName);
      const isValidStep = stepFromUrl
        ? steps.some((s) => s.id === stepFromUrl)
        : true; // No param is valid (it means we are on the first step)

      if (!isValidStep) {
        const path = basePath || pathname || "";
        const params = new URLSearchParams(searchParams);
        // Correct the invalid step by removing the param, which corresponds to step 0.
        params.delete(urlParamName);
        const queryString = params.toString();
        const url = queryString ? `${path}?${queryString}` : path;
        router.replace(url, { scroll: false });
      }
    }
  }, [
    syncWithUrl,
    isReady,
    steps,
    searchParams,
    urlParamName,
    basePath,
    pathname,
    router,
  ]);

  const navigate = useCallback(
    (targetIndex: number, useReplace = false) => {
      if (targetIndex === currentStepIndex) {
        // Already on target step, no need to navigate
        return;
      }

      if (!syncWithUrl) {
        // Non-URL-synced mode: Update internal state directly
        setInternalStepIndex(targetIndex);
        return;
      }

      // URL-synced mode: Update the URL (component will re-render with new URL-derived state)
      const path = basePath || pathname || "";
      const params = new URLSearchParams(searchParams);

      // Rule: index 0 has no URL param. All other steps have one.
      if (targetIndex === 0) {
        params.delete(urlParamName);
      } else {
        params.set(urlParamName, steps[targetIndex].id);
      }

      const queryString = params.toString();
      const url = queryString ? `${path}?${queryString}` : path;
      const navMethod = useReplace ? router.replace : router.push;
      navMethod(url, { scroll: false });
    },
    [
      syncWithUrl,
      currentStepIndex,
      basePath,
      pathname,
      searchParams,
      urlParamName,
      steps,
      router,
    ]
  );

  /**
   * Navigate to the next step
   */
  const goNext = useCallback(() => {
    if (syncWithUrl) {
      // URL-synced: calculate and navigate
      const nextIndex = Math.min(currentStepIndex + 1, totalSteps - 1);
      navigate(nextIndex);
    } else {
      // Non-URL-synced: use updater function to handle rapid calls
      setInternalStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  }, [syncWithUrl, currentStepIndex, totalSteps, navigate]);

  /**
   * Navigate to the previous step
   */
  const goBack = useCallback(() => {
    if (syncWithUrl) {
      // URL-synced: calculate and navigate
      const prevIndex = Math.max(currentStepIndex - 1, 0);
      navigate(prevIndex);
    } else {
      // Non-URL-synced: use updater function to handle rapid calls
      setInternalStepIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [syncWithUrl, currentStepIndex, navigate]);

  /**
   * Jump to a specific step by ID
   */
  const goToStep = useCallback(
    (stepId: string, useReplace = false) => {
      const index = steps.findIndex((step) => step.id === stepId);
      if (index !== -1) {
        navigate(index, useReplace);
      }
    },
    [steps, navigate]
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
