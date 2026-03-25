"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
  className?: string;
};

const BreadcrumbSeparator = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="6"
    viewBox="0 0 6 6"
    width="6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Separator</title>
    <path
      d="M0 0C0 0 1 1 3 1C5 1 6 0 6 0C6 0 5 1 5 3C5 5 6 6 6 6C6 6 5 5 3 5C1 5 0 6 0 6C0 6 1 5 1 3C1 1 0 0 0 0Z"
      fill="currentColor"
    />
  </svg>
);

const linkStyles =
  "text-teal-00 underline underline-offset-2 outline-none hover:no-underline focus-visible:bg-yellow-100 focus-visible:text-black-00 focus-visible:no-underline active:bg-yellow-100 active:text-black-00 active:no-underline";

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

  const subPage = page?.subPages?.find((sp) => sp.slug === segments[2]);
  if (index === 2) return subPage?.title ?? formatSlug(segments[2]);

  return formatSlug(segments[index]);
}

export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Don't show on home page
  if (segments.length === 0) return null;

  const crumbs = segments.slice(0, -1);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link
            className={cn(linkStyles, "inline-flex items-baseline gap-xs")}
            href="/"
          >
            <ChevronLeftSVG
              aria-hidden="true"
              className="shrink-0 self-center"
            />
            Home
          </Link>
        </li>
        {crumbs.map((_segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const title = getTitleForSegment(segments, index);

          return (
            <li className="flex items-center gap-2" key={href}>
              <BreadcrumbSeparator />
              <Link className={cn(linkStyles, "break-anywhere")} href={href}>
                {title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
