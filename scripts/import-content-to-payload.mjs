import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { getPayload } from "payload";
import configPromise from "../payload.config.ts";
import * as iaModule from "../src/data/content-directory.ts";

const INFORMATION_ARCHITECTURE =
  iaModule.INFORMATION_ARCHITECTURE ||
  iaModule.default?.INFORMATION_ARCHITECTURE ||
  [];

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const contentDir = path.join(dirname, "..", "src", "content");

const KNOWN = new Set([
  "slug",
  "title",
  "featured",
  "stage",
  "category",
  "body",
  "description",
  "source_url",
]);

function splitFrontmatter(data) {
  const known = {};
  for (const [k, v] of Object.entries(data)) {
    if (KNOWN.has(k)) known[k] = v;
  }
  return { known };
}

async function readMd(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return matter(raw);
}

async function main() {
  const resolved = await (configPromise.default ?? configPromise);
  const config = resolved.default ?? resolved;
  const payload = await getPayload({ config });

  const slugToCategoryId = new Map();
  for (const [catIdx, cat] of INFORMATION_ARCHITECTURE.entries()) {
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    const data = {
      slug: cat.slug,
      title: cat.title,
      description: cat.description,
      order: catIdx,
    };
    let doc;
    if (existing.docs.length > 0) {
      doc = await payload.update({
        collection: "categories",
        id: existing.docs[0].id,
        data,
      });
    } else {
      doc = await payload.create({ collection: "categories", data });
    }
    slugToCategoryId.set(cat.slug, doc.id);
    console.log(`cat: ${cat.slug}`);
  }

  const pageSlugToIa = new Map();
  for (const cat of INFORMATION_ARCHITECTURE) {
    for (const [pageIdx, p] of cat.pages.entries()) {
      pageSlugToIa.set(p.slug, {
        categorySlug: cat.slug,
        iaPage: p,
        order: pageIdx,
      });
    }
  }

  const entries = await fs.readdir(contentDir, { withFileTypes: true });

  let pageCount = 0;
  let subCount = 0;
  for (const entry of entries) {
    let slug;
    let mainFile;
    const collectedSubs = [];

    if (entry.isFile() && entry.name.endsWith(".md")) {
      slug = entry.name.replace(/\.md$/, "");
      mainFile = path.join(contentDir, entry.name);
    } else if (entry.isDirectory()) {
      slug = entry.name;
      const indexPath = path.join(contentDir, entry.name, "index.md");
      try {
        await fs.access(indexPath);
        mainFile = indexPath;
      } catch {
        continue;
      }
      const inner = await fs.readdir(path.join(contentDir, entry.name));
      for (const f of inner) {
        if (f === "index.md" || !f.endsWith(".md")) continue;
        const sp = await readMd(path.join(contentDir, entry.name, f));
        const { known: spKnown } = splitFrontmatter(sp.data);
        collectedSubs.push({
          slug: f.replace(/\.md$/, ""),
          title: spKnown.title,
          type: "markdown",
          body: sp.content,
        });
      }
    } else {
      continue;
    }

    const parsed = await readMd(mainFile);
    const { known } = splitFrontmatter(parsed.data);

    const iaEntry = pageSlugToIa.get(slug);
    const iaPage = iaEntry?.iaPage;
    const categorySlug = iaEntry?.categorySlug;
    const categoryId = categorySlug
      ? slugToCategoryId.get(categorySlug)
      : undefined;
    const pageOrder = iaEntry?.order ?? 9999;

    const subSlugs = new Set(collectedSubs.map((s) => s.slug));
    if (iaPage?.subPages) {
      for (const iaSub of iaPage.subPages) {
        if (subSlugs.has(iaSub.slug)) {
          const existingSub = collectedSubs.find((s) => s.slug === iaSub.slug);
          if (existingSub && !existingSub.title && iaSub.title) {
            existingSub.title = iaSub.title;
          }
          continue;
        }
        collectedSubs.push({
          slug: iaSub.slug,
          title: iaSub.title,
          type: iaSub.type || "component",
        });
      }
    }

    const data = {
      slug,
      title: known.title || iaPage?.title || slug,
      description: known.description || iaPage?.description,
      sourceUrl: known.source_url || iaPage?.source_url || undefined,
      featured: !!known.featured,
      stage: known.stage,
      order: pageOrder,
      category: categoryId,
      body: parsed.content,
    };

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    let pageDoc;
    if (existing.docs.length > 0) {
      pageDoc = await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data,
      });
    } else {
      pageDoc = await payload.create({ collection: "pages", data });
    }
    pageCount++;
    process.stdout.write(`. ${slug}\n`);

    for (const sub of collectedSubs) {
      const subData = {
        page: pageDoc.id,
        slug: sub.slug,
        title: sub.title,
        type: sub.type,
        body: sub.type === "markdown" ? sub.body : undefined,
      };
      const existingSub = await payload.find({
        collection: "subpages",
        where: {
          and: [
            { page: { equals: pageDoc.id } },
            { slug: { equals: sub.slug } },
          ],
        },
        limit: 1,
      });
      if (existingSub.docs.length > 0) {
        await payload.update({
          collection: "subpages",
          id: existingSub.docs[0].id,
          data: subData,
        });
      } else {
        await payload.create({ collection: "subpages", data: subData });
      }
      subCount++;
    }
  }

  console.log(
    `\nImported ${INFORMATION_ARCHITECTURE.length} categories, ${pageCount} pages, ${subCount} subpages.`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
