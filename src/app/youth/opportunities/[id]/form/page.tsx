import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import opportunitiesData from "@/data/opportunities.json";
import { SITE_URL } from "@/lib/site-url";
import type { Opportunity } from "../../_components/opportunities-list";
import { YouthOpportunityForm } from "./_components/youth-opportunity-form";

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
    return { title: "Apply" };
  }

  const title = `Apply for ${opportunity.title}`;
  const canonical = `${SITE_URL}/youth/opportunities/${opportunity.id}/form`;
  const description = `Apply for ${opportunity.title}. ${opportunity.description}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

export default async function YouthOpportunityFormPage({
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
  );
}
