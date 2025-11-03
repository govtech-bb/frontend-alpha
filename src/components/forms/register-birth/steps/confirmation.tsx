"use client";

import { Typography } from "@/components/ui/typography";
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

  // First certificate is free, additional certificates are $5 each
  const totalCost =
    numberOfCertificates > 0 ? (numberOfCertificates - 1) * 5.0 : 0;

  return (
    <div className="space-y-6">
      <div className="-mx-[50vw] relative right-1/2 left-1/2 mb-6 w-screen bg-[#D4F1F4] px-4 py-6 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <h1
            className="mb-4 font-bold text-5xl leading-tight focus:outline-none"
            ref={titleRef}
            tabIndex={-1}
          >
            Pre-registration complete
          </h1>

          <Typography variant="paragraph">
            Your information has been sent to the Registration Department.
          </Typography>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-2xl">What you must do next</h2>

        <Typography variant="paragraph">
          You must now visit the Registration Department in person to sign the
          birth register. This makes the registration official.
        </Typography>

        <Typography variant="paragraph">
          You do not need an appointment.
        </Typography>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">Who must attend the appointment</h3>

        <Typography variant="paragraph">
          {hasFatherDetails
            ? "Both the mother and father of the child must attend the appointment."
            : "The mother must attend the appointment."}
        </Typography>

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

      <Typography variant="paragraph">
        The total cost for your requested certificates is{" "}
        {totalCost === 0 ? "free" : `BDD$${totalCost.toFixed(2)}`}.
        {totalCost > 0 && " Remember to bring payment with you."}
      </Typography>

      <Typography variant="paragraph">
        You should also bring valid photo identification for the parent(s)
        attending.
      </Typography>
    </div>
  );
}
