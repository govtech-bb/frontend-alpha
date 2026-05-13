export interface PageType {
  title: string;
  filename?: string;
  stage?: string;
  slug: string;
  source_url?: string;
  description: string; // date when content was published, updated or migrated
  type?: "markdown" | "component";
  /**
   * Optional absolute path override. When set, this is used as the link
   * destination in the category index and search results instead of the
   * default `/{category.slug}/{page.slug}`. Use this for pages that live
   * outside the catch-all (e.g. dedicated app router routes).
   */
  href?: string;
  subPages?: {
    slug: string;
    title?: string;
    type: "markdown" | "component";
  }[];
  /**
   * Nested child pages, used to express a subcategory whose children are
   * individual services / opportunities. Rendered as a second-level index
   * when the user lands on the parent URL.
   */
  pages?: PageType[];
}

export type CrossLink = {
  title: string;
  href: string;
};

export type InformationContent = {
  title: string;
  description?: string;
  slug: string;
  pages: PageType[];
  crossLinks?: CrossLink[];
};
