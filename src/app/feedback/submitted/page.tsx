import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export default function FeedbackSubmittedPage() {
  return (
    <div className="h-full space-y-4 rounded-t-3xl bg-white px-4 py-6">
      <div className="space-y-6">
        <Typography variant="h1">Help us improve alpha.gov.bb</Typography>

        <Typography variant="paragraph">
          Your feedback will help us make it clearer, simpler and faster to find
          and use public services.
        </Typography>

        <Typography variant="paragraph">
          Do not include personal information.
        </Typography>

        <div className="space-y-4 rounded-md border border-[#30C0C8] bg-[#DEF5F6] px-4 py-3">
          <Typography
            className="font-semibold text-gray-900"
            variant="paragraph"
          >
            Thank you for your feedback.
          </Typography>
          <Link
            className="text-[#1E787D] underline underline-offset-2"
            href="/feedback"
          >
            Tell us something else
          </Link>
        </div>

        <div className="space-y-4 text-gray-700">
          <Typography variant="paragraph">
            Each week, the GovTech team meets to prioritise our tasks and
            consider how we might respond to feedback.
          </Typography>
        </div>
      </div>
    </div>
  );
}
