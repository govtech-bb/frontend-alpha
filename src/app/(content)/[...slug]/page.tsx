import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClearFormStorage } from "@/components/clear-form-storage";
import { DynamicFormLoader } from "@/components/dynamic-form-loader";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MarkdownContent } from "@/components/markdown-content";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { PageViewTracker } from "@/components/page-view-tracker";
import { YouthOpportunityForm } from "@/components/youth-opportunity-form/youth-opportunity-form";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import opportunitiesData from "@/data/opportunities.json";
import { getFormStorageKey } from "@/lib/form-registry";
import { getMarkdownContent } from "@/lib/markdown";
import { hasResearchAccess } from "@/lib/research-access";
import { SITE_URL } from "@/lib/site-url";
import { findSubPageTitleFromPath } from "@/lib/utils";
import {
  getYouthOpportunityNotificationCc,
  getYouthOpportunityNotificationEmail,
} from "@/lib/youth-opportunity-notification";
import type { Opportunity } from "@/types/opportunity";

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

    const researchAccess = await hasResearchAccess();
    const visiblePages = category.pages.filter(
      (p) => !p.protected || researchAccess
    );

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

    // Subcategory index for youth-and-community: derive opportunities from
    // opportunities.json, matching on `opportunity.subcategory === pageSlug`.
    if (categorySlug === "youth-and-community") {
      const subcategoryOpportunities = opportunities.filter(
        (opp) => opp.subcategory === pageSlug
      );
      return (
        <>
          <Heading as="h1">{page.title}</Heading>
          {page.description && <Text as="p">{page.description}</Text>}
          <div className="flex flex-col divide-y-2 divide-grey-00 last:border-grey-00 last:border-b-2">
            {subcategoryOpportunities.map((opp) => (
              <div
                className="py-4 first:pt-4 lg:py-8 first:lg:pt-8"
                key={opp.id}
              >
                <Link
                  as={NextLink}
                  className="cursor-pointer text-[20px] leading-normal lg:text-3xl"
                  href={`/${categorySlug}/${pageSlug}/${opp.id}`}
                >
                  {opp.title}
                </Link>
              </div>
            ))}
          </div>
        </>
      );
    }

    const researchAccess = await hasResearchAccess();
    if (page.protected && !researchAccess) {
      notFound();
    }

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
          hasResearchAccess={!page.protected || researchAccess}
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

    // Opportunity detail under a youth-and-community subcategory: third slug
    // is the opportunity id, and the opportunity's subcategory must match.
    if (categorySlug === "youth-and-community") {
      const opportunity = opportunities.find(
        (opp) => opp.id === subPageSlug && opp.subcategory === pageSlug
      );
      if (!opportunity) {
        notFound();
      }
      return (
        <>
          <ClearFormStorage
            storageKey={`youth-opportunity-${opportunity.id}`}
          />
          <OpportunityDetail
            applyHref={`/${categorySlug}/${pageSlug}/${subPageSlug}/form`}
            opportunity={opportunity}
          />
        </>
      );
    }

    const subPage = page.subPages?.find((sp) => sp.slug === subPageSlug);
    const isProtected = page.protected || subPage?.protected;

    const researchAccess = await hasResearchAccess();
    if (isProtected && !researchAccess) {
      notFound();
    }

    // Handle form pages (JSX components)
    if (subPageSlug === "form") {
      return (
        <DynamicFormLoader
          formSlug={pageSlug}
          notificationCc="testing@govtech.bb"
          notificationEmail="shannon.clarke@govtech.bb"
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
          hasResearchAccess={!isProtected || researchAccess}
          markdown={markdownContent}
        />
      </>
    );
  }

  // Four slugs: Opportunity application form under a youth-and-community subcategory
  if (slug.length === 4) {
    const [categorySlug, pageSlug, opportunitySlug, leafSlug] = slug;
    if (leafSlug !== "form" || categorySlug !== "youth-and-community") {
      notFound();
    }

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

    const opportunity = opportunities.find(
      (opp) => opp.id === opportunitySlug && opp.subcategory === pageSlug
    );
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
            notificationCc={getYouthOpportunityNotificationCc(opportunity)}
            notificationEmail={getYouthOpportunityNotificationEmail(
              opportunity
            )}
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
  if (
    slug.length === 4 &&
    slug[3] === "form" &&
    slug[0] === "youth-and-community"
  ) {
    const [, pageSlug, opportunitySlug] = slug;
    const opportunity = opportunities.find(
      (opp) => opp.id === opportunitySlug && opp.subcategory === pageSlug
    );
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

    // Opportunity detail under a youth-and-community subcategory
    if (page && categorySlug === "youth-and-community") {
      const opportunity = opportunities.find(
        (opp) => opp.id === subPageSlug && opp.subcategory === pageSlug
      );
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
      const subPage = page.subPages?.find((sp) => sp.slug === subPageSlug);
      const isProtected = page.protected || subPage?.protected;
      if (isProtected) {
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
    if (page && categorySlug === "youth-and-community") {
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
