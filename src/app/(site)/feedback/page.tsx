import { SimpleFeedbackForm } from "@/components/forms/simple-feedback-form";
import { BackButton } from "@/components/layout/back-button";
import { HelpfulBox } from "@/components/layout/helpful-box";
import { Typography } from "@/components/ui/typography";

export default function FeedbackPage() {
  return (
    <div className="container overflow-hidden pt-4">
      <div className="mb-6 space-y-6">
        <BackButton />
        <Typography variant="h1">Help us improve alpha.gov.bb</Typography>
        <div className="space-y-3 text-[20px] leading-[1.7]">
          <p>
            Your feedback will help us make it clearer, simpler and faster to
            find and use public services.
          </p>
          <p>Do not include personal information.</p>
        </div>
      </div>
      <SimpleFeedbackForm />
      <HelpfulBox />
    </div>
  );
}
