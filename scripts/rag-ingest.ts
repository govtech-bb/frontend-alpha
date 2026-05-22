/**
 * Build a Vectorize NDJSON file from src/content/*.md.
 *
 * Usage:
 *   CF_ACCOUNT_ID=... CF_API_TOKEN=... tsx scripts/rag-ingest.ts
 *
 * Then upload:
 *   cd worker && npx wrangler vectorize insert frontend-alpha-rag \
 *     --file=../vectors.ndjson
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { INFORMATION_ARCHITECTURE } from "../src/data/content-directory";
import { chunkMarkdown } from "../worker/src/rag/chunker";

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const API_TOKEN = process.env.CF_API_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alpha.gov.bb";
const EMBED_MODEL = process.env.EMBED_MODEL ?? "@cf/baai/bge-base-en-v1.5";
const EMBED_DIM = Number(process.env.EMBED_DIM ?? 768);
const OUT_FILE = path.join(process.cwd(), "vectors.ndjson");
const BATCH = 16;

if (!(ACCOUNT_ID && API_TOKEN)) {
  console.error("Set CF_ACCOUNT_ID and CF_API_TOKEN env vars");
  process.exit(1);
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

type PageRef = { slug: string; url: string; title: string; filePath: string };

async function findContentFile(parts: string[]): Promise<string | null> {
  const candidates =
    parts.length === 1
      ? [
          path.join(CONTENT_DIR, parts[0], "index.md"),
          path.join(CONTENT_DIR, `${parts[0]}.md`),
        ]
      : [path.join(CONTENT_DIR, parts[0], `${parts[1]}.md`)];

  for (const c of candidates) {
    try {
      await fs.access(c);
      return c;
    } catch {
      // try next
    }
  }
  return null;
}

async function collectPages(): Promise<PageRef[]> {
  const pages: PageRef[] = [];
  for (const category of INFORMATION_ARCHITECTURE) {
    for (const page of category.pages) {
      const file = await findContentFile([page.slug]);
      if (file) {
        pages.push({
          slug: page.slug,
          url: `${SITE_URL}/${category.slug}/${page.slug}`,
          title: page.title,
          filePath: file,
        });
      }
      for (const sub of page.subPages ?? []) {
        if (sub.type !== "markdown") continue;
        const subFile = await findContentFile([page.slug, sub.slug]);
        if (!subFile) continue;
        pages.push({
          slug: `${page.slug}/${sub.slug}`,
          url: `${SITE_URL}/${category.slug}/${page.slug}/${sub.slug}`,
          title: sub.title ?? `${page.title} — ${sub.slug}`,
          filePath: subFile,
        });
      }
    }
  }
  return pages;
}

type Item = {
  id: string;
  text: string;
  url: string;
  title: string;
  section?: string;
  slug: string;
};

async function buildItems(pages: PageRef[]): Promise<Item[]> {
  const items: Item[] = [];
  for (const p of pages) {
    const raw = await fs.readFile(p.filePath, "utf8");
    const { data, content } = matter(raw);
    const title = (data.title as string | undefined) ?? p.title;
    const chunks = chunkMarkdown(content);
    chunks.forEach((c, idx) => {
      items.push({
        id: `${p.slug}#${idx}`,
        text: c.text,
        url: p.url,
        title,
        section: c.section,
        slug: p.slug,
      });
    });
  }
  return items;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${EMBED_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: texts }),
    }
  );
  if (!res.ok) {
    throw new Error(`Workers AI ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { result: { data: number[][] } };
  return data.result.data.map((v) =>
    v.length > EMBED_DIM ? v.slice(0, EMBED_DIM) : v
  );
}

async function main() {
  const pages = await collectPages();
  console.log(`Found ${pages.length} pages`);

  const items = await buildItems(pages);
  console.log(`Built ${items.length} chunks`);

  const lines: string[] = [];
  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    const vecs = await embedBatch(batch.map((b) => b.text));
    batch.forEach((it, j) => {
      lines.push(
        JSON.stringify({
          id: it.id,
          values: vecs[j],
          metadata: {
            text: it.text,
            url: it.url,
            title: it.title,
            section: it.section ?? "",
            slug: it.slug,
          },
        })
      );
    });
    console.log(
      `Embedded ${Math.min(i + BATCH, items.length)}/${items.length}`
    );
  }

  await fs.writeFile(OUT_FILE, lines.join("\n") + "\n");
  console.log(`Wrote ${OUT_FILE}`);
  console.log(
    "Next: cd worker && npx wrangler vectorize insert frontend-alpha-rag --file=../vectors.ndjson"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
