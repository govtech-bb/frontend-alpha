/**
 * Canonical page-metadata builder.
 * --------------------------------------------------------------
 * Collapses the repeated OpenGraph/Twitter/canonical boilerplate that
 * otherwise gets copied into every page's `Metadata` object. Pass the
 * page-specific bits; shared image and structure are filled in here.
 */

import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Government of Barbados",
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  /** Absolute path from the site root, e.g. "/health-and-emergency-services/stormready". */
  path: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [OG_IMAGE] },
    twitter: { title, description, images: [OG_IMAGE.url] },
  };
}
