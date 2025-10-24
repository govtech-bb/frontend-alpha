"use client";

import { Typography } from "@/components/ui/typography";
import { useStepFocus } from "../useStepFocus";

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
    "Registration request sent",
    undefined,
    undefined
  );

  const totalCost = numberOfCertificates * 5.0;

  return (
    <div className="space-y-6">
      <div className="border-teal-bright border-l-4 bg-teal-light p-6">
        <h1
          className="mb-4 font-bold text-3xl text-black"
          ref={titleRef}
          tabIndex={-1}
        >
          Registration request sent
        </h1>

        <Typography className="text-black" variant="paragraph">
          Thank you. your information has been sent to the registration
          department.
        </Typography>
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
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl">Location</h3>

        <Typography variant="paragraph">
          Registration Department
          <br />
          Supreme Court Complex
          <br />
          Whitepark Road
          <br />
          St. Michael
        </Typography>
      </div>

      {numberOfCertificates > 0 && (
        <div className="rounded-md border-2 border-gray-300 bg-gray-50 p-4">
          <Typography className="font-bold" variant="paragraph">
            The total cost for you requested certificates is BBD$
            {totalCost.toFixed(2)}. Remember to bring payment with you.
          </Typography>
        </div>
      )}

      <Typography variant="paragraph">
        You should also bring valid photo identification for the parent(s)
        attending.
      </Typography>
    </div>
  );
}
