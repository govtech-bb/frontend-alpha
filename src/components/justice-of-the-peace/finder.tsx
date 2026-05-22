"use client";

import { Button, Select, Text } from "@govtech-bb/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Coordinates,
  filterByParish,
  filterByRadiusKm,
  formatDistance,
  haversineKm,
  listParishes,
  milesToKm,
  PARISH_CENTRES,
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

const RADIUS_OPTIONS: { miles: number; label: string }[] = [
  { miles: 5, label: "5 miles" },
  { miles: 10, label: "10 miles" },
  { miles: 0, label: "Island-wide" },
];

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
  // 0 = island-wide (no radius filter)
  const [radiusMiles, setRadiusMiles] = useState(5);

  // Sticky-on-scroll shim for the map column. A global ancestor uses
  // overflow:hidden, which breaks native position:sticky. We track the grid
  // container's scroll position and toggle the map between flow / fixed /
  // released states:
  //   - flow:     grid top still visible; map sits in normal flow.
  //   - fixed:    grid top scrolled off; map jumps to position:fixed.
  //   - released: grid bottom approaching; map switches to position:absolute
  //               anchored to the grid's bottom-right so it scrolls off
  //               naturally alongside the rest of the page instead of
  //               overlaying the content below the grid.
  const gridRef = useRef<HTMLDivElement>(null);
  const mapColumnRef = useRef<HTMLDivElement>(null);
  const mapInnerRef = useRef<HTMLDivElement>(null);
  const [stickyState, setStickyState] = useState<"flow" | "fixed" | "released">(
    "flow"
  );
  const [stickyMetrics, setStickyMetrics] = useState({
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const STICKY_BREAKPOINT = 1024; // matches Tailwind lg:
    const TOP_OFFSET = 16; // matches lg:top-4

    const update = () => {
      const grid = gridRef.current;
      const column = mapColumnRef.current;
      const inner = mapInnerRef.current;
      if (!(grid && column && inner)) return;

      if (window.innerWidth < STICKY_BREAKPOINT) {
        setStickyState("flow");
        return;
      }

      const gridRect = grid.getBoundingClientRect();
      const columnRect = column.getBoundingClientRect();
      const innerHeight = inner.offsetHeight;

      if (gridRect.top >= TOP_OFFSET) {
        setStickyState("flow");
      } else if (gridRect.bottom < innerHeight + TOP_OFFSET) {
        // Anchor to grid bottom so the map scrolls off with the page.
        setStickyState("released");
        setStickyMetrics({
          left: columnRect.left - gridRect.left,
          width: columnRect.width,
          height: innerHeight,
        });
      } else {
        setStickyState("fixed");
        setStickyMetrics({
          left: columnRect.left,
          width: columnRect.width,
          height: innerHeight,
        });
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const parishes = useMemo(() => listParishes(jps), [jps]);

  // The anchor used for radius filtering and distance sorting. The user's
  // pin wins over the parish centroid when both are present.
  const anchor: Coordinates | null =
    userLocation ?? (parish ? (PARISH_CENTRES[parish] ?? null) : null);
  const showRadiusPicker = anchor !== null;
  const radiusKm = radiusMiles > 0 ? milesToKm(radiusMiles) : null;

  const results = useMemo(() => {
    // When an anchor is in play (user pin or parish centroid), the parish
    // dropdown acts only as the anchor source — neighbouring-parish JPs are
    // included so long as they fall inside the radius. Without an anchor, the
    // parish dropdown acts as a plain text filter.
    let filtered = anchor ? jps : filterByParish(jps, parish);
    if (anchor && radiusKm !== null) {
      filtered = filterByRadiusKm(filtered, anchor, radiusKm);
    }
    return anchor ? sortByDistance(filtered, anchor) : filtered;
  }, [jps, parish, anchor, radiusKm]);

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
    setRadiusMiles(5);
  };

  const handleRadiusChange = (miles: number) => {
    setRadiusMiles(miles);
    setVisibleCount(PAGE_SIZE);
    setSelectedId(null);
  };

  const applyParishFilter = (next: string) => {
    setParish(next);
    setVisibleCount(PAGE_SIZE);
    setSelectedId(null);
  };

  const handleParishChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    applyParishFilter(event.target.value);
  };

  const handleParishSelect = (next: string) => {
    applyParishFilter(parish === next ? "" : next);
  };

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const hasActiveFilter = Boolean(parish || userLocation);
  const shownCount = Math.min(visibleCount, results.length);
  const jpLabel = results.length === 1 ? "JP" : "JPs";
  const scopeLabel = userLocation
    ? "near your location"
    : parish
      ? `near ${parish}`
      : "across all parishes";
  const resultsHeading = `Showing ${shownCount.toLocaleString()} of ${results.length.toLocaleString()} ${jpLabel} ${scopeLabel}`;

  const anchorLabel = userLocation ? "your location" : parish ? parish : null;
  const mapHint = anchorLabel
    ? radiusMiles > 0
      ? `Showing JPs within ${radiusMiles} miles of ${anchorLabel}.`
      : `Showing all JPs across Barbados, sorted by distance from ${anchorLabel}.`
    : "Every JP icon you see is a Justice of the Peace. Pick a parish or use your location to narrow the list.";

  return (
    <div className="mt-6 flex flex-col gap-6">
      <section
        aria-label="Filter Justices of the Peace"
        className="grid grid-cols-1 gap-4 border border-grey-00 bg-grey-00 p-4 lg:grid-cols-2 lg:items-end"
      >
        <Select
          className="w-full"
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

        <div className="flex w-full flex-col gap-2">
          <span className="font-bold">Find by location</span>
          <Button
            className="w-full border-2 hover:cursor-pointer hover:bg-green-00! hover:text-white!"
            disabled={geoStatus.state === "loading"}
            onClick={handleLocate}
            type="button"
            variant="tertiary"
          >
            {geoStatus.state === "loading"
              ? "Finding your location…"
              : userLocation
                ? "Update my location"
                : "Use my location"}
          </Button>
          {geoStatus.state === "error" && (
            <p className="text-red-00 text-sm" id="jp-geo-error" role="alert">
              {geoStatus.message}
            </p>
          )}
        </div>

        {showRadiusPicker && (
          <fieldset className="m-0 flex flex-col gap-2 border-blue-40 border-l-4 bg-blue-10 px-4 py-3 lg:col-span-2">
            <legend className="float-left mb-1 p-0 font-bold text-dark-grey-00 text-sm">
              Show JPs within:
            </legend>
            <div className="flex flex-wrap gap-2">
              {RADIUS_OPTIONS.map((opt) => {
                const isActive = radiusMiles === opt.miles;
                return (
                  <button
                    aria-pressed={isActive}
                    className={`cursor-pointer border-2 px-3.5 py-1 font-bold text-sm leading-snug transition-colors ${
                      isActive
                        ? "border-dark-blue-00 bg-blue-40 text-dark-blue-00"
                        : "border-blue-40 bg-white text-dark-blue-00 hover:bg-blue-40"
                    }`}
                    key={opt.miles}
                    onClick={() => handleRadiusChange(opt.miles)}
                    type="button"
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {hasActiveFilter && (
          <div className="lg:col-span-2 lg:flex lg:justify-end">
            <button
              className="cursor-pointer text-base text-green-800 underline"
              onClick={handleClear}
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <div
        className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start"
        ref={gridRef}
      >
        <div className="order-2 flex flex-col gap-4 lg:order-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-bold">{resultsHeading}</p>
            {hasActiveFilter && (
              <button
                className="cursor-pointer text-base text-green-700 underline"
                onClick={handleClear}
                type="button"
              >
                Clear
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <p className="text-mid-grey-00">
              No Justices of the Peace match this filter. Try clearing it, or
              pick a different parish.
            </p>
          ) : (
            <>
              <ul className="m-0 flex list-none flex-col gap-6 p-0">
                {visible.map((jp) => (
                  <JpListItem
                    distanceKm={anchor ? haversineKm(anchor, jp) : null}
                    isSelected={selectedId === jp.id}
                    jp={jp}
                    key={jp.id}
                    onSelect={handleSelect}
                  />
                ))}
              </ul>
              {remaining > 0 && (
                <Button
                  className="w-full border-2 hover:cursor-pointer hover:bg-green-00! hover:text-white!"
                  onClick={() =>
                    setVisibleCount((n) =>
                      Math.min(results.length, n + PAGE_SIZE)
                    )
                  }
                  type="button"
                  variant="tertiary"
                >
                  Show {Math.min(remaining, PAGE_SIZE)} more{" "}
                  <span className="font-normal">
                    ({remaining.toLocaleString()} remaining)
                  </span>
                </Button>
              )}
            </>
          )}

          <div className="mt-8 border-blue-100 border-l-4 bg-blue-10 px-5 py-4">
            <Text as="p">
              <strong>You may already know one of these people.</strong> If you
              recognise a name on this list, you can go to them directly — no
              appointment or referral needed.
            </Text>
          </div>

          <Text as="p" className="mt-6 text-base text-gray-800">
            <strong>About the list.</strong> Each row shows the JP&rsquo;s{" "}
            <strong>home address</strong> by default. If only a work address is
            on the register, the row is tagged{" "}
            <em>&ldquo;Work address&rdquo;</em>.
          </Text>

          <Text as="p" className="mt-2 text-base text-gray-800">
            <strong>About these pins.</strong> The official register lists each
            JP&rsquo;s parish and address as text — it has no map coordinates.
            We have looked the addresses up against OpenStreetMap to place each
            pin, so positions are usually within a few hundred metres of the
            real address. Where the address is not in OpenStreetMap, the pin
            shows the nearest known landmark instead. Always confirm using the
            address shown in the list.
          </Text>
        </div>

        <div
          className="order-1 flex flex-col gap-2 lg:order-2"
          ref={mapColumnRef}
        >
          <div
            style={{
              minHeight:
                stickyState === "flow" ? undefined : stickyMetrics.height,
            }}
          >
            <div
              className="flex flex-col gap-2"
              ref={mapInnerRef}
              style={
                stickyState === "fixed"
                  ? {
                      position: "fixed",
                      top: 16,
                      left: stickyMetrics.left,
                      width: stickyMetrics.width,
                    }
                  : stickyState === "released"
                    ? {
                        position: "absolute",
                        bottom: 0,
                        left: stickyMetrics.left,
                        width: stickyMetrics.width,
                      }
                    : undefined
              }
            >
              {mapHint && (
                <Text as="p" className="text-base text-gray-500">
                  {mapHint}
                </Text>
              )}
              <FinderMap
                jps={visible}
                onParishSelect={handleParishSelect}
                onSelect={handleSelect}
                radiusAnchor={anchor}
                radiusKm={radiusKm}
                selectedId={selectedId}
                selectedParish={parish}
                userLocation={userLocation}
              />
            </div>
          </div>
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
  const homeAddress = jp.area?.trim() ?? "";
  const workAddress = jp.business?.trim() ?? "";
  const address = homeAddress || workAddress;
  const isWorkOnly = !homeAddress && Boolean(workAddress);

  return (
    <li>
      <button
        aria-pressed={isSelected}
        className={`grid w-full grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-left ${
          isSelected ? "bg-grey-00 px-3 py-2" : ""
        }`}
        onClick={() => onSelect(jp.id)}
        type="button"
      >
        <span className="font-bold text-2xl leading-tight">{jp.name}</span>
        {distanceKm !== null && (
          <span className="self-start whitespace-nowrap rounded bg-green-00 px-2 py-1 font-bold text-white text-xs">
            {formatDistance(distanceKm)}
          </span>
        )}
        <span className="col-span-2 text-mid-grey-00 text-sm">
          {address && (
            <span>
              {isWorkOnly && (
                <em className="mr-1 text-dark-grey-00 text-sm not-italic">
                  Work address:
                </em>
              )}
              {address}
            </span>
          )}
          , {jp.parish}
        </span>
      </button>
    </li>
  );
}
