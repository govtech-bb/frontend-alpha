export type ChunkMeta = {
  text: string;
  url: string;
  title: string;
  section?: string;
  slug: string;
};

export type Source = {
  id: string;
  url: string;
  title: string;
  section?: string;
  score: number;
  excerpt?: string;
};

export interface Env {
  AI: Ai;
  VECTORIZE: VectorizeIndex;
  EMBED_MODEL: string;
  EMBED_DIM: string;
  ALLOWED_ORIGIN: string;
}
