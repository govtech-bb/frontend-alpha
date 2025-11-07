import { Link } from "@govtech-bb/react";
import NextLink from "next/link";

import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import { getFeaturedServices } from "@/lib/markdown";

export default async function Home() {
  const featuredServices = await getFeaturedServices();
  return (
    <>
      <section className="border-yellow-dark border-b-4 bg-yellow-100">
        <div className="container">
          <div className="space-y-4 py-8 pb-[28px] lg:space-y-4 lg:py-8">
            <Typography variant="h1">
              How you find and use public services is changing
            </Typography>
            <Typography variant="paragraph">
              It will be clearer, simpler and faster for citizens get things
              done.
            </Typography>
          </div>
        </div>
      </section>

      <section className="border-teal-40 border-b-4 bg-teal-10">
        <div className="container">
          <div className="space-y-4 py-8 pb-[28px] lg:space-y-4 lg:py-8">
            <Typography variant="h2">Alpha public services</Typography>

            <Typography variant="paragraph">
              These services are new. We’re working on them and they are likely
              to change. That also means that they might break.
            </Typography>

            <div className="flex flex-col gap-2">
              {featuredServices.map((service) => (
                <div
                  className="flex items-center lg:gap-x-3"
                  key={service.slug}
                >
                  <ChevronLeftSVG className="hidden shrink-0 rotate-180 lg:inline-block" />

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
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-white">
        <div className="container">
          <div className="space-y-4 py-8 pb-[28px] lg:space-y-4 lg:py-8">
            <Typography variant="h2">Find government services</Typography>

            <div className="flex flex-col">
              {SERVICE_CATEGORIES.map((service) => (
                <div
                  className="border-neutral-grey border-t-2 py-4 first:border-0 lg:py-8"
                  key={service.title}
                >
                  <Link
                    as={NextLink}
                    className="mb-2 text-[20px] leading-normal lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                    href={service.slug}
                  >
                    {service.title}
                  </Link>
                  <Typography variant="paragraph">
                    {service.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <HelpfulBox />
        </div>
      </section>
    </>
  );
}
