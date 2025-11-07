import { FeedbackLink } from "@/components/feedback-link";
import { Typography } from "@/components/ui/typography";

export const HelpfulBox = () => (
  <div className="my-4 space-y-2 border-4 border-yellow-100 bg-yellow-40 px-4 py-6 lg:mb-16 lg:gap-2 lg:space-y-0 lg:p-6">
    <Typography className="mb-4" variant="h3">
      Was this helpful?
    </Typography>
    <Typography className="mb-4" variant="paragraph">
      Give us your feedback about this page.
    </Typography>
    <FeedbackLink>Help us improve alpha.gov.bb</FeedbackLink>
  </div>
);
