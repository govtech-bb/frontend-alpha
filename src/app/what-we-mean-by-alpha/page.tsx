import { Link } from "@govtech-bb/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { Typography } from "@/components/ui/typography";
import { getAlphaServices, getMarkdownContent } from "@/lib/markdown";

export default async function Page() {
  const alphaServices = await getAlphaServices();
  const markdownContent = await getMarkdownContent(["what-we-mean-by-alpha"]);
  if (!markdownContent) {
    notFound();
  }
  return (
    <section className="space-y-4 py-8 pb-[28px] lg:space-y-4 lg:py-8">
      <MarkdownContent markdown={markdownContent} />
      <Typography variant="h2">Alpha services</Typography>

      <Typography variant="paragraph">
        These services are new. We’re working on them and they are likely to
        change. That also means that they might break.
      </Typography>

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
}
