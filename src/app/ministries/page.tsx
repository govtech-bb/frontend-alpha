import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";

import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { StageBanner } from "@/components/stage-banner";
import { getMinistriesByCategory } from "@/data/ministries";

export const metadata: Metadata = {
  title: "Departments and ministries",
};

const groups = [
  {
    id: "ministerial-departments",
    title: "Ministerial departments",
    description:
      "Ministerial departments are led by a government minister and deal with policy.",
    items: getMinistriesByCategory("ministerial"),
  },
  {
    id: "non-ministerial-departments",
    title: "Non-ministerial departments",
    description:
      "Non-ministerial departments are headed by senior public servants, not ministers.",
    items: getMinistriesByCategory("non-ministerial"),
  },
  {
    id: "agencies-and-public-bodies",
    title: "Agencies and other public bodies",
    description:
      "Statutory bodies, agencies and public corporations that work with government.",
    items: getMinistriesByCategory("agency"),
  },
].filter((group) => group.items.length > 0);

export default function MinistriesPage() {
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
              Search for a department/ministry
            </Text>
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="pt-8 pb-8">
        <div className="container">
          <div className="flex flex-col gap-l">
            <div className="flex flex-col gap-xs">
              <Heading as="h1">Departments and ministries</Heading>
              <Text as="p" className="text-mid-grey-00">
                Government of Barbados ministries, departments, agencies and
                public bodies.
              </Text>
            </div>

            <nav aria-label="Organisation categories">
              <ul className="flex flex-col gap-xs">
                {groups.map((group) => (
                  <li key={group.id}>
                    <Link as="a" href={`#${group.id}`}>
                      {group.title} ({group.items.length})
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-xl">
              {groups.map((group) => (
                <section aria-labelledby={`${group.id}-heading`} key={group.id}>
                  <Heading
                    as="h2"
                    className="mb-xs border-teal-40 border-b-4 pb-xs"
                    id={`${group.id}-heading`}
                  >
                    {group.title}{" "}
                    <span className="font-normal text-mid-grey-00">
                      ({group.items.length})
                    </span>
                  </Heading>
                  <Text as="p" className="mb-s text-mid-grey-00">
                    {group.description}
                  </Text>
                  <ul className="flex flex-col">
                    {group.items.map((item) => (
                      <li
                        className="flex flex-col gap-xxs border-grey-00 border-b py-s first:pt-xs"
                        key={item.slug}
                      >
                        <Link
                          as={NextLink}
                          className="text-[20px] leading-normal"
                          href={`/ministries/${item.slug}`}
                        >
                          {item.name}
                        </Link>
                        {item.shortDescription && (
                          <Text as="p" className="text-mid-grey-00">
                            {item.shortDescription}
                          </Text>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </>
  );
}
