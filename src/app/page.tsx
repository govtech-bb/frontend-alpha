import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";

import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { getFeaturedServices } from "@/lib/markdown";

export default async function Home() {
  const featuredServices = await getFeaturedServices();
  return (
    <>
      <section className="border-yellow-dark border-b-4 bg-yellow-100">
        <div className="container">
          <div className="space-y-s py-m">
            <Heading as="h1">
              How you find and use government services is changing
            </Heading>
            <Text as="p">
              It will be clearer, simpler and faster for citizens to get things
              done.
            </Text>
          </div>
        </div>
      </section>

      <section className="border-teal-40 border-b-4 bg-teal-10">
        <div className="container">
          <div className="flex flex-col items-start gap-xm py-m">
            <div className="flex flex-col gap-s">
              <Heading as="h2">Alpha public services</Heading>

              <Text as="p">
                These services are new. We're working on them and they are
                likely to change as we learn more.
              </Text>

              <div className="flex flex-col items-start gap-s">
                {featuredServices.map((service) => (
                  <div className="flex items-center gap-xs" key={service.slug}>
                    <ChevronLeftSVG className="inline-block shrink-0 rotate-180" />

                    <Link
                      as={NextLink}
                      href={`/${service.slug}`}
                      variant={"secondary"}
                    >
                      {service.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <Link
              as={NextLink}
              href="/what-we-mean-by-alpha"
              variant={"secondary"}
            >
              Learn more about alpha
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex flex-col gap-xm pt-m pb-s">
            <Heading as="h2">Find government services</Heading>

            <div className="flex flex-col">
              {INFORMATION_ARCHITECTURE.map((service) => (
                <div
                  className="flex flex-col items-start gap-xs border-neutral-grey border-b-2 py-s last:border-0"
                  key={service.title}
                >
                  <Link as={NextLink} href={service.slug}>
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
