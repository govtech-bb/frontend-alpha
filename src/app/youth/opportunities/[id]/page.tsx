import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { StageBanner } from "@/components/stage-banner";
import opportunitiesData from "@/data/opportunities.json";
import { SITE_URL } from "@/lib/site-url";
import type { Opportunity } from "../_components/opportunities-list";

const opportunities = opportunitiesData as Opportunity[];

const CATEGORY_LABEL: Record<Opportunity["category"], string> = {
  program: "Programme",
  initiative: "Initiative",
  workshop: "Workshop",
  volunteer: "Volunteering",
  service: "Service",
};

function findOpportunity(id: string): Opportunity | undefined {
  return opportunities.find((opp) => opp.id === id);
}

function formatAgeRange(ageMin?: number, ageMax?: number): string | null {
  if (ageMin != null && ageMax != null) return `Ages ${ageMin}–${ageMax}`;
  if (ageMin != null) return `${ageMin}+ years`;
  if (ageMax != null) return `Up to ${ageMax} years`;
  return null;
}

function formatDeadline(deadline: string): string {
  const parsed = new Date(`${deadline}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return deadline;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return opportunities.map((opp) => ({ id: opp.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opportunity = findOpportunity(id);

  if (!opportunity) {
    return { title: "Opportunity not found" };
  }

  const canonical = `${SITE_URL}/youth/opportunities/${opportunity.id}`;

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

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opportunity = findOpportunity(id);

  if (!opportunity) {
    notFound();
  }

  const ageRange = formatAgeRange(
    opportunity.eligibility?.ageMin,
    opportunity.eligibility?.ageMax
  );
  const interests = opportunity.eligibility?.interests ?? [];
  const eligibilityItems = [
    ageRange,
    interests.length > 0 ? `Interest in ${interests.join(", ")}` : null,
  ].filter(Boolean) as string[];

  const metaParts = [
    CATEGORY_LABEL[opportunity.category],
    opportunity.deadline
      ? `Deadline: ${formatDeadline(opportunity.deadline)}`
      : null,
    opportunity.source,
  ].filter(Boolean) as string[];

  const applyHref = opportunity.applyUrl ?? opportunity.url;
  const applyLabel = opportunity.applyUrl ? "Apply now" : "Visit official page";

  return (
    <>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>

      <div className="container py-4 lg:py-6">
        <Breadcrumbs />
      </div>

      <div className="container pt-2 pb-8 lg:pb-12">
        <article className="max-w-2xl space-y-m">
          <header className="space-y-xs">
            <Heading as="h1">{opportunity.title}</Heading>
            <Text as="p" className="text-mid-grey-00">
              {metaParts.join(" · ")}
            </Text>
          </header>

          <section className="space-y-xs">
            <Heading as="h2">Overview</Heading>
            <Text as="p">{opportunity.description}</Text>
            {opportunity.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {opportunity.tags.map((tag) => (
                  <li
                    className="rounded bg-yellow-40 px-3 py-1 text-base text-black-00"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {eligibilityItems.length > 0 && (
            <section className="space-y-xs">
              <Heading as="h2">Who can apply</Heading>
              <ul className="list-disc space-y-xs ps-m">
                {eligibilityItems.map((item) => (
                  <li key={item}>
                    <Text as="span">{item}</Text>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {opportunity.subProgrammes &&
            opportunity.subProgrammes.length > 0 && (
              <section className="space-y-xs">
                <Heading as="h2">Sub-programmes</Heading>
                <ul className="space-y-s">
                  {opportunity.subProgrammes.map((sub) => (
                    <li
                      className="border-grey-00 border-l-4 bg-blue-10 p-s"
                      key={sub.name}
                    >
                      <Heading as="h3">{sub.name}</Heading>
                      <Text as="p">{sub.description}</Text>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          <section className="space-y-xs">
            <Heading as="h2">How to apply</Heading>
            {applyHref ? (
              <>
                <Text as="p">
                  {opportunity.applyUrl
                    ? "Complete the application on the official site to register your interest."
                    : "Find full details and how to apply on the official site."}
                </Text>
                <div className="pt-2">
                  <LinkButton
                    as={NextLink}
                    href={applyHref}
                    rel="noopener"
                    target="_blank"
                    variant="primary"
                  >
                    {applyLabel}
                  </LinkButton>
                </div>
              </>
            ) : (
              <Text as="p">
                Contact the organisers directly for details on how to take part.
              </Text>
            )}
          </section>

          {opportunity.url && opportunity.url !== applyHref && (
            <section className="space-y-xs">
              <Heading as="h2">More information</Heading>
              <Text as="p">
                <Link
                  as={NextLink}
                  href={opportunity.url}
                  rel="noopener"
                  target="_blank"
                >
                  View the official page
                </Link>
              </Text>
            </section>
          )}

          {opportunity.contact && (
            <section className="space-y-xs">
              <Heading as="h2">Contact</Heading>
              <ul className="space-y-xs">
                {opportunity.contact.email && (
                  <li>
                    <Text as="span">Email: </Text>
                    <Link
                      as={NextLink}
                      href={`mailto:${opportunity.contact.email}`}
                    >
                      {opportunity.contact.email}
                    </Link>
                  </li>
                )}
                {opportunity.contact.phone && (
                  <li>
                    <Text as="span">Phone: {opportunity.contact.phone}</Text>
                  </li>
                )}
              </ul>
            </section>
          )}

        </article>

        <HelpfulBox className="mt-8 lg:mt-12" />
      </div>
    </>
  );
}
