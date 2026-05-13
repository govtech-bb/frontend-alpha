"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorSummary,
  Heading,
  Link,
  LinkButton,
  ShowHide,
  Text,
} from "@govtech-bb/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HelpfulBox } from "@/components/layout/helpful-box";
import {
  EVENT_TYPE_LABELS,
  type FeatureFlag,
  PERMITS,
  type Permit,
  SIZE_LABELS,
  VENUE_LABELS,
  type VenueFlag,
} from "@/data/crop-over-permits";

type Step = "q-event" | "q-venue" | "q-size" | "q-features" | "result";

type EventType = "fete" | "concert" | "vending" | "mas" | "cruise" | "market";
type SizeBucket = "small" | "medium" | "large";

interface Features {
  music: boolean;
  alcohol: boolean;
  food: boolean;
  stage: boolean;
  tickets: boolean;
  pyro: boolean;
  copyright: boolean;
}

const EMPTY_FEATURES: Features = {
  music: false,
  alcohol: false,
  food: false,
  stage: false,
  tickets: false,
  pyro: false,
  copyright: false,
};

const SERVICE_PATH = "/business-trade/crop-over-permits";
const SERVICE_TITLE = "Find the permits you need for a Crop Over event";

const URGENCY_CLASSES: Record<Permit["urgency"], string> = {
  urgent: "text-red-00",
  amber: "text-yellow-00",
  green: "text-green-00",
  normal: "text-mid-grey-00",
};

interface CardOption<T extends string> {
  value: T;
  title: string;
  hint: string;
}

const EVENT_OPTIONS: CardOption<EventType>[] = [
  {
    value: "fete",
    title: "A fete or party",
    hint: "All-inclusive, cooler fete, breakfast party, beach party",
  },
  {
    value: "concert",
    title: "A concert or show",
    hint: "Live music, soca show, calypso competition, stage performance",
  },
  {
    value: "vending",
    title: "Food or craft vending",
    hint: "Selling food, drinks, or crafts at a Crop Over event",
  },
  {
    value: "mas",
    title: "A mas band",
    hint: "Organising a Kadooment band or costume section",
  },
  {
    value: "cruise",
    title: "A boat cruise",
    hint: "Party cruise, sunset sail, event on water",
  },
  {
    value: "market",
    title: "A market or fair",
    hint: "Multi-vendor market, craft fair, cultural exhibition",
  },
];

const VENUE_OPTIONS: CardOption<VenueFlag>[] = [
  {
    value: "private",
    title: "A private venue",
    hint: "Restaurant, club, event space, private property",
  },
  {
    value: "beach",
    title: "A beach or park",
    hint: "National Conservation Commission (NCC)-managed beach, public park, Spring Garden Highway",
  },
  {
    value: "road",
    title: "A public road or open area",
    hint: "Street party, roadside, car park, open public space",
  },
  {
    value: "water",
    title: "On the water",
    hint: "Harbour, Careenage, open sea",
  },
];

const SIZE_OPTIONS: CardOption<SizeBucket>[] = [
  { value: "small", title: "Under 200", hint: "Small, intimate event" },
  { value: "medium", title: "200 to 1,000", hint: "Mid-size fete or show" },
  { value: "large", title: "Over 1,000", hint: "Large event or major fete" },
];

const FEATURE_OPTIONS: { id: FeatureFlag; label: string }[] = [
  { id: "music", label: "I am playing music — live or through a DJ" },
  { id: "alcohol", label: "I will be selling or serving alcohol" },
  { id: "food", label: "I am preparing or selling food" },
  {
    id: "stage",
    label: "I am putting up a stage, tent, or temporary structure",
  },
  { id: "tickets", label: "I am selling tickets or charging entry" },
  { id: "pyro", label: "I am using pyrotechnics or fireworks" },
  { id: "copyright", label: "I am playing recorded or copyrighted music" },
];

function ServiceTitle() {
  return (
    <div className="border-blue-40 border-l-4 py-xs pl-s">
      <Text as="p" className="text-mid-grey-00">
        {SERVICE_TITLE}
      </Text>
    </div>
  );
}

interface OptionCardProps<T extends string> {
  name: string;
  option: CardOption<T>;
  selected: boolean;
  invalid: boolean;
  onChange: (value: T) => void;
}

function OptionCard<T extends string>({
  name,
  option,
  selected,
  invalid,
  onChange,
}: OptionCardProps<T>) {
  return (
    <label
      className={`flex min-h-14 cursor-pointer items-start gap-s rounded-sm border-2 p-s transition-colors hover:border-teal-00 hover:bg-teal-10 ${
        selected
          ? "border-teal-00 bg-teal-10"
          : invalid
            ? "border-red-00"
            : "border-grey-00"
      }`}
    >
      <input
        checked={selected}
        className="mt-1 h-5 w-5 shrink-0 accent-teal-00"
        id={`${name}-${option.value}`}
        name={name}
        onChange={() => onChange(option.value)}
        type="radio"
        value={option.value}
      />
      <span>
        <span className="block font-bold text-base">{option.title}</span>
        <span className="mt-1 block text-base text-mid-grey-00">
          {option.hint}
        </span>
      </span>
    </label>
  );
}

