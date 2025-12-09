import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { Components } from "react-markdown";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components: Components = {
  h1: ({ children, ...props }: HeadingProps) => (
    <Heading as="h1" className="mt-8 mb-4" {...props}>
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <Heading as="h2" className="mt-8 mb-4" {...props}>
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <Heading as="h3" className="mt-8 mb-4" {...props}>
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <Heading as="h4" className="mt-8 mb-4" {...props}>
      {children}
    </Heading>
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <Text as="p" size="body" {...props}>
      {children}
    </Text>
  ),
  ol: (props: ListProps) => (
    <ol className="mb-4 list-decimal pl-6 text-[20px]" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="mb-4 list-disc pl-6 text-[20px]" {...props} />
  ),
  li: (props: ListItemProps) => <li className="mb-2" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-8 border border-gray-100" {...props} />
  ),
  a: ({ node, href, children, ...props }: AnchorProps & { node?: unknown }) => {
    const isRouteLink = href?.startsWith("/");
    const isExternal = !(href?.startsWith("/") || href?.startsWith("#"));

    return (
      <Link
        as={isRouteLink ? NextLink : "a"}
        href={href as string}
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        {...props}
      >
        {children}
      </Link>
    );
  },
  // code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
  //   const codeHTML = highlight(children as string);
  //   return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  // },
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
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-gray-300 border-l-3 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
