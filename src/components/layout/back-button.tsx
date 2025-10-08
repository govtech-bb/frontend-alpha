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

  const breadcrumbs = generateBreadcrumbs(pathname);

  const handleBack = () => {
    const parentPage = breadcrumbs.at(-1);
    router.push(parentPage?.href ?? "/");
  };

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
      ) : (
        <button
          className="flex cursor-pointer items-center text-[#00654A] text-xl underline"
          onClick={handleBack}
          type="button"
        >
          <Image
            alt="arrow"
            className="mr-2"
            height="8"
            src="/images/chevron-left.svg"
            width="11"
          />
          Back
        </button>
      )}
    </nav>
  );
};
