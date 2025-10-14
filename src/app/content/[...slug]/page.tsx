/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/constants/data";
import { getMarkdownContent } from "@/lib/markdown";

type ContentPageProps = {
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
      <a className={linkClass} href={href} {...props}>
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

export default async function Page({ params }: ContentPageProps) {
  const { slug } = await params;

  if (slug.length === 1) {
    const [categorySlug] = slug;
    const category = SERVICE_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );

    if (!category) {
      return notFound();
    }

    return (
      <div className="space-y-4 px-4 pb-8">
        <div className="space-y-4 pb-4">
          <Typography variant="h1">{category.title}</Typography>

          {category.description
            ?.split("\n")
            .map((line: string, _index: number) => (
              <Typography key={_index} variant="paragraph">
                {line}
              </Typography>
            ))}

          <div className="flex flex-col">
            {category.pages.map((service) => (
              <div
                className="my-2 border-gray-200 border-b-2 pb-4 last:border-0"
                key={service.title}
              >
                <Link
                  className="cursor-pointer font-normal text-[#1E787D] text-[20px] leading-[150%] underline underline-offset-2"
                  href={`/content/${categorySlug}/${service.slug}`} // TODO update link when pages are ready
                >
                  {service.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (slug.length > 1) {
    const [categorySlug, pageSlug] = slug;

    const category = SERVICE_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );
    if (!category) {
      notFound();
    }

    const page = category.pages.find((p) => p.slug === pageSlug);
    if (!page) {
      notFound();
    }

    const markdownContent = await getMarkdownContent([pageSlug]);
    // console.log(markdownContent);

    if (!markdownContent) {
      notFound();
    }

    const { frontmatter, content } = markdownContent;

    return (
      <div className="space-y-4 px-4 pb-8">
        <div className="space-y-4 pb-4">
          {frontmatter.title && (
            <Typography variant="h1">{frontmatter.title}</Typography>
          )}
        </div>
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </div>
    );

    // return notFound();
  }

  return notFound();
}
