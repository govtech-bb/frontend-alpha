"use client";

import { BackButton as _BackButton } from "@govtech-bb/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const breadcrumbs = generateBreadcrumbs(pathname);

  // Don't show on home page
  if (pathname === "/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  if (pathSegments.includes("form")) {
    return null;
  }

  return (
    <nav
      aria-label={mode === "breadcrumbs" ? "Breadcrumbs" : "Backbutton"}
      className={cn("flex items-center text-sm", className)}
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
        <_BackButton href={breadcrumbs.at(-1)?.href || "/"} type="button">
          Back
        </_BackButton>
      )}
    </nav>
  );
};
