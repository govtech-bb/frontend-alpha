import { StatusBanner } from "@govtech-bb/react";
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
  <StatusBanner variant="migrated">
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
        className="text-xl underline lg:text-[1.5rem] lg:leading-[170%]"
        href={pageURL}
        rel="noopener noreferrer"
        target="_blank"
      >
        View the original source
      </Link>
    ) : null}
  </StatusBanner>
);
