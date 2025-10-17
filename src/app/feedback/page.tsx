import { SimpleFeedbackForm } from "@/components/forms/simple-feedback-form";
import { BackButton } from "@/components/layout/back-button";
import { Typography } from "@/components/ui/typography";

export default function FeedbackPage() {
  return (
    <div className="overflow-hidden bg-neutral-white lg:rounded-t-3xl">
      <div className="container space-y-4">
        <BackButton className="py-6 lg:pb-0" />
        <Typography variant="h1">Help us improve alpha.gov.bb</Typography>

        <div className="border-blue-bright border-r-4 border-l-4 bg-blue-light/30 px-4 py-3">
          <Typography variant="paragraph">
            This Page is in <span className="capitalize underline">Alpha</span>.
          </Typography>
        </div>

        <Typography variant="paragraph">
          Your feedback will help us make it clearer, simpler and faster to find
          and use public services.
        </Typography>

        <Typography variant="paragraph">
          Do not include personal information.
        </Typography>

        <SimpleFeedbackForm />
      </div>
    </div>
  );
}
