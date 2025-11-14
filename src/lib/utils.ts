import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import type { ServiceCategoryType } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findCategoryByPageSlug = (
  slug: string
): ServiceCategoryType | undefined =>
  SERVICE_CATEGORIES.find((category) =>
    category.pages.some((page) => page.slug === slug)
  );
