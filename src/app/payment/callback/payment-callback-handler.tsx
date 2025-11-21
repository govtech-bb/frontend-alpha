"use client";

import { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";
import type { PaymentVerificationResult } from "@/lib/payment";
import { extractUuid } from "@/lib/payment/reference-encoder";

type PaymentCallbackHandlerProps = {
  paymentStatus: PaymentVerificationResult;
};

export function PaymentCallbackHandler({
  paymentStatus,
}: PaymentCallbackHandlerProps) {
  const [, setEmailSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only proceed if payment was successful
    if (paymentStatus.status !== "Success") {
      setIsProcessing(false);
      return;
    }

    // Extract UUID from encoded reference ID for sessionStorage lookup
    // The reference ID may be encoded (base64url.uuid) or plain (uuid)
    const referenceId = paymentStatus.referenceId;
    const uuid = extractUuid(referenceId);

    const storedData = sessionStorage.getItem(uuid);

    if (!storedData) {
      console.error("❌ Session data not found for UUID:", uuid);
      setError(
        "Session data not found. Your payment was successful, but we couldn't retrieve your application details. Please contact support with your transaction ID."
      );
      setIsProcessing(false);
      return;
    }

    // Parse form data
    let formData;
    try {
      formData = JSON.parse(storedData);
    } catch {
      setError("Invalid session data. Please contact support.");
      setIsProcessing(false);
      return;
    }

    // Send confirmation email via API
    const sendConfirmation = async () => {
      try {
        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionId: paymentStatus.transactionId,
            referenceId: paymentStatus.referenceId,
            formData,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send confirmation email");
        }

        // Clear sessionStorage after successful email send
        sessionStorage.removeItem(uuid);
        setEmailSent(true);
      } catch (err) {
        setError(
          "Your payment was successful, but we encountered an error sending the confirmation. Please contact support with your transaction ID."
        );
      } finally {
        setIsProcessing(false);
      }
    };

    sendConfirmation();
  }, [paymentStatus]);

  if (isProcessing) {
    return (
      <div className="rounded-md border border-blue-100 bg-blue-10 p-6">
        <Typography className="font-bold text-black" variant="h2">
          Processing your application...
        </Typography>
        <Typography className="mt-4 text-black" variant="paragraph">
          Please wait while we confirm your payment and submit your application.
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-amber-100 bg-amber-10 p-6">
        <Typography className="font-bold text-amber-dark" variant="h2">
          Payment Successful - Action Required
        </Typography>
        <Typography className="mt-4 text-amber-dark" variant="paragraph">
          {error}
        </Typography>
        <div className="mt-6 space-y-2">
          <Typography className="text-amber-dark" variant="paragraph">
            <strong>Transaction ID:</strong> {paymentStatus.transactionId}
          </Typography>
          <Typography className="text-amber-dark" variant="paragraph">
            <strong>Reference Number:</strong> {paymentStatus.referenceId}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border-4 border-teal-40 bg-teal-10 p-6">
      <Typography className="font-bold text-black" variant="h1">
        Application Submitted Successfully!
      </Typography>
      <Typography className="mt-4 text-black" variant="paragraph">
        Thank you for your payment. Your passport replacement application has
        been submitted to the Immigration Department.
      </Typography>

      <div className="mt-6 space-y-2">
        <Typography className="text-black" variant="paragraph">
          <strong>Transaction ID:</strong> {paymentStatus.transactionId}
        </Typography>
        <Typography className="text-black" variant="paragraph">
          <strong>Reference Number:</strong> {paymentStatus.referenceId}
        </Typography>
        <Typography className="text-black" variant="paragraph">
          <strong>Amount Paid:</strong> ${paymentStatus.amount} BBD
        </Typography>
        {paymentStatus.processor && (
          <Typography className="text-black" variant="paragraph">
            <strong>Payment Method:</strong> {paymentStatus.processor}
          </Typography>
        )}
      </div>

      <div className="mt-6 rounded-md border border-blue-100 bg-blue-10 p-4">
        <Typography className="font-bold text-black" variant="paragraph">
          What happens next?
        </Typography>
        <Typography className="mt-2 text-black" variant="paragraph">
          The Immigration Department has received your application and payment
          confirmation. You will receive an email with further instructions
          within 2-3 business days.
        </Typography>
      </div>

      <div className="mt-6">
        <a className="inline-block text-blue-600 underline" href="/">
          Return to Homepage
        </a>
      </div>
    </div>
  );
}
