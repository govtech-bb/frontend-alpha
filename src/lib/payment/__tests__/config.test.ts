import { describe, expect, it } from "vitest";
import { getPaymentConfig, isValidServiceType, SERVICE_TYPES } from "../config";

describe("Payment Configuration", () => {
  describe("getPaymentConfig", () => {
    it("should return config for valid service type", () => {
      const config = getPaymentConfig(SERVICE_TYPES.PASSPORT_REPLACEMENT);

      expect(config).toBeDefined();
      expect(config?.amount).toBe(150.0);
      expect(config?.code).toBeDefined();
      expect(config?.description).toBe("Passport Replacement");
      expect(config?.requiresVerification).toBe(true);
    });

    it("should return null for invalid service type", () => {
      const config = getPaymentConfig("invalid-service");

      expect(config).toBeNull();
    });

    it("should return null for empty string", () => {
      const config = getPaymentConfig("");

      expect(config).toBeNull();
    });
  });

  describe("isValidServiceType", () => {
    it("should return true for valid service type", () => {
      expect(isValidServiceType(SERVICE_TYPES.PASSPORT_REPLACEMENT)).toBe(true);
    });

    it("should return false for invalid service type", () => {
      expect(isValidServiceType("fake-service")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidServiceType("")).toBe(false);
    });
  });
});
