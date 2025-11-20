/** biome-ignore-all lint/suspicious/noExplicitAny: Using any to avoid multiple complex types for each html tag */

import { Heading, Link, Text } from "@govtech-bb/react";
import { format, parseISO } from "date-fns";
import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSectionize from "@/lib/rehype-sectionize";
import { MigrationBanner } from "./migration-banner";
import { StageBanner } from "./stage-banner";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components: Components = {
  h1: ({ children, ...props }: HeadingProps) => (
    <Heading as="h1" {...props}>
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <Heading as="h2" {...props}>
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <Heading as="h3" {...props}>
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <Heading as="h4" {...props}>
      {children}
    </Heading>
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <Text as="p" size="body" {...props}>
      {children}
    </Text>
  ),
  ul: ({ children, ...props }: ListProps) => (
    <ul className="list-disc pl-7" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ListProps) => (
    <ol className="list-decimal space-y-4 pl-7" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ListItemProps) => <li {...props}>{children}</li>,
  hr: (props: any) => <hr className="my-8 border border-gray-100" {...props} />,
  a: ({ href, children, target, ...props }: AnchorProps) => {
    // Check if link starts with # (internal link) to determine if it's likely in a list
    const isInternalLink = href?.startsWith("#");
    const linkClass = isInternalLink
      ? "underline"
      : "text-teal-dark underline leading-normal";

    return (
      <Link
        className={linkClass}
        href={href as string}
        {...props}
        target={target || "_blank"}
      >
        {children}
      </Link>
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-gray-300 border-l-3 pl-4 text-gray-700 dark:border-zinc-400 dark:text-zinc-400"
      {...props}
    />
  ),
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
    <div className="lg:grid lg:grid-cols-3 lg:gap-16">
      <div className="space-y-6 lg:col-span-2 lg:space-y-8">
        <div className="space-y-4 lg:space-y-6">
          {frontmatter.title && <Heading as="h1">{frontmatter.title}</Heading>}

          {frontmatter.stage?.length > 0 ? (
            <StageBanner stage={frontmatter.stage} />
          ) : null}
          {frontmatter.source_url ? (
            <MigrationBanner pageURL={frontmatter.source_url} />
          ) : null}
          {frontmatter.publish_date && (
            <div className="border-blue-10 border-b-4 pb-3 text-neutral-midgrey">
              <Text as="p" size="caption">
                Last updated on{" "}
                {format(
                  parseISO(
                    frontmatter.publish_date.toISOString().split("T")[0]
                  ),
                  "PPP"
                )}
              </Text>
            </div>
          )}
        </div>
        <ReactMarkdown
          components={components}
          rehypePlugins={[rehypeRaw, rehypeSectionize]}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
