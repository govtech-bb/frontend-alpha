"use client";

import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  className?: string;
  collapseOnMobile?: boolean;
}

function formatSlug(slug: string): string {
  const raw = slug.replace(/-/g, " ");
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function getTitleForSegment(segments: string[], index: number): string {
  const category = INFORMATION_ARCHITECTURE.find(
    (cat) => cat.slug === segments[0]
  );
  if (index === 0) return category?.title ?? formatSlug(segments[0]);

  const page = category?.pages.find((p) => p.slug === segments[1]);
  if (index === 1) return page?.title ?? formatSlug(segments[1]);

  if (index === 2) {
    const nestedPage = page?.pages?.find((p) => p.slug === segments[2]);
    if (nestedPage) return nestedPage.title;
    const subPage = page?.subPages?.find((sp) => sp.slug === segments[2]);
    return subPage?.title ?? formatSlug(segments[2]);
  }

  return formatSlug(segments[index]);
}

export const Breadcrumbs = ({
  className,
  collapseOnMobile = true,
}: BreadcrumbsProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.slice(0, -1);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-y-1",
          collapseOnMobile &&
            "[&>li:not(:first-child):not(:last-child)]:hidden [&>li:not(:first-child):not(:last-child)]:md:flex"
        )}
      >
        <li className="flex items-center">
          <Link as={NextLink} href="/">
            Home
          </Link>
        </li>
        {crumbs.map((_segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const title = getTitleForSegment(segments, index);

          return (
            <li
              className="flex items-center before:mx-[0.5em] before:inline-block before:h-[0.4375em] before:w-[0.4375em] before:shrink-0 before:rotate-45 before:border-mid-grey-00 before:border-t before:border-r before:content-['']"
              key={href}
            >
              <Link as={NextLink} className="break-anywhere" href={href}>
                {title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
