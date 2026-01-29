import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { getMarkdownContent } from "@/lib/markdown";

export default async function AboutIndexPage() {
  const markdownContent = await getMarkdownContent(["about"]);
  if (!markdownContent) {
    notFound();
  }
  return <MarkdownContent markdown={markdownContent} />;
}

export async function generateMetadata() {
  const result = await getMarkdownContent(["about"]);
  if (result) {
    return {
      title: result.frontmatter.title,
      description: result.frontmatter.description,
    };
  }
  return { title: "About Government" };
}
