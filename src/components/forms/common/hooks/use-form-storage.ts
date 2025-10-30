import { useCallback } from "react";
import type { z } from "zod";
import type { VersionedFormData } from "@/types/forms";

/**
 * Configuration for form storage
 *
 * @template T - The form data type
 */
export type UseFormStorageConfig<T> = {
  /** Unique key for sessionStorage (e.g., 'govbb_birth_registration_draft') */
  storageKey: string;
  /** Version identifier for data structure (e.g., 'birth-v1.0.0') */
  version: string;
  /** Zod schema for runtime validation */
  schema: z.ZodSchema<T>;
  /** Number of days before saved data expires (default: 7) */
  expiryDays?: number;
};

/**
 * Generic hook for persisting form data to sessionStorage with versioning and validation
 *
 * Features:
 * - Auto-save form data to sessionStorage (cleared on tab/browser close)
 * - Configurable expiration (default 7 days)
 * - Version checking to handle data structure changes
 * - Zod runtime validation for type safety
 * - Graceful error handling (sessionStorage quota, disabled storage, etc.)
 *
 * @template T - The form data type
 * @param config - Storage configuration
 * @returns Storage operations: save, load, clear, getSavedDate
 *
 * @example
 * const storage = useFormStorage({
 *   storageKey: 'govbb_birth_registration_draft',
 *   version: 'birth-v1.0.0',
 *   schema: birthFormSchema,
 *   expiryDays: 7
 * });
 */
export function useFormStorage<T>(config: UseFormStorageConfig<T>) {
  const { storageKey, version, schema, expiryDays = 7 } = config;

  /**
   * Save form data to sessionStorage with timestamp, version, and expiration
   *
   * @param formData - Form data to save
   */
  const saveFormData = useCallback(
    (formData: T) => {
      try {
        const now = Date.now();
        const storedData: VersionedFormData<T> = {
          version,
          timestamp: now,
          expiresAt: now + expiryDays * 24 * 60 * 60 * 1000,
          data: formData,
        };

        sessionStorage.setItem(storageKey, JSON.stringify(storedData));
      } catch (_error) {
        // Silently fail - sessionStorage might be full, disabled, or in private mode
        // This is acceptable for progressive enhancement
      }
    },
    [storageKey, version, expiryDays]
  );

  /**
   * Load form data from sessionStorage with version checking and validation
   *
   * Automatically removes data that:
   * - Has expired
   * - Has a version mismatch
   * - Fails Zod schema validation
   *
   * @returns Saved form data or null if not found/expired/invalid
   */
  const loadFormData = useCallback((): T | null => {
    try {
      const item = sessionStorage.getItem(storageKey);
      if (!item) {
        return null;
      }

      // Parse the stored data
      const stored = JSON.parse(item) as VersionedFormData<T>;

      // Check if data has expired
      const now = Date.now();
      if (now > stored.expiresAt) {
        // Data has expired, remove it
        sessionStorage.removeItem(storageKey);
        return null;
      }

      // Check version compatibility
      if (stored.version !== version) {
        // Version mismatch - data structure may have changed
        // Discard old data to prevent errors
        sessionStorage.removeItem(storageKey);
        return null;
      }

      // Validate data against schema
      const result = schema.safeParse(stored.data);
      if (!result.success) {
        // Data doesn't match expected schema - may be corrupted
        // Discard to prevent runtime errors
        sessionStorage.removeItem(storageKey);
        return null;
      }

      return result.data;
    } catch (_error) {
      // Parsing failed or sessionStorage unavailable
      // Return null and optionally clean up corrupted data
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // Even cleanup failed - that's OK
      }
      return null;
    }
  }, [storageKey, version, schema]);

  /**
   * Clear saved form data from sessionStorage
   * Used when form is submitted or user starts over
   */
  const clearFormData = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch (_error) {
      // Silently fail
    }
  }, [storageKey]);

  /**
   * Get the date when the form data was last saved
   * Useful for showing "Saved on [date]" to the user
   *
   * @returns Date when data was saved, or null if no data exists
   */
  const getSavedDate = useCallback((): Date | null => {
    try {
      const item = sessionStorage.getItem(storageKey);
      if (!item) {
        return null;
      }

      const stored = JSON.parse(item) as VersionedFormData<T>;
      return new Date(stored.timestamp);
    } catch (_error) {
      return null;
    }
  }, [storageKey]);

  return {
    saveFormData,
    loadFormData,
    clearFormData,
    getSavedDate,
  };
}
