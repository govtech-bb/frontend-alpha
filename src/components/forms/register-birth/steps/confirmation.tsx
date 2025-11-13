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
export function Confirmation(_props: ConfirmationProps) {
  const titleRef = useStepFocus(
    "We have received your registration details",
    "Register a Birth"
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
              We have received your registration details
            </h1>

            <p className="font-normal text-[20px] text-black leading-[1.7] lg:text-[32px] lg:leading-[1.5]">
              Confirmation has been sent to the email address you provided,
              along with the information on this page.
            </p>
          </div>
        </div>
      </div>
      {/* Main content */}

      <div className="container space-y-6 py-4 lg:grid lg:grid-cols-3 lg:space-y-8 lg:pt-8 lg:pb-16">
        <div className="col-span-2 space-y-6 lg:space-y-8">
          {/* What to do next */}
          <div className="pt-2">
            <h2 className="mb-4 font-bold text-[40px] text-black leading-[1.25]">
              What to do next
            </h2>
            <div className="space-y-4 font-normal text-[20px] text-black leading-[1.7]">
              <p>
                To finish registering the birth, you must go to the Registration
                Department in the district where the child was born to sign the
                birth register.
              </p>
              <p>
                The Registrations team will let you know when you can collect
                the child's birth certificate if you have ordered any.
              </p>
              <p className="font-bold">Find out about:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>where you need to go to complete the registration</li>
                <li>late registration fees</li>
              </ul>
            </div>
          </div>

          {/* Who should go to complete the registration */}
          <div className="pt-2">
            <h2 className="mb-4 font-bold text-[40px] text-black leading-[1.25]">
              Who should go to complete the registration
            </h2>
            <div className="space-y-4 font-normal text-[20px] text-black leading-[1.7]">
              <p>If you are:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  married to each other, the father must register and the mother
                  can attend
                </li>
                <li>
                  not married to each other, the mother must register the birth
                  but it is not necessary for the father to attend
                </li>
                <li>
                  not married to each other but the father wants to be named on
                  the birth record, both parents must register the birth
                  together
                </li>
              </ul>
              <p>You do not need to take the baby.</p>
            </div>
          </div>

          {/* What to bring */}
          <div className="pt-2">
            <h2 className="mb-4 font-bold text-[40px] text-black leading-[1.25]">
              What to bring
            </h2>
            <div className="space-y-4 font-normal text-[20px] text-black leading-[1.7]">
              <p>You need to show:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Your child's medical book from the hospital or birthing centre
                  (sometimes called the green book or immunisation book).
                </li>
                <li>
                  A valid form of photo identification for each parent who will
                  be named on the birth record.
                </li>
                <li>
                  Your Barbados National ID card, valid passport or other
                  government-issued ID if you are a Barbadian citizen.
                  Non-Barbadian nationals must show their valid passport.
                </li>
                <li>
                  Your original marriage certificate if you are married to the
                  child's other parent.
                </li>
              </ul>

              <h3 className="mb-4 pt-4 font-bold text-[24px] text-black leading-[1.25]">
                Parents who are minors
              </h3>
              <p>
                If you are a mother or a father and you are under 16 years old,
                you are considered a minor. You must be accompanied by your
                parent(s) or guardian(s).
              </p>

              <p className="font-bold">
                If you have a valid passport, you must bring:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>your valid passport</li>
                <li>your original birth certificate</li>
                <li>the child's medical book (green book)</li>
              </ul>

              <p className="font-bold">
                If you do not have a valid passport, you must bring:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>your minor's identification card</li>
                <li>your original birth certificate</li>
                <li>the child's medical book (green book)</li>
                <li>
                  an identification letter signed by a Justice of the Peace
                </li>
              </ul>
            </div>
          </div>

          {/* If you need support */}
          <div className="pt-2">
            <h2 className="mb-4 font-bold text-[40px] text-black leading-[1.25]">
              If you need support
            </h2>
            <div className="space-y-4 font-normal text-[20px] text-black leading-[1.7]">
              <p>
                If you need help registering a birth, for example, you are
                unable to sign the register in person, contact the Registration
                Department in Bridgetown as soon as possible after the child is
                born.
              </p>
              <div className="pt-4">
                <p className="font-bold">Registration Department</p>
                <address className="not-italic">
                  Supreme Court Complex
                  <br />
                  Whitepark Road
                  <br />
                  St. Michael
                  <br />
                  (246) 535-9700
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
