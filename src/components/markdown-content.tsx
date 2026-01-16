/** biome-ignore-all lint/suspicious/noExplicitAny: Using any to avoid multiple complex types for each html tag */

import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHideStartLinks from "@/lib/rehype-hide-start-links";
import rehypeSectionise from "@/lib/rehype-sectionise";
import { ClearSession } from "./clear-session";
import { MigrationBanner } from "./migration-banner";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

// Custom components for react-markdown
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
  li: ({ children, ...props }: ListItemProps) => (
    <li className="space-y-s" {...props}>
      {children}
    </li>
  ),
  hr: (props: any) => <hr className="my-8 border border-gray-100" {...props} />,
  pre: (props: any) => (
    <pre className="overflow-x-auto whitespace-pre-wrap" {...props} />
  ),
  a: ({
    href,
    children,
    "data-start-link": isStartLink,
    ...props
  }: AnchorProps & { [key: string]: any }) => {
    const isRouteLink = href?.startsWith("/");
    const isExternal = !(href?.startsWith("/") || href?.startsWith("#"));

    if (isStartLink !== undefined) {
      return (
        <LinkButton href={href as string} {...props}>
          {children}
        </LinkButton>
      );
    }

    return (
      <Link
        as={isRouteLink ? NextLink : "a"}
        external={isExternal}
        href={href as string}
        {...props}
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
    <div className="my-s overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full" {...props} />
      </div>
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-blue-10" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="bg-white" {...props} />,
  tr: ({ node, ...props }) => <tr {...props} />,
  th: ({ node, ...props }) => (
    <th
      className="px-xs py-s text-left font-bold text-caption text-mid-grey-00"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td className="px-xs py-s text-black text-caption" {...props} />
  ),
};

type MarkdownContentProps = {
  markdown: {
    frontmatter: {
      [key: string]: any;
    };
    content: string;
    slug?: string[];
  };
  hasResearchAccess?: boolean;
};

export const MarkdownContent = ({
  markdown,
  hasResearchAccess = false,
}: MarkdownContentProps) => {
  const { frontmatter, content } = markdown;
  // Check if this is the register-a-birth start page
  // Check if slug includes both "register-a-birth" and "start", or check content for unique text
  const isStartPage =
    (markdown.slug &&
      Array.isArray(markdown.slug) &&
      markdown.slug.includes("register-a-birth") &&
      markdown.slug.includes("start")) ||
    (content.includes("register a stillbirth") &&
      content.includes("There is a separate form if you need to"));

  return (
    <div className="mb-xm lg:grid lg:grid-cols-3 lg:gap-16">
      {isStartPage && <ClearSession />}
      <div className="space-y-6 lg:col-span-2 lg:space-y-8">
        <div className="space-y-4 lg:space-y-6">
          {frontmatter.title && (
            <Heading as="h1" className="break-anywhere">
              {frontmatter.title}
            </Heading>
          )}

          {frontmatter.source_url && (
            <MigrationBanner pageURL={frontmatter.source_url} />
          )}

          {frontmatter.publish_date && (
            <div className="border-blue-10 border-b-4 pb-4 text-mid-grey-00">
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
          rehypePlugins={[
            rehypeRaw,
            [rehypeHideStartLinks, { hasResearchAccess }],
            rehypeSectionise,
          ]}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
