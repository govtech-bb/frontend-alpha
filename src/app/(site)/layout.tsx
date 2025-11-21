"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";

// Without back button; py-8 lg:py-16 (padding-top: 32px; padding-bottom: 32px; @media (min-width: 1024px) { padding-top: 64px; padding-bottom: 64px; })
// With back button; pt-4 pb-8 lg:py-8 (padding-top: 16px; padding-bottom: 32px; @media (min-width: 1024px) { padding-top: 32px; padding-bottom: 32px; })

export default function EntryPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isFormPage = pathSegments.includes("form");
  const isConfirmationPage = searchParams.get("step") === "check-answers";

  return (
    <>
      {!isFormPage && (
        <div className="container">
          <BackButton />
        </div>
      )}
      {isConfirmationPage ? (
        <div className="pb-8 lg:pb-8">
          {children}
          <div className="container">
            <HelpfulBox />
          </div>
        </div>
      ) : (
        <div
          className={
            isFormPage
              ? "container py-8 lg:py-16"
              : "container pt-4 pb-8 lg:py-8"
          }
        >
          {children}
          {!isFormPage && <HelpfulBox />}
        </div>
      )}
    </>
  );
}
