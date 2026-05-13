import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { StageBanner } from "@/components/stage-banner";
import opportunities from "@/data/opportunities.json";
import { SITE_URL } from "@/lib/site-url";
import type { Opportunity } from "./_components/opportunities-list";
import { OpportunitiesList } from "./_components/opportunities-list";

const TITLE = "All opportunities";
const DESCRIPTION =
  "Browse every government youth programme, workshop, initiative and volunteer opportunity. Filter by name, tag or category.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/youth/opportunities` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/youth/opportunities`,
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
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function YouthOpportunitiesPage() {
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
        <OpportunitiesList opportunities={opportunities as Opportunity[]} />
        <HelpfulBox className="mt-8 lg:mt-12" />
      </div>
    </>
  );
}
