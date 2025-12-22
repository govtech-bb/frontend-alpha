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

  // Extract form ID from reference number
  let formId: string | null = null;
  if (referenceNumber) {
    formId = parseFormIdFromReference(referenceNumber);
  }

  // Get the correct origin - use referer header which contains where the user came from
  const referer = request.headers.get("referer");
  let origin: string;

  if (referer) {
    // Extract origin from referer URL
    try {
      const refererUrl = new URL(referer);
      origin = refererUrl.origin;
    } catch {
      // Fallback to constructing from headers
      const host = request.headers.get("host") || request.nextUrl.host;
      const protocol = host.includes("localhost") ? "http" : "https";
      origin = `${protocol}://${host}`;
    }
  } else {
    // No referer, construct from headers
    const host = request.headers.get("host") || request.nextUrl.host;
    const protocol = host.includes("localhost") ? "http" : "https";
    origin = `${protocol}://${host}`;
  }

  // Find the form URL from information architecture
  let formUrl: string | null = null;

  if (formId) {
    for (const category of INFORMATION_ARCHITECTURE) {
      const page = category.pages.find((p) => p.slug === formId);
      if (page) {
        formUrl = `/${category.slug}/${page.slug}/form`;
        break;
      }
    }
  }

  // If form not found or missing parameters, redirect to home with error alert
  if (!(formUrl && (transactionNumber || referenceNumber))) {
    // Redirect to home with alert parameters
    const homeUrl = new URL("/", origin);
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

    // Determine payment status
    const status = verifyResult._status;

    // Build redirect URL to form with payment status parameters
    const redirectUrl = new URL(formUrl, origin);
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

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    // Redirect to form with error status
    const redirectUrl = new URL(formUrl, origin);
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
