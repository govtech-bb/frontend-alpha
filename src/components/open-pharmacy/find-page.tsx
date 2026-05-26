import { Heading } from "@govtech-bb/react";
import type { Metadata } from "next";
import { OpenPharmacyFinder } from "@/components/open-pharmacy/finder";
import pharmacyData from "@/data/pharmacies.json";
import { SITE_URL } from "@/lib/site-url";
import type { Pharmacy } from "@/types/pharmacy";

const pharmacies = pharmacyData as Pharmacy[];

const TITLE = "Find an open pharmacy";
const DESCRIPTION =
  "Directory of Barbados pharmacies that accept Special Benefit Service prescriptions. See live opening hours, filter by parish, and find one open now.";
const CANONICAL = `${SITE_URL}/health-and-emergency-services/open-pharmacy/find`;

export const findOpenPharmacyMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
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

export function FindOpenPharmacyPage() {
  return (
    <>
      <Heading as="h1">{TITLE}</Heading>

      <OpenPharmacyFinder pharmacies={pharmacies} />
    </>
  );
}
