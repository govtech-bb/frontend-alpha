import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { useStepValidation } from "./use-step-validation";

describe("useStepValidation", () => {
  const testSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    age: z.number().min(18, "Must be 18 or older").optional(),
  });

  it("should initialize with empty errors", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "", email: "" },
        onChange,
        onNext,
      })
    );

    expect(result.current.errors).toEqual([]);
    expect(result.current.fieldErrors).toEqual({});
    expect(result.current.hasSubmitted).toBe(false);
  });

  it("should validate on submit and show errors for invalid data", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "", email: "invalid" },
        onChange,
        onNext,
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.errors.length).toBeGreaterThan(0);
    expect(result.current.fieldErrors.name).toBe("Name is required");
    expect(result.current.fieldErrors.email).toBe("Invalid email");
    expect(result.current.hasSubmitted).toBe(true);
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should call onNext on successful validation", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "John", email: "john@example.com" },
        onChange,
        onNext,
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.errors).toEqual([]);
    expect(result.current.fieldErrors).toEqual({});
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should call onChange when handleChange is called", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "John", email: "john@example.com" },
        onChange,
        onNext,
      })
    );

    act(() => {
      result.current.handleChange("name", "Jane");
    });

    expect(onChange).toHaveBeenCalledWith({
      name: "Jane",
      email: "john@example.com",
    });
  });

  it("should validate field on change after first submit", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result, rerender } = renderHook(
      ({ value }) =>
        useStepValidation({
          schema: testSchema,
          value,
          onChange,
          onNext,
        }),
      {
        initialProps: { value: { name: "", email: "test@example.com" } },
      }
    );

    // First submit to set hasSubmitted
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.hasSubmitted).toBe(true);
    expect(result.current.fieldErrors.name).toBe("Name is required");

    // Update value and trigger change - error should persist for empty value
    act(() => {
      result.current.handleChange("name", "");
    });

    expect(result.current.fieldErrors.name).toBe("Name is required");

    // Now update value to simulate parent re-render with valid value
    rerender({ value: { name: "John", email: "test@example.com" } });

    // Change to valid value - error should be cleared
    act(() => {
      result.current.handleChange("name", "John");
    });

    expect(result.current.fieldErrors.name).toBeUndefined();
  });

  it("should not validate on change before first submit", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "", email: "" },
        onChange,
        onNext,
      })
    );

    // Change field before submit
    act(() => {
      result.current.handleChange("name", "J");
    });

    // No errors should appear yet
    expect(result.current.errors).toEqual([]);
    expect(result.current.fieldErrors).toEqual({});
  });

  it("should validate field on blur after first submit", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "", email: "test@example.com" },
        onChange,
        onNext,
      })
    );

    // First submit
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.fieldErrors.name).toBe("Name is required");

    // Blur on name field - should still show error
    act(() => {
      result.current.handleBlur("name");
    });

    expect(result.current.fieldErrors.name).toBe("Name is required");
  });

  it("should not validate on blur before first submit", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "", email: "" },
        onChange,
        onNext,
      })
    );

    // Blur before submit
    act(() => {
      result.current.handleBlur("name");
    });

    // No errors should appear
    expect(result.current.errors).toEqual([]);
    expect(result.current.fieldErrors).toEqual({});
  });

  it("should use fieldPrefix in error field names", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "", email: "invalid" },
        onChange,
        onNext,
        fieldPrefix: "test-",
      })
    );

    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.errors[0].field).toBe("test-name");
    expect(result.current.errors[1].field).toBe("test-email");
  });

  it("should handle optional fields correctly", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result } = renderHook(() =>
      useStepValidation({
        schema: testSchema,
        value: { name: "John", email: "john@example.com" },
        onChange,
        onNext,
      })
    );

    // Submit without optional age field
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.errors).toEqual([]);
    expect(onNext).toHaveBeenCalled();
  });

  it("should clear all errors on successful validation", () => {
    const onNext = vi.fn();
    const onChange = vi.fn();

    const { result, rerender } = renderHook(
      ({ value }) =>
        useStepValidation({
          schema: testSchema,
          value,
          onChange,
          onNext,
        }),
      {
        initialProps: { value: { name: "", email: "invalid" } },
      }
    );

    // First submit with errors
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.errors.length).toBeGreaterThan(0);

    // Update to valid data
    rerender({ value: { name: "John", email: "john@example.com" } });

    // Submit again
    act(() => {
      result.current.handleSubmit({
        preventDefault: () => {
          /* no-op */
        },
      } as React.FormEvent);
    });

    expect(result.current.errors).toEqual([]);
    expect(result.current.fieldErrors).toEqual({});
  });
});
