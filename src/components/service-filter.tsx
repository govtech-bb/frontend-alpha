"use client";

import { Button, Checkbox, CheckboxGroup } from "@govtech-bb/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";

const SERVICE_TYPES = [
  { value: "information", label: "Information service" },
  { value: "digital", label: "Digital service" },
] as const;

const CATEGORIES = INFORMATION_ARCHITECTURE.map(({ title }) => ({
  value: title,
  label: title,
}));

const FILTER_GROUPS = [
  { key: "type", label: "Service type", options: SERVICE_TYPES },
  { key: "category", label: "Category", options: CATEGORIES },
] as const;

const FILTER_KEYS = FILTER_GROUPS.map((g) => g.key);

const XIcon = () => (
  <svg
    aria-hidden="true"
    className="size-6 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      fill="currentColor"
    />
  </svg>
);

function FilterChip({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex cursor-pointer items-center gap-2.5 bg-teal-10 p-2.5 text-[20px]"
      onClick={onClick}
      type="button"
    >
      {label}
      <XIcon />
      <span className="sr-only">Remove {label} filter</span>
    </button>
  );
}

function buildParams(
  base: URLSearchParams,
  updates: Record<string, string[]>
): URLSearchParams {
  const params = new URLSearchParams(base.toString());
  for (const key of Object.keys(updates)) {
    params.delete(key);
    for (const v of updates[key]) params.append(key, v);
  }
  return params;
}

function getSelected(sp: URLSearchParams): Record<string, string[]> {
  return Object.fromEntries(FILTER_KEYS.map((k) => [k, sp.getAll(k)]));
}

export function ServiceFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const selected = getSelected(searchParams);
  const hasFilters = FILTER_KEYS.some((k) => selected[k].length > 0);

  const [pending, setPending] = useState<Record<string, string[]>>(selected);

  // Sync pending state when URL params change externally
  const selKey = JSON.stringify(selected);
  const [prevSelKey, setPrevSelKey] = useState(selKey);
  if (selKey !== prevSelKey) {
    setPending(selected);
    setPrevSelKey(selKey);
  }

  const pushParams = useCallback(
    (params: URLSearchParams) =>
      router.push(`${pathname}?${params}`, { scroll: false }),
    [router, pathname]
  );

  const applyFilters = useCallback(
    () => pushParams(buildParams(searchParams, pending)),
    [searchParams, pending, pushParams]
  );

  const removeFilter = useCallback(
    (key: string, value: string) =>
      pushParams(
        buildParams(searchParams, {
          [key]: selected[key].filter((v) => v !== value),
        })
      ),
    [searchParams, selected, pushParams]
  );

  const clearFilters = useCallback(
    () =>
      pushParams(
        buildParams(
          searchParams,
          Object.fromEntries(FILTER_KEYS.map((k) => [k, []]))
        )
      ),
    [searchParams, pushParams]
  );

  const toggle = (key: string, value: string, checked: boolean) =>
    setPending((p) => ({
      ...p,
      [key]: checked ? [...p[key], value] : p[key].filter((v) => v !== value),
    }));

  return (
    <div className="mb-s">
      <div
        className={`border-b ${open ? "border-mid-grey-00" : "border-grey-00"}`}
      >
        <Button
          aria-expanded={open}
          className={`flex items-center gap-xs py-3 after:inline-block after:size-2.75 after:border-current after:border-t-2 after:border-r-2 after:content-[''] ${open ? "after:translate-y-[20%] after:-rotate-45" : "after:-translate-y-[20%] after:rotate-135"}`}
          onClick={() => setOpen(!open)}
          variant="link"
        >
          Filter
        </Button>
      </div>

      <div
        className={`flex flex-col border-grey-00 border-b bg-grey-00 px-xm ${open ? "" : "hidden"}`}
      >
        {FILTER_GROUPS.map(({ key, label, options }) => (
          <details className="group border-mid-grey-00 border-b" key={key}>
            <summary className="flex w-full cursor-pointer list-none items-center justify-between py-s font-bold text-[20px] after:inline-block after:size-2.75 after:-translate-y-[20%] after:rotate-135 after:border-current after:border-t-2 after:border-r-2 after:text-teal-00 after:content-[''] group-open:after:translate-y-[20%] group-open:after:-rotate-45 [&::-webkit-details-marker]:hidden">
              <span>{label}</span>
            </summary>
            {/* TODO: design system bug — CheckboxGroup should not have items-center */}
            <CheckboxGroup className="items-start! pb-s" label="">
              {options.map(({ value, label: optLabel }) => (
                <Checkbox
                  checked={pending[key].includes(value)}
                  id={`filter-${key}-${value}`}
                  key={value}
                  label={optLabel}
                  onCheckedChange={(c) => toggle(key, value, !!c)}
                />
              ))}
            </CheckboxGroup>
          </details>
        ))}

        <div className="py-s">
          <Button className="w-full" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>

      {hasFilters && (
        <div className="flex flex-col items-start gap-xs pt-xs lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-xs">
            {FILTER_GROUPS.map(({ key, options }) =>
              selected[key].map((val) => (
                <FilterChip
                  key={`${key}-${val}`}
                  label={options.find((o) => o.value === val)?.label ?? val}
                  onClick={() => removeFilter(key, val)}
                />
              ))
            )}
          </div>
          <Button onClick={clearFilters} variant="destructive-link">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
