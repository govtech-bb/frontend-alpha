import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FormStep } from "@/types/forms";
import { useFormNavigation } from "../use-form-navigation";

// Mock Next.js navigation hooks
const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockPathname = vi.fn(() => "/test-form");
const mockSearchParams = vi.fn(() => new URLSearchParams());

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
  usePathname: () => mockPathname(),
  useSearchParams: () => mockSearchParams(),
}));

describe("useFormNavigation", () => {
  const mockSteps: FormStep[] = [
    { id: "step-1", title: "Step 1" },
    { id: "step-2", title: "Step 2" },
    { id: "step-3", title: "Step 3" },
    { id: "step-4", title: "Step 4" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname.mockReturnValue("/test-form");
    mockSearchParams.mockReturnValue(new URLSearchParams());
  });

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

  describe("URL sync (without syncWithUrl option)", () => {
    it("should not call router methods when syncWithUrl is false (default)", () => {
      const { result } = renderHook(() => useFormNavigation(mockSteps));

      act(() => {
        result.current.goNext();
      });

      expect(mockPush).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("should not call router methods when syncWithUrl is explicitly false", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: false })
      );

      act(() => {
        result.current.goNext();
        result.current.goBack();
        result.current.goToStep("step-3");
      });

      expect(mockPush).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe("URL sync (with syncWithUrl enabled)", () => {
    it("should initialize from URL parameter when syncWithUrl is true", () => {
      const params = new URLSearchParams();
      params.set("step", "step-3");
      mockSearchParams.mockReturnValue(params);

      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      expect(result.current.currentStep).toEqual(mockSteps[2]);
      expect(result.current.currentStepIndex).toBe(2);
    });

    it("should default to first step when URL param is missing", () => {
      mockSearchParams.mockReturnValue(new URLSearchParams());

      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      expect(result.current.currentStep).toEqual(mockSteps[0]);
      expect(result.current.currentStepIndex).toBe(0);
    });

    it("should redirect to first step when URL contains invalid step ID", () => {
      const params = new URLSearchParams();
      params.set("step", "invalid-step");
      mockSearchParams.mockReturnValue(params);

      renderHook(() => useFormNavigation(mockSteps, { syncWithUrl: true }));

      // Should call replace to fix the URL
      expect(mockReplace).toHaveBeenCalledWith("/test-form?step=step-1", {
        scroll: false,
      });
    });

    it("should update URL when navigating forward with goNext", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      act(() => {
        result.current.goNext();
      });

      expect(mockPush).toHaveBeenCalledWith("/test-form?step=step-2", {
        scroll: false,
      });
      expect(result.current.currentStepIndex).toBe(1);
    });

    it("should update URL when navigating backward with goBack", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      // First navigate forward to step 3
      act(() => {
        result.current.goNext(); // to step 2
        result.current.goNext(); // to step 3
      });

      expect(result.current.currentStepIndex).toBe(2);

      // Clear previous calls
      mockPush.mockClear();

      // Now navigate back
      act(() => {
        result.current.goBack();
      });

      expect(mockPush).toHaveBeenCalledWith("/test-form?step=step-2", {
        scroll: false,
      });
      expect(result.current.currentStepIndex).toBe(1);
    });

    it("should update URL when jumping to specific step with goToStep", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      act(() => {
        result.current.goToStep("step-4");
      });

      expect(mockPush).toHaveBeenCalledWith("/test-form?step=step-4", {
        scroll: false,
      });
      expect(result.current.currentStepIndex).toBe(3);
    });

    it("should use replace instead of push when useReplace is true", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      act(() => {
        result.current.goToStep("step-3", true); // useReplace = true
      });

      expect(mockReplace).toHaveBeenCalledWith("/test-form?step=step-3", {
        scroll: false,
      });
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should use custom URL parameter name when specified", () => {
      const params = new URLSearchParams();
      params.set("current", "step-2");
      mockSearchParams.mockReturnValue(params);

      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, {
          syncWithUrl: true,
          urlParamName: "current",
        })
      );

      // Should initialize from custom param
      expect(result.current.currentStepIndex).toBe(1);

      act(() => {
        result.current.goNext();
      });

      // Should update with custom param name
      expect(mockPush).toHaveBeenCalledWith("/test-form?current=step-3", {
        scroll: false,
      });
    });

    it("should use custom basePath when specified", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, {
          syncWithUrl: true,
          basePath: "/custom/path",
        })
      );

      act(() => {
        result.current.goNext();
      });

      expect(mockPush).toHaveBeenCalledWith("/custom/path?step=step-2", {
        scroll: false,
      });
    });

    it("should preserve existing query parameters when updating URL", () => {
      const params = new URLSearchParams();
      params.set("step", "step-1");
      params.set("foo", "bar");
      params.set("baz", "qux");
      mockSearchParams.mockReturnValue(params);

      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      act(() => {
        result.current.goNext();
      });

      // Should preserve other params
      expect(mockPush).toHaveBeenCalledWith(
        "/test-form?step=step-2&foo=bar&baz=qux",
        { scroll: false }
      );
    });

    it("should not update URL when already at boundaries", () => {
      const { result } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      // Already at first step
      act(() => {
        result.current.goBack();
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should respond to browser back/forward by updating internal state", () => {
      const params = new URLSearchParams();
      params.set("step", "step-2");
      mockSearchParams.mockReturnValue(params);

      const { result, rerender } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      // Initially at step 2
      expect(result.current.currentStepIndex).toBe(1);

      // Simulate browser back button changing URL to step-1
      const newParams = new URLSearchParams();
      newParams.set("step", "step-1");
      mockSearchParams.mockReturnValue(newParams);

      rerender();

      // Should update internal state to match URL
      expect(result.current.currentStepIndex).toBe(0);
      expect(result.current.currentStep).toEqual(mockSteps[0]);
    });

    it("should not update state if searchParams change but step hasn't changed", () => {
      const params = new URLSearchParams();
      params.set("step", "step-2");
      mockSearchParams.mockReturnValue(params);

      const { result, rerender } = renderHook(() =>
        useFormNavigation(mockSteps, { syncWithUrl: true })
      );

      expect(result.current.currentStepIndex).toBe(1);

      // Same step but different unrelated param
      const newParams = new URLSearchParams();
      newParams.set("step", "step-2");
      newParams.set("foo", "bar");
      mockSearchParams.mockReturnValue(newParams);

      rerender();

      // Should remain at same step
      expect(result.current.currentStepIndex).toBe(1);
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});
