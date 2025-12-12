"use client";

import { Button } from "@govtech-bb/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { parseFormIdFromReference } from "@/lib/ezpay/ezpay-service";

type PaymentDetails = {
  transactionNumber: string;
  referenceNumber: string;
  formId: string | null;
  formTitle: string | null;
  formUrl: string | null;
};

export function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [details, setDetails] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    const transactionNumber = searchParams.get("tx") || "";
    const referenceNumber = searchParams.get("ref") || "";
    const formId = referenceNumber
      ? parseFormIdFromReference(referenceNumber)
      : null;

    // Find form details from the information architecture
    let formTitle: string | null = null;
    let formUrl: string | null = null;

    if (formId) {
      // Search through all categories and pages to find matching form
      for (const category of INFORMATION_ARCHITECTURE) {
        const page = category.pages.find((p) => p.slug === formId);
        if (page) {
          formTitle = page.title;
          formUrl = `/${category.slug}/${page.slug}/form`;
          break;
        }
      }
    }

    setDetails({
      transactionNumber,
      referenceNumber,
      formId,
      formTitle,
      formUrl,
    });
  }, [searchParams]);

  if (!details) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Success Card */}
        <div className="rounded-lg bg-green-50 p-8 shadow-lg">
          {/* Success Icon */}
          <div className="mb-6 text-center">
            <div className="mb-4 text-6xl text-green-500">✓</div>
            <h1 className="font-bold text-2xl text-green-700">
              Payment Successful!
            </h1>
            <p className="mt-2 text-green-600">
              Your payment has been processed successfully
            </p>
          </div>

          {/* Payment Details */}
          <div className="mb-6 rounded bg-white p-4">
            <h2 className="mb-3 font-semibold">Payment Details</h2>
            <div className="space-y-2 text-sm">
              {details.transactionNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction #:</span>
                  <span className="font-mono">{details.transactionNumber}</span>
                </div>
              )}
              {details.referenceNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference #:</span>
                  <span className="font-mono">{details.referenceNumber}</span>
                </div>
              )}
              {details.formTitle && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span>{details.formTitle}</span>
                </div>
              )}
            </div>
          </div>

          {/* Information Box */}
          <div className="mb-6 rounded border border-green-300 bg-green-100 p-4">
            <p className="text-green-800 text-sm">
              A confirmation email will be sent to you shortly. Please keep your
              transaction and reference numbers for your records.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            {details.formUrl ? (
              <>
                <Button
                  className="flex-1"
                  onClick={() => router.push(details.formUrl!)}
                  type="button"
                >
                  Return to Form
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => router.push("/")}
                  type="button"
                  variant="secondary"
                >
                  Go to Home
                </Button>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={() => router.push("/")}
                type="button"
              >
                Continue
              </Button>
            )}
          </div>
        </div>

        {/* What's Next */}
        {details.formTitle && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-3 font-semibold">What happens next?</h2>
            <ul className="list-disc space-y-2 pl-5 text-gray-700 text-sm">
              <li>
                Your payment for <strong>{details.formTitle}</strong> has been
                confirmed
              </li>
              <li>
                You can return to the form to continue or review your submission
              </li>
              <li>You will receive updates about your application via email</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
