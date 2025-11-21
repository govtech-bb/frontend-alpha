import { redirect } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import { logError } from "@/lib/logger";
import { getPaymentProvider } from "@/lib/payment";
import { decodeReferenceId, getBaseUrl } from "@/lib/payment/reference-encoder";
import { PaymentCallbackHandler } from "./payment-callback-handler";

/**
 * Payment Callback Page
 * User is redirected here after completing payment on EZPay
 * URL params: tx (transaction ID), rid (reference ID)
 *
 * Multi-Environment Support:
 * The reference ID contains an encoded return URL. If the callback arrives
 * at a different environment (e.g., staging when it should go to localhost),
 * we redirect to the correct environment automatically.
 */
export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ tx?: string; rid?: string }>;
}) {
  const params = await searchParams;
  const { tx: transactionId, rid: referenceId } = params;

  // Validate URL parameters
  if (!(transactionId && referenceId)) {
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <div className="rounded-md border border-red-100 bg-red-10 p-6">
          <Typography className="font-bold text-red-dark" variant="h2">
            Invalid Payment Callback
          </Typography>
          <Typography className="text-red-dark" variant="paragraph">
            Missing transaction information. Please contact support if you
            completed a payment.
          </Typography>
        </div>
      </div>
    );
  }

  // Decode reference ID to check if we need to redirect to a different environment
  const decoded = decodeReferenceId(referenceId);
  if (decoded) {
    const currentBaseUrl = getBaseUrl();
    const targetBaseUrl = decoded.returnUrl;

    // If callback arrived at wrong environment, redirect to correct one
    if (currentBaseUrl !== targetBaseUrl) {
      const targetUrl = `${targetBaseUrl}/payment/callback?tx=${encodeURIComponent(transactionId)}&rid=${encodeURIComponent(referenceId)}`;
      redirect(targetUrl);
    }
  }

  try {
    // Verify payment using provider abstraction
    const provider = getPaymentProvider();
    const paymentStatus = await provider.verifyPayment({
      transactionId,
      referenceId,
    });

    // Check if payment was successful
    if (paymentStatus.status !== "Success") {
      return (
        <div className="container mx-auto max-w-2xl py-8">
          <div className="rounded-md border border-amber-100 bg-amber-10 p-6">
            <Typography className="font-bold text-amber-dark" variant="h2">
              Payment {paymentStatus.status}
            </Typography>
            <Typography className="text-amber-dark" variant="paragraph">
              Your payment status is: {paymentStatus.status}
            </Typography>
            {paymentStatus.status === "Initiated" && (
              <Typography className="mt-4 text-amber-dark" variant="paragraph">
                If you selected Direct Debit, your payment may take up to 5
                business days to process. You will receive an email confirmation
                once the payment is completed.
              </Typography>
            )}
            {paymentStatus.status === "Failed" && (
              <div className="mt-4">
                <Typography className="text-amber-dark" variant="paragraph">
                  Your payment was not successful. You can try again using a
                  different payment method.
                </Typography>
                <a
                  className="mt-4 inline-block text-blue-600 underline"
                  href="/replace-a-passport/start"
                >
                  Return to Application
                </a>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Payment successful - use client component to handle sessionStorage and email
    return (
      <div className="container mx-auto max-w-2xl py-8">
        <PaymentCallbackHandler paymentStatus={paymentStatus} />
      </div>
    );
  } catch (error) {
    // Log error without exposing PII in production
    logError("Error verifying payment", error);

    return (
      <div className="container mx-auto max-w-2xl py-8">
        <div className="rounded-md border border-red-100 bg-red-10 p-6">
          <Typography className="font-bold text-red-dark" variant="h2">
            Payment Verification Error
          </Typography>
          <Typography className="mt-4 text-red-dark" variant="paragraph">
            We encountered an error verifying your payment. Please contact
            support with your transaction ID: {transactionId}
          </Typography>
        </div>
      </div>
    );
  }
}
