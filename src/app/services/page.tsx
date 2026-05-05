import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { StageBanner } from "@/components/stage-banner";
import { getAlphaServices } from "@/lib/markdown";
import { searchServices } from "@/lib/search";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Services",
    url: `${SITE_URL}/services`,
  },
  twitter: {
    title: "Services",
  },
};

export default async function ServicesPage() {
  const alphaServices = await getAlphaServices();
  const alphaSlugs = new Set(alphaServices.map((s) => s.slug));
  const results = searchServices("", alphaSlugs);

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
              Search for a service
            </Text>
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="pt-4 pb-8">
        <div className="container">
          <div>
            <Heading as="h2" className="mb-s">
              Alpha Services
            </Heading>

            <Text as="p" className="mb-s">
              These services are in alpha
            </Text>

            {results.length > 0 && (
              <ul className="flex flex-col gap-s">
                {results.map((result) => (
                  <li
                    className="flex flex-col items-start gap-xs border-grey-00 border-b-2 py-s first:pt-0"
                    key={result.slug}
                  >
                    <Link
                      as={NextLink}
                      className="text-[20px] leading-normal"
                      href={`/${result.slug}`}
                    >
                      {result.title}
                    </Link>
                    <Text as="p" className="text-mid-grey-00">
                      {result.hasOnlineForm
                        ? "Digital service"
                        : "Information service"}
                    </Text>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <div className="container">
        <HelpfulBox className="mb-4 lg:mb-16" />
      </div>
    </>
  );
}
