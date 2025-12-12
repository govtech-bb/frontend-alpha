"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Client component that displays payment error alerts
 * and logs errors to console
 */
export function PaymentErrorAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const hasPaymentError = searchParams.get("payment_error");
    const errorMessage = searchParams.get("error_message");

    if (hasPaymentError && errorMessage) {
      // Log error to console
      console.error("Payment Error:", {
        message: errorMessage,
        timestamp: new Date().toISOString(),
      });

      // Show browser alert
      // biome-ignore lint/suspicious/noAlert: User requested alert for payment errors
      alert(`Payment Error: ${errorMessage}`);

      // Clear error params from URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("payment_error");
      newUrl.searchParams.delete("error_message");
      router.replace(newUrl.pathname + newUrl.search);
    }
  }, [searchParams, router]);

  return null;
}
