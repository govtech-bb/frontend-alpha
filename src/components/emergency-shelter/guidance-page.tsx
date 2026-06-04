/**
 * Before you go to a shelter — guidance page
 * --------------------------------------------------------------
 * Server component for
 * /health-and-emergency-services/find-an-emergency-shelter/guidance. Long-form
 * reference content: Go Bag, shelter rules, entry protocol, accessible
 * shelters, District Emergency Organisation contacts, hurricane terms and the
 * phone directory.
 */

import { Heading, Link, ShowHide, Text } from "@govtech-bb/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import {
  EMERGENCY_SHELTERS,
  SHELTERS_LAST_UPDATED,
  SHELTERS_NEXT_REVIEW,
} from "@/data/emergency-shelters";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  DISTRICT_CHAIRS,
  HURRICANE_TERMS,
  PHONE_DIRECTORY,
  type PhoneEntry,
} from "./guidance-data";
import {
  EMERGENCY_SHELTER_FIND_HREF,
  EMERGENCY_SHELTER_GUIDANCE_HREF,
} from "./routes";

const DEM_TEL = "tel:+12464387575";

export const emergencyShelterGuidanceMetadata = buildPageMetadata({
  title: "Before you go to a shelter",
  description:
    "What to bring, shelter rules, accessibility, the entry protocol, District Emergency Organisations, hurricane terms and emergency phone numbers for Barbados emergency shelters.",
  path: EMERGENCY_SHELTER_GUIDANCE_HREF,
});

const CONTENTS = [
  { id: "go-bag", label: "What to bring (Emergency Go Bag)" },
  { id: "before-you-leave", label: "Before you leave home" },
  { id: "what-to-expect", label: "What to expect when you arrive" },
  { id: "rules", label: "Shelter rules" },
  { id: "protocol", label: "Protocol for entering shelters" },
  { id: "accessible-shelters", label: "Shelters with an accessible bathroom" },
  {
    id: "district-organisations",
    label: "Your District Emergency Organisation",
  },
  { id: "hurricane-terms", label: "Hurricane terms" },
  { id: "phone-numbers", label: "All phone numbers" },
];

const accessibleShelters = EMERGENCY_SHELTERS.filter(
  (shelter) => shelter.access
);
const accessibleCategory1 = accessibleShelters.filter((s) => s.category === 1);
const accessibleCategory2 = accessibleShelters.filter((s) => s.category === 2);

