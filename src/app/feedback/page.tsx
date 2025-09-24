import Link from "next/link";
import { SimpleFeedbackForm } from "@/components/forms/simple-feedback-form";
import { Typography } from "@/components/ui/typography";

export default function FeedbackPage() {
  return (
    <div className="font-sans">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Typography className="text-[#1E787D] underline" variant="paragraph">
            <Link href="/">← Back</Link>
          </Typography>
        </div>

        <div className="space-y-6">
          <Typography variant="display">
            Help us improve alpha.gov.bb
          </Typography>

          <div className="border-[#1E787D] border-l-4 bg-[#DEF5F6] px-4 py-3">
            <Typography variant="paragraph">
              This Page is in <strong>Alpha</strong>.
            </Typography>
          </div>

          <Typography variant="paragraph">
            Your feedback will help us make it clearer, simpler and faster to
            find and use public services.
          </Typography>

          <Typography variant="paragraph">
            Do not include personal information.
          </Typography>

          <SimpleFeedbackForm />
        </div>
      </div>
    </div>
  );
}
