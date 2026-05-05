import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { markdownComponents } from "@/components/markdown-content";
import { PersonPage } from "@/components/person/person-page";
import { getPersonBySlug, getRelatedMinistries, PEOPLE } from "@/data/people";
import { getPersonBody } from "@/lib/person-body";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  return { title: person.name };
}

export default async function PersonDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  const md = await getPersonBody(slug);
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
    <PersonPage
      bio={person.bio}
      body={body}
      contact={person.contact}
      name={person.name}
      photo={person.photo}
      relatedMinistries={getRelatedMinistries(person)}
      role={person.role}
    />
  );
}
