"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { generateBreadcrumbs } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";
import { ChevronLeftSVG } from "../icons/chevron-left";

type BackButtonProps = {
  className?: string;
  mode?: "back" | "breadcrumbs";
};

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
      className={cn(
        "flex items-center space-x-2 py-4 text-sm lg:py-6",
        className
      )}
    >
      {mode === "breadcrumbs" ? (
        breadcrumbs.map((crumb, index) => (
          <div className="flex items-center gap-2" key={crumb.href}>
            {index > 0 && <ChevronLeftSVG className="mr-2" />}
            <Link
              className="text-[20px] text-teal-dark underline"
              href={crumb.href}
            >
              {crumb.label}
            </Link>
          </div>
        ))
      ) : (
        <Link
          className="flex cursor-pointer items-center text-teal-dark text-xl leading-[150%] underline"
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
