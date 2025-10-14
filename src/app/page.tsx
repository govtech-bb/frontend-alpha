import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/constants/data";
import { getFeaturedServices } from "@/lib/markdown";

export default async function Home() {
  const featuredServices = await getFeaturedServices();
  return (
    <>
      <div className="space-y-8 border-[#E5BD39] border-b-4 bg-[#FFC726] px-4 py-8">
        <Typography variant="display">
          How you find and use public services is changing
        </Typography>
        <div className="space-y-4">
          <Typography variant="subheading">
            It will be clearer, simpler and faster for citizens to get things
            done.
          </Typography>
        </div>
      </div>
      <div className="space-y-6 border-[#30C0C8] border-b-4 bg-[#DEF5F6] px-4 py-8">
        <Typography variant="h2">Alpha services</Typography>

        <Typography variant="paragraph">
          Alpha services are new and are very likely to change.
        </Typography>

        <div className="flex flex-col gap-2">
          {featuredServices.map((service) => (
            <Link
              className="cursor-pointer font-normal text-[20px] leading-[150%] underline"
              href={`/${service.slug}`}
              key={service.slug}
            >
              {service.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-6 border-[#E0E4E9] border-b-4 bg-white px-4 py-8">
        <Typography variant="h2">Find government services</Typography>

        <div className="flex flex-col">
          {SERVICE_CATEGORIES.map((service) => (
            <div
              className="my-2 border-gray-200 border-b-2 pb-4 last:border-0"
              key={service.title}
            >
              <Link
                className="cursor-pointer font-normal text-[#1E787D] text-[20px] leading-[150%] underline underline-offset-2"
                href={`/content/${service.slug}`} // TODO update link when pages are ready
              >
                {service.title}
              </Link>
              <Typography variant="paragraph">{service.description}</Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
