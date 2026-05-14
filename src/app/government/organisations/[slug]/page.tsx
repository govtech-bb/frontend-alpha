import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "@/components/markdown-content";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { DEPARTMENTS, getDepartmentBySlug } from "@/data/departments";
import { getMinistryBySlug, MINISTRIES } from "@/data/ministries";
import { getStateBodyBySlug, STATE_BODIES } from "@/data/state-bodies";
import { getContentBody } from "@/lib/content-body";
import rehypeSectionise from "@/lib/rehype-sectionise";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return [
    ...MINISTRIES.map((m) => ({ slug: m.slug })),
    ...DEPARTMENTS.map((d) => ({ slug: d.slug })),
    ...STATE_BODIES.map((s) => ({ slug: s.slug })),
  ];
}

function resolve(slug: string) {
  const ministry = getMinistryBySlug(slug);
  if (ministry) {
    return { kind: "ministries" as const, entry: ministry };
  }
  const department = getDepartmentBySlug(slug);
  if (department) {
    return { kind: "departments" as const, entry: department };
  }
  const stateBody = getStateBodyBySlug(slug);
  if (stateBody) {
    return { kind: "state-bodies" as const, entry: stateBody };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) return {};
  return { title: resolved.entry.name };
}

export default async function OrganisationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resolved = resolve(slug);
  if (!resolved) notFound();

  const md = await getContentBody(resolved.kind, slug);
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

  if (resolved.kind === "ministries") {
    const ministry = resolved.entry;
    return (
      <MinistryPage
        associatedDepartments={ministry.associatedDepartments}
        body={body}
        contact={ministry.contact}
        featured={ministry.featured}
        minister={ministry.minister}
        onlineServices={ministry.onlineServices}
        originalSource={ministry.originalSource}
        services={ministry.services}
        title={ministry.name}
      />
    );
  }

  return (
    <MinistryPage
      body={body}
      contact={resolved.entry.contact}
      leadershipLabel="Director"
      minister={resolved.entry.head}
      originalSource={resolved.entry.originalSource}
      title={resolved.entry.name}
    />
  );
}
