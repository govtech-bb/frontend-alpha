/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Typography } from "@/components/ui/typography";
import { getMarkdownContent } from "@/lib/markdown";

type EntryPointPageProps = {
  params: Promise<{ slug: string[] }>;
};

// Custom components for react-markdown
const components = {
  h1: ({ children, ...props }: any) => (
    <h1 className="mt-8 mb-4 font-bold text-[40px]" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="mt-6 mb-4 font-semibold text-[20px]" {...props}>
      {children}
    </h2>
  ),
  p: ({ children, ...props }: any) => (
    <p className="mb-4 text-[20px] leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="mb-4 list-disc pl-6 text-[20px]" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="mb-4 list-decimal pl-6 text-[20px]" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  a: ({ href, children, ...props }: any) => {
    // Check if link starts with # (internal link) to determine if it's likely in a list
    const isInternalLink = href?.startsWith("#");
    const linkClass = isInternalLink
      ? "underline text-[20px]"
      : "text-[#00654A] underline text-[20px]";

    return (
      <a className={linkClass} href={href} {...props}>
        {children}
      </a>
    );
  },
};

export default async function EntryPointPage({ params }: EntryPointPageProps) {
  const { slug } = await params;
  const result = await getMarkdownContent(slug);

  if (!result) {
    notFound();
  }

  const { frontmatter, content } = result;

  return (
    <div className="px-4 py-8">
      <div className="space-y-4">
        {frontmatter.title && (
          <Typography variant="h1">{frontmatter.title}</Typography>
        )}

        {frontmatter.description
          ?.split("\n")
          .map((line: string, _index: number) => (
            <Typography key={_index} variant="paragraph">
              {line}
            </Typography>
          ))}
      </div>

      <ReactMarkdown components={components}>{content}</ReactMarkdown>

      {frontmatter.date && (
        <div className="border-t pt-4 text-gray-500 text-sm">
          Last updated: {new Date(frontmatter.date).toLocaleDateString("en-GB")}
        </div>
      )}
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
