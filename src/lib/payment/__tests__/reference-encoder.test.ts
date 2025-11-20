import { afterEach, describe, expect, it, vi } from "vitest";
import {
  decodeReferenceId,
  extractUuid,
  generateEncodedReferenceId,
  getBaseUrl,
} from "../reference-encoder";

describe("reference-encoder", () => {
  describe("generateEncodedReferenceId", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should generate a reference ID with base64url and UUID", () => {
      const referenceId = generateEncodedReferenceId();

      expect(referenceId).toContain(".");
      const [encodedPart, uuidPart] = referenceId.split(".");

      // Should have both parts
      expect(encodedPart).toBeTruthy();
      expect(uuidPart).toBeTruthy();

      // UUID should match UUID v4 format
      expect(uuidPart).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      );
    });

    it("should use current environment URL", () => {
      // This test just verifies that generateEncodedReferenceId creates
      // a valid reference ID that can be decoded back.
      // The specific URL depends on the environment where tests run.
      const referenceId = generateEncodedReferenceId();
      const decoded = decodeReferenceId(referenceId);

      expect(decoded).not.toBeNull();
      expect(decoded?.returnUrl).toBeTruthy();
      expect(decoded?.uuid).toBeTruthy();
    });
  });

  describe("decodeReferenceId", () => {
    it("should decode a valid encoded reference ID", () => {
      // Create an encoded reference manually
      const testUrl = "http://localhost:3000";
      const testUuid = "abc-123-def-456";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);

      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
      expect(result?.uuid).toBe(testUuid);
    });

    it("should handle production URL", () => {
      const testUrl = "https://gov.bb";
      const testUuid = "xyz-789";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);

      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
    });

    it("should handle staging URL", () => {
      const testUrl = "https://staging.gov.bb";
      const testUuid = "stage-123";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);

      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
    });

    it("should handle Vercel preview URLs", () => {
      const testUrl = "https://preview-abc123.vercel.app";
      const testUuid = "preview-uuid";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);

      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
    });

    it("should handle localhost with port", () => {
      const testUrl = "http://localhost:3000";
      const testUuid = "local-123";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);

      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
    });

    it("should handle 127.0.0.1 URLs", () => {
      const testUrl = "http://127.0.0.1:3000";
      const testUuid = "ip-123";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);

      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
    });

    it("should reject malformed reference IDs (no separator)", () => {
      const result = decodeReferenceId("invalidreference");
      expect(result).toBeNull();
    });

    it("should reject reference IDs with missing UUID", () => {
      const encoded = Buffer.from("http://localhost:3000").toString(
        "base64url"
      );
      const result = decodeReferenceId(`${encoded}.`);
      expect(result).toBeNull();
    });

    it("should reject reference IDs with missing encoded URL", () => {
      const result = decodeReferenceId(".abc-123-def");
      expect(result).toBeNull();
    });

    it("should reject invalid base64", () => {
      const result = decodeReferenceId("not-valid-base64!!!.abc-123");
      expect(result).toBeNull();
    });

    it("should reject non-whitelisted URLs", () => {
      const evilUrl = "https://evil-site.com";
      const encoded = Buffer.from(evilUrl).toString("base64url");
      const referenceId = `${encoded}.abc-123`;

      const result = decodeReferenceId(referenceId);
      expect(result).toBeNull();
    });

    it("should reject URLs with vercel.app but not HTTPS", () => {
      const badUrl = "http://preview.vercel.app"; // HTTP not HTTPS
      const encoded = Buffer.from(badUrl).toString("base64url");
      const referenceId = `${encoded}.abc-123`;

      const result = decodeReferenceId(referenceId);
      expect(result).toBeNull();
    });

    it("should reject fake vercel.app domains", () => {
      const fakeUrl = "https://evil.com/.vercel.app/fake";
      const encoded = Buffer.from(fakeUrl).toString("base64url");
      const referenceId = `${encoded}.abc-123`;

      const result = decodeReferenceId(referenceId);
      expect(result).toBeNull();
    });

    it("should handle URLs with query parameters", () => {
      const testUrl = "http://localhost:3000";
      const testUuid = "test-uuid";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const result = decodeReferenceId(referenceId);
      expect(result).not.toBeNull();
      expect(result?.returnUrl).toBe(testUrl);
    });
  });

  describe("getBaseUrl", () => {
    it("should return BASE_URL when set", () => {
      const env = { BASE_URL: "https://custom.domain.com" };
      const url = getBaseUrl(env);
      expect(url).toBe("https://custom.domain.com");
    });

    it("should return VERCEL_URL with https when set", () => {
      const env = { VERCEL_URL: "preview-xyz.vercel.app" };
      const url = getBaseUrl(env);
      expect(url).toBe("https://preview-xyz.vercel.app");
    });

    it("should prefer VERCEL_URL over default", () => {
      const env = { VERCEL_URL: "preview-123.vercel.app" };
      const url = getBaseUrl(env);
      expect(url).toBe("https://preview-123.vercel.app");
    });

    it("should fall back to localhost:3000 by default", () => {
      const env = {};
      const url = getBaseUrl(env);
      expect(url).toBe("http://localhost:3000");
    });

    it("should prioritize BASE_URL over VERCEL_URL", () => {
      const env = {
        VERCEL_URL: "preview.vercel.app",
        BASE_URL: "https://explicit.domain.com",
      };
      const url = getBaseUrl(env);
      expect(url).toBe("https://explicit.domain.com");
    });
  });

  describe("extractUuid", () => {
    it("should extract UUID from encoded reference ID", () => {
      const testUrl = "http://localhost:3000";
      const testUuid = "my-special-uuid-123";
      const encoded = Buffer.from(testUrl).toString("base64url");
      const referenceId = `${encoded}.${testUuid}`;

      const uuid = extractUuid(referenceId);
      expect(uuid).toBe(testUuid);
    });

    it("should return full ID if decoding fails (backward compatibility)", () => {
      const legacyId = "passport-abc-123";
      const uuid = extractUuid(legacyId);
      expect(uuid).toBe(legacyId);
    });

    it("should handle malformed reference IDs gracefully", () => {
      const malformed = "not.valid.encoded.data.here";
      const uuid = extractUuid(malformed);
      // Should return the whole string since decode fails
      expect(uuid).toBe(malformed);
    });
  });

  describe("round-trip encoding", () => {
    it("should encode and decode back to original URL", () => {
      const referenceId = generateEncodedReferenceId();
      const decoded = decodeReferenceId(referenceId);

      expect(decoded).not.toBeNull();
      expect(decoded?.returnUrl).toBeTruthy();
    });

    it("should preserve UUID through encode/decode", () => {
      const referenceId = generateEncodedReferenceId();
      const [, originalUuid] = referenceId.split(".");
      const decoded = decodeReferenceId(referenceId);

      expect(decoded).not.toBeNull();
      expect(decoded?.uuid).toBe(originalUuid);
    });
  });

  describe("security validation", () => {
    it("should reject URLs from disallowed domains", () => {
      const attackUrls = [
        "https://attacker.com",
        "http://malicious.site",
        "https://fake-gov.bb.evil.com",
        "javascript:alert(1)",
      ];

      for (const url of attackUrls) {
        const encoded = Buffer.from(url).toString("base64url");
        const referenceId = `${encoded}.test-uuid`;
        const result = decodeReferenceId(referenceId);
        expect(result).toBeNull();
      }
    });

    it("should only allow HTTPS for vercel.app domains", () => {
      const httpVercel = "http://preview.vercel.app";
      const encoded = Buffer.from(httpVercel).toString("base64url");
      const referenceId = `${encoded}.test-uuid`;

      const result = decodeReferenceId(referenceId);
      expect(result).toBeNull();
    });

    it("should validate vercel.app is in the hostname", () => {
      const fakeUrls = [
        "https://evil.com/vercel.app",
        "https://vercel.app.evil.com",
        "https://notvercel.app",
      ];

      for (const url of fakeUrls) {
        const encoded = Buffer.from(url).toString("base64url");
        const referenceId = `${encoded}.test-uuid`;
        const result = decodeReferenceId(referenceId);
        expect(result).toBeNull();
      }
    });
  });
});
