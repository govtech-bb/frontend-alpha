import type { Metadata } from "next";
import { Suspense } from "react";
import { DeathCertificateForm } from "@/components/forms/death-certificate/death-certificate-form";

export const metadata: Metadata = {
  title: "Apply for a Death Certificate - GOV.BB",
  description:
    "Apply for a death certificate from the Government of Barbados. Complete this online form to begin your death certificate application.",
};

export default function DeathCertificatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeathCertificateForm />
    </Suspense>
  );
}
