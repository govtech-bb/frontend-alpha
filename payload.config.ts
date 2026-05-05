import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  convertLexicalToMarkdown,
  convertMarkdownToLexical,
  editorConfigFactory,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { BasePayload, CollectionBeforeChangeHook } from "payload";
import { buildConfig } from "payload";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const editor = lexicalEditor({
  features: () => [
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    BlockquoteFeature(),
    LinkFeature(),
    HorizontalRuleFeature(),
    AlignFeature(),
    IndentFeature(),
    BlocksFeature({
      blocks: [
        {
          slug: "startServiceLink",
          labels: {
            singular: "Start Service Link",
            plural: "Start Service Links",
          },
          fields: [
            {
              name: "targetPage",
              type: "relationship",
              relationTo: "pages",
              required: true,
              admin: {
                description:
                  "The service this CTA links to. The href is computed from the page's category and slug.",
              },
            },
            {
              name: "targetSubpage",
              type: "select",
              required: true,
              defaultValue: "start",
              options: [
                { label: "/start (Information page)", value: "start" },
                { label: "/form (Form page)", value: "form" },
              ],
              admin: {
                description:
                  "Which subpage to link to. Most CTAs point to /start, which has its own 'Begin' button leading to /form.",
              },
            },
            {
              name: "label",
              type: "text",
              defaultValue: "Apply online",
            },
          ],
        },
      ],
    }),
  ],
});

interface StartServiceLinkBlock {
  fields?: {
    targetPage?: unknown;
    targetSubpage?: string;
    label?: string;
  };
}

async function resolveStartServiceLinkHtml(
  block: StartServiceLinkBlock,
  payload: BasePayload
): Promise<string> {
  const targetPage = block.fields?.targetPage;
  const targetSubpage = block.fields?.targetSubpage || "start";
  const label = block.fields?.label || "Apply online";
  const id =
    targetPage && typeof targetPage === "object" && "id" in targetPage
      ? (targetPage as { id: string | number }).id
      : (targetPage as string | number);
  if (id === undefined || id === null) return "";
  try {
    const page = await payload.findByID({
      collection: "pages",
      id,
      depth: 1,
    });
    const cat = page?.category;
    const categorySlug =
      cat && typeof cat === "object" && "slug" in cat
        ? (cat as { slug: string }).slug
        : null;
    const href = categorySlug
      ? `/${categorySlug}/${page.slug}/${targetSubpage}`
      : `/${page.slug}/${targetSubpage}`;
    return `<a data-start-link href="${href}">${label}</a>`;
  } catch {
    return "";
  }
}

interface MarkerReplacement {
  marker: string;
  html: string;
}

async function inlineStartServiceLinkBlocks(
  state: unknown,
  payload: BasePayload
): Promise<{ state: unknown; replacements: MarkerReplacement[] }> {
  const cloned = JSON.parse(JSON.stringify(state));
  const replacements: MarkerReplacement[] = [];
  const children = cloned?.root?.children;
  if (!Array.isArray(children)) return { state: cloned, replacements };

  for (let i = 0; i < children.length; i += 1) {
    const node = children[i];
    if (
      node?.type === "block" &&
      node?.fields?.blockType === "startServiceLink"
    ) {
      const html = await resolveStartServiceLinkHtml(node, payload);
      if (!html) continue;
      const marker = `__SSL_MARKER_${i}_${Math.random().toString(36).slice(2)}__`;
      replacements.push({ marker, html });
      children[i] = {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        textFormat: 0,
        children: [
          {
            type: "text",
            text: marker,
            format: 0,
            mode: "normal",
            style: "",
            detail: 0,
            version: 1,
          },
        ],
      };
    }
  }
  return { state: cloned, replacements };
}

