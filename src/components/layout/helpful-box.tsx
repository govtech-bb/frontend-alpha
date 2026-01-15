"use client";

import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";

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
        "flex flex-col items-start gap-xs border-4 border-yellow-100 bg-yellow-40 px-s py-xm",
        className
      )}
    >
      <Heading as="h3">Was this helpful?</Heading>
      <Text as="p">Give us your feedback about this page.</Text>

      <Link
        as={NextLink}
        href="/feedback"
        onClick={handleFeedbackClick}
        variant="secondary"
      >
        <Typography variant="body">Help us improve alpha.gov.bb</Typography>
      </Link>
    </div>
  );
};
