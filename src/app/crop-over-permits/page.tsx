"use client";

import { Button, Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { useState } from "react";
import { PageViewTracker } from "@/components/page-view-tracker";
import { StageBanner } from "@/components/stage-banner";
import {
  EVENT_TYPE_LABELS,
  type FeatureFlag,
  PERMITS,
  type Permit,
  SIZE_LABELS,
  VENUE_LABELS,
  type VenueFlag,
} from "@/data/crop-over-permits";

type Screen = "start" | "step1" | "step2" | "step3" | "step4" | "results";

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

const SERVICE_CAPTION = "Crop Over · Event and venue permits";
const LAST_UPDATED = "13 May 2026";

const EVENT_OPTIONS: { value: EventType; title: string; hint: string }[] = [
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

const VENUE_OPTIONS: { value: VenueFlag; title: string; hint: string }[] = [
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

const SIZE_OPTIONS: { value: SizeBucket; title: string; hint: string }[] = [
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

const URGENCY_CLASSES: Record<Permit["urgency"], string> = {
  urgent: "text-red-00",
  amber: "text-yellow-00",
  green: "text-green-00",
  normal: "text-mid-grey-00",
};

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

export default function CropOverPermitsPage() {
  const [screen, setScreen] = useState<Screen>("start");
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [venue, setVenue] = useState<VenueFlag | null>(null);
  const [size, setSize] = useState<SizeBucket | null>(null);
  const [features, setFeatures] = useState<Features>(EMPTY_FEATURES);
  const [error, setError] = useState<string | null>(null);

  const goTo = (next: Screen) => {
    setError(null);
    setScreen(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStep1Next = () => {
    if (!eventType) {
      setError("Select an option to continue.");
      return;
    }
    if (eventType === "cruise") {
      setVenue("water");
      goTo("step3");
      return;
    }
    goTo("step2");
  };

  const handleStep2Next = () => {
    if (!venue) {
      setError("Select an option to continue.");
      return;
    }
    goTo("step3");
  };

  const handleStep3Next = () => {
    if (!size) {
      setError("Select an option to continue.");
      return;
    }
    goTo("step4");
  };

  const startAgain = () => {
    setEventType(null);
    setVenue(null);
    setSize(null);
    setFeatures(EMPTY_FEATURES);
    setError(null);
    goTo("start");
  };

  const toggleFeature = (id: FeatureFlag) => {
    setFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activePermits =
    screen === "results" ? getActivePermits(venue, features) : [];
  const renumbered = renumberSteps(activePermits);

  return (
    <>
      <PageViewTracker
        category="business-trade"
        event="page-service-view"
        form="crop-over-permits"
      />
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>
      <main className="container py-m">
        <div className="mx-auto max-w-170">
          {screen === "start" && <StartScreen onStart={() => goTo("step1")} />}

          {screen === "step1" && (
            <Step1
              error={error}
              onBack={() => goTo("start")}
              onContinue={handleStep1Next}
              onSelect={setEventType}
              value={eventType}
            />
          )}

          {screen === "step2" && (
            <Step2
              error={error}
              onBack={() => goTo("step1")}
              onContinue={handleStep2Next}
              onSelect={setVenue}
              value={venue}
            />
          )}

          {screen === "step3" && (
            <Step3
              error={error}
              onBack={() => goTo(eventType === "cruise" ? "step1" : "step2")}
              onContinue={handleStep3Next}
              onSelect={setSize}
              value={size}
            />
          )}

          {screen === "step4" && (
            <Step4
              features={features}
              onBack={() => goTo("step3")}
              onShowResults={() => goTo("results")}
              onToggle={toggleFeature}
            />
          )}

          {screen === "results" && (
            <Results
              eventType={eventType}
              onBack={() => goTo("step4")}
              onStartAgain={startAgain}
              permits={renumbered}
              size={size}
              venue={venue}
            />
          )}
        </div>
      </main>
    </>
  );
}

function ServiceCaption() {
  return (
    <p className="my-s border-blue-40 border-l-4 px-s py-xs text-mid-grey-00 text-sm">
      {SERVICE_CAPTION}
    </p>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      <Link as={NextLink} href="/">
        ← Back
      </Link>
      <ServiceCaption />
      <Heading as="h1">Make Crop Over happen</Heading>
      <div className="mb-xm border-blue-10 border-b-4 pb-s text-mid-grey-00">
        <p className="text-sm">Last updated: {LAST_UPDATED}</p>
      </div>
      <Text as="p" className="mb-xm text-mid-grey-00">
        Find out which permits you need, which agencies to contact, and in what
        order.
      </Text>

      <Heading as="h2">How long does it take?</Heading>
      <p className="mb-s text-[20px]">
        About 5 minutes. Your checklist is based on the type of event you are
        organising.
      </p>

      <Heading as="h2">What you will need</Heading>
      <ul className="mb-xm list-disc space-y-xs pl-6 text-[20px]">
        <li>The type of event you are putting on.</li>
        <li>Your venue — private, beach, public road, or on the water.</li>
        <li>How many people you expect.</li>
        <li>
          Whether you plan to serve alcohol, play music, use a stage, or bring
          overseas performers.
        </li>
      </ul>

      <div className="my-s rounded-sm border-blue-100 border-l-4 bg-blue-10 p-s text-sm">
        <strong>Indicative guidance only.</strong> Always confirm requirements
        directly with each agency before applying.
      </div>

      <div className="mt-s">
        <Button onClick={onStart}>Start now</Button>
      </div>
    </>
  );
}

interface StepShellProps {
  title: string;
  caption: string;
  onBack: () => void;
  children: React.ReactNode;
}

function StepShell({ title, caption, onBack, children }: StepShellProps) {
  return (
    <>
      <button
        className="text-teal-00 underline underline-offset-2 hover:bg-teal-10 hover:no-underline"
        onClick={onBack}
        type="button"
      >
        ← Back
      </button>
      <p className="my-s border-blue-40 border-l-4 px-s py-xs text-mid-grey-00 text-sm">
        {caption}
      </p>
      <Heading as="h1">{title}</Heading>
      {children}
    </>
  );
}

interface OptionCardProps<T extends string> {
  name: string;
  value: T;
  title: string;
  hint: string;
  selected: boolean;
  onChange: (v: T) => void;
}

function OptionCard<T extends string>({
  name,
  value,
  title,
  hint,
  selected,
  onChange,
}: OptionCardProps<T>) {
  return (
    <label
      className={`flex min-h-14 cursor-pointer items-start gap-s rounded-sm border-2 p-s transition-colors hover:border-teal-00 hover:bg-teal-10 ${
        selected ? "border-teal-00 bg-teal-10" : "border-grey-00"
      }`}
    >
      <input
        checked={selected}
        className="mt-1 h-5 w-5 shrink-0 accent-teal-00"
        name={name}
        onChange={() => onChange(value)}
        type="radio"
        value={value}
      />
      <span>
        <span className="block font-bold text-base">{title}</span>
        <span className="mt-1 block text-base text-mid-grey-00">{hint}</span>
      </span>
    </label>
  );
}

function ErrorNotice({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="my-s rounded-sm border-red-00 border-l-4 bg-red-10 p-s text-red-00 text-sm"
      role="alert"
    >
      {message}
    </div>
  );
}

interface RadioStepProps<T extends string> {
  error: string | null;
  onBack: () => void;
  onContinue: () => void;
  onSelect: (v: T) => void;
  value: T | null;
}

function Step1({
  error,
  onBack,
  onContinue,
  onSelect,
  value,
}: RadioStepProps<EventType>) {
  return (
    <StepShell
      caption={SERVICE_CAPTION}
      onBack={onBack}
      title="What are you putting on?"
    >
      <ErrorNotice message={error} />
      <div className="mb-xm flex flex-col gap-xs">
        {EVENT_OPTIONS.map((opt) => (
          <OptionCard
            hint={opt.hint}
            key={opt.value}
            name="event-type"
            onChange={onSelect}
            selected={value === opt.value}
            title={opt.title}
            value={opt.value}
          />
        ))}
      </div>
      <Button onClick={onContinue}>Continue</Button>
    </StepShell>
  );
}

function Step2({
  error,
  onBack,
  onContinue,
  onSelect,
  value,
}: RadioStepProps<VenueFlag>) {
  return (
    <StepShell
      caption={SERVICE_CAPTION}
      onBack={onBack}
      title="Where are you holding it?"
    >
      <ErrorNotice message={error} />
      <div className="mb-xm flex flex-col gap-xs">
        {VENUE_OPTIONS.map((opt) => (
          <OptionCard
            hint={opt.hint}
            key={opt.value}
            name="venue"
            onChange={onSelect}
            selected={value === opt.value}
            title={opt.title}
            value={opt.value}
          />
        ))}
      </div>
      <Button onClick={onContinue}>Continue</Button>
    </StepShell>
  );
}

function Step3({
  error,
  onBack,
  onContinue,
  onSelect,
  value,
}: RadioStepProps<SizeBucket>) {
  return (
    <StepShell
      caption={SERVICE_CAPTION}
      onBack={onBack}
      title="How many people are you expecting?"
    >
      <ErrorNotice message={error} />
      <div className="mb-xm flex flex-col gap-xs">
        {SIZE_OPTIONS.map((opt) => (
          <OptionCard
            hint={opt.hint}
            key={opt.value}
            name="size"
            onChange={onSelect}
            selected={value === opt.value}
            title={opt.title}
            value={opt.value}
          />
        ))}
      </div>
      <Button onClick={onContinue}>Continue</Button>
    </StepShell>
  );
}

interface Step4Props {
  features: Features;
  onBack: () => void;
  onShowResults: () => void;
  onToggle: (id: FeatureFlag) => void;
}

function Step4({ features, onBack, onShowResults, onToggle }: Step4Props) {
  return (
    <StepShell
      caption={SERVICE_CAPTION}
      onBack={onBack}
      title="Tell us what's happening at your event"
    >
      <fieldset className="mb-xm border-grey-00 border-t">
        <legend className="sr-only">Event features</legend>
        {FEATURE_OPTIONS.map((opt) => (
          <label
            className="flex min-h-13 cursor-pointer items-center gap-s border-grey-00 border-b p-s hover:bg-teal-10"
            key={opt.id}
          >
            <input
              checked={features[opt.id]}
              className="h-5 w-5 shrink-0 accent-teal-00"
              onChange={() => onToggle(opt.id)}
              type="checkbox"
            />
            <span className="text-base">{opt.label}</span>
          </label>
        ))}
      </fieldset>
      <Button onClick={onShowResults}>Show my permits</Button>
    </StepShell>
  );
}

interface ResultsProps {
  eventType: EventType | null;
  venue: VenueFlag | null;
  size: SizeBucket | null;
  permits: { permit: Permit; displayStep: number }[];
  onBack: () => void;
  onStartAgain: () => void;
}

function Results({
  eventType,
  venue,
  size,
  permits,
  onBack,
  onStartAgain,
}: ResultsProps) {
  const subtitle = [
    eventType ? EVENT_TYPE_LABELS[eventType] : null,
    venue ? VENUE_LABELS[venue] : null,
    size ? SIZE_LABELS[size] : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <button
        className="text-teal-00 underline underline-offset-2 hover:bg-teal-10 hover:no-underline"
        onClick={onBack}
        type="button"
      >
        ← Back
      </button>
      <ServiceCaption />

      <div className="mb-xm flex items-start justify-between gap-s rounded-sm bg-blue-100 px-xm py-s text-white-00">
        <div>
          <div className="font-bold text-[20px]">Your permit checklist</div>
          <div className="mt-1 text-base opacity-85">{subtitle || "—"}</div>
        </div>
        <div className="shrink-0 text-center">
          <div className="font-bold text-[2.25rem] text-yellow-100 leading-none">
            {permits.length}
          </div>
          <div className="mt-1 text-base opacity-85">permits</div>
        </div>
      </div>

      <div className="mb-xm border-blue-100 border-l-4 bg-blue-10 px-xm py-s">
        <p className="text-base leading-relaxed">
          Apply in the order each permit appears. Start now and complete
          applications no later than <strong>May or early June</strong>. We've
          marked the most urgent permits to help you prioritise.
        </p>
      </div>

      <div className="mb-xm flex flex-col gap-s">
        {permits.map(({ permit, displayStep }) => (
          <PermitCard
            displayStep={displayStep}
            key={permit.name}
            permit={permit}
          />
        ))}
      </div>

      <div className="mb-xm border-grey-00 border-l-4 pl-s text-base text-mid-grey-00">
        <strong className="mb-1 block text-base text-black-00">
          Worth knowing
        </strong>
        This guidance is based on publicly available information and is
        indicative only. Requirements can change — always confirm with each
        agency before you apply. This is not legal advice.
      </div>

      <div className="my-xm flex flex-wrap items-center gap-xs">
        <Button onClick={onStartAgain} variant="secondary">
          ← Start again
        </Button>
        <LinkButton as={NextLink} href="/">
          Back to alpha.gov.bb
        </LinkButton>
      </div>
    </>
  );
}

function PermitCard({
  permit,
  displayStep,
}: {
  permit: Permit;
  displayStep: number;
}) {
  const [open, setOpen] = useState(false);
  const toggleLabel = permit.hasFees
    ? "Documents and fees required"
    : "Documents required";

  return (
    <div className="rounded-sm border border-grey-00">
      <div className="p-s">
        <div className="flex items-center gap-s">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-yellow-100 font-bold text-black-00 text-sm">
            {displayStep}
          </span>
          <div className="font-bold text-[20px] leading-tight">
            {permit.link ? (
              <Link external href={permit.link}>
                {permit.name}
              </Link>
            ) : (
              permit.name
            )}
          </div>
        </div>
        <div className="mt-xs text-base text-mid-grey-00 leading-snug">
          {permit.agency}
        </div>
        <div
          className={`pt-xs font-bold text-base ${URGENCY_CLASSES[permit.urgency]}`}
        >
          {permit.lead}
        </div>
      </div>
      <button
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-xs border-grey-00 border-t px-s py-xs text-left font-bold text-base text-teal-00 hover:bg-teal-10"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span
          aria-hidden="true"
          className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}
        >
          ›
        </span>
        {toggleLabel}
      </button>
      {open && <PermitDocs permit={permit} />}
    </div>
  );
}

function PermitDocs({ permit }: { permit: Permit }) {
  return (
    <div className="border-grey-00 border-t bg-blue-10 p-s">
      <ul className="list-disc pl-5 marker:text-mid-grey-00">
        {permit.docs.map((doc) => (
          <li
            className="border-grey-00 border-b py-1 text-base text-black-00 leading-snug last:border-b-0"
            key={doc}
          >
            {doc}
          </li>
        ))}
      </ul>
      {(permit.applyOnline || permit.applyInPerson) && (
        <div className="mt-s border-blue-40 border-t pt-s text-base">
          <strong className="mb-xs block font-bold text-base text-mid-grey-00 uppercase tracking-wider">
            How to apply
          </strong>
          {permit.applyOnline && (
            <div className="mb-xs">
              <LinkButton external href={permit.applyOnline}>
                Apply online
              </LinkButton>
            </div>
          )}
          {permit.applyInPerson && (
            <p className="text-base text-black-00 leading-relaxed">
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
            </p>
          )}
        </div>
      )}
    </div>
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
