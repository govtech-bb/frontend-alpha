"use client";

import { LinkButton } from "@govtech-bb/react";
import { useOpenPanel } from "@openpanel/nextjs";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { getFormBaseContext, TRACKED_EVENTS } from "@/lib/openpanel";

type TrackedStartLinkProps = {
  href: string;
  children: ReactNode;
} & Record<string, unknown>;

export function TrackedStartLink({
  href,
  children,
  ...props
}: TrackedStartLinkProps) {
  const router = useRouter();
  const openPanel = useOpenPanel();

  const segments = href.split("/").filter(Boolean);
  const categorySlug = segments[0] ?? "";
  const formSlug = segments[1] ?? "";

  const { form, category } = getFormBaseContext(formSlug, categorySlug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    openPanel.track(TRACKED_EVENTS.FORM_START_EVENT, { form, category });

    const onClick = props?.onClick as
      | ((e: React.MouseEvent) => void)
      | undefined;
    onClick?.(e);

    router.push(href);
  };

  return (
    <LinkButton href={href} onClick={handleClick} {...props}>
      {children}
    </LinkButton>
  );
}
