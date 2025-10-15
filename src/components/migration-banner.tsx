import Link from "next/link";
import { Typography } from "@/components/ui/typography";

type MigrationBannerProps = {
  pageURL?: string;
  url?: string;
};

export const MigrationBanner = ({
  pageURL,
  url = "https://www.gov.bb",
}: MigrationBannerProps) => (
  <div className="space-y-4 border-[#FF94D9] border-r-4 border-l-4 bg-[#FFF4FB] px-4 py-3">
    <Typography variant="paragraph">
      This {pageURL ? "page" : "content"} was originally published on{" "}
      <Link
        className="underline"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        gov.bb
      </Link>
      . It may be out of date or shown differently here.
    </Typography>
    {pageURL ? (
      <Link
        className="text-xl underline"
        href={pageURL}
        rel="noopener noreferrer"
        target="_blank"
      >
        View the original source
      </Link>
    ) : null}
  </div>
);
