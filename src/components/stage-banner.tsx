import { StatusBanner } from "@govtech-bb/react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

type StageBannerProps = {
  stage?: string;
  url?: string;
};

export const StageBanner = ({
  stage,
  url = "/what-we-mean-by-alpha",
}: StageBannerProps) => (
  <StatusBanner variant={stage as "alpha" | "beta"}>
    <Typography variant="paragraph">
      This page is in{" "}
      <Link className="capitalize underline" href={url}>
        {stage}
      </Link>
    </Typography>
  </StatusBanner>
);
