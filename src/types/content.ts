export type PageType = {
  title: string;
  filename?: string;
  stage?: string;
  slug: string;
  source_url?: string;
  description: string; // date when content was published, updated or migrated
};

export type ServiceCategoryType = {
  title: string;
  description?: string;
  slug: string;
  pages: PageType[];
};
