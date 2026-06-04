/**
 * StormReady Barbados — landing page
 * --------------------------------------------------------------
 * Server component rendered for /health-and-emergency-services/stormready
 * via the catch-all content route. Breadcrumbs, the alpha StageBanner and
 * the "Was this helpful?" box are supplied by the (content) layout, so this
 * component renders only the page body.
 */

import { Heading, LinkButton, Text } from "@govtech-bb/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import {
  HURRICANE_SEASON_LABEL,
  STORMREADY_LAST_UPDATED,
} from "@/data/stormready-checklist";
import { buildPageMetadata } from "@/lib/page-metadata";

const TITLE = "StormReady Barbados";
const DESCRIPTION =
  "Get ready for hurricane season and stay up to date with Department of Emergency Management (DEM) alerts. Household checklist and key storm contacts for Barbados.";
const LANDING_HREF = "/health-and-emergency-services/stormready";
const CHECKLIST_HREF = "/health-and-emergency-services/stormready/checklist";

export const stormReadyLandingMetadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: LANDING_HREF,
});

export const stormReadyChecklistMetadata = buildPageMetadata({
  title: "Household preparation checklist",
  description:
    "Tick off water, food, documents, first aid, communication and pre-storm tasks to make sure your household is ready for a hurricane. Save your progress or print a copy.",
  path: CHECKLIST_HREF,
});

interface Highlight {
  title: string;
  body: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Water",
    body: "Store at least 3 gallons of drinking water per person for 3 days. Fill baths, buckets and other containers before a storm.",
  },
  {
    title: "Documents",
    body: "Keep your national ID, insurance documents and birth certificates in a waterproof bag. Have cash in small bills available.",
  },
  {
    title: "Communication",
    body: "Charge all devices and power banks. Keep a battery-powered radio to receive DEM updates. Write down important phone numbers and emergency contacts.",
  },
  {
    title: "Before a storm",
    body: "Board up windows if needed, bring in outdoor items, fill your vehicle with gas, and make sure family members know your emergency plan and shelter arrangements.",
  },
];

interface Contact {
  label: string;
  number: string;
  tel: string;
  ariaLabel: string;
}

const CONTACTS: Contact[] = [
  {
    label: "Barbados Met Office",
    number: "246-535-0021",
    tel: "tel:+12465350021",
    ariaLabel: "Call the Barbados Met Office on 246 535 0021",
  },
  {
    label: "Police",
    number: "211",
    tel: "tel:211",
    ariaLabel: "Call the Police on 211",
  },
  {
    label: "BWA (water outages)",
    number: "246-426-3990",
    tel: "tel:+12464263990",
    ariaLabel: "Call the BWA water outages line on 246 426 3990",
  },
];

export function StormReadyLandingPage() {
  return (
    <div className="mb-l flex max-w-[42rem] flex-col gap-m">
      <div className="flex flex-col gap-xs">
        <Heading as="h1">{TITLE}</Heading>
        <div className="border-blue-10 border-b-4 pb-4 text-mid-grey-00">
          <Text as="p" size="caption">
            Last updated on {format(parseISO(STORMREADY_LAST_UPDATED), "PPP")}
          </Text>
        </div>
        <Text as="p" className="text-mid-grey-00">
          Get ready for hurricane season and stay up to date with Department of
          Emergency Management (DEM) alerts.
        </Text>
      </div>

      <div className="border-blue-100 border-l-4 bg-blue-10 px-s py-xm">
        <Text as="p">
          <strong>Hurricane season</strong> runs from{" "}
          <strong>{HURRICANE_SEASON_LABEL}</strong>. Prepare before the season
          starts &mdash; do not wait for a storm warning.
        </Text>
      </div>

      <section
        aria-labelledby="checklist-heading"
        className="flex flex-col gap-s"
      >
        <Heading as="h2" id="checklist-heading">
          Household checklist
        </Heading>
        <Text as="p">
          Use this checklist to make sure your household is ready for a
          hurricane. It covers water, food, documents, first aid, communication,
          and the steps to take before a storm.
        </Text>

        <div className="flex flex-col gap-s sm:flex-row">
          <LinkButton as={NextLink} href={CHECKLIST_HREF}>
            Open household checklist
          </LinkButton>
          <LinkButton
            as={NextLink}
            href={`${CHECKLIST_HREF}?print=1`}
            variant="secondary"
          >
            Save checklist as PDF
          </LinkButton>
        </div>
        <Text as="p" className="text-mid-grey-00" size="caption">
          The checklist lets you tick items off and saves your progress on this
          device. &ldquo;Save checklist as PDF&rdquo; opens the checklist and
          prompts your browser to save or print a copy.
        </Text>

        <Heading as="h3">Highlights from the checklist</Heading>
        <ul className="grid list-none grid-cols-1 gap-s p-0 sm:grid-cols-2">
          {HIGHLIGHTS.map((highlight) => (
            <li
              className="flex flex-col gap-xxs bg-teal-10 p-s"
              key={highlight.title}
            >
              <Heading as="h4" size="h3">
                {highlight.title}
              </Heading>
              <Text as="p">{highlight.body}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="contacts-heading"
        className="flex flex-col gap-s border-grey-00 border-t pt-m"
      >
        <Heading as="h2" id="contacts-heading">
          Key contacts during a storm
        </Heading>
        <Text as="p" className="text-mid-grey-00">
          Tap a number to call. Lines can be busy during a storm — keep trying.
        </Text>

        <div className="grid grid-cols-1 gap-s md:grid-cols-3">
          <a
            aria-label="Call the DEM Emergency Line on 246 438 7575"
            className="col-span-full flex flex-col gap-xxs border-red-00 border-l-4 bg-red-10 p-s text-current no-underline transition-colors hover:bg-red-40 focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-100 focus-visible:outline-offset-2"
            href="tel:+12464387575"
          >
            <span className="font-bold text-red-00 text-xs uppercase tracking-wider">
              Emergency
            </span>
            <span className="font-bold">DEM Emergency Line</span>
            <span className="font-bold text-2xl text-red-00">246-438-7575</span>
          </a>

          {CONTACTS.map((contact) => (
            <a
              aria-label={contact.ariaLabel}
              className="flex flex-col gap-xxs border-teal-00 border-l-4 bg-teal-10 p-s text-current no-underline transition-colors hover:bg-teal-40 focus-visible:outline focus-visible:outline-4 focus-visible:outline-teal-100 focus-visible:outline-offset-2"
              href={contact.tel}
              key={contact.label}
            >
              <span className="font-bold">{contact.label}</span>
              <span className="font-bold text-teal-00 text-xl">
                {contact.number}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
