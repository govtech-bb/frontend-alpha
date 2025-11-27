"use client";
import { Button, Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

type ConfirmationPageProps = {
  referenceNumber?: string;
  submittedTo?: string;
  onReset: () => void;
};

//TODO: This confirmation page should be dynamic based on the form schema
export function ConfirmationPage({
  submittedTo = "the Youth Development Programme",
  onReset,
}: ConfirmationPageProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const categorySlug = pathSegments[0];
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
              Thank you for registering
            </Heading>

            <p className="font-normal text-[32px] text-neutral-black leading-[1.7] lg:leading-[1.5]">
              Your information has been sent to the {submittedTo}, the
              coordinating programme in the Division of Youth Affairs
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
              What happens next?
            </Heading>
            <Text as="p">
              The Youth Commissioner will be in touch shortly to confirm:
            </Text>
            <ul className="list-disc pl-7 text-[20px] leading-[1.5]">
              <li>the location of the programme</li>
              <li>the start date and times</li>
              <li>what you will need to bring</li>
            </ul>
          </div>

          <Button onClick={onReset}>Start Over</Button>

          <HelpfulBox />
        </div>
      </div>
    </>
  );
}
