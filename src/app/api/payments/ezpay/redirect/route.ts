/** biome-ignore-all lint/suspicious/noConsole: Console logging required for payment redirect debugging */
import { type NextRequest, NextResponse } from "next/server";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import {
  parseFormIdFromReference,
  verifyPayment,
} from "@/lib/ezpay/ezpay-service";

/**
 * EZPay redirect endpoint
 * Handles user redirects after payment, extracts form ID from reference,
 * verifies payment status, and redirects to the form's final step
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionNumber = searchParams.get("tx");
  const referenceNumber = searchParams.get("rid");

  console.log("EZPay Redirect - Transaction:", transactionNumber);
  console.log("EZPay Redirect - Reference:", referenceNumber);

  // Extract form ID from reference number
  let formId: string | null = null;
  if (referenceNumber) {
    formId = parseFormIdFromReference(referenceNumber);
    console.log("EZPay Redirect - Parsed form ID:", formId);
  }

  // Find the form URL from information architecture
  let formUrl: string | null = null;

  if (formId) {
    for (const category of INFORMATION_ARCHITECTURE) {
      const page = category.pages.find((p) => p.slug === formId);
      if (page) {
        formUrl = `/${category.slug}/${page.slug}/form`;
        console.log("EZPay Redirect - Found form URL:", formUrl);
        break;
      }
    }
  }

  // If form not found or missing parameters, redirect to home with error alert
  if (!(formUrl && (transactionNumber || referenceNumber))) {
    const errorDetails = {
      reason: formUrl ? "missing-parameters" : "form-not-found",
      formId,
      transactionNumber,
      referenceNumber,
    };
    console.error("EZPay Redirect - Critical error:", errorDetails);

    // Redirect to home with alert parameters
    const homeUrl = new URL("/", request.url);
    homeUrl.searchParams.set("payment_error", "true");
    homeUrl.searchParams.set(
      "error_message",
      formUrl
        ? "Missing payment information"
        : `Form not found for ID: ${formId}`
    );
    return NextResponse.redirect(homeUrl);
  }

  try {
    // Verify payment status using the correct API format
    const verifyResult = await verifyPayment({
      transactionNumber: transactionNumber || undefined,
      reference: referenceNumber || undefined,
    });

    console.log("EZPay Redirect - Verify result:", verifyResult);

    // Determine payment status
    const status = verifyResult._status;
    console.log("EZPay Redirect - Payment status:", status);

    // Build redirect URL to form with payment status parameters
    const redirectUrl = new URL(formUrl, request.url);
    redirectUrl.searchParams.set("payment_status", status);
    redirectUrl.searchParams.set("tx", transactionNumber || "");
    redirectUrl.searchParams.set("ref", referenceNumber || "");

    // Add specific status flags for easier handling in form
    if (status === "Success") {
      redirectUrl.searchParams.set("payment_success", "true");
    } else if (status === "Initiated") {
      redirectUrl.searchParams.set("payment_pending", "true");
    } else if (status === "Failed") {
      redirectUrl.searchParams.set("payment_failed", "true");
    }

    console.log(
      "EZPay Redirect - Redirecting to form:",
      redirectUrl.toString()
    );
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    // Log error details but still redirect to form with error status
    console.error("EZPay Redirect - Verification error:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      transactionNumber,
      referenceNumber,
      formId,
      formUrl,
    });

    // Redirect to form with error status
    const redirectUrl = new URL(formUrl, request.url);
    redirectUrl.searchParams.set("payment_status", "error");
    redirectUrl.searchParams.set(
      "payment_error",
      error instanceof Error ? error.message : "verification-failed"
    );
    redirectUrl.searchParams.set("tx", transactionNumber || "");
    redirectUrl.searchParams.set("ref", referenceNumber || "");

    return NextResponse.redirect(redirectUrl);
  }
}
