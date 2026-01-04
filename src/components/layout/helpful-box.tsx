"use client";

import { Button, Heading, Text } from "@govtech-bb/react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type HelpfulBoxProps = {
  className?: string;
};

export const HelpfulBox = ({ className = "" }: HelpfulBoxProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleFeedbackClick = () => {
    sessionStorage.setItem("feedbackReferrer", pathname);
    router.push("/feedback");
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

      {/* TODO: Design System: Make button link variant curosr pointer */}
      <Button
        className="cursor-pointer text-black-00"
        onClick={handleFeedbackClick}
        variant={"link"}
      >
        Help us improve alpha.gov.bb
      </Button>
    </div>
  );
};
