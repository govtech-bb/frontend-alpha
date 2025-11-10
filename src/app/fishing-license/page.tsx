import type { Metadata } from "next";
import { Suspense } from "react";
import { FishingLicenseForm } from "@/components/forms/fishing-license/fishing-license-form";

export const metadata: Metadata = {
  title: "Apply for Fishing License - GOV.BB",
  description:
    "Apply for a river or sea fishing license with the Government of Barbados. Complete your application online in minutes.",
};

/**
 * Fishing License Application Page
 *
 * Public route for applying for fishing licenses.
 * Supports both river and sea fishing license applications
 * with a multi-step form flow.
 */
export default function FishingLicensePage() {
  return (
    <Suspense
      fallback={
        <div className="py-8">
          <div className="container mx-auto max-w-2xl animate-pulse">
            <div className="mb-6 h-12 w-3/4 rounded bg-gray-200" />
            <div className="mb-4 h-32 w-full rounded bg-gray-200" />
            <div className="mb-4 h-12 w-full rounded bg-gray-200" />
            <div className="h-12 w-1/3 rounded bg-gray-200" />
          </div>
        </div>
      }
    >
      <FishingLicenseForm />
    </Suspense>
  );
}
