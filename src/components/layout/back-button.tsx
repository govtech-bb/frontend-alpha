"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
};

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  // Navigate back within the site; if there's no in-app history, go to the homepage
  // to prevent users being taken off alpha.gov.bb
  const handleBack = () => {
    const hasHistory = (window.history.state?.idx ?? 0) > 0;
    if (hasHistory) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <nav aria-label="Back" className={cn("flex items-center", className)}>
      <button
        className="inline-flex cursor-pointer items-baseline gap-xs text-teal-00 underline underline-offset-2 outline-none hover:no-underline focus-visible:bg-yellow-100 focus-visible:text-black-00 focus-visible:no-underline active:bg-yellow-100 active:text-black-00 active:no-underline"
        onClick={handleBack}
        type="button"
      >
        <ChevronLeftSVG aria-hidden="true" className="shrink-0 self-center" />
        Back
      </button>
    </nav>
  );
};
