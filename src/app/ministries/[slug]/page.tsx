import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "@/components/markdown-content";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { getMinistryBySlug, MINISTRIES } from "@/data/ministries";
import { getMinistryBody } from "@/lib/ministry-body";

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
    <ReactMarkdown
      components={markdownComponents}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {md.content}
    </ReactMarkdown>
  ) : undefined;

  return (
    <MinistryPage
      body={body}
      contact={ministry.contact}
      featured={ministry.featured}
      heroImage={ministry.heroImage}
      heroImageAlt={ministry.heroImageAlt}
      intro={ministry.intro}
      minister={ministry.minister}
      onlineServices={ministry.onlineServices}
      services={ministry.services}
      title={ministry.name}
    />
  );
}
