"use client";

import { useStepFocus } from "../../common/hooks/use-step-focus";

type ConfirmationProps = {
  numberOfCertificates: number;
  hasFatherDetails: boolean;
};

/**
 * Step: Confirmation
 * Final page after submission showing next steps
 * Based on PDF page 11
 */
export function Confirmation({
  numberOfCertificates,
  hasFatherDetails,
}: ConfirmationProps) {
  const titleRef = useStepFocus(
    "Pre-registration complete",
    "Register a Birth"
  );

  const totalCost = numberOfCertificates * 5.0;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="mb-4 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
          Pre-registration complete
        </h1>

        <p className="text-base">
          Your information has been sent to the Registration Department.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-2xl">What you must do next</h2>

        <p className="text-base">
          You must now visit the Registration Department in person to sign the
          birth register. This makes the registration official.
        </p>

        <p className="text-base">You do not need an appointment.</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">Who must attend the appointment</h3>

        <p className="text-base">
          {hasFatherDetails
            ? "Both the mother and father of the child must attend the appointment."
            : "The mother must attend the appointment."}
        </p>

        <button
          className="text-[#1E787D] underline hover:text-[#1E787D]/80"
          type="button"
        >
          See what you need to bring with you
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">Location</h3>

        <p className="text-base">
          Registration Department
          <br />
          Supreme Court Complex
          <br />
          Whitepark Road
          <br />
          St. Michael
        </p>
      </div>

      <p className="text-base">
        The total cost for your requested certificates is BDD$
        {totalCost.toFixed(2)}. Remember to bring payment with you.
      </p>

      <p className="text-base">
        You should also bring valid photo identification for the parent(s)
        attending.
      </p>
    </div>
  );
}
