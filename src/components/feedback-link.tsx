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
      className={className || "text-xl underline underline-offset-2"}
      href="/feedback"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
