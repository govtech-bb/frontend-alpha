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
  <div className="border-blue-bright border-r-4 border-l-4 bg-blue-light/30 px-4 py-3">
    <Typography variant="paragraph">
      This page is in{" "}
      <Link className="capitalize underline" href={url}>
        {stage}
      </Link>
    </Typography>
  </div>
);
