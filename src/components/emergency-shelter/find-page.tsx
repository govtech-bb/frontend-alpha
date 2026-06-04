/**
 * Emergency shelter finder — page wrapper
 * --------------------------------------------------------------
 * Server component for
 * /health-and-emergency-services/find-an-emergency-shelter/find. Renders the
 * static heading, freshness, activation notice and source, and hands the
 * interactive list off to the client <ShelterFinder>.
 */

import { Heading, Link, Text } from "@govtech-bb/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import { ShelterFinder } from "@/components/emergency-shelter/shelter-finder";
import {
  SHELTER_COUNT,
  SHELTERS_LAST_UPDATED,
  SHELTERS_NEXT_REVIEW,
} from "@/data/emergency-shelters";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  EMERGENCY_SHELTER_GUIDANCE_HREF,
  EMERGENCY_SHELTER_LANDING_HREF,
} from "./routes";

const DEM_TEL = "tel:+12464387575";
const DEM_NUMBER = "438-7575";

export const findEmergencyShelterMetadata = buildPageMetadata({
  title: "Search shelters",
  description: `Search and filter all ${SHELTER_COUNT} emergency shelters in Barbados by parish, accessibility and category.`,
  path: `${EMERGENCY_SHELTER_LANDING_HREF}/find`,
});

export function FindEmergencyShelterPage() {
  return (
    <div className="mb-l flex flex-col gap-m">
      <div className="flex flex-col gap-xs">
        <Heading as="h1">Search shelters</Heading>
        <div className="border-blue-10 border-b-4 pb-4 text-mid-grey-00">
          <Text as="p" size="caption">
            Last updated on {format(parseISO(SHELTERS_LAST_UPDATED), "PPP")}.
            Next review: {format(parseISO(SHELTERS_NEXT_REVIEW), "PPP")}.
          </Text>
        </div>
      </div>

      <div className="border-red-00 border-l-4 bg-red-10 px-s py-xm">
        <Text as="p">
          <strong>No shelter is currently open.</strong> This page lists every
          shelter in the 2026 booklet — not the live status. The Department of
          Emergency Management activates shelters only during a hurricane or
          tropical storm. For the official list of open shelters, listen to
          local radio, follow DEM on social media, or call DEM on{" "}
          <Link href={DEM_TEL}>{DEM_NUMBER}</Link>.
        </Text>
      </div>

      <Text as="p" className="text-mid-grey-00">
        Search all {SHELTER_COUNT} emergency shelters in Barbados. Filter by
        parish, category and accessibility.
      </Text>

      <ShelterFinder />

      <aside
        aria-labelledby="going-to-shelter-heading"
        className="flex flex-col gap-xs border-grey-00 border-t pt-m"
      >
        <Heading as="h2" id="going-to-shelter-heading" size="h3">
          Going to a shelter?
        </Heading>
        <Text as="p">
          <Link as={NextLink} href={EMERGENCY_SHELTER_GUIDANCE_HREF}>
            Read what to bring, shelter rules and other guidance
          </Link>{" "}
          before you leave.
        </Text>
      </aside>

      <Text as="p" className="text-mid-grey-00" size="caption">
        Source: 2026 Emergency Shelter Booklet, Department of Emergency
        Management. Distance is calculated from the centre of each parish.
        Parish coordinates © OpenStreetMap contributors.
      </Text>
    </div>
  );
}
