"use client";

import { Button, Heading, LinkButton, Text } from "@govtech-bb/react";
import { useOpenPanel } from "@openpanel/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCategoryShortId,
  getFormShortIdFromSlug,
  trackEvent,
} from "@/lib/analytics";
import type { EZPayVerifyResponse } from "@/lib/ezpay/types";
import { getFormBaseContext, TRACKED_EVENTS } from "@/lib/openpanel";

type PaymentData = {
  amount: number;
  description: string;
  numberOfCopies?: number;
  paymentUrl?: string;
  paymentToken?: string;
  paymentId?: string;
};

type Props = {
  paymentData: PaymentData;
  formId: string;
  customerEmail?: string;
  customerName?: string;
};

export const PaymentBlock = ({ paymentData, formId }: Props) => {
  const op = useOpenPanel();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categorySlug = pathname.split("/").filter(Boolean)[0] ?? "";
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    status: "Success" | "Failed" | "Initiated" | null;
    transactionNumber?: string;
    amount?: string;
    processor?: string;
    details?: string;
  }>({ status: null });

  const paymentErrorTrackedRef = useRef(false);

  const trackPaymentError = useCallback(() => {
    if (paymentErrorTrackedRef.current) return;
    paymentErrorTrackedRef.current = true;
    op.track(
      TRACKED_EVENTS.PAYMENT_ERROR_EVENT,
      getFormBaseContext(formId, categorySlug)
    );
  }, [formId, categorySlug]);

  // Check transaction status on mount if URL params are present
  useEffect(() => {
    const verifyTransaction = async () => {
      const tx = searchParams?.get("tx");
      const ref = searchParams?.get("ref");

      // Only verify if we have transaction number and haven't verified yet
      if (tx && !paymentStatus.status) {
        setVerifying(true);
        setError(null);

        try {
          const response = await fetch("/api/ezpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionNumber: tx,
              reference: ref || undefined,
            }),
          });

          const result = await response.json();

          if (result.success && result.data) {
            const data: EZPayVerifyResponse = result.data;
            setPaymentStatus({
              status: data._status,
              transactionNumber: data._transaction_number,
              amount: data._amount,
              processor: data._processor,
              details: data._details,
            });

            // Clear URL params after verification to prevent re-checking
            if (window.history.replaceState) {
              const newUrl =
                window.location.pathname +
                window.location.search
                  .replace(/[?&](tx|ref)=[^&]*/g, "")
                  .replace(/^&/, "?")
                  .replace(/\?$/, "");
              window.history.replaceState({}, "", newUrl);
            }
          } else {
            trackPaymentError();
            setError(result.error || "Failed to verify payment");
          }
        } catch (err) {
          trackPaymentError();
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          setError(`Verification error: ${errorMessage}`);
        } finally {
          setVerifying(false);
        }
      }
    };

    verifyTransaction();
  }, [searchParams, paymentStatus.status, trackPaymentError]);

  // If payment is successful, show success message
  if (paymentStatus.status === "Success") {
    return (
      <div className="space-y-6 border-green-500 border-l-4 bg-green-50 p-6">
        <div>
          <Heading as="h2" className="text-green-800">
            Payment Successful ✓
          </Heading>
          <Text as="p" className="text-green-700">
            Your payment has been processed successfully
          </Text>
        </div>
        <div className="space-y-2">
          <Text as="p" className="text-green-900">
            <span className="font-bold">Service:</span>{" "}
            {paymentData.description}
          </Text>
          <Text as="p" className="text-green-900">
            <span className="font-bold">Amount:</span> $
            {paymentStatus.amount || paymentData.amount.toFixed(2)}
          </Text>
          {paymentData.numberOfCopies && (
            <Text as="p" className="text-green-900">
              <span className="font-bold">Number of Copies:</span>{" "}
              {paymentData.numberOfCopies}
            </Text>
          )}
          {paymentStatus.transactionNumber && (
            <Text as="p" className="text-green-900">
              <span className="font-bold">Transaction Number:</span>{" "}
              {paymentStatus.transactionNumber}
            </Text>
          )}
          {paymentStatus.processor && (
            <Text as="p" className="text-green-900">
              <span className="font-bold">Payment Method:</span>{" "}
              {paymentStatus.processor}
            </Text>
          )}
        </div>
      </div>
    );
  }

  // If payment failed, show error state
  if (paymentStatus.status === "Failed") {
    return (
      <div className="space-y-6 border-red-500 border-l-4 bg-red-50 p-6">
        <div>
          <Heading as="h2" className="text-red-800">
            Payment Failed
          </Heading>
          <Text as="p" className="text-red-700">
            Your payment could not be processed
          </Text>
        </div>
        <div className="space-y-2">
          <Text as="p" className="text-red-900">
            <span className="font-bold">Service:</span>{" "}
            {paymentData.description}
          </Text>
          <Text as="p" className="text-red-900">
            <span className="font-bold">Amount:</span> $
            {paymentData.amount.toFixed(2)}
          </Text>
          {paymentData.numberOfCopies && (
            <Text as="p" className="text-red-900">
              <span className="font-bold">Number of Copies:</span>{" "}
              {paymentData.numberOfCopies}
            </Text>
          )}
          {paymentStatus.transactionNumber && (
            <Text as="p" className="text-red-900">
              <span className="font-bold">Transaction Number:</span>{" "}
              {paymentStatus.transactionNumber}
            </Text>
          )}
        </div>
      </div>
    );
  }

  // If payment initiated (Direct Debit), show pending state
  if (paymentStatus.status === "Initiated") {
    return (
      <div className="space-y-6 border-amber-500 border-l-4 bg-amber-50 p-6">
        <div>
          <Heading as="h2" className="text-amber-800">
            Payment Initiated
          </Heading>
          <Text as="p" className="text-amber-700">
            Your Direct Debit payment is being processed
          </Text>
        </div>
        <div className="space-y-2">
          <Text as="p" className="text-amber-900">
            <span className="font-bold">Service:</span>{" "}
            {paymentData.description}
          </Text>
          <Text as="p" className="text-amber-900">
            <span className="font-bold">Amount:</span> $
            {paymentStatus.amount || paymentData.amount.toFixed(2)}
          </Text>
          {paymentData.numberOfCopies && (
            <Text as="p" className="text-amber-900">
              <span className="font-bold">Number of Copies:</span>{" "}
              {paymentData.numberOfCopies}
            </Text>
          )}
          {paymentStatus.transactionNumber && (
            <Text as="p" className="text-amber-900">
              <span className="font-bold">Transaction Number:</span>{" "}
              {paymentStatus.transactionNumber}
            </Text>
          )}
        </div>
        <Text as="p" className="text-amber-700 italic">
          Your payment will settle in approximately 5 business days.
        </Text>
      </div>
    );
  }

  // Default payment form (no status yet)
  return (
    <div className="space-y-6 bg-blue-10 p-6">
      {/* Verifying State */}
      {verifying && (
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <p className="text-blue-700">Verifying payment status...</p>
        </div>
      )}

      <div className="border-gray-300 border-b-2 pb-6">
        <Heading as="h2">Complete your payment</Heading>
        <Text as="p">
          Please review and complete your payment to finalize your submission
        </Text>
      </div>
      <div>
        <Text as="p">
          <span className="font-bold">Service:</span> {paymentData.description}
        </Text>
        <Text as="p">
          <span className="font-bold">Amount:</span> $
          {Number(paymentData.amount).toFixed(2)}
        </Text>
        {paymentData.numberOfCopies && (
          <Text as="p">
            <span className="font-bold">Number of Copies:</span>{" "}
            {paymentData.numberOfCopies}
          </Text>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {paymentData.paymentUrl ? (
        verifying ? (
          <Button disabled type="button">
            Verifying...
          </Button>
        ) : (
          <LinkButton
            href={paymentData.paymentUrl}
            onClick={() => {
              trackEvent("form-payment-initiated", {
                form: getFormShortIdFromSlug(formId),
                category: getCategoryShortId(categorySlug),
              });
              op.track(
                TRACKED_EVENTS.PAYMENT_INITIATED_EVENT,
                getFormBaseContext(formId, categorySlug)
              );
            }}
            variant="primary"
          >
            Continue to payment
          </LinkButton>
        )
      ) : null}
      <Text as="p" className="text-gray-500 italic">
        You will be redirected to EZ Pay to securely complete your payment.
      </Text>
    </div>
  );
};
