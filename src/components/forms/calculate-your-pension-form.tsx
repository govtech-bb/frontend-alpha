"use client";

import {
  Button,
  ErrorSummary,
  Heading,
  Input,
  ShowHide,
  Text,
} from "@govtech-bb/react";
import { useMaskito } from "@maskito/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { masks, unmaskMoney } from "@/lib/masks";

const SERVICE_PATH = "/pensions-and-gratuities/calculate-your-pension";
const SERVICE_TITLE = "Calculate your pension";
const SERVICE_WARNING_MONTHS = 120;

interface Estimate {
  months: number;
  salary: number;
  fullAnnual: number;
  fullMonthly: number;
  reducedAnnual: number;
  reducedMonthly: number;
  gratuity: number;
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

function money(n: number): string {
  return `BDS$${(n || 0).toLocaleString("en-BB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function ResultCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "teal" | "green";
}) {
  const toneClasses =
    tone === "green"
      ? "border-green-00 bg-green-10 text-green-00"
      : "border-teal-00 bg-teal-10 text-teal-00";
  return (
    <div className={`rounded-sm border-l-4 px-4 py-3 ${toneClasses}`}>
      <p className="text-mid-grey-00 text-sm">{label}</p>
      <p className="font-bold text-2xl">{value}</p>
    </div>
  );
}

export default function CalculateYourPensionForm() {
  const router = useRouter();
  const [months, setMonths] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [monthsError, setMonthsError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const moneyMaskRef = useMaskito({ options: masks.money });

  function calculate() {
    const trimmedMonths = months.trim();
    const monthsNum = Number.parseInt(trimmedMonths, 10);
    const salaryNum = Number.parseFloat(unmaskMoney(salary));

    let mErr = "";
    let sErr = "";
    if (!trimmedMonths) {
      mErr = "Enter your total months of pensionable service";
    } else if (
      !(/^\d+$/.test(trimmedMonths) && Number.isFinite(monthsNum)) ||
      monthsNum <= 0
    ) {
      mErr =
        "Months of pensionable service must be a whole number greater than 0";
    }
    if (!salary.trim()) {
      sErr = "Enter your last annual salary";
    } else if (!Number.isFinite(salaryNum) || salaryNum <= 0) {
      sErr = "Last annual salary must be an amount greater than 0";
    }

    setMonthsError(mErr);
    setSalaryError(sErr);
    if (mErr || sErr) {
      setEstimate(null);
      return;
    }

    const fullAnnual = (monthsNum / 600) * salaryNum;
    const reducedAnnual = fullAnnual * 0.75;
    setEstimate({
      months: monthsNum,
      salary: salaryNum,
      fullAnnual,
      fullMonthly: fullAnnual / 12,
      reducedAnnual,
      reducedMonthly: reducedAnnual / 12,
      gratuity: (fullAnnual / 4) * 12.5,
    });

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }

  function recalc() {
    setEstimate(null);
    setMonths("");
    setSalary("");
    setMonthsError("");
    setSalaryError("");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  const showServiceWarning =
    estimate !== null && estimate.months < SERVICE_WARNING_MONTHS;
  const hasErrors = !!(monthsError || salaryError);

  return (
    <>
      <div className="container py-4 lg:py-6">
        <Breadcrumbs />
      </div>
      <div className="container pb-8 lg:pb-12">
        <div className="flex flex-col gap-6">
          {hasErrors && (
            <ErrorSummary
              errors={[
                ...(monthsError
                  ? [{ text: monthsError, target: "months" }]
                  : []),
                ...(salaryError
                  ? [{ text: salaryError, target: "salary" }]
                  : []),
              ]}
              title="There is a problem"
            />
          )}
          <ServiceTitle />
          <Heading as="h1">Pension calculator</Heading>

          <div className="border-blue-40 border-l-4 bg-blue-10 p-4">
            <Text as="p" size="body">
              <strong>This calculator gives an estimate only.</strong> Your
              actual pension depends on information held by the Personnel
              Administration Division and your last employer. Contact them to
              confirm your exact figures before making any decisions.
            </Text>
          </div>

          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
          >
            <div className="max-w-[14rem]">
              <Input
                description="Enter the total number of complete months. No-pay leave does not count."
                error={monthsError || undefined}
                id="months"
                inputMode="numeric"
                label="Months of pensionable service"
                onInput={(e) => setMonths(e.currentTarget.value)}
                required
                value={months}
              />
            </div>

            <div className="max-w-[18rem]">
              <Input
                description="Enter your gross annual salary in Barbados dollars."
                error={salaryError || undefined}
                id="salary"
                inputMode="decimal"
                label="Last annual salary (BDS$)"
                onInput={(e) => setSalary(e.currentTarget.value)}
                ref={moneyMaskRef}
                required
                value={salary}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => router.push(SERVICE_PATH)}
                type="button"
                variant="secondary"
              >
                Back
              </Button>
              <Button type="submit">Calculate pension</Button>
            </div>
          </form>

          {estimate && (
            <section
              aria-live="polite"
              className="flex flex-col gap-4"
              ref={resultsRef}
            >
              <Heading as="h2">Your estimated pension</Heading>
              <Text as="p" className="text-mid-grey-00" size="caption">
                Based on {estimate.months} month
                {estimate.months === 1 ? "" : "s"} of service and a last annual
                salary of {money(estimate.salary)}.
              </Text>

              {showServiceWarning && (
                <div className="border-yellow-00 border-l-4 bg-yellow-10 p-4">
                  <Text as="p" size="body">
                    <strong>You may not be entitled to a pension.</strong>{" "}
                    Workers with fewer than 10 years (120 months) of pensionable
                    service who leave during that period do not receive a
                    pension. The figures below are shown for information only.
                    Contact the PAD to confirm your entitlement before making
                    any plans.
                  </Text>
                </div>
              )}

              <Heading as="h3">Full pension</Heading>
              <Text as="p" size="body">
                You receive your full pension amount divided by 12 and paid
                monthly, plus a gratuity lump sum. Choose this if you want the
                highest possible monthly income in retirement.
              </Text>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ResultCard
                  label="Annual amount"
                  tone="teal"
                  value={money(estimate.fullAnnual)}
                />
                <ResultCard
                  label="Monthly payment"
                  tone="teal"
                  value={money(estimate.fullMonthly)}
                />
              </div>

              <Heading as="h3">Reduced pension</Heading>
              <Text as="p" size="body">
                You receive 75% of your full pension paid monthly. The remaining
                25% is converted into a larger gratuity lump sum paid upfront.
                This may suit you if you want more money at the start of
                retirement — for example, to pay off a mortgage or cover
                immediate costs — and can manage on a lower monthly income.
              </Text>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ResultCard
                  label="Annual amount"
                  tone="teal"
                  value={money(estimate.reducedAnnual)}
                />
                <ResultCard
                  label="Monthly payment"
                  tone="teal"
                  value={money(estimate.reducedMonthly)}
                />
              </div>

              <ResultCard
                label="Gratuity (lump sum)"
                tone="green"
                value={money(estimate.gratuity)}
              />

              <Text as="p" className="text-mid-grey-00" size="caption">
                These figures are estimates only. Contact the PAD to discuss
                which option suits your circumstances before you retire.
              </Text>

              <div>
                <Button onClick={recalc} type="button" variant="secondary">
                  Recalculate
                </Button>
              </div>
            </section>
          )}

          <div className="mt-4">
            <Heading as="h2">How your pension is calculated</Heading>

            <div className="mt-4">
              <Heading as="h3">Full pension</Heading>
              <Text as="p" size="body">
                A gratuity is paid as a lump sum. The annual pension is divided
                by 12 and paid monthly.
              </Text>
              <p className="mt-2 border-blue-40 border-l-4 bg-blue-10 px-4 py-2 font-mono text-sm">
                Formula: (months of service ÷ 600) × last annual salary
              </p>
            </div>

            <div className="mt-4">
              <Heading as="h3">Reduced pension</Heading>
              <Text as="p" size="body">
                75% of your full pension is divided by 12 and paid monthly. The
                remaining 25% is multiplied by 12.5 to give your gratuity lump
                sum.
              </Text>
              <p className="mt-2 border-blue-40 border-l-4 bg-blue-10 px-4 py-2 font-mono text-sm">
                Formula: full pension × 75%
              </p>
            </div>

            <div className="mt-4">
              <Heading as="h3">Gratuity</Heading>
              <p className="mt-2 border-blue-40 border-l-4 bg-blue-10 px-4 py-2 font-mono text-sm">
                Formula: (full pension ÷ 4) × 12.5
              </p>
            </div>

            <div className="mt-4">
              <Heading as="h3">Mixed service pension</Heading>
              <Text as="p" size="body">
                A fixed formula cannot be used for mixed service pensions
                because several varying factors apply. Contact the PAD for
                guidance.
              </Text>
            </div>
          </div>

          <div className="mt-4 border-grey-00 border-t-2 pt-6">
            <Heading as="h2">More about pensions and gratuities</Heading>

            <div className="mt-4 flex flex-col gap-3">
              <ShowHide summary="Things that affect your pension">
                <div className="flex flex-col gap-3">
                  <Heading as="h3">No-pay leave</Heading>
                  <Text as="p" size="body">
                    No-pay leave does not count towards your length of service.
                  </Text>

                  <Heading as="h3">Temporary continuous workers</Heading>
                  <ul className="list-disc space-y-2 pl-7">
                    <li>
                      Workers with 10 years or fewer of service who leave during
                      that period will not receive a pension.
                    </li>
                    <li>
                      Workers with more than 10 years of service who retire may
                      receive a pension, but only if the post they held was
                      established and vacant.
                    </li>
                  </ul>

                  <Heading as="h3">
                    Medical retirement (retiring due to ill health)
                  </Heading>
                  <Text as="p" size="body">
                    Special provisions apply if you retire because of medical
                    unfitness.
                  </Text>
                  <Text as="p" size="body">
                    You must have at least 10 years of service but fewer than
                    20. Your pension will be calculated as if you had 20 years
                    of service, but it cannot exceed what you would have
                    received based on your actual service.
                  </Text>
                  <Text as="p" size="body">
                    If you retire due to an employment injury, you are eligible
                    for an additional one-sixth of your pension.
                  </Text>

                  <Heading as="h3">Pension abatement</Heading>
                  <Text as="p" size="body">
                    Under the Pensions (Miscellaneous Provisions) Act 1975-31,
                    abatement applies to officers who entered service after 1
                    September 1975.
                  </Text>
                  <Text as="p" size="body">
                    If you qualify for both a National Insurance pension and a
                    government pension, you will receive the higher of the two
                    only.
                  </Text>
                  <Text as="p" size="body">
                    Abatement does not affect your cost of living allowance. If
                    you already receive a pension, your monthly payment will not
                    change — any increase will be paid as a cost of living
                    allowance instead.
                  </Text>
                </div>
              </ShowHide>

              <ShowHide summary="Retirement ages">
                <div className="flex flex-col gap-3">
                  <Heading as="h3">Voluntary retirement</Heading>
                  <ul className="list-disc space-y-2 pl-7">
                    <li>Age 55 — if appointed before 15 July 1985</li>
                    <li>Age 60 — if appointed after 15 July 1985</li>
                  </ul>

                  <Heading as="h3">Compulsory retirement</Heading>
                  <ul className="list-disc space-y-2 pl-7">
                    <li>Age 66 — from 1 January 2010</li>
                    <li>Age 66½ — from 1 January 2014</li>
                    <li>Age 67 — from 1 January 2018</li>
                  </ul>
                </div>
              </ShowHide>
            </div>
          </div>

          <div className="mt-4 border-grey-00 border-t-2 pt-6">
            <Heading as="h2">Next steps</Heading>
            <Text as="p" size="body">
              Once you have your estimate, contact the National Insurance and
              Social Security Service (NIS) to discuss your pension options and
              confirm your entitlement.
            </Text>

            <div className="mt-4">
              <Heading as="h3">
                National Insurance and Social Security Service (NIS) — Pensions
              </Heading>
              <Text as="p" size="body">
                NIS can help you understand your National Insurance pension
                entitlement alongside any government pension. If you qualify for
                both, you will receive only the higher of the two.
              </Text>
              <ul className="mt-2 list-disc space-y-2 pl-7">
                <li>
                  Phone: <a href="tel:+12464317400">431-7400</a> — Ext. 1802,
                  1803, 1808 or 1824
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 border-grey-00 border-t-2 pt-6">
            <Heading as="h2">Sources</Heading>
            <Text as="p" size="body">
              The information and formulas used in this calculator are drawn
              from the following sources:
            </Text>
            <ul className="mt-2 list-disc space-y-2 pl-7">
              <li>
                <a
                  href="https://treasury.gov.bb/content/pension-calculations"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Pension Calculations — Treasury of Barbados
                </a>
              </li>
              <li>Pensions (Miscellaneous Provisions) Act, 1975-31</li>
              <li>National Insurance and Social Security Act, Cap 47</li>
              <li>Pensions Acts, Caps 25, 30 and 56</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
