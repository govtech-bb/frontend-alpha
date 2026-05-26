"use client";

import { Button, Select } from "@govtech-bb/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    const id = setInterval(() => {
      setBarbadosNow(getBarbadosTime());
    }, TICK_INTERVAL_MS);
    return () => clearInterval(id);
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
  const handleOpenOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenOnly(event.target.checked);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };

  const timeChip = `${formatBarbadosDate(date)}, ${formatBarbadosTime(date)}`;

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div
        aria-live="polite"
        className="inline-flex w-fit items-center gap-2 border border-grey-00 bg-grey-00 px-3 py-1.5 font-bold text-blue-100 text-sm"
      >
        {timeChip}
      </div>

      <section
        aria-label="Filter pharmacies"
        className="flex flex-col gap-4 border border-grey-00 bg-grey-00 p-4"
      >
        <label className="flex items-center gap-3">
          <input
            aria-checked={openOnly}
            checked={openOnly}
            className="h-5 w-5 cursor-pointer"
            onChange={handleOpenOnlyChange}
            role="switch"
            type="checkbox"
          />
          <span className="font-bold text-sm">Open now only</span>
        </label>

        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 block font-bold text-blue-100 text-sm">
            Type
          </legend>
          <div className="flex flex-wrap gap-2">
            {TYPE_OPTIONS.map((opt) => {
              const isActive = activeType === opt.value;
              return (
                <button
                  aria-pressed={isActive}
                  className={`cursor-pointer border-2 px-3.5 py-1 font-bold text-sm leading-snug transition-colors ${
                    isActive
                      ? "border-blue-100 bg-blue-100 text-white"
                      : "border-grey-00 bg-white text-blue-100 hover:border-blue-100"
                  }`}
                  key={opt.value}
                  onClick={() => handleTypeChange(opt.value)}
                  type="button"
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-end">
          <Select
            label="Parish"
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

          <div className="flex flex-col gap-2">
            <span className="font-bold text-blue-100 text-sm">Map</span>
            <Button
              onClick={() => setMapVisible((v) => !v)}
              type="button"
              variant="secondary"
            >
              {mapVisible ? "Hide map" : "Show map"}
            </Button>
          </div>
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

      <div className="flex items-baseline justify-between gap-3 border-dark-grey-00 border-b-2 pb-2">
        <p className="font-bold text-blue-100">
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
        <span className="inline-flex items-center bg-green-40 px-2 py-0.5 font-bold text-green-00 text-xs">
          Open now{closingNote}
        </span>
      );
    }
    if (status === false) {
      const nextNote = next ? ` · opens ${nextLabel(next, day)}` : "";
      return (
        <span className="inline-flex items-center bg-red-10 px-2 py-0.5 font-bold text-red-00 text-xs">
          Closed now{nextNote}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center bg-grey-00 px-2 py-0.5 font-bold text-mid-grey-00 text-xs">
        Hours unconfirmed
      </span>
    );
  })();

  return (
    <li className="border border-grey-00 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="m-0 font-bold text-blue-100 text-lg leading-tight">
          {pharmacy.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center bg-grey-00 px-2 py-0.5 text-dark-grey-00 text-xs">
            {TYPE_LABEL[pharmacy.type]}
          </span>
          {statusBadge}
        </div>
      </div>

      <p className="mt-2 text-mid-grey-00 text-sm">{pharmacy.address}</p>

      {pharmacy.phone && (
        <p className="mt-1 text-sm">
          <a
            className="text-blue-100 underline"
            href={formatPhoneHref(pharmacy.phone)}
          >
            {pharmacy.phone}
          </a>
        </p>
      )}

      <p className="mt-1 text-mid-grey-00 text-sm">{pharmacy.hoursText}</p>

      {pharmacy.notes && (
        <p className="mt-2 text-mid-grey-00 text-sm">{pharmacy.notes}</p>
      )}

      {pharmacy.routes && (
        <p className="mt-1 text-mid-grey-00 text-sm">{pharmacy.routes}</p>
      )}

      <div className="mt-3">
        <a
          aria-label={`Get directions to ${pharmacy.name}`}
          className="inline-flex items-center border-2 border-blue-100 px-3 py-1 font-bold text-blue-100 text-sm hover:bg-blue-100 hover:text-white"
          href={buildDirectionsHref(pharmacy)}
          rel="noopener"
          target="_blank"
        >
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

function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav aria-label="Pharmacy list pages" className="flex flex-wrap gap-2">
      <button
        aria-label="Previous page"
        className="cursor-pointer border-2 border-grey-00 px-3 py-1 font-bold text-blue-100 text-sm disabled:cursor-not-allowed disabled:opacity-50"
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
            className={`cursor-pointer border-2 px-3 py-1 font-bold text-sm ${
              isCurrent
                ? "border-blue-100 bg-blue-100 text-white"
                : "border-grey-00 text-blue-100"
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
        className="cursor-pointer border-2 border-grey-00 px-3 py-1 font-bold text-blue-100 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        type="button"
      >
        Next ›
      </button>
    </nav>
  );
}
