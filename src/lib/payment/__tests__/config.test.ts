import { describe, it, expect } from "vitest";
import {
  getPaymentConfig,
  isValidServiceType,
  getAvailableServices,
} from "../config";

describe("Payment Configuration", () => {
  describe("getPaymentConfig", () => {
    it("should return config for valid service type", () => {
      const config = getPaymentConfig("passport-replacement");

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
      expect(isValidServiceType("passport-replacement")).toBe(true);
    });

    it("should return false for invalid service type", () => {
      expect(isValidServiceType("fake-service")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidServiceType("")).toBe(false);
    });
  });

  describe("getAvailableServices", () => {
    it("should return array of service types", () => {
      const services = getAvailableServices();

      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
      expect(services).toContain("passport-replacement");
    });
  });
});
