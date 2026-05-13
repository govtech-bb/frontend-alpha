export interface PageType {
  title: string;
  filename?: string;
  stage?: string;
  slug: string;
  source_url?: string;
  description: string; // date when content was published, updated or migrated
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

export interface InformationContent {
  title: string;
  description?: string;
  slug: string;
  pages: PageType[];
}
