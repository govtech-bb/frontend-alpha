"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { generateBreadcrumbs } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
  mode?: "back" | "breadcrumbs";
};

export const ChevronLeftSVG = ({ className = "" }: { className: string }) => (
  <svg
    className={className}
    fill="none"
    height="8"
    viewBox="0 0 11 8"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Chevron Left</title>
    <path
      d="M6.42116 5C6.50226 5.90417 6.70318 6.82308 6.9988 8C4.80744 5.55882 3.49691e-07 4 3.49691e-07 4C3.49691e-07 4 4.31088 2.76471 7 1.27146e-07C6.70717 1.20568 6.52523 2.15831 6.43953 3L11 3L11 5L6.42116 5Z"
      fill="#0E5F64"
    />
  </svg>
);

export const BackButton = ({
  className = "",
  mode = "back",
}: BackButtonProps) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const breadcrumbs = generateBreadcrumbs(pathname);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isClient) {
    return <div className="h-6" />; // Placeholder to prevent layout shift
  }

  // Don't show on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <nav
      aria-label={mode === "breadcrumbs" ? "Breadcrumbs" : "Backbutton"}
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      {mode === "breadcrumbs" ? (
        breadcrumbs.map((crumb, index) => (
          <div className="flex items-center gap-2" key={crumb.href}>
            {index > 0 && <ChevronLeftSVG className="mr-2" />}
            <Link
              className="text-[#00654A] text-[20px] underline"
              href={crumb.href}
            >
              {crumb.label}
            </Link>
          </div>
        ))
      ) : (
        <Link
          className="flex cursor-pointer items-center text-[#00654A] text-xl underline"
          href={breadcrumbs.at(-1)?.href || "/"}
          type="button"
        >
          <ChevronLeftSVG className="mr-2" />
          Back
        </Link>
      )}
    </nav>
  );
};
