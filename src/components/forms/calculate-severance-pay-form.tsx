"use client";

import {
  Button,
  DateInput,
  type DateInputValue,
  ErrorSummary,
  Heading,
  Input,
  Radio,
  RadioGroup,
  ShowHide,
  Text,
} from "@govtech-bb/react";
import { useMaskito } from "@maskito/react";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { masks, unmaskMoney } from "@/lib/masks";
import {
  avgWeeklyFromSimple,
  ceilingFor,
  completeYears,
  tieredWeeks,
} from "@/lib/severance/weeks";

type Step =
  | "q-employment"
  | "q-reason"
  | "q-years"
  | "q-pay"
  | "check"
  | "result";
type Employment = "yes" | "no";

const EMPLOYMENT_LABELS: Record<Employment, string> = {
  yes: "Yes",
  no: "No",
};
type Reason =
  | "redundancy"
  | "disaster"
  | "layoff"
  | "death"
  | "closure"
  | "other";
type Period = "weekly" | "monthly";

const SERVICE_PATH = "/money-financial-support/calculate-severance-pay";
const START_PATH = `${SERVICE_PATH}/start`;
const SERVICE_TITLE = "Find out how much severance payment you are owed";

const REASON_LABELS: Record<Reason, string> = {
  redundancy: "My job was cut or made redundant",
  disaster: "A fire, flood, hurricane, or other disaster damaged the workplace",
  layoff: "I was laid off (period of 6 months)",
  death: "Death of employer",
  closure: "Business closure or reconstruction",
  other: "None of these",
};

interface IneligibleVariant {
  title: string;
  body: ReactNode;
}

const INELIGIBLE_VARIANTS: Record<
  "self-employed" | "other-reason" | "under-two-years",
  IneligibleVariant
> = {
  "self-employed": {
    title: "You do not qualify for severance payment",
    body: "Severance payment is only available to employees who were sent home from a job. If your situation is different, contact the NIS Severance Payment Department to check what support you may be owed.",
  },
  "other-reason": {
    title: "We cannot give you an estimate",
    body: "This tool covers redundancy, natural disasters, lay-off or short time, and death of employer. If your situation is different, contact the NIS Severance Payment Department to check what you may be owed.",
  },
  "under-two-years": {
    title: "You may not qualify yet",
    body: (
      <>
        To qualify for severance payment, you generally need to have worked for
        the same employer for at least{" "}
        <strong>2 complete years (104 weeks)</strong> without a significant
        break in service. If you are close to 2 years, contact the NIS Severance
        Payment Department.
      </>
    ),
  },
};

function IneligibleResult({ variant }: { variant: IneligibleVariant }) {
  return (
    <div className="mb-6">
      <div className="rounded-sm bg-blue-10 px-6 py-4">
        <Heading as="h2" className="text-black-00">
          {variant.title}
        </Heading>
      </div>
      <Text as="p" className="mt-3 text-mid-grey-00" size="caption">
        Based on the information you gave us
      </Text>
      <Text as="p" className="mt-2" size="body">
        {variant.body}
      </Text>
    </div>
  );
}

const emptyDate: DateInputValue = { day: "", month: "", year: "" };

const PERIOD_LABELS: Record<
  Period,
  { adverb: string; choice: string; avg: string; payLabel: string }
> = {
  weekly: {
    adverb: "weekly",
    choice: "Weekly",
    avg: "Average weekly pay",
    payLabel: "Average weekly pay in the last two years (BDS$)",
  },
  monthly: {
    adverb: "monthly",
    choice: "Monthly",
    avg: "Average monthly pay",
    payLabel: "Average monthly pay in the last two years (BDS$)",
  },
};

function ServiceTitle() {
  return (
    <div className="border-blue-40 border-l-4 py-xs pl-s">
      <Text as="p" className="text-mid-grey-00">
        {SERVICE_TITLE}
      </Text>
    </div>
  );
}

