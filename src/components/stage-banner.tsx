import { Link, StatusBanner, Text } from "@govtech-bb/react";
import NextLink from "next/link";

type StageBannerProps = {
  stage?: string;
  url?: string;
  className?: string;
};

export const StageBanner = ({
  stage,
  url = "/what-we-mean-by-alpha",
  className,
}: StageBannerProps) => (
  <StatusBanner className={className} variant={stage as "alpha" | "beta"}>
    <Text as="p">
      This page is in{" "}
      <Link
        as={NextLink}
        className="capitalize"
        href={url}
        variant={"secondary"}
      >
        {stage}
      </Link>
      .
    </Text>
  </StatusBanner>
);
