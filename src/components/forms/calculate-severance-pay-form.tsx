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
  Text,
} from "@govtech-bb/react";
import { useMaskito } from "@maskito/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { masks, unmaskMoney } from "@/lib/masks";
import {
  avgWeeklyFromSimple,
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

const INELIGIBLE_OTHER = {
  title: "We cannot give you an estimate",
  body: "This tool covers redundancy, natural disasters, lay-off or short time, and death of employer. If your situation is different, contact the NIS Severance Payment Department to check what you may be owed.",
};

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
    go("check");
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
    <div className="container py-8 lg:py-16">
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
            {(Object.entries(EMPLOYMENT_LABELS) as [Employment, string][]).map(
              ([value, label]) => (
                <Radio
                  id={`employment-${value}`}
                  key={value}
                  label={label}
                  value={value}
                />
              )
            )}
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

      {step === "check" && (
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
      )}

      {step === "result" && (
        <div className="flex flex-col gap-6">
          <Breadcrumbs />
          <ServiceTitle />
          {employment === "yes" && (
            <div className="rounded-sm border border-grey-00 p-4">
              <Heading as="h2">
                You do not qualify for severance payment
              </Heading>
              <Text as="p" className="mt-1 text-mid-grey-00" size="caption">
                Based on the information you gave us
              </Text>
              <Text as="p" className="mt-4" size="body">
                Severance payment is only available to employees who were sent
                home from a job. If your situation is different, contact the NIS
                Severance Payment Department to check what support you may be
                owed.
              </Text>
            </div>
          )}
          {employment !== "yes" && reason === "other" && (
            <div className="rounded-sm border border-grey-00 p-4">
              <Heading as="h2">{INELIGIBLE_OTHER.title}</Heading>
              <Text as="p" className="mt-1 text-mid-grey-00" size="caption">
                Based on the information you gave us
              </Text>
              <Text as="p" className="mt-4" size="body">
                {INELIGIBLE_OTHER.body}
              </Text>
            </div>
          )}

          {employment !== "yes" && reason !== "other" && years < 2 && (
            <div className="rounded-sm border border-grey-00 p-4">
              <Heading as="h2">You may not qualify yet</Heading>
              <Text as="p" className="mt-1 text-mid-grey-00" size="caption">
                Based on the information you gave us
              </Text>
              <Text as="p" className="mt-4" size="body">
                To qualify for severance payment, you generally need to have
                worked for the same employer for at least{" "}
                <strong>2 complete years (104 weeks)</strong> without a
                significant break in service. If you are close to 2 years,
                contact the NIS Severance Payment Department.
              </Text>
            </div>
          )}

          {employment !== "yes" &&
            reason &&
            reason !== "other" &&
            years >= 2 && (
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
              </>
            )}

          <div className="border-yellow-00 border-l-4 bg-yellow-10 p-4">
            <Text as="p" size="body">
              <strong>Keep your pink slip safe</strong>
            </Text>
            <Text as="p" className="mt-2" size="body">
              If the pink slip is lost, damaged, stolen, or misplaced, you will
              have to restart the entire severance process from the beginning.
            </Text>
          </div>

          <Heading as="h2">Need help or advice?</Heading>
          <Text as="p" size="body">
            Contact the <strong>NIS Severance Payment Department</strong>. They
            can give you free advice and help you claim if your employer does
            not pay.
          </Text>
          <div>
            <Button onClick={restart} type="button" variant="secondary">
              Start again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
