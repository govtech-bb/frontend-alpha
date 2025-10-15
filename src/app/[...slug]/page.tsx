/** biome-ignore-all lint/suspicious/noExplicitAny: TODO add strict typing */
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { MigrationBanner } from "@/components/migration-banner";
import { Typography } from "@/components/ui/typography";
import { getMarkdownContent } from "@/lib/markdown";

type EntryPointPageProps = {
  params: Promise<{ slug: string[] }>;
};

// Custom components for react-markdown
const components: Components = {
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
      <a
        className={linkClass}
        href={href}
        {...props}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  },
  table: ({ node, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="min-w-full divide-y divide-gray-300 border border-gray-300"
        {...props}
      />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
  tbody: ({ node, ...props }) => (
    <tbody className="divide-y divide-gray-200 bg-white" {...props} />
  ),
  tr: ({ node, ...props }) => (
    <tr className="transition-colors hover:bg-gray-50" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th
      className="px-6 py-3 text-left font-semibold text-gray-900 text-sm"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      className="whitespace-nowrap px-6 py-4 text-gray-700 text-sm"
      {...props}
    />
  ),
};

export default async function EntryPointPage({ params }: EntryPointPageProps) {
  const { slug } = await params;
  const result = await getMarkdownContent(slug);

  if (!result) {
    notFound();
  }

  const { frontmatter, content } = result;

  return (
    <div className="space-y-4 px-4 pb-8">
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
          <div className="border-[#409CF8] border-r-4 border-l-4 bg-[#B3D9FF]/30 px-4 py-3">
            <Typography variant="paragraph">
              This Page is in{" "}
              <span className="capitalize underline">{frontmatter.stage}</span>.
            </Typography>
          </div>
        ) : null}

        {frontmatter.source_url.length > 0 ? (
          <MigrationBanner pageURL={frontmatter.source_url} />
        ) : null}
      </div>

      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>

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
