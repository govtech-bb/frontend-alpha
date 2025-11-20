import { describe, it, expect, beforeEach } from "vitest";
import { MockPaymentProvider } from "../providers/mock-provider";

describe("MockPaymentProvider", () => {
  let provider: MockPaymentProvider;

  beforeEach(() => {
    provider = new MockPaymentProvider();
  });

  describe("initiatePayment", () => {
    it("should return payment initiation result", async () => {
      const request = {
        referenceId: "test-ref-123",
        serviceType: "passport-replacement",
        email: "test@example.com",
        customerName: "Test User",
      };

      const result = await provider.initiatePayment(request);

      expect(result).toBeDefined();
      expect(result.redirectUrl).toContain("/payment/mock");
      expect(result.redirectUrl).toContain("test-ref-123");
      expect(result.token).toBe("test-ref-123");
      expect(result.referenceId).toBe("test-ref-123");
    });

    it("should throw error for invalid service type", async () => {
      const request = {
        referenceId: "test-ref-123",
        serviceType: "invalid-service",
        email: "test@example.com",
        customerName: "Test User",
      };

      await expect(provider.initiatePayment(request)).rejects.toThrow(
        "No payment configuration found for service: invalid-service"
      );
    });
  });

  describe("verifyPayment", () => {
    it("should return successful verification result", async () => {
      const request = {
        transactionId: "MOCK-SUCCESS-123",
        referenceId: "REF-456",
      };

      const result = await provider.verifyPayment(request);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.status).toBe("Success");
      expect(result.transactionId).toBe("MOCK-SUCCESS-123");
      expect(result.referenceId).toBe("REF-456");
      expect(result.amount).toBe("150.00");
      expect(result.processor).toBe("Mock Credit Card");
    });

    it("should return failed verification when transaction ID contains FAIL", async () => {
      const request = {
        transactionId: "MOCK-FAIL-123",
        referenceId: "REF-456",
      };

      const result = await provider.verifyPayment(request);

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.status).toBe("Failed");
      expect(result.transactionId).toBe("MOCK-FAIL-123");
      expect(result.referenceId).toBe("REF-456");
    });

    it("should return initiated status when transaction ID contains PENDING", async () => {
      const request = {
        transactionId: "MOCK-PENDING-123",
        referenceId: "REF-456",
      };

      const result = await provider.verifyPayment(request);

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.status).toBe("Initiated");
      expect(result.transactionId).toBe("MOCK-PENDING-123");
      expect(result.referenceId).toBe("REF-456");
    });
  });

  describe("name", () => {
    it("should have correct provider name", () => {
      expect(provider.name).toBe("Mock Payment Gateway");
    });
  });
});
