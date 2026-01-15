"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { cn } from "@/lib/utils";

// Without back button; py-8 lg:py-16 (padding-top: 32px; padding-bottom: 32px; @media (min-width: 1024px) { padding-top: 64px; padding-bottom: 64px; })
// With back button; pt-4 pb-8 lg:py-8 (padding-top: 16px; padding-bottom: 32px; @media (min-width: 1024px) { padding-top: 32px; padding-bottom: 32px; })

// biome-ignore lint/style/useConsistentTypeDefinitions: Do not need `type` features
interface EntryPointWrapperProps {
  children: React.ReactNode;
}

export function EntryPointWrapper({ children }: EntryPointWrapperProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isFormPage =
    pathSegments.includes("form") || pathSegments.includes("exit-survey");
  const isStartPage = pathSegments[pathSegments.length - 1] === "start";
  const isConfirmationPage =
    searchParams.get("step") === "confirmation" ||
    searchParams.get("status") === "thank-you";
  const isFeedbackPage = pathname === "/feedback";
  const shouldShowBanner = (isFormPage || isStartPage) && !isConfirmationPage;

  return (
    <>
      {!isFormPage && (
        <div className="container py-4 lg:py-6">
          <BackButton />
        </div>
      )}
      {isConfirmationPage ? (
        children
      ) : (
        <div
          className={cn(
            "container",
            isFormPage && "py-8 lg:py-16",
            !isFormPage && "pt-4 pb-8 lg:py-8"
          )}
        >
          {children}
          {!(isFormPage || isFeedbackPage) && <HelpfulBox />}
        </div>
      )}
    </>
  );
}
