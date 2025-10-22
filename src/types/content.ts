export type PageType = {
  title: string;
  filename?: string;
  stage?: string;
  slug: string;
  source_url: string;
  description: string;
  extraction_date: string; // date when content was extracted from source_url
  last_updated_date?: string; // updated when content changes
};

export type ServiceCategoryType = {
  title: string;
  description?: string;
  slug: string;
  pages: PageType[];
};
