import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { Typography } from "@/components/ui/typography";

type EntryPointPageProps = {
  params: Promise<{ slug: string[] }>;
};

async function getMarkdownContent(slug: string[]) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "entrypoints",
      `${slug.join("/")}.md`
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(remarkHtml).process(content);

    return {
      frontmatter: data,
      content: processedContent.toString(),
    };
  } catch (_error) {
    return null;
  }
}

export default async function EntryPointPage({ params }: EntryPointPageProps) {
  const { slug } = await params;
  const result = await getMarkdownContent(slug);

  if (!result) {
    notFound();
  }

  const { frontmatter, content } = result;

  return (
    <div className="bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          {frontmatter.title && (
            <Typography variant="h1">{frontmatter.title}</Typography>
          )}
          {frontmatter.description && (
            <Typography className="text-gray-600" variant="paragraph">
              {frontmatter.description}
            </Typography>
          )}
        </div>

        <div
          className="prose prose-lg prose-h1:mt-8 prose-h2:mt-6 prose-h3:mt-4 prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-3 prose-li:mb-2 prose-p:mb-4 prose-ul:mb-4 max-w-none prose-headings:font-bold prose-links:font-medium prose-strong:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-headings:text-[#00267F] prose-links:text-[#00267F] prose-strong:text-[#00267F] prose-p:leading-relaxed prose-links:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {frontmatter.date && (
          <div className="border-t pt-4 text-gray-500 text-sm">
            Last updated:{" "}
            {new Date(frontmatter.date).toLocaleDateString("en-GB")}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: EntryPointPageProps) {
  const { slug } = await params;
  const result = await getMarkdownContent(slug);

  if (!result) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: result.frontmatter.title || "GovTech Barbados",
    description:
      result.frontmatter.description || "Government services information",
  };
}
