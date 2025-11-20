"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";

/**
 * Mock EZPay Payment Gateway
 * For local development and testing without real EZPay credentials
 *
 * Usage: Set EZPAY_MOCK_MODE=true in .env.local
 */
function MockPaymentContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // In mock mode, the token contains the reference ID
  const referenceId = token;

  const simulatePayment = (success: boolean) => {
    // Use transaction ID pattern to simulate different statuses
    // The mock provider checks transaction ID for FAIL/PENDING keywords
    const mockTx = success
      ? `MOCK-SUCCESS-${Date.now()}`
      : `MOCK-FAIL-${Date.now()}`;

    // Redirect back to callback with mock data
    window.location.href = `/payment/callback?tx=${mockTx}&rid=${referenceId}`;
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="rounded-md border-4 border-amber-500 bg-amber-50 p-6 mb-8">
        <Typography className="font-bold text-amber-800" variant="h2">
          ⚠️ Mock Payment Gateway
        </Typography>
        <Typography className="text-amber-800 mt-2" variant="paragraph">
          This is a development testing page. In production, users are
          redirected to the real EZPay gateway.
        </Typography>
      </div>

      <Typography variant="h1">Test Payment Flow</Typography>

      <div className="mt-8 space-y-6">
        <div className="rounded-md border border-blue-100 bg-blue-10 p-6">
          <Typography className="font-bold" variant="h3">
            Payment Details
          </Typography>
          <div className="mt-4 space-y-2">
            <Typography variant="paragraph">
              <strong>Reference ID:</strong> {referenceId}
            </Typography>
            <Typography variant="paragraph">
              <strong>Amount:</strong> $150.00 BBD
            </Typography>
            <Typography variant="paragraph">
              <strong>Description:</strong> Passport Replacement
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="h3">Simulate Payment Outcome:</Typography>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              className="flex-1"
              onClick={() => simulatePayment(true)}
              variant="primary"
            >
              ✓ Simulate Successful Payment
            </Button>

            <Button
              className="flex-1"
              onClick={() => simulatePayment(false)}
              variant="secondary"
            >
              ✗ Simulate Failed Payment
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm">
          <Typography variant="paragraph">
            <strong>Testing Notes:</strong>
          </Typography>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Successful payment will trigger email sending to the ministry
            </li>
            <li>Failed payment will show error message and allow retry</li>
            <li>
              Your form data is temporarily stored in browser sessionStorage
            </li>
            <li>Check the server console for email sending logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function MockPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-2xl py-8">Loading...</div>
      }
    >
      <MockPaymentContent />
    </Suspense>
  );
}
