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

  const handleBack = () => {
    router.back();
  };

  return (
    <nav aria-label="Back" className={cn("flex items-center", className)}>
      <button
        className="inline-flex cursor-pointer items-baseline gap-xs text-teal-00 underline underline-offset-2"
        onClick={handleBack}
        type="button"
      >
        <ChevronLeftSVG className="shrink-0 self-center" />
        Back
      </button>
    </nav>
  );
};
