import { useEffect, useRef } from "react";

/**
 * Accessibility hook to manage focus and document title for multi-step forms
 *
 * This hook implements WCAG 2.1 best practices for focus management:
 * 1. Moves focus to the main heading when a new step is displayed
 * 2. Updates the document title to reflect the current step
 *
 * Benefits:
 * - Screen reader users immediately know where they are
 * - Browser history/tabs show meaningful step names
 * - Keyboard users start at the top of each step
 *
 * @param stepTitle - The title of the current step (e.g., "Father's details")
 * @param formName - The name of the form (e.g., "Register a Birth")
 * @returns Ref to attach to the h1 element
 *
 * @example
 * const titleRef = useStepFocus(
 *   "Father's details",
 *   "Register a Birth"
 * );
 * <h1 ref={titleRef} tabIndex={-1}>Father's details</h1>
 */
export function useStepFocus(stepTitle: string, formName: string) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Move focus to the h1 when the step changes
    // tabIndex={-1} makes it programmatically focusable but not keyboard tabbable
    if (titleRef.current) {
      titleRef.current.focus();
    }

    // Update document title for browser tabs and screen readers
    document.title = `${stepTitle} - ${formName} - Government of Barbados`;
  }, [stepTitle, formName]);

  return titleRef;
}
