# frontend-alpha RAG (POC)

- **Worker** (this folder): retrieval only. Embeds query → Vectorize search → returns contexts + sources.
- **Next.js API route** (`src/app/api/chat/route.ts`): calls worker `/retrieve`, then streams Anthropic via TanStack AI.
- **Chat UI** (`src/app/chat/page.tsx`): TanStack AI `useChat` hook, SSE streaming.

| Layer | Tech |
| --- | --- |
| Embeddings | Workers AI `@cf/baai/bge-base-en-v1.5` (768d) |
| Vector store | Cloudflare Vectorize |
| LLM | Anthropic Claude Haiku via `@tanstack/ai-anthropic` |
| Streaming | `@tanstack/ai` server, `@tanstack/ai-react` client |

---

## 1. Prereqs

- Cloudflare account with Workers AI + Vectorize enabled
- Anthropic API key
- `wrangler` (installed via `worker/package.json` devDeps)

```bash
cd worker
npm install
npx wrangler login
```

## 2. Create the Vectorize index

```bash
cd worker
npm run vectorize:create
# = wrangler vectorize create frontend-alpha-rag --dimensions=768 --metric=cosine
```

## 3. Anthropic key — set in **Next.js**, not the worker

The worker no longer talks to Anthropic. Put `ANTHROPIC_API_KEY` in `.env.local` at the repo root (and in Vercel env vars for previews).

If you previously set the worker secret, remove it:
```bash
cd worker && npx wrangler secret delete ANTHROPIC_API_KEY
```

## 4. Deploy the worker

```bash
cd worker
npm run deploy
```

Wrangler prints the worker URL, e.g. `https://frontend-alpha-rag.<subdomain>.workers.dev`. Save it.

## 5. Wire the widget into the Next.js app

Add to `.env.local` at the repo root:

```
NEXT_PUBLIC_RAG_URL=https://frontend-alpha-rag.<subdomain>.workers.dev
ANTHROPIC_API_KEY=sk-ant-...
LLM_MODEL=claude-haiku-4-5-20251001    # optional override
```

Restart `next dev`. Visit `/chat`.

### Vercel / Amplify previews

`NEXT_PUBLIC_RAG_URL` is inlined at build time, so set it in your hosting provider's project env vars for **all** environments (Production + Preview + Development). The worker has `ALLOWED_ORIGIN=*` so any preview origin works out of the box.

All previews share the same Vectorize index — fine for a POC.

## 6. Ingest content

You need a Cloudflare API token with **Workers AI: Read** scope.
Create one at <https://dash.cloudflare.com/profile/api-tokens>.

Get your account ID from any Cloudflare dashboard URL or:

```bash
npx wrangler whoami
```

Then from the **repo root**:

```bash
CF_ACCOUNT_ID=<your-account-id> \
CF_API_TOKEN=<your-token> \
npm run rag:ingest
```

This:

1. Walks `INFORMATION_ARCHITECTURE` from `src/data/content-directory.ts`
2. Reads each markdown file under `src/content/`
3. Chunks by heading + sentence boundary (with overlap)
4. Embeds via Workers AI REST API
5. Writes `vectors.ndjson` to the repo root

Then upload to Vectorize:

```bash
cd worker
npx wrangler vectorize insert frontend-alpha-rag --file=../vectors.ndjson
```

Re-run anytime content changes — IDs are stable (`<slug>#<chunk-index>`) so it upserts in place.

## 7. Test it

Open the Next.js dev server, click the chat button, ask:

- "How do I get a birth certificate?"
- "What documents do I need for a passport?"
- "Where can I apply for financial assistance?"

Or hit the worker directly:

```bash
curl -X POST https://frontend-alpha-rag.<subdomain>.workers.dev/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "how do I get a passport"}'
```

---

## Endpoints

| Method | Path        | Purpose                       |
| ------ | ----------- | ----------------------------- |
| GET    | `/`         | Health check                  |
| GET    | `/health`   | Health check                  |
| POST   | `/retrieve` | `{ query, topK? }` → `{ contexts, sources }` |

The LLM call lives in the Next.js app (`src/app/api/chat/route.ts`). Ingest is offline via wrangler CLI.

## Layout

```
worker/
  wrangler.toml          # bindings: AI, VECTORIZE; vars: model + dim
  src/
    index.ts             # routes
    rag/
      chunker.ts         # heading + sentence-boundary chunker w/ overlap
      retriever.ts       # Vectorize query -> contexts + sources
      prompt.ts          # Barbados gov system prompt
    providers/
      embeddings.ts      # Workers AI binding
      llm.ts             # Anthropic Messages API
    utils/schema.ts
scripts/
  rag-ingest.ts          # local chunk + embed -> vectors.ndjson
src/components/
  ai-chat.tsx            # React widget (mounted in app/layout.tsx)
```

## Tweaks

- **Chunk size**: `chunkMarkdown(content, { maxLen: 900, overlap: 100 })` in `scripts/rag-ingest.ts`
- **Top-K**: 8 by default (`worker/src/index.ts` → `retrieve(env, qvec, 8)`); shown in UI capped to 5 in `formatSources`
- **Model swap**: change `LLM_MODEL` in `wrangler.toml` (any Anthropic model ID)
- **Embedding model swap**: change `EMBED_MODEL` + `EMBED_DIM` in `wrangler.toml` AND in `npm run rag:ingest` env (must match), then re-create the Vectorize index with new dim

## Cost notes (POC)

- Workers AI: free tier covers ~10k embeds/day
- Vectorize: free tier covers POC volume
- Anthropic: Haiku is the cheap one (~$1/M input tokens)
- Worker requests: free tier is 100k/day

## Tearing it down

```bash
cd worker
npm run vectorize:delete
npx wrangler delete  # removes the worker
```
