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
}

export interface InformationContent {
  title: string;
  description?: string;
  slug: string;
  pages: PageType[];
}
