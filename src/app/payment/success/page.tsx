import { Suspense } from "react";
import { PaymentSuccessContent } from "@/components/payment/success/payment-success-content";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
