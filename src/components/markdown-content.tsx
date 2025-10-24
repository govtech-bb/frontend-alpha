/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import { format } from "date-fns";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography } from "@/components/ui/typography";
import { MigrationBanner } from "./migration-banner";

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
      ? "underline"
      : "text-teal-dark underline leading-[150%]";

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
    <div className="mx-4 my-6 overflow-x-auto sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table
          className="min-w-full divide-y divide-gray-300 border border-gray-300"
          {...props}
        />
      </div>
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
      className="px-3 py-3 text-left font-semibold text-gray-900 text-xs sm:px-6 sm:text-sm"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td
      className="px-3 py-4 text-gray-700 text-xs sm:px-6 sm:text-sm"
      {...props}
    />
  ),
};

export const MarkdownContent = ({
  markdown,
}: {
  markdown: {
    frontmatter: {
      [key: string]: any;
    };
    content: string;
  };
}) => {
  const { frontmatter, content } = markdown;
  return (
    <div className="space-y-4 pb-8">
      <div className="space-y-4 pb-4">
        {frontmatter.title && (
          <Typography variant="h1">{frontmatter.title}</Typography>
        )}
        <MigrationBanner pageURL={frontmatter.source_url} />
        {frontmatter.publish_date && (
          <div className="border-gray-200 border-b-4 pb-4 text-gray-500">
            Content migrated on{" "}
            {format(new Date(frontmatter.publish_date), "PPP")}
          </div>
        )}
      </div>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