export function EmergencyShelterGuidancePage() {
  return (
    <div className="mb-l flex max-w-[44rem] flex-col gap-m">
      <div className="flex flex-col gap-xs">
        <Heading as="h1">Before you go to a shelter</Heading>
        <div className="border-blue-10 border-b-4 pb-4 text-mid-grey-00">
          <Text as="p" size="caption">
            Last updated on {format(parseISO(SHELTERS_LAST_UPDATED), "PPP")}.
            Next review: {format(parseISO(SHELTERS_NEXT_REVIEW), "PPP")}.
          </Text>
        </div>
      </div>

      <Text as="p" className="text-mid-grey-00">
        Read this guidance before you go to an emergency shelter in Barbados.
      </Text>

      <nav
        aria-labelledby="contents-heading"
        className="flex flex-col gap-s border-teal-00 border-l-4 bg-teal-10 p-s"
      >
        <Heading as="h2" id="contents-heading" size="h3">
          Contents
        </Heading>
        <ul className="list-disc space-y-xs pl-6">
          {CONTENTS.map((item) => (
            <li key={item.id}>
              <Link href={`#${item.id}`}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <GuidanceSection heading="What to bring (Emergency Go Bag)" id="go-bag">
        <Text as="p">
          Pack a Go Bag that is easy to grab if you have to leave home. Refresh
          it at the start of the hurricane season on 1 June.
        </Text>
        <BulletList
          items={[
            "Bottled water",
            "A small first aid kit and any prescription medication",
            "A small flashlight and spare batteries",
            "Infant essentials — medicine, sterile water, diapers, ready formula, bottles",
            "Your ID, passport or driver's licence, in water-tight plastic bags",
            "Cash, in denominations of $20 and less",
            "Hand sanitiser and wipes",
            "Personal toiletries and sanitary items",
            "A whistle",
            "A portable radio and batteries",
            "Ready-to-eat food (canned, packaged or boxed) and a can opener",
          ]}
        />
        <Text as="p">
          Also keep a <strong>Household Disaster Supply Kit</strong> at home for
          use after the storm — drinking water, two weeks of non-perishable
          food, a tarpaulin, clean-up supplies and a fire extinguisher.
        </Text>
      </GuidanceSection>

      <GuidanceSection heading="Before you leave home" id="before-you-leave">
        <BulletList
          items={[
            "Listen for evacuation advice on local radio, TV news and official social media. Leave when you are told to.",
            "Fill containers with water — the bathtub, sinks and the washing machine.",
            "Shut off water and electricity at the mains.",
            "Close the valve on large propane tanks and anchor them.",
            "Lock all windows and doors.",
            "Take your Go Bag and any prescription medication.",
            "Leave early, in daylight if you can. Do not drive through floodwater.",
          ]}
        />
        <Text as="p">
          <strong>Pets are not allowed in shelters.</strong> Arrange to leave
          them with friends or family, and pack a Pet Survival Kit.
        </Text>
      </GuidanceSection>

      <GuidanceSection
        heading="What to expect when you arrive"
        id="what-to-expect"
      >
        <BulletList
          items={[
            "A warden will register you and your family at the door. Have your ID ready.",
            "The warden will assign you a space — this may be a hall, a classroom or a smaller individual room.",
            "Food is not provided. Bring your own from your Go Bag and Disaster Supply Kit.",
            "Bedding is not provided either. Bring a pillow, blanket or sleeping bag if you can.",
            "The space is shared. Be considerate of other occupants and follow the warden's instructions.",
            "Cell signal, internet and electricity may be down. Keep a portable radio with you for updates.",
            "Wardens may ask you to help with simple shelter tasks. You are expected to cooperate.",
          ]}
        />
      </GuidanceSection>

      <GuidanceSection heading="Shelter rules" id="rules">
        <Text as="p">
          The Senior Warden runs the shelter and their decisions are final.
          Every occupant must cooperate, including helping with shelter tasks if
          the Warden asks.
        </Text>
        <Text as="p">
          You <strong>cannot</strong> bring:
        </Text>
        <BulletList items={["pets", "firearms or other weapons", "alcohol"]} />
        <Text as="p">
          You <strong>cannot</strong>:
        </Text>
        <BulletList
          items={[
            "smoke in the shelter",
            "damage the building, furniture or equipment — you will be prosecuted",
            "use violence, profane language or behave in an anti-social way",
          ]}
        />
        <Text as="p">
          Shelter staff are <strong>not</strong> responsible for any belongings
          you bring. The Department of Emergency Management is not liable for
          lost or damaged property.
        </Text>
        <Text as="p">
          If a State of Emergency is declared under the Emergency Management Act
          (CAP 160A), you must follow any orders made under the Act.
        </Text>
      </GuidanceSection>

      <GuidanceSection heading="Protocol for entering shelters" id="protocol">
        <BulletList
          items={[
            "You do not have to wear a face mask, but you can if you want to.",
            "If you have new respiratory symptoms, you must wear a face mask.",
            "Hand sanitiser is available on entry — using it is optional.",
            "If you have been isolating at home with a communicable illness, tell the warden on arrival and wear a face mask.",
          ]}
        />
        <Text as="p">
          Shelters can open at any time during the Atlantic hurricane season,
          between 1 June and 30 November.
        </Text>
      </GuidanceSection>

      <GuidanceSection
        heading="Shelters with an accessible bathroom"
        id="accessible-shelters"
      >
        <Text as="p">
          {accessibleShelters.length} shelters have a bathroom suitable for
          people who use a wheelchair. The rest of the building may not be
          step-free — call ahead if you need to check.
        </Text>
        <Heading as="h3" size="h3">
          Category 1 (used during a hurricane)
        </Heading>
        <BulletList
          items={accessibleCategory1.map((s) => `${s.name} — ${s.parish}`)}
        />
        <Heading as="h3" size="h3">
          Category 2 (used after a hurricane)
        </Heading>
        <BulletList
          items={accessibleCategory2.map((s) => `${s.name} — ${s.parish}`)}
        />
      </GuidanceSection>

      <GuidanceSection
        heading="Your District Emergency Organisation"
        id="district-organisations"
      >
        <Text as="p">
          A District Emergency Organisation (DEO) is a network of trained
          volunteers who coordinate the emergency response for your community.
          Contact your local chairperson if you need community-level help
          before, during or after an emergency.
        </Text>
        <ShowHide summary="Find your district chairperson">
          <ul className="m-0 flex list-none flex-col p-0">
            {DISTRICT_CHAIRS.map((chair) => (
              <li
                className="grid gap-0.5 border-grey-00 border-b py-s sm:grid-cols-[1fr_1fr] sm:items-baseline sm:gap-6"
                key={chair.district}
              >
                <span className="font-bold">{chair.district}</span>
                <span>
                  {chair.name} — <Link href={chair.tel}>{chair.number}</Link>
                </span>
              </li>
            ))}
          </ul>
          <Text as="p" className="mt-s text-mid-grey-00" size="caption">
            Some districts (Christ Church South, Christ Church West Central and
            St. Michael North) currently have no listed chairperson. Contact DEM
            on <Link href={DEM_TEL}>438-7575</Link> if your district is not
            shown.
          </Text>
        </ShowHide>
      </GuidanceSection>

      <GuidanceSection heading="Hurricane terms" id="hurricane-terms">
        <Text as="p">
          Words you may hear on local radio or TV during a storm.
        </Text>
        <dl className="m-0 flex flex-col">
          {HURRICANE_TERMS.map((entry) => (
            <div
              className="flex flex-col gap-0.5 border-grey-00 border-b py-s"
              key={entry.term}
            >
              <dt className="font-bold">{entry.term}</dt>
              <dd className="m-0 text-mid-grey-00">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </GuidanceSection>

      <GuidanceSection heading="All phone numbers" id="phone-numbers">
        <Text as="p">
          Save these numbers ahead of the hurricane season. All numbers below
          are published in the 2026 Emergency Shelter Booklet.
        </Text>
        {PHONE_DIRECTORY.map((group) => (
          <div className="flex flex-col gap-s" key={group.heading}>
            <Heading as="h3" size="h3">
              {group.heading}
            </Heading>
            <ul className="m-0 flex list-none flex-col p-0">
              {group.entries.map((entry) => (
                <PhoneRow entry={entry} key={entry.label} />
              ))}
            </ul>
          </div>
        ))}
      </GuidanceSection>

      <aside className="border-grey-00 border-t pt-m">
        <Heading as="h2" size="h3">
          Ready to find a shelter?
        </Heading>
        <Text as="p">
          <Link as={NextLink} href={EMERGENCY_SHELTER_FIND_HREF}>
            Find a shelter near you
          </Link>
        </Text>
      </aside>

      <Text as="p" className="text-mid-grey-00" size="caption">
        Source: 2026 Emergency Shelter Booklet, Department of Emergency
        Management.
      </Text>
    </div>
  );
}

function GuidanceSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="flex scroll-mt-m flex-col gap-s"
      id={id}
    >
      <Heading as="h2" id={`${id}-heading`}>
        {heading}
      </Heading>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-xs pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PhoneRow({ entry }: { entry: PhoneEntry }) {
  return (
    <li className="grid gap-0.5 border-grey-00 border-b py-s sm:grid-cols-[1fr_1fr] sm:items-baseline sm:gap-6">
      <span className="font-bold">{entry.label}</span>
      <span>
        {entry.contacts.map((contact, index) => (
          <span key={contact.tel}>
            {index > 0 && ", "}
            <Link href={contact.tel}>{contact.display}</Link>
            {contact.note ? ` ${contact.note}` : ""}
          </span>
        ))}
      </span>
    </li>
  );
}
