"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { StageBanner } from "@/components/stage-banner";
import { cn } from "@/lib/utils";

// Without back button; py-8 lg:py-16 (padding-top: 32px; padding-bottom: 32px; @media (min-width: 1024px) { padding-top: 64px; padding-bottom: 64px; })
// With back button; pt-4 pb-8 lg:py-8 (padding-top: 16px; padding-bottom: 32px; @media (min-width: 1024px) { padding-top: 32px; padding-bottom: 32px; })

// biome-ignore lint/style/useConsistentTypeDefinitions: Do not need `type` features
interface EntryPointWrapperProps {
  children: React.ReactNode;
}

export const BANNER_PORTAL_ID = "content-banner-slot";

export function BannerPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const target = document.getElementById(BANNER_PORTAL_ID);
  if (!target) return null;

  return createPortal(children, target);
}

export function EntryPointWrapper({ children }: EntryPointWrapperProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isFormPage =
    pathSegments.includes("form") || pathSegments.includes("exit-survey");
  const isConfirmationPage =
    searchParams.get("step") === "confirmation" ||
    searchParams.get("status") === "thank-you";
  const isFeedbackPage = pathname === "/feedback";

  return (
    <main>
      <div id={BANNER_PORTAL_ID} />
      {!isFormPage && (
        <div className="container py-4 lg:py-6">
          <BackButton />
        </div>
      )}
      {isFormPage && !isConfirmationPage && (
        <div className="bg-blue-10">
          <div className="container">
            <StageBanner stage="alpha" />
          </div>
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
    </main>
  );
}
