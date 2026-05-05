import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ClearFormStorage } from "@/components/clear-form-storage";
import { DynamicFormLoader } from "@/components/dynamic-form-loader";
import { MarkdownContent } from "@/components/markdown-content";
import { PageViewTracker } from "@/components/page-view-tracker";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { getFormStorageKey } from "@/lib/form-registry";
import { getMarkdownContent } from "@/lib/markdown";
import { hasResearchAccess } from "@/lib/research-access";
import {
  fetchServiceConfig,
  hasProtectedSubpages,
  isServiceProtected,
  isSubpageProtected,
} from "@/lib/service-access-api";
import { SITE_URL } from "@/lib/site-url";
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
      <>
        <Heading as="h1">{category.title}</Heading>
        {category.description
          ?.split("\n")
          .map((line: string, index: number) => (
            <Text as="p" key={index}>
              {line}
            </Text>
          ))}
        <div className="flex flex-col divide-y-2 divide-grey-00 last:border-grey-00 last:border-b-2">
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

    const serviceConfig = await fetchServiceConfig(pageSlug);

    // Hide the start-link CTA when the service itself is flagged OR when
    // any subpage (start/form) is flagged — but the entry page still renders.
    const startLinkHidden =
      isServiceProtected(serviceConfig) || hasProtectedSubpages(serviceConfig);

    const hasAccess = startLinkHidden ? await hasResearchAccess() : true;

    const markdownContent = await getMarkdownContent([pageSlug]);
    if (!markdownContent) {
      notFound();
    }

    return (
      <>
        <PageViewTracker
          category={categorySlug}
          event="page-service-view"
          form={pageSlug}
        />
        <MarkdownContent
          hasResearchAccess={hasAccess}
          markdown={markdownContent}
        />
      </>
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

    const serviceConfig = await fetchServiceConfig(pageSlug);

    // Block a subpage when it is individually flagged OR the whole service is flagged
    const subpageFlagged =
      isServiceProtected(serviceConfig) ||
      isSubpageProtected(serviceConfig, subPageSlug);

    let hasAccess = true;
    if (subpageFlagged) {
      hasAccess = await hasResearchAccess();
      if (!hasAccess) {
        notFound();
      }
    }

    // Handle form pages (JSX components)
    if (subPageSlug === "form") {
      return <DynamicFormLoader formSlug={pageSlug} />;
    }

    // Handle other sub-pages (markdown)
    const markdownContent = await getMarkdownContent([pageSlug, subPageSlug]);
    if (!markdownContent) {
      notFound();
    }

    // Clear form storage when visiting the /start page for a fresh form experience
    const storageKey =
      subPageSlug === "start" ? getFormStorageKey(pageSlug) : undefined;

    return (
      <>
        {storageKey && <ClearFormStorage storageKey={storageKey} />}
        {subPageSlug === "start" && (
          <PageViewTracker
            category={categorySlug}
            event="page-start-view"
            form={pageSlug}
          />
        )}
        <MarkdownContent
          hasResearchAccess={hasAccess}
          markdown={markdownContent}
        />
      </>
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

    if (page) {
      const serviceConfig = await fetchServiceConfig(pageSlug);
      const subpageFlagged =
        isServiceProtected(serviceConfig) ||
        isSubpageProtected(serviceConfig, subPageSlug);

      if (subpageFlagged) {
        const hasAccess = await hasResearchAccess();
        if (!hasAccess) {
          return { title: "Page not found" };
        }
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
        alternates: { canonical: `${SITE_URL}/${slug.join("/")}` },
        openGraph: {
          title: subPageTitle,
          url: `${SITE_URL}/${slug.join("/")}`,
        },
        twitter: { title: subPageTitle },
      };
    }
    const result = await getMarkdownContent([pageSlug, subPageSlug]);

    if (result) {
      return {
        title: result.frontmatter.title,
        description: result.frontmatter.description,
        alternates: { canonical: `${SITE_URL}/${slug.join("/")}` },
        openGraph: {
          title: result.frontmatter.title,
          description: result.frontmatter.description,
          url: `${SITE_URL}/${slug.join("/")}`,
        },
        twitter: {
          title: result.frontmatter.title,
          description: result.frontmatter.description,
        },
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
        alternates: { canonical: `${SITE_URL}/${slug.join("/")}` },
        openGraph: {
          title: result.frontmatter.title,
          description: result.frontmatter.description,
          url: `${SITE_URL}/${slug.join("/")}`,
        },
        twitter: {
          title: result.frontmatter.title,
          description: result.frontmatter.description,
        },
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
        alternates: { canonical: `${SITE_URL}/${slug.join("/")}` },
        openGraph: {
          title: category.title,
          description: category.description || "",
          url: `${SITE_URL}/${slug.join("/")}`,
        },
        twitter: {
          title: category.title,
          description: category.description || "",
        },
      };
    }
  }

  return {
    title: "Page not found",
  };
}
