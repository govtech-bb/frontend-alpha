"use client";

import { Heading, LinkButton, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { useId, useMemo, useState } from "react";

export type OpportunityCategory =
  | "program"
  | "initiative"
  | "workshop"
  | "volunteer"
  | "service";

export interface Opportunity {
  id: string;
  title: string;
  /**
   * Short, plain-language sentence shown directly under the title on the
   * detail page. Acts as a lede / introductory summary.
   */
  summary?: string;
  category: OpportunityCategory;
  description: string;
  tags: string[];
  eligibility?: {
    ageMin?: number;
    ageMax?: number;
    interests?: string[];
  };
  deadline?: string | null;
  startDate?: string;
  url: string;
  applyUrl?: string;
  source?: string;
  subProgrammes?: { name: string; description: string }[];
  contact?: { email?: string; phone?: string };
}

const CATEGORY_LABEL: Record<OpportunityCategory, string> = {
  program: "Programme",
  initiative: "Initiative",
  workshop: "Workshop",
  volunteer: "Volunteering",
  service: "Service",
};

function formatAgeRange(ageMin?: number, ageMax?: number): string | null {
  if (ageMin != null && ageMax != null) return `Ages ${ageMin}–${ageMax}`;
  if (ageMin != null) return `${ageMin}+ years`;
  if (ageMax != null) return `Up to ${ageMax} years`;
  return null;
}

function sortOpportunities(items: Opportunity[]): Opportunity[] {
  return [...items].sort((a, b) => {
    if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
    if (a.deadline) return -1;
    if (b.deadline) return 1;
    return a.title.localeCompare(b.title);
  });
}

function matchesQuery(opportunity: Opportunity, query: string): boolean {
  if (!query) return true;
  const haystack = [
    opportunity.title,
    opportunity.description,
    CATEGORY_LABEL[opportunity.category],
    opportunity.category,
    opportunity.source ?? "",
    ...opportunity.tags,
    ...(opportunity.eligibility?.interests ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function OpportunitiesList({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const [query, setQuery] = useState("");
  const searchId = useId();

  const sorted = useMemo(
    () => sortOpportunities(opportunities),
    [opportunities]
  );

  const results = useMemo(
    () => sorted.filter((opp) => matchesQuery(opp, query.trim())),
    [sorted, query]
  );

  const total = sorted.length;

  return (
    <div className="space-y-s">
      <Heading as="h1">All opportunities</Heading>
      <Text as="p">
        Browse every programme. Use the search to filter by name, tag, or
        category.
      </Text>

      <search aria-label="Search opportunities">
        <form
          className="flex w-full"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor={searchId}>
            Search opportunities
          </label>
          <input
            autoComplete="off"
            className="h-15.5 w-full min-w-0 flex-1 rounded-sm bg-white-00 px-4 text-[20px] leading-normal outline outline-grey-00 transition-all focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-teal-100"
            id={searchId}
            name="q"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, tag, or category"
            type="search"
            value={query}
          />
        </form>
      </search>

      <Text as="p" className="text-mid-grey-00">
        {results.length} of {total} opportunities
      </Text>

      <div aria-live="polite">
        {results.length === 0 ? (
          <div className="border-grey-00 border-l-4 bg-blue-10 p-s">
            <Text as="p">No matches. Try a different search.</Text>
          </div>
        ) : (
          <ul className="flex flex-col">
            {results.map((opp) => {
              const ageRange = formatAgeRange(
                opp.eligibility?.ageMin,
                opp.eligibility?.ageMax
              );
              const meta = [
                CATEGORY_LABEL[opp.category],
                ageRange,
                opp.deadline ? `Deadline: ${opp.deadline}` : null,
                opp.source,
              ].filter(Boolean) as string[];

              return (
                <li
                  className="flex flex-col gap-xs border-grey-00 border-b-2 py-s first:pt-0"
                  key={opp.id}
                >
                  <Heading as="h2" className="text-[20px] leading-tight">
                    {opp.title}
                  </Heading>

                  <Text as="p" className="text-base text-mid-grey-00">
                    {meta.join(" · ")}
                  </Text>

                  <Text as="p">{opp.description}</Text>

                  {opp.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {opp.tags.map((tag) => (
                        <li
                          className="rounded bg-yellow-40 px-3 py-1 text-base text-black-00"
                          key={tag}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-2">
                    <LinkButton
                      as={NextLink}
                      href={`/youth/opportunities/${opp.id}`}
                      variant="primary"
                    >
                      View &amp; apply
                    </LinkButton>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
