"use client";
import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { PaymentBlock } from "@/components/payment-block";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import type { FormStep } from "@/types";

type ConfirmationPageProps = {
  confirmationStep: FormStep;
  referenceNumber?: string;
  onReset: () => void;
  customerEmail?: string;
  customerName?: string;
};

export function ConfirmationPage({
  confirmationStep,
  customerEmail,
  customerName,
  referenceNumber: _referenceNumber,
  onReset: _onReset,
}: ConfirmationPageProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const categorySlug = pathSegments[0];
  const formSlug = pathSegments[1]; // Extract form slug from URL (e.g., "get-birth-certificate")
  const category = INFORMATION_ARCHITECTURE.find(
    (cat) => cat.slug === categorySlug
  );

  return (
    <>
      {/* Header section with breadcrumb and title */}
      <div className="bg-green-40">
        <div className="container pt-4 pb-8 lg:pt-0">
          {/* Breadcrumb */}
          {category ? (
            <div className="container lg:py-4">
              <div className="flex items-center">
                <div className="flex items-center gap-x-2">
                  <ChevronLeftSVG className="shrink-0" />

                  <Link
                    as={NextLink}
                    className="text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                    href={`/${categorySlug}`}
                    variant={"secondary"}
                  >
                    {category.title}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}

          {/* Title section */}
          <div className="flex flex-col gap-4 pt-6 lg:pt-16">
            <Heading className="focus:outline-none" size="h1" tabIndex={-1}>
              {confirmationStep.title}
            </Heading>

            {confirmationStep.description && (
              <p className="font-normal text-[32px] text-neutral-black leading-[1.7] lg:leading-normal">
                {confirmationStep.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}

      <div className="container space-y-6 py-4 lg:grid lg:grid-cols-3 lg:space-y-8 lg:py-8">
        <div className="col-span-2 space-y-6 lg:space-y-8">
          {/* Payment content */}
          {confirmationStep.payment && formSlug ? (
            <PaymentBlock
              customerEmail={customerEmail}
              customerName={customerName}
              details={confirmationStep.payment}
              formId={formSlug}
            />
          ) : null}
          {/* Dynamic steps content */}
          {confirmationStep.steps?.map((step, index) => (
            <div key={index}>
              <Heading as="h2" className="pb-4 lg:pb-2">
                {step.title}
              </Heading>
              <Text as="p">{step.content}</Text>
              {step.items && step.items.length > 0 && (
                <ul className="list-disc pl-7 text-[20px] leading-normal">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Contact details */}
          {confirmationStep.contactDetails && (
            <div>
              <Text as="p" className="mb-4">
                If you need help with your application, contact:
              </Text>
              <Heading as="h2" className="pb-2">
                {confirmationStep.contactDetails.title}
              </Heading>
              <div className="space-y-1 text-[20px] leading-normal">
                <p>{confirmationStep.contactDetails.address.line1}</p>
                {confirmationStep.contactDetails.address.line2 && (
                  <p>{confirmationStep.contactDetails.address.line2}</p>
                )}
                <p>{confirmationStep.contactDetails.address.city}</p>
                {confirmationStep.contactDetails.address.country && (
                  <p>{confirmationStep.contactDetails.address.country}</p>
                )}
                <p>
                  <span className="font-bold">Telephone:</span>{" "}
                  {confirmationStep.contactDetails.telephoneNumber}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {confirmationStep.contactDetails.email}
                </p>
              </div>
            </div>
          )}

          <HelpfulBox />
        </div>
      </div>
    </>
  );
}
