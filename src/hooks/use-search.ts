"use client";

import MiniSearch from "minisearch";
import { useCallback, useEffect, useRef, useState } from "react";

interface IndexDoc {
  id: string;
  title: string;
  description: string;
  body: string;
  keywords: string;
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
}

const INDEX_URL = "/search-index.json";

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
          fields: ["title", "keywords", "description", "body"],
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
            boost: { keywords: 5, title: 4, description: 1.5, body: 0.3 },
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
      return {
        id: String(r.id),
        title: (r.title as string) ?? doc?.title ?? "",
        description: (r.description as string) ?? doc?.description ?? "",
        href: (r.href as string) ?? doc?.href ?? "",
        category: (r.category as string) ?? doc?.category ?? "",
        kind: (r.kind as IndexDoc["kind"]) ?? doc?.kind ?? "service",
        hasOnlineForm: Boolean(r.hasOnlineForm ?? doc?.hasOnlineForm),
      };
    });
  }, []);

  return { search, ready, error };
}
