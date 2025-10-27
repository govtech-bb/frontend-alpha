import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { FormStep } from "@/types/forms";
import { useFormNavigation } from "./use-form-navigation";

describe("useFormNavigation", () => {
  const mockSteps: FormStep[] = [
    { id: "step-1", title: "Step 1" },
    { id: "step-2", title: "Step 2" },
    { id: "step-3", title: "Step 3" },
    { id: "step-4", title: "Step 4" },
  ];

  it("should initialize with first step", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    expect(result.current.currentStep).toEqual(mockSteps[0]);
    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.totalSteps).toBe(4);
  });

  it("should navigate forward with goNext", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    act(() => {
      result.current.goNext();
    });

    expect(result.current.currentStep).toEqual(mockSteps[1]);
    expect(result.current.currentStepIndex).toBe(1);
  });

  it("should navigate backward with goBack", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    // Go forward first
    act(() => {
      result.current.goNext();
      result.current.goNext();
    });

    expect(result.current.currentStepIndex).toBe(2);

    // Go back
    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentStep).toEqual(mockSteps[1]);
    expect(result.current.currentStepIndex).toBe(1);
  });

  it("should not go past the last step", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    // Try to go past the end
    act(() => {
      result.current.goNext();
      result.current.goNext();
      result.current.goNext();
      result.current.goNext(); // Already at last step
      result.current.goNext(); // Should stay at last step
    });

    expect(result.current.currentStep).toEqual(mockSteps[3]);
    expect(result.current.currentStepIndex).toBe(3);
  });

  it("should not go before the first step", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    // Try to go before the start
    act(() => {
      result.current.goBack();
      result.current.goBack();
    });

    expect(result.current.currentStep).toEqual(mockSteps[0]);
    expect(result.current.currentStepIndex).toBe(0);
  });

  it("should jump to a specific step by ID", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    act(() => {
      result.current.goToStep("step-3");
    });

    expect(result.current.currentStep).toEqual(mockSteps[2]);
    expect(result.current.currentStepIndex).toBe(2);
  });

  it("should handle jumping to first step", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    // Navigate to middle
    act(() => {
      result.current.goNext();
      result.current.goNext();
    });

    expect(result.current.currentStepIndex).toBe(2);

    // Jump back to first
    act(() => {
      result.current.goToStep("step-1");
    });

    expect(result.current.currentStep).toEqual(mockSteps[0]);
    expect(result.current.currentStepIndex).toBe(0);
  });

  it("should handle jumping to last step", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    act(() => {
      result.current.goToStep("step-4");
    });

    expect(result.current.currentStep).toEqual(mockSteps[3]);
    expect(result.current.currentStepIndex).toBe(3);
  });

  it("should not change step when goToStep called with invalid ID", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    // Navigate to step 2
    act(() => {
      result.current.goNext();
    });

    expect(result.current.currentStepIndex).toBe(1);

    // Try to jump to non-existent step
    act(() => {
      result.current.goToStep("non-existent-step");
    });

    // Should stay at step 2
    expect(result.current.currentStepIndex).toBe(1);
    expect(result.current.currentStep).toEqual(mockSteps[1]);
  });

  it("should work with a single step", () => {
    const singleStep: FormStep[] = [{ id: "only-step", title: "Only Step" }];
    const { result } = renderHook(() => useFormNavigation(singleStep));

    expect(result.current.currentStep).toEqual(singleStep[0]);
    expect(result.current.currentStepIndex).toBe(0);
    expect(result.current.totalSteps).toBe(1);

    // Next should not move
    act(() => {
      result.current.goNext();
    });
    expect(result.current.currentStepIndex).toBe(0);

    // Back should not move
    act(() => {
      result.current.goBack();
    });
    expect(result.current.currentStepIndex).toBe(0);
  });

  it("should expose the steps array", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    expect(result.current.steps).toEqual(mockSteps);
  });

  it("should handle dynamic step array changes", () => {
    const initialSteps: FormStep[] = [
      { id: "step-1", title: "Step 1" },
      { id: "step-2", title: "Step 2" },
    ];

    const { result, rerender } = renderHook(
      ({ steps }) => useFormNavigation(steps),
      { initialProps: { steps: initialSteps } }
    );

    expect(result.current.totalSteps).toBe(2);

    // Move to step 2
    act(() => {
      result.current.goNext();
    });
    expect(result.current.currentStepIndex).toBe(1);

    // Change steps array (simulating conditional logic)
    const newSteps: FormStep[] = [
      { id: "step-1", title: "Step 1" },
      { id: "step-2", title: "Step 2" },
      { id: "step-3", title: "Step 3" }, // New step added
    ];

    rerender({ steps: newSteps });

    expect(result.current.totalSteps).toBe(3);
    // Current step index should remain valid
    expect(result.current.currentStepIndex).toBe(1);
  });

  it("should support multiple forward and backward navigations", () => {
    const { result } = renderHook(() => useFormNavigation(mockSteps));

    // Complex navigation scenario
    act(() => {
      result.current.goNext(); // Go to step 2
      result.current.goNext(); // Go to step 3
      result.current.goBack(); // Back to step 2
      result.current.goNext(); // Forward to step 3
      result.current.goNext(); // Forward to step 4
      result.current.goBack(); // Back to step 3
      result.current.goBack(); // Back to step 2
    });

    expect(result.current.currentStepIndex).toBe(1);
    expect(result.current.currentStep).toEqual(mockSteps[1]);
  });
});
