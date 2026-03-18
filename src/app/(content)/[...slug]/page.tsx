import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { ClearFormStorage } from "@/components/clear-form-storage";
import { DynamicFormLoader } from "@/components/dynamic-form-loader";
import { MarkdownContent } from "@/components/markdown-content";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { getFormStorageKey } from "@/lib/form-registry";
import { getMarkdownContent } from "@/lib/markdown";
import { hasResearchAccess } from "@/lib/research-access";
import {
  fetchAllServiceAccess,
  fetchServiceConfig,
  hasProtectedSubpages,
  isSubpageProtected,
} from "@/lib/service-access-api";
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

    const userHasAccess = await hasResearchAccess();
    let visiblePages = category.pages;

    if (!userHasAccess) {
      // Only fetch from the API when needed — skip the call for users with access
      const allServiceAccess = await fetchAllServiceAccess();
      visiblePages = category.pages.filter(
        (page) => !allServiceAccess.get(page.slug)?.isProtected
      );
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
          {visiblePages.map((service) => (
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
    const serviceIsProtected = serviceConfig?.isProtected ?? false;
    const serviceHasProtectedSubpages = hasProtectedSubpages(serviceConfig);

    // Check access when the service itself or any of its subpages are protected
    const needsAccess = serviceIsProtected || serviceHasProtectedSubpages;
    const hasAccess = needsAccess ? await hasResearchAccess() : true;

    // Block the service entry page when service-level protection is set
    if (serviceIsProtected && !hasAccess) {
      notFound();
    }

    const markdownContent = await getMarkdownContent([pageSlug]);
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
    const subpageIsProtected = isSubpageProtected(serviceConfig, subPageSlug);
    const hasAccess = subpageIsProtected ? await hasResearchAccess() : true;

    if (subpageIsProtected && !hasAccess) {
      notFound();
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
      if (isSubpageProtected(serviceConfig, subPageSlug)) {
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
