import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { StageBanner } from "@/components/stage-banner";
import { PEOPLE } from "@/data/people";

export const metadata: Metadata = {
  title: "Members",
};

export default function PeoplePage() {
  const sorted = [...PEOPLE].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="bg-blue-10">
        <div className="container">
          <StageBanner stage="alpha" />
        </div>
      </div>

      <section className="border-teal-40 border-b-4 bg-teal-10 py-8">
        <div className="container">
          <div className="flex flex-col gap-2">
            <Text as="p" className="font-bold">
              Search for a member
            </Text>
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="pt-8 pb-8">
        <div className="container">
          <div className="flex flex-col gap-l">
            <div className="flex flex-col gap-xs">
              <Heading as="h1">Members</Heading>
              <Text as="p" className="text-mid-grey-00">
                Government ministers, members of parliament and senior
                officials.
              </Text>
            </div>

            <ul className="flex flex-col">
              {sorted.map((person) => (
                <li
                  className="flex flex-col gap-xxs border-grey-00 border-b py-s first:pt-xs"
                  key={person.slug}
                >
                  <Link
                    as={NextLink}
                    className="text-[20px] leading-normal"
                    href={`/people/${person.slug}`}
                  >
                    {person.name}
                  </Link>
                  {person.role && (
                    <Text as="p" className="text-mid-grey-00">
                      {person.role}
                    </Text>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </>
  );
}
