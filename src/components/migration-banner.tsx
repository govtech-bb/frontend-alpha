import { Link, StatusBanner, Text } from "@govtech-bb/react";
import NextLink from "next/link";

type MigrationBannerProps = {
  pageURL?: string;
  url?: string;
};

export const MigrationBanner = ({
  pageURL,
  url = "https://www.gov.bb",
}: MigrationBannerProps) => (
  <StatusBanner variant="migrated">
    <Text as="p">
      This {pageURL ? "page" : "content"} was originally published on{" "}
      <Link
        as={NextLink}
        className="underline"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        variant={"secondary"}
      >
        gov.bb
      </Link>
      . It may be out of date or shown differently here.
    </Text>
    {pageURL ? (
      <Link
        as={NextLink}
        href={pageURL}
        rel="noopener noreferrer"
        target="_blank"
        variant={"secondary"}
      >
        View the original source
      </Link>
    ) : null}
  </StatusBanner>
);
