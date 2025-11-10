"use client";

import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { useStepFocus } from "../../common/hooks/use-step-focus";

type ConfirmationProps = {
  numberOfCertificates: number;
};

/**
 * Step 5: Confirmation
 * Final page after submission showing next steps
 */
export function Confirmation({ numberOfCertificates }: ConfirmationProps) {
  const titleRef = useStepFocus(
    "Application submitted",
    "Death Certificate Application"
  );

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
                Family, death and bereavement
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
              Application submitted
            </h1>

            <p className="font-normal text-[20px] text-black leading-[1.7] lg:text-[32px] lg:leading-[1.5]">
              Your death certificate application has been sent to the
              Registration Department.
            </p>
          </div>
        </div>
      </div>
      {/* Main content */}

      <div className="container space-y-6 py-4 lg:grid lg:grid-cols-3 lg:space-y-8 lg:pt-8 lg:pb-16">
        <div className="col-span-2 space-y-6 lg:space-y-8">
          {/* What happens next */}
          <div className="pt-2">
            <h2 className="mb-4 font-bold text-[40px] text-black leading-[1.25]">
              What happens next
            </h2>
            <div className="font-normal text-[20px] text-black leading-[1.7]">
              <p className="mb-4">
                The Registration Department will process your application. You
                will need to visit in person to collect your certificate
                {numberOfCertificates > 1 ? "s" : ""}.
              </p>
              <p>
                Processing typically takes 5-10 business days. You will be
                contacted when your certificate
                {numberOfCertificates > 1 ? "s are" : " is"} ready for
                collection.
              </p>
            </div>
          </div>

          {/* What to bring */}
          <div className="pt-2">
            <h3 className="mb-4 font-bold text-[24px] text-black leading-[1.25]">
              What to bring when collecting
            </h3>
            <div className="font-normal text-[20px] text-black leading-[1.7]">
              <ul className="ml-6 list-disc space-y-2">
                <li>Valid photo identification (passport or ID card)</li>
                <li>Your National Registration Number</li>
                <li>
                  Payment for the certificate
                  {numberOfCertificates > 1 ? "s" : ""}
                </li>
              </ul>
            </div>
          </div>

          {/* Location */}
          <div className="mb-12 pt-2">
            <h3 className="mb-4 font-bold text-[24px] text-black leading-[1.25]">
              Collection location
            </h3>
            <address className="mb-4 font-normal text-[20px] text-black not-italic leading-[1.7]">
              Registration Department, Records Branch
              <br />
              Supreme Court Complex
              <br />
              Whitepark Road
              <br />
              St. Michael
            </address>
            <div className="font-normal text-[20px] text-black leading-[1.7]">
              <p className="mb-4">
                Office hours: Monday to Friday, 8:00 AM - 4:00 PM
              </p>
              <p>Number of certificates requested: {numberOfCertificates}</p>
            </div>
            <Link
              as={NextLink}
              className="mt-4 inline-block text-[20px] leading-[1.7]"
              href="#"
            >
              Contact the Registration Department
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
