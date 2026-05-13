import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "@/components/markdown-content";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { DEPARTMENTS, getDepartmentBySlug } from "@/data/departments";
import { getDepartmentBody } from "@/lib/department-body";
import rehypeSectionise from "@/lib/rehype-sectionise";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return DEPARTMENTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) return {};
  return { title: department.name };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) notFound();

  const md = await getDepartmentBody(slug);
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
      contact={department.contact}
      intro={department.intro}
      leadershipLabel="Director"
      minister={department.head}
      originalSource={department.originalSource}
      title={department.name}
    />
  );
}
