import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { DynamicFormLoader } from "@/components/dynamic-form-loader";
import { MarkdownContent } from "@/components/markdown-content";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import { getMarkdownContent } from "@/lib/markdown";

type ContentPageProps = {
  params: Promise<{ slug: string[] }>;
};

function extractHeadings(content: string) {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { id: string; text: string }[] = [];

  let match = headingRegex.exec(content);
  while (match !== null) {
    const text = match[1];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text });
    match = headingRegex.exec(content);
  }

  return headings;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export default async function Page({ params }: ContentPageProps) {
  const { slug } = await params;

  // Single slug: Category page or standalone markdown
  if (slug.length === 1) {
    const [categorySlug] = slug;
    const category = SERVICE_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );

    if (!category) {
      const markdownContent = await getMarkdownContent([categorySlug]);
      if (!markdownContent) {
        notFound();
      }
      return <MarkdownContent markdown={markdownContent} />;
    }

    return (
      <>
        <Typography variant="h1">{category.title}</Typography>
        {category.description
          ?.split("\n")
          .map((line: string, _index: number) => (
            <p className="text-[20px] leading-normal" key={_index}>
              {line}
            </p>
          ))}
        <div className="flex flex-col divide-y-2 divide-neutral-grey last:border-neutral-grey last:border-b-2">
          {category.pages.map((service) => (
            <div
              className="py-4 first:pt-4 lg:py-8 first:lg:pt-8"
              key={service.title}
            >
              <Link
                as={NextLink}
                className="cursor-pointer text-[20px] leading-normal lg:text-3xl"
                href={`/${categorySlug}/${service.slug}`}
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  }

  // Two slugs: Main service page
  if (slug.length === 2) {
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
    if (!markdownContent) {
      notFound();
    }

    // Extract table of contents from markdown
    const tableOfContents = extractHeadings(markdownContent.content);

    return (
      <div className="lg:grid lg:grid-cols-3 lg:gap-16">
        <div className="space-y-6 lg:col-span-2 lg:space-y-8">
          <MarkdownContent markdown={markdownContent} />
        </div>

        {tableOfContents.length > 0 && (
          <div className="hidden lg:col-span-1 lg:block lg:pt-16">
            <nav className="sticky top-8">
              <h3 className="mb-4 font-bold text-[24px] leading-[1.25]">
                On this page
              </h3>
              <ul className="space-y-4 text-[20px] leading-[1.7]">
                {tableOfContents.map((heading) => (
                  <li key={heading.id}>
                    <Link as={NextLink} href={`#${heading.id}`}>
                      {heading.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }

  // Three slugs: Sub-pages (start, form, etc.)
  if (slug.length === 3) {
    const [categorySlug, pageSlug, subPageSlug] = slug;

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

    // Handle form pages (JSX components)
    if (subPageSlug === "form") {
      // Dynamically import the form component based on the page slug
      return <DynamicFormLoader formSlug={pageSlug} />;
    }

    // Handle other sub-pages (markdown)
    const markdownContent = await getMarkdownContent([pageSlug, subPageSlug]);
    if (!markdownContent) {
      notFound();
    }

    return <MarkdownContent markdown={markdownContent} />;
  }

  return notFound();
}

export async function generateMetadata({ params }: ContentPageProps) {
  const { slug } = await params;

  // For sub-pages (3 slugs)
  if (slug.length === 3) {
    const [, pageSlug, subPageSlug] = slug;
    const result = await getMarkdownContent([pageSlug, subPageSlug]);

    if (result) {
      return {
        title: result.frontmatter.title || "The Government of Barbados",
        description:
          result.frontmatter.description ||
          "The best place to access official government services",
      };
    }
  }

  // For main pages (2 slugs)
  if (slug.length === 2) {
    const contentSlug = [slug[1]];
    const result = await getMarkdownContent(contentSlug);

    if (result) {
      return {
        title: result.frontmatter.title || "The Government of Barbados",
        description:
          result.frontmatter.description ||
          "The best place to access official government services",
      };
    }
  }

  // For categories (1 slug)
  if (slug.length === 1) {
    const category = SERVICE_CATEGORIES.find((cat) => cat.slug === slug[0]);
    if (category) {
      return {
        title: category.title,
        description: category.description || "",
      };
    }
  }

  return {
    title: "Page not found",
  };
}
