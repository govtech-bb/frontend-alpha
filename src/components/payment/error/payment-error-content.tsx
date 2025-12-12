"use client";

import { Button } from "@govtech-bb/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { parseFormIdFromReference } from "@/lib/ezpay/ezpay-service";

type ErrorDetails = {
  transactionNumber: string | null;
  referenceNumber: string | null;
  reason: string | null;
  formId: string | null;
  formTitle: string | null;
  formUrl: string | null;
};

export function PaymentErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [details, setDetails] = useState<ErrorDetails | null>(null);

  useEffect(() => {
    const transactionNumber = searchParams.get("tx");
    const referenceNumber = searchParams.get("ref");
    const reason = searchParams.get("reason");
    const formId = referenceNumber
      ? parseFormIdFromReference(referenceNumber)
      : null;

    // Find form details from the information architecture
    let formTitle: string | null = null;
    let formUrl: string | null = null;

    if (formId) {
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
      reason,
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

  const getErrorMessage = (reason: string | null): string => {
    switch (reason) {
      case "missing-params":
        return "No payment information was provided. Please try again.";
      case "verification-failed":
        return "We couldn't verify your payment. Please contact support.";
      default:
        return (
          reason || "Your payment could not be processed. Please try again."
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Error Card */}
        <div className="rounded-lg bg-red-50 p-8 shadow-lg">
          {/* Error Icon */}
          <div className="mb-6 text-center">
            <div className="mb-4 text-6xl text-red-500">✕</div>
            <h1 className="font-bold text-2xl text-red-700">Payment Failed</h1>
            <p className="mt-2 text-red-600">
              {getErrorMessage(details.reason)}
            </p>
          </div>

          {/* Payment Details */}
          {(details.transactionNumber || details.referenceNumber) && (
            <div className="mb-6 rounded bg-white p-4">
              <h2 className="mb-3 font-semibold">Payment Details</h2>
              <div className="space-y-2 text-sm">
                {details.transactionNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction #:</span>
                    <span className="font-mono">
                      {details.transactionNumber}
                    </span>
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
          )}

          {/* Help Information */}
          <div className="mb-6 rounded border border-red-300 bg-red-100 p-4">
            <h3 className="mb-2 font-semibold text-red-800 text-sm">
              What to do next:
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-red-700 text-sm">
              <li>Check your payment details and try again</li>
              <li>Ensure you have sufficient funds in your account</li>
              <li>
                Contact your bank if you believe the payment should have
                succeeded
              </li>
              <li>
                If the problem persists, contact support with your transaction
                number
              </li>
            </ul>
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
                Go to Home
              </Button>
            )}
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-3 font-semibold">Need Help?</h2>
          <p className="text-gray-700 text-sm">
            If you need assistance with your payment, please contact our support
            team with your transaction or reference number.
          </p>
        </div>
      </div>
    </div>
  );
}
