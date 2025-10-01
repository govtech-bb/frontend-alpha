import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export const HelpfulBox = () => {
  return (
    <div className="px-4 py-8">
      <div className="rounded border-4 border-[#FFC726] bg-[#FFEAA7] p-6">
        <Typography className="mb-4 font-semibold" variant="h3">
          Was this helpful?
        </Typography>
        <Typography className="mb-4" variant="paragraph">
          Give us your feedback about this page.
        </Typography>
        <Link
          className="text-[#1E787D] underline underline-offset-2"
          href="/feedback"
        >
          Help us improve alpha.gov.bb
        </Link>
      </div>
    </div>
  );
};
