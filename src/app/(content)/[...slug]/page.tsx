import { Heading, Text } from "@govtech-bb/react";
import { notFound } from "next/navigation";
import { DynamicFormLoader } from "@/components/dynamic-form-loader";
import { MarkdownContent } from "@/components/markdown-content";
import { SignpostBlock } from "@/components/ui/signpost-block";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { getMarkdownContent } from "@/lib/markdown";
import { hasResearchAccess, isProtectedSubpage } from "@/lib/research-access";
import { findSubPageTitleFromPath } from "@/lib/utils";

type ContentPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: ContentPageProps) {
  const { slug } = await params;

  // Single slug: Category page or standalone markdown
  if (slug.length === 1) {
    const [categorySlug] = slug;
    const category = INFORMATION_ARCHITECTURE.find(
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
      <div className="flex flex-col gap-xm">
        <div className="flex flex-col gap-xs">
          <Heading as="h1">{category.title}</Heading>
          {category.description
            ?.split("\n")
            .map((line: string, index: number) => (
              <Text as="p" key={index}>
                {line}
              </Text>
            ))}
        </div>

        <div className="flex flex-col">
          {category.pages.map((service) => (
            <SignpostBlock
              href={`/${categorySlug}/${service.slug}`}
              key={service.slug}
              title={service.title}
            />
          ))}
        </div>
      </div>
    );
  }

  // Two slugs: Main service page
  if (slug.length === 2) {
    const [categorySlug, pageSlug] = slug;

    const category = INFORMATION_ARCHITECTURE.find(
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

    // Check if user has research access cookie to show/hide start page links
    const hasAccess = await hasResearchAccess();

    return (
      <MarkdownContent
        hasResearchAccess={hasAccess}
        markdown={markdownContent}
      />
    );
  }

  // Three slugs: Sub-pages (start, form, etc.)
  if (slug.length === 3) {
    const [categorySlug, pageSlug, subPageSlug] = slug;

    const category = INFORMATION_ARCHITECTURE.find(
      (cat) => cat.slug === categorySlug
    );
    if (!category) {
      notFound();
    }

    const page = category.pages.find((p) => p.slug === pageSlug);
    if (!page) {
      notFound();
    }

    // Check research access once for both protected pages and hiding start links
    const hasAccess = await hasResearchAccess();

    // Protected subpages require research access
    if (isProtectedSubpage(page, subPageSlug) && !hasAccess) {
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

    return (
      <MarkdownContent
        hasResearchAccess={hasAccess}
        markdown={markdownContent}
      />
    );
  }

  return notFound();
}

export async function generateMetadata({ params }: ContentPageProps) {
  const { slug } = await params;

  // For sub-pages (3 slugs)
  if (slug.length === 3) {
    const [categorySlug, pageSlug, subPageSlug] = slug;

    const category = INFORMATION_ARCHITECTURE.find(
      (cat) => cat.slug === categorySlug
    );
    const page = category?.pages.find((p) => p.slug === pageSlug);

    // Protected subpages return generic 404 metadata if no access
    if (page && isProtectedSubpage(page, subPageSlug)) {
      const hasAccess = await hasResearchAccess();
      if (!hasAccess) {
        return { title: "Page not found" };
      }
    }

    if (subPageSlug === "form") {
      const subPageTitle = findSubPageTitleFromPath(
        INFORMATION_ARCHITECTURE,
        slug.join("/")
      );
      return {
        title: subPageTitle,
        description: "",
      };
    }
    const result = await getMarkdownContent([pageSlug, subPageSlug]);

    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  // For main pages (2 slugs)
  if (slug.length === 2) {
    const contentSlug = [slug[1]];
    const result = await getMarkdownContent(contentSlug);

    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
      };
    }
  }

  // For categories (1 slug)
  if (slug.length === 1) {
    const category = INFORMATION_ARCHITECTURE.find(
      (cat) => cat.slug === slug[0]
    );
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
