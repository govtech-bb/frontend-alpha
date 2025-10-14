import Link from "next/link";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import { SERVICE_CATEGORIES } from "@/constants/data";

type ContentPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: ContentPageProps) {
  const { slug } = await params;
  const category = SERVICE_CATEGORIES.find(
    (cat) =>
      cat.title
        .toLowerCase()
        .replace(",", "")
        .replace("and", "")
        .replace(/ /g, "-")
        .replace("--", "-") === slug[0]
  );

  if (!category) {
    return notFound();
  }

  return (
    <div className="space-y-4 px-4 pb-8">
      <div className="space-y-4 pb-4">
        <Typography variant="h1">{category.title}</Typography>

        {category.description
          ?.split("\n")
          .map((line: string, _index: number) => (
            <Typography key={_index} variant="paragraph">
              {line}
            </Typography>
          ))}

        <div className="flex flex-col">
          {category.pages.map((service) => (
            <div
              className="my-2 border-gray-200 border-b-2 pb-4 last:border-0"
              key={service.title}
            >
              <Link
                className="cursor-pointer font-normal text-[#1E787D] text-[20px] leading-[150%] underline underline-offset-2"
                href={service.source_url} // TODO update link when pages are ready
                rel="noopener noreferrer"
                target="_blank"
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
