"use client";

import MiniSearch from "minisearch";
import { useCallback, useEffect, useRef, useState } from "react";

interface IndexDoc {
  id: string;
  title: string;
  description: string;
  body: string;
  href: string;
  category: string;
  kind: "service" | "ministry" | "department" | "state-body";
  hasOnlineForm: boolean;
}

export interface SearchHit {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  kind: IndexDoc["kind"];
  hasOnlineForm: boolean;
  excerpt: string;
}

const INDEX_URL = "/search-index.json";
const EXCERPT_LEN = 180;
const EXCERPT_PRE = 60;

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "of",
  "for",
  "to",
  "in",
  "on",
  "at",
  "and",
  "or",
  "is",
  "are",
  "be",
  "as",
  "by",
  "with",
  "from",
  "i",
  "you",
  "my",
  "your",
  "how",
  "do",
  "can",
]);

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c] ?? c);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildExcerpt(body: string, terms: string[]): string {
  if (!body) {
    return "";
  }
  const lower = body.toLowerCase();
  let earliest = -1;
  for (const term of terms) {
    const i = lower.indexOf(term.toLowerCase());
    if (i !== -1 && (earliest === -1 || i < earliest)) {
      earliest = i;
    }
  }
  let snippet: string;
  if (earliest === -1) {
    snippet = body.slice(0, EXCERPT_LEN);
  } else {
    const start = Math.max(0, earliest - EXCERPT_PRE);
    const end = Math.min(body.length, start + EXCERPT_LEN);
    snippet =
      (start > 0 ? "…" : "") +
      body.slice(start, end) +
      (end < body.length ? "…" : "");
  }
  let escaped = escapeHtml(snippet);
  for (const term of terms) {
    if (!term) {
      continue;
    }
    const re = new RegExp(`(${escapeRegExp(term)})`, "gi");
    escaped = escaped.replace(re, "<mark>$1</mark>");
  }
  return escaped;
}

export function useSearch() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const msRef = useRef<MiniSearch<IndexDoc> | null>(null);
  const docsRef = useRef<Map<string, IndexDoc>>(new Map());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(INDEX_URL);
        if (!res.ok) {
          throw new Error(`Failed to load search index: ${res.status}`);
        }
        const docs = (await res.json()) as IndexDoc[];
        if (cancelled) {
          return;
        }
        const ms = new MiniSearch<IndexDoc>({
          idField: "id",
          fields: ["title", "description", "body"],
          storeFields: [
            "title",
            "description",
            "href",
            "category",
            "kind",
            "hasOnlineForm",
          ],
          processTerm: (term) => {
            const lower = term.toLowerCase();
            return STOPWORDS.has(lower) ? null : lower;
          },
          searchOptions: {
            boost: { title: 4, description: 1.5 },
            fuzzy: (term) => (term.length > 3 ? 0.3 : 0),
            prefix: (term) => term.length >= 1,
            combineWith: "AND",
            weights: { fuzzy: 0.3, prefix: 0.3 },
          },
        });
        ms.addAll(docs);
        for (const doc of docs) {
          docsRef.current.set(doc.id, doc);
        }
        msRef.current = ms;
        setReady(true);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const search = useCallback((query: string): SearchHit[] => {
    const ms = msRef.current;
    const trimmed = query.trim();
    if (!(ms && trimmed)) {
      return [];
    }
    const results = ms.search(trimmed);
    return results.map((r): SearchHit => {
      const doc = docsRef.current.get(String(r.id));
      const terms = Object.keys(r.match);
      return {
        id: String(r.id),
        title: (r.title as string) ?? doc?.title ?? "",
        description: (r.description as string) ?? doc?.description ?? "",
        href: (r.href as string) ?? doc?.href ?? "",
        category: (r.category as string) ?? doc?.category ?? "",
        kind: (r.kind as IndexDoc["kind"]) ?? doc?.kind ?? "service",
        hasOnlineForm: Boolean(r.hasOnlineForm ?? doc?.hasOnlineForm),
        excerpt: buildExcerpt(doc?.body ?? "", terms),
      };
    });
  }, []);

  return { search, ready, error };
}
