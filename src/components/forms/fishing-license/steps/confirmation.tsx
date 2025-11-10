"use client";

import Link from "next/link";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import type { PartialFishingLicenseFormData } from "../types";

type ConfirmationProps = {
  formData: PartialFishingLicenseFormData;
};

/**
 * Step 5: Confirmation
 *
 * Final success page shown after successful form submission.
 * Provides confirmation details and next steps information.
 */
export function Confirmation({ formData }: ConfirmationProps) {
  const titleRef = useStepFocus("Application complete", "Fishing License");

  // Generate a mock reference number (in real app, this would come from API)
  const referenceNumber = `FL-${Date.now().toString(36).toUpperCase()}`;

  const licenseTypeLabel =
    formData.licenseType === "river" ? "River fishing" : "Sea fishing";

  return (
    <div className="container py-8">
      <div className="max-w-2xl">
        <div className="mb-8 bg-teal-dark p-6">
          <h1
            className="font-bold text-[48px] text-white leading-[1.15]"
            ref={titleRef}
            tabIndex={-1}
          >
            Application complete
          </h1>
        </div>

        <div className="mb-8 border-teal-dark border-l-4 bg-teal-light p-4">
          <p className="mb-2 font-bold text-[19px]">Your reference number</p>
          <p className="font-bold font-mono text-[32px]">{referenceNumber}</p>
        </div>

        <p className="mb-6 text-[20px] leading-[1.7]">
          We've sent a confirmation email to{" "}
          <span className="font-bold">{formData.email}</span>.
        </p>

        <div className="mb-8 rounded-md bg-gray-100 p-6">
          <h2 className="mb-4 font-bold text-[24px]">What happens next</h2>
          <ul className="list-disc space-y-2 pl-6 text-[19px]">
            <li>
              We'll process your {licenseTypeLabel.toLowerCase()} license
              application within 5 working days
            </li>
            <li>
              You'll receive an email notification once your license is approved
            </li>
            <li>
              Your digital license will be available to download from your email
            </li>
            <li>
              A physical license card will be mailed to your registered address
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 font-bold text-[24px]">
            Before you start fishing
          </h2>
          <p className="mb-4 text-[19px] leading-[1.7]">
            Please note that you must wait until you receive your approved
            license before you can legally fish. Fishing without a valid license
            may result in fines or penalties.
          </p>
          <p className="text-[19px] leading-[1.7]">
            For urgent inquiries about your application, please contact the
            Fisheries Division at{" "}
            <a className="text-teal-dark underline" href="tel:+12464260191">
              +1 (246) 426-0191
            </a>{" "}
            or email{" "}
            <a
              className="text-teal-dark underline"
              href="mailto:fisheries@gov.bb"
            >
              fisheries@gov.bb
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            className="inline-block bg-teal-dark px-6 py-3 text-center font-bold text-white hover:bg-teal-darker"
            href="/"
          >
            Go to homepage
          </Link>
          <button
            className="inline-block border-2 border-teal-dark bg-white px-6 py-3 text-center font-bold text-teal-dark hover:bg-gray-50"
            onClick={() => window.print()}
            type="button"
          >
            Print this page
          </button>
        </div>
      </div>
    </div>
  );
}
