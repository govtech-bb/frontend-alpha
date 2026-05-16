"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const HIDDEN_PREFIXES = ["/chat"];

export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hide = HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p));

  if (hide) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
