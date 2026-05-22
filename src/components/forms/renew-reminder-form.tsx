"use client";

import {
  Button,
  DateInput,
  type DateInputValue,
  ErrorSummary,
  Heading,
  Input,
  LinkButton,
  Radio,
  RadioGroup,
  Text,
} from "@govtech-bb/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  downloadICS,
  generateReminderId,
  googleCalendarURL,
  outlookCalendarURL,
  type ReminderEvent,
} from "@/lib/renew-reminder/ics";

type ItemKey =
  | "id-card"
  | "drivers-licence"
  | "passport"
  | "vehicle-registration"
  | "permit"
  | "custom";

const ITEM_LABELS: Record<ItemKey, string> = {
  "id-card": "National ID Card",
  "drivers-licence": "Driver's Licence",
  passport: "Passport",
  "vehicle-registration": "Vehicle Registration",
  permit: "Permit",
  custom: "Other",
};

const ITEM_HINTS: Record<ItemKey, string> = {
  "id-card": "Barbados National Identification Card",
  "drivers-licence": "Issued by the Barbados Licensing Authority",
  passport: "Travel document",
  "vehicle-registration":
    "Registration certificate for a car, van, or motorcycle",
  permit: "Work permit, business permit, or similar",
  custom:
    "Anything else with an expiry date — you'll be asked to give it a name below",
};

const ITEM_KEYS: ItemKey[] = [
  "id-card",
  "drivers-licence",
  "passport",
  "vehicle-registration",
  "permit",
  "custom",
];

const OFFSET_CHOICES = [
  { days: 90, label: "90 days before" },
  { days: 30, label: "30 days before" },
  { days: 7, label: "7 days before" },
] as const;

type Step = "item" | "expiry" | "check" | "save";

const SERVICE_PATH = "/travel-id-citizenship/renew-reminder";

const SERVICE_TITLE = "Get a reminder before a document expires";

const emptyDate: DateInputValue = { day: "", month: "", year: "" };

function formatLongDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type ParseDateResult =
  | { ok: true; date: Date }
  | { ok: false; reason: "incomplete" | "invalid" | "past" };

function parseExpiry(parts: DateInputValue): ParseDateResult {
  if (!(parts.day && parts.month && parts.year))
    return { ok: false, reason: "incomplete" };
  const d = Number.parseInt(parts.day, 10);
  const m = Number.parseInt(parts.month, 10);
  const y = Number.parseInt(parts.year, 10);
  if (
    !(Number.isFinite(d) && Number.isFinite(m) && Number.isFinite(y)) ||
    d < 1 ||
    d > 31 ||
    m < 1 ||
    m > 12 ||
    y < 1900 ||
    y > 2100
  )
    return { ok: false, reason: "invalid" };
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d)
    return { ok: false, reason: "invalid" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dt.getTime() < today.getTime()) return { ok: false, reason: "past" };
  return { ok: true, date: dt };
}

function ServiceTitle() {
  return (
    <div className="border-blue-40 border-l-4 py-xs pl-s">
      <Text as="p" className="text-mid-grey-00">
        {SERVICE_TITLE}
      </Text>
    </div>
  );
}

