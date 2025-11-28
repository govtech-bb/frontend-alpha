import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET } from "../route";

/**
 * EZPay Redirector Tests
 * See: /tmp/REDIRECTOR-SPEC.md for specification
 */

describe("GET /api/ezpay-redirector", () => {
  describe("Valid Redirects", () => {
    it("should redirect to localhost with preserved parameters", async () => {
      const testUrl = "http://localhost:3000";
      const testUuid = "passport-abc-123";
      const encodedUrl = Buffer.from(testUrl).toString("base64url");
      const rid = `${encodedUrl}.${testUuid}`;
      const tx = "TX-12345";

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=${tx}&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe(
        `${testUrl}/payment/callback?tx=${tx}&rid=${rid}`
      );
    });

    it("should redirect to alpha.gov.bb", async () => {
      const testUrl = "https://alpha.gov.bb";
      const testUuid = "passport-xyz-789";
      const encodedUrl = Buffer.from(testUrl).toString("base64url");
      const rid = `${encodedUrl}.${testUuid}`;
      const tx = "TX-67890";

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=${tx}&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe(
        `${testUrl}/payment/callback?tx=${tx}&rid=${rid}`
      );
    });

    it("should redirect to dev.alpha.gov.bb", async () => {
      const testUrl = "https://dev.alpha.gov.bb";
      const testUuid = "dev-test-123";
      const encodedUrl = Buffer.from(testUrl).toString("base64url");
      const rid = `${encodedUrl}.${testUuid}`;
      const tx = "TX-DEV";

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=${tx}&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe(
        `${testUrl}/payment/callback?tx=${tx}&rid=${rid}`
      );
    });

    it("should redirect to Vercel preview deployment", async () => {
      const testUrl = "https://preview-xyz123.vercel.app";
      const testUuid = "preview-uuid-789";
      const encodedUrl = Buffer.from(testUrl).toString("base64url");
      const rid = `${encodedUrl}.${testUuid}`;
      const tx = "TX-VERCEL";

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=${tx}&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toBe(
        `${testUrl}/payment/callback?tx=${tx}&rid=${rid}`
      );
    });
  });

  describe("Missing Parameters (400 Bad Request)", () => {
    it("should return 400 when tx parameter is missing", async () => {
      const testUrl = "http://localhost:3000";
      const testUuid = "test-uuid";
      const encodedUrl = Buffer.from(testUrl).toString("base64url");
      const rid = `${encodedUrl}.${testUuid}`;

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("Missing required parameter");
      expect(text).toContain("tx");
    });

    it("should return 400 when rid parameter is missing", async () => {
      const request = new NextRequest(
        "http://test.com/api/ezpay-redirector?tx=TX-123"
      );

      const response = await GET(request);

      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("Missing required parameter");
      expect(text).toContain("rid");
    });
  });

  describe("Invalid Reference ID Format (400 Bad Request)", () => {
    it("should return 400 when rid has no dot separator", async () => {
      const request = new NextRequest(
        "http://test.com/api/ezpay-redirector?tx=TX-123&rid=nodotinthisstring"
      );

      const response = await GET(request);

      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("Invalid reference ID");
    });

    it("should return 400 when rid has empty encoded URL part", async () => {
      const request = new NextRequest(
        "http://test.com/api/ezpay-redirector?tx=TX-123&rid=.only-uuid"
      );

      const response = await GET(request);

      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("Invalid reference ID");
    });

    it("should return 400 when decoded content is not a valid URL", async () => {
      const invalidContent = "not a url at all";
      const encodedUrl = Buffer.from(invalidContent).toString("base64url");
      const rid = `${encodedUrl}.uuid-123`;

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=TX-123&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain("Invalid reference ID");
    });
  });

  describe("Security - Non-Whitelisted URLs (403 Forbidden)", () => {
    it("should return 403 for non-whitelisted domain", async () => {
      const blockedUrl = "https://evil-site.com";
      const encodedUrl = Buffer.from(blockedUrl).toString("base64url");
      const rid = `${encodedUrl}.uuid-123`;

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=TX-123&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(403);
      const text = await response.text();
      expect(text).toContain("not whitelisted");
    });

    it("should return 403 for HTTP Vercel URL (HTTPS required)", async () => {
      const blockedUrl = "http://preview.vercel.app";
      const encodedUrl = Buffer.from(blockedUrl).toString("base64url");
      const rid = `${encodedUrl}.uuid-123`;

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=TX-123&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(403);
      const text = await response.text();
      expect(text).toContain("not whitelisted");
    });

    it("should return 403 for https://gov.bb (not in whitelist)", async () => {
      const blockedUrl = "https://gov.bb";
      const encodedUrl = Buffer.from(blockedUrl).toString("base64url");
      const rid = `${encodedUrl}.uuid-123`;

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=TX-123&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(403);
      const text = await response.text();
      expect(text).toContain("not whitelisted");
    });

    it("should return 403 for https://staging.gov.bb (not in whitelist)", async () => {
      const blockedUrl = "https://staging.gov.bb";
      const encodedUrl = Buffer.from(blockedUrl).toString("base64url");
      const rid = `${encodedUrl}.uuid-123`;

      const request = new NextRequest(
        `http://test.com/api/ezpay-redirector?tx=TX-123&rid=${rid}`
      );

      const response = await GET(request);

      expect(response.status).toBe(403);
      const text = await response.text();
      expect(text).toContain("not whitelisted");
    });
  });
});
