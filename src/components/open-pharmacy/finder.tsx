"use client";

import { Select, Text } from "@govtech-bb/react";
import { Clock, Map as MapIcon, MapPin, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BARBADOS_PARISHES,
  buildDirectionsHref,
  closingMinutes,
  DAY_NAMES,
  filterByOpenNow,
  filterByParish,
  filterByType,
  formatBarbadosDate,
  formatBarbadosTime,
  formatMinutesAsTime,
  formatPhoneHref,
  getBarbadosTime,
  nextOpening,
  openStatus,
  sortPharmacies,
  TYPE_COLOURS,
  TYPE_LEGEND_LABELS,
} from "@/lib/open-pharmacy";
import type { Pharmacy, PharmacyType } from "@/types/pharmacy";

const FinderMap = dynamic(
  () => import("./finder-map").then((m) => m.FinderMap),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[clamp(380px,60vh,560px)] w-full border border-grey-00 bg-grey-00"
      />
    ),
  }
);

const PAGE_SIZE = 20;
const TICK_INTERVAL_MS = 60_000;

type TypeFilter = PharmacyType | "all";
type ParishFilter = string;

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "government", label: "Government" },
  { value: "private-sbs", label: "Private SBS" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

const TYPE_LABEL: Record<PharmacyType, string> = {
  government: "Government · Free",
  "private-sbs": "Private SBS · Dispensing fee",
  unconfirmed: "SBS status unconfirmed",
};

interface OpenPharmacyFinderProps {
  pharmacies: Pharmacy[];
}

export function OpenPharmacyFinder({ pharmacies }: OpenPharmacyFinderProps) {
  const [activeType, setActiveType] = useState<TypeFilter>("all");
  const [activeParish, setActiveParish] = useState<ParishFilter>("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mapVisible, setMapVisible] = useState(false);
  const [barbadosNow, setBarbadosNow] = useState(() => getBarbadosTime());
  const [isStuck, setIsStuck] = useState(false);
  const filterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setBarbadosNow(getBarbadosTime());
    }, TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Detect when the filter bar becomes stuck to the top of the viewport.
  // A fully-visible bar has intersectionRatio 1; once it sticks at top:0 the
  // 1px shrunk root margin clips its top edge, dropping the ratio below 1.
  useEffect(() => {
    const el = filterRef.current;
    if (!el) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(entry.intersectionRatio < 1),
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { day, minutes, date } = barbadosNow;

  const filtered = useMemo(() => {
    let list = filterByType(pharmacies, activeType);
    list = filterByParish(list, activeParish);
    if (openOnly) {
      list = filterByOpenNow(list, day, minutes);
    }
    return sortPharmacies(list, day, minutes);
  }, [pharmacies, activeType, activeParish, openOnly, day, minutes]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(currentPage, totalPages);
  const start = (clampedPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, filtered.length);
  const pageItems = filtered.slice(start, end);
  const openCount = filtered.filter(
    (p) => openStatus(p, day, minutes) === true
  ).length;

  // Reset to page 1 whenever filters change.
  const handleTypeChange = (type: TypeFilter) => {
    setActiveType(type);
    setCurrentPage(1);
  };
  const handleParishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveParish(event.target.value);
    setCurrentPage(1);
  };
  const handleOpenOnlyChange = (next: boolean) => {
    setOpenOnly(next);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const timeChip = `${formatBarbadosDate(date)}, ${formatBarbadosTime(date)}`;

  return (
    <div className="mt-4 flex flex-col gap-6">
      <p className="m-0 flex items-center gap-2 text-mid-grey-00">
        <Clock aria-hidden="true" className="size-5 shrink-0" />
        <span aria-live="polite">{timeChip}</span>
      </p>

      <Text as="p" className="text-mid-grey-00">
        12 government polyclinic pharmacies (free) and over 70 private
        pharmacies that accept Special Benefit Service (SBS) prescriptions, with
        a small dispensing fee, across Barbados. Filter by parish or type to
        find one near you.
      </Text>

      <section
        aria-label="Filter pharmacies"
        className={`sticky top-0 z-20 border-grey-00 border-y bg-white ${
          isStuck ? "ml-[calc(50%-50vw)] w-screen" : ""
        }`}
        ref={filterRef}
      >
        <div
          className={`flex flex-wrap items-center gap-4 py-4 ${
            isStuck ? "container" : ""
          }`}
        >
          <button
            aria-checked={openOnly}
            className="inline-flex cursor-pointer items-center gap-3"
            onClick={() => handleOpenOnlyChange(!openOnly)}
            role="switch"
            type="button"
          >
            <span
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                openOnly ? "bg-green-00" : "bg-grey-00"
              }`}
            >
              <span
                className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform ${
                  openOnly ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </span>
            <span className="font-bold text-base">Open now only</span>
          </button>

          <fieldset className="m-0 flex flex-wrap items-center gap-2 border-0 p-0">
            <legend className="float-left mr-2 font-bold text-base text-black-00">
              Type:
            </legend>
            {TYPE_OPTIONS.map((opt) => {
              const isActive = activeType === opt.value;
              const swatch =
                opt.value === "all" ? null : TYPE_COLOURS[opt.value];
              return (
                <button
                  aria-pressed={isActive}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 font-bold text-sm transition-colors ${
                    isActive
                      ? "border-green-00 bg-green-00 text-white"
                      : "border-grey-00 bg-white text-black-00 hover:border-green-00"
                  }`}
                  key={opt.value}
                  onClick={() => handleTypeChange(opt.value)}
                  type="button"
                >
                  {swatch && (
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: swatch }}
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </fieldset>

          <div className="flex items-center gap-2">
            <label
              className="font-bold text-base text-black-00"
              htmlFor="parish-filter"
            >
              Parish:
            </label>
            <div className="w-48">
              <Select
                id="parish-filter"
                name="parish"
                onChange={handleParishChange}
                value={activeParish}
              >
                <option value="all">All parishes</option>
                {BARBADOS_PARISHES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <button
            className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-sm border-2 border-teal-00 px-4 py-2 font-bold text-teal-00 transition-colors hover:bg-teal-00 hover:text-white"
            onClick={() => setMapVisible((v) => !v)}
            type="button"
          >
            <MapIcon aria-hidden="true" className="size-5 shrink-0" />
            {mapVisible ? "Hide map" : "Show map"}
          </button>
        </div>
      </section>

      {openOnly && (
        <p className="text-mid-grey-00 text-sm" role="note">
          Pharmacies with unconfirmed hours are not shown when &lsquo;Open
          now&rsquo; is selected.
        </p>
      )}

      {mapVisible && (
        <FinderMap day={day} minutes={minutes} pharmacies={filtered} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 font-bold text-black-00">
          {filtered.length === 0
            ? "No pharmacies match your filters"
            : `Showing ${start + 1}–${end} of ${filtered.length} pharmacies`}
          {openCount > 0 && (
            <>
              {" · "}
              <span className="text-green-00">{openCount} open now</span>
            </>
          )}
        </p>
        <ul className="m-0 flex flex-wrap items-center gap-x-4 gap-y-1.5 p-0">
          {(Object.keys(TYPE_LEGEND_LABELS) as PharmacyType[]).map((type) => (
            <li
              className="flex list-none items-center gap-2 text-mid-grey-00 text-sm"
              key={type}
            >
              <span
                aria-hidden="true"
                className="size-3 shrink-0 rounded-[2px]"
                style={{ backgroundColor: TYPE_COLOURS[type] }}
              />
              {TYPE_LEGEND_LABELS[type]}
            </li>
          ))}
        </ul>
      </div>

      {filtered.length === 0 ? (
        <p className="text-mid-grey-00">
          Try a different parish or remove the open-now filter.
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {pageItems.map((p) => (
            <PharmacyCard day={day} key={p.id} minutes={minutes} pharmacy={p} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={clampedPage}
          onChange={goToPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  day: number;
  minutes: number;
}

function PharmacyCard({ pharmacy, day, minutes }: PharmacyCardProps) {
  const status = openStatus(pharmacy, day, minutes);
  const closesAt =
    status === true ? closingMinutes(pharmacy, day, minutes) : null;
  const next = status === false ? nextOpening(pharmacy, day, minutes) : null;

  const statusBadge = (() => {
    if (status === true) {
      const closingNote =
        closesAt === null ? "" : ` · closes ${formatMinutesAsTime(closesAt)}`;
      return (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-40 px-3 py-1 font-bold text-green-00 text-xs">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-green-00"
          />
          Open now{closingNote}
        </span>
      );
    }
    if (status === false) {
      const nextNote = next ? ` · opens ${nextLabel(next, day)}` : "";
      return (
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-10 px-3 py-1 font-bold text-red-00 text-xs">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-red-00"
          />
          Closed now{nextNote}
        </span>
      );
    }
    return (
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-grey-00 px-3 py-1 font-bold text-mid-grey-00 text-xs">
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-mid-grey-00"
        />
        Hours unconfirmed
      </span>
    );
  })();

  return (
    <li className="relative overflow-hidden rounded-lg border border-grey-00 bg-white p-6 pl-7 shadow-sm">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1.5 bg-blue-00"
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="m-0 font-bold text-black-00 text-xl leading-tight">
          {pharmacy.name}
        </h3>
        <div className="flex flex-col items-end gap-1.5">
          <span className="inline-flex w-fit items-center rounded-full bg-blue-00 px-3 py-1 font-bold text-white text-xs">
            {TYPE_LABEL[pharmacy.type]}
          </span>
          {statusBadge}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <p className="m-0 flex items-start gap-2 text-mid-grey-00">
          <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <span>{pharmacy.address}</span>
        </p>

        {pharmacy.phone && (
          <p className="m-0 flex items-center gap-2">
            <Phone
              aria-hidden="true"
              className="size-5 shrink-0 text-mid-grey-00"
            />
            <a
              className="font-bold text-lg text-teal-00 no-underline hover:underline"
              href={formatPhoneHref(pharmacy.phone)}
            >
              {pharmacy.phone}
            </a>
          </p>
        )}
      </div>

      <hr className="my-4 border-grey-00" />

      <div className="flex flex-col gap-3">
        <p className="m-0 flex items-start gap-2 text-black-00">
          <Clock
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-mid-grey-00"
          />
          <span>{pharmacy.hoursText}</span>
        </p>

        {pharmacy.notes && (
          <p className="m-0 rounded bg-grey-00 px-4 py-2.5 text-mid-grey-00 italic">
            {pharmacy.notes}
          </p>
        )}

        {pharmacy.routes && (
          <p className="m-0 flex items-start gap-2 text-mid-grey-00">
            <MapIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <span>{pharmacy.routes}</span>
          </p>
        )}
      </div>

      <div className="mt-4">
        <a
          aria-label={`Get directions to ${pharmacy.name}`}
          className="inline-flex items-center gap-2 rounded bg-teal-00 px-5 py-3 font-bold text-white transition-opacity hover:opacity-90"
          href={buildDirectionsHref(pharmacy)}
          rel="noopener"
          target="_blank"
        >
          <MapIcon aria-hidden="true" className="size-5 shrink-0" />
          Directions
        </a>
      </div>
    </li>
  );
}

function nextLabel(
  next: { daysAhead: number; weekday: number; openMinutes: number },
  today: number
): string {
  const dayLabel =
    next.daysAhead === 0
      ? "today"
      : next.daysAhead === 1 || (today + 1) % 7 === next.weekday
        ? "tomorrow"
        : DAY_NAMES[next.weekday];
  return `${dayLabel} at ${formatMinutesAsTime(next.openMinutes)}`;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// Layout-only base — colours are applied per state so they never conflict.
const PAGINATION_BUTTON_BASE =
  "min-w-12 cursor-pointer rounded-lg border px-4 py-2.5 text-center font-bold text-base shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";
const PAGINATION_BUTTON_INACTIVE =
  "border-grey-00 bg-white text-black-00 hover:border-teal-00 disabled:hover:border-grey-00";
const PAGINATION_BUTTON_ACTIVE = "border-green-00 bg-green-00 text-white";

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Pharmacy list pages"
      className="flex flex-wrap justify-center gap-2 pt-4 pb-10"
    >
      <button
        aria-label="Previous page"
        className={`${PAGINATION_BUTTON_BASE} ${PAGINATION_BUTTON_INACTIVE}`}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        type="button"
      >
        ‹ Prev
      </button>
      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            aria-current={isCurrent ? "page" : undefined}
            aria-label={`Go to page ${p}`}
            className={`${PAGINATION_BUTTON_BASE} ${
              isCurrent ? PAGINATION_BUTTON_ACTIVE : PAGINATION_BUTTON_INACTIVE
            }`}
            key={p}
            onClick={() => onChange(p)}
            type="button"
          >
            {p}
          </button>
        );
      })}
      <button
        aria-label="Next page"
        className={`${PAGINATION_BUTTON_BASE} ${PAGINATION_BUTTON_INACTIVE}`}
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        type="button"
      >
        Next ›
      </button>
    </nav>
  );
}
