"use client";
import { Button, Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { useFormStore } from "@/store/form-store";

type ConfirmationPageProps = {
  referenceNumber?: string;
  submittedTo?: string;
};

export function ConfirmationPage({
  submittedTo = "the Registration Department",
}: ConfirmationPageProps) {
  const router = useRouter();
  const resetForm = useFormStore((state) => state.resetForm);

  const handleStartOver = () => {
    // Reset the Zustand store
    resetForm();

    // Navigate back to the form (removing query params forces a fresh start)
    router.push(window.location.pathname);
  };
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
              tabIndex={-1}
            >
              Application submitted
            </h1>

            <p className="font-normal text-[20px] text-black leading-[1.7] lg:text-[32px] lg:leading-[1.5]">
              Your information has been sent to {submittedTo}.
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
              Header
            </h2>
            <div className="space-y-4 font-normal text-[20px] text-black leading-[1.7]">
              <p>Content</p>
              <p>Content</p>
            </div>
          </div>
          <Button onClick={handleStartOver}>Start Over</Button>
        </div>
      </div>
    </>
  );
}
