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
  keywords: string;
  href: string;
  category: string;
  kind: Kind;
  hasOnlineForm: boolean;
}

function pageHasOnlineForm(page: PageType): boolean {
  return page.subPages?.some((s) => s.type === "component") ?? false;
}

interface MarkdownDoc {
  content: string;
  frontmatter: Record<string, unknown>;
}

async function tryRead(filePath: string): Promise<MarkdownDoc | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    return {
      content: parsed.content,
      frontmatter: parsed.data as Record<string, unknown>,
    };
  } catch {
    return null;
  }
}

interface ServiceMarkdown {
  body: string;
  keywords: string[];
}

async function gatherMarkdownForService(
  pageSlug: string
): Promise<ServiceMarkdown> {
  const candidates = [
    path.join(CONTENT_DIR, pageSlug, "index.md"),
    path.join(CONTENT_DIR, `${pageSlug}.md`),
    path.join(CONTENT_DIR, pageSlug, "start.md"),
  ];
  const docs = await Promise.all(candidates.map(tryRead));
  const bodies: string[] = [];
  const keywords: string[] = [];
  for (const doc of docs) {
    if (!doc) {
      continue;
    }
    bodies.push(doc.content);
    const raw = doc.frontmatter.keywords;
    if (Array.isArray(raw)) {
      for (const k of raw) {
        if (typeof k === "string" && k.trim()) {
          keywords.push(k.trim());
        }
      }
    } else if (typeof raw === "string") {
      for (const k of raw.split(",")) {
        if (k.trim()) {
          keywords.push(k.trim());
        }
      }
    }
  }
  return { body: bodies.join("\n\n"), keywords };
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

const ACRONYM_STOPWORDS = new Set([
  "of",
  "and",
  "the",
  "for",
  "to",
  "in",
  "on",
  "&",
  "a",
  "an",
]);

function significantWords(name: string): string[] {
  return name
    .replace(/['’`]s\b/gi, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/[\s-]+/)
    .filter((w) => w && !ACRONYM_STOPWORDS.has(w.toLowerCase()));
}

function acronymsFor(name: string): string[] {
  const words = significantWords(name);
  if (words.length < 2) {
    return [];
  }
  const letters = words.map((w) => w[0]?.toUpperCase() ?? "");
  const out = new Set<string>();
  out.add(letters.join(""));
  if (letters.length > 3) {
    out.add(letters.slice(0, 3).join(""));
  }
  return [...out];
}

const SYNONYM_GROUPS: Array<{ triggers: string[]; extras: string[] }> = [
  {
    triggers: ["tax", "taxes", "revenue", "vat"],
    extras: ["tax", "taxes", "revenue", "VAT", "BRA"],
  },
  {
    triggers: ["licence", "license", "driving", "driver"],
    extras: ["licence", "license", "driving", "driver", "permit"],
  },
  {
    triggers: ["health", "medical", "hospital", "clinic"],
    extras: ["health", "medical", "hospital", "clinic", "doctor"],
  },
  {
    triggers: ["school", "education", "student", "teacher"],
    extras: ["school", "education", "student", "teacher", "learning"],
  },
  {
    triggers: ["passport", "immigration", "visa"],
    extras: ["passport", "immigration", "visa", "travel document"],
  },
  {
    triggers: ["identification", "national id"],
    extras: ["ID", "identification", "national ID"],
  },
  {
    triggers: ["police", "constabulary", "crime"],
    extras: ["police", "constabulary", "crime", "RBPF"],
  },
  {
    triggers: ["pension", "retirement", "nis"],
    extras: ["pension", "retirement", "NIS", "national insurance"],
  },
  {
    triggers: ["business", "company", "incorporation", "registry"],
    extras: ["business", "company", "incorporation", "registry"],
  },
  {
    triggers: ["birth", "death", "marriage", "certificate"],
    extras: ["birth", "death", "marriage", "certificate", "civil registration"],
  },
  {
    triggers: ["job", "employment", "labour", "labor"],
    extras: ["job", "employment", "work", "labour", "vacancy"],
  },
  {
    triggers: ["water", "wastewater", "sewerage"],
    extras: ["water", "wastewater", "sewerage", "BWA"],
  },
  {
    triggers: ["electricity", "power", "energy"],
    extras: ["electricity", "power", "energy", "BL&P"],
  },
  {
    triggers: ["transport", "bus", "transit"],
    extras: ["transport", "bus", "transit", "BTB"],
  },
];

function synonymsFor(text: string): string[] {
  const lower = text.toLowerCase();
  const out = new Set<string>();
  for (const { triggers, extras } of SYNONYM_GROUPS) {
    const hit = triggers.some((t) => {
      const re = new RegExp(
        `\\b${t.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}\\b`,
        "i"
      );
      return re.test(lower);
    });
    if (hit) {
      for (const e of extras) {
        out.add(e);
      }
    }
  }
  return [...out];
}

function mergeKeywords(...lists: Array<string[] | undefined>): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    if (!list) {
      continue;
    }
    for (const k of list) {
      const trimmed = k.trim();
      if (!trimmed) {
        continue;
      }
      const key = trimmed.toLowerCase();
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      out.push(trimmed);
    }
  }
  return out.join(" ");
}

async function collectServices(): Promise<IndexDoc[]> {
  const docs: IndexDoc[] = [];
  for (const category of INFORMATION_ARCHITECTURE) {
    for (const page of category.pages) {
      const fullSlug = `${category.slug}/${page.slug}`;
      const md = await gatherMarkdownForService(page.slug);
      docs.push({
        id: `service:${fullSlug}`,
        title: page.title,
        description: page.description ?? "",
        body: stripMarkdown(md.body),
        keywords: mergeKeywords(
          page.keywords,
          md.keywords,
          synonymsFor(`${page.title} ${page.description ?? ""}`)
        ),
        href: page.href ?? `/${fullSlug}`,
        category: category.title,
        kind: "service",
        hasOnlineForm: pageHasOnlineForm(page),
      });
      for (const child of page.pages ?? []) {
        const childFullSlug = `${fullSlug}/${child.slug}`;
        const childMd = await gatherMarkdownForService(child.slug);
        docs.push({
          id: `service:${childFullSlug}`,
          title: child.title,
          description: child.description ?? "",
          body: stripMarkdown(childMd.body),
          keywords: mergeKeywords(
            child.keywords,
            childMd.keywords,
            synonymsFor(`${child.title} ${child.description ?? ""}`)
          ),
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
        keywords: mergeKeywords(
          org.keywords,
          acronymsFor(org.name),
          synonymsFor(`${org.name} ${org.shortDescription ?? ""} ${intro}`)
        ),
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
