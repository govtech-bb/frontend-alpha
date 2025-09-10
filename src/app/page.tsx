import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="font-sans">
      <div className="space-y-8 bg-[#FFDD7D] px-4 py-8">
        <Typography variant="h1">Government services are changing</Typography>
        <div className="space-y-4">
          <Typography variant="paragraph">
            We&apos;re changing how government works online so it&apos;s
            clearer, faster and easier for you.
          </Typography>

          <Typography variant="paragraph">
            Your views make sure we focus on what matters to people first.
          </Typography>

          <Link
            className="cursor-pointer font-normal text-[#00267F] text-[20px] leading-[150%] underline transition-colors"
            href="/have-your-say"
          >
            Have your say
          </Link>
        </div>
      </div>
      <div className="bg-white px-4 py-8">
        <div className="space-y-6">
          <Typography variant="h3">Services you can use here</Typography>

          <div className="flex flex-col gap-2 space-y-4">
            <Link
              className="cursor-pointer font-normal text-[#00267F] text-[20px] leading-[150%] underline"
              href="/entrypoints/pregnancy-and-birth"
            >
              Having a baby
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
