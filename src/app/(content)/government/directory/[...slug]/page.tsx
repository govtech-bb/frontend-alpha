import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { getMarkdownContent } from "@/lib/markdown";

type DirectoryPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DirectoryPage({ params }: DirectoryPageProps) {
  const { slug } = await params;

  // Handle /government/directory (index)
  if (!slug || slug.length === 0) {
    const markdownContent = await getMarkdownContent(["directory"]);
    if (!markdownContent) {
      notFound();
    }
    return <MarkdownContent markdown={markdownContent} />;
  }

  // Handle /government/directory/{section} (ministries, departments, state-bodies)
  if (slug.length === 1) {
    const [sectionSlug] = slug;
    <<<<<<< Updated upstream
    const markdownContent = await getMarkdownContent([
      "directory",
      sectionSlug,
    ]);
    =======
    const markdownContent = await getMarkdownContent([
      "directory",
      sectionSlug,
    ]);
    >>>>>>> Stashed changes
    if (!markdownContent) {
      notFound();
    }
    return <MarkdownContent markdown={markdownContent} />;
  }

  // Handle /government/directory/profile/{org}
  if (slug.length === 2) {
    const [sectionSlug, itemSlug] = slug;
    <<<<<<< Updated upstream
    const markdownContent = await getMarkdownContent([
      "directory",
      sectionSlug,
      itemSlug,
    ]);
    =======
    const markdownContent = await getMarkdownContent([
      "directory",
      sectionSlug,
      itemSlug,
    ]);
    >>>>>>> Stashed changes
    if (!markdownContent) {
      notFound();
    }
    return <MarkdownContent markdown={markdownContent} />;
  }

  return notFound();
}

export async function generateMetadata({ params }: DirectoryPageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    const result = await getMarkdownContent(["directory"]);
    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  if (slug.length === 1) {
    const [sectionSlug] = slug;
    const result = await getMarkdownContent(["directory", sectionSlug]);
    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  if (slug.length === 2) {
    const [sectionSlug, itemSlug] = slug;
    const result = await getMarkdownContent([
      "directory",
      sectionSlug,
      itemSlug,
    ]);
    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  return { title: "Government Directory" };
}
