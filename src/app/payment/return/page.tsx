import { Suspense } from "react";
import { PaymentReturnContent } from "@/components/payment/return/payment-return-content";

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentReturnContent />
    </Suspense>
  );
}
