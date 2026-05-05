import { Heading, Link, Text } from "@govtech-bb/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { getAlphaServices } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "What we mean by alpha",
};

export default async function WhatWeMeanByAlphaPage() {
  const alphaServices = await getAlphaServices();

  return (
    <article className="flex flex-col gap-xm">
      <div className="flex flex-col gap-s">
        <Heading as="h1">What we mean by alpha</Heading>

        <div className="flex flex-col gap-s">
          <Text as="p">
            This is an Alpha website. This means it&apos;s an early version and
            we&apos;re still working on it.
          </Text>

          <Text as="p">
            You might notice things that feel unfinished, change often, and
            sometimes even break. That&apos;s part of the process. We&apos;re
            using{" "}
            <Link href={SITE_URL} rel="noopener noreferrer" target="_blank">
              alpha.gov.bb
            </Link>{" "}
            to test ideas and get feedback so we can learn what works and what
            doesn&apos;t before we build the full service.
          </Text>

          <Text as="p">
            If you have thoughts or spot something that could be better,{" "}
            <Link
              href={`${SITE_URL}/feedback`}
              rel="noopener noreferrer"
              target="_blank"
            >
              let us know
            </Link>
            . We&apos;d love to hear from you.
          </Text>
        </div>
      </div>

      <section aria-labelledby="alpha-services" className="space-y-4 py-8">
        <Heading as="h2" id="alpha-services">
          Alpha services
        </Heading>

        <Text as="p">These services are in alpha.</Text>

        <ul className="flex flex-col gap-2">
          {alphaServices.map((service) => (
            <li key={service.slug}>
              <Link
                as={NextLink}
                className="text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                href={`/${service.slug}`}
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
