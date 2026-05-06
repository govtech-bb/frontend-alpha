import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { SearchForm } from "@/components/search-form";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: "Government Services | Government of Barbados" },
  description:
    "Access official Barbados government services online — apply for passports, birth certificates, driver's licences, and more at alpha.gov.bb.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "The Government of Barbados",
    description:
      "Access official Barbados government services online — apply for passports, birth certificates, driver's licences, and more at alpha.gov.bb.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "Government of Barbados" }],
  },
  twitter: {
    title: "The Government of Barbados",
    description:
      "Access official Barbados government services online — apply for passports, birth certificates, driver's licences, and more at alpha.gov.bb.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function Home() {
  return (
    <>
      <section className="border-yellow-00 border-b-4 bg-yellow-100">
        <div className="container">
          <div className="space-y-4 py-8">
            <Heading as="h1">
              How you find and use government services is changing
            </Heading>
            <Text as="p">
              It will be clearer, simpler and faster for citizens to get things
              done.
            </Text>
            <LinkButton
              className="bg-[#1a777d]!"
              href="/tell-us"
              variant="primary"
            >
              Tell us what's important
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="border-teal-40 border-b-4 bg-teal-10">
        <div className="container">
          <div className="space-y-4 py-8">
            <Heading as="h2">Alpha services</Heading>

            <Text as="p">
              These services are new. We're working on them and they are likely
              to change as we learn more.
            </Text>

            <div className="flex flex-col gap-2">
              <Text as="p" className="font-bold">
                Search for a service
              </Text>
              <SearchForm />
            </div>

            <Link as={NextLink} href="/services">
              View all services
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="space-y-4 py-8">
            <Heading as="h2">Government services</Heading>

            <div className="flex flex-col">
              {INFORMATION_ARCHITECTURE.map((service) => (
                <div
                  className="border-grey-00 border-t-2 py-4 first:border-0 lg:py-8"
                  key={service.title}
                >
                  <Link
                    as={NextLink}
                    className="mb-2 text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                    href={service.slug}
                  >
                    {service.title}
                  </Link>
                  <Text as="p">{service.description}</Text>
                </div>
              ))}
            </div>
          </div>
          <HelpfulBox className="mb-4 lg:mb-16" />
        </div>
      </section>
    </>
  );
}