const syncBodyMarkdown: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  req,
}) => {
  try {
    const editorConfig = await editorConfigFactory.default({
      config: req.payload.config,
    });
    const incomingRich = data?.bodyRich;
    const incomingBody = data?.body;
    const previousRich = originalDoc?.bodyRich;
    const previousBody = originalDoc?.body;

    const richChanged =
      incomingRich !== undefined &&
      JSON.stringify(incomingRich) !== JSON.stringify(previousRich);
    const bodyChanged =
      incomingBody !== undefined && incomingBody !== previousBody;

    if (richChanged && incomingRich) {
      const { state: prepared, replacements } =
        await inlineStartServiceLinkBlocks(incomingRich, req.payload);
      let md = convertLexicalToMarkdown({
        data: prepared as Parameters<
          typeof convertLexicalToMarkdown
        >[0]["data"],
        editorConfig,
      });
      for (const r of replacements) {
        md = md.split(r.marker).join(r.html);
      }
      data.body = md;
    } else if (bodyChanged && incomingBody && !richChanged) {
      const lex = convertMarkdownToLexical({
        editorConfig,
        markdown: incomingBody,
      });
      data.bodyRich = lex;
    }
  } catch (err) {
    req.payload.logger.warn(
      `[pages.beforeChange] body/bodyRich sync failed: ${(err as Error).message}`
    );
  }
  return data;
};

export default buildConfig({
  admin: { user: "users" },
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
    },
    {
      slug: "categories",
      access: { read: () => true },
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "order"],
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { position: "sidebar" },
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
          index: true,
          admin: { position: "sidebar" },
        },
      ],
    },
    {
      slug: "pages",
      access: { read: () => true },
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "category", "stage", "featured"],
      },
      hooks: { beforeChange: [syncBodyMarkdown] },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        {
          name: "bodyRich",
          type: "richText",
          editor,
          label: "Body",
        },
        {
          name: "body",
          type: "textarea",
          admin: { hidden: true },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: { position: "sidebar" },
        },
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          admin: { position: "sidebar" },
        },
        {
          name: "stage",
          type: "select",
          options: [
            { label: "Migrated", value: "migrated" },
            { label: "Alpha", value: "alpha" },
            { label: "Beta", value: "beta" },
            { label: "Live", value: "live" },
          ],
          admin: { position: "sidebar" },
        },
        {
          name: "sourceUrl",
          type: "text",
          admin: {
            position: "sidebar",
            description:
              "Required when stage is 'migrated'. The original source URL of the content.",
            condition: (data) => data?.stage === "migrated",
          },
          validate: (
            value: string | null | undefined,
            { data }: { data?: { stage?: string } }
          ) => {
            if (data?.stage === "migrated" && !value) {
              return "Source URL is required when stage is 'migrated'.";
            }
            return true;
          },
        },
        {
          name: "featured",
          type: "checkbox",
          defaultValue: false,
          admin: { position: "sidebar" },
        },
        {
          name: "order",
          type: "number",
          defaultValue: 0,
          index: true,
          admin: { position: "sidebar" },
        },
      ],
    },
    {
      slug: "subpages",
      access: { read: () => true },
      admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "page", "type"],
      },
      hooks: { beforeChange: [syncBodyMarkdown] },
      fields: [
        { name: "title", type: "text" },
        {
          name: "bodyRich",
          type: "richText",
          editor,
          label: "Body",
          admin: {
            description: "Ignored for component (form) subpages.",
            condition: (_, siblingData) => siblingData?.type !== "component",
          },
        },
        {
          name: "body",
          type: "textarea",
          admin: {
            hidden: true,
            condition: (_, siblingData) => siblingData?.type !== "component",
          },
        },
        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
          required: true,
          index: true,
          admin: { position: "sidebar" },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          index: true,
          admin: { position: "sidebar" },
        },
        {
          name: "type",
          type: "select",
          required: true,
          defaultValue: "markdown",
          options: [
            { label: "Markdown", value: "markdown" },
            { label: "Component (form)", value: "component" },
          ],
          admin: { position: "sidebar" },
        },
      ],
      indexes: [{ fields: ["page", "slug"], unique: true }],
    },
  ],
  editor,
  secret:
    process.env.PAYLOAD_SECRET ??
    (() => {
      throw new Error("PAYLOAD_SECRET is required");
    })(),
  db: sqliteAdapter({
    push: process.env.NODE_ENV !== "production",
    client: {
      url: process.env.DATABASE_URI ?? "",
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
