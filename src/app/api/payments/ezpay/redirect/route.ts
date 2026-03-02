import { type NextRequest, NextResponse } from "next/server";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

/**
 * Find the form page URL from INFORMATION_ARCHITECTURE by form slug.
 */
const findFormUrl = (formSlug: string): string | null => {
  for (const category of INFORMATION_ARCHITECTURE) {
    const page = category.pages.find((p) => p.slug === formSlug);
    if (page) {
      return `/${category.slug}/${page.slug}/form`;
    }
  }
  return null;
};

/**
 * EZPay redirect endpoint
 *
 * Called by the backend after EZPay payment completes.
 *
 * Expected params from backend:
 * - formId: form slug (e.g. "get-birth-certificate")
 * - rid: reference number (e.g., DEPARTMENT|formId|submissionId)
 * - tx: transaction number
 * - paymentStatus: "Success" | "Failed" | "Initiated"
 */
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const formId = searchParams.get("formId");
  const referenceNumber = searchParams.get("rid");
  const transactionNumber = searchParams.get("tx");
  const paymentStatus = searchParams.get("paymentStatus") || "Failed";

  const origin = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  const formUrl = formId ? findFormUrl(formId) : null;

  // Fallback to homepage if form not found
  if (!formUrl) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Redirect to form confirmation page with payment params
  const redirectUrl = new URL(formUrl, origin);
  redirectUrl.searchParams.set("step", "confirmation");
  redirectUrl.searchParams.set("paymentStatus", paymentStatus);
  if (transactionNumber) {
    redirectUrl.searchParams.set("tx", transactionNumber);
  }
  if (referenceNumber) {
    redirectUrl.searchParams.set("rid", referenceNumber);
  }

  return NextResponse.redirect(redirectUrl);
}
