/**
 * Emergency shelter finder (interactive)
 * --------------------------------------------------------------
 * Search 70 shelters by name; filter by parish, category and amenities using
 * the GOV.BB Filter pattern (collapsible panel of accordion checkbox groups
 * with removable filter tags); sort by parish, name, capacity or distance.
 * "Use my location" enables nearest-first ordering. Filter state is mirrored
 * to the URL so a filtered view can be shared.
 *
 * No live activation feed exists, so every shelter shows "Not currently open".
 */

"use client";

import {
  Button,
  Checkbox,
  Heading,
  Input,
  Link,
  Select,
  Text,
} from "@govtech-bb/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  EMERGENCY_SHELTERS,
  type LatLon,
  PARISHES,
  type Shelter,
} from "@/data/emergency-shelters";
import { shelterDistance, userIsOnIsland } from "@/lib/shelter-distance";
import { Chevron, CloseIcon, LocationIcon } from "./icons";
import { ShelterCard } from "./shelter-card";

const DEM_TEL = "tel:+12464387575";
const DEM_NUMBER = "438-7575";

type SortKey = "parish" | "name" | "capacity" | "distance";
type LocationState = "idle" | "loading" | "success";

interface Filters {
  parishes: string[];
  categories: string[];
  accessible: boolean;
  search: string;
}

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

const SORT_KEYS: readonly SortKey[] = [
  "parish",
  "name",
  "capacity",
  "distance",
];

function parseSort(value: string | null): SortKey {
  return value && (SORT_KEYS as readonly string[]).includes(value)
    ? (value as SortKey)
    : "parish";
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function matchesFilters(shelter: Shelter, f: Filters): boolean {
  if (f.parishes.length > 0 && !f.parishes.includes(shelter.parish)) {
    return false;
  }
  if (
    f.categories.length > 0 &&
    !f.categories.includes(String(shelter.category))
  ) {
    return false;
  }
  if (f.accessible && !shelter.access) {
    return false;
  }
  const query = f.search.trim().toLowerCase();
  if (
    query &&
    !(
      shelter.name.toLowerCase().includes(query) ||
      shelter.parish.toLowerCase().includes(query)
    )
  ) {
    return false;
  }
  return true;
}

function compareForSort(
  a: Shelter,
  b: Shelter,
  sort: SortKey,
  user: LatLon | null
): number {
  if (sort === "name") {
    return a.name.localeCompare(b.name);
  }
  if (sort === "capacity") {
    return b.capacity - a.capacity;
  }
  if (sort === "distance" && user) {
    const da = shelterDistance(a, user);
    const db = shelterDistance(b, user);
    if (da === null) {
      return 1;
    }
    if (db === null) {
      return -1;
    }
    return da.km - db.km;
  }
  return a.parish === b.parish
    ? a.name.localeCompare(b.name)
    : a.parish.localeCompare(b.parish);
}

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 10_000,
  maximumAge: 60_000,
};

const LOCATION_ERRORS: Record<number, string> = {
  1: "You blocked location access. Allow location in your browser, or filter by parish instead.",
  2: "Your location is unavailable. Filter by parish instead.",
  3: "The location request timed out. Filter by parish instead.",
};

/** Shelters shown before the "Show more" button appears. */
const PAGE_SIZE = 12;

export function ShelterFinder() {
  return (
    <Suspense fallback={null}>
      <FinderContent />
    </Suspense>
  );
}

function FinderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [parishes, setParishes] = useState(() =>
    parseList(searchParams.get("parish"))
  );
  const [categories, setCategories] = useState(() =>
    parseList(searchParams.get("cat"))
  );
  const [accessible, setAccessible] = useState(
    () => searchParams.get("access") === "1"
  );
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>(() =>
    parseSort(searchParams.get("sort"))
  );

  const [userLocation, setUserLocation] = useState<LatLon | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [locationState, setLocationState] = useState<LocationState>("idle");
  const [filterOpen, setFilterOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset to the first page whenever the filters or search change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on filter changes only
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [parishes, categories, accessible, search]);

  // Mirror filters to the URL so a filtered view can be shared.
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) {
      params.set("q", search);
    }
    if (parishes.length > 0) {
      params.set("parish", parishes.join(","));
    }
    if (categories.length > 0) {
      params.set("cat", categories.join(","));
    }
    if (accessible) {
      params.set("access", "1");
    }
    if (sort !== "parish") {
      params.set("sort", sort);
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }, [search, parishes, categories, accessible, sort, router]);

  const results = useMemo(() => {
    const active: Filters = { parishes, categories, accessible, search };
    return EMERGENCY_SHELTERS.filter((shelter) =>
      matchesFilters(shelter, active)
    ).sort((a, b) => compareForSort(a, b, sort, userLocation));
  }, [parishes, categories, accessible, search, sort, userLocation]);

  const visibleShelters = results.slice(0, visibleCount);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Your device does not support location. You can still filter by parish."
      );
      setSort("parish");
      return;
    }
    setLocationStatus("Finding your location…");
    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const found: LatLon = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        if (!userIsOnIsland(found)) {
          setUserLocation(null);
          setLocationState("idle");
          setSort("parish");
          setLocationStatus(
            "You appear to be outside Barbados, so distance isn't meaningful. Filter by parish instead."
          );
          return;
        }
        setUserLocation(found);
        setLocationState("success");
        setSort("distance");
        setLocationStatus(
          "Sorted by distance from your parish. Two shelters in the same parish show the same distance."
        );
      },
      (error) => {
        setUserLocation(null);
        setLocationState("idle");
        setSort("parish");
        setLocationStatus(
          LOCATION_ERRORS[error.code] ??
            "Could not get your location. Filter by parish instead."
        );
      },
      GEO_OPTIONS
    );
  }, []);

  const onSortChange = useCallback(
    (value: SortKey) => {
      setSort(value);
      if (value === "distance" && !userLocation) {
        requestLocation();
      }
    },
    [userLocation, requestLocation]
  );

  const clearAll = useCallback(() => {
    setParishes([]);
    setCategories([]);
    setAccessible(false);
    setSearch("");
  }, []);

  const tags: { key: string; label: string; remove: () => void }[] = [
    ...parishes.map((p) => ({
      key: `parish:${p}`,
      label: p,
      remove: () => setParishes((list) => list.filter((x) => x !== p)),
    })),
    ...categories.map((c) => ({
      key: `cat:${c}`,
      label: `Category ${c}`,
      remove: () => setCategories((list) => list.filter((x) => x !== c)),
    })),
    ...(accessible
      ? [
          {
            key: "access",
            label: "Accessible bathroom",
            remove: () => setAccessible(false),
          },
        ]
      : []),
  ];

  const locationLabel =
    locationState === "loading"
      ? "Finding your location…"
      : locationState === "success"
        ? "Location set — refresh"
        : "Use my location";

  return (
    <section aria-label="Shelter finder">
      <Text
        as="p"
        className="mb-s text-mid-grey-00 print:hidden"
        size="caption"
      >
        <button
          className="underline"
          onClick={() => window.print()}
          type="button"
        >
          Print this list
        </button>{" "}
        to keep a paper copy. Each shelter has a Google Maps directions link.
      </Text>

      <div className="lg:grid lg:grid-cols-[20rem_1fr] lg:gap-8">
        {/* Sidebar: search, locate and filter */}
        <div className="mb-m flex flex-col gap-m lg:mb-0 print:hidden">
          {/* Filter — GOV.BB pattern: collapsible panel of checkbox groups */}
          <div>
            <button
              aria-controls="shelter-filter-panel"
              aria-expanded={filterOpen}
              className="flex w-full items-center gap-xs border-mid-grey-00 border-b py-3 text-green-00"
              onClick={() => setFilterOpen((open) => !open)}
              type="button"
            >
              <span className="font-bold text-[20px] underline">Filter</span>
              <Chevron open={filterOpen} />
            </button>

            {filterOpen && (
              <div
                className="flex flex-col gap-xm border-grey-00 border-b bg-grey-00 p-xm"
                id="shelter-filter-panel"
              >
                <Input
                  autoComplete="off"
                  label="Search by name"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="e.g. Combermere"
                  type="search"
                  value={search}
                />

                <div className="flex flex-col gap-xs">
                  <Button
                    aria-busy={locationState === "loading"}
                    className="self-start"
                    disabled={locationState === "loading"}
                    onClick={requestLocation}
                    type="button"
                  >
                    <span className="inline-flex items-center gap-2">
                      <LocationIcon />
                      {locationLabel}
                    </span>
                  </Button>
                  {locationStatus && (
                    <Text
                      aria-live="polite"
                      as="p"
                      className="text-mid-grey-00"
                      size="caption"
                    >
                      {locationStatus}
                    </Text>
                  )}
                </div>

                <Select
                  label="Sort by"
                  onChange={(event) =>
                    onSortChange(event.target.value as SortKey)
                  }
                  value={sort}
                >
                  <option value="parish">Parish (default)</option>
                  <option value="name">Name</option>
                  <option value="capacity">Largest first</option>
                  <option value="distance">Nearest first</option>
                </Select>

                <FilterGroup defaultOpen={false} title="Parish">
                  {PARISHES.map((name) => (
                    <Checkbox
                      checked={parishes.includes(name)}
                      id={`parish-${name}`}
                      key={name}
                      label={name}
                      onCheckedChange={() =>
                        setParishes((list) => toggleValue(list, name))
                      }
                    />
                  ))}
                </FilterGroup>

                <FilterGroup
                  hint="Category 1 is used during a hurricane; Category 2 is used after one has passed."
                  title="Category"
                >
                  <Checkbox
                    checked={categories.includes("1")}
                    id="cat-1"
                    label="Category 1"
                    onCheckedChange={() =>
                      setCategories((list) => toggleValue(list, "1"))
                    }
                  />
                  <Checkbox
                    checked={categories.includes("2")}
                    id="cat-2"
                    label="Category 2"
                    onCheckedChange={() =>
                      setCategories((list) => toggleValue(list, "2"))
                    }
                  />
                </FilterGroup>

                <FilterGroup
                  hint="Only 14 shelters have a bathroom suitable for people who use a wheelchair. The rest of the building may not be step-free — call ahead if you need to check."
                  title="Accessibility"
                >
                  <Checkbox
                    checked={accessible}
                    id="filter-access"
                    label="Has an accessible bathroom"
                    onCheckedChange={(checked) =>
                      setAccessible(checked === true)
                    }
                  />
                </FilterGroup>
              </div>
            )}

            {tags.length > 0 && (
              <div className="flex flex-col gap-s pt-xs">
                <div className="flex flex-wrap items-center gap-xs">
                  {tags.map((tag) => (
                    <button
                      className="inline-flex items-center gap-2 bg-teal-10 p-2.5 font-medium hover:bg-teal-40"
                      key={tag.key}
                      onClick={tag.remove}
                      type="button"
                    >
                      {tag.label}
                      <CloseIcon />
                      <span className="sr-only">Remove filter</span>
                    </button>
                  ))}
                </div>
                <button
                  className="self-start font-semibold text-red-00 underline"
                  onClick={clearAll}
                  type="button"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results — single column on mobile, grid on desktop */}
        <div>
          <Text as="p" className="mb-s font-bold" role="status">
            {resultCountLabel(visibleShelters.length, results.length)}
          </Text>

          {results.length === 0 ? (
            <div className="border-blue-100 border-l-4 bg-blue-10 px-s py-xm">
              <Text as="p">
                Try clearing a filter above, or call the Department of Emergency
                Management on <Link href={DEM_TEL}>{DEM_NUMBER}</Link> for help.
              </Text>
            </div>
          ) : (
            <>
              <ul className="grid list-none auto-rows-fr grid-cols-1 gap-s p-0 lg:grid-cols-2">
                {visibleShelters.map((shelter) => (
                  <ShelterCard
                    distance={shelterDistance(shelter, userLocation)}
                    key={shelter.name}
                    shelter={shelter}
                  />
                ))}
              </ul>
              {visibleShelters.length < results.length && (
                <div className="mt-m flex justify-center print:hidden">
                  <Button
                    onClick={() =>
                      setVisibleCount((count) => count + PAGE_SIZE)
                    }
                    type="button"
                    variant="secondary"
                  >
                    Show{" "}
                    {Math.min(
                      PAGE_SIZE,
                      results.length - visibleShelters.length
                    )}{" "}
                    more shelters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  title,
  hint,
  defaultOpen = true,
  children,
}: {
  title: string;
  hint?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex w-full flex-col gap-s border-mid-grey-00 border-b pb-s">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2.5"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Heading as="h3" size="h4">
          {title}
        </Heading>
        <span className="text-teal-00">
          <Chevron open={open} />
        </span>
      </button>
      {open && (
        <div className="flex flex-col gap-s">
          {hint && (
            <Text as="p" className="text-mid-grey-00" size="caption">
              {hint}
            </Text>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

function resultCountLabel(visible: number, matched: number): string {
  if (matched === 0) {
    return "No shelters match your filters";
  }
  if (visible >= matched) {
    return `Showing all ${matched} shelters`;
  }
  return `Showing ${visible} of ${matched} shelters`;
}
