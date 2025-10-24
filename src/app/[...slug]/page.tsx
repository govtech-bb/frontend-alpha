/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */

import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/markdown-content";
import { MigrationBanner } from "@/components/migration-banner";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/data/content-directory";
import { getMarkdownContent } from "@/lib/markdown";

type ContentPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: ContentPageProps) {
  const { slug } = await params;

  //For a single slug, check if there's a matching category or a matching markdown file
  if (slug.length === 1) {
    const [categorySlug] = slug;
    const category = SERVICE_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );
    // If category is not found
    if (!category) {
      const markdownContent = await getMarkdownContent([categorySlug]);
      // If markdown content is not found
      if (!markdownContent) {
        notFound();
      }

      return <MarkdownContent markdown={markdownContent} />;
    }

    return (
      <div className="space-y-4 lg:space-y-8">
        <Typography variant="display">{category.title}</Typography>
        <MigrationBanner />

        {category.description
          ?.split("\n")
          .map((line: string, _index: number) => (
            <Typography key={_index} variant="body">
              {line}
            </Typography>
          ))}

        <div className="flex flex-col divide-y-2 divide-neutral-grey lg:last:border-neutral-grey lg:last:border-b-2">
          {category.pages.map((service) => (
            <div
              className="py-4 first:pt-4 lg:py-8 first:lg:pt-8"
              key={service.title}
            >
              <Link
                className="cursor-pointer font-bold text-[20px] text-teal-dark leading-[150%] underline underline-offset-2 lg:text-3xl"
                href={`/${categorySlug}/${service.slug}`}
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug.length > 1) {
    const [categorySlug, pageSlug] = slug;

    const category = SERVICE_CATEGORIES.find(
      (cat) => cat.slug === categorySlug
    );
    if (!category) {
      notFound();
    }

    const page = category.pages.find((p) => p.slug === pageSlug);
    if (!page) {
      notFound();
    }

    const markdownContent = await getMarkdownContent([pageSlug]);
    if (!markdownContent) {
      notFound();
    }

    return <MarkdownContent markdown={markdownContent} />;
  }

  return notFound();
}
