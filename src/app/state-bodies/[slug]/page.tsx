import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "@/components/markdown-content";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { getStateBodyBySlug, STATE_BODIES } from "@/data/state-bodies";
import { getContentBody } from "@/lib/content-body";
import rehypeSectionise from "@/lib/rehype-sectionise";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return STATE_BODIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stateBody = getStateBodyBySlug(slug);
  if (!stateBody) return {};
  return { title: stateBody.name };
}

export default async function StateBodyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const stateBody = getStateBodyBySlug(slug);
  if (!stateBody) notFound();

  const md = await getContentBody("state-bodies", slug);
  const body = md ? (
    <div className="space-y-6 lg:space-y-8">
      <ReactMarkdown
        components={markdownComponents}
        rehypePlugins={[rehypeRaw, rehypeSectionise]}
        remarkPlugins={[remarkGfm]}
      >
        {md.content}
      </ReactMarkdown>
    </div>
  ) : undefined;

  return (
    <MinistryPage
      body={body}
      contact={stateBody.contact}
      leadershipLabel="Director"
      minister={stateBody.head}
      originalSource={stateBody.originalSource}
      title={stateBody.name}
    />
  );
}
