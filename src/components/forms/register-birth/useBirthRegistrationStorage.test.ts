import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PartialBirthRegistrationFormData } from "./types";
import { useBirthRegistrationStorage } from "./useBirthRegistrationStorage";

describe("useBirthRegistrationStorage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset any mocks
    vi.clearAllMocks();
  });

  describe("saveFormData", () => {
    it("should save form data to localStorage", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
        father: {
          firstName: "John",
          middleName: "",
          lastName: "Doe",
          hadOtherSurname: "no",
          otherSurname: "",
          dateOfBirth: "1985-01-15",
          address: "123 Main St",
          nationalRegistrationNumber: "123456",
          occupation: "Engineer",
        },
      };

      act(() => {
        result.current.saveFormData(formData);
      });

      const saved = localStorage.getItem("govbb_birth_registration_draft");
      expect(saved).not.toBeNull();

      const parsed = JSON.parse(saved!);
      expect(parsed.data).toEqual(formData);
      expect(parsed.savedAt).toBeDefined();
      expect(parsed.expiresAt).toBeDefined();
    });

    it("should include timestamp and expiration when saving", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
      };

      const beforeSave = new Date();

      act(() => {
        result.current.saveFormData(formData);
      });

      const saved = localStorage.getItem("govbb_birth_registration_draft");
      const parsed = JSON.parse(saved!);

      const savedAt = new Date(parsed.savedAt);
      const expiresAt = new Date(parsed.expiresAt);

      // Check that savedAt is recent
      expect(savedAt.getTime()).toBeGreaterThanOrEqual(beforeSave.getTime());

      // Check that expiresAt is 7 days in the future
      const expectedExpiry = new Date(
        savedAt.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      expect(expiresAt.getTime()).toBeCloseTo(expectedExpiry.getTime(), -3); // Within a second
    });

    it("should overwrite previous data when saving again", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const firstData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const secondData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      act(() => {
        result.current.saveFormData(firstData);
      });

      act(() => {
        result.current.saveFormData(secondData);
      });

      const saved = localStorage.getItem("govbb_birth_registration_draft");
      const parsed = JSON.parse(saved!);

      expect(parsed.data).toEqual(secondData);
      expect(parsed.data.marriageStatus).toBe("no");
    });

    it("should handle localStorage quota exceeded gracefully", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      // Mock localStorage.setItem to throw quota exceeded error
      const setItemSpy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new DOMException("QuotaExceededError");
        });

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      // Should not throw
      expect(() => {
        act(() => {
          result.current.saveFormData(formData);
        });
      }).not.toThrow();

      setItemSpy.mockRestore();
    });
  });

  describe("loadFormData", () => {
    it("should load saved form data from localStorage", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
        email: "test@example.com",
      };

      // Save data first
      act(() => {
        result.current.saveFormData(formData);
      });

      // Load data
      let loadedData: PartialBirthRegistrationFormData | null = null;
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toEqual(formData);
    });

    it("should return null when no data is saved", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      let loadedData: PartialBirthRegistrationFormData | null = null;
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toBeNull();
    });

    it("should return null and clear data when expired", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      // Manually create expired data
      const expiredData = {
        data: formData,
        savedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      };

      localStorage.setItem(
        "govbb_birth_registration_draft",
        JSON.stringify(expiredData)
      );

      let loadedData: PartialBirthRegistrationFormData | null = null;
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toBeNull();
      expect(localStorage.getItem("govbb_birth_registration_draft")).toBeNull();
    });

    it("should return data when not expired", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "no",
      };

      // Create data that expires in 5 days
      const validData = {
        data: formData,
        savedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorage.setItem(
        "govbb_birth_registration_draft",
        JSON.stringify(validData)
      );

      let loadedData: PartialBirthRegistrationFormData | null = null;
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toEqual(formData);
    });

    it("should handle corrupted data gracefully", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      // Put invalid JSON in localStorage
      localStorage.setItem("govbb_birth_registration_draft", "invalid json{");

      let loadedData: PartialBirthRegistrationFormData | null = null;

      // Should not throw
      expect(() => {
        act(() => {
          loadedData = result.current.loadFormData();
        });
      }).not.toThrow();

      expect(loadedData).toBeNull();
    });

    it("should handle missing localStorage gracefully", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      // Mock localStorage.getItem to throw
      const getItemSpy = vi
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("localStorage not available");
        });

      let loadedData: PartialBirthRegistrationFormData | null = null;

      // Should not throw
      expect(() => {
        act(() => {
          loadedData = result.current.loadFormData();
        });
      }).not.toThrow();

      expect(loadedData).toBeNull();

      getItemSpy.mockRestore();
    });
  });

  describe("clearFormData", () => {
    it("should remove data from localStorage", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      // Save data first
      act(() => {
        result.current.saveFormData(formData);
      });

      expect(
        localStorage.getItem("govbb_birth_registration_draft")
      ).not.toBeNull();

      // Clear data
      act(() => {
        result.current.clearFormData();
      });

      expect(localStorage.getItem("govbb_birth_registration_draft")).toBeNull();
    });

    it("should not throw when clearing empty storage", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      expect(() => {
        act(() => {
          result.current.clearFormData();
        });
      }).not.toThrow();
    });

    it("should handle localStorage errors gracefully", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      // Mock localStorage.removeItem to throw
      const removeItemSpy = vi
        .spyOn(Storage.prototype, "removeItem")
        .mockImplementation(() => {
          throw new Error("localStorage not available");
        });

      // Should not throw
      expect(() => {
        act(() => {
          result.current.clearFormData();
        });
      }).not.toThrow();

      removeItemSpy.mockRestore();
    });
  });

  describe("getSavedDate", () => {
    it("should return the saved date when data exists", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
      };

      const beforeSave = new Date();

      act(() => {
        result.current.saveFormData(formData);
      });

      let savedDate: Date | null = null;
      act(() => {
        savedDate = result.current.getSavedDate();
      });

      expect(savedDate).not.toBeNull();
      expect(savedDate!.getTime()).toBeGreaterThanOrEqual(beforeSave.getTime());
    });

    it("should return null when no data is saved", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      let savedDate: Date | null = null;
      act(() => {
        savedDate = result.current.getSavedDate();
      });

      expect(savedDate).toBeNull();
    });

    it("should return null for corrupted data", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      localStorage.setItem("govbb_birth_registration_draft", "invalid");

      let savedDate: Date | null = null;
      act(() => {
        savedDate = result.current.getSavedDate();
      });

      expect(savedDate).toBeNull();
    });
  });

  describe("Integration scenarios", () => {
    it("should handle complete save-load-clear cycle", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const formData: PartialBirthRegistrationFormData = {
        marriageStatus: "no",
        includeFatherDetails: "yes",
        father: {
          firstName: "John",
          middleName: "James",
          lastName: "Smith",
          hadOtherSurname: "no",
          otherSurname: "",
          dateOfBirth: "1980-05-20",
          address: "456 Oak Ave",
          nationalRegistrationNumber: "987654",
          occupation: "Teacher",
        },
      };

      // Save
      act(() => {
        result.current.saveFormData(formData);
      });

      // Load
      let loadedData: PartialBirthRegistrationFormData | null = null;
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toEqual(formData);

      // Clear
      act(() => {
        result.current.clearFormData();
      });

      // Load again should return null
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toBeNull();
    });

    it("should preserve complex nested data structures", () => {
      const { result } = renderHook(() => useBirthRegistrationStorage());

      const complexFormData: PartialBirthRegistrationFormData = {
        marriageStatus: "yes",
        includeFatherDetails: "",
        father: {
          firstName: "Alexander",
          middleName: "James Michael",
          lastName: "Johnson-Smith",
          hadOtherSurname: "yes",
          otherSurname: "O'Brien",
          dateOfBirth: "1975-12-31",
          address: "123 Main St\nApt 4B\nBridgetown",
          nationalRegistrationNumber: "BB-1234567890",
          occupation: "Senior Software Engineer",
        },
        mother: {
          firstName: "Sarah",
          middleName: "Elizabeth",
          lastName: "Johnson-Smith",
          hadOtherSurname: "yes",
          otherSurname: "Williams",
          dateOfBirth: "1978-03-15",
          address: "123 Main St\nApt 4B\nBridgetown",
          nationalRegistrationNumber: "BB-0987654321",
          occupation: "Doctor",
        },
        numberOfCertificates: 3,
        email: "parent@example.com",
        wantContact: "yes",
        phoneNumber: "+1246-555-0123",
      };

      act(() => {
        result.current.saveFormData(complexFormData);
      });

      let loadedData: PartialBirthRegistrationFormData | null = null;
      act(() => {
        loadedData = result.current.loadFormData();
      });

      expect(loadedData).toEqual(complexFormData);
    });
  });
});
