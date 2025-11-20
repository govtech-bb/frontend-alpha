export const runtime = "nodejs";

import { type NextRequest, NextResponse } from "next/server";
import { logDev, logWarn } from "@/lib/logger";
import { isReturnUrlAllowed } from "@/lib/payment/reference-encoder";

/**
 * GET /api/ezpay-redirector
 *
 * Minimal EZPay callback redirector service.
 * Receives EZPay payment callbacks and redirects to the correct environment.
 *
 * Query Parameters:
 *   - tx: Transaction ID from EZPay (required)
 *   - rid: Encoded reference ID containing return URL (required)
 *
 * Returns:
 *   - 302 Redirect to decoded return URL with preserved parameters
 *   - 400 Bad Request if parameters missing or invalid
 *   - 403 Forbidden if decoded URL not whitelisted
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tx = searchParams.get("tx");
    const rid = searchParams.get("rid");

    // Validate required parameters
    if (!tx) {
      logDev("Missing tx parameter");
      return new NextResponse("Error: Missing required parameter 'tx'", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (!rid) {
      logDev("Missing rid parameter");
      return new NextResponse("Error: Missing required parameter 'rid'", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Parse reference ID: base64url(returnURL) + "." + uuid
    let returnUrl: string;
    try {
      const dotIndex = rid.indexOf(".");
      if (dotIndex === -1) {
        logDev("No dot separator in reference ID");
        return new NextResponse("Error: Invalid reference ID format", {
          status: 400,
          headers: { "Content-Type": "text/plain" },
        });
      }

      const encodedUrl = rid.substring(0, dotIndex);
      const uuid = rid.substring(dotIndex + 1);

      if (!(encodedUrl && uuid)) {
        logDev("Empty encoded URL or UUID");
        return new NextResponse("Error: Invalid reference ID format", {
          status: 400,
          headers: { "Content-Type": "text/plain" },
        });
      }

      // Decode base64url
      returnUrl = Buffer.from(encodedUrl, "base64url").toString("utf-8");

      // Validate URL format
      new URL(returnUrl);
    } catch (error) {
      logDev("Failed to decode reference ID", {
        error: error instanceof Error ? error.message : "Unknown",
      });
      return new NextResponse("Error: Invalid reference ID format", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Validate against whitelist
    if (!isReturnUrlAllowed(returnUrl)) {
      logWarn("URL not whitelisted", {
        url: returnUrl,
        rid: rid.substring(0, 20),
      });
      return new NextResponse("Error: Redirect URL not whitelisted", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Build redirect URL with preserved parameters
    const redirectUrl = new URL("/payment/callback", returnUrl);
    redirectUrl.searchParams.set("tx", tx);
    redirectUrl.searchParams.set("rid", rid);

    logDev("Redirect success", { tx, target: returnUrl });

    // Perform 302 redirect
    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  } catch (error) {
    logWarn("Unexpected error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return new NextResponse("Error: Invalid reference ID format", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
