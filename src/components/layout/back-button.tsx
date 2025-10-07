"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateBreadcrumbs } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
  mode?: "back" | "breadcrumbs";
};

export const BackButton = ({
  className = "",
  mode = "back",
}: BackButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

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
  if (mode === "breadcrumbs") {
    const breadcrumbs = generateBreadcrumbs(pathname);
    return (
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center space-x-2 text-sm", className)}
      >
        {breadcrumbs.length > 1
          ? breadcrumbs.map((crumb, index) => (
              <div className="flex items-center gap-2" key={crumb.href}>
                {index > 0 && (
                  <Image
                    alt="arrow"
                    height="8"
                    src="/images/chevron-left.svg"
                    width="11"
                  />
                )}
                <Link
                  className="text-[#00654A] text-[20px] underline"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              </div>
            ))
          : null}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Backbutton"
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <Image alt="arrow" height="8" src="/images/chevron-left.svg" width="11" />
      <button
        className="text-[#00654A] text-xl underline"
        onClick={() => router.back()}
        type="button"
      >
        Back
      </button>
    </nav>
  );
};
