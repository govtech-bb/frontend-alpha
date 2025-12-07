"use client";

import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type HelpfulBoxProps = {
  className?: string;
};

export const HelpfulBox = ({ className = "" }: HelpfulBoxProps) => {
  const pathname = usePathname();

  const handleFeedbackClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("feedbackReferrer", pathname);
    }
  };

  return (
    <div
      className={cn(
        "mt-3 space-y-2 border-4 border-yellow-100 bg-yellow-40 px-4 py-6 lg:gap-2 lg:space-y-0 lg:p-6",
        className
      )}
    >
      <Typography className="mb-4" variant="h3">
        Was this helpful?
      </Typography>
      <Typography className="mb-4" variant="paragraph">
        Give us your feedback about this page.
      </Typography>
      <Link
        as={NextLink}
        href="/feedback"
        onClick={handleFeedbackClick}
        variant="secondary"
      >
        Help us improve alpha.gov.bb
      </Link>
    </div>
  );
};
