import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { getMarkdownContent } from "@/lib/markdown";

type AboutPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { slug } = await params;

  // Handle /government/about (index)
  if (!slug || slug.length === 0) {
    const markdownContent = await getMarkdownContent(["about"]);
    if (!markdownContent) {
      notFound();
    }
    return <MarkdownContent markdown={markdownContent} />;
  }

  // Handle /government/about/{page} (how-government-works, constitution, get-involved)
  if (slug.length === 1) {
    const [pageSlug] = slug;
    const markdownContent = await getMarkdownContent(["about", pageSlug]);
    if (!markdownContent) {
      notFound();
    }
    return <MarkdownContent markdown={markdownContent} />;
  }

  return notFound();
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    const result = await getMarkdownContent(["about"]);
    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  if (slug.length === 1) {
    const [pageSlug] = slug;
    const result = await getMarkdownContent(["about", pageSlug]);
    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  return { title: "About Government" };
}
