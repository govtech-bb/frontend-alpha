"use client";

import { usePathname } from "next/navigation";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { Breadcrumbs } from "./breadcrumbs";

export function EntryPointWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.includes("form") || pathSegments.includes("exit-survey")) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="container py-4 lg:py-6">
        <Breadcrumbs />
      </div>
      <div className="container pt-4 pb-8 lg:py-8">
        {children}
        {pathname !== "/feedback" && <HelpfulBox />}
      </div>
    </>
  );
}
