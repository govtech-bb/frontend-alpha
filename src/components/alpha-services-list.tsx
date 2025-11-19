import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { Typography } from "@/components/ui/typography";
import { getAlphaServices } from "@/lib/markdown";

export const AlphaServicesList = async () => {
  const alphaServices = await getAlphaServices();

  return (
    <section className="space-y-4 py-8 pb-[28px] lg:space-y-4 lg:py-8">
      <Typography variant="h2">Alpha services</Typography>

      <Typography variant="paragraph">These services are in alpha.</Typography>

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
