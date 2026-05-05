"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  clearFormStartTime,
  getFormStartTime,
  persistFormStartTime,
  stepNumberToWord,
  trackEvent,
} from "@/lib/analytics";

interface UseFormTrackingOptions {
  form: string;
  category: string;
}

function elapsedSeconds(since: number): number {
  return Math.round((Date.now() - since) / 1000);
}

/**
 * Encapsulates all Umami form-tracking events. Manages duration
 * timers for form-start → form-submit and review-enter → review-leave.
 */
export function useFormTracking({ form, category }: UseFormTrackingOptions) {
  const reviewEnteredAt = useRef<number | null>(null);

  const trackStart = useCallback(() => {
    trackEvent("form-start", { form, category });
    persistFormStartTime(form);
  }, [form, category]);

  const trackStepComplete = useCallback(
    (step: string, stepNumber: number) => {
      const word = stepNumberToWord(stepNumber);
      // Dynamic event name: "get-birth-certificate:form-step-one"
      trackEvent(`${form}:form-step-${word}`, { form, category, step });
    },
    [form, category]
  );

  const trackStepBack = useCallback(
    (step: string) => {
      trackEvent("form-step-back", { form, category, step });
    },
    [form, category]
  );

  const trackStepEdit = useCallback(
    (step: string) => {
      trackEvent("form-step-edit", { form, category, step });
    },
    [form, category]
  );

  const trackSubmit = useCallback(() => {
    const startTime = getFormStartTime(form);
    const durationSeconds = startTime ? elapsedSeconds(startTime) : 0;
    trackEvent("form-submit", {
      form,
      category,
      duration_seconds: durationSeconds,
    });
    clearFormStartTime(form);
  }, [form, category]);

  const trackSubmitError = useCallback(
    (errors: string) => {
      trackEvent("form-submit-error", { form, category, errors });
    },
    [form, category]
  );

  const trackReviewEnter = useCallback(() => {
    reviewEnteredAt.current = Date.now();
  }, []);

  const trackReviewLeave = useCallback(() => {
    const durationSeconds = reviewEnteredAt.current
      ? elapsedSeconds(reviewEnteredAt.current)
      : 0;
    trackEvent("form-review", {
      form,
      category,
      duration_seconds: durationSeconds,
    });
    reviewEnteredAt.current = null;
  }, [form, category]);

  const trackValidationError = useCallback(
    (params: {
      step: string;
      errorCount: number;
      fields: string;
      errorTypes: string;
    }) => {
      trackEvent("form-validation-error", {
        form,
        category,
        ...params,
      });
    },
    [form, category]
  );

  // Clean up review timer on unmount so it doesn't leak between renders
  useEffect(
    () => () => {
      reviewEnteredAt.current = null;
    },
    []
  );

  return {
    trackStart,
    trackStepComplete,
    trackStepBack,
    trackStepEdit,
    trackSubmit,
    trackSubmitError,
    trackReviewEnter,
    trackReviewLeave,
    trackValidationError,
  } as const;
}
