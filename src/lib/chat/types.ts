export type SourceOrigin = "alpha" | "legacy";

export interface Source {
  id: string;
  url: string;
  title: string;
  section?: string;
  score: number;
  excerpt?: string;
  source?: SourceOrigin;
  serviceSlug?: string;
}

export interface RetrievedContext {
  title: string;
  section?: string;
  text: string;
  source?: SourceOrigin;
}

export interface RetrieveResponse {
  contexts: RetrievedContext[];
  sources: Source[];
}
