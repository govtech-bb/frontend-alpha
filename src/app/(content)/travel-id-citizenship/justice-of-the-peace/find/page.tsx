import { Heading, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import { JusticeOfThePeaceFinder } from "@/components/justice-of-the-peace/finder";
import jpData from "@/data/justices-of-the-peace.json";
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

export default function FindAJusticeOfThePeacePage() {
  return (
    <>
      <Heading as="h1">{TITLE}</Heading>
      <Text as="p">
        Pick a parish, or use your current location to see the JPs closest to
        you. Every entry comes from the official register — see the{" "}
        <a
          className="underline"
          href="/travel-id-citizenship/justice-of-the-peace#where-this-information-comes-from"
        >
          overview page
        </a>{" "}
        for sources and how to verify someone&rsquo;s appointment.
      </Text>
      <JusticeOfThePeaceFinder jps={jps} />
    </>
  );
}
