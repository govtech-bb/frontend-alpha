import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import type { InformationContent } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findSubPageTitleFromPath(
  data: InformationContent[],
  path: string
): string | undefined {
  const segments = path.replace(/^\/|\/$/g, "").split("/");
  const [sectionSlug, pageSlug, subPageSlug] = segments;

  const section = data.find((s) => s.slug === sectionSlug);
  const page = section?.pages.find((p) => p.slug === pageSlug);
  const subPage = page?.subPages?.find((sp) => sp.slug === subPageSlug);

  return subPage?.title ?? page?.title;
}

export const findCategoryByPageSlug = (
  slug: string
): InformationContent | undefined =>
  INFORMATION_ARCHITECTURE.find((category) =>
    category.pages.some((page) => page.slug === slug)
  );
