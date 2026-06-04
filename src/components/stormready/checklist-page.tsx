/**
 * StormReady Barbados — household preparation checklist
 * --------------------------------------------------------------
 * Client component rendered for
 * /health-and-emergency-services/stormready/checklist via the catch-all
 * content route. Progress is saved to localStorage so it survives a refresh,
 * and the page prints to a clean PDF — site chrome carries `print:hidden` and
 * the root layout neutralises its grid for print, so only content is printed.
 */

"use client";

import { Button, Checkbox, Heading, Text } from "@govtech-bb/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
  STORMREADY_CHECKLIST,
  STORMREADY_CHECKLIST_TOTAL,
} from "@/data/stormready-checklist";

const STORAGE_KEY = "stormready-checklist-v1";

type ChecklistState = Record<string, boolean>;

function loadState(): ChecklistState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChecklistState) : {};
  } catch {
    return {};
  }
}

function saveState(state: ChecklistState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore — storage may be unavailable (private mode, quota).
  }
}

export function StormReadyChecklistPage() {
  return (
    <Suspense fallback={null}>
      <ChecklistContent />
    </Suspense>
  );
}

function ChecklistContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<ChecklistState>({});
  const [hydrated, setHydrated] = useState(false);

  // Restore saved progress after mount to keep server and client markup in sync.
  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  const setItem = useCallback((id: string, checked: boolean) => {
    setState((prev) => {
      const next = { ...prev, [id]: checked };
      saveState(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState({});
    saveState({});
  }, []);

  const doneCount = useMemo(
    () => Object.values(state).filter(Boolean).length,
    [state]
  );

  const percent = STORMREADY_CHECKLIST_TOTAL
    ? Math.round((doneCount / STORMREADY_CHECKLIST_TOTAL) * 100)
    : 0;

  // Auto-open the print dialog when arriving from the "Save checklist as PDF"
  // link (?print=1 or ?format=pdf). Wait for paint, then print.
  const autoPrint =
    searchParams.has("print") || searchParams.get("format") === "pdf";
  useEffect(() => {
    if (!(autoPrint && hydrated)) {
      return;
    }
    const timer = setTimeout(() => window.print(), 350);
    return () => clearTimeout(timer);
  }, [autoPrint, hydrated]);

  return (
    <div className="mb-l flex max-w-176 flex-col gap-m print:mb-0">
      {/* Print-only sheet header. */}
      <div className="hidden border-black-00 border-b-2 pb-xs print:block">
        <Heading as="h1" size="h2">
          Household preparation checklist
        </Heading>
        <Text as="p" size="caption">
          StormReady Barbados — Government of Barbados
        </Text>
        <Text as="p" className="text-mid-grey-00" size="caption">
          Name: _______________________ Date: ______________
        </Text>
      </div>

      <div className="flex flex-col gap-xs print:hidden">
        <Heading as="h1">Household preparation checklist</Heading>
        <Text as="p" className="text-mid-grey-00">
          Tick items as you get ready. Save as PDF or print to keep a copy at
          home. Your progress is saved on this device.
        </Text>
      </div>

      <div className="flex flex-col gap-s sm:flex-row print:hidden">
        <Button onClick={() => window.print()} type="button">
          Save as PDF or print
        </Button>
        <Button onClick={reset} type="button" variant="secondary">
          Reset
        </Button>
      </div>

      <div className="flex flex-col gap-xs bg-teal-10 p-s print:hidden">
        <div className="flex justify-between gap-s font-bold text-teal-00">
          <span>Your progress</span>
          <span>
            {doneCount} of {STORMREADY_CHECKLIST_TOTAL} items
          </span>
        </div>
        <div
          aria-label="Checklist progress"
          aria-valuemax={STORMREADY_CHECKLIST_TOTAL}
          aria-valuemin={0}
          aria-valuenow={doneCount}
          className="h-2 overflow-hidden rounded-full bg-grey-00"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-teal-00 transition-[width] duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-m">
        {STORMREADY_CHECKLIST.map((section) => (
          <fieldset
            className="flex flex-col gap-s border-0 p-0"
            key={section.id}
          >
            <legend className="w-full border-grey-00 border-b pb-xs">
              <Heading as="h2">{section.title}</Heading>
            </legend>
            {section.hint && (
              <Text as="p" className="text-mid-grey-00">
                {section.hint}
              </Text>
            )}
            <div className="mt-xs flex flex-col gap-s">
              {section.items.map((item) => (
                <Checkbox
                  checked={state[item.id] ?? false}
                  id={item.id}
                  key={item.id}
                  label={item.label}
                  onCheckedChange={(checked) =>
                    setItem(item.id, checked === true)
                  }
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
