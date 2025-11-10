"use client";

import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
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

  // Each certificate costs $5 BBD
  const totalCost = numberOfCertificates * 5.0;

  return (
    <>
      {/* Header section with breadcrumb and title */}
      <div className="bg-green-40">
        <div className="container pt-4 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center">
            <div className="flex items-center gap-x-2">
              <ChevronLeftSVG className="shrink-0" />

              <Link
                as={NextLink}
                className="text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                href="#"
                variant={"secondary"}
              >
                Family, birth and relationships
              </Link>
            </div>
          </div>

          {/* Title section */}
          <div className="flex flex-col gap-4 pt-6 lg:pt-16">
            <h1
              className="pt-2 font-bold text-[56px] text-black leading-[1.15] focus:outline-none"
              ref={titleRef}
              tabIndex={-1}
            >
              Pre-registration complete
            </h1>

            <p className="font-normal text-[20px] text-black leading-[1.7] lg:text-[32px] lg:leading-[1.5]">
              Your information has been sent to the Registration Department.
            </p>
          </div>
        </div>
      </div>
      {/* Main content */}

      <div className="container space-y-6 py-4 lg:grid lg:grid-cols-3 lg:space-y-8 lg:pt-8 lg:pb-16">
        <div className="col-span-2 space-y-6 lg:space-y-8">
          {/* What you must do next */}
          <div className="pt-2">
            <h2 className="mb-4 font-bold text-[40px] text-black leading-[1.25]">
              What you must do next
            </h2>
            <div className="font-normal text-[20px] text-black leading-[1.7]">
              <p className="mb-4">
                You must now visit the Registration Department in person to sign
                the birth register. This makes the registration official.
              </p>
              <p>You do not need an appointment.</p>
            </div>
          </div>

          {/* Who must attend */}
          <div className="pt-2">
            <h3 className="mb-4 font-bold text-[24px] text-black leading-[1.25]">
              Who must attend the appointment
            </h3>
            <p className="font-normal text-[20px] text-black leading-[1.7]">
              {hasFatherDetails
                ? "Both the mother and father of the child must attend the appointment."
                : "The mother must attend the appointment."}
            </p>
            <Link
              as={NextLink}
              className="mt-4 inline-block text-[20px] leading-[1.7]"
              href="#"
            >
              See what you need to bring with you
            </Link>
          </div>

          {/* Location */}
          <div className="mb-12 pt-2">
            <h3 className="mb-4 font-bold text-[24px] text-black leading-[1.25]">
              Location
            </h3>
            <address className="mb-4 font-normal text-[20px] text-black not-italic leading-[1.7]">
              Registration Department
              <br />
              Supreme Court Complex
              <br />
              Whitepark Road
              <br />
              St. Michael
            </address>
            <div className="font-normal text-[20px] text-black leading-[1.7]">
              <p className="mb-4">
                The total cost for your requested certificates is{" "}
                {totalCost === 0 ? "free" : `BBD $${totalCost.toFixed(2)}`}.
                {totalCost > 0 && " Remember to bring payment with you."}
              </p>
              <p>
                You should also bring valid photo identification for the
                parent(s) attending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
