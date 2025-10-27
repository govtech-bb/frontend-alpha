import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { useFormStorage } from "./use-form-storage";

// Test schema for a simple form
const testFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

type TestFormData = z.infer<typeof testFormSchema>;

describe("useFormStorage", () => {
  const storageKey = "test_form_draft";
  const version = "test-v1.0.0";

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllTimers();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should save and load form data", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
      age: 30,
    };

    act(() => {
      result.current.saveFormData(testData);
    });

    const loaded = result.current.loadFormData();
    expect(loaded).toEqual(testData);
  });

  it("should return null when no data exists", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    const loaded = result.current.loadFormData();
    expect(loaded).toBeNull();
  });

  it("should clear saved data", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    const testData: TestFormData = {
      name: "Jane Doe",
      email: "jane@example.com",
    };

    act(() => {
      result.current.saveFormData(testData);
    });

    expect(result.current.loadFormData()).toEqual(testData);

    act(() => {
      result.current.clearFormData();
    });

    expect(result.current.loadFormData()).toBeNull();
  });

  it("should return saved date", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
    };

    const beforeSave = new Date();

    act(() => {
      result.current.saveFormData(testData);
    });

    const afterSave = new Date();
    const savedDate = result.current.getSavedDate();

    expect(savedDate).not.toBeNull();
    expect(savedDate!.getTime()).toBeGreaterThanOrEqual(beforeSave.getTime());
    expect(savedDate!.getTime()).toBeLessThanOrEqual(afterSave.getTime());
  });

  it("should discard expired data", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
        expiryDays: 7,
      })
    );

    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
    };

    // Save data
    act(() => {
      result.current.saveFormData(testData);
    });

    // Manually set expiry to the past
    const item = localStorage.getItem(storageKey);
    if (item) {
      const stored = JSON.parse(item);
      stored.expiresAt = Date.now() - 1000; // Expired 1 second ago
      localStorage.setItem(storageKey, JSON.stringify(stored));
    }

    // Try to load expired data
    const loaded = result.current.loadFormData();
    expect(loaded).toBeNull();

    // Should have been removed from storage
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it("should discard data with version mismatch", () => {
    const { result: result1 } = renderHook(() =>
      useFormStorage({
        storageKey,
        version: "v1.0.0",
        schema: testFormSchema,
      })
    );

    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
    };

    // Save data with v1.0.0
    act(() => {
      result1.current.saveFormData(testData);
    });

    // Try to load with v2.0.0
    const { result: result2 } = renderHook(() =>
      useFormStorage({
        storageKey,
        version: "v2.0.0",
        schema: testFormSchema,
      })
    );

    const loaded = result2.current.loadFormData();
    expect(loaded).toBeNull();

    // Should have been removed from storage
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it("should discard data that fails schema validation", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    // Manually save invalid data
    const invalidData = {
      version,
      timestamp: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      data: {
        name: "John",
        email: "not-an-email", // Invalid email
      },
    };

    localStorage.setItem(storageKey, JSON.stringify(invalidData));

    // Try to load invalid data
    const loaded = result.current.loadFormData();
    expect(loaded).toBeNull();

    // Should have been removed from storage
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it("should handle corrupted JSON gracefully", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    // Manually save corrupted JSON
    localStorage.setItem(storageKey, "{ invalid json }");

    // Should return null without throwing
    const loaded = result.current.loadFormData();
    expect(loaded).toBeNull();

    // Should have been cleaned up
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it("should use custom expiry days", () => {
    const customExpiryDays = 30;
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
        expiryDays: customExpiryDays,
      })
    );

    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
    };

    act(() => {
      result.current.saveFormData(testData);
    });

    const item = localStorage.getItem(storageKey);
    expect(item).not.toBeNull();

    const stored = JSON.parse(item!);
    const expectedExpiry =
      stored.timestamp + customExpiryDays * 24 * 60 * 60 * 1000;

    expect(stored.expiresAt).toBe(expectedExpiry);
  });

  it("should handle localStorage being disabled/unavailable", () => {
    // Mock localStorage.setItem to throw (simulates private mode or quota exceeded)
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = vi.fn(() => {
      throw new Error("QuotaExceededError");
    });

    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
    };

    // Should not throw
    expect(() => {
      act(() => {
        result.current.saveFormData(testData);
      });
    }).not.toThrow();

    // Restore
    localStorage.setItem = originalSetItem;
  });

  it("should handle localStorage.getItem throwing", () => {
    // Mock localStorage.getItem to throw
    const originalGetItem = localStorage.getItem;
    localStorage.getItem = vi.fn(() => {
      throw new Error("SecurityError");
    });

    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    // Should not throw and return null
    expect(() => {
      const loaded = result.current.loadFormData();
      expect(loaded).toBeNull();
    }).not.toThrow();

    // Restore
    localStorage.getItem = originalGetItem;
  });

  it("should validate data structure with optional fields", () => {
    const { result } = renderHook(() =>
      useFormStorage({
        storageKey,
        version,
        schema: testFormSchema,
      })
    );

    // Data without optional age field
    const testData: TestFormData = {
      name: "John Doe",
      email: "john@example.com",
      // age is optional
    };

    act(() => {
      result.current.saveFormData(testData);
    });

    const loaded = result.current.loadFormData();
    expect(loaded).toEqual(testData);
  });
});
