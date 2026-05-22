"use client";

import { Button, Select } from "@govtech-bb/react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  type Coordinates,
  filterByParish,
  formatDistance,
  haversineKm,
  listParishes,
  sortByDistance,
} from "@/lib/justice-of-the-peace";
import type { JusticeOfThePeace } from "@/types/justice-of-the-peace";

const FinderMap = dynamic(
  () => import("./finder-map").then((m) => m.FinderMap),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[clamp(380px,70vh,620px)] w-full border border-grey-00 bg-grey-00"
      />
    ),
  }
);

const PAGE_SIZE = 20;

type GeoStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string };

interface JusticeOfThePeaceFinderProps {
  jps: JusticeOfThePeace[];
}

export function JusticeOfThePeaceFinder({ jps }: JusticeOfThePeaceFinderProps) {
  const [parish, setParish] = useState("");
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>({ state: "idle" });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const parishes = useMemo(() => listParishes(jps), [jps]);

  const results = useMemo(() => {
    const filtered = filterByParish(jps, parish);
    return userLocation ? sortByDistance(filtered, userLocation) : filtered;
  }, [jps, parish, userLocation]);

  const visible = results.slice(0, visibleCount);
  const remaining = Math.max(0, results.length - visibleCount);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setGeoStatus({
        state: "error",
        message:
          "Your browser does not support location access. Try picking a parish instead.",
      });
      return;
    }
    setGeoStatus({ state: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoStatus({ state: "idle" });
        setVisibleCount(PAGE_SIZE);
        setSelectedId(null);
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Location access was denied. You can enable it in your browser settings, or pick a parish instead."
            : "We couldn't get your location. Try again, or pick a parish instead.";
        setGeoStatus({ state: "error", message });
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 60_000 }
    );
  };

  const handleClear = () => {
    setParish("");
    setUserLocation(null);
    setGeoStatus({ state: "idle" });
    setSelectedId(null);
    setVisibleCount(PAGE_SIZE);
  };

  const handleParishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParish(event.target.value);
    setVisibleCount(PAGE_SIZE);
    setSelectedId(null);
  };

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const hasActiveFilter = Boolean(parish || userLocation);
  const resultsContextLabel = parish
    ? parish
    : userLocation
      ? "your location"
      : null;
  const resultsMeta = `${results.length.toLocaleString()} ${
    results.length === 1 ? "JP" : "JPs"
  }${resultsContextLabel ? ` ${userLocation ? "near" : "in"} ${resultsContextLabel}` : ""}`;

  return (
    <div className="mt-6 flex flex-col gap-6">
      <section
        aria-label="Filter Justices of the Peace"
        className="grid grid-cols-1 gap-4 border border-grey-00 bg-grey-00 p-4 md:grid-cols-2 md:items-end"
      >
        <Select
          label="Find by parish"
          name="parish"
          onChange={handleParishChange}
          value={parish}
        >
          <option value="">All parishes</option>
          {parishes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-blue-100 text-sm">
            Find by location
          </span>
          <Button
            disabled={geoStatus.state === "loading"}
            onClick={handleLocate}
            type="button"
            variant="secondary"
          >
            {geoStatus.state === "loading"
              ? "Finding your location…"
              : userLocation
                ? "Update my location"
                : "Use my location"}
          </Button>
          {geoStatus.state === "error" && (
            <p className="text-red-100 text-sm" id="jp-geo-error" role="alert">
              {geoStatus.message}
            </p>
          )}
        </div>

        {hasActiveFilter && (
          <div className="md:col-span-2 md:flex md:justify-end">
            <button
              className="cursor-pointer text-blue-100 text-sm underline"
              onClick={handleClear}
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-3 border-dark-grey-00 border-b-2 pb-2">
            <p className="font-bold text-blue-100">{resultsMeta}</p>
            {results.length > 0 && (
              <p className="text-mid-grey-00 text-sm">
                Showing{" "}
                {Math.min(visibleCount, results.length).toLocaleString()}
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <p className="text-mid-grey-00">
              No Justices of the Peace match this filter. Try clearing it, or
              pick a different parish.
            </p>
          ) : (
            <>
              <ul className="m-0 list-none divide-y divide-grey-00 p-0">
                {visible.map((jp) => (
                  <JpListItem
                    distanceKm={
                      userLocation ? haversineKm(userLocation, jp) : null
                    }
                    isSelected={selectedId === jp.id}
                    jp={jp}
                    key={jp.id}
                    onSelect={handleSelect}
                  />
                ))}
              </ul>
              {remaining > 0 && (
                <Button
                  className="self-start"
                  onClick={() =>
                    setVisibleCount((n) =>
                      Math.min(results.length, n + PAGE_SIZE)
                    )
                  }
                  type="button"
                  variant="secondary"
                >
                  Show {Math.min(remaining, PAGE_SIZE)} more
                  {remaining > PAGE_SIZE ? ` of ${remaining}` : ""}
                </Button>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:sticky lg:top-4">
          <FinderMap
            jps={results}
            onSelect={handleSelect}
            selectedId={selectedId}
            userLocation={userLocation}
          />
          <p className="text-mid-grey-00 text-sm">
            Many JPs share a single map point because the source data only
            geocoded to parish level. We&rsquo;re tracking this — see the list
            for the full address of each JP.
          </p>
        </div>
      </div>
    </div>
  );
}

interface JpListItemProps {
  jp: JusticeOfThePeace;
  isSelected: boolean;
  distanceKm: number | null;
  onSelect: (id: number) => void;
}

function JpListItem({ jp, isSelected, distanceKm, onSelect }: JpListItemProps) {
  const address = jp.area?.trim() || jp.business?.trim() || "";
  const addressLabel = jp.area?.trim() ? "Home" : "Work";

  return (
    <li>
      <button
        aria-pressed={isSelected}
        className={`grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-1 px-2 py-3 text-left transition-colors hover:bg-grey-00 ${
          isSelected ? "border-yellow-100 border-l-4 bg-yellow-10 pl-1" : ""
        }`}
        onClick={() => onSelect(jp.id)}
        type="button"
      >
        <span className="font-bold text-blue-100 text-lg leading-tight">
          {jp.name}
        </span>
        {distanceKm !== null && (
          <span className="self-start whitespace-nowrap rounded bg-green-00 px-2 py-0.5 font-bold text-white text-xs">
            {formatDistance(distanceKm)}
          </span>
        )}
        <span className="justify-self-start rounded bg-grey-00 px-2 py-0.5 text-dark-grey-00 text-xs">
          {jp.parish}
        </span>
        {address && (
          <span className="col-span-2 text-mid-grey-00 text-sm leading-snug">
            <span className="mr-1 inline-block rounded bg-grey-00 px-1.5 py-0.5 font-bold text-[10px] text-dark-grey-00 uppercase tracking-wider">
              {addressLabel}
            </span>
            {address}
          </span>
        )}
      </button>
    </li>
  );
}
