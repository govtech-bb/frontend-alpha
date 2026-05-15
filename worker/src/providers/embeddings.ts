import type { Env } from "../utils/schema";

export async function embed(env: Env, texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const dim = Number(env.EMBED_DIM);
  const out: number[][] = [];

  // Workers AI embedding endpoint accepts an array, but cap batch to be safe.
  const BATCH = 16;
  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const res = (await env.AI.run(
      env.EMBED_MODEL as never,
      {
        text: batch,
      } as never
    )) as { data: number[][] };

    if (!res?.data) {
      throw new Error(
        `Workers AI embed returned no data for batch starting ${i}`
      );
    }
    for (const v of res.data) {
      out.push(v.length > dim ? v.slice(0, dim) : v);
    }
  }
  return out;
}
