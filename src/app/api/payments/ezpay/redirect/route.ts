/** biome-ignore-all lint/suspicious/noConsole: Console logging required for payment redirect debugging */
import { type NextRequest, NextResponse } from "next/server";
import { parseFormIdFromReference } from "@/lib/ezpay/ezpay-service";

/**
 * EZPay redirect endpoint
 * Handles user redirects after payment, extracts form ID from reference,
 * and redirects to the appropriate form page
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionNumber = searchParams.get("tx");
  const referenceNumber = searchParams.get("rid");

  console.log("EZPay Redirect - Transaction:", transactionNumber);
  console.log("EZPay Redirect - Reference:", referenceNumber);

  // Validate we have required parameters
  if (!(transactionNumber || referenceNumber)) {
    console.error("EZPay Redirect - Missing parameters");
    return NextResponse.redirect(
      new URL("/payment/error?reason=missing-params", request.url)
    );
  }

  try {
    // Verify payment first
    const verifyResponse = await fetch(
      new URL("/api/ezpay/verify", request.url),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionNumber,
          reference: referenceNumber,
        }),
      }
    );

    const verifyResult = await verifyResponse.json();
    console.log("EZPay Redirect - Verify result:", verifyResult);

    // Check if payment was successful
    const isSuccess =
      verifyResult.success && verifyResult.data?._status === "Success";
    const isInitiated =
      verifyResult.success && verifyResult.data?._status === "Initiated";

    // Extract form ID from reference number if available
    let formId: string | null = null;
    if (referenceNumber) {
      formId = parseFormIdFromReference(referenceNumber);
      console.log("EZPay Redirect - Parsed form ID:", formId);
    }

    // Build redirect URL based on payment status
    // Using generic pages that parse form ID from reference number
    let redirectUrl: URL;

    if (isSuccess) {
      redirectUrl = new URL("/payment/success", request.url);
      redirectUrl.searchParams.set("tx", transactionNumber || "");
      redirectUrl.searchParams.set("ref", referenceNumber || "");
    } else if (isInitiated) {
      redirectUrl = new URL("/payment/pending", request.url);
      redirectUrl.searchParams.set("tx", transactionNumber || "");
      redirectUrl.searchParams.set("ref", referenceNumber || "");
    } else {
      redirectUrl = new URL("/payment/error", request.url);
      redirectUrl.searchParams.set("tx", transactionNumber || "");
      redirectUrl.searchParams.set("ref", referenceNumber || "");
      if (verifyResult.error) {
        redirectUrl.searchParams.set("reason", verifyResult.error);
      }
    }

    console.log("EZPay Redirect - Redirecting to:", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("EZPay Redirect - Error:", error);
    const errorUrl = new URL("/payment/error", request.url);
    errorUrl.searchParams.set("reason", "verification-failed");
    return NextResponse.redirect(errorUrl);
  }
}
