import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export const Banner = () => {
  return (
    <div className="bg-blue-100 text-neutral-white">
      <div className="container">
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2">
            <Image
              alt="flag"
              className="block"
              height="16"
              src="/images/coat-of-arms.png"
              width="17"
            />
            <Typography className="text-neutral-white" variant="small">
              Official government website
            </Typography>
          </span>

          {/* <Typography className="text-white underline" variant="small">
        Learn More
      </Typography> */}
        </div>
      </div>
    </div>
  );
};
