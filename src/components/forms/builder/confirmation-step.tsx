"use client";
import { Button, Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";

type ConfirmationPageProps = {
  referenceNumber?: string;
  submittedTo?: string;
  onReset: () => void;
};

export function ConfirmationPage({
  submittedTo = "the Registration Department",
  onReset,
}: ConfirmationPageProps) {
  return (
    <>
      {/* Header section with breadcrumb and title */}
      <div className="bg-green-40">
        <div className="container pt-4 pb-8 lg:pt-0">
          {/* Breadcrumb */}
          <div className="container lg:py-4">
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
          </div>

          {/* Title section */}
          <div className="flex flex-col gap-4 pt-6 lg:pt-16">
            <Heading className="focus:outline-none" size="h1" tabIndex={-1}>
              Application submitted
            </Heading>
            {/* <h1 className="pt-2 font-bold text-[56px] text-black leading-[1.15]">
              Application submitted
            </h1> */}

            <p className="font-normal text-[32px] text-neutral-black leading-[1.7] lg:leading-[1.5]">
              Your information has been sent to {submittedTo}.
            </p>
          </div>
        </div>
      </div>
      {/* Main content */}

      <div className="container space-y-6 py-4 lg:grid lg:grid-cols-3 lg:space-y-8 lg:py-8">
        <div className="col-span-2 space-y-6 lg:space-y-8">
          {/* What to do next */}

          <div>
            <Heading as="h2" className="pb-4 lg:pb-2">
              Sub heading
            </Heading>
            <Text as="p">Content</Text>
          </div>
          <div>
            <Heading as="h3" className="pb-4 lg:pb-2">
              Sub heading
            </Heading>
            <Text as="p">Content</Text>
          </div>

          <Button onClick={onReset}>Start Over</Button>

          <HelpfulBox />
        </div>
      </div>
    </>
  );
}
