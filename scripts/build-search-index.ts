import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { INFORMATION_ARCHITECTURE } from "../src/data/content-directory";
import { DEPARTMENTS } from "../src/data/departments";
import { MINISTRIES } from "../src/data/ministries";
import { STATE_BODIES } from "../src/data/state-bodies";
import type { PageType } from "../src/types/content";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const OUT_FILE = path.join(process.cwd(), "public", "search-index.json");

type Kind = "service" | "ministry" | "department" | "state-body";

interface IndexDoc {
  id: string;
  title: string;
  description: string;
  body: string;
  href: string;
  category: string;
  kind: Kind;
  hasOnlineForm: boolean;
}

function pageHasOnlineForm(page: PageType): boolean {
  return page.subPages?.some((s) => s.type === "component") ?? false;
}

async function tryRead(filePath: string): Promise<string> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { content } = matter(raw);
    return content;
  } catch {
    return "";
  }
}

async function gatherMarkdownForService(pageSlug: string): Promise<string> {
  const candidates = [
    path.join(CONTENT_DIR, pageSlug, "index.md"),
    path.join(CONTENT_DIR, `${pageSlug}.md`),
    path.join(CONTENT_DIR, pageSlug, "start.md"),
  ];
  const bodies = await Promise.all(candidates.map(tryRead));
  return bodies.filter(Boolean).join("\n\n");
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function collectServices(): Promise<IndexDoc[]> {
  const docs: IndexDoc[] = [];
  for (const category of INFORMATION_ARCHITECTURE) {
    for (const page of category.pages) {
      const fullSlug = `${category.slug}/${page.slug}`;
      const body = stripMarkdown(await gatherMarkdownForService(page.slug));
      docs.push({
        id: `service:${fullSlug}`,
        title: page.title,
        description: page.description ?? "",
        body,
        href: page.href ?? `/${fullSlug}`,
        category: category.title,
        kind: "service",
        hasOnlineForm: pageHasOnlineForm(page),
      });
      for (const child of page.pages ?? []) {
        const childFullSlug = `${fullSlug}/${child.slug}`;
        const childBody = stripMarkdown(
          await gatherMarkdownForService(child.slug)
        );
        docs.push({
          id: `service:${childFullSlug}`,
          title: child.title,
          description: child.description ?? "",
          body: childBody,
          href: child.href ?? child.source_url ?? `/${childFullSlug}`,
          category: category.title,
          kind: "service",
          hasOnlineForm: pageHasOnlineForm(child),
        });
      }
    }
  }
  return docs;
}

function collectOrgs(): IndexDoc[] {
  const docs: IndexDoc[] = [];
  const groups = [
    { list: MINISTRIES, kind: "ministry" as const, label: "Ministry" },
    { list: DEPARTMENTS, kind: "department" as const, label: "Department" },
    { list: STATE_BODIES, kind: "state-body" as const, label: "State body" },
  ];
  for (const { list, kind, label } of groups) {
    for (const org of list) {
      const intro = typeof org.intro === "string" ? org.intro : "";
      docs.push({
        id: `${kind}:${org.slug}`,
        title: org.name,
        description: org.shortDescription ?? "",
        body: intro,
        href: `/government/organisations/${org.slug}`,
        category: label,
        kind,
        hasOnlineForm: false,
      });
    }
  }
  return docs;
}

async function main(): Promise<void> {
  const docs = [...(await collectServices()), ...collectOrgs()];
  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(docs), "utf8");
  const bytes = (await fs.stat(OUT_FILE)).size;
  console.log(
    `search-index: wrote ${docs.length} docs (${(bytes / 1024).toFixed(1)} KB) to ${OUT_FILE}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
