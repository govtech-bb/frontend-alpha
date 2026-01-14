import { Heading, Link, Text } from "@govtech-bb/react";
import NextLink from "next/link";
import { getAlphaServices } from "@/lib/markdown";

export const AlphaServicesList = async () => {
  const alphaServices = await getAlphaServices();

  return (
    <section className="space-y-4 py-8">
      <Heading as="h2">Alpha services</Heading>

      <Text as="p">These services are in alpha.</Text>

      <div className="flex flex-col gap-2">
        {alphaServices.map((service) => (
          <div className="flex items-center gap-x-3" key={service.slug}>
            <Link
              as={NextLink}
              className="text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
              href={`/${service.slug}`}
              key={service.slug}
            >
              {service.title}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
