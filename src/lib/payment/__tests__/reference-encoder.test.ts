import { describe, expect, it } from "vitest";
import { isReturnUrlAllowed } from "../reference-encoder";

/**
 * Tests for URL whitelist validation.
 * See: /tmp/REDIRECTOR-SPEC.md for specification
 */
describe("isReturnUrlAllowed", () => {
  describe("Allowed URLs", () => {
    it("should allow https://alpha.gov.bb", () => {
      expect(isReturnUrlAllowed("https://alpha.gov.bb")).toBe(true);
    });

    it("should allow https://dev.alpha.gov.bb", () => {
      expect(isReturnUrlAllowed("https://dev.alpha.gov.bb")).toBe(true);
    });

    it("should allow http://localhost:3000", () => {
      expect(isReturnUrlAllowed("http://localhost:3000")).toBe(true);
    });

    it("should allow http://localhost:4000", () => {
      expect(isReturnUrlAllowed("http://localhost:4000")).toBe(true);
    });

    it("should allow http://127.0.0.1:3000", () => {
      expect(isReturnUrlAllowed("http://127.0.0.1:3000")).toBe(true);
    });

    it("should allow http://127.0.0.1:8080", () => {
      expect(isReturnUrlAllowed("http://127.0.0.1:8080")).toBe(true);
    });

    it("should allow https://preview-xyz.vercel.app", () => {
      expect(isReturnUrlAllowed("https://preview-xyz.vercel.app")).toBe(true);
    });

    it("should allow https://subdomain.vercel.app", () => {
      expect(isReturnUrlAllowed("https://subdomain.vercel.app")).toBe(true);
    });
  });

  describe("Blocked URLs", () => {
    it("should block https://evil-site.com", () => {
      expect(isReturnUrlAllowed("https://evil-site.com")).toBe(false);
    });

    it("should block http://preview.vercel.app (HTTP not allowed for Vercel)", () => {
      expect(isReturnUrlAllowed("http://preview.vercel.app")).toBe(false);
    });

    it("should block https://evil.com/vercel.app/fake (vercel.app in path)", () => {
      expect(isReturnUrlAllowed("https://evil.com/vercel.app/fake")).toBe(
        false
      );
    });

    it("should block https://vercel.app.evil.com (vercel.app as subdomain)", () => {
      expect(isReturnUrlAllowed("https://vercel.app.evil.com")).toBe(false);
    });

    it("should block https://fake-gov.bb.evil.com (gov.bb spoofing)", () => {
      expect(isReturnUrlAllowed("https://fake-gov.bb.evil.com")).toBe(false);
    });

    it("should block https://gov.bb (not in whitelist)", () => {
      expect(isReturnUrlAllowed("https://gov.bb")).toBe(false);
    });

    it("should block https://staging.gov.bb (not in whitelist)", () => {
      expect(isReturnUrlAllowed("https://staging.gov.bb")).toBe(false);
    });

    it("should block https://random-domain.com", () => {
      expect(isReturnUrlAllowed("https://random-domain.com")).toBe(false);
    });
  });
});
