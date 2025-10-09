import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export const HelpfulBox = () => (
  <div className="mx-4 my-2 space-y-4 rounded border-4 border-[#FFC726] bg-[#FFEAA7] px-4 py-8">
    <Typography className="mb-4" variant="h2">
      Was this helpful?
    </Typography>
    <Typography className="mb-4" variant="paragraph">
      Give us your feedback about this page.
    </Typography>
    <Link className="text-xl underline underline-offset-2" href="/feedback">
      Help us improve alpha.gov.bb
    </Link>
  </div>
);
