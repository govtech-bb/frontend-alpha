import { afterEach, describe, expect, it } from "vitest";
import { getPaymentProvider } from "../index";
import { EzPayProvider } from "../providers/ezpay-provider";
import { MockPaymentProvider } from "../providers/mock-provider";

describe("Payment Provider Factory", () => {
  const originalEnv = process.env.EZPAY_MOCK_MODE;

  afterEach(() => {
    // Restore original environment
    if (originalEnv !== undefined) {
      process.env.EZPAY_MOCK_MODE = originalEnv;
    } else {
      delete process.env.EZPAY_MOCK_MODE;
    }
  });

  it("should return MockPaymentProvider when EZPAY_MOCK_MODE is true", () => {
    process.env.EZPAY_MOCK_MODE = "true";

    const provider = getPaymentProvider();

    expect(provider).toBeInstanceOf(MockPaymentProvider);
    expect(provider.name).toBe("Mock Payment Gateway");
  });

  it("should return EzPayProvider when EZPAY_MOCK_MODE is false", () => {
    process.env.EZPAY_MOCK_MODE = "false";

    const provider = getPaymentProvider();

    expect(provider).toBeInstanceOf(EzPayProvider);
    expect(provider.name).toBe("EZPay+");
  });

  it("should return EzPayProvider when EZPAY_MOCK_MODE is not set", () => {
    delete process.env.EZPAY_MOCK_MODE;

    const provider = getPaymentProvider();

    expect(provider).toBeInstanceOf(EzPayProvider);
  });
});
