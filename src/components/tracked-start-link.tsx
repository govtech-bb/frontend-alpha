"use client";

import { LinkButton } from "@govtech-bb/react";
import type { ReactNode } from "react";
import {
  getCategoryShortId,
  getFormShortIdFromSlug,
  trackEvent,
} from "@/lib/analytics";

type TrackedStartLinkProps = {
  href: string;
  children: ReactNode;
};

/**
 * Client component wrapper for "Start now" links on /start pages.
 * Fires a `form-start` event on click — the moment the user
 * commits to beginning the form.
 */
export function TrackedStartLink({
  href,
  children,
  ...props
}: TrackedStartLinkProps) {
  const segments = href.split("/").filter(Boolean);
  const categorySlug = segments[0] ?? "";
  const formSlug = segments[1] ?? "";

  return (
    <LinkButton
      href={href}
      onClick={() => {
        trackEvent("form-start", {
          form: getFormShortIdFromSlug(formSlug),
          category: getCategoryShortId(categorySlug),
          pageUrl: href,
        });
      }}
      {...props}
    >
      {children}
    </LinkButton>
  );
}
