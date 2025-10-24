import { useCallback } from "react";
import type { PartialBirthRegistrationFormData, StoredFormData } from "./types";

const STORAGE_KEY = "govbb_birth_registration_draft";
const EXPIRY_DAYS = 7;

/**
 * Custom hook to manage localStorage persistence for the birth registration form
 *
 * Features:
 * - Auto-save form data to localStorage
 * - 7-day expiration for stale data
 * - Graceful error handling (localStorage quota, disabled storage, etc.)
 * - Stores ALL fields including PII (user's device, user's choice)
 *
 * @returns Storage operations: save, load, clear, getSavedDate
 */
export function useBirthRegistrationStorage() {
  /**
   * Save form data to localStorage with timestamp and expiration
   * Stores all fields including sensitive data (PII)
   *
   * @param formData - Partial form data to save
   */
  const saveFormData = useCallback(
    (formData: PartialBirthRegistrationFormData) => {
      try {
        const storedData: StoredFormData = {
          data: formData,
          savedAt: new Date().toISOString(),
          expiresAt: new Date(
            Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
      } catch (_error) {}
    },
    []
  );

  /**
   * Load form data from localStorage
   * Automatically removes expired data
   *
   * @returns Saved form data or null if not found/expired/corrupted
   */
  const loadFormData =
    useCallback((): PartialBirthRegistrationFormData | null => {
      try {
        const item = localStorage.getItem(STORAGE_KEY);
        if (!item) {
          return null;
        }

        const stored: StoredFormData = JSON.parse(item);

        // Check if data has expired
        const now = new Date();
        const expiresAt = new Date(stored.expiresAt);

        if (now > expiresAt) {
          // Data has expired, remove it
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }

        return stored.data;
      } catch (_error) {
        return null;
      }
    }, []);

  /**
   * Clear saved form data from localStorage
   * Used when user clicks "Clear saved data" or "Start over"
   */
  const clearFormData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_error) {}
  }, []);

  /**
   * Get the date when the form data was last saved
   * Useful for showing "Saved on [date]" to the user
   *
   * @returns Date when data was saved, or null if no data exists
   */
  const getSavedDate = useCallback((): Date | null => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (!item) {
        return null;
      }

      const stored: StoredFormData = JSON.parse(item);
      return new Date(stored.savedAt);
    } catch (_error) {
      return null;
    }
  }, []);

  return {
    saveFormData,
    loadFormData,
    clearFormData,
    getSavedDate,
  };
}
