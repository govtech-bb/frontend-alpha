import Link from "next/link";

import { ChevronLeftSVG } from "@/components/icons/chevron-left";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import { getFeaturedServices } from "@/lib/markdown";

export default async function Home() {
  const featuredServices = await getFeaturedServices();
  return (
    <>
      <section className="border-yellow-dark border-b-4 bg-yellow-bright">
        <div className="container">
          <div className="space-y-8 py-8 lg:pt-32 lg:pb-16">
            <Typography variant="display">
              How you find and use public services is changing
            </Typography>
            <div className="space-y-4">
              <Typography variant="subheading">
                It will be clearer, simpler and faster for citizens to get
                things done.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <section className="border-teal-bright border-b-4 bg-teal-light">
        <div className="container">
          <div className="space-y-6 py-8 lg:py-16">
            <Typography variant="h2">Preview new public services</Typography>

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
                    className="inline-flex cursor-pointer items-center font-normal text-[20px] capitalize leading-[150%] underline lg:gap-3 lg:text-[1.5rem] lg:leading-[2rem]"
                    href={`/${service.slug}`}
                    key={service.slug}
                  >
                    {service.title.toLowerCase()}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-neutral-grey border-b-4 bg-neutral-white">
        <div className="container">
          <div className="space-y-6 py-8 lg:pt-16 lg:pb-6">
            <Typography variant="h2">Find government services</Typography>

            <div className="flex flex-col">
              {SERVICE_CATEGORIES.map((service) => (
                <div
                  className="my-2 border-gray-200 border-b-2 pb-4 last:border-0 lg:pb-8"
                  key={service.title}
                >
                  <Link
                    className="cursor-pointer font-bold text-[20px] text-teal-dark capitalize leading-[150%] underline underline-offset-2 lg:text-3xl"
                    href={service.slug}
                  >
                    {service.title.toLowerCase()}
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
