/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Typography } from "@/components/ui/typography";
import {
  getAllMarkdownSlugs,
  getMarkdownContent,
  markdownExists,
} from "@/lib/markdown";

type EntryPointPageProps = {
  params: Promise<{ slug: string[] }>;
};

// Custom components for react-markdown
const components = {
  h1: ({ children, ...props }: any) => (
    <Typography className="mt-8 mb-4" variant="h1" {...props}>
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }: any) => (
    <Typography className="mt-8 mb-4" variant="h2" {...props}>
      {children}
    </Typography>
  ),
  h3: ({ children, ...props }: any) => (
    <Typography className="mt-8 mb-4" variant="h3" {...props}>
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }: any) => (
    <Typography className="mt-8 mb-4" variant="h4" {...props}>
      {children}
    </Typography>
  ),
  p: ({ children, ...props }: any) => (
    <Typography variant="paragraph" {...props}>
      {children}
    </Typography>
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
  hr: (props: any) => <hr className="my-8 border-2" {...props} />,
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

export async function generateStaticParams() {
  const allSlugs = await getAllMarkdownSlugs();

  // Transform to Next.js params format
  return allSlugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: EntryPointPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug.some((s) => s.startsWith("."))) {
    return { title: "Not Found" };
  }

  try {
    const content = await getMarkdownContent(slug);

    return {
      title: content.frontmatter.title || "GovTech Barbados",
      description:
        content.frontmatter.description || "Government services information",
    };
  } catch (_error) {
    return {
      title: "Content Not Found",
    };
  }
}

export default async function EntryPointPage({ params }: EntryPointPageProps) {
  const { slug } = await params;

  // Validate slug exists before attempting to read
  const exists = await markdownExists(slug);

  if (!exists) {
    notFound();
  }

  try {
    // Safely get content - path traversal protection is built-in
    const { frontmatter, content } = await getMarkdownContent(slug);

    return (
      <div className="space-y-4 px-4 pt-2 pb-8">
        <div className="space-y-4 pb-4">
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

          {frontmatter.stage?.length > 0 ? (
            <div className="border-[#1E787D] border-l-4 bg-[#DEF5F6] px-4 py-3">
              <Typography variant="paragraph">
                This Page is in{" "}
                <span className="capitalize underline">
                  {frontmatter.stage}
                </span>
                .
              </Typography>
            </div>
          ) : null}
        </div>

        <ReactMarkdown components={components}>{content}</ReactMarkdown>

        {frontmatter.date && (
          <div className="border-t pt-4 text-gray-500 text-sm">
            Last updated:{" "}
            {new Date(frontmatter.date).toLocaleDateString("en-GB")}
          </div>
        )}
      </div>
    );
  } catch (error) {
    // Log error server-side (detailed)
    // biome-ignore lint/suspicious/noConsole: logs are only on server-side
    console.error("[BlogPostPage] Error rendering:", {
      slug,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    // Show generic 404 to user (no information disclosure)
    notFound();
  }
}
