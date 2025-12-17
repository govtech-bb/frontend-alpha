import { Heading, Link, LinkButton, Text } from "@govtech-bb/react";
import NextLink from "next/link";

import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { getFeaturedServices } from "@/lib/markdown";

export default async function Home() {
  const featuredServices = await getFeaturedServices();

  return (
    <>
      <section className="border-yellow-00 border-b-4 bg-yellow-100">
        <div className="container">
          <div className="space-y-4 py-8 lg:space-y-4">
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
            <Heading as="h2">Alpha public services</Heading>

            <Text as="p">
              These services are new. We're working on them and they are likely
              to change as we learn more.
            </Text>

            <div className="flex flex-col items-start gap-2">
              {featuredServices.map((service) => (
                <div className="flex items-center gap-x-3" key={service.slug}>
                  <ChevronLeftSVG className="inline-block shrink-0 rotate-180" />

                  <Link
                    as={NextLink}
                    className="text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                    href={`/${service.slug}`}
                    key={service.slug}
                    variant={"secondary"}
                  >
                    {service.title}
                  </Link>
                </div>
              ))}

              <Link
                as={NextLink}
                className="mt-4 text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                href="/what-we-mean-by-alpha"
                variant={"secondary"}
              >
                Learn more about alpha
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="space-y-4 py-8 lg:space-y-4">
            <Heading as="h2">Find government services</Heading>

            <div className="flex flex-col">
              {INFORMATION_ARCHITECTURE.filter(
                (category) => category.slug !== "government"
              ).map((service) => (
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
        </div>
      </section>

      <section className="bg-grey-00">
        <div className="container">
          <div className="space-y-4 py-8 lg:space-y-4">
            <Heading as="h2">Government</Heading>

            <div className="flex flex-col">
              {INFORMATION_ARCHITECTURE.filter(
                (category) => category.slug === "government"
              ).map((category) =>
                category.pages.map((page) => (
                  <div
                    className="border-grey-00 border-t-2 py-4 first:border-0 lg:py-8"
                    key={page.title}
                  >
                    <Link
                      as={NextLink}
                      className="mb-2 text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                      href={`/government/${page.slug}`}
                    >
                      {page.title}
                    </Link>
                    <Text as="p">{page.description}</Text>
                  </div>
                ))
              )}
            </div>
          </div>
          <HelpfulBox className="mb-4 lg:mb-16" />
        </div>
      </section>
    </>
  );
}
