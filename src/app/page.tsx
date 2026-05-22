import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { ChatAssistant } from "@/components/chat-assistant";
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
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Government of Barbados",
      },
    ],
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
      <section className="border-yellow-00 border-b-4 bg-blue-00 text-white-00">
        <div className="container">
          <div className="space-y-m py-m lg:py-l">
            <div className="max-w-210 space-y-s">
              <Heading as="h1" className="text-balance">
                Find and use Barbados government services
              </Heading>
              <Text as="p" className="text-pretty">
                Ask anything — applications, certificates, licences, benefits,
                and more. Get instant guidance.
              </Text>
            </div>
            <ChatAssistant />
          </div>
        </div>
      </section>

      <section className="border-teal-100 border-b-4 bg-green-10">
        <div className="container">
          <div className="space-y-m py-m">
            <Heading as="h3">
              Or search all government services directly
            </Heading>
            <SearchForm />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="space-y-m py-m lg:py-l">
            <Heading as="h1" className="text-balance">
              All government services
            </Heading>

            <div className="flex flex-col">
              {INFORMATION_ARCHITECTURE.map((service) => (
                <div
                  className="border-grey-00 border-b-2 py-s lg:py-xm"
                  key={service.title}
                >
                  <Link
                    as={NextLink}
                    className="font-bold text-[20px] leading-normal lg:text-3xl"
                    href={service.slug}
                  >
                    {service.title}
                  </Link>
                  <Text as="p" className="mt-xxs text-pretty">
                    {service.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
          <HelpfulBox className="mb-s lg:mb-l" />
        </div>
      </section>
    </>
  );
}