export default function RenewReminderForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("item");

  const [itemType, setItemType] = useState<ItemKey | "">("");
  const [customName, setCustomName] = useState("");
  const [expiry, setExpiry] = useState<DateInputValue>(emptyDate);
  const [offset, setOffset] = useState<number>(30);
  const [reminder, setReminder] = useState<ReminderEvent | null>(null);

  const [itemError, setItemError] = useState("");
  const [customNameError, setCustomNameError] = useState("");
  const [expiryError, setExpiryError] = useState("");

  const go = (next: Step) => {
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const itemLabel =
    itemType === "custom"
      ? customName.trim() || ITEM_LABELS.custom
      : itemType
        ? ITEM_LABELS[itemType]
        : "";

  const expiryResult = parseExpiry(expiry);
  const expiryDate = expiryResult.ok ? expiryResult.date : null;

  const isOffsetValid = (days: number): boolean => {
    if (!expiryDate) return true;
    const d = new Date(expiryDate);
    d.setDate(d.getDate() - days);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d.getTime() >= today.getTime();
  };
  const anyOffsetValid = OFFSET_CHOICES.some((c) => isOffsetValid(c.days));

  function submitItem() {
    setItemError("");
    setCustomNameError("");
    if (!itemType) {
      setItemError("Select what you want a reminder for");
      return;
    }
    if (itemType === "custom") {
      const name = customName.trim();
      if (!name) {
        setCustomNameError("Enter a name for the reminder");
        return;
      }
      if (name.length > 60) {
        setCustomNameError("Name must be 60 characters or less");
        return;
      }
    }
    go("expiry");
  }

  function submitExpiry() {
    setExpiryError("");
    if (!expiryResult.ok) {
      const msg =
        expiryResult.reason === "incomplete"
          ? "Enter the expiry date including day, month and year"
          : expiryResult.reason === "past"
            ? "The expiry date must be today or in the future"
            : "Enter a real date — for example, 15 6 2027";
      setExpiryError(msg);
      return;
    }
    // Normalise the chosen offset so we don't land on Check Answers with
    // a default 30-day offset selected when only 7 days fits.
    const d = expiryResult.date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fits = (days: number) => {
      const x = new Date(d);
      x.setDate(x.getDate() - days);
      return x.getTime() >= today.getTime();
    };
    if (!fits(offset)) {
      const next = OFFSET_CHOICES.find((c) => fits(c.days));
      setOffset(next?.days ?? 7);
    }
    go("check");
  }

  function confirmReminder() {
    if (!(expiryDate && isOffsetValid(offset))) return;
    const reminderDate = new Date(expiryDate);
    reminderDate.setDate(reminderDate.getDate() - offset);
    setReminder({
      id: generateReminderId(),
      itemLabel,
      expiryISO: expiryDate.toISOString(),
      reminderDateISO: reminderDate.toISOString(),
      reminderOffset: offset,
    });
    go("save");
  }

  function restart() {
    setItemType("");
    setCustomName("");
    setExpiry(emptyDate);
    setOffset(30);
    setReminder(null);
    setItemError("");
    setCustomNameError("");
    setExpiryError("");
    go("item");
  }

  return (
    <>
      <div className="container py-4 lg:py-6">
        <Breadcrumbs />
      </div>
      <div className="container pt-4 pb-8 lg:py-8">
        {step === "item" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitItem();
            }}
          >
            {(itemError || customNameError) && (
              <ErrorSummary
                errors={[
                  ...(itemError
                    ? [{ text: itemError, target: "item-type-id-card" }]
                    : []),
                  ...(customNameError
                    ? [{ text: customNameError, target: "item-custom-name" }]
                    : []),
                ]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">What do you want a reminder for?</Heading>
            <Text as="p">
              If you have more than one document to track, you can add another
              reminder at the end.
            </Text>
            <RadioGroup
              error={itemError || undefined}
              label="Choose one"
              onValueChange={(v) => {
                setItemType(v as ItemKey);
                if (itemError) setItemError("");
              }}
              value={itemType || undefined}
            >
              {ITEM_KEYS.map((key) => (
                <Radio
                  id={`item-type-${key}`}
                  key={key}
                  label={`${ITEM_LABELS[key]} — ${ITEM_HINTS[key]}`}
                  value={key}
                />
              ))}
            </RadioGroup>
            {itemType === "custom" && (
              <div className="max-w-md">
                <Input
                  description='Up to 60 characters. Use the name on the document, like "Pharmacy permit" or "Fishing licence".'
                  error={customNameError || undefined}
                  id="item-custom-name"
                  label="Name your reminder"
                  maxLength={60}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    if (customNameError && e.target.value.trim())
                      setCustomNameError("");
                  }}
                  value={customName}
                />
              </div>
            )}
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

        {step === "expiry" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitExpiry();
            }}
          >
            {expiryError && (
              <ErrorSummary
                errors={[{ text: expiryError, target: "expiry-date-day" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">When does it expire?</Heading>
            <Text as="p">
              You can find the expiry date on your document. For example, 15 6
              2027.
            </Text>
            <DateInput
              description="For example, 15 6 2027"
              error={expiryError || undefined}
              label="Expiry date"
              name="expiry-date"
              onChange={(v) => {
                setExpiry(v);
                if (expiryError) setExpiryError("");
              }}
              required
              value={expiry}
            />
            <div className="flex gap-3">
              <Button
                onClick={() => go("item")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "check" && expiryDate && (
          <div className="flex flex-col gap-6">
            <ServiceTitle />
            <Heading as="h1">Check your answers</Heading>

            <dl className="grid grid-cols-1 gap-y-3 border-grey-00 border-b pb-6">
              <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-x-4">
                <dt className="font-bold">Reminder for</dt>
                <dd>{itemLabel}</dd>
                <dd>
                  <Button
                    onClick={() => go("item")}
                    type="button"
                    variant="link"
                  >
                    Change
                    <span className="sr-only"> reminder type</span>
                  </Button>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-x-4">
                <dt className="font-bold">Expiry date</dt>
                <dd>{formatLongDate(expiryDate)}</dd>
                <dd>
                  <Button
                    onClick={() => go("expiry")}
                    type="button"
                    variant="link"
                  >
                    Change
                    <span className="sr-only"> expiry date</span>
                  </Button>
                </dd>
              </div>
            </dl>

            {anyOffsetValid ? (
              <RadioGroup
                description="Choose one — your calendar can only hold one reminder event per save."
                label="When should we remind you?"
                onValueChange={(v) => setOffset(Number(v))}
                value={String(offset)}
              >
                {OFFSET_CHOICES.map(({ days, label }) => {
                  const reminderDate = new Date(expiryDate);
                  reminderDate.setDate(reminderDate.getDate() - days);
                  const valid = isOffsetValid(days);
                  const labelText = valid
                    ? `${label} — ${formatLongDate(reminderDate)}`
                    : `${label} — already passed`;
                  return (
                    <Radio
                      disabled={!valid}
                      id={`reminder-offset-${days}`}
                      key={days}
                      label={labelText}
                      value={String(days)}
                    />
                  );
                })}
              </RadioGroup>
            ) : (
              <div className="rounded-sm bg-blue-10 px-6 py-4">
                <Heading as="h2" className="text-black-00">
                  Your document expires too soon to set a useful reminder
                </Heading>
                <Text as="p" className="mt-2">
                  Every reminder we offer would land in the past for an expiry
                  of {formatLongDate(expiryDate)}. You should renew your{" "}
                  <strong>{itemLabel}</strong> as soon as possible.
                </Text>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => go("expiry")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button
                disabled={!anyOffsetValid}
                onClick={confirmReminder}
                type="button"
              >
                Set reminder
              </Button>
            </div>
          </div>
        )}

        {step === "save" && reminder && (
          <div className="flex flex-col gap-6">
            <Heading as="h1">Save your reminder to your calendar</Heading>
            <Text as="p">
              Your <strong>{reminder.itemLabel}</strong> expires on{" "}
              {formatLongDate(new Date(reminder.expiryISO))}.
            </Text>
            <Text as="p">
              We&rsquo;ve prepared a reminder event for{" "}
              <strong>
                {formatLongDate(new Date(reminder.reminderDateISO))}
              </strong>{" "}
              <span className="text-mid-grey-00">
                ({reminder.reminderOffset} days before expiry).
              </span>
            </Text>

            <Heading as="h2">Choose your calendar</Heading>
            <div className="flex flex-wrap gap-3">
              <LinkButton external href={googleCalendarURL(reminder)}>
                Add to Google Calendar
              </LinkButton>
              <LinkButton
                external
                href={outlookCalendarURL(reminder)}
                variant="secondary"
              >
                Add to Microsoft Outlook
              </LinkButton>
              <Button
                onClick={() => downloadICS(reminder)}
                type="button"
                variant="secondary"
              >
                Add to Apple Calendar
              </Button>
            </div>
            <Text as="p" className="text-mid-grey-00" size="caption">
              Apple Calendar downloads a small file; opening it on your phone or
              laptop adds the event.
            </Text>

            <Heading as="h2">After you&rsquo;ve saved it</Heading>
            <Text as="p">
              We do not send you any messages and we do not keep a copy of your
              reminder. Read our{" "}
              <a
                className="underline"
                href="https://alpha.gov.bb/terms-conditions"
                rel="noopener noreferrer"
                target="_blank"
              >
                privacy notice
              </a>
              .
            </Text>

            <Heading as="h2">Have another reminder to set?</Heading>
            <Text as="p">
              Set a reminder for another document — for example, a passport or a
              vehicle registration. It takes less than a minute.
            </Text>
            <div className="flex gap-3">
              <Button onClick={restart} type="button">
                Set another reminder
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
