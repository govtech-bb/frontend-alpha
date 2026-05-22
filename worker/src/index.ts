import { embed } from "./providers/embeddings";
import { retrieve } from "./rag/retriever";
import type { Env } from "./utils/schema";

function cors(env: Env): HeadersInit {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data: unknown, init: ResponseInit & { env: Env }): Response {
  const { env, ...rest } = init;
  return new Response(JSON.stringify(data), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...cors(env),
      ...(rest.headers ?? {}),
    },
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(env) });
    }

    if (
      req.method === "GET" &&
      (url.pathname === "/" || url.pathname === "/health")
    ) {
      return json({ status: "ok" }, { env });
    }

    if (req.method === "POST" && url.pathname === "/retrieve") {
      try {
        const { query, topK = 8 } = (await req.json()) as {
          query: string;
          topK?: number;
        };
        if (!query || typeof query !== "string") {
          return json({ error: "query is required" }, { status: 400, env });
        }
        const [qvec] = await embed(env, [query]);
        const result = await retrieve(env, qvec, topK);
        return json(result, { env });
      } catch (err) {
        const message = err instanceof Error ? err.message : "unknown error";
        return json({ error: message }, { status: 500, env });
      }
    }

    return new Response("Not Found", { status: 404, headers: cors(env) });
  },
};
