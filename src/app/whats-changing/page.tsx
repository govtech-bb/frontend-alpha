import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export default function WhatsChangingPage() {
  return (
    <div className="font-sans">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Typography className="text-[#1E787D] underline" variant="paragraph">
            <Link href="/">← Back</Link>
          </Typography>
        </div>

        <div className="space-y-6">
          <Typography variant="display">What's changing?</Typography>

          <div className="border-[#1E787D] border-l-4 bg-[#DEF5F6] px-4 py-3">
            <Typography variant="paragraph">
              This Page is in <strong>Alpha</strong>.
            </Typography>
          </div>

          <Typography variant="paragraph">
            How you find and use public services is changing.
          </Typography>

          <Typography variant="paragraph">
            GovTech is leveraging technology to make it clearer, simpler and
            faster for people to find and use public services, and get things
            done.
          </Typography>

          <Typography variant="paragraph">We want everyone to:</Typography>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <Typography variant="paragraph">
                know where to find information about public services, and feel
                confident that it is accurate, so we're creating a single source
                of truth, alpha.gov.bb – testing a replacement of gov.bb
              </Typography>
            </li>
            <li>
              <Typography variant="paragraph">
                know what to expect before they start using a service, so we're
                telling them the steps involved and the time it might take
              </Typography>
            </li>
            <li>
              <Typography variant="paragraph">
                be able to access and use public services, so we're designing
                inclusively and prioritising accessibility
              </Typography>
            </li>
            <li>
              <Typography variant="paragraph">
                be able to get things done faster and feel more in control, so
                we're streamlining processes to be less reliant on external
                factors
              </Typography>
            </li>
            <li>
              <Typography variant="paragraph">
                feel confident that their data and personal information is
                secure and only being used when strictly necessary and with
                their permission
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
