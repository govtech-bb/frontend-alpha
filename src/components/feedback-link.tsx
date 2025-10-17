"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type FeedbackLinkProps = {
  children: ReactNode;
  className?: string;
};

export function FeedbackLink({ children, className }: FeedbackLinkProps) {
  const pathname = usePathname();

  const handleClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("feedbackReferrer", pathname);
    }
  };

  return (
    <Link
      className={
        className ??
        "text-xl leading-[150%] underline underline-offset-2 lg:text-[1.5rem] lg:leading-[170%]"
      }
      href="/feedback"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
