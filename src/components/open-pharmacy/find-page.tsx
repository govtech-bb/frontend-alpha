import { Heading, Link, Text } from "@govtech-bb/react";
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
      <Text as="p">
        12 government polyclinic pharmacies (free) and over 70 private
        pharmacies that accept Special Benefit Service (SBS) prescriptions, with
        a small dispensing fee, across Barbados. Filter by parish or type to
        find one near you.
      </Text>

      <OpenPharmacyFinder pharmacies={pharmacies} />

      <div className="mb-6 space-y-4">
        <Heading as="h2" className="mt-10">
          Where this information comes from
        </Heading>
        <Text as="p">
          The directory is compiled from the Barbados Drug Service register of
          SBS-participating pharmacies and the network of government
          polyclinics. &lsquo;Open now&rsquo; is calculated from each
          pharmacy&rsquo;s known hours in Atlantic Standard Time (UTC&minus;4) —
          call ahead to confirm before travelling.
        </Text>
        <Text as="p">
          If a pharmacy is refusing your SBS prescription, call the Barbados
          Drug Service on <Link href="tel:+12465354300">(246) 535-4300</Link>{" "}
          before you pay. You can also email{" "}
          <Link href="mailto:director@drugservice.gov.bb">
            director@drugservice.gov.bb
          </Link>
          .
        </Text>
        <Text as="p">
          For service guidance — eligibility, what to bring, prescription
          colours, and what to do if something goes wrong — see{" "}
          <Link href="/health-and-emergency-services/open-pharmacy">
            Find an open pharmacy
          </Link>
          .
        </Text>
      </div>
    </>
  );
}
