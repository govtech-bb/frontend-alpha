"use client";

import { Link } from "@govtech-bb/react";
import { ConfirmationTemplate } from "@govtech-bb/forms";
import NextLink from "next/link";

type ConfirmationProps = {
  yearsOfExperience: number;
};

/**
 * Confirmation
 * Final page after submission showing next steps
 */
export function Confirmation({ yearsOfExperience }: ConfirmationProps) {
  return (
    <ConfirmationTemplate
      breadcrumbHref="#"
      breadcrumbText="Government services"
      formTitle="YDP Community Sports Training Programme"
      sections={[
        {
          title: "What happens next",
          content: (
            <>
              <p className="mb-4">
                The Registration Department will process your application. You
                will need to visit in person to collect your certificate{yearsOfExperience > 1 ? "s" : ""}.
              </p>
              <p>
                Processing typically takes 5-10 business days. You will be
                contacted when your certificate{yearsOfExperience > 1 ? "s" : ""} {yearsOfExperience > 1 ? "are" : "is"} ready for
                collection.
              </p>
            </>
          ),
        },
        {
          title: "What to bring when collecting",
          level: 3,
          content: (
            <ul className="ml-6 list-disc space-y-2">
              <li>Valid photo identification (passport or ID card)</li>
              <li>Your National Registration Number</li>
              <li>
                Payment for the certificate{yearsOfExperience > 1 ? "s" : ""}
              </li>
            </ul>
          ),
        },
        {
          title: "Collection location",
          level: 3,
          content: (
            <>
              <address className="mb-4 not-italic">
                Registration Department, Records Branch
                <br />
                Supreme Court Complex
                <br />
                Whitepark Road
                <br />
                St. Michael
              </address>
              <p className="mb-4">
                Office hours: Monday to Friday, 8:00 AM - 4:00 PM
              </p>
              <p className="mb-4">
                Number of certificates requested: {yearsOfExperience}
              </p>
              <Link
                as={NextLink}
                className="inline-block text-[20px] leading-[1.7]"
                href="#"
              >
                Contact the Registration Department
              </Link>
            </>
          ),
        },
      ]}
      subtitle="Your ydpCommunitySportsTraining application has been sent to the Registration Department."
      title="Application submitted"
    />
  );
}