type ParseDateResult =
  | { ok: true; date: Date; iso: string }
  | { ok: false; reason: "incomplete" | "invalid" };

function parseDate(parts: DateInputValue): ParseDateResult {
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
  const iso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  return { ok: true, date: dt, iso };
}

function money(n: number): string {
  return `BDS$${(n || 0).toLocaleString("en-BB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CalculateSeverancePayForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("q-employment");
  const [employment, setEmployment] = useState<Employment | "">("");
  const [reason, setReason] = useState<Reason | "">("");
  const [start, setStart] = useState<DateInputValue>(emptyDate);
  const [end, setEnd] = useState<DateInputValue>(emptyDate);
  const [period, setPeriod] = useState<Period>("weekly");
  const [simpleAvg, setSimpleAvg] = useState<string>("");
  const moneyMaskRef = useMaskito({ options: masks.money });

  const parsedAvg = Number.parseFloat(unmaskMoney(simpleAvg));
  const simpleAvgNum = Number.isFinite(parsedAvg) ? parsedAvg : 0;
  const periodLabels = PERIOD_LABELS[period];

  const [employmentError, setEmploymentError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [payError, setPayError] = useState("");

  const go = (next: Step) => {
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const startResult = parseDate(start);
  const endResult = parseDate(end);
  const startIso = startResult.ok ? startResult.iso : "";
  const endIso = endResult.ok ? endResult.iso : "";
  const endYear = endResult.ok ? endResult.date.getFullYear() : null;
  const years = startIso && endIso ? completeYears(startIso, endIso) : 0;
  const avgWeekly = avgWeeklyFromSimple(simpleAvgNum, period, endYear);
  const entitledWeeks = tieredWeeks(years);
  const severance = entitledWeeks * avgWeekly;

  let ineligibleKey: keyof typeof INELIGIBLE_VARIANTS | null = null;
  if (employment === "yes") ineligibleKey = "self-employed";
  else if (reason === "other") ineligibleKey = "other-reason";
  else if (reason && years < 2) ineligibleKey = "under-two-years";
  const isEligible =
    employment !== "yes" && reason && reason !== "other" && years >= 2;

  function submitEmployment() {
    setEmploymentError("");
    if (!employment) {
      setEmploymentError("Select yes or no");
      return;
    }
    if (employment === "yes") {
      go("result");
      return;
    }
    go("q-reason");
  }

  function submitReason() {
    setReasonError("");
    if (!reason) {
      setReasonError("Select why you were sent home");
      return;
    }
    if (reason === "other") {
      go("result");
      return;
    }
    go("q-years");
  }

  function submitYears() {
    setStartError("");
    setEndError("");
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    let sErr = "";
    let eErr = "";
    if (!startResult.ok) {
      sErr =
        startResult.reason === "incomplete"
          ? "Enter your start date including day, month and year"
          : "Enter a real start date";
    } else if (startResult.date > today) {
      sErr = "Start date cannot be in the future";
    }
    if (!endResult.ok) {
      eErr =
        endResult.reason === "incomplete"
          ? "Enter your last day at work including day, month and year"
          : "Enter a real end date";
    } else if (startResult.ok && endResult.date <= startResult.date) {
      eErr = "End date must be after start date";
    }
    setStartError(sErr);
    setEndError(eErr);
    if (sErr || eErr) return;
    if (years < 2) {
      go("result");
      return;
    }
    go("q-pay");
  }

  function submitPay() {
    setPayError("");
    if (simpleAvgNum <= 0) {
      setPayError(`Enter your average ${periodLabels.adverb} pay`);
      return;
    }
    go("result");
  }

  function restart() {
    setStep("q-employment");
    setEmployment("");
    setEmploymentError("");
    setReason("");
    setStart(emptyDate);
    setEnd(emptyDate);
    setPeriod("weekly");
    setSimpleAvg("");
    setReasonError("");
    setStartError("");
    setEndError("");
    setPayError("");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  return (
    <>
      {step === "result" && (
        <div className="container py-4 lg:py-6">
          <Breadcrumbs />
        </div>
      )}
      <div className="container pt-4 pb-8 lg:py-8">
        {step === "q-employment" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitEmployment();
            }}
          >
            {employmentError && (
              <ErrorSummary
                errors={[{ text: employmentError, target: "employment-yes" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">Are you self-employed?</Heading>
            <RadioGroup
              error={employmentError || undefined}
              label="Choose one"
              onValueChange={(v) => setEmployment(v as Employment)}
              value={employment || undefined}
            >
              {(
                Object.entries(EMPLOYMENT_LABELS) as [Employment, string][]
              ).map(([value, label]) => (
                <Radio
                  id={`employment-${value}`}
                  key={value}
                  label={label}
                  value={value}
                />
              ))}
            </RadioGroup>
            <div className="flex gap-3">
              <Button
                onClick={() => router.push(START_PATH)}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "q-reason" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitReason();
            }}
          >
            {reasonError && (
              <ErrorSummary
                errors={[{ text: reasonError, target: "reason-redundancy" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">Why were you sent home?</Heading>
            <RadioGroup
              error={reasonError || undefined}
              label="Choose one"
              onValueChange={(v) => setReason(v as Reason)}
              value={reason || undefined}
            >
              {(Object.entries(REASON_LABELS) as [Reason, string][]).map(
                ([value, label]) => (
                  <Radio
                    id={`reason-${value}`}
                    key={value}
                    label={label}
                    value={value}
                  />
                )
              )}
            </RadioGroup>
            <div className="flex gap-3">
              <Button
                onClick={() => go("q-employment")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "q-years" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitYears();
            }}
          >
            {(startError || endError) && (
              <ErrorSummary
                errors={[
                  ...(startError
                    ? [{ text: startError, target: "start-date-day" }]
                    : []),
                  ...(endError
                    ? [{ text: endError, target: "end-date-day" }]
                    : []),
                ]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">When did you work for this employer?</Heading>
            <ul className="list-disc space-y-2 pl-7">
              <li>Enter the date you started and your last day at work.</li>
              <li>
                You need at least <strong>2 years</strong> of continuous service
                to qualify for severance payment.
              </li>
              <li>
                The law counts a maximum of <strong>33 years</strong>.
              </li>
            </ul>

            <DateInput
              description="The first day you worked for this employer. For example, 27 3 1990"
              error={startError || undefined}
              label="Start date"
              name="start-date"
              onChange={setStart}
              required
              value={start}
            />

            <DateInput
              description="Your last day at work. For example, 27 3 1990"
              error={endError || undefined}
              label="End date"
              name="end-date"
              onChange={setEnd}
              required
              value={end}
            />

            <div className="flex gap-3">
              <Button
                onClick={() => go("q-reason")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {step === "q-pay" && (
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitPay();
            }}
          >
            {payError && (
              <ErrorSummary
                errors={[{ text: payError, target: "simple-avg" }]}
                title="There is a problem"
              />
            )}
            <ServiceTitle />
            <Heading as="h1">Your insurable earnings</Heading>
            <Text as="p" size="body">
              Enter your usual basic pay. We'll use it as the average over the
              last 104 weeks (2 years).
            </Text>

            <RadioGroup
              description="Choose one"
              label="How are you paid?"
              onValueChange={(v) => setPeriod(v as Period)}
              value={period}
            >
              <Radio id="period-weekly" label="Weekly" value="weekly" />
              <Radio id="period-monthly" label="Monthly" value="monthly" />
            </RadioGroup>

            <div className="max-w-[16rem]">
              <Input
                description="Your usual basic pay. Don't include overtime or bonuses."
                error={payError || undefined}
                id="simple-avg"
                inputMode="decimal"
                label={periodLabels.payLabel}
                onInput={(e) => setSimpleAvg(e.currentTarget.value)}
                ref={moneyMaskRef}
                required
                value={simpleAvg}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => go("q-years")}
                type="button"
                variant="secondary"
              >
                Previous
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        )}

        {/* {step === "check" && (
        <div className="space-y-6 lg:w-2/3 lg:space-y-8">
          <div className="space-y-4">
            <ServiceTitle />
            <Heading as="h1">Check your answers</Heading>
            <Text as="p">
              Review the answers you&apos;ve given carefully before seeing your
              estimate.
            </Text>
          </div>

          {[
            {
              title: "Why you were sent home",
              change: "q-reason" as Step,
              items: [
                {
                  label: "Reason",
                  value: reason ? REASON_LABELS[reason] : "—",
                },
              ],
            },
            {
              title: "When you worked for this employer",
              change: "q-years" as Step,
              items: [
                { label: "Start date", value: formatDate(startIso) },
                { label: "End date", value: formatDate(endIso) },
                {
                  label: "Complete years of service",
                  value: `${years} ${years === 1 ? "year" : "years"}`,
                },
              ],
            },
            {
              title: "Your insurable earnings",
              change: "q-pay" as Step,
              items: [
                { label: "How you are paid", value: periodLabels.choice },
                { label: periodLabels.avg, value: money(simpleAvgNum) },
              ],
            },
          ].map((section) => (
            <div
              className="grid grid-cols-1 gap-y-2 border-grey-00 border-b-4 pb-8 [grid-template-areas:'heading'_'content'_'button'] lg:grid-cols-[1fr_auto] lg:gap-x-2 lg:[grid-template-areas:'heading_button'_'content_content']"
              key={section.title}
            >
              <Heading as="h2" className="[grid-area:heading]">
                {section.title}
              </Heading>
              <Button
                className="justify-self-start [grid-area:button] lg:self-center lg:justify-self-end"
                onClick={() => go(section.change)}
                type="button"
                variant="link"
              >
                Change
              </Button>
              <dl className="grid grid-cols-1 gap-2 font-normal text-[20px] leading-[1.7] [grid-area:content] lg:gap-4">
                {section.items.map((item) => (
                  <div
                    className="flex flex-col sm:flex-row lg:gap-x-2"
                    key={item.label}
                  >
                    <dt className="font-bold sm:w-1/3">{item.label}</dt>
                    <dd className="sm:w-2/3">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="flex gap-3">
            <Button
              onClick={() => go("q-pay")}
              type="button"
              variant="secondary"
            >
              Previous
            </Button>
            <Button onClick={() => go("result")} type="button">
              Show my estimate
            </Button>
          </div>
        </div>
      )} */}

        {step === "result" && (
          <div className="flex flex-col gap-6">
            <ServiceTitle />
            {ineligibleKey && (
              <IneligibleResult variant={INELIGIBLE_VARIANTS[ineligibleKey]} />
            )}

            {isEligible && (
              <>
                <div className="rounded-sm bg-green-00 p-m text-white-00">
                  <Heading as="h2" className="text-white-00">
                    Your severance payment estimate
                  </Heading>
                  <p className="wrap-break-word mt-1 font-bold text-3xl">
                    {money(severance)}
                  </p>
                </div>

                <div className="border-red-00 border-l-4 bg-red-10 p-4">
                  <Text as="p" size="body">
                    <strong>
                      This is the estimated amount you may be entitled to.
                    </strong>{" "}
                    It is calculated under the Severance Payments Act (Cap.
                    355A). Your contract of employment may entitle you to more.
                  </Text>
                  <Text as="p" className="mt-2" size="body">
                    This is not legal advice. Contact the{" "}
                    <strong>NIS Severance Payment Department</strong> if you are
                    unsure about your entitlement.
                  </Text>
                </div>

                <Text as="p" size="body">
                  The same calculation applies whether you were made redundant,
                  your workplace was damaged by a disaster, you were laid off or
                  put on short time for a long period, your employer died, or
                  the business closed or was reconstructed.
                </Text>

                <ShowHide summary="How your severance is worked out">
                  {(() => {
                    const countedYears = Math.min(years, 33);
                    const tier1Years = Math.min(countedYears, 10);
                    const tier2Years = Math.max(
                      Math.min(countedYears - 10, 10),
                      0
                    );
                    const tier3Years = Math.max(
                      Math.min(countedYears - 20, 13),
                      0
                    );
                    const tier1Pay = tier1Years * 2.5 * avgWeekly;
                    const tier2Pay = tier2Years * 3 * avgWeekly;
                    const tier3Pay = tier3Years * 3.5 * avgWeekly;
                    const ceiling = endYear ? ceilingFor(endYear) : null;
                    const rawWeekly =
                      period === "monthly"
                        ? (simpleAvgNum * 12) / 52
                        : simpleAvgNum;
                    const ceilingApplied =
                      !!ceiling && rawWeekly > ceiling.weekly;
                    return (
                      <div className="space-y-4">
                        <Text as="p" size="body">
                          The Severance Payments Act gives you a number of weeks
                          of pay for every complete year you worked with the
                          same employer:
                        </Text>
                        <ul className="list-disc space-y-2 pl-7">
                          <li>
                            <strong>2.5 weeks</strong> of basic pay for each
                            year up to 10 years
                          </li>
                          <li>
                            <strong>3 weeks</strong> of basic pay for each year
                            between 11 and 20 years
                          </li>
                          <li>
                            <strong>3.5 weeks</strong> of basic pay for each
                            year between 21 and 33 years
                          </li>
                        </ul>
                        <Text as="p" size="body">
                          Only the most recent <strong>33 years</strong> of your
                          employment count. Anything earlier is not included.
                        </Text>

                        <Heading as="h3">Your average weekly pay</Heading>
                        <Text as="p" size="body">
                          NIS works out your average weekly pay using your{" "}
                          <strong>insurable earnings</strong> over the last 104
                          weeks (the last 2 years), divided by 104.
                        </Text>
                        <Text as="p" size="body">
                          Insurable earnings are the wages NIS records
                          contributions on. They include your regular pay plus
                          overtime, commissions, service charges, production
                          bonuses, and holiday pay.
                        </Text>
                        {period === "monthly" && (
                          <Text as="p" size="body">
                            You told us you earn, on average,{" "}
                            <strong>{money(simpleAvgNum)}</strong> a month. We
                            turned that into a weekly amount by multiplying by
                            12 (months in a year) and dividing by 52 (weeks in a
                            year): <strong>{money(rawWeekly)}</strong> a week.
                          </Text>
                        )}
                        {ceilingApplied && ceiling && (
                          <Text as="p" size="body">
                            By law, NIS caps the weekly pay used in this
                            calculation at the{" "}
                            <strong>maximum insurable earnings ceiling</strong>.
                            In {endYear} that ceiling is{" "}
                            <strong>{money(ceiling.weekly)} a week</strong>, so
                            we used that instead of your full average.
                          </Text>
                        )}
                        <Text as="p" size="body">
                          We used <strong>{money(avgWeekly)} a week</strong> for
                          your calculation.
                        </Text>
                        <div className="border-yellow-00 border-l-4 bg-yellow-10 p-4">
                          <Text as="p" size="body">
                            <strong>Why this is only an estimate</strong>
                          </Text>
                          <Text as="p" className="mt-2" size="body">
                            NIS divides by 104 weeks no matter what. If you had
                            weeks in the last 2 years where you did not work, or
                            were on lay-off, short-time, sick leave, or unpaid
                            leave, those weeks still count as part of the 104.
                            They will pull your real average down.
                          </Text>
                          <Text as="p" className="mt-2" size="body">
                            This calculator assumes you earned your stated pay
                            every week for the full 2 years. Your actual payout
                            may be lower if there were gaps.
                          </Text>

                          {rawWeekly > 0 &&
                            (() => {
                              const gapWeeks = 8;
                              const workedWeeks = 104 - gapWeeks;
                              const exampleAvg =
                                (rawWeekly * workedWeeks) / 104;
                              const exampleSeverance =
                                entitledWeeks * exampleAvg;
                              return (
                                <div className="mt-4">
                                  <Text as="p" size="body">
                                    <strong>For example</strong>, if {gapWeeks}{" "}
                                    of your last 104 weeks had no pay (say you
                                    took unpaid sick leave after an injury):
                                  </Text>
                                  <Text
                                    as="p"
                                    className="mt-3 text-mid-grey-00"
                                    size="caption"
                                  >
                                    Each square is one week.
                                  </Text>
                                  <div className="mt-2 space-y-3">
                                    {[0, 1].map((yearIdx) => (
                                      <div key={yearIdx}>
                                        <Text
                                          as="p"
                                          className="mb-1 text-mid-grey-00"
                                          size="caption"
                                        >
                                          {yearIdx === 0
                                            ? "2 years ago"
                                            : "Last year"}
                                        </Text>
                                        <div className="flex flex-wrap gap-1">
                                          {Array.from({ length: 52 }).map(
                                            (_, w) => {
                                              const weekIndex =
                                                yearIdx * 52 + w;
                                              const isGap =
                                                weekIndex < gapWeeks;
                                              return (
                                                <span
                                                  aria-hidden="true"
                                                  className={
                                                    isGap
                                                      ? "h-3 w-3 rounded-xs bg-red-00"
                                                      : "h-3 w-3 rounded-xs bg-green-00"
                                                  }
                                                  key={weekIndex}
                                                />
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                    <div className="flex items-center gap-2">
                                      <span
                                        aria-hidden="true"
                                        className="h-4 w-4 shrink-0 rounded-xs bg-green-00"
                                      />
                                      <dt className="sr-only">Worked</dt>
                                      <dd>
                                        <strong>{workedWeeks} weeks</strong>{" "}
                                        <span className="text-mid-grey-00">
                                          worked
                                        </span>
                                      </dd>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        aria-hidden="true"
                                        className="h-4 w-4 shrink-0 rounded-xs bg-red-00"
                                      />
                                      <dt className="sr-only">No pay</dt>
                                      <dd>
                                        <strong>{gapWeeks} weeks</strong>{" "}
                                        <span className="text-mid-grey-00">
                                          no pay
                                        </span>
                                      </dd>
                                    </div>
                                  </dl>
                                  <div className="mt-3 rounded-sm bg-white-00 p-3 text-center font-mono text-sm">
                                    <div>
                                      ({workedWeeks} × {money(rawWeekly)}) + (
                                      {gapWeeks} × {money(0)})
                                    </div>
                                    <div className="mt-1">
                                      = {money(rawWeekly * workedWeeks)} ÷ 104
                                    </div>
                                    <div className="mt-1">
                                      ={" "}
                                      <strong>
                                        {money(exampleAvg)} a week
                                      </strong>{" "}
                                      (instead of {money(rawWeekly)})
                                    </div>
                                    <div className="mt-2 border-grey-00 border-t pt-2">
                                      Severance would be{" "}
                                      <strong>{money(exampleSeverance)}</strong>
                                      , not {money(severance)}.
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                        </div>

                        <Heading as="h3">Your calculation</Heading>
                        <Text as="p" size="body">
                          You worked for{" "}
                          <strong>{countedYears} complete years</strong>
                          {years > 33 && (
                            <>
                              {" "}
                              (we counted the most recent 33 of the {years}{" "}
                              years you told us)
                            </>
                          )}
                          . Here is how that adds up:
                        </Text>
                        <div className="overflow-x-auto rounded-sm bg-grey-10 p-4 text-center font-mono text-base">
                          <div className="inline-grid grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto_auto] items-center gap-x-2 gap-y-2 text-left">
                            {tier1Years > 0 && (
                              <>
                                <span className="text-right">
                                  {money(avgWeekly)}
                                </span>
                                <span className="text-mid-grey-00">×</span>
                                <span className="text-right">2.5</span>
                                <span className="text-mid-grey-00">weeks</span>
                                <span className="text-mid-grey-00">×</span>
                                <span className="text-right">{tier1Years}</span>
                                <span className="text-mid-grey-00">
                                  {tier1Years === 1 ? "year" : "years"}
                                </span>
                                <span className="text-mid-grey-00">=</span>
                                <span className="text-right font-bold">
                                  {money(tier1Pay)}
                                </span>
                              </>
                            )}
                            {tier2Years > 0 && (
                              <>
                                <span className="text-right">
                                  {money(avgWeekly)}
                                </span>
                                <span className="text-mid-grey-00">×</span>
                                <span className="text-right">3</span>
                                <span className="text-mid-grey-00">weeks</span>
                                <span className="text-mid-grey-00">×</span>
                                <span className="text-right">{tier2Years}</span>
                                <span className="text-mid-grey-00">
                                  {tier2Years === 1 ? "year" : "years"}
                                </span>
                                <span className="text-mid-grey-00">=</span>
                                <span className="text-right font-bold">
                                  {money(tier2Pay)}
                                </span>
                              </>
                            )}
                            {tier3Years > 0 && (
                              <>
                                <span className="text-right">
                                  {money(avgWeekly)}
                                </span>
                                <span className="text-mid-grey-00">×</span>
                                <span className="text-right">3.5</span>
                                <span className="text-mid-grey-00">weeks</span>
                                <span className="text-mid-grey-00">×</span>
                                <span className="text-right">{tier3Years}</span>
                                <span className="text-mid-grey-00">
                                  {tier3Years === 1 ? "year" : "years"}
                                </span>
                                <span className="text-mid-grey-00">=</span>
                                <span className="text-right font-bold">
                                  {money(tier3Pay)}
                                </span>
                              </>
                            )}
                            <span className="col-span-9 mt-1 border-black-00 border-t pt-2 text-right">
                              <span className="mr-2 text-mid-grey-00">
                                Total =
                              </span>
                              <strong>{money(severance)}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </ShowHide>

                {years > 33 && (
                  <Text as="p" className="text-mid-grey-00" size="caption">
                    Under the Severance Payments Act, only the most recent 33
                    years of service are counted.
                  </Text>
                )}

                <Heading as="h2">What happens after you file</Heading>
                <ol className="list-decimal space-y-2 pl-7">
                  <li>NIS writes to your employer on your behalf.</li>

                  <li>
                    Once your claim is approved, NIS sends you a letter by a{" "}
                    <strong>registered post</strong>.
                  </li>
                  <li>
                    You pay a <strong>BDS$4.65</strong> postage fee for the
                    registered letter.
                  </li>
                  <li>
                    You have <strong>30 days</strong> to respond to the letter.
                  </li>
                  <li>
                    Return the <strong>registered pink slip</strong> from the
                    post office, together with a copy of the letter, before the
                    30 days are up.
                  </li>
                </ol>

                <div className="border-yellow-00 border-l-4 bg-yellow-10 p-4">
                  <Text as="p" size="body">
                    <strong>Keep your pink slip safe</strong>
                  </Text>
                  <Text as="p" className="mt-2" size="body">
                    If the pink slip is lost, damaged, stolen, or misplaced, you
                    will have to restart the entire severance process from the
                    beginning.
                  </Text>
                </div>
              </>
            )}

            <Heading as="h2">Need help or advice?</Heading>
            <Text as="p" size="body">
              Contact the <strong>NIS Severance Payment Department</strong>.
              They can give you free advice and help you claim if your employer
              does not pay.
            </Text>
            <div>
              <Button onClick={restart} type="button" variant="secondary">
                Start again
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
