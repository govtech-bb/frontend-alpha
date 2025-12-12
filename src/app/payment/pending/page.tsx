import { Suspense } from "react";
import { PaymentPendingContent } from "@/components/payment/pending/payment-pending-content";

export default function PaymentPendingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPendingContent />
    </Suspense>
  );
}
