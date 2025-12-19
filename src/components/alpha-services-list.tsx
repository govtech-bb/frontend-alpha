import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { getAlphaServices } from "@/lib/markdown";

export const AlphaServicesList = async () => {
  const alphaServices = await getAlphaServices();

  return (
    <section className="flex flex-col gap-xm py-xm">
      <div className="gap-s">
        <Heading as="h2">Alpha services</Heading>

        <Text as="p">
          We&apos;re working on new digital services. That means content on this
          website is likely to change or looks different than intended.
        </Text>
      </div>

      <div className="flex flex-col items-start gap-s">
        {alphaServices.map((service) => (
          <Link as={NextLink} href={`/${service.slug}`} key={service.slug}>
            {service.title}
          </Link>
        ))}
      </div>
    </section>
  );
};
