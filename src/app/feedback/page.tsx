import { SimpleFeedbackForm } from "@/components/forms/simple-feedback-form";
import Breadcrumb from "@/components/layout/breadcrumb-navigation";
import { Typography } from "@/components/ui/typography";

export default function FeedbackPage() {
  return (
    <div className="mx-auto h-full max-w-4xl space-y-4 rounded-t-3xl bg-white px-4 py-6">
      <Breadcrumb />

      <Typography variant="h1">Help us improve alpha.gov.bb</Typography>

      <div className="border-[#409CF8] border-r-4 border-l-4 bg-[#B3D9FF]/30 px-4 py-3">
        <Typography variant="paragraph">
          This Page is in{"  "}
          <span className="capitalize underline">alpha</span>.
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
  );
}