function getActivePermits(
  venue: VenueFlag | null,
  features: Features
): Permit[] {
  const flags: Record<string, boolean> = {
    private: venue === "private",
    beach: venue === "beach",
    road: venue === "road",
    water: venue === "water",
    ...features,
  };
  return PERMITS.filter(
    (p) => p.conditions.length === 0 || p.conditions.every((c) => flags[c])
  );
}

function renumberSteps(
  permits: Permit[]
): { permit: Permit; displayStep: number }[] {
  let n = 0;
  let prev: number | null = null;
  return permits.map((permit) => {
    if (permit.step !== prev) {
      n += 1;
      prev = permit.step;
    }
    return { permit, displayStep: n };
  });
}

export default function CropOverPermitsForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("q-event");
  const [eventType, setEventType] = useState<EventType | "">("");
  const [venue, setVenue] = useState<VenueFlag | "">("");
  const [size, setSize] = useState<SizeBucket | "">("");
  const [features, setFeatures] = useState<Features>(EMPTY_FEATURES);

  const [eventError, setEventError] = useState("");
  const [venueError, setVenueError] = useState("");
  const [sizeError, setSizeError] = useState("");

  const go = (next: Step) => {
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  function submitEvent() {
    setEventError("");
    if (!eventType) {
      setEventError("Select the type of event you are putting on");
      return;
    }
    if (eventType === "cruise") {
      setVenue("water");
      go("q-size");
      return;
    }
    go("q-venue");
  }

  function submitVenue() {
    setVenueError("");
    if (!venue) {
      setVenueError("Select where you are holding the event");
      return;
    }
    go("q-size");
  }

  function submitSize() {
    setSizeError("");
    if (!size) {
      setSizeError("Select how many people you are expecting");
      return;
    }
    go("q-features");
  }

  function restart() {
    setStep("q-event");
    setEventType("");
    setVenue("");
    setSize("");
    setFeatures(EMPTY_FEATURES);
    setEventError("");
    setVenueError("");
    setSizeError("");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  const activePermits =
    step === "result" && venue ? getActivePermits(venue, features) : [];
  const renumbered = renumberSteps(activePermits);
  const subtitle = [
    eventType ? EVENT_TYPE_LABELS[eventType] : null,
    venue ? VENUE_LABELS[venue] : null,
    size ? SIZE_LABELS[size] : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      {step === "result" && (
        <div className="container py-4 lg:py-6">
          <Breadcrumbs />
        </div>
      )}
      <div className="container pt-4 pb-8 lg:py-8">
        {step === "q-event" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitEvent();
            }}
          >
            {eventError && (
              <ErrorSummary
                errors={[{ text: eventError, target: "event-fete" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">What are you putting on?</Heading>
            <fieldset className="flex flex-col gap-xs">
              <legend className="sr-only">Choose one</legend>
              {EVENT_OPTIONS.map((option) => (
                <OptionCard
                  invalid={Boolean(eventError)}
                  key={option.value}
                  name="event"
                  onChange={setEventType}
                  option={option}
                  selected={eventType === option.value}
                />
              ))}
            </fieldset>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push(SERVICE_PATH)}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "q-venue" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitVenue();
            }}
          >
            {venueError && (
              <ErrorSummary
                errors={[{ text: venueError, target: "venue-private" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">Where are you holding it?</Heading>
            <fieldset className="flex flex-col gap-xs">
              <legend className="sr-only">Choose one</legend>
              {VENUE_OPTIONS.map((option) => (
                <OptionCard
                  invalid={Boolean(venueError)}
                  key={option.value}
                  name="venue"
                  onChange={setVenue}
                  option={option}
                  selected={venue === option.value}
                />
              ))}
            </fieldset>
            <div className="flex gap-3">
              <Button
                onClick={() => go("q-event")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "q-size" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitSize();
            }}
          >
            {sizeError && (
              <ErrorSummary
                errors={[{ text: sizeError, target: "size-small" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">How many people are you expecting?</Heading>
            <fieldset className="flex flex-col gap-xs">
              <legend className="sr-only">Choose one</legend>
              {SIZE_OPTIONS.map((option) => (
                <OptionCard
                  invalid={Boolean(sizeError)}
                  key={option.value}
                  name="size"
                  onChange={setSize}
                  option={option}
                  selected={size === option.value}
                />
              ))}
            </fieldset>
            <div className="flex gap-3">
              <Button
                onClick={() =>
                  go(eventType === "cruise" ? "q-event" : "q-venue")
                }
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "q-features" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              go("result");
            }}
          >
            <ServiceTitle />
            <Heading as="h1">Tell us what's happening at your event</Heading>
            <Text as="p" size="body">
              Tick everything that applies. Leave blank any that do not.
            </Text>
            <CheckboxGroup label="Select all that apply">
              {FEATURE_OPTIONS.map(({ id, label }) => (
                <Checkbox
                  checked={features[id]}
                  id={`feat-${id}`}
                  key={id}
                  label={label}
                  onCheckedChange={(checked) =>
                    setFeatures((prev) => ({ ...prev, [id]: checked === true }))
                  }
                />
              ))}
            </CheckboxGroup>
            <div className="flex gap-3">
              <Button
                onClick={() => go("q-size")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Show my permits</Button>
            </div>
          </form>
        )}

        {step === "result" && (
          <div className="flex flex-col gap-6">
            <ServiceTitle />

            <div className="rounded-sm bg-blue-100 p-m text-white-00">
              <Heading as="h2" className="text-white-00">
                Your permit checklist
              </Heading>
              <Text as="p" className="mt-1 text-white-00" size="body">
                {subtitle || "—"}
              </Text>
              <p className="mt-3 font-bold text-3xl text-yellow-100">
                {activePermits.length}{" "}
                <span className="font-normal text-base text-white-00">
                  {activePermits.length === 1 ? "permit" : "permits"}
                </span>
              </p>
            </div>

            <div className="border-blue-100 border-l-4 bg-blue-10 p-4">
              <Text as="p" size="body">
                Apply in the order each permit appears. Start now and complete
                applications no later than <strong>May or early June</strong>.
                We've marked the most urgent permits to help you prioritise.
              </Text>
            </div>

            <ol className="flex flex-col gap-4">
              {renumbered.map(({ permit, displayStep }) => (
                <PermitCard
                  displayStep={displayStep}
                  key={permit.name}
                  permit={permit}
                />
              ))}
            </ol>

            <div className="border-grey-00 border-l-4 pl-s text-mid-grey-00">
              <Text as="p" className="text-black-00" size="body">
                <strong>Worth knowing</strong>
              </Text>
              <Text as="p" className="mt-2 text-mid-grey-00" size="body">
                This guidance is based on publicly available information and is
                indicative only. Requirements can change — always confirm with
                each agency before you apply. This is not legal advice.
              </Text>
            </div>

            <div className="flex flex-wrap gap-3 print:hidden">
              <Button onClick={savePdf} type="button">
                Save checklist as PDF
              </Button>
              <Button onClick={restart} type="button" variant="secondary">
                Start again
              </Button>
            </div>

            <div className="print:hidden">
              <HelpfulBox />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function savePdf() {
  if (typeof window === "undefined") return;
  const detailsList = Array.from(document.querySelectorAll("details"));
  const previouslyOpen = detailsList.map((d) => d.open);
  for (const d of detailsList) {
    d.open = true;
  }
  const restore = () => {
    detailsList.forEach((d, i) => {
      d.open = previouslyOpen[i];
    });
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}

function PermitCard({
  permit,
  displayStep,
}: {
  permit: Permit;
  displayStep: number;
}) {
  return (
    <li className="rounded-sm border border-grey-00 p-s">
      <div className="flex items-start gap-s">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-yellow-100 font-bold text-black-00 text-sm">
          {displayStep}
        </span>
        <div className="flex-1">
          <Heading as="h3">
            {permit.link ? (
              <Link external href={permit.link}>
                {permit.name}
              </Link>
            ) : (
              permit.name
            )}
          </Heading>
          <Text as="p" className="mt-1 text-mid-grey-00" size="body">
            {permit.agency}
          </Text>
          <p
            className={`mt-2 font-bold text-base ${URGENCY_CLASSES[permit.urgency]}`}
          >
            {permit.lead}
          </p>
        </div>
      </div>

      <div className="mt-s">
        <ShowHide
          summary={
            permit.hasFees
              ? "Documents and fees required"
              : "Documents required"
          }
        >
          <ul className="list-disc space-y-2 pl-7">
            {permit.docs.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
          {(permit.applyOnline || permit.applyInPerson) && (
            <div className="mt-4 border-blue-40 border-t pt-4">
              <Text
                as="p"
                className="mb-2 font-bold text-mid-grey-00 uppercase tracking-wider"
                size="caption"
              >
                How to apply
              </Text>
              {permit.applyOnline && (
                <div className="mb-3">
                  <LinkButton external href={permit.applyOnline}>
                    Apply online
                  </LinkButton>
                </div>
              )}
              {permit.applyInPerson && (
                <Text as="p" size="body">
                  {permit.applyInPerson.address}
                  {permit.applyInPerson.tel && (
                    <>
                      <br />
                      Tel: <strong>{permit.applyInPerson.tel}</strong>
                    </>
                  )}
                  {permit.applyInPerson.email && (
                    <>
                      <br />
                      Email: <strong>{permit.applyInPerson.email}</strong>
                    </>
                  )}
                  {permit.applyInPerson.note && (
                    <>
                      <br />
                      {permit.applyInPerson.note}
                    </>
                  )}
                </Text>
              )}
            </div>
          )}
        </ShowHide>
      </div>
    </li>
  );
}
