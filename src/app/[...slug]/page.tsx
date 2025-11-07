import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import { getMarkdownContent } from "@/lib/markdown";

type ContentPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: ContentPageProps) {
  const { slug } = await params;

  //For a single slug, check if there's a matching category or a matching markdown file
  if (slug.length === 1) {
    const [categorySlug] = slug;
    const category = SERVICE_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );
    // If category is not found
    if (!category) {
      const markdownContent = await getMarkdownContent([categorySlug]);
      // If markdown content is not found
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
    if (!markdownContent) {
      notFound();
    }

    return <MarkdownContent markdown={markdownContent} />;
  }

  return notFound();
}

export async function generateMetadata({ params }: ContentPageProps) {
  const { slug } = await params;

  // Determine which slug to use for content lookup
  const contentSlug = slug.length > 1 ? [slug[1]] : slug;
  const result = await getMarkdownContent(contentSlug);

  if (result) {
    return {
      title: result.frontmatter.title || "The Government of Barbados",
      description:
        result.frontmatter.description ||
        "The best place to access official government services",
    };
  }

  if (slug.length === 1) {
    // Handle category fallback (only for single-slug case)
    const category = SERVICE_CATEGORIES.find((cat) => cat.slug === slug[0]);
    if (category) {
      return {
        title: category.title,
        description: category.description || "",
      };
    }
  }

  // Default fallback
  return {
    title: "Page not found",
  };
}
