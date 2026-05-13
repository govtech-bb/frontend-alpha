import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "@/components/markdown-content";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { getMinistryBySlug, MINISTRIES } from "@/data/ministries";
import { getMinistryBody } from "@/lib/ministry-body";
import rehypeSectionise from "@/lib/rehype-sectionise";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return MINISTRIES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministry = getMinistryBySlug(slug);
  if (!ministry) return {};
  return { title: ministry.name };
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const ministry = getMinistryBySlug(slug);
  if (!ministry) notFound();

  const md = await getMinistryBody(slug);
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
      associatedDepartments={ministry.associatedDepartments}
      body={body}
      contact={ministry.contact}
      featured={ministry.featured}
      intro={ministry.intro}
      minister={ministry.minister}
      onlineServices={ministry.onlineServices}
      originalSource={ministry.originalSource}
      services={ministry.services}
      title={ministry.name}
    />
  );
}
