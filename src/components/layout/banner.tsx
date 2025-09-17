import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export const Banner = () => {
  return (
    <div className="flex items-center justify-between bg-[#00267F] px-4 py-[7px] text-white">
      <span className="flex items-center gap-2">
        <Image
          alt="flag"
          height="16"
          src="/images/coat-of-arms.png"
          width="17"
        />
        <Typography className="text-white" variant="small">
          Official government website
        </Typography>
      </span>

      {/* <Typography className="text-white underline" variant="small">
        Learn More
      </Typography> */}
    </div>
  );
};
