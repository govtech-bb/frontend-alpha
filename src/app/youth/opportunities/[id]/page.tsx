import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { OpportunityDetail } from "@/components/opportunity-detail";
import { StageBanner } from "@/components/stage-banner";
import opportunitiesData from "@/data/opportunities.json";
import { SITE_URL } from "@/lib/site-url";
import type { Opportunity } from "../_components/opportunities-list";

const opportunities = opportunitiesData as Opportunity[];

function findOpportunity(id: string): Opportunity | undefined {
  return opportunities.find((opp) => opp.id === id);
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
        <OpportunityDetail
          applyHref={`/youth/opportunities/${opportunity.id}/form`}
          opportunity={opportunity}
        />
        <HelpfulBox className="mt-8 lg:mt-12" />
      </div>
    </>
  );
}
