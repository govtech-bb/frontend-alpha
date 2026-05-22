import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JusticeOfThePeaceFinder } from "@/components/justice-of-the-peace/finder";
import jpData from "@/data/justices-of-the-peace.json";
import { hasResearchAccess } from "@/lib/research-access";
import { SITE_URL } from "@/lib/site-url";
import type { JusticeOfThePeace } from "@/types/justice-of-the-peace";

const jps = jpData as JusticeOfThePeace[];

const TITLE = "Find a Justice of the Peace";
const DESCRIPTION =
  "Search the directory of Justices of the Peace in Barbados by parish or by your current location.";
const CANONICAL = `${SITE_URL}/travel-id-citizenship/justice-of-the-peace/find`;

export const metadata: Metadata = {
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

export default async function FindAJusticeOfThePeacePage() {
  if (!(await hasResearchAccess())) {
    notFound();
  }

  return (
    <>
      <Heading as="h1">{TITLE}</Heading>
      <Text as="p">
        Search the official directory of Justices of the Peace in Barbados.
        Filter by parish, or use your location to find JPs nearby.
      </Text>
      <JusticeOfThePeaceFinder jps={jps} />

      <div className="mb-6 space-y-4">
        <Heading as="h2" className="mt-10">
          Where this information comes from
        </Heading>
        <Text as="p">
          The directory uses the Supreme Court of Barbados register (last
          updated 30 April 2023), the{" "}
          <Link href="/justices-of-the-peace-2024.pdf">
            official 2024 list (PDF, 436 names)
          </Link>{" "}
          and the 563 JPs appointed in January 2026. Every appointment is
          gazetted in the{" "}
          <Link
            href="https://governmentprintery.gov.bb/gazette/"
            rel="noopener"
            target="_blank"
          >
            Official Gazette of Barbados
          </Link>
          . To check whether someone is currently a JP, phone the Office of the
          Attorney General on{" "}
          <Link href="tel:+12464677370">(246) 467-7370</Link>.
        </Text>
        <Text as="p">
          Looking for a notary public instead? See{" "}
          <Link href="/travel-id-citizenship/justice-of-the-peace">
            Justice of the Peace
          </Link>{" "}
          for the difference, or{" "}
          <Link href="/travel-id-citizenship/get-a-document-notarised">
            Get a document notarised
          </Link>{" "}
          for the official process.
        </Text>
      </div>
    </>
  );
}
