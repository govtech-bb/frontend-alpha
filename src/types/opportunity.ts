export type OpportunityCategory =
  | "program"
  | "initiative"
  | "workshop"
  | "volunteer"
  | "service";

export interface Opportunity {
  id: string;
  title: string;
  /**
   * Short, plain-language sentence shown directly under the title on the
   * detail page. Acts as a lede / introductory summary.
   */
  summary?: string;
  category: OpportunityCategory;
  /** IA subcategory slug under `youth-and-community` (e.g. `arts-culture`). */
  subcategory: string;
  description: string;
  tags: string[];
  eligibility?: {
    ageMin?: number;
    ageMax?: number;
    interests?: string[];
  };
  deadline?: string | null;
  startDate?: string;
  url: string;
  applyUrl?: string;
  source?: string;
  subProgrammes?: { name: string; description: string }[];
  notificationEmail?: string;
  notificationCc?: string;
}
