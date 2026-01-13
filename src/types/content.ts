export type PageType = {
  title: string;
  filename?: string;
  stage?: string;
  slug: string;
  source_url?: string;
  description: string; // date when content was published, updated or migrated
  protected?: boolean;
  subPages?: {
    slug: string;
    title?: string;
    type: "markdown" | "component";
    protected?: boolean;
  }[];
};

export type InformationContent = {
  title: string;
  description?: string;
  slug: string;
  pages: PageType[];
};
