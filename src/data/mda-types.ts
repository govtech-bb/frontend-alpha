import type { ReactNode } from "react";

export interface FeaturedItem {
  title: string;
  href: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export interface MinistryService {
  title: string;
  href: string;
  description: ReactNode;
}

export type ContactItem =
  | { label: string; type: "phone"; value: string }
  | { label: string; type: "email"; value: string }
  | { label: string; type: "website"; value: string; display?: string }
  | { label: string; type?: "text"; value: ReactNode };

export interface Minister {
  name: string;
  role: string;
  photo?: string;
}

export interface AssociatedDepartmentGroup {
  category?: string;
  items: string[];
}

export interface MdaEntry {
  slug: string;
  name: string;
  shortDescription?: string;
  intro?: string;
  head?: Minister;
  contact?: ContactItem[];
  originalSource?: string;
  /** Search-only tags. Useful for abbreviations and common alternate names. */
  keywords?: string[];
}
