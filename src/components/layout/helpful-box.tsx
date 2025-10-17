import { FeedbackLink } from "@/components/feedback-link";
import { Typography } from "@/components/ui/typography";

export const HelpfulBox = () => (
  <div className="mb-4 space-y-4 rounded border-4 border-yellow-bright bg-yellow-light px-4 py-8 lg:mb-16 lg:gap-4 lg:p-6">
    <Typography className="mb-4" variant="h2">
      Was this helpful?
    </Typography>
    <Typography className="mb-4" variant="paragraph">
      Give us your feedback about this page.
    </Typography>
    <FeedbackLink>Help us improve alpha.gov.bb</FeedbackLink>
  </div>
);
