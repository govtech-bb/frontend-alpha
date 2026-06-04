/**
 * Find an emergency shelter — landing page
 * --------------------------------------------------------------
 * Server component for
 * /health-and-emergency-services/find-an-emergency-shelter. Breadcrumbs, the
 * alpha StageBanner and the "Was this helpful?" box come from the (content)
 * layout, so this renders only the page body.
 */

import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import {
  SHELTERS_LAST_UPDATED,
  SHELTERS_NEXT_REVIEW,
  STORM_SEASON_LABEL,
} from "@/data/emergency-shelters";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  EMERGENCY_SHELTER_FIND_HREF,
  EMERGENCY_SHELTER_GUIDANCE_HREF,
  EMERGENCY_SHELTER_LANDING_HREF,
} from "./routes";

const TITLE = "Find an emergency shelter";
const DESCRIPTION =
  "Find an emergency shelter in Barbados to use during a hurricane or tropical storm.";

export const emergencyShelterLandingMetadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: EMERGENCY_SHELTER_LANDING_HREF,
});

interface EmergencyPhone {
  service: string;
  number: string;
  tel: string;
}

const EMERGENCY_PHONES: EmergencyPhone[] = [
  { service: "Police", number: "211", tel: "tel:211" },
  { service: "Fire Service", number: "311", tel: "tel:311" },
  { service: "Ambulance", number: "511", tel: "tel:511" },
  {
    service: "Department of Emergency Management",
    number: "438-7575",
    tel: "tel:+12464387575",
  },
];

export function EmergencyShelterLandingPage() {
  return (
    <div className="mb-l flex max-w-[42rem] flex-col gap-m">
      <div className="flex flex-col gap-xs">
        <Heading as="h1">{TITLE}</Heading>
        <div className="border-blue-10 border-b-4 pb-4 text-mid-grey-00">
          <Text as="p" size="caption">
            Last updated on {format(parseISO(SHELTERS_LAST_UPDATED), "PPP")}.
            Next review: {format(parseISO(SHELTERS_NEXT_REVIEW), "PPP")}.
          </Text>
        </div>
        <Text as="p" className="text-mid-grey-00">
          Search emergency shelters to use in the event of a hurricane or
          tropical storm.
        </Text>
      </div>

      <div className="flex flex-col gap-xs">
        <LinkButton
          as={NextLink}
          className="self-start"
          href={EMERGENCY_SHELTER_FIND_HREF}
        >
          Find a shelter
        </LinkButton>
        <Text as="p" className="text-mid-grey-00" size="caption">
          It&apos;s free and you don&apos;t need to sign in.
        </Text>
      </div>

      <section aria-labelledby="how-it-works" className="flex flex-col gap-s">
        <Heading as="h2" id="how-it-works">
          How this service works
        </Heading>
        <Text as="p">You can search for shelters online.</Text>
        <Text as="p">
          This service is for anyone in Barbados, including residents and
          visitors.
        </Text>
        <Text as="p">
          You may go to a shelter once it is open. Shelters open only when the
          Department of Emergency Management announces that they are ready,
          during the Atlantic hurricane season (
          <strong>{STORM_SEASON_LABEL}</strong>).
        </Text>
      </section>

      <section aria-labelledby="help-now" className="flex flex-col gap-s">
        <Heading as="h2" id="help-now">
          If you need help now, call:
        </Heading>
        <ul className="grid list-none auto-rows-fr grid-cols-1 gap-xs p-0 sm:grid-cols-2">
          {EMERGENCY_PHONES.map((phone) => (
            <li key={phone.service}>
              <a
                className="flex h-full flex-col gap-xxs border-red-00 border-l-4 bg-red-10 p-s text-current no-underline transition-colors hover:bg-red-40 focus-visible:outline focus-visible:outline-4 focus-visible:outline-red-100 focus-visible:outline-offset-2"
                href={phone.tel}
              >
                <span className="font-bold">{phone.service}</span>
                <span className="font-bold text-red-00 text-xl">
                  {phone.number}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Text as="p" size="caption">
          <Link
            as={NextLink}
            href={`${EMERGENCY_SHELTER_GUIDANCE_HREF}#phone-numbers`}
          >
            See all phone numbers
          </Link>
        </Text>
      </section>

      <section aria-labelledby="use-this" className="flex flex-col gap-s">
        <Heading as="h2" id="use-this">
          Use this service to
        </Heading>
        <ul className="list-disc space-y-xxs pl-6">
          <li>find shelters in your parish</li>
          <li>see which shelters have accessible bathrooms or potable water</li>
          <li>
            see which shelters are used during or after a hurricane or storm
          </li>
        </ul>
      </section>

      <section
        aria-labelledby="what-youll-need"
        className="flex flex-col gap-s"
      >
        <Heading as="h2" id="what-youll-need">
          What you&apos;ll need
        </Heading>
        <Text as="p">
          Pack a Go Bag with bottled water, your ID, any prescription
          medication, a flashlight, and some cash.{" "}
          <Link
            as={NextLink}
            href={`${EMERGENCY_SHELTER_GUIDANCE_HREF}#go-bag`}
          >
            See the full Go Bag list
          </Link>
          .
        </Text>
      </section>

      <section aria-labelledby="key-things" className="flex flex-col gap-s">
        <Heading as="h2" id="key-things">
          Key things to know
        </Heading>
        <ul className="list-disc space-y-xxs pl-6">
          <li>
            Stay at home, or with family or friends, if it is safe to do so.
          </li>
          <li>
            Pets, alcohol, firearms and other weapons are not allowed in
            shelters.
          </li>
          <li>Smoking is not allowed inside shelters.</li>
          <li>You are responsible for your belongings.</li>
        </ul>
        <Text as="p">
          <Link as={NextLink} href={`${EMERGENCY_SHELTER_GUIDANCE_HREF}#rules`}>
            See the full shelter rules
          </Link>{" "}
          before you go.
        </Text>
      </section>

      <section aria-labelledby="other-ways" className="flex flex-col gap-s">
        <Heading as="h2" id="other-ways">
          Other ways to find a shelter
        </Heading>
        <Text as="p">You can also:</Text>
        <ul className="list-disc space-y-xxs pl-6">
          <li>
            listen to local radio or watch TV news for the official list of open
            shelters
          </li>
          <li>
            follow the Department of Emergency Management, the Ministry of
            Educational Transformation, and the Barbados Government Information
            Service on social media
          </li>
          <li>
            call the Department of Emergency Management at{" "}
            <Link href="tel:+12464387575">438-7575</Link>
          </li>
        </ul>
      </section>

      <aside className="border-blue-100 border-l-4 bg-blue-10 px-s py-xm">
        <Heading as="h2" size="h3">
          Before you go to a shelter
        </Heading>
        <Text as="p">
          <Link as={NextLink} href={EMERGENCY_SHELTER_GUIDANCE_HREF}>
            Read the full guidance
          </Link>{" "}
          on rules, what to bring, accessibility, entry procedures and emergency
          phone numbers.
        </Text>
      </aside>

      <Text as="p" className="text-mid-grey-00" size="caption">
        Source: 2026 Emergency Shelter Booklet, Department of Emergency
        Management.
      </Text>
    </div>
  );
}
