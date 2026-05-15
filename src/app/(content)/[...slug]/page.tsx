import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Opportunity } from "@/app/youth/opportunities/_components/opportunities-list";
import { YouthOpportunityForm } from "@/app/youth/opportunities/[id]/form/_components/youth-opportunity-form";
import { ClearFormStorage } from "@/components/clear-form-storage";
import { DynamicFormLoader } from "@/components/dynamic-form-loader";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MarkdownContent } from "@/components/markdown-content";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { PageViewTracker } from "@/components/page-view-tracker";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import opportunitiesData from "@/data/opportunities.json";
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

const opportunities = opportunitiesData as Opportunity[];

interface ContentPageProps {
  params: Promise<{ slug: string[] }>;
}

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
                href={service.href ?? `/${categorySlug}/${service.slug}`}
              >
                {service.title}
              </Link>
            </div>
          ))}
          {category.crossLinks?.map((link) => (
            <div
              className="py-4 first:pt-4 lg:py-8 first:lg:pt-8"
              key={link.href}
            >
              <Link
                as={NextLink}
                className="cursor-pointer text-[20px] leading-normal lg:text-3xl"
                href={link.href}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  }

  // Two slugs: Main service page OR subcategory index
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

    // Subcategory index: render the nested pages as clickable tiles
    if (page.pages && page.pages.length > 0) {
      return (
        <>
          <Heading as="h1">{page.title}</Heading>
          {page.description && <Text as="p">{page.description}</Text>}
          <div className="flex flex-col divide-y-2 divide-grey-00 last:border-grey-00 last:border-b-2">
            {page.pages.map((child) => (
              <div
                className="py-4 first:pt-4 lg:py-8 first:lg:pt-8"
                key={child.slug}
              >
                <Link
                  as={NextLink}
                  className="cursor-pointer text-[20px] leading-normal lg:text-3xl"
                  href={`/${categorySlug}/${pageSlug}/${child.slug}`}
                >
                  {child.title}
                </Link>
              </div>
            ))}
          </div>
        </>
      );
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

  // Three slugs: Sub-pages (start, form, etc.) OR opportunity detail under a subcategory
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

    // Opportunity detail under a subcategory: third slug is the opportunity id
    if (page.pages && page.pages.length > 0) {
      const childPage = page.pages.find((p) => p.slug === subPageSlug);
      if (!childPage) {
        notFound();
      }
      const opportunity = opportunities.find((opp) => opp.id === subPageSlug);
      if (!opportunity) {
        notFound();
      }
      return (
        <OpportunityDetail
          applyHref={`/${categorySlug}/${pageSlug}/${subPageSlug}/form`}
          opportunity={opportunity}
        />
      );
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
      return (
        <DynamicFormLoader
          formSlug={pageSlug}
          notificationCc={process.env.TEST_NOTIFICATION_EMAIL_COPY ?? null}
          notificationEmail={process.env.TEST_NOTIFICATION_EMAIL ?? null}
        />
      );
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

  // Four slugs: Opportunity application form under a subcategory
  if (slug.length === 4) {
    const [categorySlug, pageSlug, opportunitySlug, leafSlug] = slug;
    if (leafSlug !== "form") {
      notFound();
    }

    const category = INFORMATION_ARCHITECTURE.find(
      (cat) => cat.slug === categorySlug
    );
    if (!category) {
      notFound();
    }

    const page = category.pages.find((p) => p.slug === pageSlug);
    if (!page?.pages || page.pages.length === 0) {
      notFound();
    }

    const childPage = page.pages.find((p) => p.slug === opportunitySlug);
    if (!childPage) {
      notFound();
    }

    const opportunity = opportunities.find((opp) => opp.id === opportunitySlug);
    if (!opportunity) {
      notFound();
    }

    return (
      <>
        <div className="container py-4 lg:py-6">
          <Breadcrumbs />
        </div>
        <Suspense
          fallback={
            <div className="container py-8 lg:py-16">
              <FormSkeleton />
            </div>
          }
        >
          <YouthOpportunityForm
            notificationCc={process.env.TEST_NOTIFICATION_EMAIL_COPY ?? null}
            notificationEmail={
              process.env.TEST_NOTIFICATION_EMAIL ??
              opportunity.contact?.email ??
              null
            }
            opportunityId={opportunity.id}
            opportunityTitle={opportunity.title}
          />
        </Suspense>
      </>
    );
  }

  return notFound();
}

export async function generateMetadata({ params }: ContentPageProps) {
  const { slug } = await params;

  // Opportunity application form (4 slugs)
  if (slug.length === 4 && slug[3] === "form") {
    const [, , opportunitySlug] = slug;
    const opportunity = opportunities.find((opp) => opp.id === opportunitySlug);
    if (opportunity) {
      const title = `Apply for ${opportunity.title}`;
      const description = `Apply for ${opportunity.title}. ${opportunity.description}`;
      const canonical = `${SITE_URL}/${slug.join("/")}`;
      return {
        title,
        description,
        alternates: { canonical },
        openGraph: { title, description, url: canonical },
      };
    }
    return { title: "Apply" };
  }

  // For sub-pages (3 slugs)
  if (slug.length === 3) {
    const [categorySlug, pageSlug, subPageSlug] = slug;

    const category = INFORMATION_ARCHITECTURE.find(
      (cat) => cat.slug === categorySlug
    );
    const page = category?.pages.find((p) => p.slug === pageSlug);

    // Opportunity detail under a subcategory
    if (page?.pages && page.pages.length > 0) {
      const opportunity = opportunities.find((opp) => opp.id === subPageSlug);
      if (opportunity) {
        const canonical = `${SITE_URL}/${slug.join("/")}`;
        return {
          title: opportunity.title,
          description: opportunity.description,
          alternates: { canonical },
          openGraph: {
            title: opportunity.title,
            description: opportunity.description,
            url: canonical,
            images: [
              {
                url: `${SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Government of Barbados",
              },
            ],
          },
          twitter: {
            title: opportunity.title,
            description: opportunity.description,
            images: [`${SITE_URL}/og-image.png`],
          },
        };
      }
      return { title: "Page not found" };
    }

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
          images: [
            {
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: "Government of Barbados",
            },
          ],
        },
        twitter: { title: subPageTitle, images: [`${SITE_URL}/og-image.png`] },
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
          images: [
            {
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: "Government of Barbados",
            },
          ],
        },
        twitter: {
          title: result.frontmatter.title,
          description: result.frontmatter.description,
          images: [`${SITE_URL}/og-image.png`],
        },
      };
    }
  }

  // For main pages (2 slugs)
  if (slug.length === 2) {
    const [categorySlug, pageSlug] = slug;
    const category = INFORMATION_ARCHITECTURE.find(
      (cat) => cat.slug === categorySlug
    );
    const page = category?.pages.find((p) => p.slug === pageSlug);

    // Subcategory index — no markdown, use the page's own metadata
    if (page?.pages && page.pages.length > 0) {
      const canonical = `${SITE_URL}/${slug.join("/")}`;
      const description = page.description || "";
      return {
        title: page.title,
        description,
        alternates: { canonical },
        openGraph: {
          title: page.title,
          description,
          url: canonical,
          images: [
            {
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: "Government of Barbados",
            },
          ],
        },
        twitter: {
          title: page.title,
          description,
          images: [`${SITE_URL}/og-image.png`],
        },
      };
    }

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
          images: [
            {
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: "Government of Barbados",
            },
          ],
        },
        twitter: {
          title: result.frontmatter.title,
          description: result.frontmatter.description,
          images: [`${SITE_URL}/og-image.png`],
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
          images: [
            {
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
              alt: "Government of Barbados",
            },
          ],
        },
        twitter: {
          title: category.title,
          description: category.description || "",
          images: [`${SITE_URL}/og-image.png`],
        },
      };
    }
  }

  return {
    title: "Page not found",
  };
}
