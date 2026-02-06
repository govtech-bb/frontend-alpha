import { type NextRequest, NextResponse } from "next/server";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { FORM_COMPONENTS } from "@/lib/form-registry";

const generatePrefix = (slug: string): string =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

const extractPrefix = (reference: string): string | null => {
  const firstDash = reference.indexOf("-");
  if (firstDash === -1) return null;
  return reference.substring(0, firstDash);
};

const findFormSlugByPrefix = (prefix: string): string | null => {
  const formSlugs = Object.keys(FORM_COMPONENTS);
  return formSlugs.find((slug) => generatePrefix(slug) === prefix) || null;
};

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
 * Expected params from backend:
 * - rid: reference number (e.g. GBC-20260202-164212-VFPT5A)
 * - tx: transaction number
 * - payment_status: "Success" | "Failed" | "Initiated"
 */
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const referenceNumber = searchParams.get("rid");
  const transactionNumber = searchParams.get("tx");
  const paymentStatus = searchParams.get("payment_status") || "failed";

  let origin: string;

  if (process.env.NEXT_PUBLIC_APP_URL) {
    origin = process.env.NEXT_PUBLIC_APP_URL;
  } else {
    const host = request.headers.get("host") || request.nextUrl.host;
    const protocol = host.includes("localhost") ? "http" : "https";
    origin = `${protocol}://${host}`;
  }

  // Find form by reverse-mapping the reference prefix to a form slug
  // const prefix = referenceNumber ? extractPrefix(referenceNumber) : null;
  // const formSlug = prefix ? findFormSlugByPrefix(prefix) : null;
  // const formUrl = formSlug ? findFormUrl(formSlug) : null;
  const formUrl = null;

  // Fallback to homepage if form not found
  if (!formUrl) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Redirect to form confirmation page with payment params
  const redirectUrl = new URL(formUrl, origin);
  redirectUrl.searchParams.set("step", "confirmation");
  redirectUrl.searchParams.set("payment_status", paymentStatus);
  if (transactionNumber) {
    redirectUrl.searchParams.set("tx", transactionNumber);
  }
  if (referenceNumber) {
    redirectUrl.searchParams.set("ref", referenceNumber);
  }

  return NextResponse.redirect(redirectUrl);
}
