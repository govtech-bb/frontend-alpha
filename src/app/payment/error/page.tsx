import { Suspense } from "react";
import { PaymentErrorContent } from "@/components/payment/error/payment-error-content";

export default function PaymentErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentErrorContent />
    </Suspense>
  );
}
